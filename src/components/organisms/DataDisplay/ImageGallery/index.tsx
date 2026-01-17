"use client";

import {
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "@/components/atoms/Button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  MaximizeIcon,
  XIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// ============================================
// Types
// ============================================

export interface GalleryImage {
  id: string;
  src: string;
  alt?: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}

export type GalleryLayout = "grid" | "masonry";
export type GalleryColumns = 1 | 2 | 3 | 4 | 5 | 6;
export type GalleryGap = "none" | "sm" | "md" | "lg";

// ============================================
// Lightbox Component
// ============================================

export interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onDownload?: (image: GalleryImage) => void;
  showNav?: boolean;
  showCounter?: boolean;
  showTitle?: boolean;
  closeOnOverlayClick?: boolean;
}

export const Lightbox = forwardRef<HTMLDivElement, LightboxProps>(
  (
    {
      images,
      currentIndex,
      isOpen,
      onClose,
      onNext,
      onPrev,
      onDownload,
      showNav = true,
      showCounter = true,
      showTitle = true,
      closeOnOverlayClick = true,
    },
    ref,
  ) => {
    const currentImage = images[currentIndex];
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < images.length - 1;

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen) return;
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowLeft" && hasPrev) onPrev();
        if (e.key === "ArrowRight" && hasNext) onNext();
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, hasPrev, hasNext, onClose, onPrev, onNext]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    if (!isOpen || !currentImage) return null;

    return (
      <div
        ref={ref}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClose();
          }
        }}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            {showCounter && images.length > 1 && (
              <span className="text-sm text-white/80">
                {currentIndex + 1} / {images.length}
              </span>
            )}
            {showTitle && currentImage.title && (
              <span className="text-sm font-medium text-white">
                {currentImage.title}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {onDownload && (
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => onDownload(currentImage)}
              >
                <DownloadIcon className="size-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              onClick={onClose}
            >
              <XIcon className="size-5" />
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex items-center justify-center w-full h-full p-16">
          <img
            src={currentImage.src}
            alt={currentImage.alt || ""}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Navigation */}
        {showNav && images.length > 1 && (
          <>
            {hasPrev && (
              <Button
                variant="ghost"
                size="lg"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                onClick={onPrev}
              >
                <ChevronLeftIcon className="size-8" />
              </Button>
            )}
            {hasNext && (
              <Button
                variant="ghost"
                size="lg"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                onClick={onNext}
              >
                <ChevronRightIcon className="size-8" />
              </Button>
            )}
          </>
        )}

        {/* Description */}
        {currentImage.description && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
            <p className="text-sm text-white/80 text-center">
              {currentImage.description}
            </p>
          </div>
        )}
      </div>
    );
  },
);
Lightbox.displayName = "Lightbox";

// ============================================
// GalleryItem Component
// ============================================

export interface GalleryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  image: GalleryImage;
  showOverlay?: boolean;
  overlayContent?: ReactNode;
  aspectRatio?: "square" | "video" | "auto";
  rounded?: boolean;
}

export const GalleryItem = forwardRef<HTMLDivElement, GalleryItemProps>(
  (
    {
      className,
      image,
      showOverlay = true,
      overlayContent,
      aspectRatio = "auto",
      rounded = true,
      onClick,
      ...props
    },
    ref,
  ) => {
    const aspectClasses = {
      square: "aspect-square",
      video: "aspect-video",
      auto: "",
    };

    const interactiveProps = onClick
      ? {
          role: "button" as const,
          tabIndex: 0,
          onClick,
          onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
            }
          },
        }
      : {};

    return (
      <div
        ref={ref}
        className={cn(
          "relative group overflow-hidden",
          rounded && "rounded-lg",
          aspectClasses[aspectRatio],
          onClick && "cursor-pointer",
          className,
        )}
        {...interactiveProps}
        {...props}
      >
        <img
          src={image.thumbnail || image.src}
          alt={image.alt || ""}
          className={cn(
            "w-full h-full object-cover transition-transform duration-300",
            onClick && "group-hover:scale-105",
          )}
          loading="lazy"
        />
        {showOverlay && (
          <div
            className={cn(
              "absolute inset-0 bg-black/0 transition-colors duration-300",
              onClick && "group-hover:bg-black/20",
            )}
          >
            {overlayContent ||
              (onClick && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <MaximizeIcon className="size-8 text-white" />
                </div>
              ))}
          </div>
        )}
        {image.title && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-sm font-medium text-white truncate">
              {image.title}
            </p>
          </div>
        )}
      </div>
    );
  },
);
GalleryItem.displayName = "GalleryItem";

