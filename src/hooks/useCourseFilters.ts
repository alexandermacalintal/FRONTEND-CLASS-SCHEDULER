import { useCallback, useMemo, useState } from "react";
import type { Course } from "../types";
import {
  DEFAULT_COURSE_FILTERS,
  getVisibleCourses,
  type UnitFilter,
} from "../utils/courseFilters";

export interface UseCourseFiltersResult {
  query: string;
  setQuery: (query: string) => void;
  unitFilter: UnitFilter;
  setUnitFilter: (unitFilter: UnitFilter) => void;
  visibleCourses: readonly Course[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

export function useCourseFilters(
  courses: readonly Course[],
): UseCourseFiltersResult {
  const [query, setQuery] = useState(DEFAULT_COURSE_FILTERS.query);
  const [unitFilter, setUnitFilter] = useState<UnitFilter>(
    DEFAULT_COURSE_FILTERS.unitFilter,
  );

  const visibleCourses = useMemo(
    () => getVisibleCourses(courses, { query, unitFilter }),
    [courses, query, unitFilter],
  );

  const hasActiveFilters =
    query.trim() !== DEFAULT_COURSE_FILTERS.query ||
    unitFilter !== DEFAULT_COURSE_FILTERS.unitFilter;

  const clearFilters = useCallback(() => {
    setQuery(DEFAULT_COURSE_FILTERS.query);
    setUnitFilter(DEFAULT_COURSE_FILTERS.unitFilter);
  }, []);

  return {
    query,
    setQuery,
    unitFilter,
    setUnitFilter,
    visibleCourses,
    hasActiveFilters,
    clearFilters,
  };
}
