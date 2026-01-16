import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import type { FilterSection, FilterValues } from "../FilterDrawer";
import { FilterModal } from "./index";

const meta: Meta<typeof FilterModal> = {
  title: "Organisms/Overlays/FilterModal",
  component: FilterModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FilterModal>;

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
        <Button onClick={() => setIsOpen(true)}>Filter</Button>
        <FilterModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          sections={sampleSections}
          values={filters}
          onApply={(values) => {
            console.log("Applied filters:", values);
            setFilters(values);
            setIsOpen(false);
          }}
          onClear={() => setFilters({})}
        />
      </>
    );
  },
};

export const WithPresetFilters: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<FilterValues>({
      status: ["active", "pending"],
      priority: ["high", "urgent"],
    });

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Edit Filters</Button>
        <FilterModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          sections={sampleSections}
          values={filters}
          onApply={(values) => {
            console.log("Applied filters:", values);
            setFilters(values);
            setIsOpen(false);
          }}
          onClear={() => setFilters({})}
        />
      </>
    );
  },
};

export const OrderFilters: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<FilterValues>({});

    const orderSections: FilterSection[] = [
      {
        id: "orderStatus",
        label: "Order Status",
        type: "checkbox",
        options: [
          { id: "pending", label: "Pending", count: 23 },
          { id: "processing", label: "Processing", count: 45 },
          { id: "shipped", label: "Shipped", count: 89 },
          { id: "delivered", label: "Delivered", count: 234 },
          { id: "cancelled", label: "Cancelled", count: 12 },
        ],
      },
      {
        id: "paymentStatus",
        label: "Payment Status",
        type: "checkbox",
        options: [
          { id: "paid", label: "Paid", count: 350 },
          { id: "pending", label: "Pending", count: 40 },
          { id: "refunded", label: "Refunded", count: 13 },
        ],
      },
      {
        id: "orderTotal",
        label: "Order Total",
        type: "range",
        range: {
          min: 0,
          max: 1000,
          step: 10,
        },
      },
      {
        id: "orderDate",
        label: "Order Date",
        type: "dateRange",
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Filter Orders</Button>
        <FilterModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          sections={orderSections}
          values={filters}
          onApply={(values) => {
            console.log("Applied order filters:", values);
            setFilters(values);
            setIsOpen(false);
          }}
          onClear={() => setFilters({})}
          title="Filter Orders"
        />
      </>
    );
  },
};

export const SmallModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<FilterValues>({});

    const simpleSections: FilterSection[] = [
      {
        id: "type",
        label: "Type",
        type: "checkbox",
        options: [
          { id: "image", label: "Images" },
          { id: "video", label: "Videos" },
          { id: "document", label: "Documents" },
        ],
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Quick Filter</Button>
        <FilterModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          sections={simpleSections}
          values={filters}
          onApply={(values) => {
            setFilters(values);
            setIsOpen(false);
          }}
          onClear={() => setFilters({})}
          size="sm"
        />
      </>
    );
  },
};
