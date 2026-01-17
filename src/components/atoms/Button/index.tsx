import type { VariantProps } from "class-variance-authority";
import { type ElementType, forwardRef } from "react";
import { cn } from "@/components/utils";
import { buttonVariants } from "@/components/variants/button";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  /** Render as a different element (e.g., 'a' for links) */
  as?: ElementType;
  /** When true, renders children directly with button styles (for composition with Link components) */
  asChild?: boolean;
  /** href for when as="a" */
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      loading,
      disabled,
      children,
      as,
      asChild,
      href,
      ...props
    },
    ref,
  ) => {
    const buttonClasses = cn(buttonVariants({ variant, size }), className);

    // asChild mode - wrap the child element with button styles
    if (asChild && children) {
      // For asChild, we expect a single child element and clone it with our styles
      const child = children as React.ReactElement<{ className?: string }>;
      if (child && typeof child === "object" && "props" in child) {
        return <span className={buttonClasses}>{children}</span>;
      }
    }

    // Polymorphic component - render as different element
    const Component = as || "button";
    const isButton = Component === "button";

    return (
      <Component
        ref={ref}
        className={buttonClasses}
        disabled={isButton ? disabled || loading : undefined}
        href={Component === "a" ? href : undefined}
        {...props}
      >
        {loading ? (
          <svg
            className="size-4 animate-spin"
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
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </Component>
    );
  },
);
Button.displayName = "Button";
