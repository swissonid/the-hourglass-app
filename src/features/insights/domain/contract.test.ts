import {
  calculateHolidayDaysPer,
  calculateMonthProgress,
  createContract,
  savedContractSchema,
} from "./contract";

describe("Contract test", () => {
  describe("calculateMonthProgress", () => {
    it("should calculate month progress of the first day", () => {
      const date = new Date("2023-01-01");
      expect(calculateMonthProgress(date)).toEqual(0.03);
    });

    it("should calculate month progress of the 25th day", () => {
      const date = new Date("2023-01-25");
      expect(calculateMonthProgress(date)).toEqual(0.81);
    });

    it("should calculate month progress of the first day", () => {
      const date = new Date("2023-01-31");
      expect(calculateMonthProgress(date)).toEqual(1);
    });
  });
  xit("should calculate holiday days", () => {
    const contract = savedContractSchema.parse({
      id: "123",
      startDate: new Date("2023-01-01"),
      holidaysBy100: 25,
      hoursPerWeek: 42.5,
      jobPercentage: 1,
    });
    const date = new Date("2023-01-31");
    expect(calculateHolidayDaysPer(contract, date)).toEqual(2.08);
  });

  describe("createContract", () => {
    it("should create a contract with default values", () => {
      const contract = createContract({
        startDate: new Date("2023-01-01"),
      });
      expect(contract).toEqual({
        startDate: new Date("2023-01-01"),
        holidaysByFullEmployment: 25,
        holidayPerMonth: 2.08,
        hoursPerWeek: 42.5,
        jobPercentage: 1,
      });
    });
  });
  describe("calculateHolidayDaysPer", () => {
    it("should calculate holiday days", () => {
      /*const contract = createContract({ startDate: new Date("2023-02-01") });
      const contract;*/
    });
  });
});
