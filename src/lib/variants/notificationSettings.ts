import { cva } from "class-variance-authority";

export const notificationSettingsVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "",
        card: "bg-card rounded-lg border border-border p-6",
        compact: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const notificationSettingsRowVariants = cva(
  "flex items-start justify-between gap-x-4 py-4",
  {
    variants: {
      variant: {
        default: "border-b border-border last:border-b-0",
        card: "",
        compact: "py-3",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const notificationSettingsHeaderVariants = cva(
  "flex items-center justify-between gap-x-4 pb-4 mb-4 border-b border-border",
  {
    variants: {
      size: {
        sm: "pb-3 mb-3",
        md: "pb-4 mb-4",
        lg: "pb-6 mb-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const notificationChannelVariants = cva(
  "flex items-center justify-center rounded-md border transition-colors",
  {
    variants: {
      active: {
        true: "border-primary bg-primary text-primary-foreground",
        false: "border-border bg-background text-muted-foreground hover:bg-muted",
      },
      size: {
        sm: "size-8",
        md: "size-10",
        lg: "size-12",
      },
    },
    defaultVariants: {
      active: false,
      size: "md",
    },
  }
);
