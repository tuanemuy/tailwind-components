import type { Meta, StoryObj } from "@storybook/react";
import { ProductPage } from ".";
import { GlobeIcon } from "@/lib/icons";

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
  description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day wear.",
  price: 299.99,
  originalPrice: 399.99,
  currency: "$",
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
  ],
  variants: [
    {
      id: "color",
      name: "Color",
      options: [
        { id: "black", name: "Midnight Black", value: "black", inStock: true },
        { id: "white", name: "Pearl White", value: "white", inStock: true },
        { id: "blue", name: "Ocean Blue", value: "blue", inStock: false },
      ],
    },
  ],
  rating: 4.8,
  reviewCount: 256,
  inStock: true,
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Premium comfort ear cushions",
    "Bluetooth 5.2 connectivity",
    "Built-in microphone",
    "Foldable design",
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    "Impedance": "32 Ohms",
    "Battery Life": "30 hours (ANC on), 40 hours (ANC off)",
    "Charging Time": "2 hours",
    "Weight": "250g",
    "Connectivity": "Bluetooth 5.2, 3.5mm aux",
  },
  category: { id: "audio", name: "Audio", slug: "audio" },
  tags: ["headphones", "wireless", "noise-cancelling"],
};

// Sample reviews
const sampleReviews = [
  {
    id: "1",
    author: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    },
    rating: 5,
    title: "Best headphones I've ever owned!",
    content: "The sound quality is incredible and the noise cancellation is top-notch. Battery life is exactly as advertised. Highly recommend!",
    date: "March 10, 2025",
    verified: true,
    helpful: 42,
  },
  {
    id: "2",
    author: {
      name: "Sarah M.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    },
    rating: 4,
    title: "Great quality, minor comfort issue",
    content: "Sound quality is amazing and ANC works great. Only minor complaint is they can feel a bit tight after a few hours. Otherwise perfect!",
    date: "March 8, 2025",
    verified: true,
    helpful: 18,
  },
  {
    id: "3",
    author: {
      name: "Mike T.",
    },
    rating: 5,
    title: "Worth every penny",
    content: "Upgraded from my old headphones and the difference is night and day. The build quality is excellent.",
    date: "March 5, 2025",
    helpful: 7,
  },
];

// Related products
const relatedProducts = [
  {
    id: "prod-2",
    name: "Wireless Earbuds Pro",
    slug: "wireless-earbuds-pro",
    description: "Compact wireless earbuds with premium sound.",
    price: 149.99,
    currency: "$",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"],
    rating: 4.6,
    reviewCount: 189,
    inStock: true,
  },
  {
    id: "prod-3",
    name: "Portable Speaker",
    slug: "portable-speaker",
    description: "Powerful sound in a portable package.",
    price: 79.99,
    currency: "$",
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80"],
    rating: 4.4,
    reviewCount: 124,
    inStock: true,
  },
  {
    id: "prod-4",
    name: "Premium Headphone Stand",
    slug: "premium-headphone-stand",
    description: "Elegant stand for your headphones.",
    price: 39.99,
    currency: "$",
    images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"],
    rating: 4.7,
    reviewCount: 87,
    inStock: true,
  },
];

// Default product page
export const Default: Story = {
  args: {
    product: sampleProduct,
    reviews: sampleReviews,
    relatedProducts,
    logo: <Logo />,
    navigation: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Audio", href: "/products/audio" },
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Audio", href: "/products/audio" },
      { label: "Premium Wireless Headphones" },
    ],
    onAddToCart: (product, quantity, variants) =>
      console.log("Add to cart:", { product: product.name, quantity, variants }),
    onAddToWishlist: (product) =>
      console.log("Add to wishlist:", product.name),
    onReviewSubmit: (review) =>
      console.log("Review submitted:", review),
  },
};

// Gallery left layout
export const GalleryLeftLayout: Story = {
  args: {
    variant: "gallery-left",
    product: sampleProduct,
    reviews: sampleReviews,
    relatedProducts,
    logo: <Logo />,
    onAddToCart: (product, quantity) => console.log("Add to cart:", product.name, quantity),
  },
};

// Full width layout
export const FullWidthLayout: Story = {
  args: {
    variant: "full-width",
    product: sampleProduct,
    reviews: sampleReviews,
    logo: <Logo />,
    onAddToCart: (product, quantity) => console.log("Add to cart:", product.name, quantity),
  },
};

// Out of stock product
export const OutOfStock: Story = {
  args: {
    product: {
      ...sampleProduct,
      inStock: false,
    },
    reviews: sampleReviews,
    logo: <Logo />,
    onNotifyWhenAvailable: (email) => console.log("Notify when available:", email),
  },
};

// On sale product
export const OnSale: Story = {
  args: {
    product: {
      ...sampleProduct,
      price: 199.99,
      originalPrice: 299.99,
    },
    reviews: sampleReviews,
    relatedProducts,
    logo: <Logo />,
    onAddToCart: (product, quantity) => console.log("Add to cart:", product.name, quantity),
  },
};

// Without reviews
export const WithoutReviews: Story = {
  args: {
    product: sampleProduct,
    showReviews: false,
    relatedProducts,
    logo: <Logo />,
    onAddToCart: (product, quantity) => console.log("Add to cart:", product.name, quantity),
  },
};

// With recently viewed
export const WithRecentlyViewed: Story = {
  args: {
    product: sampleProduct,
    reviews: sampleReviews,
    relatedProducts,
    recentlyViewed: relatedProducts,
    logo: <Logo />,
    onAddToCart: (product, quantity) => console.log("Add to cart:", product.name, quantity),
  },
};

// Multiple variant options
export const MultipleVariants: Story = {
  args: {
    product: {
      ...sampleProduct,
      variants: [
        {
          id: "color",
          name: "Color",
          options: [
            { id: "black", name: "Midnight Black", value: "black", inStock: true },
            { id: "white", name: "Pearl White", value: "white", inStock: true },
            { id: "blue", name: "Ocean Blue", value: "blue", inStock: true },
          ],
        },
        {
          id: "size",
          name: "Ear Cup Size",
          options: [
            { id: "standard", name: "Standard", value: "standard", inStock: true },
            { id: "large", name: "Large", value: "large", inStock: true },
          ],
        },
      ],
    },
    reviews: sampleReviews,
    logo: <Logo />,
    onAddToCart: (product, quantity, variants) =>
      console.log("Add to cart:", { product: product.name, quantity, variants }),
  },
};
