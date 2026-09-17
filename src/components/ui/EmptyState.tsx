import type { ReactNode } from "react";
import "./ui.css";

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  role?: "status" | "alert";
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  className,
  role = "status",
}: EmptyStateProps) {
  const rootClassName = className ? `empty-state ${className}` : "empty-state";

  return (
    <div className={rootClassName} role={role}>
      {icon && (
        <div className="empty-state__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <p className="empty-state__title">{title}</p>
      {description && <p className="empty-state__description">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}
