import type { Meta, StoryObj } from "@storybook/react";
import { BlockStatsCard } from "./index";

const meta: Meta<typeof BlockStatsCard> = {
  title: "DataCards/BlockStatsCard",
  component: BlockStatsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TrendDown: Story = {
  args: {
    trendDirection: "down",
    trendValue: "3%",
  },
};

export const HighProgress: Story = {
  args: {
    primarySummary: { label: "Completed", count: 150 },
    secondarySummary: { label: "Total", count: 142 },
    activeBlocks: 18,
  },
};

export const LowProgress: Story = {
  args: {
    primarySummary: { label: "Completed", count: 100 },
    secondarySummary: { label: "Total", count: 25 },
    activeBlocks: 5,
    trendDirection: "down",
    trendValue: "15%",
  },
};
