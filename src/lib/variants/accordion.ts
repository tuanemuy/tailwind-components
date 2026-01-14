import { cva } from "class-variance-authority";

export const accordionVariants = cva(
  "w-full divide-y divide-border",
  {
    variants: {
      variant: {
        default: "",
        bordered: "rounded-lg border border-border",
        separated: "space-y-2 divide-y-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const accordionItemVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "",
        bordered: "first:rounded-t-lg last:rounded-b-lg",
        separated: "rounded-lg border border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between py-4 text-left font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      size: {
        sm: "px-3 py-3 text-sm",
        md: "px-4 py-4 text-base",
        lg: "px-5 py-5 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const accordionContentVariants = cva(
  "overflow-hidden text-muted-foreground",
  {
    variants: {
      size: {
        sm: "px-3 pb-3 text-xs",
        md: "px-4 pb-4 text-sm",
        lg: "px-5 pb-5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
