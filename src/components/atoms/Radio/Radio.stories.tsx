import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Label } from "../Label";
import { Radio } from "./index";

const meta: Meta<typeof Radio> = {
  title: "Atoms/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
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
    name: "default",
  },
};

export const Checked: Story = {
  args: {
    name: "checked",
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Radio size="sm" name="size" defaultChecked />
      <Radio size="md" name="size" />
      <Radio size="lg" name="size" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    name: "disabled",
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    name: "disabled-checked",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Radio id="radio-label" name="with-label" />
      <Label htmlFor="radio-label">Radio option</Label>
    </div>
  ),
};

export const RadioGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Radio id="plan1" name="plan" defaultChecked />
        <Label htmlFor="plan1">Free Plan</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="plan2" name="plan" />
        <Label htmlFor="plan2">Pro Plan</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="plan3" name="plan" />
        <Label htmlFor="plan3">Enterprise Plan</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="plan4" name="plan" disabled />
        <Label htmlFor="plan4" className="text-muted-foreground">
          Custom Plan (disabled)
        </Label>
      </div>
    </div>
  ),
};

const ControlledExample = () => {
  const [selected, setSelected] = useState("option1");
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Radio
          id="ctrl1"
          name="controlled"
          checked={selected === "option1"}
          onChange={() => setSelected("option1")}
        />
        <Label htmlFor="ctrl1">Option 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio
          id="ctrl2"
          name="controlled"
          checked={selected === "option2"}
          onChange={() => setSelected("option2")}
        />
        <Label htmlFor="ctrl2">Option 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio
          id="ctrl3"
          name="controlled"
          checked={selected === "option3"}
          onChange={() => setSelected("option3")}
        />
        <Label htmlFor="ctrl3">Option 3</Label>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Selected: {selected}</p>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const HorizontalGroup: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Radio id="h1" name="horizontal" defaultChecked />
        <Label htmlFor="h1">Small</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="h2" name="horizontal" />
        <Label htmlFor="h2">Medium</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="h3" name="horizontal" />
        <Label htmlFor="h3">Large</Label>
      </div>
    </div>
  ),
};
