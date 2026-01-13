import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  FilterForm,
  FilterHeader,
  FilterBody,
  FilterSection,
  FilterGroup,
  FilterChip,
  FilterChipGroup,
  FilterActions,
  DateRangeFilter,
  PriceRangeFilter,
} from "./index";
import { Select } from "@/components/molecules";
import { Checkbox, Radio, Input, Badge } from "@/components/atoms";

const meta: Meta<typeof FilterForm> = {
  title: "Organisms/FilterForm",
  component: FilterForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FilterForm>;

// Basic Filter Form
export const Default: Story = {
  render: () => (
    <FilterForm variant="card" className="w-80">
      <FilterHeader title="Filters" activeCount={2} />
      <FilterBody>
        <FilterSection title="Category">
          <div className="space-y-2">
            <label className="flex items-center gap-x-2">
              <Checkbox defaultChecked />
              <span className="text-sm text-foreground">Electronics</span>
            </label>
            <label className="flex items-center gap-x-2">
              <Checkbox />
              <span className="text-sm text-foreground">Clothing</span>
            </label>
            <label className="flex items-center gap-x-2">
              <Checkbox defaultChecked />
              <span className="text-sm text-foreground">Home & Garden</span>
            </label>
            <label className="flex items-center gap-x-2">
              <Checkbox />
              <span className="text-sm text-foreground">Sports</span>
            </label>
          </div>
        </FilterSection>

        <FilterSection title="Price Range">
          <PriceRangeFilter label="" />
        </FilterSection>

        <FilterSection title="Brand">
          <Select
            options={[
              { value: "all", label: "All Brands" },
              { value: "apple", label: "Apple" },
              { value: "samsung", label: "Samsung" },
              { value: "sony", label: "Sony" },
            ]}
            placeholder="Select brand"
          />
        </FilterSection>
      </FilterBody>
      <FilterActions onClear={() => console.log("Clear")} onApply={() => console.log("Apply")} />
    </FilterForm>
  ),
};

// Sidebar Filter
export const Sidebar: Story = {
  render: () => (
    <FilterForm variant="sidebar" className="w-64 border-r border-border">
      <FilterHeader title="Filters" activeCount={3} />
      <FilterBody>
        <FilterSection title="Status" badge={<Badge variant="secondary" size="sm" soft>1</Badge>}>
          <div className="space-y-2">
            <label className="flex items-center gap-x-2">
              <Checkbox defaultChecked />
              <span className="text-sm text-foreground">Active</span>
            </label>
            <label className="flex items-center gap-x-2">
              <Checkbox />
              <span className="text-sm text-foreground">Pending</span>
            </label>
            <label className="flex items-center gap-x-2">
              <Checkbox />
              <span className="text-sm text-foreground">Completed</span>
            </label>
            <label className="flex items-center gap-x-2">
              <Checkbox />
              <span className="text-sm text-foreground">Cancelled</span>
            </label>
          </div>
        </FilterSection>

        <FilterSection title="Date Range" badge={<Badge variant="secondary" size="sm" soft>1</Badge>}>
          <DateRangeFilter label="" />
        </FilterSection>

        <FilterSection title="Payment Method">
          <div className="space-y-2">
            <label className="flex items-center gap-x-2">
              <Radio name="payment" value="all" defaultChecked />
              <span className="text-sm text-foreground">All</span>
            </label>
            <label className="flex items-center gap-x-2">
              <Radio name="payment" value="credit" />
              <span className="text-sm text-foreground">Credit Card</span>
            </label>
            <label className="flex items-center gap-x-2">
              <Radio name="payment" value="debit" />
              <span className="text-sm text-foreground">Debit Card</span>
            </label>
            <label className="flex items-center gap-x-2">
              <Radio name="payment" value="paypal" />
              <span className="text-sm text-foreground">PayPal</span>
            </label>
          </div>
        </FilterSection>

        <FilterSection title="Amount" badge={<Badge variant="secondary" size="sm" soft>1</Badge>}>
          <PriceRangeFilter label="" />
        </FilterSection>
      </FilterBody>
    </FilterForm>
  ),
};

// Inline Filter Bar
export const InlineBar: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-4">
      <FilterForm variant="inline">
        <div className="flex-1 min-w-[200px]">
          <Input placeholder="Search transactions..." />
        </div>
        <Select
          className="w-40"
          options={[
            { value: "all", label: "All Status" },
            { value: "completed", label: "Completed" },
            { value: "pending", label: "Pending" },
            { value: "failed", label: "Failed" },
          ]}
          defaultValue="all"
        />
        <Select
          className="w-40"
          options={[
            { value: "7d", label: "Last 7 days" },
            { value: "30d", label: "Last 30 days" },
            { value: "90d", label: "Last 90 days" },
            { value: "custom", label: "Custom" },
          ]}
          defaultValue="30d"
        />
      </FilterForm>

      <FilterChipGroup onClearAll={() => console.log("Clear all")}>
        <FilterChip label="Status" value="Completed" onRemove={() => {}} />
        <FilterChip label="Date" value="Last 30 days" onRemove={() => {}} />
      </FilterChipGroup>
    </div>
  ),
};

