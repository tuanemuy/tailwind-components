import { cva } from "class-variance-authority";

// Calendar Header variants
export const calendarHeaderVariants = cva(
  "flex items-center justify-between p-4",
  {
    variants: {
      variant: {
        default: "",
        compact: "p-2",
        bordered: "border-b border-border pb-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Calendar Grid variants
export const calendarGridVariants = cva("grid", {
  variants: {
    variant: {
      month: "grid-cols-7 gap-0.5",
      week: "grid-cols-7 gap-1",
      day: "grid-cols-1 divide-y divide-border",
    },
  },
  defaultVariants: {
    variant: "month",
  },
});

export const calendarCellVariants = cva(
  "relative min-h-[80px] p-2 border border-border/50",
  {
    variants: {
      variant: {
        default: "bg-card",
        today: "bg-primary/10 border-primary",
        weekend: "bg-muted/30",
        disabled: "bg-muted/50 opacity-50",
        selected: "bg-primary/20 border-primary",
      },
      size: {
        sm: "min-h-[60px] p-1",
        md: "min-h-[80px] p-2",
        lg: "min-h-[120px] p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

// Event Card variants
export const eventCardVariants = cva(
  "rounded-lg p-3 border-l-4 transition-all hover:shadow-md cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-card border-border border-l-primary",
        primary: "bg-primary/10 border-l-primary",
        secondary: "bg-secondary/10 border-l-secondary",
        success: "bg-success/10 border-l-success",
        warning: "bg-warning/10 border-l-warning",
        error: "bg-destructive/10 border-l-destructive",
      },
      size: {
        sm: "p-2 text-sm",
        md: "p-3",
        lg: "p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const eventMiniVariants = cva(
  "rounded px-2 py-1 text-xs truncate cursor-pointer hover:opacity-80",
  {
    variants: {
      color: {
        blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        green:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        red: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        yellow:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        purple:
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
        pink: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
        indigo:
          "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
        gray: "bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300",
      },
    },
    defaultVariants: {
      color: "blue",
    },
  },
);

// Schedule Timeline variants
export const scheduleTimelineVariants = cva("relative", {
  variants: {
    variant: {
      default: "",
      compact: "text-sm",
      detailed: "",
    },
    orientation: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row overflow-x-auto",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "vertical",
  },
});

export const scheduleSlotVariants = cva(
  "relative border-b border-border py-2 pl-16",
  {
    variants: {
      hasEvent: {
        true: "bg-primary/5",
        false: "",
      },
      isCurrentTime: {
        true: "border-l-2 border-l-primary",
        false: "",
      },
    },
    defaultVariants: {
      hasEvent: false,
      isCurrentTime: false,
    },
  },
);

// Timeslot Picker variants
export const timeslotPickerVariants = cva("grid gap-2", {
  variants: {
    variant: {
      default: "grid-cols-3",
      compact: "grid-cols-4 gap-1",
      list: "grid-cols-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const timeslotVariants = cva(
  "rounded-lg border border-border px-3 py-2 text-center cursor-pointer transition-all",
  {
    variants: {
      variant: {
        available: "hover:border-primary hover:bg-primary/5",
        selected: "border-primary bg-primary text-primary-foreground",
        unavailable: "opacity-50 cursor-not-allowed bg-muted",
      },
    },
    defaultVariants: {
      variant: "available",
    },
  },
);

// FullCalendar variants
export const fullCalendarVariants = cva("flex flex-col h-full", {
  variants: {
    variant: {
      default: "bg-card rounded-lg border border-border",
      bordered: "border border-border rounded-lg",
      minimal: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// MiniCalendar variants
export const miniCalendarVariants = cva("", {
  variants: {
    variant: {
      default: "bg-card rounded-lg border border-border p-3",
      compact: "p-2",
      inline: "",
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
});

export const miniCalendarDayVariants = cva(
  "size-8 rounded-full flex items-center justify-center transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        default: "hover:bg-muted",
        today: "bg-primary text-primary-foreground font-semibold",
        selected: "bg-primary/20 text-primary font-medium",
        disabled: "text-muted-foreground/50 cursor-not-allowed",
        hasEvents: "relative hover:bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// CalendarEventSidebar variants
export const calendarEventSidebarVariants = cva("flex flex-col h-full", {
  variants: {
    variant: {
      default: "bg-card border-l border-border p-4",
      floating: "bg-card rounded-lg border border-border p-4 shadow-lg",
      minimal: "p-4",
    },
    size: {
      sm: "w-72",
      md: "w-80",
      lg: "w-96",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

// ScheduleWidget variants
export const scheduleWidgetVariants = cva("", {
  variants: {
    variant: {
      default: "bg-card rounded-lg border border-border",
      card: "bg-card rounded-lg border border-border shadow-sm",
      minimal: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const scheduleItemVariants = cva(
  "flex items-start gap-3 p-3 border-b border-border last:border-b-0 transition-colors cursor-pointer hover:bg-muted/50",
  {
    variants: {
      variant: {
        default: "",
        compact: "p-2 gap-2",
        detailed: "p-4 gap-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const viewSwitcherVariants = cva(
  "inline-flex items-center rounded-lg border border-border bg-muted/50 p-1",
  {
    variants: {
      variant: {
        default: "",
        pills: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const viewSwitcherItemVariants = cva(
  "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
  {
    variants: {
      active: {
        true: "bg-card text-foreground shadow-sm",
        false: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
