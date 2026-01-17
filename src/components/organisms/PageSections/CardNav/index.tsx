"use client";

import type { VariantProps } from "class-variance-authority";
import { createContext, forwardRef, useContext, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { cn } from "@/lib/utils";
import {
  cardNavItemVariants,
  cardNavVariants,
} from "@/lib/variants/sectionNav";

type CardNavVariant = "default" | "outlined" | "filled";

// Context for controlled state
interface CardNavContextValue {
  activeValue?: string;
  onValueChange?: (value: string) => void;
  variant: CardNavVariant;
}

const CardNavContext = createContext<CardNavContextValue | null>(null);

export interface CardNavProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardNavVariants> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: CardNavVariant;
  items?: Array<{
    value: string;
    icon?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    badge?: React.ReactNode;
    disabled?: boolean;
  }>;
}

export const CardNav = forwardRef<HTMLDivElement, CardNavProps>(
  (
    {
      className,
      columns = "auto",
      gap = "md",
      variant = "default",
      value,
      defaultValue,
      onValueChange,
      items,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeValue = value ?? internalValue;

    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <CardNavContext.Provider
        value={{
          activeValue,
          onValueChange: handleValueChange,
          variant: variant as CardNavVariant,
        }}
      >
        {/* biome-ignore lint/a11y/useSemanticElements: div with role="navigation" is used for styling flexibility */}
        <div
          ref={ref}
          role="navigation"
          className={cn(cardNavVariants({ columns, gap }), className)}
          {...props}
        >
          {items
            ? items.map((item) => (
                <CardNavItem
                  key={item.value}
                  value={item.value}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  badge={item.badge}
                  disabled={item.disabled}
                />
              ))
            : children}
        </div>
      </CardNavContext.Provider>
    );
  },
);
CardNav.displayName = "CardNav";

// CardNavItem component
export interface CardNavItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title">,
    VariantProps<typeof cardNavItemVariants> {
  value: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
}

export const CardNavItem = forwardRef<HTMLButtonElement, CardNavItemProps>(
  (
    { className, value, icon, title, description, badge, disabled, ...props },
    ref,
  ) => {
    const context = useContext(CardNavContext);
    if (!context) {
      throw new Error("CardNavItem must be used within CardNav");
    }

    const { activeValue, onValueChange, variant } = context;
    const isActive = activeValue === value;

    return (
      <button
        ref={ref}
        type="button"
        role="option"
        aria-selected={isActive}
        data-active={isActive}
        disabled={disabled}
        onClick={() => onValueChange?.(value)}
        className={cn(
          cardNavItemVariants({ variant, active: isActive }),
          className,
        )}
        {...props}
      >
        {badge && <div className="absolute right-3 top-3">{badge}</div>}
        {icon && <div className="mb-3 size-10 text-primary">{icon}</div>}
        <h4 className="font-medium text-foreground">{title}</h4>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </button>
    );
  },
);
CardNavItem.displayName = "CardNavItem";

// CardNavLink for routing
export interface CardNavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "title"> {
  active?: boolean;
  variant?: CardNavVariant;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
}

export const CardNavLink = forwardRef<HTMLAnchorElement, CardNavLinkProps>(
  (
    {
      className,
      active,
      variant = "default",
      icon,
      title,
      description,
      badge,
      ...props
    },
    ref,
  ) => {
    return (
      <a
        ref={ref}
        data-active={active}
        className={cn(cardNavItemVariants({ variant, active }), className)}
        {...props}
      >
        {badge && <div className="absolute right-3 top-3">{badge}</div>}
        {icon && <div className="mb-3 size-10 text-primary">{icon}</div>}
        <h4 className="font-medium text-foreground">{title}</h4>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </a>
    );
  },
);
CardNavLink.displayName = "CardNavLink";

// Horizontal card nav (for smaller displays)
export interface HorizontalCardNavProps extends Omit<CardNavProps, "columns"> {
  scrollable?: boolean;
}

export const HorizontalCardNav = forwardRef<
  HTMLDivElement,
  HorizontalCardNavProps
>(
  (
    {
      className,
      scrollable = false,
      items,
      value,
      defaultValue,
      onValueChange,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeValue = value ?? internalValue;

    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-4",
          scrollable && "overflow-x-auto pb-2",
          className,
        )}
        {...props}
      >
        {items?.map((item) => {
          const isActive = activeValue === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => handleValueChange(item.value)}
              disabled={item.disabled}
              className={cn(
                "flex flex-col items-center gap-y-2 rounded-lg border p-4 transition-all min-w-[120px]",
                variant === "default" &&
                  "border-border bg-card hover:border-primary",
                variant === "outlined" &&
                  "border-border bg-transparent hover:bg-muted/50",
                variant === "filled" &&
                  "border-transparent bg-muted hover:bg-muted/80",
                isActive &&
                  "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2",
              )}
            >
              {item.icon && (
                <div className="size-8 text-primary">{item.icon}</div>
              )}
              <span className="text-sm font-medium text-foreground">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    );
  },
);
HorizontalCardNav.displayName = "HorizontalCardNav";

// Feature selection cards (commonly used for onboarding)
export interface FeatureSelectionProps {
  title?: string;
  description?: string;
  items: Array<{
    value: string;
    icon: React.ReactNode;
    title: string;
    description?: string;
    popular?: boolean;
  }>;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const FeatureSelection = forwardRef<
  HTMLDivElement,
  FeatureSelectionProps
>(({ title, description, items, value, onValueChange }, ref) => {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelect = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <div ref={ref} className="space-y-6">
      {(title || description) && (
        <div className="text-center">
          {title && (
            <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
          )}
          {description && (
            <p className="mt-2 text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const isSelected = selectedValue === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => handleSelect(item.value)}
              className={cn(
                "relative flex flex-col items-center rounded-xl border-2 p-6 text-center transition-all",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50",
              )}
            >
              {item.popular && (
                <Badge
                  variant="default"
                  size="sm"
                  className="absolute -top-2 right-4"
                >
                  Popular
                </Badge>
              )}
              <div
                className={cn(
                  "mb-4 size-12 rounded-lg p-2.5",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {item.icon}
              </div>
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              {item.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});
FeatureSelection.displayName = "FeatureSelection";
