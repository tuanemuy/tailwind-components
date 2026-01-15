"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button, Badge } from "@/components/atoms";
import { IconButton } from "@/components/molecules";
import {
  ProductCard,
  ProductCardImage,
  ProductCardBody,
  ProductCardTitle,
  ProductCardPrice,
  ProductCardRating,
  ProductAddToCartButton,
  type ProductBadge,
  type ProductRating,
  type ProductPrice,
} from "../ProductCard";
import { HeartIcon, ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@/lib/icons";

// Types
export interface ProductListingItem {
  id: string;
  name: string;
  image: string;
  images?: string[];
  price: ProductPrice;
  rating?: ProductRating;
  badges?: ProductBadge[];
  category?: string;
  inStock?: boolean;
  href?: string;
}

export interface ProductListingProps extends React.HTMLAttributes<HTMLDivElement> {
  products: ProductListingItem[];
  variant?: "grid" | "list" | "slider";
  columns?: 2 | 3 | 4 | 5;
  showQuickActions?: boolean;
  showRating?: boolean;
  showCategory?: boolean;
  onProductClick?: (product: ProductListingItem) => void;
  onQuickView?: (product: ProductListingItem) => void;
  onAddToWishlist?: (product: ProductListingItem) => void;
  onAddToCart?: (product: ProductListingItem) => void;
}

export const ProductListing = forwardRef<HTMLDivElement, ProductListingProps>(
  (
    {
      className,
      products,
      variant = "grid",
      columns = 4,
      showQuickActions = true,
      showRating = true,
      showCategory = false,
      onProductClick,
      onQuickView,
      onAddToWishlist,
      onAddToCart,
      ...props
    },
    ref,
  ) => {
    const gridCols = {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
    };

    if (variant === "slider") {
      return (
        <ProductListingSlider
          ref={ref}
          className={className}
          products={products}
          showQuickActions={showQuickActions}
          showRating={showRating}
          showCategory={showCategory}
          onProductClick={onProductClick}
          onQuickView={onQuickView}
          onAddToWishlist={onAddToWishlist}
          onAddToCart={onAddToCart}
          {...props}
        />
      );
    }

    if (variant === "list") {
      return (
        <div ref={ref} className={cn("space-y-4", className)} {...props}>
          {products.map((product) => (
            <ProductListItem
              key={product.id}
              product={product}
              showRating={showRating}
              showCategory={showCategory}
              onProductClick={onProductClick}
              onQuickView={onQuickView}
              onAddToWishlist={onAddToWishlist}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("grid gap-4", gridCols[columns], className)} {...props}>
        {products.map((product) => (
          <ProductCard key={product.id} className="cursor-pointer" onClick={() => onProductClick?.(product)}>
            <ProductCardImage
              src={product.image}
              alt={product.name}
              badges={product.badges}
              showQuickActions={showQuickActions}
              onFavoriteClick={onAddToWishlist ? () => onAddToWishlist(product) : undefined}
              onQuickViewClick={onQuickView ? () => onQuickView(product) : undefined}
            />
            <ProductCardBody>
              {showCategory && product.category && (
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  {product.category}
                </span>
              )}
              <ProductCardTitle>{product.name}</ProductCardTitle>
              {showRating && product.rating && <ProductCardRating rating={product.rating} />}
              <ProductCardPrice price={product.price} />
              {onAddToCart && (
                <ProductAddToCartButton onClick={(e) => { e.stopPropagation(); onAddToCart(product); }} />
              )}
            </ProductCardBody>
          </ProductCard>
        ))}
      </div>
    );
  },
);
ProductListing.displayName = "ProductListing";

// Product List Item (horizontal layout)
interface ProductListItemProps {
  product: ProductListingItem;
  showRating?: boolean;
  showCategory?: boolean;
  onProductClick?: (product: ProductListingItem) => void;
  onQuickView?: (product: ProductListingItem) => void;
  onAddToWishlist?: (product: ProductListingItem) => void;
  onAddToCart?: (product: ProductListingItem) => void;
}

const ProductListItem = ({
  product,
  showRating,
  showCategory,
  onProductClick,
  onQuickView: _onQuickView,
  onAddToWishlist,
  onAddToCart,
}: ProductListItemProps) => {
  const formatPrice = (amount: number, currency: string = "USD"): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  const hasDiscount = product.price.original && product.price.original > product.price.current;

  return (
    <div
      className="flex gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onProductClick?.(product)}
    >
      {/* Image */}
      <div className="relative flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden bg-muted">
        <img src={product.image} alt={product.name} className="size-full object-cover" />
        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-2 left-2">
            <Badge variant={product.badges[0].type === "sale" ? "destructive" : "default"} size="sm">
              {product.badges[0].label || product.badges[0].value}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {showCategory && product.category && (
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {product.category}
          </span>
        )}
        <h3 className="font-medium text-foreground hover:text-primary transition-colors">
          {product.name}
        </h3>
        {showRating && product.rating && (
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "size-4",
                  i < Math.floor(product.rating!.value)
                    ? "fill-warning text-warning"
                    : "text-muted-foreground/30",
                )}
              />
            ))}
            {product.rating.count !== undefined && (
              <span className="text-sm text-muted-foreground">({product.rating.count})</span>
            )}
          </div>
        )}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={cn("font-semibold", hasDiscount ? "text-destructive" : "text-foreground")}>
              {formatPrice(product.price.current, product.price.currency)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price.original!, product.price.currency)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {onAddToWishlist && (
              <IconButton
                icon={<HeartIcon className="size-4" />}
                variant="ghost"
                size="sm"
                onClick={(e) => { e.stopPropagation(); onAddToWishlist(product); }}
                label="Add to wishlist"
              />
            )}
            {onAddToCart && (
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Listing Slider
export interface ProductListingSliderProps extends Omit<ProductListingProps, "variant" | "columns"> {
  showArrows?: boolean;
  autoplay?: boolean;
}

export const ProductListingSlider = forwardRef<HTMLDivElement, ProductListingSliderProps>(
  (
    {
      className,
      products,
      showQuickActions = true,
      showRating = true,
      showCategory = false,
      showArrows = true,
      onProductClick,
      onQuickView,
      onAddToWishlist,
      onAddToCart,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("relative group", className)} {...props}>
        {showArrows && (
          <>
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-background border border-border shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted">
              <ChevronLeftIcon className="size-5" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-background border border-border shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted">
              <ChevronRightIcon className="size-5" />
            </button>
          </>
        )}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64">
              <ProductCard className="cursor-pointer" onClick={() => onProductClick?.(product)}>
                <ProductCardImage
                  src={product.image}
                  alt={product.name}
                  badges={product.badges}
                  showQuickActions={showQuickActions}
                  onFavoriteClick={onAddToWishlist ? () => onAddToWishlist(product) : undefined}
                  onQuickViewClick={onQuickView ? () => onQuickView(product) : undefined}
                />
                <ProductCardBody>
                  {showCategory && product.category && (
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {product.category}
                    </span>
                  )}
                  <ProductCardTitle>{product.name}</ProductCardTitle>
                  {showRating && product.rating && <ProductCardRating rating={product.rating} />}
                  <ProductCardPrice price={product.price} />
                </ProductCardBody>
              </ProductCard>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
ProductListingSlider.displayName = "ProductListingSlider";

// Product Listing Grid with header
export interface ProductListingGridProps extends ProductListingProps {
  title?: string;
  description?: string;
  viewAllLink?: string;
  onViewAll?: () => void;
}

export const ProductListingGrid = forwardRef<HTMLDivElement, ProductListingGridProps>(
  ({ className, title, description, viewAllLink, onViewAll, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-6", className)}>
        {(title || description) && (
          <div className="flex items-end justify-between">
            <div>
              {title && <h2 className="text-2xl font-semibold text-foreground">{title}</h2>}
              {description && <p className="mt-1 text-muted-foreground">{description}</p>}
            </div>
            {(viewAllLink || onViewAll) && (
              viewAllLink ? (
                <a
                  href={viewAllLink}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                >
                  View all
                </a>
              ) : (
                <Button variant="ghost" onClick={onViewAll}>
                  View all
                </Button>
              )
            )}
          </div>
        )}
        <ProductListing {...props} />
      </div>
    );
  },
);
ProductListingGrid.displayName = "ProductListingGrid";
