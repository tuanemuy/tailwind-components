"use client";

import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";
import { ChevronDownIcon } from "@/lib/icons";

type Placement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

interface DropdownContextValue {
  isOpen: boolean;
  close: () => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger?: React.ReactNode;
  triggerLabel?: string;
  placement?: Placement;
  /** Alias for placement */
  align?: "start" | "end";
  closeOnSelect?: boolean;
  children: React.ReactNode;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className,
      trigger,
      triggerLabel = "Options",
      placement,
      align,
      closeOnSelect = true,
      children,
      ...props
    },
    _ref,
  ) => {
    // Compute effective placement: placement takes priority, then align, then default
    const effectivePlacement: Placement = placement || (align === "start" ? "bottom-start" : "bottom-end");

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => setIsOpen((prev) => !prev);
    const close = () => setIsOpen(false);

    // Click outside to close
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    // Escape key to close
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen]);

    const placementClasses: Record<Placement, string> = {
      "bottom-start": "top-full mt-2 start-0",
      "bottom-end": "top-full mt-2 end-0",
      "top-start": "bottom-full mb-2 start-0",
      "top-end": "bottom-full mb-2 end-0",
    };

    return (
      <DropdownContext.Provider value={{ isOpen, close }}>
        <div
          ref={containerRef}
          className={cn("relative inline-block", className)}
          {...props}
        >
          {/* Trigger */}
          {trigger ? (
            <div onClick={handleToggle}>{trigger}</div>
          ) : (
            <Button
              variant="outline"
              onClick={handleToggle}
              aria-expanded={isOpen}
              aria-haspopup="menu"
              rightIcon={
                <ChevronDownIcon
                  className={cn(
                    "size-4 transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              }
            >
              {triggerLabel}
            </Button>
          )}

          {/* Menu */}
          {isOpen && (
            <div
              className={cn(
                "absolute z-50 min-w-48 rounded-lg border border-border bg-card p-1 shadow-lg",
                placementClasses[effectivePlacement],
              )}
              role="menu"
            >
              {children}
            </div>
          )}
        </div>
      </DropdownContext.Provider>
    );
  },
);
Dropdown.displayName = "Dropdown";

// DropdownItem
export interface DropdownItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  destructive?: boolean;
  /** Alias for destructive - use "destructive" for red styling */
  variant?: "default" | "destructive";
}

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ className, icon, destructive, variant, children, onClick, ...props }, ref) => {
    const context = useContext(DropdownContext);
    // variant="destructive" is an alias for destructive={true}
    const isDestructive = destructive || variant === "destructive";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      context?.close();
    };

    return (
      <button
        ref={ref}
        className={cn(
          "flex w-full items-center gap-x-2 rounded-md px-3 py-2 text-sm transition-colors",
          isDestructive
            ? "text-destructive hover:bg-destructive/10 focus:bg-destructive/10"
            : "text-foreground hover:bg-accent focus:bg-accent",
          "focus:outline-none",
          className,
        )}
        role="menuitem"
        onClick={handleClick}
        {...props}
      >
        {icon && <span className="size-4 shrink-0">{icon}</span>}
        {children}
      </button>
    );
  },
);
DropdownItem.displayName = "DropdownItem";

// DropdownDivider
export const DropdownDivider = () => (
  <div className="my-1 h-px bg-border" role="separator" />
);
DropdownDivider.displayName = "DropdownDivider";
