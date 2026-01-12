import type { ReactNode } from "react";

export type TimeDifferenceStatus = "under" | "over" | "none";

export interface TimeEntryData {
  date: string;
  time: string;
  filledSegments: number;
  totalSegments: number;
  difference?: string;
  differenceStatus?: TimeDifferenceStatus;
  differenceLabel?: string;
  tooltipText?: string;
}

export interface TimeSheetProps {
  title?: string;
  dateRangeLabel?: string;
  totalHoursLabel?: string;
  entries?: TimeEntryData[];
  infoIcon?: ReactNode;
}

const InfoIcon = () => (
  <svg
    className="hidden md:block shrink-0 size-3.5 text-muted-foreground"
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
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const defaultEntries: TimeEntryData[] = [
  {
    date: "Mon, 4/9",
    time: "8:27",
    filledSegments: 17,
    totalSegments: 18,
    difference: "-33m",
    differenceStatus: "under",
    differenceLabel: "under",
    tooltipText: "-33m under limit",
  },
  {
    date: "Tue, 5/9",
    time: "4:50",
    filledSegments: 11,
    totalSegments: 18,
    difference: "-4h 10m",
    differenceStatus: "under",
    differenceLabel: "under",
    tooltipText: "-4h 10m under limit",
  },
  {
    date: "Wed, 6/9",
    time: "7:43",
    filledSegments: 15,
    totalSegments: 18,
    difference: "-1h 17m",
    differenceStatus: "under",
    differenceLabel: "under",
    tooltipText: "-1h 17m under limit",
  },
  {
    date: "Thu, 7/9",
    time: "9:09",
    filledSegments: 18,
    totalSegments: 18,
    difference: "+9m",
    differenceStatus: "over",
    differenceLabel: "over",
    tooltipText: "+9m over limit",
  },
  {
    date: "Fri, 8/9",
    time: "9:02",
    filledSegments: 18,
    totalSegments: 18,
    difference: "+2m",
    differenceStatus: "over",
    differenceLabel: "over",
    tooltipText: "+2m over limit",
  },
  {
    date: "Sat, 9/9",
    time: "0:00",
    filledSegments: 0,
    totalSegments: 18,
    tooltipText: "0s",
  },
  {
    date: "Sun, 10/9",
    time: "2:35",
    filledSegments: 4,
    totalSegments: 18,
    difference: "-6h 25m",
    differenceStatus: "under",
    tooltipText: "-6h 25m under limit",
  },
];

const getDifferenceColorClass = (status?: TimeDifferenceStatus) => {
  switch (status) {
    case "under":
      return "text-destructive";
    case "over":
      return "text-primary";
    default:
      return "";
  }
};

const getSegmentColorClass = (
  index: number,
  filledSegments: number,
  status?: TimeDifferenceStatus,
) => {
  if (index < filledSegments) {
    if (status === "over") {
      return "bg-primary";
    }
    return "bg-foreground/60";
  }
  return "bg-muted";
};

export const TimeSheet = ({
  title = "Timesheet",
  dateRangeLabel = "Sep 4 - Sep 9",
  totalHoursLabel = "Total hours",
  entries = defaultEntries,
  infoIcon = <InfoIcon />,
}: TimeSheetProps) => {
  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-xl">
      <div className="pt-2.5 px-4">
        <h2 className="font-semibold text-card-foreground">{title}</h2>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Header Row */}
        <div className="flex justify-between items-center gap-x-3 py-1.5 sm:py-2">
          <span className="font-semibold text-sm text-card-foreground">
            {dateRangeLabel}
          </span>
          <span className="font-semibold text-sm text-card-foreground">
            {totalHoursLabel}
          </span>
        </div>

        {/* Time Entries */}
        {entries.map((entry, entryIndex) => (
          <div
            key={entryIndex}
            className="grid grid-cols-12 items-center md:gap-x-3 py-1.5 sm:py-2"
          >
            {/* Date */}
            <div className="lg:order-1 col-span-6 lg:col-span-3">
              <h3 className="text-sm text-card-foreground">{entry.date}</h3>
            </div>

            {/* Time */}
            <div className="lg:order-3 col-span-6 lg:col-span-3 text-end">
              <div className="hs-tooltip [--placement:left] md:[--placement:right] inline-block">
                <span className="hs-tooltip-toggle inline-flex items-center gap-x-1 text-sm text-card-foreground">
                  {entry.time}
                  {entry.difference && entry.differenceLabel && (
                    <span className="md:hidden py-0.5 px-2 bg-card border border-border text-muted-foreground text-xs rounded-full">
                      <span
                        className={getDifferenceColorClass(
                          entry.differenceStatus,
                        )}
                      >
                        {entry.difference}
                      </span>{" "}
                      {entry.differenceLabel}
                    </span>
                  )}
                  {entry.difference && !entry.differenceLabel && (
                    <span className="md:hidden py-0.5 px-2 bg-card border border-border text-muted-foreground text-xs rounded-full">
                      <span
                        className={getDifferenceColorClass(
                          entry.differenceStatus,
                        )}
                      >
                        {entry.difference}
                      </span>
                    </span>
                  )}
                  {infoIcon}
                  <span
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-card border border-border text-xs font-medium text-card-foreground rounded-full shadow-2xs"
                    role="tooltip"
                  >
                    {entry.tooltipText && entry.differenceStatus ? (
                      <>
                        <span
                          className={getDifferenceColorClass(
                            entry.differenceStatus,
                          )}
                        >
                          {entry.difference}
                        </span>{" "}
                        {entry.differenceStatus === "under"
                          ? "under limit"
                          : "over limit"}
                      </>
                    ) : (
                      entry.tooltipText || entry.time
                    )}
                  </span>
                </span>
              </div>
            </div>

            {/* Segmented Progress */}
            <div className="lg:order-2 col-span-12 lg:col-span-6 mt-1 md:mt-0 w-full flex lg:justify-center items-center gap-x-1.5">
              {Array.from({ length: entry.totalSegments }).map(
                (_, segmentIndex) => (
                  <div
                    key={segmentIndex}
                    className={`shrink-0 size-2.5 flex flex-col justify-center overflow-hidden text-xs text-white text-center whitespace-nowrap rounded-full transition duration-500 ${getSegmentColorClass(
                      segmentIndex,
                      entry.filledSegments,
                      entry.differenceStatus,
                    )}`}
                    role="progressbar"
                    aria-valuenow={10}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
