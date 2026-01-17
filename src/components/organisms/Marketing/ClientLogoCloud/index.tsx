import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// Types
export interface ClientLogo {
  id: string;
  name: string;
  src: string;
  alt?: string;
  url?: string;
  description?: string;
  category?: string;
}

export interface ClientTestimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  logo?: string;
  avatar?: string;
}

// ClientLogoCloud component - main container
export interface ClientLogoCloudProps
  extends React.HTMLAttributes<HTMLElement> {
  padding?: "sm" | "md" | "lg" | "xl";
  backgroundColor?: "default" | "muted" | "gradient";
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
  gradient: "bg-gradient-to-b from-muted/30 to-background",
};

export const ClientLogoCloud = forwardRef<HTMLElement, ClientLogoCloudProps>(
  (
    {
      className,
      padding = "md",
      backgroundColor = "default",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          paddingClasses[padding],
          backgroundClasses[backgroundColor],
          className,
        )}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </section>
    );
  },
);
ClientLogoCloud.displayName = "ClientLogoCloud";

// ClientLogoCloudHeader component
export interface ClientLogoCloudHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export const ClientLogoCloudHeader = forwardRef<
  HTMLDivElement,
  ClientLogoCloudHeaderProps
>(({ className, align = "center", children, ...props }, ref) => {
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
});
ClientLogoCloudHeader.displayName = "ClientLogoCloudHeader";

// ClientLogoCloudTitle component
export interface ClientLogoCloudTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "p";
  size?: "sm" | "md" | "lg";
}

const titleSizes = {
  sm: "text-sm uppercase tracking-wider font-medium",
  md: "text-lg font-semibold",
  lg: "text-2xl font-bold",
};

export const ClientLogoCloudTitle = forwardRef<
  HTMLHeadingElement,
  ClientLogoCloudTitleProps
