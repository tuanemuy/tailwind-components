import type { Meta, StoryObj } from "@storybook/react";
import { Traffic } from "./index";

const meta: Meta<typeof Traffic> = {
  title: "DataCards/Traffic",
  component: Traffic,
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

export const CustomTitle: Story = {
  args: {
    title: "Traffic Sources",
    linkText: "View detailed analytics",
  },
};

export const CustomSources: Story = {
  args: {
    title: "Social Traffic",
    sources: [
      { name: "Twitter", value: "80k", percentage: 40, color: "bg-chart-1" },
      { name: "Facebook", value: "60k", percentage: 30, color: "bg-chart-2" },
      { name: "Instagram", value: "40k", percentage: 20, color: "bg-chart-3" },
      { name: "LinkedIn", value: "20k", percentage: 10, color: "bg-chart-4" },
    ],
  },
};

export const MinimalAvatars: Story = {
  args: {
    avatars: [
      {
        type: "initial",
        initial: "A",
        name: "Alice",
      },
      {
        type: "initial",
        initial: "B",
        name: "Bob",
      },
    ],
    moreCount: "50k more",
  },
};
