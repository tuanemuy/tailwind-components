import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState, NoData, NoResults, NoUsers, NoFiles } from "./index";
import { Button } from "@/components/atoms";
import { PlusIcon, UploadIcon, SearchIcon, MailIcon } from "@/lib/icons";

const meta: Meta<typeof EmptyState> = {
  title: "Molecules/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <SearchIcon />,
    title: "No results found",
    description: "Try adjusting your search or filter to find what you're looking for.",
    className: "w-[400px]",
  },
};

export const WithAction: Story = {
  args: {
    icon: <PlusIcon />,
    title: "No projects yet",
    description: "Get started by creating your first project.",
    action: (
      <Button leftIcon={<PlusIcon className="size-4" />}>
        Create Project
      </Button>
    ),
    className: "w-[400px]",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    icon: <SearchIcon />,
    title: "No results",
    description: "Try a different search term.",
    className: "w-[300px]",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    icon: <MailIcon />,
    title: "Your inbox is empty",
    description: "When you receive messages, they will appear here.",
    className: "w-[500px]",
  },
};

export const NoDataVariant: Story = {
  render: () => (
    <NoData
      description="There is no data to display at this time."
      action={<Button variant="outline">Refresh</Button>}
      className="w-[400px]"
    />
  ),
};

export const NoResultsVariant: Story = {
  render: () => (
    <NoResults
      query="design system"
      action={<Button variant="outline">Clear search</Button>}
      className="w-[400px]"
    />
  ),
};

export const NoUsersVariant: Story = {
  render: () => (
    <NoUsers
      description="Invite team members to collaborate on this project."
      action={<Button>Invite Team Members</Button>}
      className="w-[400px]"
    />
  ),
};

export const NoFilesVariant: Story = {
  render: () => (
    <NoFiles
      description="Upload files to get started."
      action={
        <Button leftIcon={<UploadIcon className="size-4" />}>
          Upload Files
        </Button>
      }
      className="w-[400px]"
    />
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-[500px] rounded-lg border border-border bg-card p-6">
      <EmptyState
        icon={<SearchIcon />}
        title="No results found"
        description="We couldn't find any items matching your criteria."
        action={
          <div className="flex gap-x-2">
            <Button variant="outline">Clear Filters</Button>
            <Button>Browse All</Button>
          </div>
        }
      />
    </div>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <EmptyState
      icon={<MailIcon />}
      title="Check your email"
      className="w-[400px]"
    >
      <p className="text-sm text-muted-foreground">
        We sent a verification link to{" "}
        <span className="font-medium text-foreground">user@example.com</span>
      </p>
      <div className="mt-4 flex gap-x-2">
        <Button variant="outline" size="sm">Resend Email</Button>
        <Button size="sm">Open Email App</Button>
      </div>
    </EmptyState>
  ),
};

export const MinimalStyle: Story = {
  render: () => (
    <EmptyState
      title="Nothing here yet"
      description="Start adding items to see them here."
      className="w-[300px]"
    />
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="rounded-lg border border-border p-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Small</p>
        <EmptyState
          size="sm"
          icon={<SearchIcon />}
          title="No results"
          description="Try a different search."
        />
      </div>
      <div className="rounded-lg border border-border p-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Medium</p>
        <EmptyState
          size="md"
          icon={<SearchIcon />}
          title="No results found"
          description="Try adjusting your search or filters."
        />
      </div>
      <div className="rounded-lg border border-border p-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Large</p>
        <EmptyState
          size="lg"
          icon={<SearchIcon />}
          title="No results found"
          description="We couldn't find anything matching your search. Try different keywords."
        />
      </div>
    </div>
  ),
};
