import { forwardRef } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/components/utils";

export interface ActivityItem {
  id: string;
  type:
    | "comment"
    | "update"
    | "create"
    | "delete"
    | "mention"
    | "like"
    | "share"
    | "assign"
    | "complete";
  user: {
    name: string;
    avatarSrc?: string;
  };
  action: string;
  target?: {
    name: string;
    href?: string;
  };
  timestamp: string;
  content?: React.ReactNode;
  metadata?: React.ReactNode;
}

export interface ActivityFeedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  activities: ActivityItem[];
  title?: string;
  showHeader?: boolean;
  emptyMessage?: string;
  maxItems?: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export const ActivityFeed = forwardRef<HTMLDivElement, ActivityFeedProps>(
  (
    {
      className,
      activities,
      title = "Activity",
      showHeader = true,
      emptyMessage = "No activity yet",
      maxItems,
      onLoadMore,
      hasMore = false,
      ...props
    },
    ref,
  ) => {
    const displayedActivities = maxItems
      ? activities.slice(0, maxItems)
      : activities;

    return (
      <div
        ref={ref}
        className={cn("rounded-lg border border-border bg-card", className)}
        {...props}
      >
        {/* Header */}
        {showHeader && (
          <div className="border-b border-border px-4 py-3">
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>
        )}

        {/* Activity List */}
        {displayedActivities.length > 0 ? (
          <div className="divide-y divide-border">
            {displayedActivities.map((activity) => (
              <ActivityFeedItem key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        )}

        {/* Load More */}
        {hasMore && onLoadMore && (
          <div className="border-t border-border px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={onLoadMore}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    );
  },
);
ActivityFeed.displayName = "ActivityFeed";

// Activity Feed Item
interface ActivityFeedItemProps {
  activity: ActivityItem;
}

export const ActivityFeedItem = forwardRef<
  HTMLDivElement,
  ActivityFeedItemProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, activity, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex gap-x-3 px-4 py-3", className)}
      {...props}
    >
      {/* Avatar */}
      <Avatar
        src={activity.user.avatarSrc}
        fallback={activity.user.name.charAt(0)}
        size="sm"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-1">
          <span className="font-medium text-foreground">
            {activity.user.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {activity.action}
          </span>
          {activity.target &&
            (activity.target.href ? (
              <a
                href={activity.target.href}
                className="text-sm font-medium text-primary hover:underline"
              >
                {activity.target.name}
              </a>
            ) : (
              <span className="text-sm font-medium text-foreground">
                {activity.target.name}
              </span>
            ))}
        </div>

        {/* Timestamp */}
        <p className="mt-0.5 text-xs text-muted-foreground">
          {activity.timestamp}
        </p>

        {/* Content (comment, etc.) */}
        {activity.content && <div className="mt-2">{activity.content}</div>}

        {/* Metadata */}
        {activity.metadata && <div className="mt-2">{activity.metadata}</div>}
      </div>
    </div>
  );
});
ActivityFeedItem.displayName = "ActivityFeedItem";

// Compact Activity Feed (for sidebars)
export interface CompactActivityFeedProps
  extends Omit<ActivityFeedProps, "activities"> {
  activities: Array<{
    id: string;
    icon?: React.ReactNode;
    text: React.ReactNode;
    timestamp: string;
  }>;
}

export const CompactActivityFeed = forwardRef<
  HTMLDivElement,
  CompactActivityFeedProps
>(
  (
    {
      className,
      activities,
      title = "Recent Activity",
      showHeader = true,
      maxItems,
      ...props
    },
    ref,
  ) => {
    const displayedActivities = maxItems
      ? activities.slice(0, maxItems)
      : activities;

    return (
      <div
        ref={ref}
        className={cn("rounded-lg border border-border bg-card", className)}
        {...props}
      >
        {showHeader && (
          <div className="border-b border-border px-4 py-3">
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          </div>
        )}
        <ul className="divide-y divide-border">
          {displayedActivities.map((activity) => (
            <li
              key={activity.id}
              className="flex items-start gap-x-3 px-4 py-2.5"
            >
              {activity.icon && (
                <div className="mt-0.5 size-4 shrink-0 text-muted-foreground">
                  {activity.icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.text}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
CompactActivityFeed.displayName = "CompactActivityFeed";

// Activity with grouped items by date
export interface GroupedActivityFeedProps
  extends Omit<ActivityFeedProps, "activities"> {
  groups: Array<{
    date: string;
    activities: ActivityItem[];
  }>;
}

export const GroupedActivityFeed = forwardRef<
  HTMLDivElement,
  GroupedActivityFeedProps
>(
  (
    { className, groups, title = "Activity", showHeader = true, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-lg border border-border bg-card", className)}
        {...props}
      >
        {showHeader && (
          <div className="border-b border-border px-4 py-3">
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>
        )}
        <div className="divide-y divide-border">
          {groups.map((group) => (
            <div key={group.date}>
              <div className="bg-muted/50 px-4 py-2">
                <p className="text-xs font-medium text-muted-foreground">
                  {group.date}
                </p>
              </div>
              <div className="divide-y divide-border">
                {group.activities.map((activity) => (
                  <ActivityFeedItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
GroupedActivityFeed.displayName = "GroupedActivityFeed";

// Activity notification style
export interface NotificationActivityProps {
  activities: Array<{
    id: string;
    icon?: React.ReactNode;
    iconBg?: string;
    title: React.ReactNode;
    description?: string;
    timestamp: string;
    unread?: boolean;
    action?: {
      label: string;
      onClick: () => void;
    };
  }>;
  onMarkAllRead?: () => void;
}

export const NotificationActivity = forwardRef<
  HTMLDivElement,
  NotificationActivityProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, activities, onMarkAllRead, ...props }, ref) => {
  const unreadCount = activities.filter((a) => a.unread).length;

  return (
    <div
      ref={ref}
      className={cn("rounded-lg border border-border bg-card", className)}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-x-2">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="default" size="sm">
              {unreadCount}
            </Badge>
          )}
        </div>
        {onMarkAllRead && unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-sm text-primary hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={cn(
              "flex items-start gap-x-3 px-4 py-3",
              activity.unread && "bg-primary/5",
            )}
          >
            {activity.icon && (
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full",
                  activity.iconBg || "bg-muted text-muted-foreground",
                )}
              >
                {activity.icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "text-sm",
                  activity.unread
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {activity.title}
              </p>
              {activity.description && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {activity.description}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                {activity.timestamp}
              </p>
              {activity.action && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 -ml-2 h-7"
                  onClick={activity.action.onClick}
                >
                  {activity.action.label}
                </Button>
              )}
            </div>
            {activity.unread && (
              <div className="size-2 shrink-0 rounded-full bg-primary" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
NotificationActivity.displayName = "NotificationActivity";
