import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { TrendIndicator } from "@/components/molecules";
import type { TrendDirection, TrendVariant } from "@/components/types";
import { cn } from "@/components/utils";
import { dataCardVariants } from "@/components/variants/dataVisualization";

// ============================================
// BlockStatsCard
// ============================================

export interface BlockStatItem {
  id: string;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
  icon?: React.ReactNode;
  color?: string;
}

export interface BlockStatsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  stats: BlockStatItem[];
  columns?: 2 | 3 | 4;
  action?: React.ReactNode;
}

const columnClasses = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export const BlockStatsCard = forwardRef<HTMLDivElement, BlockStatsCardProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      subtitle,
      stats,
      columns = 2,
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

        {/* Stats Grid */}
        <div
          className={cn("grid divide-x divide-border", columnClasses[columns])}
        >
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col gap-y-1 p-4 first:pl-4 last:pr-4"
            >
              <div className="flex items-center gap-x-2">
                {stat.icon && (
                  <span
                    className={cn(
                      "shrink-0 text-muted-foreground",
                      stat.color && "text-current",
                    )}
                    style={stat.color ? { color: stat.color } : undefined}
                  >
                    {stat.icon}
                  </span>
                )}
                <span className="text-xs text-muted-foreground truncate">
                  {stat.label}
                </span>
              </div>
              <div className="flex items-end gap-x-2">
                <span
                  className={cn(
                    "text-xl font-semibold text-foreground",
                    stat.color && "text-current",
                  )}
                  style={stat.color ? { color: stat.color } : undefined}
                >
                  {stat.value}
                </span>
                {stat.trend && (
                  <TrendIndicator
                    value={stat.trend.value}
                    direction={stat.trend.direction}
                    variant={stat.trend.variant}
                    size="xs"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
BlockStatsCard.displayName = "BlockStatsCard";

// ============================================
// BlockStatsGrid - Multiple cards in a grid
// ============================================

export interface BlockStatsGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

const gridColumnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

const gapClasses = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
};

export const BlockStatsGrid = forwardRef<HTMLDivElement, BlockStatsGridProps>(
  ({ className, children, columns = 2, gap = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          gridColumnClasses[columns],
          gapClasses[gap],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
BlockStatsGrid.displayName = "BlockStatsGrid";

// ============================================
// MiniBlockStats - Compact inline stats
// ============================================

export interface MiniBlockStatsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stats: BlockStatItem[];
  size?: "sm" | "md";
}

export const MiniBlockStats = forwardRef<HTMLDivElement, MiniBlockStatsProps>(
  ({ className, stats, size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center divide-x divide-border rounded-lg border border-border bg-card",
          className,
        )}
        {...props}
      >
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={cn(
              "flex flex-col items-center justify-center",
              size === "sm" ? "px-3 py-2" : "px-4 py-3",
            )}
          >
            <span className="text-xs text-muted-foreground">{stat.label}</span>
            <div className="flex items-center gap-x-1.5">
              <span
                className={cn(
                  "font-semibold text-foreground",
                  size === "sm" ? "text-base" : "text-lg",
                )}
              >
                {stat.value}
              </span>
              {stat.trend && (
                <TrendIndicator
                  value={stat.trend.value}
                  direction={stat.trend.direction}
                  variant={stat.trend.variant}
                  size="xs"
                  showIcon={false}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  },
);
MiniBlockStats.displayName = "MiniBlockStats";
