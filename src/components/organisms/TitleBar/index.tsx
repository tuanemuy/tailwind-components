import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import {
  titleBarVariants,
  titleBarTitleVariants,
  titleBarSubtitleVariants,
} from "@/lib/variants/titleBar";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import type { VariantProps } from "class-variance-authority";

export interface TitleBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof titleBarVariants> {
  title: React.ReactNode;
  titleSize?: "sm" | "md" | "lg" | "xl";
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  backButton?: React.ReactNode;
  breadcrumb?: React.ReactNode;
}

export const TitleBar = forwardRef<HTMLDivElement, TitleBarProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      title,
      titleSize = "md",
      subtitle,
      badge,
      icon,
      actions,
      backButton,
      breadcrumb,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(titleBarVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex flex-1 flex-col gap-y-2">
          {/* Breadcrumb */}
          {breadcrumb && <div className="-mb-1">{breadcrumb}</div>}

          {/* Title row */}
          <div className="flex items-center gap-x-3">
            {/* Back button */}
            {backButton}

            {/* Icon */}
            {icon && (
              <div className={cn(
                "shrink-0 text-muted-foreground",
                titleSize === "sm" ? "size-5" : titleSize === "lg" || titleSize === "xl" ? "size-8" : "size-6"
              )}>
                {icon}
              </div>
            )}

            {/* Title & Badge */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h1 className={cn(titleBarTitleVariants({ size: titleSize }))}>
                {title}
              </h1>
              {badge}
            </div>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <p className={cn(titleBarSubtitleVariants({ size }))}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-x-2 shrink-0">
            {actions}
          </div>
        )}
      </div>
    );
  }
);
TitleBar.displayName = "TitleBar";

// Simple title bar with common patterns
export interface SimpleTitleBarProps {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const SimpleTitleBar = forwardRef<HTMLDivElement, SimpleTitleBarProps & Omit<React.HTMLAttributes<HTMLDivElement>, "title">>(
  ({ title, description, primaryAction, secondaryAction, className, ...props }, ref) => {
    return (
      <TitleBar
        ref={ref}
        title={title}
        subtitle={description}
        variant="bordered"
        actions={
          <>
            {secondaryAction && (
              <Button variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button variant="primary" onClick={primaryAction.onClick}>
                {primaryAction.icon && (
                  <span className="mr-2 size-4">{primaryAction.icon}</span>
                )}
                {primaryAction.label}
              </Button>
            )}
          </>
        }
        className={className}
        {...props}
      />
    );
  }
);
SimpleTitleBar.displayName = "SimpleTitleBar";

// Title bar with tabs
export interface TabbedTitleBarProps extends Omit<TitleBarProps, "actions"> {
  tabs?: React.ReactNode;
  actions?: React.ReactNode;
}

export const TabbedTitleBar = forwardRef<HTMLDivElement, TabbedTitleBarProps>(
  ({ tabs, actions, className, ...props }, ref) => {
    return (
      <div className={cn("space-y-4", className)}>
        <TitleBar ref={ref} actions={actions} {...props} />
        {tabs && <div className="-mb-px">{tabs}</div>}
      </div>
    );
  }
);
TabbedTitleBar.displayName = "TabbedTitleBar";

// Title bar with filters/search
export interface FilterableTitleBarProps extends Omit<TitleBarProps, "actions"> {
  searchInput?: React.ReactNode;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
}

export const FilterableTitleBar = forwardRef<HTMLDivElement, FilterableTitleBarProps>(
  ({ searchInput, filters, actions, className, ...props }, ref) => {
    return (
      <div className={cn("space-y-4", className)}>
        <TitleBar ref={ref} actions={actions} {...props} />
        {(searchInput || filters) && (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {searchInput && <div className="sm:w-72">{searchInput}</div>}
            {filters && <div className="flex items-center gap-x-2">{filters}</div>}
          </div>
        )}
      </div>
    );
  }
);
FilterableTitleBar.displayName = "FilterableTitleBar";

// Page title bar with status badge
export interface StatusTitleBarProps extends Omit<TitleBarProps, "badge"> {
  status?: {
    label: string;
    variant?: "default" | "success" | "warning" | "destructive";
  };
}

export const StatusTitleBar = forwardRef<HTMLDivElement, StatusTitleBarProps>(
  ({ status, ...props }, ref) => {
    return (
      <TitleBar
        ref={ref}
        badge={
          status && (
            <Badge variant={status.variant || "default"} size="sm">
              {status.label}
            </Badge>
          )
        }
        {...props}
      />
    );
  }
);
StatusTitleBar.displayName = "StatusTitleBar";
