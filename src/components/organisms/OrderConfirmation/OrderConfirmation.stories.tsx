import type { Meta, StoryObj } from "@storybook/react";
import {
  OrderConfirmation,
  SimpleOrderConfirmation,
  type OrderItem,
  type ShippingAddress,
} from "./index";

const meta: Meta<typeof OrderConfirmation> = {
  title: "Organisms/E-Commerce/OrderConfirmation",
  component: OrderConfirmation,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OrderConfirmation>;

const sampleItems: OrderItem[] = [
  {
    id: "1",
    name: "Guatemala Elephant Coffee",
    image: "https://images.unsplash.com/photo-1615486629862-10b0890e79b3?w=200&h=200&fit=crop",
    price: 5.5,
    quantity: 2,
    variant: "250g, Ground",
  },
  {
    id: "2",
    name: "Colombia Premium Blend",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
    price: 8.99,
    quantity: 1,
    variant: "500g, Beans",
  },
];

const shippingAddress: ShippingAddress = {
  name: "John Doe",
  address: "123 Main Street",
  city: "San Francisco",
  state: "CA",
  zipCode: "94103",
  country: "United States",
  phone: "+1 (555) 123-4567",
};

export const Default: Story = {
  args: {
    orderNumber: "ORD-2024-0001234",
    orderDate: new Date(),
    estimatedDelivery: "January 20 - January 25, 2024",
    items: sampleItems,
    subtotal: 19.99,
    shipping: 0,
    tax: 1.6,
    total: 21.59,
    currency: "USD",
    shippingAddress,
    paymentMethod: "Visa ending in 4242",
    email: "john.doe@example.com",
    onContinueShopping: () => console.log("Continue shopping"),
    onTrackOrder: () => console.log("Track order"),
  },
};

export const WithDiscount: Story = {
  args: {
    orderNumber: "ORD-2024-0001235",
    orderDate: new Date(),
    estimatedDelivery: "January 22 - January 27, 2024",
    items: sampleItems,
    subtotal: 19.99,
    shipping: 5.99,
    tax: 2.08,
    discount: 5,
    total: 23.06,
    currency: "USD",
    shippingAddress,
    paymentMethod: "Mastercard ending in 8888",
    email: "jane.doe@example.com",
    onContinueShopping: () => console.log("Continue shopping"),
    onTrackOrder: () => console.log("Track order"),
    onPrint: () => console.log("Print"),
  },
};

// Simple variant
export const Simple: StoryObj<typeof SimpleOrderConfirmation> = {
  render: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <SimpleOrderConfirmation
        orderNumber="ORD-2024-0001234"
        email="john.doe@example.com"
        onViewOrder={() => console.log("View order")}
        onContinueShopping={() => console.log("Continue shopping")}
      />
    </div>
  ),
};
