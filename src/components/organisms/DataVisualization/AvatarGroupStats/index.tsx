import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Avatar, Badge, ProgressBar } from "@/components/atoms";
import { AvatarGroup, TrendIndicator } from "@/components/molecules";
import type { TrendDirection, TrendVariant } from "@/components/types";
import { cn } from "@/components/utils";
import {
  dataCardVariants,
  getRankingBadgeStyle,
} from "@/components/variants/dataVisualization";

// ============================================
// Types
// ============================================

export interface AvatarStatUser {
  id: string;
  name: string;
  avatar?: string;
  status?: "online" | "offline" | "away" | "busy";
}

export interface AvatarGroupStatItem {
  id: string;
  label: string;
  value: string | number;
  users: AvatarStatUser[];
  maxDisplay?: number;
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
  description?: string;
}

// ============================================
// AvatarGroupStats - Statistics with avatar groups
// ============================================

export interface AvatarGroupStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  subtitle?: string;
  stats: AvatarGroupStatItem[];
  action?: React.ReactNode;
}

export const AvatarGroupStats = forwardRef<
  HTMLDivElement,
  AvatarGroupStatsProps
>(
  (
    {
      className,
      variant = "bordered",
      title,
      subtitle,
      stats,
      action,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        {(title || action) && (
          <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
            <div>
              {title && (
                <h3 className="text-sm font-medium text-foreground">{title}</h3>
              )}
              {subtitle && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        {/* Stats */}
        <div className="divide-y divide-border">
          {stats.map((stat) => (
            <div key={stat.id} className="p-4">
              <div className="flex items-start justify-between gap-x-4">
                {/* Left: Label, Value, Trend */}
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <div className="flex items-center gap-x-2 mt-1">
                    <span className="text-xl font-bold text-foreground tabular-nums">
                      {stat.value}
                    </span>
                    {stat.trend && (
                      <TrendIndicator
                        value={stat.trend.value}
                        direction={stat.trend.direction}
                        variant={stat.trend.variant}
                        size="xs"
                      />
                    )}
                  </div>
                  {stat.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  )}
                </div>

                {/* Right: Avatar Group */}
                <div className="shrink-0">
                  <AvatarGroup
                    items={stat.users.map((user) => ({
                      src: user.avatar,
                      alt: user.name,
                      initials: user.name.charAt(0).toUpperCase(),
                    }))}
                    max={stat.maxDisplay || 4}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
AvatarGroupStats.displayName = "AvatarGroupStats";

// ============================================
// TeamStatsCard - Team statistics with avatars
// ============================================

export interface TeamStatData {
  totalMembers: number;
  activeMembers: number;
  newMembers?: number;
  members: AvatarStatUser[];
  trend?: {
    value: string;
    direction: TrendDirection;
    variant?: TrendVariant;
  };
}

export interface TeamStatsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  data: TeamStatData;
  maxAvatars?: number;
  showOnlineStatus?: boolean;
  action?: React.ReactNode;
}

export const TeamStatsCard = forwardRef<HTMLDivElement, TeamStatsCardProps>(
  (
    {
      className,
      variant = "bordered",
      title = "Team",
      data,
      maxAvatars = 5,
      showOnlineStatus = true,
      action,
      ...props
    },
    ref,
  ) => {
    const activePercentage = Math.round(
      (data.activeMembers / data.totalMembers) * 100,
    );
    const onlineMembers = data.members.filter((m) => m.status === "online");

    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          {action && <div className="shrink-0">{action}</div>}
        </div>

        {/* Main Content */}
        <div className="p-4">
          {/* Avatar Group */}
          <div className="flex items-center justify-between mb-4">
            <AvatarGroup
              items={data.members.slice(0, maxAvatars).map((member) => ({
                src: member.avatar,
                alt: member.name,
                initials: member.name.charAt(0).toUpperCase(),
              }))}
              max={maxAvatars}
              size="md"
            />
            {data.members.length > maxAvatars && (
              <span className="text-xs text-muted-foreground">
                +{data.members.length - maxAvatars} more
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Total Members</p>
              <div className="flex items-center gap-x-2">
                <span className="text-lg font-semibold text-foreground tabular-nums">
                  {data.totalMembers}
                </span>
                {data.trend && (
                  <TrendIndicator
                    value={data.trend.value}
                    direction={data.trend.direction}
                    variant={data.trend.variant}
                    size="xs"
                  />
                )}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active</p>
              <p className="text-lg font-semibold text-foreground tabular-nums">
                {data.activeMembers}
                <span className="text-sm text-muted-foreground ml-1">
                  ({activePercentage}%)
                </span>
              </p>
            </div>
          </div>

          {/* Online Status */}
          {showOnlineStatus && (
            <div className="mt-4 pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <span className="size-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm text-muted-foreground">
                    {onlineMembers.length} online now
                  </span>
                </div>
                {data.newMembers !== undefined && data.newMembers > 0 && (
                  <Badge variant="success" size="sm">
                    +{data.newMembers} new
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);
TeamStatsCard.displayName = "TeamStatsCard";

// ============================================
// ContributorsStatsCard - Contributors with stats
// ============================================

export interface ContributorData {
  id: string;
  name: string;
  avatar?: string;
  contributions: number;
  role?: string;
  isTopContributor?: boolean;
}

export interface ContributorsStatsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  contributors: ContributorData[];
  totalContributions?: number;
  limit?: number;
  action?: React.ReactNode;
}

export const ContributorsStatsCard = forwardRef<
  HTMLDivElement,
  ContributorsStatsCardProps
>(
  (
    {
      className,
      variant = "bordered",
      title = "Top Contributors",
      contributors,
      totalContributions,
      limit = 5,
      action,
      ...props
    },
    ref,
  ) => {
    const displayContributors = contributors.slice(0, limit);
    const total =
      totalContributions ??
      contributors.reduce((sum, c) => sum + c.contributions, 0);
    const maxContributions = Math.max(
      ...displayContributors.map((c) => c.contributions),
    );

    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
          <div>
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {total.toLocaleString()} total contributions
            </p>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>

        {/* Contributors */}
        <div className="divide-y divide-border">
          {displayContributors.map((contributor, index) => {
            const percentage =
              (contributor.contributions / maxContributions) * 100;

            return (
              <div key={contributor.id} className="px-4 py-3">
                <div className="flex items-center gap-x-3">
                  {/* Rank */}
                  <span
                    className={cn(
                      "size-5 shrink-0 flex items-center justify-center rounded text-xs font-semibold",
                      getRankingBadgeStyle(index + 1),
                    )}
                  >
                    {index + 1}
                  </span>

                  {/* Avatar */}
                  <Avatar
                    src={contributor.avatar}
                    alt={contributor.name}
                    fallback={contributor.name.charAt(0).toUpperCase()}
                    size="sm"
                  />

                  {/* Name & Role */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-x-2">
                      <span className="text-sm font-medium text-foreground truncate">
                        {contributor.name}
                      </span>
                      {contributor.isTopContributor && (
                        <Badge variant="success" size="sm">
                          Top
                        </Badge>
                      )}
                    </div>
                    {contributor.role && (
                      <p className="text-xs text-muted-foreground">
                        {contributor.role}
                      </p>
                    )}
                  </div>

                  {/* Contributions */}
                  <span className="text-sm font-semibold text-foreground tabular-nums shrink-0">
                    {contributor.contributions.toLocaleString()}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-2 ml-8">
                  <ProgressBar value={percentage} size="xs" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {contributors.length > limit && (
          <div className="border-t border-border px-4 py-2 text-center">
            <span className="text-xs text-muted-foreground">
              +{contributors.length - limit} more contributors
            </span>
          </div>
        )}
      </div>
    );
  },
);
ContributorsStatsCard.displayName = "ContributorsStatsCard";

// ============================================
// UserActivityStats - User activity with avatars
// ============================================

export interface UserActivityData {
  id: string;
  user: AvatarStatUser;
  action: string;
  target?: string;
  timestamp: string;
  value?: string | number;
}

export interface UserActivityStatsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  title?: string;
  activities: UserActivityData[];
  limit?: number;
  action?: React.ReactNode;
}

export const UserActivityStats = forwardRef<
  HTMLDivElement,
  UserActivityStatsProps
>(
  (
    {
      className,
      variant = "bordered",
      title = "Recent Activity",
      activities,
      limit = 5,
      action,
      ...props
    },
    ref,
  ) => {
    const displayActivities = activities.slice(0, limit);

    return (
      <div
        ref={ref}
        className={cn(dataCardVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-x-4 border-b border-border px-4 py-3">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          {action && <div className="shrink-0">{action}</div>}
        </div>

        {/* Activities */}
        <div className="divide-y divide-border">
          {displayActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-x-3 px-4 py-3"
            >
              <Avatar
                src={activity.user.avatar}
                alt={activity.user.name}
                fallback={activity.user.name.charAt(0).toUpperCase()}
                size="sm"
                status={activity.user.status}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user.name}</span>{" "}
                  {activity.action}
                  {activity.target && (
                    <span className="font-medium"> {activity.target}</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activity.timestamp}
                </p>
              </div>
              {activity.value !== undefined && (
                <span className="text-sm font-medium text-foreground shrink-0 tabular-nums">
                  {activity.value}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        {activities.length > limit && (
          <div className="border-t border-border px-4 py-2 text-center">
            <span className="text-xs text-muted-foreground">
              +{activities.length - limit} more activities
            </span>
          </div>
        )}
      </div>
    );
  },
);
UserActivityStats.displayName = "UserActivityStats";
