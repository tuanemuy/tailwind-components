import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Badge } from "@/components/atoms";
import { TrendIndicator } from "@/components/molecules";
import type { TrendDirection, TrendVariant } from "@/components/types";
import { cn } from "@/components/utils";
import { dataCardVariants } from "@/components/variants/dataVisualization";

// ============================================
// Types
// ============================================

export interface SalesDataItem {
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
}

export interface SalesRepData {
  id: string;
  name: string;
  avatar?: string;
  sales: number;
  target: number;
  deals?: number;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
}

// ============================================
// SalesStatsCard
// ============================================

export interface SalesStatsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  totalSales: number;
  totalLabel?: string;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
    label?: string;
  };
  breakdown?: SalesDataItem[];
  period?: string;
  currency?: string;
  action?: React.ReactNode;
  formatAmount?: (amount: number) => string;
}

export const SalesStatsCard = forwardRef<HTMLDivElement, SalesStatsCardProps>(
  (
    {
      className,
      variant = "bordered",
      title = "Sales Overview",
      subtitle,
      totalSales,
      totalLabel = "Total Sales",
      trend,
      breakdown,
      period,
      currency = "$",
      action,
      formatAmount,
      ...props
    },
    ref,
  ) => {
    const format =
      formatAmount ??
      ((amount: number) => `${currency}${amount.toLocaleString()}`);

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
            <div className="flex items-center gap-x-2">
              {period && (
                <Badge variant="secondary" size="sm">
                  {period}
                </Badge>
              )}
              {action}
            </div>
          </div>
        )}

        {/* Total Sales */}
        <div className="px-4 pt-4 pb-3">
          <p className="text-xs text-muted-foreground mb-1">{totalLabel}</p>
          <div className="flex items-end gap-x-3">
            <span className="text-3xl font-bold text-foreground">
              {format(totalSales)}
            </span>
            {trend && (
              <div className="flex items-center gap-x-2 mb-1">
                <TrendIndicator
                  value={trend.value}
                  direction={trend.direction}
                  variant={trend.variant}
                  size="sm"
                />
                {trend.label && (
                  <span className="text-xs text-muted-foreground">
                    {trend.label}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Breakdown */}
        {breakdown && breakdown.length > 0 && (
          <div className="border-t border-border">
            <div className="divide-y divide-border">
              {breakdown.map((item, index) => {
                const barColor =
                  item.color || `hsl(var(--chart-${(index % 5) + 1}))`;
                const percentage =
                  item.percentage ?? (item.value / totalSales) * 100;

                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-x-4 px-4 py-3"
                  >
                    <div className="flex items-center gap-x-3 min-w-0">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: barColor }}
                      />
                      {item.icon && (
                        <span className="shrink-0 text-muted-foreground">
                          {item.icon}
                        </span>
                      )}
                      <span className="text-sm text-foreground truncate">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-x-3 shrink-0">
                      {item.trend && (
                        <TrendIndicator
                          value={item.trend.value}
                          direction={item.trend.direction}
                          variant={item.trend.variant}
                          size="xs"
                        />
                      )}
                      <span className="text-sm font-medium text-foreground tabular-nums">
                        {format(item.value)}
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums w-10 text-right">
                        {Math.round(percentage)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
);
SalesStatsCard.displayName = "SalesStatsCard";

// ============================================
// SalesLeaderboardCard - Sales rep rankings
// ============================================

export interface SalesLeaderboardCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  salesReps: SalesRepData[];
  currency?: string;
  showTarget?: boolean;
  showDeals?: boolean;
  action?: React.ReactNode;
  formatAmount?: (amount: number) => string;
}

export const SalesLeaderboardCard = forwardRef<
  HTMLDivElement,
  SalesLeaderboardCardProps
>(
  (
    {
      className,
      variant = "bordered",
      title = "Top Performers",
      salesReps,
      currency = "$",
      showTarget = true,
      showDeals = false,
      action,
      formatAmount,
      ...props
    },
    ref,
  ) => {
    const format =
      formatAmount ??
      ((amount: number) => `${currency}${amount.toLocaleString()}`);
    const maxSales = Math.max(...salesReps.map((rep) => rep.sales));

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

        {/* Leaderboard */}
        <div className="divide-y divide-border">
          {salesReps.map((rep, index) => {
            const progressPercentage = showTarget
              ? Math.min((rep.sales / rep.target) * 100, 100)
              : (rep.sales / maxSales) * 100;

            return (
              <div key={rep.id} className="px-4 py-3">
                <div className="flex items-center gap-x-3">
                  {/* Rank */}
                  <span
                    className={cn(
                      "size-6 shrink-0 flex items-center justify-center rounded-full text-xs font-medium",
                      index === 0
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : index === 1
                          ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                          : index === 2
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                            : "bg-muted text-muted-foreground",
                    )}
                  >
                    {index + 1}
                  </span>

                  {/* Avatar & Name */}
                  <div className="flex items-center gap-x-2 flex-1 min-w-0">
                    {rep.avatar && (
                      <img
                        src={rep.avatar}
                        alt={rep.name}
                        className="size-8 rounded-full object-cover"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {rep.name}
                      </p>
                      {showDeals && rep.deals !== undefined && (
                        <p className="text-xs text-muted-foreground">
                          {rep.deals} deals
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Sales */}
                  <div className="flex items-center gap-x-2 shrink-0">
                    {rep.trend && (
                      <TrendIndicator
                        value={rep.trend.value}
                        direction={rep.trend.direction}
                        variant={rep.trend.variant}
                        size="xs"
                      />
                    )}
                    <span className="text-sm font-medium text-foreground tabular-nums">
                      {format(rep.sales)}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                {showTarget && (
                  <div className="mt-2 ml-9">
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          progressPercentage >= 100
                            ? "bg-success"
                            : progressPercentage >= 75
                              ? "bg-primary"
                              : progressPercentage >= 50
                                ? "bg-warning"
                                : "bg-error",
                        )}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground tabular-nums">
                      {Math.round(progressPercentage)}% of {format(rep.target)}{" "}
                      target
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
SalesLeaderboardCard.displayName = "SalesLeaderboardCard";

// ============================================
// SalesComparisonCard - Period comparison
// ============================================

export interface SalesPeriodData {
  label: string;
  value: number;
  color?: string;
}

export interface SalesComparisonCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  currentPeriod: SalesPeriodData;
  previousPeriod: SalesPeriodData;
  currency?: string;
  action?: React.ReactNode;
  formatAmount?: (amount: number) => string;
}

export const SalesComparisonCard = forwardRef<
  HTMLDivElement,
  SalesComparisonCardProps
>(
  (
    {
      className,
      variant = "bordered",
      title = "Sales Comparison",
      currentPeriod,
      previousPeriod,
      currency = "$",
      action,
      formatAmount,
      ...props
    },
    ref,
  ) => {
    const format =
      formatAmount ??
      ((amount: number) => `${currency}${amount.toLocaleString()}`);
    const difference = currentPeriod.value - previousPeriod.value;
    const percentageChange = (
      (difference / previousPeriod.value) *
      100
    ).toFixed(1);
    const isIncrease = difference >= 0;
    const maxValue = Math.max(currentPeriod.value, previousPeriod.value);

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

        {/* Comparison */}
        <div className="p-4 space-y-4">
          {/* Current Period */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground">
                {currentPeriod.label}
              </span>
              <span className="text-sm font-semibold text-foreground tabular-nums">
                {format(currentPeriod.value)}
              </span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(currentPeriod.value / maxValue) * 100}%`,
                  backgroundColor: currentPeriod.color || "hsl(var(--primary))",
                }}
              />
            </div>
          </div>

          {/* Previous Period */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {previousPeriod.label}
              </span>
              <span className="text-sm text-muted-foreground tabular-nums">
                {format(previousPeriod.value)}
              </span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(previousPeriod.value / maxValue) * 100}%`,
                  backgroundColor:
                    previousPeriod.color || "hsl(var(--muted-foreground))",
                }}
              />
            </div>
          </div>
        </div>

        {/* Change Summary */}
        <div className="border-t border-border px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Change</span>
          <div className="flex items-center gap-x-2">
            <span
              className={cn(
                "text-sm font-medium tabular-nums",
                isIncrease ? "text-success" : "text-error",
              )}
            >
              {isIncrease ? "+" : ""}
              {format(difference)}
            </span>
            <TrendIndicator
              value={`${Math.abs(Number(percentageChange))}%`}
              direction={isIncrease ? "up" : "down"}
              variant={isIncrease ? "positive" : "negative"}
              size="sm"
            />
          </div>
        </div>
      </div>
    );
  },
);
SalesComparisonCard.displayName = "SalesComparisonCard";
