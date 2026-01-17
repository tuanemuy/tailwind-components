"use client";

import type { VariantProps } from "class-variance-authority";
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/atoms";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import { cn } from "@/components/utils";
import {
  calendarDayVariants,
  calendarVariants,
  datePickerVariants,
} from "@/components/variants/datePicker";

type DatePickerSize = "sm" | "md" | "lg";

// Calendar Component
interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  size?: DatePickerSize;
  minDate?: Date;
  maxDate?: Date;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = ({
  value,
  onChange,
  size = "md",
  minDate,
  maxDate,
}: CalendarProps) => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(value ?? today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const previousMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const renderDays = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = value && isSameDay(date, value);
      const isToday = isSameDay(date, today);
      const disabled = isDateDisabled(date);

      days.push(
        <button
          key={day}
          type="button"
          disabled={disabled}
          className={cn(
            calendarDayVariants({
              size,
              variant: isSelected ? "selected" : isToday ? "today" : "default",
            }),
          )}
          onClick={() => onChange?.(date)}
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  const buttonSize = size === "sm" ? "sm" : size === "lg" ? "md" : "sm";
  const iconSize =
    size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4";

  return (
    <div className={cn(calendarVariants({ size }))}>
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <Button
          variant="ghost"
          size={buttonSize}
          onClick={previousMonth}
          className="h-7 w-7 p-0"
        >
          <ChevronLeftIcon className={iconSize} />
        </Button>
        <span className="font-medium">
          {MONTHS[month]} {year}
        </span>
        <Button
          variant="ghost"
          size={buttonSize}
          onClick={nextMonth}
          className="h-7 w-7 p-0"
        >
          <ChevronRightIcon className={iconSize} />
        </Button>
      </div>

      {/* Days of week */}
      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-muted-foreground">
        {DAYS.map((day) => (
          <div key={day} className="py-1 text-xs font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
    </div>
  );
};

// DatePicker Component
export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof datePickerVariants> {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  format?: (date: Date) => string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  clearable?: boolean;
}

const defaultFormat = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      size = "md",
      value,
      onChange,
      placeholder = "Select date",
      format = defaultFormat,
      minDate,
      maxDate,
      disabled = false,
      clearable = false,
      ...props
    },
    _ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [positioned, setPositioned] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    // Reset positioned when closing
    useEffect(() => {
      if (!isOpen) {
        setPositioned(false);
      }
    }, [isOpen]);

    // Calculate position when open
    useLayoutEffect(() => {
      if (!isOpen || !triggerRef.current || !calendarRef.current) return;

      const updatePosition = () => {
        if (!triggerRef.current || !calendarRef.current) return;
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const calendarRect = calendarRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        let top = triggerRect.bottom + 4;
        const left = triggerRect.left;

        // Check if calendar would overflow below viewport
        if (top + calendarRect.height > viewportHeight) {
          if (triggerRect.top > viewportHeight - triggerRect.bottom) {
            top = triggerRect.top - calendarRect.height - 4;
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
          calendarRef.current &&
          !calendarRef.current.contains(target)
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

    const handleSelect = (date: Date) => {
      onChange?.(date);
      setIsOpen(false);
    };

    const iconSize =
      size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4";

    const calendarContent = isOpen ? (
      <div
        ref={calendarRef}
        className="fixed z-[9999]"
        style={{
          top: position.top,
          left: position.left,
          visibility: positioned ? "visible" : "hidden",
        }}
      >
        <Calendar
          value={value}
          onChange={handleSelect}
          size={size ?? "md"}
          minDate={minDate}
          maxDate={maxDate}
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
            datePickerVariants({ size }),
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <CalendarIcon className={cn(iconSize, "text-muted-foreground")} />
          <span className={cn(!value && "text-muted-foreground")}>
            {value ? format(value) : placeholder}
          </span>
        </button>

        {typeof document !== "undefined" &&
          calendarContent &&
          createPortal(calendarContent, document.body)}
      </div>
    );
  },
);
DatePicker.displayName = "DatePicker";
