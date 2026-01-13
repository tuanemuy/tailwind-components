import {
  forwardRef,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { XIcon } from "@/lib/icons";

// Drawer Context
interface DrawerContextValue {
  isOpen: boolean;
  onClose: () => void;
  position: DrawerPosition;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawerContext() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer components must be used within a Drawer");
  }
  return context;
}

// Drawer positions and sizes
type DrawerPosition = "left" | "right" | "top" | "bottom";
type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

const positionClasses: Record<DrawerPosition, string> = {
  left: "inset-y-0 start-0",
  right: "inset-y-0 end-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0",
};

const sizeClasses: Record<DrawerPosition, Record<DrawerSize, string>> = {
  left: {
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
    xl: "w-[32rem]",
    full: "w-full",
  },
  right: {
    sm: "w-64",
    md: "w-80",
    lg: "w-96",
    xl: "w-[32rem]",
    full: "w-full",
  },
  top: {
    sm: "h-32",
    md: "h-48",
    lg: "h-64",
    xl: "h-96",
    full: "h-full",
  },
  bottom: {
    sm: "h-32",
    md: "h-48",
    lg: "h-64",
    xl: "h-96",
    full: "h-full",
  },
};

const translateClasses: Record<DrawerPosition, { open: string; closed: string }> = {
  left: { open: "translate-x-0", closed: "-translate-x-full" },
  right: { open: "translate-x-0", closed: "translate-x-full" },
  top: { open: "translate-y-0", closed: "-translate-y-full" },
  bottom: { open: "translate-y-0", closed: "translate-y-full" },
};

// Main Drawer component
export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  size?: DrawerSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showOverlay?: boolean;
  children: ReactNode;
  className?: string;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen,
      onClose,
      position = "right",
      size = "md",
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showOverlay = true,
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

    const handleOverlayClick = useCallback(() => {
      if (closeOnOverlayClick) {
        onClose();
      }
    }, [closeOnOverlayClick, onClose]);

    if (!shouldRender) return null;

    return (
      <DrawerContext.Provider value={{ isOpen, onClose, position }}>
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-80 overflow-hidden"
        >
          {/* Backdrop */}
          {showOverlay && (
            <div
              className={cn(
                "fixed inset-0 bg-black/50 transition-opacity duration-300",
                isAnimating ? "opacity-100" : "opacity-0",
              )}
              aria-hidden="true"
              onClick={handleOverlayClick}
            />
          )}

          {/* Drawer panel */}
          <div
            className={cn(
              "fixed bg-card shadow-xl transition-transform duration-300 ease-out",
              "flex flex-col",
              "overflow-y-auto",
              "[&::-webkit-scrollbar]:w-2",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-track]:bg-muted",
              "[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30",
              positionClasses[position],
              sizeClasses[position][size],
              isAnimating
                ? translateClasses[position].open
                : translateClasses[position].closed,
              (position === "left" || position === "right") && "border-x border-border",
              (position === "top" || position === "bottom") && "border-y border-border",
              className,
            )}
          >
            {children}
          </div>
        </div>
      </DrawerContext.Provider>
    );
  },
);
Drawer.displayName = "Drawer";

// DrawerHeader component
export interface DrawerHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  subtitle?: ReactNode;
  showCloseButton?: boolean;
  bordered?: boolean;
}

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
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
    const { onClose } = useDrawerContext();

    return (
      <div
        ref={ref}
        className={cn(
          "flex shrink-0 items-start justify-between gap-x-4 p-4",
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
DrawerHeader.displayName = "DrawerHeader";

// DrawerBody component
export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

const bodyPaddingClasses = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, padding = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1 overflow-y-auto", bodyPaddingClasses[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
DrawerBody.displayName = "DrawerBody";

// DrawerFooter component
export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  align?: "start" | "center" | "end" | "between";
}

const footerAlignClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, bordered = true, align = "end", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex shrink-0 items-center gap-x-2 p-4",
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
DrawerFooter.displayName = "DrawerFooter";

// Convenience component for close button
export interface DrawerCloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "outline";
}

export const DrawerCloseButton = forwardRef<
  HTMLButtonElement,
  DrawerCloseButtonProps
>(({ className, variant = "ghost", children, ...props }, ref) => {
  const { onClose } = useDrawerContext();

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
DrawerCloseButton.displayName = "DrawerCloseButton";
