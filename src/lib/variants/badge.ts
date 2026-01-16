import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center gap-x-1.5 font-medium rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-white",
        outline: "border border-border text-foreground bg-transparent",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        soft: "bg-primary/10 text-primary",
        info: "bg-info text-info-foreground",
      },
      size: {
        xs: "text-xs py-0.5 px-1.5",
        sm: "text-xs py-1 px-2",
        md: "text-sm py-1 px-2.5",
        lg: "text-sm py-1.5 px-3",
      },
      soft: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        soft: true,
        className: "bg-primary/10 text-primary",
      },
      {
        variant: "secondary",
        soft: true,
        className: "bg-secondary/50 text-secondary-foreground",
      },
      {
        variant: "destructive",
        soft: true,
        className: "bg-destructive/10 text-destructive",
      },
      {
        variant: "success",
        soft: true,
        className: "bg-success/10 text-success",
      },
      {
        variant: "warning",
        soft: true,
        className: "bg-warning/10 text-warning",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "sm",
      soft: false,
    },
  },
);
