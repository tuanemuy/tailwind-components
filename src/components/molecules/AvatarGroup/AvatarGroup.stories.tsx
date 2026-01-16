import type { Meta, StoryObj } from "@storybook/react";
import { AvatarGroup } from "./index";

const sampleAvatars = [
  {
    src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop",
    alt: "User 1",
  },
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop",
    alt: "User 2",
  },
  {
    src: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=100&h=100&fit=crop",
    alt: "User 3",
  },
  { initials: "AB", alt: "User 4" },
  { initials: "CD", alt: "User 5" },
  { initials: "EF", alt: "User 6" },
];

const meta: Meta<typeof AvatarGroup> = {
  title: "Molecules/AvatarGroup",
  component: AvatarGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    max: {
      control: { type: "number", min: 1, max: 10 },
    },
    spacing: {
      control: "select",
      options: ["tight", "normal", "loose"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: sampleAvatars,
    max: 4,
  },
};

export const NoOverflow: Story = {
  args: {
    items: sampleAvatars.slice(0, 3),
    max: 4,
  },
};

export const WithOverflow: Story = {
  args: {
    items: sampleAvatars,
    max: 3,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AvatarGroup items={sampleAvatars} max={4} size="xs" />
      <AvatarGroup items={sampleAvatars} max={4} size="sm" />
      <AvatarGroup items={sampleAvatars} max={4} size="md" />
      <AvatarGroup items={sampleAvatars} max={4} size="lg" />
      <AvatarGroup items={sampleAvatars} max={4} size="xl" />
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AvatarGroup items={sampleAvatars} max={4} spacing="tight" />
      <AvatarGroup items={sampleAvatars} max={4} spacing="normal" />
      <AvatarGroup items={sampleAvatars} max={4} spacing="loose" />
    </div>
  ),
};

export const InitialsOnly: Story = {
  args: {
    items: [
      { initials: "JD" },
      { initials: "AB" },
      { initials: "CD" },
      { initials: "EF" },
      { initials: "GH" },
    ],
    max: 4,
  },
};
