import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { type Transaction, TransactionsTable } from "./index";

// Sample transactions data
const sampleTransactions: Transaction[] = [
  {
    id: "1",
    type: "credit",
    status: "completed",
    amount: 2500.0,
    currency: "USD",
    description: "Salary Deposit",
    category: { id: "1", name: "Income" },
    toAccount: {
      id: "1",
      name: "Checking Account",
      number: "****1234",
      type: "bank",
    },
    reference: "SAL-2024-001",
    date: "2024-01-15",
  },
  {
    id: "2",
    type: "debit",
    status: "completed",
    amount: 150.0,
    currency: "USD",
    description: "Electric Bill Payment",
    category: { id: "2", name: "Utilities" },
    fromAccount: {
      id: "1",
      name: "Checking Account",
      number: "****1234",
      type: "bank",
    },
    toAccount: { id: "3", name: "Electric Company", type: "bank" },
    reference: "UTIL-2024-001",
    date: "2024-01-14",
  },
  {
    id: "3",
    type: "transfer",
    status: "completed",
    amount: 500.0,
    currency: "USD",
    description: "Transfer to Savings",
    fromAccount: {
      id: "1",
      name: "Checking Account",
      number: "****1234",
      type: "bank",
    },
    toAccount: {
      id: "2",
      name: "Savings Account",
      number: "****5678",
      type: "bank",
    },
    reference: "TRF-2024-001",
    date: "2024-01-13",
  },
  {
    id: "4",
    type: "debit",
    status: "pending",
    amount: 89.99,
    currency: "USD",
    description: "Netflix Subscription",
    category: { id: "3", name: "Entertainment" },
    fromAccount: {
      id: "4",
      name: "Credit Card",
      number: "****9012",
      type: "card",
    },
    reference: "SUB-2024-001",
    date: "2024-01-12",
  },
  {
    id: "5",
    type: "refund",
    status: "completed",
    amount: 49.99,
    currency: "USD",
    description: "Product Return Refund",
    category: { id: "4", name: "Refunds" },
    toAccount: {
      id: "4",
      name: "Credit Card",
      number: "****9012",
      type: "card",
    },
    reference: "REF-2024-001",
    date: "2024-01-11",
  },
  {
    id: "6",
    type: "fee",
    status: "completed",
    amount: 2.5,
    currency: "USD",
    description: "ATM Withdrawal Fee",
    category: { id: "5", name: "Fees" },
    fromAccount: {
      id: "1",
      name: "Checking Account",
      number: "****1234",
      type: "bank",
    },
    reference: "FEE-2024-001",
    date: "2024-01-10",
  },
  {
    id: "7",
    type: "debit",
    status: "failed",
    amount: 1200.0,
    currency: "USD",
    description: "Rent Payment",
    category: { id: "6", name: "Housing" },
    fromAccount: {
      id: "1",
      name: "Checking Account",
      number: "****1234",
      type: "bank",
    },
    reference: "RENT-2024-001",
    date: "2024-01-09",
  },
];

const meta: Meta<typeof TransactionsTable> = {
  title: "Organisms/Tables/TransactionsTable",
  component: TransactionsTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default TransactionsTable
export const Default: Story = {
  args: {
    transactions: sampleTransactions,
  },
};

// With All Columns
export const WithAllColumns: Story = {
  args: {
    transactions: sampleTransactions,
    showCategory: true,
    showAccounts: true,
    showReference: true,
  },
};

// With Selection
export const WithSelection: Story = {
  render: function Render() {
    const [selectedRows, setSelectedRows] = useState<Transaction[]>([]);

    return (
      <TransactionsTable
        transactions={sampleTransactions}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        bulkActions={[
          {
            label: "Export Selected",
            onClick: (rows) => console.log("Export", rows),
          },
          {
            label: "Categorize",
            onClick: (rows) => console.log("Categorize", rows),
          },
        ]}
      />
    );
  },
};

// With Filtering
export const WithFiltering: Story = {
  args: {
    transactions: sampleTransactions,
    filterable: true,
    sortable: true,
  },
};

// Minimal View
export const MinimalView: Story = {
  args: {
    transactions: sampleTransactions,
    showCategory: false,
    showAccounts: false,
    showReference: false,
  },
};

// With Accounts
export const WithAccounts: Story = {
  args: {
    transactions: sampleTransactions,
    showCategory: false,
    showAccounts: true,
    showReference: false,
  },
};

// Compact Mode
export const CompactMode: Story = {
  args: {
    transactions: sampleTransactions,
    compact: true,
  },
};

// With Pagination
export const WithPagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const pageSize = 3;

    const paginatedTransactions = sampleTransactions.slice(
      (page - 1) * pageSize,
      page * pageSize,
    );

    return (
      <TransactionsTable
        transactions={paginatedTransactions}
        pagination={{
          page,
          pageSize,
          total: sampleTransactions.length,
          onPageChange: setPage,
        }}
      />
    );
  },
};

// Loading State
export const Loading: Story = {
  args: {
    transactions: [],
    loading: true,
  },
};

// Empty State
export const Empty: Story = {
  args: {
    transactions: [],
    emptyState: (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No transactions found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Transactions will appear here as they occur
        </p>
      </div>
    ),
  },
};
