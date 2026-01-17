import { forwardRef, type ReactNode } from "react";
import { Badge, type BadgeProps, Button } from "@/components/atoms";
import { IconButton } from "@/components/molecules";
import { EyeIcon, HeartIcon, ShoppingBagIcon, StarIcon } from "@/components/icons";
import { cn } from "@/components/utils";

// Types
export type ProductBadgeType = "new" | "sale" | "soldOut" | "featured";

export interface ProductBadge {
  type: ProductBadgeType;
  label?: string;
  value?: string; // For sale percentage like "-20%"
}

export interface ProductRating {
  value: number; // 0-5
  count?: number;
}

export interface ProductPrice {
  current: number;
  original?: number;
  currency?: string;
}

// Badge configuration
const badgeConfig: Record<
  ProductBadgeType,
  { variant: BadgeProps["variant"]; defaultLabel: string }
> = {
  new: { variant: "default", defaultLabel: "New" },
  sale: { variant: "destructive", defaultLabel: "Sale" },
  soldOut: { variant: "secondary", defaultLabel: "Sold Out" },
  featured: { variant: "outline", defaultLabel: "Featured" },
};

// ProductCard component
export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "horizontal" | "minimal";
  imagePosition?: "top" | "left";
}

const variantClasses = {
  default: "flex flex-col",
  horizontal: "flex flex-row",
  minimal: "flex flex-col",
};

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group rounded-xl border border-border bg-card overflow-hidden",
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ProductCard.displayName = "ProductCard";

// ProductCardImage component
export interface ProductCardImageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: "square" | "portrait" | "landscape";
  badges?: ProductBadge[];
  showQuickActions?: boolean;
  onFavoriteClick?: () => void;
  onQuickViewClick?: () => void;
  isFavorite?: boolean;
  overlay?: ReactNode;
}

const aspectRatioClasses = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-video",
};

export const ProductCardImage = forwardRef<
  HTMLDivElement,
  ProductCardImageProps
>(
  (
    {
      className,
      src,
      alt,
      aspectRatio = "square",
      badges = [],
      showQuickActions = true,
      onFavoriteClick,
      onQuickViewClick,
      isFavorite = false,
      overlay,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-muted",
          aspectRatioClasses[aspectRatio],
          className,
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-y-1">
            {badges.map((badge) => {
              const config = badgeConfig[badge.type];
              return (
                <Badge key={badge.type} variant={config.variant} size="sm">
                  {badge.label || badge.value || config.defaultLabel}
                </Badge>
              );
            })}
          </div>
        )}

        {/* Quick Actions */}
        {showQuickActions && (
          <div className="absolute top-3 right-3 flex flex-col gap-y-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {onFavoriteClick && (
              <IconButton
                icon={
                  <HeartIcon
                    className={cn(
                      "size-4",
                      isFavorite && "fill-current text-destructive",
                    )}
                  />
                }
                size="sm"
                variant="secondary"
                onClick={onFavoriteClick}
                label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                className="bg-background/80 backdrop-blur-sm hover:bg-background"
              />
            )}
            {onQuickViewClick && (
              <IconButton
                icon={<EyeIcon className="size-4" />}
                size="sm"
                variant="secondary"
                onClick={onQuickViewClick}
                label="Quick view"
                className="bg-background/80 backdrop-blur-sm hover:bg-background"
              />
            )}
          </div>
        )}

        {/* Custom Overlay */}
        {overlay}
      </div>
    );
  },
);
ProductCardImage.displayName = "ProductCardImage";

// ProductCardBody component
export interface ProductCardBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
}

const paddingClasses = {
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
};

