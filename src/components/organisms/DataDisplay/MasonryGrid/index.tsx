import { Children, forwardRef, isValidElement, useMemo } from "react";
import { cn } from "@/components/utils";

export interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns (responsive object or single number)
   */
  columns?:
    | number
    | { default: number; sm?: number; md?: number; lg?: number; xl?: number };
  /**
   * Gap between items (in Tailwind spacing units)
   */
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  /**
   * Children to render in masonry layout
   */
  children: React.ReactNode;
}

const gapClasses: Record<string, string> = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

/**
 * MasonryGrid component for creating Pinterest-style layouts
 *
 * Uses CSS columns for a simple, performant masonry effect.
 * For more complex use cases, consider using a dedicated library.
 */
export const MasonryGrid = forwardRef<HTMLDivElement, MasonryGridProps>(
  (
    {
      className,
      columns = { default: 2, md: 3, lg: 4 },
      gap = "md",
      children,
      ...props
    },
    ref,
  ) => {
    // Build responsive column classes
    const columnClasses = useMemo(() => {
      if (typeof columns === "number") {
        return `columns-${columns}`;
      }

      const classes: string[] = [];
      if (columns.default) classes.push(`columns-${columns.default}`);
      if (columns.sm) classes.push(`sm:columns-${columns.sm}`);
      if (columns.md) classes.push(`md:columns-${columns.md}`);
      if (columns.lg) classes.push(`lg:columns-${columns.lg}`);
      if (columns.xl) classes.push(`xl:columns-${columns.xl}`);

      return classes.join(" ");
    }, [columns]);

    return (
      <div
        ref={ref}
        className={cn(columnClasses, gapClasses[gap], className)}
        {...props}
      >
        {Children.map(children, (child) => {
          if (!isValidElement(child)) return child;

          return <div className="mb-4 break-inside-avoid">{child}</div>;
        })}
      </div>
    );
  },
);
MasonryGrid.displayName = "MasonryGrid";

/**
 * MasonryItem wrapper for custom styling
 */
export interface MasonryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const MasonryItem = forwardRef<HTMLDivElement, MasonryItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("break-inside-avoid", className)} {...props}>
        {children}
      </div>
    );
  },
);
MasonryItem.displayName = "MasonryItem";

/**
 * ImageMasonry - Specialized masonry for images
 */
export interface ImageMasonryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images: {
    id: string;
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  }[];
  columns?: MasonryGridProps["columns"];
  gap?: MasonryGridProps["gap"];
  onImageClick?: (image: { id: string; src: string }) => void;
  renderImage?: (image: {
    id: string;
    src: string;
    alt?: string;
  }) => React.ReactNode;
}

export const ImageMasonry = forwardRef<HTMLDivElement, ImageMasonryProps>(
  (
    {
      className,
      images,
      columns = { default: 2, md: 3, lg: 4 },
      gap = "md",
      onImageClick,
      renderImage,
      ...props
    },
    ref,
  ) => {
    return (
      <MasonryGrid
        ref={ref}
        columns={columns}
        gap={gap}
        className={className}
        {...props}
      >
        {images.map((image) => {
          const imageContent = renderImage ? (
            renderImage(image)
          ) : (
            <img
              src={image.src}
              alt={image.alt || ""}
              className="w-full h-auto"
              loading="lazy"
            />
          );

          if (onImageClick) {
            return (
              <button
                key={image.id}
                type="button"
                className="overflow-hidden rounded-lg cursor-pointer"
                onClick={() => onImageClick(image)}
              >
                {imageContent}
              </button>
            );
          }

          return (
            <div key={image.id} className="overflow-hidden rounded-lg">
              {imageContent}
            </div>
          );
        })}
      </MasonryGrid>
    );
  },
);
ImageMasonry.displayName = "ImageMasonry";

/**
 * CardMasonry - Specialized masonry for cards with varying heights
 */
export interface CardMasonryItem {
  id: string;
  content: React.ReactNode;
  size?: "small" | "medium" | "large";
}

export interface CardMasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CardMasonryItem[];
  columns?: MasonryGridProps["columns"];
  gap?: MasonryGridProps["gap"];
}

export const CardMasonry = forwardRef<HTMLDivElement, CardMasonryProps>(
  (
    { className, items, columns = { default: 2, md: 3 }, gap = "md", ...props },
    ref,
  ) => {
    return (
      <MasonryGrid
        ref={ref}
        columns={columns}
        gap={gap}
        className={className}
        {...props}
      >
        {items.map((item) => (
          <div key={item.id}>{item.content}</div>
        ))}
      </MasonryGrid>
    );
  },
);
CardMasonry.displayName = "CardMasonry";
