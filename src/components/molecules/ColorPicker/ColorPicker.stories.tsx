import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ColorPicker, InlineColorPicker } from "./index";

const meta: Meta<typeof ColorPicker> = {
  title: "Molecules/ColorPicker",
  component: ColorPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [color, setColor] = useState("#3b82f6");
    return <ColorPicker value={color} onChange={setColor} />;
  },
};

export const Small: Story = {
  render: () => {
    const [color, setColor] = useState("#ef4444");
    return <ColorPicker value={color} onChange={setColor} size="sm" />;
  },
};

export const Large: Story = {
  render: () => {
    const [color, setColor] = useState("#22c55e");
    return <ColorPicker value={color} onChange={setColor} size="lg" />;
  },
};

export const WithCustomPresets: Story = {
  render: () => {
    const [color, setColor] = useState("#3b82f6");
    const brandColors = [
      "#1d4ed8",
      "#2563eb",
      "#3b82f6",
      "#60a5fa",
      "#93c5fd",
      "#dbeafe",
      "#1e40af",
      "#1e3a8a",
      "#172554",
      "#0f172a",
      "#020617",
      "#000000",
    ];

    return (
      <ColorPicker value={color} onChange={setColor} presets={brandColors} />
    );
  },
};

export const WithoutPresets: Story = {
  render: () => {
    const [color, setColor] = useState("#a855f7");
    return (
      <ColorPicker value={color} onChange={setColor} showPresets={false} />
    );
  },
};

export const WithoutInput: Story = {
  render: () => {
    const [color, setColor] = useState("#ec4899");
    return <ColorPicker value={color} onChange={setColor} showInput={false} />;
  },
};

export const Disabled: Story = {
  render: () => <ColorPicker value="#64748b" disabled />,
};

// Inline ColorPicker Stories
export const Inline: Story = {
  render: () => {
    const [color, setColor] = useState("#3b82f6");
    return (
      <div className="space-y-4">
        <InlineColorPicker value={color} onChange={setColor} />
        <p className="text-sm text-muted-foreground">Selected: {color}</p>
      </div>
    );
  },
};

export const InlineSmall: Story = {
  render: () => {
    const [color, setColor] = useState("#ef4444");
    return <InlineColorPicker value={color} onChange={setColor} size="sm" />;
  },
};

export const InlineLarge: Story = {
  render: () => {
    const [color, setColor] = useState("#22c55e");
    return <InlineColorPicker value={color} onChange={setColor} size="lg" />;
  },
};

export const FormExample: Story = {
  render: () => {
    const [color, setColor] = useState("#3b82f6");

    return (
      <div className="w-[280px] space-y-4 rounded-lg border border-border p-4">
        <div>
          <span className="mb-2 block text-sm font-medium">Brand Color</span>
          <ColorPicker value={color} onChange={setColor} />
        </div>
        <div className="flex items-center gap-x-2">
          <div
            className="h-10 flex-1 rounded-md"
            style={{ backgroundColor: color }}
          />
          <span className="text-sm font-mono text-muted-foreground">
            {color}
          </span>
        </div>
      </div>
    );
  },
};
