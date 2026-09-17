import { DAYS_OF_WEEK } from "../types";
import type {
  Course,
  CourseId,
  DayOfWeek,
  SectionId,
  SelectedSection,
  Time,
} from "../types";
import { meetingKey } from "./schedule";
import type { ScheduleRange } from "./schedule";
import { resolveSelections } from "./selection";


export const SCHEDULE_RANGE: ScheduleRange = { startHour: 7, endHour: 18 };

const SLOT_MINUTES = 30;

export const SLOTS_PER_HOUR = 60 / SLOT_MINUTES;

export const TOTAL_SLOTS =
  (SCHEDULE_RANGE.endHour - SCHEDULE_RANGE.startHour) * SLOTS_PER_HOUR;

export const FIRST_SLOT_ROW = 2;

export const VISIBLE_HOURS: readonly number[] = Array.from(
  { length: SCHEDULE_RANGE.endHour - SCHEDULE_RANGE.startHour + 1 },
  (_, index) => SCHEDULE_RANGE.startHour + index,
);

export const DAY_COLUMN: Record<DayOfWeek, number> = Object.fromEntries(
  DAYS_OF_WEEK.map((day, index) => [day, index + 2]),
) as Record<DayOfWeek, number>;

export interface ScheduleBlock {
  key: string;
  day: DayOfWeek;
  startTime: Time;
  endTime: Time;
  courseId: CourseId;
  sectionId: SectionId;
  courseCode: string;
  sectionLabel: string;
  room: string;
}

export function resolveScheduleBlocks(
  selectedSections: readonly SelectedSection[],
  courses: readonly Course[],
): ScheduleBlock[] {
  const blocks = resolveSelections(selectedSections, courses).flatMap(
    ({ course, section }) =>
      section.schedule.map((meeting) => ({
        key: meetingKey(section.id, meeting),
        day: meeting.day,
        startTime: meeting.startTime,
        endTime: meeting.endTime,
        courseId: course.id,
        sectionId: section.id,
        courseCode: course.code,
        sectionLabel: section.section,
        room: section.room,
      })),
  );

  return blocks.sort(
    (a, b) =>
      DAY_COLUMN[a.day] - DAY_COLUMN[b.day] ||
      a.startTime.localeCompare(b.startTime),
  );
}
