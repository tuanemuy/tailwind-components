import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/atoms";
import {
  ProductAddToCartButton,
  ProductCard,
  ProductCardActions,
  ProductCardBody,
  ProductCardCategory,
  ProductCardImage,
  ProductCardPrice,
  ProductCardRating,
  ProductCardTitle,
} from "./index";

const meta: Meta<typeof ProductCard> = {
  title: "Organisms/E-Commerce/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

// Sample product data
const sampleProduct = {
  id: "1",
  name: "Classic Leather Jacket",
  category: "Outerwear",
  image:
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
  price: { current: 299.99, original: 399.99, currency: "USD" },
  rating: { value: 4.5, count: 128 },
  badges: [{ type: "sale" as const, value: "-25%" }],
};

export const Default: Story = {
  render: () => (
    <ProductCard className="w-72">
      <ProductCardImage
        src={sampleProduct.image}
        alt={sampleProduct.name}
        badges={sampleProduct.badges}
        onFavoriteClick={() => console.log("Favorite clicked")}
        onQuickViewClick={() => console.log("Quick view clicked")}
      />
      <ProductCardBody>
        <ProductCardCategory>{sampleProduct.category}</ProductCardCategory>
        <ProductCardTitle>{sampleProduct.name}</ProductCardTitle>
        <ProductCardRating rating={sampleProduct.rating} />
        <ProductCardPrice price={sampleProduct.price} />
        <ProductCardActions>
          <ProductAddToCartButton />
        </ProductCardActions>
      </ProductCardBody>
    </ProductCard>
  ),
};

export const WithNewBadge: Story = {
  render: () => (
    <ProductCard className="w-72">
      <ProductCardImage
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
        alt="Smart Watch"
        badges={[{ type: "new" }]}
        onFavoriteClick={() => {}}
        onQuickViewClick={() => {}}
      />
      <ProductCardBody>
        <ProductCardCategory>Electronics</ProductCardCategory>
        <ProductCardTitle>Smart Watch Pro</ProductCardTitle>
        <ProductCardRating rating={{ value: 5, count: 42 }} />
        <ProductCardPrice price={{ current: 199.99 }} />
        <ProductCardActions>
          <ProductAddToCartButton />
        </ProductCardActions>
      </ProductCardBody>
    </ProductCard>
  ),
};

export const SoldOut: Story = {
  render: () => (
    <ProductCard className="w-72 opacity-75">
      <ProductCardImage
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
        alt="Running Shoes"
        badges={[{ type: "soldOut" }]}
        showQuickActions={false}
      />
      <ProductCardBody>
        <ProductCardCategory>Footwear</ProductCardCategory>
        <ProductCardTitle>Limited Edition Running Shoes</ProductCardTitle>
        <ProductCardRating rating={{ value: 4.8, count: 256 }} />
        <ProductCardPrice price={{ current: 179.99 }} />
        <ProductCardActions>
          <Button variant="secondary" disabled className="w-full">
            Out of Stock
          </Button>
        </ProductCardActions>
      </ProductCardBody>
    </ProductCard>
  ),
};

export const MinimalVariant: Story = {
  render: () => (
    <ProductCard variant="minimal" className="w-64">
      <ProductCardImage
        src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop"
        alt="Perfume"
        showQuickActions={false}
      />
      <ProductCardBody padding="sm">
        <ProductCardTitle>{`Luxury Perfume "Essence"`}</ProductCardTitle>
        <ProductCardPrice price={{ current: 89.99, original: 129.99 }} />
      </ProductCardBody>
    </ProductCard>
  ),
};

export const WithFavoriteToggle: Story = {
  render: function Render() {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
      <ProductCard className="w-72">
        <ProductCardImage
          src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop"
          alt="Camera"
          badges={[{ type: "featured" }]}
          onFavoriteClick={() => setIsFavorite(!isFavorite)}
          onQuickViewClick={() => console.log("Quick view")}
          isFavorite={isFavorite}
        />
        <ProductCardBody>
          <ProductCardCategory>Photography</ProductCardCategory>
          <ProductCardTitle>Retro Film Camera</ProductCardTitle>
          <ProductCardRating rating={{ value: 4.2, count: 89 }} />
          <ProductCardPrice price={{ current: 449.99 }} />
          <ProductCardActions>
            <ProductAddToCartButton />
          </ProductCardActions>
        </ProductCardBody>
      </ProductCard>
    );
  },
};

