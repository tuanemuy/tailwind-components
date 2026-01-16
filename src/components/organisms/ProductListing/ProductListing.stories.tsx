import type { Meta, StoryObj } from "@storybook/react";
import {
  ProductListing,
  ProductListingGrid,
  type ProductListingItem,
  ProductListingSlider,
} from "./index";

const meta: Meta<typeof ProductListing> = {
  title: "Organisms/E-Commerce/ProductListing",
  component: ProductListing,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductListing>;

const sampleProducts: ProductListingItem[] = [
  {
    id: "1",
    name: "Air Max Performance Running Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    price: { current: 149.99, currency: "USD" },
    rating: { value: 4.5, count: 128 },
    badges: [{ type: "new", label: "New" }],
    category: "Running",
    inStock: true,
  },
  {
    id: "2",
    name: "Classic Leather Sneakers",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop",
    price: { current: 179.99, original: 249.99, currency: "USD" },
    rating: { value: 4.8, count: 64 },
    badges: [{ type: "sale", value: "-28%" }],
    category: "Casual",
    inStock: true,
  },
  {
    id: "3",
    name: "Canvas High-Top Sneakers",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    price: { current: 59.99, currency: "USD" },
    rating: { value: 4.2, count: 256 },
    category: "Classic",
    inStock: true,
  },
  {
    id: "4",
    name: "Trail Running Shoes",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    price: { current: 129.99, currency: "USD" },
    rating: { value: 4.6, count: 89 },
    badges: [{ type: "featured", label: "Best Seller" }],
    category: "Trail",
    inStock: true,
  },
  {
    id: "5",
    name: "Limited Edition Collaboration",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop",
    price: { current: 299.99, currency: "USD" },
    rating: { value: 5.0, count: 42 },
    badges: [{ type: "featured", label: "Limited" }],
    category: "Limited",
    inStock: false,
  },
  {
    id: "6",
    name: "Everyday Comfort Slip-Ons",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    price: { current: 79.99, currency: "USD" },
    rating: { value: 4.3, count: 167 },
    category: "Casual",
    inStock: true,
  },
  {
    id: "7",
    name: "Minimalist Training Shoes",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop",
    price: { current: 99.99, original: 129.99, currency: "USD" },
    rating: { value: 4.4, count: 95 },
    badges: [{ type: "sale", value: "-23%" }],
    category: "Training",
    inStock: true,
  },
  {
    id: "8",
    name: "Retro Basketball Sneakers",
    image:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop",
    price: { current: 139.99, currency: "USD" },
    rating: { value: 4.7, count: 203 },
    badges: [{ type: "new", label: "New" }],
    category: "Basketball",
    inStock: true,
  },
];

export const Grid4Columns: Story = {
  args: {
    products: sampleProducts,
    variant: "grid",
    columns: 4,
    showQuickActions: true,
    showRating: true,
    showCategory: false,
    onProductClick: (product) => console.log("Product clicked:", product.name),
    onQuickView: (product) => console.log("Quick view:", product.name),
    onAddToWishlist: (product) => console.log("Add to wishlist:", product.name),
    onAddToCart: (product) => console.log("Add to cart:", product.name),
  },
};

export const Grid3Columns: Story = {
  args: {
    ...Grid4Columns.args,
    columns: 3,
  },
};

export const Grid2Columns: Story = {
  args: {
    ...Grid4Columns.args,
    columns: 2,
    products: sampleProducts.slice(0, 4),
  },
};

export const Grid5Columns: Story = {
  args: {
    ...Grid4Columns.args,
    columns: 5,
  },
};

export const WithCategory: Story = {
  args: {
    ...Grid4Columns.args,
    showCategory: true,
    columns: 4,
  },
};

export const NoQuickActions: Story = {
  args: {
    ...Grid4Columns.args,
    showQuickActions: false,
  },
};

export const NoRatings: Story = {
  args: {
    ...Grid4Columns.args,
    showRating: false,
  },
};

export const ListView: Story = {
  args: {
    products: sampleProducts.slice(0, 4),
    variant: "list",
    showRating: true,
    showCategory: true,
    onProductClick: (product) => console.log("Product clicked:", product.name),
    onAddToWishlist: (product) => console.log("Add to wishlist:", product.name),
    onAddToCart: (product) => console.log("Add to cart:", product.name),
  },
};

export const SliderView: Story = {
  args: {
    products: sampleProducts,
    variant: "slider",
    showQuickActions: true,
    showRating: true,
    onProductClick: (product) => console.log("Product clicked:", product.name),
    onQuickView: (product) => console.log("Quick view:", product.name),
    onAddToWishlist: (product) => console.log("Add to wishlist:", product.name),
  },
};

// ProductListingSlider Stories
export const SliderWithArrows: StoryObj<typeof ProductListingSlider> = {
  render: () => (
    <ProductListingSlider
      products={sampleProducts}
      showArrows={true}
      showQuickActions={true}
      showRating={true}
      onProductClick={(product) =>
        console.log("Product clicked:", product.name)
      }
      onQuickView={(product) => console.log("Quick view:", product.name)}
      onAddToWishlist={(product) =>
        console.log("Add to wishlist:", product.name)
      }
    />
  ),
};

export const SliderNoArrows: StoryObj<typeof ProductListingSlider> = {
  render: () => (
    <ProductListingSlider
      products={sampleProducts}
      showArrows={false}
      showRating={true}
      onProductClick={(product) =>
        console.log("Product clicked:", product.name)
      }
    />
  ),
};

// ProductListingGrid Stories
export const GridWithHeader: StoryObj<typeof ProductListingGrid> = {
  render: () => (
    <ProductListingGrid
      title="New Arrivals"
      description="Check out the latest additions to our collection"
      products={sampleProducts.slice(0, 4)}
      columns={4}
      showQuickActions={true}
      showRating={true}
      viewAllLink="#"
      onProductClick={(product) =>
        console.log("Product clicked:", product.name)
      }
      onAddToCart={(product) => console.log("Add to cart:", product.name)}
    />
  ),
};

export const GridWithViewAllButton: StoryObj<typeof ProductListingGrid> = {
  render: () => (
    <ProductListingGrid
      title="Best Sellers"
      description="Our most popular products"
      products={sampleProducts.slice(0, 4)}
      columns={4}
      showQuickActions={true}
      showRating={true}
      onViewAll={() => console.log("View all clicked")}
      onProductClick={(product) =>
        console.log("Product clicked:", product.name)
      }
      onQuickView={(product) => console.log("Quick view:", product.name)}
      onAddToWishlist={(product) =>
        console.log("Add to wishlist:", product.name)
      }
      onAddToCart={(product) => console.log("Add to cart:", product.name)}
    />
  ),
};

export const GridTitleOnly: StoryObj<typeof ProductListingGrid> = {
  render: () => (
    <ProductListingGrid
      title="Featured Products"
      products={sampleProducts.slice(0, 3)}
      columns={3}
      showRating={true}
      onProductClick={(product) =>
        console.log("Product clicked:", product.name)
      }
    />
  ),
};

export const SliderWithHeader: StoryObj<typeof ProductListingGrid> = {
  render: () => (
    <ProductListingGrid
      title="You May Also Like"
      description="Based on your browsing history"
      products={sampleProducts}
      variant="slider"
      showQuickActions={true}
      showRating={true}
      onProductClick={(product) =>
        console.log("Product clicked:", product.name)
      }
      onAddToWishlist={(product) =>
        console.log("Add to wishlist:", product.name)
      }
    />
  ),
};
