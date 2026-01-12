import type { ReactNode } from "react";

export type TrendDirection = "up" | "down";
export type TrendVariant = "positive" | "negative";

export interface DetailItem {
  label: string;
  value: string;
}

export interface Badge {
  value: string;
  trendDirection: TrendDirection;
  trendVariant: TrendVariant;
}

export interface Avatar {
  src: string;
  alt: string;
}

export interface InboxContactCard {
  label: string;
  value: string;
  details: DetailItem[];
  href?: string;
  avatars?: Avatar[];
  badge?: Badge;
}

export interface InboxContactsProps {
  cards?: InboxContactCard[];
  linkIcon?: ReactNode;
  trendUpIcon?: ReactNode;
  trendDownIcon?: ReactNode;
}

const DefaultLinkIcon = () => (
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
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const DefaultTrendUpIcon = () => (
  <svg
    className="shrink-0 size-3"
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
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

const DefaultTrendDownIcon = () => (
  <svg
    className="shrink-0 size-3"
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
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
);

const defaultCards: InboxContactCard[] = [
  {
    label: "Total contacts",
    value: "245",
    avatars: [
      {
        src: "https://images.unsplash.com/photo-1708443683276-8a3eb30faef2?q=80&w=160&h=160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Avatar 1",
      },
      {
        src: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
        alt: "Avatar 2",
      },
      {
        src: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
        alt: "Avatar 3",
      },
    ],
    details: [
      { label: "Synced:", value: "173" },
      { label: "Manual:", value: "72" },
    ],
  },
  {
    label: "New contacts (Last 30 Days)",
    value: "52",
    href: "#",
    details: [
      { label: "Added from Chats:", value: "32" },
      { label: "Imported:", value: "20" },
    ],
  },
  {
    label: "Active contacts",
    value: "109",
    href: "#",
    details: [
      { label: "Last 7 Days:", value: "60" },
      { label: "Frequent communicators:", value: "23" },
    ],
  },
  {
    label: "Engagement rate",
    value: "106%",
    href: "#",
    badge: {
      value: "12%",
      trendDirection: "up",
      trendVariant: "positive",
    },
    details: [
      { label: "Replies:", value: "35%" },
      { label: "Opens:", value: "60%" },
    ],
  },
];

export const InboxContacts = ({
  cards = defaultCards,
  linkIcon,
  trendUpIcon,
  trendDownIcon,
}: InboxContactsProps) => {
  const getBadgeColorClass = (variant: TrendVariant): string => {
    return variant === "positive"
      ? "bg-green-300 text-black dark:bg-green-500"
      : "bg-red-300 text-black dark:bg-red-500";
  };

  const renderTrendIcon = (direction: TrendDirection) => {
    if (direction === "up") {
      return trendUpIcon ?? <DefaultTrendUpIcon />;
    }
    return trendDownIcon ?? <DefaultTrendDownIcon />;
  };

  const renderCardContent = (card: InboxContactCard) => (
    <>
      {/* Header */}
      <div className="flex justify-between gap-x-3">
        <div>
          <h2 className="text-sm text-muted-foreground">{card.label}</h2>
          <span className="block font-semibold text-xl text-foreground">
            {card.badge ? (
              <span className="flex items-center gap-x-2">
                {card.value}
                <span
                  className={`py-1 px-2 flex shrink-0 justify-center items-center gap-x-1 font-normal text-xs rounded-full ${getBadgeColorClass(card.badge.trendVariant)}`}
                >
                  {renderTrendIcon(card.badge.trendDirection)}
                  {card.badge.value}
                </span>
              </span>
            ) : (
              card.value
            )}
          </span>
        </div>

        {card.avatars && card.avatars.length > 0 && (
          <div className="mt-4 flex -space-x-3">
            {card.avatars.map((avatar, index) => (
              <img
                key={index}
                className={`shrink-0 size-6 relative ring-2 ring-card rounded-full ${
                  index === 0 ? "z-2" : index === 1 ? "z-1 -mt-3" : ""
                }`}
                src={avatar.src}
                alt={avatar.alt}
              />
            ))}
          </div>
        )}

        {card.href && (
          <span className="size-6 flex shrink-0 justify-center items-center bg-secondary text-foreground rounded-full group-hover:bg-muted group-focus:bg-muted transition">
            {linkIcon ?? <DefaultLinkIcon />}
          </span>
        )}
      </div>
      {/* End Header */}

      <div className="mt-auto">
        <div className="pt-3 mt-3 border-t border-dashed border-border">
          {/* List */}
          <div className="flex flex-col gap-y-0.5">
            {card.details.map((detail, index) => (
              <div key={index} className="flex justify-between gap-x-2">
                <span className="text-[13px] text-muted-foreground">
                  {detail.label}
                </span>
                <span className="font-medium text-sm text-foreground">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
          {/* End List */}
        </div>
      </div>
    </>
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5">
      {cards.map((card, index) =>
        card.href ? (
          <a
            key={index}
            className="p-5 group flex flex-col bg-card border border-border shadow-xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition"
            href={card.href}
          >
            {renderCardContent(card)}
          </a>
        ) : (
          <div
            key={index}
            className="p-5 flex flex-col bg-card border border-border shadow-xs rounded-xl"
          >
            {renderCardContent(card)}
          </div>
        ),
      )}
    </div>
  );
};
