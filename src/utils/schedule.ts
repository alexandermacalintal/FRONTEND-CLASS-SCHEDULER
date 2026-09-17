
import type { Schedule, SectionId } from "../types";

export function meetingKey(sectionId: SectionId, meeting: Schedule): string {
  return `${sectionId}-${meeting.day}-${meeting.startTime}`;
}

export interface ScheduleRange {
  startHour: number;
  endHour: number;
}

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function getDurationMinutes(startTime: string, endTime: string): number {
  return timeToMinutes(endTime) - timeToMinutes(startTime);
}

export function getRangeMinutes(range: ScheduleRange): number {
  return (range.endHour - range.startHour) * 60;
}

export function getVerticalPosition(
  startTime: string,
  range: ScheduleRange,
): number {
  const minutesIntoRange = timeToMinutes(startTime) - range.startHour * 60;
  return (minutesIntoRange / getRangeMinutes(range)) * 100;
}

export function getBlockHeight(
  startTime: string,
  endTime: string,
  range: ScheduleRange,
): number {
  return (getDurationMinutes(startTime, endTime) / getRangeMinutes(range)) * 100;
}
