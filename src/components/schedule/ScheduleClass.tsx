import type { CSSProperties } from "react";
import type { DayOfWeek, Time } from "../../types";
import { formatTimeRange } from "../../utils/format";

export interface ScheduleClassProps {
  courseCode: string;
  day: DayOfWeek;
  section: string;
  room: string;
  startTime: Time;
  endTime: Time;
  onRemove?: () => void;
  style?: CSSProperties;
}

export function ScheduleClass({
  courseCode,
  day,
  section,
  room,
  startTime,
  endTime,
  onRemove,
  style,
}: ScheduleClassProps) {
  return (
    <article className="schedule-class" style={style}>
      <p className="visually-hidden">
        {courseCode} section {section}, {day} {startTime} to {endTime}, room{" "}
        {room}
      </p>

      {onRemove && (
        <button
          type="button"
          className="schedule-class__remove"
          onClick={onRemove}
          aria-label={`Remove ${courseCode} section ${section} from your schedule`}
        >
          &times;
        </button>
      )}
      <p className="schedule-class__code" aria-hidden="true">{courseCode}</p>
      <p className="schedule-class__section" aria-hidden="true">{section}</p>
      <p className="schedule-class__room" aria-hidden="true">{room}</p>
      <p className="schedule-class__time" aria-hidden="true">
        {formatTimeRange(startTime, endTime)}
      </p>
    </article>
  );
}
