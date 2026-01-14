import { cva } from "class-variance-authority";

export const quickActionCardVariants = cva(
  "group relative flex cursor-pointer items-center gap-x-4 rounded-lg border p-4 transition-all",
  {
    variants: {
      variant: {
        default: "border-border bg-card hover:border-primary hover:bg-muted/50",
        primary: "border-primary/50 bg-primary/5 hover:bg-primary/10",
        ghost: "border-transparent bg-transparent hover:bg-muted",
        outlined: "border-border bg-transparent hover:bg-muted/50",
      },
      size: {
        sm: "p-3 gap-x-3",
        md: "p-4 gap-x-4",
        lg: "p-5 gap-x-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export const quickActionIconVariants = cva(
  "flex shrink-0 items-center justify-center rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground",
        primary: "bg-primary text-primary-foreground",
        ghost: "bg-transparent text-muted-foreground group-hover:text-primary",
        outlined: "border-2 border-current text-primary",
      },
      size: {
        sm: "size-9",
        md: "size-11",
        lg: "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export const quickActionBarVariants = cva(
  "fixed z-50 flex items-center gap-x-2 rounded-full border shadow-lg px-4 py-2 bg-card",
  {
    variants: {
      position: {
        bottom: "bottom-4 left-1/2 -translate-x-1/2",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
      },
      size: {
        sm: "px-3 py-1.5 gap-x-1.5",
        md: "px-4 py-2 gap-x-2",
        lg: "px-5 py-3 gap-x-3",
      },
    },
    defaultVariants: {
      position: "bottom",
      size: "md",
    },
  }
);