>(
  (
    { className, as: Component = "p", size = "sm", children, ...props },
    ref,
  ) => {
    return (
      <Component
        // biome-ignore lint/suspicious/noExplicitAny: Polymorphic ref type
        ref={ref as any}
        className={cn("text-muted-foreground", titleSizes[size], className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
ClientLogoCloudTitle.displayName = "ClientLogoCloudTitle";

// ClientLogoCloudSubtitle component
export interface ClientLogoCloudSubtitleProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const ClientLogoCloudSubtitle = forwardRef<
  HTMLParagraphElement,
  ClientLogoCloudSubtitleProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("mt-2 text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
});
ClientLogoCloudSubtitle.displayName = "ClientLogoCloudSubtitle";

// LogoGrid component - grid layout for logos
export interface LogoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg";
  logoStyle?: "default" | "grayscale" | "grayscale-hover" | "bordered";
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

// LogoFlexRow component - flex layout for fewer logos
export interface LogoFlexRowProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md" | "lg";
  wrap?: boolean;
}

const flexGapClasses = {
  sm: "gap-4 md:gap-6",
  md: "gap-6 md:gap-10",
  lg: "gap-8 md:gap-16",
};

export const LogoFlexRow = forwardRef<HTMLDivElement, LogoFlexRowProps>(
  ({ className, gap = "md", wrap = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center",
          wrap && "flex-wrap",
          flexGapClasses[gap],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
LogoFlexRow.displayName = "LogoFlexRow";

// ClientLogoItem component
export interface ClientLogoItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logo: ClientLogo;
  variant?: "default" | "grayscale" | "grayscale-hover" | "bordered" | "card";
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

const logoSizeClasses = {
  sm: "h-6 max-w-[100px]",
  md: "h-8 max-w-[140px]",
  lg: "h-10 max-w-[180px]",
};

const logoVariantClasses = {
  default: "",
  grayscale: "grayscale opacity-50",
  "grayscale-hover":
    "grayscale opacity-50 transition-all hover:grayscale-0 hover:opacity-100",
  bordered: "rounded-lg border border-border p-4 bg-card",
  card: "rounded-xl border border-border p-6 bg-card shadow-sm hover:shadow-md transition-shadow",
};

export const ClientLogoItem = forwardRef<HTMLDivElement, ClientLogoItemProps>(
  (
    {
      className,
      logo,
      variant = "grayscale-hover",
      size = "md",
      showName = false,
      ...props
    },
    ref,
  ) => {
    const imageElement = (
      <img
        src={logo.src}
        alt={logo.alt || logo.name}
        className={cn(
          "object-contain",
          logoSizeClasses[size],
          variant !== "bordered" &&
            variant !== "card" &&
            logoVariantClasses[variant],
        )}
      />
    );

    const content = (
      <div
        className={cn("flex flex-col items-center justify-center", className)}
      >
        {imageElement}
        {showName && (
          <span className="mt-2 text-sm text-muted-foreground">
            {logo.name}
          </span>
        )}
        {logo.description && variant === "card" && (
          <p className="mt-1 text-xs text-muted-foreground text-center">
            {logo.description}
          </p>
        )}
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center",
          (variant === "bordered" || variant === "card") &&
            logoVariantClasses[variant],
        )}
        {...props}
      >
        {logo.url ? (
          <a
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
            title={logo.name}
          >
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    );
  },
);
ClientLogoItem.displayName = "ClientLogoItem";

// LogoMarquee component - scrolling logos
export interface LogoMarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  logos: ClientLogo[];
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  variant?: ClientLogoItemProps["variant"];
  size?: ClientLogoItemProps["size"];
  rows?: 1 | 2;
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
      size = "md",
      rows = 1,
      ...props
    },
    ref,
  ) => {
    const renderMarqueeRow = (rowLogos: ClientLogo[], reverse = false) => (
      <div
        className={cn(
          "flex w-max gap-8 md:gap-12",
          marqueeSpeedClasses[speed],
          (direction === "right" || reverse) && "[animation-direction:reverse]",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {/* Double the logos for seamless loop */}
        {[...rowLogos, ...rowLogos].map((logo, index) => (
          <ClientLogoItem
            key={`${logo.id}-${index}`}
            logo={logo}
            variant={variant}
            size={size}
          />
        ))}
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling container(s) */}
        <div className={cn(rows === 2 && "space-y-4")}>
          {renderMarqueeRow(logos)}
          {rows === 2 && renderMarqueeRow(logos, true)}
        </div>
      </div>
    );
  },
);
LogoMarquee.displayName = "LogoMarquee";

// LogoCategories component - logos grouped by category
export interface LogoCategoriesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logos: ClientLogo[];
  variant?: ClientLogoItemProps["variant"];
  size?: ClientLogoItemProps["size"];
}

export const LogoCategories = forwardRef<HTMLDivElement, LogoCategoriesProps>(
  (
    { className, logos, variant = "grayscale-hover", size = "md", ...props },
    ref,
  ) => {
    // Group logos by category
    const categories = logos.reduce(
      (acc, logo) => {
        const category = logo.category || "Other";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(logo);
        return acc;
      },
      {} as Record<string, ClientLogo[]>,
    );

    return (
      <div ref={ref} className={cn("space-y-12", className)} {...props}>
        {Object.entries(categories).map(([category, categoryLogos]) => (
          <div key={category}>
            <h4 className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {category}
            </h4>
            <LogoFlexRow>
              {categoryLogos.map((logo) => (
                <ClientLogoItem
                  key={logo.id}
                  logo={logo}
                  variant={variant}
                  size={size}
                />
              ))}
            </LogoFlexRow>
          </div>
        ))}
      </div>
    );
  },
);
LogoCategories.displayName = "LogoCategories";

// SimpleClientLogoCloud - pre-composed simple logo cloud
export interface SimpleClientLogoCloudProps
  extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  logos: ClientLogo[];
  variant?: ClientLogoItemProps["variant"];
  size?: ClientLogoItemProps["size"];
}

export const SimpleClientLogoCloud = forwardRef<
  HTMLElement,
  SimpleClientLogoCloudProps
>(
  (
    {
      className,
      title,
      logos,
      variant = "grayscale-hover",
      size = "md",
      ...props
    },
    ref,
  ) => {
    return (
      <ClientLogoCloud ref={ref} className={className} padding="sm" {...props}>
        {title && (
          <ClientLogoCloudHeader>
            <ClientLogoCloudTitle>{title}</ClientLogoCloudTitle>
          </ClientLogoCloudHeader>
        )}
        <LogoFlexRow>
          {logos.map((logo) => (
            <ClientLogoItem
              key={logo.id}
              logo={logo}
              variant={variant}
              size={size}
            />
          ))}
        </LogoFlexRow>
      </ClientLogoCloud>
    );
  },
);
SimpleClientLogoCloud.displayName = "SimpleClientLogoCloud";

// CompleteClientLogoCloud - pre-composed full logo cloud
export interface CompleteClientLogoCloudProps
  extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  logos: ClientLogo[];
  layout?: "grid" | "row" | "marquee" | "categories";
  columns?: LogoGridProps["columns"];
  logoVariant?: ClientLogoItemProps["variant"];
  logoSize?: ClientLogoItemProps["size"];
  backgroundColor?: ClientLogoCloudProps["backgroundColor"];
}

export const CompleteClientLogoCloud = forwardRef<
  HTMLElement,
  CompleteClientLogoCloudProps
>(
  (
    {
      className,
      title,
      subtitle,
      logos,
      layout = "row",
      columns = 5,
      logoVariant = "grayscale-hover",
      logoSize = "md",
      backgroundColor = "default",
      ...props
    },
    ref,
  ) => {
    return (
      <ClientLogoCloud
        ref={ref}
        backgroundColor={backgroundColor}
        className={className}
        {...props}
      >
        {(title || subtitle) && (
          <ClientLogoCloudHeader>
            {title && <ClientLogoCloudTitle>{title}</ClientLogoCloudTitle>}
            {subtitle && (
              <ClientLogoCloudSubtitle>{subtitle}</ClientLogoCloudSubtitle>
            )}
          </ClientLogoCloudHeader>
        )}

        {layout === "marquee" ? (
          <LogoMarquee logos={logos} variant={logoVariant} size={logoSize} />
        ) : layout === "grid" ? (
          <LogoGrid columns={columns}>
            {logos.map((logo) => (
              <ClientLogoItem
                key={logo.id}
                logo={logo}
                variant={logoVariant}
                size={logoSize}
              />
            ))}
          </LogoGrid>
        ) : layout === "categories" ? (
          <LogoCategories logos={logos} variant={logoVariant} size={logoSize} />
        ) : (
          <LogoFlexRow>
            {logos.map((logo) => (
              <ClientLogoItem
                key={logo.id}
                logo={logo}
                variant={logoVariant}
                size={logoSize}
              />
            ))}
          </LogoFlexRow>
        )}
      </ClientLogoCloud>
    );
  },
);
CompleteClientLogoCloud.displayName = "CompleteClientLogoCloud";

// LogoCloudWithTestimonial - logos with a featured testimonial
export interface LogoCloudWithTestimonialProps
  extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  logos: ClientLogo[];
  testimonial: ClientTestimonial;
  logoVariant?: ClientLogoItemProps["variant"];
}

