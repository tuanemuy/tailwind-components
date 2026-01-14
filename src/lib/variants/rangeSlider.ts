import { cva } from "class-variance-authority";

export const rangeSliderTrackVariants = cva(
  "relative w-full rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const rangeSliderRangeVariants = cva(
  "absolute h-full rounded-full bg-primary",
  {
    variants: {},
    defaultVariants: {},
  }
);

export const rangeSliderThumbVariants = cva(
  "absolute rounded-full border-2 border-primary bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-3 w-3 -translate-y-1/4",
        md: "h-5 w-5 -translate-y-[30%]",
        lg: "h-6 w-6 -translate-y-[25%]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
