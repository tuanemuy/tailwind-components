import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  PlusIcon,
  SettingsIcon,
  UsersIcon,
} from "@/lib/icons";
import { Card, CardBody, CardHeader } from "../Card";
import { Footer, FooterLogo, FooterSocialLink } from "../Footer";
import {
  Header,
  HeaderActions,
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
} from "../Header";
import { Sidebar, SidebarItem, SidebarLogo, SidebarSection } from "../Sidebar";
import { PageContent, PageHeader, PageLayout, PageSection } from "./index";

const meta: Meta<typeof PageLayout> = {
  title: "Organisms/PageLayout",
  component: PageLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageLayout>;

// Simple Twitter icon for demo
const TwitterIcon = () => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

export const DefaultLayout: Story = {
  render: () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
      <PageLayout
        variant="full"
        header={
          <Header
            logo={<HeaderLogo href="#" text="My App" />}
            navigation={
              <HeaderNav>
                <HeaderNavItem href="#" active>
                  Home
                </HeaderNavItem>
                <HeaderNavItem href="#">Products</HeaderNavItem>
                <HeaderNavItem href="#">About</HeaderNavItem>
                <HeaderNavItem href="#">Contact</HeaderNavItem>
              </HeaderNav>
            }
            actions={
              <HeaderActions>
                <Button variant="ghost">Log in</Button>
                <Button>Sign up</Button>
              </HeaderActions>
            }
            mobileMenuOpen={mobileMenuOpen}
            onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        }
        footer={
          <Footer
            variant="bordered"
            logo={<FooterLogo href="#" text="My App" />}
            copyright="© 2024 My App. All rights reserved."
            socialLinks={
              <FooterSocialLink
                href="#"
                icon={<TwitterIcon />}
                label="Twitter"
              />
            }
          />
        }
      >
        <PageContent>
          <PageHeader
            title="Welcome to My App"
            description="This is a default page layout with header and footer."
          />
          <PageSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={`card-${i}`} variant="bordered">
                  <CardHeader title={`Card ${i}`} />
                  <CardBody>
                    <p className="text-muted-foreground">
                      Card content goes here. This is a sample card.
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </PageSection>
        </PageContent>
      </PageLayout>
    );
  },
};

export const DashboardLayout: Story = {
  render: () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
      <PageLayout
        variant="dashboard"
        sidebarWidth="default"
        sidebarCollapsed={sidebarCollapsed}
        sidebar={
          <Sidebar
            collapsible
            collapsed={sidebarCollapsed}
            onCollapsedChange={setSidebarCollapsed}
            header={<SidebarLogo href="#" text="Dashboard" />}
            footer={
              <div className="flex items-center gap-3">
                <Avatar
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400"
                  alt="User"
                  size="sm"
                />
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-xs text-muted-foreground truncate">
                      Admin
                    </p>
                  </div>
                )}
              </div>
            }
          >
            <SidebarSection>
              <SidebarItem
                icon={<HomeIcon />}
                label="Dashboard"
                active
                href="#"
              />
              <SidebarItem
                icon={<UsersIcon />}
                label="Users"
                badge={12}
                href="#"
              />
              <SidebarItem icon={<FolderIcon />} label="Projects" href="#" />
              <SidebarItem icon={<CalendarIcon />} label="Calendar" href="#" />
              <SidebarItem icon={<SettingsIcon />} label="Settings" href="#" />
            </SidebarSection>
          </Sidebar>
        }
        header={
          <Header
            variant="bordered"
            sticky={false}
            showMobileMenuButton={false}
            actions={
              <HeaderActions>
                <Button size="sm">
                  <PlusIcon className="size-4 mr-2" />
                  New Project
                </Button>
              </HeaderActions>
            }
          />
        }
      >
        <PageContent>
          <PageHeader
            title="Dashboard"
            description="Welcome back, John! Here's what's happening."
            actions={
              <Button variant="outline" size="sm">
                Export
              </Button>
            }
          />

          <PageSection title="Overview">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {["Total Users", "Active Projects", "Revenue", "Growth"].map(
                (title, i) => (
                  <Card key={title} variant="bordered">
                    <CardBody>
                      <p className="text-sm text-muted-foreground">{title}</p>
                      <p className="text-2xl font-bold mt-1">
                        {(i + 1) * 1234}
                      </p>
                    </CardBody>
                  </Card>
                ),
              )}
            </div>
          </PageSection>

          <PageSection title="Recent Activity">
            <Card variant="bordered">
              <CardBody>
                <p className="text-muted-foreground">
                  Activity feed will appear here...
                </p>
              </CardBody>
            </Card>
          </PageSection>
        </PageContent>
      </PageLayout>
    );
  },
};

export const CenteredLayout: Story = {
  render: () => (
    <PageLayout variant="centered">
      <div className="w-full max-w-md p-6">
        <Card variant="bordered">
          <CardHeader
            title="Sign In"
            subtitle="Welcome back! Please sign in to continue."
          />
          <CardBody>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="centered-email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  id="centered-email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="centered-password"
                  className="mb-2 block text-sm font-medium"
                >
                  Password
                </label>
                <input
                  id="centered-password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Button className="w-full">Sign In</Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </PageLayout>
  ),
};

export const WithBreadcrumb: Story = {
  render: () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const Breadcrumb = () => (
      <nav className="flex items-center gap-2 text-sm">
        <a href="#home" className="text-muted-foreground hover:text-foreground">
          Home
        </a>
        <span className="text-muted-foreground">/</span>
        <a
          href="#products"
          className="text-muted-foreground hover:text-foreground"
        >
          Products
        </a>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground">Product Details</span>
      </nav>
    );

    return (
      <PageLayout
        variant="full"
        header={
          <Header
            logo={<HeaderLogo href="#" text="Store" />}
            navigation={
              <HeaderNav>
                <HeaderNavItem href="#">Home</HeaderNavItem>
                <HeaderNavItem href="#" active>
                  Products
                </HeaderNavItem>
                <HeaderNavItem href="#">About</HeaderNavItem>
              </HeaderNav>
            }
            mobileMenuOpen={mobileMenuOpen}
            onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        }
      >
        <PageContent>
          <PageHeader
            title="Product Name"
            description="A detailed description of the product."
            breadcrumb={<Breadcrumb />}
            actions={
              <>
                <Button variant="outline">Save</Button>
                <Button>Add to Cart</Button>
              </>
            }
          />

          <PageSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-lg" />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Product Details</h3>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="text-2xl font-bold">$99.99</div>
              </div>
            </div>
          </PageSection>
        </PageContent>
      </PageLayout>
    );
  },
};

export const EmptyState: Story = {
  render: () => (
    <PageLayout variant="full">
      <PageContent className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="size-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <FolderIcon className="size-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Get started by creating your first project. It only takes a few
            minutes.
          </p>
          <Button>
            <PlusIcon className="size-4 mr-2" />
            Create Project
          </Button>
        </div>
      </PageContent>
    </PageLayout>
  ),
};
