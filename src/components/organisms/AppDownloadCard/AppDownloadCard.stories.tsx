import type { Meta, StoryObj } from "@storybook/react";
import { AppDownloadCard } from "./";
import { SmartphoneIcon } from "@/lib/icons";

const meta: Meta<typeof AppDownloadCard> = {
  title: "Organisms/AppDownloadCard",
  component: AppDownloadCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AppDownloadCard>;

export const Default: Story = {
  args: {
    appName: "Preline App",
    tagline: "Streamline your workflow",
    description: "The all-in-one productivity app that helps you manage tasks, collaborate with your team, and stay organized.",
    rating: 4.8,
    reviewCount: "12.5K",
    version: "2.4.1",
    appStoreUrl: "#",
    playStoreUrl: "#",
    className: "w-[400px]",
  },
};

export const Featured: Story = {
  args: {
    appName: "Preline Mobile",
    tagline: "Work from anywhere",
    description: "Take your productivity on the go with our powerful mobile app. Sync across devices, work offline, and stay connected with your team wherever you are.",
    rating: 4.9,
    reviewCount: "25K",
    appStoreUrl: "#",
    playStoreUrl: "#",
    mockupImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=600&fit=crop",
    variant: "featured",
    isNew: true,
    className: "w-[800px]",
  },
};

export const FeaturedWithQR: Story = {
  args: {
    appName: "Preline Mobile",
    tagline: "Work from anywhere",
    description: "Scan the QR code to download our mobile app and get started in seconds.",
    rating: 4.9,
    reviewCount: "25K",
    appStoreUrl: "#",
    playStoreUrl: "#",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com",
    variant: "featured",
    className: "w-[600px]",
  },
};

export const Horizontal: Story = {
  args: {
    appName: "Preline App",
    tagline: "Streamline your workflow",
    rating: 4.8,
    appStoreUrl: "#",
    playStoreUrl: "#",
    variant: "horizontal",
    className: "w-[500px]",
  },
};

export const Minimal: Story = {
  args: {
    appName: "Preline",
    rating: 4.8,
    variant: "minimal",
    className: "w-[300px]",
  },
};

export const WithCustomIcon: Story = {
  args: {
    appName: "Custom App",
    tagline: "Your app description",
    appIcon: (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
        <SmartphoneIcon className="size-8 text-white" />
      </div>
    ),
    rating: 4.5,
    appStoreUrl: "#",
    playStoreUrl: "#",
    className: "w-[400px]",
  },
};

export const AppStoreOnly: Story = {
  args: {
    appName: "iOS Only App",
    tagline: "Exclusive for Apple devices",
    rating: 4.7,
    appStoreUrl: "#",
    className: "w-[400px]",
  },
};

export const New: Story = {
  args: {
    appName: "Brand New App",
    tagline: "Just launched!",
    description: "Check out our brand new app with exciting features.",
    rating: 5.0,
    reviewCount: "100",
    appStoreUrl: "#",
    playStoreUrl: "#",
    isNew: true,
    className: "w-[400px]",
  },
};
