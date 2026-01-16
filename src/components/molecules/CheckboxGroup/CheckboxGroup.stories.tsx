import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CheckboxGroup } from ".";

const meta: Meta<typeof CheckboxGroup> = {
  title: "Molecules/CheckboxGroup",
  component: CheckboxGroup,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["list", "card", "grid", "table", "badge", "filter", "inline"],
    },
    columns: {
      control: "select",
      options: [1, 2, 3, 4],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    color: {
      control: "select",
      options: ["primary", "success", "purple"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const basicOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const optionsWithDescription = [
  {
    value: "standard",
    label: "Standard Delivery",
    description: "Delivery in 3-5 business days",
  },
  {
    value: "express",
    label: "Express Delivery",
    description: "Delivery in 1-2 business days",
  },
  {
    value: "overnight",
    label: "Overnight Delivery",
    description: "Delivery by next morning",
  },
];

const optionsWithExtra = [
  {
    value: "standard",
    label: "Standard Delivery",
    description: "Delivery in 3-5 business days",
    extra: <span className="font-medium">Free</span>,
  },
  {
    value: "express",
    label: "Express Delivery",
    description: "Delivery in 1-2 business days",
    extra: <span className="font-medium">$9</span>,
  },
  {
    value: "overnight",
    label: "Overnight Delivery",
    description: "Delivery by next morning",
    extra: <span className="font-medium">$19</span>,
  },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    label: "Select options",
  },
};

export const ListVariant: Story = {
  args: {
    variant: "list",
    options: optionsWithDescription,
    label: "Delivery Options",
    description: "Choose your preferred delivery methods",
  },
};

export const CardVariant: Story = {
  args: {
    variant: "card",
    columns: 2,
    options: optionsWithExtra,
    label: "Shipping Options",
  },
};

export const GridVariant: Story = {
  args: {
    variant: "grid",
    columns: 2,
    options: optionsWithDescription,
    label: "Features",
  },
};

export const TableVariant: Story = {
  args: {
    variant: "table",
    options: optionsWithExtra,
    label: "Tasks",
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: basicOptions,
    defaultValue: ["option1", "option3"],
    label: "Pre-selected options",
  },
};

export const DisabledOptions: Story = {
  args: {
    options: [
      { value: "option1", label: "Available Option" },
      { value: "option2", label: "Disabled Option", disabled: true },
      { value: "option3", label: "Another Available Option" },
    ],
    label: "Options with disabled",
  },
};

export const DisabledGroup: Story = {
  args: {
    options: basicOptions,
    label: "Disabled group",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    options: basicOptions,
    label: "Required selection",
    error: "Please select at least one option",
  },
};

export const MultiColumn: Story = {
  args: {
    variant: "grid",
    columns: 3,
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
      { value: "solid", label: "Solid" },
      { value: "qwik", label: "Qwik" },
    ],
    label: "Frameworks",
    description: "Select the frameworks you have experience with",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <CheckboxGroup options={basicOptions} size="sm" label="Small" />
      <CheckboxGroup
        options={basicOptions}
        size="md"
        label="Medium (default)"
      />
      <CheckboxGroup options={basicOptions} size="lg" label="Large" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [selected, setSelected] = useState<string[]>(["option1"]);
      return (
        <div className="space-y-4">
          <CheckboxGroup
            options={basicOptions}
            value={selected}
            onChange={setSelected}
            label="Controlled checkbox group"
          />
          <p className="text-sm text-muted-foreground">
            Selected: {selected.join(", ") || "none"}
          </p>
        </div>
      );
    };
    return <ControlledExample />;
  },
};

// Badge variant options
const badgeOptions = [
  { value: "transfers", label: "Transfers" },
  { value: "withdrawal", label: "Cash withdrawal" },
  { value: "card", label: "Card transactions" },
  { value: "debits", label: "Direct debits" },
  { value: "batch", label: "Batch transfers" },
  { value: "added", label: "Money added" },
  { value: "prefunding", label: "Prefunding transfers" },
  { value: "conversions", label: "Conversions" },
];

// Filter variant options with counts
const filterOptions = [
  { value: "shirts", label: "Shirts", count: 47 },
  { value: "tshirts", label: "T-shirts", count: 89 },
  { value: "polos", label: "Polos", count: 35 },
  { value: "trousers", label: "Trousers", count: 30 },
  { value: "jeans", label: "Jeans", count: 21 },
  { value: "shorts", label: "Shorts", count: 5 },
  { value: "jackets", label: "Jackets", count: 15 },
];

export const BadgeVariant: Story = {
  args: {
    variant: "badge",
    options: badgeOptions,
    label: "Transaction Types",
    color: "purple",
  },
};

export const FilterVariant: Story = {
  args: {
    variant: "filter",
    options: filterOptions,
    label: "Categories",
  },
};

export const InlineVariant: Story = {
  args: {
    variant: "inline",
    options: basicOptions,
    label: "Select options",
  },
};

export const CardWithSuccessColor: Story = {
  args: {
    variant: "card",
    columns: 2,
    options: optionsWithExtra,
    label: "Delivery Options",
    color: "success",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-10">
      <div>
        <h3 className="mb-4 text-lg font-semibold">List Variant</h3>
        <CheckboxGroup
          variant="list"
          options={optionsWithDescription}
          label="Notifications"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Card Variant</h3>
        <CheckboxGroup
          variant="card"
          columns={2}
          options={optionsWithExtra}
          label="Delivery Options"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Card Variant (Success Color)
        </h3>
        <CheckboxGroup
          variant="card"
          columns={2}
          options={optionsWithExtra}
          label="Delivery Options"
          color="success"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Grid Variant</h3>
        <CheckboxGroup
          variant="grid"
          columns={3}
          options={[
            {
              value: "email",
              label: "Email",
              description: "Get notified via email",
            },
            {
              value: "sms",
              label: "SMS",
              description: "Get text notifications",
            },
            {
              value: "push",
              label: "Push",
              description: "Browser notifications",
            },
          ]}
          label="Notification Channels"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Table Variant</h3>
        <CheckboxGroup
          variant="table"
          options={optionsWithExtra}
          label="Tasks to complete"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Badge Variant</h3>
        <CheckboxGroup
          variant="badge"
          options={badgeOptions}
          label="Transaction Types"
          color="purple"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Filter Variant</h3>
        <CheckboxGroup
          variant="filter"
          options={filterOptions}
          label="Categories"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Inline Variant</h3>
        <CheckboxGroup
          variant="inline"
          options={basicOptions}
          label="Select options"
        />
      </div>
    </div>
  ),
};
