import type { ReactNode } from "react";

export interface ListItem {
  initial: string;
  name: string;
  value: string;
}

export interface ProjectCostsProps {
  title?: string;
  totalAmount?: string;
  progressPercent?: number;
  minLabel?: string;
  maxLabel?: string;
  description?: string;
  listTitle?: string;
  listItems?: ListItem[];
  viewAllLinkText?: string;
  viewAllLinkUrl?: string;
  viewAllIcon?: ReactNode;
}

const ChevronRightIcon = () => (
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
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const defaultListItems: ListItem[] = [
  { initial: "B", name: "BlueVista Innovations", value: "$6,810" },
  { initial: "T", name: "TerraNova Dynamics", value: "$1,200" },
  { initial: "L", name: "Lumen Systems", value: "$680" },
];

export const ProjectCosts = ({
  title = "Total costs",
  totalAmount = "$7,800",
  progressPercent = 72,
  minLabel = "$0.00 USD",
  maxLabel = "$12,000 USD",
  description = "A project-wise breakdown of total spendings complemented by detailed insights.",
  listTitle = "Talents costs",
  listItems = defaultListItems,
  viewAllLinkText = "View all costs",
  viewAllLinkUrl = "#",
  viewAllIcon = <ChevronRightIcon />,
}: ProjectCostsProps) => {
  const progressPosition = `${progressPercent - 1}%`;

  return (
    <div className="h-full relative flex flex-col bg-card border border-border rounded-xl">
      <div className="pt-2.5 px-4">
        <h2 className="font-semibold text-card-foreground">{title}</h2>
      </div>

      {/* Body */}
      <div className="p-1.5 flex flex-col h-full">
        <div className="p-2.5">
          <h4 className="font-semibold text-xl md:text-2xl text-card-foreground">
            {totalAmount}
          </h4>

          {/* Progress */}
          <div className="relative mt-3">
            <div
              className="flex w-full h-2 bg-muted rounded-sm overflow-hidden"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="flex flex-col justify-center rounded-sm overflow-hidden bg-primary text-xs text-white text-center whitespace-nowrap transition duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div
              className="absolute top-1/2 w-2 h-5 bg-primary border-2 border-card rounded-sm transform -translate-y-1/2"
              style={{ left: progressPosition }}
            />
          </div>
          {/* End Progress */}

          {/* Progress Status */}
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">{minLabel}</span>
            <span className="text-xs text-muted-foreground">{maxLabel}</span>
          </div>
          {/* End Progress Status */}

          <p className="mt-4 text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Top Earners */}
        <div className="md:mt-auto p-2.5 rounded-lg bg-muted">
          <h2 className="mb-3 text-sm font-semibold text-card-foreground">
            {listTitle}
          </h2>

          {/* List Group */}
          <ul className="mb-1 space-y-2">
            {listItems.map((item, index) => (
              <li key={index} className="flex items-center gap-x-2">
                <span className="flex shrink-0 justify-center items-center size-6 bg-card border border-border text-card-foreground text-xs font-medium uppercase rounded-lg">
                  {item.initial}
                </span>
                <div className="grow flex justify-between items-center gap-x-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {item.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {item.value}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {/* End List Group */}

          <p className="text-center">
            <a
              className="py-1 px-1.5 inline-flex items-center justify-center gap-x-1 text-xs hover:bg-card rounded-md text-primary font-medium hover:text-primary/80 focus:outline-hidden focus:bg-card"
              href={viewAllLinkUrl}
            >
              {viewAllLinkText}
              {viewAllIcon}
            </a>
          </p>
        </div>
        {/* End Top Earners */}
      </div>
      {/* End Body */}
    </div>
  );
};
