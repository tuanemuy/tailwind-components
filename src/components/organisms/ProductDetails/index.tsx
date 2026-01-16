"use client";

import { forwardRef, type ReactNode, useState } from "react";
import { Badge, Button, Separator } from "@/components/atoms";
import { IconButton } from "@/components/molecules";
import {
  CheckIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  RefreshIcon,
  ShareIcon,
  ShoppingBagIcon,
  StarIcon,
  TruckIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

// Types
export interface ProductVariant {
  id: string;
  name: string;
  type: "color" | "size" | "other";
  options: {
    value: string;
    label: string;
    available?: boolean;
    image?: string;
    colorHex?: string;
  }[];
}

export interface ProductImage {
  src: string;
  alt?: string;
  thumbnail?: string;
}

export interface ProductDetailsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  images: ProductImage[];
  variants?: ProductVariant[];
  selectedVariants?: Record<string, string>;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  stockQuantity?: number;
  sku?: string;
  features?: string[];
  badges?: Array<{
    label: string;
    variant?: "default" | "secondary" | "destructive";
  }>;
  deliveryInfo?: string;
  returnPolicy?: string;
  onVariantChange?: (variantType: string, value: string) => void;
  onQuantityChange?: (quantity: number) => void;
  onAddToCart?: (quantity: number) => void;
  onAddToWishlist?: () => void;
  onShare?: () => void;
  quantity?: number;
  maxQuantity?: number;
  layout?: "default" | "sticky" | "split";
  galleryPosition?: "left" | "right";
  additionalContent?: ReactNode;
}

