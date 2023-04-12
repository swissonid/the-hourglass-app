// TODO https://www.ferienwiki.ch/feiertage/2023/ch

import { Holiday } from "./sandglass-types.internal";

export const ZurichHolidays: Holiday[] = [
  {
    date: new Date("2023-01-02"),
    description: "Berchtoldstag",
    percentageOfAreFree: 1,
  },
  {
    date: new Date("2023-04-07"),
    description: "Karfreitag",
    percentageOfAreFree: 1,
  },
  {
    date: new Date("2023-04-10"),
    description: "Ostermontag",
    percentageOfAreFree: 1,
  },
  {
    date: new Date("2023-04-14"),
    description: "Sechseläuten",
    percentageOfAreFree: 0.5,
  },
  {
    date: new Date("2023-05-01"),
    description: "Tag der Arbeit",
    percentageOfAreFree: 1,
  },
  {
    date: new Date("2023-05-18"),
    description: "Auffahrt",
    percentageOfAreFree: 1,
  },
  {
    date: new Date("2023-05-29"),
    description: "Pfingstmontag",
    percentageOfAreFree: 1,
  },
  {
    date: new Date("2023-08-01"),
    description: "Nationalfeiertag",
    percentageOfAreFree: 1,
  },
  {
    date: new Date("2023-09-11"),
    description: "Knabenschiessen",
    percentageOfAreFree: 0.5,
  },
  {
    date: new Date("2023-12-25"),
    description: "Weihnachten",
    percentageOfAreFree: 1,
  },
  {
    date: new Date("2023-12-26"),
    description: "Stephanstag",
    percentageOfAreFree: 1,
  },
];

export async function getAllHolidays(): Promise<Holiday[]> {
  return ZurichHolidays;
}

export async function getAmountOfPersonalHolidays(): Promise<number> {
  return 25;
}
