import { cva } from "class-variance-authority";

export const tabsListVariants = cva("flex", {
  variants: {
    variant: {
      default: "border-b border-border",
      bordered: "gap-x-1 rounded-lg border border-border p-1",
      segment: "gap-x-1 rounded-lg bg-muted p-1",
      pills: "gap-x-2",
      underline: "border-b border-border",
      vertical: "flex-col gap-y-1 border-e border-border pe-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: [
          "border-b-2 border-transparent px-4 py-2 text-sm font-medium text-muted-foreground",
          "hover:text-foreground",
          "data-[state=active]:border-primary data-[state=active]:text-foreground",
        ],
        bordered: [
          "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground",
          "hover:bg-accent hover:text-foreground",
          "data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        ],
        segment: [
          "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground",
          "hover:text-foreground",
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        ],
        pills: [
          "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground",
          "hover:bg-accent hover:text-foreground",
          "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
        ],
        underline: [
          "-mb-px border-b-2 border-transparent px-4 py-2 text-sm font-medium text-muted-foreground",
          "hover:border-border hover:text-foreground",
          "data-[state=active]:border-primary data-[state=active]:text-primary",
        ],
        vertical: [
          "w-full justify-start rounded-md px-3 py-2 text-sm font-medium text-muted-foreground",
          "hover:bg-accent hover:text-foreground",
          "data-[state=active]:bg-accent data-[state=active]:text-foreground",
        ],
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const tabsContentVariants = cva(
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "pt-4",
        bordered: "pt-4",
        segment: "pt-4",
        pills: "pt-4",
        underline: "pt-4",
        vertical: "ps-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
