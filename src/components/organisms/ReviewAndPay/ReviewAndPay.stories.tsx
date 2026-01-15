import type { Meta, StoryObj } from "@storybook/react";
import { ReviewAndPay } from "./index";
import { Link } from "@/components/atoms";

const meta: Meta<typeof ReviewAndPay> = {
  title: "Organisms/E-Commerce/ReviewAndPay",
  component: ReviewAndPay,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ReviewAndPay>;

const sampleItems = [
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

const shippingInfo = {
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123 Main Street, Apt 4B",
  city: "San Francisco",
  state: "CA",
  zipCode: "94103",
  country: "United States",
  phone: "+1 (555) 123-4567",
};

const paymentInfo = {
  brand: "Visa",
  lastFourDigits: "4242",
  cardHolder: "John Doe",
  expiryDate: "12/25",
};

const shippingMethods = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 0,
    estimatedDays: "Jan 20 - Jan 25",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    price: 9.99,
    estimatedDays: "Jan 17 - Jan 18",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day",
    price: 19.99,
    estimatedDays: "Jan 16",
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    shippingInfo,
    paymentInfo,
    shippingMethods,
    selectedShippingMethod: "standard",
    subtotal: 19.99,
    shipping: 0,
    tax: 1.6,
    total: 21.59,
    currency: "USD",
    termsAccepted: false,
    onShippingMethodChange: (methodId) => console.log("Shipping method:", methodId),
    onEditShipping: () => console.log("Edit shipping"),
    onEditPayment: () => console.log("Edit payment"),
    onTermsChange: (accepted) => console.log("Terms:", accepted),
    onPlaceOrder: () => console.log("Place order"),
    termsLink: <Link href="#">terms and conditions</Link>,
  },
};

export const WithExpressShipping: Story = {
  args: {
    ...Default.args,
    selectedShippingMethod: "express",
    shipping: 9.99,
    total: 31.58,
    termsAccepted: true,
  },
};

export const Processing: Story = {
  args: {
    ...Default.args,
    termsAccepted: true,
    isSubmitting: true,
  },
};
