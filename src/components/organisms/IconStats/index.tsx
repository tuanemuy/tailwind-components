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

export interface IconStatItem {
  id: string;
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBackground?: string;
  iconColor?: string;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
  description?: string;
  badge?: string;
}

// ============================================
// IconStats - Statistics with prominent icons
// ============================================

export interface IconStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  stats: IconStatItem[];
  columns?: 2 | 3 | 4;
  iconSize?: "sm" | "md" | "lg";
  action?: React.ReactNode;
}

const iconSizeClasses = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

const iconWrapperClasses = {
  sm: "size-10",
  md: "size-12",
  lg: "size-14",
};

export const IconStats = forwardRef<HTMLDivElement, IconStatsProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      subtitle,
      stats,
      columns = 3,
      iconSize = "md",
      action,
      ...props
    },
    ref,
  ) => {
    const columnClasses = {
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
    };

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

        {/* Stats Grid */}
        <div className={cn("grid divide-x divide-border", columnClasses[columns])}>
          {stats.map((stat, index) => {
            const iconBg = stat.iconBackground || `hsl(var(--chart-${(index % 5) + 1}) / 0.1)`;
            const iconClr = stat.iconColor || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={stat.id} className="p-4">
                <div className="flex items-start gap-x-3">
                  {/* Icon */}
                  <div
                    className={cn(
                      "shrink-0 rounded-lg flex items-center justify-center",
                      iconWrapperClasses[iconSize]
                    )}
                    style={{
                      backgroundColor: iconBg,
                      color: iconClr,
                    }}
                  >
                    <span className={iconSizeClasses[iconSize]}>
                      {stat.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-x-2">
                      <p className="text-xs text-muted-foreground truncate">
                        {stat.label}
                      </p>
                      {stat.badge && (
                        <Badge variant="secondary" size="sm">
                          {stat.badge}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-x-2 mt-1">
                      <span className="text-xl font-bold text-foreground tabular-nums">
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
                    {stat.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
IconStats.displayName = "IconStats";

// ============================================
// IconStatsRow - Horizontal icon stats
// ============================================

export interface IconStatsRowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  stats: IconStatItem[];
  iconSize?: "sm" | "md" | "lg";
}

export const IconStatsRow = forwardRef<HTMLDivElement, IconStatsRowProps>(
  (
    {
      className,
      variant = "bordered",
      stats,
      iconSize = "md",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          dataCardVariants({ variant }),
          "flex items-center divide-x divide-border overflow-x-auto",
          className
        )}
        {...props}
      >
        {stats.map((stat, index) => {
          const iconBg = stat.iconBackground || `hsl(var(--chart-${(index % 5) + 1}) / 0.1)`;
          const iconClr = stat.iconColor || `hsl(var(--chart-${(index % 5) + 1}))`;

          return (
            <div key={stat.id} className="flex items-center gap-x-3 p-4 flex-shrink-0">
              <div
                className={cn(
                  "shrink-0 rounded-lg flex items-center justify-center",
                  iconWrapperClasses[iconSize]
                )}
                style={{
                  backgroundColor: iconBg,
                  color: iconClr,
                }}
              >
                <span className={iconSizeClasses[iconSize]}>
                  {stat.icon}
                </span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <div className="flex items-center gap-x-2">
                  <span className="text-lg font-bold text-foreground tabular-nums">
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
            </div>
          );
        })}
      </div>
    );
  },
);
IconStatsRow.displayName = "IconStatsRow";

// ============================================
// CenteredIconStats - Centered icon layout
// ============================================

export interface CenteredIconStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  stats: IconStatItem[];
  columns?: 2 | 3 | 4;
  action?: React.ReactNode;
}

export const CenteredIconStats = forwardRef<HTMLDivElement, CenteredIconStatsProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      stats,
      columns = 3,
      action,
      ...props
    },
    ref,
  ) => {
    const columnClasses = {
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
    };

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

        {/* Stats Grid */}
        <div className={cn("grid divide-x divide-border", columnClasses[columns])}>
          {stats.map((stat, index) => {
            const iconBg = stat.iconBackground || `hsl(var(--chart-${(index % 5) + 1}) / 0.1)`;
            const iconClr = stat.iconColor || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={stat.id} className="p-4 text-center">
                {/* Icon */}
                <div
                  className="size-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{
                    backgroundColor: iconBg,
                    color: iconClr,
                  }}
                >
                  <span className="size-6">
                    {stat.icon}
                  </span>
                </div>

                {/* Value */}
                <div className="flex items-center justify-center gap-x-2">
                  <span className="text-2xl font-bold text-foreground tabular-nums">
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

                {/* Label */}
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>

                {/* Description */}
                {stat.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
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
CenteredIconStats.displayName = "CenteredIconStats";

// ============================================
// CompactIconStats - Minimal icon stats
// ============================================

export interface CompactIconStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  stats: IconStatItem[];
}

export const CompactIconStats = forwardRef<HTMLDivElement, CompactIconStatsProps>(
  (
    {
      className,
      variant = "bordered",
      stats,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), "p-4", className)}
        {...props}
      >
        <div className="flex items-center justify-around gap-4">
          {stats.map((stat, index) => {
            const iconClr = stat.iconColor || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={stat.id} className="flex items-center gap-x-2">
                <span style={{ color: iconClr }} className="shrink-0">
                  {stat.icon}
                </span>
                <div>
                  <p className="text-lg font-bold text-foreground tabular-nums leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
CompactIconStats.displayName = "CompactIconStats";

// ============================================
// IconStatCard - Single icon stat card
// ============================================

export interface IconStatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBackground?: string;
  iconColor?: string;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
    label?: string;
  };
  description?: string;
}

export const IconStatCard = forwardRef<HTMLDivElement, IconStatCardProps>(
  (
    {
      className,
      variant = "bordered",
      label,
      value,
      icon,
      iconBackground = "hsl(var(--primary) / 0.1)",
      iconColor = "hsl(var(--primary))",
      trend,
      description,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), "p-4", className)}
        {...props}
      >
        <div className="flex items-start justify-between gap-x-4">
          {/* Content */}
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold text-foreground tabular-nums mt-1">
              {value}
            </p>
            {trend && (
              <div className="flex items-center gap-x-2 mt-2">
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
            {description && (
              <p className="text-xs text-muted-foreground mt-2">
                {description}
              </p>
            )}
          </div>

          {/* Icon */}
          <div
            className="shrink-0 size-12 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: iconBackground,
              color: iconColor,
            }}
          >
            <span className="size-6">
              {icon}
            </span>
          </div>
        </div>
      </div>
    );
  },
);
IconStatCard.displayName = "IconStatCard";
