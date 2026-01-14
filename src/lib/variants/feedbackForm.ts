import { cva } from "class-variance-authority";

// Feedback Form variants
export const feedbackFormVariants = cva("space-y-6", {
  variants: {
    variant: {
      default: "",
      card: "rounded-xl border border-border bg-card p-6",
      inline: "space-y-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const feedbackCategoryVariants = cva(
  "flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer transition-all",
  {
    variants: {
      variant: {
        default: "hover:border-primary hover:bg-primary/5",
        selected: "border-primary bg-primary/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Rating Form variants
export const ratingFormVariants = cva("space-y-6", {
  variants: {
    variant: {
      default: "",
      card: "rounded-xl border border-border bg-card p-6",
      compact: "space-y-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const ratingScaleVariants = cva("flex items-center gap-2", {
  variants: {
    variant: {
      default: "",
      emoji: "gap-4",
      numeric: "gap-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const ratingScaleItemVariants = cva(
  "flex items-center justify-center rounded-lg border border-border cursor-pointer transition-all",
  {
    variants: {
      variant: {
        default: "size-10 hover:border-primary hover:bg-primary/5",
        selected: "border-primary bg-primary text-primary-foreground",
        emoji: "size-12 text-2xl hover:scale-110",
        numeric: "size-10 text-sm hover:border-primary hover:bg-primary/5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// NPS Survey variants
export const npsSurveyVariants = cva("space-y-6", {
  variants: {
    variant: {
      default: "",
      card: "rounded-xl border border-border bg-card p-6",
      fullscreen: "fixed inset-0 flex items-center justify-center bg-background p-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const npsScaleVariants = cva("flex justify-center gap-1", {
  variants: {
    variant: {
      default: "",
      grouped: "gap-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const npsScoreVariants = cva(
  "flex items-center justify-center size-10 rounded-lg border border-border cursor-pointer transition-all text-sm font-medium",
  {
    variants: {
      variant: {
        default: "hover:border-primary hover:bg-primary/5",
        selected: "border-primary bg-primary text-primary-foreground",
        detractor: "bg-red-500/10 border-red-500/50 text-red-500",
        passive: "bg-yellow-500/10 border-yellow-500/50 text-yellow-500",
        promoter: "bg-green-500/10 border-green-500/50 text-green-500",
      },
      grouped: {
        true: "rounded-none first:rounded-l-lg last:rounded-r-lg border-x-0 first:border-l last:border-r",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      grouped: false,
    },
  }
);

export const npsLabelVariants = cva(
  "text-xs text-muted-foreground",
  {
    variants: {
      position: {
        start: "text-left",
        end: "text-right",
      },
    },
    defaultVariants: {
      position: "start",
    },
  }
);

// Thank you message variants
export const thankYouVariants = cva(
  "flex flex-col items-center justify-center text-center space-y-4",
  {
    variants: {
      variant: {
        default: "p-6",
        card: "rounded-xl border border-border bg-card p-8",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
