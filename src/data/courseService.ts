import type { Course } from "../types";
import { courses } from "./courses";


export interface FetchCoursesOptions {
  signal?: AbortSignal;
}

export class CourseLoadError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "CourseLoadError";
  }
}

export async function fetchCourses(
  options: FetchCoursesOptions = {},
): Promise<Course[]> {
  const { signal } = options;

  if (signal?.aborted) {
    throw new DOMException("Course load aborted", "AbortError");
  }


  return courses;
}
