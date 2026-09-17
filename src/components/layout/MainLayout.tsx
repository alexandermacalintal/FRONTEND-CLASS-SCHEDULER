import type { ReactNode } from "react";
import "./layout.css";

interface MainLayoutProps {
  coursesPanel: ReactNode;
  schedulePanel: ReactNode;
}

export function MainLayout({ coursesPanel, schedulePanel }: MainLayoutProps) {
  return (
    <main className="main-layout">
      <section
        className="main-layout__panel main-layout__panel--courses"
        aria-label="Available courses"
      >
        {coursesPanel}
      </section>
      <section
        className="main-layout__panel main-layout__panel--schedule"
        aria-label="My schedule"
      >
        {schedulePanel}
      </section>
    </main>
  );
}
