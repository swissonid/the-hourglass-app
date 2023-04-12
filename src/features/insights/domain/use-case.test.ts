import { fromPartial } from "@total-typescript/mock-utils";
import { GrainOfSand } from "./sandglass-types.internal";
import {
  calculateBillablePercentageUseCase,
  createDateRangeFromUntilTodayOrTo,
  getAllBillableGrainsOfSandUseCase,
  getTotalLoggedWorkHoursUseCase,
  getTotalOverTimeUseCase,
} from "./use-cases";

describe("Dashboard Use Cases tests", () => {
  describe("createDateRangeFromUntilTodayOrTo tests", () => {
    it("should create a date range from beginning of year until today when no parameter are passed", () => {
      const dateRange = createDateRangeFromUntilTodayOrTo();
      expect(dateRange.from).toEqual(new Date(new Date().getFullYear(), 0, 1));
    });
    it("should create a date range from the given date until today", () => {
      const from = new Date("2023-01-01");
      const expectedTo = new Date();
      const dateRange = createDateRangeFromUntilTodayOrTo(from);
      expect(dateRange.from).toEqual(from);
      expect(dateRange.to).toEqual(expectedTo);
    });
    it("should create a date range from the given date until the given to date", () => {
      const from = new Date("2023-01-01");
      const to = new Date("2023-01-02");
      const dateRange = createDateRangeFromUntilTodayOrTo(from, to);
      expect(dateRange.from).toEqual(from);
      expect(dateRange.to).toEqual(to);
    });
  });
  it("should calculate overTime", async () => {
    const dateRange = createDateRangeFromUntilTodayOrTo(new Date("2023-02-01"));
    const overTime = await getTotalOverTimeUseCase(
      dateRange,
      () => Promise.resolve(5.254),
      () => Promise.resolve(10)
    );
    expect(overTime).toBe(4.75);
  });
  describe("getTotalLoggedWorkHours tests", () => {
    it("should return all the logged working your of this year", async () => {
      const oneHourInSeconds = 3600;
      const testData: GrainOfSand[] = [
        fromPartial({
          duration: {
            inSeconds: oneHourInSeconds,
          },
        }),
        fromPartial({
          duration: {
            inSeconds: oneHourInSeconds,
          },
        }),
      ];
      const workingHours = await getTotalLoggedWorkHoursUseCase(undefined, {
        getAllGrainsOfSandUseCase: () => Promise.resolve(testData),
      });
      expect(workingHours).toBe(2);
    });
  });
  describe("getAllBillableHoursUseCase tests", () => {
    it("should return all grains of sand that are billable", async () => {
      const testData: GrainOfSand[] = [
        // Those are billable
        fromPartial({
          activity: fromPartial({
            name: "Aera",
          }),
        }),
        fromPartial({
          activity: fromPartial({
            name: "Aera",
          }),
        }),
        // Those are not billable
        fromPartial({
          activity: fromPartial({
            name: "Something else",
          }),
        }),
        fromPartial({
          activity: fromPartial({
            name: "Something else",
          }),
        }),
      ];
      const billableHours = await getAllBillableGrainsOfSandUseCase(undefined, {
        getAllGrainsOfSandUseCase: () => Promise.resolve(testData),
      });
      expect(billableHours).toHaveLength(2);
    });
  });
  describe("calculateBillablePercentageUseCase tests", () => {
    const billableHours: GrainOfSand[] = [
      fromPartial({
        duration: {
          inHours: 1,
          inSeconds: 3600,
        },
        activity: fromPartial({
          name: "Aera",
        }),
      }),
      fromPartial({
        duration: {
          inHours: 2,
          inSeconds: 7200,
        },
        activity: fromPartial({
          name: "Aera",
        }),
      }),
    ];

    it("should return the percentage of billable hours", async () => {
      const percentage = await calculateBillablePercentageUseCase(
        undefined,
        undefined,
        {
          getAllBillableGrainsOfSandUseCase: () =>
            Promise.resolve(billableHours),
          getTotalLoggedWorkHoursUseCase: () => Promise.resolve(6),
          getTotalLoggedHolidayHoursUseCase: () => Promise.resolve(0),
        }
      );
      expect(percentage).toBe(50);
    });
    it("should return 0 if there are no billable hours", async () => {
      const percentage = await calculateBillablePercentageUseCase(
        undefined,
        undefined,
        {
          getAllBillableGrainsOfSandUseCase: () => Promise.resolve([]),
          getTotalLoggedWorkHoursUseCase: () => Promise.resolve(3),
          getTotalLoggedHolidayHoursUseCase: () => Promise.resolve(0),
        }
      );
      expect(percentage).toBe(0);
    });
    // This is a real world example
    xit("should call the real one", async () => {
      const percentage = await calculateBillablePercentageUseCase();
      expect(percentage).toBe(76.77);
    });
  });
});
