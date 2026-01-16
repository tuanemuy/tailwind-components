import { cva } from "class-variance-authority";

export const rangeSliderTrackVariants = cva(
  "relative w-full rounded-full bg-gray-100 dark:bg-neutral-700",
  {
    variants: {
      size: {
        sm: "h-1",
        md: "h-1.5",
        lg: "h-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const rangeSliderRangeVariants = cva(
  "absolute h-full rounded-full bg-primary origin-[0_0]",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const rangeSliderThumbVariants = cva(
  "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border border-gray-200 shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700",
  {
    variants: {
      size: {
        sm: "size-5",
        md: "size-6",
        lg: "size-7",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
