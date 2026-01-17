import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Badge, Button } from "@/components/atoms";
import {
  BellIcon,
  FileIcon,
  FolderIcon,
  MailIcon,
  MoreHorizontalIcon,
  SettingsIcon,
  StarIcon,
  UserIcon,
} from "@/components/icons";
import {
  ActionListGroup,
  CheckableListGroup,
  ListGroup,
  ListGroupItem,
  NumberedListGroup,
} from "./index";

const meta: Meta<typeof ListGroup> = {
  title: "Organisms/DataDisplay/ListGroup",
  component: ListGroup,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "flush", "card"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    hoverable: {
      control: "boolean",
    },
    showArrows: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListGroup>;

// Basic items for demos
const basicItems = [
  { id: "1", label: "First item" },
  { id: "2", label: "Second item" },
  { id: "3", label: "Third item" },
  { id: "4", label: "Fourth item" },
  { id: "5", label: "Fifth item" },
];

// Items with icons
const itemsWithIcons = [
  { id: "1", label: "Profile", icon: <UserIcon className="size-5" /> },
  {
    id: "2",
    label: "Messages",
    icon: <MailIcon className="size-5" />,
    badge: (
      <Badge size="sm" variant="destructive">
        3
      </Badge>
    ),
  },
  { id: "3", label: "Settings", icon: <SettingsIcon className="size-5" /> },
  { id: "4", label: "Notifications", icon: <BellIcon className="size-5" /> },
];

// Items with descriptions
const itemsWithDescriptions = [
  {
    id: "1",
    label: "Project Alpha",
    description: "Web application development",
    icon: <FolderIcon className="size-5" />,
    meta: "2 days ago",
  },
  {
    id: "2",
    label: "Design System",
    description: "Component library and style guide",
    icon: <FolderIcon className="size-5" />,
    meta: "1 week ago",
  },
  {
    id: "3",
    label: "Documentation",
    description: "API and user guides",
    icon: <FileIcon className="size-5" />,
    meta: "3 weeks ago",
  },
];

// ============================================
// Stories
// ============================================

export const Default: Story = {
  args: {
    items: basicItems,
    variant: "default",
  },
};

export const Bordered: Story = {
  args: {
    items: basicItems,
    variant: "bordered",
  },
};

export const Flush: Story = {
  args: {
    items: basicItems,
    variant: "flush",
  },
};

export const Card: Story = {
  args: {
    items: basicItems,
    variant: "card",
  },
};

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
    variant: "default",
    hoverable: true,
  },
};

export const WithDescriptions: Story = {
  args: {
    items: itemsWithDescriptions,
    variant: "default",
    hoverable: true,
    showArrows: true,
  },
};

export const Hoverable: Story = {
  args: {
    items: itemsWithIcons,
    variant: "default",
    hoverable: true,
  },
};

export const WithArrows: Story = {
  args: {
    items: [
      { id: "1", label: "Account settings", href: "#" },
      { id: "2", label: "Privacy settings", href: "#" },
      { id: "3", label: "Notification preferences", href: "#" },
      { id: "4", label: "Security", href: "#" },
    ],
    variant: "default",
    showArrows: true,
    hoverable: true,
  },
};

export const SmallSize: Story = {
  args: {
    items: basicItems,
    variant: "default",
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    items: basicItems,
    variant: "default",
    size: "lg",
  },
};

export const WithActiveItem: Story = {
  args: {
    items: [
      { id: "1", label: "Dashboard", icon: <UserIcon className="size-5" /> },
      {
        id: "2",
        label: "Projects",
        icon: <FolderIcon className="size-5" />,
        active: true,
      },
      { id: "3", label: "Settings", icon: <SettingsIcon className="size-5" /> },
    ],
    variant: "default",
    hoverable: true,
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: "1", label: "Available option" },
      { id: "2", label: "Disabled option", disabled: true },
      { id: "3", label: "Another available option" },
      { id: "4", label: "Also disabled", disabled: true },
    ],
    variant: "default",
    hoverable: true,
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      { id: "1", label: "Inbox", badge: <Badge size="sm">24</Badge> },
      {
        id: "2",
        label: "Drafts",
        badge: (
          <Badge size="sm" variant="secondary">
            5
          </Badge>
        ),
      },
      { id: "3", label: "Sent" },
      {
        id: "4",
        label: "Spam",
        badge: (
          <Badge size="sm" variant="destructive">
            12
          </Badge>
        ),
      },
    ],
    variant: "default",
  },
};

