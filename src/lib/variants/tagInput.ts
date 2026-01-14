import { cva } from "class-variance-authority";

export const tagInputContainerVariants = cva(
  "flex flex-wrap items-center gap-1.5 rounded-lg border border-border bg-background transition-colors focus-within:ring-2 focus-within:ring-ring",
  {
    variants: {
      size: {
        sm: "min-h-8 px-2 py-1 text-xs",
        md: "min-h-10 px-3 py-1.5 text-sm",
        lg: "min-h-12 px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const tagVariants = cva(
  "inline-flex items-center gap-x-1 rounded-md bg-muted px-2 py-0.5 font-medium text-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-xs",
        lg: "text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
