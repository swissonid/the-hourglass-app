import { z } from "zod";
import { ZurichHolidays } from "./holiday-repository";
import {
  DateRange,
  getDaysBetween,
  holidaySchema,
} from "./sandglass-types.internal";

const workingHourCalenderConfigSchema = z.object({
  nationalHolidays: z.array(holidaySchema).default(ZurichHolidays),
  workingDays: z.array(z.number().min(1).max(7)).default([1, 2, 3, 4, 5]),
  expectedWorkingHoursPerDay: z.number().min(0).default(8.4),
});

const defaultConfig = workingHourCalenderConfigSchema.parse({});
export type WorkingHourCalenderConfig = z.infer<
  typeof workingHourCalenderConfigSchema
>;

export class WorkingHourCalender {
  private config: WorkingHourCalenderConfig;

  constructor(config: WorkingHourCalenderConfig = defaultConfig) {
    this.config = workingHourCalenderConfigSchema.parse(config);
  }

  calculateMandatoryWorkingHours(date: Date): number {
    const dayOfWeek = date.getDay();
    const isNationalHoliday = this.config.nationalHolidays.find(
      (holiday) => holiday.date.toDateString() === date.toDateString()
    );
    const isWorkingDay = this.config.workingDays.includes(dayOfWeek);
    const expectedWorkingHoursPerDay = this.config.expectedWorkingHoursPerDay;

    if (!isWorkingDay) {
      return 0;
    }
    if (isNationalHoliday) {
      return (
        expectedWorkingHoursPerDay -
        expectedWorkingHoursPerDay * isNationalHoliday.percentageOfAreFree
      );
    } else {
      return expectedWorkingHoursPerDay;
    }
  }

  calculateWorkingHours(dateRange: DateRange): number {
    const days = getDaysBetween(dateRange);
    const workingOurs = days.reduce((sum, day) => {
      return sum + this.calculateMandatoryWorkingHours(day);
    }, 0);
    // round to 2 decimal places to avoid floating point errors
    return Math.round(workingOurs * 100) / 100;
  }
}
