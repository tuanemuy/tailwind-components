import type { Meta, StoryObj } from "@storybook/react";
import {
  CreditsCard,
  HelpResourcesCard,
  IntroVideoCard,
  TrialCard,
  UpgradeProCard,
  GiftCard,
} from "./index";
import { FileTextIcon, VideoIcon, MailIcon } from "@/lib/icons";

const meta: Meta = {
  title: "Organisms/Cards/MiniCards",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const Credits: StoryObj<typeof CreditsCard> = {
  render: () => (
    <div className="w-[280px]">
      <CreditsCard
        creditsUsed={750}
        creditsTotal={1000}
        onUpgrade={() => console.log("Upgrade clicked")}
      />
    </div>
  ),
};

export const CreditsLow: StoryObj<typeof CreditsCard> = {
  render: () => (
    <div className="w-[280px]">
      <CreditsCard
        creditsUsed={920}
        creditsTotal={1000}
        onUpgrade={() => console.log("Upgrade clicked")}
      />
    </div>
  ),
};

export const HelpResources: StoryObj<typeof HelpResourcesCard> = {
  render: () => (
    <div className="w-[320px]">
      <HelpResourcesCard
        resources={[
          {
            title: "Documentation",
            description: "Learn how to use our platform",
            url: "#",
            icon: <FileTextIcon className="size-4 text-muted-foreground" />,
          },
          {
            title: "Video Tutorials",
            description: "Watch step-by-step guides",
            url: "#",
            icon: <VideoIcon className="size-4 text-muted-foreground" />,
          },
          {
            title: "Contact Support",
            description: "Get help from our team",
            url: "#",
            icon: <MailIcon className="size-4 text-muted-foreground" />,
          },
        ]}
        onDismiss={() => console.log("Dismiss clicked")}
      />
    </div>
  ),
};

export const IntroVideo: StoryObj<typeof IntroVideoCard> = {
  render: () => (
    <div className="w-[320px]">
      <IntroVideoCard
        title="Getting Started"
        description="Learn the basics in just 5 minutes"
        thumbnailUrl="https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=640&h=360&fit=crop"
        duration="5:23"
        onPlay={() => console.log("Play clicked")}
        onDismiss={() => console.log("Dismiss clicked")}
      />
    </div>
  ),
};

export const IntroVideoNoThumbnail: StoryObj<typeof IntroVideoCard> = {
  render: () => (
    <div className="w-[320px]">
      <IntroVideoCard
        title="Product Tour"
        description="Discover all the features"
        duration="3:45"
        onPlay={() => console.log("Play clicked")}
      />
    </div>
  ),
};

export const Trial: StoryObj<typeof TrialCard> = {
  render: () => (
    <div className="w-[280px]">
      <TrialCard
        daysRemaining={10}
        totalDays={14}
        planName="Pro Trial"
        onUpgrade={() => console.log("Upgrade clicked")}
      />
    </div>
  ),
};

export const TrialEnding: StoryObj<typeof TrialCard> = {
  render: () => (
    <div className="w-[280px]">
      <TrialCard
        daysRemaining={2}
        totalDays={14}
        planName="Pro Trial"
        onUpgrade={() => console.log("Upgrade clicked")}
      />
    </div>
  ),
};

export const UpgradePro: StoryObj<typeof UpgradeProCard> = {
  render: () => (
    <div className="w-[300px]">
      <UpgradeProCard
        title="Upgrade to Pro"
        description="Unlock all premium features"
        features={[
          "Unlimited projects",
          "Advanced analytics",
          "Priority support",
          "Custom branding",
        ]}
        price="$19"
        period="/month"
        badge="Most Popular"
        onUpgrade={() => console.log("Upgrade clicked")}
        onDismiss={() => console.log("Dismiss clicked")}
      />
    </div>
  ),
};

export const UpgradeProSimple: StoryObj<typeof UpgradeProCard> = {
  render: () => (
    <div className="w-[280px]">
      <UpgradeProCard
        title="Go Pro"
        description="Get more out of your experience"
        onUpgrade={() => console.log("Upgrade clicked")}
      />
    </div>
  ),
};

export const Gift: StoryObj<typeof GiftCard> = {
  render: () => (
    <div className="w-[280px]">
      <GiftCard
        title="Welcome Gift!"
        description="Get 50% off your first month"
        code="WELCOME50"
        expiresAt="December 31, 2025"
        onRedeem={() => console.log("Redeem clicked")}
        onDismiss={() => console.log("Dismiss clicked")}
      />
    </div>
  ),
};

export const GiftNoCode: StoryObj<typeof GiftCard> = {
  render: () => (
    <div className="w-[280px]">
      <GiftCard
        title="Free Upgrade"
        description="You've been selected for a free Pro upgrade!"
        onRedeem={() => console.log("Redeem clicked")}
      />
    </div>
  ),
};

export const AllMiniCards: StoryObj = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3">
      <CreditsCard creditsUsed={750} creditsTotal={1000} />
      <TrialCard daysRemaining={10} />
      <UpgradeProCard
        features={["Unlimited access", "Priority support"]}
        price="$19"
      />
      <IntroVideoCard duration="5:23" />
      <GiftCard code="WELCOME50" expiresAt="Dec 31, 2025" />
      <HelpResourcesCard
        resources={[
          { title: "Documentation", url: "#" },
          { title: "Support", url: "#" },
        ]}
      />
    </div>
  ),
};
