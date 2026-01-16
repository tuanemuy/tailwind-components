import { cva } from "class-variance-authority";

export const bannerVariants = cva(
  "relative flex w-full items-center gap-x-4 px-4 py-3",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground",
        primary: "bg-primary text-primary-foreground",
        info: "bg-info text-info-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        error: "bg-destructive text-destructive-foreground",
        gradient:
          "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
      },
      size: {
        sm: "py-2 text-xs",
        md: "py-3 text-sm",
        lg: "py-4 text-base",
      },
      position: {
        top: "",
        bottom: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      position: "top",
    },
  },
);

export const floatingBannerVariants = cva(
  "fixed z-50 mx-auto flex items-center gap-x-4 rounded-lg border shadow-lg px-4 py-3",
  {
    variants: {
      variant: {
        default: "bg-card border-border text-foreground",
        primary: "bg-primary border-primary text-primary-foreground",
        dark: "bg-foreground border-foreground/80 text-background",
      },
      position: {
        top: "top-4 left-1/2 -translate-x-1/2",
        bottom: "bottom-4 left-1/2 -translate-x-1/2",
        "top-left": "top-4 left-4",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-right": "bottom-4 right-4",
      },
      size: {
        sm: "py-2 text-xs max-w-sm",
        md: "py-3 text-sm max-w-md",
        lg: "py-4 text-base max-w-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "bottom",
      size: "md",
    },
  },
);
