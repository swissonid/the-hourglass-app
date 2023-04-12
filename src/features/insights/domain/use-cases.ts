import * as GrainOfSandRepo from "./grain-of-sand.repository";
import {
  DateRange,
  GrainOfSand,
  parseDateRange,
} from "./sandglass-types.internal";
import { WorkingHourCalender } from "./working-hours-calendar";

/**
 * Create a date range from the given date until today or the given to date
 * @param from The from date
 * @param to The to date
 */
export function createDateRangeFromUntilTodayOrTo(
  from?: Date,
  to?: Date
): DateRange {
  let internalTo: Date;
  if (!to) {
    internalTo = new Date();
  } else {
    internalTo = to;
  }

  let internalFrom: Date = new Date(internalTo.getFullYear(), 0, 1);
  if (from) {
    internalFrom = from;
  }
  return parseDateRange({ from: internalFrom, to: internalTo });
}

/**
 * Get the total logged hours from this year until today
 */
export async function getTotalLoggedWorkHoursUseCase(
  dateRange?: DateRange,
  dependencies: GetAllGrainsOfSandUseCaseDependency = {
    getAllGrainsOfSandUseCase: getAllGrainsOfSandUseCase,
  }
): Promise<number> {
  const grainsOfSand = await dependencies.getAllGrainsOfSandUseCase(dateRange);
  let loggedHours = 0;
  grainsOfSand.forEach(
    (grainOfSand) => (loggedHours += grainOfSand.duration.inSeconds / 3600)
  );
  return loggedHours;
}

export async function getTotalLoggedHolidayHoursUseCase(
  dateRange?: DateRange,
  dependencies: GetAllGrainsOfSandUseCaseDependency = {
    getAllGrainsOfSandUseCase: getAllGrainsOfSandUseCase,
  }
): Promise<number> {
  if (!dateRange) {
    dateRange = createDateRangeFromUntilTodayOrTo();
  }
  const grainsOfSand = await dependencies.getAllGrainsOfSandUseCase(dateRange);
  let loggedHours = 0;

  grainsOfSand.forEach((grainOfSand) => {
    if (grainOfSand.activity.name.toLowerCase() === "holiday") {
      loggedHours += grainOfSand.duration.inSeconds / 3600;
    }
  });
  return loggedHours;
}

export async function getMandatoryLoggedWorkHoursUseCase(
  dateRange: DateRange
): Promise<number> {
  const calendar = new WorkingHourCalender();
  return Promise.resolve(calendar.calculateWorkingHours(dateRange));
}
export async function getTotalOverTimeUseCase(
  dateRange: DateRange,
  getMandatoryLoggedWorkHoursFn: (
    dateRange: DateRange
  ) => Promise<number> = getMandatoryLoggedWorkHoursUseCase,
  getTotalLoggedWorkHoursFn: (
    dateRange: DateRange
  ) => Promise<number> = getTotalLoggedWorkHoursUseCase
): Promise<number> {
  const mandatory = await getMandatoryLoggedWorkHoursFn(dateRange);
  const totalLogged = await getTotalLoggedWorkHoursFn(dateRange);
  //round it to two decimal
  const diff = totalLogged - mandatory;
  return Number(diff.toFixed(2));
}

export async function getAllGrainsOfSandUseCase(
  dateRange?: DateRange
): Promise<GrainOfSand[]> {
  if (!dateRange) {
    dateRange = createDateRangeFromUntilTodayOrTo();
  }
  return GrainOfSandRepo.getAllGrainsOfSand(dateRange);
}
type GetAllGrainsOfSandUseCaseDependency = {
  getAllGrainsOfSandUseCase: typeof getAllGrainsOfSandUseCase;
};
export async function getAllBillableGrainsOfSandUseCase(
  dateRange?: DateRange,
  dependency: GetAllGrainsOfSandUseCaseDependency = {
    getAllGrainsOfSandUseCase,
  }
): Promise<GrainOfSand[]> {
  const grainOfSands = await dependency.getAllGrainsOfSandUseCase(dateRange);
  return grainOfSands.filter(
    (sandGrain) => sandGrain.activity.name.toLowerCase() === "aera"
  );
}

/**
 * Calculate the billable percentage
 *
 * @param dateRange The date range to calculate the billable percentage for
 * @param howManyDecimals Per default the billable percentage is rounded to two decimals
 * If you want to get the percentage with more decimals, set this to the number of decimals you want
 * @param getAllGrainsOfSand The function to get all grains of sand. This is only used for testing
 */
type CalculateBillablePercentageUseCaseDependency = {
  getAllBillableGrainsOfSandUseCase: typeof getAllBillableGrainsOfSandUseCase;
  getTotalLoggedWorkHoursUseCase: typeof getTotalLoggedWorkHoursUseCase;
  getTotalLoggedHolidayHoursUseCase: typeof getTotalLoggedHolidayHoursUseCase;
};
export async function calculateBillablePercentageUseCase(
  dateRange?: DateRange,
  howManyDecimals: number = 2,
  dependency: CalculateBillablePercentageUseCaseDependency = {
    getAllBillableGrainsOfSandUseCase,
    getTotalLoggedWorkHoursUseCase,
    getTotalLoggedHolidayHoursUseCase,
  }
): Promise<number> {
  if (!dateRange) {
    dateRange = createDateRangeFromUntilTodayOrTo();
  }
  const billableGrainOfSands =
    await dependency.getAllBillableGrainsOfSandUseCase(dateRange);
  let billableHours = 0;
  billableGrainOfSands.forEach((grainOfSand) => {
    billableHours += grainOfSand.duration.inHours;
  });
  const totalHours = await dependency.getTotalLoggedWorkHoursUseCase(dateRange);
  const totalHolidays = await dependency.getTotalLoggedHolidayHoursUseCase(
    dateRange
  );

  const percentage = (billableHours / (totalHours - totalHolidays)) * 100;

  return Number(percentage.toFixed(howManyDecimals));
}
