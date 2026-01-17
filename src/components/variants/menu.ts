import { cva } from "class-variance-authority";

export const menuVariants = cva(
  "min-w-[180px] rounded-lg border border-border bg-card p-1 shadow-lg",
  {
    variants: {
      size: {
        sm: "min-w-[140px] text-xs",
        md: "min-w-[180px] text-sm",
        lg: "min-w-[220px] text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const menuItemVariants = cva(
  "flex w-full cursor-pointer items-center gap-x-2 rounded-md transition-colors focus:outline-none",
  {
    variants: {
      size: {
        sm: "px-2 py-1",
        md: "px-3 py-2",
        lg: "px-4 py-2.5",
      },
      variant: {
        default: "text-foreground hover:bg-accent focus:bg-accent",
        destructive:
          "text-destructive hover:bg-destructive/10 focus:bg-destructive/10",
      },
      disabled: {
        true: "pointer-events-none opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      disabled: false,
    },
  },
);

export const menuLabelVariants = cva("font-medium text-muted-foreground", {
  variants: {
    size: {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1.5 text-xs",
      lg: "px-4 py-2 text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
