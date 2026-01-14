"use client";

import { forwardRef, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { datePickerVariants, calendarVariants, calendarDayVariants } from "@/lib/variants/datePicker";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons";
import { Button } from "@/components/atoms";
import type { VariantProps } from "class-variance-authority";

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
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Calendar = ({ value, onChange, size = "md", minDate, maxDate }: CalendarProps) => {
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
            })
          )}
          onClick={() => onChange?.(date)}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const buttonSize = size === "sm" ? "sm" : size === "lg" ? "md" : "sm";
  const iconSize = size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4";

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
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
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
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => document.removeEventListener("mousedown", handleClickOutside);
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

    const iconSize = size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4";

    return (
      <div ref={containerRef} className="relative inline-block" {...props}>
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          disabled={disabled}
          className={cn(
            datePickerVariants({ size }),
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <CalendarIcon className={cn(iconSize, "text-muted-foreground")} />
          <span className={cn(!value && "text-muted-foreground")}>
            {value ? format(value) : placeholder}
          </span>
        </button>

        {isOpen && (
          <div className="absolute top-full z-50 mt-1">
            <Calendar
              value={value}
              onChange={handleSelect}
              size={size ?? "md"}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
        )}
      </div>
    );
  }
);
DatePicker.displayName = "DatePicker";