// ============================================
// ImageGallery Props
// ============================================

export interface ImageGalleryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images: GalleryImage[];
  layout?: GalleryLayout;
  columns?:
    | GalleryColumns
    | {
        default: GalleryColumns;
        sm?: GalleryColumns;
        md?: GalleryColumns;
        lg?: GalleryColumns;
      };
  gap?: GalleryGap;
  aspectRatio?: "square" | "video" | "auto";
  rounded?: boolean;
  enableLightbox?: boolean;
  lightboxProps?: Partial<
    Omit<
      LightboxProps,
      "images" | "currentIndex" | "isOpen" | "onClose" | "onNext" | "onPrev"
    >
  >;
  onImageClick?: (image: GalleryImage, index: number) => void;
  renderItem?: (image: GalleryImage, index: number) => ReactNode;
}

// ============================================
// ImageGallery Component
// ============================================

const gapClasses: Record<GalleryGap, string> = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

export const ImageGallery = forwardRef<HTMLDivElement, ImageGalleryProps>(
  (
    {
      className,
      images,
      layout = "grid",
      columns = { default: 2, md: 3, lg: 4 },
      gap = "md",
      aspectRatio = "square",
      rounded = true,
      enableLightbox = true,
      lightboxProps,
      onImageClick,
      renderItem,
      ...props
    },
    ref,
  ) => {
    const [lightboxIndex, setLightboxIndex] = useState(-1);
    const isLightboxOpen = lightboxIndex >= 0;

    const handleImageClick = useCallback(
      (image: GalleryImage, index: number) => {
        if (enableLightbox) {
          setLightboxIndex(index);
        }
        onImageClick?.(image, index);
      },
      [enableLightbox, onImageClick],
    );

    const closeLightbox = useCallback(() => setLightboxIndex(-1), []);
    const nextImage = useCallback(
      () => setLightboxIndex((i) => Math.min(i + 1, images.length - 1)),
      [images.length],
    );
    const prevImage = useCallback(
      () => setLightboxIndex((i) => Math.max(i - 1, 0)),
      [],
    );

    // Build column classes
    const columnClasses = (() => {
      if (typeof columns === "number") {
        return layout === "masonry"
          ? `columns-${columns}`
          : `grid-cols-${columns}`;
      }

      const classes: string[] = [];
      const prefix = layout === "masonry" ? "columns" : "grid-cols";

      if (columns.default) classes.push(`${prefix}-${columns.default}`);
      if (columns.sm) classes.push(`sm:${prefix}-${columns.sm}`);
      if (columns.md) classes.push(`md:${prefix}-${columns.md}`);
      if (columns.lg) classes.push(`lg:${prefix}-${columns.lg}`);

      return classes.join(" ");
    })();

    // Grid layout
    if (layout === "grid") {
      return (
        <>
          <div
            ref={ref}
            className={cn("grid", columnClasses, gapClasses[gap], className)}
            {...props}
          >
            {images.map((image, index) =>
              renderItem ? (
                <button
                  key={image.id}
                  type="button"
                  className="text-left"
                  onClick={() => handleImageClick(image, index)}
                >
                  {renderItem(image, index)}
                </button>
              ) : (
                <GalleryItem
                  key={image.id}
                  image={image}
                  aspectRatio={aspectRatio}
                  rounded={rounded}
                  onClick={() => handleImageClick(image, index)}
                />
              ),
            )}
          </div>
          {enableLightbox && (
            <Lightbox
              images={images}
              currentIndex={lightboxIndex}
              isOpen={isLightboxOpen}
              onClose={closeLightbox}
              onNext={nextImage}
              onPrev={prevImage}
              {...lightboxProps}
            />
          )}
        </>
      );
    }

    // Masonry layout
    return (
      <>
        <div
          ref={ref}
          className={cn(columnClasses, gapClasses[gap], className)}
          {...props}
        >
          {images.map((image, index) => (
            <div key={image.id} className="mb-4 break-inside-avoid">
              {renderItem ? (
                <button
                  type="button"
                  className="text-left w-full"
                  onClick={() => handleImageClick(image, index)}
                >
                  {renderItem(image, index)}
                </button>
              ) : (
                <GalleryItem
                  image={image}
                  aspectRatio="auto"
                  rounded={rounded}
                  onClick={() => handleImageClick(image, index)}
                />
              )}
            </div>
          ))}
        </div>
        {enableLightbox && (
          <Lightbox
            images={images}
            currentIndex={lightboxIndex}
            isOpen={isLightboxOpen}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
            {...lightboxProps}
          />
        )}
      </>
    );
  },
);
ImageGallery.displayName = "ImageGallery";

