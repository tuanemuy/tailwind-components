import type { Meta, StoryObj } from "@storybook/react";
import { ProjectCosts } from "./index";

const meta: Meta<typeof ProjectCosts> = {
  title: "DataCards/ProjectCosts",
  component: ProjectCosts,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96 h-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomProgress: Story = {
  args: {
    totalAmount: "$5,400",
    progressPercent: 45,
    maxLabel: "$12,000 USD",
  },
};

export const FullProgress: Story = {
  args: {
    totalAmount: "$12,000",
    progressPercent: 100,
    description: "You have reached your budget limit.",
  },
};

export const CustomListItems: Story = {
  args: {
    listTitle: "Team costs",
    listItems: [
      { initial: "A", name: "Alpha Team", value: "$4,500" },
      { initial: "B", name: "Beta Team", value: "$2,300" },
    ],
  },
};

export const MinimalProgress: Story = {
  args: {
    title: "Monthly Spending",
    totalAmount: "$1,200",
    progressPercent: 10,
    minLabel: "$0",
    maxLabel: "$10,000",
    description: "Early stage of monthly budget cycle.",
  },
};
