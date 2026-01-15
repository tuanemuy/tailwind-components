import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms";

// CTASection component
export interface CTASectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "centered" | "split" | "banner" | "gradient" | "image";
  padding?: "sm" | "md" | "lg" | "xl";
  backgroundImage?: string;
  backgroundColor?: "default" | "primary" | "muted";
}

const paddingClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

const backgroundClasses = {
  default: "bg-background",
  primary: "bg-primary text-primary-foreground",
  muted: "bg-muted",
};

export const CTASection = forwardRef<HTMLElement, CTASectionProps>(
  (
    {
      className,
      variant = "centered",
      padding = "lg",
      backgroundImage,
      backgroundColor = "default",
      children,
      ...props
    },
    ref,
  ) => {
    const isGradient = variant === "gradient";
    const hasImage = variant === "image" && backgroundImage;

    return (
      <section
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          paddingClasses[padding],
          !isGradient && !hasImage && backgroundClasses[backgroundColor],
          isGradient && "bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground",
          hasImage && "bg-cover bg-center bg-no-repeat",
          className,
        )}
        style={hasImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
        {...props}
      >
        {/* Overlay for image variant */}
        {hasImage && (
          <div className="absolute inset-0 bg-background/80" />
        )}

        {/* Content */}
        <div className={cn("relative container mx-auto px-4", variant === "split" && "")}>
          {variant === "split" ? (
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
              {children}
            </div>
          ) : variant === "banner" ? (
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-primary p-8 text-primary-foreground md:flex-row md:p-12">
              {children}
            </div>
          ) : (
            <div className="mx-auto max-w-3xl text-center">
              {children}
            </div>
          )}
        </div>
      </section>
    );
  },
);
CTASection.displayName = "CTASection";

// CTAContent component
export interface CTAContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export const CTAContent = forwardRef<HTMLDivElement, CTAContentProps>(
  ({ className, align = "center", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "space-y-4",
          align === "left" ? "text-left" : "text-center",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
CTAContent.displayName = "CTAContent";

// CTATitle component
export interface CTATitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3";
  size?: "sm" | "md" | "lg";
}

const titleSizeClasses = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl",
};

export const CTATitle = forwardRef<HTMLHeadingElement, CTATitleProps>(
  ({ className, as: Component = "h2", size = "md", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("font-bold tracking-tight", titleSizeClasses[size], className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
CTATitle.displayName = "CTATitle";

// CTADescription component
export interface CTADescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "md" | "lg";
}

const descriptionSizeClasses = {
  sm: "text-sm",
  md: "text-base md:text-lg",
  lg: "text-lg md:text-xl",
};

export const CTADescription = forwardRef<HTMLParagraphElement, CTADescriptionProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("opacity-90", descriptionSizeClasses[size], className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);
CTADescription.displayName = "CTADescription";

// CTAActions component
export interface CTAActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  align?: "left" | "center" | "right";
}

const alignClasses = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export const CTAActions = forwardRef<HTMLDivElement, CTAActionsProps>(
  ({ className, direction = "row", align = "center", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-4",
          direction === "column" ? "flex-col" : "flex-row flex-wrap",
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
CTAActions.displayName = "CTAActions";

// CTAButton component (with inverted styling for primary backgrounds)
export interface CTAButtonProps extends React.ComponentProps<typeof Button> {
  inverted?: boolean;
}

export const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, inverted = false, variant = "primary", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={inverted ? "secondary" : variant}
        className={cn(
          inverted && "bg-background text-foreground hover:bg-background/90",
          className,
        )}
        {...props}
      />
    );
  },
);
CTAButton.displayName = "CTAButton";

// CTAStats component
export interface CTAStatItem {
  value: string;
  label: string;
}

export interface CTAStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: CTAStatItem[];
}

export const CTAStats = forwardRef<HTMLDivElement, CTAStatsProps>(
  ({ className, stats, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap justify-center gap-8 md:gap-12", className)}
        {...props}
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold md:text-4xl">{stat.value}</div>
            <div className="mt-1 text-sm opacity-75">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  },
);
CTAStats.displayName = "CTAStats";

// SimpleCTA component - pre-composed simple CTA
export interface SimpleCTAProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  variant?: CTASectionProps["variant"];
  backgroundColor?: CTASectionProps["backgroundColor"];
}

export const SimpleCTA = forwardRef<HTMLElement, SimpleCTAProps>(
  (
    {
      className,
      title,
      description,
      primaryAction,
      secondaryAction,
      variant = "gradient",
      backgroundColor,
      ...props
    },
    ref,
  ) => {
    const isPrimaryBg = variant === "gradient" || backgroundColor === "primary";

    return (
      <CTASection ref={ref} variant={variant} backgroundColor={backgroundColor} className={className} {...props}>
        <CTATitle>{title}</CTATitle>
        {description && <CTADescription>{description}</CTADescription>}
        {(primaryAction || secondaryAction) && (
          <CTAActions className="mt-6">
            {primaryAction && (
              <CTAButton inverted={isPrimaryBg} onClick={primaryAction.onClick} size="lg">
                {primaryAction.label}
              </CTAButton>
            )}
            {secondaryAction && (
              <CTAButton
                variant={isPrimaryBg ? "ghost" : "outline"}
                onClick={secondaryAction.onClick}
                size="lg"
                className={isPrimaryBg ? "text-primary-foreground hover:bg-primary-foreground/10" : ""}
              >
                {secondaryAction.label}
              </CTAButton>
            )}
          </CTAActions>
        )}
      </CTASection>
    );
  },
);
SimpleCTA.displayName = "SimpleCTA";

// BannerCTA component - inline banner style CTA
export interface BannerCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const BannerCTA = forwardRef<HTMLDivElement, BannerCTAProps>(
  (
    {
      className,
      title,
      description,
      action,
      dismissible = false,
      onDismiss,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-between gap-4 rounded-xl bg-primary p-6 text-primary-foreground md:flex-row",
          className,
        )}
        {...props}
      >
        <div className="flex-1 text-center md:text-left">
          <div className="font-semibold">{title}</div>
          {description && (
            <div className="mt-1 text-sm opacity-90">{description}</div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {action && (
            <Button
              variant="secondary"
              onClick={action.onClick}
              className="bg-background text-foreground hover:bg-background/90"
            >
              {action.label}
            </Button>
          )}
          {dismissible && (
            <button
              type="button"
              onClick={onDismiss}
              className="rounded-lg p-2 hover:bg-primary-foreground/10"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  },
);
BannerCTA.displayName = "BannerCTA";
