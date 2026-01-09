import type { Meta, StoryObj } from "@storybook/react";
import { StatsWithIcons } from "./index";

const meta: Meta<typeof StatsWithIcons> = {
  title: "DataVisualization/Stats/StatsWithIcons",
  component: StatsWithIcons,
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

const UsersIcon = () => (
  <svg
    className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-muted-foreground"
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
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ChartIcon = () => (
  <svg
    className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-muted-foreground"
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
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const DollarIcon = () => (
  <svg
    className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-muted-foreground"
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
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg
    className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-muted-foreground"
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
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export const EcommerceMetrics: Story = {
  args: {
    cards: [
      {
        label: "Total customers",
        value: "24,589",
        icon: <UsersIcon />,
        secondaryText: "1.2k new this week",
        trend: {
          changePercent: "8.2%",
          trendDirection: "up",
          trendVariant: "positive",
        },
      },
      {
        label: "Conversion rate",
        value: "3.24%",
        icon: <ChartIcon />,
        secondaryText: "vs 2.8% last month",
        trend: {
          changePercent: "15.7%",
          trendDirection: "up",
          trendVariant: "positive",
        },
      },
      {
        label: "Average order value",
        value: "$127.50",
        icon: <DollarIcon />,
        secondaryText: "from 8.4k orders",
        trend: {
          changePercent: "2.1%",
          trendDirection: "down",
          trendVariant: "negative",
        },
      },
      {
        label: "Total orders",
        value: "8,432",
        icon: <ShoppingBagIcon />,
        secondaryText: "this month",
        trend: {
          changePercent: "5.3%",
          trendDirection: "up",
          trendVariant: "positive",
        },
      },
    ],
  },
};

export const WithoutTrends: Story = {
  args: {
    cards: [
      {
        label: "Active users",
        value: "12,345",
        icon: <UsersIcon />,
        secondaryText: "Currently online",
      },
      {
        label: "Page views",
        value: "89.2K",
        icon: <ChartIcon />,
        secondaryText: "Today",
      },
      {
        label: "Revenue",
        value: "$45,678",
        icon: <DollarIcon />,
        secondaryText: "This week",
      },
      {
        label: "Orders",
        value: "567",
        icon: <ShoppingBagIcon />,
        secondaryText: "Pending",
      },
    ],
  },
};

export const AllNegativeTrends: Story = {
  args: {
    cards: [
      {
        label: "Bounce rate",
        value: "45.2%",
        icon: <ChartIcon />,
        secondaryText: "vs 38% target",
        trend: {
          changePercent: "18.9%",
          trendDirection: "up",
          trendVariant: "negative",
        },
      },
      {
        label: "Cart abandonment",
        value: "67.8%",
        icon: <ShoppingBagIcon />,
        secondaryText: "1.2k carts",
        trend: {
          changePercent: "5.4%",
          trendDirection: "up",
          trendVariant: "negative",
        },
      },
      {
        label: "Refund rate",
        value: "4.5%",
        icon: <DollarIcon />,
        secondaryText: "89 refunds",
        trend: {
          changePercent: "12.3%",
          trendDirection: "up",
          trendVariant: "negative",
        },
      },
      {
        label: "Support tickets",
        value: "156",
        icon: <UsersIcon />,
        secondaryText: "Open issues",
        trend: {
          changePercent: "23.1%",
          trendDirection: "up",
          trendVariant: "negative",
        },
      },
    ],
  },
};

export const TwoCards: Story = {
  args: {
    cards: [
      {
        label: "Monthly revenue",
        value: "$125,430",
        icon: <DollarIcon />,
        secondaryText: "from 2.3k transactions",
        trend: {
          changePercent: "12.5%",
          trendDirection: "up",
          trendVariant: "positive",
        },
      },
      {
        label: "Monthly expenses",
        value: "$78,250",
        icon: <ChartIcon />,
        secondaryText: "operational costs",
        trend: {
          changePercent: "3.2%",
          trendDirection: "down",
          trendVariant: "positive",
        },
      },
    ],
  },
};
