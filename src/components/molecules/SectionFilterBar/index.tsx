"use client";

import { forwardRef, type ReactNode } from "react";
import { Button } from "@/components/atoms";
import { SearchInput } from "@/components/molecules/SearchInput";
import { Select, type SelectOption } from "@/components/molecules/Select";
import { FilterIcon, GridIcon, ListIcon } from "@/components/icons";
import { cn } from "@/components/utils";

export interface FilterTag {
  id: string;
  label: string;
  count?: number;
  icon?: ReactNode;
  active?: boolean;
}

export interface SectionFilterBarProps {
  // Search
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onSearchClear?: () => void;
  showSearch?: boolean;

  // Filter Tags
  filterTags?: FilterTag[];
  onFilterTagClick?: (tagId: string) => void;

  // Sorting
  sortOptions?: SelectOption[];
  sortValue?: string;
  onSortChange?: (value: string) => void;
  showSort?: boolean;

  // View Toggle
  view?: "grid" | "list";
  onViewChange?: (view: "grid" | "list") => void;
  showViewToggle?: boolean;

  // Filter Button
  onFilterClick?: () => void;
  filterCount?: number;
  showFilterButton?: boolean;

  // Actions
  actions?: ReactNode;
  leftActions?: ReactNode;

  // Layout
  variant?: "default" | "compact" | "stacked";
  className?: string;
}

export const SectionFilterBar = forwardRef<
  HTMLDivElement,
  SectionFilterBarProps
>(
  (
    {
      searchValue,
      searchPlaceholder = "Search...",
      onSearchChange,
      onSearchClear,
      showSearch = true,

      filterTags,
      onFilterTagClick,

      sortOptions,
      sortValue,
      onSortChange,
      showSort = false,

      view,
      onViewChange,
      showViewToggle = false,

      onFilterClick,
      filterCount,
      showFilterButton = false,

      actions,
      leftActions,

      variant = "default",
      className,
    },
    ref,
  ) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange?.(e.target.value);
    };

    if (variant === "stacked") {
      return (
        <div ref={ref} className={cn("space-y-3", className)}>
          {/* Search Row */}
          {showSearch && (
            <div className="relative">
              <SearchInput
                value={searchValue}
                onChange={handleSearchChange}
                onClear={onSearchClear}
                placeholder={searchPlaceholder}
                className="w-full"
              />
            </div>
          )}

          {/* Filter Tags and Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Filter Tags */}
            {filterTags && filterTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {filterTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => onFilterTagClick?.(tag.id)}
                    className={cn(
                      "inline-flex items-center gap-x-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                      tag.active
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {tag.icon && <span className="size-3.5">{tag.icon}</span>}
                    {tag.label}
                    {tag.count !== undefined && (
                      <span className="text-xs opacity-70">{tag.count}</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              {leftActions}

              {showSort && sortOptions && (
                <Select
                  options={sortOptions}
                  value={sortValue}
                  onChange={onSortChange}
                  placeholder="Sort by"
                  className="w-40"
                />
              )}

              {showFilterButton && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onFilterClick}
                  leftIcon={<FilterIcon className="size-3.5" />}
                >
                  Filter
                  {filterCount !== undefined && filterCount > 0 && (
                    <span className="ms-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium leading-none text-primary-foreground">
                      {filterCount}
                    </span>
                  )}
                </Button>
              )}

              {showViewToggle && (
                <div className="flex rounded-lg border border-border">
                  <button
                    type="button"
                    onClick={() => onViewChange?.("grid")}
                    className={cn(
                      "rounded-s-lg p-2 transition-colors",
                      view === "grid"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-accent",
                    )}
                    aria-label="Grid view"
                  >
                    <GridIcon className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onViewChange?.("list")}
                    className={cn(
                      "rounded-e-lg border-s border-border p-2 transition-colors",
                      view === "list"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-accent",
                    )}
                    aria-label="List view"
                  >
                    <ListIcon className="size-4" />
                  </button>
                </div>
              )}

              {actions}
            </div>
          </div>
        </div>
      );
    }

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-between gap-4", className)}
        >
          {/* Left Side */}
          <div className="flex items-center gap-3">
            {showSearch && (
              <SearchInput
                value={searchValue}
                onChange={handleSearchChange}
                onClear={onSearchClear}
                placeholder={searchPlaceholder}
                size="sm"
                className="w-48"
              />
            )}
            {leftActions}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {showSort && sortOptions && (
              <Select
                options={sortOptions}
                value={sortValue}
                onChange={onSortChange}
                placeholder="Sort"
                className="w-32"
              />
            )}

            {showFilterButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={onFilterClick}
                leftIcon={<FilterIcon className="size-3.5" />}
              >
                Filter
                {filterCount !== undefined && filterCount > 0 && (
                  <span className="ms-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium leading-none text-primary-foreground">
                    {filterCount}
                  </span>
                )}
              </Button>
            )}

            {actions}
          </div>
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-y-2 md:grid-cols-2 md:gap-x-5 md:gap-y-0",
          className,
        )}
      >
        {/* Left Side - Search */}
        <div className="flex items-center gap-3">
          {showSearch && (
            <SearchInput
              value={searchValue}
              onChange={handleSearchChange}
              onClear={onSearchClear}
              placeholder={searchPlaceholder}
              className="flex-1"
            />
          )}
          {leftActions}
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center justify-start gap-2 md:justify-end">
          {/* Filter Tags (inline on larger screens) */}
          {filterTags && filterTags.length > 0 && (
            <div className="hidden flex-wrap gap-1.5 lg:flex">
              {filterTags.slice(0, 3).map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => onFilterTagClick?.(tag.id)}
                  className={cn(
                    "inline-flex items-center gap-x-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                    tag.active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {tag.icon && <span className="size-3.5">{tag.icon}</span>}
                  {tag.label}
                  {tag.count !== undefined && (
                    <span className="text-xs opacity-70">{tag.count}</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {showSort && sortOptions && (
            <Select
              options={sortOptions}
              value={sortValue}
              onChange={onSortChange}
              placeholder="Sort by"
              className="w-36"
            />
          )}

          {showFilterButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={onFilterClick}
              leftIcon={<FilterIcon className="size-3.5" />}
            >
              Filter
              {filterCount !== undefined && filterCount > 0 && (
                <span className="ms-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium leading-none text-primary-foreground">
                  {filterCount}
                </span>
              )}
            </Button>
          )}

          {showViewToggle && (
            <div className="flex rounded-lg border border-border">
              <button
                type="button"
                onClick={() => onViewChange?.("grid")}
                className={cn(
                  "rounded-s-lg p-2 transition-colors",
                  view === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-accent",
                )}
                aria-label="Grid view"
              >
                <GridIcon className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => onViewChange?.("list")}
                className={cn(
                  "rounded-e-lg border-s border-border p-2 transition-colors",
                  view === "list"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-accent",
                )}
                aria-label="List view"
              >
                <ListIcon className="size-4" />
              </button>
            </div>
          )}

          {actions}
        </div>
      </div>
    );
  },
);
SectionFilterBar.displayName = "SectionFilterBar";
