import * as dayjs from "dayjs";

export const formatDate = (date: Date) => dayjs(date).format("MM/YYYY");

export const monthsArrayFromAnInitialYearToNow = (initialDate: Date) => {
    const startYear = dayjs(initialDate);

    const years = Array.from(
      { length: +dayjs(dayjs()).diff(startYear, "year") + 1 },
      (_, index) => +dayjs(startYear).year() + index
    );

    return years.reduce((datesArr, year) => {
      const monthsWithYear = Array.from({ length: 12 }, (_, index) =>
        dayjs()
          .set("month", index++)
          .set("year", year)
          .format("MM/YYYY")
      );

      return [...datesArr, ...monthsWithYear];
    }, []);
}