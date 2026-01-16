import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { SectionNav } from "@/components/organisms/SectionNav";
import {
  ChevronLeftIcon,
  DownloadIcon,
  FileIcon,
  FilterIcon,
  FolderIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
} from "@/lib/icons";
import {
  FilterableTitleBar,
  SimpleTitleBar,
  StatusTitleBar,
  TabbedTitleBar,
  TitleBar,
} from "./index";

const meta: Meta<typeof TitleBar> = {
  title: "Organisms/PageSections/TitleBar",
  component: TitleBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "card"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    titleSize: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TitleBar>;

export const Default: Story = {
  args: {
    title: "Page Title",
    subtitle: "A brief description of this page",
  },
};

export const WithActions: Story = {
  args: {
    title: "Projects",
    subtitle: "Manage your projects",
    actions: (
      <>
        <Button variant="outline">
          <DownloadIcon className="mr-2 size-4" />
          Export
        </Button>
        <Button variant="primary">
          <PlusIcon className="mr-2 size-4" />
          New Project
        </Button>
      </>
    ),
  },
};

export const Bordered: Story = {
  args: {
    title: "Settings",
    subtitle: "Manage your account settings and preferences",
    variant: "bordered",
    actions: <Button variant="primary">Save Changes</Button>,
  },
};

export const Card: Story = {
  args: {
    title: "Dashboard",
    subtitle: "Overview of your activity",
    variant: "card",
    actions: (
      <Button variant="outline" size="sm">
        <SettingsIcon className="mr-2 size-4" />
        Customize
      </Button>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    title: "Documents",
    subtitle: "All your files in one place",
    icon: <FolderIcon className="size-full" />,
    actions: (
      <Button variant="primary">
        <PlusIcon className="mr-2 size-4" />
        Upload
      </Button>
    ),
  },
};

export const WithBadge: Story = {
  args: {
    title: "Notifications",
    badge: (
      <Badge variant="default" size="sm">
        12 new
      </Badge>
    ),
    actions: (
      <Button variant="ghost" size="sm">
        Mark all read
      </Button>
    ),
  },
};

export const WithBackButton: Story = {
  args: {
    title: "Edit Project",
    backButton: (
      <Button variant="ghost" size="sm" className="-ml-2">
        <ChevronLeftIcon className="size-4" />
      </Button>
    ),
    actions: (
      <>
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Save</Button>
      </>
    ),
  },
};

export const TitleSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <TitleBar title="Small Title" titleSize="sm" subtitle="With sm size" />
      <TitleBar
        title="Medium Title"
        titleSize="md"
        subtitle="With md size (default)"
      />
      <TitleBar title="Large Title" titleSize="lg" subtitle="With lg size" />
      <TitleBar
        title="Extra Large Title"
        titleSize="xl"
        subtitle="With xl size"
      />
    </div>
  ),
};

// Simple Title Bar
export const Simple: StoryObj<typeof SimpleTitleBar> = {
  render: () => (
    <SimpleTitleBar
      title="Team Members"
      description="Manage your team and their permissions"
      primaryAction={{
        label: "Invite Member",
        onClick: () => console.log("Invite"),
        icon: <PlusIcon className="size-full" />,
      }}
      secondaryAction={{
        label: "Export",
        onClick: () => console.log("Export"),
      }}
    />
  ),
};

// Tabbed Title Bar
export const WithTabs: StoryObj<typeof TabbedTitleBar> = {
  render: () => (
    <TabbedTitleBar
      title="Project Settings"
      subtitle="Configure your project"
      actions={<Button variant="primary">Save Changes</Button>}
      tabs={
        <SectionNav
          variant="underline"
          defaultValue="general"
          items={[
            { value: "general", label: "General" },
            { value: "members", label: "Members" },
            { value: "billing", label: "Billing" },
            { value: "integrations", label: "Integrations" },
          ]}
        />
      }
    />
  ),
};

// Filterable Title Bar
export const WithFilters: StoryObj<typeof FilterableTitleBar> = {
  render: () => (
    <FilterableTitleBar
      title="All Files"
      subtitle="Browse and manage your files"
      searchInput={
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search files..."
            className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      }
      filters={
        <>
          <Button variant="outline" size="sm">
            <FilterIcon className="mr-2 size-4" />
            Filters
          </Button>
          <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
            <option>All types</option>
            <option>Documents</option>
            <option>Images</option>
            <option>Videos</option>
          </select>
        </>
      }
      actions={
        <Button variant="primary">
          <PlusIcon className="mr-2 size-4" />
          Upload
        </Button>
      }
    />
  ),
};

// Status Title Bar
export const WithStatus: StoryObj<typeof StatusTitleBar> = {
  render: () => (
    <div className="space-y-8">
      <StatusTitleBar
        title="Project Alpha"
        status={{ label: "Active", variant: "success" }}
        actions={<Button variant="outline">Edit</Button>}
      />
      <StatusTitleBar
        title="Project Beta"
        status={{ label: "In Progress", variant: "warning" }}
        actions={<Button variant="outline">Edit</Button>}
      />
      <StatusTitleBar
        title="Project Gamma"
        status={{ label: "Draft", variant: "default" }}
        actions={<Button variant="outline">Edit</Button>}
      />
    </div>
  ),
};

export const DashboardHeader: Story = {
  args: {
    title: "Dashboard",
    titleSize: "lg",
    subtitle: "Welcome back, John! Here's what's happening with your projects.",
    actions: (
      <div className="flex items-center gap-x-3">
        <select className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
        <Button variant="outline">
          <DownloadIcon className="mr-2 size-4" />
          Export
        </Button>
      </div>
    ),
  },
};

export const ProjectDetail: Story = {
  args: {
    title: "E-Commerce Platform",
    icon: <FileIcon className="size-full" />,
    badge: (
      <Badge variant="success" size="sm">
        Active
      </Badge>
    ),
    subtitle: "Created on Jan 15, 2024 • Last updated 2 hours ago",
    backButton: (
      <Button variant="ghost" size="sm" className="-ml-2">
        <ChevronLeftIcon className="size-4" />
        <span className="ml-1">Back to projects</span>
      </Button>
    ),
    actions: (
      <>
        <Button variant="ghost" size="sm">
          <SettingsIcon className="size-4" />
        </Button>
        <Button variant="outline">Share</Button>
        <Button variant="primary">
          <PlusIcon className="mr-2 size-4" />
          Add Task
        </Button>
      </>
    ),
  },
};
