import type { ReactNode } from "react";

export interface ItemData {
  icon: ReactNode;
  rank: string;
  count: string;
  label: string;
  barHeight: number;
}

export interface TopCountriesProps {
  title?: string;
  linkText?: string;
  linkUrl?: string;
  items?: ItemData[];
  statusLabel?: string;
  statusIcon?: ReactNode;
  performanceText?: string;
}

const CheckIcon = () => (
  <svg
    className="shrink-0 size-3"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
  </svg>
);

const USFlag = () => (
  <svg
    className="mb-3 shrink-0 size-8 rounded-full mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <g fillRule="evenodd">
      <g strokeWidth="1pt">
        <path
          fill="#bd3d44"
          d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
          transform="scale(3.9385)"
        />
        <path
          fill="#fff"
          d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
          transform="scale(3.9385)"
        />
      </g>
      <path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)" />
      <path
        fill="#fff"
        d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
        transform="scale(3.9385)"
      />
    </g>
  </svg>
);

const DEFlag = () => (
  <svg
    className="mb-3 shrink-0 size-8 rounded-full mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path fill="#ffce00" d="M0 341.3h512V512H0z" />
    <path d="M0 0h512v170.7H0z" />
    <path fill="#d00" d="M0 170.7h512v170.6H0z" />
  </svg>
);

const CNFlag = () => (
  <svg
    className="mb-3 shrink-0 size-8 rounded-full mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
  >
    <defs>
      <path id="cn-star" fill="#ffde00" d="M1-.3L-.7.8 0-1 .6.8-1-.3z" />
    </defs>
    <path fill="#de2910" d="M0 0h512v512H0z" />
    <use
      width="30"
      height="20"
      transform="matrix(76.8 0 0 76.8 128 128)"
      xlinkHref="#cn-star"
    />
    <use
      width="30"
      height="20"
      transform="rotate(-121 142.6 -47) scale(25.5827)"
      xlinkHref="#cn-star"
    />
    <use
      width="30"
      height="20"
      transform="rotate(-98.1 198 -82) scale(25.6)"
      xlinkHref="#cn-star"
    />
    <use
      width="30"
      height="20"
      transform="rotate(-74 272.4 -114) scale(25.6137)"
      xlinkHref="#cn-star"
    />
    <use
      width="30"
      height="20"
      transform="matrix(16 -19.968 19.968 16 256 230.4)"
      xlinkHref="#cn-star"
    />
  </svg>
);

const defaultItems: ItemData[] = [
  { icon: <USFlag />, rank: "1st", count: "1,265", label: "United States", barHeight: 10 },
  { icon: <DEFlag />, rank: "2nd", count: "1,009", label: "Germany", barHeight: 8 },
  { icon: <CNFlag />, rank: "3rd", count: "922", label: "China", barHeight: 6 },
];

export const TopCountries = ({
  title = "Top countries",
  linkText = "Reports",
  linkUrl = "#",
  items = defaultItems,
  statusLabel = "Good",
  statusIcon = <CheckIcon />,
  performanceText = "Your overall performance is 98% higher than average.",
}: TopCountriesProps) => {
  return (
    <div className="size-full flex flex-col bg-card border border-border shadow-2xs rounded-xl">
      {/* Header */}
      <div className="p-5 pb-3 flex justify-between items-center">
        <h2 className="ms-1 inline-block font-semibold text-card-foreground">
          {title}
        </h2>

        <a
          className="text-sm text-primary decoration-2 hover:underline font-medium focus:outline-hidden focus:underline"
          href={linkUrl}
        >
          {linkText}
        </a>
      </div>

      {/* Body */}
      <div className="flex flex-col justify-between h-full pb-5 px-5">
        {/* Grid */}
        <div className="pt-3 grid grid-cols-3 items-end gap-4">
          {items.map((item, index) => (
            <div key={index} className="text-center">
              {item.icon}

              <div
                className="p-3 bg-muted rounded-lg"
                style={{ height: `${item.barHeight}rem` }}
              >
                <p className="text-sm text-card-foreground">{item.rank}</p>
                <p className="mt-1 py-1 px-2.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full bg-card border border-border text-card-foreground">
                  {item.count}
                </p>
              </div>

              <p className="mt-1.5 text-sm text-card-foreground">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 py-3 flex items-center text-sm text-card-foreground before:flex-1 before:border-t before:border-border before:me-3 after:flex-1 after:border-t after:border-border after:ms-3">
          <span className="py-1 ps-1.5 pe-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
            {statusIcon}
            {statusLabel}
          </span>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          {performanceText}
        </p>
      </div>
    </div>
  );
};
