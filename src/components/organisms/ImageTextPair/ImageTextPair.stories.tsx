import type { Meta, StoryObj } from "@storybook/react";
import { ImageTextPair, ImageTextPairGrid } from "./index";

const meta: Meta<typeof ImageTextPair> = {
  title: "Organisms/E-Commerce/ImageTextPair",
  component: ImageTextPair,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ImageTextPair>;

export const Default: Story = {
  args: {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop",
    imageAlt: "Modern retail store",
    title: "Shop the Latest Collection",
    subtitle: "New Arrivals",
    description:
      "Discover our curated selection of premium products, handpicked for quality and style. From everyday essentials to special occasion pieces, find everything you need to elevate your lifestyle.",
    primaryAction: {
      label: "Shop Now",
      onClick: () => console.log("Shop now clicked"),
    },
    secondaryAction: {
      label: "Learn More",
      onClick: () => console.log("Learn more clicked"),
    },
  },
};

export const WithFeatures: Story = {
  args: {
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop",
    imageAlt: "Free shipping",
    title: "Free Shipping on All Orders",
    subtitle: "Limited Time Offer",
    description:
      "Enjoy complimentary standard shipping on all orders, no minimum purchase required. Plus, easy returns within 30 days.",
    features: [
      "Free standard shipping worldwide",
      "30-day hassle-free returns",
      "Secure checkout process",
      "24/7 customer support",
    ],
    primaryAction: {
      label: "Start Shopping",
      onClick: () => console.log("Start shopping clicked"),
    },
  },
};

export const WithPrice: Story = {
  args: {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    imageAlt: "Premium watch",
    title: "Classic Timepiece Collection",
    subtitle: "Luxury Watches",
    description:
      "Timeless elegance meets modern precision. Our signature watch collection features Swiss movement and premium materials.",
    price: {
      current: 299.99,
      original: 399.99,
      currency: "USD",
    },
    badge: "Sale",
    primaryAction: {
      label: "Add to Cart",
      onClick: () => console.log("Add to cart clicked"),
    },
    secondaryAction: {
      label: "View Details",
      onClick: () => console.log("View details clicked"),
    },
  },
};

export const ImageRight: Story = {
  args: {
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop",
    imageAlt: "Sustainable fashion",
    imageSide: "right",
    title: "Sustainable Fashion",
    subtitle: "Eco-Friendly",
    description:
      "We believe in fashion that doesn't cost the earth. Our sustainable collection uses organic materials and ethical manufacturing processes.",
    features: [
      "100% organic cotton",
      "Ethical manufacturing",
      "Carbon neutral shipping",
      "Recyclable packaging",
    ],
    primaryAction: {
      label: "Shop Sustainable",
      onClick: () => console.log("Shop clicked"),
    },
  },
};

export const CardVariant: Story = {
  args: {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    imageAlt: "Running shoes",
    variant: "card",
    title: "Performance Running Shoes",
    subtitle: "Athletic Footwear",
    description:
      "Engineered for speed and comfort. Our latest running shoes feature responsive cushioning and breathable mesh upper.",
    price: {
      current: 149.99,
      currency: "USD",
    },
    primaryAction: {
      label: "Buy Now",
      onClick: () => console.log("Buy clicked"),
    },
    secondaryAction: {
      label: "Size Guide",
      onClick: () => console.log("Size guide clicked"),
    },
  },
};

export const FullWidthVariant: Story = {
  args: {
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=600&fit=crop",
    imageAlt: "Fashion collection",
    variant: "fullwidth",
    aspectRatio: "auto",
    title: "Summer Collection 2024",
    subtitle: "New Season",
    description:
      "Embrace the warmth with our vibrant summer collection. Light fabrics, bold colors, and effortless style for every occasion.",
    badge: "New",
    primaryAction: {
      label: "Explore Collection",
      onClick: () => console.log("Explore clicked"),
    },
    secondaryAction: {
      label: "View Lookbook",
      onClick: () => console.log("Lookbook clicked"),
    },
  },
};

export const LandscapeAspect: Story = {
  args: {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop",
    imageAlt: "Coffee beans",
    aspectRatio: "landscape",
    title: "Artisan Coffee Collection",
    subtitle: "Premium Roasts",
    description:
      "From single-origin beans to our signature blends, experience coffee crafted with passion and precision.",
    features: [
      "Single-origin beans",
      "Small batch roasted",
      "Fair trade certified",
    ],
    primaryAction: {
      label: "Shop Coffee",
      onClick: () => console.log("Shop clicked"),
    },
  },
};

// Grid Stories
export const AlternatingGrid: StoryObj<typeof ImageTextPairGrid> = {
  render: () => (
    <ImageTextPairGrid
      items={[
        {
          image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop",
          title: "Shop the Latest Collection",
          subtitle: "New Arrivals",
          description:
            "Discover our curated selection of premium products, handpicked for quality and style.",
          primaryAction: {
            label: "Shop Now",
            onClick: () => console.log("Shop clicked"),
          },
        },
        {
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop",
          title: "Free Shipping Worldwide",
          subtitle: "Special Offer",
          description:
            "Enjoy complimentary shipping on all orders with easy returns within 30 days.",
          features: ["Free shipping", "Easy returns", "Secure checkout"],
          primaryAction: {
            label: "Learn More",
            onClick: () => console.log("Learn more clicked"),
          },
        },
        {
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop",
          title: "Sustainable Fashion",
          subtitle: "Eco-Friendly",
          description:
            "Fashion that doesn't cost the earth. Organic materials and ethical manufacturing.",
          badge: "New",
          primaryAction: {
            label: "Shop Sustainable",
            onClick: () => console.log("Sustainable clicked"),
          },
        },
      ]}
      alternating={true}
    />
  ),
};

export const CardGrid: StoryObj<typeof ImageTextPairGrid> = {
  render: () => (
    <ImageTextPairGrid
      items={[
        {
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
          title: "Running Shoes",
          subtitle: "Athletic",
          description: "Performance footwear for serious runners.",
          price: { current: 149.99, currency: "USD" },
          primaryAction: { label: "Shop Now" },
        },
        {
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
          title: "Classic Watches",
          subtitle: "Accessories",
          description: "Timeless elegance for every occasion.",
          price: { current: 299.99, original: 399.99, currency: "USD" },
          badge: "Sale",
          primaryAction: { label: "Shop Now" },
        },
      ]}
      variant="card"
      alternating={false}
    />
  ),
};
