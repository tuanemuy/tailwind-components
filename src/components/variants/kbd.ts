import { cva } from "class-variance-authority";

export const kbdVariants = cva(
  "inline-flex items-center justify-center font-mono font-medium rounded border",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground border-border",
        outline: "bg-transparent text-foreground border-border",
        filled: "bg-secondary text-secondary-foreground border-secondary",
      },
      size: {
        xs: "px-1 py-0.5 text-[10px] min-w-4",
        sm: "px-1.5 py-0.5 text-xs min-w-5",
        md: "px-2 py-1 text-sm min-w-6",
        lg: "px-2.5 py-1.5 text-base min-w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);
