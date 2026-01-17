import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "block w-full rounded-lg border bg-background text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input focus:border-ring focus:ring-ring/50",
        error:
          "border-destructive focus:border-destructive focus:ring-destructive/50",
      },
      inputSize: {
        sm: "text-sm py-2 px-3",
        md: "text-sm py-2.5 px-4",
        lg: "text-base py-3 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  },
);

export const textareaVariants = cva(
  "block w-full rounded-lg border bg-background text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default: "border-input focus:border-ring focus:ring-ring/50",
        error:
          "border-destructive focus:border-destructive focus:ring-destructive/50",
      },
      textareaSize: {
        sm: "text-sm py-2 px-3",
        md: "text-sm py-2.5 px-4",
        lg: "text-base py-3 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "md",
    },
  },
);
