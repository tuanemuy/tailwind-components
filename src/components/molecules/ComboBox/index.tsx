"use client";

import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import type { KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import {
  comboBoxTriggerVariants,
  comboBoxContentVariants,
  comboBoxItemVariants,
} from "@/lib/variants/comboBox";
import { ChevronDownIcon, CheckIcon, SearchIcon } from "@/lib/icons";
import type { VariantProps } from "class-variance-authority";

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
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    const filteredOptions = useMemo(() => {
      if (!searchQuery) return options;
      return options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery]);

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchQuery("");
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => document.removeEventListener("mousedown", handleClickOutside);
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
    }, [filteredOptions]);

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
            prev < filteredOptions.length - 1 ? prev + 1 : prev
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

    const iconSize = size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4";

    return (
      <div ref={containerRef} className="relative inline-block w-full">
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          disabled={disabled}
          className={cn(
            comboBoxTriggerVariants({ size }),
            disabled && "cursor-not-allowed opacity-50",
            className
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
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div className={cn(comboBoxContentVariants({ size }), "overflow-hidden")}>
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
                      size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
                    )}
                  />
                </div>
              </div>
            )}

            {/* Options list */}
            <div ref={listRef} className="max-h-60 overflow-auto p-1" role="listbox">
              {filteredOptions.length === 0 ? (
                <div className={cn(
                  "py-6 text-center text-muted-foreground",
                  size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
                )}>
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
                      aria-selected={isSelected}
                      className={cn(
                        comboBoxItemVariants({
                          size,
                          selected: isSelected,
                          highlighted: isHighlighted,
                        }),
                        option.disabled && "cursor-not-allowed opacity-50",
                        "rounded-md"
                      )}
                      onClick={() => !option.disabled && handleSelect(option.value)}
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
        )}
      </div>
    );
  }
);
ComboBox.displayName = "ComboBox";
