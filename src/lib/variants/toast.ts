import { cva } from "class-variance-authority";

export const toastVariants = cva(
  "pointer-events-auto flex w-full max-w-sm items-start gap-x-3 rounded-lg border p-4 shadow-lg",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-foreground",
        info: "border-info/50 bg-info/10 text-info",
        success: "border-success/50 bg-success/10 text-success",
        warning: "border-warning/50 bg-warning/10 text-warning",
        error: "border-destructive/50 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const toastContainerVariants = cva(
  "fixed z-50 flex flex-col gap-y-2 pointer-events-none",
  {
    variants: {
      position: {
        "top-left": "top-4 left-4",
        "top-center": "top-4 left-1/2 -translate-x-1/2",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
        "bottom-right": "bottom-4 right-4",
      },
    },
    defaultVariants: {
      position: "bottom-right",
    },
  }
);
