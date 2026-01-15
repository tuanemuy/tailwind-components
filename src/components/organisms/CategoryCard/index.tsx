"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@/lib/icons";

// Types
export interface CategoryData {
  id: string;
  name: string;
  description?: string;
  images: string[];
  itemCount?: number;
  startingPrice?: number;
  currency?: string;
  href?: string;
}

// CategoryCard - Grid layout with multiple images
export interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  category: CategoryData;
  variant?: "default" | "overlay" | "minimal";
  imageLayout?: "grid" | "stacked" | "single";
  onCategoryClick?: (category: CategoryData) => void;
}

export const CategoryCard = forwardRef<HTMLDivElement, CategoryCardProps>(
  (
    {
      className,
      category,
      variant = "default",
      imageLayout = "grid",
      onCategoryClick,
      ...props
    },
    ref,
  ) => {
    const formatPrice = (amount: number, currency: string = "USD"): string => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(amount);
    };

    const handleClick = () => {
      onCategoryClick?.(category);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative group bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {/* Images */}
        {imageLayout === "grid" && category.images.length >= 3 ? (
          <div className="h-80 grid grid-cols-5">
            <div className="col-span-3 p-1 pe-0">
              <img
                className="w-full h-[calc(20rem-8px)] bg-muted object-cover rounded-lg"
                src={category.images[0]}
                alt={category.name}
              />
            </div>
            <div className="col-span-2 p-1 space-y-1">
              <img
                className="w-full h-[calc(10rem-6px)] bg-muted object-cover rounded-lg"
                src={category.images[1]}
                alt={category.name}
              />
              <img
                className="w-full h-[calc(10rem-6px)] bg-muted object-cover rounded-lg"
                src={category.images[2]}
                alt={category.name}
              />
            </div>
          </div>
        ) : imageLayout === "stacked" && category.images.length >= 2 ? (
          <div className="relative h-64 p-2">
            <div className="absolute inset-4 transform rotate-2 rounded-lg overflow-hidden">
              <img
                className="size-full object-cover bg-muted"
                src={category.images[1]}
                alt=""
              />
            </div>
            <div className="relative h-full rounded-lg overflow-hidden shadow-lg">
              <img
                className="size-full object-cover bg-muted"
                src={category.images[0]}
                alt={category.name}
              />
            </div>
          </div>
        ) : (
          <div className="aspect-[4/3] overflow-hidden">
            <img
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={category.images[0]}
              alt={category.name}
            />
          </div>
        )}

        {/* Overlay variant */}
        {variant === "overlay" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <h3 className="text-lg font-medium text-white">{category.name}</h3>
            {category.itemCount !== undefined && (
              <p className="text-sm text-white/80">{category.itemCount} items</p>
            )}
          </div>
        )}

        {/* Default & Minimal variant body */}
        {variant !== "overlay" && (
          <div className="p-6 text-center">
            <h4 className="font-medium text-lg text-foreground">{category.name}</h4>
            {category.startingPrice !== undefined && (
              <p className="mt-1 text-sm text-muted-foreground">
                Starting from {formatPrice(category.startingPrice, category.currency)}
              </p>
            )}
            {category.itemCount !== undefined && variant !== "minimal" && (
              <p className="mt-1 text-sm text-muted-foreground">
                {category.itemCount} products
              </p>
            )}
            <p className="mt-3">
              <span className="inline-flex items-center gap-x-1.5 text-sm text-foreground underline underline-offset-4 group-hover:text-primary transition-colors">
                View all
                <ChevronRightIcon className="size-4" />
              </span>
            </p>
          </div>
        )}

        {/* Clickable overlay */}
        {category.href && (
          <a href={category.href} className="absolute inset-0 z-10">
            <span className="sr-only">View {category.name}</span>
          </a>
        )}
      </div>
    );
  },
);
CategoryCard.displayName = "CategoryCard";

// CategoryGrid - Grid of category cards
export interface CategoryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: CategoryData[];
  columns?: 2 | 3 | 4;
  variant?: "default" | "overlay" | "minimal";
  imageLayout?: "grid" | "stacked" | "single";
  onCategoryClick?: (category: CategoryData) => void;
}

