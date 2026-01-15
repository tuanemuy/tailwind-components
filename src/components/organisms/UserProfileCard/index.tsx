import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import {
  userProfileCardVariants,
  userProfileCardCoverVariants,
  userProfileCardContentVariants,
  userProfileCardStatsVariants,
  userProfileCardStatVariants,
} from "@/lib/variants/userProfileCard";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import type { VariantProps } from "class-variance-authority";

type UserProfileCardSize = "sm" | "md" | "lg";

export interface UserProfileCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userProfileCardVariants> {
  user: {
    name: string;
    username?: string;
    email?: string;
    avatarSrc?: string;
    avatarFallback?: string;
    coverSrc?: string;
    bio?: string;
    role?: string;
    location?: string;
    verified?: boolean;
  };
  stats?: Array<{
    label: string;
    value: string | number;
  }>;
  actions?: React.ReactNode;
  size?: UserProfileCardSize;
  showCover?: boolean;
}

export const UserProfileCard = forwardRef<HTMLDivElement, UserProfileCardProps>(
  (
    {
      className,
      variant = "default",
      user,
      stats,
      actions,
      size = "md",
      showCover = true,
      ...props
    },
    ref
  ) => {
    const alignProps = variant === "minimal" ? "left" : "center";
    const avatarPosition = variant === "minimal" ? "left" : "center";

    return (
      <div
        ref={ref}
        className={cn(userProfileCardVariants({ variant }), className)}
        {...props}
      >
        {/* Cover Image */}
        {showCover && variant !== "minimal" && (
          <UserProfileCardCover
            size={size}
            coverSrc={user.coverSrc}
          />
        )}

        {/* Avatar */}
        <div className={cn(
          "px-4",
          showCover && variant !== "minimal" ? "" : "pt-4"
        )}>
          <UserProfileCardAvatar
            size={size}
            position={avatarPosition}
            src={user.avatarSrc}
            fallback={user.avatarFallback || user.name.charAt(0)}
            showCover={showCover && variant !== "minimal"}
          />
        </div>

        {/* Content */}
        <UserProfileCardContent align={alignProps} padding={size}>
          <div className="flex items-center justify-center gap-x-2">
            <h3 className={cn(
              "font-semibold text-foreground",
              size === "sm" ? "text-base" : size === "lg" ? "text-xl" : "text-lg"
            )}>
              {user.name}
            </h3>
            {user.verified && (
              <Badge variant="default" size="sm">Verified</Badge>
            )}
          </div>

          {user.username && (
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          )}

          {user.role && (
            <p className={cn(
              "text-muted-foreground",
              size === "sm" ? "text-xs" : "text-sm"
            )}>
              {user.role}
            </p>
          )}

          {user.bio && (
            <p className={cn(
              "mt-2 text-muted-foreground",
              size === "sm" ? "text-xs" : "text-sm"
            )}>
              {user.bio}
            </p>
          )}

          {user.location && (
            <p className="mt-1 text-xs text-muted-foreground">
              {user.location}
            </p>
          )}

          {/* Actions */}
          {actions && <div className="mt-4">{actions}</div>}
        </UserProfileCardContent>

        {/* Stats */}
        {stats && stats.length > 0 && (
          <UserProfileCardStats stats={stats} size={size} />
        )}
      </div>
    );
  }
);
UserProfileCard.displayName = "UserProfileCard";

// Cover component
interface UserProfileCardCoverProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userProfileCardCoverVariants> {
  coverSrc?: string;
}

export const UserProfileCardCover = forwardRef<HTMLDivElement, UserProfileCardCoverProps>(
  ({ className, size = "md", coverSrc, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(userProfileCardCoverVariants({ size }), className)}
        {...props}
      >
        {coverSrc && (
          <img
            src={coverSrc}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        )}
      </div>
    );
  }
);
UserProfileCardCover.displayName = "UserProfileCardCover";

// Avatar wrapper component
interface UserProfileCardAvatarProps {
  size?: UserProfileCardSize;
  position?: "center" | "left";
  src?: string;
  fallback?: string;
  showCover?: boolean;
}

export const UserProfileCardAvatar = forwardRef<HTMLDivElement, UserProfileCardAvatarProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ className, size = "md", position = "center", src, fallback, showCover = true, ...props }, ref) => {
    const avatarSize = size === "sm" ? "lg" : size === "lg" ? "xl" : "xl";
    const marginTop = showCover
      ? size === "sm" ? "-mt-8" : size === "lg" ? "-mt-16" : "-mt-12"
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          marginTop,
          position === "center" ? "mx-auto" : "ml-0",
          className
        )}
        {...props}
      >
        <Avatar
          src={src}
          fallback={fallback}
          size={avatarSize}
          className="border-4 border-background"
        />
      </div>
    );
  }
);
UserProfileCardAvatar.displayName = "UserProfileCardAvatar";

// Content component
interface UserProfileCardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userProfileCardContentVariants> {}

export const UserProfileCardContent = forwardRef<HTMLDivElement, UserProfileCardContentProps>(
  ({ className, align = "center", padding = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(userProfileCardContentVariants({ align, padding }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
UserProfileCardContent.displayName = "UserProfileCardContent";

// Stats component
interface UserProfileCardStatsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stats: Array<{
    label: string;
    value: string | number;
  }>;
  size?: UserProfileCardSize;
}

export const UserProfileCardStats = forwardRef<HTMLDivElement, UserProfileCardStatsProps>(
  ({ className, stats, size = "md", ...props }, ref) => {
    const columns = stats.length <= 4 ? stats.length : 3;

    return (
      <div
        ref={ref}
        className={cn(
          userProfileCardStatsVariants({ columns: columns as 2 | 3 | 4 }),
          className
        )}
        {...props}
      >
        {stats.map((stat, index) => (
          <UserProfileCardStat key={index} size={size}>
            <span className={cn(
              "font-semibold text-foreground",
              size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl"
            )}>
              {stat.value}
            </span>
            <span className={cn(
              "text-muted-foreground",
              size === "sm" ? "text-xs" : "text-sm"
            )}>
              {stat.label}
            </span>
          </UserProfileCardStat>
        ))}
      </div>
    );
  }
);
UserProfileCardStats.displayName = "UserProfileCardStats";

// Single stat component
interface UserProfileCardStatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userProfileCardStatVariants> {}

export const UserProfileCardStat = forwardRef<HTMLDivElement, UserProfileCardStatProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(userProfileCardStatVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
UserProfileCardStat.displayName = "UserProfileCardStat";

// Mini profile card (inline/horizontal)
export interface MiniProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    name: string;
    avatarSrc?: string;
    avatarFallback?: string;
    subtitle?: string;
  };
  action?: React.ReactNode;
}

export const MiniProfileCard = forwardRef<HTMLDivElement, MiniProfileCardProps>(
  ({ className, user, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-x-4 rounded-lg border border-border bg-card p-4",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-x-3">
          <Avatar
            src={user.avatarSrc}
            fallback={user.avatarFallback || user.name.charAt(0)}
            size="md"
          />
          <div>
            <p className="font-medium text-foreground">{user.name}</p>
            {user.subtitle && (
              <p className="text-sm text-muted-foreground">{user.subtitle}</p>
            )}
          </div>
        </div>
        {action}
      </div>
    );
  }
);
MiniProfileCard.displayName = "MiniProfileCard";
