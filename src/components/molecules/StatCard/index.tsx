import { forwardRef } from "react";
import { TrendIndicator } from "@/components/molecules/TrendIndicator";
import type { TrendDirection, TrendVariant } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
    label?: string;
  };
  variant?: "default" | "bordered" | "filled";
}

const variantClasses = {
  default: "bg-card",
  bordered: "bg-card border border-border",
  filled: "bg-muted",
};

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    { className, icon, label, value, trend, variant = "bordered", ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-lg p-4", variantClasses[variant], className)}
        {...props}
      >
        <div className="flex items-start justify-between gap-x-3">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold text-foreground">{value}</p>
            {trend && (
              <div className="flex items-center gap-x-2 pt-1">
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
          {icon && (
            <div className="shrink-0 rounded-lg bg-primary/10 p-2.5 text-primary">
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  },
);
StatCard.displayName = "StatCard";
