import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-x-2 font-medium rounded-lg transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-2 focus:ring-secondary/50",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-accent/50",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus:ring-2 focus:ring-destructive/50",
        outline:
          "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring/50",
      },
      size: {
        xs: "text-xs py-1.5 px-2.5",
        sm: "text-sm py-2 px-3",
        md: "text-sm py-2.5 px-4",
        lg: "text-base py-3 px-5",
        xl: "text-lg py-3.5 px-6",
        icon: "size-9 p-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
