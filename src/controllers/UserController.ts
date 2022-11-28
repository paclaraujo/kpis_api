import UserService from "../services/UserService";
import ApiError from "../helpers/ApiError";
import { Context } from "koa";

interface requestBody {
  email?: string;
}

export default class UserController {
  static async validateUserEmail(ctx: Context) {
    const requestBody = <requestBody>ctx.request.body;

    if (!requestBody.email)
      throw new ApiError(400, "EMAIL_REQUIRED", '"email" é obrigatório');

    const user = await UserService.validateUserEmail(requestBody.email);

    ctx.body = user;
    ctx.status = 200;
  }
}
