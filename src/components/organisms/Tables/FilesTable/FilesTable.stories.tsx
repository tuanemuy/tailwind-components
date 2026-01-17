import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { type FileData, FilesTable } from "./index";

// Sample files data
const sampleFiles: FileData[] = [
  {
    id: "1",
    name: "Project Proposal.pdf",
    type: "document",
    mimeType: "application/pdf",
    size: 2457600,
    url: "/files/proposal.pdf",
    owner: {
      id: "1",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?u=john",
    },
    sharedWith: [
      {
        id: "2",
        name: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?u=jane",
      },
      {
        id: "3",
        name: "Bob Johnson",
        avatar: "https://i.pravatar.cc/150?u=bob",
      },
    ],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-14",
    isStarred: true,
    isShared: true,
    path: "/Documents/Projects",
  },
  {
    id: "2",
    name: "Team Photo.jpg",
    type: "image",
    mimeType: "image/jpeg",
    size: 3145728,
    url: "/files/team.jpg",
    thumbnailUrl: "https://picsum.photos/seed/team/100",
    owner: {
      id: "2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?u=jane",
    },
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08",
    path: "/Images",
  },
  {
    id: "3",
    name: "Marketing Assets",
    type: "folder",
    size: 0,
    owner: {
      id: "1",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?u=john",
    },
    sharedWith: [
      {
        id: "4",
        name: "Alice Brown",
        avatar: "https://i.pravatar.cc/150?u=alice",
      },
    ],
    createdAt: "2024-01-05",
    updatedAt: "2024-01-12",
    isShared: true,
    path: "/",
  },
  {
    id: "4",
    name: "Presentation.pptx",
    type: "document",
    mimeType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    size: 5242880,
    url: "/files/presentation.pptx",
    owner: {
      id: "3",
      name: "Bob Johnson",
      avatar: "https://i.pravatar.cc/150?u=bob",
    },
    createdAt: "2024-01-12",
    updatedAt: "2024-01-13",
    isStarred: true,
    path: "/Documents/Presentations",
  },
  {
    id: "5",
    name: "product-demo.mp4",
    type: "video",
    mimeType: "video/mp4",
    size: 52428800,
    url: "/files/demo.mp4",
    thumbnailUrl: "https://picsum.photos/seed/video/100",
    owner: {
      id: "4",
      name: "Alice Brown",
      avatar: "https://i.pravatar.cc/150?u=alice",
    },
    createdAt: "2024-01-09",
    updatedAt: "2024-01-09",
    path: "/Videos",
  },
  {
    id: "6",
    name: "backup.zip",
    type: "archive",
    mimeType: "application/zip",
    size: 104857600,
    url: "/files/backup.zip",
    owner: {
      id: "1",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?u=john",
    },
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    path: "/Backups",
  },
  {
    id: "7",
    name: "podcast-episode.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
    size: 15728640,
    url: "/files/podcast.mp3",
    owner: {
      id: "2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?u=jane",
    },
    createdAt: "2024-01-11",
    updatedAt: "2024-01-11",
    path: "/Audio",
  },
];

const meta: Meta<typeof FilesTable> = {
  title: "Organisms/Tables/FilesTable",
  component: FilesTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default FilesTable
export const Default: Story = {
  args: {
    files: sampleFiles,
  },
};

// With All Columns
export const WithAllColumns: Story = {
  args: {
    files: sampleFiles,
    showOwner: true,
    showSharedWith: true,
    showPath: true,
    showDates: true,
  },
};

// With Selection
export const WithSelection: Story = {
  render: function Render() {
    const [selectedRows, setSelectedRows] = useState<FileData[]>([]);

    return (
      <FilesTable
        files={sampleFiles}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        bulkActions={[
          {
            label: "Download",
            onClick: (rows) => console.log("Download", rows),
          },
          {
            label: "Move to",
            onClick: (rows) => console.log("Move", rows),
          },
          {
            label: "Delete",
            onClick: (rows) => console.log("Delete", rows),
            variant: "destructive",
          },
        ]}
      />
    );
  },
};

// With Filtering
export const WithFiltering: Story = {
  args: {
    files: sampleFiles,
    filterable: true,
    sortable: true,
  },
};

// Minimal View
export const MinimalView: Story = {
  args: {
    files: sampleFiles,
    showOwner: false,
    showSharedWith: false,
    showPath: false,
    showDates: false,
  },
};

// With Path and Sharing
export const WithPathAndSharing: Story = {
  args: {
    files: sampleFiles,
    showOwner: true,
    showSharedWith: true,
    showPath: true,
    showDates: false,
  },
};

// Compact Mode
export const CompactMode: Story = {
  args: {
    files: sampleFiles,
    compact: true,
  },
};

// With Pagination
export const WithPagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const pageSize = 3;

    const paginatedFiles = sampleFiles.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );

    return (
      <FilesTable
        files={paginatedFiles}
        pagination={{
          page,
          pageSize,
          total: sampleFiles.length,
          onPageChange: setPage,
        }}
      />
    );
  },
};

// Loading State
export const Loading: Story = {
  args: {
    files: [],
    loading: true,
  },
};

// Empty State
export const Empty: Story = {
  args: {
    files: [],
    emptyState: (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No files found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Upload files to get started
        </p>
      </div>
    ),
  },
};
