import type { ReactNode } from "react";

export interface ListBarItem {
  label: string;
  values: string[];
  barWidth: number;
}

export interface ListBarColumn {
  label: string;
}

export interface ListBarProps {
  title?: string;
  rowLabel?: string;
  columns?: ListBarColumn[];
  items?: ListBarItem[];
  footerLinkText?: string;
  footerLinkUrl?: string;
  downloadButton?: ReactNode;
  moreButton?: ReactNode;
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

const defaultColumns: ListBarColumn[] = [
  { label: "Unique" },
  { label: "Total" },
  { label: "CR" },
];

const defaultItems: ListBarItem[] = [
  { label: "preline.co", values: ["39,8k", "329,3k", "19,8k"], barWidth: 100 },
  {
    label: "preline.co/examples",
    values: ["27k", "56,2k", "48,2k"],
    barWidth: 65,
  },
  {
    label: "preline.co/plugins",
    values: ["77,8k", "13.0k", "5.5k"],
    barWidth: 40,
  },
  { label: "preline.co/docs", values: ["56,9k", "35,97k", "5k"], barWidth: 20 },
  { label: "preline.co/figma", values: ["8,9k", "3,1k", "4k"], barWidth: 15 },
  {
    label: "preline.co/examples/hero",
    values: ["2k", "2,2k", "76,4k"],
    barWidth: 15,
  },
  {
    label: "preline.co/examples/ai-tables",
    values: ["2,1k", "22,1k", "34,1k"],
    barWidth: 10,
  },
  { label: "Others", values: ["1,4k", "4k", "5,1k"], barWidth: 7 },
];

export const ListBar = ({
  title = "Goal Conversions",
  rowLabel = "Goal",
  columns = defaultColumns,
  items = defaultItems,
  footerLinkText = "View full reports",
  footerLinkUrl = "#",
  downloadButton,
  moreButton,
}: ListBarProps) => {
  return (
    <div className="flex flex-col bg-card border border-border shadow-xs rounded-xl">
      {/* Header */}
      <div className="p-5 pb-4 grid grid-cols-2 items-center gap-x-4">
        <div>
          <h2 className="inline-block font-semibold text-lg text-card-foreground">
            {title}
          </h2>
        </div>

        <div className="flex justify-end items-center gap-x-1">
          {downloadButton !== undefined ? (
            downloadButton
          ) : (
            <button
              type="button"
              className="size-8.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-muted-foreground hover:bg-muted focus:outline-hidden focus:bg-muted disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Download"
            >
              <DownloadIcon />
            </button>
          )}

          {moreButton !== undefined ? (
            moreButton
          ) : (
            <button
              type="button"
              className="size-8.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-muted-foreground hover:bg-muted focus:outline-hidden focus:bg-muted disabled:opacity-50 disabled:pointer-events-none"
              aria-label="More options"
            >
              <MoreIcon />
            </button>
          )}
        </div>
      </div>
      {/* End Header */}

      {/* Heading */}
      <div className="pb-2 px-7 flex gap-x-2">
        <div className="w-full">
          <h3 className="inline-block font-medium text-xs uppercase text-card-foreground">
            {rowLabel}
          </h3>
        </div>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="w-20 text-end">
            <h3 className="inline-block font-medium text-xs uppercase text-card-foreground">
              {column.label}
            </h3>
          </div>
        ))}
      </div>
      {/* End Heading */}

      {/* Body */}
      <div className="p-5 pt-0 space-y-4">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center gap-x-2"
            >
              <div className="relative size-full truncate">
                <span className="relative z-1 block py-1 px-2 w-full text-sm truncate text-card-foreground">
                  {item.label}
                </span>
                <div
                  className="absolute inset-y-0 start-0 bg-primary/10 h-full rounded-sm"
                  style={{ width: `${item.barWidth}%` }}
                />
              </div>
              {item.values.map((value, valueIndex) => (
                <div key={valueIndex} className="w-20 text-end">
                  <span className="text-sm text-muted-foreground">{value}</span>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
      {/* End Body */}

      {/* Footer */}
      <div className="text-center border-t border-border">
        <a
          className="p-3 flex justify-center items-center gap-x-2 text-sm text-primary rounded-b-lg hover:text-primary/80 focus:outline-hidden focus:decoration-2 focus:underline"
          href={footerLinkUrl}
        >
          {footerLinkText}
        </a>
      </div>
      {/* End Footer */}
    </div>
  );
};
