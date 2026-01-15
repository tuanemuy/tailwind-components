import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// Types
export interface LogoItem {
  id: string;
  name: string;
  src: string;
  alt?: string;
  url?: string;
  width?: number;
  height?: number;
}

// LogoCloudSection component
export interface LogoCloudSectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: "sm" | "md" | "lg" | "xl";
  backgroundColor?: "default" | "muted";
}

const paddingClasses = {
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-24 md:py-32",
};

const backgroundClasses = {
  default: "bg-background",
  muted: "bg-muted/50",
};

export const LogoCloudSection = forwardRef<HTMLElement, LogoCloudSectionProps>(
  ({ className, padding = "md", backgroundColor = "default", children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(paddingClasses[padding], backgroundClasses[backgroundColor], className)}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </section>
    );
  },
);
LogoCloudSection.displayName = "LogoCloudSection";

// LogoCloudHeader component
export interface LogoCloudHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export const LogoCloudHeader = forwardRef<HTMLDivElement, LogoCloudHeaderProps>(
  ({ className, align = "center", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mb-8 md:mb-12",
          align === "center" ? "text-center" : "text-left",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
LogoCloudHeader.displayName = "LogoCloudHeader";

// LogoCloudTitle component
export interface LogoCloudTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "md" | "lg";
}

const titleSizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export const LogoCloudTitle = forwardRef<HTMLParagraphElement, LogoCloudTitleProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "font-medium uppercase tracking-wider text-muted-foreground",
          titleSizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </p>
    );
  },
);
LogoCloudTitle.displayName = "LogoCloudTitle";

// LogoGrid component
export interface LogoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg";
  logoStyle?: "default" | "grayscale" | "grayscale-hover";
  alignment?: "start" | "center" | "between";
}

const gridColumnClasses = {
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
};

const gridGapClasses = {
  sm: "gap-4",
  md: "gap-6 md:gap-8",
  lg: "gap-8 md:gap-12",
};

export const LogoGrid = forwardRef<HTMLDivElement, LogoGridProps>(
  (
    {
      className,
      columns = 5,
      gap = "md",
      logoStyle = "grayscale-hover",
      alignment = "center",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid items-center",
          gridColumnClasses[columns],
          gridGapClasses[gap],
          alignment === "center" && "justify-items-center",
          className,
        )}
        data-logo-style={logoStyle}
        {...props}
      >
        {children}
      </div>
    );
  },
);
LogoGrid.displayName = "LogoGrid";

// LogoRow component (flex layout for fewer logos)
export interface LogoRowProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md" | "lg";
  logoStyle?: "default" | "grayscale" | "grayscale-hover";
  wrap?: boolean;
}

const rowGapClasses = {
  sm: "gap-4 md:gap-6",
  md: "gap-6 md:gap-10",
  lg: "gap-8 md:gap-16",
};

export const LogoRow = forwardRef<HTMLDivElement, LogoRowProps>(
  (
    {
      className,
      gap = "md",
      logoStyle = "grayscale-hover",
      wrap = true,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center",
          wrap && "flex-wrap",
          rowGapClasses[gap],
          className,
        )}
        data-logo-style={logoStyle}
        {...props}
      >
        {children}
      </div>
    );
  },
);
LogoRow.displayName = "LogoRow";

// LogoItem component
export interface LogoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  logo: LogoItem;
  variant?: "default" | "grayscale" | "grayscale-hover";
  size?: "sm" | "md" | "lg";
}

const logoSizeClasses = {
  sm: "h-6 max-w-[100px]",
  md: "h-8 max-w-[140px]",
  lg: "h-10 max-w-[180px]",
};

const logoVariantClasses = {
  default: "",
  grayscale: "grayscale opacity-50",
  "grayscale-hover": "grayscale opacity-50 transition-all hover:grayscale-0 hover:opacity-100",
};

