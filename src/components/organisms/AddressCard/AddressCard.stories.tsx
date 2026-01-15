import type { Meta, StoryObj } from "@storybook/react";
import { AddressCard, AddressCardList } from "./index";

const meta: Meta<typeof AddressCard> = {
  title: "Organisms/Cards/AddressCard",
  component: AddressCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AddressCard>;

const sampleAddress = {
  id: "1",
  type: "home" as const,
  name: "John Doe",
  addressLine1: "123 Main Street",
  addressLine2: "Apt 4B",
  city: "San Francisco",
  state: "CA",
  postalCode: "94102",
  country: "United States",
  phone: "+1 (555) 123-4567",
  isDefault: true,
};

export const Default: Story = {
  args: {
    address: sampleAddress,
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
    address: sampleAddress,
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

export const Selectable: Story = {
  args: {
    address: sampleAddress,
    variant: "selectable",
    selected: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const SelectableSelected: Story = {
  args: {
    address: sampleAddress,
    variant: "selectable",
    selected: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const Inline: Story = {
  args: {
    address: sampleAddress,
    variant: "inline",
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const WorkAddress: Story = {
  args: {
    address: {
      ...sampleAddress,
      id: "2",
      type: "work",
      name: "Acme Inc",
      addressLine1: "456 Business Park",
      addressLine2: "Suite 100",
      isDefault: false,
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

export const BillingAddress: Story = {
  args: {
    address: {
      ...sampleAddress,
      id: "3",
      type: "billing",
      isDefault: false,
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

export const WithoutActions: Story = {
  args: {
    address: sampleAddress,
    showActions: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

const addresses = [
  {
    id: "1",
    type: "home" as const,
    name: "John Doe",
    addressLine1: "123 Main Street",
    addressLine2: "Apt 4B",
    city: "San Francisco",
    state: "CA",
    postalCode: "94102",
    country: "United States",
    phone: "+1 (555) 123-4567",
    isDefault: true,
  },
  {
    id: "2",
    type: "work" as const,
    name: "Acme Inc",
    addressLine1: "456 Business Park",
    addressLine2: "Suite 100",
    city: "San Jose",
    state: "CA",
    postalCode: "95110",
    country: "United States",
    isDefault: false,
  },
  {
    id: "3",
    type: "shipping" as const,
    addressLine1: "789 Warehouse Blvd",
    city: "Oakland",
    state: "CA",
    postalCode: "94607",
    country: "United States",
    isDefault: false,
  },
];

export const List: StoryObj<typeof AddressCardList> = {
  render: () => (
    <div className="w-[400px]">
      <AddressCardList
        addresses={addresses}
        selectedId="1"
      />
    </div>
  ),
};

export const ListSelectable: StoryObj<typeof AddressCardList> = {
  render: () => (
    <div className="w-[400px]">
      <AddressCardList
        addresses={addresses}
        variant="selectable"
        selectedId="1"
      />
    </div>
  ),
};

export const ListCompact: StoryObj<typeof AddressCardList> = {
  render: () => (
    <div className="w-[400px]">
      <AddressCardList
        addresses={addresses}
        variant="compact"
      />
    </div>
  ),
};

export const ListInline: StoryObj<typeof AddressCardList> = {
  render: () => (
    <div className="w-[400px]">
      <AddressCardList
        addresses={addresses}
        variant="inline"
        selectedId="1"
      />
    </div>
  ),
};
