import type { ReactNode } from "react";

export type AvatarItem =
  | { type: "image"; src: string; alt: string }
  | { type: "initial"; text: string };

export interface StatCard {
  value: string;
  label: string;
  avatars?: AvatarItem[];
  tooltipContent?: ReactNode;
}

export interface StatsWithAvatarGroupProps {
  cards?: StatCard[];
  tooltipIcon?: ReactNode;
}

const DefaultTooltipIcon = () => (
  <svg
    className="shrink-0 size-3.5 text-muted-foreground"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
  </svg>
);

const defaultCards: StatCard[] = [
  {
    value: "1",
    label: "Admin",
    avatars: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
        alt: "Admin avatar",
      },
    ],
  },
  {
    value: "5",
    label: "Members",
    avatars: [
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
        alt: "Member 1",
      },
      { type: "initial", text: "L" },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1679412330254-90cb240038c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
        alt: "Member 2",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
        alt: "Member 3",
      },
      { type: "initial", text: "O" },
    ],
    tooltipContent:
      "Limited Access Members can only access the projects, tasks, and messages explicitly shared with them.",
  },
  {
    value: "2",
    label: "Limited access members",
    avatars: [
      { type: "initial", text: "L" },
      { type: "initial", text: "O" },
    ],
    tooltipContent:
      "Limited Access Members can only access the projects, tasks, and messages explicitly shared with them.",
  },
  {
    value: "0",
    label: "Pending invites",
    avatars: [],
  },
];

export const StatsWithAvatarGroup = ({
  cards = defaultCards,
  tooltipIcon,
}: StatsWithAvatarGroupProps) => {
  const renderAvatar = (avatar: AvatarItem, index: number) => {
    if (avatar.type === "image") {
      return (
        <img
          key={index}
          className="shrink-0 size-7 shadow-md rounded-full"
          src={avatar.src}
          alt={avatar.alt}
        />
      );
    }
    return (
      <span
        key={index}
        className="flex shrink-0 justify-center items-center size-7 bg-card border border-border text-muted-foreground text-xs font-medium uppercase rounded-full"
      >
        {avatar.text}
      </span>
    );
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 xl:gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-4 flex flex-col bg-card border border-border rounded-xl"
        >
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-4xl font-semibold text-foreground">
              {card.value}
            </h2>
            {card.avatars && card.avatars.length > 0 && (
              <div className="flex items-center -space-x-2">
                {card.avatars.map((avatar, avatarIndex) =>
                  renderAvatar(avatar, avatarIndex),
                )}
              </div>
            )}
          </div>
          <div className="inline-flex items-center gap-x-2">
            <h3 className="text-muted-foreground">{card.label}</h3>
            {card.tooltipContent && (
              <div className="group relative inline-block">
                {tooltipIcon ?? <DefaultTooltipIcon />}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 py-1.5 px-2.5 bg-popover text-xs text-popover-foreground rounded-sm shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-20">
                  {card.tooltipContent}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
