"use client";

import { createContext, forwardRef, useContext, useId, useState } from "react";
import { Badge, Button, Input } from "@/components/atoms";
import { ChevronDownIcon, FilterIcon, XIcon } from "@/components/icons";
import { cn } from "@/components/utils";

// Filter context for state management
interface FilterContextValue {
  onClear?: () => void;
  onApply?: () => void;
}

const FilterContext = createContext<FilterContextValue>({});

export const useFilterContext = () => useContext(FilterContext);

// Variant types
type FilterFormVariant = "default" | "card" | "sidebar" | "inline";

// Main FilterForm component
export interface FilterFormProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: FilterFormVariant;
  activeCount?: number;
  onClear?: () => void;
  onApply?: () => void;
}

const filterFormVariants: Record<FilterFormVariant, string> = {
  default: "",
  card: "rounded-xl border border-border bg-card overflow-hidden",
  sidebar: "h-full",
  inline: "flex flex-wrap items-center gap-3",
};

export const FilterForm = forwardRef<HTMLDivElement, FilterFormProps>(
  (
    {
      className,
      variant = "default",
      activeCount,
      onClear,
      onApply,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <FilterContext.Provider value={{ onClear, onApply }}>
        <search
          ref={ref}
          className={cn(filterFormVariants[variant], className)}
          aria-label="Filters"
          {...props}
        >
          {children}
        </search>
      </FilterContext.Provider>
    );
  },
);
FilterForm.displayName = "FilterForm";

// FilterHeader component
export interface FilterHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  activeCount?: number;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export const FilterHeader = forwardRef<HTMLDivElement, FilterHeaderProps>(
  (
    {
      className,
      title = "Filters",
      activeCount,
      collapsible = false,
      defaultCollapsed = false,
      onCollapse,
      children,
      ...props
    },
    ref,
  ) => {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
    const { onClear } = useFilterContext();

    const handleToggle = () => {
      const newState = !isCollapsed;
      setIsCollapsed(newState);
      onCollapse?.(newState);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-x-3 p-4 border-b border-border",
          className,
        )}
        {...props}
      >
        {children || (
          <>
            <div className="flex items-center gap-x-2">
              <FilterIcon className="size-5 text-muted-foreground" />
              <h3 className="font-medium text-foreground">{title}</h3>
              {typeof activeCount === "number" && activeCount > 0 && (
                <Badge variant="secondary" size="sm" soft>
                  {activeCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-x-2">
              {onClear && activeCount && activeCount > 0 && (
                <Button variant="ghost" size="sm" onClick={onClear}>
                  Clear all
                </Button>
              )}
              {collapsible && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggle}
                  aria-expanded={!isCollapsed}
                >
                  <ChevronDownIcon
                    className={cn(
                      "size-4 transition-transform",
                      isCollapsed && "-rotate-90",
                    )}
                  />
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    );
  },
);
FilterHeader.displayName = "FilterHeader";

// FilterBody component
export interface FilterBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
}

export const FilterBody = forwardRef<HTMLDivElement, FilterBodyProps>(
  ({ className, collapsed = false, children, ...props }, ref) => {
    if (collapsed) return null;

    return (
      <div ref={ref} className={cn("p-4 space-y-4", className)} {...props}>
        {children}
      </div>
    );
  },
);
FilterBody.displayName = "FilterBody";

// FilterSection component - collapsible section for filter groups
export interface FilterSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  defaultExpanded?: boolean;
  badge?: React.ReactNode;
}

export const FilterSection = forwardRef<HTMLDivElement, FilterSectionProps>(
  (
    { className, title, defaultExpanded = true, badge, children, ...props },
    ref,
  ) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const id = useId();
    const contentId = `${id}-content`;

    return (
      <div ref={ref} className={cn("", className)} {...props}>
        <button
          type="button"
          className="flex w-full items-center justify-between py-2 text-sm font-medium text-foreground"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-controls={contentId}
        >
          <span className="flex items-center gap-x-2">
            {title}
            {badge}
          </span>
          <ChevronDownIcon
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              !isExpanded && "-rotate-90",
            )}
          />
        </button>
        {isExpanded && (
          <div id={contentId} className="pt-2 space-y-2">
            {children}
          </div>
        )}
      </div>
    );
  },
);
FilterSection.displayName = "FilterSection";

// FilterGroup component - for grouping related filters
export interface FilterGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export const FilterGroup = forwardRef<HTMLDivElement, FilterGroupProps>(
  ({ className, label, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {label && (
          <span className="mb-2 block text-sm font-medium text-foreground">
            {label}
          </span>
        )}
        {children}
      </div>
    );
  },
);
FilterGroup.displayName = "FilterGroup";

