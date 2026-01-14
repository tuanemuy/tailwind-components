import { cva } from "class-variance-authority";

export const userProfileCardVariants = cva(
  "overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-card rounded-lg border border-border",
        elevated: "bg-card rounded-lg shadow-md",
        minimal: "bg-transparent",
        hero: "bg-card rounded-lg border border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const userProfileCardCoverVariants = cva(
  "relative w-full bg-gradient-to-r from-primary/20 to-primary/10",
  {
    variants: {
      size: {
        sm: "h-20",
        md: "h-32",
        lg: "h-48",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const userProfileCardAvatarVariants = cva(
  "relative rounded-full border-4 border-background bg-muted",
  {
    variants: {
      size: {
        sm: "size-16 -mt-8",
        md: "size-24 -mt-12",
        lg: "size-32 -mt-16",
      },
      position: {
        center: "mx-auto",
        left: "ml-6",
      },
    },
    defaultVariants: {
      size: "md",
      position: "center",
    },
  }
);

export const userProfileCardContentVariants = cva(
  "",
  {
    variants: {
      align: {
        center: "text-center",
        left: "text-left",
      },
      padding: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      align: "center",
      padding: "md",
    },
  }
);

export const userProfileCardStatsVariants = cva(
  "grid divide-x divide-border border-t border-border",
  {
    variants: {
      columns: {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
      },
    },
    defaultVariants: {
      columns: 3,
    },
  }
);

export const userProfileCardStatVariants = cva(
  "flex flex-col items-center justify-center py-4 text-center",
  {
    variants: {
      size: {
        sm: "py-3",
        md: "py-4",
        lg: "py-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);
