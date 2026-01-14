import { cva } from "class-variance-authority";

// Video Player variants
export const videoPlayerVariants = cva(
  "relative rounded-xl overflow-hidden bg-black",
  {
    variants: {
      variant: {
        default: "",
        minimal: "",
        theater: "aspect-video",
      },
      size: {
        sm: "max-w-md",
        md: "max-w-2xl",
        lg: "max-w-4xl",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "full",
    },
  }
);

export const videoControlsVariants = cva(
  "absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-3 bg-gradient-to-t from-black/80 to-transparent",
  {
    variants: {
      variant: {
        default: "",
        minimal: "p-2",
        hidden: "opacity-0 hover:opacity-100 transition-opacity",
      },
      visible: {
        true: "opacity-100",
        false: "opacity-0",
      },
    },
    defaultVariants: {
      variant: "default",
      visible: true,
    },
  }
);

// Audio Player variants
export const audioPlayerVariants = cva(
  "rounded-xl border border-border bg-card p-4",
  {
    variants: {
      variant: {
        default: "",
        compact: "p-3",
        minimal: "p-2 border-0 bg-transparent",
      },
      size: {
        sm: "max-w-xs",
        md: "max-w-md",
        lg: "max-w-lg",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "full",
    },
  }
);

export const audioWaveformVariants = cva("flex items-end gap-0.5 h-8", {
  variants: {
    variant: {
      default: "",
      minimal: "h-6 gap-px",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const audioWaveformBarVariants = cva(
  "w-1 rounded-full bg-primary/30 transition-all",
  {
    variants: {
      active: {
        true: "bg-primary",
        false: "bg-primary/30",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

// Video Call variants
export const videoCallVariants = cva(
  "relative rounded-xl overflow-hidden bg-gray-900",
  {
    variants: {
      layout: {
        grid: "",
        spotlight: "",
        sidebar: "",
      },
    },
    defaultVariants: {
      layout: "grid",
    },
  }
);

export const videoCallParticipantVariants = cva(
  "relative rounded-lg overflow-hidden bg-gray-800",
  {
    variants: {
      variant: {
        default: "",
        speaking: "ring-2 ring-primary",
        muted: "opacity-80",
        spotlight: "col-span-2 row-span-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const videoCallControlsVariants = cva(
  "flex items-center justify-center gap-2 p-4",
  {
    variants: {
      variant: {
        default: "",
        floating: "absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-gray-900/90 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const videoCallButtonVariants = cva(
  "rounded-full p-3 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-700 hover:bg-gray-600 text-white",
        active: "bg-white text-gray-900",
        danger: "bg-destructive hover:bg-destructive/90 text-white",
        muted: "bg-gray-600 text-gray-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Media Controls variants
export const mediaControlsVariants = cva("flex items-center gap-2", {
  variants: {
    variant: {
      default: "",
      compact: "gap-1",
      spacious: "gap-4",
    },
    align: {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      between: "justify-between",
    },
  },
  defaultVariants: {
    variant: "default",
    align: "center",
  },
});

export const mediaControlButtonVariants = cva(
  "rounded-full p-2 transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-white/10 text-white",
        primary: "bg-white text-black hover:bg-white/90",
        secondary: "bg-white/10 text-white hover:bg-white/20",
        ghost: "text-white/70 hover:text-white",
      },
      size: {
        sm: "p-1.5",
        md: "p-2",
        lg: "p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export const progressBarVariants = cva(
  "relative h-1 rounded-full bg-white/20 cursor-pointer group",
  {
    variants: {
      variant: {
        default: "",
        thick: "h-1.5",
        thin: "h-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const progressFillVariants = cva(
  "absolute left-0 top-0 h-full rounded-full bg-primary transition-all",
  {
    variants: {
      variant: {
        default: "",
        buffered: "bg-primary/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Volume Slider variants
export const volumeSliderVariants = cva(
  "flex items-center gap-2 group",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col-reverse",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);
