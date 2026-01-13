import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { Size } from "@/lib/types";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: Size | number;
  icon: React.ComponentType<React.SVGAttributes<SVGElement>>;
}

const sizeClasses: Record<Size, string> = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ className, size = "md", icon: IconComponent, style, ...props }, ref) => {
    const sizeClass = typeof size === "string" ? sizeClasses[size] : undefined;
    const sizeStyle =
      typeof size === "number" ? { width: size, height: size } : undefined;

    return (
      <IconComponent
        ref={ref}
        className={cn(sizeClass, className)}
        style={{ ...sizeStyle, ...style }}
        aria-hidden="true"
        {...props}
      />
    );
  },
);
Icon.displayName = "Icon";
