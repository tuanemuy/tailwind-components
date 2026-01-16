import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./index";

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "archived", label: "Archived", disabled: true },
];

const meta: Meta<typeof Select> = {
  title: "Molecules/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: "Select a country",
    className: "w-64",
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: countryOptions,
    defaultValue: "jp",
    className: "w-64",
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: statusOptions,
    placeholder: "Select status",
    className: "w-64",
  },
};

export const Disabled: Story = {
  args: {
    options: countryOptions,
    placeholder: "Select a country",
    disabled: true,
    className: "w-64",
  },
};

export const WithError: Story = {
  args: {
    options: countryOptions,
    placeholder: "Select a country",
    error: true,
    className: "w-64",
  },
};

export const Controlled: Story = {
  render: function ControlledSelect() {
    const { useState } = require("react");
    const [value, setValue] = useState("us");

    return (
      <div className="space-y-4">
        <Select
          options={countryOptions}
          value={value}
          onChange={setValue}
          className="w-64"
        />
        <p className="text-sm text-muted-foreground">
          Selected value: <code className="text-foreground">{value}</code>
        </p>
      </div>
    );
  },
};

export const InForm: Story = {
  render: () => (
    <form className="w-80 space-y-4">
      <div className="space-y-2">
        <span className="block text-sm font-medium">Country</span>
        <Select
          name="country"
          options={countryOptions}
          placeholder="Select your country"
        />
      </div>
      <div className="space-y-2">
        <span className="block text-sm font-medium">Status</span>
        <Select
          name="status"
          options={statusOptions}
          placeholder="Select status"
        />
      </div>
    </form>
  ),
};

export const ManyOptions: Story = {
  args: {
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
      { value: "4", label: "Option 4" },
      { value: "5", label: "Option 5" },
      { value: "6", label: "Option 6" },
      { value: "7", label: "Option 7" },
      { value: "8", label: "Option 8" },
      { value: "9", label: "Option 9" },
      { value: "10", label: "Option 10" },
      { value: "11", label: "Option 11" },
      { value: "12", label: "Option 12" },
    ],
    placeholder: "Select an option",
    className: "w-64",
  },
};
