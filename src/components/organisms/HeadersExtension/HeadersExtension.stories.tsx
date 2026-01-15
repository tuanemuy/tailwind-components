import type { Meta, StoryObj } from "@storybook/react";
import {
  ApplicationNavbar,
  MarketplaceHeader,
  DashboardHeader,
  ECommerceHeader,
  BlogHeader,
  DocsHeader,
  MobileHeader,
  StickyHeader,
} from "./index";
import { HeaderNav, HeaderNavItem, HeaderLogo } from "@/components/organisms/Header";
import {
  HomeIcon,
  SettingsIcon,
  UsersIcon,
  FileIcon,
  BarChartIcon,
  BellIcon,
  MailIcon,
} from "@/lib/icons";

// ==============================================
// ApplicationNavbar
// ==============================================

const appNavbarMeta: Meta<typeof ApplicationNavbar> = {
  title: "Organisms/Headers Extension/ApplicationNavbar",
  component: ApplicationNavbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default appNavbarMeta;
type AppNavbarStory = StoryObj<typeof ApplicationNavbar>;

const sampleNotifications = [
  {
    id: "1",
    title: "New message received",
    description: "You have a new message from John Doe",
    time: "5 minutes ago",
    read: false,
    icon: <MailIcon className="size-4 text-primary" />,
  },
  {
    id: "2",
    title: "Task completed",
    description: "Project Alpha has been completed",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "New user registered",
    description: "Jane Smith joined the team",
    time: "2 hours ago",
    read: true,
  },
];

const sampleUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  initials: "JD",
};

export const DefaultApplicationNavbar: AppNavbarStory = {
  args: {
    logo: <HeaderLogo text="AppName" href="/" />,
    notifications: sampleNotifications,
    user: sampleUser,
    navigation: (
      <HeaderNav>
        <HeaderNavItem href="#" active>
          Dashboard
        </HeaderNavItem>
        <HeaderNavItem href="#">Projects</HeaderNavItem>
        <HeaderNavItem href="#">Team</HeaderNavItem>
        <HeaderNavItem href="#">Reports</HeaderNavItem>
      </HeaderNav>
    ),
  },
};

export const WithoutSearch: AppNavbarStory = {
  args: {
    ...DefaultApplicationNavbar.args,
    showSearch: false,
  },
};

export const NoNotifications: AppNavbarStory = {
  args: {
    ...DefaultApplicationNavbar.args,
    notifications: [],
  },
};

// ==============================================
// MarketplaceHeader
// ==============================================

export const DefaultMarketplaceHeader: StoryObj<typeof MarketplaceHeader> = {
  render: () => (
    <MarketplaceHeader
      logo={<HeaderLogo text="Marketplace" href="/" />}
      categories={[
        {
          id: "1",
          label: "Electronics",
          subcategories: [
            { id: "1-1", label: "Phones" },
            { id: "1-2", label: "Laptops" },
            { id: "1-3", label: "Tablets" },
          ],
        },
        {
          id: "2",
          label: "Fashion",
          subcategories: [
            { id: "2-1", label: "Men" },
            { id: "2-2", label: "Women" },
            { id: "2-3", label: "Kids" },
          ],
        },
        { id: "3", label: "Home & Garden" },
        { id: "4", label: "Sports" },
      ]}
      cartCount={3}
      wishlistCount={5}
      user={sampleUser}
    />
  ),
};

export const MarketplaceWithoutUser: StoryObj<typeof MarketplaceHeader> = {
  render: () => (
    <MarketplaceHeader
      logo={<HeaderLogo text="Marketplace" href="/" />}
      categories={[
        { id: "1", label: "Electronics" },
        { id: "2", label: "Fashion" },
        { id: "3", label: "Home & Garden" },
      ]}
      cartCount={0}
      wishlistCount={0}
    />
  ),
};

// ==============================================
// DashboardHeader
// ==============================================

export const DefaultDashboardHeader: StoryObj<typeof DashboardHeader> = {
  render: () => (
    <DashboardHeader
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Project Alpha" },
      ]}
      user={sampleUser}
      notifications={sampleNotifications}
    />
  ),
};

export const DashboardHeaderWithTitle: StoryObj<typeof DashboardHeader> = {
  render: () => (
    <DashboardHeader title="Project Overview" user={sampleUser} notifications={[]} />
  ),
};

export const DashboardHeaderWithActions: StoryObj<typeof DashboardHeader> = {
  render: () => (
    <DashboardHeader
      title="Team Management"
      user={sampleUser}
      notifications={sampleNotifications}
      actions={
        <button className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
          Add Member
        </button>
      }
    />
  ),
};

// ==============================================
// ECommerceHeader
// ==============================================

