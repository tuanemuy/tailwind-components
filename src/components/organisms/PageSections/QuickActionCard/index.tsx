import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { cn } from "@/components/utils";
import {
  quickActionCardVariants,
  quickActionIconVariants,
} from "@/components/variants/quickAction";

export interface QuickActionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof quickActionCardVariants> {
  icon: React.ReactNode;
  title: string;
  description?: string;
  badge?: React.ReactNode;
  showArrow?: boolean;
  href?: string;
  onClick?: () => void;
}

export const QuickActionCard = forwardRef<HTMLDivElement, QuickActionCardProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      icon,
      title,
      description,
      badge,
      showArrow = false,
      href,
      onClick,
      ...props
    },
    ref,
  ) => {
    const content = (
      <>
        {/* Icon */}
        <div className={cn(quickActionIconVariants({ variant, size }))}>
          <span
            className={cn(
              size === "sm" ? "size-4" : size === "lg" ? "size-6" : "size-5",
            )}
          >
            {icon}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-x-2">
            <h3
              className={cn(
                "font-medium text-foreground",
                size === "sm" ? "text-sm" : "text-base",
              )}
            >
              {title}
            </h3>
            {badge}
          </div>
          {description && (
            <p
              className={cn(
                "mt-0.5 text-muted-foreground",
                size === "sm" ? "text-xs" : "text-sm",
              )}
            >
              {description}
            </p>
          )}
        </div>

        {/* Arrow */}
        {showArrow && (
          <ChevronRightIcon
            className={cn(
              "shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1",
              size === "sm" ? "size-4" : "size-5",
            )}
          />
        )}
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(quickActionCardVariants({ variant, size }), className)}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    if (onClick) {
      const { onCopy, onCut, onPaste, ...buttonSafeProps } = props as React.HTMLAttributes<HTMLDivElement> & {
        onCopy?: unknown;
        onCut?: unknown;
        onPaste?: unknown;
      };
      void onCopy; void onCut; void onPaste;
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          onClick={onClick}
          className={cn(quickActionCardVariants({ variant, size }), className)}
          {...(buttonSafeProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(quickActionCardVariants({ variant, size }), className)}
        {...props}
      >
        {content}
      </div>
    );
  },
);
QuickActionCard.displayName = "QuickActionCard";

// Quick Action Grid
export interface QuickActionGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
}

export const QuickActionGrid = forwardRef<HTMLDivElement, QuickActionGridProps>(
  ({ className, columns = 2, children, ...props }, ref) => {
    const columnClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    };

    return (
      <div
        ref={ref}
        className={cn("grid gap-4", columnClasses[columns], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
QuickActionGrid.displayName = "QuickActionGrid";

// Mini Quick Action Card (icon only with tooltip)
export interface MiniQuickActionCardProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export const MiniQuickActionCard = forwardRef<
  HTMLButtonElement,
  MiniQuickActionCardProps
>(({ className, icon, label, onClick, active = false, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      title={label}
      className={cn(
        "flex flex-col items-center gap-y-1 rounded-lg p-3 transition-colors",
        "hover:bg-muted",
        active && "bg-primary/10 text-primary",
        className,
      )}
      {...props}
    >
      <div className="size-6">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
});
MiniQuickActionCard.displayName = "MiniQuickActionCard";

// Horizontal Quick Action List
export interface QuickActionListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<{
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    href?: string;
  }>;
}

export const QuickActionList = forwardRef<HTMLDivElement, QuickActionListProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2",
          className,
        )}
        {...props}
      >
        {items.map((item) => {
          const ItemComponent = item.href ? "a" : "button";
          return (
            <ItemComponent
              key={item.label}
              href={item.href}
              onClick={item.onClick}
              className="flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <span className="size-4">{item.icon}</span>
              {item.label}
            </ItemComponent>
          );
        })}
      </div>
    );
  },
);
QuickActionList.displayName = "QuickActionList";
