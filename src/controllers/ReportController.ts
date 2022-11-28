import ReportService from "../services/ReportService";
import { Context } from "koa";

interface requestParams {
  leaderId?: string;
}

export default class ReportController {
  static async getReport(ctx: Context) {
    const requestParams = <requestParams>ctx.params;

    const report = await ReportService.getReport(+requestParams.leaderId);

    ctx.body = report;
    ctx.status = 200;
  }
}
