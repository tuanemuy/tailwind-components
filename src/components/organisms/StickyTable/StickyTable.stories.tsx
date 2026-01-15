import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { StickyTable, type StickyTableColumn } from "./index";

// Sample data type
interface SalesData {
  id: string;
  product: string;
  category: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
  total: number;
  trend: "up" | "down" | "stable";
}

// Sample sales data
const sampleSalesData: SalesData[] = [
  {
    id: "1",
    product: "Wireless Headphones Pro",
    category: "Electronics",
    jan: 12500,
    feb: 14200,
    mar: 15800,
    apr: 13900,
    may: 16500,
    jun: 18200,
    jul: 17800,
    aug: 19500,
    sep: 21000,
    oct: 23500,
    nov: 28000,
    dec: 35000,
    total: 235900,
    trend: "up",
  },
  {
    id: "2",
    product: "Smart Watch Elite",
    category: "Wearables",
    jan: 8900,
    feb: 9200,
    mar: 10500,
    apr: 11200,
    may: 10800,
    jun: 12500,
    jul: 13200,
    aug: 14800,
    sep: 15500,
    oct: 17200,
    nov: 21000,
    dec: 26500,
    total: 171300,
    trend: "up",
  },
  {
    id: "3",
    product: "Laptop Stand Pro",
    category: "Accessories",
    jan: 3200,
    feb: 3500,
    mar: 3800,
    apr: 3600,
    may: 3400,
    jun: 3200,
    jul: 3100,
    aug: 3300,
    sep: 3500,
    oct: 3700,
    nov: 4200,
    dec: 4800,
    total: 43300,
    trend: "stable",
  },
  {
    id: "4",
    product: "USB-C Hub Ultimate",
    category: "Accessories",
    jan: 5600,
    feb: 5200,
    mar: 4800,
    apr: 4500,
    may: 4200,
    jun: 3900,
    jul: 3600,
    aug: 3400,
    sep: 3200,
    oct: 3000,
    nov: 3500,
    dec: 4000,
    total: 48900,
    trend: "down",
  },
  {
    id: "5",
    product: "Mechanical Keyboard RGB",
    category: "Peripherals",
    jan: 7800,
    feb: 8200,
    mar: 8500,
    apr: 9100,
    may: 9800,
    jun: 10200,
    jul: 10800,
    aug: 11500,
    sep: 12200,
    oct: 13500,
    nov: 16000,
    dec: 19500,
    total: 137100,
    trend: "up",
  },
  {
    id: "6",
    product: "Gaming Mouse Pro",
    category: "Peripherals",
    jan: 4500,
    feb: 4800,
    mar: 5200,
    apr: 5500,
    may: 5800,
    jun: 6200,
    jul: 6500,
    aug: 6800,
    sep: 7200,
    oct: 7800,
    nov: 9500,
    dec: 12000,
    total: 81800,
    trend: "up",
  },
  {
    id: "7",
    product: "Webcam HD Plus",
    category: "Electronics",
    jan: 2800,
    feb: 3200,
    mar: 3500,
    apr: 3300,
    may: 3100,
    jun: 2900,
    jul: 2700,
    aug: 2800,
    sep: 3000,
    oct: 3200,
    nov: 3800,
    dec: 4500,
    total: 38800,
    trend: "stable",
  },
];

// Format currency
const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

// Columns with sticky left and right
const columns: StickyTableColumn<SalesData>[] = [
  {
    key: "product",
    header: "Product",
    width: "200px",
    sticky: "left",
    render: (_, row) => (
      <div>
        <div className="font-medium text-foreground">{row.product}</div>
        <div className="text-xs text-muted-foreground">{row.category}</div>
      </div>
    ),
  },
  {
    key: "jan",
    header: "Jan",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "feb",
    header: "Feb",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "mar",
    header: "Mar",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "apr",
    header: "Apr",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "may",
    header: "May",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "jun",
    header: "Jun",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "jul",
    header: "Jul",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "aug",
    header: "Aug",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "sep",
    header: "Sep",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "oct",
    header: "Oct",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "nov",
    header: "Nov",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "dec",
    header: "Dec",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "total",
    header: "Total",
    width: "120px",
    align: "end",
    sticky: "right",
    render: (value) => (
      <span className="font-semibold text-foreground">{formatCurrency(value as number)}</span>
    ),
  },
  {
    key: "trend",
    header: "Trend",
    width: "80px",
    align: "center",
    sticky: "right",
    render: (value) => {
      const icons = {
        up: (
          <span className="text-green-600 dark:text-green-400">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </span>
        ),
        down: (
          <span className="text-red-600 dark:text-red-400">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </span>
        ),
        stable: (
          <span className="text-gray-600 dark:text-gray-400">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
          </span>
        ),
      };
      return icons[value as keyof typeof icons];
    },
  },
];

