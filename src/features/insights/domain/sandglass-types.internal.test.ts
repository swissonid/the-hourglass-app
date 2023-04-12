import {
  activitySchema,
  durationSchema,
  grainOfSandSchema,
} from "./sandglass-types.internal";

/*
 {
      "id": "70597974",
      "creator": "158555",
      "activity": {
        "id": "1601221",
        "name": "Test Project",
        "color": "#ff5c00",
        "integration": "zei",
        "spaceId": "157817"
      },
      "duration": {
        "startedAt": "2023-02-02T14:00:00.000",
        "stoppedAt": "2023-02-02T15:00:00.000"
      },
      "note": {
        "text": "Weekly meeting",
        "tags": [],
        "mentions": []
      }
    },
 */
describe("SandglassTypes", () => {
  describe("Duration schema", () => {
    it("should parse a valid duration", () => {
      const result = durationSchema.parse({
        startedAt: new Date("2023-03-02T16:00:00.000"),
        stoppedAt: new Date("2023-03-02T17:00:00.000"),
      });
      expect(result.inSeconds).toBe(3600);
      expect(result.inMinutes).toBe(60);
      expect(result.inHours).toBe(1);
    });
    it("should throw an error if startedAt is after stoppedAt", () => {
      expect(() =>
        durationSchema.parse({
          startedAt: new Date("2023-03-02T17:00:00.000"),
          stoppedAt: new Date("2023-03-02T16:00:00.000Z"),
        })
      ).toThrow();
    });
  });
  describe("Activity schema", () => {
    it("should parse a valid activity", () => {
      const result = activitySchema.parse({
        id: "1601221",
        name: "Test Project",
        color: "#ff5c00",
        integration: "zei",
        spaceId: "157817",
      });
      expect(result).toEqual({
        id: "1601221",
        name: "Test Project",
        color: "#ff5c00",
      });
    });
  });
  describe("GrainOfSand schema", () => {
    it("should parse a valid GrainOfSand", () => {
      const result = grainOfSandSchema.parse({
        id: "70597974",
        creator: "158555",
        activity: {
          id: "1601221",
          name: "Test Project",
          color: "#ff5c00",
          integration: "zei",
          spaceId: "157817",
        },
        duration: {
          startedAt: "2023-02-02T14:00:00.000",
          stoppedAt: "2023-02-02T15:00:00.000",
        },
        note: {
          text: "Weekly meeting",
          tags: [],
          mentions: [],
        },
      });

      expect(result).toEqual({
        id: "70597974",
        creator: "158555",
        activity: {
          id: "1601221",
          name: "Test Project",
          color: "#ff5c00",
        },
        duration: {
          startedAt: new Date("2023-02-02T14:00:00.000"),
          stoppedAt: new Date("2023-02-02T15:00:00.000"),
          inSeconds: 3600,
          inMinutes: 60,
          inHours: 1,
        },
      });
    });
  });
});
