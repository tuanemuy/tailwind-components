"use client";

import type { VariantProps } from "class-variance-authority";
import { createContext, forwardRef, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import {
  sectionNavItemVariants,
  sectionNavVariants,
} from "@/lib/variants/sectionNav";

type SectionNavVariant = "underline" | "pills" | "segment" | "bordered";
type SectionNavSize = "sm" | "md" | "lg";

// Context for controlled nav state
interface SectionNavContextValue {
  activeValue?: string;
  onValueChange?: (value: string) => void;
  variant: SectionNavVariant;
  size: SectionNavSize;
}

const SectionNavContext = createContext<SectionNavContextValue | null>(null);

export interface SectionNavProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionNavVariants> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: SectionNavSize;
  items?: Array<{
    value: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    disabled?: boolean;
  }>;
}

export const SectionNav = forwardRef<HTMLDivElement, SectionNavProps>(
  (
    {
      className,
      variant = "underline",
      orientation = "horizontal",
      size = "md",
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
      <SectionNavContext.Provider
        value={{
          activeValue,
          onValueChange: handleValueChange,
          variant: variant as SectionNavVariant,
          size: size as SectionNavSize,
        }}
      >
        <nav
          ref={ref}
          className={cn(
            sectionNavVariants({ variant, orientation }),
            className,
          )}
          {...props}
        >
          {items
            ? items.map((item) => (
                <SectionNavItem
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                >
                  {item.icon && (
                    <span className="mr-2 size-4">{item.icon}</span>
                  )}
                  {item.label}
                  {item.badge && <span className="ml-2">{item.badge}</span>}
                </SectionNavItem>
              ))
            : children}
        </nav>
      </SectionNavContext.Provider>
    );
  },
);
SectionNav.displayName = "SectionNav";

// SectionNavItem component
export interface SectionNavItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sectionNavItemVariants> {
  value: string;
  asChild?: boolean;
}

export const SectionNavItem = forwardRef<
  HTMLButtonElement,
  SectionNavItemProps
>(({ className, value, disabled, children, ...props }, ref) => {
  const context = useContext(SectionNavContext);
  if (!context) {
    throw new Error("SectionNavItem must be used within SectionNav");
  }

  const { activeValue, onValueChange, variant, size } = context;
  const isActive = activeValue === value;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isActive}
      data-active={isActive}
      disabled={disabled}
      onClick={() => onValueChange?.(value)}
      className={cn(sectionNavItemVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
});
SectionNavItem.displayName = "SectionNavItem";

// Link variant for routing
export interface SectionNavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  variant?: SectionNavVariant;
  size?: SectionNavSize;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export const SectionNavLink = forwardRef<
  HTMLAnchorElement,
  SectionNavLinkProps
>(
  (
    {
      className,
      active,
      variant = "underline",
      size = "md",
      icon,
      badge,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <a
        ref={ref}
        data-active={active}
        className={cn(sectionNavItemVariants({ variant, size }), className)}
        {...props}
      >
        {icon && <span className="mr-2 size-4">{icon}</span>}
        {children}
        {badge && <span className="ml-2">{badge}</span>}
      </a>
    );
  },
);
SectionNavLink.displayName = "SectionNavLink";

// Vertical navigation with header
export interface VerticalSectionNavProps
  extends Omit<SectionNavProps, "orientation"> {
  title?: string;
  description?: string;
}

export const VerticalSectionNav = forwardRef<
  HTMLDivElement,
  VerticalSectionNavProps
>(({ title, description, className, ...props }, ref) => {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div>
          {title && <h3 className="font-medium text-foreground">{title}</h3>}
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <SectionNav ref={ref} orientation="vertical" {...props} />
    </div>
  );
});
VerticalSectionNav.displayName = "VerticalSectionNav";
