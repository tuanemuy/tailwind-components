import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { GridIcon, LayoutIcon, ListIcon } from "@/components/icons";
import { RadioGroup } from ".";

const meta: Meta<typeof RadioGroup> = {
  title: "Molecules/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["list", "card", "inline", "button", "grid"],
    },
    columns: {
      control: "select",
      options: [1, 2, 3, 4],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const basicOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const optionsWithDescription = [
  {
    value: "icons-text",
    label: "Icons and Text",
    description: "Shows both icons and text in the navigation bar",
  },
  {
    value: "icons-only",
    label: "Icons Only",
    description: "Shows only icons in the navigation bar",
  },
  {
    value: "text-only",
    label: "Text Only",
    description: "Shows only text in the navigation bar",
  },
];

const deliveryOptions = [
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

const viewOptions = [
  { value: "grid", label: "Grid", icon: <GridIcon className="size-4" /> },
  { value: "list", label: "List", icon: <ListIcon className="size-4" /> },
  { value: "board", label: "Board", icon: <LayoutIcon className="size-4" /> },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    label: "Select an option",
  },
};

export const ListVariant: Story = {
  args: {
    variant: "list",
    options: optionsWithDescription,
    label: "Navigation Appearance",
    description: "Choose how the navigation bar should display",
  },
};

export const CardVariant: Story = {
  args: {
    variant: "card",
    columns: 2,
    options: deliveryOptions,
    label: "Shipping Method",
  },
};

export const GridVariant: Story = {
  args: {
    variant: "grid",
    columns: 3,
    options: [
      { value: "small", label: "Small", description: "For 1-2 people" },
      { value: "medium", label: "Medium", description: "For 2-4 people" },
      { value: "large", label: "Large", description: "For 4+ people" },
    ],
    label: "Size",
  },
};

export const InlineVariant: Story = {
  args: {
    variant: "inline",
    options: basicOptions,
    label: "Quick selection",
  },
};

export const ButtonVariant: Story = {
  args: {
    variant: "button",
    options: [
      { value: "day", label: "Day" },
      { value: "week", label: "Week" },
      { value: "month", label: "Month" },
      { value: "year", label: "Year" },
    ],
    defaultValue: "week",
  },
};

export const ButtonVariantWithIcons: Story = {
  args: {
    variant: "button",
    options: viewOptions,
    defaultValue: "grid",
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: basicOptions,
    defaultValue: "option2",
    label: "Pre-selected option",
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
    defaultValue: "option1",
  },
};

export const Required: Story = {
  args: {
    options: basicOptions,
    label: "Required selection",
    required: true,
  },
};

export const WithError: Story = {
  args: {
    options: basicOptions,
    label: "Required selection",
    required: true,
    error: "Please select an option",
  },
};

export const MultiColumn: Story = {
  args: {
    variant: "grid",
    columns: 4,
    options: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
      { value: "2xl", label: "2XL" },
      { value: "3xl", label: "3XL" },
      { value: "4xl", label: "4XL" },
    ],
    label: "Size",
    defaultValue: "m",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <RadioGroup
        options={basicOptions}
        size="sm"
        label="Small"
        variant="inline"
      />
      <RadioGroup
        options={basicOptions}
        size="md"
        label="Medium (default)"
        variant="inline"
      />
      <RadioGroup
        options={basicOptions}
        size="lg"
        label="Large"
        variant="inline"
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [selected, setSelected] = useState<string>("option1");
      return (
        <div className="space-y-4">
          <RadioGroup
            options={basicOptions}
            value={selected}
            onChange={setSelected}
            label="Controlled radio group"
          />
          <p className="text-sm text-muted-foreground">Selected: {selected}</p>
        </div>
      );
    };
    return <ControlledExample />;
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-10">
      <div>
        <h3 className="mb-4 text-lg font-semibold">List Variant</h3>
        <RadioGroup
          variant="list"
          options={optionsWithDescription}
          label="Navigation Style"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Card Variant</h3>
        <RadioGroup
          variant="card"
          columns={2}
          options={deliveryOptions}
          label="Shipping"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Grid Variant</h3>
        <RadioGroup
          variant="grid"
          columns={3}
          options={[
            { value: "starter", label: "Starter", description: "$9/month" },
            { value: "pro", label: "Pro", description: "$29/month" },
            { value: "enterprise", label: "Enterprise", description: "Custom" },
          ]}
          label="Plan"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Inline Variant</h3>
        <RadioGroup
          variant="inline"
          options={basicOptions}
          label="Quick Pick"
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Button Variant</h3>
        <RadioGroup
          variant="button"
          options={viewOptions}
          defaultValue="grid"
        />
      </div>
    </div>
  ),
};
