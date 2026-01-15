import type { Meta, StoryObj } from "@storybook/react";
import { InviteFriendsCard } from "./";

const meta: Meta<typeof InviteFriendsCard> = {
  title: "Organisms/InviteFriendsCard",
  component: InviteFriendsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InviteFriendsCard>;

export const Default: Story = {
  args: {
    referralCode: "FRIEND2024",
    reward: {
      type: "credits",
      value: "$10 credit",
      description: "For you and your friend",
    },
    onInviteByEmail: (email) => console.log("Invite:", email),
    onCopyCode: (code) => console.log("Copied:", code),
    recentInvites: [
      { name: "John Doe", avatarFallback: "JD", status: "accepted" },
      { name: "Jane Smith", avatarFallback: "JS", status: "pending" },
    ],
    className: "w-[380px]",
  },
};

export const Featured: Story = {
  args: {
    title: "Invite Friends & Earn Rewards",
    description: "Share your unique referral code and earn rewards when your friends sign up and make their first purchase.",
    referralCode: "PRELINE2024",
    referralLink: "https://app.example.com/ref/PRELINE2024",
    reward: {
      type: "credits",
      value: "Get $25 off your next purchase",
      description: "Your friend also gets $25 off their first order",
    },
    invitesSent: 15,
    invitesAccepted: 8,
    variant: "featured",
    onInviteByEmail: (email) => console.log("Invite:", email),
    onCopyCode: (code) => console.log("Copied code:", code),
    onCopyLink: (link) => console.log("Copied link:", link),
    onShare: () => console.log("Share clicked"),
    className: "w-[500px]",
  },
};

export const Horizontal: Story = {
  args: {
    referralCode: "REFER123",
    reward: {
      type: "discount",
      value: "20% off",
    },
    variant: "horizontal",
    onCopyCode: (code) => console.log("Copied:", code),
    className: "w-[500px]",
  },
};

export const Compact: Story = {
  args: {
    reward: {
      type: "credits",
      value: "$10 credit",
    },
    variant: "compact",
    onShare: () => console.log("Share"),
    className: "w-[320px]",
  },
};

export const WithRecentInvites: Story = {
  args: {
    referralCode: "MYCODE",
    reward: {
      type: "credits",
      value: "1 month free",
    },
    recentInvites: [
      { name: "Alex Johnson", avatarFallback: "AJ", status: "accepted" },
      { name: "Maria Garcia", avatarFallback: "MG", status: "pending" },
      { name: "David Kim", avatarFallback: "DK", status: "accepted" },
    ],
    onInviteByEmail: (email) => console.log("Invite:", email),
    className: "w-[380px]",
  },
};

export const EmailOnly: Story = {
  args: {
    title: "Invite Teammates",
    description: "Add team members to your workspace by email.",
    onInviteByEmail: (email) => console.log("Invite:", email),
    className: "w-[380px]",
  },
};