export const LogoCloudWithTestimonial = forwardRef<
  HTMLElement,
  LogoCloudWithTestimonialProps
>(
  (
    {
      className,
      title,
      logos,
      testimonial,
      logoVariant = "grayscale-hover",
      ...props
    },
    ref,
  ) => {
    return (
      <ClientLogoCloud ref={ref} className={className} padding="lg" {...props}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Logos */}
          <div>
            {title && (
              <ClientLogoCloudHeader align="left">
                <ClientLogoCloudTitle>{title}</ClientLogoCloudTitle>
              </ClientLogoCloudHeader>
            )}
            <LogoGrid columns={3} gap="md">
              {logos.map((logo) => (
                <ClientLogoItem
                  key={logo.id}
                  logo={logo}
                  variant={logoVariant}
                />
              ))}
            </LogoGrid>
          </div>

          {/* Testimonial */}
          <div className="flex flex-col justify-center rounded-2xl bg-muted/50 p-8">
            <blockquote className="text-lg italic text-foreground">
              "{testimonial.quote}"
            </blockquote>
            <div className="mt-6 flex items-center gap-4">
              {testimonial.avatar && (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="size-12 rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-semibold text-foreground">
                  {testimonial.author}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.title}, {testimonial.company}
                </div>
              </div>
              {testimonial.logo && (
                <img
                  src={testimonial.logo}
                  alt={testimonial.company}
                  className="ml-auto h-8 object-contain grayscale"
                />
              )}
            </div>
          </div>
        </div>
      </ClientLogoCloud>
    );
  },
);
LogoCloudWithTestimonial.displayName = "LogoCloudWithTestimonial";

// LogoCloudStats - logos with stats
export interface LogoCloudStatsProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  logos: ClientLogo[];
  stats: { value: string; label: string }[];
  logoVariant?: ClientLogoItemProps["variant"];
}

export const LogoCloudStats = forwardRef<HTMLElement, LogoCloudStatsProps>(
  (
    {
      className,
      title,
      logos,
      stats,
      logoVariant = "grayscale-hover",
      ...props
    },
    ref,
  ) => {
    return (
      <ClientLogoCloud ref={ref} className={className} padding="lg" {...props}>
        {title && (
          <ClientLogoCloudHeader>
            <ClientLogoCloudTitle size="lg">{title}</ClientLogoCloudTitle>
          </ClientLogoCloudHeader>
        )}

        {/* Stats */}
        <div className="mb-12 flex flex-wrap justify-center gap-8 md:gap-16">
          {stats.map((stat) => (
            <div key={`${stat.label}-${stat.value}`} className="text-center">
              <div className="text-4xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Logos */}
        <LogoFlexRow>
          {logos.map((logo) => (
            <ClientLogoItem key={logo.id} logo={logo} variant={logoVariant} />
          ))}
        </LogoFlexRow>
      </ClientLogoCloud>
    );
  },
);
LogoCloudStats.displayName = "LogoCloudStats";
