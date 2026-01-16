import { forwardRef } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import {
  CheckCircleIcon,
  EditIcon,
  GlobeIcon,
  LinkIcon,
  MailIcon,
  MapPinIcon,
  MoreHorizontalIcon,
  PhoneIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface SocialLink {
  type: "twitter" | "linkedin" | "github" | "instagram" | "website" | "other";
  url: string;
  label?: string;
}

export interface UserHeroData {
  id: string;
  name: string;
  username?: string;
  email?: string;
  phone?: string;
  bio?: string;
  role?: string;
  department?: string;
  company?: string;
  location?: string;
  website?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  coverImage?: string;
  coverColor?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  status?: "available" | "busy" | "away" | "offline";
  joinedDate?: string;
  socialLinks?: SocialLink[];
  stats?: {
    label: string;
    value: string | number;
  }[];
  tags?: string[];
}

export interface UserHeroCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  user: UserHeroData;
  variant?: "default" | "compact" | "wide" | "centered";
  showActions?: boolean;
  showStats?: boolean;
  showSocials?: boolean;
  onMessage?: (user: UserHeroData) => void;
  onEdit?: (user: UserHeroData) => void;
  onFollow?: (user: UserHeroData) => void;
  actions?: React.ReactNode;
}

const statusColors: Record<string, string> = {
  available: "bg-success",
  busy: "bg-destructive",
  away: "bg-warning",
  offline: "bg-muted",
};

