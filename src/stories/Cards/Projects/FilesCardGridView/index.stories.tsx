import type { Meta, StoryObj } from "@storybook/react";
import { FilesCardGridView } from "./index";
import type { FileCardItem } from "./index";

const meta: Meta<typeof FilesCardGridView> = {
  title: "Cards/Projects/FilesCardGridView",
  component: FilesCardGridView,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample action buttons component
const FileActionButtons = ({
  item,
  onDownload,
  onShare,
  onDelete,
}: {
  item: FileCardItem;
  onDownload?: (item: FileCardItem) => void;
  onShare?: (item: FileCardItem) => void;
  onDelete?: (item: FileCardItem) => void;
}) => (
  <div className="p-0.5 sm:p-1 inline-flex items-center bg-card border border-border lg:shadow-xs rounded-lg">
    <button
      type="button"
      className="size-7.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-muted-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
      onClick={() => onDownload?.(item)}
    >
      <svg
        className="shrink-0 size-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
    </button>

    <button
      type="button"
      className="size-7.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-muted-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
      onClick={() => onShare?.(item)}
    >
      <svg
        className="shrink-0 size-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
        <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
      </svg>
    </button>

    <div className="w-px h-5 mx-1 bg-border"></div>

    <button
      type="button"
      className="size-7.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-destructive hover:bg-destructive/10 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-destructive/10"
      onClick={() => onDelete?.(item)}
    >
      <svg
        className="shrink-0 size-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
      </svg>
    </button>
  </div>
);

export const Default: Story = {};

export const CustomItems: Story = {
  args: {
    items: [
      {
        id: "1",
        type: "image",
        imageSrc:
          "https://images.unsplash.com/photo-1635776062360-af423602aff3?w=560&h=320&fit=crop",
        fileName: "hero_banner.jpg",
        metadata: "Design Team, Jan 10th, 2024",
      },
      {
        id: "2",
        type: "document",
        fileName: "project_spec.docx",
        metadata: "John, Dec 15th, 2023",
      },
    ],
  },
};

const createActionButtons = (fileName: string) => (
  <FileActionButtons
    item={{ id: "", type: "document", fileName, metadata: "" }}
    onDownload={() => alert(`Downloading ${fileName}`)}
    onShare={() => alert(`Sharing ${fileName}`)}
    onDelete={() => alert(`Deleting ${fileName}`)}
  />
);

export const WithActions: Story = {
  args: {
    items: [
      {
        id: "1",
        type: "image",
        imageSrc:
          "https://images.unsplash.com/photo-1635776062360-af423602aff3?w=560&h=320&fit=crop",
        fileName: "cover_image.jpg",
        metadata: "James, Feb 25th, 2023",
        actions: createActionButtons("cover_image.jpg"),
      },
      {
        id: "2",
        type: "text",
        fileName: "meeting_notes.txt",
        metadata: "Amanda, Feb 20th, 2023",
        actions: createActionButtons("meeting_notes.txt"),
      },
      {
        id: "3",
        type: "html",
        fileName: "project_notes.html",
        metadata: "James, Feb 6th, 2023",
        actions: createActionButtons("project_notes.html"),
      },
      {
        id: "4",
        type: "document",
        fileName: "requirements.docx",
        metadata: "Sarah, Jan 15th, 2023",
        actions: createActionButtons("requirements.docx"),
      },
    ],
  },
};
