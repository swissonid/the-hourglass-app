import { z } from "zod";

export const durationSchema = z
  .object({
    startedAt: z.coerce.date(),
    stoppedAt: z.coerce.date(),
    inSeconds: z.number().nonnegative().default(0),
    inMinutes: z.number().nonnegative().default(0),
    inHours: z.number().nonnegative().default(0),
  })
  .refine((value) => value.startedAt < value.stoppedAt, {
    message: "startedAt must be before stoppedAt",
    path: ["stoppedAt", "startedAt"],
  })
  .transform((value) => {
    value.inSeconds =
      (value.stoppedAt.getTime() - value.startedAt.getTime()) / 1000;
    value.inMinutes = value.inSeconds / 60;
    value.inHours = value.inMinutes / 60;
    return value;
  });

export type Duration = z.infer<typeof durationSchema>;

export const activitySchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export const grainOfSandSchema = z.object({
  id: z.string(),
  creator: z.string(),
  activity: activitySchema,
  duration: durationSchema,
});

export type GrainOfSand = z.infer<typeof grainOfSandSchema>;
export function parseGrainOfSand(grainOfSand: unknown): GrainOfSand {
  return grainOfSandSchema.parse(grainOfSand);
}

export const dateRangeSchema = z
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  })
  .refine((value) => value.from < value.to, {
    message: "from must be before to",
    path: ["from", "to"],
  });

export type DateRange = z.infer<typeof dateRangeSchema>;
export function parseDateRange(dateRange: unknown): DateRange {
  return dateRangeSchema.parse(dateRange);
}

export function getDaysBetween(dateRange: DateRange): Date[] {
  const internalDateRange = parseDateRange(dateRange);
  const days: Date[] = [];
  const currentDate = internalDateRange.from;
  while (currentDate <= internalDateRange.to) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return days;
}

export const holidaySchema = z.object({
  description: z.string(),
  date: z.coerce.date(),
  percentageOfAreFree: z.number().min(0).max(1).default(1),
});

export type Holiday = z.infer<typeof holidaySchema>;

export function parseHoliday(holiday: unknown): Holiday {
  return holidaySchema.parse(holiday);
}
