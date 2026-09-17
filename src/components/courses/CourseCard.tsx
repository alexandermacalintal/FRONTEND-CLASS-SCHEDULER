import { memo } from "react";
import type { Course, CourseId } from "../../types";
import { pluralize } from "../../utils/format";
import "./courses.css";

interface CourseCardProps {
  course: Course;
  isExpanded: boolean;
  onViewSections: (courseId: CourseId) => void;
  sectionsRegionId: string;
}

function CourseCardComponent({
  course,
  isExpanded,
  onViewSections,
  sectionsRegionId,
}: CourseCardProps) {
  const { id, code, title, units, sections } = course;

  return (
    <article className="course-card" aria-labelledby={`course-${id}`}>
      <header className="course-card__header">
        <h3 className="course-card__code" id={`course-${id}`}>
          {code}
        </h3>
        <p className="course-card__title">{title}</p>
      </header>

      <dl className="course-card__meta">
        <div className="course-card__meta-item">
          <dt className="visually-hidden">Units</dt>
          <dd className="course-card__meta-value">
            {pluralize(units, "Unit")}
          </dd>
        </div>
        <div className="course-card__meta-item">
          <dt className="visually-hidden">Sections</dt>
          <dd className="course-card__meta-value">
            {pluralize(sections.length, "Section")}
          </dd>
        </div>
      </dl>

      <button
        type="button"
        className="course-card__action"
        aria-expanded={isExpanded}
        aria-controls={isExpanded ? sectionsRegionId : undefined}
        onClick={() => onViewSections(id)}
      >
        {isExpanded ? "Hide Sections" : "View Sections"}
        <span className="visually-hidden"> for {code}</span>
      </button>
    </article>
  );
}

export const CourseCard = memo(CourseCardComponent);
