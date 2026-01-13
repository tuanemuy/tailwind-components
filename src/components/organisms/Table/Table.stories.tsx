"use client";

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./index";
import type { TableColumn, SortState, PaginationProps } from "./index";
import { Avatar, Badge, Button } from "@/components/atoms";
import { Dropdown, DropdownItem } from "@/components/molecules";
import { MoreHorizontalIcon, EditIcon, TrashIcon } from "@/lib/icons";

// Sample data type
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastActivity: string;
  avatar?: string;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: "1",
    name: "James Collins",
    email: "james@site.com",
    role: "Admin",
    status: "active",
    lastActivity: "Today",
    avatar:
      "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?w=320&h=320&fit=facearea&facepad=3",
  },
  {
    id: "2",
    name: "Lisa Miller",
    email: "liza@site.com",
    role: "Can view",
    status: "inactive",
    lastActivity: "2 days ago",
  },
  {
    id: "3",
    name: "Daniel Hobbs",
    email: "dhobbs@site.com",
    role: "Can edit",
    status: "inactive",
    lastActivity: "Today",
    avatar:
      "https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?w=320&h=320&fit=facearea&facepad=2.5",
  },
  {
    id: "4",
    name: "Brian Warner",
    email: "brian@site.com",
    role: "Can edit",
    status: "active",
    lastActivity: "1 month ago",
    avatar:
      "https://images.unsplash.com/photo-1679412330254-90cb240038c5?w=320&h=320&fit=facearea&facepad=2.5",
  },
  {
    id: "5",
    name: "Ols Shols",
    email: "olsshols@site.com",
    role: "Can view",
    status: "inactive",
    lastActivity: "6 days ago",
  },
];

// Column definitions
const userColumns: TableColumn<User>[] = [
  {
    key: "name",
    header: "Member",
    minWidth: "250px",
    render: (_, row) => (
      <div className="flex items-center gap-x-3">
        <Avatar
          src={row.avatar}
          initials={row.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
          size="sm"
          alt={row.name}
        />
        <span className="text-sm font-medium text-foreground">{row.name}</span>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    minWidth: "120px",
    render: (value) => (
      <span className="text-sm text-muted-foreground">{String(value)}</span>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (value) => (
      <span className="text-sm text-muted-foreground">{String(value)}</span>
    ),
  },
  {
    key: "lastActivity",
    header: "Last Activity",
    minWidth: "140px",
    render: (value) => (
      <span className="text-sm text-muted-foreground">{String(value)}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (value) => (
      <Badge
        variant={value === "active" ? "success" : "secondary"}
        size="sm"
        soft
        dot
        dotColor={value === "active" ? "success" : "default"}
      >
        {value === "active" ? "Active" : "Inactive"}
      </Badge>
    ),
  },
];

const meta: Meta<typeof Table<User>> = {
  title: "Organisms/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table<User>>;

// Default table
export const Default: Story = {
  render: () => <Table data={sampleUsers} columns={userColumns} />,
};

// Selectable table
export const Selectable: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);

    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Selected: {selectedRows.length} rows
        </div>
        <Table
          data={sampleUsers}
          columns={userColumns}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          getRowKey={(row) => row.id}
        />
      </div>
    );
  },
};

// Sortable table
export const Sortable: Story = {
  render: () => {
    const [sortState, setSortState] = useState<SortState>({
      key: "name",
      direction: "asc",
    });

    const sortedData = [...sampleUsers].sort((a, b) => {
      if (!sortState.direction) return 0;
      const aValue = a[sortState.key as keyof User];
      const bValue = b[sortState.key as keyof User];
      const comparison = String(aValue).localeCompare(String(bValue));
      return sortState.direction === "asc" ? comparison : -comparison;
    });

    return (
      <Table
        data={sortedData}
        columns={userColumns.map((col) => ({ ...col, sortable: true }))}
        sortable
        sortState={sortState}
        onSort={setSortState}
        getRowKey={(row) => row.id}
      />
    );
  },
};

// With pagination
export const WithPagination: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 2;

    const paginatedData = sampleUsers.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );

    const pagination: PaginationProps = {
      page,
      pageSize,
      total: sampleUsers.length,
      onPageChange: setPage,
    };

    return (
      <Table
        data={paginatedData}
        columns={userColumns}
        pagination={pagination}
        getRowKey={(row) => row.id}
      />
    );
  },
};

