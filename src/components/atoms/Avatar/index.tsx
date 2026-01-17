import type { VariantProps } from "class-variance-authority";
import { forwardRef, useState } from "react";
import { cn } from "@/components/utils";
import { avatarStatusVariants, avatarVariants } from "@/components/variants/avatar";

export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  /** Alias for alt - display name for the avatar */
  name?: string;
  initials?: string;
  status?: AvatarStatus;
  fallback?: React.ReactNode;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, size, src, alt, name, initials, status, fallback, ...props },
    ref,
  ) => {
    const [imageError, setImageError] = useState(false);

    // name can be used as alt alias
    const displayName = alt || name;
    // Auto-generate initials from name if not provided
    const displayInitials =
      initials || (name ? name.charAt(0).toUpperCase() : undefined);

    const showImage = src && !imageError;
    const showInitials = !showImage && displayInitials;
    const showFallback = !showImage && !showInitials && fallback;

    return (
      <div
        ref={ref}
        className={cn("relative", avatarVariants({ size }), className)}
        {...props}
      >
        {showImage && (
          <img
            src={src}
            alt={displayName || "Avatar"}
            className="size-full rounded-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
        {showInitials && (
          <span title={displayName || displayInitials}>{displayInitials}</span>
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
        {status && (
          <span
            className={cn(avatarStatusVariants({ status, size }))}
            role="img"
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  },
);
Avatar.displayName = "Avatar";
