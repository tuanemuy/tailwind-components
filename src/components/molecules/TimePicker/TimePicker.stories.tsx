import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TimePicker } from "./index";
import type { TimeValue } from "./index";

const meta: Meta<typeof TimePicker> = {
  title: "Molecules/TimePicker",
  component: TimePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    format: {
      control: "select",
      options: ["12h", "24h"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Select time",
  },
};

const ControlledTimePicker = () => {
  const [time, setTime] = useState<TimeValue | undefined>();

  return (
    <div className="space-y-4">
      <TimePicker
        value={time}
        onChange={setTime}
        placeholder="Pick a time"
      />
      {time && (
        <p className="text-sm text-muted-foreground">
          Selected: {time.hours.toString().padStart(2, "0")}:
          {time.minutes.toString().padStart(2, "0")} {time.period}
        </p>
      )}
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledTimePicker />,
};

export const Format24h: Story = {
  render: () => {
    const [time, setTime] = useState<TimeValue | undefined>();

    return (
      <div className="space-y-4">
        <TimePicker
          value={time}
          onChange={setTime}
          format="24h"
          placeholder="Select time"
        />
        {time && (
          <p className="text-sm text-muted-foreground">
            Selected: {time.hours.toString().padStart(2, "0")}:
            {time.minutes.toString().padStart(2, "0")}
          </p>
        )}
      </div>
    );
  },
};

export const WithInitialValue: Story = {
  render: () => {
    const [time, setTime] = useState<TimeValue>({
      hours: 9,
      minutes: 30,
      period: "AM",
    });

    return <TimePicker value={time} onChange={setTime} />;
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Select time",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Select time",
  },
};

export const MinuteStep15: Story = {
  render: () => {
    const [time, setTime] = useState<TimeValue | undefined>();

    return (
      <div className="space-y-2">
        <TimePicker
          value={time}
          onChange={setTime}
          minuteStep={15}
          placeholder="Select time"
        />
        <p className="text-xs text-muted-foreground">
          Minutes increment by 15
        </p>
      </div>
    );
  },
};

export const MinuteStep5: Story = {
  render: () => {
    const [time, setTime] = useState<TimeValue | undefined>();

    return (
      <div className="space-y-2">
        <TimePicker
          value={time}
          onChange={setTime}
          minuteStep={5}
          placeholder="Select time"
        />
        <p className="text-xs text-muted-foreground">
          Minutes increment by 5
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Select time",
  },
};
