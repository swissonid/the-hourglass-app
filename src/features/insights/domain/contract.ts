import { z } from "zod";

const percentageSchema = z.number().min(0.01).max(1).default(1);
const holidaysByFullEmploymentSchema = z.number().min(1).default(25);
const hoursPerWeekSchema = z.number().min(1).default(42.5);

const unsavedContractSchema = z.object({
  startDate: z.date(),
  holidaysByFullEmployment: holidaysByFullEmploymentSchema,
  holidayPerMonth: z.number().min(1).default(2.08),
  hoursPerWeek: hoursPerWeekSchema,
  jobPercentage: percentageSchema,
});

export function createContract({
  startDate,
  jobPercentage,
  hoursPerWeek,
  holidaysByFullEmployment,
}: {
  startDate: Date;
  jobPercentage?: number;
  hoursPerWeek?: number;
  holidaysByFullEmployment?: number;
}): Contract {
  return unsavedContractSchema.parse({
    startDate,
    holidaysByFullEmployment,
    hoursPerWeek,
    jobPercentage: jobPercentage,
  });
}

export const savedContractSchema = unsavedContractSchema.extend({
  id: z.string(),
});

export type UnsavedContract = z.infer<typeof unsavedContractSchema>;
export type SavedContract = z.infer<typeof savedContractSchema>;
export type Contract = UnsavedContract | SavedContract;

function getCurrentWeekNumber(): number {
  const now: Date = new Date(); // Get the current date and time
  const startOfYear: Date = new Date(now.getFullYear(), 0, 1); // Set the start date of the year

  const diffInMs = now.getTime() - startOfYear.getTime(); // Calculate the difference in milliseconds
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days and round down
  return Math.floor(diffInDays / 7) + 1;
}

export function calculateMonthProgress(date: Date): number {
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const currentDay = date.getDate();

  return Math.round((currentDay / daysInMonth) * 100) / 100;
}
export function calculateHolidayDaysPer(
  contract: Contract,
  date: Date
): number {
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const yearOfEmployment = contract.startDate.getFullYear();
  const monthOfEmployment = contract.startDate.getMonth();

  if (yearOfEmployment > currentYear) {
    return 0;
  }
  if (yearOfEmployment === currentYear) {
    if (monthOfEmployment >= currentMonth) {
      return 0;
    }
    if (monthOfEmployment === currentMonth) {
      return calculateMonthProgress(date) * contract.holidayPerMonth;
    }
    const fullyWorkedMonth = currentMonth - monthOfEmployment - 1;
    const holidaysOfThisMonth =
      calculateMonthProgress(date) * contract.holidayPerMonth;
    const holidaysOfFullyWorkedMonth =
      fullyWorkedMonth * contract.holidayPerMonth;
    return holidaysOfFullyWorkedMonth + holidaysOfThisMonth;
  }

  return 2.08;
  // get the week number of the year
}
