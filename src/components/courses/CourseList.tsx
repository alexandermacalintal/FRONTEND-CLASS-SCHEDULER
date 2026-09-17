import { useCallback, useState } from "react";
import type { Course, CourseId, SectionId } from "../../types";
import { EmptyState } from "../ui/EmptyState";
import { CourseCard } from "./CourseCard";
import { SectionList } from "./SectionList";
import "./courses.css";

interface CourseListProps {
  courses: readonly Course[];
  onSelectSection: (courseId: CourseId, sectionId: SectionId) => void;
  isSectionSelected: (sectionId: SectionId) => boolean;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
}

function sectionsRegionId(courseId: CourseId): string {
  return `sections-${courseId}`;
}

export function CourseList({
  courses,
  onSelectSection,
  isSectionSelected,
  hasActiveFilters = false,
  onClearFilters,
}: CourseListProps) {
  const [expandedCourseId, setExpandedCourseId] = useState<CourseId | null>(
    null,
  );

  const handleViewSections = useCallback((courseId: CourseId) => {
    setExpandedCourseId((current) => (current === courseId ? null : courseId));
  }, []);

  if (courses.length === 0) {
    return hasActiveFilters ? (
      <EmptyState
        title="No courses found"
        description="Try a different search term or filter."
        action={
          onClearFilters && (
            <button
              type="button"
              className="empty-state__button"
              onClick={onClearFilters}
            >
              Clear filters
            </button>
          )
        }
      />
    ) : (
      <EmptyState
        title="No courses available"
        description="There are no courses in the catalog right now."
      />
    );
  }

  return (
    <ul className="course-list">
      {courses.map((course) => {
        const isExpanded = course.id === expandedCourseId;

        return (
          <li key={course.id}>
            <CourseCard
              course={course}
              isExpanded={isExpanded}
              onViewSections={handleViewSections}
              sectionsRegionId={sectionsRegionId(course.id)}
            />

            {isExpanded && (
              <div
                className="course-sections"
                id={sectionsRegionId(course.id)}
                role="region"
                aria-label={`Sections for ${course.code}`}
              >
                <SectionList
                  course={course}
                  onSelectSection={onSelectSection}
                  isSectionSelected={isSectionSelected}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