export const CategoryGrid = forwardRef<HTMLDivElement, CategoryGridProps>(
  (
    {
      className,
      categories,
      columns = 3,
      variant = "default",
      imageLayout = "grid",
      onCategoryClick,
      ...props
    },
    ref,
  ) => {
    const gridCols = {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    };

    return (
      <div ref={ref} className={cn("grid gap-5", gridCols[columns], className)} {...props}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            variant={variant}
            imageLayout={imageLayout}
            onCategoryClick={onCategoryClick}
          />
        ))}
      </div>
    );
  },
);
CategoryGrid.displayName = "CategoryGrid";

// CategoryCircular - Circular category navigation
export interface CategoryCircularProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: CategoryData[];
  size?: "sm" | "md" | "lg";
  onCategoryClick?: (category: CategoryData) => void;
}

export const CategoryCircular = forwardRef<HTMLDivElement, CategoryCircularProps>(
  ({ className, categories, size = "md", onCategoryClick, ...props }, ref) => {
    const sizeClasses = {
      sm: "size-16",
      md: "size-20",
      lg: "size-24",
    };

    const textSize = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap gap-6 justify-center", className)}
        {...props}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            className="flex flex-col items-center gap-2 group"
            onClick={() => onCategoryClick?.(category)}
          >
            <div
              className={cn(
                "rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors",
                sizeClasses[size],
              )}
            >
              <img
                src={category.images[0]}
                alt={category.name}
                className="size-full object-cover"
              />
            </div>
            <span
              className={cn(
                "font-medium text-foreground group-hover:text-primary transition-colors",
                textSize[size],
              )}
            >
              {category.name}
            </span>
          </button>
        ))}
      </div>
    );
  },
);
CategoryCircular.displayName = "CategoryCircular";

// CategoryPill - Pill-style category navigation
export interface CategoryPillProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: CategoryData[];
  variant?: "default" | "outlined" | "filled";
  onCategoryClick?: (category: CategoryData) => void;
}

export const CategoryPill = forwardRef<HTMLDivElement, CategoryPillProps>(
  ({ className, categories, variant = "default", onCategoryClick, ...props }, ref) => {
    const pillVariants = {
      default:
        "bg-card border border-border hover:border-primary hover:bg-primary/5",
      outlined: "border border-border hover:border-primary hover:text-primary",
      filled: "bg-muted hover:bg-primary hover:text-primary-foreground",
    };

    return (
      <div ref={ref} className={cn("flex flex-wrap gap-3", className)} {...props}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full transition-colors",
              pillVariants[variant],
            )}
            onClick={() => onCategoryClick?.(category)}
          >
            {category.images[0] && (
              <img
                src={category.images[0]}
                alt=""
                className="size-6 rounded-full object-cover"
              />
            )}
            <span className="font-medium text-sm">{category.name}</span>
            {category.itemCount !== undefined && (
              <span className="text-xs text-muted-foreground">({category.itemCount})</span>
            )}
          </button>
        ))}
      </div>
    );
  },
);
CategoryPill.displayName = "CategoryPill";

// CategorySlider - Horizontal scrolling categories
export interface CategorySliderProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: CategoryData[];
  cardSize?: "sm" | "md" | "lg";
  showArrows?: boolean;
  onCategoryClick?: (category: CategoryData) => void;
}

export const CategorySlider = forwardRef<HTMLDivElement, CategorySliderProps>(
  (
    {
      className,
      categories,
      cardSize = "md",
      showArrows = false,
      onCategoryClick,
      ...props
    },
    ref,
  ) => {
    const cardSizeClasses = {
      sm: "w-40",
      md: "w-52",
      lg: "w-64",
    };

    const imageSizeClasses = {
      sm: "h-32",
      md: "h-40",
      lg: "h-48",
    };

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <div
              key={category.id}
              className={cn(
                "flex-shrink-0 cursor-pointer group",
                cardSizeClasses[cardSize],
              )}
              onClick={() => onCategoryClick?.(category)}
            >
              <div
                className={cn(
                  "rounded-xl overflow-hidden bg-muted mb-3",
                  imageSizeClasses[cardSize],
                )}
              >
                <img
                  src={category.images[0]}
                  alt={category.name}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h4>
              {category.itemCount !== undefined && (
                <p className="text-sm text-muted-foreground">{category.itemCount} items</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
);
CategorySlider.displayName = "CategorySlider";
