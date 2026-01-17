import { cva } from "class-variance-authority";

export const comboBoxTriggerVariants = cva(
  "inline-flex w-full items-center justify-between gap-x-2 rounded-lg border border-border bg-background transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
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

export const comboBoxContentVariants = cva(
  "absolute z-50 w-full rounded-lg border border-border bg-card shadow-lg",
  {
    variants: {
      size: {
        sm: "mt-1 max-h-48",
        md: "mt-1 max-h-60",
        lg: "mt-2 max-h-72",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const comboBoxItemVariants = cva(
  "flex cursor-pointer items-center gap-x-2 transition-colors",
  {
    variants: {
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      },
      selected: {
        true: "bg-primary/10 text-primary",
        false: "text-foreground hover:bg-accent",
      },
      highlighted: {
        true: "bg-accent",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      selected: false,
      highlighted: false,
    },
  },
);
