import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DataTable, type DataTableColumn, type SortState, type FilterState } from "./index";
import { Badge, Avatar, Button } from "@/components/atoms";
import { MoreHorizontalIcon, EditIcon, TrashIcon } from "@/lib/icons";

// Sample data type
interface Person {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  department: string;
  status: "active" | "inactive" | "pending";
  joinedAt: string;
}

// Sample data
const sampleData: Person[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?u=john",
    role: "Admin",
    department: "Engineering",
    status: "active",
    joinedAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://i.pravatar.cc/150?u=jane",
    role: "Developer",
    department: "Engineering",
    status: "active",
    joinedAt: "2023-03-22",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    avatar: "https://i.pravatar.cc/150?u=bob",
    role: "Designer",
    department: "Design",
    status: "pending",
    joinedAt: "2023-06-10",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    avatar: "https://i.pravatar.cc/150?u=alice",
    role: "Manager",
    department: "Product",
    status: "active",
    joinedAt: "2022-11-05",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "Developer",
    department: "Engineering",
    status: "inactive",
    joinedAt: "2023-02-18",
  },
];

const columns: DataTableColumn<Person>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    filterable: true,
    filterType: "text",
    render: (_, row) => (
      <div className="flex items-center gap-3">
        <Avatar
          src={row.avatar}
          alt={row.name}
          fallback={row.name.slice(0, 2)}
          size="sm"
        />
        <div>
          <div className="font-medium text-foreground">{row.name}</div>
          <div className="text-sm text-muted-foreground">{row.email}</div>
        </div>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    sortable: true,
    filterable: true,
    filterType: "select",
    filterOptions: [
      { value: "Admin", label: "Admin" },
      { value: "Developer", label: "Developer" },
      { value: "Designer", label: "Designer" },
      { value: "Manager", label: "Manager" },
    ],
    render: (value) => <span className="text-sm">{String(value)}</span>,
  },
  {
    key: "department",
    header: "Department",
    sortable: true,
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    filterable: true,
    filterType: "select",
    filterOptions: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "pending", label: "Pending" },
    ],
    render: (_, row) => {
      const variants: Record<string, "success" | "secondary" | "warning"> = {
        active: "success",
        inactive: "secondary",
        pending: "warning",
      };
      return (
        <Badge variant={variants[row.status]} size="sm">
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </Badge>
      );
    },
  },
  {
    key: "joinedAt",
    header: "Joined",
    sortable: true,
    render: (value) => (
      <span className="text-sm text-muted-foreground">
        {new Date(String(value)).toLocaleDateString()}
      </span>
    ),
  },
];

const meta: Meta<typeof DataTable<Person>> = {
  title: "Organisms/Tables/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic DataTable
export const Default: Story = {
  render: () => (
    <DataTable<Person>
      data={sampleData}
      columns={columns}
      getRowKey={(row) => row.id}
    />
  ),
};

// With Sorting
export const WithSorting: Story = {
  render: function Render() {
    const [sortState, setSortState] = useState<SortState>({
      key: "name",
      direction: "asc",
    });

    const sortedData = [...sampleData].sort((a, b) => {
      if (!sortState.direction) return 0;
      const aValue = a[sortState.key as keyof Person] || "";
      const bValue = b[sortState.key as keyof Person] || "";
      const comparison = String(aValue).localeCompare(String(bValue));
      return sortState.direction === "asc" ? comparison : -comparison;
    });

    return (
      <DataTable<Person>
        data={sortedData}
        columns={columns}
        getRowKey={(row) => row.id}
        sortable
        sortState={sortState}
        onSort={setSortState}
      />
    );
  },
};

// With Selection
export const WithSelection: Story = {
  render: function Render() {
    const [selectedRows, setSelectedRows] = useState<Person[]>([]);

    return (
      <DataTable<Person>
        data={sampleData}
        columns={columns}
        getRowKey={(row) => row.id}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        bulkActions={[
          {
            label: "Delete",
            onClick: (rows) => console.log("Delete", rows),
            variant: "destructive",
          },
          {
            label: "Export",
            onClick: (rows) => console.log("Export", rows),
          },
        ]}
      />
    );
  },
};

// With Filtering
export const WithFiltering: Story = {
  render: function Render() {
    const [filterState, setFilterState] = useState<FilterState>({
      search: "",
      filters: [],
    });

    const filteredData = sampleData.filter((row) => {
      if (filterState.search) {
        const searchLower = filterState.search.toLowerCase();
        return (
          row.name.toLowerCase().includes(searchLower) ||
          row.email.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });

    return (
      <DataTable<Person>
        data={filteredData}
        columns={columns}
        getRowKey={(row) => row.id}
        filterable
        filterState={filterState}
        onFilterChange={setFilterState}
        searchPlaceholder="Search by name or email..."
      />
    );
  },
};

// With Pagination
export const WithPagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const pageSize = 2;

    const paginatedData = sampleData.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return (
      <DataTable<Person>
        data={paginatedData}
        columns={columns}
        getRowKey={(row) => row.id}
        pagination={{
          page,
          pageSize,
          total: sampleData.length,
          onPageChange: setPage,
        }}
      />
    );
  },
};

// Full Featured
export const FullFeatured: Story = {
  render: function Render() {
    const [selectedRows, setSelectedRows] = useState<Person[]>([]);
    const [sortState, setSortState] = useState<SortState>({
      key: "name",
      direction: "asc",
    });
    const [filterState, setFilterState] = useState<FilterState>({
      search: "",
      filters: [],
    });
    const [page, setPage] = useState(1);
    const pageSize = 3;

    // Apply filters
    let filteredData = [...sampleData];
    if (filterState.search) {
      const searchLower = filterState.search.toLowerCase();
      filteredData = filteredData.filter(
        (row) =>
          row.name.toLowerCase().includes(searchLower) ||
          row.email.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (sortState.direction) {
      filteredData.sort((a, b) => {
        const aValue = a[sortState.key as keyof Person] || "";
        const bValue = b[sortState.key as keyof Person] || "";
        const comparison = String(aValue).localeCompare(String(bValue));
        return sortState.direction === "asc" ? comparison : -comparison;
      });
    }

    // Apply pagination
    const paginatedData = filteredData.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return (
      <DataTable<Person>
        data={paginatedData}
        columns={columns}
        getRowKey={(row) => row.id}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        sortable
        sortState={sortState}
        onSort={setSortState}
        filterable
        filterState={filterState}
        onFilterChange={setFilterState}
        pagination={{
          page,
          pageSize,
          total: filteredData.length,
          onPageChange: setPage,
          onPageSizeChange: () => {},
          pageSizeOptions: [3, 5, 10],
        }}
        onExport={(format) => console.log("Export as", format)}
        bulkActions={[
          {
            label: "Delete",
            onClick: (rows) => console.log("Delete", rows),
            variant: "destructive",
          },
        ]}
        bordered
        striped
      />
    );
  },
};

// Loading State
export const Loading: Story = {
  render: () => (
    <DataTable<Person>
      data={[]}
      columns={columns}
      getRowKey={(row) => row.id}
      loading
    />
  ),
};

// Empty State
export const Empty: Story = {
  render: () => (
    <DataTable<Person>
      data={[]}
      columns={columns}
      getRowKey={(row) => row.id}
      emptyState={
        <div className="text-center py-8">
          <p className="text-muted-foreground">No users found</p>
          <Button variant="outline" size="sm" className="mt-2">
            Add User
          </Button>
        </div>
      }
    />
  ),
};
