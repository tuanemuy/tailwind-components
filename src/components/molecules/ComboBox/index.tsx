"use client";

import type { VariantProps } from "class-variance-authority";
import type { KeyboardEvent } from "react";
import { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckIcon, ChevronDownIcon, SearchIcon } from "@/components/icons";
import { cn } from "@/components/utils";
import {
  comboBoxItemVariants,
  comboBoxTriggerVariants,
} from "@/components/variants/comboBox";

export interface ComboBoxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof comboBoxTriggerVariants> {
  options: ComboBoxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  clearable?: boolean;
  searchable?: boolean;
}

export const ComboBox = forwardRef<HTMLDivElement, ComboBoxProps>(
  (
    {
      className,
      size = "md",
      options,
      value,
      onChange,
      placeholder = "Select option",
      searchPlaceholder = "Search...",
      emptyMessage = "No options found",
      disabled = false,
      clearable: _clearable = false,
      searchable = true,
    },
    _ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const [positioned, setPositioned] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    const filteredOptions = useMemo(() => {
      if (!searchQuery) return options;
      return options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }, [options, searchQuery]);

    // Reset positioned when closing
    useEffect(() => {
      if (!isOpen) {
        setPositioned(false);
      }
    }, [isOpen]);

    // Calculate position when open
    useLayoutEffect(() => {
      if (!isOpen || !triggerRef.current || !contentRef.current) return;

      const updatePosition = () => {
        if (!triggerRef.current || !contentRef.current) return;
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        let top = triggerRect.bottom + 4;
        const left = triggerRect.left;
        const width = triggerRect.width;

        // Check if content would overflow below viewport
        if (top + contentRect.height > viewportHeight) {
          if (triggerRect.top > viewportHeight - triggerRect.bottom) {
            top = triggerRect.top - contentRect.height - 4;
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

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          containerRef.current &&
          !containerRef.current.contains(target) &&
          contentRef.current &&
          !contentRef.current.contains(target)
        ) {
          setIsOpen(false);
          setSearchQuery("");
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Focus input when opening
    useEffect(() => {
      if (isOpen && searchable) {
        inputRef.current?.focus();
      }
    }, [isOpen, searchable]);

    // Reset highlighted index when filtered options change
    useEffect(() => {
      setHighlightedIndex(0);
    }, []);

    // Scroll highlighted item into view
    useEffect(() => {
      if (listRef.current && highlightedIndex >= 0) {
        const items = listRef.current.querySelectorAll("[data-combobox-item]");
        items[highlightedIndex]?.scrollIntoView({ block: "nearest" });
      }
    }, [highlightedIndex]);

    const handleSelect = (optionValue: string) => {
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchQuery("");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex].value);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSearchQuery("");
          break;
      }
    };

    const iconSize =
      size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4";

    const contentPanel = isOpen ? (
      <div
        ref={contentRef}
        className={cn(
          "fixed z-[9999] overflow-hidden rounded-lg border border-border bg-card shadow-lg",
        )}
        style={{
          top: position.top,
          left: position.left,
          width: position.width,
          visibility: positioned ? "visible" : "hidden",
        }}
      >
        {/* Search input */}
        {searchable && (
          <div className="border-b border-border p-2">
            <div className="flex items-center gap-x-2 rounded-md bg-muted px-2">
              <SearchIcon className={cn(iconSize, "text-muted-foreground")} />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={searchPlaceholder}
                className={cn(
                  "w-full bg-transparent py-1.5 outline-none placeholder:text-muted-foreground",
                  size === "sm"
                    ? "text-xs"
                    : size === "lg"
                      ? "text-base"
                      : "text-sm",
                )}
              />
            </div>
          </div>
        )}

        {/* Options list */}
        <div
          ref={listRef}
          className="max-h-60 overflow-auto p-1"
          role="listbox"
        >
          {filteredOptions.length === 0 ? (
            <div
              className={cn(
                "py-6 text-center text-muted-foreground",
                size === "sm"
                  ? "text-xs"
                  : size === "lg"
                    ? "text-base"
                    : "text-sm",
              )}
            >
              {emptyMessage}
            </div>
          ) : (
            filteredOptions.map((option, index) => {
              const isSelected = option.value === value;
              const isHighlighted = index === highlightedIndex;

              return (
                <div
                  key={option.value}
                  data-combobox-item
                  role="option"
                  tabIndex={-1}
                  aria-selected={isSelected}
                  className={cn(
                    comboBoxItemVariants({
                      size,
                      selected: isSelected,
                      highlighted: isHighlighted,
                    }),
                    option.disabled && "cursor-not-allowed opacity-50",
                    "rounded-md",
                  )}
                  onClick={() =>
                    !option.disabled && handleSelect(option.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !option.disabled) {
                      handleSelect(option.value);
                    }
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <span className="flex-1">{option.label}</span>
                  {isSelected && <CheckIcon className={iconSize} />}
                </div>
              );
            })
          )}
        </div>
      </div>
    ) : null;

    return (
      <div ref={containerRef} className="relative inline-block w-full">
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          className={cn(
            comboBoxTriggerVariants({ size }),
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={cn(!selectedOption && "text-muted-foreground")}>
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDownIcon
            className={cn(
              iconSize,
              "shrink-0 transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {typeof document !== "undefined" &&
          contentPanel &&
          createPortal(contentPanel, document.body)}
      </div>
    );
  },
);
ComboBox.displayName = "ComboBox";
