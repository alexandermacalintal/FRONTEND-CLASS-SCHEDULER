import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import "./toast.css";

export type ToastVariant = "added" | "removed" | "changed";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 4000;

const VARIANT_ICON: Record<ToastVariant, string> = {
  added: "\u2713",
  removed: "\u2715",
  changed: "\u21bb",
};

let nextToastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const timersAtMount = timers.current;
    return () => {
      timersAtMount.forEach((timer) => clearTimeout(timer));
      timersAtMount.clear();
    };
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "added") => {
      const id = nextToastId++;
      setToasts((prev) => [...prev, { id, message, variant }]);
      timers.current.set(
        id,
        setTimeout(() => dismissToast(id), TOAST_DURATION_MS),
      );
    },
    [dismissToast],
  );

  const toastsRef = useRef<ToastItem[]>([]);
  useEffect(() => {
    toastsRef.current = toasts;
  }, [toasts]);

  const pauseTimers = useCallback(() => {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current.clear();
  }, []);

  const resumeTimers = useCallback(() => {
    toastsRef.current.forEach((toast) => {
      if (timers.current.has(toast.id)) return;
      timers.current.set(
        toast.id,
        setTimeout(() => dismissToast(toast.id), TOAST_DURATION_MS),
      );
    });
  }, [dismissToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div
        className="toast-viewport"
        aria-live="polite"
        aria-atomic="false"
        onMouseEnter={pauseTimers}
        onMouseLeave={resumeTimers}
        onFocus={pauseTimers}
        onBlur={resumeTimers}
      >
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.variant}`}>
            <span className="toast__icon" aria-hidden="true">
              {VARIANT_ICON[toast.variant]}
            </span>
            <span className="toast__message">{toast.message}</span>
            <button
              type="button"
              className="toast__dismiss"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
