"use client";

import type { VariantProps } from "class-variance-authority";
import { type ReactNode, useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Textarea } from "@/components/atoms/Textarea";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  PlusIcon,
  TrashIcon,
  UsersIcon,
  XIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  calendarCellVariants,
  calendarEventSidebarVariants,
  calendarGridVariants,
  calendarHeaderVariants,
  eventCardVariants,
  eventMiniVariants,
  fullCalendarVariants,
  miniCalendarDayVariants,
  miniCalendarVariants,
  scheduleItemVariants,
  scheduleSlotVariants,
  scheduleTimelineVariants,
  scheduleWidgetVariants,
  timeslotPickerVariants,
  timeslotVariants,
  viewSwitcherItemVariants,
  viewSwitcherVariants,
} from "@/lib/variants";

// =============================================================================
// CalendarHeader
// =============================================================================

export interface CalendarHeaderProps
  extends VariantProps<typeof calendarHeaderVariants> {
  title: string;
  subtitle?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  onToday?: () => void;
  actions?: ReactNode;
  className?: string;
}

export function CalendarHeader({
  title,
  subtitle,
  onPrevious,
  onNext,
  onToday,
  actions,
  variant,
  className,
}: CalendarHeaderProps) {
  return (
    <div className={cn(calendarHeaderVariants({ variant }), className)}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={onPrevious}
          >
            <ChevronLeftIcon className="size-5" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2" onClick={onNext}>
            <ChevronRightIcon className="size-5" />
          </Button>
        </div>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {onToday && (
          <Button variant="outline" size="sm" onClick={onToday}>
            Today
          </Button>
        )}
        {actions}
      </div>
    </div>
  );
}

// =============================================================================
// CalendarGrid
// =============================================================================

