import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InvoicesTable, type Invoice } from "./index";

// Sample invoices data
const sampleInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    client: {
      id: "1",
      name: "Acme Corp",
      email: "billing@acme.com",
      avatar: "https://i.pravatar.cc/150?u=acme",
      company: "Acme Corporation",
    },
    status: "paid",
    amount: 4500,
    tax: 450,
    total: 4950,
    currency: "USD",
    issueDate: "2024-01-01",
    dueDate: "2024-01-31",
    paidDate: "2024-01-28",
    items: [
      { description: "Web Development", quantity: 30, unitPrice: 150, total: 4500 },
    ],
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    client: {
      id: "2",
      name: "TechStart Inc",
      email: "finance@techstart.io",
      company: "TechStart Inc",
    },
    status: "sent",
    amount: 7500,
    tax: 750,
    total: 8250,
    currency: "USD",
    issueDate: "2024-01-10",
    dueDate: "2024-02-10",
    items: [
      { description: "Mobile App Design", quantity: 50, unitPrice: 150, total: 7500 },
    ],
  },
  {
    id: "3",
    invoiceNumber: "INV-003",
    client: {
      id: "3",
      name: "Global Services",
      email: "accounts@globalservices.com",
      avatar: "https://i.pravatar.cc/150?u=global",
      company: "Global Services Ltd",
    },
    status: "overdue",
    amount: 2500,
    tax: 250,
    total: 2750,
    currency: "USD",
    issueDate: "2023-12-01",
    dueDate: "2023-12-31",
    items: [
      { description: "Consulting", quantity: 10, unitPrice: 250, total: 2500 },
    ],
  },
  {
    id: "4",
    invoiceNumber: "INV-004",
    client: {
      id: "4",
      name: "StartUp Co",
      email: "hello@startup.co",
      company: "StartUp Co",
    },
    status: "draft",
    amount: 12000,
    tax: 1200,
    total: 13200,
    currency: "USD",
    issueDate: "2024-01-15",
    dueDate: "2024-02-15",
    items: [
      { description: "Full Stack Development", quantity: 80, unitPrice: 150, total: 12000 },
    ],
  },
  {
    id: "5",
    invoiceNumber: "INV-005",
    client: {
      id: "5",
      name: "Creative Agency",
      email: "finance@creative.agency",
      avatar: "https://i.pravatar.cc/150?u=creative",
      company: "Creative Agency LLC",
    },
    status: "refunded",
    amount: 3000,
    tax: 300,
    total: 3300,
    currency: "USD",
    issueDate: "2023-11-15",
    dueDate: "2023-12-15",
    paidDate: "2023-12-10",
    items: [
      { description: "Branding Package", quantity: 1, unitPrice: 3000, total: 3000 },
    ],
  },
];

const meta: Meta<typeof InvoicesTable> = {
  title: "Organisms/Tables/InvoicesTable",
  component: InvoicesTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default InvoicesTable
export const Default: Story = {
  args: {
    invoices: sampleInvoices,
  },
};

// With All Columns
export const WithAllColumns: Story = {
  args: {
    invoices: sampleInvoices,
    showClient: true,
    showItems: true,
    showDates: true,
  },
};

// With Selection
export const WithSelection: Story = {
  render: function Render() {
    const [selectedRows, setSelectedRows] = useState<Invoice[]>([]);

    return (
      <InvoicesTable
        invoices={sampleInvoices}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        bulkActions={[
          {
            label: "Send Reminder",
            onClick: (rows) => console.log("Send Reminder", rows),
          },
          {
            label: "Mark as Paid",
            onClick: (rows) => console.log("Mark as Paid", rows),
          },
          {
            label: "Void",
            onClick: (rows) => console.log("Void", rows),
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
    invoices: sampleInvoices,
    filterable: true,
    sortable: true,
  },
};

// Minimal View
export const MinimalView: Story = {
  args: {
    invoices: sampleInvoices,
    showClient: false,
    showItems: false,
    showDates: false,
  },
};

// Compact Mode
export const CompactMode: Story = {
  args: {
    invoices: sampleInvoices,
    compact: true,
  },
};

// With Pagination
export const WithPagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const pageSize = 2;

    const paginatedInvoices = sampleInvoices.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return (
      <InvoicesTable
        invoices={paginatedInvoices}
        pagination={{
          page,
          pageSize,
          total: sampleInvoices.length,
          onPageChange: setPage,
        }}
      />
    );
  },
};

// Loading State
export const Loading: Story = {
  args: {
    invoices: [],
    loading: true,
  },
};

// Empty State
export const Empty: Story = {
  args: {
    invoices: [],
    emptyState: (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No invoices found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Create your first invoice to get started
        </p>
      </div>
    ),
  },
};
