import type { Meta, StoryObj } from "@storybook/react";
import { FileSnippet, FileSnippetList, FileSnippetGrid } from "./index";

const meta: Meta<typeof FileSnippet> = {
  title: "Organisms/Cards/FileSnippet",
  component: FileSnippet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileSnippet>;

const sampleFile = {
  id: "1",
  name: "Project_Report_2024.pdf",
  type: "document" as const,
  size: "2.4 MB",
  extension: "pdf",
  modifiedDate: "Dec 15, 2025",
  downloadUrl: "#",
  description: "Annual project report with financial analysis and growth projections",
};

export const Default: Story = {
  args: {
    file: sampleFile,
  },
  decorators: [
    (Story) => (
      <div className="w-[450px]">
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
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const Inline: Story = {
  args: {
    file: sampleFile,
    variant: "inline",
  },
};

export const Preview: Story = {
  args: {
    file: {
      ...sampleFile,
      type: "image",
      name: "Dashboard_Screenshot.png",
      previewUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    },
    variant: "preview",
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export const ImageFile: Story = {
  args: {
    file: {
      id: "2",
      name: "Hero_Image.jpg",
      type: "image",
      size: "1.2 MB",
      extension: "jpg",
      modifiedDate: "Dec 10, 2025",
      downloadUrl: "#",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

export const CodeFile: Story = {
  args: {
    file: {
      id: "3",
      name: "index.tsx",
      type: "code",
      size: "4.5 KB",
      extension: "tsx",
      modifiedDate: "Dec 14, 2025",
      downloadUrl: "#",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

export const WithoutActions: Story = {
  args: {
    file: sampleFile,
    showActions: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

const files = [
  { id: "1", name: "Project_Report.pdf", type: "document" as const, size: "2.4 MB", extension: "pdf", downloadUrl: "#" },
  { id: "2", name: "Design_Assets.zip", type: "archive" as const, size: "15.8 MB", extension: "zip", downloadUrl: "#" },
  { id: "3", name: "Meeting_Notes.docx", type: "document" as const, size: "845 KB", extension: "docx", downloadUrl: "#" },
  { id: "4", name: "Logo.svg", type: "image" as const, size: "12 KB", extension: "svg", downloadUrl: "#" },
  { id: "5", name: "App_Mockup.fig", type: "other" as const, size: "8.2 MB", extension: "fig", downloadUrl: "#" },
];

export const List: StoryObj<typeof FileSnippetList> = {
  render: () => (
    <div className="w-[400px]">
      <FileSnippetList files={files} />
    </div>
  ),
};

export const ListDefault: StoryObj<typeof FileSnippetList> = {
  render: () => (
    <div className="w-[500px]">
      <FileSnippetList files={files} variant="default" />
    </div>
  ),
};

const previewFiles = [
  {
    id: "1",
    name: "Dashboard.png",
    type: "image" as const,
    size: "1.2 MB",
    extension: "png",
    previewUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    downloadUrl: "#",
    description: "Main dashboard view",
  },
  {
    id: "2",
    name: "Analytics.png",
    type: "image" as const,
    size: "980 KB",
    extension: "png",
    previewUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    downloadUrl: "#",
    description: "Analytics page design",
  },
  {
    id: "3",
    name: "Report.pdf",
    type: "document" as const,
    size: "2.4 MB",
    extension: "pdf",
    previewUrl: "#",
    downloadUrl: "#",
    description: "Quarterly report document",
  },
];

export const Grid: StoryObj<typeof FileSnippetGrid> = {
  render: () => (
    <div className="w-[900px]">
      <FileSnippetGrid files={previewFiles} columns={3} />
    </div>
  ),
};
