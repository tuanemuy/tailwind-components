import type { ReactNode } from "react";

export interface BrowserData {
  icon: ReactNode;
  name: string;
  percentage: string;
}

export interface NotificationSettings {
  title: string;
  description: string;
  checked?: boolean;
  onToggle?: (checked: boolean) => void;
}

export interface BrowsersProps {
  title?: string;
  statusLabel?: string;
  statusIcon?: ReactNode;
  highlightValue?: string;
  description?: string;
  browsers?: BrowserData[];
  notification?: NotificationSettings;
  notificationIcon?: ReactNode;
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

const BellIcon = () => (
  <svg
    className="shrink-0 size-5 text-card-foreground"
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
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const ChromeIcon = () => (
  <img
    className="shrink-0 size-6 mb-4"
    src="../../assets/svg/brands/chrome.svg"
    alt="Chrome Logo"
  />
);

const FirefoxIcon = () => (
  <img
    className="shrink-0 size-6 mb-4"
    src="../../assets/svg/brands/firefox.svg"
    alt="Firefox Logo"
  />
);

const SafariIcon = () => (
  <img
    className="shrink-0 size-6 mb-4"
    src="../../assets/svg/brands/safari.svg"
    alt="Safari Logo"
  />
);

const defaultBrowsers: BrowserData[] = [
  { icon: <ChromeIcon />, name: "Chrome", percentage: "56%" },
  { icon: <FirefoxIcon />, name: "Firefox", percentage: "24%" },
  { icon: <SafariIcon />, name: "Safari", percentage: "17%" },
];

const defaultNotification: NotificationSettings = {
  title: "Push notifications",
  description: "Automatically send me notifications",
  checked: true,
};

export const Browsers = ({
  title = "Browsers",
  statusLabel = "Good",
  statusIcon = <CheckIcon />,
  highlightValue = "85%",
  description = "Visitors are viewing website from the desktop device. 57% of all users are using MacOS",
  browsers = defaultBrowsers,
  notification = defaultNotification,
  notificationIcon = <BellIcon />,
}: BrowsersProps) => {
  return (
    <div className="h-full flex flex-col bg-card border border-border shadow-2xs rounded-xl">
      {/* Header */}
      <div className="p-5 pb-3 flex justify-between items-center">
        <h2 className="ms-1 inline-block text-lg font-semibold text-card-foreground">
          {title}
        </h2>

        <span className="py-1 ps-1.5 pe-2 inline-flex items-center gap-x-1 text-xs font-medium rounded-full bg-card border border-border text-card-foreground">
          {statusIcon}
          {statusLabel}
        </span>
      </div>
      {/* End Header */}

      {/* Body */}
      <div className="flex flex-col justify-between h-full pb-5 px-5">
        <div>
          <h4 className="text-5xl md:text-6xl font-medium text-primary">
            <span className="bg-clip-text bg-linear-to-tl from-chart-1 to-chart-5 text-transparent">
              {highlightValue}
            </span>
          </h4>

          <p className="mt-5 text-muted-foreground">{description}</p>
        </div>

        {/* Stats */}
        <div className="mt-5">
          {/* Grid */}
          <div className="grid grid-cols-3 gap-3">
            {browsers.map((browser, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg">
                {browser.icon}
                <p className="text-sm text-card-foreground">{browser.name}</p>
                <p className="font-semibold text-lg text-card-foreground">
                  {browser.percentage}
                </p>
              </div>
            ))}
          </div>
          {/* End Grid */}
        </div>
        {/* End Stats */}

        <div className="mt-5">
          {/* Alert */}
          <div
            className="bg-card border border-border rounded-xl shadow-xs py-2 px-3"
            role="alert"
            tabIndex={-1}
          >
            <div className="flex items-center gap-x-3">
              {notificationIcon}
              <div className="grow">
                <h3 className="text-sm text-card-foreground font-semibold">
                  {notification.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>

              <div className="flex items-center self-stretch">
                {/* Switch/Toggle */}
                <label className="relative inline-block w-11 h-6 cursor-pointer">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    defaultChecked={notification.checked}
                    onChange={(e) => notification.onToggle?.(e.target.checked)}
                  />
                  <span className="absolute inset-0 bg-muted rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                  <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-card-foreground rounded-full shadow-sm transition-transform duration-200 ease-in-out peer-checked:translate-x-full peer-checked:bg-white"></span>
                </label>
                {/* End Switch/Toggle */}
              </div>
            </div>
          </div>
          {/* End Alert */}
        </div>
      </div>
      {/* End Body */}
    </div>
  );
};
