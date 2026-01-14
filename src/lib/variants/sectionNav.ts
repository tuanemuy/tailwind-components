import { cva } from "class-variance-authority";

export const sectionNavVariants = cva(
  "flex",
  {
    variants: {
      variant: {
        underline: "gap-x-1 border-b border-border",
        pills: "gap-x-2 flex-wrap",
        segment: "p-1 bg-muted rounded-lg gap-x-1",
        bordered: "gap-x-1 border-b-2 border-border",
      },
      orientation: {
        horizontal: "flex-row items-center",
        vertical: "flex-col items-stretch gap-y-1",
      },
    },
    defaultVariants: {
      variant: "underline",
      orientation: "horizontal",
    },
  }
);

export const sectionNavItemVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        underline: "px-4 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground data-[active=true]:border-primary data-[active=true]:text-foreground -mb-px",
        pills: "px-4 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted data-[active=true]:bg-primary data-[active=true]:text-primary-foreground",
        segment: "px-4 py-1.5 rounded-md text-muted-foreground data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-sm",
        bordered: "px-4 py-2 border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:border-muted data-[active=true]:border-primary data-[active=true]:text-foreground -mb-0.5",
      },
      size: {
        sm: "text-xs px-3 py-1.5",
        md: "text-sm",
        lg: "text-base px-5 py-2.5",
      },
    },
    defaultVariants: {
      variant: "underline",
      size: "md",
    },
  }
);

export const cardNavVariants = cva(
  "grid",
  {
    variants: {
      columns: {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        auto: "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
      },
      gap: {
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
      },
    },
    defaultVariants: {
      columns: "auto",
      gap: "md",
    },
  }
);

export const cardNavItemVariants = cva(
  "flex flex-col items-center justify-center rounded-lg border p-6 text-center transition-all cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-border bg-card hover:border-primary hover:bg-muted/50",
        outlined: "border-border bg-transparent hover:bg-muted/50",
        filled: "border-transparent bg-muted hover:bg-muted/80",
      },
      active: {
        true: "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      active: false,
    },
  }
);
