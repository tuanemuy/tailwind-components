import type { Meta, StoryObj } from "@storybook/react";
import {
  Timeline,
  TimelineItemComponent,
  ActivityTimeline,
  OrderTimeline,
  HistoryTimeline,
} from "./index";
import {
  CheckIcon,
  EditIcon,
  PlusIcon,
  UploadIcon,
  MailIcon,
  ShoppingBagIcon,
  TruckIcon,
  MapPinIcon,
} from "@/lib/icons";

const meta: Meta<typeof Timeline> = {
  title: "Organisms/PageSections/Timeline",
  component: Timeline,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "compact", "card"],
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    dotSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const basicItems = [
  {
    title: "Application submitted",
    description: "Your application has been received and is being reviewed.",
    timestamp: "Jan 10, 2024",
    dotVariant: "success" as const,
  },
  {
    title: "Under review",
    description: "Our team is currently reviewing your application.",
    timestamp: "Jan 12, 2024",
    dotVariant: "primary" as const,
  },
  {
    title: "Interview scheduled",
    description: "Please check your email for interview details.",
    timestamp: "Pending",
    dotVariant: "default" as const,
  },
];

export const Default: Story = {
  args: {
    items: basicItems,
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export const Compact: Story = {
  args: {
    variant: "compact",
    items: basicItems,
  },
  decorators: Default.decorators,
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        title: "Account created",
        description: "Welcome to the platform!",
        timestamp: "2 hours ago",
        icon: <PlusIcon className="size-4" />,
        dotVariant: "success" as const,
      },
      {
        title: "Profile updated",
        description: "You changed your profile picture.",
        timestamp: "1 hour ago",
        icon: <EditIcon className="size-4" />,
        dotVariant: "primary" as const,
      },
      {
        title: "File uploaded",
        description: "document.pdf was uploaded successfully.",
        timestamp: "30 minutes ago",
        icon: <UploadIcon className="size-4" />,
        dotVariant: "info" as const,
      },
    ],
  },
  decorators: Default.decorators,
};

export const WithAvatars: Story = {
  args: {
    items: [
      {
        title: "John commented on your post",
        description: "Great work! This is exactly what we needed.",
        timestamp: "5 minutes ago",
        avatar: {
          src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          fallback: "JD",
        },
      },
      {
        title: "Sarah approved the document",
        timestamp: "1 hour ago",
        avatar: {
          src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face",
          fallback: "SJ",
        },
      },
      {
        title: "Mike requested changes",
        description: "Please update the financial projections.",
        timestamp: "3 hours ago",
        avatar: {
          fallback: "MC",
        },
      },
    ],
  },
  decorators: Default.decorators,
};

export const DotVariants: Story = {
  render: () => (
    <div className="max-w-lg">
      <Timeline
        items={[
          { title: "Default", dotVariant: "default", timestamp: "Now" },
          { title: "Primary", dotVariant: "primary", timestamp: "Now" },
          { title: "Success", dotVariant: "success", timestamp: "Now" },
          { title: "Warning", dotVariant: "warning", timestamp: "Now" },
          { title: "Error", dotVariant: "error", timestamp: "Now" },
          { title: "Info", dotVariant: "info", timestamp: "Now" },
        ]}
      />
    </div>
  ),
};

export const DotSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="max-w-lg">
        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Small</h4>
        <Timeline dotSize="sm" items={basicItems.slice(0, 2)} />
      </div>
      <div className="max-w-lg">
        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Medium</h4>
        <Timeline dotSize="md" items={basicItems.slice(0, 2)} />
      </div>
      <div className="max-w-lg">
        <h4 className="mb-4 text-sm font-medium text-muted-foreground">Large</h4>
        <Timeline dotSize="lg" items={basicItems.slice(0, 2)} />
      </div>
    </div>
  ),
};

