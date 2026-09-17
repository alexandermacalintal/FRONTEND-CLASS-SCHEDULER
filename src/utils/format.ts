import type { Schedule, Time } from "../types";


export function pluralize(
  count: number,
  singular: string,
  plural: string = `${singular}s`,
): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function formatTimeRange(startTime: Time, endTime: Time): string {
  return `${startTime}–${endTime}`;
}

export function formatMeeting(meeting: Schedule): string {
  return `${meeting.day} ${formatTimeRange(meeting.startTime, meeting.endTime)}`;
}

export function formatHourLabel(hour: number): string {
  const period = hour < 12 ? "AM" : "PM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:00 ${period}`;
}
