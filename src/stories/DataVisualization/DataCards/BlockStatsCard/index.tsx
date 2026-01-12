export type TrendDirection = "up" | "down";

export interface SummaryItem {
  label: string;
  count: number;
}

export interface BlockStatsCardProps {
  title?: string;
  subtitle?: string;
  trendDirection?: TrendDirection;
  trendValue?: string;
  viewAllText?: string;
  onViewAllClick?: () => void;
  primarySummary?: SummaryItem;
  secondarySummary?: SummaryItem;
  totalBlocks?: number;
  activeBlocks?: number;
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

export const BlockStatsCard = ({
  title = "Stats",
  subtitle = "Last 7 days",
  trendDirection = "up",
  trendValue = "5%",
  viewAllText = "View all",
  onViewAllClick,
  primarySummary = { label: "Primary", count: 89 },
  secondarySummary = { label: "Secondary", count: 71 },
  totalBlocks = 20,
  activeBlocks = 12,
}: BlockStatsCardProps) => {
  const TrendIcon = trendDirection === "up" ? ArrowUpIcon : ArrowDownIcon;
  const trendColorClass =
    trendDirection === "up" ? "text-primary" : "text-destructive";

  return (
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
              {primarySummary.count}
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
              {secondarySummary.count}
            </p>
            <div className="flex items-center gap-1.5">
              <span className="shrink-0 w-3 h-1.5 inline-block bg-muted-foreground/50 rounded-full"></span>
              <div className="grow">
                <span className="block text-sm text-muted-foreground">
                  {secondarySummary.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 flex justify-between gap-x-1.5 w-full h-3.5 rounded-full">
          {Array.from({ length: totalBlocks }).map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-3.5 rounded-[3px] ${
                index < activeBlocks ? "bg-chart-4" : "bg-muted-foreground/30"
              }`}
              role="progressbar"
              aria-valuenow={5}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
