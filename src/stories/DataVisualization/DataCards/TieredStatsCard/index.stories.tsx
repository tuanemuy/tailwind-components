import type { Meta, StoryObj } from "@storybook/react";
import { TieredStatsCard } from "./index";

const meta: Meta<typeof TieredStatsCard> = {
  title: "DataCards/TieredStatsCard",
  component: TieredStatsCard,
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

export const TrendUp: Story = {
  args: {
    trendDirection: "up",
    trendValue: "8.5%",
  },
};

export const CustomTiers: Story = {
  args: {
    tiers: [
      { name: "Enterprise", count: 50, widthPercent: 100 },
      { name: "Professional", count: 200, widthPercent: 80 },
      { name: "Starter", count: 500, widthPercent: 60 },
      { name: "Free", count: 1500, widthPercent: 40 },
    ],
    primarySummary: { label: "Free", count: 1500, percentage: 60 },
    secondarySummary: { label: "Paid", count: 750, percentage: 40 },
  },
};
