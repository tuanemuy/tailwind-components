"use client";

import { forwardRef, type ReactNode } from "react";
import { Badge, Button } from "@/components/atoms";
import { CheckIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/components/utils";

// Types
export interface ImageTextPairProps
  extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  imageAlt?: string;
  imageSide?: "left" | "right";
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  features?: string[];
  price?: {
    current: number;
    original?: number;
    currency?: string;
  };
  primaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  variant?: "default" | "card" | "fullwidth";
  imageOverlay?: ReactNode;
}

const formatPrice = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

const aspectRatioClasses = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-video",
  auto: "",
};

export const ImageTextPair = forwardRef<HTMLDivElement, ImageTextPairProps>(
  (
    {
      className,
      image,
      imageAlt = "",
      imageSide = "left",
      aspectRatio = "square",
      title,
      subtitle,
      description,
      badge,
      features,
      price,
      primaryAction,
      secondaryAction,
      variant = "default",
      imageOverlay,
      ...props
    },
    ref,
  ) => {
    const hasDiscount = price?.original && price.original > price.current;

    const containerClasses = {
      default: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center",
      card: "rounded-xl border border-border bg-card overflow-hidden grid grid-cols-1 lg:grid-cols-2",
      fullwidth: "grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[500px]",
    };

    return (
      <div
        ref={ref}
        className={cn(containerClasses[variant], className)}
        {...props}
      >
        {/* Image */}
        <div
          className={cn(
            "relative overflow-hidden",
            imageSide === "right" && "lg:order-2",
            variant === "fullwidth" ? "h-full min-h-[300px]" : "",
            variant === "card" ? "bg-muted" : "",
          )}
        >
          <div
            className={cn(
              aspectRatio !== "auto" && aspectRatioClasses[aspectRatio],
            )}
          >
            <img
              src={image}
              alt={imageAlt || title}
              className={cn(
                "size-full object-cover",
                variant === "fullwidth" && "absolute inset-0",
              )}
            />
          </div>
          {imageOverlay}
        </div>

        {/* Content */}
        <div
          className={cn(
            "flex flex-col justify-center",
            imageSide === "right" && "lg:order-1",
            variant === "card" ? "p-6 lg:p-8" : "",
            variant === "fullwidth" ? "p-8 lg:p-12" : "",
          )}
        >
          {badge && (
            <Badge variant="secondary" className="w-fit mb-4">
              {badge}
            </Badge>
          )}

          {subtitle && (
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
              {subtitle}
            </p>
          )}

          <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
            {title}
          </h2>

          {description && (
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}

          {features && features.length > 0 && (
            <ul className="mt-6 space-y-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckIcon className="size-4 text-success" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {price && (
            <div className="mt-6 flex items-center gap-3">
              <span
                className={cn(
                  "text-2xl font-bold",
                  hasDiscount ? "text-destructive" : "text-foreground",
                )}
              >
                {formatPrice(price.current, price.currency)}
              </span>
              {hasDiscount && price.original && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(price.original, price.currency)}
                </span>
              )}
            </div>
          )}

          {(primaryAction || secondaryAction) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryAction &&
                (primaryAction.href ? (
                  <a
                    href={primaryAction.href}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {primaryAction.label}
                  </a>
                ) : (
                  <Button variant="primary" onClick={primaryAction.onClick}>
                    {primaryAction.label}
                  </Button>
                ))}
              {secondaryAction &&
                (secondaryAction.href ? (
                  <a
                    href={secondaryAction.href}
                    className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {secondaryAction.label}
                    <ChevronRightIcon className="size-4 ml-2" />
                  </a>
                ) : (
                  <Button variant="outline" onClick={secondaryAction.onClick}>
                    {secondaryAction.label}
                    <ChevronRightIcon className="size-4 ml-2" />
                  </Button>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);
ImageTextPair.displayName = "ImageTextPair";

// ImageTextPairGrid - Multiple image-text pairs in a grid
export interface ImageTextPairGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: Omit<ImageTextPairProps, "variant">[];
  variant?: "default" | "card";
  alternating?: boolean;
}

export const ImageTextPairGrid = forwardRef<
  HTMLDivElement,
  ImageTextPairGridProps
>(
  (
    { className, items, variant = "default", alternating = true, ...props },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("space-y-16", className)} {...props}>
        {items.map((item, index) => (
          <ImageTextPair
            key={item.title}
            {...item}
            variant={variant}
            imageSide={
              alternating ? (index % 2 === 0 ? "left" : "right") : "left"
            }
          />
        ))}
      </div>
    );
  },
);
ImageTextPairGrid.displayName = "ImageTextPairGrid";
