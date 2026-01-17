import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import {
  BellIcon,
  CreditCardIcon,
  HomeIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
} from "@/components/icons";
import {
  SectionNav,
  SectionNavItem,
  SectionNavLink,
  VerticalSectionNav,
} from "./index";

const meta: Meta<typeof SectionNav> = {
  title: "Organisms/PageSections/SectionNav",
  component: SectionNav,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["underline", "pills", "segment", "bordered"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionNav>;

const basicItems = [
  { value: "overview", label: "Overview" },
  { value: "analytics", label: "Analytics" },
  { value: "reports", label: "Reports" },
  { value: "notifications", label: "Notifications" },
];

export const Default: Story = {
  args: {
    defaultValue: "overview",
    items: basicItems,
  },
};

export const Underline: Story = {
  args: {
    variant: "underline",
    defaultValue: "overview",
    items: basicItems,
  },
};

export const Pills: Story = {
  args: {
    variant: "pills",
    defaultValue: "overview",
    items: basicItems,
  },
};

export const Segment: Story = {
  args: {
    variant: "segment",
    defaultValue: "overview",
    items: basicItems,
  },
};

export const Bordered: Story = {
  args: {
    variant: "bordered",
    defaultValue: "overview",
    items: basicItems,
  },
};

export const WithIcons: Story = {
  args: {
    variant: "pills",
    defaultValue: "dashboard",
    items: [
      {
        value: "dashboard",
        label: "Dashboard",
        icon: <HomeIcon className="size-full" />,
      },
      {
        value: "profile",
        label: "Profile",
        icon: <UserIcon className="size-full" />,
      },
      {
        value: "settings",
        label: "Settings",
        icon: <SettingsIcon className="size-full" />,
      },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    variant: "underline",
    defaultValue: "inbox",
    items: [
      { value: "inbox", label: "Inbox", badge: <Badge size="sm">12</Badge> },
      { value: "drafts", label: "Drafts" },
      { value: "sent", label: "Sent" },
      {
        value: "spam",
        label: "Spam",
        badge: (
          <Badge variant="destructive" size="sm">
            3
          </Badge>
        ),
      },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    variant: "pills",
    defaultValue: "general",
    items: [
      { value: "general", label: "General" },
      { value: "security", label: "Security" },
      { value: "billing", label: "Billing", disabled: true },
      { value: "advanced", label: "Advanced", disabled: true },
    ],
  },
};

export const Vertical: Story = {
  args: {
    variant: "pills",
    orientation: "vertical",
    defaultValue: "general",
    items: [
      {
        value: "general",
        label: "General",
        icon: <SettingsIcon className="size-full" />,
      },
      {
        value: "security",
        label: "Security",
        icon: <ShieldIcon className="size-full" />,
      },
      {
        value: "notifications",
        label: "Notifications",
        icon: <BellIcon className="size-full" />,
      },
      {
        value: "billing",
        label: "Billing",
        icon: <CreditCardIcon className="size-full" />,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const VerticalWithTitle: StoryObj<typeof VerticalSectionNav> = {
  render: () => (
    <div className="w-64">
      <VerticalSectionNav
        title="Settings"
        description="Manage your account settings"
        variant="pills"
        defaultValue="general"
        items={[
          {
            value: "general",
            label: "General",
            icon: <SettingsIcon className="size-full" />,
          },
          {
            value: "security",
            label: "Security",
            icon: <ShieldIcon className="size-full" />,
          },
          {
            value: "notifications",
            label: "Notifications",
            icon: <BellIcon className="size-full" />,
          },
          {
            value: "billing",
            label: "Billing",
            icon: <CreditCardIcon className="size-full" />,
          },
        ]}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">
          Small
        </h4>
        <SectionNav
          size="sm"
          variant="pills"
          defaultValue="overview"
          items={basicItems}
        />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">
          Medium (Default)
        </h4>
        <SectionNav
          size="md"
          variant="pills"
          defaultValue="overview"
          items={basicItems}
        />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">
          Large
        </h4>
        <SectionNav
          size="lg"
          variant="pills"
          defaultValue="overview"
          items={basicItems}
        />
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("tab1");
    return (
      <div className="space-y-4">
        <SectionNav
          variant="segment"
          value={value}
          onValueChange={setValue}
          items={[
            { value: "tab1", label: "Tab 1" },
            { value: "tab2", label: "Tab 2" },
            { value: "tab3", label: "Tab 3" },
          ]}
        />
        <div className="rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">
            Active tab:{" "}
            <span className="font-medium text-foreground">{value}</span>
          </p>
        </div>
      </div>
    );
  },
};

export const Composable: Story = {
  render: () => (
    <SectionNav variant="underline" defaultValue="home">
      <SectionNavItem value="home">
        <HomeIcon className="mr-2 size-4" />
        Home
      </SectionNavItem>
      <SectionNavItem value="profile">
        <UserIcon className="mr-2 size-4" />
        Profile
      </SectionNavItem>
      <SectionNavItem value="settings">
        <SettingsIcon className="mr-2 size-4" />
        Settings
      </SectionNavItem>
    </SectionNav>
  ),
};

export const LinkVariant: Story = {
  render: () => (
    <nav className="flex gap-x-1 border-b border-border">
      <SectionNavLink href="/dashboard" active variant="underline">
        Dashboard
      </SectionNavLink>
      <SectionNavLink href="/analytics" variant="underline">
        Analytics
      </SectionNavLink>
      <SectionNavLink href="/reports" variant="underline">
        Reports
      </SectionNavLink>
      <SectionNavLink href="/settings" variant="underline">
        Settings
      </SectionNavLink>
    </nav>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">
          Underline
        </h4>
        <SectionNav
          variant="underline"
          defaultValue="tab1"
          items={basicItems}
        />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">
          Pills
        </h4>
        <SectionNav variant="pills" defaultValue="tab1" items={basicItems} />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">
          Segment
        </h4>
        <SectionNav variant="segment" defaultValue="tab1" items={basicItems} />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">
          Bordered
        </h4>
        <SectionNav variant="bordered" defaultValue="tab1" items={basicItems} />
      </div>
    </div>
  ),
};