// Action List Group
export const ActionList: StoryObj<typeof ActionListGroup> = {
  render: () => (
    <ActionListGroup
      items={[
        {
          id: "1",
          label: "report-2024.pdf",
          description: "Added 2 days ago",
          icon: <FileIcon className="size-5" />,
          meta: "2.4 MB",
          actions: (
            <>
              <Button variant="ghost" size="sm">
                <StarIcon className="size-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </>
          ),
        },
        {
          id: "2",
          label: "design-assets.zip",
          description: "Added 1 week ago",
          icon: <FileIcon className="size-5" />,
          meta: "15.8 MB",
          actions: (
            <>
              <Button variant="ghost" size="sm">
                <StarIcon className="size-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </>
          ),
        },
        {
          id: "3",
          label: "meeting-notes.doc",
          description: "Added 2 weeks ago",
          icon: <FileIcon className="size-5" />,
          meta: "124 KB",
          actions: (
            <>
              <Button variant="ghost" size="sm">
                <StarIcon className="size-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </>
          ),
        },
      ]}
    />
  ),
};

// Numbered List Group
export const NumberedList: StoryObj<typeof NumberedListGroup> = {
  render: () => (
    <NumberedListGroup
      items={[
        {
          id: "1",
          label: "Create your account",
          description: "Sign up with your email",
        },
        {
          id: "2",
          label: "Set up your profile",
          description: "Add your photo and bio",
        },
        {
          id: "3",
          label: "Connect your accounts",
          description: "Link social media",
        },
        {
          id: "4",
          label: "Start exploring",
          description: "Discover new content",
        },
      ]}
      hoverable
    />
  ),
};

// Checkable List Group
export const CheckableList: StoryObj<typeof CheckableListGroup> = {
  render: function CheckableListDemo() {
    const [items, setItems] = useState([
      { id: "1", label: "Complete project proposal", checked: true },
      { id: "2", label: "Review design mockups", checked: false },
      { id: "3", label: "Update documentation", checked: false },
      { id: "4", label: "Send weekly report", checked: true },
    ]);

    const handleToggle = (id: string, checked: boolean) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, checked } : item)),
      );
    };

    return <CheckableListGroup items={items} onItemToggle={handleToggle} />;
  },
};

// Manual composition example
export const ManualComposition: Story = {
  render: () => (
    <ListGroup variant="default">
      <ListGroupItem icon={<UserIcon className="size-5" />} hoverable>
        Profile
      </ListGroupItem>
      <ListGroupItem
        icon={<MailIcon className="size-5" />}
        badge={
          <Badge size="sm" variant="destructive">
            3
          </Badge>
        }
        hoverable
      >
        Messages
      </ListGroupItem>
      <ListGroupItem icon={<SettingsIcon className="size-5" />} hoverable>
        Settings
      </ListGroupItem>
      <ListGroupItem icon={<BellIcon className="size-5" />} hoverable disabled>
        Notifications (Disabled)
      </ListGroupItem>
    </ListGroup>
  ),
};

// Navigation example
export const NavigationList: Story = {
  render: () => (
    <ListGroup
      variant="flush"
      items={[
        { id: "1", label: "Getting Started", href: "#getting-started" },
        { id: "2", label: "Installation", href: "#installation" },
        {
          id: "3",
          label: "Configuration",
          href: "#configuration",
          active: true,
        },
        { id: "4", label: "Usage", href: "#usage" },
        { id: "5", label: "API Reference", href: "#api" },
      ]}
      showArrows
      hoverable
    />
  ),
};
