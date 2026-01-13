import type { Meta, StoryObj } from "@storybook/react";
import { TrendIndicator } from "./index";

const meta: Meta<typeof TrendIndicator> = {
  title: "Molecules/TrendIndicator",
  component: TrendIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["up", "down"],
    },
    variant: {
      control: "select",
      options: ["positive", "negative", "neutral"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showIcon: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Up: Story = {
  args: {
    value: "4.3%",
    direction: "up",
  },
};

export const Down: Story = {
  args: {
    value: "2.1%",
    direction: "down",
  },
};

export const Neutral: Story = {
  args: {
    value: "0%",
    direction: "up",
    variant: "neutral",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <TrendIndicator value="4.3%" direction="up" size="sm" />
      <TrendIndicator value="4.3%" direction="up" size="md" />
      <TrendIndicator value="4.3%" direction="up" size="lg" />
    </div>
  ),
};

export const WithoutIcon: Story = {
  args: {
    value: "+12.5%",
    direction: "up",
    showIcon: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <TrendIndicator value="4.3%" direction="up" />
      <TrendIndicator value="2.1%" direction="down" />
      <TrendIndicator value="0%" direction="up" variant="neutral" />
    </div>
  ),
};
