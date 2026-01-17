import { cva } from "class-variance-authority";

export const switchVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
      checked: {
        true: "bg-primary",
        false: "bg-input",
      },
    },
    defaultVariants: {
      size: "md",
      checked: false,
    },
  },
);

export const switchThumbVariants = cva(
  "pointer-events-none inline-block rounded-full bg-background shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
      checked: {
        true: "",
        false: "translate-x-0",
      },
    },
    compoundVariants: [
      { size: "sm", checked: true, className: "translate-x-4" },
      { size: "md", checked: true, className: "translate-x-5" },
      { size: "lg", checked: true, className: "translate-x-7" },
    ],
    defaultVariants: {
      size: "md",
      checked: false,
    },
  },
);
