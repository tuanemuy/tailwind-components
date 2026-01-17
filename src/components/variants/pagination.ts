import { cva } from "class-variance-authority";

export const paginationVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "gap-x-1",
      md: "gap-x-2",
      lg: "gap-x-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const paginationItemVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: [
          "text-muted-foreground hover:bg-accent hover:text-foreground",
        ],
        outline: [
          "border border-border text-muted-foreground hover:bg-accent hover:text-foreground",
        ],
        ghost: ["text-muted-foreground hover:bg-accent hover:text-foreground"],
      },
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-9 w-9 text-sm",
        lg: "h-10 w-10 text-base",
      },
      active: {
        true: "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      active: false,
    },
  },
);
