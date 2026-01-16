import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, Badge, Button } from "@/components/atoms";
import { TrendIndicator } from "@/components/molecules";
import { Table } from "@/components/organisms";
import {
  CalendarIcon,
  GlobeIcon,
  HomeIcon,
  MailIcon,
  PlusIcon,
  SettingsIcon,
  StoreIcon,
  TagIcon,
  TrendDownIcon,
  TrendUpIcon,
  UsersIcon,
} from "@/lib/icons";
import { DashboardCard, DashboardEmptyState, DashboardPage } from ".";

const meta: Meta<typeof DashboardPage> = {
  title: "Pages/DashboardPage",
  component: DashboardPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DashboardPage>;

// Sample logo
const Logo = (
  <div className="flex items-center gap-x-2">
    <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
      <GlobeIcon className="size-5 text-primary-foreground" />
    </div>
  </div>
);

// Sample navigation
const navigation = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <HomeIcon className="size-5" />,
    active: true,
  },
  {
    id: "users",
    label: "Users",
    icon: <UsersIcon className="size-5" />,
    badge: 12,
  },
  {
    id: "products",
    label: "Products",
    icon: <StoreIcon className="size-5" />,
  },
  {
    id: "orders",
    label: "Orders",
    icon: <TagIcon className="size-5" />,
    badge: 3,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon className="size-5" />,
  },
];

// Sample header navigation
const headerNavigation = [
  { id: "overview", label: "Overview", active: true },
  { id: "analytics", label: "Analytics" },
  { id: "reports", label: "Reports" },
];

// Sample stats
const stats = [
  {
    id: "1",
    label: "Total Revenue",
    value: "$45,231.89",
    icon: <TrendUpIcon className="size-5 text-success" />,
    trend: { value: "20.1%", direction: "up" as const },
    description: "from last month",
  },
  {
    id: "2",
    label: "Subscriptions",
    value: "+2,350",
    icon: <UsersIcon className="size-5 text-primary" />,
    trend: { value: "180.1%", direction: "up" as const },
    description: "from last month",
  },
  {
    id: "3",
    label: "Sales",
    value: "+12,234",
    icon: <StoreIcon className="size-5 text-primary" />,
    trend: { value: "19%", direction: "up" as const },
    description: "from last month",
  },
  {
    id: "4",
    label: "Active Now",
    value: "+573",
    icon: <TrendDownIcon className="size-5 text-error" />,
    trend: { value: "2.1%", direction: "down" as const },
    description: "from last hour",
  },
];

// Sample user data
const user = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://i.pravatar.cc/150?img=8",
};

// Sample table data
interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
  date: string;
}

const ordersData: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    product: "Premium Plan",
    amount: 250.0,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "Basic Plan",
    amount: 50.0,
    status: "pending",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    email: "bob@example.com",
    product: "Enterprise Plan",
    amount: 500.0,
    status: "completed",
    date: "2024-01-13",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    email: "alice@example.com",
    product: "Premium Plan",
    amount: 250.0,
    status: "cancelled",
    date: "2024-01-12",
  },
];

