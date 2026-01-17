import {
  createContext,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "@/components/atoms/Button";
import { XIcon } from "@/components/icons";
import { cn } from "@/components/utils";

// Modal Context
interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within a Modal");
  }
  return context;
}

// Modal sizes
type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

const sizeClasses: Record<ModalSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-xl",
  xl: "sm:max-w-2xl",
  full: "sm:max-w-full sm:m-4",
};

// Main Modal component
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: ReactNode;
  className?: string;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      size = "md",
      closeOnOverlayClick = true,
      closeOnEscape = true,
      children,
      className,
    },
    ref,
  ) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    // Handle escape key
    useEffect(() => {
      if (!closeOnEscape) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isOpen) {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose, closeOnEscape]);

    // Handle body scroll lock
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    // Handle animation
    useEffect(() => {
      if (isOpen) {
        setShouldRender(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsAnimating(true);
          });
        });
      } else {
        setIsAnimating(false);
        const timer = setTimeout(() => {
          setShouldRender(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [isOpen]);

    const handleOverlayClick = useCallback(
      (e: React.MouseEvent) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
          onClose();
        }
      },
      [closeOnOverlayClick, onClose],
    );

    if (!shouldRender) return null;

    return (
      <ModalContext.Provider value={{ isOpen, onClose }}>
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn(
            "fixed inset-0 z-80 overflow-x-hidden overflow-y-auto",
            "transition-opacity duration-300",
            isAnimating ? "opacity-100" : "opacity-0",
          )}
        >
          {/* Backdrop */}
          <button
            type="button"
            className={cn(
              "fixed inset-0 bg-black/50 transition-opacity duration-300 cursor-default",
              isAnimating ? "opacity-100" : "opacity-0",
            )}
            aria-label="Close modal"
            onClick={handleOverlayClick}
          />

          {/* Modal container */}
          <div className="flex min-h-full items-center justify-center p-4 pointer-events-none">
            {/* Modal content */}
            <div
              className={cn(
                "relative w-full transform rounded-xl bg-card shadow-xl transition-all duration-300 pointer-events-auto",
                sizeClasses[size],
                isAnimating
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-4 opacity-0",
                className,
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </ModalContext.Provider>
    );
  },
);
Modal.displayName = "Modal";

// ModalHeader component
export interface ModalHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  subtitle?: ReactNode;
  showCloseButton?: boolean;
  bordered?: boolean;
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  (
    {
      className,
      title,
      subtitle,
      showCloseButton = true,
      bordered = true,
      children,
      ...props
    },
    ref,
  ) => {
    const { onClose } = useModalContext();

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start justify-between gap-x-4 p-4",
          bordered && "border-b border-border",
          className,
        )}
        {...props}
      >
        {children || (
          <>
            <div className="min-w-0 flex-1">
              {title && (
                <h3 className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                className="size-8 shrink-0 rounded-full p-0"
                onClick={onClose}
                aria-label="Close"
              >
                <XIcon className="size-4" />
              </Button>
            )}
          </>
        )}
      </div>
    );
  },
);
ModalHeader.displayName = "ModalHeader";

// ModalBody component
export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  scrollable?: boolean;
  maxHeight?: string;
}

const bodyPaddingClasses = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  (
    {
      className,
      padding = "md",
      scrollable = true,
      maxHeight = "max-h-[60vh]",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          bodyPaddingClasses[padding],
          scrollable && [
            maxHeight,
            "overflow-y-auto",
            "[&::-webkit-scrollbar]:w-2",
            "[&::-webkit-scrollbar-thumb]:rounded-full",
            "[&::-webkit-scrollbar-track]:bg-muted",
            "[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30",
          ],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ModalBody.displayName = "ModalBody";

// ModalFooter component
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  align?: "start" | "center" | "end" | "between";
}

const footerAlignClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, bordered = true, align = "end", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-x-2 p-4",
          bordered && "border-t border-border",
          footerAlignClasses[align],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ModalFooter.displayName = "ModalFooter";

// Convenience component for close button in custom headers
export interface ModalCloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "outline";
}

export const ModalCloseButton = forwardRef<
  HTMLButtonElement,
  ModalCloseButtonProps
>(({ className, variant = "ghost", children, ...props }, ref) => {
  const { onClose } = useModalContext();

  return (
    <Button
      ref={ref}
      variant={variant}
      size="sm"
      className={cn("size-8 shrink-0 rounded-full p-0", className)}
      onClick={onClose}
      aria-label="Close"
      {...props}
    >
      {children || <XIcon className="size-4" />}
    </Button>
  );
});
ModalCloseButton.displayName = "ModalCloseButton";
