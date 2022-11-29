import ReportService from "../../services/ReportService";
import UserRepository from "../../repositories/UserRepository";

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
            admission_date: "2022-03-16T03:00:00.000Z",
            resignation_date: "2022-07-14T03:00:00.000Z",
            role: "Engenheiro",
          },
          {
            id: "5",
            status: "ativo",
            name: "Adam Sanders",
            email: "adamsanders@kpis.tech",
            manager_email: "mitchellpeters@kpis.tech",
            admission_date: "2022-04-25T03:00:00.000Z",
            resignation_date: null,
            role: "Analista",
          },
          {
            id: "6",
            status: "ativo",
            name: "John Jackson",
            email: "johnjackson@kpis.tech",
            manager_email: "mitchellpeters@kpis.tech",
            admission_date: "2022-09-28T03:00:00.000Z",
            resignation_date: null,
            role: "Analista",
          },
        ]);

        const report = await ReportService.getReport(0);
        expect(UserRepository.findById).toHaveBeenCalledWith(0);
        expect(UserRepository.findSubordinates).toHaveBeenCalledWith(0);
        expect(report).toEqual({
          headcount: [
            { x: "01/2022", y: "0" },
            { x: "02/2022", y: "0" },
            { x: "03/2022", y: "1" },
            { x: "04/2022", y: "2" },
            { x: "05/2022", y: "2" },
            { x: "06/2022", y: "2" },
            { x: "07/2022", y: "2" },
            { x: "08/2022", y: "1" },
            { x: "09/2022", y: "2" },
            { x: "10/2022", y: "2" },
            { x: "11/2022", y: "2" },
            { x: "12/2022", y: "2" },
          ],
          turnover: [
            { x: "01/2022", y: "0" },
            { x: "02/2022", y: "0" },
            { x: "03/2022", y: "0" },
            { x: "04/2022", y: "0" },
            { x: "05/2022", y: "0" },
            { x: "06/2022", y: "0" },
            { x: "07/2022", y: "67" },
            { x: "08/2022", y: "0" },
            { x: "09/2022", y: "0" },
            { x: "10/2022", y: "0" },
            { x: "11/2022", y: "0" },
            { x: "12/2022", y: "0" },
          ],
        });
      });
    });
  });
});
