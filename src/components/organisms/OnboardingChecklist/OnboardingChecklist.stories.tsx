import type { Meta, StoryObj } from "@storybook/react";
import {
  OnboardingChecklist,
  CompactChecklist,
  ExpandableChecklist,
  GamifiedChecklist,
} from "./index";
import { Button } from "@/components/atoms/Button";
import { GiftIcon, StarIcon } from "@/lib/icons";

const meta: Meta<typeof OnboardingChecklist> = {
  title: "Organisms/PageSections/OnboardingChecklist",
  component: OnboardingChecklist,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "outlined"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingChecklist>;

const basicItems = [
  {
    id: "1",
    title: "Create your account",
    description: "Sign up with email or social login",
    completed: true,
  },
  {
    id: "2",
    title: "Verify your email",
    description: "Click the link sent to your inbox",
    completed: true,
  },
  {
    id: "3",
    title: "Complete your profile",
    description: "Add your name and photo",
    completed: false,
    action: {
      label: "Complete",
      onClick: () => console.log("Complete profile"),
    },
  },
  {
    id: "4",
    title: "Set up notifications",
    description: "Choose how you want to be notified",
    completed: false,
  },
  {
    id: "5",
    title: "Invite team members",
    description: "Optional: Add collaborators",
    completed: false,
  },
];

export const Default: Story = {
  args: {
    title: "Getting Started",
    description: "Complete these steps to set up your account",
    items: basicItems,
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    title: "Setup Checklist",
    items: basicItems,
  },
  decorators: Default.decorators,
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    title: "Getting Started",
    items: basicItems,
    showProgress: false,
  },
  decorators: Default.decorators,
};

export const Dismissable: Story = {
  args: {
    title: "Quick Start Guide",
    description: "Follow these steps to get started",
    items: basicItems,
    dismissable: true,
    onDismiss: () => console.log("Dismissed"),
  },
  decorators: Default.decorators,
};

export const WithoutProgress: Story = {
  args: {
    title: "Setup Tasks",
    items: basicItems.slice(0, 3),
    showProgress: false,
  },
  decorators: Default.decorators,
};

export const AllCompleted: Story = {
  args: {
    title: "Setup Complete!",
    description: "You've completed all the getting started tasks",
    items: basicItems.map((item) => ({ ...item, completed: true })),
  },
  decorators: Default.decorators,
};

// Compact variant
export const Compact: StoryObj<typeof CompactChecklist> = {
  render: () => (
    <div className="w-64">
      <CompactChecklist
        items={[
          { id: "1", title: "Create account", completed: true },
          { id: "2", title: "Add profile photo", completed: true },
          { id: "3", title: "Connect social accounts", completed: false },
          { id: "4", title: "Verify identity", completed: false },
        ]}
      />
    </div>
  ),
};

