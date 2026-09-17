import type { ScheduleSummary as ScheduleSummaryCounts } from "../../utils/scheduleSummary";
import { pluralize } from "../../utils/format";
import "./schedule.css";

export type ScheduleSummaryProps = ScheduleSummaryCounts;

export function ScheduleSummary({
  courseCount,
  totalUnits,
  sectionCount,
}: ScheduleSummaryProps) {
  return (
    <dl className="schedule-summary">
      <div className="schedule-summary__stat">
        <dt className="visually-hidden">Courses selected</dt>
        <dd className="schedule-summary__value">
          {pluralize(courseCount, "Course")}
        </dd>
      </div>
      <div className="schedule-summary__stat">
        <dt className="visually-hidden">Total units</dt>
        <dd className="schedule-summary__value">
          {pluralize(totalUnits, "Unit")}
        </dd>
      </div>
      <div className="schedule-summary__stat">
        <dt className="visually-hidden">Classes selected</dt>
        <dd className="schedule-summary__value">
          {pluralize(sectionCount, "Class", "Classes")}
        </dd>
      </div>
    </dl>
  );
}
