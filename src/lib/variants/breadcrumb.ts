import { cva } from "class-variance-authority";

export const breadcrumbVariants = cva(
  "flex items-center",
  {
    variants: {
      size: {
        sm: "gap-x-1 text-xs",
        md: "gap-x-2 text-sm",
        lg: "gap-x-3 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const breadcrumbItemVariants = cva(
  "inline-flex items-center transition-colors",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:text-foreground",
        current: "font-medium text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
