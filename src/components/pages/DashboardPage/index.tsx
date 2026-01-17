"use client";

import { forwardRef, type ReactNode, useState } from "react";
import { Avatar, Input } from "@/components/atoms";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
  IconButton,
} from "@/components/molecules";
import {
  Card,
  CardBody,
  CardHeader,
  Header,
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
  PageContent,
  PageLayout,
  PageSection,
  Sidebar,
  SidebarHeader,
  SidebarItem,
  SidebarLogo,
  SidebarSection,
  StatCardGroup,
  type StatCardGroupItem,
  Table,
  type TableColumn,
} from "@/components/organisms";
import {
  BellIcon,
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// Dashboard variants
type DashboardVariant = "default" | "analytics" | "crm" | "ecommerce";

// Navigation item type
export interface DashboardNavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  badge?: string | number;
  active?: boolean;
  onClick?: () => void;
}

// Dashboard section type
export interface DashboardSection {
  id: string;
  title?: string;
  children: ReactNode;
}

// Main DashboardPage props
export interface DashboardPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: DashboardVariant;
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  navigation?: DashboardNavItem[];
  headerNavigation?: DashboardNavItem[];
  stats?: StatCardGroupItem[];
  user?: {
    name: string;
    email?: string;
    avatar?: string;
  };
  notifications?: number;
  onSearch?: (query: string) => void;
  onNavigate?: (itemId: string) => void;
  onUserMenuAction?: (action: string) => void;
  sections?: DashboardSection[];
  sidebarCollapsible?: boolean;
  sidebarDefaultCollapsed?: boolean;
}

// Default navigation items
const defaultNavigation: DashboardNavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <HomeIcon className="size-5" />,
    active: true,
  },
  {
    id: "users",
    label: "Users",
    icon: <UsersIcon className="size-5" />,
    badge: 5,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon className="size-5" />,
  },
];

