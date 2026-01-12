import type { ReactNode } from "react";

export interface StatCard {
  label: string;
  value: string;
  href: string;
  icon?: ReactNode;
  linkText?: string;
  linkIcon?: ReactNode;
}

export interface StatsAnimatedOnHoverProps {
  cards?: StatCard[];
}

const CalendarClockIcon = () => (
  <svg
    className="shrink-0 size-6 text-muted-foreground"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h5" />
    <path d="M17.5 17.5 16 16.25V14" />
    <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
  </svg>
);

const HourglassIcon = () => (
  <svg
    className="shrink-0 size-6 text-muted-foreground"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 22h14" />
    <path d="M5 2h14" />
    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
  </svg>
);

const OverLimitIcon = () => (
  <svg
    className="shrink-0 size-6 text-muted-foreground"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12A10 10 0 1 1 12 2" />
    <path d="M22 2 12 12" />
    <path d="M16 2h6v6" />
  </svg>
);

const UnderLimitIcon = () => (
  <svg
    className="shrink-0 size-6 text-muted-foreground"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12a10 10 0 1 1 10 10" />
    <path d="m2 22 10-10" />
    <path d="M8 22H2v-6" />
  </svg>
);

const ChevronRightIcon = () => (
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
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const defaultCards: StatCard[] = [
  {
    label: "Total hours (7D)",
    value: "38h 9m",
    href: "#",
    icon: <CalendarClockIcon />,
    linkText: "View reports",
  },
  {
    label: "Avg. daily hours",
    value: "5h 32m",
    href: "#",
    icon: <HourglassIcon />,
    linkText: "View reports",
  },
  {
    label: "Over limit",
    value: "0s",
    href: "#",
    icon: <OverLimitIcon />,
    linkText: "View reports",
  },
  {
    label: "Under limit",
    value: "1h 51m",
    href: "#",
    icon: <UnderLimitIcon />,
    linkText: "View reports",
  },
];

export const StatsAnimatedOnHover = ({
  cards = defaultCards,
}: StatsAnimatedOnHoverProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
      {cards.map((card, index) => (
        <a
          key={index}
          className="group p-4 bg-card border border-border rounded-xl hover:shadow-lg hover:-translate-y-0.5 focus:outline-hidden focus:shadow-lg focus:-translate-y-0.5 transition"
          href={card.href}
        >
          <div className="flex gap-x-3">
            <div className="grow">
              <h2 className="text-xs text-muted-foreground">{card.label}</h2>
              <p className="text-xl font-semibold text-foreground">
                {card.value}
              </p>
            </div>
            {card.icon}
          </div>
          {card.linkText && (
            <span className="mt-3 inline-flex items-center gap-x-1 text-sm text-primary font-medium group-hover:opacity-80 group-focus:opacity-80">
              {card.linkText}
              {card.linkIcon ?? <ChevronRightIcon />}
            </span>
          )}
        </a>
      ))}
    </div>
  );
};
