import type { Meta, StoryObj } from "@storybook/react";
import {
  CheckOrderPage,
  GuestCheckoutPage,
  OrderCheckupPage,
  type OrderDetails,
} from "./index";

// =============================================================================
// CheckOrderPage Stories
// =============================================================================

const checkOrderMeta: Meta<typeof CheckOrderPage> = {
  title: "Pages/Order/CheckOrderPage",
  component: CheckOrderPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default checkOrderMeta;
type CheckOrderStory = StoryObj<typeof CheckOrderPage>;

export const DefaultCheckOrder: CheckOrderStory = {
  args: {
    onSearch: (orderId, email) => alert(`Searching: ${orderId}, ${email}`),
    onCreateAccount: () => alert("Create account"),
    onLogin: () => alert("Login"),
  },
};

export const CheckOrderLoading: CheckOrderStory = {
  args: {
    loading: true,
    onSearch: (orderId, email) => alert(`Searching: ${orderId}, ${email}`),
  },
};

export const CheckOrderWithError: CheckOrderStory = {
  args: {
    error: "Order not found. Please check your order number and email address.",
    onSearch: (orderId, email) => alert(`Searching: ${orderId}, ${email}`),
    onCreateAccount: () => alert("Create account"),
    onLogin: () => alert("Login"),
  },
};

// =============================================================================
// OrderCheckupPage Stories
// =============================================================================

const _orderCheckupMeta: Meta<typeof OrderCheckupPage> = {
  title: "Pages/Order/OrderCheckupPage",
  component: OrderCheckupPage,
  parameters: {
    layout: "fullscreen",
  },
};

type OrderCheckupStory = StoryObj<typeof OrderCheckupPage>;

const sampleOrder: OrderDetails = {
  id: "ORD-12345",
  date: "January 15, 2026",
  status: "shipped",
  statusHistory: [
    {
      status: "pending",
      date: "Jan 15, 2026 - 10:30 AM",
      description: "Order placed successfully",
    },
    {
      status: "confirmed",
      date: "Jan 15, 2026 - 10:35 AM",
      description: "Payment confirmed",
    },
    {
      status: "processing",
      date: "Jan 15, 2026 - 2:00 PM",
      description: "Order is being prepared",
    },
    {
      status: "shipped",
      date: "Jan 16, 2026 - 9:00 AM",
      description: "Package shipped via FedEx",
    },
  ],
  items: [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      variant: "Black / Over-ear",
      quantity: 1,
      price: 199.99,
    },
    {
      id: "2",
      name: "Leather Phone Case",
      image:
        "https://images.unsplash.com/photo-1541877944-ac82a091518a?w=200&h=200&fit=crop",
      variant: "Brown / iPhone 15 Pro",
      quantity: 2,
      price: 49.99,
    },
  ],
  subtotal: 299.97,
  shipping: 0,
  tax: 24.0,
  discount: 20.0,
  total: 303.97,
  currency: "USD",
  shippingAddress: {
    name: "John Doe",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
  },
  trackingNumber: "1Z999AA10123456784",
  carrier: "FedEx",
  estimatedDelivery: "January 20, 2026",
};

export const DefaultOrderCheckup: OrderCheckupStory = {
  args: {
    order: sampleOrder,
    onTrackShipment: () => alert("Track shipment"),
    onContactSupport: () => alert("Contact support"),
    onReorder: () => alert("Reorder"),
    onContinueShopping: () => alert("Continue shopping"),
  },
};

export const OrderDelivered: OrderCheckupStory = {
  args: {
    order: {
      ...sampleOrder,
      status: "delivered",
      statusHistory: [
        ...sampleOrder.statusHistory,
        {
          status: "delivered",
          date: "Jan 20, 2026 - 2:30 PM",
          description: "Package delivered to front door",
        },
      ],
    },
    onReturnItem: (itemId) => alert(`Return item: ${itemId}`),
    onReorder: () => alert("Reorder"),
    onContinueShopping: () => alert("Continue shopping"),
  },
};

export const OrderPending: OrderCheckupStory = {
  args: {
    order: {
      ...sampleOrder,
      status: "pending",
      statusHistory: [sampleOrder.statusHistory[0]],
      trackingNumber: undefined,
      carrier: undefined,
    },
    onContactSupport: () => alert("Contact support"),
    onContinueShopping: () => alert("Continue shopping"),
  },
};

export const OrderWithoutTabs: OrderCheckupStory = {
  args: {
    order: sampleOrder,
    showTabs: false,
    onTrackShipment: () => alert("Track shipment"),
    onContactSupport: () => alert("Contact support"),
  },
};

// =============================================================================
// GuestCheckoutPage Stories
// =============================================================================

const _guestCheckoutMeta: Meta<typeof GuestCheckoutPage> = {
  title: "Pages/Order/GuestCheckoutPage",
  component: GuestCheckoutPage,
  parameters: {
    layout: "fullscreen",
  },
};

type GuestCheckoutStory = StoryObj<typeof GuestCheckoutPage>;

export const DefaultGuestCheckout: GuestCheckoutStory = {
  args: {
    itemCount: 3,
    cartTotal: 149.99,
    onGuestCheckout: () => alert("Continue as guest"),
    onLogin: () => alert("Login"),
    onCreateAccount: () => alert("Create account"),
  },
};

export const GuestCheckoutWithCustomBenefits: GuestCheckoutStory = {
  args: {
    itemCount: 5,
    cartTotal: 299.99,
    benefits: [
      "Save your shipping addresses",
      "View order history anytime",
      "Get 10% off your first order",
      "Earn rewards points",
      "Early access to sales",
    ],
    onGuestCheckout: () => alert("Continue as guest"),
    onLogin: () => alert("Login"),
    onCreateAccount: () => alert("Create account"),
  },
};