export const UserHeroCard = forwardRef<HTMLDivElement, UserHeroCardProps>(
  (
    {
      className,
      user,
      variant = "default",
      showActions = true,
      showStats = true,
      showSocials = true,
      onMessage,
      onEdit,
      onFollow,
      actions,
      ...props
    },
    ref,
  ) => {
    // Centered variant (Profile header style)
    if (variant === "centered") {
      return (
        <div
          ref={ref}
          className={cn(
            "overflow-hidden rounded-xl border border-border bg-card",
            className,
          )}
          {...props}
        >
          {/* Cover */}
          <div
            className="h-32 w-full sm:h-40"
            style={
              user.coverImage
                ? {
                    backgroundImage: `url(${user.coverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : { backgroundColor: user.coverColor || "#6366F1" }
            }
          />

          {/* Avatar & Info */}
          <div className="relative px-4 pb-4 text-center">
            <div className="-mt-12 inline-block">
              <Avatar
                src={user.avatarSrc}
                fallback={user.avatarFallback || user.name.charAt(0)}
                size="xl"
                className="border-4 border-background"
                status={user.isOnline ? "online" : undefined}
              />
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-center gap-x-2">
                <h2 className="text-xl font-bold text-foreground">
                  {user.name}
                </h2>
                {user.isVerified && (
                  <CheckCircleIcon className="size-5 text-primary" />
                )}
              </div>
              {user.username && (
                <p className="text-sm text-muted-foreground">
                  @{user.username}
                </p>
              )}
              {user.role && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {user.role}
                  {user.company && ` at ${user.company}`}
                </p>
              )}
            </div>

            {user.bio && (
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                {user.bio}
              </p>
            )}

            {/* Stats */}
            {showStats && user.stats && user.stats.length > 0 && (
              <div className="mt-4 flex justify-center divide-x divide-border">
                {user.stats.map((stat) => (
                  <div key={stat.label} className="px-6 text-center">
                    <p className="text-lg font-semibold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            {showActions && (
              <div className="mt-4 flex justify-center gap-x-2">
                {actions || (
                  <>
                    {onFollow && (
                      <Button onClick={() => onFollow(user)}>Follow</Button>
                    )}
                    {onMessage && (
                      <Button variant="outline" onClick={() => onMessage(user)}>
                        <MailIcon className="mr-1.5 size-4" />
                        Message
                      </Button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Wide variant (Full width hero banner)
    if (variant === "wide") {
      return (
        <div
          ref={ref}
          className={cn(
            "overflow-hidden rounded-xl border border-border bg-card",
            className,
          )}
          {...props}
        >
          {/* Cover */}
          <div
            className="relative h-48"
            style={
              user.coverImage
                ? {
                    backgroundImage: `url(${user.coverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : { backgroundColor: user.coverColor || "#6366F1" }
            }
          >
            {onEdit && (
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-4 top-4"
                onClick={() => onEdit(user)}
              >
                <EditIcon className="mr-1.5 size-4" />
                Edit Profile
              </Button>
            )}
          </div>

          {/* Content */}
          <div className="relative px-6 pb-6">
            <div className="-mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-x-4">
                <Avatar
                  src={user.avatarSrc}
                  fallback={user.avatarFallback || user.name.charAt(0)}
                  size="xl"
                  className="border-4 border-background"
                  status={user.isOnline ? "online" : undefined}
                />
                <div className="mb-2">
                  <div className="flex items-center gap-x-2">
                    <h2 className="text-2xl font-bold text-foreground">
                      {user.name}
                    </h2>
                    {user.isVerified && (
                      <CheckCircleIcon className="size-5 text-primary" />
                    )}
                  </div>
                  {user.role && (
                    <p className="text-muted-foreground">
                      {user.role}
                      {user.company && ` · ${user.company}`}
                    </p>
                  )}
                </div>
              </div>

              {showActions && (
                <div className="flex gap-x-2">
                  {actions || (
                    <>
                      {onFollow && (
                        <Button onClick={() => onFollow(user)}>Follow</Button>
                      )}
                      {onMessage && (
                        <Button
                          variant="outline"
                          onClick={() => onMessage(user)}
                        >
                          <MailIcon className="mr-1.5 size-4" />
                          Message
                        </Button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {user.bio && (
              <p className="mt-4 max-w-2xl text-muted-foreground">{user.bio}</p>
            )}

            {/* Info & Stats Row */}
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
              {user.location && (
                <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
                  <MapPinIcon className="size-4" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <a
                  href={user.website}
                  className="flex items-center gap-x-1 text-sm text-primary hover:underline"
                >
                  <LinkIcon className="size-4" />
                  <span>{user.website.replace(/^https?:\/\//, "")}</span>
                </a>
              )}
              {user.joinedDate && (
                <span className="text-sm text-muted-foreground">
                  Joined {user.joinedDate}
                </span>
              )}
            </div>

            {/* Stats */}
            {showStats && user.stats && user.stats.length > 0 && (
              <div className="mt-4 flex gap-x-6">
                {user.stats.map((stat) => (
                  <div key={stat.label}>
                    <span className="font-semibold text-foreground">
                      {stat.value}
                    </span>{" "}
                    <span className="text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Compact variant
    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-x-4 rounded-xl border border-border bg-card p-4",
            className,
          )}
          {...props}
        >
          <Avatar
            src={user.avatarSrc}
            fallback={user.avatarFallback || user.name.charAt(0)}
            size="lg"
            status={user.isOnline ? "online" : undefined}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-x-2">
              <h4 className="truncate font-semibold text-foreground">
                {user.name}
              </h4>
              {user.isVerified && (
                <CheckCircleIcon className="size-4 text-primary" />
              )}
            </div>
            {user.role && (
              <p className="truncate text-sm text-muted-foreground">
                {user.role}
              </p>
            )}
          </div>
          {showActions && (
            <div className="flex items-center gap-x-2">
              {actions || (
                <>
                  {onMessage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-8 p-0"
                      onClick={() => onMessage(user)}
                    >
                      <MailIcon className="size-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="size-8 p-0">
                    <MoreHorizontalIcon className="size-4" />
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-card",
          className,
        )}
        {...props}
      >
        {/* Cover */}
        <div
          className="h-24"
          style={
            user.coverImage
              ? {
                  backgroundImage: `url(${user.coverImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { backgroundColor: user.coverColor || "#6366F1" }
          }
        />

        {/* Content */}
        <div className="relative px-4 pb-4">
          <div className="-mt-10 flex items-end justify-between">
            <Avatar
              src={user.avatarSrc}
              fallback={user.avatarFallback || user.name.charAt(0)}
              size="xl"
              className="border-4 border-background"
              status={user.isOnline ? "online" : undefined}
            />
            {showActions && (
              <div className="flex items-center gap-x-2">
                {actions || (
                  <>
                    {onMessage && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onMessage(user)}
                      >
                        <MailIcon className="mr-1.5 size-4" />
                        Message
                      </Button>
                    )}
                    {onFollow && (
                      <Button size="sm" onClick={() => onFollow(user)}>
                        Follow
                      </Button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-x-2">
              <h3 className="font-semibold text-foreground">{user.name}</h3>
              {user.isVerified && (
                <CheckCircleIcon className="size-4 text-primary" />
              )}
              {user.status && (
                <span
                  className={cn(
                    "size-2 rounded-full",
                    statusColors[user.status],
                  )}
                  title={user.status}
                />
              )}
            </div>
            {(user.role || user.company) && (
              <p className="text-sm text-muted-foreground">
                {user.role}
                {user.company && ` at ${user.company}`}
              </p>
            )}
          </div>

          {user.bio && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {user.bio}
            </p>
          )}

          {/* Contact Info */}
          <div className="mt-4 space-y-1.5">
            {user.email && (
              <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
                <MailIcon className="size-4" />
                <a
                  href={`mailto:${user.email}`}
                  className="hover:text-foreground"
                >
                  {user.email}
                </a>
              </div>
            )}
            {user.phone && (
              <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
                <PhoneIcon className="size-4" />
                <a href={`tel:${user.phone}`} className="hover:text-foreground">
                  {user.phone}
                </a>
              </div>
            )}
            {user.location && (
              <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
                <MapPinIcon className="size-4" />
                <span>{user.location}</span>
              </div>
            )}
            {user.website && (
              <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
                <GlobeIcon className="size-4" />
                <a href={user.website} className="text-primary hover:underline">
                  {user.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
          </div>

          {/* Tags */}
          {user.tags && user.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {user.tags.map((tag) => (
                <Badge key={tag} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Stats */}
          {showStats && user.stats && user.stats.length > 0 && (
            <div className="mt-4 flex gap-4 border-t border-border pt-4">
              {user.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);
UserHeroCard.displayName = "UserHeroCard";
