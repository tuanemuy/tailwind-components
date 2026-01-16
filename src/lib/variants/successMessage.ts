import { cva } from "class-variance-authority";

export const successMessageVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      variant: {
        default: "",
        card: "bg-card rounded-lg border border-border p-8",
        fullscreen: "min-h-screen p-8",
      },
      size: {
        sm: "gap-y-3 p-4",
        md: "gap-y-4 p-6",
        lg: "gap-y-6 p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const successMessageIconVariants = cva(
  "flex items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        success: "bg-success/10 text-success",
        error: "bg-destructive/10 text-destructive",
        warning: "bg-warning/10 text-warning",
        info: "bg-info/10 text-info",
      },
      size: {
        sm: "size-12",
        md: "size-16",
        lg: "size-20",
      },
    },
    defaultVariants: {
      variant: "success",
      size: "md",
    },
  },
);

export const successMessageTitleVariants = cva(
  "font-semibold text-foreground",
  {
    variants: {
      size: {
        sm: "text-lg",
        md: "text-xl",
        lg: "text-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const successMessageDescriptionVariants = cva(
  "text-muted-foreground max-w-md",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
