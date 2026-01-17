import { cva } from "class-variance-authority";

// Kanban Board variants
export const kanbanBoardVariants = cva("flex gap-4 overflow-x-auto pb-4", {
  variants: {
    variant: {
      default: "",
      compact: "gap-2",
      spacious: "gap-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// Kanban Column variants
export const kanbanColumnVariants = cva(
  "flex flex-col min-w-[280px] max-w-[320px] rounded-xl bg-muted/50",
  {
    variants: {
      variant: {
        default: "",
        bordered: "border border-border",
        minimal: "bg-transparent",
      },
      size: {
        sm: "min-w-[240px] max-w-[280px]",
        md: "min-w-[280px] max-w-[320px]",
        lg: "min-w-[320px] max-w-[380px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const kanbanColumnHeaderVariants = cva(
  "flex items-center justify-between p-3 rounded-t-xl",
  {
    variants: {
      variant: {
        default: "bg-muted/80",
        bordered: "bg-muted/80",
        minimal: "",
        transparent: "",
        colored: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const kanbanColumnContentVariants = cva(
  "flex-1 p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-250px)]",
  {
    variants: {
      variant: {
        default: "",
        bordered: "",
        minimal: "",
        compact: "space-y-1 p-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Kanban Card variants
export const kanbanCardVariants = cva(
  "rounded-lg border border-border bg-card p-3 shadow-sm cursor-grab transition-all hover:shadow-md active:cursor-grabbing",
  {
    variants: {
      variant: {
        default: "",
        compact: "p-2",
        detailed: "p-4",
      },
      priority: {
        low: "border-l-4 border-l-success",
        medium: "border-l-4 border-l-warning",
        high: "border-l-4 border-l-destructive",
        none: "",
      },
      dragging: {
        true: "opacity-50 rotate-2 scale-105",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      priority: "none",
      dragging: false,
    },
  },
);

// Kanban Header variants
export const kanbanHeaderVariants = cva(
  "flex items-center justify-between p-4 border-b border-border",
  {
    variants: {
      variant: {
        default: "",
        sticky: "sticky top-0 bg-background z-10",
        minimal: "p-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Column color indicator
export const columnColorVariants = cva("size-3 rounded-full", {
  variants: {
    color: {
      gray: "bg-gray-500",
      red: "bg-red-500",
      orange: "bg-orange-500",
      yellow: "bg-yellow-500",
      green: "bg-green-500",
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      pink: "bg-pink-500",
    },
  },
  defaultVariants: {
    color: "gray",
  },
});

// Tag/Label variants for Kanban cards
export const kanbanTagVariants = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      color: {
        gray: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
        red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
        orange:
          "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
        yellow:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
        green:
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        purple:
          "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
        pink: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
      },
    },
    defaultVariants: {
      color: "gray",
    },
  },
);
