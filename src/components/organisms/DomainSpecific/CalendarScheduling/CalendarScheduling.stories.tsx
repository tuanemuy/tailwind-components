import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms/Button";
import { PlusIcon } from "@/lib/icons";
import {
  type CalendarDay,
  type CalendarEvent,
  CalendarEventSidebar,
  CalendarGrid,
  CalendarHeader,
  EventCard,
  FullCalendar,
  MiniCalendar,
  type ScheduleItem,
  ScheduleTimeline,
  ScheduleWidget,
  type TimeSlot,
  type Timeslot,
  TimeslotPicker,
} from "./index";

const meta: Meta<typeof CalendarGrid> = {
  title: "Organisms/DomainSpecific/CalendarScheduling",
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
    const isWeekend = [0, 6].includes(new Date(2024, currentMonth, i).getDay());
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

export const CombinedCalendarView: StoryObj<typeof CalendarGrid> = {
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

// =============================================================================
// FullCalendar Stories
// =============================================================================

// Get dates relative to today for dynamic stories
const today = new Date();
const getDateString = (daysOffset: number, hour = 10) => {
  const date = new Date(today);
  date.setDate(date.getDate() + daysOffset);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
};

const sampleEvents: CalendarEvent[] = [
  { id: "1", title: "Team Meeting", time: getDateString(0, 10), color: "blue" },
  {
    id: "2",
    title: "Project Review",
    time: getDateString(0, 14),
    color: "green",
  },
  {
    id: "3",
    title: "Client Call",
    time: getDateString(1, 11),
    color: "purple",
  },
  {
    id: "4",
    title: "Sprint Planning",
    time: getDateString(2, 9),
    color: "red",
  },
  {
    id: "5",
    title: "Design Review",
    time: getDateString(3, 15),
    color: "yellow",
  },
  { id: "6", title: "Lunch Break", time: getDateString(0, 12), color: "gray" },
  {
    id: "7",
    title: "Code Review",
    time: getDateString(0, 16),
    color: "indigo",
  },
  {
    id: "8",
    title: "1:1 with Manager",
    time: getDateString(1, 14),
    color: "pink",
  },
];

export const FullCalendarDefault: StoryObj<typeof FullCalendar> = {
  render: () => (
    <div className="w-[1000px] h-[700px]">
      <FullCalendar
        events={sampleEvents}
        onCreateEvent={() => console.log("Create event")}
        onEventClick={(event) => console.log("Event clicked:", event)}
        onDayClick={(day) => console.log("Day clicked:", day)}
      />
    </div>
  ),
};

export const FullCalendarWithSidebar: StoryObj<typeof FullCalendar> = {
  render: () => (
    <div className="w-[1200px] h-[700px]">
      <FullCalendar
        events={sampleEvents}
        showSidebar
        onCreateEvent={() => console.log("Create event")}
        onEventClick={(event) => console.log("Event clicked:", event)}
      />
    </div>
  ),
};

export const FullCalendarYearView: StoryObj<typeof FullCalendar> = {
  render: () => (
    <div className="w-[1000px] h-[700px]">
      <FullCalendar
        initialView="year"
        events={sampleEvents}
        onCreateEvent={() => console.log("Create event")}
      />
    </div>
  ),
};

export const FullCalendarDayView: StoryObj<typeof FullCalendar> = {
  render: () => (
    <div className="w-[800px] h-[700px]">
      <FullCalendar
        initialView="day"
        events={sampleEvents}
        onCreateEvent={() => console.log("Create event")}
        onEventClick={(event) => console.log("Event clicked:", event)}
      />
    </div>
  ),
};

export const FullCalendarWeekView: StoryObj<typeof FullCalendar> = {
  render: () => (
    <div className="w-[1200px] h-[700px]">
      <FullCalendar
        initialView="week"
        events={sampleEvents}
        onCreateEvent={() => console.log("Create event")}
        onEventClick={(event) => console.log("Event clicked:", event)}
      />
    </div>
  ),
};

// =============================================================================
// MiniCalendar Stories
// =============================================================================

const miniCalendarEvents = [
  { date: new Date(2024, 0, 10) },
  { date: new Date(2024, 0, 15) },
  { date: new Date(2024, 0, 22) },
];

export const MiniCalendarDefault: StoryObj<typeof MiniCalendar> = {
  render: () => (
    <MiniCalendar
      onDateSelect={(date) => console.log("Date selected:", date)}
      events={miniCalendarEvents}
    />
  ),
};

export const MiniCalendarCompact: StoryObj<typeof MiniCalendar> = {
  render: () => (
    <MiniCalendar
      variant="compact"
      size="sm"
      onDateSelect={(date) => console.log("Date selected:", date)}
    />
  ),
};

export const MiniCalendarYearView: StoryObj<typeof MiniCalendar> = {
  render: () => (
    <MiniCalendar
      showYearView
      onDateSelect={(date) => console.log("Date selected:", date)}
    />
  ),
};

export const MiniCalendarInline: StoryObj<typeof MiniCalendar> = {
  render: () => (
    <div className="w-64 p-4 rounded-lg border border-border bg-card">
      <h3 className="font-semibold mb-3">Select Date</h3>
      <MiniCalendar
        variant="inline"
        selectedDate={new Date(2024, 0, 15)}
        onDateSelect={(date) => console.log("Date selected:", date)}
        events={miniCalendarEvents}
      />
    </div>
  ),
};

// =============================================================================
// CalendarEventSidebar Stories
// =============================================================================

export const CalendarEventSidebarCreate: StoryObj<typeof CalendarEventSidebar> =
  {
    render: () => (
      <CalendarEventSidebar
        mode="create"
        onSave={(data) => console.log("Save:", data)}
        onClose={() => console.log("Close")}
      />
    ),
  };

export const CalendarEventSidebarEdit: StoryObj<typeof CalendarEventSidebar> = {
  render: () => (
    <CalendarEventSidebar
      mode="edit"
      initialData={{
        title: "Team Meeting",
        description: "Weekly team sync to discuss project progress",
        date: "2024-01-15",
        startTime: "10:00",
        endTime: "11:00",
        location: "Conference Room A",
        color: "blue",
      }}
      onSave={(data) => console.log("Save:", data)}
      onDelete={() => console.log("Delete")}
      onClose={() => console.log("Close")}
    />
  ),
};

export const CalendarEventSidebarFloating: StoryObj<
  typeof CalendarEventSidebar
> = {
  render: () => (
    <div className="p-8 bg-muted/30">
      <CalendarEventSidebar
        mode="create"
        variant="floating"
        size="lg"
        onSave={(data) => console.log("Save:", data)}
        onClose={() => console.log("Close")}
      />
    </div>
  ),
};

// =============================================================================
// ScheduleWidget Stories
// =============================================================================

const scheduleItems: ScheduleItem[] = [
  {
    id: "1",
    title: "Daily Standup",
    time: "9:00 AM",
    endTime: "9:30 AM",
    type: "meeting",
    status: "completed",
    attendees: [
      { name: "John Doe", avatar: "https://i.pravatar.cc/100?img=1" },
      { name: "Jane Smith", avatar: "https://i.pravatar.cc/100?img=2" },
    ],
  },
  {
    id: "2",
    title: "Client Presentation",
    time: "11:00 AM",
    endTime: "12:00 PM",
    type: "meeting",
    status: "in-progress",
    description: "Q4 results presentation for stakeholders",
    attendees: [
      { name: "Mike Johnson" },
      { name: "Sarah Wilson" },
      { name: "Tom Brown" },
      { name: "Emily Davis" },
    ],
  },
  {
    id: "3",
    title: "Code Review",
    time: "2:00 PM",
    endTime: "3:00 PM",
    type: "task",
    description: "Review PR #234 for the new feature",
  },
  {
    id: "4",
    title: "Submit Report",
    time: "4:00 PM",
    type: "reminder",
    description: "Monthly analytics report due",
  },
  {
    id: "5",
    title: "Doctor Appointment",
    time: "5:30 PM",
    type: "appointment",
  },
];

export const ScheduleWidgetDefault: StoryObj<typeof ScheduleWidget> = {
  render: () => (
    <div className="w-[400px]">
      <ScheduleWidget
        items={scheduleItems}
        onItemClick={(item) => console.log("Item clicked:", item)}
        onAddClick={() => console.log("Add clicked")}
      />
    </div>
  ),
};

export const ScheduleWidgetEmpty: StoryObj<typeof ScheduleWidget> = {
  render: () => (
    <div className="w-[400px]">
      <ScheduleWidget
        items={[]}
        onAddClick={() => console.log("Add clicked")}
        emptyMessage="No events for today"
      />
    </div>
  ),
};

export const ScheduleWidgetLimited: StoryObj<typeof ScheduleWidget> = {
  render: () => (
    <div className="w-[400px]">
      <ScheduleWidget
        items={scheduleItems}
        maxItems={3}
        onItemClick={(item) => console.log("Item clicked:", item)}
      />
    </div>
  ),
};

export const ScheduleWidgetCard: StoryObj<typeof ScheduleWidget> = {
  render: () => (
    <div className="w-[400px] p-4 bg-muted/30">
      <ScheduleWidget
        title="Today's Agenda"
        variant="card"
        items={scheduleItems.slice(0, 3)}
        onItemClick={(item) => console.log("Item clicked:", item)}
        onAddClick={() => console.log("Add clicked")}
      />
    </div>
  ),
};

// =============================================================================
// Combined Layout Stories
// =============================================================================

export const CalendarWithEventSidebar: StoryObj<typeof FullCalendar> = {
  render: () => (
    <div className="flex w-[1200px] h-[700px] rounded-xl border border-border overflow-hidden">
      <div className="flex-1">
        <FullCalendar
          events={sampleEvents}
          onEventClick={(event) => console.log("Event clicked:", event)}
        />
      </div>
      <CalendarEventSidebar
        mode="create"
        onSave={(data) => console.log("Save:", data)}
        onClose={() => console.log("Close")}
      />
    </div>
  ),
};

export const DashboardCalendarWidget: StoryObj<typeof MiniCalendar> = {
  render: () => (
    <div className="w-[320px] space-y-4">
      <MiniCalendar
        onDateSelect={(date) => console.log("Date selected:", date)}
        events={miniCalendarEvents}
      />
      <ScheduleWidget
        title="Upcoming"
        showDate={false}
        items={scheduleItems.slice(0, 3)}
        variant="minimal"
        onItemClick={(item) => console.log("Item clicked:", item)}
      />
    </div>
  ),
};
