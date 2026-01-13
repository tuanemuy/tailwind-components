import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { avatarVariants, avatarStatusVariants } from "@/lib/variants/avatar";
import type { VariantProps } from "class-variance-authority";

export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  initials?: string;
  status?: AvatarStatus;
  fallback?: React.ReactNode;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, size, src, alt, initials, status, fallback, ...props },
    ref,
  ) => {
    const [imageError, setImageError] = useState(false);

    const showImage = src && !imageError;
    const showInitials = !showImage && initials;
    const showFallback = !showImage && !showInitials && fallback;

    return (
      <div ref={ref} className={cn("relative inline-block", className)} {...props}>
        <div className={cn(avatarVariants({ size }))}>
          {showImage && (
            <img
              src={src}
              alt={alt || "Avatar"}
              className="size-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
          {showInitials && (
            <span aria-label={alt || initials}>{initials}</span>
          )}
          {showFallback && fallback}
          {!showImage && !showInitials && !showFallback && (
            <svg
              className="size-[60%] text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>
        {status && (
          <span
            className={cn(avatarStatusVariants({ status, size }))}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  },
);
Avatar.displayName = "Avatar";
