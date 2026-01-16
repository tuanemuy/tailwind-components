import type { Meta, StoryObj } from "@storybook/react";
import { CompleteTheLook, type LookItem, ShopTheLook } from "./index";

const meta: Meta<typeof CompleteTheLook> = {
  title: "Organisms/E-Commerce/CompleteTheLook",
  component: CompleteTheLook,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CompleteTheLook>;

const sampleItems: LookItem[] = [
  {
    id: "1",
    name: "Oversized Wool Blazer",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
    price: 189.99,
    originalPrice: 249.99,
    category: "Outerwear",
    selected: true,
    inStock: true,
  },
  {
    id: "2",
    name: "High-Waist Tailored Trousers",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    price: 89.99,
    category: "Pants",
    selected: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Silk Blend Turtleneck",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    price: 79.99,
    category: "Tops",
    selected: false,
    inStock: true,
  },
  {
    id: "4",
    name: "Leather Chelsea Boots",
    image:
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop",
    price: 199.99,
    category: "Footwear",
    selected: true,
    inStock: true,
  },
  {
    id: "5",
    name: "Structured Leather Bag",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
    price: 149.99,
    originalPrice: 199.99,
    category: "Accessories",
    selected: false,
    inStock: false,
  },
];

export const Default: Story = {
  args: {
    title: "Complete the Look",
    description: "Curated pieces that work perfectly together",
    mainImage:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop",
    mainImageAlt: "Styled outfit",
    items: sampleItems,
    showTotalPrice: true,
    onItemSelect: (id, selected) => console.log("Item select:", id, selected),
    onAddAllToCart: (items) => console.log("Add to cart:", items),
    onItemClick: (item) => console.log("Item clicked:", item.name),
  },
};

export const NoMainImage: Story = {
  args: {
    title: "Recommended for You",
    description: "Based on your recent purchases",
    items: sampleItems,
    showTotalPrice: true,
    onItemSelect: (id, selected) => console.log("Item select:", id, selected),
    onAddAllToCart: (items) => console.log("Add to cart:", items),
    onItemClick: (item) => console.log("Item clicked:", item.name),
  },
};

export const CompactVariant: Story = {
  args: {
    title: "Goes Well With",
    items: sampleItems.slice(0, 4),
    variant: "compact",
    showTotalPrice: true,
    onItemSelect: (id, selected) => console.log("Item select:", id, selected),
    onAddAllToCart: (items) => console.log("Add to cart:", items),
  },
};

export const HorizontalVariant: Story = {
  args: {
    title: "Shop the Complete Look",
    description: "Get the full outfit at a special price",
    mainImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop",
    mainImageAlt: "Model wearing outfit",
    items: sampleItems,
    variant: "horizontal",
    showTotalPrice: true,
    onItemSelect: (id, selected) => console.log("Item select:", id, selected),
    onAddAllToCart: (items) => console.log("Add to cart:", items),
    onItemClick: (item) => console.log("Item clicked:", item.name),
  },
};

export const AllSelected: Story = {
  args: {
    title: "Bundle & Save",
    description: "Buy all items and get 20% off",
    mainImage:
      "https://images.unsplash.com/photo-1485968579169-a6b577554be0?w=600&h=800&fit=crop",
    items: sampleItems.map((item) => ({
      ...item,
      selected: true,
      inStock: true,
    })),
    showTotalPrice: true,
    onItemSelect: (id, selected) => console.log("Item select:", id, selected),
    onAddAllToCart: (items) => console.log("Add to cart:", items),
  },
};

export const WithSavings: Story = {
  args: {
    title: "Special Offer",
    description: "Selected items on sale",
    items: [
      {
        id: "1",
        name: "Winter Coat",
        image:
          "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop",
        price: 199.99,
        originalPrice: 299.99,
        category: "Outerwear",
        selected: true,
        inStock: true,
      },
      {
        id: "2",
        name: "Cashmere Sweater",
        image:
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
        price: 129.99,
        originalPrice: 179.99,
        category: "Tops",
        selected: true,
        inStock: true,
      },
      {
        id: "3",
        name: "Wool Scarf",
        image:
          "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop",
        price: 49.99,
        originalPrice: 79.99,
        category: "Accessories",
        selected: true,
        inStock: true,
      },
    ],
    showTotalPrice: true,
    onAddAllToCart: (items) => console.log("Add to cart:", items),
  },
};

export const FewItems: Story = {
  args: {
    title: "Pair It With",
    items: sampleItems.slice(0, 2),
    showTotalPrice: true,
    onItemSelect: (id, selected) => console.log("Item select:", id, selected),
    onAddAllToCart: (items) => console.log("Add to cart:", items),
  },
};

// ShopTheLook Stories
export const MultipleLooks: StoryObj<typeof ShopTheLook> = {
  render: () => (
    <ShopTheLook
      title="Shop the Look"
      looks={[
        {
          id: "look1",
          image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=600&fit=crop",
          imageAlt: "Casual chic outfit",
          items: sampleItems.slice(0, 3),
        },
        {
          id: "look2",
          image:
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop",
          imageAlt: "Business casual outfit",
          items: sampleItems.slice(1, 5),
        },
        {
          id: "look3",
          image:
            "https://images.unsplash.com/photo-1485968579169-a6b577554be0?w=400&h=600&fit=crop",
          imageAlt: "Weekend casual outfit",
          items: sampleItems.slice(0, 4),
        },
        {
          id: "look4",
          image:
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop",
          imageAlt: "Evening outfit",
          items: sampleItems,
        },
      ]}
      onLookClick={(lookId) => console.log("Look clicked:", lookId)}
      onItemClick={(item) => console.log("Item clicked:", item.name)}
    />
  ),
};

export const ShopTheLookMinimal: StoryObj<typeof ShopTheLook> = {
  render: () => (
    <ShopTheLook
      title="Get Inspired"
      looks={[
        {
          id: "look1",
          image:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop",
          items: sampleItems.slice(0, 2),
        },
        {
          id: "look2",
          image:
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop",
          items: sampleItems.slice(2, 4),
        },
      ]}
      onLookClick={(lookId) => console.log("Look clicked:", lookId)}
    />
  ),
};
