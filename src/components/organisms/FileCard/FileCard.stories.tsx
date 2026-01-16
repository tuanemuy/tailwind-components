import type { Meta, StoryObj } from "@storybook/react";
import type { FileCardData } from "./";
import { FileCard, FileCardGrid, FileCardList } from "./";

const meta: Meta<typeof FileCard> = {
  title: "Organisms/FileCard",
  component: FileCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileCard>;

const sampleFile: FileCardData = {
  id: "1",
  name: "project-presentation.pdf",
  type: "document",
  size: "2.4 MB",
  extension: "pdf",
  createdAt: "Jan 15, 2024",
  modifiedAt: "Mar 10, 2024",
  owner: {
    id: "u1",
    name: "Sarah Chen",
    avatarFallback: "SC",
  },
  isStarred: true,
  description: "Q1 project presentation for the stakeholder meeting",
  tags: ["Presentation", "Q1", "Important"],
};

const imageFile: FileCardData = {
  id: "2",
  name: "hero-banner.jpg",
  type: "image",
  size: "1.8 MB",
  extension: "jpg",
  modifiedAt: "Mar 8, 2024",
  previewUrl:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
  thumbnailUrl:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop",
  owner: {
    id: "u2",
    name: "Alex Kim",
    avatarFallback: "AK",
  },
  isStarred: false,
};

const multiImageFile: FileCardData = {
  id: "3",
  name: "Product Photos",
  type: "folder",
  size: "45.2 MB",
  images: [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop",
  ],
};

export const Default: Story = {
  args: {
    file: sampleFile,
    className: "w-[350px]",
  },
};

export const Grid: Story = {
  args: {
    file: imageFile,
    variant: "grid",
    onPreview: (file) => console.log("Preview:", file.name),
    onDownload: (file) => console.log("Download:", file.name),
    className: "w-[250px]",
  },
};

export const List: Story = {
  args: {
    file: sampleFile,
    variant: "list",
    selectable: true,
    onDownload: (file) => console.log("Download:", file.name),
    onShare: (file) => console.log("Share:", file.name),
    onDelete: (file) => console.log("Delete:", file.name),
    className: "w-[600px]",
  },
};

export const Compact: Story = {
  args: {
    file: sampleFile,
    variant: "compact",
    className: "w-[300px]",
  },
};

export const MultiImage: Story = {
  args: {
    file: multiImageFile,
    variant: "multi-image",
    selectable: true,
    className: "w-[300px]",
  },
};

export const Selectable: Story = {
  args: {
    file: sampleFile,
    variant: "list",
    selectable: true,
    selected: true,
    onSelect: (id, selected) => console.log("Select:", id, selected),
    className: "w-[600px]",
  },
};

// Grid layout
const sampleFiles: FileCardData[] = [
  {
    id: "1",
    name: "hero-banner.jpg",
    type: "image",
    size: "1.8 MB",
    previewUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
    modifiedAt: "Mar 8, 2024",
    isStarred: true,
  },
  {
    id: "2",
    name: "product-shot.png",
    type: "image",
    size: "2.1 MB",
    previewUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    modifiedAt: "Mar 7, 2024",
  },
  {
    id: "3",
    name: "team-photo.jpg",
    type: "image",
    size: "3.2 MB",
    previewUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    modifiedAt: "Mar 5, 2024",
  },
  {
    id: "4",
    name: "presentation.pdf",
    type: "document",
    size: "4.5 MB",
    modifiedAt: "Mar 4, 2024",
    isStarred: true,
  },
  {
    id: "5",
    name: "promo-video.mp4",
    type: "video",
    size: "128 MB",
    previewUrl:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&h=300&fit=crop",
    modifiedAt: "Mar 3, 2024",
  },
  {
    id: "6",
    name: "source-code.zip",
    type: "archive",
    size: "15.2 MB",
    modifiedAt: "Mar 2, 2024",
  },
];

export const GridLayout: StoryObj<typeof FileCardGrid> = {
  render: () => (
    <FileCardGrid
      files={sampleFiles}
      variant="grid"
      columns={3}
      selectable
      onFileClick={(file) => console.log("Clicked:", file.name)}
      onDownload={(file) => console.log("Download:", file.name)}
      onPreview={(file) => console.log("Preview:", file.name)}
      className="max-w-4xl"
    />
  ),
};

export const ListLayout: StoryObj<typeof FileCardList> = {
  render: () => (
    <FileCardList
      files={sampleFiles}
      selectable
      onFileClick={(file) => console.log("Clicked:", file.name)}
      onDownload={(file) => console.log("Download:", file.name)}
      onShare={(file) => console.log("Share:", file.name)}
      onDelete={(file) => console.log("Delete:", file.name)}
      className="max-w-2xl"
    />
  ),
};

// Multi-image grid
const multiImageFiles: FileCardData[] = [
  {
    id: "1",
    name: "Product Photos",
    type: "folder",
    size: "45.2 MB",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    ],
  },
  {
    id: "2",
    name: "Marketing Assets",
    type: "folder",
    size: "32.8 MB",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop",
    ],
  },
  {
    id: "3",
    name: "Event Photos",
    type: "folder",
    size: "78.5 MB",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=400&fit=crop",
    ],
  },
  {
    id: "4",
    name: "Team Headshots",
    type: "folder",
    size: "24.1 MB",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    ],
  },
];

export const MultiImageGrid: StoryObj<typeof FileCardGrid> = {
  render: () => (
    <FileCardGrid
      files={multiImageFiles}
      variant="multi-image"
      columns={4}
      selectable
      onFileClick={(file) => console.log("Clicked:", file.name)}
      className="max-w-5xl"
    />
  ),
};

export const FileTypes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(
        [
          "image",
          "video",
          "audio",
          "document",
          "code",
          "archive",
          "folder",
          "other",
        ] as const
      ).map((type) => (
        <FileCard
          key={type}
          file={{
            id: type,
            name: `sample.${type === "image" ? "jpg" : type === "video" ? "mp4" : type === "audio" ? "mp3" : type === "document" ? "pdf" : type === "code" ? "ts" : type === "archive" ? "zip" : type === "folder" ? "" : "bin"}`,
            type,
            size: "1.5 MB",
            modifiedAt: "Mar 10, 2024",
          }}
          variant="list"
          className="w-[350px]"
        />
      ))}
    </div>
  ),
};
