import UserRepository from "../repositories/UserRepository";
import ApiError from "../helpers/ApiError";
import * as dayjs from "dayjs";
import { User } from "../entities/User";

export default class ReportService {
  static async getReport(id: number) {
    const user = await UserRepository.findById(id);

    if (!user)
      throw new ApiError(404, "USER_NOT_FOUND", "Usuário não encontrado.");

    const subordinates = await UserRepository.findSubordinates(id);

    const formatDate = (date: Date) => dayjs(date).format("YYYY/MM");

    const monthsWithData = <string[]>subordinates.reduce(
      (months: string[], subordinate: User) => {
        subordinate.resignation_date &&
          months.push(formatDate(subordinate.resignation_date));

        return [...months, formatDate(subordinate.admission_date)];
      },
      []
    );

    const orderedMonths = [...new Set(monthsWithData)].sort((dateA, dateB) =>
      new Date(dateA) > new Date(dateB) ? 1 : -1
    );

    let activeSubordinates = 0;

    const headcount = orderedMonths.reduce(
      (obj, month) => {
        const admissions = subordinates.filter((subordinate: User) =>
          String(formatDate(subordinate.admission_date)).includes(month)
        ).length;

        const resignations = subordinates.filter(
          (subordinate: User) =>
            subordinate.resignation_date &&
            String(formatDate(subordinate.resignation_date)).includes(month)
        ).length;

        const activeSubordinatesOnMonthStart = admissions + activeSubordinates;
        activeSubordinates = activeSubordinatesOnMonthStart;

        const activeSubordinatesOnMonthEnd = activeSubordinates - resignations;
        activeSubordinates = activeSubordinates - resignations;

        const headcount =
          (activeSubordinatesOnMonthStart + activeSubordinatesOnMonthEnd) / 2;
        const turnover = resignations / headcount;

        return {
          headcount: [...obj.headcount, { x: month, y: headcount.toFixed(1) }],
          turnover: [...obj.turnover, { x: month, y: turnover.toFixed(1) }],
        };
      },
      { headcount: [], turnover: [] }
    );

    return headcount;
  }
}
