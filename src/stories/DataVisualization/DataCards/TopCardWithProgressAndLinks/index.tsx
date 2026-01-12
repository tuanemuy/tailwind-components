import type { ReactNode } from "react";
import { useState } from "react";

export interface TabData {
  id: string;
  label: string;
  value: string;
  progress: number;
  minValue: string;
  maxValue: string;
  description: string;
}

export interface LinkItem {
  icon: ReactNode;
  label: string;
  href: string;
}

export interface TopCardWithProgressAndLinksProps {
  tabs?: TabData[];
  links?: LinkItem[];
  progressColor?: string;
}

const ChevronRightIcon = () => (
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
    <path d="m9 18 6-6-6-6"></path>
  </svg>
);

const StarIcon = () => (
  <svg
    className="shrink-0 size-3.5 text-primary"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
  </svg>
);

const ChartIcon = () => (
  <svg
    className="shrink-0 size-3.5 text-primary"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
  </svg>
);

const defaultTabs: TabData[] = [
  {
    id: "orders",
    label: "Orders",
    value: "125,090",
    progress: 72,
    minValue: "0.00",
    maxValue: "200,000",
    description:
      "A project-wise breakdown of total orders complemented by detailed insights.",
  },
  {
    id: "sales",
    label: "Sales",
    value: "$993,758.20",
    progress: 47,
    minValue: "0.00",
    maxValue: "$2mln",
    description:
      "A project-wise breakdown of total orders complemented by detailed insights.",
  },
];

const defaultLinks: LinkItem[] = [
  {
    icon: <StarIcon />,
    label: "Show all highlights",
    href: "#",
  },
  {
    icon: <ChartIcon />,
    label: "Show all sales data",
    href: "#",
  },
];

export const TopCardWithProgressAndLinks = ({
  tabs = defaultTabs,
  links = defaultLinks,
  progressColor = "bg-primary",
}: TopCardWithProgressAndLinksProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="p-2">
      {/* Card */}
      <div className="p-2 bg-card">
        {/* Nav Tab */}
        <nav
          className="flex gap-1 relative after:absolute after:bottom-0 after:inset-x-0 after:border-b-2 after:border-border"
          aria-label="Tabs"
          role="tablist"
          aria-orientation="horizontal"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              className={`px-2.5 py-1.5 mb-2 relative inline-flex justify-center items-center gap-x-2 hover:bg-muted text-muted-foreground hover:text-card-foreground text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-muted after:absolute after:-bottom-2 after:inset-x-0 after:z-10 after:h-0.5 after:pointer-events-none ${
                activeTabIndex === index
                  ? "after:bg-card-foreground text-card-foreground"
                  : ""
              }`}
              id={`hs-pro-tabs-dtsch-item-${tab.id}`}
              aria-selected={activeTabIndex === index}
              onClick={() => setActiveTabIndex(index)}
              aria-controls={`hs-pro-tabs-dtsch-${tab.id}`}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </nav>
        {/* End Nav Tab */}

        <div>
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              id={`hs-pro-tabs-dtsch-${tab.id}`}
              className={activeTabIndex !== index ? "hidden" : ""}
              role="tabpanel"
              aria-labelledby={`hs-pro-tabs-dtsch-item-${tab.id}`}
            >
              <div className="py-4">
                <h4 className="font-semibold text-xl md:text-2xl text-card-foreground">
                  {tab.value}
                </h4>

                {/* Progress */}
                <div className="relative mt-3">
                  <div
                    className="flex w-full h-2 bg-muted rounded-sm overflow-hidden"
                    role="progressbar"
                    aria-valuenow={tab.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className={`flex flex-col justify-center rounded-sm overflow-hidden ${progressColor} text-xs text-white text-center whitespace-nowrap transition duration-500`}
                      style={{ width: `${tab.progress}%` }}
                    ></div>
                  </div>
                  <div
                    className={`absolute top-1/2 w-2 h-5 ${progressColor} border-2 border-card rounded-sm transform -translate-y-1/2`}
                    style={{ left: `${tab.progress - 1}%` }}
                  ></div>
                </div>
                {/* End Progress */}

                {/* Progress Status */}
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-card-foreground">
                    {tab.minValue}
                  </span>
                  <span className="text-xs text-card-foreground">
                    {tab.maxValue}
                  </span>
                </div>
                {/* End Progress Status */}

                <p className="mt-4 text-sm text-muted-foreground">
                  {tab.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* End Card */}

      <div>
        {links.map((link, index) => (
          <a
            key={index}
            className="p-2 flex items-center gap-x-2 text-sm font-medium text-card-foreground rounded-lg hover:bg-muted focus:outline-hidden focus:bg-muted hover:text-primary"
            href={link.href}
          >
            <span className="flex shrink-0 justify-center items-center size-7 bg-card border border-border rounded-lg">
              {link.icon}
            </span>
            <div className="grow">
              <p>{link.label}</p>
            </div>
            <ChevronRightIcon />
          </a>
        ))}
      </div>
    </div>
  );
};
