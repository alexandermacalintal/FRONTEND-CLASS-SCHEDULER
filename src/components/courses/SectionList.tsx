import { memo } from "react";
import type { Course, CourseId, SectionId } from "../../types";
import { formatMeeting } from "../../utils/format";
import { meetingKey } from "../../utils/schedule";
import "./courses.css";

interface SectionListProps {
  course: Course;
  onSelectSection: (courseId: CourseId, sectionId: SectionId) => void;
  isSectionSelected: (sectionId: SectionId) => boolean;
}

function SectionListComponent({
  course,
  onSelectSection,
  isSectionSelected,
}: SectionListProps) {
  if (course.sections.length === 0) {
    return (
      <p className="section-list__empty">
        No sections are currently offered for this course.
      </p>
    );
  }

  const selectedSection = course.sections.find((section) =>
    isSectionSelected(section.id),
  );

  return (
    <>
      <p className="section-list__status">
        {selectedSection
          ? `Currently selected: ${selectedSection.section}`
          : "No section selected yet."}
      </p>

      <ul className="section-list">
        {course.sections.map((section) => {
          const isSelected = section.id === selectedSection?.id;
          const isSwitch = Boolean(selectedSection) && !isSelected;

          return (
            <li
              className={
                isSelected
                  ? "section-card section-card--selected"
                  : "section-card"
              }
              key={section.id}
            >
              <h4 className="section-card__heading">
                {course.code} — {section.section}
              </h4>

              <p className="section-card__detail">{section.instructor}</p>
              <p className="section-card__detail">{section.room}</p>

              <ul className="section-card__schedule">
                {section.schedule.map((entry) => (
                  <li
                    className="section-card__schedule-entry"
                    key={meetingKey(section.id, entry)}
                  >
                    {formatMeeting(entry)}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={
                  isSelected
                    ? "section-card__action section-card__action--selected"
                    : "section-card__action"
                }
                aria-disabled={isSelected}
                onClick={() => {
                  if (isSelected) return;
                  onSelectSection(course.id, section.id);
                }}
              >
                {isSelected
                  ? "\u2713 Added"
                  : isSwitch
                    ? "Switch to This Section"
                    : "Add to Schedule"}
                <span className="visually-hidden">
                  : {course.code} section {section.section}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export const SectionList = memo(SectionListComponent);
