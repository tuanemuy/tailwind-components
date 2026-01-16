"use client";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDownIcon, ChevronUpIcon, ClockIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const timePickerVariants = cva(
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

type TimePickerSize = "sm" | "md" | "lg";
type TimeFormat = "12h" | "24h";

interface TimeValue {
  hours: number;
  minutes: number;
  period?: "AM" | "PM";
}

// Time Panel Component
interface TimePanelProps {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
  format: TimeFormat;
  size?: TimePickerSize;
  minuteStep?: number;
}

const TimePanel = ({
  value,
  onChange,
  format,
  size = "md",
  minuteStep = 1,
}: TimePanelProps) => {
  const incrementHours = () => {
    let newHours = value.hours + 1;
    if (format === "12h") {
      if (newHours > 12) newHours = 1;
    } else {
      if (newHours > 23) newHours = 0;
    }
    onChange({ ...value, hours: newHours });
  };

  const decrementHours = () => {
    let newHours = value.hours - 1;
    if (format === "12h") {
      if (newHours < 1) newHours = 12;
    } else {
      if (newHours < 0) newHours = 23;
    }
    onChange({ ...value, hours: newHours });
  };

  const incrementMinutes = () => {
    let newMinutes = value.minutes + minuteStep;
    if (newMinutes >= 60) newMinutes = 0;
    onChange({ ...value, minutes: newMinutes });
  };

  const decrementMinutes = () => {
    let newMinutes = value.minutes - minuteStep;
    if (newMinutes < 0) newMinutes = 60 - minuteStep;
    onChange({ ...value, minutes: newMinutes });
  };

  const togglePeriod = () => {
    onChange({
      ...value,
      period: value.period === "AM" ? "PM" : "AM",
    });
  };

  const buttonClass = cn(
    "rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground focus:outline-none",
    size === "sm" && "p-0.5",
  );

  const iconSize =
    size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4";

  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
      <div className="flex items-center gap-x-2">
        {/* Hours */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={incrementHours}
            className={buttonClass}
          >
            <ChevronUpIcon className={iconSize} />
          </button>
          <span
            className={cn(
              "w-10 text-center font-mono tabular-nums",
              size === "sm"
                ? "text-lg"
                : size === "lg"
                  ? "text-3xl"
                  : "text-2xl",
            )}
          >
            {value.hours.toString().padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={decrementHours}
            className={buttonClass}
          >
            <ChevronDownIcon className={iconSize} />
          </button>
        </div>

        <span
          className={cn(
            "font-mono",
            size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl",
          )}
        >
          :
        </span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={incrementMinutes}
            className={buttonClass}
          >
            <ChevronUpIcon className={iconSize} />
          </button>
          <span
            className={cn(
              "w-10 text-center font-mono tabular-nums",
              size === "sm"
                ? "text-lg"
                : size === "lg"
                  ? "text-3xl"
                  : "text-2xl",
            )}
          >
            {value.minutes.toString().padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={decrementMinutes}
            className={buttonClass}
          >
            <ChevronDownIcon className={iconSize} />
          </button>
        </div>

        {/* AM/PM Toggle */}
        {format === "12h" && (
          <div className="ms-2 flex flex-col items-center">
            <button
              type="button"
              onClick={togglePeriod}
              className={cn(
                "rounded px-2 py-1 font-medium transition-colors",
                "hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring",
                size === "sm"
                  ? "text-xs"
                  : size === "lg"
                    ? "text-base"
                    : "text-sm",
              )}
            >
              {value.period}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// TimePicker Component
export interface TimePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof timePickerVariants> {
  value?: TimeValue;
  onChange?: (value: TimeValue) => void;
  placeholder?: string;
  format?: TimeFormat;
  minuteStep?: number;
  disabled?: boolean;
}

const formatTime = (value: TimeValue, format: TimeFormat): string => {
  const hours = value.hours.toString().padStart(2, "0");
  const minutes = value.minutes.toString().padStart(2, "0");

  if (format === "12h") {
    return `${hours}:${minutes} ${value.period}`;
  }
  return `${hours}:${minutes}`;
};

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      className,
      size = "md",
      value,
      onChange,
      placeholder = "Select time",
      format = "12h",
      minuteStep = 1,
      disabled = false,
      ...props
    },
    _ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [positioned, setPositioned] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const defaultValue: TimeValue = {
      hours: format === "12h" ? 12 : 0,
      minutes: 0,
      period: "AM",
    };

    const currentValue = value ?? defaultValue;

    // Reset positioned when closing
    useEffect(() => {
      if (!isOpen) {
        setPositioned(false);
      }
    }, [isOpen]);

    // Calculate position when open
    useLayoutEffect(() => {
      if (!isOpen || !triggerRef.current || !panelRef.current) return;

      const updatePosition = () => {
        if (!triggerRef.current || !panelRef.current) return;
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const panelRect = panelRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        let top = triggerRect.bottom + 4;
        const left = triggerRect.left;

        // Check if panel would overflow below viewport
        if (top + panelRect.height > viewportHeight) {
          if (triggerRect.top > viewportHeight - triggerRect.bottom) {
            top = triggerRect.top - panelRect.height - 4;
          }
        }

        if (top < 8) top = 8;

        setPosition({ top, left });
        setPositioned(true);
      };

      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }, [isOpen]);

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          containerRef.current &&
          !containerRef.current.contains(target) &&
          panelRef.current &&
          !panelRef.current.contains(target)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Close on escape
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
      }
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen]);

    const iconSize =
      size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4";

    const panelContent = isOpen ? (
      <div
        ref={panelRef}
        className="fixed z-[9999]"
        style={{
          top: position.top,
          left: position.left,
          visibility: positioned ? "visible" : "hidden",
        }}
      >
        <TimePanel
          value={currentValue}
          onChange={(newValue) => {
            onChange?.(newValue);
          }}
          format={format}
          size={size ?? "md"}
          minuteStep={minuteStep}
        />
      </div>
    ) : null;

    return (
      <div ref={containerRef} className="relative inline-block" {...props}>
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          className={cn(
            timePickerVariants({ size }),
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ClockIcon className={cn(iconSize, "text-muted-foreground")} />
          <span className={cn(!value && "text-muted-foreground")}>
            {value ? formatTime(value, format) : placeholder}
          </span>
        </button>

        {typeof document !== "undefined" &&
          panelContent &&
          createPortal(panelContent, document.body)}
      </div>
    );
  },
);
TimePicker.displayName = "TimePicker";

export type { TimeValue, TimeFormat };
