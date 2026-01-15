import type { Meta, StoryObj } from "@storybook/react";
import { ShoppingBag, MiniShoppingBag, type ShoppingBagItem } from "./index";
import { CouponInput } from "../CheckoutForm";

const meta: Meta<typeof ShoppingBag> = {
  title: "Organisms/E-Commerce/ShoppingBag",
  component: ShoppingBag,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ShoppingBag>;

const sampleItems: ShoppingBagItem[] = [
  {
    id: "1",
    name: "Guatemala Elephant Coffee",
    image: "https://images.unsplash.com/photo-1615486629862-10b0890e79b3?w=200&h=200&fit=crop",
    price: 5.5,
    quantity: 1,
    attributes: [
      { label: "Code", value: "350488" },
      { label: "Weight", value: "125g" },
      { label: "Grind", value: "Beans" },
    ],
    stockStatus: "inStock",
  },
  {
    id: "2",
    name: "El Mirador Premium Blend",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop",
    price: 6.95,
    quantity: 2,
    attributes: [
      { label: "Code", value: "350492" },
      { label: "Weight", value: "250g" },
      { label: "Grind", value: "Ground" },
    ],
    stockStatus: "lowStock",
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    currency: "USD",
    title: "Shopping bag",
    freeShippingThreshold: 25,
  },
};

export const WithPromoCode: Story = {
  args: {
    items: sampleItems,
    currency: "USD",
    title: "Shopping bag",
    freeShippingThreshold: 25,
    promoCodeInput: (
      <CouponInput
        onApply={(code) => console.log("Apply code:", code)}
      />
    ),
  },
};

export const EmptyBag: Story = {
  args: {
    items: [],
    currency: "USD",
    title: "Shopping bag",
  },
};

// MiniShoppingBag Stories
export const MiniDefault: StoryObj<typeof MiniShoppingBag> = {
  render: () => (
    <div className="p-8">
      <MiniShoppingBag
        items={sampleItems}
        currency="USD"
        onRemoveItem={(id) => console.log("Remove:", id)}
        onViewBag={() => console.log("View bag")}
        onCheckout={() => console.log("Checkout")}
      />
    </div>
  ),
};

export const MiniEmpty: StoryObj<typeof MiniShoppingBag> = {
  render: () => (
    <div className="p-8">
      <MiniShoppingBag
        items={[]}
        currency="USD"
        onViewBag={() => console.log("View bag")}
        onCheckout={() => console.log("Checkout")}
      />
    </div>
  ),
};
