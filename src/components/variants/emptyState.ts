import { cva } from "class-variance-authority";

export const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        sm: "gap-y-2 p-4",
        md: "gap-y-3 p-6",
        lg: "gap-y-4 p-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const emptyStateIconVariants = cva(
  "rounded-full bg-muted p-3 text-muted-foreground",
  {
    variants: {
      size: {
        sm: "[&>*]:size-6",
        md: "[&>*]:size-8",
        lg: "[&>*]:size-10",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const emptyStateTitleVariants = cva("font-semibold text-foreground", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const emptyStateDescriptionVariants = cva(
  "max-w-sm text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
