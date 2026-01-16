import type { Meta, StoryObj } from "@storybook/react";
import { ImageIcon } from "@/lib/icons";
import { Skeleton } from "../Skeleton";
import { Spinner } from "../Spinner";
import { EagerImage, Image } from "./index";

const meta: Meta<typeof Image> = {
  title: "Atoms/Image",
  component: Image,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    objectFit: {
      control: "select",
      options: ["cover", "contain", "fill", "none", "scaleDown"],
    },
    rounded: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
    },
    aspectRatio: {
      control: "select",
      options: ["auto", "square", "video", "portrait"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage =
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=300&fit=crop";

export const Default: Story = {
  args: {
    src: sampleImage,
    alt: "Sample image",
    className: "w-64 h-48",
  },
};

export const ObjectFit: Story = {
  render: () => (
    <div className="flex gap-4">
      {(["cover", "contain", "fill", "scaleDown"] as const).map((fit) => (
        <div key={fit} className="flex flex-col items-center gap-2">
          <Image
            src={sampleImage}
            alt={`${fit} example`}
            objectFit={fit}
            className="w-32 h-32 border"
          />
          <span className="text-xs text-muted-foreground">{fit}</span>
        </div>
      ))}
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="flex gap-4">
      {(["none", "sm", "md", "lg", "xl", "full"] as const).map((r) => (
        <div key={r} className="flex flex-col items-center gap-2">
          <Image
            src={sampleImage}
            alt={`${r} rounded`}
            rounded={r}
            className="w-24 h-24"
          />
          <span className="text-xs text-muted-foreground">{r}</span>
        </div>
      ))}
    </div>
  ),
};

export const AspectRatios: Story = {
  render: () => (
    <div className="flex gap-4">
      {(["square", "video", "portrait"] as const).map((ratio) => (
        <div key={ratio} className="flex flex-col items-center gap-2">
          <Image
            src={sampleImage}
            alt={`${ratio} aspect ratio`}
            aspectRatio={ratio}
            className="w-40"
          />
          <span className="text-xs text-muted-foreground">{ratio}</span>
        </div>
      ))}
    </div>
  ),
};

export const WithPlaceholder: Story = {
  render: () => (
    <div className="w-64">
      <Image
        src={sampleImage}
        alt="With placeholder"
        aspectRatio="video"
        placeholder={<Skeleton className="absolute inset-0" />}
      />
    </div>
  ),
};

export const WithSpinnerPlaceholder: Story = {
  render: () => (
    <div className="w-64">
      <Image
        src={sampleImage}
        alt="With spinner placeholder"
        aspectRatio="video"
        placeholder={
          <div className="flex items-center justify-center bg-muted rounded">
            <Spinner size="lg" />
          </div>
        }
      />
    </div>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="flex flex-col items-center gap-2">
        <Image
          src="https://invalid-url-that-will-fail.com/image.jpg"
          alt="Broken image"
          className="w-32 h-32"
          fallback={
            <div className="w-32 h-32 flex items-center justify-center bg-muted rounded-md">
              <ImageIcon className="size-8 text-muted-foreground" />
            </div>
          }
        />
        <span className="text-xs text-muted-foreground">With Fallback</span>
      </div>
    </div>
  ),
};

export const CircularAvatar: Story = {
  render: () => (
    <div className="flex gap-4">
      {[48, 64, 80, 96].map((size) => (
        <Image
          key={size}
          src={sampleImage}
          alt="Avatar"
          rounded="full"
          className={`w-${size / 4} h-${size / 4}`}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-2 w-96">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Image
          key={i}
          src={`https://images.unsplash.com/photo-168268722074${i}-aba13b6e50ba?w=200&h=200&fit=crop`}
          alt={`Gallery image ${i}`}
          aspectRatio="square"
          rounded="md"
          className="hover:opacity-75 transition-opacity cursor-pointer"
        />
      ))}
    </div>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <div className="w-64 border rounded-lg overflow-hidden">
      <Image
        src={sampleImage}
        alt="Product"
        aspectRatio="square"
        className="w-full"
      />
      <div className="p-4">
        <h3 className="font-medium">Product Name</h3>
        <p className="text-sm text-muted-foreground">$99.00</p>
      </div>
    </div>
  ),
};

export const HeroImage: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <EagerImage
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=400&fit=crop"
        alt="Hero image"
        aspectRatio="video"
        rounded="lg"
        priority
        placeholder={<Skeleton className="absolute inset-0" />}
      />
    </div>
  ),
};

export const CustomAspectRatio: Story = {
  args: {
    src: sampleImage,
    alt: "Custom aspect ratio",
    aspectRatio: "16/9",
    rounded: "lg",
    className: "w-64",
  },
};
