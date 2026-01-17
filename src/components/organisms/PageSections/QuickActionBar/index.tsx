"use client";

import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { XIcon } from "@/components/icons";
import { cn } from "@/components/utils";
import { quickActionBarVariants } from "@/components/variants/quickAction";

export interface QuickActionBarAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "primary" | "destructive";
  disabled?: boolean;
}

export interface QuickActionBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof quickActionBarVariants> {
  actions: QuickActionBarAction[];
  showLabels?: boolean;
  closable?: boolean;
  onClose?: () => void;
}

export const QuickActionBar = forwardRef<HTMLDivElement, QuickActionBarProps>(
  (
    {
      className,
      position = "bottom",
      size = "md",
      actions,
      showLabels = true,
      closable = false,
      onClose,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(quickActionBarVariants({ position, size }), className)}
        {...props}
      >
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            disabled={action.disabled}
            className={cn(
              "flex items-center gap-x-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              action.variant === "primary" &&
                "bg-primary text-primary-foreground hover:bg-primary/90",
              action.variant === "destructive" &&
                "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              action.variant !== "primary" &&
                action.variant !== "destructive" &&
                "hover:bg-muted",
            )}
          >
            <span
              className={cn(
                size === "sm"
                  ? "size-3.5"
                  : size === "lg"
                    ? "size-5"
                    : "size-4",
              )}
            >
              {action.icon}
            </span>
            {showLabels && <span>{action.label}</span>}
          </button>
        ))}

        {closable && (
          <>
            <div className="mx-2 h-5 w-px bg-border" />
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <XIcon
                className={cn(
                  size === "sm"
                    ? "size-3.5"
                    : size === "lg"
                      ? "size-5"
                      : "size-4",
                )}
              />
            </button>
          </>
        )}
      </div>
    );
  },
);
QuickActionBar.displayName = "QuickActionBar";

// Selection action bar (for bulk actions)
export interface SelectionActionBarProps
  extends Omit<QuickActionBarProps, "actions"> {
  selectedCount: number;
  actions: QuickActionBarAction[];
  onClear?: () => void;
  selectAllLabel?: string;
  onSelectAll?: () => void;
}

export const SelectionActionBar = forwardRef<
  HTMLDivElement,
  SelectionActionBarProps
>(
  (
    {
      className,
      position = "bottom",
      size = "md",
      selectedCount,
      actions,
      onClear,
      selectAllLabel,
      onSelectAll,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          quickActionBarVariants({ position, size }),
          "gap-x-4",
          className,
        )}
        {...props}
      >
        {/* Selection info */}
        <div className="flex items-center gap-x-3">
          <span className="text-sm font-medium">{selectedCount} selected</span>
          {selectAllLabel && onSelectAll && (
            <button
              type="button"
              onClick={onSelectAll}
              className="text-sm text-primary hover:underline"
            >
              {selectAllLabel}
            </button>
          )}
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-border" />

        {/* Actions */}
        <div className="flex items-center gap-x-1">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              disabled={action.disabled}
              className={cn(
                "flex items-center gap-x-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                action.variant === "primary" &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                action.variant === "destructive" &&
                  "text-destructive hover:bg-destructive/10",
                action.variant !== "primary" &&
                  action.variant !== "destructive" &&
                  "hover:bg-muted",
              )}
            >
              <span
                className={cn(
                  size === "sm"
                    ? "size-3.5"
                    : size === "lg"
                      ? "size-5"
                      : "size-4",
                )}
              >
                {action.icon}
              </span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  },
);
SelectionActionBar.displayName = "SelectionActionBar";

// Context menu style action bar
export interface ContextActionBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  actions: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    shortcut?: string;
    disabled?: boolean;
    destructive?: boolean;
  }>;
  position?: { x: number; y: number };
}

export const ContextActionBar = forwardRef<
  HTMLDivElement,
  ContextActionBarProps
>(({ className, actions, position, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "fixed z-50 min-w-[160px] rounded-lg border border-border bg-card py-1 shadow-lg",
        className,
      )}
      style={position ? { left: position.x, top: position.y } : undefined}
      {...props}
    >
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          onClick={action.onClick}
          disabled={action.disabled}
          className={cn(
            "flex w-full items-center justify-between gap-x-4 px-3 py-2 text-sm transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            action.destructive
              ? "text-destructive hover:bg-destructive/10"
              : "hover:bg-muted",
          )}
        >
          <div className="flex items-center gap-x-2">
            <span className="size-4">{action.icon}</span>
            <span>{action.label}</span>
          </div>
          {action.shortcut && (
            <span className="text-xs text-muted-foreground">
              {action.shortcut}
            </span>
          )}
        </button>
      ))}
    </div>
  );
});
ContextActionBar.displayName = "ContextActionBar";
