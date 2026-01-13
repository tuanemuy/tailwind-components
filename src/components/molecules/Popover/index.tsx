"use client";

import { forwardRef, useState, useRef, useEffect, cloneElement } from "react";
import { cn } from "@/lib/utils";

type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactElement;
  placement?: Placement;
  offset?: number;
  closeOnClickOutside?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const placementClasses: Record<Placement, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  "top-start": "bottom-full left-0 mb-2",
  "top-end": "bottom-full right-0 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  "bottom-start": "top-full left-0 mt-2",
  "bottom-end": "top-full right-0 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  "left-start": "right-full top-0 mr-2",
  "left-end": "right-full bottom-0 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
  "right-start": "left-full top-0 ml-2",
  "right-end": "left-full bottom-0 ml-2",
};

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      className,
      trigger,
      placement = "bottom",
      closeOnClickOutside = true,
      defaultOpen = false,
      open: controlledOpen,
      onOpenChange,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const containerRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setOpen = (open: boolean) => {
      if (!isControlled) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    };

    const handleToggle = () => setOpen(!isOpen);

    // Click outside to close
    useEffect(() => {
      if (!closeOnClickOutside) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, closeOnClickOutside]);

    // Escape key to close
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen]);

    // Clone trigger with onClick handler
    const triggerProps = trigger.props as { onClick?: (e: React.MouseEvent) => void };
    const triggerElement = cloneElement(trigger, {
      onClick: (e: React.MouseEvent) => {
        triggerProps.onClick?.(e);
        handleToggle();
      },
      "aria-expanded": isOpen,
      "aria-haspopup": true,
    } as React.HTMLAttributes<HTMLElement>);

    return (
      <div
        ref={containerRef}
        className={cn("relative inline-block", className)}
        {...props}
      >
        {triggerElement}
        {isOpen && (
          <div
            ref={ref}
            className={cn(
              "absolute z-50 rounded-lg border border-border bg-card p-4 shadow-lg",
              placementClasses[placement],
            )}
            role="dialog"
          >
            {children}
          </div>
        )}
      </div>
    );
  },
);
Popover.displayName = "Popover";
