import { useCallback, useMemo } from "react";
import { CourseFilters } from "./components/courses/CourseFilters";
import { CourseList } from "./components/courses/CourseList";
import { CourseSearch } from "./components/courses/CourseSearch";
import { Header } from "./components/layout/Header";
import { MainLayout } from "./components/layout/MainLayout";
import { ScheduleGrid } from "./components/schedule/ScheduleGrid";
import { ScheduleSummary } from "./components/schedule/ScheduleSummary";
import { EmptyState } from "./components/ui/EmptyState";
import { useToast } from "./components/ui/ToastProvider";
import { useCourseFilters } from "./hooks/useCourseFilters";
import { useCourses } from "./hooks/useCourses";
import { useSchedule } from "./hooks/useSchedule";
import type { CourseId, SectionId } from "./types";
import { describeSelection } from "./utils/selection";
import { getScheduleSummary } from "./utils/scheduleSummary";

function App() {
  const {
    courses,
    status: coursesStatus,
    isEmpty: catalogIsEmpty,
    reload: reloadCourses,
  } = useCourses();

  const {
    selectedSections,
    replaceSection,
    removeSection,
    isSectionSelected,
  } = useSchedule();

  const { showToast } = useToast();

  const handleSelectSection = useCallback(
    (courseId: CourseId, sectionId: SectionId) => {
      const previousSelection = selectedSections.find(
        (selection) => selection.courseId === courseId,
      );
      const isChange = Boolean(
        previousSelection && previousSelection.sectionId !== sectionId,
      );

      replaceSection(courseId, sectionId);

      const description = describeSelection(courses, courseId, sectionId);
      if (!description) return;
      showToast(
        isChange ? `Changed to ${description}` : `Added ${description}`,
        isChange ? "changed" : "added",
      );
    },
    [courses, selectedSections, replaceSection, showToast],
  );

  const handleRemoveSection = useCallback(
    (courseId: CourseId, sectionId: SectionId) => {
      removeSection(sectionId);

      const description = describeSelection(courses, courseId, sectionId);
      showToast(
        description ? `Removed ${description}` : "Removed from schedule",
        "removed",
      );
    },
    [courses, removeSection, showToast],
  );

  const {
    query,
    setQuery,
    unitFilter,
    setUnitFilter,
    visibleCourses,
    hasActiveFilters,
    clearFilters,
  } = useCourseFilters(courses);

  const summary = useMemo(
    () => getScheduleSummary(selectedSections, courses),
    [selectedSections, courses],
  );

  function renderCoursesPanel() {
    if (coursesStatus === "loading") {
      return <EmptyState title="Loading courses..." />;
    }

    if (coursesStatus === "error") {
      return (
        <EmptyState
          title="Unable to load courses."
          description="Something went wrong while loading the catalog."
          role="alert"
          action={
            <button
              type="button"
              className="empty-state__button"
              onClick={reloadCourses}
            >
              Try Again
            </button>
          }
        />
      );
    }

    if (catalogIsEmpty) {
      return <EmptyState title="No courses available." />;
    }

    return (
      <>
        <CourseSearch value={query} onChange={setQuery} />
        <CourseFilters
          unitFilter={unitFilter}
          onUnitFilterChange={setUnitFilter}
        />
        <CourseList
          courses={visibleCourses}
          onSelectSection={handleSelectSection}
          isSectionSelected={isSectionSelected}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      </>
    );
  }

  return (
    <div className="app-shell">
      <Header />
      <MainLayout
        coursesPanel={
          <>
            <h2 className="panel-heading">Available Courses</h2>
            {renderCoursesPanel()}
          </>
        }
        schedulePanel={
          <>
            <h2 className="panel-heading">My Schedule</h2>
            <ScheduleSummary {...summary} />
            <ScheduleGrid
              courses={courses}
              selectedSections={selectedSections}
              onRemoveSection={handleRemoveSection}
            />
          </>
        }
      />
    </div>
  );
}

export default App;
