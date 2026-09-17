import type { Course, SelectedSection } from "../types";
import { resolveSelections } from "./selection";

export interface ScheduleSummary {
  courseCount: number;
  totalUnits: number;
  sectionCount: number;
}

export function getScheduleSummary(
  selectedSections: readonly SelectedSection[],
  courses: readonly Course[],
): ScheduleSummary {
  const resolved = resolveSelections(selectedSections, courses);

  const selectedCourses = new Map(
    resolved.map(({ course }) => [course.id, course]),
  );

  const totalUnits = Array.from(selectedCourses.values()).reduce(
    (sum, course) => sum + course.units,
    0,
  );

  return {
    courseCount: selectedCourses.size,
    totalUnits,
    sectionCount: resolved.length,
  };
}
