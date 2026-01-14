import { cva } from "class-variance-authority";

export const skeletonVariants = cva(
  "bg-muted",
  {
    variants: {
      animation: {
        pulse: "animate-pulse",
        wave: "animate-shimmer bg-gradient-to-r from-muted via-muted-foreground/10 to-muted bg-[length:200%_100%]",
        none: "",
      },
      shape: {
        rectangle: "rounded-md",
        circle: "rounded-full",
        text: "rounded",
      },
    },
    defaultVariants: {
      animation: "pulse",
      shape: "rectangle",
    },
  },
);
