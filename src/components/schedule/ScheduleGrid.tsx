import { memo } from "react";
import type { Course, CourseId, SectionId, SelectedSection } from "../../types";
import { DAYS_OF_WEEK } from "../../types";
import { formatHourLabel } from "../../utils/format";
import { getBlockHeight, getVerticalPosition } from "../../utils/schedule";
import {
  DAY_COLUMN,
  FIRST_SLOT_ROW,
  SCHEDULE_RANGE,
  SLOTS_PER_HOUR,
  TOTAL_SLOTS,
  VISIBLE_HOURS,
  resolveScheduleBlocks,
} from "../../utils/scheduleGrid";
import { EmptyState } from "../ui/EmptyState";
import { ScheduleClass } from "./ScheduleClass";
import "./schedule.css";

interface ScheduleGridProps {
  courses: readonly Course[];
  selectedSections: readonly SelectedSection[];
  onRemoveSection?: (courseId: CourseId, sectionId: SectionId) => void;
}

function ScheduleGridComponent({
  courses,
  selectedSections,
  onRemoveSection,
}: ScheduleGridProps) {
  const blocks = resolveScheduleBlocks(selectedSections, courses);

  return (
    <>
      <p className="schedule-grid__hint" aria-hidden="true">
        Scroll sideways to see the rest of the week.
      </p>

      <div
        className="schedule-grid__scroll"
        role="region"
        aria-label="Weekly timetable"
        tabIndex={0}
      >
        <div
          className="schedule-grid"
          style={{
            gridTemplateRows: `auto repeat(${TOTAL_SLOTS}, minmax(2.25rem, 1fr))`,
          }}
        >
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="schedule-grid__day-header"
              style={{ gridColumn: DAY_COLUMN[day], gridRow: 1 }}
              aria-hidden="true"
            >
              {day}
            </div>
          ))}

          {VISIBLE_HOURS.map((hour, index) => {
            const row = FIRST_SLOT_ROW + index * SLOTS_PER_HOUR;
            return (
              <div
                key={`line-${hour}`}
                className="schedule-grid__hour-line"
                style={{ gridColumn: "1 / -1", gridRow: row }}
                aria-hidden="true"
              />
            );
          })}
          {VISIBLE_HOURS.map((hour, index) => {
            const row = FIRST_SLOT_ROW + index * SLOTS_PER_HOUR;
            return (
              <div
                key={`label-${hour}`}
                className="schedule-grid__time-label"
                style={{ gridColumn: 1, gridRow: row }}
                aria-hidden="true"
              >
                {formatHourLabel(hour)}
              </div>
            );
          })}

          {DAYS_OF_WEEK.map((day) => (
            <div
              key={`column-${day}`}
              className="schedule-grid__day-column"
              style={{
                gridColumn: DAY_COLUMN[day],
                gridRow: `${FIRST_SLOT_ROW} / ${FIRST_SLOT_ROW + TOTAL_SLOTS}`,
              }}
              aria-hidden="true"
            />
          ))}

          {blocks.length === 0 && (
            <div
              className="schedule-grid__empty"
              style={{
                gridColumn: "2 / -1",
                gridRow: `${FIRST_SLOT_ROW} / ${FIRST_SLOT_ROW + TOTAL_SLOTS}`,
              }}
            >
              <EmptyState
                title="Your schedule is empty"
                description="Select a section to start building your schedule."
                className="empty-state--plain"
              />
            </div>
          )}

          {blocks.map((block) => (
            <div
              key={block.key}
              className="schedule-grid__block-layer"
              style={{
                gridColumn: DAY_COLUMN[block.day],
                gridRow: `${FIRST_SLOT_ROW} / ${FIRST_SLOT_ROW + TOTAL_SLOTS}`,
              }}
            >
              <ScheduleClass
                courseCode={block.courseCode}
                day={block.day}
                section={block.sectionLabel}
                room={block.room}
                startTime={block.startTime}
                endTime={block.endTime}
                onRemove={
                  onRemoveSection
                    ? () => onRemoveSection(block.courseId, block.sectionId)
                    : undefined
                }
                style={{
                  position: "absolute",
                  top: `${getVerticalPosition(block.startTime, SCHEDULE_RANGE)}%`,
                  height: `${getBlockHeight(
                    block.startTime,
                    block.endTime,
                    SCHEDULE_RANGE,
                  )}%`,
                  left: 0,
                  right: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const ScheduleGrid = memo(ScheduleGridComponent);
