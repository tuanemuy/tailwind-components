import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CompactTable, type CompactTableColumn } from "./index";

// Sample data type
interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  source: string;
  message: string;
  requestId: string;
  duration: number;
  userId?: string;
}

// Sample log entries
const sampleLogEntries: LogEntry[] = [
  {
    id: "1",
    timestamp: "2024-01-14T10:23:45.123Z",
    level: "info",
    source: "api-gateway",
    message: "Request received: GET /api/users",
    requestId: "req-abc123",
    duration: 45,
    userId: "user-001",
  },
  {
    id: "2",
    timestamp: "2024-01-14T10:23:45.168Z",
    level: "debug",
    source: "auth-service",
    message: "Token validated successfully",
    requestId: "req-abc123",
    duration: 12,
    userId: "user-001",
  },
  {
    id: "3",
    timestamp: "2024-01-14T10:23:45.180Z",
    level: "info",
    source: "user-service",
    message: "Fetching user list from database",
    requestId: "req-abc123",
    duration: 85,
  },
  {
    id: "4",
    timestamp: "2024-01-14T10:23:45.265Z",
    level: "warn",
    source: "cache",
    message: "Cache miss for key: users-list",
    requestId: "req-abc123",
    duration: 2,
  },
  {
    id: "5",
    timestamp: "2024-01-14T10:23:45.350Z",
    level: "info",
    source: "api-gateway",
    message: "Response sent: 200 OK",
    requestId: "req-abc123",
    duration: 227,
    userId: "user-001",
  },
  {
    id: "6",
    timestamp: "2024-01-14T10:23:46.001Z",
    level: "error",
    source: "payment-service",
    message: "Failed to process payment: Invalid card number",
    requestId: "req-def456",
    duration: 1523,
    userId: "user-002",
  },
  {
    id: "7",
    timestamp: "2024-01-14T10:23:46.500Z",
    level: "info",
    source: "notification-service",
    message: "Email sent: Order confirmation",
    requestId: "req-ghi789",
    duration: 342,
    userId: "user-003",
  },
  {
    id: "8",
    timestamp: "2024-01-14T10:23:47.123Z",
    level: "debug",
    source: "api-gateway",
    message: "Rate limit check passed",
    requestId: "req-jkl012",
    duration: 3,
  },
  {
    id: "9",
    timestamp: "2024-01-14T10:23:47.500Z",
    level: "warn",
    source: "inventory-service",
    message: "Low stock warning: Product SKU-12345",
    requestId: "req-mno345",
    duration: 78,
  },
  {
    id: "10",
    timestamp: "2024-01-14T10:23:48.000Z",
    level: "error",
    source: "database",
    message: "Connection timeout: Retry attempt 1/3",
    requestId: "req-pqr678",
    duration: 5000,
  },
  {
    id: "11",
    timestamp: "2024-01-14T10:23:53.000Z",
    level: "info",
    source: "database",
    message: "Connection restored successfully",
    requestId: "req-pqr678",
    duration: 15,
  },
  {
    id: "12",
    timestamp: "2024-01-14T10:23:54.200Z",
    level: "info",
    source: "scheduler",
    message: "Cron job started: daily-cleanup",
    requestId: "req-stu901",
    duration: 0,
  },
];

// Format timestamp
const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  } as Intl.DateTimeFormatOptions);
};

// Columns
const columns: CompactTableColumn<LogEntry>[] = [
  {
    key: "timestamp",
    header: "Time",
    width: "100px",
    render: (value) => (
      <span className="font-mono text-muted-foreground">{formatTime(value as string)}</span>
    ),
  },
  {
    key: "level",
    header: "Level",
    width: "70px",
    align: "center",
    render: (value) => {
      const colors = {
        info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        warn: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        error: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        debug: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
      };
      return (
        <span
          className={`inline-flex px-1.5 py-0.5 text-[10px] font-medium uppercase rounded ${
            colors[value as keyof typeof colors]
          }`}
        >
          {String(value)}
        </span>
      );
    },
  },
  {
    key: "source",
    header: "Source",
    width: "140px",
    render: (value) => (
      <span className="font-mono text-foreground">{String(value)}</span>
    ),
  },
  {
    key: "message",
    header: "Message",
    render: (value) => (
      <span className="text-muted-foreground truncate block max-w-md">{String(value)}</span>
    ),
  },
  {
    key: "requestId",
    header: "Request ID",
    width: "110px",
    hideInCompact: true,
    render: (value) => (
      <span className="font-mono text-xs text-muted-foreground">{String(value)}</span>
    ),
  },
  {
    key: "duration",
    header: "Duration",
    width: "80px",
    align: "end",
    render: (value) => {
      const ms = value as number;
      const color = ms > 1000 ? "text-red-600" : ms > 100 ? "text-yellow-600" : "text-green-600";
      return <span className={`font-mono ${color}`}>{ms}ms</span>;
    },
  },
  {
    key: "userId",
    header: "User",
    width: "90px",
    hideInCompact: true,
    render: (value) => (
      <span className="font-mono text-xs text-muted-foreground">{value ? String(value) : "-"}</span>
    ),
  },
];

