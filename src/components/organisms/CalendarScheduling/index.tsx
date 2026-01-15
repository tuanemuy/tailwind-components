"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  calendarHeaderVariants,
  calendarGridVariants,
  calendarCellVariants,
  eventCardVariants,
  eventMiniVariants,
  scheduleTimelineVariants,
  scheduleSlotVariants,
  timeslotPickerVariants,
  timeslotVariants,
} from "@/lib/variants";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Avatar } from "@/components/atoms/Avatar";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  CalendarIcon,
} from "@/lib/icons";
import type { VariantProps } from "class-variance-authority";

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
          <Button variant="ghost" size="icon" onClick={onPrevious}>
            <ChevronLeftIcon className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext}>
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
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "pink" | "indigo" | "gray";
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
          <div
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
              onDayClick && "cursor-pointer hover:bg-muted/50"
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
                    !day.isCurrentMonth && "text-muted-foreground"
                  )}
                >
                  {day.dayNumber}
                </span>
                {day.events && day.events.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {day.events.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={cn(eventMiniVariants({ color: event.color }))}
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
    <div
      className={cn(
        eventCardVariants({ variant, size }),
        onClick && "cursor-pointer",
        className
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
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "pink" | "indigo" | "gray";
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
      className={cn(scheduleTimelineVariants({ variant, orientation }), className)}
    >
      {slots.map((slot, index) => (
        <div
          key={index}
          className={cn(
            scheduleSlotVariants({
              hasEvent: slot.events && slot.events.length > 0,
              isCurrentTime: slot.isCurrentTime,
            }),
            onSlotClick && "cursor-pointer hover:bg-muted/50"
          )}
          onClick={() => onSlotClick?.(slot)}
        >
          <div className="absolute left-0 top-0 w-14 text-xs text-muted-foreground">
            {slot.time}
          </div>
          {slot.events?.map((event) => (
            <div
              key={event.id}
              className={cn(
                eventMiniVariants({ color: event.color }),
                "py-2"
              )}
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
            })
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
// Exports
// =============================================================================

export type {
  CalendarDay,
  CalendarEvent,
  TimeSlot,
  ScheduleEvent,
  Timeslot,
};
