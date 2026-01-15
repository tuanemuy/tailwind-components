import type { Meta, StoryObj } from "@storybook/react";
import {
  KanbanGroupHeading,
  MinimalKanbanHeading,
  DraggableKanbanHeading,
  KanbanColumn,
} from "./index";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { FilterIcon, SettingsIcon } from "@/lib/icons";

const meta: Meta<typeof KanbanGroupHeading> = {
  title: "Organisms/PageSections/KanbanGroupHeading",
  component: KanbanGroupHeading,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof KanbanGroupHeading>;

export const Default: Story = {
  args: {
    title: "To Do",
    count: 5,
    onAddClick: () => console.log("Add clicked"),
    onMenuClick: () => console.log("Menu clicked"),
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export const WithColor: Story = {
  args: {
    title: "In Progress",
    count: 3,
    color: "#3b82f6",
    onAddClick: () => console.log("Add clicked"),
    onMenuClick: () => console.log("Menu clicked"),
  },
  decorators: Default.decorators,
};

export const WithIcon: Story = {
  args: {
    title: "Completed",
    count: 12,
    icon: (
      <svg className="size-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    color: "#22c55e",
    onAddClick: () => console.log("Add clicked"),
  },
  decorators: Default.decorators,
};

export const Collapsible: Story = {
  args: {
    title: "Backlog",
    count: 8,
    collapsible: true,
    collapsed: false,
    onToggle: () => console.log("Toggle"),
    onAddClick: () => console.log("Add clicked"),
  },
  decorators: Default.decorators,
};

export const CollapsedState: Story = {
  args: {
    title: "Backlog",
    count: 8,
    collapsible: true,
    collapsed: true,
    onToggle: () => console.log("Toggle"),
    onAddClick: () => console.log("Add clicked"),
  },
  decorators: Default.decorators,
};

export const WithCustomActions: Story = {
  args: {
    title: "Review",
    count: 2,
    color: "#f59e0b",
    actions: (
      <>
        <Button variant="ghost" size="sm" className="size-7 p-0">
          <FilterIcon className="size-4" />
        </Button>
        <Button variant="ghost" size="sm" className="size-7 p-0">
          <SettingsIcon className="size-4" />
        </Button>
      </>
    ),
  },
  decorators: Default.decorators,
};

// Minimal variant
export const Minimal: StoryObj<typeof MinimalKanbanHeading> = {
  render: () => (
    <div className="w-72 group">
      <MinimalKanbanHeading
        title="To Do"
        count={5}
        dotColor="#3b82f6"
      />
    </div>
  ),
};

// Draggable variant
export const Draggable: StoryObj<typeof DraggableKanbanHeading> = {
  render: () => (
    <div className="w-72">
      <DraggableKanbanHeading
        title="In Progress"
        count={3}
        color="#f59e0b"
        onAddClick={() => console.log("Add clicked")}
        onMenuClick={() => console.log("Menu clicked")}
      />
    </div>
  ),
};

// Full column example
export const FullColumn: StoryObj<typeof KanbanColumn> = {
  render: () => (
    <KanbanColumn
      heading={
        <KanbanGroupHeading
          title="To Do"
          count={3}
          color="#3b82f6"
          onAddClick={() => console.log("Add clicked")}
          onMenuClick={() => console.log("Menu clicked")}
        />
      }
    >
      {/* Sample cards */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-lg border border-border bg-card p-3 shadow-sm"
        >
          <h4 className="text-sm font-medium">Task {i}</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            This is a sample task description
          </p>
          <div className="mt-2 flex items-center gap-x-2">
            <Badge variant="secondary" size="sm">Design</Badge>
          </div>
        </div>
      ))}
    </KanbanColumn>
  ),
};

export const EmptyColumn: StoryObj<typeof KanbanColumn> = {
  render: () => (
    <KanbanColumn
      heading={
        <KanbanGroupHeading
          title="Done"
          count={0}
          color="#22c55e"
          onAddClick={() => console.log("Add clicked")}
        />
      }
      isEmpty
      emptyMessage="Drop items here"
    >
      {null}
    </KanbanColumn>
  ),
};

// Kanban board example with multiple columns
export const KanbanBoard: Story = {
  render: () => (
    <div className="flex gap-4 overflow-x-auto p-4">
      {/* To Do Column */}
      <KanbanColumn
        heading={
          <KanbanGroupHeading
            title="To Do"
            count={3}
            color="#6b7280"
            onAddClick={() => console.log("Add to To Do")}
          />
        }
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-card p-3 shadow-sm"
          >
            <h4 className="text-sm font-medium">Task {i}</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Task description here
            </p>
          </div>
        ))}
      </KanbanColumn>

      {/* In Progress Column */}
      <KanbanColumn
        heading={
          <KanbanGroupHeading
            title="In Progress"
            count={2}
            color="#3b82f6"
            onAddClick={() => console.log("Add to In Progress")}
          />
        }
      >
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-card p-3 shadow-sm"
          >
            <h4 className="text-sm font-medium">Active Task {i}</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Currently working on this
            </p>
          </div>
        ))}
      </KanbanColumn>

      {/* Review Column */}
      <KanbanColumn
        heading={
          <KanbanGroupHeading
            title="Review"
            count={1}
            color="#f59e0b"
            onAddClick={() => console.log("Add to Review")}
          />
        }
      >
        <div className="rounded-lg border border-border bg-card p-3 shadow-sm">
          <h4 className="text-sm font-medium">Pending Review</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Waiting for approval
          </p>
        </div>
      </KanbanColumn>

      {/* Done Column */}
      <KanbanColumn
        heading={
          <KanbanGroupHeading
            title="Done"
            count={4}
            color="#22c55e"
            onAddClick={() => console.log("Add to Done")}
          />
        }
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-card p-3 opacity-60 shadow-sm"
          >
            <h4 className="text-sm font-medium line-through">Completed {i}</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Finished task
            </p>
          </div>
        ))}
      </KanbanColumn>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

export const StatusVariations: Story = {
  render: () => (
    <div className="w-72 space-y-2">
      <KanbanGroupHeading title="Backlog" count={12} color="#6b7280" />
      <KanbanGroupHeading title="To Do" count={8} color="#3b82f6" />
      <KanbanGroupHeading title="In Progress" count={3} color="#f59e0b" />
      <KanbanGroupHeading title="Review" count={2} color="#8b5cf6" />
      <KanbanGroupHeading title="Done" count={24} color="#22c55e" />
      <KanbanGroupHeading title="Blocked" count={1} color="#ef4444" />
    </div>
  ),
};