// FilterChip component - for active filter display
export interface FilterChipProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  value?: string;
  onRemove?: () => void;
}

export const FilterChip = forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ className, label, value, onRemove, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center gap-x-1.5 rounded-full border border-border bg-accent/50 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent",
          className,
        )}
        onClick={onRemove}
        aria-label={
          onRemove
            ? `Remove filter: ${label}${value ? ` ${value}` : ""}`
            : undefined
        }
        {...props}
      >
        <span>{label}</span>
        {value && (
          <>
            <span className="text-muted-foreground">:</span>
            <span className="text-foreground">{value}</span>
          </>
        )}
        {onRemove && (
          <XIcon className="size-3 text-muted-foreground hover:text-foreground" />
        )}
      </button>
    );
  },
);
FilterChip.displayName = "FilterChip";

// FilterChipGroup component - container for filter chips
export interface FilterChipGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClearAll?: () => void;
}

export const FilterChipGroup = forwardRef<HTMLDivElement, FilterChipGroupProps>(
  ({ className, onClearAll, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center gap-2", className)}
        {...props}
      >
        {children}
        {onClearAll && (
          <button
            type="button"
            className="text-xs font-medium text-primary hover:text-primary/80"
            onClick={onClearAll}
          >
            Clear all
          </button>
        )}
      </div>
    );
  },
);
FilterChipGroup.displayName = "FilterChipGroup";

// FilterActions component - apply/clear buttons
export interface FilterActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showClear?: boolean;
  showApply?: boolean;
  clearText?: string;
  applyText?: string;
  onClear?: () => void;
  onApply?: () => void;
}

export const FilterActions = forwardRef<HTMLDivElement, FilterActionsProps>(
  (
    {
      className,
      showClear = true,
      showApply = true,
      clearText = "Clear",
      applyText = "Apply Filters",
      onClear: onClearProp,
      onApply: onApplyProp,
      children,
      ...props
    },
    ref,
  ) => {
    const { onClear: contextClear, onApply: contextApply } = useFilterContext();
    const onClear = onClearProp || contextClear;
    const onApply = onApplyProp || contextApply;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-x-2 p-4 border-t border-border",
          className,
        )}
        {...props}
      >
        {children || (
          <>
            {showClear && onClear && (
              <Button variant="outline" className="flex-1" onClick={onClear}>
                {clearText}
              </Button>
            )}
            {showApply && onApply && (
              <Button className="flex-1" onClick={onApply}>
                {applyText}
              </Button>
            )}
          </>
        )}
      </div>
    );
  },
);
FilterActions.displayName = "FilterActions";

// DateRangeFilter component - common filter type
export interface DateRangeFilterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
}

export const DateRangeFilter = forwardRef<HTMLDivElement, DateRangeFilterProps>(
  (
    {
      className,
      label = "Date Range",
      startDate,
      endDate,
      onStartDateChange,
      onEndDateChange,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {label && (
          <span className="mb-2 block text-sm font-medium text-foreground">
            {label}
          </span>
        )}
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="date"
            inputSize="sm"
            value={startDate}
            onChange={(e) => onStartDateChange?.(e.target.value)}
            aria-label="Start date"
          />
          <Input
            type="date"
            inputSize="sm"
            value={endDate}
            onChange={(e) => onEndDateChange?.(e.target.value)}
            aria-label="End date"
          />
        </div>
      </div>
    );
  },
);
DateRangeFilter.displayName = "DateRangeFilter";

// PriceRangeFilter component - common filter type
export interface PriceRangeFilterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  minValue?: number;
  maxValue?: number;
  currency?: string;
  onMinChange?: (value: number) => void;
  onMaxChange?: (value: number) => void;
}

export const PriceRangeFilter = forwardRef<
  HTMLDivElement,
  PriceRangeFilterProps
>(
  (
    {
      className,
      label = "Price Range",
      minValue,
      maxValue,
      currency = "$",
      onMinChange,
      onMaxChange,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {label && (
          <span className="mb-2 block text-sm font-medium text-foreground">
            {label}
          </span>
        )}
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            inputSize="sm"
            leftIcon={<span className="text-sm">{currency}</span>}
            placeholder="Min"
            value={minValue ?? ""}
            onChange={(e) => onMinChange?.(Number.parseFloat(e.target.value))}
            min={0}
          />
          <Input
            type="number"
            inputSize="sm"
            leftIcon={<span className="text-sm">{currency}</span>}
            placeholder="Max"
            value={maxValue ?? ""}
            onChange={(e) => onMaxChange?.(Number.parseFloat(e.target.value))}
            min={0}
          />
        </div>
      </div>
    );
  },
);
PriceRangeFilter.displayName = "PriceRangeFilter";
