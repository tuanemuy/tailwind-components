import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { SelectOption } from "../Select";
import { InlineSelect } from "./index";

const sortOptions: SelectOption[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest file" },
  { value: "az", label: "A to Z" },
  { value: "za", label: "Z to A" },
];

const viewOptions: SelectOption[] = [
  { value: "list", label: "List" },
  { value: "grid", label: "Grid" },
  { value: "compact", label: "Compact" },
];

const filterOptions: SelectOption[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

const timeOptions: SelectOption[] = [
  { value: "today", label: "Today" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "year", label: "This year" },
  { value: "all", label: "All time" },
];

const meta: Meta<typeof InlineSelect> = {
  title: "Molecules/InlineSelect",
  component: InlineSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    labelPosition: {
      control: "select",
      options: ["before", "after"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    label: "Sort:",
    options: sortOptions,
    defaultValue: "newest",
  },
};

export const LabelAfter: Story = {
  args: {
    label: "items",
    labelPosition: "after",
    options: [
      { value: "10", label: "10" },
      { value: "25", label: "25" },
      { value: "50", label: "50" },
      { value: "100", label: "100" },
    ],
    defaultValue: "25",
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-12 text-sm text-muted-foreground">xs</span>
        <InlineSelect
          size="xs"
          label="Sort:"
          options={sortOptions}
          defaultValue="newest"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-12 text-sm text-muted-foreground">sm</span>
        <InlineSelect
          size="sm"
          label="Sort:"
          options={sortOptions}
          defaultValue="newest"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-12 text-sm text-muted-foreground">md</span>
        <InlineSelect
          size="md"
          label="Sort:"
          options={sortOptions}
          defaultValue="newest"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-12 text-sm text-muted-foreground">lg</span>
        <InlineSelect
          size="lg"
          label="Sort:"
          options={sortOptions}
          defaultValue="newest"
        />
      </div>
    </div>
  ),
};

// Sort Example
export const SortSelect: Story = {
  args: {
    label: "Sort:",
    options: sortOptions,
    defaultValue: "newest",
  },
};

// View Example
export const ViewSelect: Story = {
  args: {
    label: "View:",
    options: viewOptions,
    defaultValue: "list",
  },
};

// Filter Example
export const FilterSelect: Story = {
  args: {
    label: "Filter:",
    options: filterOptions,
    defaultValue: "all",
  },
};

// Time Range Example
export const TimeRangeSelect: Story = {
  args: {
    label: "Period:",
    options: timeOptions,
    defaultValue: "month",
  },
};

// Page Size Example
export const PageSizeSelect: Story = {
  args: {
    label: "Show",
    labelPosition: "before",
    options: [
      { value: "10", label: "10" },
      { value: "25", label: "25" },
      { value: "50", label: "50" },
      { value: "100", label: "100" },
    ],
    defaultValue: "25",
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <InlineSelect {...args} />
      <span className="text-sm text-muted-foreground">entries per page</span>
    </div>
  ),
};

// Custom Label Element
export const CustomLabelElement: Story = {
  render: () => (
    <InlineSelect
      labelElement={
        <span className="font-semibold text-primary">Sort by:</span>
      }
      options={sortOptions}
      defaultValue="newest"
    />
  ),
};

// Disabled
export const Disabled: Story = {
  args: {
    label: "Sort:",
    options: sortOptions,
    defaultValue: "newest",
    disabled: true,
  },
};

// Controlled
export const Controlled: Story = {
  render: function ControlledInlineSelect() {
    const [value, setValue] = useState("newest");

    return (
      <div className="space-y-4">
        <InlineSelect
          label="Sort:"
          options={sortOptions}
          value={value}
          onChange={setValue}
        />
        <p className="text-sm text-muted-foreground">
          Selected value: <code className="text-foreground">{value}</code>
        </p>
      </div>
    );
  },
};

// Multiple Inline Selects in Row
export const MultipleInRow: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <InlineSelect
        label="Sort:"
        options={sortOptions}
        defaultValue="newest"
        size="sm"
      />
      <InlineSelect
        label="View:"
        options={viewOptions}
        defaultValue="list"
        size="sm"
      />
      <InlineSelect
        label="Filter:"
        options={filterOptions}
        defaultValue="all"
        size="sm"
      />
    </div>
  ),
};

// In Toolbar Context
export const InToolbar: Story = {
  render: () => (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-4">
        <h3 className="font-semibold">Files</h3>
        <span className="text-sm text-muted-foreground">128 items</span>
      </div>
      <div className="flex items-center gap-4">
        <InlineSelect
          label="Sort:"
          options={sortOptions}
          defaultValue="newest"
          size="sm"
        />
        <InlineSelect
          label="View:"
          options={viewOptions}
          defaultValue="grid"
          size="sm"
        />
      </div>
    </div>
  ),
};

// In Table Header Context
export const InTableHeader: Story = {
  render: () => (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <InlineSelect
          label="Show"
          options={[
            { value: "10", label: "10" },
            { value: "25", label: "25" },
            { value: "50", label: "50" },
          ]}
          defaultValue="10"
          size="sm"
        />
        <span className="text-sm text-muted-foreground">entries</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Showing 1-10 of 128</span>
      </div>
    </div>
  ),
};
