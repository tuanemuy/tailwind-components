import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  DashboardSidebar,
  DetachedSidebar,
  CollapsibleSidebar,
  IconSidebar,
  DoubleSidebar,
  FilterSidebar,
  SettingsSidebar,
} from "./index";
import {
  HomeIcon,
  SettingsIcon,
  UsersIcon,
  FileIcon,
  BarChartIcon,
  MailIcon,
  CalendarIcon,
  FolderIcon,
  BellIcon,
  CreditCardIcon,
  LockIcon,
  UserIcon,
} from "@/lib/icons";

// ==============================================
// Common data
// ==============================================

const sampleUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  initials: "JD",
  role: "Administrator",
};

const sampleSections = [
  {
    id: "main",
    title: "Main",
    items: [
      { id: "dashboard", label: "Dashboard", icon: <HomeIcon className="size-5" />, active: true },
      { id: "analytics", label: "Analytics", icon: <BarChartIcon className="size-5" />, badge: 3 },
      { id: "projects", label: "Projects", icon: <FolderIcon className="size-5" /> },
    ],
  },
  {
    id: "workspace",
    title: "Workspace",
    items: [
      { id: "team", label: "Team", icon: <UsersIcon className="size-5" /> },
      { id: "calendar", label: "Calendar", icon: <CalendarIcon className="size-5" /> },
      {
        id: "documents",
        label: "Documents",
        icon: <FileIcon className="size-5" />,
        children: [
          { id: "all-docs", label: "All Documents" },
          { id: "shared", label: "Shared with me" },
          { id: "archived", label: "Archived" },
        ],
      },
    ],
  },
  {
    id: "other",
    title: "Other",
    items: [
      { id: "settings", label: "Settings", icon: <SettingsIcon className="size-5" /> },
    ],
  },
];

// ==============================================
// DashboardSidebar
// ==============================================

const dashboardMeta: Meta<typeof DashboardSidebar> = {
  title: "Organisms/Sidebars Extension/DashboardSidebar",
  component: DashboardSidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-screen flex">
        <Story />
        <div className="flex-1 bg-muted/20 p-8">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p className="text-muted-foreground mt-2">
            This is the main content area next to the sidebar.
          </p>
        </div>
      </div>
    ),
  ],
};

export default dashboardMeta;
type DashboardSidebarStory = StoryObj<typeof DashboardSidebar>;

export const DefaultDashboardSidebar: DashboardSidebarStory = {
  args: {
    logoText: "Dashboard",
    sections: sampleSections,
    user: sampleUser,
    collapsible: true,
  },
};

export const CollapsedDashboardSidebar: DashboardSidebarStory = {
  args: {
    ...DefaultDashboardSidebar.args,
    collapsed: true,
  },
};

// ==============================================
// DetachedSidebar
// ==============================================

