import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ExpandableTable, type ExpandableTableColumn } from "./index";

// Sample data type
interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: "active" | "inactive" | "pending";
  salary: number;
  hireDate: string;
  manager: string;
  skills: string[];
  projects: { name: string; status: string; progress: number }[];
  notes: string;
}

// Sample employees data
const sampleEmployees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Engineering",
    role: "Senior Developer",
    status: "active",
    salary: 95000,
    hireDate: "2020-03-15",
    manager: "Sarah Wilson",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    projects: [
      { name: "Platform Redesign", status: "In Progress", progress: 65 },
      { name: "API Integration", status: "Completed", progress: 100 },
    ],
    notes: "Key team member, excellent communication skills.",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "Design",
    role: "UX Designer",
    status: "active",
    salary: 85000,
    hireDate: "2021-06-01",
    manager: "Michael Chen",
    skills: ["Figma", "Sketch", "User Research", "Prototyping"],
    projects: [
      { name: "Mobile App Redesign", status: "In Progress", progress: 40 },
    ],
    notes: "Strong portfolio, user-focused approach.",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    department: "Marketing",
    role: "Marketing Manager",
    status: "active",
    salary: 78000,
    hireDate: "2019-11-20",
    manager: "Emily Davis",
    skills: ["SEO", "Content Marketing", "Analytics", "Social Media"],
    projects: [
      { name: "Q1 Campaign", status: "Completed", progress: 100 },
      { name: "Brand Refresh", status: "Planning", progress: 10 },
    ],
    notes: "Experienced in B2B marketing.",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    department: "Engineering",
    role: "DevOps Engineer",
    status: "pending",
    salary: 90000,
    hireDate: "2023-01-10",
    manager: "Sarah Wilson",
    skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
    projects: [
      { name: "Infrastructure Migration", status: "In Progress", progress: 80 },
    ],
    notes: "New hire, currently onboarding.",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    department: "Sales",
    role: "Account Executive",
    status: "inactive",
    salary: 72000,
    hireDate: "2018-04-05",
    manager: "Robert Taylor",
    skills: ["Negotiation", "CRM", "Presentations", "Lead Generation"],
    projects: [],
    notes: "On leave until March.",
  },
];

