import type { Meta, StoryObj } from "@storybook/react";
import {
  CalendarHeader,
  CalendarGrid,
  EventCard,
  ScheduleTimeline,
  TimeslotPicker,
  type CalendarDay,
  type TimeSlot,
  type Timeslot,
} from "./index";
import { Button } from "@/components/atoms/Button";
import { PlusIcon } from "@/lib/icons";

const meta: Meta<typeof CalendarGrid> = {
  title: "Organisms/CalendarScheduling",
  component: CalendarGrid,
  parameters: {
    layout: "centered",
  },
};

export default meta;

// =============================================================================
// CalendarHeader Stories
// =============================================================================

export const CalendarHeaderDefault: StoryObj<typeof CalendarHeader> = {
  render: () => (
    <div className="w-[600px] rounded-xl border border-border bg-card">
      <CalendarHeader
        title="January 2024"
        subtitle="Week 3"
        onPrevious={() => console.log("Previous")}
        onNext={() => console.log("Next")}
        onToday={() => console.log("Today")}
        actions={
          <Button size="sm">
            <PlusIcon className="size-4 mr-1" />
            Add Event
          </Button>
        }
      />
    </div>
  ),
};

// =============================================================================
// CalendarGrid Stories
// =============================================================================

const generateCalendarDays = (): CalendarDay[] => {
  const days: CalendarDay[] = [];
  const today = new Date();
  const currentMonth = today.getMonth();

  // Previous month padding
  for (let i = 0; i < 3; i++) {
    days.push({
      date: new Date(2024, currentMonth - 1, 28 + i),
      dayNumber: 28 + i,
      isCurrentMonth: false,
    });
  }

  // Current month
  for (let i = 1; i <= 31; i++) {
    const isToday = i === today.getDate();
    const isWeekend = [0, 6].includes(
      new Date(2024, currentMonth, i).getDay()
    );
    days.push({
      date: new Date(2024, currentMonth, i),
      dayNumber: i,
      isToday,
      isCurrentMonth: true,
      isWeekend,
      events:
        i === 15
          ? [
              { id: "1", title: "Team Meeting", time: "10:00", color: "blue" },
              { id: "2", title: "Lunch", time: "12:00", color: "green" },
            ]
          : i === 20
          ? [{ id: "3", title: "Review", time: "14:00", color: "purple" }]
          : undefined,
    });
  }

  // Next month padding
  for (let i = 1; i <= 4; i++) {
    days.push({
      date: new Date(2024, currentMonth + 1, i),
      dayNumber: i,
      isCurrentMonth: false,
    });
  }

  return days.slice(0, 35); // 5 weeks
};

export const CalendarGridDefault: StoryObj<typeof CalendarGrid> = {
  render: () => (
    <div className="w-[700px] rounded-xl border border-border bg-card p-4">
      <CalendarHeader
        title="January 2024"
        onPrevious={() => {}}
        onNext={() => {}}
        onToday={() => {}}
        variant="bordered"
      />
      <CalendarGrid
        days={generateCalendarDays()}
        onDayClick={(day) => console.log("Day clicked:", day)}
        onEventClick={(event) => console.log("Event clicked:", event)}
      />
    </div>
  ),
};

// =============================================================================
// EventCard Stories
// =============================================================================

export const EventCardDefault: StoryObj<typeof EventCard> = {
  render: () => (
    <div className="w-[350px]">
      <EventCard
        title="Team Weekly Standup"
        description="Discuss project progress and upcoming tasks for the week."
        startTime="10:00 AM"
        endTime="11:00 AM"
        location="Conference Room A"
        attendees={[
          { name: "John Doe", avatar: "https://i.pravatar.cc/100?img=1" },
          { name: "Jane Smith", avatar: "https://i.pravatar.cc/100?img=2" },
          { name: "Mike Johnson" },
          { name: "Sarah Wilson" },
        ]}
      />
    </div>
  ),
};

export const EventCardVariants: StoryObj<typeof EventCard> = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <EventCard
        title="Design Review"
        startTime="2:00 PM"
        endTime="3:00 PM"
        variant="primary"
      />
      <EventCard
        title="Sprint Planning"
        startTime="9:00 AM"
        isAllDay
        variant="success"
      />
      <EventCard
        title="Deadline: Project Submission"
        startTime="5:00 PM"
        variant="error"
      />
      <EventCard
        title="Team Lunch"
        startTime="12:00 PM"
        location="Cafeteria"
        variant="warning"
      />
    </div>
  ),
};

