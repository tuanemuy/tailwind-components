import { forwardRef, type ReactNode } from "react";
import { Button } from "@/components/atoms";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/components/utils";

// Types
export interface ContentItem {
  id: string;
  icon?: ReactNode;
  title: string;
  description: string;
}

// ContentSection component - main container
export interface ContentSectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: "sm" | "md" | "lg" | "xl";
  backgroundColor?: "default" | "muted" | "gradient";
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
  gradient: "bg-gradient-to-br from-primary/5 via-background to-primary/10",
};

export const ContentSection = forwardRef<HTMLElement, ContentSectionProps>(
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
ContentSection.displayName = "ContentSection";

// ContentSplit component - two column layout with image and text
export interface ContentSplitProps
  extends React.HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  gap?: "sm" | "md" | "lg" | "xl";
  verticalAlign?: "start" | "center" | "end";
}

const splitGapClasses = {
  sm: "gap-8",
  md: "gap-12",
  lg: "gap-16",
  xl: "gap-20",
};

const verticalAlignClasses = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
};

export const ContentSplit = forwardRef<HTMLDivElement, ContentSplitProps>(
  (
    {
      className,
      reverse = false,
      gap = "lg",
      verticalAlign = "center",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid lg:grid-cols-2",
          splitGapClasses[gap],
          verticalAlignClasses[verticalAlign],
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
ContentSplit.displayName = "ContentSplit";

// ContentImage component
export interface ContentImageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  variant?: "default" | "rounded" | "shadowed" | "bordered" | "floating";
  aspectRatio?: "auto" | "square" | "video" | "portrait";
}

const imageVariants = {
  default: "",
  rounded: "rounded-xl overflow-hidden",
  shadowed: "rounded-xl overflow-hidden shadow-xl",
  bordered: "rounded-xl overflow-hidden border-4 border-border",
  floating:
    "rounded-xl overflow-hidden shadow-2xl transform hover:-translate-y-2 transition-transform",
};

const aspectRatioClasses = {
  auto: "",
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
};

export const ContentImage = forwardRef<HTMLDivElement, ContentImageProps>(
  (
    {
      className,
      src,
      alt,
      variant = "rounded",
      aspectRatio = "auto",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(imageVariants[variant], className)}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className={cn(
            "size-full object-cover",
            aspectRatioClasses[aspectRatio],
          )}
        />
      </div>
    );
  },
);
ContentImage.displayName = "ContentImage";

// ContentBody component
export interface ContentBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export const ContentBody = forwardRef<HTMLDivElement, ContentBodyProps>(
  ({ className, align = "left", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col",
          align === "center"
            ? "items-center text-center"
            : "items-start text-left",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ContentBody.displayName = "ContentBody";

// ContentBadge component
export interface ContentBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary";
}

const badgeVariants = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary text-secondary-foreground",
};

export const ContentBadge = forwardRef<HTMLSpanElement, ContentBadgeProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide",
          badgeVariants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);
ContentBadge.displayName = "ContentBadge";

// ContentTitle component
export interface ContentTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3";
  size?: "sm" | "md" | "lg" | "xl";
}

const titleSizes = {
  sm: "text-xl md:text-2xl",
  md: "text-2xl md:text-3xl",
  lg: "text-3xl md:text-4xl",
  xl: "text-4xl md:text-5xl",
};

