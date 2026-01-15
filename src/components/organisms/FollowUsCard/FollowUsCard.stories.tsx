import type { Meta, StoryObj } from "@storybook/react";
import { FollowUsCard } from "./index";

const meta: Meta<typeof FollowUsCard> = {
  title: "Organisms/Cards/FollowUsCard",
  component: FollowUsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FollowUsCard>;

const socialLinks = [
  { platform: "twitter" as const, url: "https://twitter.com", followers: 12500 },
  { platform: "facebook" as const, url: "https://facebook.com", followers: 8200 },
  { platform: "instagram" as const, url: "https://instagram.com", followers: 15800 },
  { platform: "linkedin" as const, url: "https://linkedin.com", followers: 5400 },
  { platform: "youtube" as const, url: "https://youtube.com", followers: 25000 },
  { platform: "github" as const, url: "https://github.com", followers: 3200 },
];

export const Default: Story = {
  args: {
    socialLinks: socialLinks.slice(0, 4),
    description: "Stay connected with us on social media",
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const Compact: Story = {
  args: {
    socialLinks: socialLinks.slice(0, 6),
    variant: "compact",
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const List: Story = {
  args: {
    socialLinks,
    variant: "list",
    description: "Follow us for updates and news",
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const Grid: Story = {
  args: {
    socialLinks: socialLinks.slice(0, 4),
    variant: "grid",
    description: "Join our community",
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const AllPlatforms: Story = {
  args: {
    socialLinks: [
      { platform: "twitter", url: "#", followers: 12500 },
      { platform: "facebook", url: "#", followers: 8200 },
      { platform: "instagram", url: "#", followers: 15800 },
      { platform: "linkedin", url: "#", followers: 5400 },
      { platform: "youtube", url: "#", followers: 25000 },
      { platform: "github", url: "#", followers: 3200 },
      { platform: "discord", url: "#", followers: 2100 },
      { platform: "tiktok", url: "#", followers: 45000 },
    ],
    variant: "list",
    title: "Follow Us Everywhere",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};
