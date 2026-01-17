import type { Meta, StoryObj } from "@storybook/react";
import { CodeIcon, PaletteIcon, RocketIcon, ShieldIcon } from "@/lib/icons";
import type { FeaturePreviewData } from "./";
import { FeaturePreviewCard, FeaturePreviewGrid } from "./";

const meta: Meta<typeof FeaturePreviewCard> = {
  title: "Organisms/Cards/FeaturePreviewCard",
  component: FeaturePreviewCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FeaturePreviewCard>;

const sampleFeature: FeaturePreviewData = {
  id: "1",
  title: "AI-Powered Analytics",
  description:
    "Get intelligent insights from your data with our new AI-powered analytics engine.",
  icon: <RocketIcon className="size-6" />,
  features: [
    "Automatic trend detection",
    "Predictive forecasting",
    "Natural language queries",
    "Custom report generation",
  ],
  ctaText: "Try it now",
  ctaUrl: "#",
  isNew: true,
};

export const Default: Story = {
  args: {
    feature: sampleFeature,
    onCtaClick: (feature) => console.log("CTA clicked:", feature.title),
    onDismiss: (feature) => console.log("Dismissed:", feature.title),
    className: "w-[380px]",
  },
};

export const WithImage: Story = {
  args: {
    feature: {
      ...sampleFeature,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    },
    className: "w-[380px]",
  },
};

export const Featured: Story = {
  args: {
    feature: {
      ...sampleFeature,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    },
    variant: "featured",
    onCtaClick: (feature) => console.log("CTA clicked:", feature.title),
    onDismiss: (feature) => console.log("Dismissed:", feature.title),
    className: "w-[700px]",
  },
};

export const Media: Story = {
  args: {
    feature: {
      ...sampleFeature,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    },
    variant: "media",
    className: "w-[350px]",
  },
};

export const Horizontal: Story = {
  args: {
    feature: sampleFeature,
    variant: "horizontal",
    className: "w-[500px]",
  },
};

export const Compact: Story = {
  args: {
    feature: sampleFeature,
    variant: "compact",
    className: "w-[320px]",
  },
};

export const ComingSoon: Story = {
  args: {
    feature: {
      ...sampleFeature,
      isNew: false,
      isComingSoon: true,
      releaseDate: "Q2 2024",
    },
    variant: "featured",
    className: "w-[600px]",
  },
};

// Grid example
const sampleFeatures: FeaturePreviewData[] = [
  {
    id: "1",
    title: "AI Analytics",
    description: "Intelligent insights from your data",
    icon: <RocketIcon className="size-5" />,
    isNew: true,
    ctaText: "Learn more",
  },
  {
    id: "2",
    title: "Code Generation",
    description: "Generate code with AI assistance",
    icon: <CodeIcon className="size-5" />,
    isComingSoon: true,
  },
  {
    id: "3",
    title: "Design System",
    description: "Beautiful components out of the box",
    icon: <PaletteIcon className="size-5" />,
    features: ["Customizable themes", "Dark mode support"],
    ctaText: "Explore",
  },
  {
    id: "4",
    title: "Enterprise Security",
    description: "Advanced security features for teams",
    icon: <ShieldIcon className="size-5" />,
    badge: "Pro",
    badgeVariant: "secondary",
  },
];

export const Grid: StoryObj<typeof FeaturePreviewGrid> = {
  render: () => (
    <FeaturePreviewGrid
      features={sampleFeatures}
      columns={2}
      onCtaClick={(feature) => console.log("Clicked:", feature.title)}
      className="max-w-3xl"
    />
  ),
};

export const MediaGrid: StoryObj<typeof FeaturePreviewGrid> = {
  render: () => (
    <FeaturePreviewGrid
      features={sampleFeatures.map((f, i) => ({
        ...f,
        image: `https://images.unsplash.com/photo-${1551288049 + i}-bebda4e38f71?w=800&h=450&fit=crop`,
      }))}
      variant="media"
      columns={3}
      onCtaClick={(feature) => console.log("Clicked:", feature.title)}
      className="max-w-5xl"
    />
  ),
};
