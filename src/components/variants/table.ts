import { cva } from "class-variance-authority";

// Table container variants
export const tableContainerVariants = cva(
  "w-full overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-muted/50 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30",
  {
    variants: {
      bordered: {
        true: "border border-border rounded-lg",
        false: "",
      },
    },
    defaultVariants: {
      bordered: false,
    },
  },
);

// Table element variants
export const tableVariants = cva("min-w-full divide-y divide-border", {
  variants: {
    variant: {
      default: "",
      striped: "",
      bordered: "border border-border",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// Table header variants
export const tableHeaderVariants = cva("", {
  variants: {
    sticky: {
      true: "sticky top-0 z-10 bg-card shadow-sm",
      false: "",
    },
  },
  defaultVariants: {
    sticky: false,
  },
});

// Table header cell variants
export const tableHeaderCellVariants = cva(
  "px-4 first:ps-4 last:pe-4 text-sm font-medium text-foreground",
  {
    variants: {
      size: {
        compact: "py-2",
        default: "py-3",
        comfortable: "py-4",
      },
      align: {
        start: "text-start",
        center: "text-center",
        end: "text-end",
      },
      sortable: {
        true: "cursor-pointer select-none hover:text-primary",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      align: "start",
      sortable: false,
    },
  },
);

// Table body cell variants
export const tableCellVariants = cva(
  "px-4 first:ps-4 last:pe-4 whitespace-nowrap",
  {
    variants: {
      size: {
        compact: "py-2",
        default: "py-3",
        comfortable: "py-4",
      },
      align: {
        start: "text-start",
        center: "text-center",
        end: "text-end",
      },
    },
    defaultVariants: {
      size: "default",
      align: "start",
    },
  },
);

// Table row variants
export const tableRowVariants = cva("transition-colors", {
  variants: {
    hoverable: {
      true: "hover:bg-accent/50",
      false: "",
    },
    clickable: {
      true: "cursor-pointer",
      false: "",
    },
    selected: {
      true: "bg-primary/5",
      false: "",
    },
    striped: {
      true: "even:bg-muted/50",
      false: "",
    },
  },
  defaultVariants: {
    hoverable: true,
    clickable: false,
    selected: false,
    striped: false,
  },
});

// Expandable row variants
export const expandableRowVariants = cva(
  "border-b border-border transition-all",
  {
    variants: {
      expanded: {
        true: "bg-muted/30",
        false: "",
      },
    },
    defaultVariants: {
      expanded: false,
    },
  },
);

// Expanded content variants
export const expandedContentVariants = cva(
  "overflow-hidden transition-all duration-200",
  {
    variants: {
      expanded: {
        true: "max-h-[500px] opacity-100",
        false: "max-h-0 opacity-0",
      },
    },
    defaultVariants: {
      expanded: false,
    },
  },
);

// Filter bar variants
export const tableFilterBarVariants = cva(
  "flex items-center gap-3 p-4 border-b border-border bg-muted/30",
  {
    variants: {
      position: {
        top: "rounded-t-lg",
        bottom: "rounded-b-lg border-t border-b-0",
      },
    },
    defaultVariants: {
      position: "top",
    },
  },
);

// Toolbar variants
export const tableToolbarVariants = cva(
  "flex items-center justify-between gap-4 p-4",
  {
    variants: {
      variant: {
        default: "border-b border-border",
        floating: "bg-card shadow-sm rounded-lg mb-4",
        minimal: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Pagination variants
export const tablePaginationVariants = cva(
  "flex items-center justify-between gap-x-4 border-t border-border px-4 py-3",
  {
    variants: {
      variant: {
        default: "",
        compact: "py-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// Empty state variants
export const tableEmptyStateVariants = cva(
  "px-4 py-8 text-center text-sm text-muted-foreground",
);

// Loading state variants
export const tableLoadingStateVariants = cva("px-4 py-8 text-center", {
  variants: {
    variant: {
      spinner: "flex items-center justify-center gap-x-2",
      skeleton: "space-y-3",
    },
  },
  defaultVariants: {
    variant: "spinner",
  },
});

// Column resize handle variants
export const columnResizeHandleVariants = cva(
  "absolute right-0 top-0 h-full w-1 cursor-col-resize bg-border opacity-0 hover:opacity-100 active:bg-primary transition-opacity",
);

// Status badge mapping for table cells
export const tableStatusVariants = {
  active: "bg-success/10 text-success",
  inactive: "bg-muted text-muted-foreground",
  pending: "bg-warning/10 text-warning",
  completed: "bg-success/10 text-success",
  cancelled: "bg-destructive/10 text-destructive",
  draft: "bg-muted text-muted-foreground",
  paid: "bg-success/10 text-success",
  unpaid: "bg-warning/10 text-warning",
  overdue: "bg-destructive/10 text-destructive",
  processing: "bg-info/10 text-info",
  shipped: "bg-primary/10 text-primary",
  delivered: "bg-success/10 text-success",
  refunded: "bg-muted text-muted-foreground",
} as const;

export type TableStatusType = keyof typeof tableStatusVariants;
