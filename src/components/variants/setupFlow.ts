import { cva } from "class-variance-authority";

export const setupFlowVariants = cva("", {
  variants: {
    variant: {
      list: "space-y-3",
      timeline: "relative",
      accordion:
        "divide-y divide-border rounded-lg border border-border overflow-hidden",
      card: "grid gap-4",
    },
    columns: {
      1: "",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-2 lg:grid-cols-3",
    },
  },
  defaultVariants: {
    variant: "list",
    columns: 1,
  },
});

export const setupFlowStepVariants = cva("relative flex items-start gap-x-4", {
  variants: {
    variant: {
      list: "rounded-lg border border-border p-4",
      timeline: "pb-8 last:pb-0",
      accordion: "p-4",
      card: "rounded-lg border border-border p-4 flex-col gap-y-3",
    },
    status: {
      pending: "opacity-70",
      current: "",
      completed: "",
    },
  },
  defaultVariants: {
    variant: "list",
    status: "pending",
  },
});

export const setupFlowIndicatorVariants = cva(
  "flex shrink-0 items-center justify-center rounded-full font-medium",
  {
    variants: {
      status: {
        pending: "bg-muted text-muted-foreground",
        current: "bg-primary text-primary-foreground",
        completed: "bg-success text-success-foreground",
      },
      size: {
        sm: "size-6 text-xs",
        md: "size-8 text-sm",
        lg: "size-10 text-base",
      },
    },
    defaultVariants: {
      status: "pending",
      size: "md",
    },
  },
);

export const onboardingChecklistVariants = cva(
  "rounded-lg border border-border overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-card",
        elevated: "bg-card shadow-md",
        outlined: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const onboardingChecklistItemVariants = cva(
  "flex items-center gap-x-3 px-4 py-3 transition-colors",
  {
    variants: {
      status: {
        pending: "hover:bg-muted/50",
        completed: "bg-muted/30",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  },
);
