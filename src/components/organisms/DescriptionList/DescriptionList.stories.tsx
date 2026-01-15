import type { Meta, StoryObj } from "@storybook/react";
import {
  DescriptionList,
  DescriptionListItem,
  DescriptionListIcon,
  DescriptionTerm,
  DescriptionDetails,
  HorizontalDescriptionList,
  CardDescriptionList,
} from "./index";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  CreditCardIcon,
  BuildingIcon,
  GlobeIcon,
} from "@/lib/icons";
import { Badge } from "@/components/atoms/Badge";

const meta: Meta<typeof DescriptionList> = {
  title: "Organisms/PageSections/DescriptionList",
  component: DescriptionList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "grid", "inline", "card"],
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
type Story = StoryObj<typeof DescriptionList>;

const sampleItems = [
  { term: "Full name", details: "John Doe" },
  { term: "Email address", details: "john@example.com" },
  { term: "Phone number", details: "+1 (555) 123-4567" },
  { term: "Address", details: "123 Main St, New York, NY 10001" },
];

const itemsWithIcons = [
  { term: "Full name", details: "John Doe", icon: <UserIcon className="size-full" /> },
  { term: "Email", details: "john@example.com", icon: <MailIcon className="size-full" /> },
  { term: "Phone", details: "+1 (555) 123-4567", icon: <PhoneIcon className="size-full" /> },
  { term: "Location", details: "New York, USA", icon: <MapPinIcon className="size-full" /> },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const WithIcons: Story = {
  args: {
    items: itemsWithIcons,
    variant: "inline",
  },
};

export const Grid: Story = {
  args: {
    variant: "grid",
    columns: 2,
    items: [
      { term: "Full name", details: "John Doe" },
      { term: "Company", details: "Acme Inc." },
      { term: "Email", details: "john@example.com" },
      { term: "Phone", details: "+1 (555) 123-4567" },
      { term: "Address", details: "123 Main St" },
      { term: "City", details: "New York, NY" },
    ],
  },
};

export const GridThreeColumns: Story = {
  args: {
    variant: "grid",
    columns: 3,
    items: [
      { term: "Revenue", details: "$1.2M" },
      { term: "Orders", details: "12,345" },
      { term: "Customers", details: "8,901" },
      { term: "Products", details: "456" },
      { term: "Categories", details: "23" },
      { term: "Reviews", details: "4.8/5" },
    ],
  },
};

export const Card: Story = {
  args: {
    variant: "card",
    items: sampleItems,
  },
};

export const Horizontal: StoryObj<typeof HorizontalDescriptionList> = {
  render: () => (
    <HorizontalDescriptionList
      items={sampleItems}
    />
  ),
};

export const HorizontalStriped: StoryObj<typeof HorizontalDescriptionList> = {
  render: () => (
    <HorizontalDescriptionList
      items={[
        ...sampleItems,
        { term: "Birthday", details: "January 15, 1990" },
        { term: "Status", details: "Active" },
      ]}
      striped
    />
  ),
};

export const HorizontalWithIcons: StoryObj<typeof HorizontalDescriptionList> = {
  render: () => (
    <HorizontalDescriptionList
      items={itemsWithIcons}
    />
  ),
};

export const CardStyleWithTitle: StoryObj<typeof CardDescriptionList> = {
  render: () => (
    <CardDescriptionList
      title="Account Information"
      description="Your personal account details"
      items={[
        { term: "Account ID", details: "#ACC-12345", icon: <CreditCardIcon className="size-full" /> },
        { term: "Plan", details: "Professional" },
        { term: "Status", details: <Badge variant="success">Active</Badge> },
        { term: "Member since", details: "January 2023", icon: <CalendarIcon className="size-full" /> },
      ]}
    />
  ),
};

export const ContactInfo: Story = {
  render: () => (
    <div className="max-w-md">
      <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
      <DescriptionList variant="inline" items={itemsWithIcons} />
    </div>
  ),
};

export const OrderDetails: Story = {
  render: () => (
    <CardDescriptionList
      title="Order #ORD-12345"
      description="Placed on January 15, 2024"
      items={[
        { term: "Order status", details: <Badge variant="warning">Processing</Badge> },
        { term: "Payment method", details: "Visa ending in 4242" },
        { term: "Shipping method", details: "Express Delivery" },
        { term: "Subtotal", details: "$99.00" },
        { term: "Shipping", details: "$9.99" },
        { term: "Tax", details: "$8.91" },
        { term: "Total", details: <span className="font-semibold text-foreground">$117.90</span> },
      ]}
    />
  ),
};

export const CompanyProfile: Story = {
  render: () => (
    <DescriptionList
      variant="grid"
      columns={2}
      items={[
        { term: "Company name", details: "Acme Corporation", icon: <BuildingIcon className="size-full" /> },
        { term: "Industry", details: "Technology" },
        { term: "Website", details: "www.acme.com", icon: <GlobeIcon className="size-full" /> },
        { term: "Founded", details: "2015", icon: <CalendarIcon className="size-full" /> },
        { term: "Employees", details: "500+" },
        { term: "Location", details: "San Francisco, CA", icon: <MapPinIcon className="size-full" /> },
      ]}
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">Small</h4>
        <HorizontalDescriptionList size="sm" items={sampleItems.slice(0, 2)} />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">Medium (Default)</h4>
        <HorizontalDescriptionList size="md" items={sampleItems.slice(0, 2)} />
      </div>
      <div>
        <h4 className="mb-2 text-sm font-medium text-muted-foreground">Large</h4>
        <HorizontalDescriptionList size="lg" items={sampleItems.slice(0, 2)} />
      </div>
    </div>
  ),
};

export const Composable: Story = {
  render: () => (
    <DescriptionList variant="default">
      <DescriptionListItem variant="default">
        <DescriptionListIcon><UserIcon className="size-full" /></DescriptionListIcon>
        <DescriptionTerm>Username</DescriptionTerm>
        <DescriptionDetails>johndoe</DescriptionDetails>
      </DescriptionListItem>
      <DescriptionListItem variant="default">
        <DescriptionListIcon><MailIcon className="size-full" /></DescriptionListIcon>
        <DescriptionTerm>Email</DescriptionTerm>
        <DescriptionDetails>john@example.com</DescriptionDetails>
      </DescriptionListItem>
      <DescriptionListItem variant="default">
        <DescriptionTerm>Role</DescriptionTerm>
        <DescriptionDetails>
          <Badge>Administrator</Badge>
        </DescriptionDetails>
      </DescriptionListItem>
    </DescriptionList>
  ),
};
