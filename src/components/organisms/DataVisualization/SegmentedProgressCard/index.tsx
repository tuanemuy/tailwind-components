import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/components/utils";
import { dataCardVariants } from "@/components/variants/dataVisualization";

// ============================================
// Types
// ============================================

export interface SegmentData {
  id: string;
  label: string;
  value: number;
  color?: string;
  icon?: React.ReactNode;
}

// ============================================
// SegmentedProgressCard
// ============================================

export interface SegmentedProgressCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  segments: SegmentData[];
  totalLabel?: string;
  showLegend?: boolean;
  showValues?: boolean;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const SegmentedProgressCard = forwardRef<
  HTMLDivElement,
  SegmentedProgressCardProps
>(
  (
    {
      className,
      variant = "bordered",
      title,
      subtitle,
      segments,
      totalLabel = "Total",
      showLegend = true,
      showValues = true,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const total = segments.reduce((sum, segment) => sum + segment.value, 0);

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

        {/* Main Value */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-baseline gap-x-2">
            <span className="text-3xl font-bold text-foreground">
              {formatValue(total)}
            </span>
            <span className="text-sm text-muted-foreground">{totalLabel}</span>
          </div>
        </div>

        {/* Segmented Progress Bar */}
        <div className="px-4 pb-4">
          <div className="flex h-3 rounded-full overflow-hidden bg-muted">
            {segments.map((segment, index) => {
              const percentage = (segment.value / total) * 100;
              const segmentColor =
                segment.color || `hsl(var(--chart-${(index % 5) + 1}))`;

              return (
                <div
                  key={segment.id}
                  className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: segmentColor,
                  }}
                  title={`${segment.label}: ${formatValue(segment.value)} (${Math.round(percentage)}%)`}
                />
              );
            })}
          </div>

          {/* Legend */}
          {showLegend && (
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {segments.map((segment, index) => {
                const percentage = (segment.value / total) * 100;
                const segmentColor =
                  segment.color || `hsl(var(--chart-${(index % 5) + 1}))`;

                return (
                  <div key={segment.id} className="flex items-center gap-x-2">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: segmentColor }}
                    />
                    <div className="flex items-center justify-between flex-1 min-w-0">
                      <div className="flex items-center gap-x-1.5 min-w-0">
                        {segment.icon && (
                          <span className="shrink-0 text-muted-foreground">
                            {segment.icon}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground truncate">
                          {segment.label}
                        </span>
                      </div>
                      {showValues && (
                        <span className="text-xs font-medium text-foreground ml-2 tabular-nums">
                          {Math.round(percentage)}%
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  },
);
SegmentedProgressCard.displayName = "SegmentedProgressCard";

// ============================================
// DonutSegmentedCard - Circular segmented display
// ============================================

export interface DonutSegmentedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  segments: SegmentData[];
  centerLabel?: string;
  centerValue?: string | number;
  showLegend?: boolean;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const DonutSegmentedCard = forwardRef<
  HTMLDivElement,
  DonutSegmentedCardProps
>(
  (
    {
      className,
      variant = "bordered",
      title,
      segments,
      centerLabel,
      centerValue,
      showLegend = true,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const total = segments.reduce((sum, segment) => sum + segment.value, 0);
    const radius = 60;
    const circumference = 2 * Math.PI * radius;

    let cumulativePercentage = 0;

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

        {/* Donut Chart */}
        <div className="p-4">
          <div className="flex items-center justify-center gap-x-8">
            <div className="relative size-40">
              <svg
                aria-hidden="true"
                className="size-40 -rotate-90"
                viewBox="0 0 140 140"
              >
                <circle
                  cx="70"
                  cy="70"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="16"
                  className="text-muted"
                />
                {segments.map((segment, index) => {
                  const percentage = (segment.value / total) * 100;
                  const segmentColor =
                    segment.color || `hsl(var(--chart-${(index % 5) + 1}))`;
                  const strokeDasharray = (percentage / 100) * circumference;
                  const strokeDashoffset =
                    -(cumulativePercentage / 100) * circumference;
                  cumulativePercentage += percentage;

                  return (
                    <circle
                      key={segment.id}
                      cx="70"
                      cy="70"
                      r={radius}
                      fill="none"
                      stroke={segmentColor}
                      strokeWidth="16"
                      strokeDasharray={`${strokeDasharray} ${circumference}`}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-500"
                    />
                  );
                })}
              </svg>
              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {centerValue !== undefined && (
                  <span className="text-2xl font-bold text-foreground">
                    {typeof centerValue === "number"
                      ? formatValue(centerValue)
                      : centerValue}
                  </span>
                )}
                {centerLabel && (
                  <span className="text-xs text-muted-foreground">
                    {centerLabel}
                  </span>
                )}
              </div>
            </div>

            {/* Legend */}
            {showLegend && (
              <div className="flex flex-col gap-y-2">
                {segments.map((segment, index) => {
                  const percentage = (segment.value / total) * 100;
                  const segmentColor =
                    segment.color || `hsl(var(--chart-${(index % 5) + 1}))`;

                  return (
                    <div key={segment.id} className="flex items-center gap-x-2">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: segmentColor }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {segment.label}
                      </span>
                      <span className="text-xs font-medium text-foreground tabular-nums">
                        {Math.round(percentage)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
DonutSegmentedCard.displayName = "DonutSegmentedCard";

// ============================================
// CompactSegmentedCard - Minimal segmented display
// ============================================

export interface CompactSegmentedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  label: string;
  segments: SegmentData[];
  formatValue?: (value: number) => string;
}

export const CompactSegmentedCard = forwardRef<
  HTMLDivElement,
  CompactSegmentedCardProps
>(
  (
    {
      className,
      variant = "bordered",
      label,
      segments,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const total = segments.reduce((sum, segment) => sum + segment.value, 0);

    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), "p-4", className)}
        {...props}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-sm font-medium text-foreground tabular-nums">
            {formatValue(total)}
          </span>
        </div>

        {/* Compact Segmented Bar */}
        <div className="flex h-2 rounded-full overflow-hidden bg-muted">
          {segments.map((segment, index) => {
            const percentage = (segment.value / total) * 100;
            const segmentColor =
              segment.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div
                key={segment.id}
                className="h-full"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: segmentColor,
                }}
              />
            );
          })}
        </div>

        {/* Inline Legend */}
        <div className="mt-2 flex items-center gap-x-3 flex-wrap">
          {segments.map((segment, index) => {
            const segmentColor =
              segment.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={segment.id} className="flex items-center gap-x-1">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: segmentColor }}
                />
                <span className="text-xs text-muted-foreground">
                  {segment.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
CompactSegmentedCard.displayName = "CompactSegmentedCard";
