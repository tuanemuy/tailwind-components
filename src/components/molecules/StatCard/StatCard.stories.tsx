import type { Meta, StoryObj } from "@storybook/react";
import { StoreIcon, TagIcon, TrendUpIcon, UsersIcon } from "@/components/icons";
import { StatCard } from "./index";

const meta: Meta<typeof StatCard> = {
  title: "Molecules/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "filled"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Total Users",
    value: "12,345",
    icon: <UsersIcon className="size-5" />,
  },
};

export const WithTrend: Story = {
  args: {
    label: "Total Revenue",
    value: "$45,231.89",
    icon: <StoreIcon className="size-5" />,
    trend: {
      value: "+20.1%",
      direction: "up",
      label: "from last month",
    },
  },
};

export const NegativeTrend: Story = {
  args: {
    label: "Bounce Rate",
    value: "42.5%",
    icon: <TrendUpIcon className="size-5" />,
    trend: {
      value: "-4.3%",
      direction: "down",
      label: "from last week",
    },
  },
};

export const Bordered: Story = {
  args: {
    label: "Active Users",
    value: "2,350",
    icon: <UsersIcon className="size-5" />,
    variant: "bordered",
    trend: {
      value: "+180",
      direction: "up",
      label: "today",
    },
  },
};

export const Filled: Story = {
  args: {
    label: "Products Sold",
    value: "1,234",
    icon: <TagIcon className="size-5" />,
    variant: "filled",
    trend: {
      value: "+12%",
      direction: "up",
    },
  },
};

export const NoIcon: Story = {
  args: {
    label: "Page Views",
    value: "89,234",
    trend: {
      value: "+8.2%",
      direction: "up",
      label: "from yesterday",
    },
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid w-[600px] grid-cols-2 gap-4">
      <StatCard
        label="Total Revenue"
        value="$45,231.89"
        icon={<StoreIcon className="size-5" />}
        trend={{ value: "+20.1%", direction: "up", label: "from last month" }}
      />
      <StatCard
        label="Subscriptions"
        value="+2,350"
        icon={<UsersIcon className="size-5" />}
        trend={{ value: "+180.1%", direction: "up", label: "from last month" }}
      />
      <StatCard
        label="Sales"
        value="+12,234"
        icon={<TagIcon className="size-5" />}
        trend={{ value: "+19%", direction: "up", label: "from last month" }}
      />
      <StatCard
        label="Active Now"
        value="+573"
        icon={<TrendUpIcon className="size-5" />}
        trend={{ value: "-2%", direction: "down", label: "from last hour" }}
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <StatCard
        label="Default Variant"
        value="$12,345"
        variant="default"
        icon={<StoreIcon className="size-5" />}
      />
      <StatCard
        label="Bordered Variant"
        value="$12,345"
        variant="bordered"
        icon={<StoreIcon className="size-5" />}
      />
      <StatCard
        label="Filled Variant"
        value="$12,345"
        variant="filled"
        icon={<StoreIcon className="size-5" />}
      />
    </div>
  ),
};
