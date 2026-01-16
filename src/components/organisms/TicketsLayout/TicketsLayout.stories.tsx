import type { Meta, StoryObj } from "@storybook/react";
import { KanbanTicketsLayout, type Ticket, TicketsLayout } from "./index";

const meta: Meta<typeof TicketsLayout> = {
  title: "Organisms/InboxChatMessages/TicketsLayout",
  component: TicketsLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TicketsLayout>;

const sampleTickets: Ticket[] = [
  {
    id: "TKT-001",
    title: "Unable to login to dashboard",
    description:
      "User reports that they cannot access the dashboard after the recent update. Getting a 403 error.",
    status: "open",
    priority: "high",
    category: "Bug",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop",
    },
    assignee: {
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
    },
    createdAt: "Dec 15, 2024 10:30 AM",
    updatedAt: "Dec 15, 2024 2:45 PM",
    tags: ["login", "urgent", "dashboard"],
    comments: [
      {
        id: "c1",
        content: "I've reproduced the issue. Investigating now.",
        author: { name: "Sarah Johnson" },
        createdAt: "Dec 15, 2024 11:00 AM",
      },
    ],
  },
  {
    id: "TKT-002",
    title: "Feature request: Dark mode",
    description:
      "Customer requests dark mode support for better visibility during night work.",
    status: "in_progress",
    priority: "medium",
    category: "Feature Request",
    customer: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop",
    },
    assignee: {
      name: "Mike Chen",
      email: "mike.c@company.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop",
    },
    createdAt: "Dec 14, 2024 3:00 PM",
    updatedAt: "Dec 15, 2024 9:00 AM",
    tags: ["feature", "ui"],
  },
  {
    id: "TKT-003",
    title: "Payment processing error",
    description:
      "Multiple customers reporting failed transactions with error code E-500.",
    status: "open",
    priority: "urgent",
    category: "Bug",
    customer: {
      name: "Robert Wilson",
      email: "robert.w@example.com",
    },
    createdAt: "Dec 15, 2024 1:15 PM",
    updatedAt: "Dec 15, 2024 1:15 PM",
    tags: ["payment", "critical"],
  },
  {
    id: "TKT-004",
    title: "Documentation update needed",
    description:
      "The API documentation is outdated and missing new endpoints from v2.0.",
    status: "pending",
    priority: "low",
    category: "Documentation",
    customer: {
      name: "Alex Thompson",
      email: "alex.t@example.com",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop",
    },
    assignee: {
      name: "Tech Writer",
      email: "docs@company.com",
    },
    createdAt: "Dec 10, 2024 9:00 AM",
    updatedAt: "Dec 12, 2024 4:30 PM",
    tags: ["docs", "api"],
  },
  {
    id: "TKT-005",
    title: "Mobile app crash on startup",
    description:
      "iOS app crashes immediately after splash screen on iPhone 15 Pro.",
    status: "resolved",
    priority: "high",
    category: "Bug",
    customer: {
      name: "Jessica Brown",
      email: "jessica.b@example.com",
    },
    assignee: {
      name: "Mobile Team",
      email: "mobile@company.com",
    },
    createdAt: "Dec 8, 2024 11:00 AM",
    updatedAt: "Dec 14, 2024 5:00 PM",
    tags: ["mobile", "ios", "crash"],
  },
];

export const Default: Story = {
  render: () => (
    <div className="h-[600px]">
      <TicketsLayout
        tickets={sampleTickets}
        showSidebar={true}
        showDetails={false}
        onSelectTicket={(id) => console.log("Select:", id)}
        onCreateTicket={() => console.log("Create")}
        onSearch={(query) => console.log("Search:", query)}
      />
    </div>
  ),
};

export const WithDetails: Story = {
  render: () => (
    <div className="h-[600px]">
      <TicketsLayout
        tickets={sampleTickets}
        selectedTicket={sampleTickets[0]}
        showSidebar={true}
        showDetails={true}
        onSelectTicket={(id) => console.log("Select:", id)}
        onCreateTicket={() => console.log("Create")}
        onUpdateTicket={(id, data) => console.log("Update:", id, data)}
        onAddComment={(id, comment) => console.log("Comment:", id, comment)}
      />
    </div>
  ),
};

export const KanbanView: Story = {
  render: () => (
    <div className="h-[600px]">
      <KanbanTicketsLayout
        tickets={sampleTickets}
        onSelectTicket={(id) => console.log("Select:", id)}
        onMoveTicket={(id, status) => console.log("Move:", id, status)}
        onCreateTicket={() => console.log("Create")}
      />
    </div>
  ),
};

export const FilteredByStatus: Story = {
  render: () => (
    <div className="h-[600px]">
      <TicketsLayout
        tickets={sampleTickets.filter((t) => t.status === "open")}
        activeStatus="open"
        showSidebar={true}
        onSelectTicket={(id) => console.log("Select:", id)}
        onStatusChange={(status) => console.log("Status:", status)}
      />
    </div>
  ),
};

export const FilteredByPriority: Story = {
  render: () => (
    <div className="h-[600px]">
      <TicketsLayout
        tickets={sampleTickets.filter(
          (t) => t.priority === "high" || t.priority === "urgent",
        )}
        activePriority="high"
        showSidebar={true}
        onSelectTicket={(id) => console.log("Select:", id)}
        onPriorityChange={(priority) => console.log("Priority:", priority)}
      />
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div className="h-[600px]">
      <TicketsLayout
        tickets={[]}
        showSidebar={true}
        onSelectTicket={(id) => console.log("Select:", id)}
        onCreateTicket={() => console.log("Create")}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="h-[600px]">
      <TicketsLayout
        tickets={[]}
        showSidebar={true}
        isLoading={true}
        onSelectTicket={(id) => console.log("Select:", id)}
      />
    </div>
  ),
};

export const NoSidebar: Story = {
  render: () => (
    <div className="h-[600px]">
      <TicketsLayout
        tickets={sampleTickets}
        showSidebar={false}
        onSelectTicket={(id) => console.log("Select:", id)}
      />
    </div>
  ),
};
