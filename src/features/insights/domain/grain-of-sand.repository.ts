import {
  DateRange,
  GrainOfSand,
  grainOfSandSchema,
} from "./sandglass-types.internal";
import { TimeEntry } from "@/features/timular-client/timeular-types.internal";
import { TimeTracking } from "@/features/timular-client/timular-client";

function mapTimeEntryToGrainOfSand(timeEntry: TimeEntry): GrainOfSand {
  return grainOfSandSchema.parse({
    id: timeEntry.id,
    creator: timeEntry.creator,
    activity: timeEntry.activity,
    duration: {
      startedAt: timeEntry.duration.startedAt,
      stoppedAt: timeEntry.duration.stoppedAt,
    },
  });
}
async function getAllGrainsOfSandTimeular(
  dateRange: DateRange,
  getAllTimeEntries = TimeTracking.Reports.allDataAsJson
): Promise<GrainOfSand[]> {
  const timeEntries = await getAllTimeEntries(dateRange.from, dateRange.to);
  return timeEntries.map(mapTimeEntryToGrainOfSand);
}

export async function getAllGrainsOfSand(
  dateRange: DateRange
): Promise<GrainOfSand[]> {
  return getAllGrainsOfSandTimeular(dateRange);
}
