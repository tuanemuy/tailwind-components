import type { Meta, StoryObj } from "@storybook/react";
import { ProjectSummaryCard, ProjectSummaryGrid } from "./index";
import { FolderIcon, CodeIcon, LayoutIcon, DatabaseIcon } from "@/lib/icons";
import { Button } from "@/components/atoms/Button";

const meta: Meta<typeof ProjectSummaryCard> = {
  title: "Organisms/Cards/ProjectSummaryCard",
  component: ProjectSummaryCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProjectSummaryCard>;

const sampleProject = {
  id: "1",
  name: "Website Redesign",
  description: "Complete overhaul of the company website with modern design and improved UX",
  status: "active" as const,
  progress: 65,
  dueDate: "Jan 15, 2026",
  startDate: "Dec 1, 2025",
  category: "Design",
  priority: "high" as const,
  tasksTotal: 24,
  tasksCompleted: 16,
  icon: <LayoutIcon className="size-5" />,
  members: [
    { name: "John Doe", avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    { name: "Jane Smith", avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face" },
    { name: "Bob Wilson", avatarSrc: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150&h=150&fit=crop&crop=face" },
  ],
};

export const Default: Story = {
  args: {
    project: sampleProject,
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const Compact: Story = {
  args: {
    project: sampleProject,
    variant: "compact",
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export const Detailed: Story = {
  args: {
    project: sampleProject,
    variant: "detailed",
  },
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

export const Mini: Story = {
  args: {
    project: sampleProject,
    variant: "mini",
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const WithoutProgress: Story = {
  args: {
    project: sampleProject,
    showProgress: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const WithoutMembers: Story = {
  args: {
    project: sampleProject,
    showMembers: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const WithActions: Story = {
  args: {
    project: sampleProject,
    actions: (
      <div className="flex justify-end gap-x-2">
        <Button variant="outline" size="sm">View Details</Button>
        <Button size="sm">Open</Button>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const CompletedProject: Story = {
  args: {
    project: {
      ...sampleProject,
      status: "completed",
      progress: 100,
      tasksCompleted: 24,
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const OnHoldProject: Story = {
  args: {
    project: {
      ...sampleProject,
      status: "on-hold",
      progress: 35,
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

const projects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website",
    status: "active" as const,
    progress: 65,
    dueDate: "Jan 15, 2026",
    priority: "high" as const,
    tasksTotal: 24,
    tasksCompleted: 16,
    icon: <LayoutIcon className="size-5" />,
    members: [
      { name: "John Doe", avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" },
      { name: "Jane Smith", avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
    ],
  },
  {
    id: "2",
    name: "API Development",
    description: "Build REST API for mobile app",
    status: "active" as const,
    progress: 45,
    dueDate: "Feb 1, 2026",
    priority: "medium" as const,
    tasksTotal: 18,
    tasksCompleted: 8,
    icon: <CodeIcon className="size-5" />,
    members: [
      { name: "Bob Wilson", avatarSrc: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150" },
    ],
  },
  {
    id: "3",
    name: "Database Migration",
    description: "Migrate to new database system",
    status: "completed" as const,
    progress: 100,
    dueDate: "Dec 20, 2025",
    priority: "urgent" as const,
    tasksTotal: 12,
    tasksCompleted: 12,
    icon: <DatabaseIcon className="size-5" />,
    members: [
      { name: "Sarah Johnson", avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" },
      { name: "Mike Brown", avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
    ],
  },
  {
    id: "4",
    name: "Mobile App",
    description: "Cross-platform mobile application",
    status: "on-hold" as const,
    progress: 20,
    dueDate: "Mar 1, 2026",
    priority: "low" as const,
    tasksTotal: 30,
    tasksCompleted: 6,
    icon: <FolderIcon className="size-5" />,
    members: [
      { name: "Emily Davis", avatarSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150" },
    ],
  },
];

export const Grid: StoryObj<typeof ProjectSummaryGrid> = {
  render: () => (
    <div className="w-[900px]">
      <ProjectSummaryGrid
        projects={projects}
        columns={3}
      />
    </div>
  ),
};

export const GridCompact: StoryObj<typeof ProjectSummaryGrid> = {
  render: () => (
    <div className="w-[700px]">
      <ProjectSummaryGrid
        projects={projects}
        variant="compact"
        columns={2}
      />
    </div>
  ),
};

export const GridMini: StoryObj<typeof ProjectSummaryGrid> = {
  render: () => (
    <div className="w-[400px]">
      <ProjectSummaryGrid
        projects={projects}
        variant="mini"
        columns={2}
      />
    </div>
  ),
};
