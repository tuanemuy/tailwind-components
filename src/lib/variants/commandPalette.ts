import { cva } from "class-variance-authority";

// Command Palette variants
export const commandPaletteVariants = cva(
  "fixed inset-0 z-50 flex items-start justify-center pt-[15vh]",
  {
    variants: {
      variant: {
        default: "",
        centered: "items-center pt-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const commandPaletteContentVariants = cva(
  "w-full max-w-xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden",
  {
    variants: {
      size: {
        sm: "max-w-md",
        md: "max-w-xl",
        lg: "max-w-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const commandInputVariants = cva(
  "w-full border-b border-border bg-transparent px-4 py-3 text-lg outline-none placeholder:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "",
        compact: "px-3 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const commandGroupVariants = cva("p-2", {
  variants: {
    variant: {
      default: "",
      bordered: "border-b border-border last:border-b-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const commandGroupLabelVariants = cva(
  "px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "",
        subtle: "text-xs font-normal normal-case",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const commandItemVariants = cva(
  "flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-muted",
        selected: "bg-primary/10 text-primary",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Search Modal variants
export const searchModalVariants = cva(
  "fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm",
  {
    variants: {
      position: {
        top: "pt-[10vh]",
        center: "items-center",
      },
    },
    defaultVariants: {
      position: "top",
    },
  }
);

// Search Results variants
export const searchResultsVariants = cva("divide-y divide-border", {
  variants: {
    variant: {
      default: "",
      grouped: "space-y-4",
      flat: "space-y-1",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const searchResultItemVariants = cva(
  "flex items-start gap-3 p-3 cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-muted",
        highlighted: "bg-primary/5",
        selected: "bg-primary/10 border-l-2 border-l-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Recent Searches variants
export const recentSearchesVariants = cva("space-y-1", {
  variants: {
    variant: {
      default: "",
      compact: "space-y-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const recentSearchItemVariants = cva(
  "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-muted",
        active: "bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Search Suggestions variants
export const searchSuggestionsVariants = cva("space-y-1", {
  variants: {
    variant: {
      default: "",
      inline: "flex flex-wrap gap-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const searchSuggestionItemVariants = cva(
  "px-3 py-1.5 rounded-lg cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-muted",
        chip: "bg-muted hover:bg-muted/80 text-sm",
        trending: "flex items-center gap-2 hover:bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
