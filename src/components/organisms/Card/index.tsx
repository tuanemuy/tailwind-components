import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// Variant types
type CardVariant = "default" | "bordered" | "elevated" | "ghost";

const cardVariants: Record<CardVariant, string> = {
  default: "bg-card",
  bordered: "bg-card border border-border",
  elevated: "bg-card shadow-md",
  ghost: "bg-transparent",
};

// Main Card component
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "bordered", padding = "none", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl overflow-hidden",
          cardVariants[variant],
          paddingClasses[padding],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = "Card";

// CardHeader component
export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  bordered?: boolean;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, bordered = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start justify-between gap-x-4 p-4",
          bordered && "border-b border-border",
          className,
        )}
        {...props}
      >
        {children || (
          <>
            <div className="min-w-0 flex-1">
              {title && (
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </>
        )}
      </div>
    );
  },
);
CardHeader.displayName = "CardHeader";

// CardBody component
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, padding = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(paddingClasses[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CardBody.displayName = "CardBody";

// CardFooter component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  align?: "start" | "center" | "end" | "between";
}

const alignClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, bordered = false, align = "end", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-x-2 p-4",
          bordered && "border-t border-border",
          alignClasses[align],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CardFooter.displayName = "CardFooter";

// CardImage component for cards with hero images
export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "auto" | "video" | "square" | "wide";
  overlay?: React.ReactNode;
}

const aspectRatioClasses = {
  auto: "",
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

export const CardImage = forwardRef<HTMLImageElement, CardImageProps>(
  ({ className, aspectRatio = "video", overlay, src, alt, ...props }, ref) => {
    return (
      <div className={cn("relative overflow-hidden", aspectRatioClasses[aspectRatio])}>
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={cn("size-full object-cover", className)}
          {...props}
        />
        {overlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            {overlay}
          </div>
        )}
      </div>
    );
  },
);
CardImage.displayName = "CardImage";
