import type { Meta, StoryObj } from "@storybook/react";
import { Spinner, DotsSpinner, RingSpinner } from "./index";
import { Button } from "../Button";

const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      control: "select",
      options: ["default", "secondary", "muted", "white"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    variant: "default",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xs" />
        <span className="text-xs text-muted-foreground">XS</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-xs text-muted-foreground">SM</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-xs text-muted-foreground">MD</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-xs text-muted-foreground">LG</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
        <span className="text-xs text-muted-foreground">XL</span>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="default" />
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="secondary" />
        <span className="text-xs text-muted-foreground">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="muted" />
        <span className="text-xs text-muted-foreground">Muted</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-4 bg-foreground rounded">
        <Spinner variant="white" />
        <span className="text-xs text-background">White</span>
      </div>
    </div>
  ),
};

export const DotsSpinnerComponent: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <DotsSpinner size="xs" />
        <span className="text-xs text-muted-foreground">XS</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DotsSpinner size="sm" />
        <span className="text-xs text-muted-foreground">SM</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DotsSpinner size="md" />
        <span className="text-xs text-muted-foreground">MD</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DotsSpinner size="lg" />
        <span className="text-xs text-muted-foreground">LG</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DotsSpinner size="xl" />
        <span className="text-xs text-muted-foreground">XL</span>
      </div>
    </div>
  ),
};

export const RingSpinnerComponent: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <RingSpinner size="xs" />
        <span className="text-xs text-muted-foreground">XS</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <RingSpinner size="sm" />
        <span className="text-xs text-muted-foreground">SM</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <RingSpinner size="md" />
        <span className="text-xs text-muted-foreground">MD</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <RingSpinner size="lg" />
        <span className="text-xs text-muted-foreground">LG</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <RingSpinner size="xl" />
        <span className="text-xs text-muted-foreground">XL</span>
      </div>
    </div>
  ),
};

export const AllStyles: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col items-center gap-4">
        <span className="text-sm font-medium">Default Spinner</span>
        <Spinner size="lg" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-sm font-medium">Dots Spinner</span>
        <DotsSpinner size="lg" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <span className="text-sm font-medium">Ring Spinner</span>
        <RingSpinner size="lg" />
      </div>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled>
        <Spinner size="sm" variant="muted" className="mr-2" />
        Loading...
      </Button>
      <Button variant="primary" disabled>
        <Spinner size="sm" variant="white" className="mr-2" />
        Processing
      </Button>
    </div>
  ),
};

export const FullPageLoader: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center gap-4 h-64 w-64 border rounded-lg">
      <Spinner size="xl" />
      <span className="text-sm text-muted-foreground">Loading content...</span>
    </div>
  ),
};

export const InlineLoader: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner size="xs" variant="muted" />
      <span>Fetching data...</span>
    </div>
  ),
};

export const CardLoader: Story = {
  render: () => (
    <div className="w-64 p-6 border rounded-lg">
      <div className="flex flex-col items-center gap-3">
        <RingSpinner size="lg" />
        <span className="text-sm font-medium">Processing Payment</span>
        <span className="text-xs text-muted-foreground text-center">
          Please wait while we process your payment
        </span>
      </div>
    </div>
  ),
};
