import type { Meta, StoryObj } from "@storybook/react";
import {
  ActivityFeed,
  CompactActivityFeed,
  GroupedActivityFeed,
  NotificationActivity,
} from "./index";
import { Badge } from "@/components/atoms/Badge";
import {
  MessageIcon,
  CheckIcon,
  HeartIcon,
  ShareIcon,
  UserPlusIcon,
  CalendarIcon,
  FileIcon,
} from "@/lib/icons";

const meta: Meta<typeof ActivityFeed> = {
  title: "Organisms/PageSections/ActivityFeed",
  component: ActivityFeed,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ActivityFeed>;

const sampleActivities = [
  {
    id: "1",
    type: "comment" as const,
    user: {
      name: "John Doe",
      avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    action: "commented on",
    target: { name: "Project Alpha", href: "#" },
    timestamp: "5 minutes ago",
    content: (
      <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
        "This looks great! Let's schedule a review meeting to discuss the next steps."
      </div>
    ),
  },
  {
    id: "2",
    type: "update" as const,
    user: {
      name: "Sarah Smith",
      avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
    },
    action: "updated the status of",
    target: { name: "Task #123" },
    timestamp: "1 hour ago",
    metadata: (
      <div className="flex items-center gap-x-2">
        <Badge variant="warning" size="sm">In Progress</Badge>
        <span className="text-muted-foreground">→</span>
        <Badge variant="success" size="sm">Completed</Badge>
      </div>
    ),
  },
  {
    id: "3",
    type: "create" as const,
    user: {
      name: "Mike Chen",
    },
    action: "created",
    target: { name: "New Feature Request", href: "#" },
    timestamp: "3 hours ago",
  },
  {
    id: "4",
    type: "assign" as const,
    user: {
      name: "Emily Wang",
      avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    action: "assigned",
    target: { name: "Bug Fix #456" },
    timestamp: "Yesterday",
    metadata: (
      <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
        <span>Assigned to:</span>
        <span className="font-medium text-foreground">John Doe</span>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    activities: sampleActivities,
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export const WithHeader: Story = {
  args: {
    title: "Project Activity",
    showHeader: true,
    activities: sampleActivities,
  },
  decorators: Default.decorators,
};

export const WithLoadMore: Story = {
  args: {
    activities: sampleActivities,
    hasMore: true,
    onLoadMore: () => console.log("Load more clicked"),
  },
  decorators: Default.decorators,
};

export const LimitedItems: Story = {
  args: {
    activities: sampleActivities,
    maxItems: 2,
    hasMore: true,
    onLoadMore: () => console.log("Load more clicked"),
  },
  decorators: Default.decorators,
};

export const Empty: Story = {
  args: {
    activities: [],
    emptyMessage: "No recent activity to show",
  },
  decorators: Default.decorators,
};

// Compact Activity Feed
export const Compact: StoryObj<typeof CompactActivityFeed> = {
  render: () => (
    <div className="max-w-xs">
      <CompactActivityFeed
        activities={[
          {
            id: "1",
            icon: <MessageIcon className="size-full" />,
            text: (
              <span><strong>John</strong> commented on your post</span>
            ),
            timestamp: "5 min ago",
          },
          {
            id: "2",
            icon: <HeartIcon className="size-full" />,
            text: (
              <span><strong>Sarah</strong> liked your photo</span>
            ),
            timestamp: "1 hour ago",
          },
          {
            id: "3",
            icon: <UserPlusIcon className="size-full" />,
            text: (
              <span><strong>Mike</strong> started following you</span>
            ),
            timestamp: "2 hours ago",
          },
          {
            id: "4",
            icon: <ShareIcon className="size-full" />,
            text: (
              <span><strong>Emily</strong> shared your post</span>
            ),
            timestamp: "Yesterday",
          },
        ]}
      />
    </div>
  ),
};

// Grouped Activity Feed
export const Grouped: StoryObj<typeof GroupedActivityFeed> = {
  render: () => (
    <div className="max-w-lg">
      <GroupedActivityFeed
        groups={[
          {
            date: "Today",
            activities: [
              {
                id: "1",
                type: "comment",
                user: { name: "John Doe", avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
                action: "commented on",
                target: { name: "Project Alpha" },
                timestamp: "5 minutes ago",
              },
              {
                id: "2",
                type: "update",
                user: { name: "Sarah Smith" },
                action: "updated",
                target: { name: "Task #123" },
                timestamp: "2 hours ago",
              },
            ],
          },
          {
            date: "Yesterday",
            activities: [
              {
                id: "3",
                type: "create",
                user: { name: "Mike Chen" },
                action: "created",
                target: { name: "New Document" },
                timestamp: "Yesterday at 4:30 PM",
              },
            ],
          },
          {
            date: "Last Week",
            activities: [
              {
                id: "4",
                type: "complete",
                user: { name: "Emily Wang" },
                action: "completed",
                target: { name: "Sprint Review" },
                timestamp: "Jan 10, 2024",
              },
            ],
          },
        ]}
      />
    </div>
  ),
};

// Notification Style Activity
export const Notifications: StoryObj<typeof NotificationActivity> = {
  render: () => (
    <div className="max-w-md">
      <NotificationActivity
        onMarkAllRead={() => console.log("Mark all read")}
        activities={[
          {
            id: "1",
            icon: <MessageIcon className="size-4" />,
            iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
            title: (
              <span><strong>John Doe</strong> mentioned you in a comment</span>
            ),
            description: "Hey, can you take a look at this?",
            timestamp: "5 minutes ago",
            unread: true,
            action: {
              label: "View comment",
              onClick: () => console.log("View comment"),
            },
          },
          {
            id: "2",
            icon: <CalendarIcon className="size-4" />,
            iconBg: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
            title: "Meeting starting in 15 minutes",
            description: "Sprint Review with the team",
            timestamp: "10 minutes ago",
            unread: true,
            action: {
              label: "Join meeting",
              onClick: () => console.log("Join meeting"),
            },
          },
          {
            id: "3",
            icon: <CheckIcon className="size-4" />,
            iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
            title: (
              <span><strong>Sarah</strong> completed the task you assigned</span>
            ),
            description: "Bug Fix #456",
            timestamp: "1 hour ago",
            unread: false,
          },
          {
            id: "4",
            icon: <FileIcon className="size-4" />,
            iconBg: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
            title: "New document shared with you",
            description: "Q4 Financial Report.pdf",
            timestamp: "2 hours ago",
            unread: false,
          },
        ]}
      />
    </div>
  ),
};

export const ProjectActivity: Story = {
  args: {
    title: "Project Activity",
    activities: [
      {
        id: "1",
        type: "create" as const,
        user: { name: "John Doe" },
        action: "created the project",
        target: { name: "E-Commerce Platform" },
        timestamp: "Jan 15, 2024",
      },
      {
        id: "2",
        type: "update" as const,
        user: { name: "Sarah Smith" },
        action: "added",
        target: { name: "Mike Chen" },
        timestamp: "Jan 16, 2024",
        metadata: <span className="text-sm text-muted-foreground">as a team member</span>,
      },
      {
        id: "3",
        type: "complete" as const,
        user: { name: "Mike Chen" },
        action: "completed milestone",
        target: { name: "Phase 1: Design" },
        timestamp: "Jan 20, 2024",
        metadata: (
          <Badge variant="success" size="sm">Milestone Complete</Badge>
        ),
      },
      {
        id: "4",
        type: "comment" as const,
        user: { name: "Emily Wang" },
        action: "left feedback on",
        target: { name: "Design Mockups" },
        timestamp: "Jan 21, 2024",
        content: (
          <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
            "The new color scheme looks fantastic! Ready for development."
          </div>
        ),
      },
    ],
  },
  decorators: Default.decorators,
};
