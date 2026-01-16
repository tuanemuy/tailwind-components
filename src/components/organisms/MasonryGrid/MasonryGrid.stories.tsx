import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/atoms/Badge";
import { CardMasonry, ImageMasonry, MasonryGrid, MasonryItem } from "./";

const meta: Meta<typeof MasonryGrid> = {
  title: "Organisms/MasonryGrid",
  component: MasonryGrid,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MasonryGrid>;

// Sample content for masonry
const sampleCards = [
  { id: "1", height: "h-40", color: "bg-blue-100 dark:bg-blue-900" },
  { id: "2", height: "h-60", color: "bg-green-100 dark:bg-green-900" },
  { id: "3", height: "h-32", color: "bg-yellow-100 dark:bg-yellow-900" },
  { id: "4", height: "h-48", color: "bg-purple-100 dark:bg-purple-900" },
  { id: "5", height: "h-56", color: "bg-pink-100 dark:bg-pink-900" },
  { id: "6", height: "h-36", color: "bg-indigo-100 dark:bg-indigo-900" },
  { id: "7", height: "h-44", color: "bg-red-100 dark:bg-red-900" },
  { id: "8", height: "h-52", color: "bg-orange-100 dark:bg-orange-900" },
];

export const Default: Story = {
  render: () => (
    <MasonryGrid columns={{ default: 2, md: 3, lg: 4 }} gap="md">
      {sampleCards.map((card) => (
        <div
          key={card.id}
          className={`${card.height} ${card.color} rounded-xl flex items-center justify-center`}
        >
          <span className="text-lg font-semibold text-foreground">
            Card {card.id}
          </span>
        </div>
      ))}
    </MasonryGrid>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <MasonryGrid columns={2} gap="lg">
      {sampleCards.map((card) => (
        <div
          key={card.id}
          className={`${card.height} ${card.color} rounded-xl flex items-center justify-center`}
        >
          <span className="text-lg font-semibold text-foreground">
            Card {card.id}
          </span>
        </div>
      ))}
    </MasonryGrid>
  ),
};

export const SmallGap: Story = {
  render: () => (
    <MasonryGrid columns={{ default: 2, md: 3 }} gap="sm">
      {sampleCards.map((card) => (
        <div
          key={card.id}
          className={`${card.height} ${card.color} rounded-lg flex items-center justify-center`}
        >
          <span className="text-lg font-semibold text-foreground">
            {card.id}
          </span>
        </div>
      ))}
    </MasonryGrid>
  ),
};

// Image Masonry
const sampleImages = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=600&fit=crop",
    alt: "Nature",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1682687221038-404670f09ef1?w=400&h=300&fit=crop",
    alt: "Landscape",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=400&h=500&fit=crop",
    alt: "Mountain",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?w=400&h=400&fit=crop",
    alt: "Ocean",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1682695794947-17061dc284dd?w=400&h=350&fit=crop",
    alt: "Forest",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1682695796497-31a44224d6d6?w=400&h=550&fit=crop",
    alt: "City",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1682695797873-aa4cb6edd613?w=400&h=450&fit=crop",
    alt: "Desert",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1682695798256-28a674122872?w=400&h=320&fit=crop",
    alt: "Beach",
  },
];

export const Images: StoryObj<typeof ImageMasonry> = {
  render: () => (
    <ImageMasonry
      images={sampleImages}
      columns={{ default: 2, md: 3, lg: 4 }}
      gap="md"
      onImageClick={(image) => console.log("Clicked:", image.id)}
    />
  ),
};

// Card Masonry with actual cards
const cardItems = [
  {
    id: "1",
    content: (
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold text-foreground">Project Update</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We've made great progress on the new dashboard features. The team has
          been working hard on performance improvements.
        </p>
        <div className="mt-3 flex gap-2">
          <Badge variant="success">Completed</Badge>
        </div>
      </div>
    ),
  },
  {
    id: "2",
    content: (
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=200&fit=crop"
          alt="Feature"
          className="w-full h-32 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-foreground">New Feature</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Check out our latest feature release.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "3",
    content: (
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold">JD</span>
          </div>
          <div>
            <p className="font-medium text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">Posted 2h ago</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Just finished the design review. Looking forward to the next sprint!
        </p>
      </div>
    ),
  },
  {
    id: "4",
    content: (
      <div className="rounded-xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-4">
        <h3 className="font-semibold text-foreground">Quick Stats</h3>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Revenue</span>
            <span className="font-medium text-foreground">$12,500</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Users</span>
            <span className="font-medium text-foreground">1,234</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Growth</span>
            <span className="font-medium text-success">+15%</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "5",
    content: (
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground italic">
          "This product has completely transformed how our team collaborates.
          Highly recommended!"
        </p>
        <div className="mt-3 flex items-center gap-2">
          <div className="size-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-medium">SC</span>
          </div>
          <span className="text-sm font-medium text-foreground">
            Sarah Chen
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "6",
    content: (
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?w=400&h=300&fit=crop"
          alt="Gallery"
          className="w-full h-48 object-cover"
        />
      </div>
    ),
  },
];

export const Cards: StoryObj<typeof CardMasonry> = {
  render: () => (
    <CardMasonry items={cardItems} columns={{ default: 2, md: 3 }} gap="md" />
  ),
};

export const WithMasonryItem: Story = {
  render: () => (
    <MasonryGrid columns={{ default: 2, md: 3 }} gap="md">
      <MasonryItem className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold">Item 1</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          This is a shorter item.
        </p>
      </MasonryItem>
      <MasonryItem className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold">Item 2</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          This is a longer item with more content. It will take up more vertical
          space in the masonry layout.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Additional paragraph to make this card taller.
        </p>
      </MasonryItem>
      <MasonryItem className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold">Item 3</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Medium length content here.
        </p>
      </MasonryItem>
      <MasonryItem className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold">Item 4</h3>
        <p className="mt-2 text-sm text-muted-foreground">Short content.</p>
      </MasonryItem>
      <MasonryItem className="rounded-xl border border-border bg-card p-4">
        <h3 className="font-semibold">Item 5</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Another longer item to demonstrate the masonry effect. The items will
          flow naturally into the available space.
        </p>
        <ul className="mt-2 list-disc pl-4 text-sm text-muted-foreground">
          <li>Feature one</li>
          <li>Feature two</li>
          <li>Feature three</li>
        </ul>
      </MasonryItem>
    </MasonryGrid>
  ),
};
