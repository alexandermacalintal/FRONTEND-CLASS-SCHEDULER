import { useCallback, useMemo, useState } from "react";
import type { CourseId, SectionId, SelectedSection } from "../types";

export interface UseScheduleResult {
  selectedSections: readonly SelectedSection[];
  removeSection: (sectionId: SectionId) => void;
  isSectionSelected: (sectionId: SectionId) => boolean;
  replaceSection: (courseId: CourseId, sectionId: SectionId) => void;
}

export function useSchedule(): UseScheduleResult {
  const [selectedSections, setSelectedSections] = useState<SelectedSection[]>(
    [],
  );

  const selectedSectionIds = useMemo(
    () => new Set(selectedSections.map((selection) => selection.sectionId)),
    [selectedSections],
  );

  const removeSection = useCallback((sectionId: SectionId) => {
    setSelectedSections((prev) => {
      const next = prev.filter(
        (selection) => selection.sectionId !== sectionId,
      );
      return next.length === prev.length ? prev : next;
    });
  }, []);

  const replaceSection = useCallback(
    (courseId: CourseId, sectionId: SectionId) => {
      setSelectedSections((prev) => {
        const existingIndex = prev.findIndex(
          (selection) => selection.courseId === courseId,
        );

        if (existingIndex === -1) {
          const alreadySelected = prev.some(
            (selection) => selection.sectionId === sectionId,
          );
          return alreadySelected ? prev : [...prev, { courseId, sectionId }];
        }

        if (prev[existingIndex].sectionId === sectionId) return prev;

        const next = [...prev];
        next[existingIndex] = { courseId, sectionId };
        return next;
      });
    },
    [],
  );

  const isSectionSelected = useCallback(
    (sectionId: SectionId) => selectedSectionIds.has(sectionId),
    [selectedSectionIds],
  );

  return {
    selectedSections,
    removeSection,
    isSectionSelected,
    replaceSection,
  };
}
