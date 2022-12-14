import UserRepository from "../repositories/UserRepository";
import ApiError from "../helpers/ApiError";
import {
  formatDate,
  monthsArrayFromAnInitialYearToNow,
} from "../helpers/datesHelper";
import { Users } from "../entities/Users";

export default class ReportService {
  static async getReport(id: number) {
    const user = await UserRepository.findById(id);

    if (!user)
      throw new ApiError(404, "USER_NOT_FOUND", "Usuário não encontrado.");

    const subordinates = await UserRepository.findSubordinates(id);

    const totalActiveSubordinates = subordinates.filter(
      (subordinate: Users) => subordinate.status === "ativo"
    ).length;

    const totalInactiveSubordinates =
      subordinates.length - totalActiveSubordinates;

    const directSubordinates = subordinates.filter(
      (subordinate: Users) =>
        subordinate.id !== id && subordinate.manager_email === user.email
    ).length;

    const indirectSubordinates = subordinates.length - directSubordinates - 1;

    const monthsByYears = monthsArrayFromAnInitialYearToNow(
      subordinates[0].admission_date
    );

    let activeSubordinates = 0;

    const reportTurnoverAndHeadcount = monthsByYears.reduce(
      (obj, month) => {
        const admissions = subordinates.filter((subordinate: Users) =>
          String(formatDate(subordinate.admission_date)).includes(month)
        ).length;

        const resignations = subordinates.filter(
          (subordinate: Users) =>
            subordinate.resignation_date &&
            String(formatDate(subordinate.resignation_date)).includes(month)
        ).length;

        const activeSubordinatesOnMonthStart = admissions + activeSubordinates;
        const activeSubordinatesOnMonthEnd = activeSubordinates - resignations;
        activeSubordinates += admissions - resignations;

        const headcount =
          (activeSubordinatesOnMonthStart + activeSubordinatesOnMonthEnd) / 2;
        const turnover = headcount > 0 ? (resignations * 100) / headcount : 0;

        return {
          headcount: [...obj.headcount, { x: month, y: headcount.toFixed(0) }],
          turnover: [...obj.turnover, { x: month, y: turnover.toFixed(0) }],
        };
      },
      { headcount: [], turnover: [] }
    );

    return {
      ...reportTurnoverAndHeadcount,
      totalActiveSubordinates,
      totalInactiveSubordinates,
      directSubordinates,
      indirectSubordinates,
    };
  }
}
