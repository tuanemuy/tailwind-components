import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/components/utils";
import { progressBarVariants, progressVariants } from "@/components/variants/progress";

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressBarVariants> {
  value: number;
  max?: number;
  showValue?: boolean;
  /** Alias for showValue */
  showLabel?: boolean;
  /** Custom color for the progress bar (overrides variant) */
  color?: string;
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      size,
      variant,
      value,
      max = 100,
      showValue,
      showLabel,
      color,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const shouldShowValue = showValue ?? showLabel ?? false;

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {shouldShowValue && (
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        <div
          className={cn(progressVariants({ size }))}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className={cn(
              progressBarVariants({ variant: color ? undefined : variant }),
              color && "bg-current",
            )}
            style={{
              width: `${percentage}%`,
              ...(color ? { color, backgroundColor: color } : {}),
            }}
          />
        </div>
      </div>
    );
  },
);
ProgressBar.displayName = "ProgressBar";
