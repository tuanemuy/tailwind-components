import { cva } from "class-variance-authority";

export const titleBarVariants = cva(
  "flex items-center justify-between gap-x-4",
  {
    variants: {
      variant: {
        default: "",
        bordered: "border-b border-border pb-4",
        card: "bg-card rounded-lg p-4 border border-border",
      },
      size: {
        sm: "py-2",
        md: "py-4",
        lg: "py-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export const titleBarTitleVariants = cva(
  "font-semibold text-foreground",
  {
    variants: {
      size: {
        sm: "text-base",
        md: "text-lg",
        lg: "text-2xl",
        xl: "text-3xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const titleBarSubtitleVariants = cva(
  "text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-xs mt-0.5",
        md: "text-sm mt-1",
        lg: "text-base mt-1",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
