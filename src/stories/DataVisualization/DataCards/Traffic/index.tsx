import type { ReactNode } from "react";

export interface TrafficSource {
  name: string;
  value: string;
  percentage: number;
  color: string;
}

export interface AvatarItem {
  type: "image" | "initial";
  src?: string;
  initial?: string;
  name: string;
}

export interface TrafficProps {
  title?: string;
  sources?: TrafficSource[];
  avatars?: AvatarItem[];
  moreCount?: string;
  linkText?: string;
  linkUrl?: string;
}

const defaultSources: TrafficSource[] = [
  { name: "github.com", value: "164k", percentage: 42, color: "bg-chart-5" },
  {
    name: "accounts.google.com",
    value: "49k",
    percentage: 27,
    color: "bg-chart-4",
  },
  {
    name: "themes.getbootstrap.com",
    value: "26k",
    percentage: 16,
    color: "bg-chart-3",
  },
  { name: "htmlstream.com", value: "8k", percentage: 6, color: "bg-chart-2" },
  { name: "Others", value: "12k", percentage: 9, color: "bg-muted-foreground" },
];

const defaultAvatars: AvatarItem[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
    name: "James Collins",
  },
  {
    type: "initial",
    initial: "E",
    name: "Ella Lauda",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
    name: "Costa Quinn",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
    name: "Amanda Harvey",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1568048689711-5e0325cea8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
    name: "Alisa Grasso",
  },
  {
    type: "initial",
    initial: "O",
    name: "Ols Schols",
  },
];

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

interface IconButtonProps {
  icon: ReactNode;
  ariaLabel: string;
}

const IconButton = ({ icon, ariaLabel }: IconButtonProps) => (
  <button
    type="button"
    className="size-8.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-muted-foreground hover:bg-muted focus:outline-hidden focus:bg-muted disabled:opacity-50 disabled:pointer-events-none"
    aria-label={ariaLabel}
  >
    {icon}
  </button>
);

export const Traffic = ({
  title = "Referral Traffic",
  sources = defaultSources,
  avatars = defaultAvatars,
  moreCount = "215k more",
  linkText = "View full reports",
  linkUrl = "#",
}: TrafficProps) => {
  return (
    <div className="size-full flex flex-col bg-card border border-border shadow-2xs rounded-xl">
      {/* Header */}
      <div className="p-5 pb-4 grid grid-cols-2 items-center gap-x-4">
        <div>
          <h2 className="inline-block font-semibold text-lg text-card-foreground">
            {title}
          </h2>
        </div>

        <div className="flex justify-end items-center gap-x-1">
          <IconButton icon={<DownloadIcon />} ariaLabel="Download" />
          <IconButton icon={<MoreIcon />} ariaLabel="More options" />
        </div>
      </div>

      {/* Body */}
      <div className="h-full p-5 pt-0">
        <div className="h-full flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Progress */}
            <div className="flex gap-x-1 w-full h-2.5 rounded-full overflow-hidden">
              {sources.map((source, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center overflow-hidden ${source.color} text-xs text-white text-center whitespace-nowrap`}
                  style={{ width: `${source.percentage}%` }}
                  role="progressbar"
                  aria-valuenow={source.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              ))}
            </div>

            {/* List Group */}
            <ul>
              {sources.map((source, index) => (
                <li
                  key={index}
                  className="py-2 grid grid-cols-2 justify-between items-center gap-x-4"
                >
                  <div className="flex items-center">
                    <span
                      className={`shrink-0 size-2.5 inline-block ${source.color} rounded-xs me-2.5`}
                    />
                    <span className="text-sm text-card-foreground">
                      {source.name}
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="text-sm text-muted-foreground">
                      {source.value}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Avatar Group */}
          <div className="flex items-center -space-x-2">
            {avatars.map((avatar, index) => (
              <div key={index} className="hover:z-10">
                {avatar.type === "image" ? (
                  <img
                    className="shrink-0 size-7 lg:size-9.5 border-2 border-card rounded-full"
                    src={avatar.src}
                    alt={avatar.name}
                  />
                ) : (
                  <span className="flex shrink-0 justify-center items-center size-7 lg:size-9.5 bg-card border border-border text-muted-foreground text-xs lg:text-sm font-medium uppercase rounded-full">
                    {avatar.initial}
                  </span>
                )}
              </div>
            ))}
            <div>
              <span className="ms-4 lg:ms-5 text-sm text-muted-foreground">
                {moreCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center border-t border-border">
        <a
          className="p-3 flex justify-center items-center gap-x-2 text-sm text-primary rounded-b-lg hover:text-primary/80 focus:outline-hidden focus:decoration-2 focus:underline"
          href={linkUrl}
        >
          {linkText}
        </a>
      </div>
    </div>
  );
};
