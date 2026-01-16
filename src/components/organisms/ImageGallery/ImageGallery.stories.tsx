import type { Meta, StoryObj } from "@storybook/react";
import {
  CarouselGallery,
  type GalleryImage,
  GalleryItem,
  ImageGallery,
  ThumbnailGallery,
} from "./index";

const meta: Meta<typeof ImageGallery> = {
  title: "Organisms/ImageGallery",
  component: ImageGallery,
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "select",
      options: ["grid", "masonry"],
    },
    gap: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    aspectRatio: {
      control: "select",
      options: ["square", "video", "auto"],
    },
    enableLightbox: {
      control: "boolean",
    },
    rounded: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageGallery>;

// Sample images (using placeholder images)
const sampleImages: GalleryImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    thumbnail:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200",
    alt: "Mountain landscape",
    title: "Mountain Peak",
    description: "A beautiful mountain landscape at sunrise",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    thumbnail:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200",
    alt: "Nature scene",
    title: "Forest Path",
    description: "A serene path through the forest",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800",
    thumbnail:
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=200",
    alt: "Lake view",
    title: "Crystal Lake",
    description: "A crystal clear mountain lake",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
    thumbnail:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200",
    alt: "Sunset",
    title: "Golden Sunset",
    description: "Beautiful golden hour sunset",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800",
    thumbnail:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=200",
    alt: "Forest",
    title: "Misty Forest",
    description: "A mystical fog in the forest",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
    thumbnail:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200",
    alt: "Valley",
    title: "Green Valley",
    description: "A lush green valley",
  },
];

// Masonry images with different heights
const masonryImages: GalleryImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    alt: "Mountain",
    title: "Mountain Peak",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
    alt: "Nature",
    title: "Forest Path",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop",
    alt: "Lake",
    title: "Crystal Lake",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=500&fit=crop",
    alt: "Sunset",
    title: "Golden Sunset",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=350&fit=crop",
    alt: "Forest",
    title: "Misty Forest",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=450&fit=crop",
    alt: "Valley",
    title: "Green Valley",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=550&fit=crop",
    alt: "Mountains",
    title: "Mountain Range",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=400&h=280&fit=crop",
    alt: "Winter",
    title: "Winter Scene",
  },
];

// ============================================
// Stories
// ============================================

export const Default: Story = {
  args: {
    images: sampleImages,
    layout: "grid",
    columns: { default: 2, md: 3, lg: 4 },
    gap: "md",
    aspectRatio: "square",
    enableLightbox: true,
  },
};

export const GridLayout: Story = {
  args: {
    images: sampleImages,
    layout: "grid",
    columns: { default: 2, md: 3 },
    gap: "md",
    aspectRatio: "square",
  },
};

export const MasonryLayout: Story = {
  args: {
    images: masonryImages,
    layout: "masonry",
    columns: { default: 2, md: 3, lg: 4 },
    gap: "md",
  },
};

export const VideoAspectRatio: Story = {
  args: {
    images: sampleImages,
    layout: "grid",
    columns: { default: 1, md: 2 },
    gap: "lg",
    aspectRatio: "video",
  },
};

export const TwoColumns: Story = {
  args: {
    images: sampleImages.slice(0, 4),
    layout: "grid",
    columns: 2,
    gap: "md",
  },
};

export const SixColumns: Story = {
  args: {
    images: sampleImages,
    layout: "grid",
    columns: { default: 3, lg: 6 },
    gap: "sm",
    aspectRatio: "square",
  },
};

export const NoGap: Story = {
  args: {
    images: sampleImages,
    layout: "grid",
    columns: 3,
    gap: "none",
    rounded: false,
  },
};

export const LargeGap: Story = {
  args: {
    images: sampleImages.slice(0, 4),
    layout: "grid",
    columns: 2,
    gap: "lg",
  },
};

export const WithoutLightbox: Story = {
  args: {
    images: sampleImages,
    layout: "grid",
    columns: 3,
    enableLightbox: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Gallery without lightbox - clicking images does nothing",
      },
    },
  },
};

export const NotRounded: Story = {
  args: {
    images: sampleImages,
    layout: "grid",
    columns: 3,
    rounded: false,
  },
};

// ThumbnailGallery Stories
export const WithThumbnails: StoryObj<typeof ThumbnailGallery> = {
  render: () => (
    <ThumbnailGallery
      images={sampleImages}
      thumbnailPosition="bottom"
      thumbnailSize="md"
    />
  ),
};

export const ThumbnailsOnLeft: StoryObj<typeof ThumbnailGallery> = {
  render: () => (
    <ThumbnailGallery
      images={sampleImages}
      thumbnailPosition="left"
      thumbnailSize="md"
    />
  ),
};

export const ThumbnailsOnRight: StoryObj<typeof ThumbnailGallery> = {
  render: () => (
    <ThumbnailGallery
      images={sampleImages}
      thumbnailPosition="right"
      thumbnailSize="lg"
    />
  ),
};

// CarouselGallery Stories
export const Carousel: StoryObj<typeof CarouselGallery> = {
  render: () => (
    <CarouselGallery
      images={sampleImages}
      showDots
      showArrows
      className="max-w-2xl"
    />
  ),
};

export const CarouselAutoPlay: StoryObj<typeof CarouselGallery> = {
  render: () => (
    <CarouselGallery
      images={sampleImages}
      autoPlay
      autoPlayInterval={3000}
      showDots
      showArrows
      className="max-w-2xl"
    />
  ),
};

export const CarouselDotsOnly: StoryObj<typeof CarouselGallery> = {
  render: () => (
    <CarouselGallery
      images={sampleImages}
      showDots
      showArrows={false}
      className="max-w-2xl"
    />
  ),
};

// GalleryItem individual usage
export const SingleGalleryItem: StoryObj<typeof GalleryItem> = {
  render: () => (
    <div className="max-w-sm">
      <GalleryItem
        image={sampleImages[0]}
        aspectRatio="video"
        onClick={() => alert("Clicked!")}
      />
    </div>
  ),
};

// Custom render example
export const CustomRender: Story = {
  render: () => (
    <ImageGallery
      images={sampleImages}
      layout="grid"
      columns={3}
      enableLightbox
      renderItem={(image) => (
        <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
          <img
            src={image.thumbnail || image.src}
            alt={image.alt || ""}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-medium">{image.title}</p>
              <p className="text-white/80 text-sm">{image.description}</p>
            </div>
          </div>
        </div>
      )}
    />
  ),
};
