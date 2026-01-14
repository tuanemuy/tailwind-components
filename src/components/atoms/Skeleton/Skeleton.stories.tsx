import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from "./index";

const meta: Meta<typeof Skeleton> = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    animation: {
      control: "select",
      options: ["pulse", "wave", "none"],
    },
    shape: {
      control: "select",
      options: ["rectangle", "circle", "text"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
  },
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">
          Rectangle
        </span>
        <Skeleton shape="rectangle" width={200} height={100} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">Circle</span>
        <Skeleton shape="circle" width={64} height={64} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">Text</span>
        <Skeleton shape="text" width={200} height={16} />
      </div>
    </div>
  ),
};

export const Animations: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">Pulse</span>
        <Skeleton animation="pulse" height={20} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">Wave</span>
        <Skeleton animation="wave" height={20} />
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-2 block">None</span>
        <Skeleton animation="none" height={20} />
      </div>
    </div>
  ),
};

export const TextLines: Story = {
  render: () => (
    <div className="w-80">
      <SkeletonText lines={4} />
    </div>
  ),
};

export const AvatarSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SkeletonAvatar size="xs" />
      <SkeletonAvatar size="sm" />
      <SkeletonAvatar size="md" />
      <SkeletonAvatar size="lg" />
      <SkeletonAvatar size="xl" />
    </div>
  ),
};

export const CardPreset: Story = {
  render: () => (
    <div className="w-80">
      <SkeletonCard />
    </div>
  ),
};

export const CardVariations: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-64">
        <span className="text-xs text-muted-foreground mb-2 block">
          With Image
        </span>
        <SkeletonCard showImage showTitle showDescription />
      </div>
      <div className="w-64">
        <span className="text-xs text-muted-foreground mb-2 block">
          Without Image
        </span>
        <SkeletonCard showImage={false} showTitle showDescription />
      </div>
    </div>
  ),
};

export const UserListItem: Story = {
  render: () => (
    <div className="flex items-center gap-4 w-80 p-4 border rounded-lg">
      <SkeletonAvatar size="md" />
      <div className="flex-1">
        <Skeleton shape="text" height={16} className="w-3/4 mb-2" />
        <Skeleton shape="text" height={12} className="w-1/2" />
      </div>
    </div>
  ),
};

export const TableRows: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <div className="border rounded-lg overflow-hidden">
        <div className="p-4 border-b bg-muted/50">
          <div className="flex gap-4">
            <Skeleton shape="text" height={16} className="w-1/4" />
            <Skeleton shape="text" height={16} className="w-1/4" />
            <Skeleton shape="text" height={16} className="w-1/4" />
            <Skeleton shape="text" height={16} className="w-1/4" />
          </div>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border-b last:border-b-0">
            <div className="flex items-center gap-4">
              <SkeletonAvatar size="sm" />
              <Skeleton shape="text" height={14} className="w-1/4" />
              <Skeleton shape="text" height={14} className="w-1/4" />
              <Skeleton shape="text" height={14} className="w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ArticlePage: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <Skeleton shape="rectangle" height={240} className="w-full rounded-lg" />
      <div className="space-y-4">
        <Skeleton shape="text" height={32} className="w-3/4" />
        <div className="flex items-center gap-3">
          <SkeletonAvatar size="sm" />
          <Skeleton shape="text" height={14} className="w-32" />
        </div>
        <SkeletonText lines={6} />
      </div>
    </div>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 border rounded-lg">
            <Skeleton shape="text" height={12} className="w-1/2 mb-2" />
            <Skeleton shape="text" height={24} className="w-3/4 mb-2" />
            <Skeleton shape="text" height={10} className="w-1/3" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <SkeletonCard showImage={false} />
        <SkeletonCard showImage={false} />
      </div>
    </div>
  ),
};
