export interface SegmentData {
  label: string;
  count: number;
  percentage: number;
  indicatorCount: number;
  color: string;
  indicatorColor: string;
}

export interface SegmentedProgressBarsWithLegendIndicatorsProps {
  title?: string;
  linkText?: string;
  linkUrl?: string;
  segments?: SegmentData[];
}

const ArrowIcon = () => (
  <svg
    className="shrink-0 size-3.5 group-hover:opacity-100 group-focus:opacity-100 transition duration-300"
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
    <path
      className="lg:opacity-0 lg:-translate-x-1 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 lg:transition"
      d="M5 12h14"
    />
    <path
      className="lg:-translate-x-1.5 lg:group-hover:translate-x-0 lg:transition"
      d="m12 5 7 7-7 7"
    />
  </svg>
);

const getIndicatorColor = (
  indicatorColor: string,
  index: number,
  indicatorCount: number,
): string => {
  if (index < indicatorCount) {
    return indicatorColor;
  }
  return "bg-muted-foreground/30";
};

const defaultSegments: SegmentData[] = [
  {
    label: "High",
    count: 163,
    percentage: 23,
    indicatorCount: 3,
    color: "bg-chart-5",
    indicatorColor: "bg-chart-5",
  },
  {
    label: "Medium",
    count: 168,
    percentage: 25,
    indicatorCount: 2,
    color: "bg-chart-3",
    indicatorColor: "bg-chart-3",
  },
  {
    label: "Low",
    count: 382,
    percentage: 62,
    indicatorCount: 1,
    color: "bg-chart-1",
    indicatorColor: "bg-chart-1",
  },
  {
    label: "Informational",
    count: 66,
    percentage: 15,
    indicatorCount: 0,
    color:
      "bg-muted bg-[linear-gradient(135deg,var(--color-muted-foreground)_25%,transparent_25%,transparent_50%,var(--color-muted-foreground)_50%,var(--color-muted-foreground)_75%,transparent_75%,transparent)] bg-[length:7px_7px]",
    indicatorColor: "bg-muted-foreground/50",
  },
];

export const SegmentedProgressBarsWithLegendIndicators = ({
  title = "Incident by severity",
  linkText = "Analyze SOC efficiency",
  linkUrl = "#",
  segments = defaultSegments,
}: SegmentedProgressBarsWithLegendIndicatorsProps) => {
  return (
    <div className="p-5 flex flex-col bg-card border border-border shadow-xs rounded-xl overflow-hidden">
      {/* Header */}
      <div className="pb-5 flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-medium text-card-foreground">{title}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            className="group inline-flex items-center gap-x-1.5 text-start whitespace-nowrap text-[13px] text-muted-foreground rounded-full underline-offset-2 hover:underline focus:outline-hidden focus:underline"
            href={linkUrl}
          >
            {linkText}
            <ArrowIcon />
          </a>
        </div>
      </div>

      {/* Multiple Progress Bars */}
      <div className="flex gap-1.5 w-full h-2.5">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`overflow-hidden ${segment.color} rounded-full`}
            role="progressbar"
            aria-valuenow={segment.percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: `${segment.percentage}%` }}
          ></div>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {segments.map((segment, index) => (
          <div key={index}>
            <span className="block text-2xl text-card-foreground">
              {segment.count}
            </span>

            {/* Legend Indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`shrink-0 w-1 h-3.5 inline-block ${getIndicatorColor(
                      segment.indicatorColor,
                      i,
                      segment.indicatorCount,
                    )} rounded-full`}
                  ></span>
                ))}
              </div>
              <div className="grow">
                <span className="block text-sm text-muted-foreground">
                  {segment.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
