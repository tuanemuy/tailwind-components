import type { Meta, StoryObj } from "@storybook/react";
import { CRMLayout, type Customer } from "./index";

const meta: Meta<typeof CRMLayout> = {
  title: "Organisms/InboxChatMessages/CRMLayout",
  component: CRMLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CRMLayout>;

const sampleCustomers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop",
    type: "individual",
    status: "active",
    company: "Acme Inc.",
    jobTitle: "Product Manager",
    address: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      zipCode: "94102",
    },
    tags: [
      { id: "1", name: "VIP", color: "#6366f1" },
      { id: "2", name: "Enterprise", color: "#22c55e" },
    ],
    notes: [
      {
        id: "n1",
        content: "Interested in upgrading to enterprise plan. Follow up next week.",
        createdAt: "Dec 15, 2024 10:30 AM",
        createdBy: "Sarah Johnson",
      },
    ],
    activities: [
      {
        id: "a1",
        type: "email",
        title: "Sent pricing proposal",
        description: "Sent updated pricing for enterprise tier",
        date: "Dec 14, 2024",
        user: "Sarah Johnson",
      },
      {
        id: "a2",
        type: "call",
        title: "Discovery call",
        description: "Discussed requirements and use cases",
        date: "Dec 12, 2024",
        user: "Mike Chen",
      },
      {
        id: "a3",
        type: "meeting",
        title: "Product demo",
        description: "Demonstrated key features",
        date: "Dec 10, 2024",
        user: "Sarah Johnson",
      },
    ],
    orders: [
      {
        id: "o1",
        orderNumber: "ORD-2024-001",
        date: "Dec 1, 2024",
        status: "completed",
        total: 2499,
        items: 3,
      },
      {
        id: "o2",
        orderNumber: "ORD-2024-002",
        date: "Dec 10, 2024",
        status: "processing",
        total: 1299,
        items: 2,
      },
    ],
    createdAt: "Oct 15, 2024",
    lastContactedAt: "Dec 14, 2024",
    totalSpent: 12500,
    ordersCount: 8,
  },
  {
    id: "2",
    name: "Emily Davis",
    email: "emily.d@techcorp.com",
    phone: "+1 (555) 987-6543",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop",
    type: "company",
    status: "active",
    company: "TechCorp Solutions",
    jobTitle: "CTO",
    tags: [
      { id: "3", name: "Partner", color: "#f59e0b" },
    ],
    createdAt: "Sep 1, 2024",
    lastContactedAt: "Dec 13, 2024",
    totalSpent: 45000,
    ordersCount: 15,
  },
  {
    id: "3",
    name: "Robert Wilson",
    email: "robert.w@startup.io",
    type: "individual",
    status: "lead",
    company: "Startup.io",
    jobTitle: "Founder",
    createdAt: "Dec 1, 2024",
    ordersCount: 0,
  },
  {
    id: "4",
    name: "Sarah Johnson",
    email: "sarah.j@enterprise.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
    type: "company",
    status: "pending",
    company: "Enterprise Co.",
    jobTitle: "VP of Operations",
    tags: [
      { id: "4", name: "Prospect", color: "#8b5cf6" },
    ],
    createdAt: "Nov 20, 2024",
    ordersCount: 0,
  },
  {
    id: "5",
    name: "Alex Thompson",
    email: "alex.t@design.co",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop",
    type: "individual",
    status: "inactive",
    company: "Design Co.",
    jobTitle: "Creative Director",
    createdAt: "Jun 15, 2024",
    lastContactedAt: "Aug 30, 2024",
    totalSpent: 3500,
    ordersCount: 3,
  },
];

export const Default: Story = {
  render: () => (
    <div className="h-[600px]">
      <CRMLayout
        customers={sampleCustomers}
        showDetails={false}
        onSelectCustomer={(id) => console.log("Select:", id)}
        onCreateCustomer={() => console.log("Create")}
        onSearch={(query) => console.log("Search:", query)}
      />
    </div>
  ),
};

export const WithDetails: Story = {
  render: () => (
    <div className="h-[600px]">
      <CRMLayout
        customers={sampleCustomers}
        selectedCustomer={sampleCustomers[0]}
        showDetails={true}
        onSelectCustomer={(id) => console.log("Select:", id)}
        onCreateCustomer={() => console.log("Create")}
        onEditCustomer={(id) => console.log("Edit:", id)}
        onDeleteCustomer={(id) => console.log("Delete:", id)}
      />
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div className="h-[600px]">
      <CRMLayout
        customers={[]}
        showDetails={false}
        onSelectCustomer={(id) => console.log("Select:", id)}
        onCreateCustomer={() => console.log("Create")}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="h-[600px]">
      <CRMLayout
        customers={[]}
        showDetails={false}
        isLoading={true}
        onSelectCustomer={(id) => console.log("Select:", id)}
      />
    </div>
  ),
};

export const WithPagination: Story = {
  render: () => (
    <div className="h-[600px]">
      <CRMLayout
        customers={sampleCustomers}
        showDetails={false}
        currentPage={1}
        totalPages={5}
        onSelectCustomer={(id) => console.log("Select:", id)}
        onCreateCustomer={() => console.log("Create")}
        onPageChange={(page) => console.log("Page:", page)}
      />
    </div>
  ),
};

export const FilteredByStatus: Story = {
  render: () => (
    <div className="h-[600px]">
      <CRMLayout
        customers={sampleCustomers.filter((c) => c.status === "active")}
        filters={{ status: ["active"] }}
        showDetails={false}
        onSelectCustomer={(id) => console.log("Select:", id)}
        onFilter={(filters) => console.log("Filters:", filters)}
      />
    </div>
  ),
};

export const CustomerWithActivities: Story = {
  render: () => (
    <div className="h-[600px]">
      <CRMLayout
        customers={sampleCustomers}
        selectedCustomer={sampleCustomers[0]}
        showDetails={true}
        onSelectCustomer={(id) => console.log("Select:", id)}
        onEditCustomer={(id) => console.log("Edit:", id)}
      />
    </div>
  ),
};

export const CustomerWithOrders: Story = {
  render: () => (
    <div className="h-[600px]">
      <CRMLayout
        customers={sampleCustomers}
        selectedCustomer={sampleCustomers[0]}
        showDetails={true}
        onSelectCustomer={(id) => console.log("Select:", id)}
      />
    </div>
  ),
};

export const LeadCustomer: Story = {
  render: () => (
    <div className="h-[600px]">
      <CRMLayout
        customers={sampleCustomers}
        selectedCustomer={sampleCustomers[2]}
        showDetails={true}
        onSelectCustomer={(id) => console.log("Select:", id)}
        onEditCustomer={(id) => console.log("Edit:", id)}
      />
    </div>
  ),
};
