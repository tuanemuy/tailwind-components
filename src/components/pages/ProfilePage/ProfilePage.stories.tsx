import type { Meta, StoryObj } from "@storybook/react";
import { FileIcon, GlobeIcon, MessageSquareIcon, StarIcon } from "@/components/icons";
import { ProfilePage, ProfilePageSkeleton } from ".";

const meta: Meta<typeof ProfilePage> = {
  title: "Pages/ProfilePage",
  component: ProfilePage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "minimal", "detailed"],
    },
    layout: {
      control: "select",
      options: ["centered", "sidebar", "full-width"],
    },
    isOwnProfile: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

// Sample user data
const sampleUser = {
  id: "user-1",
  name: "John Doe",
  username: "@johndoe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
  coverImage:
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=1200&q=80",
  bio: "Senior Software Engineer passionate about building great products. Open source contributor and tech enthusiast.",
  role: "Senior Software Engineer",
  company: "Tech Corp",
  location: "San Francisco, CA",
  website: "https://johndoe.dev",
  joinDate: "January 2023",
  verified: true,
  stats: [
    { label: "Projects", value: 42 },
    { label: "Followers", value: "1.2k" },
    { label: "Following", value: 256 },
  ],
  social: {
    twitter: "https://twitter.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
  },
};

// Sample activities
const sampleActivities = [
  {
    id: "1",
    type: "create",
    description: 'Created a new project "Dashboard Redesign"',
    timestamp: "2 hours ago",
    icon: <FileIcon className="size-4" />,
  },
  {
    id: "2",
    type: "complete",
    description: 'Completed task "Update user authentication"',
    timestamp: "5 hours ago",
    icon: <StarIcon className="size-4" />,
  },
  {
    id: "3",
    type: "comment",
    description: 'Commented on "API Integration" discussion',
    timestamp: "1 day ago",
    icon: <MessageSquareIcon className="size-4" />,
  },
];

// Logo component
const Logo = () => (
  <div className="flex items-center gap-x-2">
    <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
      <GlobeIcon className="size-5 text-primary-foreground" />
    </div>
    <span className="text-xl font-bold text-foreground">Preline</span>
  </div>
);

// Default profile page
export const Default: Story = {
  args: {
    user: sampleUser,
    activities: sampleActivities,
    logo: <Logo />,
    onEdit: () => console.log("Edit profile"),
    onMessage: () => console.log("Message user"),
    onFollow: () => console.log("Follow user"),
    onSettings: () => console.log("Open settings"),
  },
};

// Own profile
export const OwnProfile: Story = {
  args: {
    user: sampleUser,
    activities: sampleActivities,
    isOwnProfile: true,
    logo: <Logo />,
    onEdit: () => console.log("Edit profile"),
    onSettings: () => console.log("Open settings"),
  },
};

// Sidebar layout
export const SidebarLayout: Story = {
  args: {
    user: sampleUser,
    activities: sampleActivities,
    layout: "sidebar",
    logo: <Logo />,
    onEdit: () => console.log("Edit profile"),
    onMessage: () => console.log("Message user"),
  },
};

// Minimal variant
export const Minimal: Story = {
  args: {
    user: {
      ...sampleUser,
      coverImage: undefined,
    },
    variant: "minimal",
    logo: <Logo />,
    onEdit: () => console.log("Edit profile"),
    onMessage: () => console.log("Message user"),
  },
};

// With tabs
export const WithTabs: Story = {
  args: {
    user: sampleUser,
    logo: <Logo />,
    tabs: [
      {
        id: "overview",
        label: "Overview",
        content: (
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">
              Overview content goes here...
            </p>
          </div>
        ),
      },
      {
        id: "projects",
        label: "Projects",
        content: (
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">Projects list goes here...</p>
          </div>
        ),
      },
      {
        id: "activity",
        label: "Activity",
        content: (
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">Activity feed goes here...</p>
          </div>
        ),
      },
    ],
    onEdit: () => console.log("Edit profile"),
  },
};

// No social links
export const WithoutSocial: Story = {
  args: {
    user: {
      ...sampleUser,
      social: undefined,
    },
    activities: sampleActivities,
    logo: <Logo />,
  },
};

// Skeleton loading state
export const Skeleton: StoryObj<typeof ProfilePageSkeleton> = {
  render: () => <ProfilePageSkeleton />,
};
