"use client";

import type { VariantProps } from "class-variance-authority";
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/atoms";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  calendarDayVariants,
  calendarVariants,
  datePickerVariants,
} from "@/lib/variants/datePicker";

type DatePickerSize = "sm" | "md" | "lg";

export interface DateRange {
  start?: Date;
  end?: Date;
}

// Range Calendar Component
interface RangeCalendarProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
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

const RangeCalendar = ({
  value,
  onChange,
  size = "md",
  minDate,
  maxDate,
}: RangeCalendarProps) => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(value?.start ?? today);
  const [selectingEnd, setSelectingEnd] = useState(false);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

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

  const isInRange = (date: Date) => {
    if (!value?.start) return false;
    const endDate = selectingEnd && hoverDate ? hoverDate : value?.end;
    if (!endDate) return false;
    return date > value.start && date < endDate;
  };

  const handleDateClick = (date: Date) => {
    if (!value?.start || selectingEnd) {
      if (!value?.start) {
        onChange?.({ start: date, end: undefined });
        setSelectingEnd(true);
      } else {
        if (date < value.start) {
          onChange?.({ start: date, end: value.start });
        } else {
          onChange?.({ start: value.start, end: date });
        }
        setSelectingEnd(false);
      }
    } else {
      onChange?.({ start: date, end: undefined });
      setSelectingEnd(true);
    }
  };

  const getDayVariant = (date: Date) => {
    const isStart = value?.start && isSameDay(date, value.start);
    const isEnd = value?.end && isSameDay(date, value.end);
    const inRange = isInRange(date);
    const isToday = isSameDay(date, today);

    if (isStart) return "rangeStart";
    if (isEnd) return "rangeEnd";
    if (inRange) return "range";
    if (isToday) return "today";
    return "default";
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
      const disabled = isDateDisabled(date);
      const variant = getDayVariant(date);

      days.push(
        <button
          key={day}
          type="button"
          disabled={disabled}
          className={cn(calendarDayVariants({ size, variant }))}
          onClick={() => handleDateClick(date)}
          onMouseEnter={() => selectingEnd && setHoverDate(date)}
          onMouseLeave={() => setHoverDate(null)}
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

      {/* Selection hint */}
      <div className="mt-2 text-center text-xs text-muted-foreground">
        {selectingEnd ? "Select end date" : "Select start date"}
      </div>
    </div>
  );
};

// DateRangePicker Component
export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof datePickerVariants> {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  format?: (range: DateRange) => string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
}

const defaultFormat = (range: DateRange): string => {
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  if (range.start && range.end) {
    return `${formatDate(range.start)} - ${formatDate(range.end)}`;
  }
  if (range.start) {
    return `${formatDate(range.start)} - ...`;
  }
  return "";
};

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      className,
      size = "md",
      value,
      onChange,
      placeholder = "Select date range",
      format = defaultFormat,
      minDate,
      maxDate,
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

    const handleRangeChange = (range: DateRange) => {
      onChange?.(range);
      if (range.start && range.end) {
        setIsOpen(false);
      }
    };

    const iconSize =
      size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4";
    const hasValue = value?.start || value?.end;

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
        <RangeCalendar
          value={value}
          onChange={handleRangeChange}
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
            "min-w-[200px]",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <CalendarIcon className={cn(iconSize, "text-muted-foreground")} />
          <span className={cn(!hasValue && "text-muted-foreground")}>
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
DateRangePicker.displayName = "DateRangePicker";
