import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/atoms";

// HeroSection component
export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "centered" | "split" | "background";
  align?: "left" | "center" | "right";
  padding?: "sm" | "md" | "lg" | "xl";
  backgroundImage?: string;
  backgroundOverlay?: boolean;
  overlayOpacity?: number;
}

const paddingClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

const alignClasses = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
};

export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  (
    {
      className,
      variant = "centered",
      align = "center",
      padding = "lg",
      backgroundImage,
      backgroundOverlay = true,
      overlayOpacity = 60,
      children,
      ...props
    },
    ref,
  ) => {
    const hasBackground = variant === "background" && backgroundImage;

    return (
      <section
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          paddingClasses[padding],
          hasBackground && "bg-cover bg-center bg-no-repeat",
          className,
        )}
        style={hasBackground ? { backgroundImage: `url(${backgroundImage})` } : undefined}
        {...props}
      >
        {/* Background Overlay */}
        {hasBackground && backgroundOverlay && (
          <div
            className="absolute inset-0 bg-background"
            style={{ opacity: overlayOpacity / 100 }}
          />
        )}

        {/* Content */}
        <div className={cn("relative", variant === "split" ? "" : "container mx-auto px-4")}>
          {variant === "split" ? (
            <div className="container mx-auto px-4">{children}</div>
          ) : (
            <div className={cn("flex flex-col gap-y-6 max-w-3xl mx-auto", alignClasses[align])}>
              {children}
            </div>
          )}
        </div>
      </section>
    );
  },
);
HeroSection.displayName = "HeroSection";

// HeroContent component (for split variant)
export interface HeroContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center" | "right";
}

export const HeroContent = forwardRef<HTMLDivElement, HeroContentProps>(
  ({ className, align = "left", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-y-6", alignClasses[align], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
HeroContent.displayName = "HeroContent";

// HeroBadge component
export interface HeroBadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeroBadge = forwardRef<HTMLDivElement, HeroBadgeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        <Badge variant="secondary" size="lg" className="px-4 py-1.5">
          {children}
        </Badge>
      </div>
    );
  },
);
HeroBadge.displayName = "HeroBadge";

// HeroTitle component
export interface HeroTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2";
  size?: "sm" | "md" | "lg" | "xl";
  gradient?: boolean;
}

const titleSizeClasses = {
  sm: "text-3xl md:text-4xl lg:text-5xl",
  md: "text-4xl md:text-5xl lg:text-6xl",
  lg: "text-5xl md:text-6xl lg:text-7xl",
  xl: "text-6xl md:text-7xl lg:text-8xl",
};

export const HeroTitle = forwardRef<HTMLHeadingElement, HeroTitleProps>(
  ({ className, as: Component = "h1", size = "md", gradient = false, children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "font-bold tracking-tight text-foreground",
          titleSizeClasses[size],
          gradient && "bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent",
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
HeroTitle.displayName = "HeroTitle";

// HeroSubtitle component
export interface HeroSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "md" | "lg";
}

const subtitleSizeClasses = {
  sm: "text-base md:text-lg",
  md: "text-lg md:text-xl",
  lg: "text-xl md:text-2xl",
};

export const HeroSubtitle = forwardRef<HTMLParagraphElement, HeroSubtitleProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-muted-foreground max-w-2xl", subtitleSizeClasses[size], className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);
HeroSubtitle.displayName = "HeroSubtitle";

// HeroActions component
export interface HeroActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  align?: "left" | "center" | "right";
}

const actionsAlignClasses = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export const HeroActions = forwardRef<HTMLDivElement, HeroActionsProps>(
  ({ className, direction = "row", align = "center", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-4",
          direction === "column" ? "flex-col" : "flex-row flex-wrap",
          actionsAlignClasses[align],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
HeroActions.displayName = "HeroActions";

// HeroImage component
export interface HeroImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: "auto" | "video" | "square" | "wide";
  rounded?: boolean;
  shadow?: boolean;
}

const imageAspectRatioClasses = {
  auto: "",
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

export const HeroImage = forwardRef<HTMLDivElement, HeroImageProps>(
  ({ className, src, alt, aspectRatio = "auto", rounded = true, shadow = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          imageAspectRatioClasses[aspectRatio],
          rounded && "rounded-xl",
          shadow && "shadow-2xl",
          className,
        )}
        {...props}
      >
        <img src={src} alt={alt} className="size-full object-cover" />
      </div>
    );
  },
);
HeroImage.displayName = "HeroImage";

// HeroSplit component (for split layout)
export interface HeroSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  gap?: "sm" | "md" | "lg";
}

const gapClasses = {
  sm: "gap-8",
  md: "gap-12",
  lg: "gap-16",
};

export const HeroSplit = forwardRef<HTMLDivElement, HeroSplitProps>(
  ({ className, reverse = false, gap = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid items-center lg:grid-cols-2",
          gapClasses[gap],
          reverse && "lg:[&>*:first-child]:order-2",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
HeroSplit.displayName = "HeroSplit";

// HeroStats component
export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: HeroStat[];
}

export const HeroStats = forwardRef<HTMLDivElement, HeroStatsProps>(
  ({ className, stats, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap items-center gap-x-8 gap-y-4", className)}
        {...props}
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-foreground md:text-4xl">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  },
);
HeroStats.displayName = "HeroStats";

// HeroTrustedBy component
export interface HeroTrustedByProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  logos: { src: string; alt: string }[];
}

export const HeroTrustedBy = forwardRef<HTMLDivElement, HeroTrustedByProps>(
  ({ className, title = "Trusted by", logos, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-8 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    );
  },
);
HeroTrustedBy.displayName = "HeroTrustedBy";
