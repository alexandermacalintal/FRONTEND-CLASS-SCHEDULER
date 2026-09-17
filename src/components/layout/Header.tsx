import "./layout.css";

export function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <h1 className="app-header__title">Class Planner</h1>
        <p className="app-header__tagline">
          Browse available course sections and build your schedule for the
          term.
        </p>
      </div>
    </header>
  );
}
