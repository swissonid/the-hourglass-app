import { getAllGrainsOfSand } from "./grain-of-sand.repository";
import { createDateRangeFromUntilTodayOrTo } from "./use-cases";

describe("GrainOfSandRepository test", () => {
  describe("getGrainOfSand", () => {
    xit("should return a grain of sand", async () => {
      const dataRange = createDateRangeFromUntilTodayOrTo(
        new Date("2023-02-01")
      );
      const sand = await getAllGrainsOfSand(dataRange);
      expect(sand).toHaveLength(114);
    });
  });
});
