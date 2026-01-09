import type { ReactNode } from "react";

export type TrendDirection = "up" | "down";
export type TrendVariant = "positive" | "negative";

export interface Trend {
  changePercent: string;
  trendDirection: TrendDirection;
  trendVariant: TrendVariant;
}

export interface StatCard {
  label: string;
  value: string;
  icon?: ReactNode;
  secondaryText?: string;
  trend?: Trend;
}

export interface StatsWithIconsProps {
  cards?: StatCard[];
  trendUpIcon?: ReactNode;
  trendDownIcon?: ReactNode;
}

const StoreIcon = () => (
  <svg
    className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-muted-foreground"
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
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-muted-foreground"
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
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const DiscountIcon = () => (
  <svg
    className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-muted-foreground"
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
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m15 9-6 6" />
    <path d="M9 9h.01" />
    <path d="M15 15h.01" />
  </svg>
);

const AffiliateIcon = () => (
  <svg
    className="sm:order-2 mb-2 sm:mb-0 shrink-0 size-6 text-muted-foreground"
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
    <path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" />
    <path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2" />
    <rect width="8" height="8" x="14" y="14" rx="2" />
  </svg>
);

const TrendUpIcon = () => (
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
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const TrendDownIcon = () => (
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
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
  </svg>
);

const defaultCards: StatCard[] = [
  {
    label: "In-store sales",
    value: "$7,820.75",
    icon: <StoreIcon />,
    secondaryText: "5k orders",
    trend: {
      changePercent: "4.3%",
      trendDirection: "up",
      trendVariant: "positive",
    },
  },
  {
    label: "Website sales",
    value: "$985,937.45",
    icon: <GlobeIcon />,
    secondaryText: "21k orders",
    trend: {
      changePercent: "12.5%",
      trendDirection: "up",
      trendVariant: "positive",
    },
  },
  {
    label: "Discount",
    value: "$15,503.00",
    icon: <DiscountIcon />,
    secondaryText: "6k orders",
  },
  {
    label: "Affiliate",
    value: "$3,982.53",
    icon: <AffiliateIcon />,
    secondaryText: "2.4 orders",
    trend: {
      changePercent: "4.4%",
      trendDirection: "down",
      trendVariant: "negative",
    },
  },
];

export const StatsWithIcons = ({
  cards = defaultCards,
  trendUpIcon,
  trendDownIcon,
}: StatsWithIconsProps) => {
  const getTrendColorClass = (variant: TrendVariant): string => {
    return variant === "positive" ? "text-green-500" : "text-red-500";
  };

  const renderTrendIcon = (direction: TrendDirection) => {
    if (direction === "up") {
      return trendUpIcon ?? <TrendUpIcon />;
    }
    return trendDownIcon ?? <TrendDownIcon />;
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-4 sm:p-5 bg-card border border-border rounded-xl shadow-2xs"
        >
          <div className="sm:flex sm:gap-x-3">
            {card.icon}
            <div className="sm:order-1 grow space-y-1">
              <h2 className="sm:mb-3 text-sm text-muted-foreground">
                {card.label}
              </h2>
              <p className="text-lg md:text-xl font-semibold text-foreground">
                {card.value}
              </p>
            </div>
          </div>

          <div className="mt-1 flex items-center gap-x-2">
            {card.secondaryText && (
              <span className="text-sm leading-5 text-muted-foreground">
                {card.secondaryText}
              </span>
            )}
            {card.trend && (
              <span
                className={`inline-flex items-center gap-x-1 text-xs font-medium rounded-full ${getTrendColorClass(card.trend.trendVariant)}`}
              >
                {renderTrendIcon(card.trend.trendDirection)}
                {card.trend.changePercent}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
