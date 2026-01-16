import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import type { FilterSection, FilterValues } from "./index";
import { ActiveFilters, FilterDrawer } from "./index";

const meta: Meta<typeof FilterDrawer> = {
  title: "Organisms/Overlays/FilterDrawer",
  component: FilterDrawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FilterDrawer>;

const sampleSections: FilterSection[] = [
  {
    id: "status",
    label: "Status",
    type: "checkbox",
    options: [
      { id: "active", label: "Active", count: 125 },
      { id: "pending", label: "Pending", count: 45 },
      { id: "completed", label: "Completed", count: 230 },
      { id: "archived", label: "Archived", count: 18 },
    ],
  },
  {
    id: "priority",
    label: "Priority",
    type: "checkbox",
    options: [
      { id: "urgent", label: "Urgent", count: 12 },
      { id: "high", label: "High", count: 34 },
      { id: "medium", label: "Medium", count: 78 },
      { id: "low", label: "Low", count: 156 },
    ],
  },
  {
    id: "price",
    label: "Price Range",
    type: "range",
    range: {
      min: 0,
      max: 1000,
      step: 10,
    },
  },
  {
    id: "dateRange",
    label: "Date Range",
    type: "dateRange",
  },
];

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<FilterValues>({});

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Filters</Button>
        <FilterDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          sections={sampleSections}
          values={filters}
          onApply={(values) => {
            console.log("Applied filters:", values);
            setFilters(values);
            setIsOpen(false);
          }}
          onClear={() => {
            setFilters({});
          }}
        />
      </>
    );
  },
};

export const WithActiveFilters: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<FilterValues>({
      status: ["active", "pending"],
      priority: ["high"],
      price: [100, 500] as [number, number],
    });

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button onClick={() => setIsOpen(true)}>Open Filters</Button>
          <ActiveFilters
            sections={sampleSections}
            values={filters}
            onRemove={(sectionId, optionId) => {
              setFilters((prev) => {
                const current = prev[sectionId];
                if (Array.isArray(current) && typeof current[0] === "string") {
                  return {
                    ...prev,
                    [sectionId]: (current as string[]).filter(
                      (v) => v !== optionId,
                    ),
                  };
                }
                const { [sectionId]: _, ...rest } = prev;
                return rest;
              });
            }}
            onClearAll={() => setFilters({})}
          />
        </div>
        <FilterDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          sections={sampleSections}
          values={filters}
          onApply={(values) => {
            console.log("Applied filters:", values);
            setFilters(values);
            setIsOpen(false);
          }}
          onClear={() => {
            setFilters({});
          }}
        />
      </div>
    );
  },
};

export const ProductFilters: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<FilterValues>({});

    const productSections: FilterSection[] = [
      {
        id: "category",
        label: "Category",
        type: "checkbox",
        options: [
          { id: "electronics", label: "Electronics", count: 234 },
          { id: "clothing", label: "Clothing", count: 456 },
          { id: "home", label: "Home & Garden", count: 189 },
          { id: "sports", label: "Sports", count: 123 },
        ],
      },
      {
        id: "brand",
        label: "Brand",
        type: "checkbox",
        options: [
          { id: "apple", label: "Apple", count: 45 },
          { id: "samsung", label: "Samsung", count: 67 },
          { id: "nike", label: "Nike", count: 89 },
          { id: "adidas", label: "Adidas", count: 56 },
        ],
      },
      {
        id: "price",
        label: "Price",
        type: "range",
        range: {
          min: 0,
          max: 2000,
          step: 50,
        },
      },
      {
        id: "rating",
        label: "Rating",
        type: "checkbox",
        options: [
          { id: "5", label: "5 Stars", count: 123 },
          { id: "4", label: "4+ Stars", count: 456 },
          { id: "3", label: "3+ Stars", count: 678 },
        ],
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Filter Products</Button>
        <FilterDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          sections={productSections}
          values={filters}
          onApply={(values) => {
            setFilters(values);
            setIsOpen(false);
          }}
          onClear={() => setFilters({})}
          title="Filter Products"
        />
      </>
    );
  },
};

export const LeftPosition: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<FilterValues>({});

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Left Drawer</Button>
        <FilterDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          sections={sampleSections}
          values={filters}
          onApply={(values) => {
            setFilters(values);
            setIsOpen(false);
          }}
          onClear={() => setFilters({})}
          position="left"
        />
      </>
    );
  },
};