// With row actions
export const WithRowActions: Story = {
  render: () => {
    const columnsWithActions: TableColumn<User>[] = [
      ...userColumns,
      {
        key: "actions",
        header: "",
        width: "60px",
        align: "end",
        render: () => (
          <Dropdown
            trigger={
              <Button variant="ghost" size="sm">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            }
          >
            <DropdownItem icon={<EditIcon />}>Edit</DropdownItem>
            <DropdownItem icon={<TrashIcon />} destructive>
              Delete
            </DropdownItem>
          </Dropdown>
        ),
      },
    ];

    return (
      <Table
        data={sampleUsers}
        columns={columnsWithActions}
        getRowKey={(row) => row.id}
      />
    );
  },
};

// Striped and bordered
export const StripedBordered: Story = {
  render: () => (
    <Table
      data={sampleUsers}
      columns={userColumns}
      striped
      bordered
      getRowKey={(row) => row.id}
    />
  ),
};

// Compact
export const Compact: Story = {
  render: () => (
    <Table
      data={sampleUsers}
      columns={userColumns}
      compact
      getRowKey={(row) => row.id}
    />
  ),
};

// Clickable rows
export const ClickableRows: Story = {
  render: () => (
    <Table
      data={sampleUsers}
      columns={userColumns}
      onRowClick={(row) => alert(`Clicked: ${row.name}`)}
      getRowKey={(row) => row.id}
    />
  ),
};

// Empty state
export const Empty: Story = {
  render: () => (
    <Table
      data={[]}
      columns={userColumns}
      emptyState={
        <div className="py-8 text-center">
          <p className="text-sm font-medium text-foreground">No users found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <Button size="sm" className="mt-4">
            Add User
          </Button>
        </div>
      }
    />
  ),
};

// Loading state
export const Loading: Story = {
  render: () => <Table data={[]} columns={userColumns} loading />,
};

// Full featured
export const FullFeatured: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    const [sortState, setSortState] = useState<SortState>({
      key: "",
      direction: null,
    });
    const [page, setPage] = useState(1);
    const pageSize = 3;

    // Sort data
    const sortedData = [...sampleUsers].sort((a, b) => {
      if (!sortState.direction || !sortState.key) return 0;
      const aValue = a[sortState.key as keyof User];
      const bValue = b[sortState.key as keyof User];
      const comparison = String(aValue).localeCompare(String(bValue));
      return sortState.direction === "asc" ? comparison : -comparison;
    });

    // Paginate
    const paginatedData = sortedData.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );

    const columnsWithActions: TableColumn<User>[] = [
      ...userColumns.map((col) => ({ ...col, sortable: true })),
      {
        key: "actions",
        header: "",
        width: "60px",
        align: "end",
        render: () => (
          <Dropdown
            trigger={
              <Button variant="ghost" size="sm">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            }
          >
            <DropdownItem icon={<EditIcon />}>Edit</DropdownItem>
            <DropdownItem icon={<TrashIcon />} destructive>
              Delete
            </DropdownItem>
          </Dropdown>
        ),
      },
    ];

    return (
      <div className="space-y-4">
        {selectedRows.length > 0 && (
          <div className="flex items-center gap-x-2 rounded-lg bg-muted p-3">
            <span className="text-sm font-medium">
              {selectedRows.length} selected
            </span>
            <Button variant="destructive" size="sm">
              Delete Selected
            </Button>
          </div>
        )}
        <Table
          data={paginatedData}
          columns={columnsWithActions}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          sortable
          sortState={sortState}
          onSort={setSortState}
          pagination={{
            page,
            pageSize,
            total: sampleUsers.length,
            onPageChange: setPage,
          }}
          getRowKey={(row) => row.id}
          bordered
        />
      </div>
    );
  },
};
