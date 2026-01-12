import type { Meta, StoryObj } from "@storybook/react";
import { StackedMultiprogressbar } from "./index";

const meta: Meta<typeof StackedMultiprogressbar> = {
  title: "DataCards/StackedMultiprogressbar",
  component: StackedMultiprogressbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
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
    title: "Sales Pipeline Status",
    footerText:
      "Monitor your pipeline to ensure healthy lead conversion rates.",
  },
};

export const SingleSection: Story = {
  args: {
    title: "Conversion Rate",
    sections: [
      {
        segments: [
          {
            color: "bg-chart-5",
            label: "Completed",
            value: 75,
            percentage: 75,
          },
          {
            color: "bg-chart-3",
            label: "In Progress",
            value: 25,
            percentage: 25,
          },
        ],
      },
    ],
    footerText: "Great progress on your conversion goals!",
  },
};

export const MultipleSections: Story = {
  args: {
    title: "Marketing Funnel",
    sections: [
      {
        segments: [
          {
            color: "bg-chart-5",
            label: "Awareness",
            value: 1000,
            percentage: 40,
          },
          {
            color: "bg-chart-4",
            label: "Interest",
            value: 600,
            percentage: 24,
          },
        ],
      },
      {
        segments: [
          {
            color: "bg-chart-3",
            label: "Consideration",
            value: 300,
            percentage: 30,
          },
          { color: "bg-chart-2", label: "Intent", value: 150, percentage: 15 },
        ],
      },
      {
        segments: [
          {
            color: "bg-chart-1",
            label: "Evaluation",
            value: 75,
            percentage: 50,
          },
          { color: "bg-primary", label: "Purchase", value: 50, percentage: 33 },
        ],
      },
    ],
    footerText:
      "Your marketing funnel shows healthy progression through stages.",
  },
};

export const NoFooter: Story = {
  args: {
    footerText: "",
  },
};