// Simple columns without sticky
const simpleColumns: StickyTableColumn<SalesData>[] = [
  {
    key: "product",
    header: "Product",
    width: "200px",
    render: (_, row) => (
      <div>
        <div className="font-medium text-foreground">{row.product}</div>
        <div className="text-xs text-muted-foreground">{row.category}</div>
      </div>
    ),
  },
  {
    key: "jan",
    header: "Jan",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "feb",
    header: "Feb",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "mar",
    header: "Mar",
    width: "100px",
    align: "end",
    render: (value) => <span className="text-sm">{formatCurrency(value as number)}</span>,
  },
  {
    key: "total",
    header: "Total",
    width: "120px",
    align: "end",
    render: (value) => (
      <span className="font-semibold text-foreground">{formatCurrency(value as number)}</span>
    ),
  },
];

const meta: Meta<typeof StickyTable<SalesData>> = {
  title: "Organisms/Tables/StickyTable",
  component: StickyTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default StickyTable with sticky columns
export const Default: Story = {
  args: {
    data: sampleSalesData,
    columns,
    getRowKey: (row) => row.id,
    maxHeight: 400,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 900 }}>
        <Story />
      </div>
    ),
  ],
};

// Sticky Header Only
export const StickyHeaderOnly: Story = {
  args: {
    data: sampleSalesData,
    columns: simpleColumns,
    getRowKey: (row) => row.id,
    maxHeight: 300,
  },
};

// With Selection
export const WithSelection: Story = {
  render: function Render() {
    const [selectedRows, setSelectedRows] = useState<SalesData[]>([]);

    return (
      <div style={{ width: "100%", maxWidth: 900 }}>
        <StickyTable
          data={sampleSalesData}
          columns={columns}
          getRowKey={(row) => row.id}
          maxHeight={400}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      </div>
    );
  },
};

// With Sorting
export const WithSorting: Story = {
  render: function Render() {
    const [sortState, setSortState] = useState({ key: "total", direction: "desc" as const });

    const sortedData = [...sampleSalesData].sort((a, b) => {
      const aVal = a[sortState.key as keyof SalesData];
      const bVal = b[sortState.key as keyof SalesData];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortState.direction === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortState.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return (
      <div style={{ width: "100%", maxWidth: 900 }}>
        <StickyTable
          data={sortedData}
          columns={columns}
          getRowKey={(row) => row.id}
          maxHeight={400}
          sortable
          sortState={sortState}
          onSort={(state) => {
            if (state.direction) {
              setSortState(state as { key: string; direction: "asc" | "desc" });
            }
          }}
        />
      </div>
    );
  },
};

// With Row Click
export const WithRowClick: Story = {
  args: {
    data: sampleSalesData,
    columns,
    getRowKey: (row) => row.id,
    maxHeight: 400,
    onRowClick: (row) => alert(`Clicked: ${row.product}`),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 900 }}>
        <Story />
      </div>
    ),
  ],
};

// With Pagination
export const WithPagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const pageSize = 3;

    const paginatedData = sampleSalesData.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return (
      <div style={{ width: "100%", maxWidth: 900 }}>
        <StickyTable
          data={paginatedData}
          columns={columns}
          getRowKey={(row) => row.id}
          maxHeight={400}
          pagination={{
            page,
            pageSize,
            total: sampleSalesData.length,
            onPageChange: setPage,
          }}
        />
      </div>
    );
  },
};

// Striped Rows
export const StripedRows: Story = {
  args: {
    data: sampleSalesData,
    columns,
    getRowKey: (row) => row.id,
    maxHeight: 400,
    striped: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 900 }}>
        <Story />
      </div>
    ),
  ],
};

// Bordered
export const Bordered: Story = {
  args: {
    data: sampleSalesData,
    columns,
    getRowKey: (row) => row.id,
    maxHeight: 400,
    bordered: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 900 }}>
        <Story />
      </div>
    ),
  ],
};

// Compact Mode
export const CompactMode: Story = {
  args: {
    data: sampleSalesData,
    columns,
    getRowKey: (row) => row.id,
    maxHeight: 400,
    compact: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 900 }}>
        <Story />
      </div>
    ),
  ],
};

// Large Max Height
export const LargeMaxHeight: Story = {
  args: {
    data: sampleSalesData,
    columns,
    getRowKey: (row) => row.id,
    maxHeight: 600,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 900 }}>
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
    loading: true,
    maxHeight: 400,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 900 }}>
        <Story />
      </div>
    ),
  ],
};

// Empty State
export const Empty: Story = {
  args: {
    data: [],
    columns,
    maxHeight: 400,
    emptyState: (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No sales data found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Data will appear here once sales are recorded
        </p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 900 }}>
        <Story />
      </div>
    ),
  ],
};
