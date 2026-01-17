"use client";

import type { VariantProps } from "class-variance-authority";
import { forwardRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { CheckIcon, ChevronRightIcon, XIcon } from "@/components/icons";
import { cn } from "@/components/utils";
import {
  onboardingChecklistItemVariants,
  onboardingChecklistVariants,
} from "@/components/variants/setupFlow";

export interface OnboardingChecklistItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  href?: string;
}

export interface OnboardingChecklistProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof onboardingChecklistVariants> {
  title?: string;
  description?: string;
  items: OnboardingChecklistItem[];
  onItemToggle?: (id: string, completed: boolean) => void;
  dismissable?: boolean;
  onDismiss?: () => void;
  showProgress?: boolean;
}

export const OnboardingChecklist = forwardRef<
  HTMLDivElement,
  OnboardingChecklistProps
>(
  (
    {
      className,
      variant = "default",
      title,
      description,
      items,
      onItemToggle,
      dismissable = false,
      onDismiss,
      showProgress = true,
      ...props
    },
    ref,
  ) => {
    const completedCount = items.filter((item) => item.completed).length;
    const progress =
      items.length > 0 ? (completedCount / items.length) * 100 : 0;

    return (
      <div
        ref={ref}
        className={cn(onboardingChecklistVariants({ variant }), className)}
        {...props}
      >
        {/* Header */}
        {(title || description || dismissable) && (
          <div className="flex items-start justify-between gap-4 border-b border-border p-4">
            <div className="space-y-1">
              {title && (
                <h3 className="font-semibold text-foreground">{title}</h3>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
            {dismissable && (
              <button
                type="button"
                onClick={onDismiss}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Dismiss"
              >
                <XIcon className="size-4" />
              </button>
            )}
          </div>
        )}

        {/* Progress */}
        {showProgress && (
          <div className="border-b border-border px-4 py-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">
                {completedCount} of {items.length} completed
              </span>
              <span className="text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <ProgressBar value={progress} size="sm" className="mt-2" />
          </div>
        )}

        {/* Items */}
        <div className="divide-y divide-border">
          {items.map((item) => (
            <OnboardingChecklistItemComponent
              key={item.id}
              item={item}
              onToggle={onItemToggle}
            />
          ))}
        </div>
      </div>
    );
  },
);
OnboardingChecklist.displayName = "OnboardingChecklist";

// Checklist item component
interface OnboardingChecklistItemComponentProps {
  item: OnboardingChecklistItem;
  onToggle?: (id: string, completed: boolean) => void;
}

const OnboardingChecklistItemComponent = ({
  item,
  onToggle,
}: OnboardingChecklistItemComponentProps) => {
  const Wrapper = item.href ? "a" : "div";
  const wrapperProps = item.href ? { href: item.href, className: "block" } : {};

  return (
    <Wrapper {...wrapperProps}>
      <div
        className={cn(
          onboardingChecklistItemVariants({
            status: item.completed ? "completed" : "pending",
          }),
        )}
      >
        {/* Checkbox */}
        <div className="flex shrink-0 items-center">
          <Checkbox
            checked={item.completed}
            onChange={(e) => onToggle?.(item.id, e.target.checked)}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "font-medium",
              item.completed
                ? "text-muted-foreground line-through"
                : "text-foreground",
            )}
          >
            {item.title}
          </p>
          {item.description && (
            <p className="text-sm text-muted-foreground">{item.description}</p>
          )}
        </div>

        {/* Action */}
        {item.action && !item.completed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              item.action?.onClick();
            }}
          >
            {item.action.label}
            <ChevronRightIcon className="ml-1 size-3" />
          </Button>
        )}

        {/* Completed indicator */}
        {item.completed && (
          <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
            <CheckIcon className="size-3" />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

// Compact checklist variant
export interface CompactChecklistProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: OnboardingChecklistItem[];
  onItemToggle?: (id: string, completed: boolean) => void;
}

export const CompactChecklist = forwardRef<
  HTMLDivElement,
  CompactChecklistProps
>(({ className, items, onItemToggle, ...props }, ref) => {
  const completedCount = items.filter((item) => item.completed).length;

  return (
    <div
      ref={ref}
      className={cn("rounded-lg border border-border bg-card p-3", className)}
      {...props}
    >
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">
          {completedCount}/{items.length} complete
        </span>
        <span className="text-muted-foreground">
          {Math.round((completedCount / items.length) * 100)}%
        </span>
      </div>
      <div className="space-y-1">
        {items.map((item) => (
          <span
            key={item.id}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors hover:bg-muted/50",
              item.completed && "text-muted-foreground",
            )}
          >
            <Checkbox
              checked={item.completed}
              onChange={(e) => onItemToggle?.(item.id, e.target.checked)}
              className="size-3.5"
            />
            <span className={cn(item.completed && "line-through")}>
              {item.title}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
});
CompactChecklist.displayName = "CompactChecklist";

// Interactive onboarding with expanded details
export interface ExpandableChecklistProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  items: Array<OnboardingChecklistItem & { content?: React.ReactNode }>;
  onItemToggle?: (id: string, completed: boolean) => void;
}

export const ExpandableChecklist = forwardRef<
  HTMLDivElement,
  ExpandableChecklistProps
>(({ className, title, items, onItemToggle, ...props }, ref) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const completedCount = items.filter((item) => item.completed).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-card overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* Header */}
      {title && (
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <span className="text-sm text-muted-foreground">
              {completedCount}/{items.length}
            </span>
          </div>
          <ProgressBar value={progress} size="sm" className="mt-2" />
        </div>
      )}

      {/* Items */}
      <div className="divide-y divide-border">
        {items.map((item) => {
          const isExpanded = expandedId === item.id;
          const hasContent = Boolean(item.content);

          return (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => {
                  if (hasContent) {
                    setExpandedId(isExpanded ? null : item.id);
                  }
                }}
                className={cn(
                  "flex w-full items-center gap-3 p-4 text-left transition-colors",
                  hasContent && "hover:bg-muted/50",
                  !hasContent && "cursor-default",
                )}
              >
                <Checkbox
                  checked={item.completed}
                  onChange={(e) => {
                    e.stopPropagation();
                    onItemToggle?.(item.id, e.target.checked);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "font-medium",
                      item.completed
                        ? "text-muted-foreground line-through"
                        : "text-foreground",
                    )}
                  >
                    {item.title}
                  </p>
                  {item.description && !isExpanded && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {item.description}
                    </p>
                  )}
                </div>
                {hasContent && (
                  <ChevronRightIcon
                    className={cn(
                      "size-4 text-muted-foreground transition-transform",
                      isExpanded && "rotate-90",
                    )}
                  />
                )}
              </button>
              {isExpanded && item.content && (
                <div className="border-t border-border bg-muted/30 p-4">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
ExpandableChecklist.displayName = "ExpandableChecklist";

// Gamified progress checklist
export interface GamifiedChecklistProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  items: OnboardingChecklistItem[];
  onItemToggle?: (id: string, completed: boolean) => void;
  reward?: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  };
}

export const GamifiedChecklist = forwardRef<
  HTMLDivElement,
  GamifiedChecklistProps
>(({ className, title, items, onItemToggle, reward, ...props }, ref) => {
  const completedCount = items.filter((item) => item.completed).length;
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0;
  const isComplete = completedCount === items.length;

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border overflow-hidden",
        isComplete ? "border-success bg-success/5" : "border-border bg-card",
        className,
      )}
      {...props}
    >
      {/* Header with reward preview */}
      <div
        className={cn(
          "p-4",
          isComplete
            ? "bg-success/10"
            : "bg-gradient-to-r from-primary/5 to-transparent",
        )}
      >
        <div className="flex items-center gap-3">
          {reward?.icon && (
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full",
                isComplete
                  ? "bg-success text-success-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {reward.icon}
            </div>
          )}
          <div className="flex-1">
            {title && (
              <h3 className="font-semibold text-foreground">{title}</h3>
            )}
            {reward && !isComplete && (
              <p className="text-sm text-muted-foreground">
                Complete all tasks to {reward.title.toLowerCase()}
              </p>
            )}
            {isComplete && reward && (
              <p className="text-sm text-success">{reward.description}</p>
            )}
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium">
              {completedCount}/{items.length} tasks
            </span>
            <span
              className={cn(
                isComplete ? "text-success" : "text-muted-foreground",
              )}
            >
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full transition-all",
                isComplete ? "bg-success" : "bg-primary",
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-border">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center gap-3 p-3",
              item.completed && "bg-muted/30",
            )}
          >
            <div
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                item.completed
                  ? "bg-success text-success-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {item.completed ? <CheckIcon className="size-3" /> : index + 1}
            </div>
            <span
              className={cn(
                "flex-1 text-sm",
                item.completed
                  ? "text-muted-foreground line-through"
                  : "text-foreground",
              )}
            >
              {item.title}
            </span>
            {!item.completed && item.action && (
              <Button
                variant="ghost"
                size="sm"
                onClick={item.action.onClick}
                className="h-7 text-xs"
              >
                {item.action.label}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
GamifiedChecklist.displayName = "GamifiedChecklist";
