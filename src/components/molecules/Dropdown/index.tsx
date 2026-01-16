"use client";

import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/atoms";
import { ChevronDownIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

type Placement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

interface DropdownContextValue {
  isOpen: boolean;
  toggle: (triggerRect?: DOMRect) => void;
  close: () => void;
  placement: Placement;
  adjustedPlacement: Placement;
  menuRef: React.RefObject<HTMLDivElement | null>;
  triggerId: string;
  triggerRect: DOMRect | null;
  setTriggerRect: (rect: DOMRect | null) => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a Dropdown");
  }
  return context;
};

function calculateDropdownPosition(
  triggerRect: DOMRect,
  menuRect: DOMRect,
  placement: Placement,
  offset: number = 8,
): { top: number; left: number } {
  let top = 0;
  let left = 0;

  const isTop = placement.includes("top");
  const isEnd = placement.includes("end");

  if (isTop) {
    top = triggerRect.top - menuRect.height - offset;
  } else {
    top = triggerRect.bottom + offset;
  }

  if (isEnd) {
    left = triggerRect.right - menuRect.width;
  } else {
    left = triggerRect.left;
  }

  return { top, left };
}

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
      triggerLabel,
      placement,
      align,
      closeOnSelect = true,
      children,
      ...props
    },
    _ref,
  ) => {
    // Detect compound pattern: children contains DropdownTrigger/DropdownContent
    const isCompoundPattern = !trigger && !triggerLabel;
    // Compute effective placement: placement takes priority, then align, then default
    const effectivePlacement: Placement =
      placement || (align === "end" ? "bottom-end" : "bottom-start");

    const [isOpen, setIsOpen] = useState(false);
    const [adjustedPlacement, setAdjustedPlacement] =
      useState<Placement>(effectivePlacement);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [positioned, setPositioned] = useState(false);
    const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerButtonRef = useRef<HTMLButtonElement>(null);
    const triggerId = useId();

    const toggle = (rect?: DOMRect) => {
      if (!isOpen && rect) {
        setTriggerRect(rect);
      }
      setIsOpen((prev) => !prev);
    };

    const close = () => {
      setIsOpen(false);
      setPositioned(false);
    };

    // Reset positioned when closing
    useEffect(() => {
      if (!isOpen) {
        setPositioned(false);
      }
    }, [isOpen]);

    // Calculate position and adjust placement when menu opens
    useLayoutEffect(() => {
      if (!isOpen) return;

      // Reset placement first
      setAdjustedPlacement(effectivePlacement);

      const updatePosition = () => {
        // Get trigger element
        const triggerElement =
          document.getElementById(triggerId) || triggerButtonRef.current;
        if (!triggerElement || !menuRef.current) return false;

        const currentTriggerRect = triggerElement.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let newPlacement = effectivePlacement;

        // Check horizontal overflow
        const isStartAlign = effectivePlacement.includes("start");
        if (isStartAlign) {
          if (currentTriggerRect.left + menuRect.width > viewportWidth) {
            newPlacement = effectivePlacement.replace(
              "start",
              "end",
            ) as Placement;
          }
        } else {
          if (currentTriggerRect.right - menuRect.width < 0) {
            newPlacement = effectivePlacement.replace(
              "end",
              "start",
            ) as Placement;
          }
        }

        // Check vertical overflow
        const isBottomAlign = effectivePlacement.includes("bottom");
        if (isBottomAlign) {
          if (currentTriggerRect.bottom + menuRect.height > viewportHeight) {
            newPlacement = newPlacement.replace("bottom", "top") as Placement;
          }
        } else {
          if (currentTriggerRect.top - menuRect.height < 0) {
            newPlacement = newPlacement.replace("top", "bottom") as Placement;
          }
        }

        setAdjustedPlacement(newPlacement);

        // Calculate position
        const newPosition = calculateDropdownPosition(
          currentTriggerRect,
          menuRect,
          newPlacement,
        );

        // Viewport boundary adjustments
        if (newPosition.left < 0) newPosition.left = 8;
        if (newPosition.left + menuRect.width > viewportWidth) {
          newPosition.left = viewportWidth - menuRect.width - 8;
        }
        if (newPosition.top < 0) newPosition.top = 8;
        if (newPosition.top + menuRect.height > viewportHeight) {
          newPosition.top = viewportHeight - menuRect.height - 8;
        }

        setPosition(newPosition);
        setPositioned(true);
        return true;
      };

      // Try to update position immediately
      const success = updatePosition();

      // If refs weren't ready, try again after a microtask
      if (!success) {
        queueMicrotask(() => {
          updatePosition();
        });
      }

      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [isOpen, effectivePlacement, triggerId]);

    // Click outside to close
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          containerRef.current &&
          !containerRef.current.contains(target) &&
          menuRef.current &&
          !menuRef.current.contains(target)
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

    const handleTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      toggle(rect);
    };

    // Menu content rendered via portal (only for non-compound pattern)
    const menuContent = !isCompoundPattern && isOpen ? (
      <div
        ref={menuRef}
        className="fixed z-[9999] min-w-48 rounded-lg border border-border bg-card p-1 shadow-lg"
        style={{
          top: position.top,
          left: position.left,
          visibility: positioned ? "visible" : "hidden",
        }}
        role="menu"
      >
        {children}
      </div>
    ) : null;

    return (
      <DropdownContext.Provider
        value={{
          isOpen,
          toggle,
          close,
          placement: effectivePlacement,
          adjustedPlacement,
          menuRef,
          triggerId,
          triggerRect,
          setTriggerRect,
        }}
      >
        <div
          ref={containerRef}
          className={cn("relative inline-block", className)}
          {...props}
        >
          {/* Trigger (only for non-compound pattern) */}
          {!isCompoundPattern && (
            trigger ? (
              <button
                id={triggerId}
                ref={triggerButtonRef}
                type="button"
                onClick={handleTriggerClick}
                className="appearance-none bg-transparent border-0 p-0 cursor-pointer"
              >
                {trigger}
              </button>
            ) : triggerLabel ? (
              <Button
                id={triggerId}
                ref={triggerButtonRef}
                variant="outline"
                onClick={handleTriggerClick}
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
            ) : null
          )}

          {/* Menu via portal for trigger prop pattern */}
          {typeof document !== "undefined" &&
            menuContent &&
            createPortal(menuContent, document.body)}

          {/* Compound pattern - children include DropdownTrigger and DropdownContent */}
          {isCompoundPattern && children}
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
  (
    { className, icon, destructive, variant, children, onClick, ...props },
    ref,
  ) => {
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
  <hr className="my-1 h-px border-0 bg-border" />
);
DropdownDivider.displayName = "DropdownDivider";

// DropdownTrigger - compound component pattern
export interface DropdownTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const DropdownTrigger = forwardRef<HTMLDivElement, DropdownTriggerProps>(
  ({ className, asChild, children, onClick, ...props }, ref) => {
    const { toggle, isOpen, triggerId, setTriggerRect } = useDropdownContext();

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setTriggerRect(rect);
      toggle(rect);
      onClick?.(e as React.MouseEvent<HTMLDivElement>);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<{
          ref?: React.Ref<HTMLElement>;
          id?: string;
          onClick?: (e: React.MouseEvent<Element>) => void;
          "aria-expanded"?: boolean;
          "aria-haspopup"?:
            | boolean
            | "menu"
            | "listbox"
            | "tree"
            | "grid"
            | "dialog";
          className?: string;
        }>,
        {
          ref: ref as React.Ref<HTMLElement>,
          id: triggerId,
          onClick: (e: React.MouseEvent<Element>) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            setTriggerRect(rect);
            toggle(rect);
            (
              children.props as { onClick?: (e: React.MouseEvent<Element>) => void }
            ).onClick?.(e);
          },
          "aria-expanded": isOpen,
          "aria-haspopup": "menu" as const,
          className: cn(
            (children.props as { className?: string }).className,
            className,
          ),
        },
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        id={triggerId}
        type="button"
        className={cn(
          "cursor-pointer appearance-none bg-transparent border-0 p-0",
          className,
        )}
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  },
);
DropdownTrigger.displayName = "DropdownTrigger";

// DropdownContent - compound component pattern
export interface DropdownContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "end";
}

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, align, children, ...props }, ref) => {
    const { isOpen, menuRef, triggerId } = useDropdownContext();
    const localMenuRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [isPositioned, setIsPositioned] = useState(false);

    // Calculate position function
    const calculatePosition = useCallback(() => {
      // Find trigger element by ID
      const triggerElement = document.getElementById(triggerId);
      const menuElement = localMenuRef.current;
      if (!triggerElement || !menuElement) return;

      const currentTriggerRect = triggerElement.getBoundingClientRect();
      const menuRect = menuElement.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Default placement based on align prop
      const isEnd = align === "end";
      let top = currentTriggerRect.bottom + 8;
      let left = isEnd
        ? currentTriggerRect.right - menuRect.width
        : currentTriggerRect.left;

      // Check vertical overflow
      if (top + menuRect.height > viewportHeight) {
        if (currentTriggerRect.top > viewportHeight - currentTriggerRect.bottom) {
          top = currentTriggerRect.top - menuRect.height - 8;
        }
      }

      // Viewport boundary adjustments
      if (left < 8) left = 8;
      if (left + menuRect.width > viewportWidth - 8) {
        left = viewportWidth - menuRect.width - 8;
      }
      if (top < 8) top = 8;
      if (top + menuRect.height > viewportHeight - 8) {
        top = viewportHeight - menuRect.height - 8;
      }

      setPosition({ top, left });
      setIsPositioned(true);
    }, [align, triggerId]);

    // Merge refs
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        (menuRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (localMenuRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref, menuRef],
    );

    // Reset when closing
    useEffect(() => {
      if (!isOpen) {
        setIsPositioned(false);
        setPosition({ top: 0, left: 0 });
      }
    }, [isOpen]);

    // Calculate position when open
    useLayoutEffect(() => {
      if (!isOpen) return;

      // Use requestAnimationFrame to ensure DOM is ready
      const frameId = requestAnimationFrame(() => {
        calculatePosition();
      });

      return () => cancelAnimationFrame(frameId);
    }, [isOpen, calculatePosition]);

    // Set up scroll and resize listeners
    useEffect(() => {
      if (!isOpen || !isPositioned) return;

      const handleUpdate = () => {
        // Re-get trigger rect for scroll/resize
        const triggerElement = document.getElementById(triggerId);
        if (triggerElement && localMenuRef.current) {
          const newTriggerRect = triggerElement.getBoundingClientRect();
          const menuRect = localMenuRef.current.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          const isEnd = align === "end";
          let top = newTriggerRect.bottom + 8;
          let left = isEnd
            ? newTriggerRect.right - menuRect.width
            : newTriggerRect.left;

          if (top + menuRect.height > viewportHeight) {
            if (newTriggerRect.top > viewportHeight - newTriggerRect.bottom) {
              top = newTriggerRect.top - menuRect.height - 8;
            }
          }

          if (left < 8) left = 8;
          if (left + menuRect.width > viewportWidth - 8) {
            left = viewportWidth - menuRect.width - 8;
          }
          if (top < 8) top = 8;
          if (top + menuRect.height > viewportHeight - 8) {
            top = viewportHeight - menuRect.height - 8;
          }

          setPosition({ top, left });
        }
      };

      window.addEventListener("scroll", handleUpdate, true);
      window.addEventListener("resize", handleUpdate);

      return () => {
        window.removeEventListener("scroll", handleUpdate, true);
        window.removeEventListener("resize", handleUpdate);
      };
    }, [isOpen, isPositioned, triggerId, align]);

    if (!isOpen) return null;

    const content = (
      <div
        ref={setRefs}
        className={cn(
          "fixed z-[9999] min-w-48 rounded-lg border border-border bg-card p-1 shadow-lg",
          className,
        )}
        style={{
          top: position.top,
          left: position.left,
          visibility: isPositioned ? "visible" : "hidden",
        }}
        role="menu"
        {...props}
      >
        {children}
      </div>
    );

    return typeof document !== "undefined"
      ? createPortal(content, document.body)
      : null;
  },
);
DropdownContent.displayName = "DropdownContent";
