import type { ReactNode } from "react";

export interface ProgressSegment {
  color: string;
  label: string;
  value: number;
  percentage: number;
}

export interface ProgressSection {
  segments: ProgressSegment[];
}

export interface DropdownMenuItem {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export interface StackedMultiprogressbarProps {
  title?: string;
  sections?: ProgressSection[];
  footerText?: string;
  dropdownItems?: DropdownMenuItem[];
  moreIcon?: ReactNode;
}

const MoreIcon = () => (
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
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const ShareIcon = () => (
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
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </svg>
);

const FullscreenIcon = () => (
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
    <path d="M8 3H5a2 2 0 0 0-2 2v3" />
    <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
    <path d="M3 16v3a2 2 0 0 0 2 2h3" />
    <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);

const ConnectIcon = () => (
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
    <path d="M3 3h6l6 18h6" />
    <path d="M14 3h7" />
  </svg>
);

const FeedbackIcon = () => (
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
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="9" x2="15" y1="10" y2="10" />
    <line x1="12" x2="12" y1="7" y2="13" />
  </svg>
);

const defaultDropdownItems: DropdownMenuItem[] = [
  { icon: <ShareIcon />, label: "Share reports" },
  { icon: <FullscreenIcon />, label: "View in fullscreen" },
  { icon: <ConnectIcon />, label: "Connect other apps" },
];

const defaultFeedbackItem: DropdownMenuItem = {
  icon: <FeedbackIcon />,
  label: "Submit Feedback",
};

const defaultSections: ProgressSection[] = [
  {
    segments: [
      { color: "bg-chart-5", label: "Spam/blocked", value: 12, percentage: 9.9 },
      { color: "bg-chart-4", label: "Valid leads", value: 28, percentage: 25.6 },
    ],
  },
  {
    segments: [
      { color: "bg-chart-3", label: "Qualified leads", value: 38, percentage: 29.5 },
      { color: "bg-chart-2", label: "Cold leads", value: 31, percentage: 20.5 },
    ],
  },
  {
    segments: [
      { color: "bg-chart-1", label: "Converted to deal", value: 22, percentage: 17.0 },
      { color: "bg-primary", label: "Still in pipeline", value: 44, percentage: 43.0 },
    ],
  },
];

export const StackedMultiprogressbar = ({
  title = "Lead funnel status",
  sections = defaultSections,
  footerText = "High cold lead count may indicate a need to adjust targeting or messaging.",
  dropdownItems = defaultDropdownItems,
  moreIcon = <MoreIcon />,
}: StackedMultiprogressbarProps) => {
  return (
    <div className="py-4 px-5 h-full flex flex-col bg-card border border-border shadow-xs rounded-xl">
      {/* Header */}
      <div className="mb-1.5 flex justify-between items-center">
        <h2 className="font-medium text-card-foreground">{title}</h2>

        {/* More Dropdown */}
        <div className="hs-dropdown [--placement:bottom-right] relative inline-flex">
          <button
            type="button"
            className="size-9.5 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-muted-foreground hover:bg-muted disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            {moreIcon}
          </button>

          {/* Dropdown Menu */}
          <div
            className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-44 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-popover rounded-xl shadow-xl"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="p-1">
              {dropdownItems.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={item.onClick}
                  className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-popover-foreground hover:bg-accent disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-accent"
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}

              <div className="my-1 border-t border-border"></div>

              <button
                type="button"
                onClick={defaultFeedbackItem.onClick}
                className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] text-popover-foreground hover:bg-accent disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-accent"
              >
                {defaultFeedbackItem.icon}
                {defaultFeedbackItem.label}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Header */}

      {/* List Group */}
      <div className="divide-y divide-dashed divide-border">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="py-5 first:pt-0 flex flex-col">
            {/* Legend Indicator List */}
            <div className="mb-3 flex flex-col gap-y-1">
              {section.segments.map((segment, segmentIndex) => (
                <div key={segmentIndex} className="flex items-center gap-2">
                  <span
                    className={`shrink-0 size-2 inline-block ${segment.color} rounded-full`}
                  ></span>
                  <div className="grow">
                    <div className="flex justify-between items-center gap-2">
                      <span className="block text-sm text-muted-foreground">
                        {segment.label}
                      </span>
                      <span className="block font-medium text-sm text-card-foreground">
                        {segment.value} ({segment.percentage}%)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* End Legend Indicator List */}

            {/* Multiple Progress Bars */}
            <div className="flex w-full h-3.5 overflow-hidden bg-[linear-gradient(90deg,var(--color-border)_25%,transparent_25%,transparent_50%,var(--color-border)_50%,var(--color-border)_75%,transparent_75%,transparent)] bg-[length:10px_10px] rounded-sm">
              {section.segments.map((segment, segmentIndex) => (
                <div
                  key={segmentIndex}
                  className={segment.color}
                  role="progressbar"
                  aria-valuenow={segment.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ width: `${segment.percentage}%` }}
                ></div>
              ))}
            </div>
            {/* End Multiple Progress Bars */}
          </div>
        ))}
      </div>
      {/* End List Group */}

      {/* Footer */}
      <div className="pt-4 border-t border-border">
        <p className="text-[13px] text-muted-foreground">{footerText}</p>
      </div>
      {/* End Footer */}
    </div>
  );
};
