import type { Section } from "./section";

export type CourseId = string;

export interface Course {
  id: CourseId;
  code: string;
  title: string;
  units: number;
  sections: Section[];
}
