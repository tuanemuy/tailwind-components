import type { ReactNode } from "react";

export type TrendDirection = "up" | "down";
export type TrendVariant = "positive" | "negative";

export interface ChatReportItem {
  label: string;
  value: string;
  changePercent: string;
  trendDirection: TrendDirection;
  trendVariant: TrendVariant;
  comparisonText: string;
}

export interface ChatReportsProps {
  items?: ChatReportItem[];
  trendUpIcon?: ReactNode;
  trendDownIcon?: ReactNode;
}

const DefaultTrendUpIcon = () => (
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
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

const DefaultTrendDownIcon = () => (
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
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
);

const defaultItems: ChatReportItem[] = [
  {
    label: "Support requests",
    value: "354",
    changePercent: "47.9%",
    trendDirection: "up",
    trendVariant: "positive",
    comparisonText: "198 last week",
  },
  {
    label: "Resolved requests",
    value: "256",
    changePercent: "0.8%",
    trendDirection: "up",
    trendVariant: "positive",
    comparisonText: "251 last week",
  },
  {
    label: "Tickets resolved by AI",
    value: "93",
    changePercent: "2.5%",
    trendDirection: "down",
    trendVariant: "negative",
    comparisonText: "97 last week",
  },
];

export const ChatReports = ({
  items = defaultItems,
  trendUpIcon,
  trendDownIcon,
}: ChatReportsProps) => {
  const getTrendColorClass = (variant: TrendVariant): string => {
    return variant === "positive"
      ? "text-emerald-600 dark:text-emerald-500"
      : "text-red-600 dark:text-red-500";
  };

  const renderTrendIcon = (direction: TrendDirection) => {
    if (direction === "up") {
      return trendUpIcon ?? <DefaultTrendUpIcon />;
    }
    return trendDownIcon ?? <DefaultTrendDownIcon />;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-5 divide-y sm:divide-y-0 sm:divide-x divide-border">
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const paddingClass = isFirst
          ? "ps-1 sm:pe-4"
          : isLast
            ? "ps-1 sm:ps-4"
            : "ps-1 sm:px-4";

        return (
          <div key={index} className={`py-4 sm:py-0 ${paddingClass}`}>
            <p className="text-sm text-foreground">{item.label}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="block text-2xl font-medium text-foreground">
                {item.value}
              </span>
              <span
                className={`inline-flex items-center gap-x-1 font-medium text-sm ${getTrendColorClass(item.trendVariant)}`}
              >
                {renderTrendIcon(item.trendDirection)}
                {item.changePercent}
              </span>
            </div>

            <p className="text-sm text-muted-foreground">{item.comparisonText}</p>
          </div>
        );
      })}
    </div>
  );
};
