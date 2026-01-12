import type { Meta, StoryObj } from "@storybook/react";
import { StatsWithAvatarGroup } from "./index";

const meta: Meta<typeof StatsWithAvatarGroup> = {
  title: "DataVisualization/Stats/StatsWithAvatarGroup",
  component: StatsWithAvatarGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TeamStats: Story = {
  args: {
    cards: [
      {
        value: "3",
        label: "Owners",
        avatars: [
          {
            type: "image",
            src: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
            alt: "Owner 1",
          },
          {
            type: "image",
            src: "https://images.unsplash.com/photo-1679412330254-90cb240038c5?auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
            alt: "Owner 2",
          },
          {
            type: "image",
            src: "https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
            alt: "Owner 3",
          },
        ],
      },
      {
        value: "12",
        label: "Developers",
        avatars: [
          {
            type: "image",
            src: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
            alt: "Dev 1",
          },
          {
            type: "image",
            src: "https://images.unsplash.com/photo-1679412330254-90cb240038c5?auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
            alt: "Dev 2",
          },
          { type: "initial", text: "+10" },
        ],
      },
      {
        value: "5",
        label: "Designers",
        avatars: [
          { type: "initial", text: "A" },
          { type: "initial", text: "B" },
          { type: "initial", text: "C" },
          { type: "initial", text: "+2" },
        ],
      },
      {
        value: "2",
        label: "QA Engineers",
        avatars: [
          {
            type: "image",
            src: "https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
            alt: "QA 1",
          },
          { type: "initial", text: "J" },
        ],
      },
    ],
  },
};

export const WithTooltips: Story = {
  args: {
    cards: [
      {
        value: "8",
        label: "Active users",
        avatars: [
          {
            type: "image",
            src: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
            alt: "User 1",
          },
          { type: "initial", text: "+7" },
        ],
        tooltipContent: "Users who have logged in within the last 24 hours.",
      },
      {
        value: "3",
        label: "Inactive users",
        avatars: [{ type: "initial", text: "3" }],
        tooltipContent:
          "Users who haven't logged in for more than 30 days. Consider sending a re-engagement email.",
      },
      {
        value: "2",
        label: "Pending verification",
        avatars: [
          { type: "initial", text: "P" },
          { type: "initial", text: "V" },
        ],
        tooltipContent:
          "Users who have signed up but haven't verified their email address yet.",
      },
      {
        value: "1",
        label: "Suspended",
        avatars: [{ type: "initial", text: "S" }],
        tooltipContent:
          "Users who have been suspended due to policy violations.",
      },
    ],
  },
};

export const OnlyInitials: Story = {
  args: {
    cards: [
      {
        value: "4",
        label: "Project A",
        avatars: [
          { type: "initial", text: "JD" },
          { type: "initial", text: "SM" },
          { type: "initial", text: "AK" },
          { type: "initial", text: "ML" },
        ],
      },
      {
        value: "3",
        label: "Project B",
        avatars: [
          { type: "initial", text: "RB" },
          { type: "initial", text: "TC" },
          { type: "initial", text: "EF" },
        ],
      },
      {
        value: "6",
        label: "Project C",
        avatars: [
          { type: "initial", text: "AB" },
          { type: "initial", text: "+5" },
        ],
      },
      {
        value: "2",
        label: "Project D",
        avatars: [
          { type: "initial", text: "XY" },
          { type: "initial", text: "ZW" },
        ],
      },
    ],
  },
};

export const TwoCards: Story = {
  args: {
    cards: [
      {
        value: "15",
        label: "Online now",
        avatars: [
          {
            type: "image",
            src: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
            alt: "User",
          },
          { type: "initial", text: "+14" },
        ],
      },
      {
        value: "42",
        label: "Total registered",
        avatars: [],
      },
    ],
  },
};
