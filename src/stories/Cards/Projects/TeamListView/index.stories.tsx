import type { Meta, StoryObj } from "@storybook/react";
import { TeamListView } from "./index";
import type { TeamItem } from "./index";

const meta: Meta<typeof TeamListView> = {
  title: "Cards/Projects/TeamListView",
  component: TeamListView,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample primary action button (Leave team)
const LeaveTeamButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    type="button"
    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-border bg-card text-foreground shadow-2xs hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
    onClick={onClick}
  >
    Leave team
  </button>
);

// Sample dropdown component for team actions
const TeamActionsDropdown = ({
  item,
  onEdit,
  onFavorite,
  onArchive,
  onDelete,
}: {
  item: TeamItem;
  onEdit?: (item: TeamItem) => void;
  onFavorite?: (item: TeamItem) => void;
  onArchive?: (item: TeamItem) => void;
  onDelete?: (item: TeamItem) => void;
}) => (
  <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
    <button
      type="button"
      className="size-9.5 lg:size-7 inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-muted-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
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
          Edit team
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
          Archive team
        </button>

        <div className="my-1 border-t border-border"></div>

        <button
          type="button"
          className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-destructive hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
          onClick={() => onDelete?.(item)}
        >
          Delete team
        </button>
      </div>
    </div>
  </div>
);

export const Default: Story = {};

const createPrimaryAction = (name: string) => (
  <LeaveTeamButton onClick={() => alert(`Leaving ${name}`)} />
);

const createSecondaryActions = (name: string) => (
  <TeamActionsDropdown
    item={{ id: "", name, badges: [], description: "", members: [] }}
    onEdit={() => alert(`Editing ${name}`)}
    onFavorite={() => alert(`Added ${name} to favorites`)}
    onArchive={() => alert(`Archived ${name}`)}
    onDelete={() => alert(`Deleted ${name}`)}
  />
);

export const WithActions: Story = {
  args: {
    items: [
      {
        id: "1",
        name: "#Digitalmarketing",
        href: "#",
        badges: ["Marketing", "Digital"],
        description: "Our group promotes and sells products and services by leveraging online marketing tactics",
        members: [
          { type: "image", src: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?w=320&h=320&fit=facearea&facepad=2.5" },
          { type: "initial", initial: "L" },
          { type: "image", src: "https://images.unsplash.com/photo-1679412330254-90cb240038c5?w=320&h=320&fit=facearea&facepad=2.5" },
        ],
        primaryAction: createPrimaryAction("#Digitalmarketing"),
        secondaryActions: createSecondaryActions("#Digitalmarketing"),
      },
      {
        id: "2",
        name: "#supportteam",
        href: "#",
        badges: ["Customer service", "Support"],
        description: "Keep in touch and stay productive with us",
        members: [
          { type: "image", src: "https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?w=320&h=320&fit=facearea&facepad=2.5" },
          { type: "initial", initial: "M" },
          { type: "initial", initial: "S" },
        ],
        primaryAction: createPrimaryAction("#supportteam"),
        secondaryActions: createSecondaryActions("#supportteam"),
      },
    ],
  },
};

export const SingleTeam: Story = {
  args: {
    items: [
      {
        id: "1",
        name: "#engineering",
        href: "#",
        badges: ["Development", "Engineering"],
        description: "Building the future of our platform with cutting-edge technology",
        members: [
          { type: "image", src: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?w=320&h=320&fit=facearea&facepad=2.5" },
          { type: "image", src: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=320&h=320&fit=facearea&facepad=2.5" },
          { type: "initial", initial: "J" },
        ],
        primaryAction: createPrimaryAction("#engineering"),
        secondaryActions: createSecondaryActions("#engineering"),
      },
    ],
  },
};
