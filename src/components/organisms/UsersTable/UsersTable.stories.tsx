import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { UsersTable, type User } from "./index";

// Sample users data
const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?u=john",
    status: "active",
    role: "admin",
    department: "Engineering",
    location: "San Francisco, CA",
    joinedAt: "2022-01-15",
    lastActiveAt: "2024-01-14",
    verified: true,
    twoFactorEnabled: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://i.pravatar.cc/150?u=jane",
    status: "active",
    role: "moderator",
    department: "Product",
    location: "New York, NY",
    joinedAt: "2022-06-22",
    lastActiveAt: "2024-01-13",
    verified: true,
    twoFactorEnabled: false,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    avatar: "https://i.pravatar.cc/150?u=bob",
    status: "pending",
    role: "member",
    department: "Design",
    location: "Los Angeles, CA",
    joinedAt: "2023-11-10",
    verified: false,
    twoFactorEnabled: false,
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    avatar: "https://i.pravatar.cc/150?u=alice",
    status: "active",
    role: "member",
    department: "Marketing",
    location: "Chicago, IL",
    joinedAt: "2023-03-05",
    lastActiveAt: "2024-01-10",
    verified: true,
    twoFactorEnabled: true,
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    status: "suspended",
    role: "viewer",
    department: "Support",
    location: "Austin, TX",
    joinedAt: "2023-08-18",
    lastActiveAt: "2023-12-01",
    verified: true,
    twoFactorEnabled: false,
  },
];

const meta: Meta<typeof UsersTable> = {
  title: "Organisms/Tables/UsersTable",
  component: UsersTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default UsersTable
export const Default: Story = {
  args: {
    users: sampleUsers,
  },
};

// With All Columns
export const WithAllColumns: Story = {
  args: {
    users: sampleUsers,
    showDepartment: true,
    showLocation: true,
    showDates: true,
    showSecurity: true,
  },
};

// With Selection
export const WithSelection: Story = {
  render: function Render() {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);

    return (
      <UsersTable
        users={sampleUsers}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        bulkActions={[
          {
            label: "Deactivate",
            onClick: (rows) => console.log("Deactivate", rows),
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

// With Filtering
export const WithFiltering: Story = {
  args: {
    users: sampleUsers,
    filterable: true,
    sortable: true,
  },
};

// Security Focused View
export const SecurityFocused: Story = {
  args: {
    users: sampleUsers,
    showDepartment: false,
    showLocation: false,
    showDates: true,
    showSecurity: true,
    sortable: true,
  },
};

// Compact Mode
export const CompactMode: Story = {
  args: {
    users: sampleUsers,
    compact: true,
    showDepartment: true,
    showLocation: false,
  },
};

// With Pagination
export const WithPagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const pageSize = 2;

    const paginatedUsers = sampleUsers.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return (
      <UsersTable
        users={paginatedUsers}
        pagination={{
          page,
          pageSize,
          total: sampleUsers.length,
          onPageChange: setPage,
        }}
      />
    );
  },
};

// Loading State
export const Loading: Story = {
  args: {
    users: [],
    loading: true,
  },
};

// Empty State
export const Empty: Story = {
  args: {
    users: [],
    emptyState: (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No users found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Invite team members to get started
        </p>
      </div>
    ),
  },
};
