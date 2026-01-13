import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { radioVariants } from "@/lib/variants/checkbox";
import type { VariantProps } from "class-variance-authority";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof radioVariants> {}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size, disabled, ...props }, ref) => (
    <label
      className={cn(
        "group relative inline-flex cursor-pointer has-[:checked]:*:*:scale-100",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input
        ref={ref}
        type="radio"
        className="peer sr-only"
        disabled={disabled}
        {...props}
      />
      <span
        className={cn(
          radioVariants({ size }),
          "flex items-center justify-center border-input",
          "peer-checked:border-primary",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50",
        )}
      >
        <span
          className={cn(
            "rounded-full bg-primary scale-0 transition-transform",
            size === "sm" && "size-2",
            size === "md" && "size-2.5",
            size === "lg" && "size-3",
            !size && "size-2.5",
          )}
        />
      </span>
    </label>
  ),
);
Radio.displayName = "Radio";
