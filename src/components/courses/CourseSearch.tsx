import "./courses.css";

interface CourseSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function CourseSearch({ value, onChange }: CourseSearchProps) {
  return (
    <div className="course-search">
      <label className="visually-hidden" htmlFor="course-search-input">
        Search courses by code or title
      </label>
      <input
        id="course-search-input"
        type="search"
        className="course-search__input"
        placeholder="Search by course code or title…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
