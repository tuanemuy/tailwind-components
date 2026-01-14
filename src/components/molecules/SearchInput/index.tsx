"use client";

import { forwardRef, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { searchInputVariants } from "@/lib/variants/searchInput";
import { SearchIcon, XIcon } from "@/lib/icons";
import { Kbd } from "@/components/atoms";
import type { VariantProps } from "class-variance-authority";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof searchInputVariants> {
  onClear?: () => void;
  showClearButton?: boolean;
  showShortcut?: boolean;
  shortcutKey?: string;
  loading?: boolean;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      size = "md",
      onClear,
      showClearButton = true,
      showShortcut = false,
      shortcutKey = "K",
      loading = false,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Handle keyboard shortcut
    useEffect(() => {
      if (!showShortcut) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === shortcutKey.toLowerCase()) {
          event.preventDefault();
          inputRef.current?.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [showShortcut, shortcutKey]);

    // Combine refs
    const setRefs = (element: HTMLInputElement | null) => {
      inputRef.current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    const iconSize = size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4";
    const hasValue = value !== undefined && value !== "";

    return (
      <div className={cn(searchInputVariants({ size }), className)}>
        <SearchIcon className={cn(iconSize, "shrink-0 text-muted-foreground")} />
        <input
          ref={setRefs}
          type="search"
          value={value}
          onChange={onChange}
          className={cn(
            "flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
            "[&::-webkit-search-cancel-button]:hidden",
            "[&::-webkit-search-decoration]:hidden"
          )}
          {...props}
        />
        {loading && (
          <svg
            className={cn(iconSize, "animate-spin text-muted-foreground")}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {showClearButton && hasValue && !loading && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <XIcon className={iconSize} />
          </button>
        )}
        {showShortcut && !hasValue && !loading && (
          <Kbd size={size === "lg" ? "md" : "sm"}>⌘{shortcutKey}</Kbd>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";
