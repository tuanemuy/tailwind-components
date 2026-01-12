import type { Meta, StoryObj } from "@storybook/react";
import { TopCountries } from "./index";

const meta: Meta<typeof TopCountries> = {
  title: "DataCards/TopCountries",
  component: TopCountries,
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
    title: "Top Regions",
    linkText: "View Details",
    performanceText: "Your regional performance is excellent.",
  },
};

export const CustomStatus: Story = {
  args: {
    statusLabel: "Excellent",
    performanceText: "You are in the top 1% of performers.",
  },
};