export const DefaultECommerceHeader: StoryObj<typeof ECommerceHeader> = {
  render: () => (
    <ECommerceHeader
      logo={<HeaderLogo text="ShopName" href="/" />}
      promoMessage="Summer Sale! Up to 50% off on selected items"
      categories={[
        {
          id: "1",
          label: "New Arrivals",
          subcategories: [
            { id: "1-1", label: "This Week" },
            { id: "1-2", label: "Best Sellers" },
          ],
        },
        {
          id: "2",
          label: "Women",
          subcategories: [
            { id: "2-1", label: "Dresses" },
            { id: "2-2", label: "Tops" },
            { id: "2-3", label: "Shoes" },
          ],
        },
        {
          id: "3",
          label: "Men",
          subcategories: [
            { id: "3-1", label: "Shirts" },
            { id: "3-2", label: "Pants" },
            { id: "3-3", label: "Shoes" },
          ],
        },
        { id: "4", label: "Sale" },
      ]}
      cartCount={2}
      wishlistCount={4}
      user={sampleUser}
    />
  ),
};

export const ECommerceHeaderGuest: StoryObj<typeof ECommerceHeader> = {
  render: () => (
    <ECommerceHeader
      logo={<HeaderLogo text="ShopName" href="/" />}
      categories={[
        { id: "1", label: "New Arrivals" },
        { id: "2", label: "Women" },
        { id: "3", label: "Men" },
        { id: "4", label: "Sale" },
      ]}
      cartCount={0}
      wishlistCount={0}
    />
  ),
};

// ==============================================
// BlogHeader
// ==============================================

export const DefaultBlogHeader: StoryObj<typeof BlogHeader> = {
  render: () => (
    <BlogHeader
      logo={<HeaderLogo text="TechBlog" href="/" />}
      categories={[
        { id: "1", label: "Technology", count: 42 },
        { id: "2", label: "Design", count: 28 },
        { id: "3", label: "Development", count: 35 },
        { id: "4", label: "Business", count: 19 },
      ]}
      onSubscribe={() => alert("Subscribe clicked")}
    />
  ),
};

export const BlogHeaderMinimal: StoryObj<typeof BlogHeader> = {
  render: () => (
    <BlogHeader
      logo={<HeaderLogo text="MyBlog" href="/" />}
      categories={[
        { id: "1", label: "All Posts" },
        { id: "2", label: "Featured" },
        { id: "3", label: "About" },
      ]}
      showSearch={false}
    />
  ),
};

// ==============================================
// DocsHeader
// ==============================================

export const DefaultDocsHeader: StoryObj<typeof DocsHeader> = {
  render: () => (
    <DocsHeader
      logo={<HeaderLogo text="Docs" href="/" />}
      title="Documentation"
      versions={[
        { id: "3.0", label: "v3.0", current: true },
        { id: "2.5", label: "v2.5" },
        { id: "2.0", label: "v2.0" },
      ]}
      currentVersion="3.0"
      navigation={
        <>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Guide
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            API Reference
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Examples
          </a>
        </>
      }
      githubUrl="https://github.com"
    />
  ),
};

export const DocsHeaderSimple: StoryObj<typeof DocsHeader> = {
  render: () => (
    <DocsHeader
      logo={<HeaderLogo text="Library Docs" href="/" />}
      title="Getting Started"
      showSidebarToggle
    />
  ),
};

// ==============================================
// MobileHeader
// ==============================================

export const DefaultMobileHeader: StoryObj<typeof MobileHeader> = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <MobileHeader title="Page Title" showMenuButton showSearchButton />
    </div>
  ),
};

export const MobileHeaderWithBack: StoryObj<typeof MobileHeader> = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <MobileHeader
        title="Detail Page"
        showBackButton
        onBack={() => alert("Back clicked")}
      />
    </div>
  ),
};

export const MobileHeaderWithLogo: StoryObj<typeof MobileHeader> = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <MobileHeader
        logo={<span className="text-lg font-bold text-primary">Logo</span>}
        showMenuButton
        showSearchButton
      />
    </div>
  ),
};

// ==============================================
// StickyHeader
// ==============================================

export const DefaultStickyHeader: StoryObj<typeof StickyHeader> = {
  render: () => (
    <div className="h-[200vh]">
      <StickyHeader>
        <div className="bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <span className="font-semibold">Sticky Header</span>
            <nav className="flex items-center gap-x-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </StickyHeader>
      <div className="p-4">
        <p className="text-muted-foreground">
          Scroll down to see the sticky header behavior. The header will hide when scrolling down and show when scrolling up.
        </p>
        <div className="mt-8 space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="p-4 bg-card rounded-lg border border-border">
              <p>Content block {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const AlwaysVisibleStickyHeader: StoryObj<typeof StickyHeader> = {
  render: () => (
    <div className="h-[200vh]">
      <StickyHeader alwaysVisible>
        <div className="bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <span className="font-semibold">Always Visible</span>
            <span className="text-sm text-muted-foreground">
              This header stays visible while scrolling
            </span>
          </div>
        </div>
      </StickyHeader>
      <div className="p-4">
        <div className="mt-8 space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="p-4 bg-card rounded-lg border border-border">
              <p>Content block {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
