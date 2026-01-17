"use client";

import type { VariantProps } from "class-variance-authority";
import { createContext, forwardRef, useContext, useState } from "react";
import { cn } from "@/components/utils";
import {
  tabsContentVariants,
  tabsListVariants,
  tabsTriggerVariants,
} from "@/components/variants/tabs";

type TabsVariant =
  | "default"
  | "bordered"
  | "segment"
  | "pills"
  | "underline"
  | "vertical";

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
export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Alias for onValueChange */
  onChange?: (value: string) => void;
  variant?: TabsVariant;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onValueChange,
      onChange: onChangeProp,
      variant = "default",
      children,
      ...props
    },
    ref,
  ) => {
    const handleValueChange = onValueChange ?? onChangeProp;
    const [uncontrolledValue, setUncontrolledValue] = useState(
      defaultValue ?? "",
    );

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleChange = (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      handleValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ value, onChange: handleChange, variant }}>
        <div
          ref={ref}
          className={cn(
            variant === "vertical" ? "flex gap-x-4" : "",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
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
  },
);
TabsList.displayName = "TabsList";

// TabsTrigger
export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
  value: string;
  icon?: React.ReactNode;
  /** Alternative to children - renders as button text */
  label?: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, size, icon, label, children, ...props }, ref) => {
    const { value: selectedValue, onChange, variant } = useTabsContext();
    const content = children ?? label;
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
        {content}
      </button>
    );
  },
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
        data-state={isActive ? "active" : "inactive"}
        className={cn(tabsContentVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsContent.displayName = "TabsContent";

// Tab alias for TabsTrigger (for backwards compatibility)
export const Tab = TabsTrigger;
export type TabProps = TabsTriggerProps;
