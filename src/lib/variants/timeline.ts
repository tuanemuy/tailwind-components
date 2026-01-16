import { cva } from "class-variance-authority";

export const timelineVariants = cva("relative", {
  variants: {
    variant: {
      default: "",
      compact: "space-y-2",
      spaced: "space-y-6",
    },
    orientation: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row items-start overflow-x-auto",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "vertical",
  },
});

export const timelineItemVariants = cva("relative flex", {
  variants: {
    variant: {
      default: "pb-8 last:pb-0",
      compact: "pb-4 last:pb-0",
      card: "pb-8 last:pb-0",
    },
    orientation: {
      vertical: "flex-row gap-x-4",
      horizontal: "flex-col items-center gap-y-2 min-w-[150px]",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "vertical",
  },
});

export const timelineConnectorVariants = cva("absolute bg-border", {
  variants: {
    orientation: {
      vertical: "left-4 top-8 bottom-0 w-px -translate-x-1/2",
      horizontal: "top-4 left-8 right-0 h-px",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export const timelineDotVariants = cva(
  "relative z-10 flex shrink-0 items-center justify-center rounded-full ring-4 ring-background",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary text-primary-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        error: "bg-destructive text-destructive-foreground",
        info: "bg-info text-info-foreground",
      },
      size: {
        sm: "size-6",
        md: "size-8",
        lg: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
