import type { DayOfWeek } from "./day";

export type Time = string;

export interface Schedule {
  day: DayOfWeek;
  startTime: Time;
  endTime: Time;
}