// Active Filter Chips
export const WithFilterChips: Story = {
  render: () => {
    const [filters, setFilters] = useState([
      { id: "1", label: "Category", value: "Electronics" },
      { id: "2", label: "Price", value: "$100 - $500" },
      { id: "3", label: "Brand", value: "Apple" },
    ]);

    const removeFilter = (id: string) => {
      setFilters(filters.filter((f) => f.id !== id));
    };

    return (
      <div className="w-full max-w-2xl space-y-4">
        <FilterChipGroup onClearAll={() => setFilters([])}>
          {filters.map((filter) => (
            <FilterChip
              key={filter.id}
              label={filter.label}
              value={filter.value}
              onRemove={() => removeFilter(filter.id)}
            />
          ))}
        </FilterChipGroup>

        <p className="text-sm text-muted-foreground">
          Showing 24 results
        </p>
      </div>
    );
  },
};

// Product Filter
export const ProductFilter: Story = {
  render: () => (
    <FilterForm variant="card" className="w-80" onClear={() => console.log("Clear")}>
      <FilterHeader title="Product Filters" activeCount={4} />
      <FilterBody>
        <FilterSection title="Categories">
          <div className="space-y-2">
            <label className="flex items-center justify-between gap-x-2">
              <span className="flex items-center gap-x-2">
                <Checkbox defaultChecked />
                <span className="text-sm text-foreground">Smartphones</span>
              </span>
              <span className="text-xs text-muted-foreground">124</span>
            </label>
            <label className="flex items-center justify-between gap-x-2">
              <span className="flex items-center gap-x-2">
                <Checkbox defaultChecked />
                <span className="text-sm text-foreground">Laptops</span>
              </span>
              <span className="text-xs text-muted-foreground">89</span>
            </label>
            <label className="flex items-center justify-between gap-x-2">
              <span className="flex items-center gap-x-2">
                <Checkbox />
                <span className="text-sm text-foreground">Tablets</span>
              </span>
              <span className="text-xs text-muted-foreground">45</span>
            </label>
            <label className="flex items-center justify-between gap-x-2">
              <span className="flex items-center gap-x-2">
                <Checkbox />
                <span className="text-sm text-foreground">Accessories</span>
              </span>
              <span className="text-xs text-muted-foreground">230</span>
            </label>
          </div>
        </FilterSection>

        <FilterSection title="Price">
          <PriceRangeFilter label="" />
        </FilterSection>

        <FilterSection title="Rating">
          <div className="space-y-2">
            <label className="flex items-center gap-x-2">
              <Radio name="rating" value="4" />
              <span className="flex items-center gap-x-1 text-sm text-foreground">
                4 stars & up
                <span className="text-yellow-500">{"★".repeat(4)}</span>
              </span>
            </label>
            <label className="flex items-center gap-x-2">
              <Radio name="rating" value="3" />
              <span className="flex items-center gap-x-1 text-sm text-foreground">
                3 stars & up
                <span className="text-yellow-500">{"★".repeat(3)}</span>
              </span>
            </label>
            <label className="flex items-center gap-x-2">
              <Radio name="rating" value="2" />
              <span className="flex items-center gap-x-1 text-sm text-foreground">
                2 stars & up
                <span className="text-yellow-500">{"★".repeat(2)}</span>
              </span>
            </label>
          </div>
        </FilterSection>

        <FilterSection title="Availability">
          <div className="space-y-2">
            <label className="flex items-center gap-x-2">
              <Checkbox defaultChecked />
              <span className="text-sm text-foreground">In Stock</span>
            </label>
            <label className="flex items-center gap-x-2">
              <Checkbox defaultChecked />
              <span className="text-sm text-foreground">Free Shipping</span>
            </label>
            <label className="flex items-center gap-x-2">
              <Checkbox />
              <span className="text-sm text-foreground">On Sale</span>
            </label>
          </div>
        </FilterSection>
      </FilterBody>
      <FilterActions onClear={() => console.log("Clear")} onApply={() => console.log("Apply")} />
    </FilterForm>
  ),
};

