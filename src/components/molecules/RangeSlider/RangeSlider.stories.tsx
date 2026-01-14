import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { RangeSlider, Slider } from "./index";

const meta: Meta<typeof RangeSlider> = {
  title: "Molecules/RangeSlider",
  component: RangeSlider,
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
    const [value, setValue] = useState<[number, number]>([25, 75]);
    return (
      <div className="w-[300px]">
        <RangeSlider value={value} onChange={setValue} />
      </div>
    );
  },
};

export const WithValues: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([20, 80]);
    return (
      <div className="w-[300px]">
        <RangeSlider value={value} onChange={setValue} showValues />
      </div>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([30, 70]);
    return (
      <div className="w-[300px]">
        <RangeSlider value={value} onChange={setValue} size="sm" showValues />
      </div>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([25, 75]);
    return (
      <div className="w-[300px]">
        <RangeSlider value={value} onChange={setValue} size="lg" showValues />
      </div>
    );
  },
};

export const CustomRange: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([200, 800]);
    return (
      <div className="w-[300px]">
        <RangeSlider
          value={value}
          onChange={setValue}
          min={0}
          max={1000}
          step={50}
          showValues
        />
      </div>
    );
  },
};

export const PriceRange: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([100, 500]);
    return (
      <div className="w-[300px]">
        <RangeSlider
          value={value}
          onChange={setValue}
          min={0}
          max={1000}
          step={10}
          showValues
          formatValue={(v) => `$${v}`}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <RangeSlider defaultValue={[25, 75]} disabled showValues />
    </div>
  ),
};

// Single Slider Stories
export const SingleSlider: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div className="w-[300px] space-y-4">
        <Slider value={value} onChange={setValue} />
        <p className="text-center text-sm text-muted-foreground">
          Value: {value}
        </p>
      </div>
    );
  },
};

export const SingleSliderWithStep: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div className="w-[300px] space-y-4">
        <Slider value={value} onChange={setValue} step={10} />
        <p className="text-center text-sm text-muted-foreground">
          Value: {value} (step: 10)
        </p>
      </div>
    );
  },
};

export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = useState(70);
    return (
      <div className="w-[200px] space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Volume</span>
          <span className="text-muted-foreground">{volume}%</span>
        </div>
        <Slider value={volume} onChange={setVolume} />
      </div>
    );
  },
};
