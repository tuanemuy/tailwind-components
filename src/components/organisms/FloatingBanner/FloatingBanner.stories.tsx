import type { Meta, StoryObj } from "@storybook/react";
import {
  FloatingBanner,
  RateUsBanner,
  FeedbackBanner,
  QuickActionsBanner,
  CookieConsentBanner,
} from "./index";
import { Button } from "@/components/atoms/Button";
import { BellIcon, ShareIcon, BookmarkIcon, PlusIcon } from "@/lib/icons";

const meta: Meta<typeof FloatingBanner> = {
  title: "Organisms/PageSections/FloatingBanner",
  component: FloatingBanner,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="relative min-h-[400px] bg-muted/20 p-8">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "dark"],
    },
    position: {
      control: "select",
      options: ["top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingBanner>;

export const Default: Story = {
  args: {
    children: "This is a floating banner message.",
    position: "bottom",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "New feature available! Try it now.",
    position: "bottom",
  },
};

export const Dark: Story = {
  args: {
    variant: "dark",
    children: "Dark themed floating banner.",
    position: "bottom",
  },
};

export const WithIcon: Story = {
  args: {
    icon: <BellIcon className="size-full" />,
    children: "You have 3 new notifications.",
    position: "bottom-right",
  },
};

export const WithAction: Story = {
  args: {
    children: "Subscribe to our newsletter for updates.",
    action: (
      <Button size="sm" variant="primary">
        Subscribe
      </Button>
    ),
    position: "bottom",
  },
};

export const Positions: Story = {
  render: () => (
    <div className="relative min-h-[600px]">
      <FloatingBanner position="top" variant="primary">
        Top Center
      </FloatingBanner>
      <FloatingBanner position="top-left" variant="dark">
        Top Left
      </FloatingBanner>
      <FloatingBanner position="top-right">
        Top Right
      </FloatingBanner>
      <FloatingBanner position="bottom-left">
        Bottom Left
      </FloatingBanner>
      <FloatingBanner position="bottom-right" variant="dark">
        Bottom Right
      </FloatingBanner>
      <FloatingBanner position="bottom" variant="primary">
        Bottom Center
      </FloatingBanner>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-24">
      <FloatingBanner size="sm" position="top">
        Small floating banner
      </FloatingBanner>
      <FloatingBanner size="md" position="bottom">
        Medium floating banner (default)
      </FloatingBanner>
      <FloatingBanner size="lg" className="bottom-20 left-1/2 -translate-x-1/2">
        Large floating banner
      </FloatingBanner>
    </div>
  ),
};

// Rate Us Banner
export const RateUs: StoryObj<typeof RateUsBanner> = {
  render: () => (
    <RateUsBanner
      title="How would you rate your experience?"
      onRate={(rating) => console.log(`Rated: ${rating}`)}
      position="bottom-right"
    />
  ),
};

// Feedback Banner
export const Feedback: StoryObj<typeof FeedbackBanner> = {
  render: () => (
    <FeedbackBanner
      question="Was this article helpful?"
      onFeedback={(isPositive) => console.log(`Feedback: ${isPositive ? "Positive" : "Negative"}`)}
      position="bottom"
    />
  ),
};

// Quick Actions Banner
export const QuickActions: StoryObj<typeof QuickActionsBanner> = {
  render: () => (
    <QuickActionsBanner
      position="bottom"
      actions={[
        { icon: <PlusIcon className="size-full" />, label: "New", onClick: () => console.log("New") },
        { icon: <ShareIcon className="size-full" />, label: "Share", onClick: () => console.log("Share") },
        { icon: <BookmarkIcon className="size-full" />, label: "Save", onClick: () => console.log("Save") },
      ]}
    />
  ),
};

// Cookie Consent Banner
export const CookieConsent: StoryObj<typeof CookieConsentBanner> = {
  render: () => (
    <CookieConsentBanner
      position="bottom"
      onAccept={() => console.log("Accepted")}
      onDecline={() => console.log("Declined")}
      onSettings={() => console.log("Settings")}
      settingsText="Cookie Settings"
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="relative min-h-[400px]">
      <FloatingBanner position="top" variant="default" closable>
        Default variant
      </FloatingBanner>
      <FloatingBanner position="bottom" variant="primary" closable>
        Primary variant
      </FloatingBanner>
      <FloatingBanner position="bottom-right" variant="dark" closable>
        Dark variant
      </FloatingBanner>
    </div>
  ),
};
