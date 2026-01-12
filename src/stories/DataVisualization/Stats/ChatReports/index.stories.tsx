import type { Meta, StoryObj } from "@storybook/react";
import { ChatReports } from "./index";

const meta: Meta<typeof ChatReports> = {
  title: "DataVisualization/Stats/ChatReports",
  component: ChatReports,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllPositive: Story = {
  args: {
    items: [
      {
        label: "Total tickets",
        value: "1,234",
        changePercent: "12.5%",
        trendDirection: "up",
        trendVariant: "positive",
        comparisonText: "1,096 last week",
      },
      {
        label: "Resolved",
        value: "987",
        changePercent: "8.2%",
        trendDirection: "up",
        trendVariant: "positive",
        comparisonText: "912 last week",
      },
      {
        label: "Satisfaction rate",
        value: "95%",
        changePercent: "3.1%",
        trendDirection: "up",
        trendVariant: "positive",
        comparisonText: "92% last week",
      },
    ],
  },
};

export const MixedTrends: Story = {
  args: {
    items: [
      {
        label: "New users",
        value: "2,456",
        changePercent: "15.3%",
        trendDirection: "up",
        trendVariant: "positive",
        comparisonText: "2,130 last month",
      },
      {
        label: "Active sessions",
        value: "8,901",
        changePercent: "5.7%",
        trendDirection: "down",
        trendVariant: "negative",
        comparisonText: "9,440 last month",
      },
      {
        label: "Conversion rate",
        value: "4.2%",
        changePercent: "0.3%",
        trendDirection: "up",
        trendVariant: "positive",
        comparisonText: "3.9% last month",
      },
    ],
  },
};

export const AllNegative: Story = {
  args: {
    items: [
      {
        label: "Response time",
        value: "45 min",
        changePercent: "20.0%",
        trendDirection: "up",
        trendVariant: "negative",
        comparisonText: "37 min last week",
      },
      {
        label: "Open tickets",
        value: "156",
        changePercent: "35.6%",
        trendDirection: "up",
        trendVariant: "negative",
        comparisonText: "115 last week",
      },
      {
        label: "Resolution rate",
        value: "68%",
        changePercent: "12.8%",
        trendDirection: "down",
        trendVariant: "negative",
        comparisonText: "78% last week",
      },
    ],
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      {
        label: "Messages sent",
        value: "5,432",
        changePercent: "22.1%",
        trendDirection: "up",
        trendVariant: "positive",
        comparisonText: "4,450 yesterday",
      },
      {
        label: "Messages received",
        value: "4,987",
        changePercent: "18.5%",
        trendDirection: "up",
        trendVariant: "positive",
        comparisonText: "4,208 yesterday",
      },
    ],
  },
};
