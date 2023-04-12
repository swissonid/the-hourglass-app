import { WorkingHourCalender } from "./working-hours-calendar";
import { fromPartial } from "@total-typescript/mock-utils";
describe("WorkingHoursCalendar Test", () => {
  describe("constructor", () => {
    it("should create a new calender", () => {
      const calender = new WorkingHourCalender(
        fromPartial({
          nationalHolidays: [
            fromPartial({
              percentageOfAreFree: 1.0,
              description: "New Year's Day",
              date: new Date("2021-01-01"),
            }),
          ],
        })
      );
      expect(calender).toBeInstanceOf(WorkingHourCalender);
    });
  });
  describe("calculateMandatoryWorkingHours", () => {
    it("should calculate 0 if it's a national holiday", () => {
      const calender = new WorkingHourCalender();
      expect(
        calender.calculateMandatoryWorkingHours(new Date("2023-01-01"))
      ).toBe(0);
    });
    it("should calculate 0 if it's a weekend", () => {
      const calender = new WorkingHourCalender();
      expect(
        calender.calculateMandatoryWorkingHours(new Date("2023-03-04"))
      ).toBe(0);
    });
    it("should calculate 0 if it's a weekend", () => {
      const calender = new WorkingHourCalender();
      expect(
        calender.calculateMandatoryWorkingHours(new Date("2023-03-05"))
      ).toBe(0);
    });
    it("should calculate 8.4 if it's a working day", () => {
      const calender = new WorkingHourCalender();
      expect(
        calender.calculateMandatoryWorkingHours(new Date("2023-03-06"))
      ).toBe(8.4);
    });
    it("should calculate 42 for working week", () => {
      const calender = new WorkingHourCalender();
      const dateRange = {
        from: new Date("2023-03-06"),
        to: new Date("2023-03-12"),
      };
      expect(calender.calculateWorkingHours(dateRange)).toBe(42);
    });
    it("should calculate 193.2 for working month", () => {
      const calender = new WorkingHourCalender();
      const dateRange = {
        from: new Date("2023-03-01"),
        to: new Date("2023-03-31"),
      };
      expect(calender.calculateWorkingHours(dateRange)).toBe(193.2);
    });
  });
});
