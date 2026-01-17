import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { ProgressBar } from "@/components/atoms";
import { cn } from "@/lib/utils";
import { dataCardVariants } from "@/lib/variants/dataVisualization";

// ============================================
// Types
// ============================================

export interface ProgressItem {
  id: string;
  label: string;
  value: number;
  max?: number;
  color?: string;
  description?: string;
  icon?: React.ReactNode;
}

// ============================================
// ProgressbarsCard
// ============================================

export interface ProgressbarsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  items: ProgressItem[];
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  action?: React.ReactNode;
}

export const ProgressbarsCard = forwardRef<
  HTMLDivElement,
  ProgressbarsCardProps
>(
  (
    {
      className,
      variant = "bordered",
      title,
      subtitle,
      items,
      showValue = true,
      size = "md",
      action,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        {(title || action) && (
          <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
            <div>
              {title && (
                <h3 className="text-sm font-medium text-foreground">{title}</h3>
              )}
              {subtitle && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Progress Items */}
        <div className="p-4 space-y-4">
          {items.map((item, index) => {
            const max = item.max ?? 100;
            const percentage = Math.min((item.value / max) * 100, 100);
            const barColor =
              item.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={item.id}>
                <div className="flex items-center justify-between gap-x-2 mb-2">
                  <div className="flex items-center gap-x-2 min-w-0">
                    {item.icon && (
                      <span className="shrink-0 text-muted-foreground">
                        {item.icon}
                      </span>
                    )}
                    <span className="text-sm font-medium text-foreground truncate">
                      {item.label}
                    </span>
                  </div>
                  {showValue && (
                    <span className="text-sm text-muted-foreground shrink-0 tabular-nums">
                      {item.value}/{max} ({Math.round(percentage)}%)
                    </span>
                  )}
                </div>
                <ProgressBar
                  value={item.value}
                  max={max}
                  size={size}
                  color={barColor}
                />
                {item.description && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ProgressbarsCard.displayName = "ProgressbarsCard";

// ============================================
// CircularProgressCard - Circular progress indicators
// ============================================

export interface CircularProgressItem {
  id: string;
  label: string;
  value: number;
  max?: number;
  color?: string;
}

export interface CircularProgressCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  items: CircularProgressItem[];
  action?: React.ReactNode;
}

export const CircularProgressCard = forwardRef<
  HTMLDivElement,
  CircularProgressCardProps
>(
  (
    { className, variant = "bordered", title, items, action, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        {(title || action) && (
          <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
            {title && (
              <h3 className="text-sm font-medium text-foreground">{title}</h3>
            )}
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Circular Progress Items */}
        <div className="p-4 flex justify-around gap-4">
          {items.map((item, index) => {
            const max = item.max ?? 100;
            const percentage = Math.min((item.value / max) * 100, 100);
            const circumference = 2 * Math.PI * 36;
            const strokeDashoffset =
              circumference - (percentage / 100) * circumference;
            const strokeColor =
              item.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={item.id} className="flex flex-col items-center gap-y-2">
                <div className="relative size-20">
                  <svg
                    aria-hidden="true"
                    className="size-20 -rotate-90"
                    viewBox="0 0 80 80"
                    fill="none"
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      className="text-muted"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke={strokeColor}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-foreground">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
CircularProgressCard.displayName = "CircularProgressCard";

// ============================================
// CompactProgressList - Simple progress list
// ============================================

export interface CompactProgressListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  items: ProgressItem[];
  action?: React.ReactNode;
}

export const CompactProgressList = forwardRef<
  HTMLDivElement,
  CompactProgressListProps
>(
  (
    { className, variant = "bordered", title, items, action, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        {(title || action) && (
          <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
            {title && (
              <h3 className="text-sm font-medium text-foreground">{title}</h3>
            )}
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* List */}
        <div className="divide-y divide-border">
          {items.map((item, index) => {
            const max = item.max ?? 100;
            const percentage = Math.min((item.value / max) * 100, 100);
            const barColor =
              item.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div
                key={item.id}
                className="flex items-center gap-x-4 px-4 py-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground truncate">
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2 tabular-nums">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                  <ProgressBar
                    value={item.value}
                    max={max}
                    size="sm"
                    color={barColor}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
CompactProgressList.displayName = "CompactProgressList";
