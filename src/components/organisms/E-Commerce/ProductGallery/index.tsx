"use client";

import { forwardRef, type ReactNode, useCallback, useState } from "react";
import { IconButton } from "@/components/molecules";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  XIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// Types
export interface GalleryImage {
  src: string;
  alt: string;
  thumbnail?: string;
}

// ProductGallery component
export interface ProductGalleryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images: GalleryImage[];
  defaultIndex?: number;
  showThumbnails?: boolean;
  showNavigation?: boolean;
  showZoom?: boolean;
  thumbnailPosition?: "bottom" | "left";
  aspectRatio?: "square" | "portrait" | "landscape" | "auto";
  badge?: ReactNode;
  onImageChange?: (index: number) => void;
}

const aspectRatioClasses = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-video",
  auto: "",
};

export const ProductGallery = forwardRef<HTMLDivElement, ProductGalleryProps>(
  (
    {
      className,
      images,
      defaultIndex = 0,
      showThumbnails = true,
      showNavigation = true,
      showZoom = true,
      thumbnailPosition = "bottom",
      aspectRatio = "square",
      badge,
      onImageChange,
      ...props
    },
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const [isZoomed, setIsZoomed] = useState(false);

    const handlePrevious = useCallback(() => {
      const newIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
      setActiveIndex(newIndex);
      onImageChange?.(newIndex);
    }, [activeIndex, images.length, onImageChange]);

    const handleNext = useCallback(() => {
      const newIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(newIndex);
      onImageChange?.(newIndex);
    }, [activeIndex, images.length, onImageChange]);

    const handleThumbnailClick = useCallback(
      (index: number) => {
        setActiveIndex(index);
        onImageChange?.(index);
      },
      [onImageChange],
    );

    const handleZoomToggle = useCallback(() => {
      setIsZoomed(!isZoomed);
    }, [isZoomed]);

    const currentImage = images[activeIndex];

    if (!currentImage) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-4",
          thumbnailPosition === "left" ? "flex-row" : "flex-col",
          className,
        )}
        {...props}
      >
        {/* Thumbnails - Left Position */}
        {showThumbnails && thumbnailPosition === "left" && (
          <ProductGalleryThumbnails
            images={images}
            activeIndex={activeIndex}
            onSelect={handleThumbnailClick}
            orientation="vertical"
          />
        )}

        {/* Main Image */}
        <div className="relative flex-1">
          <div
            className={cn(
              "relative overflow-hidden rounded-xl bg-muted",
              aspectRatioClasses[aspectRatio],
            )}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              role={showZoom ? "button" : undefined}
              tabIndex={showZoom ? 0 : undefined}
              className={cn(
                "size-full object-cover transition-transform duration-300",
                isZoomed && "scale-150 cursor-zoom-out",
                !isZoomed && showZoom && "cursor-zoom-in",
              )}
              onClick={showZoom ? handleZoomToggle : undefined}
              onKeyDown={
                showZoom
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleZoomToggle();
                      }
                    }
                  : undefined
              }
            />

            {/* Badge */}
            {badge && <div className="absolute top-4 left-4">{badge}</div>}

            {/* Zoom Button */}
            {showZoom && !isZoomed && (
              <IconButton
                icon={<SearchIcon className="size-4" />}
                size="sm"
                variant="outline"
                onClick={handleZoomToggle}
                label="Zoom image"
                className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background"
              />
            )}

            {/* Close Zoom Button */}
            {isZoomed && (
              <IconButton
                icon={<XIcon className="size-4" />}
                size="sm"
                variant="outline"
                onClick={handleZoomToggle}
                label="Close zoom"
                className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background"
              />
            )}

            {/* Navigation Arrows */}
            {showNavigation && images.length > 1 && !isZoomed && (
              <>
                <IconButton
                  icon={<ChevronLeftIcon className="size-5" />}
                  size="md"
                  variant="outline"
                  onClick={handlePrevious}
                  label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                />
                <IconButton
                  icon={<ChevronRightIcon className="size-5" />}
                  size="md"
                  variant="outline"
                  onClick={handleNext}
                  label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                />
              </>
            )}
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                {activeIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </div>

        {/* Thumbnails - Bottom Position */}
        {showThumbnails && thumbnailPosition === "bottom" && (
          <ProductGalleryThumbnails
            images={images}
            activeIndex={activeIndex}
            onSelect={handleThumbnailClick}
            orientation="horizontal"
          />
        )}
      </div>
    );
  },
);
ProductGallery.displayName = "ProductGallery";

// ProductGalleryThumbnails component
export interface ProductGalleryThumbnailsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  images: GalleryImage[];
  activeIndex: number;
  onSelect: (index: number) => void;
  orientation?: "horizontal" | "vertical";
  maxVisible?: number;
}

export const ProductGalleryThumbnails = forwardRef<
  HTMLDivElement,
  ProductGalleryThumbnailsProps
>(
  (
    {
      className,
      images,
      activeIndex,
      onSelect,
      orientation = "horizontal",
      maxVisible = 5,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2",
          orientation === "vertical"
            ? "flex-col w-20"
            : "flex-row overflow-x-auto",
          className,
        )}
        {...props}
      >
        {images.slice(0, maxVisible).map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => onSelect(index)}
            className={cn(
              "relative shrink-0 overflow-hidden rounded-lg transition-all",
              orientation === "vertical" ? "aspect-square w-full" : "size-16",
              activeIndex === index
                ? "ring-2 ring-primary ring-offset-2"
                : "opacity-60 hover:opacity-100",
            )}
          >
            <img
              src={image.thumbnail || image.src}
              alt={image.alt}
              className="size-full object-cover"
            />
          </button>
        ))}
        {images.length > maxVisible && (
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium text-muted-foreground",
              orientation === "vertical" ? "aspect-square w-full" : "size-16",
            )}
          >
            +{images.length - maxVisible}
          </div>
        )}
      </div>
    );
  },
);
ProductGalleryThumbnails.displayName = "ProductGalleryThumbnails";

// ProductGalleryDots component (alternative navigation)
export interface ProductGalleryDotsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  total: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export const ProductGalleryDots = forwardRef<
  HTMLDivElement,
  ProductGalleryDotsProps
>(({ className, total, activeIndex, onSelect, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-x-2", className)}
      {...props}
    >
      {Array.from({ length: total }).map((_, index) => (
        <button
          // biome-ignore lint/suspicious/noArrayIndexKey: Dot position is the unique identifier
          key={`dot-${index}`}
          type="button"
          onClick={() => onSelect(index)}
          className={cn(
            "size-2 rounded-full transition-all",
            activeIndex === index
              ? "bg-primary w-6"
              : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
          )}
          aria-label={`Go to image ${index + 1}`}
        />
      ))}
    </div>
  );
});
ProductGalleryDots.displayName = "ProductGalleryDots";
