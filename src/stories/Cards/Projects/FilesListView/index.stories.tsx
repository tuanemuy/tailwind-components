import type { Meta, StoryObj } from "@storybook/react";
import { FilesListView } from "./index";
import type { FileItem } from "./index";

const meta: Meta<typeof FilesListView> = {
  title: "Cards/Projects/FilesListView",
  component: FilesListView,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample dropdown component for actions
const FileActionsDropdown = ({
  item,
  onEdit,
  onFavorite,
  onArchive,
  onDelete,
}: {
  item: FileItem;
  onEdit?: (item: FileItem) => void;
  onFavorite?: (item: FileItem) => void;
  onArchive?: (item: FileItem) => void;
  onDelete?: (item: FileItem) => void;
}) => (
  <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
    <button
      type="button"
      className="sm:p-1.5 sm:ps-3 size-7 sm:w-auto sm:h-auto inline-flex justify-center items-center gap-x-1 rounded-lg border border-border bg-card text-xs text-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
      aria-haspopup="menu"
      aria-expanded="false"
      aria-label="Dropdown"
    >
      <span className="hidden sm:inline-block">More</span>
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
          Edit file
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
          Archive file
        </button>

        <div className="my-1 border-t border-border"></div>

        <button
          type="button"
          className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-destructive hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
          onClick={() => onDelete?.(item)}
        >
          Delete file
        </button>
      </div>
    </div>
  </div>
);

export const Default: Story = {};

export const CustomItems: Story = {
  args: {
    items: [
      {
        id: "1",
        imageSrc:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        imageAlt: "Dashboard Image",
        title: "Dashboard",
        metadata: [
          { label: "Edited 2 weeks ago" },
          { label: "3mb", hidden: true },
        ],
        href: "#",
      },
      {
        id: "2",
        imageSrc:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        imageAlt: "Welcome Page Image",
        title: "Welcome Page",
        metadata: [
          { label: "Edited 2 weeks ago" },
          { label: "149kb", hidden: true },
        ],
        href: "#",
      },
    ],
  },
};

const createActionsDropdown = (title: string) => (
  <FileActionsDropdown
    item={{ id: "", imageSrc: "", imageAlt: "", title, metadata: [] }}
    onEdit={() => alert(`Editing ${title}`)}
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
        imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        imageAlt: "Analytics Image",
        title: "Analytics",
        metadata: [
          { label: "Edited a minute ago" },
          { label: "15kb", hidden: true },
        ],
        href: "#",
        actions: createActionsDropdown("Analytics"),
      },
      {
        id: "2",
        imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        imageAlt: "User Profile Image",
        title: "User Profile",
        metadata: [
          { label: "Edited 1 hour ago" },
          { label: "412kb", hidden: true },
        ],
        href: "#",
        actions: createActionsDropdown("User Profile"),
      },
    ],
  },
};
