import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  BellIcon,
  MailIcon,
  MessageSquareIcon,
  SmartphoneIcon,
} from "@/components/icons";
import {
  EmailDigestSettings,
  GroupedNotificationSettings,
  NotificationPreferencesPanel,
  NotificationSettings,
  NotificationToggleCard,
} from "./index";

const meta: Meta<typeof NotificationSettings> = {
  title: "Organisms/PageSections/NotificationSettings",
  component: NotificationSettings,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "card", "compact"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationSettings>;

const basicSettings = [
  {
    id: "email",
    title: "Email Notifications",
    description: "Receive notifications via email",
    enabled: true,
  },
  {
    id: "push",
    title: "Push Notifications",
    description: "Receive push notifications on your devices",
    enabled: true,
  },
  {
    id: "sms",
    title: "SMS Notifications",
    description: "Receive important alerts via SMS",
    enabled: false,
  },
  {
    id: "marketing",
    title: "Marketing Emails",
    description: "Receive promotional emails and newsletters",
    enabled: false,
  },
];

export const Default: Story = {
  args: {
    title: "Notifications",
    description: "Manage how you receive notifications",
    settings: basicSettings,
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export const Card: Story = {
  args: {
    variant: "card",
    title: "Notification Settings",
    settings: basicSettings,
  },
  decorators: Default.decorators,
};

export const Compact: Story = {
  args: {
    variant: "compact",
    settings: basicSettings.slice(0, 3),
  },
  decorators: Default.decorators,
};

export const WithChannels: Story = {
  args: {
    title: "Notification Preferences",
    description: "Choose which channels to use for each notification type",
    showChannels: true,
    settings: [
      {
        id: "comments",
        title: "Comments",
        description: "When someone comments on your posts",
        enabled: true,
        channels: { email: true, push: true, sms: false },
      },
      {
        id: "mentions",
        title: "Mentions",
        description: "When someone mentions you",
        enabled: true,
        channels: { email: true, push: true, sms: true },
      },
      {
        id: "follows",
        title: "New Followers",
        description: "When someone follows you",
        enabled: true,
        channels: { email: false, push: true, sms: false },
      },
      {
        id: "messages",
        title: "Direct Messages",
        description: "When you receive a new message",
        enabled: false,
        channels: { email: false, push: false, sms: false },
      },
    ],
  },
  decorators: Default.decorators,
};

// Grouped settings
export const Grouped: StoryObj<typeof GroupedNotificationSettings> = {
  render: () => (
    <div className="max-w-lg">
      <GroupedNotificationSettings
        groups={[
          {
            id: "activity",
            title: "Activity",
            description: "Notifications about your account activity",
            settings: [
              {
                id: "comments",
                title: "Comments",
                description: "When someone comments on your content",
                enabled: true,
              },
              {
                id: "likes",
                title: "Likes",
                description: "When someone likes your content",
                enabled: true,
              },
              {
                id: "shares",
                title: "Shares",
                description: "When someone shares your content",
                enabled: false,
              },
            ],
          },
          {
            id: "social",
            title: "Social",
            description: "Notifications about social interactions",
            settings: [
              {
                id: "follows",
                title: "New followers",
                description: "When someone follows you",
                enabled: true,
              },
              {
                id: "mentions",
                title: "Mentions",
                description: "When someone mentions you",
                enabled: true,
              },
            ],
          },
          {
            id: "updates",
            title: "Product Updates",
            description: "Stay informed about new features",
            settings: [
              {
                id: "features",
                title: "New Features",
                description: "Announcements about new features",
                enabled: true,
              },
              {
                id: "tips",
                title: "Tips & Tricks",
                description: "Helpful tips to get more out of the product",
                enabled: false,
              },
            ],
          },
        ]}
      />
    </div>
  ),
};

export const GroupedWithChannels: StoryObj<typeof GroupedNotificationSettings> =
  {
    render: () => (
      <div className="max-w-lg">
        <GroupedNotificationSettings
          showChannels
          groups={[
            {
              id: "messages",
              title: "Messages",
              settings: [
                {
                  id: "dm",
                  title: "Direct messages",
                  description: "New direct messages",
                  enabled: true,
                  channels: { email: true, push: true, sms: false },
                },
                {
                  id: "replies",
                  title: "Replies",
                  description: "Replies to your messages",
                  enabled: true,
                  channels: { email: false, push: true, sms: false },
                },
              ],
            },
            {
              id: "alerts",
              title: "Important Alerts",
              settings: [
                {
                  id: "security",
                  title: "Security alerts",
                  description: "Suspicious activity on your account",
                  enabled: true,
                  channels: { email: true, push: true, sms: true },
                },
                {
                  id: "billing",
                  title: "Billing alerts",
                  description: "Payment reminders and receipts",
                  enabled: true,
                  channels: { email: true, push: false, sms: false },
                },
              ],
            },
          ]}
        />
      </div>
    ),
  };

// Toggle cards
export const ToggleCards: StoryObj<typeof NotificationToggleCard> = {
  render: () => (
    <div className="max-w-md space-y-3">
      <NotificationToggleCard
        icon={<MailIcon className="size-full" />}
        title="Email Notifications"
        description="Receive updates and alerts via email"
        enabled={true}
        onToggle={(enabled) => console.log("Email:", enabled)}
      />
      <NotificationToggleCard
        icon={<BellIcon className="size-full" />}
        title="Push Notifications"
        description="Get real-time notifications on your device"
        enabled={true}
        onToggle={(enabled) => console.log("Push:", enabled)}
      />
      <NotificationToggleCard
        icon={<SmartphoneIcon className="size-full" />}
        title="SMS Notifications"
        description="Receive important alerts via text message"
        enabled={false}
        onToggle={(enabled) => console.log("SMS:", enabled)}
      />
      <NotificationToggleCard
        icon={<MessageSquareIcon className="size-full" />}
        title="In-App Messages"
        description="Show notifications within the app"
        enabled={true}
        onToggle={(enabled) => console.log("In-app:", enabled)}
      />
    </div>
  ),
};

// Email digest settings
export const EmailDigest: StoryObj<typeof EmailDigestSettings> = {
  render: () => {
    const [frequency, setFrequency] = React.useState<
      "daily" | "weekly" | "monthly" | "never"
    >("weekly");

    return (
      <div className="max-w-lg">
        <EmailDigestSettings
          frequency={frequency}
          onFrequencyChange={setFrequency}
        />
      </div>
    );
  },
};

// Preferences panel
export const PreferencesPanel: StoryObj<typeof NotificationPreferencesPanel> = {
  render: () => (
    <div className="max-w-lg">
      <NotificationPreferencesPanel
        settings={[
          {
            id: "all",
            title: "All Notifications",
            description: "Enable or disable all notifications",
            enabled: true,
          },
          {
            id: "email",
            title: "Email Notifications",
            description: "Receive notifications via email",
            enabled: true,
          },
          {
            id: "push",
            title: "Push Notifications",
            description: "Receive push notifications",
            enabled: true,
          },
          {
            id: "sounds",
            title: "Notification Sounds",
            description: "Play sounds for notifications",
            enabled: false,
          },
        ]}
        onSave={() => console.log("Save")}
        onCancel={() => console.log("Cancel")}
      />
    </div>
  ),
};

export const PreferencesPanelSaving: StoryObj<
  typeof NotificationPreferencesPanel
> = {
  render: () => (
    <div className="max-w-lg">
      <NotificationPreferencesPanel
        settings={basicSettings}
        onSave={() => console.log("Save")}
        onCancel={() => console.log("Cancel")}
        saving={true}
      />
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: function InteractiveNotifications() {
    const [settings, setSettings] = React.useState([
      {
        id: "comments",
        title: "Comments",
        description: "When someone comments on your posts",
        enabled: true,
        channels: { email: true, push: true, sms: false },
      },
      {
        id: "mentions",
        title: "Mentions",
        description: "When someone mentions you",
        enabled: true,
        channels: { email: true, push: true, sms: false },
      },
      {
        id: "follows",
        title: "New Followers",
        description: "When someone follows you",
        enabled: false,
        channels: { email: false, push: false, sms: false },
      },
    ]);

    const handleSettingChange = (id: string, enabled: boolean) => {
      setSettings((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                enabled,
                channels: enabled
                  ? s.channels
                  : { email: false, push: false, sms: false },
              }
            : s,
        ),
      );
    };

    const handleChannelChange = (
      id: string,
      channel: "email" | "push" | "sms",
      enabled: boolean,
    ) => {
      setSettings((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, channels: { ...s.channels, [channel]: enabled } }
            : s,
        ),
      );
    };

    return (
      <div className="max-w-lg">
        <NotificationSettings
          variant="card"
          title="Notification Settings"
          description="Choose how and when you want to be notified"
          showChannels
          settings={settings}
          onSettingChange={handleSettingChange}
          onChannelChange={handleChannelChange}
        />
      </div>
    );
  },
};

// Complete settings page example
export const CompleteSettingsPage: Story = {
  render: function CompleteSettings() {
    const [digestFrequency, setDigestFrequency] = React.useState<
      "daily" | "weekly" | "monthly" | "never"
    >("weekly");

    return (
      <div className="max-w-2xl space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Notification Settings
          </h2>
          <p className="mt-1 text-muted-foreground">
            Manage your notification preferences
          </p>
        </div>

        <GroupedNotificationSettings
          showChannels
          groups={[
            {
              id: "activity",
              title: "Activity",
              description: "Notifications about your account activity",
              settings: [
                {
                  id: "comments",
                  title: "Comments",
                  description: "When someone comments on your content",
                  enabled: true,
                  channels: { email: true, push: true, sms: false },
                },
                {
                  id: "mentions",
                  title: "Mentions",
                  description: "When someone mentions you",
                  enabled: true,
                  channels: { email: true, push: true, sms: false },
                },
              ],
            },
            {
              id: "social",
              title: "Social",
              description: "Notifications about social interactions",
              settings: [
                {
                  id: "follows",
                  title: "New followers",
                  enabled: true,
                  channels: { email: false, push: true, sms: false },
                },
                {
                  id: "messages",
                  title: "Direct messages",
                  enabled: true,
                  channels: { email: true, push: true, sms: false },
                },
              ],
            },
          ]}
        />

        <EmailDigestSettings
          frequency={digestFrequency}
          onFrequencyChange={setDigestFrequency}
        />
      </div>
    );
  },
};
