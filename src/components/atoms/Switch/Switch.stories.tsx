import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Label } from "../Label";
import { Switch } from "./index";

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    checked: {
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
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Switch size="sm" defaultChecked />
      <Switch size="md" defaultChecked />
      <Switch size="lg" defaultChecked />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
};

export const WithLabelLeft: Story = {
  render: () => (
    <div className="flex items-center justify-between w-64">
      <Label htmlFor="dark-mode">Dark mode</Label>
      <Switch id="dark-mode" />
    </div>
  ),
};

const ControlledExample = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch
          id="controlled-switch"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <Label htmlFor="controlled-switch">
          {enabled ? "Enabled" : "Disabled"}
        </Label>
      </div>
      <p className="text-sm text-muted-foreground">
        State: {enabled ? "ON" : "OFF"}
      </p>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const SettingsExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <div className="flex items-center justify-between">
        <Label htmlFor="s1">Email notifications</Label>
        <Switch id="s1" defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="s2">Push notifications</Label>
        <Switch id="s2" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="s3">SMS notifications</Label>
        <Switch id="s3" disabled />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="s4">Marketing emails</Label>
        <Switch id="s4" />
      </div>
    </div>
  ),
};

export const AllSizesComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Switch size="sm" />
        <Switch size="sm" defaultChecked />
        <span className="text-sm text-muted-foreground">Small</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch size="md" />
        <Switch size="md" defaultChecked />
        <span className="text-sm text-muted-foreground">Medium (default)</span>
      </div>
      <div className="flex items-center gap-4">
        <Switch size="lg" />
        <Switch size="lg" defaultChecked />
        <span className="text-sm text-muted-foreground">Large</span>
      </div>
    </div>
  ),
};
