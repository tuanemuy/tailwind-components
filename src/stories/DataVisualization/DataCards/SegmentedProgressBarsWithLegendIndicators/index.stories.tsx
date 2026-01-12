import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedProgressBarsWithLegendIndicators } from "./index";

const meta: Meta<typeof SegmentedProgressBarsWithLegendIndicators> = {
  title: "DataCards/SegmentedProgressBarsWithLegendIndicators",
  component: SegmentedProgressBarsWithLegendIndicators,
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

export const HighSeverityFocus: Story = {
  args: {
    title: "Security Alerts",
    linkText: "View all alerts",
    segments: [
      {
        label: "Critical",
        count: 45,
        percentage: 40,
        indicatorCount: 3,
        color: "bg-chart-5",
        indicatorColor: "bg-chart-5",
      },
      {
        label: "Warning",
        count: 30,
        percentage: 26,
        indicatorCount: 2,
        color: "bg-chart-3",
        indicatorColor: "bg-chart-3",
      },
      {
        label: "Info",
        count: 25,
        percentage: 22,
        indicatorCount: 1,
        color: "bg-chart-1",
        indicatorColor: "bg-chart-1",
      },
      {
        label: "Debug",
        count: 14,
        percentage: 12,
        indicatorCount: 0,
        color: "bg-muted-foreground/50",
        indicatorColor: "bg-muted-foreground/50",
      },
    ],
  },
};

export const LowSeverityMajority: Story = {
  args: {
    title: "System Events",
    linkText: "Analyze logs",
    segments: [
      {
        label: "Error",
        count: 12,
        percentage: 8,
        indicatorCount: 3,
        color: "bg-chart-5",
        indicatorColor: "bg-chart-5",
      },
      {
        label: "Warning",
        count: 28,
        percentage: 18,
        indicatorCount: 2,
        color: "bg-chart-3",
        indicatorColor: "bg-chart-3",
      },
      {
        label: "Notice",
        count: 85,
        percentage: 54,
        indicatorCount: 1,
        color: "bg-chart-1",
        indicatorColor: "bg-chart-1",
      },
      {
        label: "Info",
        count: 32,
        percentage: 20,
        indicatorCount: 0,
        color: "bg-muted-foreground/50",
        indicatorColor: "bg-muted-foreground/50",
      },
    ],
  },
};
