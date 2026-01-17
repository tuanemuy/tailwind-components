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
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  multiSelectContainerVariants,
  multiSelectTagRemoveVariants,
  multiSelectTagVariants,
  selectDropdownVariants,
  selectOptionVariants,
} from "@/lib/variants";

/** Color configuration for status indicators */
export type MultiSelectColorType =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";

/** Extended option with rich content support */
export interface MultiSelectOption<T = string> {
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
  color?: MultiSelectColorType | string;
}

export interface MultiSelectProps<T = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  options: MultiSelectOption<T>[];
  value?: T[];
  defaultValue?: T[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  onChange?: (values: T[]) => void;
  /** Alias for onChange */
  onValueChange?: (values: T[]) => void;
  name?: string;
  /** Size variant */
  size?: "xs" | "sm" | "md" | "lg";
  /** Enable search/filter within dropdown */
  searchable?: boolean;
  /** Placeholder for search input */
  searchPlaceholder?: string;
  /** Maximum number of selections */
  maxSelections?: number;
  /** Custom render function for options */
  renderOption?: (
    option: MultiSelectOption<T>,
    isSelected: boolean
  ) => ReactNode;
  /** Custom render function for tags */
  renderTag?: (option: MultiSelectOption<T>, onRemove: () => void) => ReactNode;
  /** Tag style variant */
  tagVariant?: "default" | "pill" | "avatar";
}

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      className,
      options,
      value: controlledValue,
      defaultValue = [],
      placeholder = "Select options...",
      disabled,
      error = false,
      onChange,
      onValueChange,
      name,
      size = "md",
      searchable = false,
      searchPlaceholder = "Search...",
      maxSelections,
      renderOption,
      renderTag,
      tagVariant = "default",
      ...props
    },
    _ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string[]>(
      (defaultValue as string[]) || []
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const [positioned, setPositioned] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const listboxId = useId();

    const isControlled = controlledValue !== undefined;
    const values = isControlled
      ? (controlledValue as string[])
      : internalValue;
    const selectedOptions = options.filter((opt) =>
      values.includes(opt.value as string)
    );

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

    const handleSelect = (optionValue: string) => {
      let newValues: string[];
      if (values.includes(optionValue)) {
        // Remove if already selected
        newValues = values.filter((v) => v !== optionValue);
      } else {
        // Add if not at max
        if (maxSelections && values.length >= maxSelections) {
          return;
        }
        newValues = [...values, optionValue];
      }

      if (!isControlled) {
        setInternalValue(newValues);
      }
      handleValueChange?.(newValues as never);
    };

    const handleRemove = (optionValue: string) => {
      const newValues = values.filter((v) => v !== optionValue);
      if (!isControlled) {
        setInternalValue(newValues);
      }
      handleValueChange?.(newValues as never);
    };

    // Reset positioned when closing
    useEffect(() => {
      if (!isOpen) {
        setPositioned(false);
        setSearchQuery("");
      } else if (searchable && searchInputRef.current) {
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

        if (top + listboxRect.height > viewportHeight) {
          if (triggerRect.top > viewportHeight - triggerRect.bottom) {
            top = triggerRect.top - listboxRect.height - 4;
          }
        }

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
        case "Escape":
          setIsOpen(false);
          break;
        case "Backspace":
          if (searchQuery === "" && values.length > 0) {
            handleRemove(values[values.length - 1]);
          }
          break;
      }
    };

    // Render a single tag
    const renderSingleTag = (option: MultiSelectOption) => {
      const onRemove = () => handleRemove(option.value as string);

      if (renderTag) {
        return renderTag(option as MultiSelectOption, onRemove);
      }

      const showAvatar =
        tagVariant === "avatar" &&
        (option.avatar || option.avatarInitials);

      return (
        <span
          key={String(option.value)}
          className={cn(
            multiSelectTagVariants({ size }),
            tagVariant === "pill" && "rounded-full",
            "border-border"
          )}
        >
          {showAvatar && (
            <span
              className={cn(
                "shrink-0 rounded-full overflow-hidden bg-muted flex items-center justify-center text-xs font-medium",
                size === "xs" && "size-4",
                size === "sm" && "size-5",
                size === "md" && "size-6",
                size === "lg" && "size-6"
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
          {option.icon && !showAvatar && (
            <span className="shrink-0">{option.icon}</span>
          )}
          <span className="truncate">{option.label}</span>
          <button
            type="button"
            className={cn(multiSelectTagRemoveVariants({ size }))}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            aria-label={`Remove ${option.label}`}
          >
            <XIcon className="size-3" />
          </button>
        </span>
      );
    };

    // Render a single option
    const renderSingleOption = (
      option: MultiSelectOption,
      isSelected: boolean
    ) => {
      if (renderOption) {
        return renderOption(option as MultiSelectOption, isSelected);
      }

      return (
        <>
          <span className="flex flex-1 items-center gap-x-2">
            {option.icon && <span className="shrink-0">{option.icon}</span>}
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
          width: position.width,
          visibility: positioned ? "visible" : "hidden",
        }}
      >
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
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        )}
        <div ref={listboxRef} id={listboxId} role="listbox">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-center text-sm text-muted-foreground">
              No options found
            </div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = values.includes(option.value as string);
              const isDisabled =
                option.disabled ||
                (!isSelected &&
                  maxSelections !== undefined &&
                  values.length >= maxSelections);

              return (
                <div
                  key={String(option.value)}
                  role="option"
                  tabIndex={-1}
                  className={cn(
                    selectOptionVariants({
                      size,
                      selected: isSelected,
                      disabled: isDisabled,
                    })
                  )}
                  aria-selected={isSelected}
                  aria-disabled={isDisabled}
                  onClick={() => !isDisabled && handleSelect(option.value as string)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isDisabled) {
                      handleSelect(option.value as string);
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
      <div ref={containerRef} className={cn("relative w-full", className)} {...props}>
        {/* Hidden inputs for form submission */}
        {name &&
          values.map((v) => (
            <input
              key={String(v)}
              type="hidden"
              name={`${name}[]`}
              value={String(v)}
            />
          ))}

        {/* Trigger container */}
        <div
          ref={triggerRef}
          className={cn(
            multiSelectContainerVariants({ size, error }),
            disabled && "cursor-not-allowed opacity-50"
          )}
          onClick={() => !disabled && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          tabIndex={disabled ? -1 : 0}
        >
          {/* Selected tags */}
          {selectedOptions.map((option) => renderSingleTag(option))}

          {/* Inline search input or placeholder */}
          {searchable && isOpen ? (
            <input
              ref={searchInputRef}
              type="text"
              className={cn(
                "flex-1 min-w-[120px] bg-transparent border-none outline-none focus:ring-0",
                size === "xs" && "text-xs py-0.5",
                size === "sm" && "text-sm py-0.5",
                size === "md" && "text-sm py-1",
                size === "lg" && "text-base py-1"
              )}
              placeholder={
                selectedOptions.length === 0 ? placeholder : searchPlaceholder
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleKeyDown}
            />
          ) : selectedOptions.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : null}

          {/* Chevron */}
          <ChevronDownIcon
            className={cn(
              "absolute right-2.5 top-1/2 -translate-y-1/2 shrink-0 text-muted-foreground transition-transform",
              size === "xs" && "size-3",
              size === "sm" && "size-3.5",
              size === "md" && "size-4",
              size === "lg" && "size-5",
              isOpen && "rotate-180"
            )}
          />
        </div>

        {/* Options via portal */}
        {typeof document !== "undefined" &&
          optionsList &&
          createPortal(optionsList, document.body)}
      </div>
    );
  }
) as <T = string>(
  props: MultiSelectProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;
(MultiSelect as React.FC).displayName = "MultiSelect";
