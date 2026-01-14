import { forwardRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { imageVariants } from "@/lib/variants/image";
import type { VariantProps } from "class-variance-authority";

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "placeholder">,
    VariantProps<typeof imageVariants> {
  fallback?: React.ReactNode;
  placeholder?: React.ReactNode;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | string;
}

const aspectRatioClasses: Record<string, string> = {
  auto: "",
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      objectFit,
      rounded,
      fallback,
      placeholder,
      aspectRatio = "auto",
      src,
      alt = "",
      onLoad,
      onError,
      ...props
    },
    ref,
  ) => {
    const [status, setStatus] = useState<"loading" | "loaded" | "error">(
      "loading",
    );

    const handleLoad = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setStatus("loaded");
        onLoad?.(e);
      },
      [onLoad],
    );

    const handleError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setStatus("error");
        onError?.(e);
      },
      [onError],
    );

    const aspectClass =
      aspectRatioClasses[aspectRatio] ??
      (aspectRatio ? `aspect-[${aspectRatio}]` : "");

    if (status === "error" && fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className={cn("relative overflow-hidden", aspectClass, className)}>
        {status === "loading" && placeholder && (
          <div className="absolute inset-0 flex items-center justify-center">
            {placeholder}
          </div>
        )}
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            imageVariants({ objectFit, rounded }),
            "size-full",
            status === "loading" && "opacity-0",
            status === "loaded" && "opacity-100",
          )}
          {...props}
        />
      </div>
    );
  },
);
Image.displayName = "Image";

// Eager loading variant for above-the-fold images
export interface EagerImageProps extends ImageProps {
  priority?: boolean;
}

export const EagerImage = forwardRef<HTMLImageElement, EagerImageProps>(
  ({ priority = true, ...props }, ref) => (
    <Image
      ref={ref}
      {...props}
      // Override lazy loading for priority images
      {...(priority && {
        loading: "eager" as const,
        decoding: "sync" as const,
      })}
    />
  ),
);
EagerImage.displayName = "EagerImage";
