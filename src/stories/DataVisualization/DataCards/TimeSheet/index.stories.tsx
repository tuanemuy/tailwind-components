import type { Meta, StoryObj } from "@storybook/react";
import { TimeSheet } from "./index";

const meta: Meta<typeof TimeSheet> = {
  title: "DataCards/TimeSheet",
  component: TimeSheet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomTitle: Story = {
  args: {
    title: "Weekly Hours",
    dateRangeLabel: "Jan 1 - Jan 7",
    totalHoursLabel: "Hours worked",
  },
};

export const SingleEntry: Story = {
  args: {
    title: "Today",
    dateRangeLabel: "Today",
    totalHoursLabel: "Hours",
    entries: [
      {
        date: "Mon, 1/1",
        time: "6:30",
        filledSegments: 13,
        totalSegments: 18,
        difference: "-2h 30m",
        differenceStatus: "under",
        differenceLabel: "under",
        tooltipText: "-2h 30m under limit",
      },
    ],
  },
};

export const AllOvertime: Story = {
  args: {
    title: "Overtime Week",
    entries: [
      {
        date: "Mon",
        time: "10:00",
        filledSegments: 18,
        totalSegments: 18,
        difference: "+1h",
        differenceStatus: "over",
        differenceLabel: "over",
        tooltipText: "+1h over limit",
      },
      {
        date: "Tue",
        time: "9:30",
        filledSegments: 18,
        totalSegments: 18,
        difference: "+30m",
        differenceStatus: "over",
        differenceLabel: "over",
        tooltipText: "+30m over limit",
      },
      {
        date: "Wed",
        time: "11:00",
        filledSegments: 18,
        totalSegments: 18,
        difference: "+2h",
        differenceStatus: "over",
        differenceLabel: "over",
        tooltipText: "+2h over limit",
      },
    ],
  },
};

export const EmptyWeek: Story = {
  args: {
    title: "Vacation Week",
    entries: [
      {
        date: "Mon",
        time: "0:00",
        filledSegments: 0,
        totalSegments: 18,
        tooltipText: "0s",
      },
      {
        date: "Tue",
        time: "0:00",
        filledSegments: 0,
        totalSegments: 18,
        tooltipText: "0s",
      },
      {
        date: "Wed",
        time: "0:00",
        filledSegments: 0,
        totalSegments: 18,
        tooltipText: "0s",
      },
    ],
  },
};
