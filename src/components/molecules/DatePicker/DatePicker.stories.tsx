import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "./index";

const meta: Meta<typeof DatePicker> = {
  title: "Molecules/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Select date",
  },
};

const ControlledDatePicker = () => {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="space-y-4">
      <DatePicker
        value={date}
        onChange={setDate}
        placeholder="Pick a date"
      />
      {date && (
        <p className="text-sm text-muted-foreground">
          Selected: {date.toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDatePicker />,
};

export const WithInitialValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <DatePicker value={date} onChange={setDate} />;
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Select date",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Select date",
  },
};

export const WithMinDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    const minDate = new Date();

    return (
      <div className="space-y-2">
        <DatePicker
          value={date}
          onChange={setDate}
          minDate={minDate}
          placeholder="Select future date"
        />
        <p className="text-xs text-muted-foreground">
          Dates before today are disabled
        </p>
      </div>
    );
  },
};

export const WithMaxDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    const maxDate = new Date();

    return (
      <div className="space-y-2">
        <DatePicker
          value={date}
          onChange={setDate}
          maxDate={maxDate}
          placeholder="Select past date"
        />
        <p className="text-xs text-muted-foreground">
          Dates after today are disabled
        </p>
      </div>
    );
  },
};

export const WithDateRange: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);

    return (
      <div className="space-y-2">
        <DatePicker
          value={date}
          onChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
          placeholder="Select date within range"
        />
        <p className="text-xs text-muted-foreground">
          Only dates within the next month are selectable
        </p>
      </div>
    );
  },
};

export const CustomFormat: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <DatePicker
        value={date}
        onChange={setDate}
        format={(d) => d.toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Select date",
  },
};
