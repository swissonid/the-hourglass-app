import { Authentication, TimeTracking } from "./timular-client";

describe("TimeularClient", () => {
  describe("Authentication", () => {
    it("should return a valid response", async () => {
      const token = await Authentication.signInWithApiKeyAndSecret();
      expect(token).not.toBeNull();
    });
  });
  describe("TimeTracking", () => {
    describe("Reports", () => {
      it("should return all TimeEntries", async () => {
        const jsonData = await TimeTracking.Reports.allDataAsJson(
          new Date("2023-01-01")
        );
        expect(jsonData).toBeDefined();
        expect(jsonData).not.toBeNull();
      });
    });
  });
});
