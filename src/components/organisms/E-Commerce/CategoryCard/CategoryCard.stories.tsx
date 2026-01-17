import type { Meta, StoryObj } from "@storybook/react";
import {
  CategoryCard,
  CategoryCircular,
  type CategoryData,
  CategoryGrid,
  CategoryPill,
  CategorySlider,
} from "./index";

const meta: Meta<typeof CategoryCard> = {
  title: "Organisms/E-Commerce/CategoryCard",
  component: CategoryCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CategoryCard>;

const sampleCategories: CategoryData[] = [
  {
    id: "1",
    name: "Nike Shoes",
    images: [
      "https://images.unsplash.com/photo-1699595749116-33a4a869503c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1699593022913-7068606059c8?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop",
    ],
    startingPrice: 99,
    itemCount: 124,
    href: "#",
  },
  {
    id: "2",
    name: "Men's Clothing",
    images: [
      "https://images.unsplash.com/photo-1708443683276-8a3eb30faef2?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1708443683198-a2b77a54c36e?w=400&h=400&fit=crop",
    ],
    startingPrice: 39,
    itemCount: 256,
    href: "#",
  },
  {
    id: "3",
    name: "Women's Clothing",
    images: [
      "https://images.unsplash.com/photo-1654512697735-d7ff21350443?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1593164842264-854604db2260?w=400&h=400&fit=crop",
    ],
    startingPrice: 59,
    itemCount: 312,
    href: "#",
  },
  {
    id: "4",
    name: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop",
    ],
    startingPrice: 29,
    itemCount: 89,
    href: "#",
  },
];

export const Default: Story = {
  args: {
    category: sampleCategories[0],
    variant: "default",
    imageLayout: "grid",
    onCategoryClick: (cat) => console.log("Clicked:", cat.name),
  },
};

export const OverlayVariant: Story = {
  args: {
    category: sampleCategories[0],
    variant: "overlay",
    imageLayout: "single",
    onCategoryClick: (cat) => console.log("Clicked:", cat.name),
  },
};

export const StackedImages: Story = {
  args: {
    category: sampleCategories[0],
    variant: "default",
    imageLayout: "stacked",
    onCategoryClick: (cat) => console.log("Clicked:", cat.name),
  },
};

// Grid Stories
export const Grid3Columns: StoryObj<typeof CategoryGrid> = {
  render: () => (
    <CategoryGrid
      categories={sampleCategories.slice(0, 3)}
      columns={3}
      variant="default"
      imageLayout="grid"
      onCategoryClick={(cat) => console.log("Clicked:", cat.name)}
    />
  ),
};

export const Grid4Columns: StoryObj<typeof CategoryGrid> = {
  render: () => (
    <CategoryGrid
      categories={sampleCategories}
      columns={4}
      variant="default"
      imageLayout="single"
      onCategoryClick={(cat) => console.log("Clicked:", cat.name)}
    />
  ),
};

export const GridOverlay: StoryObj<typeof CategoryGrid> = {
  render: () => (
    <CategoryGrid
      categories={sampleCategories.slice(0, 3)}
      columns={3}
      variant="overlay"
      imageLayout="single"
      onCategoryClick={(cat) => console.log("Clicked:", cat.name)}
    />
  ),
};

// Circular Stories
export const Circular: StoryObj<typeof CategoryCircular> = {
  render: () => (
    <CategoryCircular
      categories={sampleCategories}
      size="md"
      onCategoryClick={(cat) => console.log("Clicked:", cat.name)}
    />
  ),
};

export const CircularLarge: StoryObj<typeof CategoryCircular> = {
  render: () => (
    <CategoryCircular
      categories={sampleCategories}
      size="lg"
      onCategoryClick={(cat) => console.log("Clicked:", cat.name)}
    />
  ),
};

// Pill Stories
export const Pills: StoryObj<typeof CategoryPill> = {
  render: () => (
    <CategoryPill
      categories={sampleCategories}
      variant="default"
      onCategoryClick={(cat) => console.log("Clicked:", cat.name)}
    />
  ),
};

export const PillsFilled: StoryObj<typeof CategoryPill> = {
  render: () => (
    <CategoryPill
      categories={sampleCategories}
      variant="filled"
      onCategoryClick={(cat) => console.log("Clicked:", cat.name)}
    />
  ),
};

// Slider Stories
export const Slider: StoryObj<typeof CategorySlider> = {
  render: () => (
    <CategorySlider
      categories={sampleCategories}
      cardSize="md"
      onCategoryClick={(cat) => console.log("Clicked:", cat.name)}
    />
  ),
};

export const SliderLarge: StoryObj<typeof CategorySlider> = {
  render: () => (
    <CategorySlider
      categories={sampleCategories}
      cardSize="lg"
      onCategoryClick={(cat) => console.log("Clicked:", cat.name)}
    />
  ),
};
