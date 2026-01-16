import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { TrendIndicator } from "@/components/molecules";
import type { TrendDirection, TrendVariant } from "@/lib/types";
import { cn } from "@/lib/utils";
import { dataCardVariants } from "@/lib/variants/dataVisualization";

// ============================================
// Types
// ============================================

export interface CostItem {
  id: string;
  label: string;
  amount: number;
  percentage?: number;
  color?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
}

export interface CostCategory {
  id: string;
  name: string;
  items: CostItem[];
  subtotal?: number;
}

// ============================================
// ProjectCostsCard
// ============================================

export interface ProjectCostsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  items: CostItem[];
  total?: number;
  totalLabel?: string;
  currency?: string;
  showPercentage?: boolean;
  action?: React.ReactNode;
  formatAmount?: (amount: number) => string;
}

export const ProjectCostsCard = forwardRef<
  HTMLDivElement,
  ProjectCostsCardProps
>(
  (
    {
      className,
      variant = "bordered",
      title = "Project Costs",
      subtitle,
      items,
      total,
      totalLabel = "Total",
      currency = "$",
      showPercentage = true,
      action,
      formatAmount,
      ...props
    },
    ref,
  ) => {
    const calculatedTotal =
      total ?? items.reduce((sum, item) => sum + item.amount, 0);
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
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Cost Items */}
        <div className="divide-y divide-border">
          {items.map((item, index) => {
            const percentage =
              item.percentage ?? (item.amount / calculatedTotal) * 100;
            const barColor =
              item.color || `hsl(var(--chart-${(index % 5) + 1}))`;

            return (
              <div key={item.id} className="px-4 py-3">
                <div className="flex items-center justify-between gap-x-3">
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
                      {format(item.amount)}
                    </span>
                    {showPercentage && (
                      <span className="text-xs text-muted-foreground tabular-nums w-12 text-right">
                        {Math.round(percentage)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between gap-x-4 border-t border-border bg-muted/30 px-4 py-3">
          <span className="text-sm font-medium text-foreground">
            {totalLabel}
          </span>
          <span className="text-base font-semibold text-foreground tabular-nums">
            {format(calculatedTotal)}
          </span>
        </div>
      </div>
    );
  },
);
ProjectCostsCard.displayName = "ProjectCostsCard";

// ============================================
// CategorizedCostsCard - Costs grouped by category
// ============================================

export interface CategorizedCostsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  categories: CostCategory[];
  total?: number;
  totalLabel?: string;
  currency?: string;
  action?: React.ReactNode;
  formatAmount?: (amount: number) => string;
}

export const CategorizedCostsCard = forwardRef<
  HTMLDivElement,
  CategorizedCostsCardProps
>(
  (
    {
      className,
      variant = "bordered",
      title = "Project Costs",
      categories,
      total,
      totalLabel = "Total",
      currency = "$",
      action,
      formatAmount,
      ...props
    },
    ref,
  ) => {
    const calculatedTotal =
      total ??
      categories.reduce(
        (sum, cat) =>
          sum + (cat.subtotal ?? cat.items.reduce((s, i) => s + i.amount, 0)),
        0,
      );
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
            {title && (
              <h3 className="text-sm font-medium text-foreground">{title}</h3>
            )}
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Categories */}
        {categories.map((category, catIndex) => {
          const categoryTotal =
            category.subtotal ??
            category.items.reduce((s, i) => s + i.amount, 0);

          return (
            <div key={category.id}>
              {/* Category Header */}
              <div className="flex items-center justify-between gap-x-4 bg-muted/50 px-4 py-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {category.name}
                </span>
                <span className="text-xs font-medium text-muted-foreground tabular-nums">
                  {format(categoryTotal)}
                </span>
              </div>

              {/* Category Items */}
              <div className="divide-y divide-border">
                {category.items.map((item, itemIndex) => {
                  const barColor =
                    item.color ||
                    `hsl(var(--chart-${((catIndex * 2 + itemIndex) % 5) + 1}))`;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-x-3 px-4 py-2.5"
                    >
                      <div className="flex items-center gap-x-3 min-w-0">
                        <span
                          className="size-2 shrink-0 rounded-full"
                          style={{ backgroundColor: barColor }}
                        />
                        <span className="text-sm text-foreground truncate">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground tabular-nums">
                        {format(item.amount)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Total */}
        <div className="flex items-center justify-between gap-x-4 border-t border-border bg-muted/30 px-4 py-3">
          <span className="text-sm font-medium text-foreground">
            {totalLabel}
          </span>
          <span className="text-base font-semibold text-foreground tabular-nums">
            {format(calculatedTotal)}
          </span>
        </div>
      </div>
    );
  },
);
CategorizedCostsCard.displayName = "CategorizedCostsCard";

// ============================================
// BudgetVsActualCard - Budget comparison
// ============================================

export interface BudgetItem {
  id: string;
  label: string;
  budget: number;
  actual: number;
  icon?: React.ReactNode;
}

export interface BudgetVsActualCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  items: BudgetItem[];
  currency?: string;
  action?: React.ReactNode;
  formatAmount?: (amount: number) => string;
}

export const BudgetVsActualCard = forwardRef<
  HTMLDivElement,
  BudgetVsActualCardProps
>(
  (
    {
      className,
      variant = "bordered",
      title = "Budget vs Actual",
      items,
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
    const totalBudget = items.reduce((sum, item) => sum + item.budget, 0);
    const totalActual = items.reduce((sum, item) => sum + item.actual, 0);

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

        {/* Table Header */}
        <div className="grid grid-cols-4 gap-x-2 bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground">
          <span className="col-span-1">Category</span>
          <span className="text-right">Budget</span>
          <span className="text-right">Actual</span>
          <span className="text-right">Variance</span>
        </div>

        {/* Items */}
        <div className="divide-y divide-border">
          {items.map((item) => {
            const variance = item.budget - item.actual;
            const isOverBudget = variance < 0;

            return (
              <div
                key={item.id}
                className="grid grid-cols-4 gap-x-2 px-4 py-2.5"
              >
                <div className="col-span-1 flex items-center gap-x-2 min-w-0">
                  {item.icon && (
                    <span className="shrink-0 text-muted-foreground">
                      {item.icon}
                    </span>
                  )}
                  <span className="text-sm text-foreground truncate">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground text-right tabular-nums">
                  {format(item.budget)}
                </span>
                <span className="text-sm text-foreground text-right tabular-nums">
                  {format(item.actual)}
                </span>
                <span
                  className={cn(
                    "text-sm text-right tabular-nums",
                    isOverBudget ? "text-error" : "text-success",
                  )}
                >
                  {isOverBudget ? "-" : "+"}
                  {format(Math.abs(variance))}
                </span>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div className="grid grid-cols-4 gap-x-2 border-t border-border bg-muted/30 px-4 py-3">
          <span className="col-span-1 text-sm font-medium text-foreground">
            Total
          </span>
          <span className="text-sm font-medium text-muted-foreground text-right tabular-nums">
            {format(totalBudget)}
          </span>
          <span className="text-sm font-semibold text-foreground text-right tabular-nums">
            {format(totalActual)}
          </span>
          <span
            className={cn(
              "text-sm font-semibold text-right tabular-nums",
              totalBudget - totalActual < 0 ? "text-error" : "text-success",
            )}
          >
            {totalBudget - totalActual < 0 ? "-" : "+"}
            {format(Math.abs(totalBudget - totalActual))}
          </span>
        </div>
      </div>
    );
  },
);
BudgetVsActualCard.displayName = "BudgetVsActualCard";
