import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./index";

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
    },
    textareaSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    error: {
      control: "boolean",
    },
    resize: {
      control: "boolean",
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
    placeholder: "Enter your message...",
    className: "w-80",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "This is a sample text that demonstrates the textarea component with some content.",
    className: "w-80",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Textarea textareaSize="sm" placeholder="Small textarea" rows={3} />
      <Textarea textareaSize="md" placeholder="Medium textarea" rows={3} />
      <Textarea textareaSize="lg" placeholder="Large textarea" rows={3} />
    </div>
  ),
};

export const Resizable: Story = {
  args: {
    placeholder: "This textarea is resizable...",
    resize: true,
    className: "w-80",
    rows: 4,
  },
};

export const Error: Story = {
  args: {
    placeholder: "Error state",
    error: true,
    className: "w-80",
    defaultValue: "Invalid content",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
    className: "w-80",
  },
};

export const DisabledWithValue: Story = {
  args: {
    defaultValue: "This content cannot be edited",
    disabled: true,
    className: "w-80",
    rows: 3,
  },
};

export const LongContent: Story = {
  args: {
    defaultValue: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    className: "w-96",
    rows: 8,
  },
};

export const CustomRows: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Textarea placeholder="2 rows" rows={2} />
      <Textarea placeholder="4 rows" rows={4} />
      <Textarea placeholder="6 rows" rows={6} />
    </div>
  ),
};
