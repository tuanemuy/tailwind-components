"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/components/utils";
import { inlineSelectContainerVariants } from "@/components/variants";
import { Select, type SelectOption, type SelectProps } from "../Select";

export interface InlineSelectProps<T = string>
  extends Omit<SelectProps<T>, "variant"> {
  /** Label displayed before the select */
  label?: string;
  /** Label position */
  labelPosition?: "before" | "after";
  /** Custom label element */
  labelElement?: ReactNode;
}

export const InlineSelect = forwardRef<HTMLDivElement, InlineSelectProps>(
  (
    {
      className,
      label,
      labelPosition = "before",
      labelElement,
      size = "md",
      ...props
    },
    ref
  ) => {
    const labelContent = labelElement || (
      <span className="text-foreground whitespace-nowrap">{label}</span>
    );

    return (
      <div
        ref={ref}
        className={cn(inlineSelectContainerVariants({ size }), className)}
      >
        {label && labelPosition === "before" && labelContent}
        <Select
          {...(props as SelectProps)}
          size={size}
          variant="minimal"
        />
        {label && labelPosition === "after" && labelContent}
      </div>
    );
  }
) as <T = string>(
  props: InlineSelectProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;
(InlineSelect as React.FC).displayName = "InlineSelect";

export type { SelectOption };
