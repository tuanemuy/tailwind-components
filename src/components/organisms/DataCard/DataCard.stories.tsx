import type { Meta, StoryObj } from "@storybook/react";
import { DataCard, DataCardList, DataCardMini } from "./index";
import { Button } from "@/components/atoms";
import { Dropdown, DropdownItem } from "@/components/molecules";
import {
  UsersIcon,
  StoreIcon,
  DownloadIcon,
  TrendUpIcon,
  MoreHorizontalIcon,
} from "@/lib/icons";

const meta: Meta<typeof DataCard> = {
  title: "Organisms/DataCard",
  component: DataCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "elevated"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataCard>;

// Default data card
export const Default: Story = {
  args: {
    title: "Total Revenue",
    value: "$45,678",
    valueLabel: "this month",
    trend: {
      value: "12.5%",
      direction: "up",
      label: "from last month",
    },
    className: "w-80",
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    title: "Total Users",
    value: "12,345",
    icon: <UsersIcon className="size-5" />,
    trend: {
      value: "8.2%",
      direction: "up",
      label: "from last month",
    },
    className: "w-80",
  },
};

// With progress
export const WithProgress: Story = {
  args: {
    title: "Monthly Goal",
    subtitle: "Sales target for December",
    value: "$38,500",
    valueLabel: "of $50,000",
    progress: {
      value: 77,
      label: "Progress",
      showValue: true,
    },
    className: "w-80",
  },
};

// With action button
export const WithAction: Story = {
  args: {
    title: "Downloads",
    value: "8,901",
    icon: <DownloadIcon className="size-5" />,
    trend: {
      value: "24.1%",
      direction: "up",
      label: "from last week",
    },
    action: (
      <Dropdown
        trigger={
          <Button variant="ghost" size="sm">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        }
      >
        <DropdownItem>View details</DropdownItem>
        <DropdownItem>Export data</DropdownItem>
      </Dropdown>
    ),
    className: "w-80",
  },
};

// Negative trend
export const NegativeTrend: Story = {
  args: {
    title: "Bounce Rate",
    value: "42.3%",
    trend: {
      value: "3.2%",
      direction: "down",
      variant: "negative",
      label: "from last month",
    },
    className: "w-80",
  },
};

// With footer
export const WithFooter: Story = {
  args: {
    title: "Conversion Rate",
    value: "3.24%",
    icon: <TrendUpIcon className="size-5" />,
    trend: {
      value: "0.5%",
      direction: "up",
    },
    footer: (
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Last updated: 5 min ago
        </span>
        <Button variant="ghost" size="sm">
          View Report
        </Button>
      </div>
    ),
    className: "w-80",
  },
};

// Elevated variant
export const Elevated: Story = {
  args: {
    title: "Active Sessions",
    value: "1,234",
    trend: {
      value: "15.3%",
      direction: "up",
    },
    variant: "elevated",
    className: "w-80",
  },
};

// With chart placeholder
export const WithChart: Story = {
  render: () => (
    <DataCard
      title="Weekly Overview"
      value="$12,450"
      valueLabel="total sales"
      trend={{
        value: "8.5%",
        direction: "up",
        label: "vs last week",
      }}
      chart={
        <div className="flex h-24 items-end justify-between gap-x-1">
          {[40, 65, 50, 80, 60, 75, 90].map((height) => (
            <div
              key={height}
              className="flex-1 rounded-sm bg-primary"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      }
      className="w-80"
    />
  ),
};

// DataCardList example
export const ListVariant: Story = {
  render: () => (
    <div className="w-80 rounded-xl border border-border bg-card p-4">
      <h3 className="mb-4 text-sm font-medium text-foreground">
        Traffic Sources
      </h3>
      <DataCardList
        items={[
          { id: "direct", label: "Direct", value: "42%", percentage: 42, color: "#6366f1" },
          { id: "organic", label: "Organic", value: "28%", percentage: 28, color: "#22c55e" },
          { id: "referral", label: "Referral", value: "18%", percentage: 18, color: "#f59e0b" },
          { id: "social", label: "Social", value: "12%", percentage: 12, color: "#ec4899" },
        ]}
      />
    </div>
  ),
};

// DataCardMini examples
export const MiniCards: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <DataCardMini
        label="Total Users"
        value="12,345"
        icon={<UsersIcon className="size-5" />}
        trend={{ value: "12.5%", direction: "up" }}
      />
      <DataCardMini
        label="Revenue"
        value="$45,678"
        icon={<StoreIcon className="size-5" />}
        trend={{ value: "8.2%", direction: "up" }}
      />
      <DataCardMini
        label="Downloads"
        value="8,901"
        icon={<DownloadIcon className="size-5" />}
        trend={{ value: "3.1%", direction: "down" }}
      />
    </div>
  ),
};

// Grid of DataCards
export const CardGrid: Story = {
  render: () => (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <DataCard
        title="Total Revenue"
        value="$45,678"
        icon={<StoreIcon className="size-5" />}
        trend={{
          value: "12.5%",
          direction: "up",
          label: "vs last month",
        }}
      />
      <DataCard
        title="Total Users"
        value="12,345"
        icon={<UsersIcon className="size-5" />}
        trend={{
          value: "8.2%",
          direction: "up",
          label: "vs last month",
        }}
      />
      <DataCard
        title="Downloads"
        value="8,901"
        icon={<DownloadIcon className="size-5" />}
        trend={{
          value: "24.1%",
          direction: "up",
          label: "vs last month",
        }}
      />
    </div>
  ),
};

// Complete dashboard card
export const DashboardCard: Story = {
  render: () => (
    <DataCard
      title="Sales Performance"
      subtitle="Monthly sales progress"
      value="$38,500"
      valueLabel="of $50,000 goal"
      icon={<StoreIcon className="size-5" />}
      progress={{
        value: 77,
        label: "Monthly target",
        showValue: true,
      }}
      action={
        <Dropdown
          trigger={
            <Button variant="ghost" size="sm">
              <MoreHorizontalIcon className="size-4" />
            </Button>
          }
        >
          <DropdownItem>View details</DropdownItem>
          <DropdownItem>Export data</DropdownItem>
          <DropdownItem>Share report</DropdownItem>
        </Dropdown>
      }
      chart={
        <div className="mt-4">
          <p className="mb-2 text-xs text-muted-foreground">Daily breakdown</p>
          <div className="flex h-16 items-end justify-between gap-x-1">
            {[60, 45, 80, 55, 70, 85, 65].map((height) => (
              <div
                key={height}
                className="flex-1 rounded-sm bg-primary/80"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      }
      footer={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1">
            <span className="text-xs text-success">+$3,200</span>
            <span className="text-xs text-muted-foreground">from yesterday</span>
          </div>
          <Button variant="ghost" size="sm">
            View Report
          </Button>
        </div>
      }
      className="w-96"
    />
  ),
};
