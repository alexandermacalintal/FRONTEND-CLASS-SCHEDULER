import type {
  Course,
  CourseId,
  SectionId,
  SelectedSection,
  Section,
} from "../types";

export interface ResolvedSelection {
  course: Course;
  section: Section;
}

export function resolveSelections(
  selectedSections: readonly SelectedSection[],
  courses: readonly Course[],
): ResolvedSelection[] {
  return selectedSections.flatMap((selection) => {
    const course = courses.find((c) => c.id === selection.courseId);
    const section = course?.sections.find(
      (s) => s.id === selection.sectionId,
    );
    if (!course || !section) return [];

    return [{ course, section }];
  });
}

export function describeSelection(
  courses: readonly Course[],
  courseId: CourseId,
  sectionId: SectionId,
): string | null {
  const course = courses.find((candidate) => candidate.id === courseId);
  const section = course?.sections.find(
    (candidate) => candidate.id === sectionId,
  );
  if (!course || !section) return null;

  return `${course.code} — ${section.section}`;
}
