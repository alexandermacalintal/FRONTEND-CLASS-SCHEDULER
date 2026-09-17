import { useCallback, useEffect, useState } from "react";
import { fetchCourses } from "../data/courseService";
import type { Course } from "../types";

export type CourseLoadStatus = "loading" | "success" | "error";

export interface UseCoursesResult {
  courses: Course[];
  status: CourseLoadStatus;
  error: Error | null;
  isEmpty: boolean;
  reload: () => void;
}

export function useCourses(): UseCoursesResult {
  const [courses, setCourses] = useState<Course[]>([]);
  const [status, setStatus] = useState<CourseLoadStatus>("loading");
  const [error, setError] = useState<Error | null>(null);

  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    let active = true;

    setStatus("loading");
    setError(null);

    fetchCourses({ signal: controller.signal })
      .then((result) => {
        if (!active) return;
        setCourses(result);
        setStatus("success");
      })
      .catch((cause: unknown) => {
        if (!active || controller.signal.aborted) return;

        setCourses([]);
        setError(
          cause instanceof Error ? cause : new Error("Unable to load courses."),
        );
        setStatus("error");
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [attempt]);

  const reload = useCallback(() => setAttempt((current) => current + 1), []);

  return {
    courses,
    status,
    error,
    isEmpty: status === "success" && courses.length === 0,
    reload,
  };
}
