import type { Meta, StoryObj } from "@storybook/react";
import {
  ProjectDetailsCard,
  ProjectDetailsGrid,
  ProjectDetailsList,
} from "./";
import type { ProjectDetails } from "./";
import { FolderIcon, CodeIcon, RocketIcon, PaletteIcon } from "@/lib/icons";

const meta: Meta<typeof ProjectDetailsCard> = {
  title: "Organisms/ProjectDetailsCard",
  component: ProjectDetailsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProjectDetailsCard>;

const sampleProject: ProjectDetails = {
  id: "1",
  name: "E-Commerce Platform Redesign",
  description:
    "A complete redesign of the e-commerce platform including new checkout flow, product pages, and mobile optimization.",
  status: "in-progress",
  priority: "high",
  progress: 65,
  startDate: "Jan 15, 2024",
  dueDate: "Mar 30, 2024",
  category: "Web Development",
  tags: ["React", "TypeScript", "E-Commerce"],
  owner: {
    id: "owner-1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "Project Lead",
    avatarFallback: "SC",
  },
  members: [
    { id: "m1", name: "Alex Johnson", avatarFallback: "AJ" },
    { id: "m2", name: "Maria Garcia", avatarFallback: "MG" },
    { id: "m3", name: "David Kim", avatarFallback: "DK" },
    { id: "m4", name: "Emily Brown", avatarFallback: "EB" },
  ],
  tasksTotal: 48,
  tasksCompleted: 31,
  tasks: [
    { id: "t1", title: "Design new checkout flow", completed: true },
    { id: "t2", title: "Implement payment integration", completed: true },
    { id: "t3", title: "Mobile responsive design", completed: false },
    { id: "t4", title: "Performance optimization", completed: false },
  ],
  budget: {
    total: 50000,
    spent: 32500,
    currency: "$",
  },
  isStarred: true,
  icon: <FolderIcon className="size-6" />,
  links: [
    { label: "Figma Design", url: "#" },
    { label: "GitHub Repo", url: "#" },
  ],
  customFields: [
    { label: "Client", value: "Acme Corp" },
    { label: "Department", value: "Engineering" },
  ],
};

export const Default: Story = {
  args: {
    project: sampleProject,
    className: "w-[400px]",
  },
};

export const Compact: Story = {
  args: {
    project: sampleProject,
    variant: "compact",
    className: "w-[350px]",
  },
};

export const Detailed: Story = {
  args: {
    project: {
      ...sampleProject,
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=200&fit=crop",
    },
    variant: "detailed",
    showTasks: true,
    showBudget: true,
    className: "w-[450px]",
  },
};

export const Horizontal: Story = {
  args: {
    project: sampleProject,
    variant: "horizontal",
    onEdit: (project) => console.log("Edit:", project.name),
    onDelete: (project) => console.log("Delete:", project.name),
    className: "w-[800px]",
  },
};

export const WithBudget: Story = {
  args: {
    project: sampleProject,
    variant: "detailed",
    showBudget: true,
    className: "w-[450px]",
  },
};

export const WithTasks: Story = {
  args: {
    project: {
      ...sampleProject,
      tasks: [
        {
          id: "t1",
          title: "Design new checkout flow",
          completed: true,
          assignee: { id: "m1", name: "Alex Johnson", avatarFallback: "AJ" },
        },
        {
          id: "t2",
          title: "Implement payment integration",
          completed: true,
          assignee: { id: "m2", name: "Maria Garcia", avatarFallback: "MG" },
        },
        {
          id: "t3",
          title: "Mobile responsive design",
          completed: false,
          assignee: { id: "m3", name: "David Kim", avatarFallback: "DK" },
        },
      ],
    },
    variant: "detailed",
    showTasks: true,
    className: "w-[450px]",
  },
};

// Grid Layout
const sampleProjects: ProjectDetails[] = [
  {
    id: "1",
    name: "E-Commerce Platform",
    description: "Complete redesign of the e-commerce platform",
    status: "in-progress",
    priority: "high",
    progress: 65,
    dueDate: "Mar 30, 2024",
    category: "Web Development",
    members: [
      { id: "m1", name: "Alex", avatarFallback: "A" },
      { id: "m2", name: "Maria", avatarFallback: "M" },
    ],
    tasksTotal: 48,
    tasksCompleted: 31,
    icon: <FolderIcon className="size-5" />,
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native iOS and Android app development",
    status: "active",
    priority: "medium",
    progress: 40,
    dueDate: "Apr 15, 2024",
    category: "Mobile",
    members: [
      { id: "m3", name: "David", avatarFallback: "D" },
      { id: "m4", name: "Emily", avatarFallback: "E" },
    ],
    tasksTotal: 32,
    tasksCompleted: 13,
    icon: <CodeIcon className="size-5" />,
  },
  {
    id: "3",
    name: "Brand Redesign",
    description: "Complete brand identity refresh",
    status: "pending",
    priority: "low",
    progress: 10,
    dueDate: "May 1, 2024",
    category: "Design",
    members: [{ id: "m5", name: "Sarah", avatarFallback: "S" }],
    tasksTotal: 20,
    tasksCompleted: 2,
    icon: <PaletteIcon className="size-5" />,
  },
  {
    id: "4",
    name: "Product Launch",
    description: "Q2 product launch campaign",
    status: "completed",
    priority: "urgent",
    progress: 100,
    dueDate: "Feb 28, 2024",
    category: "Marketing",
    members: [
      { id: "m6", name: "John", avatarFallback: "J" },
      { id: "m7", name: "Lisa", avatarFallback: "L" },
      { id: "m8", name: "Mike", avatarFallback: "M" },
    ],
    tasksTotal: 25,
    tasksCompleted: 25,
    icon: <RocketIcon className="size-5" />,
  },
];

export const Grid: StoryObj<typeof ProjectDetailsGrid> = {
  render: () => (
    <ProjectDetailsGrid
      projects={sampleProjects}
      columns={2}
      onProjectClick={(project) => console.log("Clicked:", project.name)}
      className="max-w-4xl"
    />
  ),
};

export const GridCompact: StoryObj<typeof ProjectDetailsGrid> = {
  render: () => (
    <ProjectDetailsGrid
      projects={sampleProjects}
      variant="compact"
      columns={3}
      onProjectClick={(project) => console.log("Clicked:", project.name)}
      className="max-w-5xl"
    />
  ),
};

export const List: StoryObj<typeof ProjectDetailsList> = {
  render: () => (
    <ProjectDetailsList
      projects={sampleProjects}
      onProjectClick={(project) => console.log("Clicked:", project.name)}
      onEdit={(project) => console.log("Edit:", project.name)}
      onDelete={(project) => console.log("Delete:", project.name)}
      className="max-w-4xl"
    />
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div className="grid gap-4">
      {(
        ["active", "in-progress", "completed", "on-hold", "cancelled", "pending", "archived"] as const
      ).map((status) => (
        <ProjectDetailsCard
          key={status}
          project={{
            ...sampleProject,
            id: status,
            name: `Project (${status})`,
            status,
          }}
          variant="horizontal"
          className="w-[800px]"
        />
      ))}
    </div>
  ),
};
