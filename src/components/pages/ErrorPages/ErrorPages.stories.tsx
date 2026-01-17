import type { Meta, StoryObj } from "@storybook/react";
import {
  GitHubIcon,
  LinkedInIcon,
  RocketIcon,
  ShieldIcon,
  TwitterIcon,
  ZapIcon,
} from "@/components/icons";
import { ComingSoonPage, ErrorPage, MaintenancePage, NotFoundPage } from ".";

// NotFoundPage stories
const notFoundMeta: Meta<typeof NotFoundPage> = {
  title: "Pages/ErrorPages/NotFoundPage",
  component: NotFoundPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    showBackgroundPattern: {
      control: "boolean",
    },
  },
};

export default notFoundMeta;
type NotFoundStory = StoryObj<typeof NotFoundPage>;

export const Default404: NotFoundStory = {
  args: {
    primaryAction: { label: "Go home", href: "/" },
    secondaryAction: {
      label: "Go back",
      onClick: () => console.log("Go back"),
    },
    footer: (
      <span>
        Need help?{" "}
        <a href="/support" className="underline">
          Contact support
        </a>
      </span>
    ),
  },
};

export const Custom404: NotFoundStory = {
  args: {
    title: "Oops! Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    code: "404",
    primaryAction: { label: "Return to Dashboard", href: "/dashboard" },
    secondaryAction: {
      label: "Search",
      onClick: () => console.log("Open search"),
    },
  },
};

export const Minimal404: NotFoundStory = {
  args: {
    showBackgroundPattern: false,
    secondaryAction: undefined,
  },
};

// ErrorPage stories
export const Error500: StoryObj<typeof ErrorPage> = {
  render: (args) => <ErrorPage {...args} />,
  args: {
    resetError: () => console.log("Reset error"),
    footer: <span>Error ID: ERR-12345</span>,
  },
};

export const ErrorWithDetails: StoryObj<typeof ErrorPage> = {
  render: (args) => <ErrorPage {...args} />,
  args: {
    error: new Error("Connection timeout: Unable to reach the server"),
    resetError: () => console.log("Retry"),
  },
};

export const CustomError: StoryObj<typeof ErrorPage> = {
  render: (args) => <ErrorPage {...args} />,
  args: {
    title: "Service Unavailable",
    description:
      "Our servers are temporarily overloaded. Please try again in a few minutes.",
    code: "503",
    primaryAction: { label: "Retry", onClick: () => console.log("Retry") },
    secondaryAction: { label: "Check Status", href: "/status" },
  },
};

// MaintenancePage stories
export const Maintenance: StoryObj<typeof MaintenancePage> = {
  render: (args) => <MaintenancePage {...args} />,
  args: {
    estimatedTime: "2:00 PM EST",
    progressPercent: 65,
    statusUpdates: [
      { time: "1:30 PM", message: "Database migration in progress..." },
      { time: "1:15 PM", message: "Backup completed successfully" },
      { time: "1:00 PM", message: "Maintenance window started" },
    ],
    primaryAction: {
      label: "Refresh",
      onClick: () => window.location.reload(),
    },
    footer: <span>Follow us on Twitter for updates</span>,
  },
};

export const MaintenanceSimple: StoryObj<typeof MaintenancePage> = {
  render: (args) => <MaintenancePage {...args} />,
  args: {
    title: "We'll be back soon",
    description: "We're making some improvements. Please check back shortly.",
    estimatedTime: "30 minutes",
  },
};

export const MaintenanceWithProgress: StoryObj<typeof MaintenancePage> = {
  render: (args) => <MaintenancePage {...args} />,
  args: {
    progressPercent: 85,
    estimatedTime: "10 minutes remaining",
    primaryAction: {
      label: "Check Status",
      onClick: () => console.log("Check status"),
    },
  },
};

// ComingSoonPage stories
export const ComingSoon: StoryObj<typeof ComingSoonPage> = {
  render: (args) => <ComingSoonPage {...args} />,
  args: {
    title: "Something Amazing is Coming",
    description:
      "We're building something special. Sign up to be the first to know when we launch.",
    launchDate: "March 2025",
    onEmailSubmit: (email) => console.log("Email submitted:", email),
    features: [
      {
        icon: <ZapIcon className="size-8 text-primary" />,
        title: "Lightning Fast",
        description: "Optimized for speed",
      },
      {
        icon: <ShieldIcon className="size-8 text-primary" />,
        title: "Secure",
        description: "Enterprise-grade security",
      },
      {
        icon: <RocketIcon className="size-8 text-primary" />,
        title: "Powerful",
        description: "Feature-rich platform",
      },
    ],
    socialLinks: [
      {
        icon: <TwitterIcon className="size-5" />,
        href: "https://twitter.com",
        label: "Twitter",
      },
      {
        icon: <LinkedInIcon className="size-5" />,
        href: "https://linkedin.com",
        label: "LinkedIn",
      },
      {
        icon: <GitHubIcon className="size-5" />,
        href: "https://github.com",
        label: "GitHub",
      },
    ],
    footer: <span>© 2025 Company Name. All rights reserved.</span>,
  },
};

export const ComingSoonSimple: StoryObj<typeof ComingSoonPage> = {
  render: (args) => <ComingSoonPage {...args} />,
  args: {
    onEmailSubmit: (email) => console.log("Email:", email),
  },
};

export const ComingSoonWithCountdown: StoryObj<typeof ComingSoonPage> = {
  render: (args) => <ComingSoonPage {...args} />,
  args: {
    title: "Launching Soon",
    description: "Get ready for a revolutionary new product.",
    launchDate: "January 15, 2025",
    onEmailSubmit: (email) => console.log("Notify:", email),
    emailPlaceholder: "Get notified at launch",
  },
};
