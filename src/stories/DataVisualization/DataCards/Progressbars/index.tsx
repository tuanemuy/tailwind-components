import type { ReactNode } from "react";

export interface ProgressItem {
  label: string;
  value: number;
  displayValue: string;
}

export interface ProgressbarsProps {
  title?: string;
  items?: ProgressItem[];
  footerLinkText?: string;
  footerLinkUrl?: string;
  headerActions?: ReactNode;
  progressBarColor?: string;
}

const DownloadIcon = () => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

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

const defaultItems: ProgressItem[] = [
  { label: "United States", value: 100, displayValue: "39,8%" },
  { label: "India", value: 65, displayValue: "27,1%" },
  { label: "Canada", value: 40, displayValue: "13.5%" },
  { label: "China", value: 20, displayValue: "5,9%" },
  { label: "United Kingdom", value: 15, displayValue: "5,1%" },
  { label: "Brasil", value: 15, displayValue: "5%" },
  { label: "Indonesia", value: 10, displayValue: "2,1%" },
  { label: "Others", value: 7, displayValue: "1,4%" },
];

const DefaultHeaderActions = () => (
  <div className="flex justify-end items-center gap-x-1">
    <button
      type="button"
      className="size-8.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-muted-foreground hover:bg-muted focus:outline-hidden focus:bg-muted disabled:opacity-50 disabled:pointer-events-none"
      aria-label="Download"
    >
      <DownloadIcon />
    </button>
    <button
      type="button"
      className="size-8.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-muted-foreground hover:bg-muted focus:outline-hidden focus:bg-muted disabled:opacity-50 disabled:pointer-events-none"
      aria-label="More options"
    >
      <MoreIcon />
    </button>
  </div>
);

export const Progressbars = ({
  title = "Location",
  items = defaultItems,
  footerLinkText = "View full reports",
  footerLinkUrl = "#",
  headerActions = <DefaultHeaderActions />,
  progressBarColor = "bg-chart-3",
}: ProgressbarsProps) => {
  return (
    <div className="flex flex-col bg-card border border-border shadow-2xs rounded-xl">
      {/* Header */}
      <div className="p-5 pb-4 grid grid-cols-2 items-center gap-x-4">
        <div>
          <h2 className="inline-block font-semibold text-lg text-card-foreground">
            {title}
          </h2>
        </div>
        {headerActions}
      </div>

      {/* Body */}
      <div className="h-full p-5 pt-0 space-y-4">
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between items-center gap-x-2">
              <div className="w-full grid grid-cols-2 items-center gap-x-2">
                <span className="text-sm text-card-foreground">
                  {item.label}
                </span>
                <div
                  className="flex justify-end"
                  role="progressbar"
                  aria-valuenow={item.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`h-1.5 flex flex-col justify-center overflow-hidden ${progressBarColor} rounded-full text-xs text-white text-center whitespace-nowrap`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
              <div className="min-w-15 text-end">
                <span className="text-sm text-muted-foreground">
                  {item.displayValue}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="text-center border-t border-border">
        <a
          className="p-3 flex justify-center items-center gap-x-2 text-sm text-chart-3 rounded-b-lg hover:text-chart-4 focus:outline-hidden focus:decoration-2 focus:underline focus:text-chart-4"
          href={footerLinkUrl}
        >
          {footerLinkText}
        </a>
      </div>
    </div>
  );
};
