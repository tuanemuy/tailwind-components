export type TrendDirection = "up" | "down";

export interface SummaryItem {
  label: string;
  count: number;
  percentage: number;
}

export interface TierData {
  name: string;
  count: number;
  widthPercent: number;
}

export interface TieredStatsCardProps {
  title?: string;
  subtitle?: string;
  trendDirection?: TrendDirection;
  trendValue?: string;
  viewAllText?: string;
  onViewAllClick?: () => void;
  primarySummary?: SummaryItem;
  secondarySummary?: SummaryItem;
  tiers?: TierData[];
}

const ArrowUpIcon = () => (
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
    <path d="m5 12 7-7 7 7"></path>
    <path d="M12 19V5"></path>
  </svg>
);

const ArrowDownIcon = () => (
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
    <path d="M12 5v14"></path>
    <path d="m19 12-7 7-7-7"></path>
  </svg>
);

const ExpandIcon = () => (
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
    <path d="M15 3h6v6" />
    <path d="m21 3-7 7" />
    <path d="m3 21 7-7" />
    <path d="M9 21H3v-6" />
  </svg>
);

const defaultTiers: TierData[] = [
  { name: "Tier 1", count: 1301, widthPercent: 100 },
  { name: "Tier 2", count: 289, widthPercent: 40 },
  { name: "Tier 3", count: 120, widthPercent: 20 },
  { name: "Tier 4", count: 100, widthPercent: 15 },
];

export const TieredStatsCard = ({
  title = "Status",
  subtitle = "Last 7 days",
  trendDirection = "down",
  trendValue = "12.9%",
  viewAllText = "View all",
  onViewAllClick,
  primarySummary = { label: "Primary", count: 1301, percentage: 72 },
  secondarySummary = { label: "Secondary", count: 509, percentage: 28 },
  tiers = defaultTiers,
}: TieredStatsCardProps) => {
  const TrendIcon = trendDirection === "up" ? ArrowUpIcon : ArrowDownIcon;
  const trendColorClass =
    trendDirection === "up" ? "text-primary" : "text-destructive";

  return (
    <div>
      {/* Summary Card */}
      <div className="p-4 bg-card border-b border-border">
        <div className="flex flex-col">
          {/* Header */}
          <div className="relative">
            <div className="pe-20">
              <h3 className="font-medium text-sm text-card-foreground">
                {title}
              </h3>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">{subtitle}</p>
                <span
                  className={`flex justify-center items-center gap-x-1 text-sm ${trendColorClass}`}
                >
                  <TrendIcon />
                  {trendValue}
                </span>
              </div>
            </div>

            {/* Button */}
            <div className="absolute top-1/2 end-0 -translate-y-1/2">
              <button
                type="button"
                onClick={onViewAllClick}
                className="group size-7 lg:size-auto lg:py-1.5 lg:px-2 flex items-center justify-center border border-border text-muted-foreground text-xs rounded-full py-1 hover:bg-primary/5 hover:border-primary/20 hover:text-primary focus:outline-none focus:bg-primary/5 focus:border-primary/20 focus:text-primary"
              >
                <span className="lg:block hidden max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:me-1 group-hover:max-w-25 group-hover:opacity-100 group-focus:me-1 group-focus:max-w-25 group-focus:opacity-100">
                  {viewAllText}
                </span>
                <ExpandIcon />
              </button>
            </div>
          </div>

          {/* Legend Indicator */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <p className="text-xl text-card-foreground">
                {primarySummary.count.toLocaleString()}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="shrink-0 w-3 h-1.5 inline-block bg-chart-4 rounded-full"></span>
                <div className="grow">
                  <span className="block text-sm text-muted-foreground">
                    {primarySummary.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-xl text-card-foreground">
                {secondarySummary.count.toLocaleString()}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="shrink-0 w-3 h-1.5 inline-block bg-[linear-gradient(135deg,var(--color-chart-2)_25%,transparent_25%,transparent_50%,var(--color-chart-2)_50%,var(--color-chart-2)_75%,transparent_75%,transparent)] bg-[length:4px_4px] rounded-full"></span>
                <div className="grow">
                  <span className="block text-sm text-muted-foreground">
                    {secondarySummary.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 flex gap-x-1.5 w-full h-3.5 rounded-full">
            <div
              className="bg-chart-4 rounded-sm"
              role="progressbar"
              aria-valuenow={primarySummary.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: `${primarySummary.percentage}%` }}
            ></div>
            <div
              className="overflow-hidden bg-chart-1 bg-[linear-gradient(135deg,var(--color-chart-2)_25%,transparent_25%,transparent_50%,var(--color-chart-2)_50%,var(--color-chart-2)_75%,transparent_75%,transparent)] bg-[length:7px_7px] rounded-sm"
              role="progressbar"
              aria-valuenow={secondarySummary.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: `${secondarySummary.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tiers Card */}
      <div className="p-4 bg-card border-b border-border">
        <ul className="flex flex-col gap-y-2">
          {tiers.map((tier, index) => (
            <li
              key={index}
              className="flex justify-between items-center gap-x-2"
            >
              <div className="relative size-full truncate">
                <span className="relative z-[1] inline-flex py-1 px-2 w-full text-sm truncate">
                  <span className="text-card-foreground">{tier.name}</span>
                  <span className="ms-auto text-muted-foreground">
                    {tier.count.toLocaleString()}
                  </span>
                </span>
                <div
                  className="absolute inset-y-0 start-0 bg-chart-1/20 h-full rounded-sm"
                  style={{ width: `${tier.widthPercent}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
