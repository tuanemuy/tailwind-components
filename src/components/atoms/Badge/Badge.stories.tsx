import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./index";
import { CheckIcon, XIcon, AlertCircleIcon } from "@/lib/icons";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "success", "warning"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    soft: {
      control: "boolean",
    },
    dot: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const SoftVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="default" soft>Default</Badge>
      <Badge variant="secondary" soft>Secondary</Badge>
      <Badge variant="destructive" soft>Destructive</Badge>
      <Badge variant="success" soft>Success</Badge>
      <Badge variant="warning" soft>Warning</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="xs">Extra Small</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  args: {
    children: "Status",
    dot: true,
  },
};

export const WithDotColors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="outline" dot dotColor="success">Online</Badge>
      <Badge variant="outline" dot dotColor="warning">Away</Badge>
      <Badge variant="outline" dot dotColor="error">Offline</Badge>
      <Badge variant="outline" dot dotColor="default">Default</Badge>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  args: {
    children: "Verified",
    variant: "success",
    leftIcon: <CheckIcon className="size-3" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Remove",
    variant: "destructive",
    rightIcon: <XIcon className="size-3" />,
  },
};

export const StatusExamples: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge variant="success" soft leftIcon={<CheckIcon className="size-3" />}>
        Completed
      </Badge>
      <Badge variant="warning" soft leftIcon={<AlertCircleIcon className="size-3" />}>
        Pending
      </Badge>
      <Badge variant="destructive" soft leftIcon={<XIcon className="size-3" />}>
        Failed
      </Badge>
    </div>
  ),
};
