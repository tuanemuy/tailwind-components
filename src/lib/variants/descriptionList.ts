import { cva } from "class-variance-authority";

export const descriptionListVariants = cva("", {
  variants: {
    variant: {
      default: "divide-y divide-border",
      grid: "grid gap-4",
      inline: "space-y-4",
      card: "bg-card rounded-lg border border-border overflow-hidden divide-y divide-border",
      stacked: "space-y-4",
    },
    columns: {
      1: "grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-2 lg:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    variant: "default",
    columns: 1,
  },
});

export const descriptionListItemVariants = cva("", {
  variants: {
    variant: {
      default: "flex flex-col py-3 sm:flex-row sm:items-center sm:gap-x-4",
      grid: "flex flex-col gap-1",
      inline: "flex items-center gap-x-3",
      horizontal: "flex items-center justify-between py-3",
      card: "p-4",
      stacked: "flex flex-col gap-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const descriptionTermVariants = cva("font-medium text-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    variant: {
      default: "sm:w-40 shrink-0",
      grid: "",
      inline: "",
      horizontal: "",
      card: "",
      stacked: "",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export const descriptionDetailsVariants = cva("text-muted-foreground", {
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
});
