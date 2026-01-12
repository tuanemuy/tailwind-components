import type { Meta, StoryObj } from "@storybook/react";
import { UserCardWithHeroBackground } from "./index";
import type { UserCardItem } from "./index";

const meta: Meta<typeof UserCardWithHeroBackground> = {
  title: "Cards/Projects/UserCardWithHeroBackground",
  component: UserCardWithHeroBackground,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample favorite button component
const FavoriteButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    type="button"
    className="flex justify-center items-center gap-x-3 size-8 text-sm border border-border text-muted-foreground hover:bg-muted rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
    onClick={onClick}
  >
    <svg
      className="shrink-0 size-3.5"
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
    <span className="sr-only">Add to favorites</span>
  </button>
);

// Sample dropdown component for user actions
const UserActionsDropdown = ({
  item,
  onShare,
  onBlock,
  onDelete,
}: {
  item: UserCardItem;
  onShare?: (item: UserCardItem) => void;
  onBlock?: (item: UserCardItem) => void;
  onDelete?: (item: UserCardItem) => void;
}) => (
  <div className="hs-dropdown [--strategy:absolute] [--placement:bottom-right] relative inline-flex">
    <button
      type="button"
      className="flex justify-center items-center gap-x-3 size-8 text-sm border border-border text-muted-foreground hover:bg-muted rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
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
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    </button>

    <div
      className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-11 bg-card rounded-xl shadow-xl"
      role="menu"
      aria-orientation="vertical"
    >
      <div className="p-1 space-y-0.5">
        <button
          type="button"
          className="w-full flex items-center gap-x-2 py-1.5 px-2 rounded-lg text-xs text-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
          onClick={() => onShare?.(item)}
        >
          Share
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-x-2 py-1.5 px-2 rounded-lg text-xs text-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
          onClick={() => onBlock?.(item)}
        >
          Block user
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-x-2 py-1.5 px-2 rounded-lg text-xs text-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
          onClick={() => onDelete?.(item)}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const DefaultHeroBackground = () => (
  <svg
    className="w-full h-24 rounded-t-xl"
    preserveAspectRatio="xMidYMid slice"
    width="576"
    height="120"
    viewBox="0 0 576 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_single)">
      <rect width="576" height="120" fill="#FEE2E2" />
      <rect
        x="289.678"
        y="-90.3"
        width="102.634"
        height="391.586"
        transform="rotate(59.5798 289.678 -90.3)"
        fill="#F87171"
      />
      <rect
        x="41.3926"
        y="-0.996094"
        width="102.634"
        height="209.864"
        transform="rotate(-31.6412 41.3926 -0.996094)"
        fill="#EF4444"
      />
    </g>
    <defs>
      <clipPath id="clip0_single">
        <rect width="576" height="120" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const Default: Story = {};

const createFavoriteButton = (name: string) => (
  <FavoriteButton onClick={() => alert(`Added ${name} to favorites`)} />
);

const createActionsDropdown = (name: string) => (
  <UserActionsDropdown
    item={{
      id: "",
      name,
      avatarSrc: "",
      heroBackground: <DefaultHeroBackground />,
      info: [],
      tags: [],
    }}
    onShare={() => alert(`Sharing ${name}`)}
    onBlock={() => alert(`Blocked ${name}`)}
    onDelete={() => alert(`Deleted ${name}`)}
  />
);

export const WithActions: Story = {
  args: {
    items: [
      {
        id: "1",
        name: "Amanda Harvey",
        avatarSrc:
          "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=320&h=320&fit=facearea&facepad=3",
        heroBackground: <DefaultHeroBackground />,
        badge: {
          label: "Pro",
          className: "bg-gradient-to-tr from-lime-500 to-teal-500",
        },
        info: [
          { label: "Role", value: "Front-End Developer" },
          { label: "Phone", value: "(892) 312-5483" },
          { label: "Email", value: "amanda@email.com" },
          { label: "Hourly price", value: "$35-$55" },
        ],
        tags: ["Designer", "Front-End", "Brand Designer", "Tool"],
        additionalTags: ["UI/UX", "Figma"],
        favoriteButton: createFavoriteButton("Amanda Harvey"),
        actions: createActionsDropdown("Amanda Harvey"),
      },
      {
        id: "2",
        name: "James Collins",
        avatarSrc:
          "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?w=320&h=320&fit=facearea&facepad=3",
        heroBackground: <DefaultHeroBackground />,
        info: [
          { label: "Role", value: "Back-End Developer" },
          { label: "Phone", value: "(555) 123-4567" },
          { label: "Email", value: "james@email.com" },
          { label: "Hourly price", value: "$45-$65" },
        ],
        tags: ["Developer", "Backend", "API"],
        favoriteButton: createFavoriteButton("James Collins"),
        actions: createActionsDropdown("James Collins"),
      },
    ],
  },
};

export const SingleUser: Story = {
  args: {
    items: [
      {
        id: "1",
        name: "Sarah Connor",
        avatarSrc:
          "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=320&h=320&fit=facearea&facepad=3",
        heroBackground: <DefaultHeroBackground />,
        badge: {
          label: "Admin",
          className: "bg-gradient-to-tr from-red-500 to-orange-500",
        },
        info: [
          { label: "Role", value: "Project Manager" },
          { label: "Phone", value: "(555) 987-6543" },
          { label: "Email", value: "sarah@company.com" },
          { label: "Hourly price", value: "$75-$100" },
        ],
        tags: ["Management", "Agile", "Scrum"],
        additionalTags: ["Leadership", "Strategy"],
        favoriteButton: createFavoriteButton("Sarah Connor"),
        actions: createActionsDropdown("Sarah Connor"),
      },
    ],
  },
};
