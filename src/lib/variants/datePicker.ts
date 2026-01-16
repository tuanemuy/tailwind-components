import { cva } from "class-variance-authority";

export const datePickerVariants = cva(
  "inline-flex items-center gap-x-2 rounded-lg border border-border bg-background transition-colors focus-within:ring-2 focus-within:ring-ring",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const calendarVariants = cva(
  "rounded-lg border border-border bg-card p-3 shadow-lg",
  {
    variants: {
      size: {
        sm: "w-[220px] text-xs",
        md: "w-[280px] text-sm",
        lg: "w-[340px] text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const calendarDayVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-7 w-7 text-xs",
        md: "h-9 w-9 text-sm",
        lg: "h-11 w-11 text-base",
      },
      variant: {
        default: "text-foreground hover:bg-accent",
        selected: "bg-primary text-primary-foreground hover:bg-primary/90",
        today: "border border-primary text-primary",
        outside: "text-muted-foreground opacity-50",
        range: "bg-primary/10 text-primary",
        rangeStart: "rounded-r-none bg-primary text-primary-foreground",
        rangeEnd: "rounded-l-none bg-primary text-primary-foreground",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
);
