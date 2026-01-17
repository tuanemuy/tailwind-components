"use client";

import {
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/components/utils";

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

function calculatePosition(
  triggerRect: DOMRect,
  popoverRect: DOMRect,
  placement: Placement,
  offset: number,
): { top: number; left: number } {
  let top = 0;
  let left = 0;

  switch (placement) {
    case "top":
      top = triggerRect.top - popoverRect.height - offset;
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
      break;
    case "top-start":
      top = triggerRect.top - popoverRect.height - offset;
      left = triggerRect.left;
      break;
    case "top-end":
      top = triggerRect.top - popoverRect.height - offset;
      left = triggerRect.right - popoverRect.width;
      break;
    case "bottom":
      top = triggerRect.bottom + offset;
      left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
      break;
    case "bottom-start":
      top = triggerRect.bottom + offset;
      left = triggerRect.left;
      break;
    case "bottom-end":
      top = triggerRect.bottom + offset;
      left = triggerRect.right - popoverRect.width;
      break;
    case "left":
      top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
      left = triggerRect.left - popoverRect.width - offset;
      break;
    case "left-start":
      top = triggerRect.top;
      left = triggerRect.left - popoverRect.width - offset;
      break;
    case "left-end":
      top = triggerRect.bottom - popoverRect.height;
      left = triggerRect.left - popoverRect.width - offset;
      break;
    case "right":
      top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
      left = triggerRect.right + offset;
      break;
    case "right-start":
      top = triggerRect.top;
      left = triggerRect.right + offset;
      break;
    case "right-end":
      top = triggerRect.bottom - popoverRect.height;
      left = triggerRect.right + offset;
      break;
  }

  return { top, left };
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      className,
      trigger,
      placement = "bottom",
      offset = 8,
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
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [positioned, setPositioned] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setOpen = useCallback(
      (open: boolean) => {
        if (!isControlled) {
          setInternalOpen(open);
        }
        if (!open) {
          setPositioned(false);
        }
        onOpenChange?.(open);
      },
      [isControlled, onOpenChange],
    );

    const handleToggle = () => setOpen(!isOpen);

    // Reset positioned when closing
    useEffect(() => {
      if (!isOpen) {
        setPositioned(false);
      }
    }, [isOpen]);

    // Calculate position when open
    useLayoutEffect(() => {
      if (!isOpen || !triggerRef.current || !popoverRef.current) return;

      const updatePosition = () => {
        if (!triggerRef.current || !popoverRef.current) return;
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const popoverRect = popoverRef.current.getBoundingClientRect();
        const newPosition = calculatePosition(
          triggerRect,
          popoverRect,
          placement,
          offset,
        );

        // Viewport boundary adjustments
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (newPosition.left < 0) newPosition.left = 8;
        if (newPosition.left + popoverRect.width > viewportWidth) {
          newPosition.left = viewportWidth - popoverRect.width - 8;
        }
        if (newPosition.top < 0) newPosition.top = 8;
        if (newPosition.top + popoverRect.height > viewportHeight) {
          newPosition.top = viewportHeight - popoverRect.height - 8;
        }

        setPosition(newPosition);
        setPositioned(true);
      };

      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [isOpen, placement, offset]);

    // Click outside to close
    useEffect(() => {
      if (!closeOnClickOutside) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          containerRef.current &&
          !containerRef.current.contains(target) &&
          popoverRef.current &&
          !popoverRef.current.contains(target)
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
    }, [isOpen, closeOnClickOutside, setOpen]);

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
    }, [isOpen, setOpen]);

    // Clone trigger with onClick handler and ref
    const triggerProps = trigger.props as {
      onClick?: (e: React.MouseEvent) => void;
    };
    const triggerElement = cloneElement(trigger, {
      ref: triggerRef,
      onClick: (e: React.MouseEvent) => {
        triggerProps.onClick?.(e);
        handleToggle();
      },
      "aria-expanded": isOpen,
      "aria-haspopup": true,
    } as React.HTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement> });

    // Merge refs for popover
    const setPopoverRef = useCallback(
      (node: HTMLDivElement | null) => {
        popoverRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const popoverContent = isOpen ? (
      <div
        ref={setPopoverRef}
        className={cn(
          "fixed z-[9999] rounded-lg border border-border bg-card p-4 shadow-lg",
        )}
        style={{
          top: position.top,
          left: position.left,
          visibility: positioned ? "visible" : "hidden",
        }}
        role="dialog"
      >
        {children}
      </div>
    ) : null;

    return (
      <div
        ref={containerRef}
        className={cn("relative inline-block", className)}
        {...props}
      >
        {triggerElement}
        {typeof document !== "undefined" &&
          popoverContent &&
          createPortal(popoverContent, document.body)}
      </div>
    );
  },
);
Popover.displayName = "Popover";
