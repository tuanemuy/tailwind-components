import type { Meta, StoryObj } from "@storybook/react";
import { FilesGridView } from "./index";

const meta: Meta<typeof FilesGridView> = {
  title: "Cards/Projects/FilesGridView",
  component: FilesGridView,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample dropdown component for actions
const FileActionsDropdown = ({
  onEdit,
  onFavorite,
  onArchive,
  onDelete,
}: {
  onEdit?: () => void;
  onFavorite?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
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
          onClick={onEdit}
        >
          Edit file
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
          onClick={onFavorite}
        >
          Add to favorites
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
          onClick={onArchive}
        >
          Archive file
        </button>

        <div className="my-1 border-t border-border"></div>

        <button
          type="button"
          className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-destructive hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
          onClick={onDelete}
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

export const WithActions: Story = {
  args: {
    items: [
      {
        id: "1",
        imageSrc:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        imageAlt: "Analytics Image",
        title: "Analytics",
        metadata: [
          { label: "Edited a minute ago" },
          { label: "15kb", hidden: true },
        ],
        href: "#",
        actions: (
          <FileActionsDropdown
            onEdit={() => alert("Editing Analytics")}
            onFavorite={() => alert("Added Analytics to favorites")}
            onArchive={() => alert("Archived Analytics")}
            onDelete={() => alert("Deleted Analytics")}
          />
        ),
      },
      {
        id: "2",
        imageSrc:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        imageAlt: "User Profile Image",
        title: "User Profile",
        metadata: [
          { label: "Edited 1 hour ago" },
          { label: "412kb", hidden: true },
        ],
        href: "#",
        actions: (
          <FileActionsDropdown
            onEdit={() => alert("Editing User Profile")}
            onFavorite={() => alert("Added User Profile to favorites")}
            onArchive={() => alert("Archived User Profile")}
            onDelete={() => alert("Deleted User Profile")}
          />
        ),
      },
    ],
  },
};
