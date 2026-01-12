import type { Meta, StoryObj } from "@storybook/react";
import { TopCardWithProgressAndLinks } from "./index";

const StarIcon = () => (
  <svg
    className="shrink-0 size-3.5 text-primary"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
  </svg>
);

const ChartIcon = () => (
  <svg
    className="shrink-0 size-3.5 text-primary"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
  </svg>
);

const meta: Meta<typeof TopCardWithProgressAndLinks> = {
  title: "DataCards/TopCardWithProgressAndLinks",
  component: TopCardWithProgressAndLinks,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomTabs: Story = {
  args: {
    tabs: [
      {
        id: "revenue",
        label: "Revenue",
        value: "$1,234,567",
        progress: 85,
        minValue: "$0",
        maxValue: "$1.5M",
        description: "Total revenue generated this quarter.",
      },
      {
        id: "users",
        label: "Users",
        value: "45,678",
        progress: 60,
        minValue: "0",
        maxValue: "75,000",
        description: "Active users in the platform.",
      },
    ],
  },
};

export const CustomLinks: Story = {
  args: {
    links: [
      {
        icon: <StarIcon />,
        label: "View analytics",
        href: "#analytics",
      },
      {
        icon: <ChartIcon />,
        label: "Export report",
        href: "#export",
      },
    ],
  },
};

export const CustomProgressColor: Story = {
  args: {
    progressColor: "bg-chart-3",
  },
};

export const SingleTab: Story = {
  args: {
    tabs: [
      {
        id: "performance",
        label: "Performance",
        value: "98.5%",
        progress: 98,
        minValue: "0%",
        maxValue: "100%",
        description: "Overall system performance metrics.",
      },
    ],
    links: [
      {
        icon: <ChartIcon />,
        label: "View detailed metrics",
        href: "#metrics",
      },
    ],
  },
};
