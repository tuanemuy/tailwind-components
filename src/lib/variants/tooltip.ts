import { cva } from "class-variance-authority";

export const tooltipVariants = cva(
  "absolute z-50 px-2 py-1 text-xs font-medium rounded-md shadow-sm whitespace-nowrap transition-opacity duration-200",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background",
        light: "bg-card text-foreground border border-border",
      },
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "top",
    },
  },
);

export const tooltipArrowVariants = cva("absolute size-2 rotate-45", {
  variants: {
    variant: {
      default: "bg-foreground",
      light: "bg-card border-l border-b border-border",
    },
    position: {
      top: "top-full left-1/2 -translate-x-1/2 -mt-1",
      bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-1",
      left: "left-full top-1/2 -translate-y-1/2 -ml-1",
      right: "right-full top-1/2 -translate-y-1/2 -mr-1",
    },
  },
  defaultVariants: {
    variant: "default",
    position: "top",
  },
});
