import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import type { SnoozeOption } from "./index";
import { RecurrenceModal, ScheduleModal, SnoozeModal } from "./index";

const meta: Meta = {
  title: "Organisms/Overlays/DateTimeModals",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

// Snooze Modal Stories
export const Snooze: StoryObj<typeof SnoozeModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Snooze</Button>
        <SnoozeModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSnooze={(date) => {
            console.log("Snooze until:", date);
            setIsOpen(false);
          }}
        />
      </>
    );
  },
};

export const SnoozeCustomOptions: StoryObj<typeof SnoozeModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const customOptions: SnoozeOption[] = [
      { id: "15m", label: "15 minutes", duration: 15 },
      { id: "30m", label: "30 minutes", duration: 30 },
      { id: "1h", label: "1 hour", duration: 60 },
      { id: "2h", label: "2 hours", duration: 120 },
      { id: "eod", label: "End of day", duration: 0 },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Snooze (Custom)</Button>
        <SnoozeModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSnooze={(date) => {
            console.log("Snooze until:", date);
            setIsOpen(false);
          }}
          options={customOptions}
        />
      </>
    );
  },
};

// Schedule Modal Stories
export const Schedule: StoryObj<typeof ScheduleModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Schedule</Button>
        <ScheduleModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSchedule={(date, time) => {
            console.log("Schedule for:", date, time);
            setIsOpen(false);
          }}
        />
      </>
    );
  },
};

export const ScheduleEmail: StoryObj<typeof ScheduleModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Schedule Email</Button>
        <ScheduleModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSchedule={(date, time) => {
            console.log("Schedule email for:", date, time);
            setIsOpen(false);
          }}
          title="Schedule Email"
          subtitle="Choose when to send this email"
          submitText="Schedule Send"
        />
      </>
    );
  },
};

export const ScheduleWithDefault: StoryObj<typeof ScheduleModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Schedule (Default)</Button>
        <ScheduleModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSchedule={(date, time) => {
            console.log("Schedule for:", date, time);
            setIsOpen(false);
          }}
        />
      </>
    );
  },
};

// Recurrence Modal Stories
export const Recurrence: StoryObj<typeof RecurrenceModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Set Recurrence</Button>
        <RecurrenceModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(data) => {
            console.log("Recurrence data:", data);
            setIsOpen(false);
          }}
        />
      </>
    );
  },
};

export const RecurrenceWeekly: StoryObj<typeof RecurrenceModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Weekly Meeting</Button>
        <RecurrenceModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(data) => {
            console.log("Recurrence data:", data);
            setIsOpen(false);
          }}
          title="Weekly Meeting"
        />
      </>
    );
  },
};

export const RecurrenceMonthly: StoryObj<typeof RecurrenceModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Monthly Report</Button>
        <RecurrenceModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(data) => {
            console.log("Recurrence data:", data);
            setIsOpen(false);
          }}
          title="Monthly Report Schedule"
        />
      </>
    );
  },
};

export const RecurrenceYearly: StoryObj<typeof RecurrenceModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Annual Review</Button>
        <RecurrenceModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(data) => {
            console.log("Recurrence data:", data);
            setIsOpen(false);
          }}
          title="Annual Review Schedule"
        />
      </>
    );
  },
};
