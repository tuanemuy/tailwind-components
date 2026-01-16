import { cva } from "class-variance-authority";

// Balance Card variants
export const balanceCardVariants = cva(
  "rounded-xl border border-border bg-card p-6",
  {
    variants: {
      variant: {
        default: "",
        primary: "bg-primary text-primary-foreground border-primary",
        gradient:
          "bg-gradient-to-br from-primary/90 to-primary text-primary-foreground border-transparent",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

// Transaction List variants
export const transactionItemVariants = cva(
  "flex items-center gap-4 py-3 border-b border-border last:border-b-0",
  {
    variants: {
      variant: {
        default: "",
        compact: "py-2",
        detailed: "py-4",
      },
      status: {
        completed: "",
        pending: "opacity-70",
        failed: "opacity-50",
      },
    },
    defaultVariants: {
      variant: "default",
      status: "completed",
    },
  },
);

export const transactionAmountVariants = cva("font-semibold tabular-nums", {
  variants: {
    type: {
      credit: "text-success",
      debit: "text-error",
      neutral: "text-foreground",
    },
  },
  defaultVariants: {
    type: "neutral",
  },
});

// Payment Card variants
export const paymentCardVariants = cva("rounded-xl p-6 transition-all", {
  variants: {
    variant: {
      visa: "bg-gradient-to-br from-blue-600 to-blue-800 text-white",
      mastercard: "bg-gradient-to-br from-red-500 to-orange-600 text-white",
      amex: "bg-gradient-to-br from-gray-700 to-gray-900 text-white",
      default: "bg-gradient-to-br from-gray-800 to-gray-900 text-white",
    },
    size: {
      sm: "p-4 text-sm",
      md: "p-6",
      lg: "p-8 text-lg",
    },
    selected: {
      true: "ring-2 ring-primary ring-offset-2 ring-offset-background",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    selected: false,
  },
});

// Transfer Form variants
export const transferFormVariants = cva("space-y-6", {
  variants: {
    variant: {
      default: "",
      compact: "space-y-4",
      card: "rounded-xl border border-border bg-card p-6 space-y-6",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// Account Card variants
export const accountCardVariants = cva(
  "rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md cursor-pointer",
  {
    variants: {
      variant: {
        default: "",
        selected: "ring-2 ring-primary border-primary",
        primary: "border-primary bg-primary/5",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

// Receipt Timeline variants
export const receiptTimelineVariants = cva("relative pl-6", {
  variants: {
    variant: {
      default: "",
      compact: "pl-4",
      detailed: "pl-8",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const receiptItemVariants = cva(
  "relative pb-4 last:pb-0 before:absolute before:left-[-18px] before:top-2 before:size-2 before:rounded-full before:bg-primary",
  {
    variants: {
      status: {
        completed: "before:bg-success",
        pending: "before:bg-warning",
        failed: "before:bg-destructive",
      },
    },
    defaultVariants: {
      status: "completed",
    },
  },
);

// Currency Select variants
export const currencySelectVariants = cva(
  "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2",
  {
    variants: {
      variant: {
        default: "",
        compact: "px-2 py-1 text-sm",
        prominent: "px-4 py-3 shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
