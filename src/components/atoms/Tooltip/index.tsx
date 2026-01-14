import { forwardRef, useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { tooltipVariants, tooltipArrowVariants } from "@/lib/variants/tooltip";
import type { VariantProps } from "class-variance-authority";

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  showArrow?: boolean;
  delay?: number;
  disabled?: boolean;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      variant,
      position,
      content,
      showArrow = true,
      delay = 200,
      disabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = useCallback(() => {
      if (disabled) return;
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    }, [delay, disabled]);

    const handleMouseLeave = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsVisible(false);
    }, []);

    const handleFocus = useCallback(() => {
      if (disabled) return;
      setIsVisible(true);
    }, [disabled]);

    const handleBlur = useCallback(() => {
      setIsVisible(false);
    }, []);

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {children}
        {isVisible && content && (
          <div
            className={cn(tooltipVariants({ variant, position }))}
            role="tooltip"
          >
            {content}
            {showArrow && (
              <span
                className={cn(tooltipArrowVariants({ variant, position }))}
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </div>
    );
  },
);
Tooltip.displayName = "Tooltip";