// Expandable variant
export const Expandable: StoryObj<typeof ExpandableChecklist> = {
  render: () => (
    <div className="max-w-md">
      <ExpandableChecklist
        title="Onboarding Steps"
        items={[
          {
            id: "1",
            title: "Create your account",
            description: "Sign up with email or social login",
            completed: true,
            content: (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Your account has been created successfully.
                </p>
              </div>
            ),
          },
          {
            id: "2",
            title: "Complete your profile",
            description: "Add your name, photo, and bio",
            completed: false,
            content: (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Help others recognize you by adding your profile details.
                </p>
                <Button variant="primary" size="sm">
                  Edit Profile
                </Button>
              </div>
            ),
          },
          {
            id: "3",
            title: "Connect your apps",
            description: "Integrate with your favorite tools",
            completed: false,
            content: (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Connect your calendar, email, and other apps to get the most out of our platform.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Connect Google
                  </Button>
                  <Button variant="outline" size="sm">
                    Connect Slack
                  </Button>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
};

// Gamified variant
export const Gamified: StoryObj<typeof GamifiedChecklist> = {
  render: () => (
    <div className="max-w-md">
      <GamifiedChecklist
        title="Complete Your Profile"
        items={[
          {
            id: "1",
            title: "Add profile picture",
            completed: true,
          },
          {
            id: "2",
            title: "Write a bio",
            completed: true,
          },
          {
            id: "3",
            title: "Add your location",
            completed: false,
            action: {
              label: "Add",
              onClick: () => console.log("Add location"),
            },
          },
          {
            id: "4",
            title: "Connect social accounts",
            completed: false,
            action: {
              label: "Connect",
              onClick: () => console.log("Connect"),
            },
          },
        ]}
        reward={{
          title: "Unlock Premium Features",
          description: "You've unlocked premium features!",
          icon: <GiftIcon className="size-5" />,
        }}
      />
    </div>
  ),
};

export const GamifiedComplete: StoryObj<typeof GamifiedChecklist> = {
  render: () => (
    <div className="max-w-md">
      <GamifiedChecklist
        title="Profile Complete!"
        items={[
          { id: "1", title: "Add profile picture", completed: true },
          { id: "2", title: "Write a bio", completed: true },
          { id: "3", title: "Add your location", completed: true },
          { id: "4", title: "Connect social accounts", completed: true },
        ]}
        reward={{
          title: "Unlock Premium Features",
          description: "Congratulations! Premium features unlocked.",
          icon: <StarIcon className="size-5" />,
        }}
      />
    </div>
  ),
};

// Account setup checklist
export const AccountSetup: Story = {
  render: () => (
    <div className="max-w-md">
      <OnboardingChecklist
        title="Account Setup"
        description="Complete these steps to activate all features"
        items={[
          {
            id: "profile",
            title: "Complete your profile",
            description: "Add your name and profile picture",
            completed: true,
          },
          {
            id: "email",
            title: "Verify email address",
            description: "Confirm your email to unlock features",
            completed: true,
          },
          {
            id: "payment",
            title: "Add payment method",
            description: "Required for premium features",
            completed: false,
            action: {
              label: "Add card",
              onClick: () => console.log("Add payment"),
            },
          },
          {
            id: "2fa",
            title: "Enable two-factor auth",
            description: "Secure your account",
            completed: false,
          },
        ]}
      />
    </div>
  ),
};

// Project setup checklist
export const ProjectSetup: Story = {
  render: () => (
    <div className="max-w-md">
      <OnboardingChecklist
        variant="elevated"
        title="Project Setup"
        items={[
          {
            id: "1",
            title: "Name your project",
            completed: true,
          },
          {
            id: "2",
            title: "Add project description",
            completed: true,
          },
          {
            id: "3",
            title: "Invite team members",
            description: "Add collaborators to your project",
            completed: false,
            action: {
              label: "Invite",
              onClick: () => console.log("Invite"),
            },
          },
          {
            id: "4",
            title: "Set up integrations",
            description: "Connect GitHub, Slack, etc.",
            completed: false,
          },
          {
            id: "5",
            title: "Create first milestone",
            completed: false,
          },
        ]}
        dismissable
        onDismiss={() => console.log("Dismissed")}
      />
    </div>
  ),
};

// Interactive example with state
export const Interactive: Story = {
  render: function InteractiveChecklist() {
    const [items, setItems] = React.useState([
      { id: "1", title: "Sign up for account", completed: true },
      { id: "2", title: "Verify email", completed: true },
      { id: "3", title: "Add profile photo", completed: false },
      { id: "4", title: "Complete bio", completed: false },
      { id: "5", title: "Connect social accounts", completed: false },
    ]);

    const handleToggle = (id: string, completed: boolean) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, completed } : item
        )
      );
    };

    return (
      <div className="max-w-md">
        <OnboardingChecklist
          title="Getting Started"
          description="Click items to toggle completion"
          items={items}
          onItemToggle={handleToggle}
        />
      </div>
    );
  },
};

import React from "react";

// Sidebar widget checklist
export const SidebarWidget: Story = {
  render: () => (
    <div className="w-72 space-y-4">
      <CompactChecklist
        items={[
          { id: "1", title: "Complete profile", completed: true },
          { id: "2", title: "Verify email", completed: true },
          { id: "3", title: "Add payment method", completed: false },
          { id: "4", title: "Invite teammates", completed: false },
        ]}
      />
    </div>
  ),
};
