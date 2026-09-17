import type { Course } from "../types";
import { filterCourses } from "./courseSearch";

export type UnitFilter = "all" | 2 | 3 | 4;

export const UNIT_FILTER_OPTIONS: ReadonlyArray<{
  value: UnitFilter;
  label: string;
}> = [
  { value: "all", label: "All" },
  { value: 2, label: "2 Units" },
  { value: 3, label: "3 Units" },
  { value: 4, label: "4 Units" },
];

export interface CourseFilterState {
  query: string;
  unitFilter: UnitFilter;
}

export const DEFAULT_COURSE_FILTERS: CourseFilterState = {
  query: "",
  unitFilter: "all",
};

function filterByUnits(
  courses: readonly Course[],
  unitFilter: UnitFilter,
): readonly Course[] {
  if (unitFilter === "all") {
    return courses;
  }

  return courses.filter((course) => course.units === unitFilter);
}

export function getVisibleCourses(
  courses: readonly Course[],
  filters: CourseFilterState,
): readonly Course[] {
  const searchedCourses = filterCourses(courses, filters.query);
  return filterByUnits(searchedCourses, filters.unitFilter);
}
