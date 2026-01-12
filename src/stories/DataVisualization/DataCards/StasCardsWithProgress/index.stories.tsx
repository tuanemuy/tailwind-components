import type { Meta, StoryObj } from "@storybook/react";
import { StasCardsWithProgress } from "./index";

const meta: Meta<typeof StasCardsWithProgress> = {
  title: "DataCards/StasCardsWithProgress",
  component: StasCardsWithProgress,
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

export const CustomTitle: Story = {
  args: {
    title: "Revenue Overview",
    dateButtonLabel: "This Week",
    progressTitle: "Weekly revenue target",
    progressValue: "$120,500",
    progressPosition: 65,
  },
};

export const HighProgress: Story = {
  args: {
    title: "Performance",
    progressTitle: "Quarterly goals",
    progressValue: "$250,000",
    progressPosition: 85,
  },
};

export const LowProgress: Story = {
  args: {
    title: "Monthly Sales",
    progressTitle: "Sales target",
    progressValue: "$15,000",
    progressPosition: 15,
    stats: [
      {
        label: "Online orders",
        value: "$12,500",
        changePercent: "2.1%",
        trendDirection: "down",
        trendVariant: "negative",
      },
      {
        label: "Store orders",
        value: "$8,200",
        changePercent: "5.4%",
        trendDirection: "down",
        trendVariant: "negative",
      },
      {
        label: "Returns",
        value: "$3,100",
        changePercent: "12.3%",
        trendDirection: "up",
        trendVariant: "negative",
      },
    ],
  },
};

export const CustomStats: Story = {
  args: {
    title: "Marketing Metrics",
    stats: [
      {
        label: "Email campaigns",
        value: "1,234",
        changePercent: "15.2%",
        trendDirection: "up",
        trendVariant: "positive",
      },
      {
        label: "Social reach",
        value: "45.6K",
        changePercent: "8.7%",
        trendDirection: "up",
        trendVariant: "positive",
      },
      {
        label: "Conversion rate",
        value: "3.2%",
        changePercent: "0.5%",
        trendDirection: "down",
        trendVariant: "negative",
      },
    ],
    progressTitle: "Campaign budget used",
    progressValue: "$18,500",
    progressPosition: 52,
  },
};

export const CustomLegend: Story = {
  args: {
    title: "Customer Satisfaction",
    progressTitle: "NPS Score",
    progressValue: "72",
    progressPosition: 72,
    progressLegendItems: [
      { label: "Detractors", colorClass: "bg-chart-5" },
      { label: "Passives", colorClass: "bg-chart-4" },
      { label: "Promoters", colorClass: "bg-chart-2" },
      { label: "Champions", colorClass: "bg-chart-1" },
    ],
  },
};