export const ProductCardBody = forwardRef<HTMLDivElement, ProductCardBodyProps>(
  ({ className, padding = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-y-2",
          paddingClasses[padding],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ProductCardBody.displayName = "ProductCardBody";

// ProductCardTitle component
export interface ProductCardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4";
}

export const ProductCardTitle = forwardRef<
  HTMLHeadingElement,
  ProductCardTitleProps
>(({ className, as: Component = "h3", children, ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn(
        "text-base font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
ProductCardTitle.displayName = "ProductCardTitle";

// ProductCardCategory component
export interface ProductCardCategoryProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

export const ProductCardCategory = forwardRef<
  HTMLSpanElement,
  ProductCardCategoryProps
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "text-xs text-muted-foreground uppercase tracking-wide",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});
ProductCardCategory.displayName = "ProductCardCategory";

// ProductCardRating component
export interface ProductCardRatingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  rating: ProductRating;
  showCount?: boolean;
}

export const ProductCardRating = forwardRef<
  HTMLDivElement,
  ProductCardRatingProps
>(({ className, rating, showCount = true, ...props }, ref) => {
  const fullStars = Math.floor(rating.value);
  const hasHalfStar = rating.value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-x-1", className)}
      {...props}
    >
      <div className="flex items-center">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarIcon
            // biome-ignore lint/suspicious/noArrayIndexKey: Star position is the unique identifier
            key={`full-${i}`}
            className="size-4 fill-warning text-warning"
          />
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <StarIcon className="size-4 text-muted-foreground/30" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon className="size-4 fill-warning text-warning" />
            </div>
          </div>
        )}
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarIcon
            // biome-ignore lint/suspicious/noArrayIndexKey: Star position is the unique identifier
            key={`empty-${i}`}
            className="size-4 text-muted-foreground/30"
          />
        ))}
      </div>
      {showCount && rating.count !== undefined && (
        <span className="text-xs text-muted-foreground">({rating.count})</span>
      )}
    </div>
  );
});
ProductCardRating.displayName = "ProductCardRating";

// ProductCardPrice component
export interface ProductCardPriceProps
  extends React.HTMLAttributes<HTMLDivElement> {
  price: ProductPrice;
}

const formatPrice = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const ProductCardPrice = forwardRef<
  HTMLDivElement,
  ProductCardPriceProps
>(({ className, price, ...props }, ref) => {
  const hasDiscount = price.original && price.original > price.current;

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-x-2", className)}
      {...props}
    >
      <span
        className={cn(
          "text-lg font-semibold",
          hasDiscount ? "text-destructive" : "text-foreground",
        )}
      >
        {formatPrice(price.current, price.currency)}
      </span>
      {hasDiscount && price.original && (
        <span className="text-sm text-muted-foreground line-through">
          {formatPrice(price.original, price.currency)}
        </span>
      )}
    </div>
  );
});
ProductCardPrice.displayName = "ProductCardPrice";

// ProductCardActions component
export interface ProductCardActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end" | "stretch";
}

const alignClasses = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  stretch: "[&>*]:flex-1",
};

export const ProductCardActions = forwardRef<
  HTMLDivElement,
  ProductCardActionsProps
>(({ className, align = "stretch", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-x-2 pt-2",
        alignClasses[align],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ProductCardActions.displayName = "ProductCardActions";

// ProductAddToCartButton component
export interface ProductAddToCartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "icon";
  loading?: boolean;
}

export const ProductAddToCartButton = forwardRef<
  HTMLButtonElement,
  ProductAddToCartButtonProps
>(
  (
    { className, variant = "default", loading = false, children, ...props },
    ref,
  ) => {
    if (variant === "icon") {
      return (
        <IconButton
          ref={ref}
          icon={<ShoppingBagIcon className="size-4" />}
          variant="primary"
          disabled={loading}
          label="Add to cart"
          className={className}
          {...props}
        />
      );
    }

    return (
      <Button
        ref={ref}
        variant="primary"
        disabled={loading}
        className={cn("w-full", className)}
        {...props}
      >
        {loading ? (
          "Adding..."
        ) : (
          <>
            <ShoppingBagIcon className="size-4 mr-2" />
            {children || "Add to Cart"}
          </>
        )}
      </Button>
    );
  },
);
ProductAddToCartButton.displayName = "ProductAddToCartButton";
