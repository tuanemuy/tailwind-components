"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ratingVariants, ratingStarVariants } from "@/lib/variants/rating";
import { StarIcon } from "@/lib/icons";
import type { VariantProps } from "class-variance-authority";

// Star component
interface StarProps {
  filled: boolean;
  hovered: boolean;
  readonly: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Star = ({
  filled,
  hovered,
  readonly,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: StarProps) => {
  const state = hovered ? "hover" : filled ? "filled" : "empty";

  return (
    <button
      type="button"
      disabled={readonly}
      className={cn(
        ratingStarVariants({ state, readonly }),
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <StarIcon className="size-full" />
    </button>
  );
};

// Rating component
export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof ratingVariants> {
  value?: number;
  defaultValue?: number;
  max?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  allowHalf?: boolean;
  showValue?: boolean;
  precision?: number;
}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      size = "md",
      value: controlledValue,
      defaultValue = 0,
      max = 5,
      onChange,
      readonly = false,
      allowHalf = false,
      showValue = false,
      precision = 1,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;
    const displayValue = hoverValue ?? value;

    const handleClick = (index: number) => {
      if (readonly) return;

      const newValue = index + 1;
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleMouseEnter = (index: number) => {
      if (readonly) return;
      setHoverValue(index + 1);
    };

    const handleMouseLeave = () => {
      setHoverValue(null);
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-x-2", className)}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className={cn(ratingVariants({ size }))}>
          {Array.from({ length: max }, (_, index) => (
            <Star
              key={index}
              filled={index < displayValue}
              hovered={hoverValue !== null && index < hoverValue}
              readonly={readonly}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
            />
          ))}
        </div>
        {showValue && (
          <span className={cn(
            "font-medium text-foreground",
            size === "sm" ? "text-xs" : size === "xl" ? "text-lg" : "text-sm"
          )}>
            {value.toFixed(precision)}
          </span>
        )}
      </div>
    );
  }
);
Rating.displayName = "Rating";

// ReadOnly Rating Display
export interface RatingDisplayProps
  extends Omit<RatingProps, "onChange" | "readonly"> {
  label?: string;
  count?: number;
}

export const RatingDisplay = forwardRef<HTMLDivElement, RatingDisplayProps>(
  ({ label, count, showValue = true, ...props }, ref) => {
    return (
      <div ref={ref} className="flex items-center gap-x-2">
        <Rating readonly showValue={showValue} {...props} />
        {label && (
          <span className="text-sm text-muted-foreground">{label}</span>
        )}
        {count !== undefined && (
          <span className="text-sm text-muted-foreground">({count})</span>
        )}
      </div>
    );
  }
);
RatingDisplay.displayName = "RatingDisplay";
