import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { dataCardVariants } from "@/lib/variants/dataVisualization";
import { TrendIndicator } from "@/components/molecules";
import type { VariantProps } from "class-variance-authority";
import type { TrendDirection, TrendVariant } from "@/lib/types";

// ============================================
// Types
// ============================================

export interface StackedBarItem {
  id: string;
  label: string;
  segments: {
    id: string;
    value: number;
    color?: string;
  }[];
  total?: number;
}

export interface StackedProgressItem {
  id: string;
  label: string;
  current: number;
  target: number;
  color?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
}

// ============================================
// StackedProgressCard - Multiple stacked progress bars
// ============================================

export interface StackedProgressCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  items: StackedProgressItem[];
  showTarget?: boolean;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const StackedProgressCard = forwardRef<HTMLDivElement, StackedProgressCardProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      subtitle,
      items,
      showTarget = true,
      action,
      formatValue = (v) => v.toLocaleString(),
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
                <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Progress Items */}
        <div className="p-4 space-y-5">
          {items.map((item, index) => {
            const percentage = Math.min((item.current / item.target) * 100, 100);
            const barColor = item.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={item.id}>
                <div className="flex items-center justify-between gap-x-3 mb-2">
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
                  <div className="flex items-center gap-x-2 shrink-0">
                    {item.trend && (
                      <TrendIndicator
                        value={item.trend.value}
                        direction={item.trend.direction}
                        variant={item.trend.variant}
                        size="xs"
                      />
                    )}
                    <span className="text-sm text-foreground tabular-nums">
                      {formatValue(item.current)}
                      {showTarget && (
                        <span className="text-muted-foreground">
                          /{formatValue(item.target)}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <div className="relative h-2.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: barColor,
                    }}
                  />
                </div>
                <div className="mt-1 text-right">
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {Math.round(percentage)}% achieved
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
StackedProgressCard.displayName = "StackedProgressCard";

// ============================================
// HorizontalStackedCard - Horizontal stacked bars
// ============================================

export interface StackedBarLegendItem {
  id: string;
  label: string;
  color: string;
}

export interface HorizontalStackedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  items: StackedBarItem[];
  legend: StackedBarLegendItem[];
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const HorizontalStackedCard = forwardRef<HTMLDivElement, HorizontalStackedCardProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      items,
      legend,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const maxTotal = Math.max(
      ...items.map(item =>
        item.total ?? item.segments.reduce((sum, seg) => sum + seg.value, 0)
      )
    );

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

        {/* Legend */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center gap-x-4 flex-wrap">
            {legend.map((item) => (
              <div key={item.id} className="flex items-center gap-x-1.5">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stacked Bars */}
        <div className="px-4 pb-4 space-y-3">
          {items.map((item) => {
            const itemTotal = item.total ?? item.segments.reduce((sum, seg) => sum + seg.value, 0);
            const maxWidth = (itemTotal / maxTotal) * 100;

            return (
              <div key={item.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground truncate">{item.label}</span>
                  <span className="text-xs text-muted-foreground tabular-nums ml-2">
                    {formatValue(itemTotal)}
                  </span>
                </div>
                <div className="flex h-4 rounded overflow-hidden bg-muted" style={{ width: `${maxWidth}%` }}>
                  {item.segments.map((segment, segIndex) => {
                    const segmentPercentage = (segment.value / itemTotal) * 100;
                    const segmentColor = segment.color || legend[segIndex]?.color || `hsl(var(--chart-${(segIndex % 5) + 1}))`;

                    return (
                      <div
                        key={segment.id}
                        className="h-full"
                        style={{
                          width: `${segmentPercentage}%`,
                          backgroundColor: segmentColor,
                        }}
                        title={`${formatValue(segment.value)}`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
HorizontalStackedCard.displayName = "HorizontalStackedCard";

// ============================================
// VerticalStackedCard - Vertical stacked bar chart
// ============================================

export interface VerticalStackedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  items: StackedBarItem[];
  legend: StackedBarLegendItem[];
  maxHeight?: number;
  action?: React.ReactNode;
}

export const VerticalStackedCard = forwardRef<HTMLDivElement, VerticalStackedCardProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      items,
      legend,
      maxHeight = 160,
      action,
      ...props
    },
    ref,
  ) => {
    const maxTotal = Math.max(
      ...items.map(item =>
        item.total ?? item.segments.reduce((sum, seg) => sum + seg.value, 0)
      )
    );

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

        {/* Chart */}
        <div className="p-4">
          <div
            className="flex items-end justify-around gap-x-4"
            style={{ height: maxHeight }}
          >
            {items.map((item) => {
              const itemTotal = item.total ?? item.segments.reduce((sum, seg) => sum + seg.value, 0);
              const barHeight = (itemTotal / maxTotal) * 100;

              return (
                <div key={item.id} className="flex flex-col items-center gap-y-2 flex-1">
                  <div
                    className="w-full max-w-16 flex flex-col-reverse rounded overflow-hidden"
                    style={{ height: `${barHeight}%` }}
                  >
                    {item.segments.map((segment, segIndex) => {
                      const segmentPercentage = (segment.value / itemTotal) * 100;
                      const segmentColor = segment.color || legend[segIndex]?.color || `hsl(var(--chart-${(segIndex % 5) + 1}))`;

                      return (
                        <div
                          key={segment.id}
                          className="w-full transition-all duration-500"
                          style={{
                            height: `${segmentPercentage}%`,
                            backgroundColor: segmentColor,
                          }}
                        />
                      );
                    })}
                  </div>
                  <span className="text-xs text-muted-foreground text-center truncate w-full">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center gap-x-4 flex-wrap">
            {legend.map((item) => (
              <div key={item.id} className="flex items-center gap-x-1.5">
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
VerticalStackedCard.displayName = "VerticalStackedCard";
