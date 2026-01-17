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

export interface TierData {
  id: string;
  name: string;
  count: number;
  percentage?: number;
  color?: string;
  icon?: React.ReactNode;
  description?: string;
}

export interface HierarchicalStatItem {
  id: string;
  label: string;
  value: number;
  children?: HierarchicalStatItem[];
  color?: string;
  percentage?: number;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
}

// ============================================
// TieredStatsCard - Tiered/Hierarchical statistics
// ============================================

export interface TieredStatsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  tiers: TierData[];
  totalLabel?: string;
  showPercentage?: boolean;
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const TieredStatsCard = forwardRef<HTMLDivElement, TieredStatsCardProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      subtitle,
      tiers,
      totalLabel,
      showPercentage = true,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const total = tiers.reduce((sum, tier) => sum + tier.count, 0);

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

        {/* Total */}
        {totalLabel && (
          <div className="px-4 pt-4 pb-2">
            <p className="text-xs text-muted-foreground">{totalLabel}</p>
            <p className="text-2xl font-bold text-foreground">
              {formatValue(total)}
            </p>
          </div>
        )}

        {/* Tiers */}
        <div className="p-4 space-y-3">
          {tiers.map((tier, index) => {
            const percentage = tier.percentage ?? (tier.count / total) * 100;
            const tierColor =
              tier.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={tier.id} className="flex items-center gap-x-4">
                {/* Tier indicator */}
                <div
                  className="shrink-0 size-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${tierColor}20` }}
                >
                  {tier.icon ? (
                    <span style={{ color: tierColor }}>{tier.icon}</span>
                  ) : (
                    <span
                      className="text-sm font-semibold"
                      style={{ color: tierColor }}
                    >
                      T{index + 1}
                    </span>
                  )}
                </div>

                {/* Tier info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-x-2">
                    <span className="text-sm font-medium text-foreground truncate">
                      {tier.name}
                    </span>
                    <div className="flex items-center gap-x-2 shrink-0">
                      <span className="text-sm font-semibold text-foreground tabular-nums">
                        {formatValue(tier.count)}
                      </span>
                      {showPercentage && (
                        <Badge variant="secondary" size="sm">
                          {Math.round(percentage)}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  {tier.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {tier.description}
                    </p>
                  )}
                  {/* Progress bar */}
                  <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: tierColor,
                      }}
                    />
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
TieredStatsCard.displayName = "TieredStatsCard";

// ============================================
// HierarchicalStatsCard - Nested hierarchy display
// ============================================

export interface HierarchicalStatsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  items: HierarchicalStatItem[];
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const HierarchicalStatsCard = forwardRef<
  HTMLDivElement,
  HierarchicalStatsCardProps
>(
  (
    {
      className,
      variant = "bordered",
      title,
      items,
      action,
      formatValue = (v) => v.toLocaleString(),
      ...props
    },
    ref,
  ) => {
    const renderItem = (item: HierarchicalStatItem, depth = 0, index = 0) => {
      const itemColor = item.color || `hsl(var(--chart-${(index % 5) + 1}))`;
      const hasChildren = item.children && item.children.length > 0;

      return (
        <div key={item.id}>
          <div
            className={cn(
              "flex items-center justify-between gap-x-3 py-2",
              depth > 0 && "border-l-2 border-border ml-4 pl-3",
            )}
          >
            <div className="flex items-center gap-x-2 min-w-0">
              <span
                className={cn(
                  "shrink-0 rounded-full",
                  depth === 0 ? "size-2.5" : "size-2",
                )}
                style={{ backgroundColor: itemColor }}
              />
              <span
                className={cn(
                  "truncate",
                  depth === 0
                    ? "text-sm font-medium text-foreground"
                    : "text-sm text-muted-foreground",
                )}
              >
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
              <span
                className={cn(
                  "tabular-nums",
                  depth === 0
                    ? "text-sm font-semibold text-foreground"
                    : "text-sm text-muted-foreground",
                )}
              >
                {formatValue(item.value)}
              </span>
              {item.percentage !== undefined && (
                <span className="text-xs text-muted-foreground tabular-nums">
                  ({Math.round(item.percentage)}%)
                </span>
              )}
            </div>
          </div>
          {hasChildren && (
            <div className="ml-4">
              {item.children?.map((child, childIndex) =>
                renderItem(child, depth + 1, index + childIndex),
              )}
            </div>
          )}
        </div>
      );
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

        {/* Items */}
        <div className="px-4 py-2 divide-y divide-border">
          {items.map((item, index) => renderItem(item, 0, index))}
        </div>
      </div>
    );
  },
);
HierarchicalStatsCard.displayName = "HierarchicalStatsCard";

// ============================================
// PyramidTierCard - Pyramid visualization
// ============================================

export interface PyramidTierCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  tiers: TierData[];
  action?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const PyramidTierCard = forwardRef<HTMLDivElement, PyramidTierCardProps>(
  (
    {
      className,
      variant = "bordered",
      title,
      tiers,
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
            {title && (
              <h3 className="text-sm font-medium text-foreground">{title}</h3>
            )}
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Pyramid */}
        <div className="p-4 flex flex-col items-center gap-y-1">
          {tiers.map((tier, index) => {
            const tierColor =
              tier.color || `hsl(var(--chart-${(index % 5) + 1}))`;
            // Calculate width based on position (top = narrowest)
            const widthPercent = 40 + (index / (tiers.length - 1 || 1)) * 60;

            return (
              <div
                key={tier.id}
                className="flex items-center gap-x-4 w-full"
                style={{ maxWidth: `${widthPercent}%` }}
              >
                <div
                  className="flex-1 h-10 rounded flex items-center justify-center px-3"
                  style={{ backgroundColor: tierColor }}
                >
                  <span className="text-xs font-medium text-white truncate">
                    {tier.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="px-4 pb-4 grid grid-cols-2 gap-2">
          {tiers.map((tier, index) => {
            const tierColor =
              tier.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={tier.id} className="flex items-center gap-x-2">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: tierColor }}
                />
                <span className="text-xs text-muted-foreground truncate flex-1">
                  {tier.name}
                </span>
                <span className="text-xs font-medium text-foreground tabular-nums">
                  {formatValue(tier.count)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
PyramidTierCard.displayName = "PyramidTierCard";
