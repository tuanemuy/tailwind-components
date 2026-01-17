import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/atoms/Badge";
import {
  CalendarIcon,
  DownloadIcon,
  FileIcon,
  FolderIcon,
  ImageIcon,
  LinkIcon,
  MailIcon,
  PlusIcon,
  SettingsIcon,
  ShareIcon,
  UploadIcon,
  UserIcon,
} from "@/components/icons";
import {
  MiniQuickActionCard,
  QuickActionCard,
  QuickActionGrid,
  QuickActionList,
} from "./index";

const meta: Meta<typeof QuickActionCard> = {
  title: "Organisms/PageSections/QuickActionCard",
  component: QuickActionCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "ghost", "outlined"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuickActionCard>;

export const Default: Story = {
  args: {
    icon: <PlusIcon className="size-full" />,
    title: "Create new project",
    description: "Start a new project from scratch",
    onClick: () => console.log("Clicked"),
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const WithArrow: Story = {
  args: {
    icon: <FileIcon className="size-full" />,
    title: "View documents",
    description: "Browse all your documents",
    showArrow: true,
    href: "#",
  },
  decorators: Default.decorators,
};

export const WithBadge: Story = {
  args: {
    icon: <MailIcon className="size-full" />,
    title: "Inbox",
    description: "View your messages",
    badge: (
      <Badge variant="default" size="sm">
        5 new
      </Badge>
    ),
    onClick: () => console.log("Clicked"),
  },
  decorators: Default.decorators,
};

export const Primary: Story = {
  args: {
    variant: "primary",
    icon: <PlusIcon className="size-full" />,
    title: "New project",
    description: "Create something new",
    onClick: () => console.log("Clicked"),
  },
  decorators: Default.decorators,
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    icon: <SettingsIcon className="size-full" />,
    title: "Settings",
    description: "Manage preferences",
    onClick: () => console.log("Clicked"),
  },
  decorators: Default.decorators,
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    icon: <UserIcon className="size-full" />,
    title: "Profile",
    description: "View your profile",
    showArrow: true,
    href: "#",
  },
  decorators: Default.decorators,
};

export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <QuickActionCard
        size="sm"
        icon={<FileIcon className="size-full" />}
        title="Small action"
        description="Compact size"
      />
      <QuickActionCard
        size="md"
        icon={<FileIcon className="size-full" />}
        title="Medium action"
        description="Default size"
      />
      <QuickActionCard
        size="lg"
        icon={<FileIcon className="size-full" />}
        title="Large action"
        description="Larger size"
      />
    </div>
  ),
};

// Grid layout
export const Grid: Story = {
  render: () => (
    <QuickActionGrid columns={2}>
      <QuickActionCard
        icon={<PlusIcon className="size-full" />}
        title="New document"
        description="Create a new document"
        onClick={() => console.log("New document")}
      />
      <QuickActionCard
        icon={<FolderIcon className="size-full" />}
        title="New folder"
        description="Create a new folder"
        onClick={() => console.log("New folder")}
      />
      <QuickActionCard
        icon={<UploadIcon className="size-full" />}
        title="Upload files"
        description="Upload from your computer"
        onClick={() => console.log("Upload")}
      />
      <QuickActionCard
        icon={<LinkIcon className="size-full" />}
        title="Add link"
        description="Link external resources"
        onClick={() => console.log("Add link")}
      />
    </QuickActionGrid>
  ),
};

export const GridThreeColumns: Story = {
  render: () => (
    <QuickActionGrid columns={3}>
      <QuickActionCard
        icon={<FileIcon className="size-full" />}
        title="Documents"
        description="89 files"
        showArrow
        href="#"
      />
      <QuickActionCard
        icon={<ImageIcon className="size-full" />}
        title="Images"
        description="234 files"
        showArrow
        href="#"
      />
      <QuickActionCard
        icon={<FolderIcon className="size-full" />}
        title="Projects"
        description="12 projects"
        showArrow
        href="#"
      />
    </QuickActionGrid>
  ),
};

// Mini cards
export const Mini: Story = {
  render: () => (
    <div className="flex gap-2">
      <MiniQuickActionCard
        icon={<PlusIcon className="size-full" />}
        label="New"
        onClick={() => console.log("New")}
      />
      <MiniQuickActionCard
        icon={<UploadIcon className="size-full" />}
        label="Upload"
        onClick={() => console.log("Upload")}
      />
      <MiniQuickActionCard
        icon={<ShareIcon className="size-full" />}
        label="Share"
        onClick={() => console.log("Share")}
        active
      />
      <MiniQuickActionCard
        icon={<DownloadIcon className="size-full" />}
        label="Export"
        onClick={() => console.log("Export")}
      />
    </div>
  ),
};

// Quick action list
export const List: StoryObj<typeof QuickActionList> = {
  render: () => (
    <QuickActionList
      items={[
        {
          icon: <PlusIcon className="size-full" />,
          label: "New",
          onClick: () => console.log("New"),
        },
        {
          icon: <UploadIcon className="size-full" />,
          label: "Upload",
          onClick: () => console.log("Upload"),
        },
        {
          icon: <DownloadIcon className="size-full" />,
          label: "Download",
          onClick: () => console.log("Download"),
        },
        {
          icon: <ShareIcon className="size-full" />,
          label: "Share",
          onClick: () => console.log("Share"),
        },
      ]}
    />
  ),
};

// Dashboard quick actions
export const DashboardActions: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Quick Actions</h3>
      <QuickActionGrid columns={4}>
        <QuickActionCard
          variant="outlined"
          size="sm"
          icon={<PlusIcon className="size-full" />}
          title="New Project"
          onClick={() => console.log("New project")}
        />
        <QuickActionCard
          variant="outlined"
          size="sm"
          icon={<CalendarIcon className="size-full" />}
          title="Schedule Meeting"
          onClick={() => console.log("Schedule")}
        />
        <QuickActionCard
          variant="outlined"
          size="sm"
          icon={<MailIcon className="size-full" />}
          title="Send Message"
          badge={
            <Badge variant="destructive" size="sm">
              3
            </Badge>
          }
          onClick={() => console.log("Send message")}
        />
        <QuickActionCard
          variant="outlined"
          size="sm"
          icon={<SettingsIcon className="size-full" />}
          title="Settings"
          onClick={() => console.log("Settings")}
        />
      </QuickActionGrid>
    </div>
  ),
};

export const FileActions: Story = {
  render: () => (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">
        Create new
      </h3>
      <QuickActionGrid columns={2}>
        <QuickActionCard
          variant="ghost"
          icon={<FileIcon className="size-full" />}
          title="Document"
          description="Create a new text document"
        />
        <QuickActionCard
          variant="ghost"
          icon={<FolderIcon className="size-full" />}
          title="Folder"
          description="Organize your files"
        />
        <QuickActionCard
          variant="ghost"
          icon={<ImageIcon className="size-full" />}
          title="Image"
          description="Upload an image"
        />
        <QuickActionCard
          variant="ghost"
          icon={<LinkIcon className="size-full" />}
          title="Link"
          description="Add a web link"
        />
      </QuickActionGrid>
    </div>
  ),
};
