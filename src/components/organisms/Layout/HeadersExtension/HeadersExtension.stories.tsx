import type { Meta, StoryObj } from "@storybook/react";
import {
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
} from "@/components/organisms/Layout/Header";
import { MailIcon, SettingsIcon } from "@/components/icons";
import {
  ApplicationNavbar,
  ApplicationToolbar,
  BlogHeader,
  DashboardHeader,
  DocsHeader,
  ECommerceHeader,
  MarketplaceHeader,
  MobileHeader,
  StackedHeader,
  StickyHeader,
} from "./index";

// ==============================================
// ApplicationNavbar
// ==============================================

const appNavbarMeta: Meta<typeof ApplicationNavbar> = {
  title: "Organisms/Layout/Headers/ApplicationNavbar",
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
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  initials: "JD",
};

export const DefaultApplicationNavbar: AppNavbarStory = {
  args: {
    logo: <HeaderLogo text="AppName" href="/" />,
    notifications: sampleNotifications,
    user: sampleUser,
    navigation: (
      <HeaderNav>
        <HeaderNavItem href="#dashboard" active>
          Dashboard
        </HeaderNavItem>
        <HeaderNavItem href="#projects">Projects</HeaderNavItem>
        <HeaderNavItem href="#team">Team</HeaderNavItem>
        <HeaderNavItem href="#reports">Reports</HeaderNavItem>
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
    <DashboardHeader
      title="Project Overview"
      user={sampleUser}
      notifications={[]}
    />
  ),
};

export const DashboardHeaderWithActions: StoryObj<typeof DashboardHeader> = {
  render: () => (
    <DashboardHeader
      title="Team Management"
      user={sampleUser}
      notifications={sampleNotifications}
      actions={
        <button
          type="button"
          className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
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
          <a
            href="#guide"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Guide
          </a>
          <a
            href="#api-reference"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            API Reference
          </a>
          <a
            href="#examples"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
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
              <a
                href="#home"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </StickyHeader>
      <div className="p-4">
        <p className="text-muted-foreground">
          Scroll down to see the sticky header behavior. The header will hide
          when scrolling down and show when scrolling up.
        </p>
        <div className="mt-8 space-y-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`content-block-${i + 1}`}
              className="p-4 bg-card rounded-lg border border-border"
            >
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
            <div
              key={`always-visible-block-${i + 1}`}
              className="p-4 bg-card rounded-lg border border-border"
            >
              <p>Content block {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// ==============================================
// ApplicationToolbar
// ==============================================

export const DefaultApplicationToolbar: StoryObj<typeof ApplicationToolbar> = {
  render: () => (
    <div className="min-h-[400px] relative">
      <ApplicationToolbar
        lastUpdated="Last updated 10 minutes ago"
        timezone="GMT+00:00 (United Kingdom)"
        onRefresh={() => console.log("Refresh clicked")}
        rightContent={
          <button
            type="button"
            className="p-2 inline-flex items-center gap-x-1.5 text-xs text-nowrap rounded-lg border border-border bg-card hover:bg-accent transition-colors"
          >
            25 Jul, 2023 - 25 Aug, 2023
            <svg
              aria-hidden="true"
              className="size-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        }
        className="relative"
      />
      <div className="pt-16 p-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground">
            Application content goes here. The toolbar above provides quick
            actions and date filtering.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const ApplicationToolbarWithActions: StoryObj<
  typeof ApplicationToolbar
> = {
  render: () => (
    <div className="min-h-[400px] relative">
      <ApplicationToolbar
        lastUpdated="Last updated 5 minutes ago"
        timezone="GMT+09:00 (Japan)"
        onRefresh={() => console.log("Refresh clicked")}
        actions={[
          {
            id: "export",
            label: "Export",
            icon: (
              <svg
                aria-hidden="true"
                className="size-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            ),
            onClick: () => console.log("Export clicked"),
          },
          {
            id: "settings",
            label: "Settings",
            icon: <SettingsIcon className="size-3.5" />,
            onClick: () => console.log("Settings clicked"),
          },
        ]}
        className="relative"
      />
      <div className="pt-16 p-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-muted-foreground">
            Toolbar with custom actions (Export and Settings buttons).
          </p>
        </div>
      </div>
    </div>
  ),
};

export const ApplicationToolbarWithSidebarOffset: StoryObj<
  typeof ApplicationToolbar
> = {
  render: () => (
    <div className="flex min-h-[400px]">
      {/* Simulated Sidebar */}
      <div className="w-64 bg-card border-r border-border shrink-0 p-4 hidden lg:block">
        <p className="font-semibold mb-4">Sidebar</p>
        <nav className="space-y-2">
          <a
            href="#dashboard"
            className="block px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm"
          >
            Dashboard
          </a>
          <a
            href="#reports"
            className="block px-3 py-2 rounded-lg hover:bg-accent text-sm"
          >
            Reports
          </a>
          <a
            href="#analytics"
            className="block px-3 py-2 rounded-lg hover:bg-accent text-sm"
          >
            Analytics
          </a>
          <a
            href="#settings"
            className="block px-3 py-2 rounded-lg hover:bg-accent text-sm"
          >
            Settings
          </a>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        <ApplicationToolbar
          showSidebarToggle
          onSidebarToggle={() => console.log("Toggle sidebar")}
          lastUpdated="Last updated 2 minutes ago"
          onRefresh={() => console.log("Refresh clicked")}
          className="relative lg:left-0"
        />
        <div className="pt-16 p-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="font-semibold mb-2">Chat Reports</h2>
            <p className="text-muted-foreground">
              This toolbar is used in dashboard layouts with a sidebar. The
              sidebar toggle appears on mobile devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ==============================================
// StackedHeader
// ==============================================

const PrelineLogo = () => (
  <a
    href="#home"
    className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
  >
    <span className="sr-only">Preline</span>
    <svg
      aria-hidden="true"
      className="w-28 h-auto"
      width="116"
      height="32"
      viewBox="0 0 116 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.5696 30.8182V11.3182H37.4474V13.7003H37.6229C37.7952 13.3187 38.0445 12.9309 38.3707 12.5369C38.7031 12.1368 39.134 11.8045 39.6634 11.5398C40.1989 11.2689 40.8636 11.1335 41.6577 11.1335C42.6918 11.1335 43.6458 11.4044 44.5199 11.946C45.3939 12.4815 46.0926 13.291 46.6158 14.3743C47.139 15.4515 47.4006 16.8026 47.4006 18.4276C47.4006 20.0095 47.1451 21.3452 46.6342 22.4347C46.1295 23.518 45.4401 24.3397 44.5661 24.8999C43.6982 25.4538 42.7256 25.7308 41.6484 25.7308C40.8852 25.7308 40.2358 25.6046 39.7003 25.3523C39.1709 25.0999 38.737 24.7829 38.3984 24.4013C38.0599 24.0135 37.8014 23.6226 37.6229 23.2287H37.5028V30.8182H33.5696ZM37.4197 18.4091C37.4197 19.2524 37.5367 19.9879 37.7706 20.6158C38.0045 21.2436 38.343 21.733 38.7862 22.0838C39.2294 22.4285 39.768 22.6009 40.402 22.6009C41.0421 22.6009 41.5838 22.4254 42.027 22.0746C42.4702 21.7176 42.8056 21.2251 43.0334 20.5973C43.2673 19.9633 43.3842 19.2339 43.3842 18.4091C43.3842 17.5904 43.2704 16.8703 43.0426 16.2486C42.8149 15.6269 42.4794 15.1406 42.0362 14.7898C41.593 14.4389 41.0483 14.2635 40.402 14.2635C39.7618 14.2635 39.2202 14.4328 38.777 14.7713C38.34 15.1098 38.0045 15.59 37.7706 16.2116C37.5367 16.8333 37.4197 17.5658 37.4197 18.4091Z"
        className="fill-primary"
      />
      <path
        d="M1 29.5V16.5C1 9.87258 6.37258 4.5 13 4.5C19.6274 4.5 25 9.87258 25 16.5C25 23.1274 19.6274 28.5 13 28.5H12"
        className="stroke-primary"
        strokeWidth="2"
      />
      <path
        d="M5 29.5V16.66C5 12.1534 8.58172 8.5 13 8.5C17.4183 8.5 21 12.1534 21 16.66C21 21.1666 17.4183 24.82 13 24.82H12"
        className="stroke-primary"
        strokeWidth="2"
      />
      <circle cx="13" cy="16.5214" r="5" className="fill-primary" />
    </svg>
  </a>
);

export const ClassicStackedHeader: StoryObj<typeof StackedHeader> = {
  render: () => (
    <div className="min-h-[400px]">
      <StackedHeader
        variant="classic"
        logo={<PrelineLogo />}
        searchPlaceholder="Search Preline"
        user={sampleUser}
        notifications={sampleNotifications}
        navigation={
          <>
            <a
              href="#home"
              className="px-3 py-2 text-sm font-medium text-primary"
            >
              Home
            </a>
            <a
              href="#features"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              About
            </a>
            <a
              href="#contact"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Contact
            </a>
          </>
        }
      />
      <div className="p-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="font-semibold mb-2">Classic Stacked Header</h2>
          <p className="text-muted-foreground">
            A 3-column layout with logo on the left, search in the center, and
            actions on the right. Navigation appears in a second row below.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const DoubleLineStackedHeader: StoryObj<typeof StackedHeader> = {
  render: () => (
    <div className="min-h-[400px]">
      <StackedHeader
        variant="double-line"
        topBar={{
          variant: "dark",
          children: (
            <div className="flex items-center justify-between">
              <span className="text-sm">Welcome to our store!</span>
              <div className="flex items-center gap-x-4">
                <a href="#track-order" className="text-sm hover:underline">
                  Track Order
                </a>
                <a href="#help" className="text-sm hover:underline">
                  Help
                </a>
              </div>
            </div>
          ),
        }}
        logo={<PrelineLogo />}
        user={sampleUser}
        notifications={sampleNotifications}
        navigation={
          <>
            <a
              href="#dashboard"
              className="px-3 py-2 text-sm font-medium text-primary"
            >
              Dashboard
            </a>
            <a
              href="#projects"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Projects
            </a>
            <a
              href="#team"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Team
            </a>
            <a
              href="#reports"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Reports
            </a>
          </>
        }
      />
      <div className="p-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="font-semibold mb-2">Double Line Stacked Header</h2>
          <p className="text-muted-foreground">
            Features a promotional top bar, main header row with logo and user
            menu, and a navigation row below.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const CenteredStackedHeader: StoryObj<typeof StackedHeader> = {
  render: () => (
    <div className="min-h-[400px]">
      <StackedHeader
        variant="centered"
        logo={<PrelineLogo />}
        showSearch={false}
        user={sampleUser}
      />
      <div className="p-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="font-semibold mb-2">Centered Layout Header</h2>
          <p className="text-muted-foreground">
            Simple centered layout with logo and user menu.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const StackedHeaderWithCustomRows: StoryObj<typeof StackedHeader> = {
  render: () => (
    <div className="min-h-[400px]">
      <StackedHeader
        rows={[
          {
            id: "promo",
            content: (
              <div className="py-2 text-center text-sm">
                <span className="text-muted-foreground">
                  Free shipping on orders over $50!
                </span>
                <a href="#shop" className="ml-2 text-primary hover:underline">
                  Shop now
                </a>
              </div>
            ),
            bordered: true,
            className: "bg-muted/50",
          },
          {
            id: "main",
            content: (
              <div className="flex items-center justify-between py-3">
                <PrelineLogo />
                <nav className="hidden lg:flex items-center gap-x-6">
                  <a href="#home" className="text-sm font-medium text-primary">
                    Home
                  </a>
                  <a
                    href="#shop"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Shop
                  </a>
                  <a
                    href="#categories"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Categories
                  </a>
                  <a
                    href="#about"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    About
                  </a>
                </nav>
                <div className="flex items-center gap-x-4">
                  <button
                    type="button"
                    className="size-9 flex items-center justify-center rounded-full hover:bg-accent"
                  >
                    <svg
                      aria-hidden="true"
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="size-9 flex items-center justify-center rounded-full hover:bg-accent relative"
                  >
                    <svg
                      aria-hidden="true"
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center text-xs bg-primary text-primary-foreground rounded-full">
                      3
                    </span>
                  </button>
                </div>
              </div>
            ),
            bordered: true,
          },
          {
            id: "categories",
            content: (
              <div className="py-2 hidden lg:flex items-center gap-x-6">
                <a
                  href="#new-arrivals"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  New Arrivals
                </a>
                <a
                  href="#best-sellers"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Best Sellers
                </a>
                <a
                  href="#sale"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Sale
                </a>
                <a
                  href="#collections"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Collections
                </a>
                <a
                  href="#brands"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Brands
                </a>
              </div>
            ),
            bordered: true,
          },
        ]}
      />
      <div className="p-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="font-semibold mb-2">Custom Rows Stacked Header</h2>
          <p className="text-muted-foreground">
            Fully customizable multi-row header using the rows prop. Each row
            can have its own content and styling.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const ProjectStackedHeader: StoryObj<typeof StackedHeader> = {
  render: () => (
    <div className="min-h-[400px]">
      <StackedHeader
        variant="project"
        logo={<PrelineLogo />}
        showSearch
        searchPlaceholder="Search projects..."
        user={sampleUser}
        notifications={sampleNotifications}
        navigation={
          <>
            <a
              href="#overview"
              className="px-3 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground"
            >
              Overview
            </a>
            <a
              href="#files"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Files
            </a>
            <a
              href="#tasks"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Tasks
            </a>
            <a
              href="#members"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Members
            </a>
            <a
              href="#settings"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Settings
            </a>
          </>
        }
      />
      <div className="p-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="font-semibold mb-2">Project Stacked Header</h2>
          <p className="text-muted-foreground">
            A header layout optimized for project management dashboards with
            tab-like navigation in the second row.
          </p>
        </div>
      </div>
    </div>
  ),
};
