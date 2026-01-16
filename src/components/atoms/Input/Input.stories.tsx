import type { Meta, StoryObj } from "@storybook/react";
import { MailIcon, SearchIcon, UserIcon } from "@/lib/icons";
import { Input } from "./index";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
    },
    inputSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
    },
    error: {
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
    placeholder: "Enter text...",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Hello World",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input inputSize="sm" placeholder="Small input" />
      <Input inputSize="md" placeholder="Medium input" />
      <Input inputSize="lg" placeholder="Large input" />
    </div>
  ),
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: "Search...",
    leftIcon: <SearchIcon className="size-4" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: "Enter email",
    type: "email",
    rightIcon: <MailIcon className="size-4" />,
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
    defaultValue: "password123",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "you@example.com",
    leftIcon: <MailIcon className="size-4" />,
  },
};

export const NumberInput: Story = {
  args: {
    type: "number",
    placeholder: "0",
    min: 0,
    max: 100,
  },
};

export const ErrorState: Story = {
  args: {
    placeholder: "Invalid input",
    error: true,
    defaultValue: "invalid",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  args: {
    defaultValue: "Cannot edit",
    disabled: true,
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input type="text" placeholder="Text input" />
      <Input
        type="email"
        placeholder="Email input"
        leftIcon={<MailIcon className="size-4" />}
      />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
    </div>
  ),
};

export const WithUserIcon: Story = {
  args: {
    placeholder: "Username",
    leftIcon: <UserIcon className="size-4" />,
  },
};
