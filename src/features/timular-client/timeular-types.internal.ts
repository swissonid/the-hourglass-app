import { z } from "zod";

export const activitySchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  integration: z.string(),
  spaceId: z.string(),
});

export type Activity = z.infer<typeof activitySchema>;

export function parseActivity(activity: unknown): Activity {
  return activitySchema.parse(activity);
}

export const durationSchema = z.object({
  startedAt: z.string().transform((value) => new Date(value)),
  stoppedAt: z.string().transform((value) => new Date(value)),
});

export type Duration = z.infer<typeof durationSchema>;
export function parseDuration(duration: unknown): Duration {
  return durationSchema.parse(duration);
}

export const tagSchema = z.object({
  id: z.number(),
  key: z.string(),
  label: z.string(),
  scope: z.string(),
  spaceId: z.string(),
});

export type Tag = z.infer<typeof tagSchema>;
export function parseTag(tag: unknown): Tag {
  return tagSchema.parse(tag);
}

export const noteSchema = z.object({
  text: z.string().optional(),
  tags: z.array(tagSchema).default([]),
  mentions: z.array(z.unknown()),
});

export type Note = z.infer<typeof noteSchema>;
export function parseNote(note: unknown): Note {
  return noteSchema.parse(note);
}

export const timeEntrySchema = z.object({
  id: z.string(),
  creator: z.string(),
  activity: activitySchema,
  duration: durationSchema,
  note: noteSchema,
});

export type TimeEntry = z.infer<typeof timeEntrySchema>;
export function parseTimeEntry(timeEntry: unknown): TimeEntry {
  return timeEntrySchema.parse(timeEntry);
}
