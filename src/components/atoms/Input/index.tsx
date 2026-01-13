import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { inputVariants } from "@/lib/variants/input";
import { EyeIcon, EyeOffIcon } from "@/lib/icons";
import type { VariantProps } from "class-variance-authority";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      type = "text",
      leftIcon,
      rightIcon,
      error,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon || isPassword;

    return (
      <div className="relative">
        {leftIcon && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
            <span className="text-muted-foreground">{leftIcon}</span>
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          className={cn(
            inputVariants({ variant: error ? "error" : variant, inputSize }),
            hasLeftIcon && "ps-10",
            hasRightIcon && "pe-10",
            className,
          )}
          disabled={disabled}
          {...props}
        />
        {(rightIcon || isPassword) && (
          <div className="absolute inset-y-0 end-0 flex items-center pe-3.5">
            {isPassword ? (
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="size-5" />
                ) : (
                  <EyeIcon className="size-5" />
                )}
              </button>
            ) : (
              <span className="text-muted-foreground">{rightIcon}</span>
            )}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
