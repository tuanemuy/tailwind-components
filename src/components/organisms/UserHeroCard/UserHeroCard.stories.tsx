import type { Meta, StoryObj } from "@storybook/react";
import type { UserHeroData } from "./";
import { UserHeroCard } from "./";

const meta: Meta<typeof UserHeroCard> = {
  title: "Organisms/UserHeroCard",
  component: UserHeroCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserHeroCard>;

const sampleUser: UserHeroData = {
  id: "1",
  name: "Sarah Chen",
  username: "sarahchen",
  email: "sarah@example.com",
  phone: "+1 (555) 123-4567",
  bio: "Product Designer passionate about creating intuitive user experiences. Currently leading design at Acme Corp.",
  role: "Lead Product Designer",
  company: "Acme Corp",
  location: "San Francisco, CA",
  website: "https://sarahchen.design",
  avatarFallback: "SC",
  coverImage:
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop",
  isVerified: true,
  isOnline: true,
  status: "available",
  joinedDate: "March 2021",
  stats: [
    { label: "Followers", value: "12.5K" },
    { label: "Following", value: "892" },
    { label: "Projects", value: "47" },
  ],
  tags: ["Design", "UX", "Figma", "Product"],
};

export const Default: Story = {
  args: {
    user: sampleUser,
    onMessage: (user) => console.log("Message:", user.name),
    onFollow: (user) => console.log("Follow:", user.name),
    className: "w-[380px]",
  },
};

export const Centered: Story = {
  args: {
    user: sampleUser,
    variant: "centered",
    onMessage: (user) => console.log("Message:", user.name),
    onFollow: (user) => console.log("Follow:", user.name),
    className: "w-[420px]",
  },
};

export const Wide: Story = {
  args: {
    user: sampleUser,
    variant: "wide",
    onMessage: (user) => console.log("Message:", user.name),
    onFollow: (user) => console.log("Follow:", user.name),
    onEdit: (user) => console.log("Edit:", user.name),
    className: "w-[800px]",
  },
};

export const Compact: Story = {
  args: {
    user: sampleUser,
    variant: "compact",
    onMessage: (user) => console.log("Message:", user.name),
    className: "w-[400px]",
  },
};

export const WithColorCover: Story = {
  args: {
    user: {
      ...sampleUser,
      coverImage: undefined,
      coverColor: "#8B5CF6",
    },
    variant: "centered",
    onFollow: (user) => console.log("Follow:", user.name),
    className: "w-[420px]",
  },
};

export const WithoutActions: Story = {
  args: {
    user: sampleUser,
    showActions: false,
    className: "w-[380px]",
  },
};

export const MinimalStats: Story = {
  args: {
    user: {
      ...sampleUser,
      stats: undefined,
      tags: undefined,
    },
    showStats: false,
    className: "w-[380px]",
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(["available", "busy", "away", "offline"] as const).map((status) => (
        <UserHeroCard
          key={status}
          user={{
            ...sampleUser,
            id: status,
            name: `User (${status})`,
            status,
            isOnline: status === "available",
          }}
          variant="compact"
          className="w-[350px]"
        />
      ))}
    </div>
  ),
};