// Collapsible Filter
export const Collapsible: Story = {
  render: () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
      <FilterForm variant="card" className="w-80">
        <FilterHeader
          title="Filters"
          activeCount={2}
          collapsible
          defaultCollapsed={false}
          onCollapse={setIsCollapsed}
        />
        <FilterBody collapsed={isCollapsed}>
          <FilterSection title="Type" defaultExpanded>
            <div className="space-y-2">
              <label className="flex items-center gap-x-2">
                <Checkbox defaultChecked />
                <span className="text-sm text-foreground">Option 1</span>
              </label>
              <label className="flex items-center gap-x-2">
                <Checkbox />
                <span className="text-sm text-foreground">Option 2</span>
              </label>
            </div>
          </FilterSection>

          <FilterSection title="Size" defaultExpanded={false}>
            <div className="space-y-2">
              <label className="flex items-center gap-x-2">
                <Checkbox />
                <span className="text-sm text-foreground">Small</span>
              </label>
              <label className="flex items-center gap-x-2">
                <Checkbox defaultChecked />
                <span className="text-sm text-foreground">Medium</span>
              </label>
              <label className="flex items-center gap-x-2">
                <Checkbox />
                <span className="text-sm text-foreground">Large</span>
              </label>
            </div>
          </FilterSection>
        </FilterBody>
        {!isCollapsed && (
          <FilterActions onClear={() => console.log("Clear")} onApply={() => console.log("Apply")} />
        )}
      </FilterForm>
    );
  },
};

// Transaction Filter (matching example)
export const TransactionFilter: Story = {
  render: () => (
    <FilterForm variant="card" className="w-96">
      <FilterHeader title="Payment Transactions" />
      <FilterBody>
        <FilterGroup label="Transaction Type">
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-x-2 p-2 rounded-lg border border-border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <Checkbox />
              <span className="text-sm text-foreground">Incoming</span>
            </label>
            <label className="flex items-center gap-x-2 p-2 rounded-lg border border-border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <Checkbox />
              <span className="text-sm text-foreground">Outgoing</span>
            </label>
          </div>
        </FilterGroup>

        <FilterGroup label="Status">
          <Select
            options={[
              { value: "all", label: "All Status" },
              { value: "completed", label: "Completed" },
              { value: "pending", label: "Pending" },
              { value: "failed", label: "Failed" },
              { value: "refunded", label: "Refunded" },
            ]}
            defaultValue="all"
          />
        </FilterGroup>

        <FilterGroup label="Date Range">
          <DateRangeFilter label="" />
        </FilterGroup>

        <FilterGroup label="Amount Range">
          <PriceRangeFilter label="" />
        </FilterGroup>

        <FilterGroup label="Payment Method">
          <div className="space-y-2">
            <label className="flex items-center gap-x-2">
              <Checkbox defaultChecked />
              <span className="text-sm text-foreground">Credit Card</span>
            </label>
            <label className="flex items-center gap-x-2">
              <Checkbox defaultChecked />
              <span className="text-sm text-foreground">Debit Card</span>
            </label>
            <label className="flex items-center gap-x-2">
              <Checkbox />
              <span className="text-sm text-foreground">Bank Transfer</span>
            </label>
            <label className="flex items-center gap-x-2">
              <Checkbox />
              <span className="text-sm text-foreground">PayPal</span>
            </label>
          </div>
        </FilterGroup>
      </FilterBody>
      <FilterActions
        clearText="Reset"
        applyText="Apply Filters"
        onClear={() => console.log("Reset")}
        onApply={() => console.log("Apply")}
      />
    </FilterForm>
  ),
};
