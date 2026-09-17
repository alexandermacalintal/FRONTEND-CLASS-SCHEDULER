import type { CourseId } from "./course";
import type { SectionId } from "./section";

export interface SelectedSection {
  courseId: CourseId;
  sectionId: SectionId;
}
