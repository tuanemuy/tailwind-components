import { cva } from "class-variance-authority";

export const linkVariants = cva(
  "inline-flex items-center gap-x-1 transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50 rounded",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80 underline-offset-4 hover:underline",
        muted: "text-muted-foreground hover:text-foreground",
        nav: "text-foreground hover:text-primary",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