export interface CalendarDay {
  date: Date;
  dayNumber: number;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  isWeekend?: boolean;
  isSelected?: boolean;
  events?: CalendarEvent[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  time?: string;
  color?:
    | "blue"
    | "green"
    | "red"
    | "yellow"
    | "purple"
    | "pink"
    | "indigo"
    | "gray";
}

export interface CalendarGridProps
  extends VariantProps<typeof calendarGridVariants> {
  days: CalendarDay[];
  weekDays?: string[];
  onDayClick?: (day: CalendarDay) => void;
  onEventClick?: (event: CalendarEvent) => void;
  renderDay?: (day: CalendarDay) => ReactNode;
  className?: string;
}

export function CalendarGrid({
  days,
  weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  onDayClick,
  onEventClick,
  renderDay,
  variant = "month",
  className,
}: CalendarGridProps) {
  return (
    <div className={className}>
      <div className={cn(calendarGridVariants({ variant }))}>
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
      <div className={cn(calendarGridVariants({ variant }))}>
        {days.map((day, index) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: Calendar day selection
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Days are calendar grid positions
            key={index}
            className={cn(
              calendarCellVariants({
                variant: day.isToday
                  ? "today"
                  : day.isSelected
                    ? "selected"
                    : day.isWeekend
                      ? "weekend"
                      : !day.isCurrentMonth
                        ? "disabled"
                        : "default",
              }),
              onDayClick && "cursor-pointer hover:bg-muted/50",
            )}
            onClick={() => onDayClick?.(day)}
          >
            {renderDay ? (
              renderDay(day)
            ) : (
              <>
                <span
                  className={cn(
                    "inline-flex size-7 items-center justify-center rounded-full text-sm",
                    day.isToday &&
                      "bg-primary text-primary-foreground font-semibold",
                    !day.isCurrentMonth && "text-muted-foreground",
                  )}
                >
                  {day.dayNumber}
                </span>
                {day.events && day.events.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {day.events.slice(0, 2).map((event) => (
                      // biome-ignore lint/a11y/useKeyWithClickEvents: Event click
                      <div
                        key={event.id}
                        className={cn(
                          eventMiniVariants({ color: event.color }),
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick?.(event);
                        }}
                      >
                        {event.time && (
                          <span className="font-medium">{event.time}</span>
                        )}{" "}
                        {event.title}
                      </div>
                    ))}
                    {day.events.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{day.events.length - 2} more
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// EventCard
// =============================================================================

export interface EventCardProps extends VariantProps<typeof eventCardVariants> {
  title: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  attendees?: { name: string; avatar?: string }[];
  isAllDay?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function EventCard({
  title,
  description,
  startTime,
  endTime,
  location,
  attendees,
  isAllDay,
  onClick,
  onEdit,
  onDelete,
  variant,
  size,
  className,
}: EventCardProps) {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Event card selection
    <div
      className={cn(
        eventCardVariants({ variant, size }),
        onClick && "cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold">{title}</h3>
        {isAllDay && (
          <Badge variant="secondary" className="text-xs">
            All Day
          </Badge>
        )}
      </div>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      )}
      <div className="mt-3 space-y-2 text-sm text-muted-foreground">
        {(startTime || endTime) && (
          <div className="flex items-center gap-2">
            <ClockIcon className="size-4" />
            <span>
              {startTime}
              {endTime && ` - ${endTime}`}
            </span>
          </div>
        )}
        {location && (
          <div className="flex items-center gap-2">
            <MapPinIcon className="size-4" />
            <span>{location}</span>
          </div>
        )}
        {attendees && attendees.length > 0 && (
          <div className="flex items-center gap-2">
            <UsersIcon className="size-4" />
            <div className="flex -space-x-2">
              {attendees.slice(0, 3).map((attendee, i) => (
                <Avatar
                  // biome-ignore lint/suspicious/noArrayIndexKey: Attendees may not have unique IDs
                  key={i}
                  src={attendee.avatar}
                  name={attendee.name}
                  size="xs"
                  className="ring-2 ring-card"
                />
              ))}
              {attendees.length > 3 && (
                <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium ring-2 ring-card">
                  +{attendees.length - 3}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {(onEdit || onDelete) && (
        <div className="mt-3 flex gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// ScheduleTimeline
// =============================================================================

export interface TimeSlot {
  time: string;
  label?: string;
  events?: ScheduleEvent[];
  isCurrentTime?: boolean;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color?:
    | "blue"
    | "green"
    | "red"
    | "yellow"
    | "purple"
    | "pink"
    | "indigo"
    | "gray";
  description?: string;
}

export interface ScheduleTimelineProps
  extends VariantProps<typeof scheduleTimelineVariants> {
  slots: TimeSlot[];
  onSlotClick?: (slot: TimeSlot) => void;
  onEventClick?: (event: ScheduleEvent) => void;
  className?: string;
}

export function ScheduleTimeline({
  slots,
  onSlotClick,
  onEventClick,
  variant,
  orientation,
  className,
}: ScheduleTimelineProps) {
  return (
    <div
      className={cn(
        scheduleTimelineVariants({ variant, orientation }),
        className,
      )}
    >
      {slots.map((slot, index) => (
        // biome-ignore lint/a11y/useKeyWithClickEvents: Slot selection
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: Slots are timeline positions
          key={index}
          className={cn(
            scheduleSlotVariants({
              hasEvent: slot.events && slot.events.length > 0,
              isCurrentTime: slot.isCurrentTime,
            }),
            onSlotClick && "cursor-pointer hover:bg-muted/50",
          )}
          onClick={() => onSlotClick?.(slot)}
        >
          <div className="absolute left-0 top-0 w-14 text-xs text-muted-foreground">
            {slot.time}
          </div>
          {slot.events?.map((event) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: Event selection
            <div
              key={event.id}
              className={cn(eventMiniVariants({ color: event.color }), "py-2")}
              onClick={(e) => {
                e.stopPropagation();
                onEventClick?.(event);
              }}
            >
              <p className="font-medium">{event.title}</p>
              <p className="text-xs opacity-80">
                {event.startTime} - {event.endTime}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// TimeslotPicker
// =============================================================================

export interface Timeslot {
  time: string;
  label?: string;
  available: boolean;
}

export interface TimeslotPickerProps
  extends VariantProps<typeof timeslotPickerVariants> {
  slots: Timeslot[];
  selectedSlot?: string;
  onSlotSelect?: (slot: Timeslot) => void;
  className?: string;
}

export function TimeslotPicker({
  slots,
  selectedSlot,
  onSlotSelect,
  variant,
  className,
}: TimeslotPickerProps) {
  return (
    <div className={cn(timeslotPickerVariants({ variant }), className)}>
      {slots.map((slot) => (
        <button
          key={slot.time}
          type="button"
          className={cn(
            timeslotVariants({
              variant: !slot.available
                ? "unavailable"
                : slot.time === selectedSlot
                  ? "selected"
                  : "available",
            }),
          )}
          disabled={!slot.available}
          onClick={() => slot.available && onSlotSelect?.(slot)}
        >
          <span className="font-medium">{slot.time}</span>
          {slot.label && (
            <span className="block text-xs opacity-80">{slot.label}</span>
          )}
        </button>
      ))}
    </div>
  );
}

// =============================================================================
// ViewSwitcher
// =============================================================================

export type CalendarView = "day" | "week" | "month" | "year";

export interface ViewSwitcherProps
  extends VariantProps<typeof viewSwitcherVariants> {
  views?: CalendarView[];
  activeView: CalendarView;
  onViewChange?: (view: CalendarView) => void;
  className?: string;
}

export function ViewSwitcher({
  views = ["day", "week", "month", "year"],
  activeView,
  onViewChange,
  variant,
  className,
}: ViewSwitcherProps) {
  const viewLabels: Record<CalendarView, string> = {
    day: "Day",
    week: "Week",
    month: "Month",
    year: "Year",
  };

  return (
    <div className={cn(viewSwitcherVariants({ variant }), className)}>
      {views.map((view) => (
        <button
          key={view}
          type="button"
          className={cn(
            viewSwitcherItemVariants({ active: activeView === view }),
          )}
          onClick={() => onViewChange?.(view)}
        >
          {viewLabels[view]}
        </button>
      ))}
    </div>
  );
}

// =============================================================================
// FullCalendar
// =============================================================================

export interface FullCalendarProps
  extends VariantProps<typeof fullCalendarVariants> {
  initialDate?: Date;
  initialView?: CalendarView;
  events?: CalendarEvent[];
  onDateChange?: (date: Date) => void;
  onViewChange?: (view: CalendarView) => void;
  onEventClick?: (event: CalendarEvent) => void;
  onDayClick?: (day: CalendarDay) => void;
  onCreateEvent?: () => void;
  showSidebar?: boolean;
  sidebarContent?: ReactNode;
  headerActions?: ReactNode;
  className?: string;
}

export function FullCalendar({
  initialDate = new Date(),
  initialView = "month",
  events = [],
  onDateChange,
  onViewChange,
  onEventClick,
  onDayClick,
  onCreateEvent,
  showSidebar = false,
  sidebarContent,
  headerActions,
  variant,
  className,
}: FullCalendarProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [view, setView] = useState<CalendarView>(initialView);

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setFullYear(newDate.getFullYear() - 1);
    }
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === "day") {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    onDateChange?.(today);
  };

  const handleViewChange = (newView: CalendarView) => {
    setView(newView);
    onViewChange?.(newView);
  };

  const getTitle = () => {
    const months = [
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
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (view === "day") {
      return `${days[currentDate.getDay()]}, ${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    }
    if (view === "week") {
      const weekStart = new Date(currentDate);
      weekStart.setDate(currentDate.getDate() - currentDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      if (weekStart.getMonth() === weekEnd.getMonth()) {
        return `${months[weekStart.getMonth()]} ${weekStart.getDate()} - ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
      }
      return `${months[weekStart.getMonth()]} ${weekStart.getDate()} - ${months[weekEnd.getMonth()]} ${weekEnd.getDate()}, ${weekStart.getFullYear()}`;
    }
    if (view === "month") {
      return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
    return `${currentDate.getFullYear()}`;
  };

  const generateMonthDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();

    // Previous month days
    for (let i = 0; i < firstDay.getDay(); i++) {
      const date = new Date(year, month, -firstDay.getDay() + i + 1);
      days.push({
        date,
        dayNumber: date.getDate(),
        isCurrentMonth: false,
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        events: events.filter(
          (e) =>
            e.time && new Date(e.time).toDateString() === date.toDateString(),
        ),
      });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        dayNumber: i,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        events: events.filter(
          (e) =>
            e.time && new Date(e.time).toDateString() === date.toDateString(),
        ),
      });
    }

    // Next month days
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        dayNumber: i,
        isCurrentMonth: false,
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        events: events.filter(
          (e) =>
            e.time && new Date(e.time).toDateString() === date.toDateString(),
        ),
      });
    }

    return days;
  };

  return (
    <div className={cn(fullCalendarVariants({ variant }), className)}>
      {/* Header */}
      <CalendarHeader
        title={getTitle()}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        variant="bordered"
        actions={
          <div className="flex items-center gap-2">
            <ViewSwitcher
              views={["day", "week", "month", "year"]}
              activeView={view}
              onViewChange={handleViewChange}
            />
            {onCreateEvent && (
              <Button size="sm" onClick={onCreateEvent}>
                <PlusIcon className="mr-2 size-4" />
                Add Event
              </Button>
            )}
            {headerActions}
          </div>
        }
      />

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <div className="w-64 border-r border-border p-4 overflow-y-auto">
            {sidebarContent || (
              <MiniCalendar
                selectedDate={currentDate}
                onDateSelect={(date) => {
                  setCurrentDate(date);
                  onDateChange?.(date);
                }}
                variant="inline"
              />
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {view === "month" && (
            <div className="p-4">
              <CalendarGrid
                days={generateMonthDays()}
                variant="month"
                onDayClick={onDayClick}
                onEventClick={onEventClick}
              />
            </div>
          )}

          {view === "year" && (
            <div className="p-4">
              <YearView
                year={currentDate.getFullYear()}
                events={events}
                onMonthClick={(month) => {
                  const newDate = new Date(currentDate.getFullYear(), month, 1);
                  setCurrentDate(newDate);
                  setView("month");
                  onDateChange?.(newDate);
                  onViewChange?.("month");
                }}
                onDayClick={(date) => {
                  setCurrentDate(date);
                  setView("day");
                  onDateChange?.(date);
                  onViewChange?.("day");
                }}
              />
            </div>
          )}

          {view === "day" && (
            <DayView
              date={currentDate}
              events={events}
              onEventClick={onEventClick}
              onTimeSlotClick={(hour) => {
                console.log(`Time slot clicked: ${hour}:00`);
              }}
            />
          )}

          {view === "week" && (
            <WeekView
              startDate={currentDate}
              events={events}
              onEventClick={onEventClick}
              onTimeSlotClick={(date, hour) => {
                console.log(
                  `Time slot clicked: ${date.toDateString()} ${hour}:00`,
                );
              }}
              onDayClick={(date) => {
                setCurrentDate(date);
                setView("day");
                onDateChange?.(date);
                onViewChange?.("day");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// YearView (internal component)
// =============================================================================

interface YearViewProps {
  year: number;
  onMonthClick?: (month: number) => void;
  onDayClick?: (date: Date) => void;
  events?: CalendarEvent[];
}

function YearView({
  year,
  onMonthClick,
  onDayClick,
  events = [],
}: YearViewProps) {
  const months = [
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
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const today = new Date();

  const getMonthDays = (monthIndex: number) => {
    const days: { date: Date; dayNumber: number; isCurrentMonth: boolean }[] =
      [];
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);

    // Previous month padding
    for (let i = 0; i < firstDay.getDay(); i++) {
      const date = new Date(year, monthIndex, -firstDay.getDay() + i + 1);
      days.push({ date, dayNumber: date.getDate(), isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, monthIndex, i);
      days.push({ date, dayNumber: i, isCurrentMonth: true });
    }

    // Next month padding (fill to 42 cells for 6 rows)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, monthIndex + 1, i);
      days.push({ date, dayNumber: i, isCurrentMonth: false });
    }

    return days;
  };

  const isToday = (date: Date) => date.toDateString() === today.toDateString();

  const hasEvents = (date: Date) => {
    return events.some(
      (e) => e.time && new Date(e.time).toDateString() === date.toDateString(),
    );
  };

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {months.map((month, monthIndex) => (
        <div
          key={month}
          className="p-3 rounded-lg border border-border hover:border-primary/50 transition-colors bg-card"
        >
          <button
            type="button"
            className="w-full text-left font-semibold text-sm mb-2 hover:text-primary transition-colors"
            onClick={() => onMonthClick?.(monthIndex)}
          >
            {month}
          </button>
          <div className="grid grid-cols-7 gap-0">
            {/* Week day headers */}
            {weekDays.map((d, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: Fixed weekday array
                key={i}
                className="text-center text-[10px] text-muted-foreground font-medium py-0.5"
              >
                {d}
              </span>
            ))}
            {/* Day cells */}
            {getMonthDays(monthIndex).map(
              ({ date, dayNumber, isCurrentMonth }, i) => (
                <button
                  // biome-ignore lint/suspicious/noArrayIndexKey: Calendar grid positions
                  key={i}
                  type="button"
                  className={cn(
                    "relative size-6 flex items-center justify-center text-[10px] rounded-full transition-colors",
                    !isCurrentMonth && "text-muted-foreground/40",
                    isCurrentMonth && "hover:bg-muted",
                    isToday(date) &&
                      isCurrentMonth &&
                      "bg-primary text-primary-foreground font-semibold",
                    hasEvents(date) &&
                      isCurrentMonth &&
                      !isToday(date) &&
                      "font-semibold text-primary",
                  )}
                  onClick={() => {
                    if (isCurrentMonth && onDayClick) {
                      onDayClick(date);
                    }
                  }}
                  disabled={!isCurrentMonth}
                >
                  {dayNumber}
                  {hasEvents(date) && isCurrentMonth && !isToday(date) && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 size-0.5 rounded-full bg-primary" />
                  )}
                </button>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// DayView (internal component)
// =============================================================================

interface DayViewProps {
  date: Date;
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onTimeSlotClick?: (hour: number) => void;
}

function DayView({
  date,
  events = [],
  onEventClick,
  onTimeSlotClick,
}: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Get events for this day
  const dayEvents = events.filter(
    (e) => e.time && new Date(e.time).toDateString() === date.toDateString(),
  );

  // Parse event time to get hour
  const getEventHour = (event: CalendarEvent) => {
    if (!event.time) return 0;
    const eventDate = new Date(event.time);
    return eventDate.getHours();
  };

  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return "12 PM";
    return `${hour - 12} PM`;
  };

  return (
    <div className="relative">
      {/* Current time indicator */}
      {isToday && (
        <div
          className="absolute left-14 right-0 z-10 border-t-2 border-red-500"
          style={{ top: `${(currentHour * 60 + currentMinute) * (64 / 60)}px` }}
        >
          <div className="absolute -left-2 -top-1.5 size-3 rounded-full bg-red-500" />
        </div>
      )}

      {/* Time grid */}
      <div className="relative">
        {hours.map((hour) => {
          const hourEvents = dayEvents.filter((e) => getEventHour(e) === hour);
          return (
            // biome-ignore lint/a11y/useKeyWithClickEvents: Time slot selection
            <div
              key={hour}
              className={cn(
                "flex min-h-[64px] border-b border-border",
                onTimeSlotClick && "cursor-pointer hover:bg-muted/30",
              )}
              onClick={() => onTimeSlotClick?.(hour)}
            >
              {/* Time label */}
              <div className="w-14 flex-shrink-0 pr-2 text-right">
                <span className="text-xs text-muted-foreground">
                  {formatHour(hour)}
                </span>
              </div>
              {/* Event area */}
              <div className="flex-1 border-l border-border pl-2 py-1">
                {hourEvents.map((event) => (
                  // biome-ignore lint/a11y/useKeyWithClickEvents: Event selection
                  <div
                    key={event.id}
                    className={cn(
                      eventMiniVariants({ color: event.color }),
                      "mb-1 py-1.5 px-2 cursor-pointer",
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick?.(event);
                    }}
                  >
                    <p className="font-medium text-xs">{event.title}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// WeekView (internal component)
// =============================================================================

interface WeekViewProps {
  startDate: Date;
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onTimeSlotClick?: (date: Date, hour: number) => void;
  onDayClick?: (date: Date) => void;
}

function WeekView({
  startDate,
  events = [],
  onEventClick,
  onTimeSlotClick,
  onDayClick,
}: WeekViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const today = new Date();
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Get week days starting from Sunday
  const weekStart = new Date(startDate);
  weekStart.setDate(startDate.getDate() - startDate.getDay());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatHour = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return "12 PM";
    return `${hour - 12} PM`;
  };

  const getEventsForDayHour = (date: Date, hour: number) => {
    return events.filter((e) => {
      if (!e.time) return false;
      const eventDate = new Date(e.time);
      return (
        eventDate.toDateString() === date.toDateString() &&
        eventDate.getHours() === hour
      );
    });
  };

  const isTodayDate = (date: Date) =>
    date.toDateString() === today.toDateString();
  const todayIndex = weekDays.findIndex((d) => isTodayDate(d));

  return (
    <div className="flex flex-col h-full">
      {/* Day headers */}
      <div className="flex border-b border-border sticky top-0 bg-card z-10">
        <div className="w-14 flex-shrink-0" />
        {weekDays.map((date, i) => (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: Fixed weekday positions
            key={i}
            type="button"
            className={cn(
              "flex-1 py-2 text-center border-l border-border hover:bg-muted/50 transition-colors",
              isTodayDate(date) && "bg-primary/5",
            )}
            onClick={() => onDayClick?.(date)}
          >
            <p className="text-xs text-muted-foreground">{dayNames[i]}</p>
            <p
              className={cn(
                "text-lg font-semibold",
                isTodayDate(date) && "text-primary",
              )}
            >
              {date.getDate()}
            </p>
            <p className="text-xs text-muted-foreground">
              {months[date.getMonth()]}
            </p>
          </button>
        ))}
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-y-auto relative">
        {/* Current time indicator */}
        {todayIndex !== -1 && (
          <div
            className="absolute z-10 pointer-events-none"
            style={{
              top: `${(currentHour * 60 + currentMinute) * (64 / 60)}px`,
              left: `calc(3.5rem + (100% - 3.5rem) * ${todayIndex} / 7)`,
              width: "calc((100% - 3.5rem) / 7)",
            }}
          >
            <div className="relative">
              <div className="absolute -left-1.5 -top-1.5 size-3 rounded-full bg-red-500" />
              <div className="border-t-2 border-red-500" />
            </div>
          </div>
        )}

        {hours.map((hour) => (
          <div key={hour} className="flex min-h-[64px] border-b border-border">
            {/* Time label */}
            <div className="w-14 flex-shrink-0 pr-2 text-right">
              <span className="text-xs text-muted-foreground">
                {formatHour(hour)}
              </span>
            </div>
            {/* Day columns */}
            {weekDays.map((date, dayIndex) => {
              const dayHourEvents = getEventsForDayHour(date, hour);
              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: Day slot selection
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: Week day grid positions
                  key={dayIndex}
                  className={cn(
                    "flex-1 border-l border-border p-0.5",
                    isTodayDate(date) && "bg-primary/5",
                    onTimeSlotClick && "cursor-pointer hover:bg-muted/30",
                  )}
                  onClick={() => onTimeSlotClick?.(date, hour)}
                >
                  {dayHourEvents.map((event) => (
                    // biome-ignore lint/a11y/useKeyWithClickEvents: Event selection
                    <div
                      key={event.id}
                      className={cn(
                        eventMiniVariants({ color: event.color }),
                        "mb-0.5 py-1 px-1 cursor-pointer text-[10px]",
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                    >
                      <p className="font-medium truncate">{event.title}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// MiniCalendar
// =============================================================================

export interface MiniCalendarProps
  extends VariantProps<typeof miniCalendarVariants> {
  initialDate?: Date;
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  events?: { date: Date }[];
  showYearView?: boolean;
  className?: string;
}

export function MiniCalendar({
  initialDate = new Date(),
  selectedDate,
  onDateSelect,
  events = [],
  showYearView = false,
  variant,
  size,
  className,
}: MiniCalendarProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [isYearView, setIsYearView] = useState(showYearView);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const handlePrevYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1),
    );
  };

  const handleNextYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1),
    );
  };

  const getDaysInMonth = () => {
    const days: { date: Date; isCurrentMonth: boolean }[] = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    for (let i = 0; i < firstDay.getDay(); i++) {
      const date = new Date(year, month, -firstDay.getDay() + i + 1);
      days.push({ date, isCurrentMonth: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const hasEvents = (date: Date) => {
    return events.some((e) => e.date.toDateString() === date.toDateString());
  };

  const getDayVariant = (date: Date, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return "disabled";
    if (isToday(date)) return "today";
    if (isSelected(date)) return "selected";
    if (hasEvents(date)) return "hasEvents";
    return "default";
  };

  if (isYearView) {
    return (
      <div className={cn(miniCalendarVariants({ variant, size }), className)}>
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={handlePrevYear}
            className="p-1 hover:bg-muted rounded"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <button
            type="button"
            className="font-medium hover:bg-muted px-2 py-1 rounded"
            onClick={() => setIsYearView(false)}
          >
            {currentDate.getFullYear()}
          </button>
          <button
            type="button"
            onClick={handleNextYear}
            className="p-1 hover:bg-muted rounded"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {months.map((month, index) => (
            <button
              key={month}
              type="button"
              className={cn(
                "p-2 rounded-md text-sm hover:bg-muted transition-colors",
                currentDate.getMonth() === index &&
                  "bg-primary/10 text-primary font-medium",
              )}
              onClick={() => {
                setCurrentDate(new Date(currentDate.getFullYear(), index, 1));
                setIsYearView(false);
              }}
            >
              {month}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(miniCalendarVariants({ variant, size }), className)}>
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1 hover:bg-muted rounded"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <button
          type="button"
          className="font-medium hover:bg-muted px-2 py-1 rounded"
          onClick={() => setIsYearView(true)}
        >
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </button>
        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1 hover:bg-muted rounded"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0">
        {weekDays.map((day) => (
          <div
            key={day}
            className="size-8 flex items-center justify-center text-xs text-muted-foreground font-medium"
          >
            {day}
          </div>
        ))}
        {getDaysInMonth().map(({ date, isCurrentMonth }, index) => (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: Calendar grid positions
            key={index}
            type="button"
            className={cn(
              miniCalendarDayVariants({
                variant: getDayVariant(date, isCurrentMonth),
              }),
            )}
            disabled={!isCurrentMonth}
            onClick={() => onDateSelect?.(date)}
          >
            {date.getDate()}
            {hasEvents(date) && isCurrentMonth && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// CalendarEventSidebar
// =============================================================================

export interface CalendarEventFormData {
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  isAllDay?: boolean;
  color?: CalendarEvent["color"];
}

export interface CalendarEventSidebarProps
  extends VariantProps<typeof calendarEventSidebarVariants> {
  mode: "create" | "edit";
  initialData?: Partial<CalendarEventFormData>;
  onSave?: (data: CalendarEventFormData) => void;
  onDelete?: () => void;
  onClose?: () => void;
  className?: string;
}

export function CalendarEventSidebar({
  mode,
  initialData,
  onSave,
  onDelete,
  onClose,
  variant,
  size,
  className,
}: CalendarEventSidebarProps) {
  const [formData, setFormData] = useState<CalendarEventFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    date: initialData?.date || new Date().toISOString().split("T")[0],
    startTime: initialData?.startTime || "09:00",
    endTime: initialData?.endTime || "10:00",
    location: initialData?.location || "",
    isAllDay: initialData?.isAllDay || false,
    color: initialData?.color || "blue",
  });

  const colorOptions: { value: CalendarEvent["color"]; label: string }[] = [
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "red", label: "Red" },
    { value: "yellow", label: "Yellow" },
    { value: "purple", label: "Purple" },
    { value: "pink", label: "Pink" },
    { value: "indigo", label: "Indigo" },
    { value: "gray", label: "Gray" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(formData);
  };

  return (
    <div
      className={cn(calendarEventSidebarVariants({ variant, size }), className)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">
          {mode === "create" ? "Create Event" : "Edit Event"}
        </h3>
        {onClose && (
          <Button variant="ghost" size="sm" className="p-2" onClick={onClose}>
            <XIcon className="size-4" />
          </Button>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex-1 space-y-4 overflow-y-auto"
      >
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Event title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Event description"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id="isAllDay"
            checked={formData.isAllDay}
            onChange={(e) =>
              setFormData({ ...formData, isAllDay: e.target.checked })
            }
            className="rounded border-border"
          />
          <Label htmlFor="isAllDay" className="cursor-pointer">
            All day
          </Label>
        </div>

        {!formData.isAllDay && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            placeholder="Add location"
          />
        </div>

        <div className="space-y-2">
          <Label>Color</Label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                type="button"
                className={cn(
                  "size-6 rounded-full transition-all",
                  color.value === "blue" && "bg-blue-500",
                  color.value === "green" && "bg-green-500",
                  color.value === "red" && "bg-red-500",
                  color.value === "yellow" && "bg-yellow-500",
                  color.value === "purple" && "bg-purple-500",
                  color.value === "pink" && "bg-pink-500",
                  color.value === "indigo" && "bg-indigo-500",
                  color.value === "gray" && "bg-gray-500",
                  formData.color === color.value &&
                    "ring-2 ring-offset-2 ring-primary",
                )}
                onClick={() => setFormData({ ...formData, color: color.value })}
                title={color.label}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-border">
          {mode === "edit" && onDelete && (
            <Button type="button" variant="destructive" onClick={onDelete}>
              <TrashIcon className="mr-2 size-4" />
              Delete
            </Button>
          )}
          <div className="flex-1" />
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button type="submit">{mode === "create" ? "Create" : "Save"}</Button>
        </div>
      </form>
    </div>
  );
}

// =============================================================================
// ScheduleWidget
// =============================================================================

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  endTime?: string;
  description?: string;
  type?: "meeting" | "task" | "reminder" | "appointment";
  status?: "upcoming" | "in-progress" | "completed";
  attendees?: { name: string; avatar?: string }[];
}

export interface ScheduleWidgetProps
  extends VariantProps<typeof scheduleWidgetVariants> {
  title?: string;
  date?: Date;
  items: ScheduleItem[];
  onItemClick?: (item: ScheduleItem) => void;
  onAddClick?: () => void;
  showDate?: boolean;
  maxItems?: number;
  emptyMessage?: string;
  className?: string;
}

export function ScheduleWidget({
  title = "Schedule",
  date = new Date(),
  items,
  onItemClick,
  onAddClick,
  showDate = true,
  maxItems,
  emptyMessage = "No events scheduled",
  variant,
  className,
}: ScheduleWidgetProps) {
  const months = [
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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const displayItems = maxItems ? items.slice(0, maxItems) : items;

  const getTypeColor = (type?: ScheduleItem["type"]) => {
    switch (type) {
      case "meeting":
        return "bg-blue-500";
      case "task":
        return "bg-green-500";
      case "reminder":
        return "bg-yellow-500";
      case "appointment":
        return "bg-purple-500";
      default:
        return "bg-primary";
    }
  };

  const getStatusBadge = (status?: ScheduleItem["status"]) => {
    switch (status) {
      case "in-progress":
        return (
          <Badge variant="default" className="text-xs">
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="secondary" className="text-xs">
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn(scheduleWidgetVariants({ variant }), className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {showDate && (
            <p className="text-sm text-muted-foreground">
              {days[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}
            </p>
          )}
        </div>
        {onAddClick && (
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={onAddClick}
          >
            <PlusIcon className="size-4" />
          </Button>
        )}
      </div>

      {/* Items */}
      <div className="divide-y divide-border">
        {displayItems.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <CalendarIcon className="mx-auto size-8 mb-2 opacity-50" />
            <p>{emptyMessage}</p>
          </div>
        ) : (
          displayItems.map((item) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: Item selection
            <div
              key={item.id}
              className={cn(scheduleItemVariants({ variant: "default" }))}
              onClick={() => onItemClick?.(item)}
            >
              <div
                className={cn(
                  "w-1 self-stretch rounded-full",
                  getTypeColor(item.type),
                )}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium truncate">{item.title}</h4>
                  {getStatusBadge(item.status)}
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <ClockIcon className="size-3.5" />
                  <span>
                    {item.time}
                    {item.endTime && ` - ${item.endTime}`}
                  </span>
                </div>
                {item.description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                    {item.description}
                  </p>
                )}
                {item.attendees && item.attendees.length > 0 && (
                  <div className="flex items-center gap-1 mt-2">
                    <div className="flex -space-x-2">
                      {item.attendees.slice(0, 3).map((attendee, i) => (
                        <Avatar
                          // biome-ignore lint/suspicious/noArrayIndexKey: Attendees may not have unique IDs
                          key={i}
                          src={attendee.avatar}
                          name={attendee.name}
                          size="xs"
                          className="ring-2 ring-card"
                        />
                      ))}
                    </div>
                    {item.attendees.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{item.attendees.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {maxItems && items.length > maxItems && (
        <div className="p-3 border-t border-border text-center">
          <Button variant="ghost" size="sm">
            View all {items.length} events
          </Button>
        </div>
      )}
    </div>
  );
}
