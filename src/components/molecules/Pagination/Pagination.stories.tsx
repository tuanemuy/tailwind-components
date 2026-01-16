import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationNumbers,
  PaginationPrevious,
} from "./index";

const meta: Meta<typeof Pagination> = {
  title: "Molecules/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationPrevious />
      <PaginationItem>1</PaginationItem>
      <PaginationItem active>2</PaginationItem>
      <PaginationItem>3</PaginationItem>
      <PaginationItem>4</PaginationItem>
      <PaginationItem>5</PaginationItem>
      <PaginationNext />
    </Pagination>
  ),
};

export const WithEllipsis: Story = {
  render: () => (
    <Pagination>
      <PaginationPrevious />
      <PaginationItem>1</PaginationItem>
      <PaginationEllipsis />
      <PaginationItem>4</PaginationItem>
      <PaginationItem active>5</PaginationItem>
      <PaginationItem>6</PaginationItem>
      <PaginationEllipsis />
      <PaginationItem>10</PaginationItem>
      <PaginationNext />
    </Pagination>
  ),
};

export const Small: Story = {
  render: () => (
    <Pagination size="sm">
      <PaginationPrevious size="sm" />
      <PaginationItem size="sm">1</PaginationItem>
      <PaginationItem size="sm" active>
        2
      </PaginationItem>
      <PaginationItem size="sm">3</PaginationItem>
      <PaginationNext size="sm" />
    </Pagination>
  ),
};

export const Large: Story = {
  render: () => (
    <Pagination size="lg">
      <PaginationPrevious size="lg" />
      <PaginationItem size="lg">1</PaginationItem>
      <PaginationItem size="lg" active>
        2
      </PaginationItem>
      <PaginationItem size="lg">3</PaginationItem>
      <PaginationNext size="lg" />
    </Pagination>
  ),
};

export const OutlineVariant: Story = {
  render: () => (
    <Pagination>
      <PaginationPrevious variant="outline" />
      <PaginationItem variant="outline">1</PaginationItem>
      <PaginationItem variant="outline" active>
        2
      </PaginationItem>
      <PaginationItem variant="outline">3</PaginationItem>
      <PaginationItem variant="outline">4</PaginationItem>
      <PaginationItem variant="outline">5</PaginationItem>
      <PaginationNext variant="outline" />
    </Pagination>
  ),
};

const InteractivePaginationDemo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        Page {currentPage} of {totalPages}
      </p>
      <PaginationNumbers
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractivePaginationDemo />,
};

const InteractivePaginationOutlineDemo = () => {
  const [currentPage, setCurrentPage] = useState(5);
  const totalPages = 20;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        Page {currentPage} of {totalPages}
      </p>
      <PaginationNumbers
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        variant="outline"
      />
    </div>
  );
};

export const InteractiveOutline: Story = {
  render: () => <InteractivePaginationOutlineDemo />,
};

export const Simple: Story = {
  render: () => (
    <Pagination>
      <PaginationPrevious />
      <PaginationNext />
    </Pagination>
  ),
};
