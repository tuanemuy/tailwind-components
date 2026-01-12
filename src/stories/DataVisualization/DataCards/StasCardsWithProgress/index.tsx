import type { ReactNode } from "react";

export type TrendDirection = "up" | "down";
export type TrendVariant = "positive" | "negative";

export interface StatCardData {
  label: string;
  value: string;
  changePercent: string;
  trendDirection: TrendDirection;
  trendVariant: TrendVariant;
}

export interface ProgressLegendItem {
  label: string;
  colorClass: string;
}

export interface StasCardsWithProgressProps {
  title?: string;
  dateButtonLabel?: string;
  dateButtonIcon?: ReactNode;
  stats?: StatCardData[];
  progressTitle?: string;
  progressValue?: string;
  progressPosition?: number;
  progressLegendItems?: ProgressLegendItem[];
  onDateButtonClick?: () => void;
}

const CalendarIcon = () => (
  <svg
    className="shrink-0 me-2 size-3.5"
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
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
    <path d="M8 14h.01" />
    <path d="M12 14h.01" />
    <path d="M16 14h.01" />
    <path d="M8 18h.01" />
    <path d="M12 18h.01" />
    <path d="M16 18h.01" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    className="shrink-0 ms-1.5 size-3.5"
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
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const TrendUpIcon = () => (
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
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const TrendDownIcon = () => (
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
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
  </svg>
);

const defaultStats: StatCardData[] = [
  {
    label: "In-store sales",
    value: "$287,390",
    changePercent: "4.9%",
    trendDirection: "down",
    trendVariant: "negative",
  },
  {
    label: "Website sales",
    value: "$75,990",
    changePercent: "25.8%",
    trendDirection: "up",
    trendVariant: "positive",
  },
  {
    label: "Discount",
    value: "$68,307",
    changePercent: "90.3%",
    trendDirection: "up",
    trendVariant: "positive",
  },
];

const defaultProgressLegendItems: ProgressLegendItem[] = [
  { label: "Bad", colorClass: "bg-chart-5" },
  { label: "Average", colorClass: "bg-chart-4" },
  { label: "Good", colorClass: "bg-chart-2" },
  { label: "Excellent", colorClass: "bg-chart-1" },
];

export const StasCardsWithProgress = ({
  title = "Sales",
  dateButtonLabel = "Today",
  dateButtonIcon = <CalendarIcon />,
  stats = defaultStats,
  progressTitle = "Monthly closed sales",
  progressValue = "$45,302",
  progressPosition = 38,
  progressLegendItems = defaultProgressLegendItems,
  onDateButtonClick,
}: StasCardsWithProgressProps) => {
  const getTrendColorClass = (variant: TrendVariant): string => {
    return variant === "positive"
      ? "text-primary"
      : "text-destructive";
  };

  return (
    <div className="p-5 space-y-3 flex flex-col bg-card border border-border rounded-xl shadow-2xs xl:shadow-none">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="inline-block font-semibold text-lg text-card-foreground">
          {title}
        </h2>

        {/* Date Button */}
        <button
          type="button"
          className="py-1.5 sm:py-2 px-2 inline-flex items-center text-sm sm:text-xs font-medium rounded-lg border border-border bg-card text-card-foreground shadow-2xs hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
          aria-label="Select date"
          onClick={onDateButtonClick}
        >
          {dateButtonIcon}
          {dateButtonLabel}
          <ChevronDownIcon />
        </button>
      </div>
      {/* End Header */}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 flex flex-col border border-border rounded-xl"
          >
            <h2 className="text-sm text-muted-foreground">{stat.label}</h2>

            <div className="flex items-center gap-x-1.5">
              <p className="text-xl font-semibold text-card-foreground">
                {stat.value}
              </p>
              <span
                className={`inline-flex items-center gap-x-1 text-sm rounded-full ${getTrendColorClass(stat.trendVariant)}`}
              >
                {stat.changePercent}
                {stat.trendDirection === "up" ? (
                  <TrendUpIcon />
                ) : (
                  <TrendDownIcon />
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* End Stats Grid */}

      {/* Progress Section */}
      <div className="my-4">
        {/* Header */}
        <div className="mb-3">
          <h4 className="text-sm text-muted-foreground">{progressTitle}</h4>
          <span className="block text-xl font-semibold text-card-foreground">
            {progressValue}
          </span>
        </div>
        {/* End Header */}

        {/* Legend Indicator */}
        <div className="mb-1 flex justify-between items-center">
          {progressLegendItems.map((item, index) => (
            <div key={index} className="inline-flex items-center w-1/4">
              <span
                className={`hidden sm:inline-block shrink-0 size-2.5 ${item.colorClass} rounded-sm me-1.5`}
              />
              <span className="text-sm text-card-foreground">{item.label}</span>
            </div>
          ))}
        </div>
        {/* End Legend Indicator */}

        {/* Progress Bar */}
        <div className="relative">
          <div className="flex w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="flex flex-col justify-center overflow-hidden bg-linear-to-r from-chart-5 via-chart-2 to-chart-1 text-xs text-white text-center whitespace-nowrap w-full"
              role="progressbar"
              aria-valuenow={progressPosition}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div
            className="absolute top-1/2 w-2 h-5 bg-chart-4 border-2 border-card rounded-full transform -translate-y-1/2"
            style={{ left: `${progressPosition}%` }}
          />
        </div>
        {/* End Progress Bar */}
      </div>
      {/* End Progress Section */}
    </div>
  );
};
