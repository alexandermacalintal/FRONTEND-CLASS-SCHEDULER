import { Fragment } from "react";
import { UNIT_FILTER_OPTIONS, type UnitFilter } from "../../utils/courseFilters";
import "./courses.css";

interface CourseFiltersProps {
  unitFilter: UnitFilter;
  onUnitFilterChange: (unitFilter: UnitFilter) => void;
}

function optionInputId(value: UnitFilter): string {
  return `unit-filter-${value}`;
}

export function CourseFilters({
  unitFilter,
  onUnitFilterChange,
}: CourseFiltersProps) {
  return (
    <fieldset className="course-filters">
      <legend className="course-filters__legend">Units</legend>
      <div className="course-filters__options">
        {UNIT_FILTER_OPTIONS.map((option) => {
          const inputId = optionInputId(option.value);

          return (
            <Fragment key={String(option.value)}>
              <input
                type="radio"
                className="course-filters__input visually-hidden"
                id={inputId}
                name="unit-filter"
                value={String(option.value)}
                checked={option.value === unitFilter}
                onChange={() => onUnitFilterChange(option.value)}
              />
              <label className="course-filters__option" htmlFor={inputId}>
                {option.label}
              </label>
            </Fragment>
          );
        })}
      </div>
    </fieldset>
  );
}
