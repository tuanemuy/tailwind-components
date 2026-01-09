import type { Meta, StoryObj } from "@storybook/react";
import { PrimaryColorStatsWithBrandsAndBadges } from "./index";

const meta: Meta<typeof PrimaryColorStatsWithBrandsAndBadges> = {
  title: "DataVisualization/Stats/PrimaryColorStatsWithBrandsAndBadges",
  component: PrimaryColorStatsWithBrandsAndBadges,
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

const CustomIcon = ({ color }: { color: string }) => (
  <svg
    className="shrink-0 size-6 sm:size-8"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const CustomIcons: Story = {
  args: {
    cards: [
      {
        icon: <CustomIcon color="#3b82f6" />,
        value: "$125,000",
        label: "Revenue this month",
        changePercent: "15.2%",
        trendDirection: "up",
      },
      {
        icon: <CustomIcon color="#10b981" />,
        value: "3,456",
        label: "New customers",
        changePercent: "8.7%",
        trendDirection: "up",
      },
      {
        icon: <CustomIcon color="#f59e0b" />,
        value: "89%",
        label: "Satisfaction rate",
        changePercent: "2.1%",
        trendDirection: "down",
      },
      {
        icon: <CustomIcon color="#ef4444" />,
        value: "12.5h",
        label: "Avg. response time",
        changePercent: "5.3%",
        trendDirection: "down",
      },
    ],
  },
};

export const AllPositive: Story = {
  args: {
    cards: [
      {
        icon: <CustomIcon color="#6366f1" />,
        value: "98.5%",
        label: "Uptime",
        changePercent: "0.5%",
        trendDirection: "up",
      },
      {
        icon: <CustomIcon color="#6366f1" />,
        value: "1.2s",
        label: "Load time",
        changePercent: "15%",
        trendDirection: "up",
      },
      {
        icon: <CustomIcon color="#6366f1" />,
        value: "45K",
        label: "Active users",
        changePercent: "22%",
        trendDirection: "up",
      },
      {
        icon: <CustomIcon color="#6366f1" />,
        value: "4.8/5",
        label: "App rating",
        changePercent: "0.2",
        trendDirection: "up",
      },
    ],
  },
};

export const TwoCards: Story = {
  args: {
    cards: [
      {
        icon: <CustomIcon color="#8b5cf6" />,
        value: "$50,000",
        label: "Monthly recurring revenue",
        changePercent: "10%",
        trendDirection: "up",
      },
      {
        icon: <CustomIcon color="#ec4899" />,
        value: "250",
        label: "Active subscriptions",
        changePercent: "5%",
        trendDirection: "up",
      },
    ],
  },
};
