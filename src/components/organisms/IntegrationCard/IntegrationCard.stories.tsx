import type { Meta, StoryObj } from "@storybook/react";
import { IntegrationCard, IntegrationCardGrid, IntegrationCardList } from "./index";
import { MailIcon, CalendarIcon, DatabaseIcon, CloudIcon } from "@/lib/icons";

const meta: Meta<typeof IntegrationCard> = {
  title: "Organisms/Cards/IntegrationCard",
  component: IntegrationCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IntegrationCard>;

const sampleIntegration = {
  id: "1",
  name: "Slack",
  description: "Connect your Slack workspace to receive notifications and updates",
  status: "connected" as const,
  category: "Communication",
  lastSynced: "2 hours ago",
  popular: true,
  features: [
    "Real-time notifications",
    "Channel integration",
    "Direct messages",
    "File sharing",
  ],
  icon: <MailIcon className="size-6" />,
};

export const Default: Story = {
  args: {
    integration: sampleIntegration,
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const Compact: Story = {
  args: {
    integration: sampleIntegration,
    variant: "compact",
  },
  decorators: [
    (Story) => (
      <div className="w-[280px]">
        <Story />
      </div>
    ),
  ],
};

export const List: Story = {
  args: {
    integration: sampleIntegration,
    variant: "list",
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export const Detailed: Story = {
  args: {
    integration: sampleIntegration,
    variant: "detailed",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const Disconnected: Story = {
  args: {
    integration: {
      ...sampleIntegration,
      status: "disconnected",
      lastSynced: undefined,
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const Pending: Story = {
  args: {
    integration: {
      ...sampleIntegration,
      status: "pending",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const Error: Story = {
  args: {
    integration: {
      ...sampleIntegration,
      status: "error",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

const integrations = [
  {
    id: "1",
    name: "Slack",
    description: "Team communication and collaboration",
    status: "connected" as const,
    icon: <MailIcon className="size-6" />,
    popular: true,
  },
  {
    id: "2",
    name: "Google Calendar",
    description: "Sync your calendar events",
    status: "connected" as const,
    icon: <CalendarIcon className="size-6" />,
  },
  {
    id: "3",
    name: "MongoDB",
    description: "Database management",
    status: "disconnected" as const,
    icon: <DatabaseIcon className="size-6" />,
  },
  {
    id: "4",
    name: "AWS",
    description: "Cloud services and hosting",
    status: "pending" as const,
    icon: <CloudIcon className="size-6" />,
    popular: true,
  },
  {
    id: "5",
    name: "GitHub",
    description: "Code repository integration",
    status: "error" as const,
    icon: <DatabaseIcon className="size-6" />,
  },
  {
    id: "6",
    name: "Notion",
    description: "Documentation and notes",
    status: "disconnected" as const,
    icon: <MailIcon className="size-6" />,
  },
];

export const Grid: StoryObj<typeof IntegrationCardGrid> = {
  render: () => (
    <div className="w-[900px]">
      <IntegrationCardGrid
        integrations={integrations}
        columns={3}
      />
    </div>
  ),
};

export const GridDetailed: StoryObj<typeof IntegrationCardGrid> = {
  render: () => (
    <div className="w-[900px]">
      <IntegrationCardGrid
        integrations={integrations.slice(0, 2).map(i => ({
          ...i,
          features: ["Feature 1", "Feature 2", "Feature 3"],
          lastSynced: "2 hours ago",
        }))}
        variant="detailed"
        columns={2}
      />
    </div>
  ),
};

export const ListView: StoryObj<typeof IntegrationCardList> = {
  render: () => (
    <div className="w-[550px]">
      <IntegrationCardList
        integrations={integrations}
        variant="list"
      />
    </div>
  ),
};

export const CompactList: StoryObj<typeof IntegrationCardList> = {
  render: () => (
    <div className="w-[320px]">
      <IntegrationCardList
        integrations={integrations}
        variant="compact"
      />
    </div>
  ),
};
