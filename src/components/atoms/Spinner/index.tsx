import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { spinnerVariants } from "@/lib/variants/spinner";

export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, variant, label = "Loading", ...props }, ref) => (
    // biome-ignore lint/a11y/useSemanticElements: SVG spinner requires role="status" for accessibility
    <svg
      ref={ref}
      className={cn(spinnerVariants({ size, variant }), className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="status"
      aria-label={label}
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  ),
);
Spinner.displayName = "Spinner";

// Alternative spinner styles
export interface DotsSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<VariantProps<typeof spinnerVariants>, "variant"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const dotSizes = {
  xs: "size-1",
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2.5",
  xl: "size-3",
};

const dotGaps = {
  xs: "gap-0.5",
  sm: "gap-1",
  md: "gap-1.5",
  lg: "gap-2",
  xl: "gap-2.5",
};

const variantColors = {
  default: "bg-primary",
  secondary: "bg-secondary-foreground",
  muted: "bg-muted-foreground",
  white: "bg-white",
};

export const DotsSpinner = forwardRef<HTMLDivElement, DotsSpinnerProps>(
  ({ className, size = "md", variant = "default", ...props }, ref) => (
    // biome-ignore lint/a11y/useSemanticElements: Spinner requires role="status" for accessibility
    <div
      ref={ref}
      className={cn("flex items-center", dotGaps[size], className)}
      role="status"
      aria-label="Loading"
      {...props}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "rounded-full animate-bounce",
            dotSizes[size],
            variantColors[variant ?? "default"],
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </div>
  ),
);
DotsSpinner.displayName = "DotsSpinner";

export interface RingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<VariantProps<typeof spinnerVariants>, "variant"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const ringSizes = {
  xs: "size-3",
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-12",
};

const ringBorderWidths = {
  xs: "border",
  sm: "border-2",
  md: "border-2",
  lg: "border-3",
  xl: "border-4",
};

const ringColors = {
  default: "border-primary",
  secondary: "border-secondary-foreground",
  muted: "border-muted-foreground",
  white: "border-white",
};

export const RingSpinner = forwardRef<HTMLDivElement, RingSpinnerProps>(
  ({ className, size = "md", variant = "default", ...props }, ref) => (
    // biome-ignore lint/a11y/useSemanticElements: Spinner requires role="status" for accessibility
    <div
      ref={ref}
      className={cn(
        "animate-spin rounded-full border-t-transparent",
        ringSizes[size],
        ringBorderWidths[size],
        ringColors[variant ?? "default"],
        className,
      )}
      role="status"
      aria-label="Loading"
      {...props}
    />
  ),
);
RingSpinner.displayName = "RingSpinner";
