import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, optional, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "block text-sm font-medium text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ms-1 text-destructive" aria-hidden="true">
          *
        </span>
      )}
      {optional && (
        <span className="ms-1 text-muted-foreground font-normal">
          (optional)
        </span>
      )}
    </label>
  ),
);
Label.displayName = "Label";
