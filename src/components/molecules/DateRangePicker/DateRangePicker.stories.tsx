import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateRangePicker } from "./index";
import type { DateRange } from "./index";

const meta: Meta<typeof DateRangePicker> = {
  title: "Molecules/DateRangePicker",
  component: DateRangePicker,
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
    placeholder: "Select date range",
  },
};

const ControlledDateRangePicker = () => {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <div className="space-y-4">
      <DateRangePicker
        value={range}
        onChange={setRange}
        placeholder="Pick a date range"
      />
      {range?.start && (
        <p className="text-sm text-muted-foreground">
          Start: {range.start.toLocaleDateString()}
          {range.end && ` - End: ${range.end.toLocaleDateString()}`}
        </p>
      )}
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDateRangePicker />,
};

export const WithInitialValue: Story = {
  render: () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const [range, setRange] = useState<DateRange | undefined>({
      start: today,
      end: nextWeek,
    });

    return <DateRangePicker value={range} onChange={setRange} />;
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Select range",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Select date range",
  },
};

export const WithMinDate: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>();
    const minDate = new Date();

    return (
      <div className="space-y-2">
        <DateRangePicker
          value={range}
          onChange={setRange}
          minDate={minDate}
          placeholder="Select future range"
        />
        <p className="text-xs text-muted-foreground">
          Dates before today are disabled
        </p>
      </div>
    );
  },
};

export const CustomFormat: Story = {
  render: () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const [range, setRange] = useState<DateRange | undefined>({
      start: today,
      end: nextWeek,
    });

    return (
      <DateRangePicker
        value={range}
        onChange={setRange}
        format={(r) => {
          if (r.start && r.end) {
            const formatDate = (d: Date) =>
              d.toLocaleDateString("ja-JP", {
                month: "2-digit",
                day: "2-digit",
              });
            return `${formatDate(r.start)} 〜 ${formatDate(r.end)}`;
          }
          return "";
        }}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Select date range",
  },
};
