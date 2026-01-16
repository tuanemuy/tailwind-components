import { forwardRef } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import {
  ArrowRightIcon,
  CheckIcon,
  ExternalLinkIcon,
  RocketIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface FeaturePreviewData {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  video?: string;
  badge?: string;
  badgeVariant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning";
  features?: string[];
  ctaText?: string;
  ctaUrl?: string;
  isNew?: boolean;
  isComingSoon?: boolean;
  releaseDate?: string;
}

export interface FeaturePreviewCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  feature: FeaturePreviewData;
  variant?: "default" | "compact" | "horizontal" | "featured" | "media";
  onCtaClick?: (feature: FeaturePreviewData) => void;
  onDismiss?: (feature: FeaturePreviewData) => void;
}

export const FeaturePreviewCard = forwardRef<
  HTMLDivElement,
  FeaturePreviewCardProps
>(
  (
    {
      className,
      feature,
      variant = "default",
      onCtaClick,
      onDismiss,
      ...props
    },
    ref,
  ) => {
    const handleCtaClick = () => {
      onCtaClick?.(feature);
    };

    // Media variant (with image/video preview)
    if (variant === "media") {
      return (
        <div
          ref={ref}
          className={cn(
            "group overflow-hidden rounded-xl border border-border bg-card",
            className,
          )}
          {...props}
        >
          {/* Media */}
          <div className="relative aspect-video bg-muted">
            {feature.video ? (
              <video
                src={feature.video}
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : feature.image ? (
              <img
                src={feature.image}
                alt={feature.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                {feature.icon || (
                  <RocketIcon className="size-12 text-muted-foreground" />
                )}
              </div>
            )}

            {/* Badges */}
            <div className="absolute left-3 top-3 flex gap-x-2">
              {feature.isNew && <Badge variant="default">New</Badge>}
              {feature.isComingSoon && (
                <Badge variant="secondary">Coming Soon</Badge>
              )}
              {feature.badge && (
                <Badge variant={feature.badgeVariant || "default"}>
                  {feature.badge}
                </Badge>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-foreground">{feature.title}</h3>
            {feature.description && (
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            )}

            {feature.features && feature.features.length > 0 && (
              <ul className="mt-3 space-y-1">
                {feature.features.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-x-2 text-sm text-muted-foreground"
                  >
                    <CheckIcon className="size-3.5 text-success" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {(feature.ctaText || feature.ctaUrl) &&
              (feature.ctaUrl ? (
                <a
                  href={feature.ctaUrl}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {feature.ctaText || "Learn more"}
                  <ArrowRightIcon className="size-4" />
                </a>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={handleCtaClick}
                >
                  {feature.ctaText || "Learn more"}
                  <ArrowRightIcon className="ml-1.5 size-4" />
                </Button>
              ))}
          </div>
        </div>
      );
    }

    // Featured variant
    if (variant === "featured") {
      return (
        <div
          ref={ref}
          className={cn(
            "overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-border",
            className,
          )}
          {...props}
        >
          <div className="flex flex-col md:flex-row">
            {/* Content */}
            <div className="flex-1 p-6 md:p-8">
              <div className="flex items-start gap-x-2">
                {feature.isNew && <Badge variant="default">New</Badge>}
                {feature.isComingSoon && (
                  <Badge variant="secondary">Coming Soon</Badge>
                )}
                {feature.badge && (
                  <Badge variant={feature.badgeVariant || "default"}>
                    {feature.badge}
                  </Badge>
                )}
              </div>

              <div className="mt-4 flex items-center gap-x-3">
                {feature.icon && (
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                )}
                <h3 className="text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
              </div>

              {feature.description && (
                <p className="mt-3 text-muted-foreground">
                  {feature.description}
                </p>
              )}

              {feature.features && feature.features.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {feature.features.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-x-2 text-sm text-foreground"
                    >
                      <CheckIcon className="size-4 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {feature.releaseDate && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Expected release: {feature.releaseDate}
                </p>
              )}

              <div className="mt-6 flex gap-x-3">
                {(feature.ctaText || feature.ctaUrl) &&
                  (feature.ctaUrl ? (
                    <a
                      href={feature.ctaUrl}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      {feature.ctaText || "Learn more"}
                      <ArrowRightIcon className="size-4" />
                    </a>
                  ) : (
                    <Button onClick={handleCtaClick}>
                      {feature.ctaText || "Learn more"}
                      <ArrowRightIcon className="ml-1.5 size-4" />
                    </Button>
                  ))}
                {onDismiss && (
                  <Button variant="ghost" onClick={() => onDismiss(feature)}>
                    Dismiss
                  </Button>
                )}
              </div>
            </div>

            {/* Image */}
            {feature.image && (
              <div className="flex items-center justify-center p-6 md:w-2/5">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="max-h-64 w-auto rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        </div>
      );
    }

    // Horizontal variant
    if (variant === "horizontal") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-x-4 rounded-xl border border-border bg-card p-4",
            className,
          )}
          {...props}
        >
          {/* Icon/Image */}
          {feature.image ? (
            <img
              src={feature.image}
              alt={feature.title}
              className="size-16 shrink-0 rounded-lg object-cover"
            />
          ) : feature.icon ? (
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {feature.icon}
            </div>
          ) : null}

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-x-2">
              <h4 className="truncate font-semibold text-foreground">
                {feature.title}
              </h4>
              {feature.isNew && (
                <Badge variant="default" size="sm">
                  New
                </Badge>
              )}
              {feature.isComingSoon && (
                <Badge variant="secondary" size="sm">
                  Soon
                </Badge>
              )}
            </div>
            {feature.description && (
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {feature.description}
              </p>
            )}
          </div>

          {/* CTA */}
          {(feature.ctaText || feature.ctaUrl) &&
            (feature.ctaUrl ? (
              <a
                href={feature.ctaUrl}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                {feature.ctaText || "View"}
                <ExternalLinkIcon className="size-3.5" />
              </a>
            ) : (
              <Button variant="outline" size="sm" onClick={handleCtaClick}>
                {feature.ctaText || "View"}
                <ExternalLinkIcon className="ml-1.5 size-3.5" />
              </Button>
            ))}
        </div>
      );
    }

    // Compact variant
    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-x-3 rounded-lg border border-border bg-card p-3",
            className,
          )}
          {...props}
        >
          {feature.icon && (
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              {feature.icon}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-x-2">
              <h4 className="truncate text-sm font-medium text-foreground">
                {feature.title}
              </h4>
              {feature.isNew && (
                <Badge variant="default" size="sm">
                  New
                </Badge>
              )}
            </div>
          </div>
          <ArrowRightIcon className="size-4 text-muted-foreground" />
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn("rounded-xl border border-border bg-card p-6", className)}
        {...props}
      >
        <div className="flex items-start justify-between gap-x-4">
          <div className="flex items-start gap-x-3">
            {feature.icon && (
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {feature.icon}
              </div>
            )}
            <div>
              <div className="flex items-center gap-x-2">
                <h3 className="font-semibold text-foreground">
                  {feature.title}
                </h3>
                {feature.isNew && (
                  <Badge variant="default" size="sm">
                    New
                  </Badge>
                )}
                {feature.isComingSoon && (
                  <Badge variant="secondary" size="sm">
                    Coming Soon
                  </Badge>
                )}
              </div>
              {feature.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {feature.image && (
          <div className="mt-4 overflow-hidden rounded-lg">
            <img
              src={feature.image}
              alt={feature.title}
              className="h-auto w-full"
            />
          </div>
        )}

        {feature.features && feature.features.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {feature.features.map((item) => (
              <li
                key={item}
                className="flex items-center gap-x-2 text-sm text-muted-foreground"
              >
                <CheckIcon className="size-3.5 text-success" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {(feature.ctaText || feature.ctaUrl) && (
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            {feature.ctaUrl ? (
              <a
                href={feature.ctaUrl}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                {feature.ctaText || "Learn more"}
                <ArrowRightIcon className="size-4" />
              </a>
            ) : (
              <Button variant="outline" size="sm" onClick={handleCtaClick}>
                {feature.ctaText || "Learn more"}
                <ArrowRightIcon className="ml-1.5 size-4" />
              </Button>
            )}
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDismiss(feature)}
              >
                Dismiss
              </Button>
            )}
          </div>
        )}
      </div>
    );
  },
);
FeaturePreviewCard.displayName = "FeaturePreviewCard";

// Grid for multiple feature previews
export interface FeaturePreviewGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  features: FeaturePreviewData[];
  variant?: FeaturePreviewCardProps["variant"];
  columns?: 2 | 3;
  onCtaClick?: (feature: FeaturePreviewData) => void;
}

const gridColumnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

export const FeaturePreviewGrid = forwardRef<
  HTMLDivElement,
  FeaturePreviewGridProps
>(
  (
    {
      className,
      features,
      variant = "default",
      columns = 2,
      onCtaClick,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("grid gap-4", gridColumnClasses[columns], className)}
        {...props}
      >
        {features.map((feature) => (
          <FeaturePreviewCard
            key={feature.id}
            feature={feature}
            variant={variant}
            onCtaClick={onCtaClick}
          />
        ))}
      </div>
    );
  },
);
FeaturePreviewGrid.displayName = "FeaturePreviewGrid";
