import { forwardRef, type ReactNode } from "react";
import { cn } from "@/components/utils";

// Types
export interface IconFeature {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
}

// IconSection component - main container
export interface IconSectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: "sm" | "md" | "lg" | "xl";
  backgroundColor?: "default" | "muted" | "primary" | "gradient";
}

const paddingClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

const backgroundClasses = {
  default: "bg-background",
  muted: "bg-muted/50",
  primary: "bg-primary text-primary-foreground",
  gradient: "bg-gradient-to-br from-primary/10 via-background to-primary/5",
};

export const IconSection = forwardRef<HTMLElement, IconSectionProps>(
  (
    {
      className,
      padding = "lg",
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
IconSection.displayName = "IconSection";

// IconSectionHeader component
export interface IconSectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export const IconSectionHeader = forwardRef<
  HTMLDivElement,
  IconSectionHeaderProps
>(({ className, align = "center", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mb-12 md:mb-16",
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-2xl text-left",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
IconSectionHeader.displayName = "IconSectionHeader";

// IconSectionTitle component
export interface IconSectionTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3";
  size?: "sm" | "md" | "lg" | "xl";
}

const titleSizeClasses = {
  sm: "text-xl font-bold md:text-2xl",
  md: "text-2xl font-bold md:text-3xl",
  lg: "text-3xl font-bold md:text-4xl",
  xl: "text-4xl font-bold md:text-5xl",
};

export const IconSectionTitle = forwardRef<
  HTMLHeadingElement,
  IconSectionTitleProps
>(
  (
    { className, as: Component = "h2", size = "lg", children, ...props },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(titleSizeClasses[size], className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
IconSectionTitle.displayName = "IconSectionTitle";

// IconSectionSubtitle component
export interface IconSectionSubtitleProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const IconSectionSubtitle = forwardRef<
  HTMLParagraphElement,
  IconSectionSubtitleProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("mt-4 text-lg text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
});
IconSectionSubtitle.displayName = "IconSectionSubtitle";

// IconGrid component
export interface IconGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4 | 6;
  gap?: "sm" | "md" | "lg";
}

const columnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
};

const gapClasses = {
  sm: "gap-4 md:gap-6",
  md: "gap-6 md:gap-8",
  lg: "gap-8 md:gap-12",
};

export const IconGrid = forwardRef<HTMLDivElement, IconGridProps>(
  ({ className, columns = 3, gap = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          columnClasses[columns],
          gapClasses[gap],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
IconGrid.displayName = "IconGrid";

// IconFeatureCard component
export interface IconFeatureCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "centered" | "bordered" | "elevated" | "minimal";
  iconStyle?: "default" | "primary" | "gradient" | "outlined";
  iconSize?: "sm" | "md" | "lg" | "xl";
}

const cardVariants = {
  default: "text-left",
  centered: "text-center items-center",
  bordered: "text-left border border-border rounded-xl p-6",
  elevated: "text-left bg-card shadow-md rounded-xl p-6",
  minimal: "text-left",
};

const iconStyleClasses = {
  default: "bg-muted text-foreground",
  primary: "bg-primary/10 text-primary",
  gradient: "bg-gradient-to-br from-primary/20 to-primary/5 text-primary",
  outlined: "border-2 border-primary/20 text-primary",
};

const iconSizeClasses = {
  sm: "size-10",
  md: "size-12",
  lg: "size-14",
  xl: "size-16",
};

export const IconFeatureCard = forwardRef<HTMLDivElement, IconFeatureCardProps>(
  (
    {
      className,
      variant = "default",
      iconStyle = "primary",
      iconSize = "md",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col", cardVariants[variant], className)}
        data-icon-style={iconStyle}
        data-icon-size={iconSize}
        {...props}
      >
        {children}
      </div>
    );
  },
);
IconFeatureCard.displayName = "IconFeatureCard";

// IconFeatureIcon component
export interface IconFeatureIconProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "style"> {
  /** Icon style variant */
  iconStyle?: "default" | "primary" | "gradient" | "outlined";
  /** Alias for iconStyle */
  style?: "default" | "primary" | "gradient" | "outlined";
  size?: "sm" | "md" | "lg" | "xl";
}

export const IconFeatureIcon = forwardRef<HTMLDivElement, IconFeatureIconProps>(
  ({ className, iconStyle, style, size = "md", children, ...props }, ref) => {
    const resolvedStyle = iconStyle ?? style ?? "primary";
    return (
      <div
        ref={ref}
        className={cn(
          "mb-4 flex shrink-0 items-center justify-center rounded-lg",
          iconStyleClasses[resolvedStyle],
          iconSizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
IconFeatureIcon.displayName = "IconFeatureIcon";

// IconFeatureTitle component
export interface IconFeatureTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h3" | "h4";
}

export const IconFeatureTitle = forwardRef<
  HTMLHeadingElement,
  IconFeatureTitleProps
>(({ className, as: Component = "h3", children, ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    >
      {children}
    </Component>
  );
});
IconFeatureTitle.displayName = "IconFeatureTitle";

// IconFeatureDescription component
export interface IconFeatureDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const IconFeatureDescription = forwardRef<
  HTMLParagraphElement,
  IconFeatureDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("mt-2 text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
});
IconFeatureDescription.displayName = "IconFeatureDescription";

// IconFeatureLink component
export interface IconFeatureLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const IconFeatureLink = forwardRef<
  HTMLAnchorElement,
  IconFeatureLinkProps
>(({ className, children, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn(
        "mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline",
        className,
      )}
      {...props}
    >
      {children}
      <svg
        aria-hidden="true"
        className="ml-1 size-4"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
});
IconFeatureLink.displayName = "IconFeatureLink";

// IconRow component - horizontal layout with icons
export interface IconRowProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md" | "lg";
}

const rowGapClasses = {
  sm: "gap-6 md:gap-8",
  md: "gap-8 md:gap-12",
  lg: "gap-12 md:gap-16",
};

export const IconRow = forwardRef<HTMLDivElement, IconRowProps>(
  ({ className, gap = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-start justify-center",
          rowGapClasses[gap],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
IconRow.displayName = "IconRow";

// IconRowItem component
export interface IconRowItemProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export const IconRowItem = forwardRef<HTMLDivElement, IconRowItemProps>(
  ({ className, align = "center", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          align === "center"
            ? "items-center text-center"
            : "items-start text-left",
          "max-w-[200px]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
IconRowItem.displayName = "IconRowItem";

// SimpleIconSection - compact horizontal icons
export interface SimpleIconSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  features: IconFeature[];
  iconStyle?: IconFeatureIconProps["style"];
}

export const SimpleIconSection = forwardRef<
  HTMLDivElement,
  SimpleIconSectionProps
>(({ className, features, iconStyle = "primary", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-start justify-center gap-8 md:gap-12",
        className,
      )}
      {...props}
    >
      {features.map((feature) => (
        <div
          key={feature.id}
          className="flex max-w-[200px] flex-col items-center text-center"
        >
          <IconFeatureIcon style={iconStyle} size="lg">
            {feature.icon}
          </IconFeatureIcon>
          <IconFeatureTitle className="text-base">
            {feature.title}
          </IconFeatureTitle>
          <IconFeatureDescription className="mt-1 text-xs">
            {feature.description}
          </IconFeatureDescription>
        </div>
      ))}
    </div>
  );
});
SimpleIconSection.displayName = "SimpleIconSection";

// CompleteIconSection - pre-composed full section
export interface CompleteIconSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  features: IconFeature[];
  columns?: IconGridProps["columns"];
  variant?: IconFeatureCardProps["variant"];
  iconStyle?: IconFeatureIconProps["style"];
  align?: "left" | "center";
  backgroundColor?: IconSectionProps["backgroundColor"];
}

export const CompleteIconSection = forwardRef<
  HTMLElement,
  CompleteIconSectionProps
>(
  (
    {
      className,
      title,
      subtitle,
      features,
      columns = 3,
      variant = "default",
      iconStyle = "primary",
      align = "center",
      backgroundColor = "default",
      ...props
    },
    ref,
  ) => {
    return (
      <IconSection
        ref={ref}
        backgroundColor={backgroundColor}
        className={className}
        {...props}
      >
        <IconSectionHeader align={align}>
          <IconSectionTitle>{title}</IconSectionTitle>
          {subtitle && <IconSectionSubtitle>{subtitle}</IconSectionSubtitle>}
        </IconSectionHeader>

        <IconGrid columns={columns}>
          {features.map((feature) => (
            <IconFeatureCard key={feature.id} variant={variant}>
              <IconFeatureIcon style={iconStyle}>
                {feature.icon}
              </IconFeatureIcon>
              <IconFeatureTitle>{feature.title}</IconFeatureTitle>
              <IconFeatureDescription>
                {feature.description}
              </IconFeatureDescription>
              {feature.link && (
                <IconFeatureLink href={feature.link.href}>
                  {feature.link.text}
                </IconFeatureLink>
              )}
            </IconFeatureCard>
          ))}
        </IconGrid>
      </IconSection>
    );
  },
);
CompleteIconSection.displayName = "CompleteIconSection";

// HighlightIconSection - icons with colored backgrounds in a row
export interface HighlightIconSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  features: IconFeature[];
}

export const HighlightIconSection = forwardRef<
  HTMLElement,
  HighlightIconSectionProps
>(({ className, title, subtitle, features, ...props }, ref) => {
  const colors = [
    "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
    "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
  ];

  return (
    <IconSection ref={ref} className={className} {...props}>
      {(title || subtitle) && (
        <IconSectionHeader>
          {title && <IconSectionTitle>{title}</IconSectionTitle>}
          {subtitle && <IconSectionSubtitle>{subtitle}</IconSectionSubtitle>}
        </IconSectionHeader>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 md:gap-6">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className="flex flex-col items-center rounded-xl p-4 text-center transition-all hover:shadow-md"
          >
            <div
              className={cn(
                "mb-3 flex size-14 items-center justify-center rounded-xl",
                colors[index % colors.length],
              )}
            >
              {feature.icon}
            </div>
            <h4 className="text-sm font-semibold text-foreground">
              {feature.title}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </IconSection>
  );
});
HighlightIconSection.displayName = "HighlightIconSection";