// ============================================
// ThumbnailGallery - With thumbnail navigation
// ============================================

export interface ThumbnailGalleryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images: GalleryImage[];
  thumbnailPosition?: "bottom" | "left" | "right";
  thumbnailSize?: "sm" | "md" | "lg";
  enableLightbox?: boolean;
  gap?: GalleryGap;
}

export const ThumbnailGallery = forwardRef<
  HTMLDivElement,
  ThumbnailGalleryProps
>(
  (
    {
      className,
      images,
      thumbnailPosition = "bottom",
      thumbnailSize = "md",
      enableLightbox = true,
      gap = "md",
      ...props
    },
    ref,
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const currentImage = images[selectedIndex];

    const thumbnailSizeClasses = {
      sm: "w-12 h-12",
      md: "w-16 h-16",
      lg: "w-20 h-20",
    };

    const isHorizontal = thumbnailPosition === "bottom";

    return (
      <>
        <div
          ref={ref}
          className={cn(
            "flex",
            isHorizontal
              ? "flex-col"
              : thumbnailPosition === "left"
                ? "flex-row-reverse"
                : "flex-row",
            gapClasses[gap],
            className,
          )}
          {...props}
        >
          {/* Main image */}
          <button
            type="button"
            className={cn(
              "relative flex-1 overflow-hidden rounded-lg cursor-pointer group",
              !isHorizontal && "h-96",
            )}
            onClick={() => enableLightbox && setLightboxOpen(true)}
          >
            {currentImage && (
              <>
                <img
                  src={currentImage.src}
                  alt={currentImage.alt || ""}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <MaximizeIcon className="size-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </>
            )}
          </button>

          {/* Thumbnails */}
          <div
            className={cn(
              "flex gap-2",
              isHorizontal
                ? "flex-row overflow-x-auto"
                : "flex-col overflow-y-auto",
            )}
          >
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "shrink-0 overflow-hidden rounded-lg transition-all",
                  thumbnailSizeClasses[thumbnailSize],
                  index === selectedIndex
                    ? "ring-2 ring-primary ring-offset-2"
                    : "opacity-70 hover:opacity-100",
                )}
              >
                <img
                  src={image.thumbnail || image.src}
                  alt={image.alt || ""}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {enableLightbox && (
          <Lightbox
            images={images}
            currentIndex={selectedIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            onNext={() =>
              setSelectedIndex((i) => Math.min(i + 1, images.length - 1))
            }
            onPrev={() => setSelectedIndex((i) => Math.max(i - 1, 0))}
          />
        )}
      </>
    );
  },
);
ThumbnailGallery.displayName = "ThumbnailGallery";

// ============================================
// CarouselGallery - With carousel navigation
// ============================================

export interface CarouselGalleryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images: GalleryImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  enableLightbox?: boolean;
}

export const CarouselGallery = forwardRef<HTMLDivElement, CarouselGalleryProps>(
  (
    {
      className,
      images,
      autoPlay = false,
      autoPlayInterval = 5000,
      showDots = true,
      showArrows = true,
      enableLightbox = true,
      ...props
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const goToNext = useCallback(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, [images.length]);

    const goToPrev = useCallback(() => {
      setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    }, [images.length]);

    useEffect(() => {
      if (!autoPlay) return;
      const interval = setInterval(goToNext, autoPlayInterval);
      return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, goToNext]);

    const currentImage = images[currentIndex];

    return (
      <>
        <div
          ref={ref}
          className={cn("relative overflow-hidden rounded-lg", className)}
          {...props}
        >
          {/* Main image */}
          <button
            type="button"
            className="relative aspect-video cursor-pointer group w-full"
            onClick={() => enableLightbox && setLightboxOpen(true)}
          >
            {currentImage && (
              <>
                <img
                  src={currentImage.src}
                  alt={currentImage.alt || ""}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <MaximizeIcon className="size-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </>
            )}
          </button>

          {/* Arrows */}
          {showArrows && images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
              >
                <ChevronLeftIcon className="size-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                <ChevronRightIcon className="size-5" />
              </Button>
            </>
          )}

          {/* Dots */}
          {showDots && images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    "size-2 rounded-full transition-colors",
                    index === currentIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/70",
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {enableLightbox && (
          <Lightbox
            images={images}
            currentIndex={currentIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            onNext={goToNext}
            onPrev={goToPrev}
          />
        )}
      </>
    );
  },
);
CarouselGallery.displayName = "CarouselGallery";
