import type { Meta, StoryObj } from "@storybook/react";
import { MailIcon } from "@/components/icons";
import { FormField } from "./index";

const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    error: {
      control: "text",
    },
    helpText: {
      control: "text",
    },
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
  render: () => (
    <FormField
      label="Email"
      inputProps={{
        placeholder: "Enter your email",
      }}
    />
  ),
};

export const WithHelpText: Story = {
  render: () => (
    <FormField
      label="Email"
      helpText="We'll never share your email with anyone else."
      inputProps={{
        placeholder: "Enter your email",
      }}
    />
  ),
};

export const Required: Story = {
  render: () => (
    <FormField
      label="Email"
      required
      inputProps={{
        placeholder: "Enter your email",
      }}
    />
  ),
};

export const Optional: Story = {
  render: () => (
    <FormField
      label="Phone Number"
      optional
      type="tel"
      inputProps={{
        placeholder: "Enter your phone number",
      }}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField
      label="Email"
      error="Please enter a valid email address."
      inputProps={{
        placeholder: "Enter your email",
        defaultValue: "invalid-email",
      }}
    />
  ),
};

export const Password: Story = {
  render: () => (
    <FormField
      label="Password"
      type="password"
      required
      helpText="Must be at least 8 characters."
      inputProps={{
        placeholder: "Enter your password",
      }}
    />
  ),
};

export const WithIcon: Story = {
  render: () => (
    <FormField
      label="Email"
      type="email"
      inputProps={{
        placeholder: "Enter your email",
        leftIcon: <MailIcon className="size-4" />,
      }}
    />
  ),
};

export const Multiline: Story = {
  render: () => (
    <FormField
      label="Description"
      multiline
      helpText="Describe your project in detail."
      inputProps={{
        placeholder: "Enter a description...",
        rows: 4,
      }}
    />
  ),
};

export const MultilineWithError: Story = {
  render: () => (
    <FormField
      label="Bio"
      multiline
      error="Bio must be at least 50 characters."
      inputProps={{
        placeholder: "Tell us about yourself...",
        rows: 3,
        defaultValue: "Too short",
      }}
    />
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <FormField
        label="Full Name"
        required
        inputProps={{ placeholder: "John Doe" }}
      />
      <FormField
        label="Email"
        type="email"
        required
        inputProps={{ placeholder: "john@example.com" }}
      />
      <FormField
        label="Password"
        type="password"
        required
        helpText="Must be at least 8 characters."
        inputProps={{ placeholder: "••••••••" }}
      />
      <FormField
        label="Bio"
        multiline
        optional
        inputProps={{ placeholder: "Tell us about yourself...", rows: 3 }}
      />
    </div>
  ),
};
