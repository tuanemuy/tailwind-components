import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import type { LookItem, ProductDetail, SizeChartRow } from "./index";
import { ProductDetailModal, SizeGuideModal, ViewLookModal } from "./index";

const meta: Meta = {
  title: "Organisms/Overlays/ECommerceModals",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

// Product Detail Modal Stories
export const ProductDetailStory: StoryObj<typeof ProductDetailModal> = {
  name: "Product Detail",
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const product: ProductDetail = {
      id: "1",
      name: "Premium Wireless Headphones",
      description:
        "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day listening.",
      price: 299.99,
      originalPrice: 349.99,
      currency: "$",
      images: [
        {
          id: "1",
          url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
          alt: "Headphones front view",
        },
        {
          id: "2",
          url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
          alt: "Headphones side view",
        },
        {
          id: "3",
          url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600",
          alt: "Headphones with case",
        },
      ],
      variants: [
        {
          id: "color",
          name: "Color",
          options: [
            { id: "black", value: "Black" },
            { id: "white", value: "White" },
            { id: "navy", value: "Navy" },
          ],
        },
      ],
      rating: 4.8,
      reviewCount: 256,
      inStock: true,
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Premium comfort padding",
        "Bluetooth 5.2",
        "Foldable design",
      ],
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Product</Button>
        <ProductDetailModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          product={product}
          onAddToCart={(data) => {
            console.log("Add to cart:", data);
            setIsOpen(false);
          }}
          onAddToWishlist={(productId: string) => {
            console.log("Add to wishlist:", productId);
          }}
        />
      </>
    );
  },
};

export const ProductOutOfStock: StoryObj<typeof ProductDetailModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const product: ProductDetail = {
      id: "2",
      name: "Limited Edition Sneakers",
      description:
        "Exclusive limited edition sneakers. Premium materials and unique design.",
      price: 189.99,
      currency: "$",
      images: [
        {
          id: "1",
          url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
          alt: "Sneakers",
        },
      ],
      variants: [
        {
          id: "size",
          name: "Size",
          options: [
            { id: "7", value: "US 7" },
            { id: "8", value: "US 8" },
            { id: "9", value: "US 9" },
            { id: "10", value: "US 10" },
          ],
        },
      ],
      rating: 4.9,
      reviewCount: 89,
      inStock: false,
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Sold Out Product</Button>
        <ProductDetailModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          product={product}
          onAddToCart={() => {}}
          onAddToWishlist={(productId: string) => {
            console.log("Add to wishlist:", productId);
          }}
        />
      </>
    );
  },
};

// Size Guide Modal Stories
export const SizeGuide: StoryObj<typeof SizeGuideModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const headers = ["Size", "US", "UK", "EU", "Bust", "Waist", "Hips"];
    const rows: SizeChartRow[] = [
      {
        size: "XS",
        measurements: {
          US: "0-2",
          UK: "4-6",
          EU: "32-34",
          Bust: '32"',
          Waist: '24"',
          Hips: '34"',
        },
      },
      {
        size: "S",
        measurements: {
          US: "4-6",
          UK: "8-10",
          EU: "36-38",
          Bust: '34"',
          Waist: '26"',
          Hips: '36"',
        },
      },
      {
        size: "M",
        measurements: {
          US: "8-10",
          UK: "12-14",
          EU: "40-42",
          Bust: '36"',
          Waist: '28"',
          Hips: '38"',
        },
      },
      {
        size: "L",
        measurements: {
          US: "12-14",
          UK: "16-18",
          EU: "44-46",
          Bust: '38"',
          Waist: '30"',
          Hips: '40"',
        },
      },
      {
        size: "XL",
        measurements: {
          US: "16-18",
          UK: "20-22",
          EU: "48-50",
          Bust: '40"',
          Waist: '32"',
          Hips: '42"',
        },
      },
    ];
    const notes = [
      "Bust: Measure around the fullest part of your bust",
      "Waist: Measure around your natural waistline",
      "Hips: Measure around the fullest part of your hips",
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Size Guide</Button>
        <SizeGuideModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Women's Clothing Size Guide"
          subtitle="Use this chart to find your perfect fit"
          headers={headers}
          rows={rows}
          notes={notes}
        />
      </>
    );
  },
};

export const ShoesSizeGuide: StoryObj<typeof SizeGuideModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const headers = ["US", "UK", "EU", "CM"];
    const rows: SizeChartRow[] = [
      { size: "6", measurements: { UK: "5.5", EU: "39", CM: "24" } },
      { size: "7", measurements: { UK: "6.5", EU: "40", CM: "25" } },
      { size: "8", measurements: { UK: "7.5", EU: "41", CM: "26" } },
      { size: "9", measurements: { UK: "8.5", EU: "42", CM: "27" } },
      { size: "10", measurements: { UK: "9.5", EU: "43", CM: "28" } },
      { size: "11", measurements: { UK: "10.5", EU: "44", CM: "29" } },
      { size: "12", measurements: { UK: "11.5", EU: "45", CM: "30" } },
    ];
    const notes = [
      "Stand on a piece of paper and trace your foot",
      "Measure the length from heel to longest toe",
      "Measure both feet and use the larger measurement",
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Shoes Size Guide</Button>
        <SizeGuideModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Shoes Size Guide"
          headers={headers}
          rows={rows}
          notes={notes}
        />
      </>
    );
  },
};

// View Look Modal Stories
export const ViewLook: StoryObj<typeof ViewLookModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const items: LookItem[] = [
      {
        id: "1",
        name: "Classic White Shirt",
        price: 79.99,
        image:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300",
        category: "Tops",
      },
      {
        id: "2",
        name: "Navy Blazer",
        price: 199.99,
        image:
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300",
        category: "Outerwear",
      },
      {
        id: "3",
        name: "Slim Fit Chinos",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300",
        category: "Bottoms",
      },
      {
        id: "4",
        name: "Leather Belt",
        price: 49.99,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
        category: "Accessories",
      },
      {
        id: "5",
        name: "Oxford Shoes",
        price: 149.99,
        image:
          "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=300",
        category: "Footwear",
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Shop The Look</Button>
        <ViewLookModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Business Casual"
          mainImage="https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=600"
          items={items}
          currency="$"
          onAddToCart={(itemIds: string[]) => {
            console.log("Add to cart:", itemIds);
            setIsOpen(false);
          }}
          onViewItem={(itemId: string) => {
            console.log("View item:", itemId);
          }}
        />
      </>
    );
  },
};

export const CasualLook: StoryObj<typeof ViewLookModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const items: LookItem[] = [
      {
        id: "1",
        name: "Graphic Tee",
        price: 29.99,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
        category: "Tops",
      },
      {
        id: "2",
        name: "Denim Jacket",
        price: 89.99,
        image:
          "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300",
        category: "Outerwear",
      },
      {
        id: "3",
        name: "Jogger Pants",
        price: 59.99,
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300",
        category: "Bottoms",
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Weekend Casual Look</Button>
        <ViewLookModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Weekend Casual"
          mainImage="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600"
          items={items}
          currency="$"
          onAddToCart={(itemIds: string[]) => {
            console.log("Add to cart:", itemIds);
            setIsOpen(false);
          }}
          onViewItem={(itemId: string) => {
            console.log("View item:", itemId);
          }}
        />
      </>
    );
  },
};
