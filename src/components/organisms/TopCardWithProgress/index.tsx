import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { dataCardVariants } from "@/lib/variants/dataVisualization";
import { TrendIndicator } from "@/components/molecules";
import { Badge } from "@/components/atoms";
import type { VariantProps } from "class-variance-authority";
import type { TrendDirection, TrendVariant } from "@/lib/types";

// ============================================
// Types
// ============================================

export interface TopItemWithProgress {
  id: string;
  label: string;
  value: number;
  target?: number;
  percentage?: number;
  color?: string;
  icon?: React.ReactNode;
  badge?: string;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
}

// ============================================
// TopCardWithProgress - Top items with progress bars
// ============================================

export interface TopCardWithProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  items: TopItemWithProgress[];
  showRank?: boolean;
  showPercentage?: boolean;
  showTarget?: boolean;
  limit?: number;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const TopCardWithProgress = forwardRef<HTMLDivElement, TopCardWithProgressProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      subtitle,
      items,
      showRank = true,
      showPercentage = true,
      showTarget = false,
      limit = 5,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const displayItems = items.slice(0, limit);
    const maxValue = Math.max(...displayItems.map((item) => item.value));

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
          {displayItems.map((item, index) => {
            const percentage = item.percentage ??
              (item.target ? (item.value / item.target) * 100 : (item.value / maxValue) * 100);
            const barColor = item.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={item.id} className="px-4 py-3">
                <div className="flex items-center gap-x-3">
                  {/* Rank */}
                  {showRank && (
                    <span
                      className={cn(
                        "size-6 shrink-0 flex items-center justify-center rounded text-xs font-semibold",
                        index === 0
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : index === 1
                          ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          : index === 2
                          ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </span>
                  )}

                  {/* Icon */}
                  {item.icon && (
                    <span
                      className="shrink-0"
                      style={{ color: barColor }}
                    >
                      {item.icon}
                    </span>
                  )}

                  {/* Label & Badge */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-x-2">
                      <span className="text-sm font-medium text-foreground truncate">
                        {item.label}
                      </span>
                      {item.badge && (
                        <Badge variant="secondary" size="sm">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Value & Trend */}
                  <div className="flex items-center gap-x-2 shrink-0">
                    {item.trend && (
                      <TrendIndicator
                        value={item.trend.value}
                        direction={item.trend.direction}
                        variant={item.trend.variant}
                        size="xs"
                      />
                    )}
                    <span className="text-sm font-semibold text-foreground tabular-nums">
                      {formatValue(item.value)}
                    </span>
                    {showTarget && item.target && (
                      <span className="text-xs text-muted-foreground tabular-nums">
                        / {formatValue(item.target)}
                      </span>
                    )}
                    {showPercentage && (
                      <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
                        {Math.round(percentage)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className={cn("mt-2 h-1.5 rounded-full bg-muted overflow-hidden", showRank && "ml-9")}>
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

        {/* Footer - Show more */}
        {items.length > limit && (
          <div className="border-t border-border px-4 py-2 text-center">
            <span className="text-xs text-muted-foreground">
              +{items.length - limit} more items
            </span>
          </div>
        )}
      </div>
    );
  },
);
TopCardWithProgress.displayName = "TopCardWithProgress";

// ============================================
// TopPerformersCard - Top performers with metrics
// ============================================

export interface TopPerformer {
  id: string;
  name: string;
  avatar?: string;
  value: number;
  secondaryValue?: number;
  badge?: string;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
}

export interface TopPerformersCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  performers: TopPerformer[];
  valueLabel?: string;
  secondaryLabel?: string;
  limit?: number;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const TopPerformersCard = forwardRef<HTMLDivElement, TopPerformersCardProps>(
  (
    {
      className,
      variant = "bordered",
      title = "Top Performers",
      performers,
      valueLabel,
      secondaryLabel,
      limit = 5,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const displayPerformers = performers.slice(0, limit);
    const maxValue = Math.max(...displayPerformers.map((p) => p.value));

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

        {/* Performers */}
        <div className="divide-y divide-border">
          {displayPerformers.map((performer, index) => {
            const percentage = (performer.value / maxValue) * 100;

            return (
              <div key={performer.id} className="px-4 py-3">
                <div className="flex items-center gap-x-3">
                  {/* Rank */}
                  <span
                    className={cn(
                      "size-5 shrink-0 flex items-center justify-center rounded text-xs font-semibold",
                      index === 0
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : index === 1
                        ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        : index === 2
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {index + 1}
                  </span>

                  {/* Avatar */}
                  {performer.avatar && (
                    <img
                      src={performer.avatar}
                      alt={performer.name}
                      className="size-8 rounded-full object-cover shrink-0"
                    />
                  )}

                  {/* Name & Badge */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-x-2">
                      <span className="text-sm font-medium text-foreground truncate">
                        {performer.name}
                      </span>
                      {performer.badge && (
                        <Badge variant="secondary" size="sm">
                          {performer.badge}
                        </Badge>
                      )}
                    </div>
                    {performer.secondaryValue !== undefined && secondaryLabel && (
                      <p className="text-xs text-muted-foreground">
                        {secondaryLabel}: {performer.secondaryValue}
                      </p>
                    )}
                  </div>

                  {/* Value */}
                  <div className="flex items-center gap-x-2 shrink-0">
                    {performer.trend && (
                      <TrendIndicator
                        value={performer.trend.value}
                        direction={performer.trend.direction}
                        variant={performer.trend.variant}
                        size="xs"
                      />
                    )}
                    <div className="text-right">
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        {formatValue(performer.value)}
                      </span>
                      {valueLabel && (
                        <p className="text-xs text-muted-foreground">{valueLabel}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-2 ml-8 h-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${percentage}%` }}
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
TopPerformersCard.displayName = "TopPerformersCard";

// ============================================
// GoalProgressCard - Single goal with progress
// ============================================

export interface GoalProgressCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title: string;
  description?: string;
  current: number;
  target: number;
  unit?: string;
  icon?: React.ReactNode;
  color?: string;
  deadline?: string;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const GoalProgressCard = forwardRef<HTMLDivElement, GoalProgressCardProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      description,
      current,
      target,
      unit = "",
      icon,
      color = "hsl(var(--primary))",
      deadline,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min((current / target) * 100, 100);
    const isComplete = current >= target;

    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), "p-4", className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-x-3">
          <div className="flex items-center gap-x-3 min-w-0">
            {icon && (
              <div
                className="shrink-0 size-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${color}20`, color }}
              >
                {icon}
              </div>
            )}
            <div className="min-w-0">
              <h4 className="text-sm font-medium text-foreground truncate">
                {title}
              </h4>
              {description && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {description}
                </p>
              )}
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex items-end justify-between mb-2">
            <div className="flex items-baseline gap-x-1">
              <span className="text-2xl font-bold text-foreground tabular-nums">
                {formatValue(current)}
              </span>
              <span className="text-sm text-muted-foreground">
                / {formatValue(target)} {unit}
              </span>
            </div>
            <Badge
              variant={isComplete ? "success" : "secondary"}
            >
              {Math.round(percentage)}%
            </Badge>
          </div>

          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${percentage}%`,
                backgroundColor: isComplete ? "hsl(var(--success))" : color,
              }}
            />
          </div>

          {deadline && (
            <p className="mt-2 text-xs text-muted-foreground text-right">
              Deadline: {deadline}
            </p>
          )}
        </div>
      </div>
    );
  },
);
GoalProgressCard.displayName = "GoalProgressCard";
