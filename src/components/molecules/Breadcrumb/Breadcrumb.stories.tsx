import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbEllipsis } from "./index";
import { HomeIcon, FolderIcon, FileTextIcon } from "@/lib/icons";

const meta: Meta<typeof Breadcrumb> = {
  title: "Molecules/Breadcrumb",
  component: Breadcrumb,
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
    <Breadcrumb>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem href="#">Category</BreadcrumbItem>
      <BreadcrumbItem>Current Page</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const Small: Story = {
  render: () => (
    <Breadcrumb size="sm">
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem>Current Page</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const Large: Story = {
  render: () => (
    <Breadcrumb size="lg">
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem>Current Page</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="#" icon={<HomeIcon className="size-full" />}>
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="#" icon={<FolderIcon className="size-full" />}>
        Documents
      </BreadcrumbItem>
      <BreadcrumbItem icon={<FileTextIcon className="size-full" />}>
        Report.pdf
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const WithEllipsis: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbEllipsis />
      <BreadcrumbItem href="#">Category</BreadcrumbItem>
      <BreadcrumbItem href="#">Subcategory</BreadcrumbItem>
      <BreadcrumbItem>Current Page</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb separator={<span className="text-muted-foreground">/</span>}>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Products</BreadcrumbItem>
      <BreadcrumbItem>Current Page</BreadcrumbItem>
    </Breadcrumb>
  ),
};

export const LongPath: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
      <BreadcrumbItem href="#">Settings</BreadcrumbItem>
      <BreadcrumbItem href="#">Account</BreadcrumbItem>
      <BreadcrumbItem href="#">Security</BreadcrumbItem>
      <BreadcrumbItem>Two-Factor Auth</BreadcrumbItem>
    </Breadcrumb>
  ),
};
