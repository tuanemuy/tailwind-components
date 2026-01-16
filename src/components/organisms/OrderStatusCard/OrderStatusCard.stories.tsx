import type { Meta, StoryObj } from "@storybook/react";
import {
  ExchangeReturnCard,
  OrderStatusCard,
  type OrderStatusStep,
} from "./index";

const meta: Meta<typeof OrderStatusCard> = {
  title: "Organisms/E-Commerce/OrderStatusCard",
  component: OrderStatusCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OrderStatusCard>;

const sampleItems = [
  {
    id: "1",
    name: "Guatemala Elephant Coffee",
    image:
      "https://images.unsplash.com/photo-1615486629862-10b0890e79b3?w=200&h=200&fit=crop",
    price: 5.5,
    quantity: 2,
    variant: "250g, Ground",
  },
  {
    id: "2",
    name: "Colombia Premium Blend",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
    price: 8.99,
    quantity: 1,
    variant: "500g, Beans",
  },
];

const orderSteps: OrderStatusStep[] = [
  { status: "confirmed", label: "Confirmed", date: "Jan 15", completed: true },
  {
    status: "processing",
    label: "Processing",
    date: "Jan 16",
    completed: true,
  },
  {
    status: "shipped",
    label: "Shipped",
    date: "Jan 17",
    completed: true,
    current: true,
  },
  { status: "delivered", label: "Delivered", completed: false },
];

export const Shipped: Story = {
  args: {
    orderNumber: "ORD-2024-0001234",
    orderDate: new Date("2024-01-15"),
    currentStatus: "shipped",
    steps: orderSteps,
    items: sampleItems,
    total: 19.99,
    currency: "USD",
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    estimatedDelivery: "Jan 20 - Jan 22, 2024",
    onTrackShipment: () => console.log("Track shipment"),
    onViewDetails: () => console.log("View details"),
  },
};

export const Delivered: Story = {
  args: {
    orderNumber: "ORD-2024-0001234",
    orderDate: new Date("2024-01-10"),
    currentStatus: "delivered",
    steps: [
      {
        status: "confirmed",
        label: "Confirmed",
        date: "Jan 10",
        completed: true,
      },
      {
        status: "processing",
        label: "Processing",
        date: "Jan 11",
        completed: true,
      },
      { status: "shipped", label: "Shipped", date: "Jan 12", completed: true },
      {
        status: "delivered",
        label: "Delivered",
        date: "Jan 14",
        completed: true,
        current: true,
      },
    ],
    items: sampleItems,
    total: 19.99,
    currency: "USD",
    onViewDetails: () => console.log("View details"),
    onReturnOrder: () => console.log("Return order"),
  },
};

export const Pending: Story = {
  args: {
    orderNumber: "ORD-2024-0001235",
    orderDate: new Date(),
    currentStatus: "pending",
    steps: [
      { status: "pending", label: "Pending", completed: false, current: true },
      { status: "confirmed", label: "Confirmed", completed: false },
      { status: "shipped", label: "Shipped", completed: false },
      { status: "delivered", label: "Delivered", completed: false },
    ],
    items: sampleItems,
    total: 19.99,
    currency: "USD",
    onViewDetails: () => console.log("View details"),
    onCancelOrder: () => console.log("Cancel order"),
  },
};

export const Cancelled: Story = {
  args: {
    orderNumber: "ORD-2024-0001236",
    orderDate: new Date("2024-01-12"),
    currentStatus: "cancelled",
    steps: [
      {
        status: "confirmed",
        label: "Confirmed",
        date: "Jan 12",
        completed: true,
      },
      {
        status: "cancelled",
        label: "Cancelled",
        date: "Jan 13",
        completed: true,
        current: true,
      },
    ],
    items: sampleItems,
    total: 19.99,
    currency: "USD",
    onViewDetails: () => console.log("View details"),
  },
};

export const Compact: Story = {
  args: {
    orderNumber: "ORD-2024-0001234",
    orderDate: new Date("2024-01-15"),
    currentStatus: "shipped",
    steps: orderSteps,
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    compact: true,
    onTrackShipment: () => console.log("Track shipment"),
    onViewDetails: () => console.log("View details"),
  },
};

// ExchangeReturnCard Stories
export const ReturnRequest: StoryObj<typeof ExchangeReturnCard> = {
  render: () => (
    <ExchangeReturnCard
      orderNumber="ORD-2024-0001234"
      type="return"
      items={[
        {
          id: "1",
          name: "Guatemala Elephant Coffee",
          image:
            "https://images.unsplash.com/photo-1615486629862-10b0890e79b3?w=200&h=200&fit=crop",
          variant: "250g, Ground",
          quantity: 2,
          price: 5.5,
          selected: false,
        },
        {
          id: "2",
          name: "Colombia Premium Blend",
          image:
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
          variant: "500g, Beans",
          quantity: 1,
          price: 8.99,
          selected: true,
          reason: "Wrong item",
        },
      ]}
      onItemSelect={(id, selected) => console.log("Select:", id, selected)}
      onReasonChange={(id, reason) => console.log("Reason:", id, reason)}
      onSubmit={() => console.log("Submit")}
      onCancel={() => console.log("Cancel")}
    />
  ),
};

export const ExchangeRequest: StoryObj<typeof ExchangeReturnCard> = {
  render: () => (
    <ExchangeReturnCard
      orderNumber="ORD-2024-0001234"
      type="exchange"
      items={[
        {
          id: "1",
          name: "Premium T-Shirt",
          image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
          variant: "Size M, Black",
          quantity: 1,
          price: 29.99,
          selected: true,
          reason: "Wrong size",
        },
      ]}
      onItemSelect={(id, selected) => console.log("Select:", id, selected)}
      onReasonChange={(id, reason) => console.log("Reason:", id, reason)}
      onSubmit={() => console.log("Submit")}
      onCancel={() => console.log("Cancel")}
    />
  ),
};
