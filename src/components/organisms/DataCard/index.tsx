import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/atoms";
import { TrendIndicator } from "@/components/molecules";
import type { TrendDirection, TrendVariant } from "@/lib/types";

export interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  value: string | number;
  valueLabel?: string;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
    label?: string;
  };
  progress?: {
    value: number;
    max?: number;
    label?: string;
    showValue?: boolean;
  };
  action?: React.ReactNode;
  icon?: React.ReactNode;
  chart?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "bordered" | "elevated";
}

const variantClasses = {
  default: "bg-card",
  bordered: "bg-card border border-border",
  elevated: "bg-card shadow-md",
};

export const DataCard = forwardRef<HTMLDivElement, DataCardProps>(
  (
    {
      className,
      title,
      subtitle,
      value,
      valueLabel,
      trend,
      progress,
      action,
      icon,
      chart,
      footer,
      variant = "bordered",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl overflow-hidden",
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-x-4 p-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-x-2">
              {icon && (
                <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                  {icon}
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  {title}
                </h3>
                {subtitle && (
                  <p className="mt-0.5 text-xs text-muted-foreground/70">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>

        {/* Value section */}
        <div className="px-4 pb-4">
          <div className="flex items-end gap-x-2">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {valueLabel && (
              <span className="mb-1 text-sm text-muted-foreground">
                {valueLabel}
              </span>
            )}
          </div>

          {trend && (
            <div className="mt-2 flex items-center gap-x-2">
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

        {/* Progress section */}
        {progress && (
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between gap-x-2">
              {progress.label && (
                <span className="text-xs text-muted-foreground">
                  {progress.label}
                </span>
              )}
              {progress.showValue && (
                <span className="text-xs font-medium text-foreground">
                  {progress.value}%
                </span>
              )}
            </div>
            <ProgressBar
              value={progress.value}
              max={progress.max}
              size="sm"
              className="mt-2"
            />
          </div>
        )}

        {/* Chart section */}
        {chart && <div className="px-4 pb-4">{chart}</div>}

        {/* Footer */}
        {footer && (
          <div className="border-t border-border px-4 py-3">{footer}</div>
        )}
      </div>
    );
  },
);
DataCard.displayName = "DataCard";

// DataCardList component for multiple metrics
export interface DataCardListItem {
  id: string;
  label: string;
  value: string | number;
  percentage?: number;
  color?: string;
}

export interface DataCardListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DataCardListItem[];
}

export const DataCardList = forwardRef<HTMLDivElement, DataCardListProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-y-3", className)}
        {...props}
      >
        {items.map(({ id, ...item }) => (
          <div key={id} className="flex items-center gap-x-3">
            {item.color && (
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {item.value}
                </span>
              </div>
              {item.percentage !== undefined && (
                <ProgressBar
                  value={item.percentage}
                  size="xs"
                  className="mt-1.5"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  },
);
DataCardList.displayName = "DataCardList";

// DataCardMini for compact metrics display
export interface DataCardMiniProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: TrendDirection;
  };
}

export const DataCardMini = forwardRef<HTMLDivElement, DataCardMiniProps>(
  ({ className, label, value, icon, trend, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between rounded-lg border border-border bg-card p-3",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-x-3">
          {icon && (
            <div className="shrink-0 text-muted-foreground">{icon}</div>
          )}
          <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-lg font-semibold text-foreground">{value}</p>
          </div>
        </div>
        {trend && (
          <TrendIndicator
            value={trend.value}
            direction={trend.direction}
            size="sm"
          />
        )}
      </div>
    );
  },
);
DataCardMini.displayName = "DataCardMini";
