"use client";

import type { VariantProps } from "class-variance-authority";
import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useState,
} from "react";
import { ChevronDownIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  accordionContentVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionVariants,
} from "@/lib/variants/accordion";

type AccordionVariant = "default" | "bordered" | "separated";
type AccordionSize = "sm" | "md" | "lg";
type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  variant: AccordionVariant;
  size: AccordionSize;
  type: AccordionType;
  value: string[];
  onValueChange: (value: string[]) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion components must be used within an Accordion provider",
    );
  }
  return context;
};

// Accordion Root
export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  type?: AccordionType;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  size?: AccordionSize;
  collapsible?: boolean;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      variant = "default",
      type = "single",
      value: controlledValue,
      defaultValue = [],
      onValueChange,
      size = "md",
      collapsible = true,
      children,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    // Pass variant to children
    const childrenWithProps = Children.map(children, (child) => {
      if (isValidElement(child)) {
        return cloneElement(
          child as React.ReactElement<{ variant?: AccordionVariant }>,
          {
            variant: variant ?? "default",
          },
        );
      }
      return child;
    });

    return (
      <AccordionContext.Provider
        value={{
          variant: variant ?? "default",
          size,
          type,
          value,
          onValueChange: (newValue) => {
            if (!isControlled) {
              setUncontrolledValue(newValue);
            }
            onValueChange?.(newValue);
          },
        }}
      >
        <div
          ref={ref}
          className={cn(accordionVariants({ variant }), className)}
          {...props}
        >
          {childrenWithProps}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

// Accordion Item
interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null,
);

const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      "AccordionTrigger and AccordionContent must be used within AccordionItem",
    );
  }
  return context;
};

export interface AccordionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  variant?: AccordionVariant;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    { className, value, disabled = false, variant, children, ...props },
    ref,
  ) => {
    const { value: selectedValues, variant: contextVariant } =
      useAccordionContext();
    const isOpen = selectedValues.includes(value);
    const actualVariant = variant ?? contextVariant;

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          data-disabled={disabled || undefined}
          className={cn(
            accordionItemVariants({ variant: actualVariant }),
            disabled && "opacity-50",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

// Accordion Trigger
export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof accordionTriggerVariants> {
  icon?: React.ReactNode;
}

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, size: propSize, icon, children, ...props }, ref) => {
  const {
    value: selectedValues,
    size: contextSize,
    onValueChange,
  } = useAccordionContext();
  const { value, isOpen } = useAccordionItemContext();
  const size = propSize ?? contextSize;

  const handleClick = () => {
    if (isOpen) {
      onValueChange(selectedValues.filter((v) => v !== value));
    } else {
      onValueChange([...selectedValues.filter((v) => v !== value), value]);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={isOpen}
      className={cn(accordionTriggerVariants({ size }), className)}
      onClick={handleClick}
      {...props}
    >
      {icon && <span className="me-3">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
      <ChevronDownIcon
        className={cn(
          "size-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180",
        )}
      />
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

// Accordion Content
export interface AccordionContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionContentVariants> {}

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, size: propSize, children, ...props }, ref) => {
  const { size: contextSize } = useAccordionContext();
  const { isOpen } = useAccordionItemContext();
  const size = propSize ?? contextSize;

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn(accordionContentVariants({ size }), className)}
      {...props}
    >
      {children}
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";
