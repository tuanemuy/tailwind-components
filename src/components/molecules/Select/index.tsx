"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { CheckIcon, ChevronDownIcon, SearchIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  selectColorIndicatorVariants,
  selectDropdownVariants,
  selectOptionVariants,
  selectTriggerVariants,
} from "@/lib/variants";
import type { VariantProps } from "class-variance-authority";

/** Color configuration for status indicators */
export type SelectColorType =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";

const colorMap: Record<SelectColorType, string> = {
  default: "bg-muted-foreground",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-info",
};

/** Extended SelectOption with rich content support */
export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  /** Icon to display (ReactNode) */
  icon?: ReactNode;
  /** Avatar image URL */
  avatar?: string;
  /** Avatar initials (used when no avatar image) */
  avatarInitials?: string;
  /** Description text below the label */
  description?: string;
  /** Color indicator for status-style options */
  color?: SelectColorType | string;
}

export interface SelectProps<T = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    VariantProps<typeof selectTriggerVariants> {
  options: SelectOption<T>[];
  value?: T;
  defaultValue?: T;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  onChange?: (value: T) => void;
  /** Alias for onChange - for compatibility with common patterns */
  onValueChange?: (value: T) => void;
  name?: string;
  /** Size variant */
  size?: "xs" | "sm" | "md" | "lg";
  /** Visual variant */
  variant?: "default" | "minimal" | "ghost" | "status";
  /** Enable search/filter within dropdown */
  searchable?: boolean;
  /** Placeholder for search input */
  searchPlaceholder?: string;
  /** Custom render function for options */
  renderOption?: (option: SelectOption<T>, isSelected: boolean) => ReactNode;
  /** Custom render function for the selected value display */
  renderValue?: (option: SelectOption<T> | undefined) => ReactNode;
  /** Show color indicator in trigger (for status variant) */
  showColorInTrigger?: boolean;
  /** Show icon in trigger */
  showIconInTrigger?: boolean;
  /** Show avatar in trigger */
  showAvatarInTrigger?: boolean;
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
      error = false,
      onChange,
      onValueChange,
      name,
      size = "md",
      variant = "default",
      searchable = false,
      searchPlaceholder = "Search...",
      renderOption,
      renderValue,
      showColorInTrigger = true,
      showIconInTrigger = true,
      showAvatarInTrigger = true,
      ...props
    },
    _ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [searchQuery, setSearchQuery] = useState("");
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const [positioned, setPositioned] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const listboxId = useId();

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const selectedOption = options.find((opt) => opt.value === value);

    // Filter options based on search query
    const filteredOptions = searchable
      ? options.filter(
          (opt) =>
            opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            opt.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

    // Use either onChange or onValueChange
    const handleValueChange = onChange ?? onValueChange;

    const handleSelect = (optionValue: typeof value) => {
      if (!isControlled) {
        setInternalValue(optionValue);
      }
      handleValueChange?.(optionValue as never);
      setIsOpen(false);
      setSearchQuery("");
    };

    // Reset positioned when closing
    useEffect(() => {
      if (!isOpen) {
        setPositioned(false);
        setSearchQuery("");
      } else if (searchable && searchInputRef.current) {
        // Focus search input when opening
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
    }, [isOpen, searchable]);

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
          if (!searchable || !isOpen) {
            event.preventDefault();
            setIsOpen((prev) => !prev);
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowDown":
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            const currentIndex = filteredOptions.findIndex(
              (opt) => opt.value === value
            );
            const nextIndex = Math.min(
              currentIndex + 1,
              filteredOptions.length - 1
            );
            const nextOption = filteredOptions[nextIndex];
            if (nextOption && !nextOption.disabled) {
              handleSelect(nextOption.value);
            }
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (isOpen) {
            const currentIndex = filteredOptions.findIndex(
              (opt) => opt.value === value
            );
            const prevIndex = Math.max(currentIndex - 1, 0);
            const prevOption = filteredOptions[prevIndex];
            if (prevOption && !prevOption.disabled) {
              handleSelect(prevOption.value);
            }
          }
          break;
      }
    };

    // Render the trigger content (selected value display)
    const renderTriggerContent = () => {
      if (renderValue) {
        return renderValue(selectedOption);
      }

      if (!selectedOption) {
        return (
          <span className="text-muted-foreground">{placeholder}</span>
        );
      }

      return (
        <span className="inline-flex items-center gap-x-2">
          {/* Color indicator */}
          {showColorInTrigger && selectedOption.color && (
            <span
              className={cn(
                selectColorIndicatorVariants({ size }),
                typeof selectedOption.color === "string" &&
                  selectedOption.color in colorMap
                  ? colorMap[selectedOption.color as SelectColorType]
                  : ""
              )}
              style={
                typeof selectedOption.color === "string" &&
                !(selectedOption.color in colorMap)
                  ? { backgroundColor: selectedOption.color }
                  : undefined
              }
            />
          )}
          {/* Icon */}
          {showIconInTrigger && selectedOption.icon && (
            <span className="shrink-0">{selectedOption.icon}</span>
          )}
          {/* Avatar */}
          {showAvatarInTrigger &&
            (selectedOption.avatar || selectedOption.avatarInitials) && (
              <span
                className={cn(
                  "shrink-0 rounded-full overflow-hidden bg-muted flex items-center justify-center text-xs font-medium",
                  size === "xs" && "size-4",
                  size === "sm" && "size-5",
                  size === "md" && "size-6",
                  size === "lg" && "size-7"
                )}
              >
                {selectedOption.avatar ? (
                  <img
                    src={selectedOption.avatar}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  selectedOption.avatarInitials
                )}
              </span>
            )}
          <span className="text-foreground">{selectedOption.label}</span>
        </span>
      );
    };

    // Render a single option
    const renderSingleOption = (option: SelectOption, isSelected: boolean) => {
      if (renderOption) {
        return renderOption(option as SelectOption, isSelected);
      }

      return (
        <>
          <span className="flex flex-1 items-center gap-x-2">
            {/* Color indicator */}
            {option.color && (
              <span
                className={cn(
                  selectColorIndicatorVariants({ size }),
                  typeof option.color === "string" && option.color in colorMap
                    ? colorMap[option.color as SelectColorType]
                    : ""
                )}
                style={
                  typeof option.color === "string" &&
                  !(option.color in colorMap)
                    ? { backgroundColor: option.color }
                    : undefined
                }
              />
            )}
            {/* Icon */}
            {option.icon && <span className="shrink-0">{option.icon}</span>}
            {/* Avatar */}
            {(option.avatar || option.avatarInitials) && (
              <span
                className={cn(
                  "shrink-0 rounded-full overflow-hidden bg-muted flex items-center justify-center text-xs font-medium",
                  size === "xs" && "size-5",
                  size === "sm" && "size-6",
                  size === "md" && "size-8",
                  size === "lg" && "size-9"
                )}
              >
                {option.avatar ? (
                  <img
                    src={option.avatar}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  option.avatarInitials
                )}
              </span>
            )}
            {/* Label and description */}
            <span className="flex flex-col">
              <span className={option.description ? "font-medium" : ""}>
                {option.label}
              </span>
              {option.description && (
                <span className="text-xs text-muted-foreground">
                  {option.description}
                </span>
              )}
            </span>
          </span>
          {isSelected && <CheckIcon className="size-4 shrink-0 text-primary" />}
        </>
      );
    };

    // Options list rendered via portal
    const optionsList = isOpen ? (
      <div
        className={cn(selectDropdownVariants({ size }))}
        style={{
          top: position.top,
          left: position.left,
          width: variant === "default" ? position.width : "auto",
          minWidth: variant !== "default" ? position.width : undefined,
          visibility: positioned ? "visible" : "hidden",
        }}
      >
        {/* Search input */}
        {searchable && (
          <div className="px-2 pb-2 pt-1">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                className="w-full rounded-md border border-border bg-background py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/50"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filteredOptions.length > 0) {
                    const firstEnabled = filteredOptions.find(
                      (opt) => !opt.disabled
                    );
                    if (firstEnabled) {
                      handleSelect(firstEnabled.value);
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
        {/* Options list */}
        <div ref={listboxRef} id={listboxId} role="listbox">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-center text-sm text-muted-foreground">
              No options found
            </div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = option.value === value;
              return (
                <div
                  key={String(option.value)}
                  role="option"
                  tabIndex={-1}
                  className={cn(
                    selectOptionVariants({
                      size,
                      selected: isSelected,
                      disabled: option.disabled,
                    })
                  )}
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                  onClick={() =>
                    !option.disabled && handleSelect(option.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !option.disabled) {
                      handleSelect(option.value);
                    }
                  }}
                >
                  {renderSingleOption(option, isSelected)}
                </div>
              );
            })
          )}
        </div>
      </div>
    ) : null;

    return (
      <div
        ref={containerRef}
        className={cn(
          variant === "default" ? "relative w-full" : "relative inline-block",
          className
        )}
        {...props}
      >
        {/* Hidden input for form submission */}
        {name && <input type="hidden" name={name} value={String(value ?? "")} />}

        {/* Trigger */}
        <button
          ref={triggerRef}
          type="button"
          className={cn(
            selectTriggerVariants({ variant, size, error }),
            disabled && "cursor-not-allowed opacity-50"
          )}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
        >
          {renderTriggerContent()}
          <ChevronDownIcon
            className={cn(
              "shrink-0 text-muted-foreground transition-transform",
              size === "xs" && "size-3 ml-1",
              size === "sm" && "size-3.5 ml-1.5",
              size === "md" && "size-4 ml-2",
              size === "lg" && "size-5 ml-2",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Options via portal */}
        {typeof document !== "undefined" &&
          optionsList &&
          createPortal(optionsList, document.body)}
      </div>
    );
  }
) as <T = string>(
  props: SelectProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;
(Select as React.FC).displayName = "Select";
