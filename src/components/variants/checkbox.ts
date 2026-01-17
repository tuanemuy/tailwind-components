import { cva } from "class-variance-authority";

export const checkboxVariants = cva(
  "shrink-0 border rounded bg-background text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const radioVariants = cva(
  "shrink-0 border rounded-full bg-background text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
