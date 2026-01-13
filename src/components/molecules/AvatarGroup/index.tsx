import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/atoms";
import type { Size } from "@/lib/types";

export interface AvatarGroupItem {
  src?: string;
  alt?: string;
  initials?: string;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AvatarGroupItem[];
  max?: number;
  size?: Size;
  spacing?: "tight" | "normal" | "loose";
}

const spacingClasses = {
  tight: "-space-x-3",
  normal: "-space-x-2",
  loose: "-space-x-1",
};

const sizeToSpacing: Record<Size, string> = {
  xs: "-space-x-1.5",
  sm: "-space-x-2",
  md: "-space-x-2.5",
  lg: "-space-x-3",
  xl: "-space-x-4",
};

const overflowSizeClasses: Record<Size, string> = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
};

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, items, max = 4, size = "md", spacing, ...props }, ref) => {
    const visibleItems = items.slice(0, max);
    const overflowCount = items.length - max;
    const hasOverflow = overflowCount > 0;

    // spacingが指定されていなければサイズに基づく自動調整
    const spacingClass = spacing
      ? spacingClasses[spacing]
      : sizeToSpacing[size];

    return (
      <div
        ref={ref}
        className={cn("flex items-center", spacingClass, className)}
        {...props}
      >
        {visibleItems.map((item, index) => (
          <Avatar
            key={index}
            src={item.src}
            alt={item.alt}
            initials={item.initials}
            size={size}
            className="ring-2 ring-background"
          />
        ))}
        {hasOverflow && (
          <div
            className={cn(
              "inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground font-medium ring-2 ring-background",
              overflowSizeClasses[size],
            )}
            aria-label={`${overflowCount} more`}
          >
            +{overflowCount}
          </div>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";
