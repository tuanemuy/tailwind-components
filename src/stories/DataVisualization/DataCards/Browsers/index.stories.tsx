import type { Meta, StoryObj } from "@storybook/react";
import { Browsers } from "./index";

const meta: Meta<typeof Browsers> = {
  title: "DataCards/Browsers",
  component: Browsers,
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

export const CustomHighlight: Story = {
  args: {
    title: "Browser Usage",
    highlightValue: "92%",
    description: "Desktop browser usage has increased significantly this month.",
  },
};

export const CustomStatus: Story = {
  args: {
    statusLabel: "Excellent",
    highlightValue: "95%",
    description: "Your browser compatibility is exceptional.",
  },
};

export const NotificationsDisabled: Story = {
  args: {
    notification: {
      title: "Push notifications",
      description: "Automatically send me notifications",
      checked: false,
    },
  },
};
