import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { checkboxVariants } from "@/lib/variants/checkbox";
import { CheckIcon } from "@/lib/icons";
import type { VariantProps } from "class-variance-authority";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof checkboxVariants> {
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, indeterminate, disabled, ...props }, ref) => (
    <label
      className={cn(
        "relative inline-flex cursor-pointer",
        "has-[:checked]:*:*:opacity-100",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        className="peer sr-only"
        disabled={disabled}
        {...props}
      />
      <span
        className={cn(
          checkboxVariants({ size }),
          "flex items-center justify-center border-input",
          "peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50",
          indeterminate && "border-primary bg-primary text-primary-foreground",
        )}
      >
        {indeterminate ? (
          <span className="block h-0.5 w-2/3 bg-current" />
        ) : (
          <CheckIcon
            className={cn(
              "opacity-0 transition-opacity",
              size === "sm" && "size-3",
              size === "md" && "size-3.5",
              size === "lg" && "size-4",
              !size && "size-3.5",
            )}
          />
        )}
      </span>
    </label>
  ),
);
Checkbox.displayName = "Checkbox";
