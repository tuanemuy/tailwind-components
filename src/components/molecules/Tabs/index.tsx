"use client";

import { forwardRef, createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import {
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
} from "@/lib/variants/tabs";
import type { VariantProps } from "class-variance-authority";

type TabsVariant = "default" | "bordered" | "segment" | "pills" | "underline" | "vertical";

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  variant: TabsVariant;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider");
  }
  return context;
};

// Tabs Root
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onValueChange,
      variant = "default",
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const onChange = (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ value, onChange, variant }}>
        <div
          ref={ref}
          className={cn(
            variant === "vertical" ? "flex gap-x-4" : "",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

// TabsList
export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useTabsContext();

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(tabsListVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsList.displayName = "TabsList";

// TabsTrigger
export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
  value: string;
  icon?: React.ReactNode;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, size, icon, children, ...props }, ref) => {
    const { value: selectedValue, onChange, variant } = useTabsContext();
    const isActive = selectedValue === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        className={cn(tabsTriggerVariants({ variant, size }), className)}
        onClick={() => onChange(value)}
        {...props}
      >
        {icon && <span className="me-2 size-4">{icon}</span>}
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

// TabsContent
export interface TabsContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsContentVariants> {
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, variant } = useTabsContext();
    const isActive = selectedValue === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        data-state={isActive ? "active" : "inactive"}
        className={cn(tabsContentVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";
