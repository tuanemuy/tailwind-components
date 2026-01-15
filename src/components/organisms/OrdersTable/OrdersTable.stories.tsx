import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { OrdersTable, type Order } from "./index";

// Sample orders data
const sampleOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001234",
    customer: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://i.pravatar.cc/150?u=john",
      phone: "+1 555-123-4567",
    },
    status: "delivered",
    paymentStatus: "paid",
    items: [
      { id: "1", name: "Wireless Headphones", quantity: 1, price: 199.99, image: "https://picsum.photos/seed/headphones/100" },
      { id: "2", name: "Phone Case", quantity: 2, price: 29.99 },
    ],
    subtotal: 259.97,
    shipping: 9.99,
    tax: 21.60,
    total: 291.56,
    currency: "USD",
    createdAt: "2024-01-10T10:30:00Z",
    trackingNumber: "1Z999AA10123456784",
  },
  {
    id: "2",
    orderNumber: "ORD-001235",
    customer: {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "https://i.pravatar.cc/150?u=jane",
    },
    status: "shipped",
    paymentStatus: "paid",
    items: [
      { id: "3", name: "Laptop Stand", quantity: 1, price: 79.99, image: "https://picsum.photos/seed/stand/100" },
    ],
    subtotal: 79.99,
    shipping: 5.99,
    tax: 6.88,
    total: 92.86,
    currency: "USD",
    createdAt: "2024-01-12T14:15:00Z",
    trackingNumber: "1Z999AA10123456785",
  },
  {
    id: "3",
    orderNumber: "ORD-001236",
    customer: {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
    },
    status: "processing",
    paymentStatus: "paid",
    items: [
      { id: "4", name: "Mechanical Keyboard", quantity: 1, price: 149.99, image: "https://picsum.photos/seed/keyboard/100" },
      { id: "5", name: "Mouse Pad XL", quantity: 1, price: 24.99 },
      { id: "6", name: "USB-C Hub", quantity: 1, price: 59.99, image: "https://picsum.photos/seed/hub/100" },
    ],
    subtotal: 234.97,
    shipping: 0,
    tax: 18.80,
    total: 253.77,
    currency: "USD",
    createdAt: "2024-01-14T09:00:00Z",
  },
  {
    id: "4",
    orderNumber: "ORD-001237",
    customer: {
      id: "4",
      name: "Alice Brown",
      email: "alice.brown@example.com",
      avatar: "https://i.pravatar.cc/150?u=alice",
    },
    status: "pending",
    paymentStatus: "pending",
    items: [
      { id: "7", name: "Webcam HD", quantity: 1, price: 89.99 },
    ],
    subtotal: 89.99,
    shipping: 7.99,
    tax: 7.84,
    total: 105.82,
    currency: "USD",
    createdAt: "2024-01-14T16:45:00Z",
  },
  {
    id: "5",
    orderNumber: "ORD-001238",
    customer: {
      id: "5",
      name: "Charlie Wilson",
      email: "charlie.wilson@example.com",
    },
    status: "cancelled",
    paymentStatus: "refunded",
    items: [
      { id: "8", name: "Monitor 27\"", quantity: 1, price: 399.99 },
    ],
    subtotal: 399.99,
    shipping: 29.99,
    tax: 34.40,
    total: 464.38,
    currency: "USD",
    createdAt: "2024-01-08T11:20:00Z",
  },
];

const meta: Meta<typeof OrdersTable> = {
  title: "Organisms/Tables/OrdersTable",
  component: OrdersTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default OrdersTable
export const Default: Story = {
  args: {
    orders: sampleOrders,
  },
};

// With All Columns
export const WithAllColumns: Story = {
  args: {
    orders: sampleOrders,
    showCustomer: true,
    showPaymentStatus: true,
    showItems: true,
    showShipping: true,
  },
};

// With Selection
export const WithSelection: Story = {
  render: function Render() {
    const [selectedRows, setSelectedRows] = useState<Order[]>([]);

    return (
      <OrdersTable
        orders={sampleOrders}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        bulkActions={[
          {
            label: "Mark as Shipped",
            onClick: (rows) => console.log("Mark as Shipped", rows),
          },
          {
            label: "Print Labels",
            onClick: (rows) => console.log("Print Labels", rows),
          },
          {
            label: "Cancel Orders",
            onClick: (rows) => console.log("Cancel Orders", rows),
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
    orders: sampleOrders,
    filterable: true,
    sortable: true,
  },
};

// Minimal View
export const MinimalView: Story = {
  args: {
    orders: sampleOrders,
    showCustomer: false,
    showPaymentStatus: false,
    showItems: false,
    showShipping: false,
  },
};

// Compact Mode
export const CompactMode: Story = {
  args: {
    orders: sampleOrders,
    compact: true,
    showItems: true,
  },
};

// With Pagination
export const WithPagination: Story = {
  render: function Render() {
    const [page, setPage] = useState(1);
    const pageSize = 2;

    const paginatedOrders = sampleOrders.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return (
      <OrdersTable
        orders={paginatedOrders}
        pagination={{
          page,
          pageSize,
          total: sampleOrders.length,
          onPageChange: setPage,
        }}
      />
    );
  },
};

// Loading State
export const Loading: Story = {
  args: {
    orders: [],
    loading: true,
  },
};

// Empty State
export const Empty: Story = {
  args: {
    orders: [],
    emptyState: (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No orders found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Orders will appear here when customers place them
        </p>
      </div>
    ),
  },
};
