import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { badgeVariants } from "@/lib/variants/badge";
import type { VariantProps } from "class-variance-authority";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  dot?: boolean;
  dotColor?: "default" | "success" | "warning" | "error";
}

const dotColorClasses = {
  default: "bg-current",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      soft,
      leftIcon,
      rightIcon,
      dot,
      dotColor = "default",
      children,
      ...props
    },
    ref,
  ) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, soft }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn("size-1.5 rounded-full", dotColorClasses[dotColor])}
          aria-hidden="true"
        />
      )}
      {leftIcon}
      {children}
      {rightIcon}
    </span>
  ),
);
Badge.displayName = "Badge";
