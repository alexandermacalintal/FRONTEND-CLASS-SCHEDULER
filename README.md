# Class Scheduling System

## Setup Instructions

Install dependencies:

```
npm install
nvm install 22
nvm use 22
```

Start the development server:

```
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) to open in your browser. The dev server supports hot module reloading, so most edits appear immediately without a full page reload.

## Production Build

```
npm run build
```

This runs a TypeScript project build (`tsc -b`) followed by Vite's production bundling. The output is written to `dist/`. To preview the production build locally before deploying it:

```
npm run preview
```

## Technical Rationale – Class Scheduling System

The Class Scheduling System utilizes **React with TypeScript** to build an interactive and structured frontend. I used React because it includes compatibility with **a component-based architecture** for such features as course searching, filtering, section selection, and schedule update, whereas TypeScript ensures type safety for the course, section, schedule, and selection data. The app consists of reusable components based on their functionality: course components are responsible for searching, filtering, cards, and section lists; schedule components are responsible for the timetable, classes, and schedule summary. Shared components such as `EmptyState`, the toast system, `MainLayout`, and `Header` are separated from the feature-specific components for the sake of organization. Scheduling state is managed by means of the `useSchedule` hook, where `selectedSections` contains the selected `courseId` and `sectionId`, and the adding, replacing, and deleting of the sections are processed within the hook. Thus, **scheduling logic and state management** are separate from presentation components, and the UI is mostly about showing the data and reacting to the actions of the user. The data is presented in the way of **Course → Section → Schedule**, and `courseService` separates the data access layer from the UI and enables switching the local data source with the API in the future. In terms of **UI/UX**, the system supports course searching by course code or title, unit filtering, section selection and replacement, weekly timetable, toast notifications, empty states, loading and error states, and retry. The timetable supports horizontal scrolling on smaller screens to keep the layout readable. In terms of **performance**, filtering is done by means of memoized calculations, selected sections are contained in the `Set` to ensure efficient selection check, and course card and schedule grid components are memoized to minimize unnecessary re-renders. In case the app grows and includes a bigger number of courses, **server-side filtering, pagination, virtualization, or API searching** may become necessary to improve performance. In general, the frontend utilizes **separation of concerns** of the data access, state management, scheduling logic, and UI. In the future, the `courseService` can be connected with the backend API, which will allow for updating the course data, implementing persistent schedules, user accounts, enrollment information, and real-time courses availability without changing the frontend codebase much
