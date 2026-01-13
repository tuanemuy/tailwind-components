import type { Meta, StoryObj } from "@storybook/react";
import { ProductGallery, ProductGalleryDots } from "./index";
import { Badge } from "@/components/atoms";

const meta: Meta<typeof ProductGallery> = {
  title: "Organisms/ProductGallery",
  component: ProductGallery,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    thumbnailPosition: {
      control: "select",
      options: ["bottom", "left"],
    },
    aspectRatio: {
      control: "select",
      options: ["square", "portrait", "landscape", "auto"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductGallery>;

// Sample images
const sampleImages = [
  {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
    alt: "Smart watch front view",
  },
  {
    src: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop",
    alt: "Smart watch side view",
  },
  {
    src: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop",
    alt: "Smart watch with strap",
  },
  {
    src: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=800&h=800&fit=crop",
    alt: "Smart watch display",
  },
  {
    src: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop",
    alt: "Smart watch in box",
  },
];

export const Default: Story = {
  render: () => (
    <div className="w-[500px]">
      <ProductGallery images={sampleImages} />
    </div>
  ),
};

export const WithLeftThumbnails: Story = {
  render: () => (
    <div className="w-[600px]">
      <ProductGallery images={sampleImages} thumbnailPosition="left" />
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div className="w-[500px]">
      <ProductGallery
        images={sampleImages}
        badge={
          <Badge variant="destructive" size="sm">
            -30% OFF
          </Badge>
        }
      />
    </div>
  ),
};

export const PortraitAspectRatio: Story = {
  render: () => {
    const portraitImages = [
      {
        src: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop",
        alt: "Fashion item front",
      },
      {
        src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop",
        alt: "Fashion item back",
      },
      {
        src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop",
        alt: "Fashion item detail",
      },
    ];

    return (
      <div className="w-[400px]">
        <ProductGallery images={portraitImages} aspectRatio="portrait" />
      </div>
    );
  },
};

export const NoThumbnails: Story = {
  render: () => (
    <div className="w-[500px]">
      <ProductGallery images={sampleImages} showThumbnails={false} />
    </div>
  ),
};

export const NoNavigation: Story = {
  render: () => (
    <div className="w-[500px]">
      <ProductGallery images={sampleImages} showNavigation={false} />
    </div>
  ),
};

export const NoZoom: Story = {
  render: () => (
    <div className="w-[500px]">
      <ProductGallery images={sampleImages} showZoom={false} />
    </div>
  ),
};

export const SingleImage: Story = {
  render: () => (
    <div className="w-[500px]">
      <ProductGallery
        images={[sampleImages[0]]}
        showThumbnails={false}
        showNavigation={false}
      />
    </div>
  ),
};

export const ManyImages: Story = {
  render: () => {
    const manyImages = [
      ...sampleImages,
      {
        src: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&h=800&fit=crop",
        alt: "Watch on wrist",
      },
      {
        src: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&h=800&fit=crop",
        alt: "Watch packaging",
      },
      {
        src: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&h=800&fit=crop",
        alt: "Watch close-up",
      },
    ];

    return (
      <div className="w-[500px]">
        <ProductGallery images={manyImages} />
      </div>
    );
  },
};

export const LandscapeAspectRatio: Story = {
  render: () => {
    const landscapeImages = [
      {
        src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=450&fit=crop",
        alt: "Headphones front",
      },
      {
        src: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=450&fit=crop",
        alt: "Headphones side",
      },
      {
        src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=450&fit=crop",
        alt: "Headphones detail",
      },
    ];

    return (
      <div className="w-[600px]">
        <ProductGallery images={landscapeImages} aspectRatio="landscape" />
      </div>
    );
  },
};

export const WithDotsNavigation: Story = {
  render: function Render() {
    return (
      <div className="w-[500px]">
        <ProductGallery
          images={sampleImages}
          showThumbnails={false}
          showNavigation={false}
        />
        <div className="mt-4">
          <ProductGalleryDots
            total={sampleImages.length}
            activeIndex={0}
            onSelect={(index) => console.log(`Selected: ${index}`)}
          />
        </div>
      </div>
    );
  },
};

export const CompactGallery: Story = {
  render: () => (
    <div className="w-[300px]">
      <ProductGallery
        images={sampleImages.slice(0, 3)}
        showZoom={false}
        aspectRatio="square"
      />
    </div>
  ),
};
