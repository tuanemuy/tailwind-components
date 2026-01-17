import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/components/utils";
import { switchThumbVariants, switchVariants } from "@/components/variants/switch";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    Omit<VariantProps<typeof switchVariants>, "checked"> {}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, size, checked, disabled, onChange, ...props }, ref) => (
    <label
      className={cn(
        "relative inline-flex cursor-pointer",
        disabled && "cursor-not-allowed",
      )}
    >
      <input
        ref={ref}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        role="switch"
        aria-checked={checked}
        {...props}
      />
      <span
        className={cn(
          switchVariants({ size, checked: !!checked }),
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50",
          "peer-disabled:opacity-50",
          className,
        )}
      >
        <span
          className={cn(switchThumbVariants({ size, checked: !!checked }))}
        />
      </span>
    </label>
  ),
);
Switch.displayName = "Switch";
