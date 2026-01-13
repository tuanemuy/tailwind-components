import type { Meta, StoryObj } from "@storybook/react";
import { FileItem } from "./index";
import { Button } from "@/components/atoms";
import { DownloadIcon, TrashIcon, EditIcon } from "@/lib/icons";

const meta: Meta<typeof FileItem> = {
  title: "Molecules/FileItem",
  component: FileItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    fileType: {
      control: "select",
      options: ["image", "document", "video", "audio", "archive", "other"],
    },
    status: {
      control: "select",
      options: [undefined, "uploading", "complete", "error"],
    },
    progress: {
      control: { type: "range", min: 0, max: 100 },
    },
    isFolder: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "document.pdf",
    fileType: "document",
    size: "2.4 MB",
    date: "Jan 12, 2024",
  },
};

export const Image: Story = {
  args: {
    name: "photo.jpg",
    fileType: "image",
    size: "1.2 MB",
    date: "Jan 10, 2024",
  },
};

export const Folder: Story = {
  args: {
    name: "Documents",
    isFolder: true,
    size: "12 items",
  },
};

export const Uploading: Story = {
  args: {
    name: "video.mp4",
    fileType: "video",
    size: "128 MB",
    status: "uploading",
    progress: 45,
  },
};

export const Error: Story = {
  args: {
    name: "failed-upload.zip",
    fileType: "archive",
    size: "50 MB",
    status: "error",
  },
};

export const WithCustomActions: Story = {
  args: {
    name: "report.xlsx",
    fileType: "document",
    size: "856 KB",
    date: "Jan 15, 2024",
    actions: (
      <div className="flex gap-1">
        <Button variant="ghost" size="xs">
          <DownloadIcon className="size-4" />
        </Button>
        <Button variant="ghost" size="xs">
          <EditIcon className="size-4" />
        </Button>
        <Button variant="ghost" size="xs">
          <TrashIcon className="size-4 text-destructive" />
        </Button>
      </div>
    ),
  },
};

export const FileTypes: Story = {
  render: () => (
    <div className="w-96 space-y-2">
      <FileItem name="presentation.pptx" fileType="document" size="4.2 MB" />
      <FileItem name="photo.png" fileType="image" size="2.1 MB" />
      <FileItem name="movie.mp4" fileType="video" size="256 MB" />
      <FileItem name="music.mp3" fileType="audio" size="8.4 MB" />
      <FileItem name="backup.zip" fileType="archive" size="1.2 GB" />
      <FileItem name="unknown.xyz" fileType="other" size="100 KB" />
    </div>
  ),
};

export const UploadProgress: Story = {
  render: () => (
    <div className="w-96 space-y-2">
      <FileItem name="file1.pdf" fileType="document" status="uploading" progress={25} />
      <FileItem name="file2.jpg" fileType="image" status="uploading" progress={60} />
      <FileItem name="file3.mp4" fileType="video" status="uploading" progress={90} />
    </div>
  ),
};
