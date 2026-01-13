import type { Meta, StoryObj } from "@storybook/react";
import { FileList } from "./index";
import { Button } from "@/components/atoms";
import { Dropdown, DropdownItem, DropdownDivider } from "@/components/molecules";
import { MoreHorizontalIcon, DownloadIcon, EditIcon, TrashIcon, CopyIcon } from "@/lib/icons";

const meta: Meta<typeof FileList> = {
  title: "Organisms/FileList",
  component: FileList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "select",
      options: ["list", "grid"],
    },
    columns: {
      control: "select",
      options: [1, 2, 3, 4, "auto"],
    },
    gap: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileList>;

// Sample files data
const sampleFiles = [
  {
    id: "file-1",
    name: "Project Documentation.pdf",
    fileType: "document" as const,
    size: "2.4 MB",
    date: "Dec 12, 2024",
  },
  {
    id: "folder-1",
    name: "Design Assets",
    isFolder: true,
    date: "Dec 10, 2024",
  },
  {
    id: "file-2",
    name: "Hero Banner.png",
    fileType: "image" as const,
    size: "4.8 MB",
    date: "Dec 9, 2024",
  },
  {
    id: "file-3",
    name: "Product Video.mp4",
    fileType: "video" as const,
    size: "128 MB",
    date: "Dec 8, 2024",
  },
  {
    id: "file-4",
    name: "Data Export.zip",
    fileType: "archive" as const,
    size: "56 MB",
    date: "Dec 7, 2024",
  },
];

// With dropdown actions
const filesWithActions = sampleFiles.map((file) => ({
  ...file,
  actions: (
    <Dropdown
      trigger={
        <Button variant="ghost" size="sm">
          <MoreHorizontalIcon className="size-4" />
        </Button>
      }
    >
      <DropdownItem icon={<DownloadIcon />}>Download</DropdownItem>
      <DropdownItem icon={<CopyIcon />}>Copy link</DropdownItem>
      <DropdownItem icon={<EditIcon />}>Rename</DropdownItem>
      <DropdownDivider />
      <DropdownItem icon={<TrashIcon />} destructive>
        Delete
      </DropdownItem>
    </Dropdown>
  ),
}));

// Default list view
export const Default: Story = {
  args: {
    files: sampleFiles,
    layout: "list",
    gap: "md",
  },
};

// Grid layout
export const Grid: Story = {
  args: {
    files: sampleFiles,
    layout: "grid",
    columns: 3,
    gap: "md",
  },
};

// With actions dropdown
export const WithActions: Story = {
  args: {
    files: filesWithActions,
    layout: "list",
    gap: "md",
  },
};

// Grid with actions
export const GridWithActions: Story = {
  args: {
    files: filesWithActions,
    layout: "grid",
    columns: 2,
    gap: "md",
  },
};

// Uploading files
export const WithUploading: Story = {
  args: {
    files: [
      {
        id: "uploading-1",
        name: "Uploading File.pdf",
        fileType: "document" as const,
        status: "uploading" as const,
        progress: 65,
      },
      {
        id: "uploading-2",
        name: "Almost Done.png",
        fileType: "image" as const,
        status: "uploading" as const,
        progress: 90,
      },
      ...sampleFiles.slice(0, 2),
    ],
    layout: "list",
    gap: "md",
  },
};

// With error status
export const WithErrors: Story = {
  args: {
    files: [
      {
        id: "error-1",
        name: "Failed Upload.pdf",
        fileType: "document" as const,
        status: "error" as const,
        size: "2.4 MB",
      },
      ...sampleFiles.slice(0, 3),
    ],
    layout: "list",
    gap: "md",
  },
};

// Two columns grid
export const TwoColumns: Story = {
  args: {
    files: sampleFiles,
    layout: "grid",
    columns: 2,
    gap: "md",
  },
};

// Four columns grid
export const FourColumns: Story = {
  args: {
    files: sampleFiles,
    layout: "grid",
    columns: 4,
    gap: "sm",
  },
};

// Large gap
export const LargeGap: Story = {
  args: {
    files: sampleFiles,
    layout: "list",
    gap: "lg",
  },
};

// Empty state
export const Empty: Story = {
  args: {
    files: [],
    layout: "list",
    emptyState: (
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">No files uploaded</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Drag and drop files here or click to upload
        </p>
        <Button size="sm" className="mt-4">
          Upload Files
        </Button>
      </div>
    ),
  },
};

// Folders only
export const FoldersOnly: Story = {
  args: {
    files: [
      { id: "folder-docs", name: "Documents", isFolder: true, date: "Dec 12, 2024" },
      { id: "folder-images", name: "Images", isFolder: true, date: "Dec 10, 2024" },
      { id: "folder-videos", name: "Videos", isFolder: true, date: "Dec 8, 2024" },
      { id: "folder-archives", name: "Archives", isFolder: true, date: "Dec 5, 2024" },
    ],
    layout: "grid",
    columns: 4,
    gap: "md",
  },
};
