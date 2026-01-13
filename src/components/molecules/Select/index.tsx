"use client";

import { forwardRef, useState, useRef, useEffect, useId } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, CheckIcon } from "@/lib/icons";

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
      name,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxId = useId();

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const selectedOption = options.find((opt) => opt.value === value);

    const handleSelect = (optionValue: string) => {
      if (!isControlled) {
        setInternalValue(optionValue);
      }
      onChange?.(optionValue);
      setIsOpen(false);
    };

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
            const currentIndex = options.findIndex((opt) => opt.value === value);
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
            const currentIndex = options.findIndex((opt) => opt.value === value);
            const prevIndex = Math.max(currentIndex - 1, 0);
            const prevOption = options[prevIndex];
            if (prevOption && !prevOption.disabled) {
              handleSelect(prevOption.value);
            }
          }
          break;
      }
    };

    return (
      <div ref={containerRef} className={cn("relative", className)} {...props}>
        {/* Hidden input for form submission */}
        {name && <input type="hidden" name={name} value={value} />}

        {/* Trigger */}
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
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

        {/* Options */}
        {isOpen && (
          <ul
            id={listboxId}
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-border bg-card p-1 shadow-lg"
            role="listbox"
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
                    option.disabled
                      ? "cursor-not-allowed text-muted-foreground"
                      : "text-foreground hover:bg-accent",
                    isSelected && "bg-accent",
                  )}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                  onClick={() => !option.disabled && handleSelect(option.value)}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <CheckIcon className="size-4 text-primary" />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";
