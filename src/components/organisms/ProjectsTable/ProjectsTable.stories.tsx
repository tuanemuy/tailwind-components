import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ProjectsTable, type Project } from "./index";

// Sample projects data
const sampleProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website",
    status: "active",
    progress: 75,
    startDate: "2024-01-01",
    dueDate: "2024-03-31",
    members: [
      { id: "1", name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" },
      { id: "2", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane" },
      { id: "3", name: "Bob Johnson", avatar: "https://i.pravatar.cc/150?u=bob" },
    ],
    budget: 50000,
    spent: 35000,
    priority: "high",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "iOS and Android app for customers",
    status: "active",
    progress: 45,
    startDate: "2024-02-01",
    dueDate: "2024-06-30",
    members: [
      { id: "4", name: "Alice Brown", avatar: "https://i.pravatar.cc/150?u=alice" },
      { id: "5", name: "Charlie Wilson" },
    ],
    budget: 120000,
    spent: 55000,
    priority: "high",
  },
  {
    id: "3",
    name: "Documentation Update",
    description: "Update technical documentation",
    status: "completed",
    progress: 100,
    startDate: "2024-01-15",
    dueDate: "2024-02-28",
    members: [{ id: "1", name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" }],
    priority: "low",
  },
  {
    id: "4",
    name: "API Integration",
    description: "Third-party API integrations",
    status: "on_hold",
    progress: 30,
    startDate: "2024-01-20",
    dueDate: "2024-04-15",
    members: [
      { id: "2", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane" },
      { id: "3", name: "Bob Johnson", avatar: "https://i.pravatar.cc/150?u=bob" },
    ],
    budget: 25000,
    spent: 8000,
    priority: "medium",
  },
  {
    id: "5",
    name: "Security Audit",
    description: "Annual security assessment",
    status: "draft",
    progress: 0,
    dueDate: "2024-05-01",
    priority: "medium",
  },
];

const meta: Meta<typeof ProjectsTable> = {
  title: "Organisms/Tables/ProjectsTable",
  component: ProjectsTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default ProjectsTable
export const Default: Story = {
  args: {
    projects: sampleProjects,
  },
};

// With All Features
export const WithAllFeatures: Story = {
  args: {
    projects: sampleProjects,
    showProgress: true,
    showMembers: true,
    showBudget: true,
    showDates: true,
    sortable: true,
    filterable: true,
  },
};

// With Selection
export const WithSelection: Story = {
  render: function Render() {
    const [selectedRows, setSelectedRows] = useState<Project[]>([]);

    return (
      <ProjectsTable
        projects={sampleProjects}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        bulkActions={[
          {
            label: "Archive",
            onClick: (rows) => console.log("Archive", rows),
          },
          {
            label: "Delete",
            onClick: (rows) => console.log("Delete", rows),
            variant: "destructive",
          },
        ]}
      />
    );
  },
};

// Minimal View
export const MinimalView: Story = {
  args: {
    projects: sampleProjects,
    showProgress: false,
    showMembers: false,
    showBudget: false,
    showDates: false,
  },
};

// With Budget Tracking
export const WithBudgetTracking: Story = {
  args: {
    projects: sampleProjects.filter((p) => p.budget),
    showProgress: true,
    showMembers: false,
    showBudget: true,
    showDates: false,
  },
};

// Compact Mode
export const CompactMode: Story = {
  args: {
    projects: sampleProjects,
    compact: true,
    showProgress: true,
    showMembers: true,
  },
};

// With Pagination
export const WithPagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const pageSize = 2;

    const paginatedProjects = sampleProjects.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return (
      <ProjectsTable
        projects={paginatedProjects}
        pagination={{
          page,
          pageSize,
          total: sampleProjects.length,
          onPageChange: setPage,
        }}
      />
    );
  },
};

// Loading State
export const Loading: Story = {
  args: {
    projects: [],
    loading: true,
  },
};

// Empty State
export const Empty: Story = {
  args: {
    projects: [],
    emptyState: (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No projects found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Create your first project to get started
        </p>
      </div>
    ),
  },
};
