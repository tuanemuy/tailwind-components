import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { CheckIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  timelineConnectorVariants,
  timelineDotVariants,
  timelineItemVariants,
  timelineVariants,
} from "@/lib/variants/timeline";

type TimelineVariant = "default" | "compact" | "card";
type TimelineOrientation = "vertical" | "horizontal";
type TimelineDotVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";
type TimelineDotSize = "sm" | "md" | "lg";

export interface TimelineItem {
  id?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  timestamp?: React.ReactNode;
  icon?: React.ReactNode;
  dotVariant?: TimelineDotVariant;
  avatar?: {
    src?: string;
    fallback?: string;
  };
  content?: React.ReactNode;
}

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {
  items?: TimelineItem[];
  dotSize?: TimelineDotSize;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      className,
      variant = "default",
      orientation = "vertical",
      items,
      dotSize = "md",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(timelineVariants({ variant, orientation }), className)}
        {...props}
      >
        {items
          ? items.map((item, index) => (
              <TimelineItemComponent
                key={item.id ?? index}
                variant={variant as TimelineVariant}
                orientation={orientation as TimelineOrientation}
                isLast={index === items.length - 1}
                dotSize={dotSize}
                {...item}
              />
            ))
          : children}
      </div>
    );
  },
);
Timeline.displayName = "Timeline";

// Timeline Item Component
interface TimelineItemComponentProps extends TimelineItem {
  variant?: TimelineVariant;
  orientation?: TimelineOrientation;
  dotSize?: TimelineDotSize;
  isLast?: boolean;
}

export const TimelineItemComponent = forwardRef<
  HTMLDivElement,
  TimelineItemComponentProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof TimelineItem>
>(
  (
    {
      className,
      variant = "default",
      orientation = "vertical",
      dotSize = "md",
      isLast = false,
      title,
      description,
      timestamp,
      icon,
      dotVariant = "default",
      avatar,
      content,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          timelineItemVariants({ variant, orientation }),
          className,
        )}
        {...props}
      >
        {/* Connector line */}
        {!isLast && orientation === "vertical" && (
          <div className={cn(timelineConnectorVariants({ orientation }))} />
        )}

        {/* Dot / Icon / Avatar */}
        <div className="relative z-10 shrink-0">
          {avatar ? (
            <Avatar
              src={avatar.src}
              fallback={avatar.fallback}
              size={dotSize === "sm" ? "xs" : dotSize === "lg" ? "md" : "sm"}
              className="ring-4 ring-background"
            />
          ) : (
            <TimelineDot variant={dotVariant} size={dotSize}>
              {icon}
            </TimelineDot>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pt-0.5">
          <div className="flex flex-col gap-y-1 sm:flex-row sm:items-start sm:justify-between sm:gap-x-4">
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{title}</h4>
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            {timestamp && (
              <time className="shrink-0 text-xs text-muted-foreground sm:text-right">
                {timestamp}
              </time>
            )}
          </div>
          {content && <div className="mt-3">{content}</div>}
        </div>
      </div>
    );
  },
);
TimelineItemComponent.displayName = "TimelineItem";

// Timeline Dot Component
export interface TimelineDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineDotVariants> {}

export const TimelineDot = forwardRef<HTMLDivElement, TimelineDotProps>(
  (
    { className, variant = "default", size = "md", children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(timelineDotVariants({ variant, size }), className)}
        {...props}
      >
        {children ?? (
          <div
            className={cn(
              "rounded-full bg-current",
              size === "sm" ? "size-2" : size === "lg" ? "size-3" : "size-2.5",
            )}
          />
        )}
      </div>
    );
  },
);
TimelineDot.displayName = "TimelineDot";

// Activity Timeline (commonly used variant)
export interface ActivityTimelineProps extends Omit<TimelineProps, "items"> {
  activities: Array<{
    id?: string;
    user?: {
      name: string;
      avatarSrc?: string;
    };
    action: string;
    target?: string;
    timestamp: string;
    icon?: React.ReactNode;
    dotVariant?: TimelineDotVariant;
  }>;
}

export const ActivityTimeline = forwardRef<
  HTMLDivElement,
  ActivityTimelineProps
>(({ activities, ...props }, ref) => {
  const items = activities.map((activity) => ({
    id: activity.id,
    title: (
      <span>
        {activity.user && (
          <span className="font-semibold">{activity.user.name}</span>
        )}{" "}
        <span className="text-muted-foreground">{activity.action}</span>
        {activity.target && (
          <span className="font-medium"> {activity.target}</span>
        )}
      </span>
    ),
    timestamp: activity.timestamp,
    icon: activity.icon,
    dotVariant: activity.dotVariant,
    avatar: activity.user
      ? { src: activity.user.avatarSrc, fallback: activity.user.name.charAt(0) }
      : undefined,
  }));

  return <Timeline ref={ref} items={items} {...props} />;
});
ActivityTimeline.displayName = "ActivityTimeline";

// Order Timeline (e-commerce tracking)
export interface OrderTimelineProps extends Omit<TimelineProps, "items"> {
  steps: Array<{
    title: string;
    description?: string;
    timestamp?: string;
    completed?: boolean;
    current?: boolean;
  }>;
}

export const OrderTimeline = forwardRef<HTMLDivElement, OrderTimelineProps>(
  ({ steps, ...props }, ref) => {
    const items = steps.map((step) => ({
      title: step.title,
      description: step.description,
      timestamp: step.timestamp,
      dotVariant: step.completed
        ? "success"
        : step.current
          ? "primary"
          : ("default" as TimelineDotVariant),
      icon: step.completed ? (
        <CheckIcon
          className={cn(
            "size-3",
            props.dotSize === "sm"
              ? "size-2"
              : props.dotSize === "lg"
                ? "size-4"
                : "size-3",
          )}
        />
      ) : undefined,
    }));

    return <Timeline ref={ref} items={items} {...props} />;
  },
);
OrderTimeline.displayName = "OrderTimeline";

// History Timeline (for showing change history)
export interface HistoryTimelineProps extends Omit<TimelineProps, "items"> {
  history: Array<{
    id?: string;
    title: string;
    description?: string;
    timestamp: string;
    user?: {
      name: string;
      avatarSrc?: string;
    };
    changes?: Array<{
      field: string;
      oldValue?: string;
      newValue: string;
    }>;
  }>;
}

export const HistoryTimeline = forwardRef<HTMLDivElement, HistoryTimelineProps>(
  ({ history, ...props }, ref) => {
    const items = history.map((entry) => ({
      id: entry.id,
      title: entry.title,
      description: entry.description,
      timestamp: entry.timestamp,
      avatar: entry.user
        ? { src: entry.user.avatarSrc, fallback: entry.user.name.charAt(0) }
        : undefined,
      content: entry.changes && entry.changes.length > 0 && (
        <div className="mt-2 space-y-1 rounded-lg bg-muted/50 p-3">
          {entry.changes.map((change) => (
            <div
              key={change.field}
              className="flex items-center gap-x-2 text-sm"
            >
              <span className="font-medium text-muted-foreground">
                {change.field}:
              </span>
              {change.oldValue && (
                <>
                  <span className="text-muted-foreground line-through">
                    {change.oldValue}
                  </span>
                  <span className="text-muted-foreground">→</span>
                </>
              )}
              <span className="text-foreground">{change.newValue}</span>
            </div>
          ))}
        </div>
      ),
    }));

    return <Timeline ref={ref} items={items} {...props} />;
  },
);
HistoryTimeline.displayName = "HistoryTimeline";