// Columns
const columns: ExpandableTableColumn<Employee>[] = [
  {
    key: "name",
    header: "Name",
    width: "200px",
    render: (_, row) => (
      <div className="font-medium text-foreground">{row.name}</div>
    ),
  },
  {
    key: "department",
    header: "Department",
    width: "150px",
    render: (value) => (
      <span className="text-sm text-muted-foreground">{String(value)}</span>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (value) => (
      <span className="text-sm text-muted-foreground">{String(value)}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    width: "120px",
    align: "center",
    render: (value) => {
      const statusColors = {
        active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        inactive: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
        pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      };
      return (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            statusColors[value as keyof typeof statusColors]
          }`}
        >
          {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
        </span>
      );
    },
  },
];

const meta: Meta<typeof ExpandableTable<Employee>> = {
  title: "Organisms/Tables/ExpandableTable",
  component: ExpandableTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Render function for expanded content
const renderExpandedRow = (row: Employee) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Personal Info */}
    <div>
      <h4 className="text-sm font-semibold text-foreground mb-3">Details</h4>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Email</dt>
          <dd className="text-foreground">{row.email}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Manager</dt>
          <dd className="text-foreground">{row.manager}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Hire Date</dt>
          <dd className="text-foreground">{row.hireDate}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Salary</dt>
          <dd className="text-foreground">${row.salary.toLocaleString()}</dd>
        </div>
      </dl>
    </div>

    {/* Skills */}
    <div>
      <h4 className="text-sm font-semibold text-foreground mb-3">Skills</h4>
      <div className="flex flex-wrap gap-2">
        {row.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

    {/* Projects */}
    {row.projects.length > 0 && (
      <div className="md:col-span-2">
        <h4 className="text-sm font-semibold text-foreground mb-3">Projects</h4>
        <div className="space-y-2">
          {row.projects.map((project) => (
            <div
              key={project.name}
              className="flex items-center justify-between p-2 bg-card rounded border"
            >
              <span className="text-sm text-foreground">{project.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{project.status}</span>
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8">{project.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Notes */}
    {row.notes && (
      <div className="md:col-span-2">
        <h4 className="text-sm font-semibold text-foreground mb-2">Notes</h4>
        <p className="text-sm text-muted-foreground">{row.notes}</p>
      </div>
    )}
  </div>
);

// Default ExpandableTable
export const Default: Story = {
  args: {
    data: sampleEmployees,
    columns,
    renderExpandedRow,
    getRowKey: (row) => row.id,
  },
};

// Single Expanded Row Only
export const SingleExpanded: Story = {
  args: {
    data: sampleEmployees,
    columns,
    renderExpandedRow,
    getRowKey: (row) => row.id,
    allowMultipleExpanded: false,
  },
};

// With Controlled Expansion
export const ControlledExpansion: Story = {
  render: function Render() {
    const [expandedRows, setExpandedRows] = useState<(string | number)[]>(["1"]);

    return (
      <ExpandableTable
        data={sampleEmployees}
        columns={columns}
        renderExpandedRow={renderExpandedRow}
        getRowKey={(row) => row.id}
        expandedRows={expandedRows}
        onExpandedRowsChange={setExpandedRows}
      />
    );
  },
};

// With Selection
export const WithSelection: Story = {
  render: function Render() {
    const [selectedRows, setSelectedRows] = useState<Employee[]>([]);

    return (
      <ExpandableTable
        data={sampleEmployees}
        columns={columns}
        renderExpandedRow={renderExpandedRow}
        getRowKey={(row) => row.id}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
      />
    );
  },
};

// With Sorting
export const WithSorting: Story = {
  render: function Render() {
    const [sortState, setSortState] = useState({ key: "name", direction: "asc" as const });

    const sortedData = [...sampleEmployees].sort((a, b) => {
      const aVal = a[sortState.key as keyof Employee];
      const bVal = b[sortState.key as keyof Employee];
      if (sortState.direction === "asc") {
        return String(aVal).localeCompare(String(bVal));
      }
      return String(bVal).localeCompare(String(aVal));
    });

    return (
      <ExpandableTable
        data={sortedData}
        columns={columns}
        renderExpandedRow={renderExpandedRow}
        getRowKey={(row) => row.id}
        sortable
        sortState={sortState}
        onSort={(state) => {
          if (state.direction) {
            setSortState(state as { key: string; direction: "asc" | "desc" });
          }
        }}
      />
    );
  },
};

// With Pagination
export const WithPagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const pageSize = 2;

    const paginatedData = sampleEmployees.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return (
      <ExpandableTable
        data={paginatedData}
        columns={columns}
        renderExpandedRow={renderExpandedRow}
        getRowKey={(row) => row.id}
        pagination={{
          page,
          pageSize,
          total: sampleEmployees.length,
          onPageChange: setPage,
        }}
      />
    );
  },
};

// Compact Mode
export const CompactMode: Story = {
  args: {
    data: sampleEmployees,
    columns,
    renderExpandedRow,
    getRowKey: (row) => row.id,
    compact: true,
  },
};

// Striped Rows
export const StripedRows: Story = {
  args: {
    data: sampleEmployees,
    columns,
    renderExpandedRow,
    getRowKey: (row) => row.id,
    striped: true,
  },
};

// Bordered
export const Bordered: Story = {
  args: {
    data: sampleEmployees,
    columns,
    renderExpandedRow,
    getRowKey: (row) => row.id,
    bordered: true,
  },
};

// With Sticky Header
export const WithStickyHeader: Story = {
  args: {
    data: sampleEmployees,
    columns,
    renderExpandedRow,
    getRowKey: (row) => row.id,
    stickyHeader: true,
  },
  decorators: [
    (Story) => (
      <div style={{ height: 300, overflow: "auto" }}>
        <Story />
      </div>
    ),
  ],
};

// Loading State
export const Loading: Story = {
  args: {
    data: [],
    columns,
    renderExpandedRow,
    loading: true,
  },
};

// Empty State
export const Empty: Story = {
  args: {
    data: [],
    columns,
    renderExpandedRow,
    emptyState: (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No employees found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add employees to see them here
        </p>
      </div>
    ),
  },
};
