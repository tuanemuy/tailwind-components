import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { dataCardVariants } from "@/lib/variants/dataVisualization";
import { TrendIndicator } from "@/components/molecules";
import type { VariantProps } from "class-variance-authority";
import type { TrendDirection, TrendVariant } from "@/lib/types";

// ============================================
// Types
// ============================================

export interface ListBarItem {
  id: string;
  label: string;
  value: number;
  percentage?: number;
  color?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
  sublabel?: string;
}

// ============================================
// ListBarCard
// ============================================

export interface ListBarCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  items: ListBarItem[];
  showValue?: boolean;
  showPercentage?: boolean;
  maxValue?: number;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const ListBarCard = forwardRef<HTMLDivElement, ListBarCardProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      subtitle,
      items,
      showValue = true,
      showPercentage = false,
      maxValue,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const max = maxValue ?? Math.max(...items.map((item) => item.value));

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
                <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Items */}
        <div className="divide-y divide-border">
          {items.map((item, index) => {
            const percentage = item.percentage ?? (item.value / max) * 100;
            const barColor = item.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={item.id} className="px-4 py-3">
                <div className="flex items-center justify-between gap-x-3 mb-2">
                  <div className="flex items-center gap-x-2 min-w-0">
                    {item.icon && (
                      <span className="shrink-0 text-muted-foreground">
                        {item.icon}
                      </span>
                    )}
                    <div className="min-w-0">
                      <span className="text-sm font-medium text-foreground truncate block">
                        {item.label}
                      </span>
                      {item.sublabel && (
                        <span className="text-xs text-muted-foreground">
                          {item.sublabel}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2 shrink-0">
                    {item.trend && (
                      <TrendIndicator
                        value={item.trend.value}
                        direction={item.trend.direction}
                        variant={item.trend.variant}
                        size="xs"
                      />
                    )}
                    {showValue && (
                      <span className="text-sm font-medium text-foreground tabular-nums">
                        {formatValue(item.value)}
                      </span>
                    )}
                    {showPercentage && (
                      <span className="text-xs text-muted-foreground tabular-nums">
                        ({Math.round(percentage)}%)
                      </span>
                    )}
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: barColor,
                    }}
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
ListBarCard.displayName = "ListBarCard";

// ============================================
// HorizontalListBarCard - Bars displayed horizontally
// ============================================

export interface HorizontalListBarCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  items: ListBarItem[];
  action?: React.ReactNode;
}

export const HorizontalListBarCard = forwardRef<HTMLDivElement, HorizontalListBarCardProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      items,
      action,
      ...props
    },
    ref,
  ) => {
    const total = items.reduce((sum, item) => sum + item.value, 0);

    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        {(title || action) && (
          <div className="flex items-center justify-between gap-x-4 px-4 py-3">
            {title && (
              <h3 className="text-sm font-medium text-foreground">{title}</h3>
            )}
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Horizontal Bar */}
        <div className="px-4 pb-4">
          <div className="flex h-4 rounded-full overflow-hidden bg-muted">
            {items.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const barColor = item.color || `hsl(var(--chart-${(index % 5) + 1}))`;

              return (
                <div
                  key={item.id}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: barColor,
                  }}
                  title={`${item.label}: ${item.value}`}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {items.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const barColor = item.color || `hsl(var(--chart-${(index % 5) + 1}))`;

              return (
                <div key={item.id} className="flex items-center gap-x-2">
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: barColor }}
                  />
                  <div className="flex items-center justify-between flex-1 min-w-0">
                    <span className="text-xs text-muted-foreground truncate">
                      {item.label}
                    </span>
                    <span className="text-xs font-medium text-foreground ml-2 tabular-nums">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);
HorizontalListBarCard.displayName = "HorizontalListBarCard";
