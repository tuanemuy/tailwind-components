import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/components/utils";
import { checkboxVariants } from "@/components/variants/checkbox";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof checkboxVariants> {
  indeterminate?: boolean;
  label?: string;
  labelClassName?: string;
  /** Callback when checked state changes - alias for onChange */
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size,
      indeterminate,
      disabled,
      label,
      labelClassName,
      onCheckedChange,
      onChange,
      ...props
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    return (
      <label
        className={cn(
          "relative inline-flex cursor-pointer items-center",
          "has-[:checked]:*:*:opacity-100",
          disabled && "cursor-not-allowed opacity-50",
          label && "gap-x-2",
          className,
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className="peer sr-only"
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        <span
          className={cn(
            checkboxVariants({ size }),
            "flex shrink-0 items-center justify-center border-input",
            "peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50",
            indeterminate &&
              "border-primary bg-primary text-primary-foreground",
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
        {label && (
          <span className={cn("text-sm text-muted-foreground", labelClassName)}>
            {label}
          </span>
        )}
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