const orderColumns = [
  {
    key: "id",
    header: "Order ID",
    render: (value: unknown) => (
      <span className="font-medium text-foreground">{String(value)}</span>
    ),
  },
  {
    key: "customer",
    header: "Customer",
    render: (_value: unknown, row: Order) => (
      <div className="flex items-center gap-x-3">
        <Avatar
          initials={row.customer
            .split(" ")
            .map((n) => n[0])
            .join("")}
          alt={row.customer}
          size="sm"
        />
        <div>
          <p className="text-sm font-medium text-foreground">{row.customer}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "product",
    header: "Product",
  },
  {
    key: "amount",
    header: "Amount",
    render: (value: unknown) => (
      <span className="font-medium text-foreground">
        ${Number(value).toFixed(2)}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (value: unknown) => {
      const status = value as Order["status"];
      const variants = {
        completed: "success",
        pending: "warning",
        cancelled: "destructive",
      } as const;
      return (
        <Badge variant={variants[status]} size="sm">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    key: "date",
    header: "Date",
    render: (value: unknown) => (
      <span className="text-muted-foreground">{String(value)}</span>
    ),
  },
];

// Default dashboard
export const Default: Story = {
  args: {
    logo: Logo,
    logoText: "Preline",
    navigation,
    stats,
    user,
    notifications: 3,
    onSearch: (query) => console.log("Search:", query),
    onNavigate: (itemId) => console.log("Navigate:", itemId),
    onUserMenuAction: (action) => console.log("User action:", action),
  },
  render: (args) => (
    <DashboardPage {...args}>
      <DashboardCard
        title="Recent Orders"
        subtitle="You have 12 orders this month"
        action={
          <Button size="sm" variant="outline">
            View all
          </Button>
        }
        padding="none"
      >
        <Table data={ordersData} columns={orderColumns} hoverable />
      </DashboardCard>
    </DashboardPage>
  ),
};

// With header navigation
export const WithHeaderNavigation: Story = {
  args: {
    logo: Logo,
    logoText: "Preline",
    navigation,
    headerNavigation,
    stats,
    user,
    notifications: 5,
    onSearch: (query) => console.log("Search:", query),
    onNavigate: (itemId) => console.log("Navigate:", itemId),
  },
  render: (args) => (
    <DashboardPage {...args}>
      <DashboardCard
        title="Recent Orders"
        action={
          <Button size="sm" leftIcon={<PlusIcon className="size-4" />}>
            Add Order
          </Button>
        }
        padding="none"
      >
        <Table data={ordersData} columns={orderColumns} hoverable />
      </DashboardCard>
    </DashboardPage>
  ),
};

// Empty state
export const EmptyState: Story = {
  args: {
    logo: Logo,
    logoText: "Preline",
    navigation,
    user,
  },
  render: (args) => (
    <DashboardPage {...args}>
      <DashboardCard>
        <DashboardEmptyState
          icon={<StoreIcon className="size-8 text-muted-foreground" />}
          title="No orders yet"
          description="Start by creating your first order. Orders will appear here once created."
          action={
            <Button leftIcon={<PlusIcon className="size-4" />}>
              Create Order
            </Button>
          }
        />
      </DashboardCard>
    </DashboardPage>
  ),
};

// Collapsed sidebar
export const CollapsedSidebar: Story = {
  args: {
    logo: Logo,
    logoText: "Preline",
    navigation,
    stats,
    user,
    sidebarDefaultCollapsed: true,
    onNavigate: (itemId) => console.log("Navigate:", itemId),
  },
  render: (args) => (
    <DashboardPage {...args}>
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard title="Sales Overview" className="h-64">
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Chart placeholder
          </div>
        </DashboardCard>
        <DashboardCard title="Recent Activity" className="h-64">
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Activity feed placeholder
          </div>
        </DashboardCard>
      </div>
    </DashboardPage>
  ),
};

// Multiple sections
export const MultipleSections: Story = {
  args: {
    logo: Logo,
    logoText: "Preline",
    navigation,
    stats,
    user,
    sections: [
      {
        id: "overview",
        title: "Overview",
        children: (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard title="Revenue">
              <div className="flex items-end gap-x-4">
                <span className="text-3xl font-bold text-foreground">
                  $12,426
                </span>
                <TrendIndicator value="+12.5%" direction="up" />
              </div>
            </DashboardCard>
            <DashboardCard title="Users">
              <div className="flex items-end gap-x-4">
                <span className="text-3xl font-bold text-foreground">
                  1,234
                </span>
                <TrendIndicator value="+8.2%" direction="up" />
              </div>
            </DashboardCard>
            <DashboardCard title="Conversion">
              <div className="flex items-end gap-x-4">
                <span className="text-3xl font-bold text-foreground">3.2%</span>
                <TrendIndicator value="-1.5%" direction="down" />
              </div>
            </DashboardCard>
          </div>
        ),
      },
      {
        id: "orders",
        title: "Recent Orders",
        children: (
          <DashboardCard padding="none">
            <Table
              data={ordersData.slice(0, 3)}
              columns={orderColumns}
              hoverable
            />
          </DashboardCard>
        ),
      },
    ],
  },
};

// Analytics dashboard
export const AnalyticsDashboard: Story = {
  args: {
    logo: Logo,
    logoText: "Analytics",
    navigation: [
      {
        id: "overview",
        label: "Overview",
        icon: <HomeIcon className="size-5" />,
        active: true,
      },
      {
        id: "reports",
        label: "Reports",
        icon: <CalendarIcon className="size-5" />,
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: <MailIcon className="size-5" />,
        badge: 8,
      },
      {
        id: "settings",
        label: "Settings",
        icon: <SettingsIcon className="size-5" />,
      },
    ],
    stats: [
      {
        id: "1",
        label: "Page Views",
        value: "124,532",
        trend: { value: "12.5%", direction: "up" as const },
      },
      {
        id: "2",
        label: "Unique Visitors",
        value: "45,234",
        trend: { value: "8.2%", direction: "up" as const },
      },
      {
        id: "3",
        label: "Bounce Rate",
        value: "32.4%",
        trend: { value: "2.1%", direction: "down" as const },
      },
      {
        id: "4",
        label: "Session Duration",
        value: "4m 32s",
        trend: { value: "15.3%", direction: "up" as const },
      },
    ],
    user,
  },
  render: (args) => (
    <DashboardPage {...args}>
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard title="Traffic Overview" className="h-80">
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Traffic chart placeholder
          </div>
        </DashboardCard>
        <DashboardCard title="Top Pages" className="h-80">
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Pages list placeholder
          </div>
        </DashboardCard>
        <DashboardCard title="User Demographics" className="md:col-span-2 h-64">
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Demographics chart placeholder
          </div>
        </DashboardCard>
      </div>
    </DashboardPage>
  ),
};

// Without search
export const WithoutSearch: Story = {
  args: {
    logo: Logo,
    logoText: "Preline",
    navigation,
    stats,
    user,
  },
  render: (args) => (
    <DashboardPage {...args}>
      <DashboardCard title="Content">
        <p className="text-muted-foreground">
          This dashboard doesn&apos;t have search functionality.
        </p>
      </DashboardCard>
    </DashboardPage>
  ),
};
