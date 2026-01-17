import type { Meta, StoryObj } from "@storybook/react";
import { GlobeIcon } from "@/components/icons";
import { CheckoutPage } from ".";

const meta: Meta<typeof CheckoutPage> = {
  title: "Pages/CheckoutPage",
  component: CheckoutPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckoutPage>;

// Logo component
const Logo = () => (
  <div className="flex items-center gap-x-2">
    <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
      <GlobeIcon className="size-5 text-primary-foreground" />
    </div>
    <span className="text-xl font-bold text-foreground">Preline</span>
  </div>
);

// Sample order items
const sampleItems = [
  {
    id: "item-1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
    variant: "Midnight Black",
  },
  {
    id: "item-2",
    name: "Wireless Earbuds Pro",
    price: 149.99,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=200&q=80",
    variant: "White",
  },
  {
    id: "item-3",
    name: "Premium Headphone Stand",
    price: 39.99,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=200&q=80",
  },
];

// Shipping methods
const shippingMethods = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 9.99,
    estimatedDays: "5-7 days",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    price: 19.99,
    estimatedDays: "2-3 days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day",
    price: 24.99,
    estimatedDays: "1 day",
  },
];

// Default checkout page
export const Default: Story = {
  args: {
    items: sampleItems,
    shippingMethods,
    logo: <Logo />,
    currency: "USD",
    subtotal: 639.96,
    tax: 57.6,
    total: 697.56,
    onSubmit: (data) => console.log("Order submitted:", data),
    onApplyCoupon: (code) => {
      console.log("Apply coupon:", code);
    },
  },
};

// With applied coupon
export const WithCoupon: Story = {
  args: {
    items: sampleItems,
    shippingMethods,
    logo: <Logo />,
    currency: "USD",
    subtotal: 639.96,
    discount: 64.0,
    couponCode: "SAVE10",
    couponDiscount: 64.0,
    tax: 51.84,
    total: 627.8,
    onSubmit: (data) => console.log("Order submitted:", data),
  },
};

// With shipping cost
export const WithShipping: Story = {
  args: {
    items: sampleItems,
    shippingMethods,
    logo: <Logo />,
    currency: "USD",
    subtotal: 639.96,
    shipping: 9.99,
    tax: 58.5,
    total: 708.45,
    onSubmit: (data) => console.log("Order submitted:", data),
  },
};

// Loading state
export const Loading: Story = {
  args: {
    items: sampleItems,
    shippingMethods,
    logo: <Logo />,
    loading: true,
    currency: "USD",
    subtotal: 639.96,
    tax: 57.6,
    total: 697.56,
  },
};

// Empty cart
export const EmptyCart: Story = {
  args: {
    items: [],
    shippingMethods,
    logo: <Logo />,
    currency: "USD",
    subtotal: 0,
    tax: 0,
    total: 0,
  },
};

// Order confirmation (with orderId)
export const OrderConfirmation: Story = {
  args: {
    items: sampleItems,
    shippingMethods,
    logo: <Logo />,
    currency: "USD",
    subtotal: 639.96,
    shipping: 9.99,
    tax: 58.5,
    total: 708.45,
    orderId: "ORD-2025-12345",
    orderDate: "March 15, 2025",
    estimatedDelivery: "March 20-22, 2025",
  },
};
