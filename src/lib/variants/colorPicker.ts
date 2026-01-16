import { cva } from "class-variance-authority";

export const colorPickerTriggerVariants = cva(
  "rounded-lg border border-border p-1 transition-colors hover:border-ring focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const colorPickerSwatchVariants = cva("rounded", {
  variants: {
    size: {
      sm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const colorPickerPresetVariants = cva(
  "rounded transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring",
  {
    variants: {
      size: {
        sm: "h-5 w-5",
        md: "h-6 w-6",
        lg: "h-7 w-7",
      },
      selected: {
        true: "ring-2 ring-ring ring-offset-2",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      selected: false,
    },
  },
);

export const colorPickerDropdownVariants = cva(
  "absolute top-full left-0 z-50 mt-2 rounded-lg border border-border bg-card p-3 shadow-lg",
  {
    variants: {
      size: {
        sm: "min-w-[156px]",
        md: "min-w-[180px]",
        lg: "min-w-[204px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const colorPickerNativeVariants = cva(
  "h-10 w-10 rounded-lg border border-border",
  {
    variants: {},
    defaultVariants: {},
  },
);
