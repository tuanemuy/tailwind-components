import type { Meta, StoryObj } from "@storybook/react";
import { GlobeIcon } from "@/components/icons";
import { ProductPage } from ".";

const meta: Meta<typeof ProductPage> = {
  title: "Pages/ProductPage",
  component: ProductPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "gallery-left", "gallery-right", "full-width"],
    },
    loading: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductPage>;

// Logo component
const Logo = () => (
  <div className="flex items-center gap-x-2">
    <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
      <GlobeIcon className="size-5 text-primary-foreground" />
    </div>
    <span className="text-xl font-bold text-foreground">Preline</span>
  </div>
);

// Sample product
const sampleProduct = {
  id: "prod-1",
  name: "Premium Wireless Headphones",
  slug: "premium-wireless-headphones",
  description:
    "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day wear.",
  price: 299.99,
  compareAtPrice: 399.99,
  currency: "USD",
  images: [
    {
      src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      alt: "Premium Wireless Headphones - Front View",
    },
    {
      src: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
      alt: "Premium Wireless Headphones - Side View",
    },
    {
      src: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=800&q=80",
      alt: "Premium Wireless Headphones - Detail",
    },
    {
      src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
      alt: "Premium Wireless Headphones - Lifestyle",
    },
  ],
  variants: [
    {
      id: "color",
      name: "Color",
      type: "color" as const,
      options: [
        {
          id: "black",
          label: "Midnight Black",
          value: "black",
          available: true,
        },
        { id: "white", label: "Pearl White", value: "white", available: true },
        { id: "blue", label: "Ocean Blue", value: "blue", available: false },
      ],
    },
  ],
  rating: {
    average: 4.8,
    count: 256,
  },
  inStock: true,
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Premium comfort ear cushions",
    "Bluetooth 5.2 connectivity",
    "Built-in microphone",
    "Foldable design",
  ],
  specifications: [
    { label: "Driver Size", value: "40mm" },
    { label: "Frequency Response", value: "20Hz - 20kHz" },
    { label: "Impedance", value: "32 Ohms" },
    { label: "Battery Life", value: "30 hours (ANC on), 40 hours (ANC off)" },
    { label: "Charging Time", value: "2 hours" },
    { label: "Weight", value: "250g" },
    { label: "Connectivity", value: "Bluetooth 5.2, 3.5mm aux" },
  ],
  category: { name: "Audio", slug: "audio" },
};

// Sample reviews
const sampleReviews = [
  {
    id: "1",
    author: {
      name: "Alex Johnson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      verified: true,
    },
    rating: 5,
    title: "Best headphones I've ever owned!",
    content:
      "The sound quality is incredible and the noise cancellation is top-notch. Battery life is exactly as advertised. Highly recommend!",
    date: "March 10, 2025",
    helpful: 42,
  },
  {
    id: "2",
    author: {
      name: "Sarah M.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      verified: true,
    },
    rating: 4,
    title: "Great quality, minor comfort issue",
    content:
      "Sound quality is amazing and ANC works great. Only minor complaint is they can feel a bit tight after a few hours. Otherwise perfect!",
    date: "March 8, 2025",
    helpful: 18,
  },
  {
    id: "3",
    author: {
      name: "Mike T.",
    },
    rating: 5,
    title: "Worth every penny",
    content:
      "Upgraded from my old headphones and the difference is night and day. The build quality is excellent.",
    date: "March 5, 2025",
    helpful: 7,
  },
];

// Related products
const relatedProducts = [
  {
    id: "prod-2",
    name: "Wireless Earbuds Pro",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    price: { current: 149.99, currency: "USD" },
    rating: { average: 4.6, count: 189 },
    inStock: true,
  },
  {
    id: "prod-3",
    name: "Portable Speaker",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    price: { current: 79.99, currency: "USD" },
    rating: { average: 4.4, count: 124 },
    inStock: true,
  },
  {
    id: "prod-4",
    name: "Premium Headphone Stand",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    price: { current: 39.99, currency: "USD" },
    rating: { average: 4.7, count: 87 },
    inStock: true,
  },
];

// Helper to create product with reviews
const productWithReviews = {
  ...sampleProduct,
  reviews: sampleReviews,
};

// Default product page
export const Default: Story = {
  args: {
    product: productWithReviews,
    relatedProducts,
    logo: <Logo />,
    navigation: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Audio", href: "/products/audio" },
    ],
    onAddToCart: (productId, quantity, variants) =>
      console.log("Add to cart:", {
        productId,
        quantity,
        variants,
      }),
    onAddToWishlist: (productId) =>
      console.log("Add to wishlist:", productId),
  },
};

// Gallery left layout
export const GalleryLeftLayout: Story = {
  args: {
    product: productWithReviews,
    relatedProducts,
    logo: <Logo />,
    onAddToCart: (productId, quantity) =>
      console.log("Add to cart:", productId, quantity),
  },
};

// Full width layout
export const FullWidthLayout: Story = {
  args: {
    product: productWithReviews,
    logo: <Logo />,
    onAddToCart: (productId, quantity) =>
      console.log("Add to cart:", productId, quantity),
  },
};

// Out of stock product
export const OutOfStock: Story = {
  args: {
    product: {
      ...productWithReviews,
      inStock: false,
    },
    logo: <Logo />,
  },
};

// On sale product
export const OnSale: Story = {
  args: {
    product: {
      ...productWithReviews,
      price: 199.99,
      compareAtPrice: 299.99,
    },
    relatedProducts,
    logo: <Logo />,
    onAddToCart: (productId, quantity) =>
      console.log("Add to cart:", productId, quantity),
  },
};

// Without reviews
export const WithoutReviews: Story = {
  args: {
    product: sampleProduct,
    relatedProducts,
    logo: <Logo />,
    onAddToCart: (productId, quantity) =>
      console.log("Add to cart:", productId, quantity),
  },
};

// With recently viewed
export const WithRecentlyViewed: Story = {
  args: {
    product: productWithReviews,
    relatedProducts,
    recentlyViewed: relatedProducts,
    logo: <Logo />,
    onAddToCart: (productId, quantity) =>
      console.log("Add to cart:", productId, quantity),
  },
};

// Multiple variant options
export const MultipleVariants: Story = {
  args: {
    product: {
      ...productWithReviews,
      variants: [
        {
          id: "color",
          name: "Color",
          type: "color" as const,
          options: [
            {
              id: "black",
              label: "Midnight Black",
              value: "black",
              available: true,
            },
            {
              id: "white",
              label: "Pearl White",
              value: "white",
              available: true,
            },
            {
              id: "blue",
              label: "Ocean Blue",
              value: "blue",
              available: true,
            },
          ],
        },
        {
          id: "size",
          name: "Ear Cup Size",
          type: "size" as const,
          options: [
            {
              id: "standard",
              label: "Standard",
              value: "standard",
              available: true,
            },
            { id: "large", label: "Large", value: "large", available: true },
          ],
        },
      ],
    },
    logo: <Logo />,
    onAddToCart: (productId, quantity, variants) =>
      console.log("Add to cart:", {
        productId,
        quantity,
        variants,
      }),
  },
};
