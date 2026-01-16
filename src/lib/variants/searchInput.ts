import { cva } from "class-variance-authority";

export const searchInputVariants = cva(
  "flex items-center gap-x-2 rounded-lg border border-border bg-background transition-colors focus-within:ring-2 focus-within:ring-ring",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
