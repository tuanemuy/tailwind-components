import type { Meta, StoryObj } from "@storybook/react";
import { InboxContacts } from "./index";

const meta: Meta<typeof InboxContacts> = {
  title: "DataVisualization/Stats/InboxContacts",
  component: InboxContacts,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[900px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutAvatars: Story = {
  args: {
    cards: [
      {
        label: "Total users",
        value: "1,234",
        details: [
          { label: "Active:", value: "890" },
          { label: "Inactive:", value: "344" },
        ],
      },
      {
        label: "New signups",
        value: "156",
        href: "#",
        details: [
          { label: "This week:", value: "89" },
          { label: "Last week:", value: "67" },
        ],
      },
      {
        label: "Churned users",
        value: "23",
        href: "#",
        details: [
          { label: "This month:", value: "15" },
          { label: "Last month:", value: "8" },
        ],
      },
      {
        label: "Retention rate",
        value: "94%",
        href: "#",
        badge: {
          value: "5%",
          trendDirection: "up",
          trendVariant: "positive",
        },
        details: [
          { label: "30-day:", value: "92%" },
          { label: "90-day:", value: "88%" },
        ],
      },
    ],
  },
};

export const AllWithLinks: Story = {
  args: {
    cards: [
      {
        label: "Messages sent",
        value: "12,456",
        href: "#",
        details: [
          { label: "Text:", value: "8,234" },
          { label: "Media:", value: "4,222" },
        ],
      },
      {
        label: "Messages received",
        value: "10,892",
        href: "#",
        details: [
          { label: "Read:", value: "9,500" },
          { label: "Unread:", value: "1,392" },
        ],
      },
      {
        label: "Response time",
        value: "2.5h",
        href: "#",
        badge: {
          value: "15%",
          trendDirection: "down",
          trendVariant: "positive",
        },
        details: [
          { label: "Fastest:", value: "5min" },
          { label: "Slowest:", value: "24h" },
        ],
      },
      {
        label: "Satisfaction",
        value: "4.8/5",
        href: "#",
        badge: {
          value: "3%",
          trendDirection: "up",
          trendVariant: "positive",
        },
        details: [
          { label: "5 stars:", value: "78%" },
          { label: "4 stars:", value: "18%" },
        ],
      },
    ],
  },
};

export const NegativeTrends: Story = {
  args: {
    cards: [
      {
        label: "Active sessions",
        value: "892",
        details: [
          { label: "Desktop:", value: "534" },
          { label: "Mobile:", value: "358" },
        ],
      },
      {
        label: "Bounce rate",
        value: "45%",
        href: "#",
        badge: {
          value: "8%",
          trendDirection: "up",
          trendVariant: "negative",
        },
        details: [
          { label: "Homepage:", value: "32%" },
          { label: "Landing pages:", value: "58%" },
        ],
      },
      {
        label: "Page load time",
        value: "3.2s",
        href: "#",
        badge: {
          value: "12%",
          trendDirection: "up",
          trendVariant: "negative",
        },
        details: [
          { label: "Average:", value: "2.8s" },
          { label: "P99:", value: "5.1s" },
        ],
      },
      {
        label: "Error rate",
        value: "2.1%",
        href: "#",
        badge: {
          value: "0.5%",
          trendDirection: "up",
          trendVariant: "negative",
        },
        details: [
          { label: "4xx:", value: "1.2%" },
          { label: "5xx:", value: "0.9%" },
        ],
      },
    ],
  },
};

export const TwoCards: Story = {
  args: {
    cards: [
      {
        label: "Total revenue",
        value: "$125,430",
        avatars: [
          {
            src: "https://images.unsplash.com/photo-1708443683276-8a3eb30faef2?q=80&w=160&h=160&auto=format&fit=crop",
            alt: "Customer 1",
          },
          {
            src: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?auto=format&fit=facearea&facepad=3&w=320&h=320&q=80",
            alt: "Customer 2",
          },
        ],
        details: [
          { label: "Subscriptions:", value: "$89,200" },
          { label: "One-time:", value: "$36,230" },
        ],
      },
      {
        label: "Growth",
        value: "+23%",
        href: "#",
        badge: {
          value: "5%",
          trendDirection: "up",
          trendVariant: "positive",
        },
        details: [
          { label: "MRR:", value: "+18%" },
          { label: "ARR:", value: "+28%" },
        ],
      },
    ],
  },
};
