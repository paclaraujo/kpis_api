import UserRepository from "../repositories/UserRepository";
import ApiError from "../helpers/ApiError";

export default class UserService {
  static async validateUserEmail(email: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user)
      throw new ApiError(401, "EMAIL_NOT_REGISTERED", "E-mail não registrado.");

    return user;
  }
}
