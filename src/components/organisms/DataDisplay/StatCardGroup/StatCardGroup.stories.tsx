import type { Meta, StoryObj } from "@storybook/react";
import { DownloadIcon, StoreIcon, TrendUpIcon, UsersIcon } from "@/lib/icons";
import { StatCardGroup } from "./index";

const meta: Meta<typeof StatCardGroup> = {
  title: "Organisms/DataDisplay/StatCardGroup",
  component: StatCardGroup,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: "select",
      options: [1, 2, 3, 4, "auto"],
    },
    gap: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCardGroup>;

const sampleStats = [
  {
    id: "total-users",
    icon: <UsersIcon className="size-5" />,
    label: "Total Users",
    value: "12,345",
    trend: {
      value: "12.5%",
      direction: "up" as const,
      label: "from last month",
    },
  },
  {
    id: "total-revenue",
    icon: <StoreIcon className="size-5" />,
    label: "Total Revenue",
    value: "$45,678",
    trend: {
      value: "8.2%",
      direction: "up" as const,
      label: "from last month",
    },
  },
  {
    id: "conversion-rate",
    icon: <TrendUpIcon className="size-5" />,
    label: "Conversion Rate",
    value: "3.24%",
    trend: {
      value: "0.5%",
      direction: "down" as const,
      label: "from last month",
    },
  },
  {
    id: "downloads",
    icon: <DownloadIcon className="size-5" />,
    label: "Downloads",
    value: "8,901",
    trend: {
      value: "24.1%",
      direction: "up" as const,
      label: "from last month",
    },
  },
];

// Default 4 columns layout
export const Default: Story = {
  args: {
    stats: sampleStats,
    columns: 4,
    gap: "md",
  },
};

// 3 columns layout
export const ThreeColumns: Story = {
  args: {
    stats: sampleStats.slice(0, 3),
    columns: 3,
    gap: "md",
  },
};

// 2 columns layout
export const TwoColumns: Story = {
  args: {
    stats: sampleStats.slice(0, 2),
    columns: 2,
    gap: "md",
  },
};

// Auto columns
export const AutoColumns: Story = {
  args: {
    stats: sampleStats,
    columns: "auto",
    gap: "md",
  },
};

// Large gap
export const LargeGap: Story = {
  args: {
    stats: sampleStats,
    columns: 4,
    gap: "lg",
  },
};

// Small gap
export const SmallGap: Story = {
  args: {
    stats: sampleStats,
    columns: 4,
    gap: "sm",
  },
};

// Without trends
export const WithoutTrends: Story = {
  args: {
    stats: [
      {
        id: "total-users-no-trend",
        icon: <UsersIcon className="size-5" />,
        label: "Total Users",
        value: "12,345",
      },
      {
        id: "total-revenue-no-trend",
        icon: <StoreIcon className="size-5" />,
        label: "Total Revenue",
        value: "$45,678",
      },
      {
        id: "conversion-rate-no-trend",
        icon: <TrendUpIcon className="size-5" />,
        label: "Conversion Rate",
        value: "3.24%",
      },
      {
        id: "downloads-no-trend",
        icon: <DownloadIcon className="size-5" />,
        label: "Downloads",
        value: "8,901",
      },
    ],
    columns: 4,
    gap: "md",
  },
};

// Different variants
export const FilledVariant: Story = {
  args: {
    stats: sampleStats.map((stat) => ({ ...stat, variant: "filled" as const })),
    columns: 4,
    gap: "md",
  },
};
