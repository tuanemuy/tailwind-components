import type { Meta, StoryObj } from "@storybook/react";
import { StatsAnimatedOnHover } from "./index";

const meta: Meta<typeof StatsAnimatedOnHover> = {
  title: "DataVisualization/Stats/StatsAnimatedOnHover",
  component: StatsAnimatedOnHover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const UserIcon = () => (
  <svg
    className="shrink-0 size-6 text-muted-foreground"
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
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const DollarIcon = () => (
  <svg
    className="shrink-0 size-6 text-muted-foreground"
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

const TrendingUpIcon = () => (
  <svg
    className="shrink-0 size-6 text-muted-foreground"
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
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg
    className="shrink-0 size-6 text-muted-foreground"
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
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

export const EcommerceStats: Story = {
  args: {
    cards: [
      {
        label: "Total sales",
        value: "$125,430",
        href: "#",
        icon: <DollarIcon />,
        linkText: "View details",
      },
      {
        label: "New customers",
        value: "1,234",
        href: "#",
        icon: <UserIcon />,
        linkText: "View all",
      },
      {
        label: "Conversion rate",
        value: "3.24%",
        href: "#",
        icon: <TrendingUpIcon />,
        linkText: "Analyze",
      },
      {
        label: "Orders today",
        value: "156",
        href: "#",
        icon: <ShoppingCartIcon />,
        linkText: "Process orders",
      },
    ],
  },
};

export const WithoutIcons: Story = {
  args: {
    cards: [
      {
        label: "Page views",
        value: "45.2K",
        href: "#",
        linkText: "Analytics",
      },
      {
        label: "Unique visitors",
        value: "12.8K",
        href: "#",
        linkText: "Analytics",
      },
      {
        label: "Bounce rate",
        value: "32.4%",
        href: "#",
        linkText: "Analytics",
      },
      {
        label: "Avg. session",
        value: "4m 23s",
        href: "#",
        linkText: "Analytics",
      },
    ],
  },
};

export const TwoCards: Story = {
  args: {
    cards: [
      {
        label: "Active projects",
        value: "12",
        href: "#",
        icon: <TrendingUpIcon />,
        linkText: "View all",
      },
      {
        label: "Team members",
        value: "8",
        href: "#",
        icon: <UserIcon />,
        linkText: "Manage team",
      },
    ],
  },
};

export const WithoutLinkText: Story = {
  args: {
    cards: [
      {
        label: "CPU Usage",
        value: "45%",
        href: "#",
        icon: <TrendingUpIcon />,
      },
      {
        label: "Memory",
        value: "3.2 GB",
        href: "#",
        icon: <TrendingUpIcon />,
      },
      {
        label: "Storage",
        value: "128 GB",
        href: "#",
        icon: <TrendingUpIcon />,
      },
      {
        label: "Network",
        value: "1.2 Gbps",
        href: "#",
        icon: <TrendingUpIcon />,
      },
    ],
  },
};
