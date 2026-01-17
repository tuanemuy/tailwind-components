import { cva } from "class-variance-authority";

export const stepperVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "items-start",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const stepVariants = cva("flex items-center", {
  variants: {
    orientation: {
      horizontal: "flex-1",
      vertical: "gap-x-3",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const stepIndicatorVariants = cva(
  "flex items-center justify-center rounded-full font-medium transition-colors",
  {
    variants: {
      size: {
        sm: "h-6 w-6 text-xs",
        md: "h-8 w-8 text-sm",
        lg: "h-10 w-10 text-base",
      },
      status: {
        completed: "bg-primary text-primary-foreground",
        current: "border-2 border-primary bg-background text-primary",
        upcoming: "border-2 border-border bg-background text-muted-foreground",
        error: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      size: "md",
      status: "upcoming",
    },
  },
);

export const stepConnectorVariants = cva("transition-colors", {
  variants: {
    orientation: {
      horizontal: "mx-2 h-0.5 flex-1",
      vertical: "ms-4 mt-2 w-0.5 min-h-8",
    },
    completed: {
      true: "bg-primary",
      false: "bg-border",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    completed: false,
  },
});