const formatPrice = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const ProductDetails = forwardRef<HTMLDivElement, ProductDetailsProps>(
  (
    {
      className,
      name,
      description,
      price,
      originalPrice,
      currency = "USD",
      images,
      variants = [],
      selectedVariants = {},
      rating,
      reviewCount,
      inStock = true,
      stockQuantity,
      sku,
      features = [],
      badges = [],
      deliveryInfo,
      returnPolicy,
      onVariantChange,
      onQuantityChange,
      onAddToCart,
      onAddToWishlist,
      onShare,
      quantity = 1,
      maxQuantity = 10,
      layout = "default",
      galleryPosition = "left",
      additionalContent,
      ...props
    },
    ref,
  ) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const hasDiscount = originalPrice && originalPrice > price;
    const discountPercentage = hasDiscount
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

    // Render star rating
    const renderRating = () => {
      if (!rating) return null;
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;

      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                // biome-ignore lint/suspicious/noArrayIndexKey: Star position is the unique identifier
                key={`star-${i}`}
                className={cn(
                  "size-4",
                  i < fullStars
                    ? "fill-warning text-warning"
                    : i === fullStars && hasHalfStar
                      ? "text-warning"
                      : "text-muted-foreground/30",
                )}
              />
            ))}
          </div>
          {reviewCount !== undefined && (
            <span className="text-sm text-muted-foreground">
              ({reviewCount} reviews)
            </span>
          )}
        </div>
      );
    };

    // Render variant options
    const renderVariants = () => {
      return variants.map((variant) => (
        <div key={variant.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {variant.name}
            </span>
            {selectedVariants[variant.id] && (
              <span className="text-sm text-muted-foreground">
                {selectedVariants[variant.id]}
              </span>
            )}
          </div>

          {variant.type === "color" ? (
            <div className="flex flex-wrap gap-2">
              {variant.options.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={cn(
                    "size-10 rounded-full border-2 transition-all",
                    selectedVariants[variant.id] === option.value
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border hover:border-muted-foreground",
                    !option.available && "opacity-50 cursor-not-allowed",
                  )}
                  style={
                    option.colorHex
                      ? { backgroundColor: option.colorHex }
                      : undefined
                  }
                  onClick={() =>
                    option.available &&
                    onVariantChange?.(variant.id, option.value)
                  }
                  disabled={!option.available}
                  title={option.label}
                >
                  {option.image && (
                    <img
                      src={option.image}
                      alt={option.label}
                      className="size-full rounded-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {variant.options.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={cn(
                    "px-4 py-2 text-sm border rounded-lg transition-colors",
                    selectedVariants[variant.id] === option.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-muted-foreground text-foreground",
                    !option.available &&
                      "opacity-50 cursor-not-allowed line-through",
                  )}
                  onClick={() =>
                    option.available &&
                    onVariantChange?.(variant.id, option.value)
                  }
                  disabled={!option.available}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ));
    };

    // Quantity selector
    const renderQuantitySelector = () => (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-foreground">Quantity</span>
        <div className="flex items-center border border-border rounded-lg">
          <button
            type="button"
            className="p-2 hover:bg-muted rounded-l-lg transition-colors disabled:opacity-50"
            onClick={() => onQuantityChange?.(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <MinusIcon className="size-4" />
          </button>
          <span className="w-12 text-center text-foreground">{quantity}</span>
          <button
            type="button"
            className="p-2 hover:bg-muted rounded-r-lg transition-colors disabled:opacity-50"
            onClick={() =>
              onQuantityChange?.(Math.min(maxQuantity, quantity + 1))
            }
            disabled={quantity >= maxQuantity}
          >
            <PlusIcon className="size-4" />
          </button>
        </div>
        {stockQuantity !== undefined && stockQuantity < 10 && (
          <span className="text-sm text-warning">
            Only {stockQuantity} left
          </span>
        )}
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-8 lg:gap-12",
          layout === "split" ? "lg:grid-cols-2" : "lg:grid-cols-[1fr,400px]",
          galleryPosition === "right" && "direction-rtl [&>*]:direction-ltr",
          className,
        )}
        {...props}
      >
        {/* Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
            <img
              src={images[currentImageIndex]?.src}
              alt={images[currentImageIndex]?.alt || name}
              className="size-full object-cover"
            />
            {/* Badges */}
            {badges.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {badges.map((badge) => (
                  <Badge key={badge.label} variant={badge.variant || "default"}>
                    {badge.label}
                  </Badge>
                ))}
                {hasDiscount && (
                  <Badge variant="destructive">-{discountPercentage}%</Badge>
                )}
              </div>
            )}
            {/* Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {onAddToWishlist && (
                <IconButton
                  icon={<HeartIcon className="size-4" />}
                  variant="secondary"
                  size="sm"
                  onClick={onAddToWishlist}
                  label="Add to wishlist"
                  className="bg-background/80 backdrop-blur-sm"
                />
              )}
              {onShare && (
                <IconButton
                  icon={<ShareIcon className="size-4" />}
                  variant="secondary"
                  size="sm"
                  onClick={onShare}
                  label="Share"
                  className="bg-background/80 backdrop-blur-sm"
                />
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={image.src}
                  className={cn(
                    "flex-shrink-0 size-20 rounded-lg overflow-hidden border-2 transition-colors",
                    currentImageIndex === index
                      ? "border-primary"
                      : "border-transparent",
                  )}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image.thumbnail || image.src}
                    alt=""
                    className="size-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div
          className={cn(
            "space-y-6",
            layout === "sticky" && "lg:sticky lg:top-6 lg:self-start",
          )}
        >
          {/* Title & Rating */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-foreground">
              {name}
            </h1>
            {renderRating()}
            {sku && (
              <p className="mt-1 text-sm text-muted-foreground">SKU: {sku}</p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span
              className={cn(
                "text-3xl font-bold",
                hasDiscount ? "text-destructive" : "text-foreground",
              )}
            >
              {formatPrice(price, currency)}
            </span>
            {hasDiscount && originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(originalPrice, currency)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div>
            {inStock ? (
              <Badge variant="success" className="bg-success/10 text-success">
                In Stock
              </Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}

          <Separator />

          {/* Variants */}
          {variants.length > 0 && (
            <div className="space-y-4">{renderVariants()}</div>
          )}

          {/* Quantity */}
          {inStock && renderQuantitySelector()}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => onAddToCart?.(quantity)}
              disabled={!inStock}
            >
              <ShoppingBagIcon className="size-4 mr-2" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="space-y-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckIcon className="size-4 text-success" />
                  {feature}
                </div>
              ))}
            </div>
          )}

          {/* Delivery & Return Info */}
          {(deliveryInfo || returnPolicy) && (
            <div className="space-y-3 pt-4 border-t border-border">
              {deliveryInfo && (
                <div className="flex items-start gap-3">
                  <TruckIcon className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Delivery
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {deliveryInfo}
                    </p>
                  </div>
                </div>
              )}
              {returnPolicy && (
                <div className="flex items-start gap-3">
                  <RefreshIcon className="size-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Returns
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {returnPolicy}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {additionalContent}
        </div>
      </div>
    );
  },
);
ProductDetails.displayName = "ProductDetails";