// Activity Timeline
export const Activity: StoryObj<typeof ActivityTimeline> = {
  render: () => (
    <div className="max-w-lg">
      <ActivityTimeline
        activities={[
          {
            user: { name: "John Doe", avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
            action: "created",
            target: "Project Alpha",
            timestamp: "2 hours ago",
            dotVariant: "success",
          },
          {
            user: { name: "Sarah Smith", avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face" },
            action: "commented on",
            target: "Task #123",
            timestamp: "4 hours ago",
            dotVariant: "primary",
          },
          {
            user: { name: "Mike Chen" },
            action: "completed",
            target: "Sprint Review",
            timestamp: "Yesterday",
            dotVariant: "success",
          },
        ]}
      />
    </div>
  ),
};

// Order Timeline
export const OrderTracking: StoryObj<typeof OrderTimeline> = {
  render: () => (
    <div className="max-w-lg">
      <OrderTimeline
        steps={[
          {
            title: "Order placed",
            description: "Your order has been confirmed",
            timestamp: "Jan 15, 2024 10:30 AM",
            completed: true,
          },
          {
            title: "Processing",
            description: "Your order is being prepared",
            timestamp: "Jan 15, 2024 2:00 PM",
            completed: true,
          },
          {
            title: "Shipped",
            description: "Your package is on its way",
            timestamp: "Jan 16, 2024 9:00 AM",
            completed: true,
          },
          {
            title: "Out for delivery",
            description: "Package is with the delivery driver",
            timestamp: "Jan 17, 2024",
            current: true,
          },
          {
            title: "Delivered",
            description: "Package will be delivered today",
            timestamp: "Expected by 6:00 PM",
          },
        ]}
      />
    </div>
  ),
};

// History Timeline
export const ChangeHistory: StoryObj<typeof HistoryTimeline> = {
  render: () => (
    <div className="max-w-lg">
      <HistoryTimeline
        history={[
          {
            title: "Status changed",
            timestamp: "Today at 3:45 PM",
            user: { name: "John Doe" },
            changes: [
              { field: "Status", oldValue: "In Progress", newValue: "Completed" },
            ],
          },
          {
            title: "Priority updated",
            timestamp: "Today at 2:30 PM",
            user: { name: "Sarah Smith" },
            changes: [
              { field: "Priority", oldValue: "Medium", newValue: "High" },
              { field: "Due date", newValue: "Jan 20, 2024" },
            ],
          },
          {
            title: "Task created",
            timestamp: "Yesterday at 10:00 AM",
            user: { name: "Mike Chen" },
          },
        ]}
      />
    </div>
  ),
};

export const WithContent: Story = {
  args: {
    items: [
      {
        title: "New message received",
        timestamp: "Just now",
        dotVariant: "info" as const,
        icon: <MailIcon className="size-4" />,
        content: (
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-sm text-muted-foreground">
              "Hey, just checking in on the project status. Let me know if you need any help!"
            </p>
            <p className="mt-2 text-xs text-muted-foreground">From: team@example.com</p>
          </div>
        ),
      },
      {
        title: "File uploaded",
        description: "quarterly_report.pdf",
        timestamp: "2 hours ago",
        dotVariant: "success" as const,
        icon: <UploadIcon className="size-4" />,
        content: (
          <div className="flex items-center gap-x-3 rounded-lg border border-border bg-card p-3">
            <div className="rounded bg-muted p-2">
              <UploadIcon className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">quarterly_report.pdf</p>
              <p className="text-xs text-muted-foreground">2.4 MB</p>
            </div>
          </div>
        ),
      },
    ],
  },
  decorators: Default.decorators,
};

export const DeliveryTracking: Story = {
  args: {
    dotSize: "lg",
    items: [
      {
        title: "Order Placed",
        description: "Order #ORD-12345 confirmed",
        timestamp: "Mon, Jan 15",
        icon: <CheckIcon className="size-5" />,
        dotVariant: "success" as const,
      },
      {
        title: "Packed",
        description: "Package prepared for shipping",
        timestamp: "Tue, Jan 16",
        icon: <ShoppingBagIcon className="size-5" />,
        dotVariant: "success" as const,
      },
      {
        title: "Shipped",
        description: "In transit to your location",
        timestamp: "Wed, Jan 17",
        icon: <TruckIcon className="size-5" />,
        dotVariant: "primary" as const,
      },
      {
        title: "Delivered",
        description: "Estimated delivery",
        timestamp: "Fri, Jan 19",
        icon: <MapPinIcon className="size-5" />,
        dotVariant: "default" as const,
      },
    ],
  },
  decorators: Default.decorators,
};

export const Composable: Story = {
  render: () => (
    <div className="max-w-lg">
      <Timeline>
        <TimelineItemComponent
          title="Custom item 1"
          description="With custom styling"
          timestamp="Now"
          dotVariant="primary"
        />
        <TimelineItemComponent
          title="Custom item 2"
          timestamp="1 hour ago"
          avatar={{ src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", fallback: "JD" }}
        />
        <TimelineItemComponent
          title="Custom item 3"
          timestamp="2 hours ago"
          icon={<CheckIcon className="size-4" />}
          dotVariant="success"
          isLast
        />
      </Timeline>
    </div>
  ),
};
