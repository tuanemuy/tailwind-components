import { cva } from "class-variance-authority";

/**
 * Select trigger (button) variants
 */
export const selectTriggerVariants = cva(
  "relative flex items-center justify-between text-start transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "w-full rounded-lg border bg-background hover:border-ring focus:ring-2 focus:ring-ring/50",
        minimal:
          "inline-flex shrink-0 gap-x-1.5 rounded-lg border-transparent hover:bg-accent focus:bg-accent",
        ghost:
          "inline-flex shrink-0 gap-x-1.5 rounded-lg border-transparent text-muted-foreground hover:bg-accent hover:text-foreground focus:bg-accent",
        status:
          "inline-flex items-center gap-x-2 rounded-md bg-accent px-2 py-1 text-sm hover:bg-accent/80 focus:ring-2 focus:ring-ring/50",
      },
      size: {
        xs: "py-1.5 px-2 text-xs",
        sm: "py-1.5 px-2.5 text-sm",
        md: "py-2.5 px-3 text-sm",
        lg: "py-3 px-4 text-base",
      },
      error: {
        true: "border-destructive focus:ring-destructive/50",
        false: "border-border",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        error: false,
        className: "hover:border-ring",
      },
      {
        variant: "default",
        error: true,
        className: "hover:border-destructive",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      error: false,
    },
  }
);

/**
 * Select dropdown variants
 */
export const selectDropdownVariants = cva(
  "fixed z-[9999] max-h-60 overflow-auto rounded-lg border border-border bg-card p-1 shadow-lg",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Select option variants
 */
export const selectOptionVariants = cva(
  "flex cursor-pointer items-center rounded-md transition-colors focus:outline-none",
  {
    variants: {
      size: {
        xs: "py-1 px-2 text-xs gap-x-2",
        sm: "py-1.5 px-2 text-sm gap-x-2",
        md: "py-2 px-3 text-sm gap-x-3",
        lg: "py-2.5 px-4 text-base gap-x-3",
      },
      selected: {
        true: "bg-accent",
        false: "",
      },
      disabled: {
        true: "cursor-not-allowed text-muted-foreground",
        false: "text-foreground hover:bg-accent",
      },
    },
    defaultVariants: {
      size: "md",
      selected: false,
      disabled: false,
    },
  }
);

/**
 * Color indicator (for status select) variants
 */
export const selectColorIndicatorVariants = cva(
  "block shrink-0 rounded-full",
  {
    variants: {
      size: {
        xs: "size-2",
        sm: "h-3 w-1",
        md: "h-3 w-1",
        lg: "h-4 w-1.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Multi-select tag variants
 */
export const multiSelectTagVariants = cva(
  "inline-flex items-center gap-x-1 rounded-full border bg-background transition-colors",
  {
    variants: {
      size: {
        xs: "py-0.5 px-1.5 text-xs",
        sm: "py-0.5 px-2 text-xs",
        md: "py-1 px-2.5 text-sm",
        lg: "py-1.5 px-3 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Multi-select tag remove button variants
 */
export const multiSelectTagRemoveVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground focus:outline-none",
  {
    variants: {
      size: {
        xs: "size-3",
        sm: "size-4",
        md: "size-5",
        lg: "size-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Multi-select container variants
 */
export const multiSelectContainerVariants = cva(
  "relative flex flex-wrap items-center gap-1 rounded-lg border bg-background transition-colors focus-within:ring-2 focus-within:ring-ring/50",
  {
    variants: {
      size: {
        xs: "min-h-8 py-0.5 px-1.5",
        sm: "min-h-9 py-1 px-2",
        md: "min-h-10 py-1.5 px-2.5",
        lg: "min-h-12 py-2 px-3",
      },
      error: {
        true: "border-destructive focus-within:ring-destructive/50",
        false: "border-border hover:border-ring",
      },
    },
    defaultVariants: {
      size: "md",
      error: false,
    },
  }
);

/**
 * Inline select container variants
 */
export const inlineSelectContainerVariants = cva(
  "inline-flex items-center gap-x-2",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
