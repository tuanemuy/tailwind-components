import type { Meta, StoryObj } from "@storybook/react";
import { ProductDetails } from "./index";

const meta: Meta<typeof ProductDetails> = {
  title: "Organisms/E-Commerce/ProductDetails",
  component: ProductDetails,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductDetails>;

const sampleImages = [
  {
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
    alt: "Red running shoe - main view",
  },
  {
    src: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop",
    alt: "Red running shoe - side view",
  },
  {
    src: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=800&fit=crop",
    alt: "Red running shoe - top view",
  },
  {
    src: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop",
    alt: "Red running shoe - detail",
  },
];

const colorVariant = {
  id: "color",
  name: "Color",
  type: "color" as const,
  options: [
    { value: "red", label: "Red", colorHex: "#EF4444", available: true },
    { value: "blue", label: "Blue", colorHex: "#3B82F6", available: true },
    { value: "black", label: "Black", colorHex: "#1F2937", available: true },
    { value: "white", label: "White", colorHex: "#F9FAFB", available: false },
  ],
};

const sizeVariant = {
  id: "size",
  name: "Size",
  type: "size" as const,
  options: [
    { value: "7", label: "US 7", available: true },
    { value: "8", label: "US 8", available: true },
    { value: "9", label: "US 9", available: true },
    { value: "10", label: "US 10", available: true },
    { value: "11", label: "US 11", available: false },
    { value: "12", label: "US 12", available: true },
  ],
};

export const Default: Story = {
  args: {
    name: "Air Max Performance Running Shoes",
    description:
      "Experience unparalleled comfort and performance with our flagship running shoes. Featuring responsive cushioning, breathable mesh upper, and a durable rubber outsole for maximum traction.",
    price: 149.99,
    currency: "USD",
    images: sampleImages,
    variants: [colorVariant, sizeVariant],
    selectedVariants: { color: "red", size: "9" },
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    stockQuantity: 15,
    sku: "AM-RUN-001-RED",
    features: [
      "Responsive cushioning technology",
      "Breathable mesh upper",
      "Durable rubber outsole",
      "Reflective details for visibility",
    ],
    deliveryInfo: "Free shipping on orders over $100. Estimated delivery: 3-5 business days.",
    returnPolicy: "Free returns within 30 days of purchase.",
    onVariantChange: (type, value) => console.log("Variant:", type, value),
    onQuantityChange: (qty) => console.log("Quantity:", qty),
    onAddToCart: (qty) => console.log("Add to cart:", qty),
    onAddToWishlist: () => console.log("Add to wishlist"),
    onShare: () => console.log("Share"),
  },
};

export const WithDiscount: Story = {
  args: {
    name: "Premium Leather Sneakers",
    description:
      "Handcrafted from premium Italian leather, these sneakers combine classic style with modern comfort. Perfect for both casual and semi-formal occasions.",
    price: 179.99,
    originalPrice: 249.99,
    currency: "USD",
    images: [
      {
        src: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=800&fit=crop",
        alt: "Leather sneakers",
      },
      {
        src: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop",
        alt: "Leather sneakers side",
      },
    ],
    variants: [
      {
        id: "color",
        name: "Color",
        type: "color",
        options: [
          { value: "brown", label: "Brown", colorHex: "#92400E", available: true },
          { value: "black", label: "Black", colorHex: "#1F2937", available: true },
          { value: "tan", label: "Tan", colorHex: "#D97706", available: true },
        ],
      },
      sizeVariant,
    ],
    selectedVariants: { color: "brown", size: "10" },
    rating: 4.8,
    reviewCount: 64,
    inStock: true,
    badges: [{ label: "Best Seller", variant: "secondary" }],
    features: [
      "Premium Italian leather",
      "Memory foam insole",
      "Hand-stitched details",
    ],
    onAddToCart: (qty) => console.log("Add to cart:", qty),
    onAddToWishlist: () => console.log("Add to wishlist"),
  },
};

export const OutOfStock: Story = {
  args: {
    name: "Limited Edition Collaboration Sneakers",
    description:
      "A rare collaboration between two iconic brands. Featuring unique design elements and premium materials.",
    price: 299.99,
    currency: "USD",
    images: [
      {
        src: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&h=800&fit=crop",
        alt: "Limited edition sneakers",
      },
    ],
    variants: [colorVariant],
    selectedVariants: { color: "black" },
    rating: 5.0,
    reviewCount: 42,
    inStock: false,
    badges: [{ label: "Limited Edition", variant: "default" }],
    onAddToWishlist: () => console.log("Add to wishlist"),
    onShare: () => console.log("Share"),
  },
};

export const LowStock: Story = {
  args: {
    name: "Classic Canvas Sneakers",
    description:
      "Timeless canvas sneakers that never go out of style. Comfortable, versatile, and perfect for everyday wear.",
    price: 59.99,
    currency: "USD",
    images: [
      {
        src: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop",
        alt: "Canvas sneakers",
      },
      {
        src: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800&h=800&fit=crop",
        alt: "Canvas sneakers detail",
      },
    ],
    variants: [
      {
        id: "color",
        name: "Color",
        type: "color",
        options: [
          { value: "white", label: "White", colorHex: "#FFFFFF", available: true },
          { value: "navy", label: "Navy", colorHex: "#1E3A5F", available: true },
          { value: "red", label: "Red", colorHex: "#DC2626", available: true },
        ],
      },
      sizeVariant,
    ],
    selectedVariants: { color: "white", size: "9" },
    rating: 4.2,
    reviewCount: 256,
    inStock: true,
    stockQuantity: 3,
    features: [
      "100% cotton canvas",
      "Rubber toe cap",
      "Cushioned insole",
    ],
    deliveryInfo: "Ships within 1-2 business days",
    returnPolicy: "30-day easy returns",
    onVariantChange: (type, value) => console.log("Variant:", type, value),
    onAddToCart: (qty) => console.log("Add to cart:", qty),
  },
};

export const StickyLayout: Story = {
  args: {
    ...Default.args,
    layout: "sticky",
  },
};

export const SplitLayout: Story = {
  args: {
    ...Default.args,
    layout: "split",
  },
};

export const GalleryRight: Story = {
  args: {
    ...Default.args,
    galleryPosition: "right",
  },
};

export const MinimalProduct: Story = {
  args: {
    name: "Basic T-Shirt",
    description: "A comfortable everyday essential.",
    price: 24.99,
    currency: "USD",
    images: [
      {
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
        alt: "White t-shirt",
      },
    ],
    inStock: true,
    onAddToCart: (qty) => console.log("Add to cart:", qty),
  },
};

export const WithAdditionalContent: Story = {
  args: {
    ...Default.args,
    additionalContent: (
      <div className="mt-6 p-4 rounded-lg bg-muted">
        <h4 className="font-medium text-foreground mb-2">Size Guide</h4>
        <p className="text-sm text-muted-foreground">
          Not sure about your size? Check our detailed size guide or contact our support team for assistance.
        </p>
      </div>
    ),
  },
};
