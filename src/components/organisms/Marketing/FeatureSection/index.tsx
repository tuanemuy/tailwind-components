import { forwardRef, type ReactNode } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { cn } from "@/components/utils";

// Types
export interface Feature {
  id: string;
  icon?: ReactNode;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
}

// FeatureSection component
export interface FeatureSectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "grid" | "list" | "alternating";
  columns?: 2 | 3 | 4;
  padding?: "sm" | "md" | "lg" | "xl";
}

const paddingClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

export const FeatureSection = forwardRef<HTMLElement, FeatureSectionProps>(
  (
    {
      className,
      variant = "grid",
      columns = 3,
      padding = "lg",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn("overflow-hidden", paddingClasses[padding], className)}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </section>
    );
  },
);
FeatureSection.displayName = "FeatureSection";

// FeatureSectionHeader component
export interface FeatureSectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export const FeatureSectionHeader = forwardRef<
  HTMLDivElement,
  FeatureSectionHeaderProps
>(({ className, align = "center", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mb-12 md:mb-16",
        align === "center"
          ? "text-center max-w-3xl mx-auto"
          : "text-left max-w-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
FeatureSectionHeader.displayName = "FeatureSectionHeader";

// FeatureSectionTitle component
export interface FeatureSectionTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3";
}

export const FeatureSectionTitle = forwardRef<
  HTMLHeadingElement,
  FeatureSectionTitleProps
>(({ className, as: Component = "h2", children, ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn(
        "text-3xl font-bold text-foreground md:text-4xl",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
FeatureSectionTitle.displayName = "FeatureSectionTitle";

// FeatureSectionSubtitle component
export interface FeatureSectionSubtitleProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FeatureSectionSubtitle = forwardRef<
  HTMLParagraphElement,
  FeatureSectionSubtitleProps
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
FeatureSectionSubtitle.displayName = "FeatureSectionSubtitle";

// FeatureGrid component
export interface FeatureGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

const columnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export const FeatureGrid = forwardRef<HTMLDivElement, FeatureGridProps>(
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
FeatureGrid.displayName = "FeatureGrid";

// FeatureCard component
export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated" | "minimal";
  iconPosition?: "top" | "left";
}

const featureCardVariants = {
  default: "bg-card",
  bordered: "bg-card border border-border",
  elevated: "bg-card shadow-md",
  minimal: "bg-transparent",
};

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      className,
      variant = "bordered",
      iconPosition = "top",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl p-6 transition-all hover:shadow-lg",
          featureCardVariants[variant],
          iconPosition === "left" && "flex items-start gap-x-4",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FeatureCard.displayName = "FeatureCard";

// FeatureCardIcon component
export interface FeatureCardIconProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "gradient";
  size?: "sm" | "md" | "lg";
}

const iconVariants = {
  default: "bg-muted text-foreground",
  primary: "bg-primary/10 text-primary",
  gradient: "bg-gradient-to-br from-primary/20 to-primary/5 text-primary",
};

const iconSizes = {
  sm: "size-10",
  md: "size-12",
  lg: "size-14",
};

export const FeatureCardIcon = forwardRef<HTMLDivElement, FeatureCardIconProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg",
          iconVariants[variant],
          iconSizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FeatureCardIcon.displayName = "FeatureCardIcon";

// FeatureCardContent component
export interface FeatureCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const FeatureCardContent = forwardRef<
  HTMLDivElement,
  FeatureCardContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex-1", className)} {...props}>
      {children}
    </div>
  );
});
FeatureCardContent.displayName = "FeatureCardContent";

// FeatureCardTitle component
export interface FeatureCardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h3" | "h4";
}

export const FeatureCardTitle = forwardRef<
  HTMLHeadingElement,
  FeatureCardTitleProps
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
FeatureCardTitle.displayName = "FeatureCardTitle";

// FeatureCardDescription component
export interface FeatureCardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FeatureCardDescription = forwardRef<
  HTMLParagraphElement,
  FeatureCardDescriptionProps
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
FeatureCardDescription.displayName = "FeatureCardDescription";

// FeatureCardLink component
export interface FeatureCardLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const FeatureCardLink = forwardRef<
  HTMLAnchorElement,
  FeatureCardLinkProps
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
      <ChevronRightIcon className="ml-1 size-4" />
    </a>
  );
});
FeatureCardLink.displayName = "FeatureCardLink";

// FeatureList component (for alternating layout)
export interface FeatureListProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md" | "lg";
}

const listGapClasses = {
  sm: "space-y-12",
  md: "space-y-16",
  lg: "space-y-24",
};

export const FeatureList = forwardRef<HTMLDivElement, FeatureListProps>(
  ({ className, gap = "lg", children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(listGapClasses[gap], className)} {...props}>
        {children}
      </div>
    );
  },
);
FeatureList.displayName = "FeatureList";

// FeatureListItem component (for alternating layout)
export interface FeatureListItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
}

export const FeatureListItem = forwardRef<HTMLDivElement, FeatureListItemProps>(
  ({ className, reverse = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid items-center gap-8 lg:grid-cols-2 lg:gap-16",
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
FeatureListItem.displayName = "FeatureListItem";

// FeatureListContent component
export interface FeatureListContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const FeatureListContent = forwardRef<
  HTMLDivElement,
  FeatureListContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  );
});
FeatureListContent.displayName = "FeatureListContent";

// FeatureListImage component
export interface FeatureListImageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
}

export const FeatureListImage = forwardRef<
  HTMLDivElement,
  FeatureListImageProps
>(({ className, src, alt, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("overflow-hidden rounded-xl shadow-lg", className)}
      {...props}
    >
      <img src={src} alt={alt} className="size-full object-cover" />
    </div>
  );
});
FeatureListImage.displayName = "FeatureListImage";
