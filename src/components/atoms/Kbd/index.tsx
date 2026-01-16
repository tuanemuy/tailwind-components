import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { kbdVariants } from "@/lib/variants/kbd";

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  /** Array of keys to display (renders as KbdGroup internally) */
  keys?: string[];
  /** Separator between keys when using keys prop */
  separator?: React.ReactNode;
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ className, variant, size, children, keys, separator, ...props }, ref) => {
    // If keys prop is provided, render as a group of kbd elements
    if (keys && keys.length > 0) {
      const defaultSeparator = (
        <span className="text-muted-foreground mx-0.5">+</span>
      );
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cn("inline-flex items-center", className)}
          {...(props as React.HTMLAttributes<HTMLSpanElement>)}
        >
          {keys.map((key, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Keys array may contain duplicates, index is needed for uniqueness
            <span key={`${key}-${index}`} className="inline-flex items-center">
              {index > 0 && (separator ?? defaultSeparator)}
              <kbd className={cn(kbdVariants({ variant, size }))}>{key}</kbd>
            </span>
          ))}
        </span>
      );
    }

    return (
      <kbd
        ref={ref}
        className={cn(kbdVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </kbd>
    );
  },
);
Kbd.displayName = "Kbd";

// Helper component for keyboard shortcut combinations
export interface KbdGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  keys: string[];
  separator?: React.ReactNode;
  variant?: VariantProps<typeof kbdVariants>["variant"];
  size?: VariantProps<typeof kbdVariants>["size"];
}

export const KbdGroup = forwardRef<HTMLDivElement, KbdGroupProps>(
  (
    {
      className,
      keys,
      separator = <span className="text-muted-foreground mx-0.5">+</span>,
      variant,
      size,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn("inline-flex items-center", className)}
      {...props}
    >
      {keys.map((key, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Keys array may contain duplicates, index is needed for uniqueness
        <span key={`${key}-${index}`} className="inline-flex items-center">
          {index > 0 && separator}
          <Kbd variant={variant} size={size}>
            {key}
          </Kbd>
        </span>
      ))}
    </div>
  ),
);
KbdGroup.displayName = "KbdGroup";

// Platform-aware key symbols
export const keySymbols = {
  // Modifiers
  cmd: "⌘",
  command: "⌘",
  ctrl: "Ctrl",
  control: "Ctrl",
  alt: "Alt",
  option: "⌥",
  shift: "⇧",
  // Common keys
  enter: "↵",
  return: "↵",
  tab: "⇥",
  backspace: "⌫",
  delete: "⌦",
  escape: "Esc",
  esc: "Esc",
  space: "Space",
  // Arrows
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
} as const;

export type KeySymbol = keyof typeof keySymbols;

export interface PlatformKbdProps extends Omit<KbdProps, "children"> {
  keyName: KeySymbol | string;
}

export const PlatformKbd = forwardRef<HTMLElement, PlatformKbdProps>(
  ({ keyName, ...props }, ref) => {
    const symbol = keySymbols[keyName.toLowerCase() as KeySymbol] ?? keyName;
    return (
      <Kbd ref={ref} {...props}>
        {symbol}
      </Kbd>
    );
  },
);
PlatformKbd.displayName = "PlatformKbd";
