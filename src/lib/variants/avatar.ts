import { cva } from "class-variance-authority";

export const avatarVariants = cva(
  "inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground font-medium overflow-hidden",
  {
    variants: {
      size: {
        xs: "size-6 text-xs",
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-12 text-base",
        xl: "size-16 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const avatarStatusVariants = cva(
  "absolute block rounded-full ring-2 ring-background",
  {
    variants: {
      status: {
        online: "bg-success",
        offline: "bg-muted-foreground",
        busy: "bg-destructive",
        away: "bg-warning",
      },
      size: {
        xs: "size-1.5 -bottom-0.5 -end-0.5",
        sm: "size-2 -bottom-0.5 -end-0.5",
        md: "size-2.5 bottom-0 end-0",
        lg: "size-3 bottom-0 end-0",
        xl: "size-4 bottom-0.5 end-0.5",
      },
    },
    defaultVariants: {
      status: "online",
      size: "md",
    },
  },
);
