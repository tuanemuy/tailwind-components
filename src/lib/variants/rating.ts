import { cva } from "class-variance-authority";

export const ratingVariants = cva(
  "inline-flex items-center gap-x-0.5",
  {
    variants: {
      size: {
        sm: "[&>*]:size-4",
        md: "[&>*]:size-5",
        lg: "[&>*]:size-6",
        xl: "[&>*]:size-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const ratingStarVariants = cva(
  "transition-colors cursor-pointer",
  {
    variants: {
      state: {
        filled: "text-warning fill-warning",
        empty: "text-muted-foreground fill-transparent",
        hover: "text-warning/70 fill-warning/70",
      },
      readonly: {
        true: "cursor-default",
        false: "",
      },
    },
    defaultVariants: {
      state: "empty",
      readonly: false,
    },
  }
);
