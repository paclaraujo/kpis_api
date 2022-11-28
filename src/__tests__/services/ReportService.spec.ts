import ReportService from "../../services/ReportService";
import UserRepository from "../../repositories/UserRepository";
import { User } from "../../entities/User";

describe("Given ReportService", () => {
  describe(".getReport", () => {
    describe("when id passed does not exists on DB", () => {
      it("should throw an error", async () => {
        jest.spyOn(UserRepository, "findById").mockReturnValueOnce(null);

        try {
          await ReportService.getReport(0);
          fail();
        } catch (err) {
          expect(err.code).toEqual("USER_NOT_FOUND");
          expect(err.message).toEqual("Usuário não encontrado.");
        }
      });
    });

    describe("when id passed exists on DB", () => {
      it("should return report info", async () => {
        jest.spyOn(UserRepository, "findById").mockResolvedValueOnce({
          id: 0,
          status: "ativo",
          name: "Danielle Winters",
          email: "daniellewinters@kpis.tech",
          manager_email: null,
          admission_date: new Date("2021-10-06T03:00:00.000Z"),
          resignation_date: null,
          role: "Diretor",
        });

        jest.spyOn(UserRepository, "findSubordinates").mockResolvedValueOnce([
          {
            id: "4",
            status: "inativo",
            name: "Mitchell Peters",
            email: "mitchellpeters@kpis.tech",
            manager_email: "sharonbarr@kpis.tech",
            admission_date: "2020-03-16T03:00:00.000Z",
            resignation_date: "2021-02-14T03:00:00.000Z",
            role: "Engenheiro",
          },
          {
            id: "5",
            status: "ativo",
            name: "Adam Sanders",
            email: "adamsanders@kpis.tech",
            manager_email: "mitchellpeters@kpis.tech",
            admission_date: "2020-04-25T03:00:00.000Z",
            resignation_date: null,
            role: "Analista",
          },
          {
            id: "6",
            status: "ativo",
            name: "John Jackson",
            email: "johnjackson@kpis.tech",
            manager_email: "mitchellpeters@kpis.tech",
            admission_date: "2021-09-28T03:00:00.000Z",
            resignation_date: null,
            role: "Analista",
          },
          {
            id: "8",
            status: "ativo",
            name: "Matthew Beasley",
            email: "matthewbeasley@kpis.tech",
            manager_email: "mitchellpeters@kpis.tech",
            admission_date: "2020-04-09T03:00:00.000Z",
            resignation_date: null,
            role: "Analista",
          },
        ]);

        const report = await ReportService.getReport(0);
        expect(UserRepository.findById).toHaveBeenCalledWith(0);
        expect(UserRepository.findSubordinates).toHaveBeenCalledWith(0);
        expect(report).toEqual({
          headcount: [
            { x: "2020/03", y: "1.0" },
            { x: "2020/04", y: "3.0" },
            { x: "2021/02", y: "2.5" },
            { x: "2021/09", y: "3.0" },
          ],
          turnover: [
            { x: "2020/03", y: "0.0" },
            { x: "2020/04", y: "0.0" },
            { x: "2021/02", y: "0.4" },
            { x: "2021/09", y: "0.0" },
          ],
        });
      });
    });
  });
});