export const DefaultDetachedSidebar: StoryObj<typeof DetachedSidebar> = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="h-screen">
        <DetachedSidebar
          logoText="Detached"
          sections={sampleSections}
          user={sampleUser}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          margin="md"
          rounded="xl"
        />
        <div className={`transition-all duration-300 ${collapsed ? "ml-24" : "ml-72"} p-8`}>
          <h1 className="text-2xl font-bold">Detached Sidebar Demo</h1>
          <p className="text-muted-foreground mt-2">
            The sidebar floats with a margin and rounded corners.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const DetachedSidebarRounded: StoryObj<typeof DetachedSidebar> = {
  render: () => (
    <div className="h-screen">
      <DetachedSidebar
        logoText="Rounded"
        sections={sampleSections}
        user={sampleUser}
        margin="lg"
        rounded="2xl"
      />
      <div className="ml-72 p-8">
        <h1 className="text-2xl font-bold">Large Rounded Sidebar</h1>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

// ==============================================
// CollapsibleSidebar
// ==============================================

export const DefaultCollapsibleSidebar: StoryObj<typeof CollapsibleSidebar> = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="h-screen flex">
        <CollapsibleSidebar
          logo={<span className="text-xl font-bold text-primary">Logo</span>}
          collapsedLogo={<span className="text-xl font-bold text-primary">L</span>}
          logoText="MyApp"
          sections={sampleSections}
          user={sampleUser}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          expandOnHover={false}
          position="relative"
        />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold">Collapsible Sidebar</h1>
          <p className="text-muted-foreground mt-2">
            Click the collapse button to toggle the sidebar width.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const CollapsibleSidebarWithHover: StoryObj<typeof CollapsibleSidebar> = {
  render: () => {
    const [collapsed, setCollapsed] = useState(true);
    return (
      <div className="h-screen flex">
        <CollapsibleSidebar
          logo={<span className="text-xl font-bold text-primary">Logo</span>}
          collapsedLogo={<span className="text-xl font-bold text-primary">L</span>}
          logoText="MyApp"
          sections={sampleSections}
          user={sampleUser}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          expandOnHover={true}
          position="relative"
        />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold">Hover to Expand</h1>
          <p className="text-muted-foreground mt-2">
            Hover over the sidebar to expand it temporarily.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};

// ==============================================
// IconSidebar
// ==============================================

export const DefaultIconSidebar: StoryObj<typeof IconSidebar> = {
  render: () => (
    <div className="h-screen flex">
      <IconSidebar
        logo={<span className="text-2xl font-bold text-primary">L</span>}
        items={[
          { id: "home", label: "Home", icon: <HomeIcon className="size-5" />, active: true },
          { id: "analytics", label: "Analytics", icon: <BarChartIcon className="size-5" />, badge: 5 },
          { id: "projects", label: "Projects", icon: <FolderIcon className="size-5" /> },
          { id: "team", label: "Team", icon: <UsersIcon className="size-5" /> },
          { id: "calendar", label: "Calendar", icon: <CalendarIcon className="size-5" /> },
          { id: "mail", label: "Mail", icon: <MailIcon className="size-5" />, badge: 12 },
        ]}
        bottomItems={[
          { id: "notifications", label: "Notifications", icon: <BellIcon className="size-5" />, badge: 3 },
          { id: "settings", label: "Settings", icon: <SettingsIcon className="size-5" /> },
        ]}
        user={sampleUser}
        position="relative"
      />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Icon Sidebar</h1>
        <p className="text-muted-foreground mt-2">
          A minimal sidebar showing only icons with tooltips.
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

// ==============================================
// DoubleSidebar
// ==============================================

export const DefaultDoubleSidebar: StoryObj<typeof DoubleSidebar> = {
  render: () => {
    const [selected, setSelected] = useState("projects");

    const secondaryContent: Record<string, { title: string; sections: { title?: string; items: { id: string; label: string; icon?: React.ReactNode; active?: boolean }[] }[] }> = {
      home: {
        title: "Dashboard",
        sections: [
          {
            items: [
              { id: "overview", label: "Overview", active: true },
              { id: "stats", label: "Statistics" },
              { id: "activity", label: "Recent Activity" },
            ],
          },
        ],
      },
      projects: {
        title: "Projects",
        sections: [
          {
            title: "My Projects",
            items: [
              { id: "project-a", label: "Project Alpha", active: true },
              { id: "project-b", label: "Project Beta" },
              { id: "project-c", label: "Project Gamma" },
            ],
          },
          {
            title: "Shared",
            items: [
              { id: "shared-1", label: "Marketing Campaign" },
              { id: "shared-2", label: "Design System" },
            ],
          },
        ],
      },
      team: {
        title: "Team",
        sections: [
          {
            items: [
              { id: "members", label: "All Members" },
              { id: "groups", label: "Groups" },
              { id: "invites", label: "Pending Invites" },
            ],
          },
        ],
      },
    };

    return (
      <div className="h-screen flex">
        <DoubleSidebar
          logo={<span className="text-2xl font-bold text-primary">D</span>}
          primaryItems={[
            { id: "home", label: "Home", icon: <HomeIcon className="size-5" /> },
            { id: "projects", label: "Projects", icon: <FolderIcon className="size-5" />, active: selected === "projects" },
            { id: "team", label: "Team", icon: <UsersIcon className="size-5" /> },
            { id: "calendar", label: "Calendar", icon: <CalendarIcon className="size-5" /> },
          ]}
          selectedPrimaryId={selected}
          onPrimarySelect={(item) => setSelected(item.id)}
          secondaryTitle={secondaryContent[selected]?.title}
          secondarySections={secondaryContent[selected]?.sections || []}
          user={sampleUser}
          position="relative"
        />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold">Double Sidebar</h1>
          <p className="text-muted-foreground mt-2">
            Click on the primary sidebar items to change the secondary sidebar content.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};

// ==============================================
// FilterSidebar
// ==============================================

export const DefaultFilterSidebar: StoryObj<typeof FilterSidebar> = {
  render: () => {
    const [filters, setFilters] = useState({});

    return (
      <div className="h-screen flex">
        <FilterSidebar
          title="Filters"
          sections={[
            {
              id: "category",
              title: "Category",
              type: "checkbox",
              options: [
                { id: "electronics", label: "Electronics", count: 124, checked: true },
                { id: "fashion", label: "Fashion", count: 89 },
                { id: "home", label: "Home & Garden", count: 56 },
                { id: "sports", label: "Sports", count: 34 },
              ],
            },
            {
              id: "price",
              title: "Price Range",
              type: "range",
              range: {
                min: 0,
                max: 1000,
                currentMin: 50,
                currentMax: 500,
                prefix: "$",
              },
            },
            {
              id: "brand",
              title: "Brand",
              type: "search",
              searchPlaceholder: "Search brands...",
            },
            {
              id: "rating",
              title: "Rating",
              type: "checkbox",
              options: [
                { id: "4+", label: "4+ Stars", count: 234 },
                { id: "3+", label: "3+ Stars", count: 456 },
                { id: "2+", label: "2+ Stars", count: 567 },
              ],
            },
            {
              id: "availability",
              title: "Availability",
              type: "checkbox",
              options: [
                { id: "in-stock", label: "In Stock", count: 890 },
                { id: "pre-order", label: "Pre-order", count: 23 },
              ],
            },
            {
              id: "sort",
              title: "Sort By",
              type: "radio",
              options: [
                { id: "newest", label: "Newest First", checked: true },
                { id: "price-low", label: "Price: Low to High" },
                { id: "price-high", label: "Price: High to Low" },
                { id: "popular", label: "Most Popular" },
              ],
            },
          ]}
          activeFilterCount={2}
          onFilterChange={(sectionId, value) => {
            setFilters({ ...filters, [sectionId]: value });
            console.log("Filter changed:", sectionId, value);
          }}
          onClearAll={() => setFilters({})}
          onApply={() => console.log("Apply filters:", filters)}
        />
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold">Filter Sidebar</h1>
          <p className="text-muted-foreground mt-2">
            A sidebar for filtering products or content.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};

// ==============================================
// SettingsSidebar
// ==============================================

export const DefaultSettingsSidebar: StoryObj<typeof SettingsSidebar> = {
  render: () => (
    <div className="h-screen flex">
      <SettingsSidebar
        title="Settings"
        description="Manage your account settings and preferences."
        sections={[
          {
            id: "account",
            title: "Account",
            items: [
              {
                id: "profile",
                label: "Profile",
                icon: <UserIcon className="size-5" />,
                description: "Update your personal information",
                active: true,
              },
              {
                id: "security",
                label: "Security",
                icon: <LockIcon className="size-5" />,
                description: "Password and authentication settings",
              },
              {
                id: "billing",
                label: "Billing",
                icon: <CreditCardIcon className="size-5" />,
                description: "Manage your subscription and payments",
              },
            ],
          },
          {
            id: "preferences",
            title: "Preferences",
            items: [
              {
                id: "notifications",
                label: "Notifications",
                icon: <BellIcon className="size-5" />,
                description: "Configure how you receive notifications",
              },
              {
                id: "appearance",
                label: "Appearance",
                icon: <SettingsIcon className="size-5" />,
                description: "Customize the look and feel",
              },
            ],
          },
        ]}
        footer={
          <button className="w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
            Delete Account
          </button>
        }
      />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Settings page content would appear here.
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

export const SettingsSidebarWithBadges: StoryObj<typeof SettingsSidebar> = {
  render: () => (
    <div className="h-screen flex">
      <SettingsSidebar
        title="Settings"
        sections={[
          {
            id: "main",
            items: [
              {
                id: "profile",
                label: "Profile",
                icon: <UserIcon className="size-5" />,
                active: true,
              },
              {
                id: "security",
                label: "Security",
                icon: <LockIcon className="size-5" />,
                badge: (
                  <span className="px-1.5 py-0.5 text-xs font-medium bg-destructive/10 text-destructive rounded">
                    Action Required
                  </span>
                ),
              },
              {
                id: "billing",
                label: "Billing",
                icon: <CreditCardIcon className="size-5" />,
                badge: (
                  <span className="px-1.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                    Pro
                  </span>
                ),
              },
              {
                id: "notifications",
                label: "Notifications",
                icon: <BellIcon className="size-5" />,
              },
            ],
          },
        ]}
      />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Settings with Badges</h1>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};
