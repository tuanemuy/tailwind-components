import { cva } from "class-variance-authority";

export const alertVariants = cva(
  "relative flex w-full items-start gap-x-3 rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-foreground",
        info: "border-info/50 bg-info/10 text-info",
        success: "border-success/50 bg-success/10 text-success",
        warning: "border-warning/50 bg-warning/10 text-warning",
        error: "border-destructive/50 bg-destructive/10 text-destructive",
      },
      size: {
        sm: "p-3 text-xs",
        md: "p-4 text-sm",
        lg: "p-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const alertIconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
