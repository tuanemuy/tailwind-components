import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SettingsModal } from "./index";
import { Button } from "@/components/atoms/Button";

const meta: Meta<typeof SettingsModal> = {
  title: "Organisms/Overlays/SettingsModal",
  component: SettingsModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SettingsModal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const sections = [
      {
        id: "general",
        title: "General",
        description: "Basic application settings",
        items: [
          {
            id: "darkMode",
            label: "Dark Mode",
            description: "Enable dark theme across the application",
            type: "toggle" as const,
            value: false,
          },
          {
            id: "language",
            label: "Language",
            description: "Select your preferred language",
            type: "select" as const,
            value: "en",
            options: [
              { value: "en", label: "English" },
              { value: "es", label: "Spanish" },
              { value: "fr", label: "French" },
              { value: "de", label: "German" },
              { value: "ja", label: "Japanese" },
            ],
          },
          {
            id: "timezone",
            label: "Timezone",
            description: "Your local timezone for dates and times",
            type: "select" as const,
            value: "America/Los_Angeles",
            options: [
              { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
              { value: "America/Denver", label: "Mountain Time (MT)" },
              { value: "America/Chicago", label: "Central Time (CT)" },
              { value: "America/New_York", label: "Eastern Time (ET)" },
            ],
          },
        ],
      },
      {
        id: "notifications",
        title: "Notifications",
        description: "Configure how you receive notifications",
        items: [
          {
            id: "emailNotifications",
            label: "Email Notifications",
            description: "Receive notifications via email",
            type: "toggle" as const,
            value: true,
          },
          {
            id: "pushNotifications",
            label: "Push Notifications",
            description: "Receive browser push notifications",
            type: "toggle" as const,
            value: true,
          },
          {
            id: "digestFrequency",
            label: "Email Digest",
            description: "How often to receive email summaries",
            type: "select" as const,
            value: "daily",
            options: [
              { value: "realtime", label: "Real-time" },
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "never", label: "Never" },
            ],
          },
        ],
      },
      {
        id: "privacy",
        title: "Privacy",
        description: "Manage your privacy settings",
        items: [
          {
            id: "profileVisibility",
            label: "Profile Visibility",
            description: "Who can see your profile",
            type: "select" as const,
            value: "team",
            options: [
              { value: "public", label: "Everyone" },
              { value: "team", label: "Team members only" },
              { value: "private", label: "Only me" },
            ],
          },
          {
            id: "activityStatus",
            label: "Show Activity Status",
            description: "Let others see when you're online",
            type: "toggle" as const,
            value: true,
          },
          {
            id: "analytics",
            label: "Analytics",
            description: "Help improve the product by sharing usage data",
            type: "toggle" as const,
            value: false,
          },
        ],
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Settings</Button>
        <SettingsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(settings) => {
            console.log("Save settings:", settings);
            setIsOpen(false);
          }}
          sections={sections}
        />
      </>
    );
  },
};

export const SingleSection: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const sections = [
      {
        id: "display",
        title: "Display Settings",
        items: [
          {
            id: "compactMode",
            label: "Compact Mode",
            description: "Use a more compact layout",
            type: "toggle" as const,
            value: false,
          },
          {
            id: "fontSize",
            label: "Font Size",
            description: "Adjust the default font size",
            type: "select" as const,
            value: "medium",
            options: [
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ],
          },
          {
            id: "animationsEnabled",
            label: "Enable Animations",
            description: "Show smooth transitions and animations",
            type: "toggle" as const,
            value: true,
          },
        ],
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Display Settings</Button>
        <SettingsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(settings) => {
            console.log("Save settings:", settings);
            setIsOpen(false);
          }}
          sections={sections}
          title="Display Settings"
        />
      </>
    );
  },
};

export const WithLoading: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const sections = [
      {
        id: "account",
        title: "Account Settings",
        items: [
          {
            id: "username",
            label: "Username",
            description: "Your unique username",
            type: "input" as const,
            value: "john_doe",
          },
          {
            id: "twoFactor",
            label: "Two-Factor Authentication",
            description: "Add an extra layer of security",
            type: "toggle" as const,
            value: false,
          },
        ],
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Account Settings</Button>
        <SettingsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(settings) => {
            setLoading(true);
            setTimeout(() => {
              console.log("Save settings:", settings);
              setLoading(false);
              setIsOpen(false);
            }, 2000);
          }}
          sections={sections}
          title="Account Settings"
          loading={loading}
        />
      </>
    );
  },
};