const meta: Meta<typeof CompactTable<LogEntry>> = {
  title: "Organisms/Tables/CompactTable",
  component: CompactTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default CompactTable
export const Default: Story = {
  args: {
    data: sampleLogEntries,
    columns,
    getRowKey: (row) => row.id,
    density: "compact",
  },
};

// Density: Normal
export const DensityNormal: Story = {
  args: {
    data: sampleLogEntries,
    columns,
    getRowKey: (row) => row.id,
    density: "normal",
  },
};

// Density: Comfortable
export const DensityComfortable: Story = {
  args: {
    data: sampleLogEntries,
    columns,
    getRowKey: (row) => row.id,
    density: "comfortable",
  },
};

// Density: Ultra Compact
export const DensityUltra: Story = {
  args: {
    data: sampleLogEntries,
    columns,
    getRowKey: (row) => row.id,
    density: "ultra",
  },
};

// Density Comparison
export const DensityComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Normal Density</h3>
        <CompactTable
          data={sampleLogEntries.slice(0, 3)}
          columns={columns}
          getRowKey={(row) => row.id}
          density="normal"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Comfortable Density</h3>
        <CompactTable
          data={sampleLogEntries.slice(0, 3)}
          columns={columns}
          getRowKey={(row) => row.id}
          density="comfortable"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Compact Density (Default)</h3>
        <CompactTable
          data={sampleLogEntries.slice(0, 3)}
          columns={columns}
          getRowKey={(row) => row.id}
          density="compact"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Ultra Compact Density</h3>
        <CompactTable
          data={sampleLogEntries.slice(0, 3)}
          columns={columns}
          getRowKey={(row) => row.id}
          density="ultra"
        />
      </div>
    </div>
  ),
};

// With Grid Lines
export const WithGridLines: Story = {
  args: {
    data: sampleLogEntries,
    columns,
    getRowKey: (row) => row.id,
    density: "compact",
    gridLines: true,
  },
};

// With Row Numbers
export const WithRowNumbers: Story = {
  args: {
    data: sampleLogEntries,
    columns,
    getRowKey: (row) => row.id,
    density: "compact",
    showRowNumbers: true,
  },
};

// With Selection
export const WithSelection: Story = {
  render: function Render() {
    const [selectedRows, setSelectedRows] = useState<LogEntry[]>([]);

    return (
      <CompactTable
        data={sampleLogEntries}
        columns={columns}
        getRowKey={(row) => row.id}
        density="compact"
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
    const [sortState, setSortState] = useState({ key: "timestamp", direction: "desc" as const });

    const sortedData = [...sampleLogEntries].sort((a, b) => {
      const aVal = a[sortState.key as keyof LogEntry];
      const bVal = b[sortState.key as keyof LogEntry];
      if (sortState.direction === "asc") {
        return String(aVal).localeCompare(String(bVal));
      }
      return String(bVal).localeCompare(String(aVal));
    });

    return (
      <CompactTable
        data={sortedData}
        columns={columns}
        getRowKey={(row) => row.id}
        density="compact"
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
    const pageSize = 5;

    const paginatedData = sampleLogEntries.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return (
      <CompactTable
        data={paginatedData}
        columns={columns}
        getRowKey={(row) => row.id}
        density="compact"
        pagination={{
          page,
          pageSize,
          total: sampleLogEntries.length,
          onPageChange: setPage,
        }}
      />
    );
  },
};

// With Row Click
export const WithRowClick: Story = {
  args: {
    data: sampleLogEntries,
    columns,
    getRowKey: (row) => row.id,
    density: "compact",
    onRowClick: (row) => alert(`Log ID: ${row.id}\nMessage: ${row.message}`),
  },
};

// Striped (disabled)
export const NotStriped: Story = {
  args: {
    data: sampleLogEntries,
    columns,
    getRowKey: (row) => row.id,
    density: "compact",
    striped: false,
  },
};

// Without Border
export const NoBorder: Story = {
  args: {
    data: sampleLogEntries,
    columns,
    getRowKey: (row) => row.id,
    density: "compact",
    bordered: false,
  },
};

// With Sticky Header
export const WithStickyHeader: Story = {
  args: {
    data: sampleLogEntries,
    columns,
    getRowKey: (row) => row.id,
    density: "compact",
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

// Full Featured
export const FullFeatured: Story = {
  render: function Render() {
    const [selectedRows, setSelectedRows] = useState<LogEntry[]>([]);
    const [sortState, setSortState] = useState({ key: "timestamp", direction: "desc" as const });
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const sortedData = [...sampleLogEntries].sort((a, b) => {
      const aVal = a[sortState.key as keyof LogEntry];
      const bVal = b[sortState.key as keyof LogEntry];
      if (sortState.direction === "asc") {
        return String(aVal).localeCompare(String(bVal));
      }
      return String(bVal).localeCompare(String(aVal));
    });

    const paginatedData = sortedData.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return (
      <div style={{ height: 400, overflow: "auto" }}>
        <CompactTable
          data={paginatedData}
          columns={columns}
          getRowKey={(row) => row.id}
          density="compact"
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          sortable
          sortState={sortState}
          onSort={(state) => {
            if (state.direction) {
              setSortState(state as { key: string; direction: "asc" | "desc" });
            }
          }}
          pagination={{
            page,
            pageSize,
            total: sampleLogEntries.length,
            onPageChange: setPage,
          }}
          showRowNumbers
          gridLines
          stickyHeader
        />
      </div>
    );
  },
};

// Loading State
export const Loading: Story = {
  args: {
    data: [],
    columns,
    density: "compact",
    loading: true,
  },
};

// Empty State
export const Empty: Story = {
  args: {
    data: [],
    columns,
    density: "compact",
    emptyState: (
      <div className="text-center py-4">
        <p className="text-muted-foreground text-xs">No log entries found</p>
        <p className="text-xs text-muted-foreground mt-1">
          Logs will appear here as events occur
        </p>
      </div>
    ),
  },
};
