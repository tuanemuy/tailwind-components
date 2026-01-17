import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms/Button";
import { FilterIcon, SettingsIcon } from "@/lib/icons";
import {
  KanbanBoard,
  KanbanCard,
  type KanbanCardData,
  KanbanColumn,
  type KanbanColumnData,
  KanbanHeader,
} from "./index";

const meta: Meta<typeof KanbanBoard> = {
  title: "Organisms/DomainSpecific/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

// Sample data
const sampleCards: KanbanCardData[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create a modern landing page for the new product launch",
    priority: "high",
    tags: [
      { id: "t1", label: "Design", color: "purple" },
      { id: "t2", label: "Frontend", color: "blue" },
    ],
    assignees: [
      { id: "u1", name: "John Doe", avatar: "https://i.pravatar.cc/100?img=1" },
      {
        id: "u2",
        name: "Jane Smith",
        avatar: "https://i.pravatar.cc/100?img=2",
      },
    ],
    dueDate: "Jan 15",
    comments: 5,
    attachments: 2,
  },
  {
    id: "2",
    title: "Fix login bug",
    description: "Users are unable to login with social accounts",
    priority: "high",
    tags: [{ id: "t3", label: "Bug", color: "red" }],
    assignees: [
      {
        id: "u3",
        name: "Mike Johnson",
        avatar: "https://i.pravatar.cc/100?img=3",
      },
    ],
    dueDate: "Jan 12",
    comments: 3,
  },
  {
    id: "3",
    title: "Update API documentation",
    priority: "low",
    tags: [{ id: "t4", label: "Docs", color: "green" }],
    dueDate: "Jan 20",
  },
  {
    id: "4",
    title: "Implement dark mode",
    description: "Add dark mode support across all pages",
    priority: "medium",
    tags: [
      { id: "t1", label: "Design", color: "purple" },
      { id: "t5", label: "Feature", color: "blue" },
    ],
    assignees: [
      { id: "u1", name: "John Doe", avatar: "https://i.pravatar.cc/100?img=1" },
    ],
    dueDate: "Jan 25",
    comments: 8,
    attachments: 1,
  },
  {
    id: "5",
    title: "Performance optimization",
    description: "Optimize bundle size and improve load times",
    priority: "medium",
    tags: [{ id: "t6", label: "Performance", color: "orange" }],
    dueDate: "Jan 30",
  },
];

const sampleColumns: KanbanColumnData[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "gray",
    cards: [sampleCards[2], sampleCards[4]],
  },
  {
    id: "todo",
    title: "To Do",
    color: "blue",
    cards: [sampleCards[0]],
    limit: 5,
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "yellow",
    cards: [sampleCards[1], sampleCards[3]],
    limit: 3,
  },
  {
    id: "done",
    title: "Done",
    color: "green",
    cards: [],
  },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  render: () => (
    <div className="p-6 bg-background min-h-screen">
      <KanbanHeader
        title="Project Board"
        description="Sprint 12 - January 2024"
        onAddCard={() => console.log("Add card")}
        onFilter={() => console.log("Filter")}
      />
      <div className="mt-4">
        <KanbanBoard
          columns={sampleColumns}
          onCardClick={(card, columnId) =>
            console.log("Card clicked:", card, columnId)
          }
          onAddCard={(columnId) => console.log("Add card to:", columnId)}
          onAddColumn={() => console.log("Add column")}
        />
      </div>
    </div>
  ),
};

export const SingleColumn: StoryObj<typeof KanbanColumn> = {
  render: () => (
    <div className="p-6">
      <KanbanColumn
        column={sampleColumns[1]}
        onCardClick={(card) => console.log("Card clicked:", card)}
        onAddCard={() => console.log("Add card")}
      />
    </div>
  ),
};

export const SingleCard: StoryObj<typeof KanbanCard> = {
  render: () => (
    <div className="p-6 max-w-xs">
      <KanbanCard
        card={sampleCards[0]}
        onClick={() => console.log("Card clicked")}
        onToggleComplete={(completed) => console.log("Toggle:", completed)}
      />
    </div>
  ),
};

export const CardVariants: StoryObj<typeof KanbanCard> = {
  render: () => (
    <div className="p-6 max-w-xs space-y-4">
      <KanbanCard
        card={{
          id: "1",
          title: "High Priority Task",
          description: "This is urgent",
          priority: "high",
        }}
      />
      <KanbanCard
        card={{
          id: "2",
          title: "Medium Priority Task",
          priority: "medium",
          tags: [{ id: "t1", label: "Feature", color: "blue" }],
        }}
      />
      <KanbanCard
        card={{
          id: "3",
          title: "Low Priority Task",
          priority: "low",
          dueDate: "Next week",
        }}
      />
      <KanbanCard
        card={{
          id: "4",
          title: "Completed Task",
          completed: true,
        }}
        onToggleComplete={() => {}}
      />
    </div>
  ),
};

export const CardWithCover: StoryObj<typeof KanbanCard> = {
  render: () => (
    <div className="p-6 max-w-xs">
      <KanbanCard
        card={{
          id: "1",
          title: "Design System Update",
          description: "Update the design system with new components",
          coverImage:
            "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=200&fit=crop",
          tags: [
            { id: "t1", label: "Design", color: "purple" },
            { id: "t2", label: "UI", color: "pink" },
          ],
          assignees: [
            {
              id: "u1",
              name: "John",
              avatar: "https://i.pravatar.cc/100?img=1",
            },
          ],
          dueDate: "Jan 20",
        }}
      />
    </div>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <div className="p-6 bg-background">
      <KanbanHeader
        title="Sprint Board"
        description="Current sprint tasks"
        onAddCard={() => console.log("Add")}
        onFilter={() => console.log("Filter")}
        onSort={() => console.log("Sort")}
        actions={
          <Button variant="ghost" size="icon">
            <SettingsIcon className="size-4" />
          </Button>
        }
        filters={
          <Button variant="outline" size="sm">
            <FilterIcon className="size-4 mr-1" />
            Active Filters (2)
          </Button>
        }
      />
    </div>
  ),
};

export const EmptyBoard: Story = {
  render: () => (
    <div className="p-6 bg-background min-h-screen">
      <KanbanHeader
        title="New Project Board"
        onAddCard={() => console.log("Add card")}
      />
      <div className="mt-4">
        <KanbanBoard
          columns={[
            { id: "todo", title: "To Do", color: "blue", cards: [] },
            {
              id: "in-progress",
              title: "In Progress",
              color: "yellow",
              cards: [],
            },
            { id: "done", title: "Done", color: "green", cards: [] },
          ]}
          onCardClick={() => {}}
          onAddCard={(columnId) => console.log("Add card to:", columnId)}
          onAddColumn={() => console.log("Add column")}
        />
      </div>
    </div>
  ),
};

export const CompactBoard: Story = {
  render: () => (
    <div className="p-6 bg-background min-h-screen">
      <KanbanBoard
        columns={sampleColumns}
        variant="compact"
        onCardClick={() => {}}
      />
    </div>
  ),
};