export const LogoItemComponent = forwardRef<HTMLDivElement, LogoItemProps>(
  ({ className, logo, variant = "grayscale-hover", size = "md", ...props }, ref) => {
    const imageElement = (
      <img
        src={logo.src}
        alt={logo.alt || logo.name}
        className={cn(
          "object-contain",
          logoSizeClasses[size],
          logoVariantClasses[variant],
        )}
        width={logo.width}
        height={logo.height}
      />
    );

    return (
      <div ref={ref} className={cn("flex items-center justify-center", className)} {...props}>
        {logo.url ? (
          <a
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            title={logo.name}
          >
            {imageElement}
          </a>
        ) : (
          imageElement
        )}
      </div>
    );
  },
);
LogoItemComponent.displayName = "LogoItem";

// LogoMarquee component (scrolling logos)
export interface LogoMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  logos: LogoItem[];
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  variant?: "default" | "grayscale" | "grayscale-hover";
}

const marqueeSpeedClasses = {
  slow: "animate-[marquee_60s_linear_infinite]",
  normal: "animate-[marquee_40s_linear_infinite]",
  fast: "animate-[marquee_20s_linear_infinite]",
};

export const LogoMarquee = forwardRef<HTMLDivElement, LogoMarqueeProps>(
  (
    {
      className,
      logos,
      speed = "normal",
      direction = "left",
      pauseOnHover = true,
      variant = "grayscale-hover",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling container */}
        <div
          className={cn(
            "flex w-max gap-8 md:gap-12",
            marqueeSpeedClasses[speed],
            direction === "right" && "[animation-direction:reverse]",
            pauseOnHover && "hover:[animation-play-state:paused]",
          )}
        >
          {/* Double the logos for seamless loop */}
          {[...logos, ...logos].map((logo, index) => (
            <LogoItemComponent
              key={`${logo.id}-${index}`}
              logo={logo}
              variant={variant}
              size="md"
            />
          ))}
        </div>
      </div>
    );
  },
);
LogoMarquee.displayName = "LogoMarquee";

// SimpleLogoCloud component - compact inline display
export interface SimpleLogoCloudProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  logos: LogoItem[];
  variant?: LogoItemProps["variant"];
  size?: LogoItemProps["size"];
}

export const SimpleLogoCloud = forwardRef<HTMLDivElement, SimpleLogoCloudProps>(
  ({ className, title, logos, variant = "grayscale-hover", size = "md", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-6", className)} {...props}>
        {title && (
          <p className="text-center text-sm text-muted-foreground">{title}</p>
        )}
        <LogoRow gap="md">
          {logos.map((logo) => (
            <LogoItemComponent
              key={logo.id}
              logo={logo}
              variant={variant}
              size={size}
            />
          ))}
        </LogoRow>
      </div>
    );
  },
);
SimpleLogoCloud.displayName = "SimpleLogoCloud";

// CompleteLogoCloudSection component - pre-composed full logo cloud section
export interface CompleteLogoCloudSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  logos: LogoItem[];
  variant?: "grid" | "row" | "marquee";
  logoVariant?: LogoItemProps["variant"];
  columns?: LogoGridProps["columns"];
  backgroundColor?: LogoCloudSectionProps["backgroundColor"];
}

export const CompleteLogoCloudSection = forwardRef<HTMLElement, CompleteLogoCloudSectionProps>(
  (
    {
      className,
      title,
      logos,
      variant = "row",
      logoVariant = "grayscale-hover",
      columns = 5,
      backgroundColor = "default",
      ...props
    },
    ref,
  ) => {
    return (
      <LogoCloudSection ref={ref} backgroundColor={backgroundColor} className={className} {...props}>
        {title && (
          <LogoCloudHeader>
            <LogoCloudTitle>{title}</LogoCloudTitle>
          </LogoCloudHeader>
        )}

        {variant === "marquee" ? (
          <LogoMarquee logos={logos} variant={logoVariant} />
        ) : variant === "grid" ? (
          <LogoGrid columns={columns}>
            {logos.map((logo) => (
              <LogoItemComponent
                key={logo.id}
                logo={logo}
                variant={logoVariant}
              />
            ))}
          </LogoGrid>
        ) : (
          <LogoRow>
            {logos.map((logo) => (
              <LogoItemComponent
                key={logo.id}
                logo={logo}
                variant={logoVariant}
              />
            ))}
          </LogoRow>
        )}
      </LogoCloudSection>
    );
  },
);
CompleteLogoCloudSection.displayName = "CompleteLogoCloudSection";