export const ContentTitle = forwardRef<HTMLHeadingElement, ContentTitleProps>(
  (
    { className, as: Component = "h2", size = "lg", children, ...props },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn("font-bold text-foreground", titleSizes[size], className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
ContentTitle.displayName = "ContentTitle";

// ContentDescription component
export interface ContentDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "md" | "lg";
}

const descriptionSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const ContentDescription = forwardRef<
  HTMLParagraphElement,
  ContentDescriptionProps
>(({ className, size = "md", children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "mt-4 text-muted-foreground",
        descriptionSizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
});
ContentDescription.displayName = "ContentDescription";

// ContentList component - list of features/items
export interface ContentListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  items: string[] | ContentItem[];
  variant?: "check" | "bullet" | "numbered" | "icon";
  columns?: 1 | 2;
}

export const ContentList = forwardRef<HTMLUListElement, ContentListProps>(
  ({ className, items, variant = "check", columns = 1, ...props }, ref) => {
    const isStringArray = typeof items[0] === "string";
    void isStringArray;

    return (
      <ul
        ref={ref}
        className={cn(
          "mt-6 space-y-3",
          columns === 2 && "grid grid-cols-1 gap-3 sm:grid-cols-2 space-y-0",
          className,
        )}
        {...props}
      >
        {items.map((item, index) => {
          const isString = typeof item === "string";
          const title = isString ? item : item.title;
          const description = isString ? undefined : item.description;
          const icon = isString ? undefined : item.icon;
          const id = isString ? index.toString() : item.id;

          return (
            <li key={id} className="flex items-start gap-3">
              {variant === "check" && (
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckIcon className="size-3" />
                </span>
              )}
              {variant === "bullet" && (
                <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
              )}
              {variant === "numbered" && (
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {index + 1}
                </span>
              )}
              {variant === "icon" && icon && (
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-primary">
                  {icon}
                </span>
              )}
              <div className="flex-1">
                <span className="font-medium text-foreground">{title}</span>
                {description && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    );
  },
);
ContentList.displayName = "ContentList";

// ContentActions component
export interface ContentActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  gap?: "sm" | "md" | "lg";
}

const actionGapClasses = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

export const ContentActions = forwardRef<HTMLDivElement, ContentActionsProps>(
  ({ className, gap = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mt-8 flex flex-wrap items-center",
          actionGapClasses[gap],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ContentActions.displayName = "ContentActions";

// ContentQuote component
export interface ContentQuoteProps
  extends React.HTMLAttributes<HTMLQuoteElement> {
  author?: string;
  authorTitle?: string;
  authorAvatar?: string;
}

export const ContentQuote = forwardRef<HTMLQuoteElement, ContentQuoteProps>(
  (
    { className, author, authorTitle, authorAvatar, children, ...props },
    ref,
  ) => {
    return (
      <blockquote
        ref={ref}
        className={cn("mt-6 border-l-4 border-primary pl-6", className)}
        {...props}
      >
        <p className="italic text-muted-foreground">{children}</p>
        {author && (
          <footer className="mt-4 flex items-center gap-3">
            {authorAvatar && (
              <img
                src={authorAvatar}
                alt={author}
                className="size-10 rounded-full object-cover"
              />
            )}
            <div>
              <cite className="not-italic font-medium text-foreground">
                {author}
              </cite>
              {authorTitle && (
                <p className="text-sm text-muted-foreground">{authorTitle}</p>
              )}
            </div>
          </footer>
        )}
      </blockquote>
    );
  },
);
ContentQuote.displayName = "ContentQuote";

// ContentStats component
export interface ContentStatItem {
  value: string;
  label: string;
}

export interface ContentStatsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stats: ContentStatItem[];
  variant?: "default" | "bordered" | "card";
}

const statVariants = {
  default: "",
  bordered: "divide-x divide-border",
  card: "divide-x divide-border rounded-lg border border-border bg-card p-4",
};

export const ContentStats = forwardRef<HTMLDivElement, ContentStatsProps>(
  ({ className, stats, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mt-8 flex flex-wrap", statVariants[variant], className)}
        {...props}
      >
        {stats.map((stat) => (
          <div
            key={`${stat.label}-${stat.value}`}
            className={cn(
              "flex-1 py-2",
              variant !== "default" && "px-4 first:pl-0 last:pr-0",
            )}
          >
            <div className="text-2xl font-bold text-foreground md:text-3xl">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    );
  },
);
ContentStats.displayName = "ContentStats";

// SimpleContentSection - pre-composed section with image and text
export interface SimpleContentSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  badge?: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  imagePosition?: "left" | "right";
  features?: string[];
  cta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
}

export const SimpleContentSection = forwardRef<
  HTMLElement,
  SimpleContentSectionProps
>(
  (
    {
      className,
      badge,
      title,
      description,
      image,
      imagePosition = "right",
      features,
      cta,
      secondaryCta,
      ...props
    },
    ref,
  ) => {
    return (
      <ContentSection ref={ref} className={className} {...props}>
        <ContentSplit reverse={imagePosition === "left"}>
          <ContentBody>
            {badge && <ContentBadge>{badge}</ContentBadge>}
            <ContentTitle>{title}</ContentTitle>
            <ContentDescription>{description}</ContentDescription>
            {features && features.length > 0 && (
              <ContentList items={features} variant="check" />
            )}
            {(cta || secondaryCta) && (
              <ContentActions>
                {cta &&
                  (cta.href ? (
                    <Button as="a" href={cta.href} variant="primary">
                      {cta.text}
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={cta.onClick}>
                      {cta.text}
                    </Button>
                  ))}
                {secondaryCta &&
                  (secondaryCta.href ? (
                    <Button as="a" href={secondaryCta.href} variant="outline">
                      {secondaryCta.text}
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={secondaryCta.onClick}>
                      {secondaryCta.text}
                    </Button>
                  ))}
              </ContentActions>
            )}
          </ContentBody>
          <ContentImage src={image.src} alt={image.alt} variant="shadowed" />
        </ContentSplit>
      </ContentSection>
    );
  },
);
SimpleContentSection.displayName = "SimpleContentSection";

// AlternatingContentSection - multiple content blocks that alternate
export interface ContentBlock {
  id: string;
  badge?: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  features?: string[];
  cta?: {
    text: string;
    href?: string;
  };
}

export interface AlternatingContentSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  blocks: ContentBlock[];
  gap?: "sm" | "md" | "lg" | "xl";
}

const blockGapClasses = {
  sm: "space-y-12 md:space-y-16",
  md: "space-y-16 md:space-y-24",
  lg: "space-y-24 md:space-y-32",
  xl: "space-y-32 md:space-y-40",
};

export const AlternatingContentSection = forwardRef<
  HTMLElement,
  AlternatingContentSectionProps
>(({ className, blocks, gap = "lg", ...props }, ref) => {
  return (
    <ContentSection ref={ref} className={className} {...props}>
      <div className={cn(blockGapClasses[gap])}>
        {blocks.map((block, index) => (
          <ContentSplit key={block.id} reverse={index % 2 === 1}>
            <ContentBody>
              {block.badge && <ContentBadge>{block.badge}</ContentBadge>}
              <ContentTitle size="md">{block.title}</ContentTitle>
              <ContentDescription>{block.description}</ContentDescription>
              {block.features && block.features.length > 0 && (
                <ContentList items={block.features} variant="check" />
              )}
              {block.cta && (
                <ContentActions>
                  <Button as="a" href={block.cta.href} variant="outline">
                    {block.cta.text}
                  </Button>
                </ContentActions>
              )}
            </ContentBody>
            <ContentImage
              src={block.image.src}
              alt={block.image.alt}
              variant="rounded"
            />
          </ContentSplit>
        ))}
      </div>
    </ContentSection>
  );
});
AlternatingContentSection.displayName = "AlternatingContentSection";

// FullWidthContentSection - full width image with overlay text
export interface FullWidthContentSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  backgroundImage: string;
  title: string;
  description?: string;
  cta?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  align?: "left" | "center" | "right";
  overlay?: "light" | "dark" | "gradient";
}

const overlayClasses = {
  light: "bg-white/80 dark:bg-black/60",
  dark: "bg-black/60",
  gradient: "bg-gradient-to-r from-black/80 via-black/50 to-transparent",
};

export const FullWidthContentSection = forwardRef<
  HTMLElement,
  FullWidthContentSectionProps
>(
  (
    {
      className,
      backgroundImage,
      title,
      description,
      cta,
      align = "center",
      overlay = "dark",
      ...props
    },
    ref,
  ) => {
    const alignClasses = {
      left: "text-left items-start",
      center: "text-center items-center",
      right: "text-right items-end",
    };

    return (
      <section
        ref={ref}
        className={cn(
          "relative min-h-[400px] overflow-hidden md:min-h-[500px]",
          className,
        )}
        {...props}
      >
        {/* Background Image */}
        <img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />

        {/* Overlay */}
        <div className={cn("absolute inset-0", overlayClasses[overlay])} />

        {/* Content */}
        <div className="container relative mx-auto flex min-h-[400px] items-center px-4 py-16 md:min-h-[500px]">
          <div className={cn("flex max-w-2xl flex-col", alignClasses[align])}>
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-lg text-white/90">{description}</p>
            )}
            {cta && (
              <div className="mt-8">
                {cta.href ? (
                  <Button as="a" href={cta.href} variant="primary" size="lg">
                    {cta.text}
                  </Button>
                ) : (
                  <Button variant="primary" size="lg" onClick={cta.onClick}>
                    {cta.text}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  },
);
FullWidthContentSection.displayName = "FullWidthContentSection";
