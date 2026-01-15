import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { StatusModal, AvailabilityStatusModal, TaskStatusModal } from "./index";
import type { StatusOption } from "./index";
import { Button } from "@/components/atoms/Button";

const meta: Meta<typeof StatusModal> = {
  title: "Organisms/Overlays/StatusModal",
  component: StatusModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatusModal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const statusOptions: StatusOption[] = [
      { id: "active", label: "Active", color: "bg-success" },
      { id: "away", label: "Away", color: "bg-warning" },
      { id: "busy", label: "Busy", color: "bg-destructive" },
      { id: "offline", label: "Offline", color: "bg-muted" },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Set Status</Button>
        <StatusModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelect={(status: StatusOption, message?: string) => {
            console.log("Status saved:", { status, message });
            setIsOpen(false);
          }}
          options={statusOptions}
          currentStatus="active"
        />
      </>
    );
  },
};

export const AvailabilityStatus: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Set Availability</Button>
        <AvailabilityStatusModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelect={(status: StatusOption, message?: string) => {
            console.log("Availability saved:", { status, message });
            setIsOpen(false);
          }}
          currentStatus="available"
        />
      </>
    );
  },
};

export const TaskStatus: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Update Task Status</Button>
        <TaskStatusModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelect={(status: StatusOption, message?: string) => {
            console.log("Task status saved:", { status, message });
            setIsOpen(false);
          }}
          currentStatus="in_progress"
        />
      </>
    );
  },
};

export const WithCustomMessage: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const statusOptions: StatusOption[] = [
      { id: "available", label: "Available", color: "bg-success" },
      { id: "meeting", label: "In a Meeting", color: "bg-warning" },
      { id: "focus", label: "Focus Time", color: "bg-info" },
      { id: "vacation", label: "On Vacation", color: "bg-primary" },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Update Status</Button>
        <StatusModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelect={(status: StatusOption, message?: string) => {
            console.log("Status saved:", { status, message });
            setIsOpen(false);
          }}
          options={statusOptions}
          currentStatus="meeting"
          showCustomMessage
        />
      </>
    );
  },
};
