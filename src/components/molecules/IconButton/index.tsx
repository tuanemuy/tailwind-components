import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/components/utils";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-lg transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-2 focus:ring-secondary/50",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-accent/50",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus:ring-2 focus:ring-destructive/50",
        outline:
          "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring/50",
      },
      size: {
        xs: "size-7",
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
        xl: "size-14",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  },
);

const iconSizeClasses = {
  xs: "size-3.5",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-7",
};

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode;
  label: string;
  loading?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant,
      size = "md",
      icon,
      label,
      loading,
      disabled,
      ...props
    },
    ref,
  ) => {
    const iconSize = iconSizeClasses[size || "md"];

    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        aria-label={label}
        {...props}
      >
        {loading ? (
          <svg
            className={cn("animate-spin", iconSize)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
        ) : (
          <span className={iconSize}>{icon}</span>
        )}
      </button>
    );
  },
);
IconButton.displayName = "IconButton";
