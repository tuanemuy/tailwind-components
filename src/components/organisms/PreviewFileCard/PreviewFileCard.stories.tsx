import type { Meta, StoryObj } from "@storybook/react";
import { PreviewFileCard, PreviewFileCardGrid } from "./index";

const meta: Meta<typeof PreviewFileCard> = {
  title: "Organisms/Cards/PreviewFileCard",
  component: PreviewFileCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PreviewFileCard>;

const sampleFile = {
  id: "1",
  name: "Dashboard_Mockup.png",
  type: "image" as const,
  size: "2.4 MB",
  extension: "png",
  previewUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  downloadUrl: "#",
  modifiedDate: "Dec 15, 2025",
  description: "Main dashboard design mockup with analytics widgets",
  isStarred: true,
  isShared: true,
  views: 245,
  downloads: 32,
  owner: {
    name: "John Doe",
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
};

export const Default: Story = {
  args: {
    file: sampleFile,
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export const Compact: Story = {
  args: {
    file: sampleFile,
    variant: "compact",
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export const Horizontal: Story = {
  args: {
    file: sampleFile,
    variant: "horizontal",
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export const Detailed: Story = {
  args: {
    file: sampleFile,
    variant: "detailed",
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const Selectable: Story = {
  args: {
    file: sampleFile,
    selectable: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export const Selected: Story = {
  args: {
    file: sampleFile,
    selectable: true,
    selected: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export const DocumentFile: Story = {
  args: {
    file: {
      ...sampleFile,
      type: "document",
      name: "Annual_Report.pdf",
      extension: "pdf",
      previewUrl: undefined,
      thumbnailUrl: undefined,
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export const CodeFile: Story = {
  args: {
    file: {
      ...sampleFile,
      type: "code",
      name: "index.tsx",
      extension: "tsx",
      size: "4.5 KB",
      previewUrl: undefined,
      thumbnailUrl: undefined,
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

const files = [
  {
    id: "1",
    name: "Dashboard_Mockup.png",
    type: "image" as const,
    size: "2.4 MB",
    extension: "png",
    previewUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600",
    downloadUrl: "#",
    modifiedDate: "Dec 15, 2025",
    isStarred: true,
    owner: { name: "John Doe" },
  },
  {
    id: "2",
    name: "Analytics_Page.png",
    type: "image" as const,
    size: "1.8 MB",
    extension: "png",
    previewUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600",
    downloadUrl: "#",
    modifiedDate: "Dec 14, 2025",
    owner: { name: "Jane Smith" },
  },
  {
    id: "3",
    name: "User_Flow.fig",
    type: "other" as const,
    size: "8.2 MB",
    extension: "fig",
    downloadUrl: "#",
    modifiedDate: "Dec 13, 2025",
    isShared: true,
    owner: { name: "Bob Wilson" },
  },
  {
    id: "4",
    name: "Report.pdf",
    type: "document" as const,
    size: "450 KB",
    extension: "pdf",
    downloadUrl: "#",
    modifiedDate: "Dec 12, 2025",
    owner: { name: "Sarah Johnson" },
  },
  {
    id: "5",
    name: "Landing_Page.png",
    type: "image" as const,
    size: "3.1 MB",
    extension: "png",
    previewUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600",
    downloadUrl: "#",
    modifiedDate: "Dec 11, 2025",
    owner: { name: "Mike Brown" },
  },
  {
    id: "6",
    name: "Presentation.pptx",
    type: "presentation" as const,
    size: "12.5 MB",
    extension: "pptx",
    downloadUrl: "#",
    modifiedDate: "Dec 10, 2025",
    isStarred: true,
    owner: { name: "Emily Davis" },
  },
];

export const Grid: StoryObj<typeof PreviewFileCardGrid> = {
  render: () => (
    <div className="w-[900px]">
      <PreviewFileCardGrid
        files={files}
        columns={3}
      />
    </div>
  ),
};

export const GridSelectable: StoryObj<typeof PreviewFileCardGrid> = {
  render: () => (
    <div className="w-[900px]">
      <PreviewFileCardGrid
        files={files}
        columns={3}
        selectable
        selectedIds={["1", "3"]}
      />
    </div>
  ),
};

export const GridDetailed: StoryObj<typeof PreviewFileCardGrid> = {
  render: () => (
    <div className="w-[900px]">
      <PreviewFileCardGrid
        files={files.slice(0, 3)}
        variant="detailed"
        columns={3}
      />
    </div>
  ),
};
