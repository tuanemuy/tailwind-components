import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/atoms";
import { QuoteIcon, StarIcon } from "@/lib/icons";

// Types
export interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    title?: string;
    company?: string;
    avatar?: string;
    initials?: string;
  };
  rating?: number;
  date?: string;
  featured?: boolean;
}

// TestimonialCard component
export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated" | "quote";
  size?: "sm" | "md" | "lg";
}

const variantClasses = {
  default: "bg-card",
  bordered: "bg-card border border-border",
  elevated: "bg-card shadow-lg",
  quote: "bg-card border-l-4 border-primary",
};

const sizeClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ className, variant = "bordered", size = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TestimonialCard.displayName = "TestimonialCard";

// TestimonialQuote component
export interface TestimonialQuoteProps extends React.HTMLAttributes<HTMLDivElement> {
  showIcon?: boolean;
  iconPosition?: "top" | "inline";
}

export const TestimonialQuote = forwardRef<HTMLDivElement, TestimonialQuoteProps>(
  ({ className, showIcon = true, iconPosition = "top", children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {showIcon && iconPosition === "top" && (
          <QuoteIcon className="mb-4 size-8 text-primary/20" />
        )}
        <blockquote
          className={cn(
            "text-foreground",
            iconPosition === "inline" && showIcon && "pl-8 relative",
          )}
        >
          {showIcon && iconPosition === "inline" && (
            <QuoteIcon className="absolute left-0 top-0 size-6 text-primary/30" />
          )}
          {children}
        </blockquote>
      </div>
    );
  },
);
TestimonialQuote.displayName = "TestimonialQuote";

// TestimonialContent component
export interface TestimonialContentProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "md" | "lg";
}

const contentSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const TestimonialContent = forwardRef<HTMLParagraphElement, TestimonialContentProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("leading-relaxed text-foreground", contentSizeClasses[size], className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);
TestimonialContent.displayName = "TestimonialContent";

// TestimonialRating component
export interface TestimonialRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  max?: number;
}

export const TestimonialRating = forwardRef<HTMLDivElement, TestimonialRatingProps>(
  ({ className, rating, max = 5, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center gap-x-0.5", className)} {...props}>
        {Array.from({ length: max }).map((_, i) => (
          <StarIcon
            key={i}
            className={cn(
              "size-4",
              i < rating ? "fill-warning text-warning" : "text-muted-foreground/30",
            )}
          />
        ))}
      </div>
    );
  },
);
TestimonialRating.displayName = "TestimonialRating";

// TestimonialAuthor component
export interface TestimonialAuthorProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: "horizontal" | "vertical";
}

export const TestimonialAuthor = forwardRef<HTMLDivElement, TestimonialAuthorProps>(
  ({ className, layout = "horizontal", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-3",
          layout === "vertical" ? "flex-col items-center text-center" : "items-center",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TestimonialAuthor.displayName = "TestimonialAuthor";

// TestimonialAuthorAvatar component
export interface TestimonialAuthorAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
}

const avatarSizeMap = {
  sm: "sm" as const,
  md: "md" as const,
  lg: "lg" as const,
};

export const TestimonialAuthorAvatar = forwardRef<HTMLDivElement, TestimonialAuthorAvatarProps>(
  ({ className, src, alt, initials, size = "md", ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        <Avatar src={src} alt={alt} initials={initials} size={avatarSizeMap[size]} />
      </div>
    );
  },
);
TestimonialAuthorAvatar.displayName = "TestimonialAuthorAvatar";

// TestimonialAuthorInfo component
export interface TestimonialAuthorInfoProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TestimonialAuthorInfo = forwardRef<HTMLDivElement, TestimonialAuthorInfoProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("min-w-0", className)} {...props}>
        {children}
      </div>
    );
  },
);
TestimonialAuthorInfo.displayName = "TestimonialAuthorInfo";

// TestimonialAuthorName component
export interface TestimonialAuthorNameProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TestimonialAuthorName = forwardRef<HTMLDivElement, TestimonialAuthorNameProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("font-semibold text-foreground", className)} {...props}>
        {children}
      </div>
    );
  },
);
TestimonialAuthorName.displayName = "TestimonialAuthorName";

// TestimonialAuthorTitle component
export interface TestimonialAuthorTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TestimonialAuthorTitle = forwardRef<HTMLDivElement, TestimonialAuthorTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props}>
        {children}
      </div>
    );
  },
);
TestimonialAuthorTitle.displayName = "TestimonialAuthorTitle";

// TestimonialSection component
export interface TestimonialSectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: "sm" | "md" | "lg" | "xl";
}

const paddingClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

export const TestimonialSection = forwardRef<HTMLElement, TestimonialSectionProps>(
  ({ className, padding = "lg", children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn(paddingClasses[padding], className)} {...props}>
        <div className="container mx-auto px-4">{children}</div>
      </section>
    );
  },
);
TestimonialSection.displayName = "TestimonialSection";

// TestimonialSectionHeader component
export interface TestimonialSectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export const TestimonialSectionHeader = forwardRef<HTMLDivElement, TestimonialSectionHeaderProps>(
  ({ className, align = "center", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mb-12 md:mb-16",
          align === "center" ? "text-center max-w-3xl mx-auto" : "text-left max-w-2xl",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TestimonialSectionHeader.displayName = "TestimonialSectionHeader";

// TestimonialSectionTitle component
export interface TestimonialSectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const TestimonialSectionTitle = forwardRef<HTMLHeadingElement, TestimonialSectionTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn("text-3xl font-bold text-foreground md:text-4xl", className)}
        {...props}
      >
        {children}
      </h2>
    );
  },
);
TestimonialSectionTitle.displayName = "TestimonialSectionTitle";

// TestimonialSectionSubtitle component
export interface TestimonialSectionSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const TestimonialSectionSubtitle = forwardRef<HTMLParagraphElement, TestimonialSectionSubtitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("mt-4 text-lg text-muted-foreground", className)} {...props}>
        {children}
      </p>
    );
  },
);
TestimonialSectionSubtitle.displayName = "TestimonialSectionSubtitle";

// TestimonialGrid component
export interface TestimonialGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3;
  gap?: "sm" | "md" | "lg";
}

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export const TestimonialGrid = forwardRef<HTMLDivElement, TestimonialGridProps>(
  ({ className, columns = 3, gap = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid", columnClasses[columns], gapClasses[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TestimonialGrid.displayName = "TestimonialGrid";

// TestimonialCarousel component (simple)
export interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TestimonialCarousel = forwardRef<HTMLDivElement, TestimonialCarouselProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TestimonialCarousel.displayName = "TestimonialCarousel";

// TestimonialCarouselItem component
export interface TestimonialCarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: "sm" | "md" | "lg";
}

const carouselItemWidths = {
  sm: "min-w-[280px]",
  md: "min-w-[340px]",
  lg: "min-w-[400px]",
};

export const TestimonialCarouselItem = forwardRef<HTMLDivElement, TestimonialCarouselItemProps>(
  ({ className, width = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("shrink-0 snap-center", carouselItemWidths[width], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TestimonialCarouselItem.displayName = "TestimonialCarouselItem";

// TestimonialFeatured component (for single featured testimonial)
export interface TestimonialFeaturedProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TestimonialFeatured = forwardRef<HTMLDivElement, TestimonialFeaturedProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto max-w-4xl rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-12",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TestimonialFeatured.displayName = "TestimonialFeatured";
