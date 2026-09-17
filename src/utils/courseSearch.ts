import type { Course } from "../types";

export function filterCourses(
  courses: readonly Course[],
  query: string,
): readonly Course[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === "") {
    return courses;
  }

  return courses.filter((course) => {
    const code = course.code.toLowerCase();
    const title = course.title.toLowerCase();
    return code.includes(normalizedQuery) || title.includes(normalizedQuery);
  });
}
