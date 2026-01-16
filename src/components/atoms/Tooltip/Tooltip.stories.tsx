import type { Meta, StoryObj } from "@storybook/react";
import { SettingsIcon } from "@/lib/icons";
import { Button } from "../Button";
import { Tooltip } from "./index";

const meta: Meta<typeof Tooltip> = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "light"],
    },
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    showArrow: {
      control: "boolean",
    },
    delay: {
      control: { type: "number", min: 0, max: 1000 },
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <Button>Hover me</Button>,
  },
};

export const Positions: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-16">
      <Tooltip content="Top tooltip" position="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-8">
      <Tooltip content="Default dark tooltip" variant="default">
        <Button variant="outline">Default</Button>
      </Tooltip>
      <Tooltip content="Light tooltip" variant="light">
        <Button variant="outline">Light</Button>
      </Tooltip>
    </div>
  ),
};

export const WithoutArrow: Story = {
  args: {
    content: "No arrow tooltip",
    showArrow: false,
    children: <Button>No Arrow</Button>,
  },
};

export const CustomDelay: Story = {
  args: {
    content: "Appears after 500ms",
    delay: 500,
    children: <Button>Delayed Tooltip</Button>,
  },
};

export const Disabled: Story = {
  args: {
    content: "This won't show",
    disabled: true,
    children: <Button>Disabled Tooltip</Button>,
  },
};

export const LongContent: Story = {
  render: () => (
    <div className="p-8">
      <Tooltip
        content={
          <span className="max-w-xs whitespace-normal">
            This is a longer tooltip message that provides more detailed
            information about the element.
          </span>
        }
      >
        <Button variant="outline">Long Content</Button>
      </Tooltip>
    </div>
  ),
};

export const OnIconButton: Story = {
  render: () => (
    <div className="p-8">
      <Tooltip content="Settings">
        <button type="button" className="rounded-md p-2 hover:bg-muted">
          <SettingsIcon className="size-5" />
        </button>
      </Tooltip>
    </div>
  ),
};
