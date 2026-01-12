import type { Meta, StoryObj } from "@storybook/react";
import { FilesMultipleImagesGridView } from "./index";
import type { FolderItem } from "./index";

const meta: Meta<typeof FilesMultipleImagesGridView> = {
  title: "Cards/Projects/FilesMultipleImagesGridView",
  component: FilesMultipleImagesGridView,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample dropdown component for folder actions
const FolderActionsDropdown = ({
  item,
  onEdit,
  onFavorite,
  onArchive,
  onDelete,
}: {
  item: FolderItem;
  onEdit?: (item: FolderItem) => void;
  onFavorite?: (item: FolderItem) => void;
  onArchive?: (item: FolderItem) => void;
  onDelete?: (item: FolderItem) => void;
}) => (
  <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
    <button
      type="button"
      className="size-7 inline-flex justify-center items-center gap-x-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
      aria-haspopup="menu"
      aria-expanded="false"
      aria-label="Dropdown"
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
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </svg>
    </button>

    <div
      className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-card rounded-xl shadow-xl"
      role="menu"
      aria-orientation="vertical"
    >
      <div className="p-1">
        <button
          type="button"
          className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
          onClick={() => onEdit?.(item)}
        >
          Edit folder
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
          onClick={() => onFavorite?.(item)}
        >
          Add to favorites
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
          onClick={() => onArchive?.(item)}
        >
          Archive folder
        </button>

        <div className="my-1 border-t border-border"></div>

        <button
          type="button"
          className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-destructive hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
          onClick={() => onDelete?.(item)}
        >
          Delete folder
        </button>
      </div>
    </div>
  </div>
);

// Sample add button component
const AddFileButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    type="button"
    className="group relative block w-full h-full flex flex-col justify-center items-center p-3 bg-muted border border-border focus:outline-hidden"
    onClick={onClick}
  >
    <span className="flex flex-col justify-center items-center size-7 bg-primary/20 text-primary rounded-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:duration-300 group-focus:bg-primary group-focus:text-primary-foreground group-focus:duration-300">
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
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </span>
    <small className="sr-only">Add file</small>
  </button>
);

export const Default: Story = {};

const createActionsDropdown = (title: string) => (
  <FolderActionsDropdown
    item={{ id: "", images: [], title, metadata: [] }}
    onEdit={() => alert(`Editing folder ${title}`)}
    onFavorite={() => alert(`Added ${title} to favorites`)}
    onArchive={() => alert(`Archived ${title}`)}
    onDelete={() => alert(`Deleted ${title}`)}
  />
);

export const WithActions: Story = {
  args: {
    items: [
      {
        id: "1",
        images: [
          { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop", label: "Resources" },
          { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop", label: "Pro Banner" },
          { src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop", label: "Preline v2.0" },
          { src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=200&h=200&fit=crop", label: "Analytics Site (Outdated)" },
        ],
        title: "Analytics",
        metadata: [
          { label: "20 files" },
          { label: "Edited a minute ago", hidden: true },
        ],
        href: "#",
        actions: createActionsDropdown("Analytics"),
      },
      {
        id: "2",
        images: [
          { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop", label: "Resources" },
          { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop", label: "Pro Banner" },
        ],
        title: "Dashboard",
        metadata: [
          { label: "3 files" },
          { label: "Edited 5 weeks ago", hidden: true },
        ],
        href: "#",
        actions: createActionsDropdown("Dashboard"),
      },
    ],
  },
};

export const WithAddButton: Story = {
  args: {
    items: [
      {
        id: "1",
        images: [
          { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop", label: "Resources" },
          { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop", label: "Pro Banner" },
        ],
        title: "Dashboard",
        metadata: [
          { label: "3 files" },
          { label: "Edited 5 weeks ago", hidden: true },
        ],
        href: "#",
        addButton: <AddFileButton onClick={() => alert("Adding file")} />,
        actions: createActionsDropdown("Dashboard"),
      },
    ],
  },
};
