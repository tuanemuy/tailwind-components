import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { skeletonVariants } from "@/lib/variants/skeleton";

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, animation, shape, width, height, style, ...props }, ref) => {
    const customStyle = {
      ...style,
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
    };

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ animation, shape }), className)}
        style={customStyle}
        aria-hidden="true"
        {...props}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";

// Preset components for common use cases
export interface SkeletonTextProps extends Omit<SkeletonProps, "shape"> {
  lines?: number;
  lastLineWidth?: string;
}

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, lastLineWidth = "75%", className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton lines are static, index is the only identifier
          key={`skeleton-line-${index}`}
          shape="text"
          height={16}
          style={{
            width: index === lines - 1 ? lastLineWidth : "100%",
          }}
          {...props}
        />
      ))}
    </div>
  ),
);
SkeletonText.displayName = "SkeletonText";

export interface SkeletonAvatarProps extends Omit<SkeletonProps, "shape"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const avatarSizes = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

export const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = "md", ...props }, ref) => (
    <Skeleton
      ref={ref}
      shape="circle"
      width={avatarSizes[size]}
      height={avatarSizes[size]}
      {...props}
    />
  ),
);
SkeletonAvatar.displayName = "SkeletonAvatar";

export interface SkeletonCardProps extends SkeletonProps {
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
}

export const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  (
    {
      showImage = true,
      showTitle = true,
      showDescription = true,
      className,
      animation,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn("rounded-lg border border-border p-4", className)}
      {...props}
    >
      {showImage && (
        <Skeleton
          animation={animation}
          shape="rectangle"
          height={160}
          className="mb-4 w-full"
        />
      )}
      {showTitle && (
        <Skeleton
          animation={animation}
          shape="text"
          height={24}
          className="mb-2 w-3/4"
        />
      )}
      {showDescription && <SkeletonText animation={animation} lines={2} />}
    </div>
  ),
);
SkeletonCard.displayName = "SkeletonCard";
