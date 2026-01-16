import type { Meta, StoryObj } from "@storybook/react";
import { CodeIcon, FolderIcon, PaletteIcon, RocketIcon } from "@/lib/icons";
import type { ProjectCardData } from "./";
import { ProjectCard, ProjectCardGrid, ProjectCardList } from "./";

const meta: Meta<typeof ProjectCard> = {
  title: "Organisms/ProjectCard",
  component: ProjectCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

const sampleProject: ProjectCardData = {
  id: "1",
  name: "E-Commerce Platform",
  description:
    "Complete redesign and development of the e-commerce platform with new checkout flow",
  status: "active",
  progress: 65,
  dueDate: "Mar 30, 2024",
  category: "Web Development",
  color: "#3B82F6",
  icon: <FolderIcon className="size-5 text-white" />,
  members: [
    { id: "m1", name: "Alex Johnson", avatarFallback: "AJ" },
    { id: "m2", name: "Maria Garcia", avatarFallback: "MG" },
    { id: "m3", name: "David Kim", avatarFallback: "DK" },
  ],
  tasksTotal: 48,
  tasksCompleted: 31,
  isStarred: true,
};

export const Default: Story = {
  args: {
    project: sampleProject,
    className: "w-[380px]",
  },
};

export const Featured: Story = {
  args: {
    project: {
      ...sampleProject,
      coverImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    },
    variant: "featured",
    onStar: (project, starred) => console.log("Star:", project.name, starred),
    className: "w-[380px]",
  },
};

export const FeaturedWithColor: Story = {
  args: {
    project: {
      ...sampleProject,
      coverImage: undefined,
      color: "#8B5CF6",
      icon: <RocketIcon className="size-8 text-white" />,
    },
    variant: "featured",
    className: "w-[380px]",
  },
};

export const Horizontal: Story = {
  args: {
    project: sampleProject,
    variant: "horizontal",
    className: "w-[700px]",
  },
};

export const Compact: Story = {
  args: {
    project: sampleProject,
    variant: "compact",
    className: "w-[300px]",
  },
};

// Sample projects for grid/list
const sampleProjects: ProjectCardData[] = [
  {
    id: "1",
    name: "E-Commerce Platform",
    description: "Complete platform redesign with new checkout flow",
    status: "active",
    progress: 65,
    dueDate: "Mar 30, 2024",
    category: "Web Development",
    color: "#3B82F6",
    icon: <FolderIcon className="size-5 text-white" />,
    members: [
      { id: "m1", name: "Alex", avatarFallback: "A" },
      { id: "m2", name: "Maria", avatarFallback: "M" },
    ],
    tasksTotal: 48,
    tasksCompleted: 31,
    isStarred: true,
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    name: "Mobile App",
    description: "Native iOS and Android app development",
    status: "active",
    progress: 40,
    dueDate: "Apr 15, 2024",
    category: "Mobile",
    color: "#10B981",
    icon: <CodeIcon className="size-5 text-white" />,
    members: [{ id: "m3", name: "David", avatarFallback: "D" }],
    tasksTotal: 32,
    tasksCompleted: 13,
    coverImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
  },
  {
    id: "3",
    name: "Brand Redesign",
    description: "Complete brand identity refresh",
    status: "on-hold",
    progress: 10,
    dueDate: "May 1, 2024",
    category: "Design",
    color: "#F59E0B",
    icon: <PaletteIcon className="size-5 text-white" />,
    members: [
      { id: "m4", name: "Emily", avatarFallback: "E" },
      { id: "m5", name: "Sarah", avatarFallback: "S" },
    ],
    tasksTotal: 20,
    tasksCompleted: 2,
  },
  {
    id: "4",
    name: "Product Launch",
    description: "Q2 product launch campaign",
    status: "completed",
    progress: 100,
    dueDate: "Feb 28, 2024",
    category: "Marketing",
    color: "#8B5CF6",
    icon: <RocketIcon className="size-5 text-white" />,
    members: [
      { id: "m6", name: "John", avatarFallback: "J" },
      { id: "m7", name: "Lisa", avatarFallback: "L" },
      { id: "m8", name: "Mike", avatarFallback: "M" },
    ],
    tasksTotal: 25,
    tasksCompleted: 25,
  },
];

export const Grid: StoryObj<typeof ProjectCardGrid> = {
  render: () => (
    <ProjectCardGrid
      projects={sampleProjects}
      columns={2}
      onProjectClick={(project) => console.log("Clicked:", project.name)}
      className="max-w-4xl"
    />
  ),
};

export const GridFeatured: StoryObj<typeof ProjectCardGrid> = {
  render: () => (
    <ProjectCardGrid
      projects={sampleProjects}
      variant="featured"
      columns={3}
      onProjectClick={(project) => console.log("Clicked:", project.name)}
      onStar={(project, starred) => console.log("Star:", project.name, starred)}
      className="max-w-5xl"
    />
  ),
};

export const List: StoryObj<typeof ProjectCardList> = {
  render: () => (
    <ProjectCardList
      projects={sampleProjects}
      onProjectClick={(project) => console.log("Clicked:", project.name)}
      className="max-w-3xl"
    />
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div className="grid gap-4">
      {(["active", "completed", "on-hold", "archived", "draft"] as const).map(
        (status) => (
          <ProjectCard
            key={status}
            project={{
              ...sampleProject,
              id: status,
              name: `Project (${status})`,
              status,
            }}
            variant="horizontal"
            className="w-[600px]"
          />
        ),
      )}
    </div>
  ),
};
