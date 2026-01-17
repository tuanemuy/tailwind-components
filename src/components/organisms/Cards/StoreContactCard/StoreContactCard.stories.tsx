import type { Meta, StoryObj } from "@storybook/react";
import { StoreContactCard, StoreContactList } from "./index";

const meta: Meta<typeof StoreContactCard> = {
  title: "Organisms/Cards/StoreContactCard",
  component: StoreContactCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StoreContactCard>;

const sampleStore = {
  id: "1",
  name: "Downtown Store",
  address: {
    line1: "123 Main Street",
    line2: "Ground Floor",
    city: "San Francisco",
    state: "CA",
    postalCode: "94102",
    country: "United States",
  },
  phone: "+1 (555) 123-4567",
  email: "downtown@store.com",
  website: "https://store.com/downtown",
  distance: "0.3 mi",
  isOpen: true,
  imageUrl:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
  hours: [
    { day: "Monday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Tuesday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "6:00 PM" },
    { day: "Thursday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Friday", open: "9:00 AM", close: "8:00 PM" },
    { day: "Saturday", open: "10:00 AM", close: "6:00 PM" },
    { day: "Sunday", open: "11:00 AM", close: "5:00 PM" },
  ],
};

export const Default: Story = {
  args: {
    store: sampleStore,
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const Compact: Story = {
  args: {
    store: sampleStore,
    variant: "compact",
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const Horizontal: Story = {
  args: {
    store: sampleStore,
    variant: "horizontal",
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export const Detailed: Story = {
  args: {
    store: sampleStore,
    variant: "detailed",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const Closed: Story = {
  args: {
    store: {
      ...sampleStore,
      isOpen: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const WithoutHours: Story = {
  args: {
    store: sampleStore,
    variant: "detailed",
    showHours: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

const stores = [
  {
    id: "1",
    name: "Downtown Store",
    address: {
      line1: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "United States",
    },
    phone: "+1 (555) 123-4567",
    distance: "0.3 mi",
    isOpen: true,
  },
  {
    id: "2",
    name: "Mission District",
    address: {
      line1: "456 Valencia Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94110",
      country: "United States",
    },
    phone: "+1 (555) 234-5678",
    distance: "1.2 mi",
    isOpen: true,
  },
  {
    id: "3",
    name: "Marina Store",
    address: {
      line1: "789 Chestnut Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94123",
      country: "United States",
    },
    phone: "+1 (555) 345-6789",
    distance: "2.5 mi",
    isOpen: false,
  },
];

export const List: StoryObj<typeof StoreContactList> = {
  render: () => (
    <div className="w-[400px]">
      <StoreContactList stores={stores} />
    </div>
  ),
};

export const ListCompact: StoryObj<typeof StoreContactList> = {
  render: () => (
    <div className="w-[400px]">
      <StoreContactList stores={stores} variant="compact" />
    </div>
  ),
};

export const ListHorizontal: StoryObj<typeof StoreContactList> = {
  render: () => (
    <div className="w-[550px]">
      <StoreContactList stores={stores} variant="horizontal" />
    </div>
  ),
};
