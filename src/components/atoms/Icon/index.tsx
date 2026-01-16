import type { Size } from "@/lib/types";
import { cn } from "@/lib/utils";

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

export const Icon = ({
  className,
  size = "md",
  icon: IconComponent,
  style,
  ...props
}: IconProps) => {
  const sizeClass = typeof size === "string" ? sizeClasses[size] : undefined;
  const sizeStyle =
    typeof size === "number" ? { width: size, height: size } : undefined;

  return (
    <IconComponent
      className={cn(sizeClass, className)}
      style={{ ...sizeStyle, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
};
Icon.displayName = "Icon";