export const MultipleBadges: Story = {
  render: () => (
    <ProductCard className="w-72">
      <ProductCardImage
        src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop"
        alt="Sneakers"
        badges={[{ type: "new" }, { type: "sale", value: "-30%" }]}
        onFavoriteClick={() => {}}
        onQuickViewClick={() => {}}
      />
      <ProductCardBody>
        <ProductCardCategory>Footwear</ProductCardCategory>
        <ProductCardTitle>Premium Sneakers Collection</ProductCardTitle>
        <ProductCardRating rating={{ value: 4.7, count: 312 }} />
        <ProductCardPrice price={{ current: 139.99, original: 199.99 }} />
        <ProductCardActions>
          <ProductAddToCartButton />
        </ProductCardActions>
      </ProductCardBody>
    </ProductCard>
  ),
};

export const PortraitAspectRatio: Story = {
  render: () => (
    <ProductCard className="w-64">
      <ProductCardImage
        src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=533&fit=crop"
        alt="Dress"
        aspectRatio="portrait"
        badges={[{ type: "new" }]}
        onFavoriteClick={() => {}}
      />
      <ProductCardBody>
        <ProductCardCategory>Women&apos;s Fashion</ProductCardCategory>
        <ProductCardTitle>Summer Floral Dress</ProductCardTitle>
        <ProductCardRating rating={{ value: 4.6, count: 78 }} />
        <ProductCardPrice price={{ current: 79.99 }} />
        <ProductCardActions>
          <ProductAddToCartButton />
        </ProductCardActions>
      </ProductCardBody>
    </ProductCard>
  ),
};

export const ProductGrid: Story = {
  render: () => {
    const products = [
      {
        id: "1",
        name: "Wireless Earbuds",
        category: "Electronics",
        image:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
        price: { current: 79.99, original: 99.99 },
        rating: { value: 4.3, count: 156 },
        badges: [{ type: "sale" as const, value: "-20%" }],
      },
      {
        id: "2",
        name: "Leather Backpack",
        category: "Bags",
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        price: { current: 149.99 },
        rating: { value: 4.8, count: 234 },
        badges: [{ type: "featured" as const }],
      },
      {
        id: "3",
        name: "Sunglasses",
        category: "Accessories",
        image:
          "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
        price: { current: 59.99 },
        rating: { value: 4.1, count: 89 },
        badges: [{ type: "new" as const }],
      },
      {
        id: "4",
        name: "Mechanical Watch",
        category: "Watches",
        image:
          "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
        price: { current: 299.99, original: 399.99 },
        rating: { value: 4.9, count: 567 },
        badges: [{ type: "sale" as const, value: "-25%" }],
      },
    ];

    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} className="w-full">
            <ProductCardImage
              src={product.image}
              alt={product.name}
              badges={product.badges}
              onFavoriteClick={() => {}}
            />
            <ProductCardBody padding="sm">
              <ProductCardCategory>{product.category}</ProductCardCategory>
              <ProductCardTitle>{product.name}</ProductCardTitle>
              <ProductCardRating rating={product.rating} showCount={false} />
              <ProductCardPrice price={product.price} />
            </ProductCardBody>
          </ProductCard>
        ))}
      </div>
    );
  },
};

export const IconButtonAddToCart: Story = {
  render: () => (
    <ProductCard className="w-72">
      <ProductCardImage
        src="https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=400&h=400&fit=crop"
        alt="Headphones"
        onFavoriteClick={() => {}}
      />
      <ProductCardBody>
        <div className="flex items-start justify-between gap-x-2">
          <div className="min-w-0 flex-1">
            <ProductCardCategory>Audio</ProductCardCategory>
            <ProductCardTitle>Premium Headphones</ProductCardTitle>
            <ProductCardPrice price={{ current: 249.99 }} />
          </div>
          <ProductAddToCartButton variant="icon" />
        </div>
      </ProductCardBody>
    </ProductCard>
  ),
};
