import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./index";

const meta: Meta<typeof ProgressBar> = {
  title: "Atoms/ProgressBar",
  component: ProgressBar,
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
      options: ["default", "success", "warning", "error", "info"],
    },
    value: {
      control: { type: "range", min: 0, max: 100 },
    },
    showValue: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    className: "w-80",
  },
};

export const WithValue: Story = {
  args: {
    value: 75,
    showValue: true,
    className: "w-80",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">
          Extra Small
        </span>
        <ProgressBar size="xs" value={60} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">Small</span>
        <ProgressBar size="sm" value={60} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">Medium</span>
        <ProgressBar size="md" value={60} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">Large</span>
        <ProgressBar size="lg" value={60} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">
          Extra Large
        </span>
        <ProgressBar size="xl" value={60} />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">
          Default
        </span>
        <ProgressBar variant="default" value={60} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">
          Success
        </span>
        <ProgressBar variant="success" value={80} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">
          Warning
        </span>
        <ProgressBar variant="warning" value={50} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">Error</span>
        <ProgressBar variant="error" value={30} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">Info</span>
        <ProgressBar variant="info" value={70} />
      </div>
    </div>
  ),
};

export const Empty: Story = {
  args: {
    value: 0,
    className: "w-80",
  },
};

export const Full: Story = {
  args: {
    value: 100,
    className: "w-80",
  },
};

export const CustomMax: Story = {
  args: {
    value: 45,
    max: 50,
    showValue: true,
    className: "w-80",
  },
};

export const ProgressSteps: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <ProgressBar value={25} showValue variant="default" />
      <ProgressBar value={50} showValue variant="info" />
      <ProgressBar value={75} showValue variant="warning" />
      <ProgressBar value={100} showValue variant="success" />
    </div>
  ),
};

export const UploadProgress: Story = {
  render: () => (
    <div className="w-80 p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Uploading file.zip</span>
        <span className="text-sm text-muted-foreground">67%</span>
      </div>
      <ProgressBar value={67} size="sm" variant="info" />
      <p className="text-xs text-muted-foreground mt-2">12.5 MB of 18.7 MB</p>
    </div>
  ),
};
