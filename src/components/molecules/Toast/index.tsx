"use client";

import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";
import { toastVariants, toastContainerVariants } from "@/lib/variants/toast";
import {
  InfoIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
  XIcon,
} from "@/lib/icons";
import type { VariantProps } from "class-variance-authority";

type ToastVariant = "default" | "info" | "success" | "warning" | "error";
type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

const variantIcons: Record<ToastVariant, React.ComponentType<{ className?: string }>> = {
  default: InfoIcon,
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertCircleIcon,
  error: XCircleIcon,
};

// Toast Item
export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
  action?: React.ReactNode;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant = "default",
      title,
      description,
      icon,
      showIcon = true,
      closable = true,
      onClose,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const IconComponent = variantIcons[variant ?? "default"];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        {/* Icon */}
        {showIcon && (
          <div className="size-5 shrink-0">
            {icon ?? <IconComponent className="size-full" />}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 space-y-1">
          {title && <h5 className="text-sm font-medium">{title}</h5>}
          {description && (
            <p className="text-sm opacity-90">{description}</p>
          )}
          {children}
        </div>

        {/* Action */}
        {action && <div className="shrink-0">{action}</div>}

        {/* Close button */}
        {closable && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Close toast"
          >
            <XIcon className="size-4" />
          </button>
        )}
      </div>
    );
  }
);
Toast.displayName = "Toast";

// Toast Context
interface ToastItem {
  id: string;
  variant?: ToastVariant;
  title?: string;
  description?: string;
  duration?: number;
  action?: React.ReactNode;
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Toast Provider
export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  defaultDuration?: number;
}

export const ToastProvider = ({
  children,
  position = "bottom-right",
  defaultDuration = 5000,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback(
    (toast: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { ...toast, id }]);
      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer position={position} defaultDuration={defaultDuration} />
    </ToastContext.Provider>
  );
};

// Toast Container
interface ToastContainerProps extends VariantProps<typeof toastContainerVariants> {
  defaultDuration?: number;
}

const ToastContainer = ({ position, defaultDuration = 5000 }: ToastContainerProps) => {
  const { toasts, removeToast } = useToast();

  return (
    <div className={cn(toastContainerVariants({ position }))}>
      {toasts.map((toast) => (
        <ToastItemWithTimer
          key={toast.id}
          toast={toast}
          duration={toast.duration ?? defaultDuration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Toast Item with Timer
interface ToastItemWithTimerProps {
  toast: ToastItem;
  duration: number;
  onClose: () => void;
}

const ToastItemWithTimer = ({ toast, duration, onClose }: ToastItemWithTimerProps) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <Toast
      variant={toast.variant}
      title={toast.title}
      description={toast.description}
      action={toast.action}
      onClose={onClose}
    />
  );
};

// Helper function for creating toasts outside of components
export const toast = {
  default: (props: Omit<ToastItem, "id" | "variant">) => ({ ...props, variant: "default" as const }),
  info: (props: Omit<ToastItem, "id" | "variant">) => ({ ...props, variant: "info" as const }),
  success: (props: Omit<ToastItem, "id" | "variant">) => ({ ...props, variant: "success" as const }),
  warning: (props: Omit<ToastItem, "id" | "variant">) => ({ ...props, variant: "warning" as const }),
  error: (props: Omit<ToastItem, "id" | "variant">) => ({ ...props, variant: "error" as const }),
};

export type { ToastItem, ToastVariant, ToastPosition };
