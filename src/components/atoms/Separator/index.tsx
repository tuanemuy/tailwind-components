import { forwardRef } from "react";
import { cn } from "@/components/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <hr
      ref={ref}
      aria-orientation={orientation}
      aria-hidden={decorative}
      className={cn(
        "shrink-0 border-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = "Separator";
