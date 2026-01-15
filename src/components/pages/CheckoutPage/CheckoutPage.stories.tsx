import type { Meta, StoryObj } from "@storybook/react";
import { CheckoutPage } from ".";
import { GlobeIcon } from "@/lib/icons";

const meta: Meta<typeof CheckoutPage> = {
  title: "Pages/CheckoutPage",
  component: CheckoutPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "single-page", "accordion"],
    },
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

// Sample cart items
const sampleCartItems = [
  {
    id: "item-1",
    productId: "prod-1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
    variant: "Midnight Black",
  },
  {
    id: "item-2",
    productId: "prod-2",
    name: "Wireless Earbuds Pro",
    price: 149.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=200&q=80",
    variant: "White",
  },
  {
    id: "item-3",
    productId: "prod-3",
    name: "Premium Headphone Stand",
    price: 39.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=200&q=80",
  },
];

// Shipping methods
const shippingMethods = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "Delivery in 5-7 business days",
    price: 9.99,
    estimatedDays: "5-7",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "Delivery in 2-3 business days",
    price: 19.99,
    estimatedDays: "2-3",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day delivery",
    price: 34.99,
    estimatedDays: "1",
  },
];

// Payment methods
const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Visa, Mastercard, American Express",
    icon: "💳",
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Pay with your PayPal account",
    icon: "🅿️",
  },
  {
    id: "applepay",
    name: "Apple Pay",
    description: "Pay with Apple Pay",
    icon: "🍎",
  },
];

// Default checkout page
export const Default: Story = {
  args: {
    cartItems: sampleCartItems,
    shippingMethods,
    paymentMethods,
    logo: <Logo />,
    currency: "$",
    subtotal: 539.96,
    tax: 48.60,
    onStepComplete: (step, data) => console.log(`Step ${step} complete:`, data),
    onOrderSubmit: (data) => console.log("Order submitted:", data),
    onApplyCoupon: (code) => {
      console.log("Apply coupon:", code);
      return { valid: code === "SAVE10", discount: 53.99, message: code === "SAVE10" ? "10% off applied!" : "Invalid code" };
    },
  },
};

// With applied coupon
export const WithCoupon: Story = {
  args: {
    cartItems: sampleCartItems,
    shippingMethods,
    paymentMethods,
    logo: <Logo />,
    currency: "$",
    subtotal: 539.96,
    discount: 53.99,
    discountCode: "SAVE10",
    tax: 43.74,
    onStepComplete: (step, data) => console.log(`Step ${step} complete:`, data),
    onOrderSubmit: (data) => console.log("Order submitted:", data),
  },
};

// Single page checkout
export const SinglePageCheckout: Story = {
  args: {
    variant: "single-page",
    cartItems: sampleCartItems,
    shippingMethods,
    paymentMethods,
    logo: <Logo />,
    currency: "$",
    subtotal: 539.96,
    tax: 48.60,
    onOrderSubmit: (data) => console.log("Order submitted:", data),
  },
};

// Accordion checkout
export const AccordionCheckout: Story = {
  args: {
    variant: "accordion",
    cartItems: sampleCartItems,
    shippingMethods,
    paymentMethods,
    logo: <Logo />,
    currency: "$",
    subtotal: 539.96,
    tax: 48.60,
    onStepComplete: (step, data) => console.log(`Step ${step} complete:`, data),
    onOrderSubmit: (data) => console.log("Order submitted:", data),
  },
};

// At shipping step
export const AtShippingStep: Story = {
  args: {
    cartItems: sampleCartItems,
    shippingMethods,
    paymentMethods,
    logo: <Logo />,
    currency: "$",
    subtotal: 539.96,
    tax: 48.60,
    currentStep: "shipping",
    contactInfo: {
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
    },
    shippingAddress: {
      address1: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "United States",
    },
    onStepComplete: (step, data) => console.log(`Step ${step} complete:`, data),
    onOrderSubmit: (data) => console.log("Order submitted:", data),
  },
};

// At payment step
export const AtPaymentStep: Story = {
  args: {
    cartItems: sampleCartItems,
    shippingMethods,
    paymentMethods,
    logo: <Logo />,
    currency: "$",
    subtotal: 539.96,
    shipping: 9.99,
    tax: 49.50,
    currentStep: "payment",
    contactInfo: {
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
    },
    shippingAddress: {
      address1: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "United States",
    },
    selectedShippingMethod: "standard",
    onStepComplete: (step, data) => console.log(`Step ${step} complete:`, data),
    onOrderSubmit: (data) => console.log("Order submitted:", data),
  },
};

// Order confirmation
export const OrderConfirmation: Story = {
  args: {
    cartItems: sampleCartItems,
    shippingMethods,
    paymentMethods,
    logo: <Logo />,
    currency: "$",
    subtotal: 539.96,
    shipping: 9.99,
    tax: 49.50,
    currentStep: "confirmation",
    orderNumber: "ORD-2025-12345",
    estimatedDelivery: "March 20-22, 2025",
    contactInfo: {
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
    },
    shippingAddress: {
      address1: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "United States",
    },
    selectedShippingMethod: "standard",
    selectedPaymentMethod: "card",
  },
};

// Loading state
export const Loading: Story = {
  args: {
    cartItems: sampleCartItems,
    shippingMethods,
    paymentMethods,
    logo: <Logo />,
    loading: true,
    currency: "$",
    subtotal: 539.96,
    tax: 48.60,
  },
};

// Empty cart
export const EmptyCart: Story = {
  args: {
    cartItems: [],
    shippingMethods,
    paymentMethods,
    logo: <Logo />,
    currency: "$",
    subtotal: 0,
    tax: 0,
    emptyCartMessage: "Your cart is empty",
    emptyCartAction: {
      label: "Continue Shopping",
      href: "/products",
    },
  },
};

// With express checkout
export const WithExpressCheckout: Story = {
  args: {
    cartItems: sampleCartItems,
    shippingMethods,
    paymentMethods,
    logo: <Logo />,
    currency: "$",
    subtotal: 539.96,
    tax: 48.60,
    showExpressCheckout: true,
    expressCheckoutOptions: [
      { id: "applepay", name: "Apple Pay", onClick: () => console.log("Apple Pay") },
      { id: "googlepay", name: "Google Pay", onClick: () => console.log("Google Pay") },
      { id: "paypal", name: "PayPal", onClick: () => console.log("PayPal Express") },
    ],
    onStepComplete: (step, data) => console.log(`Step ${step} complete:`, data),
    onOrderSubmit: (data) => console.log("Order submitted:", data),
  },
};
