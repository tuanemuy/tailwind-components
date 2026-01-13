import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { TrendUpIcon, TrendDownIcon } from "@/lib/icons";
import type { TrendDirection, TrendVariant } from "@/lib/types";

export interface TrendIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  value: string;
  direction: TrendDirection;
  variant?: TrendVariant;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: {
    wrapper: "gap-x-0.5",
    icon: "size-3",
    text: "text-xs",
  },
  md: {
    wrapper: "gap-x-1",
    icon: "size-4",
    text: "text-sm",
  },
  lg: {
    wrapper: "gap-x-1.5",
    icon: "size-5",
    text: "text-base",
  },
};

const variantClasses: Record<TrendVariant, string> = {
  positive: "text-success",
  negative: "text-error",
  neutral: "text-muted-foreground",
};

export const TrendIndicator = forwardRef<HTMLSpanElement, TrendIndicatorProps>(
  (
    {
      className,
      value,
      direction,
      variant,
      showIcon = true,
      size = "md",
      ...props
    },
    ref,
  ) => {
    // デフォルトのvariantはdirectionに基づく
    const resolvedVariant =
      variant ?? (direction === "up" ? "positive" : "negative");
    const Icon = direction === "up" ? TrendUpIcon : TrendDownIcon;
    const sizeClass = sizeClasses[size];

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium",
          sizeClass.wrapper,
          variantClasses[resolvedVariant],
          className,
        )}
        {...props}
      >
        {showIcon && <Icon className={sizeClass.icon} aria-hidden="true" />}
        <span className={sizeClass.text}>{value}</span>
      </span>
    );
  },
);
TrendIndicator.displayName = "TrendIndicator";
