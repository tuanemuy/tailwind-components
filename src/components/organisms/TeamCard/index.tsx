import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { AvatarGroup } from "@/components/molecules/AvatarGroup";
import {
  UsersIcon,
  MoreHorizontalIcon,
  SettingsIcon,
  UserPlusIcon,
  StarIcon,
} from "@/lib/icons";

export interface TeamMember {
  id: string;
  name: string;
  email?: string;
  role?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  isOnline?: boolean;
}

export interface TeamCardData {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  color?: string;
  coverImage?: string;
  members?: TeamMember[];
  memberCount?: number;
  projectCount?: number;
  isPrivate?: boolean;
  isStarred?: boolean;
  createdAt?: string;
  lead?: TeamMember;
  tags?: string[];
}

export interface TeamCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  team: TeamCardData;
  variant?: "default" | "compact" | "featured" | "horizontal";
  showMembers?: boolean;
  maxVisibleMembers?: number;
  onInvite?: (team: TeamCardData) => void;
  onSettings?: (team: TeamCardData) => void;
  onStar?: (team: TeamCardData, starred: boolean) => void;
  onClick?: (team: TeamCardData) => void;
  actions?: React.ReactNode;
}

export const TeamCard = forwardRef<HTMLDivElement, TeamCardProps>(
  (
    {
      className,
      team,
      variant = "default",
      showMembers = true,
      maxVisibleMembers = 5,
      onInvite,
      onSettings,
      onStar,
      onClick,
      actions,
      ...props
    },
    ref
  ) => {
    const memberCount = team.memberCount ?? team.members?.length ?? 0;

    // Featured variant
    if (variant === "featured") {
      return (
        <div
          ref={ref}
          className={cn(
            "group overflow-hidden rounded-xl border border-border bg-card",
            onClick && "cursor-pointer",
            className
          )}
          onClick={() => onClick?.(team)}
          {...props}
        >
          {/* Cover */}
          <div
            className="relative h-32"
            style={
              team.coverImage
                ? { backgroundImage: `url(${team.coverImage})`, backgroundSize: "cover", backgroundPosition: "center" }
                : team.color
                ? { backgroundColor: team.color }
                : { backgroundColor: "#6366F1" }
            }
          >
            {/* Actions overlay */}
            <div className="absolute right-3 top-3 flex items-center gap-x-1 opacity-0 transition-opacity group-hover:opacity-100">
              {onStar && (
                <button
                  className="rounded-lg bg-background/80 p-1.5 backdrop-blur-sm hover:bg-background"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStar(team, !team.isStarred);
                  }}
                >
                  <StarIcon
                    className={cn(
                      "size-4",
                      team.isStarred ? "fill-warning text-warning" : "text-muted-foreground"
                    )}
                  />
                </button>
              )}
            </div>

            {/* Icon */}
            {team.icon && !team.coverImage && (
              <div className="flex h-full items-center justify-center">
                <div className="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">{team.icon}</div>
              </div>
            )}

            {/* Private badge */}
            {team.isPrivate && (
              <div className="absolute bottom-3 left-3">
                <Badge variant="secondary" size="sm">
                  Private
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-x-3">
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-foreground">{team.name}</h3>
                {team.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {team.description}
                  </p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 flex items-center gap-x-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-x-1">
                <UsersIcon className="size-4" />
                <span>{memberCount} members</span>
              </div>
              {team.projectCount !== undefined && (
                <span>{team.projectCount} projects</span>
              )}
            </div>

            {/* Members */}
            {showMembers && team.members && team.members.length > 0 && (
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <AvatarGroup
                  items={team.members.slice(0, maxVisibleMembers).map((m) => ({
                    src: m.avatarSrc,
                    initials: m.avatarFallback || m.name.charAt(0),
                    alt: m.name,
                  }))}
                  size="sm"
                  max={maxVisibleMembers}
                />
                {onInvite && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onInvite(team);
                    }}
                  >
                    <UserPlusIcon className="mr-1.5 size-4" />
                    Invite
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Horizontal variant
    if (variant === "horizontal") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-x-4 rounded-xl border border-border bg-card p-4",
            onClick && "cursor-pointer hover:border-primary/50",
            className
          )}
          onClick={() => onClick?.(team)}
          {...props}
        >
          {/* Icon */}
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-xl"
            style={team.color ? { backgroundColor: team.color } : { backgroundColor: "#6366F1" }}
          >
            {team.icon || <UsersIcon className="size-6 text-white" />}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-x-2">
              <h4 className="truncate font-medium text-foreground">{team.name}</h4>
              {team.isStarred && <StarIcon className="size-3.5 fill-warning text-warning" />}
              {team.isPrivate && (
                <Badge variant="outline" size="sm">
                  Private
                </Badge>
              )}
            </div>
            {team.description && (
              <p className="truncate text-sm text-muted-foreground">{team.description}</p>
            )}
          </div>

          {/* Member count */}
          <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
            <UsersIcon className="size-4" />
            <span>{memberCount}</span>
          </div>

          {/* Members */}
          {showMembers && team.members && team.members.length > 0 && (
            <AvatarGroup
              items={team.members.slice(0, 4).map((m) => ({
                src: m.avatarSrc,
                initials: m.avatarFallback || m.name.charAt(0),
                alt: m.name,
              }))}
              size="sm"
              max={4}
              className="hidden md:flex"
            />
          )}

          {/* Actions */}
          <div
            className="flex items-center gap-x-1"
            onClick={(e) => e.stopPropagation()}
          >
            {actions || (
              <>
                {onInvite && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0"
                    onClick={() => onInvite(team)}
                  >
                    <UserPlusIcon className="size-4" />
                  </Button>
                )}
                {onSettings && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0"
                    onClick={() => onSettings(team)}
                  >
                    <SettingsIcon className="size-4" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="size-8 p-0">
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              </>
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
            "flex items-center gap-x-3 rounded-lg border border-border bg-card p-3",
            onClick && "cursor-pointer hover:border-primary/50",
            className
          )}
          onClick={() => onClick?.(team)}
          {...props}
        >
          <div
            className="flex size-8 shrink-0 items-center justify-center rounded-lg"
            style={team.color ? { backgroundColor: team.color } : { backgroundColor: "#6366F1" }}
          >
            {team.icon || <UsersIcon className="size-4 text-white" />}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-medium text-foreground">{team.name}</h4>
          </div>
          <span className="text-xs text-muted-foreground">{memberCount}</span>
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card p-4",
          onClick && "cursor-pointer hover:border-primary/50",
          className
        )}
        onClick={() => onClick?.(team)}
        {...props}
      >
        <div className="flex items-start justify-between gap-x-4">
          <div className="flex items-start gap-x-3">
            <div
              className="flex size-12 shrink-0 items-center justify-center rounded-xl"
              style={team.color ? { backgroundColor: team.color } : { backgroundColor: "#6366F1" }}
            >
              {team.icon || <UsersIcon className="size-6 text-white" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-x-2">
                <h3 className="truncate font-semibold text-foreground">{team.name}</h3>
                {team.isStarred && <StarIcon className="size-3.5 fill-warning text-warning" />}
              </div>
              <p className="text-sm text-muted-foreground">{memberCount} members</p>
            </div>
          </div>
          <div className="flex items-center gap-x-2" onClick={(e) => e.stopPropagation()}>
            {team.isPrivate && (
              <Badge variant="outline" size="sm">
                Private
              </Badge>
            )}
            {actions || (
              <Button variant="ghost" size="sm" className="size-8 p-0">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            )}
          </div>
        </div>

        {team.description && (
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{team.description}</p>
        )}

        {team.tags && team.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {team.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Lead */}
        {team.lead && (
          <div className="mt-4 flex items-center gap-x-2 border-t border-border pt-4">
            <Avatar
              src={team.lead.avatarSrc}
              fallback={team.lead.avatarFallback || team.lead.name.charAt(0)}
              size="sm"
            />
            <div>
              <p className="text-xs text-muted-foreground">Team Lead</p>
              <p className="text-sm font-medium text-foreground">{team.lead.name}</p>
            </div>
          </div>
        )}

        {/* Members */}
        {showMembers && team.members && team.members.length > 0 && !team.lead && (
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <AvatarGroup
              items={team.members.slice(0, maxVisibleMembers).map((m) => ({
                src: m.avatarSrc,
                fallback: m.avatarFallback || m.name.charAt(0),
                alt: m.name,
              }))}
              size="sm"
              max={maxVisibleMembers}
            />
            {onInvite && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onInvite(team);
                }}
              >
                <UserPlusIcon className="mr-1.5 size-4" />
                Invite
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
);
TeamCard.displayName = "TeamCard";

// Grid Layout
export interface TeamCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  teams: TeamCardData[];
  variant?: TeamCardProps["variant"];
  columns?: 2 | 3 | 4;
  showMembers?: boolean;
  onTeamClick?: (team: TeamCardData) => void;
  onInvite?: (team: TeamCardData) => void;
  onStar?: (team: TeamCardData, starred: boolean) => void;
}

const gridColumnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export const TeamCardGrid = forwardRef<HTMLDivElement, TeamCardGridProps>(
  (
    {
      className,
      teams,
      variant = "default",
      columns = 3,
      showMembers = true,
      onTeamClick,
      onInvite,
      onStar,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("grid gap-4", gridColumnClasses[columns], className)}
        {...props}
      >
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            variant={variant}
            showMembers={showMembers}
            onClick={onTeamClick}
            onInvite={onInvite}
            onStar={onStar}
          />
        ))}
      </div>
    );
  }
);
TeamCardGrid.displayName = "TeamCardGrid";

// List Layout
export interface TeamCardListProps extends React.HTMLAttributes<HTMLDivElement> {
  teams: TeamCardData[];
  showMembers?: boolean;
  onTeamClick?: (team: TeamCardData) => void;
  onInvite?: (team: TeamCardData) => void;
  onSettings?: (team: TeamCardData) => void;
}

export const TeamCardList = forwardRef<HTMLDivElement, TeamCardListProps>(
  (
    {
      className,
      teams,
      showMembers = true,
      onTeamClick,
      onInvite,
      onSettings,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            variant="horizontal"
            showMembers={showMembers}
            onClick={onTeamClick}
            onInvite={onInvite}
            onSettings={onSettings}
          />
        ))}
      </div>
    );
  }
);
TeamCardList.displayName = "TeamCardList";
