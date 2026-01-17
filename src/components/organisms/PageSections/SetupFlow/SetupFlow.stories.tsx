import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms/Button";
import {
  BellIcon,
  CheckIcon,
  CreditCardIcon,
  MailIcon,
  ShieldIcon,
  UserIcon,
} from "@/components/icons";
import { SetupFlow, SetupProgress } from "./index";

const meta: Meta<typeof SetupFlow> = {
  title: "Organisms/PageSections/SetupFlow",
  component: SetupFlow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["list", "timeline", "accordion", "card"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SetupFlow>;

const basicSteps = [
  {
    id: "1",
    title: "Create your account",
    description: "Start with your email and password",
    status: "completed" as const,
  },
  {
    id: "2",
    title: "Complete your profile",
    description: "Add your name and profile photo",
    status: "current" as const,
    action: {
      label: "Complete profile",
      onClick: () => console.log("Complete profile"),
    },
  },
  {
    id: "3",
    title: "Set up notifications",
    description: "Choose how you want to be notified",
    status: "pending" as const,
    optional: true,
  },
  {
    id: "4",
    title: "Start exploring",
    description: "You're ready to go!",
    status: "pending" as const,
  },
];

export const Default: Story = {
  args: {
    title: "Getting Started",
    description: "Complete these steps to set up your account",
    steps: basicSteps,
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export const Timeline: Story = {
  args: {
    variant: "timeline",
    title: "Setup Progress",
    steps: basicSteps,
  },
  decorators: Default.decorators,
};

export const Card: Story = {
  args: {
    variant: "card",
    columns: 2,
    steps: [
      {
        id: "1",
        title: "Personal Info",
        description: "Add your basic details",
        status: "completed" as const,
        icon: <UserIcon className="size-full" />,
      },
      {
        id: "2",
        title: "Email Verification",
        description: "Verify your email address",
        status: "completed" as const,
        icon: <MailIcon className="size-full" />,
      },
      {
        id: "3",
        title: "Payment Method",
        description: "Add a payment method",
        status: "current" as const,
        icon: <CreditCardIcon className="size-full" />,
        action: {
          label: "Add payment",
          onClick: () => console.log("Add payment"),
        },
      },
      {
        id: "4",
        title: "Security",
        description: "Set up two-factor auth",
        status: "pending" as const,
        icon: <ShieldIcon className="size-full" />,
        optional: true,
      },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    variant: "list",
    steps: [
      {
        id: "1",
        title: "Profile Setup",
        description: "Add your name and profile picture",
        status: "completed" as const,
        icon: <UserIcon className="size-full" />,
      },
      {
        id: "2",
        title: "Email Preferences",
        description: "Configure your email notifications",
        status: "current" as const,
        icon: <MailIcon className="size-full" />,
        action: {
          label: "Configure",
          onClick: () => console.log("Configure email"),
        },
      },
      {
        id: "3",
        title: "Security Settings",
        description: "Enable two-factor authentication",
        status: "pending" as const,
        icon: <ShieldIcon className="size-full" />,
      },
    ],
  },
  decorators: Default.decorators,
};

export const WithContent: Story = {
  args: {
    variant: "timeline",
    steps: [
      {
        id: "1",
        title: "Account Created",
        description: "Your account was created on Jan 15, 2024",
        status: "completed" as const,
      },
      {
        id: "2",
        title: "Verify Email",
        description: "Click the link sent to your email",
        status: "current" as const,
        content: (
          <div className="rounded-lg border border-border bg-muted/50 p-3">
            <p className="text-sm text-muted-foreground">
              Verification email sent to <strong>john@example.com</strong>
            </p>
            <Button variant="ghost" size="sm" className="mt-2">
              Resend email
            </Button>
          </div>
        ),
      },
      {
        id: "3",
        title: "Complete Setup",
        description: "Fill in your profile details",
        status: "pending" as const,
      },
    ],
  },
  decorators: Default.decorators,
};

export const AllCompleted: Story = {
  args: {
    title: "Setup Complete!",
    description: "You've completed all the setup steps",
    variant: "list",
    steps: basicSteps.map((step) => ({
      ...step,
      status: "completed" as const,
    })),
  },
  decorators: Default.decorators,
};

// With Progress indicator
export const WithProgress: Story = {
  render: () => (
    <div className="max-w-lg space-y-6">
      <SetupProgress steps={basicSteps} />
      <SetupFlow steps={basicSteps} variant="list" />
    </div>
  ),
};

// Onboarding flow example
export const OnboardingFlow: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Welcome to the platform!</h2>
        <p className="mt-2 text-muted-foreground">
          Complete these steps to get the most out of your experience
        </p>
      </div>
      <SetupProgress
        steps={[
          { id: "1", title: "Account", status: "completed" },
          { id: "2", title: "Profile", status: "completed" },
          { id: "3", title: "Settings", status: "current" },
          { id: "4", title: "Finish", status: "pending" },
        ]}
      />
      <SetupFlow
        variant="card"
        columns={2}
        steps={[
          {
            id: "1",
            title: "Create Account",
            description: "Sign up with email or social accounts",
            status: "completed",
            icon: <UserIcon className="size-full" />,
          },
          {
            id: "2",
            title: "Complete Profile",
            description: "Add your details and photo",
            status: "completed",
            icon: <UserIcon className="size-full" />,
          },
          {
            id: "3",
            title: "Configure Settings",
            description: "Set up your preferences",
            status: "current",
            icon: <BellIcon className="size-full" />,
            action: {
              label: "Go to settings",
              onClick: () => console.log("Settings"),
            },
          },
          {
            id: "4",
            title: "Start Using",
            description: "Explore features and get started",
            status: "pending",
            icon: <CheckIcon className="size-full" />,
          },
        ]}
      />
    </div>
  ),
};

export const CompactSize: Story = {
  args: {
    size: "sm",
    variant: "list",
    steps: basicSteps,
  },
  decorators: Default.decorators,
};

export const LargeSize: Story = {
  args: {
    size: "lg",
    variant: "timeline",
    steps: basicSteps,
  },
  decorators: Default.decorators,
};