export const DashboardPage = forwardRef<HTMLDivElement, DashboardPageProps>(
  (
    {
      className,
      variant = "default",
      logo,
      logoText = "Dashboard",
      logoHref = "/",
      navigation = defaultNavigation,
      headerNavigation = [],
      stats = [],
      user,
      notifications = 0,
      onSearch,
      onNavigate,
      onUserMenuAction,
      sections = [],
      sidebarCollapsible = true,
      sidebarDefaultCollapsed = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(
      sidebarDefaultCollapsed,
    );
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(searchQuery);
    };

    const handleNavigate = (itemId: string) => {
      onNavigate?.(itemId);
    };

    // Render sidebar content
    const renderSidebar = () => (
      <Sidebar
        variant="bordered"
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        collapsible={sidebarCollapsible}
        header={
          <SidebarHeader
            logo={
              <SidebarLogo href={logoHref} text={logoText}>
                {logo}
              </SidebarLogo>
            }
            showToggle={sidebarCollapsible}
          />
        }
        footer={
          user && (
            <Dropdown
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-x-3 w-full p-2 rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    initials={user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                    size="sm"
                  />
                  {!sidebarCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {user.name}
                      </p>
                      {user.email && (
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      )}
                    </div>
                  )}
                  {!sidebarCollapsed && (
                    <ChevronDownIcon className="size-4 text-muted-foreground shrink-0" />
                  )}
                </button>
              }
              placement="top-end"
            >
              <DropdownItem onClick={() => onUserMenuAction?.("profile")}>
                Profile
              </DropdownItem>
              <DropdownItem onClick={() => onUserMenuAction?.("settings")}>
                Settings
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem
                onClick={() => onUserMenuAction?.("logout")}
                className="text-destructive"
              >
                Sign out
              </DropdownItem>
            </Dropdown>
          )
        }
      >
        <SidebarSection>
          {navigation.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              active={item.active}
              href={item.href}
              onClick={() => {
                item.onClick?.();
                handleNavigate(item.id);
              }}
            />
          ))}
        </SidebarSection>
      </Sidebar>
    );

    // Render header content
    const renderHeader = () => (
      <Header
        variant="bordered"
        sticky
        maxWidth="full"
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        logo={
          <div className="md:hidden">
            <HeaderLogo href={logoHref} text={logoText}>
              {logo}
            </HeaderLogo>
          </div>
        }
        navigation={
          headerNavigation.length > 0 && (
            <HeaderNav>
              {headerNavigation.map((item) => (
                <HeaderNavItem
                  key={item.id}
                  href={item.href}
                  active={item.active}
                  onClick={() => handleNavigate(item.id)}
                >
                  {item.label}
                </HeaderNavItem>
              ))}
            </HeaderNav>
          )
        }
        actions={
          <div className="flex items-center gap-x-2">
            {/* Search */}
            {onSearch && (
              <form onSubmit={handleSearch} className="hidden sm:block">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<SearchIcon className="size-4" />}
                  inputSize="sm"
                  className="w-64"
                />
              </form>
            )}

            {/* Notifications */}
            <div className="relative">
              <IconButton
                icon={<BellIcon />}
                variant="ghost"
                size="sm"
                label="Notifications"
              />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 size-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
                  {notifications > 9 ? "9+" : notifications}
                </span>
              )}
            </div>

            {/* User avatar (mobile) */}
            {user && (
              <div className="md:hidden">
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  initials={user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                  size="sm"
                />
              </div>
            )}
          </div>
        }
      />
    );

    return (
      <PageLayout
        ref={ref}
        variant="dashboard"
        sidebar={renderSidebar()}
        header={renderHeader()}
        sidebarWidth="default"
        sidebarCollapsed={sidebarCollapsed}
        className={className}
        {...props}
      >
        <PageContent maxWidth="2xl" padding="md">
          {/* Stats section */}
          {stats.length > 0 && (
            <PageSection>
              <StatCardGroup stats={stats} columns="auto" />
            </PageSection>
          )}

          {/* Custom sections */}
          {sections.map((section) => (
            <PageSection key={section.id} title={section.title}>
              {section.children}
            </PageSection>
          ))}

          {/* Children content */}
          {children}
        </PageContent>
      </PageLayout>
    );
  },
);
DashboardPage.displayName = "DashboardPage";

// DashboardCard component for common dashboard cards
export interface DashboardCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
}

export const DashboardCard = forwardRef<HTMLDivElement, DashboardCardProps>(
  (
    { className, title, subtitle, action, padding = "md", children, ...props },
    ref,
  ) => {
    return (
      <Card ref={ref} variant="bordered" className={className} {...props}>
        {(title || subtitle || action) && (
          <CardHeader
            title={title}
            subtitle={subtitle}
            action={action}
            bordered
          />
        )}
        <CardBody padding={padding}>{children}</CardBody>
      </Card>
    );
  },
);
DashboardCard.displayName = "DashboardCard";

// DashboardTable component for common table usage
export interface DashboardTableProps<T> {
  title?: string;
  subtitle?: string;
  data: T[];
  columns: TableColumn<T>[];
  action?: ReactNode;
  emptyState?: ReactNode;
  loading?: boolean;
  className?: string;
}

export function DashboardTable<T>({
  title,
  subtitle,
  data,
  columns,
  action,
  emptyState,
  loading,
  className,
}: DashboardTableProps<T>) {
  return (
    <DashboardCard
      title={title}
      subtitle={subtitle}
      action={action}
      padding="none"
      className={className}
    >
      <Table
        data={data}
        columns={columns}
        emptyState={emptyState}
        loading={loading}
        hoverable
      />
    </DashboardCard>
  );
}

// DashboardEmptyState component
export interface DashboardEmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const DashboardEmptyState = forwardRef<
  HTMLDivElement,
  DashboardEmptyStateProps
>(({ className, icon, title, description, action, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        className,
      )}
      {...props}
    >
      {icon && <div className="mb-4 rounded-full bg-muted p-4">{icon}</div>}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
});
DashboardEmptyState.displayName = "DashboardEmptyState";
