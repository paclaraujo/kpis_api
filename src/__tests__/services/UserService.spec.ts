import UserService from "../../services/UserService";
import UserRepository from "../../repositories/UserRepository";
import { Users } from "../../entities/Users";

describe("Given UserService", () => {
  describe(".validateUserEmail", () => {
    describe("when email passed does not exists on DB", () => {
      it("should throw an error", async () => {
        jest.spyOn(UserRepository, "findByEmail").mockReturnValueOnce(null);

        try {
          await UserService.validateUserEmail("daniellewinters@kpis.tech");
          fail();
        } catch (err) {
          expect(err.code).toEqual("EMAIL_NOT_REGISTERED");
          expect(err.message).toEqual("E-mail não registrado.");
        }
      });
    });

    describe("when email passed exists on DB", () => {
      it("should return user info", async () => {
        const userInfo: Users = {
          id: 0,
          status: "ativo",
          name: "Danielle Winters",
          email: "daniellewinters@kpis.tech",
          manager_email: null,
          admission_date: new Date("2021-10-06T03:00:00.000Z"),
          resignation_date: null,
          role: "Diretor",
        };

        jest
          .spyOn(UserRepository, "findByEmail")
          .mockResolvedValueOnce(userInfo);

        const user = await UserService.validateUserEmail(
          "daniellewinters@kpis.tech"
        );
        expect(UserRepository.findByEmail).toHaveBeenCalledWith(
          "daniellewinters@kpis.tech"
        );
        expect(user).toEqual(userInfo);
      });
    });
  });
});
