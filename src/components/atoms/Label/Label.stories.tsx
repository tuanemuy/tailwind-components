import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../Input";
import { Label } from "./index";

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    required: {
      control: "boolean",
    },
    optional: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};

export const Required: Story = {
  args: {
    children: "Email address",
    required: true,
  },
};

export const Optional: Story = {
  args: {
    children: "Phone number",
    optional: true,
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const RequiredWithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <Label htmlFor="name" required>
        Full name
      </Label>
      <Input id="name" placeholder="John Doe" />
    </div>
  ),
};

export const OptionalWithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <Label htmlFor="phone" optional>
        Phone number
      </Label>
      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div className="flex flex-col gap-2">
        <Label htmlFor="f-name" required>
          Name
        </Label>
        <Input id="f-name" placeholder="Enter your name" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="f-email" required>
          Email
        </Label>
        <Input id="f-email" type="email" placeholder="Enter your email" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="f-company" optional>
          Company
        </Label>
        <Input id="f-company" placeholder="Enter your company" />
      </div>
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <Label htmlFor="disabled" className="text-muted-foreground">
        Disabled field
      </Label>
      <Input id="disabled" placeholder="Cannot edit" disabled />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-1 w-80">
      <Label htmlFor="password" required>
        Password
      </Label>
      <p className="text-xs text-muted-foreground">
        Must be at least 8 characters
      </p>
      <Input id="password" type="password" className="mt-1" />
    </div>
  ),
};
