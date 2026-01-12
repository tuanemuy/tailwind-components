import type { Meta, StoryObj } from "@storybook/react";
import { InboxReports } from "./index";

const meta: Meta<typeof InboxReports> = {
  title: "DataVisualization/Stats/InboxReports",
  component: InboxReports,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[900px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const SimpleIcon = () => (
  <svg
    className="shrink-0 size-5 text-foreground"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const AlertIcon = () => (
  <svg
    className="shrink-0 size-5 text-foreground"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

export const SimpleCards: Story = {
  args: {
    cards: [
      {
        value: "2,450",
        label: "Total tasks",
        details: [
          { label: "Completed:", value: "1,890", icon: <SimpleIcon /> },
          { label: "Pending:", value: "560", icon: <AlertIcon /> },
        ],
        footerText: "This month",
      },
      {
        value: "89%",
        label: "Completion rate",
        badge: {
          value: "5%",
          trendDirection: "up",
          trendVariant: "positive",
        },
        details: [
          { label: "On time:", value: "78%", icon: <SimpleIcon /> },
          { label: "Delayed:", value: "11%", icon: <AlertIcon /> },
        ],
        footerText: "This month",
      },
      {
        value: "156",
        label: "Active projects",
        details: [
          { label: "High priority:", value: "34", icon: <AlertIcon /> },
          { label: "Normal:", value: "122", icon: <SimpleIcon /> },
        ],
        footerText: "Current",
      },
      {
        value: "4.2 days",
        label: "Avg. cycle time",
        badge: {
          value: "0.3d",
          trendDirection: "down",
          trendVariant: "positive",
        },
        details: [
          { label: "Fastest:", value: "1.2 days", icon: <SimpleIcon /> },
          { label: "Slowest:", value: "12 days", icon: <AlertIcon /> },
        ],
        footerText: "Last 30 days",
      },
    ],
  },
};

export const WithNegativeTrends: Story = {
  args: {
    cards: [
      {
        value: "1,234",
        label: "Total orders",
        details: [
          { label: "Shipped:", value: "980" },
          { label: "Processing:", value: "254" },
        ],
        footerText: "Today",
      },
      {
        value: "45 min",
        label: "Response time",
        badge: {
          value: "12m",
          trendDirection: "up",
          trendVariant: "negative",
        },
        details: [
          { label: "Peak:", value: "2h 15m" },
          { label: "Average:", value: "35m" },
        ],
        footerText: "Last 7 days",
      },
      {
        value: "67%",
        label: "Satisfaction",
        badge: {
          value: "8%",
          trendDirection: "down",
          trendVariant: "negative",
        },
        details: [
          { label: "Positive:", value: "45%" },
          { label: "Neutral:", value: "22%" },
        ],
        footerText: "This week",
      },
      {
        value: "23",
        label: "Open issues",
        badge: {
          value: "5",
          trendDirection: "up",
          trendVariant: "negative",
        },
        details: [
          { label: "Critical:", value: "8" },
          { label: "Normal:", value: "15" },
        ],
        footerText: "Current",
      },
    ],
  },
};

export const TwoCards: Story = {
  args: {
    cards: [
      {
        value: "$125,430",
        label: "Revenue",
        badge: {
          value: "12%",
          trendDirection: "up",
          trendVariant: "positive",
        },
        details: [
          { label: "Online:", value: "$89,200" },
          { label: "In-store:", value: "$36,230" },
        ],
        footerText: "This month",
      },
      {
        value: "3,456",
        label: "Customers",
        badge: {
          value: "8%",
          trendDirection: "up",
          trendVariant: "positive",
        },
        details: [
          { label: "New:", value: "890" },
          { label: "Returning:", value: "2,566" },
        ],
        footerText: "This month",
      },
    ],
  },
};
