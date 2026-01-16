"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CheckIcon, ChevronDownIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  onChange?: (value: string) => void;
  /** Alias for onChange - for compatibility with common patterns */
  onValueChange?: (value: string) => void;
  name?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      options,
      value: controlledValue,
      defaultValue,
      placeholder = "Select an option",
      disabled,
      error,
      onChange,
      onValueChange,
      name,
      ...props
    },
    _ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const [positioned, setPositioned] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);
    const listboxId = useId();

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const selectedOption = options.find((opt) => opt.value === value);

    // Use either onChange or onValueChange
    const handleValueChange = onChange ?? onValueChange;

    const handleSelect = (optionValue: string) => {
      if (!isControlled) {
        setInternalValue(optionValue);
      }
      handleValueChange?.(optionValue);
      setIsOpen(false);
    };

    // Reset positioned when closing
    useEffect(() => {
      if (!isOpen) {
        setPositioned(false);
      }
    }, [isOpen]);

    // Calculate position when open
    useLayoutEffect(() => {
      if (!isOpen || !triggerRef.current || !listboxRef.current) return;

      const updatePosition = () => {
        if (!triggerRef.current || !listboxRef.current) return;
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const listboxRect = listboxRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        let top = triggerRect.bottom + 4;
        const left = triggerRect.left;
        const width = triggerRect.width;

        // Check if dropdown would overflow below viewport
        if (top + listboxRect.height > viewportHeight) {
          // Position above trigger if more space
          if (triggerRect.top > viewportHeight - triggerRect.bottom) {
            top = triggerRect.top - listboxRect.height - 4;
          }
        }

        // Ensure minimum top position
        if (top < 8) top = 8;

        setPosition({ top, left, width });
        setPositioned(true);
      };

      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [isOpen]);

    // Click outside to close
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          containerRef.current &&
          !containerRef.current.contains(target) &&
          listboxRef.current &&
          !listboxRef.current.contains(target)
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

    // Keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case "Enter":
        case " ":
          event.preventDefault();
          setIsOpen((prev) => !prev);
          break;
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowDown":
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            const currentIndex = options.findIndex(
              (opt) => opt.value === value,
            );
            const nextIndex = Math.min(currentIndex + 1, options.length - 1);
            const nextOption = options[nextIndex];
            if (nextOption && !nextOption.disabled) {
              handleSelect(nextOption.value);
            }
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (isOpen) {
            const currentIndex = options.findIndex(
              (opt) => opt.value === value,
            );
            const prevIndex = Math.max(currentIndex - 1, 0);
            const prevOption = options[prevIndex];
            if (prevOption && !prevOption.disabled) {
              handleSelect(prevOption.value);
            }
          }
          break;
      }
    };

    // Options list rendered via portal
    const optionsList = isOpen ? (
      <ul
        ref={listboxRef}
        id={listboxId}
        className="fixed z-[9999] max-h-60 overflow-auto rounded-lg border border-border bg-card p-1 shadow-lg"
        style={{
          top: position.top,
          left: position.left,
          width: position.width,
          visibility: positioned ? "visible" : "hidden",
        }}
      >
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <li
              key={option.value}
              role="option"
              tabIndex={-1}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                option.disabled
                  ? "cursor-not-allowed text-muted-foreground"
                  : "text-foreground hover:bg-accent",
                isSelected && "bg-accent",
              )}
              aria-selected={isSelected}
              aria-disabled={option.disabled}
              onClick={() => !option.disabled && handleSelect(option.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !option.disabled) {
                  handleSelect(option.value);
                }
              }}
            >
              <span>{option.label}</span>
              {isSelected && <CheckIcon className="size-4 text-primary" />}
            </li>
          );
        })}
      </ul>
    ) : null;

    return (
      <div ref={containerRef} className={cn("relative", className)} {...props}>
        {/* Hidden input for form submission */}
        {name && <input type="hidden" name={name} value={value} />}

        {/* Trigger */}
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            "flex w-full items-center justify-between rounded-lg border bg-background px-3 py-2.5 text-sm transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-ring/50",
            disabled && "cursor-not-allowed opacity-50",
            error
              ? "border-destructive focus:ring-destructive/50"
              : "border-border hover:border-ring",
          )}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
        >
          <span
            className={cn(
              selectedOption ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDownIcon
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {/* Options via portal */}
        {typeof document !== "undefined" &&
          optionsList &&
          createPortal(optionsList, document.body)}
      </div>
    );
  },
);
Select.displayName = "Select";
