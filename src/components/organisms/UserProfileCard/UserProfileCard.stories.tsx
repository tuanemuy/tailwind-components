import type { Meta, StoryObj } from "@storybook/react";
import { UserProfileCard, MiniProfileCard } from "./index";
import { Button } from "@/components/atoms/Button";
import { MessageIcon, UserPlusIcon, SettingsIcon } from "@/lib/icons";

const meta: Meta<typeof UserProfileCard> = {
  title: "Organisms/PageSections/UserProfileCard",
  component: UserProfileCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "minimal", "hero"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showCover: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserProfileCard>;

const sampleUser = {
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  coverSrc: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&h=200&fit=crop",
  bio: "Software developer passionate about creating beautiful user experiences.",
  role: "Senior Developer",
  location: "San Francisco, CA",
  verified: true,
};

const sampleStats = [
  { label: "Posts", value: "1,234" },
  { label: "Followers", value: "5.6K" },
  { label: "Following", value: "892" },
];

export const Default: Story = {
  args: {
    user: sampleUser,
    stats: sampleStats,
    actions: (
      <div className="flex justify-center gap-x-2">
        <Button variant="primary" size="sm">
          <UserPlusIcon className="mr-1 size-4" />
          Follow
        </Button>
        <Button variant="outline" size="sm">
          <MessageIcon className="mr-1 size-4" />
          Message
        </Button>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const Elevated: Story = {
  args: {
    ...Default.args,
    variant: "elevated",
  },
  decorators: Default.decorators,
};

export const Minimal: Story = {
  args: {
    user: {
      ...sampleUser,
      coverSrc: undefined,
    },
    variant: "minimal",
    showCover: false,
    actions: (
      <div className="flex gap-x-2">
        <Button variant="primary" size="sm">Follow</Button>
        <Button variant="ghost" size="sm">
          <SettingsIcon className="size-4" />
        </Button>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export const WithoutCover: Story = {
  args: {
    user: {
      ...sampleUser,
      coverSrc: undefined,
    },
    stats: sampleStats,
    showCover: false,
    actions: (
      <Button variant="primary" size="sm" className="w-full">
        Follow
      </Button>
    ),
  },
  decorators: Default.decorators,
};

export const WithoutStats: Story = {
  args: {
    user: sampleUser,
    actions: (
      <Button variant="primary" size="sm">
        Follow
      </Button>
    ),
  },
  decorators: Default.decorators,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-8">
      <div className="w-64">
        <UserProfileCard
          size="sm"
          user={sampleUser}
          stats={sampleStats.slice(0, 2)}
        />
      </div>
      <div className="w-80">
        <UserProfileCard
          size="md"
          user={sampleUser}
          stats={sampleStats}
        />
      </div>
      <div className="w-96">
        <UserProfileCard
          size="lg"
          user={sampleUser}
          stats={sampleStats}
        />
      </div>
    </div>
  ),
};

export const TeamMember: Story = {
  args: {
    user: {
      name: "Sarah Johnson",
      role: "Product Designer",
      avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      coverSrc: "https://images.unsplash.com/photo-1557683316-973673baf926?w=600&h=200&fit=crop",
      bio: "Creating intuitive designs that solve real problems.",
      location: "New York, NY",
    },
    stats: [
      { label: "Projects", value: 47 },
      { label: "Reviews", value: "4.9" },
    ],
    actions: (
      <div className="flex justify-center gap-x-2">
        <Button variant="outline" size="sm">View Profile</Button>
        <Button variant="primary" size="sm">Contact</Button>
      </div>
    ),
  },
  decorators: Default.decorators,
};

export const Unverified: Story = {
  args: {
    user: {
      ...sampleUser,
      verified: false,
    },
    stats: sampleStats,
  },
  decorators: Default.decorators,
};

// Mini Profile Card Stories
export const Mini: StoryObj<typeof MiniProfileCard> = {
  render: () => (
    <div className="w-96 space-y-4">
      <MiniProfileCard
        user={{
          name: "John Doe",
          avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          subtitle: "Software Developer",
        }}
        action={
          <Button variant="primary" size="sm">Follow</Button>
        }
      />
      <MiniProfileCard
        user={{
          name: "Sarah Johnson",
          avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
          subtitle: "Product Designer",
        }}
        action={
          <Button variant="outline" size="sm">Following</Button>
        }
      />
      <MiniProfileCard
        user={{
          name: "Mike Chen",
          avatarFallback: "MC",
          subtitle: "Project Manager",
        }}
        action={
          <Button variant="primary" size="sm">Follow</Button>
        }
      />
    </div>
  ),
};

export const ProfileGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {[
        {
          name: "Alex Kim",
          role: "Frontend Developer",
          avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          stats: [{ label: "Projects", value: 23 }, { label: "Reviews", value: "4.8" }],
        },
        {
          name: "Emily Wang",
          role: "UX Designer",
          avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          stats: [{ label: "Projects", value: 31 }, { label: "Reviews", value: "4.9" }],
        },
        {
          name: "David Lee",
          role: "Backend Developer",
          avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
          stats: [{ label: "Projects", value: 18 }, { label: "Reviews", value: "4.7" }],
        },
      ].map((user, index) => (
        <div key={index} className="w-64">
          <UserProfileCard
            size="sm"
            showCover={false}
            user={user}
            stats={user.stats}
            actions={
              <Button variant="outline" size="sm" className="w-full">
                View Profile
              </Button>
            }
          />
        </div>
      ))}
    </div>
  ),
};