// =============================================================================
// ScheduleTimeline Stories
// =============================================================================

const scheduleSlots: TimeSlot[] = [
  { time: "8:00 AM", label: "Morning" },
  {
    time: "9:00 AM",
    events: [
      {
        id: "1",
        title: "Daily Standup",
        startTime: "9:00",
        endTime: "9:30",
        color: "blue",
      },
    ],
  },
  { time: "10:00 AM" },
  {
    time: "11:00 AM",
    events: [
      {
        id: "2",
        title: "Client Call",
        startTime: "11:00",
        endTime: "12:00",
        color: "green",
      },
    ],
  },
  { time: "12:00 PM", label: "Lunch" },
  { time: "1:00 PM" },
  {
    time: "2:00 PM",
    isCurrentTime: true,
    events: [
      {
        id: "3",
        title: "Design Review",
        startTime: "2:00",
        endTime: "3:30",
        color: "purple",
      },
    ],
  },
  { time: "3:00 PM" },
  { time: "4:00 PM" },
  { time: "5:00 PM", label: "End of day" },
];

export const ScheduleTimelineDefault: StoryObj<typeof ScheduleTimeline> = {
  render: () => (
    <div className="w-[500px] rounded-xl border border-border bg-card p-4">
      <h3 className="font-semibold mb-4">Today&apos;s Schedule</h3>
      <ScheduleTimeline
        slots={scheduleSlots}
        onSlotClick={(slot) => console.log("Slot clicked:", slot)}
        onEventClick={(event) => console.log("Event clicked:", event)}
      />
    </div>
  ),
};

// =============================================================================
// TimeslotPicker Stories
// =============================================================================

const availableSlots: Timeslot[] = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "1:00 PM", available: true },
  { time: "1:30 PM", available: true },
  { time: "2:00 PM", available: false },
  { time: "2:30 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "3:30 PM", available: false },
];

export const TimeslotPickerDefault: StoryObj<typeof TimeslotPicker> = {
  render: () => (
    <div className="w-[400px] rounded-xl border border-border bg-card p-4">
      <h3 className="font-semibold mb-4">Select a Time</h3>
      <TimeslotPicker
        slots={availableSlots}
        selectedSlot="10:00 AM"
        onSlotSelect={(slot) => console.log("Selected:", slot)}
      />
    </div>
  ),
};

export const TimeslotPickerCompact: StoryObj<typeof TimeslotPicker> = {
  render: () => (
    <div className="w-[400px] rounded-xl border border-border bg-card p-4">
      <h3 className="font-semibold mb-4">Available Slots</h3>
      <TimeslotPicker
        slots={availableSlots}
        variant="compact"
        onSlotSelect={(slot) => console.log("Selected:", slot)}
      />
    </div>
  ),
};

// =============================================================================
// Combined Calendar View
// =============================================================================

export const FullCalendarView: StoryObj<typeof CalendarGrid> = {
  render: () => (
    <div className="w-[900px] rounded-xl border border-border bg-card overflow-hidden">
      <CalendarHeader
        title="January 2024"
        onPrevious={() => {}}
        onNext={() => {}}
        onToday={() => {}}
        actions={
          <Button size="sm">
            <PlusIcon className="size-4 mr-1" />
            Add Event
          </Button>
        }
      />
      <div className="grid grid-cols-[1fr_300px]">
        <div className="p-4 border-r border-border">
          <CalendarGrid
            days={generateCalendarDays()}
            onDayClick={(day) => console.log("Day clicked:", day)}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold mb-4">Today&apos;s Events</h3>
          <div className="space-y-3">
            <EventCard
              title="Team Standup"
              startTime="9:00 AM"
              endTime="9:30 AM"
              variant="primary"
              size="sm"
            />
            <EventCard
              title="Client Meeting"
              startTime="11:00 AM"
              endTime="12:00 PM"
              location="Zoom"
              variant="success"
              size="sm"
            />
            <EventCard
              title="Design Review"
              startTime="2:00 PM"
              endTime="3:30 PM"
              variant="warning"
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};
