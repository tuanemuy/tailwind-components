import {
  forwardRef,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/molecules/Dropdown";
import { Header } from "@/components/organisms/Layout/Header";
import {
  BellIcon,
  ChevronDownIcon,
  CommandIcon,
  GlobeIcon,
  HeartIcon,
  MenuIcon,
  MoreVerticalIcon,
  RefreshIcon,
  SearchIcon,
  SettingsIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// ==============================================
// ApplicationNavbar
// ==============================================

export interface AppNotification {
  id: string;
  title: string;
  description?: string;
  time: string;
  read?: boolean;
  icon?: ReactNode;
}

export interface AppUser {
  name: string;
  email?: string;
  avatar?: string;
  initials?: string;
}

export interface ApplicationNavbarProps
  extends React.HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  navigation?: ReactNode;
  notifications?: AppNotification[];
  notificationCount?: number;
  user?: AppUser;
  searchPlaceholder?: string;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  onNotificationClick?: (notification: AppNotification) => void;
  onMarkAllRead?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  userMenuItems?: Array<{ label: string; onClick?: () => void; href?: string }>;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const ApplicationNavbar = forwardRef<
  HTMLElement,
  ApplicationNavbarProps
>(
  (
    {
      className,
      logo,
      navigation,
      notifications = [],
      notificationCount,
      user,
      searchPlaceholder = "Search...",
      showSearch = true,
      onSearch,
      onNotificationClick,
      onMarkAllRead,
      onProfileClick,
      onSettingsClick,
      onLogout,
      userMenuItems,
      maxWidth = "full",
      ...props
    },
    ref,
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const unreadCount =
      notificationCount ?? notifications.filter((n) => !n.read).length;

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(searchQuery);
    };

    return (
      <Header
        ref={ref}
        variant="bordered"
        sticky
        maxWidth={maxWidth}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        showMobileMenuButton={false}
        className={className}
        {...props}
      >
        <div className="flex items-center justify-between gap-x-4">
          {/* Logo */}
          <div className="flex items-center gap-x-4">
            {logo && <div className="shrink-0">{logo}</div>}
          </div>

          {/* Desktop Navigation */}
          {navigation && (
            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
              {navigation}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-x-2">
            {/* Desktop Search */}
            {showSearch && (
              <form onSubmit={handleSearchSubmit} className="hidden md:block">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                    size="sm"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
              </form>
            )}

            {/* Mobile Search Toggle */}
            {showSearch && (
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden size-9 p-0"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
              >
                <SearchIcon className="size-5" />
              </Button>
            )}

            {/* Notifications */}
            <Dropdown>
              <DropdownTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-9 p-0 relative"
                >
                  <BellIcon className="size-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center text-xs font-medium bg-destructive text-destructive-foreground rounded-full">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownContent align="end" className="w-80">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                  <span className="font-semibold">Notifications</span>
                  {unreadCount > 0 && onMarkAllRead && (
                    <button
                      type="button"
                      onClick={onMarkAllRead}
                      className="text-xs text-primary hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.slice(0, 5).map((notification) => (
                      <button
                        type="button"
                        key={notification.id}
                        onClick={() => onNotificationClick?.(notification)}
                        className={cn(
                          "w-full text-left px-4 py-3 hover:bg-accent transition-colors",
                          !notification.read && "bg-primary/5",
                        )}
                      >
                        <div className="flex items-start gap-x-3">
                          {notification.icon && (
                            <div className="shrink-0 mt-0.5">
                              {notification.icon}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {notification.title}
                            </p>
                            {notification.description && (
                              <p className="text-xs text-muted-foreground truncate">
                                {notification.description}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="shrink-0 size-2 bg-primary rounded-full mt-1" />
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                      No notifications
                    </div>
                  )}
                </div>
              </DropdownContent>
            </Dropdown>

            {/* User Menu */}
            {user && (
              <Dropdown>
                <DropdownTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1">
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      initials={user.initials}
                      size="sm"
                    />
                    <ChevronDownIcon className="size-4 ml-1 hidden sm:block" />
                  </Button>
                </DropdownTrigger>
                <DropdownContent align="end" className="w-56">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    {user.email && (
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    )}
                  </div>
                  {userMenuItems && userMenuItems.length > 0 ? (
                    userMenuItems.map((item) => (
                      <DropdownItem key={item.label} onClick={item.onClick}>
                        {item.label}
                      </DropdownItem>
                    ))
                  ) : (
                    <>
                      <DropdownItem onClick={onProfileClick}>
                        <UserIcon className="size-4 mr-2" />
                        Profile
                      </DropdownItem>
                      <DropdownItem onClick={onSettingsClick}>
                        <SettingsIcon className="size-4 mr-2" />
                        Settings
                      </DropdownItem>
                      <div className="border-t border-border my-1" />
                      <DropdownItem onClick={onLogout}>Logout</DropdownItem>
                    </>
                  )}
                </DropdownContent>
              </Dropdown>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden size-9 p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XIcon className="size-5" />
              ) : (
                <MenuIcon className="size-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && showMobileSearch && (
          <form onSubmit={handleSearchSubmit} className="md:hidden pt-3">
            <div className="relative">
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full"
                size="sm"
              />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            </div>
          </form>
        )}

        {/* Mobile Navigation */}
        {navigation && (
          <div
            className={cn(
              "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
              mobileMenuOpen ? "max-h-screen pt-4" : "max-h-0",
            )}
          >
            <div className="space-y-2">{navigation}</div>
          </div>
        )}
      </Header>
    );
  },
);
ApplicationNavbar.displayName = "ApplicationNavbar";

// ==============================================
// MarketplaceHeader
// ==============================================

export interface MarketplaceCategory {
  id: string;
  label: string;
  href?: string;
  subcategories?: Array<{ id: string; label: string; href?: string }>;
}

export interface MarketplaceHeaderProps
  extends React.HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  categories?: MarketplaceCategory[];
  cartCount?: number;
  wishlistCount?: number;
  user?: AppUser;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  onCategoryClick?: (category: MarketplaceCategory) => void;
  onProfileClick?: () => void;
  onLoginClick?: () => void;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const MarketplaceHeader = forwardRef<
  HTMLElement,
  MarketplaceHeaderProps
>(
  (
    {
      className,
      logo,
      categories = [],
      cartCount = 0,
      wishlistCount = 0,
      user,
      searchPlaceholder = "Search products...",
      onSearch,
      onCartClick,
      onWishlistClick,
      onCategoryClick,
      onProfileClick,
      onLoginClick,
      maxWidth = "full",
      ...props
    },
    ref,
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(searchQuery);
    };

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 inset-x-0 z-50 bg-card border-b border-border",
          className,
        )}
        {...props}
      >
        {/* Top bar */}
        <div className="bg-primary text-primary-foreground">
          <div
            className={cn(
              "w-full mx-auto px-4 sm:px-6 lg:px-8 py-2",
              maxWidth === "full" ? "max-w-full" : `max-w-${maxWidth}`,
            )}
          >
            <div className="flex items-center justify-between text-xs">
              <span>Free shipping on orders over $50</span>
              <div className="flex items-center gap-x-4">
                <a href="#help" className="hover:underline">
                  Help
                </a>
                <a href="#track-order" className="hover:underline">
                  Track Order
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div
          className={cn(
            "w-full mx-auto px-4 sm:px-6 lg:px-8 py-4",
            maxWidth === "full" ? "max-w-full" : `max-w-${maxWidth}`,
          )}
        >
          <div className="flex items-center justify-between gap-x-4">
            {/* Logo */}
            {logo && <div className="shrink-0">{logo}</div>}

            {/* Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:block flex-1 max-w-xl"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-x-2">
              {/* Wishlist */}
              <Button
                variant="ghost"
                size="sm"
                className="size-10 p-0 relative"
                onClick={onWishlistClick}
              >
                <HeartIcon className="size-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center text-xs font-medium bg-destructive text-destructive-foreground rounded-full">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="sm"
                className="size-10 p-0 relative"
                onClick={onCartClick}
              >
                <ShoppingBagIcon className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center text-xs font-medium bg-primary text-primary-foreground rounded-full">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Button>

              {/* User */}
              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1"
                  onClick={onProfileClick}
                >
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    initials={user.initials}
                    size="sm"
                  />
                </Button>
              ) : (
                <Button variant="primary" size="sm" onClick={onLoginClick}>
                  Sign In
                </Button>
              )}

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden size-10 p-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <XIcon className="size-5" />
                ) : (
                  <MenuIcon className="size-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="border-t border-border">
            <div
              className={cn(
                "w-full mx-auto px-4 sm:px-6 lg:px-8",
                maxWidth === "full" ? "max-w-full" : `max-w-${maxWidth}`,
              )}
            >
              <nav className="hidden lg:flex items-center gap-x-1 py-2">
                {categories.map((category) => (
                  <Dropdown key={category.id}>
                    <DropdownTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-x-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => {
                          if (!category.subcategories?.length) {
                            onCategoryClick?.(category);
                          }
                        }}
                      >
                        {category.label}
                        {category.subcategories &&
                          category.subcategories.length > 0 && (
                            <ChevronDownIcon className="size-4" />
                          )}
                      </button>
                    </DropdownTrigger>
                    {category.subcategories &&
                      category.subcategories.length > 0 && (
                        <DropdownContent>
                          {category.subcategories.map((sub) => (
                            <DropdownItem
                              key={sub.id}
                              onClick={() =>
                                onCategoryClick?.({
                                  ...sub,
                                  subcategories: [],
                                } as MarketplaceCategory)
                              }
                            >
                              {sub.label}
                            </DropdownItem>
                          ))}
                        </DropdownContent>
                      )}
                  </Dropdown>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-border",
            mobileMenuOpen ? "max-h-screen" : "max-h-0",
          )}
        >
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              </div>
            </form>

            {/* Mobile Categories */}
            {categories.map((category) => (
              <div key={category.id}>
                <button
                  type="button"
                  onClick={() => onCategoryClick?.(category)}
                  className="w-full text-left px-2 py-2 text-sm font-medium hover:bg-accent rounded-lg"
                >
                  {category.label}
                </button>
                {category.subcategories &&
                  category.subcategories.length > 0 && (
                    <div className="pl-4 mt-1 space-y-1">
                      {category.subcategories.map((sub) => (
                        <button
                          type="button"
                          key={sub.id}
                          onClick={() =>
                            onCategoryClick?.({
                              ...sub,
                              subcategories: [],
                            } as MarketplaceCategory)
                          }
                          className="w-full text-left px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </header>
    );
  },
);
MarketplaceHeader.displayName = "MarketplaceHeader";

// ==============================================
// DashboardHeader
// ==============================================

export interface DashboardHeaderProps
  extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  logo?: ReactNode;
  user?: AppUser;
  notifications?: AppNotification[];
  notificationCount?: number;
  showSidebarToggle?: boolean;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
  onNotificationClick?: (notification: AppNotification) => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  actions?: ReactNode;
}

export const DashboardHeader = forwardRef<HTMLElement, DashboardHeaderProps>(
  (
    {
      className,
      title,
      breadcrumbs,
      logo,
      user,
      notifications = [],
      notificationCount,
      showSidebarToggle = true,
      sidebarOpen = true,
      onSidebarToggle,
      onNotificationClick,
      onProfileClick,
      onSettingsClick,
      onLogout,
      actions,
      ...props
    },
    ref,
  ) => {
    const unreadCount =
      notificationCount ?? notifications.filter((n) => !n.read).length;

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 inset-x-0 z-40 bg-card border-b border-border",
          className,
        )}
        {...props}
      >
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-x-4">
            {/* Left section */}
            <div className="flex items-center gap-x-4">
              {/* Sidebar Toggle */}
              {showSidebarToggle && onSidebarToggle && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-9 p-0"
                  onClick={onSidebarToggle}
                >
                  <MenuIcon className="size-5" />
                </Button>
              )}

              {/* Logo (optional for dashboard) */}
              {logo && <div className="shrink-0 hidden lg:block">{logo}</div>}

              {/* Breadcrumbs / Title */}
              <div className="hidden sm:block">
                {breadcrumbs && breadcrumbs.length > 0 ? (
                  <nav className="flex items-center gap-x-1 text-sm">
                    {breadcrumbs.map((item, index) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-x-1"
                      >
                        {index > 0 && (
                          <span className="text-muted-foreground">/</span>
                        )}
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <span className="text-foreground font-medium">
                            {item.label}
                          </span>
                        )}
                      </div>
                    ))}
                  </nav>
                ) : title ? (
                  <h1 className="text-lg font-semibold">{title}</h1>
                ) : null}
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-x-2">
              {/* Custom Actions */}
              {actions}

              {/* Notifications */}
              <Dropdown>
                <DropdownTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-9 p-0 relative"
                  >
                    <BellIcon className="size-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center text-xs font-medium bg-destructive text-destructive-foreground rounded-full">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownTrigger>
                <DropdownContent align="end" className="w-80">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                    <span className="font-semibold">Notifications</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.slice(0, 5).map((notification) => (
                        <button
                          type="button"
                          key={notification.id}
                          onClick={() => onNotificationClick?.(notification)}
                          className={cn(
                            "w-full text-left px-4 py-3 hover:bg-accent transition-colors",
                            !notification.read && "bg-primary/5",
                          )}
                        >
                          <div className="flex items-start gap-x-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {notification.title}
                              </p>
                              {notification.description && (
                                <p className="text-xs text-muted-foreground truncate">
                                  {notification.description}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                        No notifications
                      </div>
                    )}
                  </div>
                </DropdownContent>
              </Dropdown>

              {/* User Menu */}
              {user && (
                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Avatar
                        src={user.avatar}
                        alt={user.name}
                        initials={user.initials}
                        size="sm"
                      />
                      <ChevronDownIcon className="size-4 ml-1 hidden sm:block" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent align="end" className="w-56">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium truncate">
                        {user.name}
                      </p>
                      {user.email && (
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      )}
                    </div>
                    <DropdownItem onClick={onProfileClick}>
                      <UserIcon className="size-4 mr-2" />
                      Profile
                    </DropdownItem>
                    <DropdownItem onClick={onSettingsClick}>
                      <SettingsIcon className="size-4 mr-2" />
                      Settings
                    </DropdownItem>
                    <div className="border-t border-border my-1" />
                    <DropdownItem onClick={onLogout}>Logout</DropdownItem>
                  </DropdownContent>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  },
);
DashboardHeader.displayName = "DashboardHeader";

// ==============================================
// ECommerceHeader
// ==============================================

export interface ECommerceHeaderProps
  extends React.HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  navigation?: ReactNode;
  categories?: MarketplaceCategory[];
  cartCount?: number;
  wishlistCount?: number;
  user?: AppUser;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  onCategoryClick?: (category: MarketplaceCategory) => void;
  onProfileClick?: () => void;
  onLoginClick?: () => void;
  promoMessage?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const ECommerceHeader = forwardRef<HTMLElement, ECommerceHeaderProps>(
  (
    {
      className,
      logo,
      navigation,
      categories = [],
      cartCount = 0,
      wishlistCount = 0,
      user,
      searchPlaceholder = "What are you looking for?",
      onSearch,
      onCartClick,
      onWishlistClick,
      onCategoryClick,
      onProfileClick,
      onLoginClick,
      promoMessage,
      maxWidth = "xl",
      ...props
    },
    ref,
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(searchQuery);
    };

    return (
      <header
        ref={ref}
        className={cn("sticky top-0 inset-x-0 z-50 bg-card", className)}
        {...props}
      >
        {/* Promo Bar */}
        {promoMessage && (
          <div className="bg-primary text-primary-foreground text-center py-2 text-sm">
            {promoMessage}
          </div>
        )}

        {/* Main Header */}
        <div className="border-b border-border">
          <div
            className={cn(
              "w-full mx-auto px-4 sm:px-6 lg:px-8 py-4",
              maxWidth === "full" ? "max-w-full" : `max-w-screen-${maxWidth}`,
            )}
          >
            <div className="flex items-center justify-between gap-x-6">
              {/* Logo */}
              {logo && <div className="shrink-0">{logo}</div>}

              {/* Search */}
              <form
                onSubmit={handleSearchSubmit}
                className="hidden lg:block flex-1 max-w-2xl"
              >
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-4 pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <SearchIcon className="size-5 text-muted-foreground hover:text-foreground transition-colors" />
                  </button>
                </div>
              </form>

              {/* Actions */}
              <div className="flex items-center gap-x-4">
                {/* User */}
                {user ? (
                  <button
                    type="button"
                    onClick={onProfileClick}
                    className="hidden sm:flex items-center gap-x-2 text-sm hover:text-primary transition-colors"
                  >
                    <UserIcon className="size-5" />
                    <span>{user.name}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onLoginClick}
                    className="hidden sm:flex items-center gap-x-2 text-sm hover:text-primary transition-colors"
                  >
                    <UserIcon className="size-5" />
                    <span>Sign In</span>
                  </button>
                )}

                {/* Wishlist */}
                <button
                  type="button"
                  onClick={onWishlistClick}
                  className="relative p-2 hover:text-primary transition-colors"
                >
                  <HeartIcon className="size-6" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center text-xs font-medium bg-destructive text-destructive-foreground rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button
                  type="button"
                  onClick={onCartClick}
                  className="relative p-2 hover:text-primary transition-colors"
                >
                  <ShoppingBagIcon className="size-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center text-xs font-medium bg-primary text-primary-foreground rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden size-10 p-0"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <XIcon className="size-5" />
                  ) : (
                    <MenuIcon className="size-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden lg:block border-b border-border">
          <div
            className={cn(
              "w-full mx-auto px-4 sm:px-6 lg:px-8",
              maxWidth === "full" ? "max-w-full" : `max-w-screen-${maxWidth}`,
            )}
          >
            <nav className="flex items-center gap-x-8 py-3">
              {navigation}
              {categories.map((category) => (
                <Dropdown key={category.id}>
                  <DropdownTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {category.label}
                      {category.subcategories &&
                        category.subcategories.length > 0 && (
                          <ChevronDownIcon className="size-4" />
                        )}
                    </button>
                  </DropdownTrigger>
                  {category.subcategories &&
                    category.subcategories.length > 0 && (
                      <DropdownContent>
                        {category.subcategories.map((sub) => (
                          <DropdownItem
                            key={sub.id}
                            onClick={() =>
                              onCategoryClick?.({
                                ...sub,
                                subcategories: [],
                              } as MarketplaceCategory)
                            }
                          >
                            {sub.label}
                          </DropdownItem>
                        ))}
                      </DropdownContent>
                    )}
                </Dropdown>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-border",
            mobileMenuOpen ? "max-h-[80vh]" : "max-h-0",
          )}
        >
          <div className="px-4 py-4 space-y-4 overflow-y-auto">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-10 w-full"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <SearchIcon className="size-5 text-muted-foreground" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            {navigation && <div className="py-2">{navigation}</div>}

            {/* Mobile Categories */}
            {categories.map((category) => (
              <div key={category.id}>
                <button
                  type="button"
                  onClick={() => onCategoryClick?.(category)}
                  className="w-full text-left py-2 text-sm font-medium hover:text-primary"
                >
                  {category.label}
                </button>
                {category.subcategories &&
                  category.subcategories.length > 0 && (
                    <div className="pl-4 space-y-1">
                      {category.subcategories.map((sub) => (
                        <button
                          type="button"
                          key={sub.id}
                          onClick={() =>
                            onCategoryClick?.({
                              ...sub,
                              subcategories: [],
                            } as MarketplaceCategory)
                          }
                          className="w-full text-left py-1.5 text-sm text-muted-foreground hover:text-foreground"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

            {/* Mobile User */}
            {!user && (
              <Button
                variant="primary"
                className="w-full"
                onClick={onLoginClick}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>
    );
  },
);
ECommerceHeader.displayName = "ECommerceHeader";

// ==============================================
// BlogHeader
// ==============================================

export interface BlogCategory {
  id: string;
  label: string;
  href?: string;
  count?: number;
}

export interface BlogHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  categories?: BlogCategory[];
  searchPlaceholder?: string;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  onCategoryClick?: (category: BlogCategory) => void;
  onSubscribe?: () => void;
  subscribeLabel?: string;
  navigation?: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const BlogHeader = forwardRef<HTMLElement, BlogHeaderProps>(
  (
    {
      className,
      logo,
      categories = [],
      searchPlaceholder = "Search articles...",
      showSearch = true,
      onSearch,
      onCategoryClick,
      onSubscribe,
      subscribeLabel = "Subscribe",
      navigation,
      maxWidth = "xl",
      ...props
    },
    ref,
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchInput, setShowSearchInput] = useState(false);

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(searchQuery);
    };

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 inset-x-0 z-50 bg-card border-b border-border",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "w-full mx-auto px-4 sm:px-6 lg:px-8 py-4",
            maxWidth === "full" ? "max-w-full" : `max-w-screen-${maxWidth}`,
          )}
        >
          <div className="flex items-center justify-between gap-x-4">
            {/* Logo */}
            {logo && <div className="shrink-0">{logo}</div>}

            {/* Desktop Navigation / Categories */}
            <nav className="hidden lg:flex items-center gap-x-6 flex-1 justify-center">
              {navigation}
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => onCategoryClick?.(category)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {category.label}
                  {category.count !== undefined && (
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({category.count})
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-x-2">
              {/* Search */}
              {showSearch && (
                <>
                  <form
                    onSubmit={handleSearchSubmit}
                    className={cn(
                      "hidden lg:block transition-all duration-200",
                      showSearchInput ? "w-64" : "w-0",
                    )}
                  >
                    {showSearchInput && (
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder={searchPlaceholder}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 pr-4"
                          size="sm"
                          autoFocus
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      </div>
                    )}
                  </form>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-9 p-0"
                    onClick={() => setShowSearchInput(!showSearchInput)}
                  >
                    <SearchIcon className="size-5" />
                  </Button>
                </>
              )}

              {/* Subscribe */}
              {onSubscribe && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onSubscribe}
                  className="hidden sm:inline-flex"
                >
                  {subscribeLabel}
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden size-9 p-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <XIcon className="size-5" />
                ) : (
                  <MenuIcon className="size-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-border",
            mobileMenuOpen ? "max-h-screen" : "max-h-0",
          )}
        >
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            {showSearch && (
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 w-full"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
              </form>
            )}

            {/* Mobile Navigation */}
            {navigation && <div className="py-2">{navigation}</div>}

            {/* Mobile Categories */}
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => {
                    onCategoryClick?.(category);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-2 text-sm font-medium hover:bg-accent rounded-lg"
                >
                  {category.label}
                  {category.count !== undefined && (
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({category.count})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Subscribe */}
            {onSubscribe && (
              <Button
                variant="primary"
                className="w-full"
                onClick={onSubscribe}
              >
                {subscribeLabel}
              </Button>
            )}
          </div>
        </div>
      </header>
    );
  },
);
BlogHeader.displayName = "BlogHeader";

// ==============================================
// DocsHeader
// ==============================================

export interface DocsVersion {
  id: string;
  label: string;
  current?: boolean;
}

export interface DocsHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  title?: string;
  versions?: DocsVersion[];
  currentVersion?: string;
  onVersionChange?: (version: DocsVersion) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  onSidebarToggle?: () => void;
  showSidebarToggle?: boolean;
  navigation?: ReactNode;
  githubUrl?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export const DocsHeader = forwardRef<HTMLElement, DocsHeaderProps>(
  (
    {
      className,
      logo,
      title = "Documentation",
      versions = [],
      currentVersion,
      onVersionChange,
      searchPlaceholder = "Search docs...",
      showSearch = true,
      onSearch,
      onSidebarToggle,
      showSidebarToggle = true,
      navigation,
      githubUrl,
      maxWidth = "full",
      ...props
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(searchQuery);
    };

    const selectedVersion =
      versions.find((v) => v.id === currentVersion) ||
      versions.find((v) => v.current) ||
      versions[0];

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 inset-x-0 z-50 bg-card border-b border-border",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "w-full mx-auto px-4 sm:px-6 lg:px-8",
            maxWidth === "full" ? "max-w-full" : `max-w-screen-${maxWidth}`,
          )}
        >
          <div className="flex items-center justify-between h-16 gap-x-4">
            {/* Left section */}
            <div className="flex items-center gap-x-4">
              {/* Sidebar Toggle (mobile/tablet) */}
              {showSidebarToggle && onSidebarToggle && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden size-9 p-0"
                  onClick={onSidebarToggle}
                >
                  <MenuIcon className="size-5" />
                </Button>
              )}

              {/* Logo */}
              {logo && <div className="shrink-0">{logo}</div>}

              {/* Title */}
              {title && (
                <div className="hidden sm:flex items-center gap-x-2">
                  <span className="text-muted-foreground">/</span>
                  <span className="font-medium">{title}</span>
                </div>
              )}

              {/* Version Selector */}
              {versions.length > 0 && selectedVersion && (
                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden sm:flex gap-x-1"
                    >
                      {selectedVersion.label}
                      <ChevronDownIcon className="size-4" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    {versions.map((version) => (
                      <DropdownItem
                        key={version.id}
                        onClick={() => onVersionChange?.(version)}
                        className={cn(
                          version.id === selectedVersion.id && "bg-accent",
                        )}
                      >
                        {version.label}
                        {version.current && (
                          <Badge size="sm" className="ml-2">
                            Latest
                          </Badge>
                        )}
                      </DropdownItem>
                    ))}
                  </DropdownContent>
                </Dropdown>
              )}
            </div>

            {/* Center - Search */}
            {showSearch && (
              <form
                onSubmit={handleSearchSubmit}
                className="hidden md:block flex-1 max-w-md"
              >
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                    size="sm"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-xs text-muted-foreground bg-muted rounded border border-border">
                    /
                  </kbd>
                </div>
              </form>
            )}

            {/* Right section */}
            <div className="flex items-center gap-x-2">
              {/* Navigation */}
              {navigation && (
                <nav className="hidden lg:flex items-center gap-x-4">
                  {navigation}
                </nav>
              )}

              {/* GitHub Link */}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <GlobeIcon className="size-5" />
                </a>
              )}

              {/* Mobile Search */}
              {showSearch && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden size-9 p-0"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <SearchIcon className="size-5" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-border",
            mobileMenuOpen ? "max-h-24" : "max-h-0",
          )}
        >
          <div className="px-4 py-3">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              </div>
            </form>
          </div>
        </div>
      </header>
    );
  },
);
DocsHeader.displayName = "DocsHeader";

// ==============================================
// MobileHeader
// ==============================================

export interface MobileHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  title?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  showMenuButton?: boolean;
  onMenuClick?: () => void;
  showSearchButton?: boolean;
  onSearchClick?: () => void;
  transparent?: boolean;
}

export const MobileHeader = forwardRef<HTMLElement, MobileHeaderProps>(
  (
    {
      className,
      logo,
      title,
      leftAction,
      rightAction,
      showBackButton = false,
      onBack,
      showMenuButton = true,
      onMenuClick,
      showSearchButton = false,
      onSearchClick,
      transparent = false,
      ...props
    },
    ref,
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 inset-x-0 z-50",
          transparent ? "bg-transparent" : "bg-card border-b border-border",
          className,
        )}
        {...props}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-x-3">
            {/* Left Section */}
            <div className="flex items-center gap-x-2">
              {leftAction || (
                <>
                  {showBackButton && onBack && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-9 p-0"
                      onClick={onBack}
                    >
                      <ChevronDownIcon className="size-5 rotate-90" />
                    </Button>
                  )}
                  {showMenuButton && onMenuClick && !showBackButton && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-9 p-0"
                      onClick={onMenuClick}
                    >
                      <MenuIcon className="size-5" />
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Center - Logo or Title */}
            <div className="flex-1 flex items-center justify-center">
              {logo ||
                (title && (
                  <h1 className="text-base font-semibold truncate">{title}</h1>
                ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-x-2">
              {rightAction ||
                (showSearchButton && onSearchClick && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-9 p-0"
                    onClick={onSearchClick}
                  >
                    <SearchIcon className="size-5" />
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </header>
    );
  },
);
MobileHeader.displayName = "MobileHeader";

// ==============================================
// StickyHeader
// ==============================================

export interface StickyHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  threshold?: number;
  hideOnScrollDown?: boolean;
  showOnScrollUp?: boolean;
  alwaysVisible?: boolean;
  elevated?: boolean;
}

export const StickyHeader = forwardRef<HTMLElement, StickyHeaderProps>(
  (
    {
      className,
      children,
      threshold = 100,
      hideOnScrollDown = true,
      showOnScrollUp = true,
      alwaysVisible = false,
      elevated = true,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = useCallback(() => {
      const currentScrollY = window.scrollY;

      if (alwaysVisible) {
        setVisible(true);
        setScrolled(currentScrollY > threshold);
        return;
      }

      // Check if we've scrolled past threshold
      setScrolled(currentScrollY > threshold);

      // Determine visibility based on scroll direction
      if (currentScrollY < threshold) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && hideOnScrollDown) {
        // Scrolling down
        setVisible(false);
      } else if (currentScrollY < lastScrollY && showOnScrollUp) {
        // Scrolling up
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    }, [
      lastScrollY,
      threshold,
      hideOnScrollDown,
      showOnScrollUp,
      alwaysVisible,
    ]);

    useEffect(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 inset-x-0 z-50 transition-all duration-300",
          visible ? "translate-y-0" : "-translate-y-full",
          scrolled && elevated && "shadow-md",
          className,
        )}
        {...props}
      >
        {children}
      </header>
    );
  },
);
StickyHeader.displayName = "StickyHeader";

// ==============================================
// ApplicationToolbar
// ==============================================

export interface ToolbarAction {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
}

export interface ApplicationToolbarProps
  extends React.HTMLAttributes<HTMLElement> {
  /** Show sidebar toggle button on mobile */
  showSidebarToggle?: boolean;
  /** Sidebar open state */
  sidebarOpen?: boolean;
  /** Callback when sidebar toggle is clicked */
  onSidebarToggle?: () => void;
  /** Left side content - typically refresh button and status info */
  leftContent?: ReactNode;
  /** Right side content - typically date picker or filters */
  rightContent?: ReactNode;
  /** Center content - optional title or tabs */
  centerContent?: ReactNode;
  /** Additional actions in the toolbar */
  actions?: ToolbarAction[];
  /** Last updated text */
  lastUpdated?: string;
  /** Timezone info */
  timezone?: string;
  /** Callback for refresh action */
  onRefresh?: () => void;
  /** Whether to show refresh button */
  showRefresh?: boolean;
  /** Fixed position with sidebar offset */
  sidebarOffset?: string;
  /** Variant style */
  variant?: "default" | "bordered" | "elevated";
}

const toolbarVariants = {
  default: "bg-card",
  bordered: "bg-card border-b border-border",
  elevated: "bg-card shadow-sm",
};

export const ApplicationToolbar = forwardRef<
  HTMLElement,
  ApplicationToolbarProps
>(
  (
    {
      className,
      showSidebarToggle = true,
      sidebarOpen,
      onSidebarToggle,
      leftContent,
      rightContent,
      centerContent,
      actions = [],
      lastUpdated,
      timezone,
      onRefresh,
      showRefresh = true,
      sidebarOffset,
      variant = "bordered",
      ...props
    },
    ref,
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          "fixed top-0 inset-x-0 z-50",
          sidebarOffset && `lg:ms-[${sidebarOffset}]`,
          toolbarVariants[variant],
          className,
        )}
        style={sidebarOffset ? { marginLeft: sidebarOffset } : undefined}
        {...props}
      >
        <div className="flex justify-between items-center gap-x-2 w-full py-2.5 px-2 sm:px-5">
          {/* Left Section - Sidebar Toggle (mobile) + Left Content */}
          <div className="flex items-center gap-x-3">
            {/* Sidebar Toggle (mobile only) */}
            {showSidebarToggle && onSidebarToggle && (
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden size-8 p-0"
                onClick={onSidebarToggle}
                aria-expanded={sidebarOpen}
                aria-label="Toggle sidebar"
              >
                <MenuIcon className="size-4" />
              </Button>
            )}

            {/* Left Content or Default Refresh + Status */}
            {leftContent || (
              <div className="flex items-center gap-x-3">
                {showRefresh && onRefresh && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRefresh}
                    className="p-2 h-auto"
                  >
                    <RefreshIcon className="size-3.5" />
                    <span className="hidden sm:block ml-2 text-xs">
                      Refresh
                    </span>
                  </Button>
                )}

                {(lastUpdated || timezone) && (
                  <div className="hidden sm:block truncate">
                    {lastUpdated && (
                      <p className="truncate text-xs text-muted-foreground">
                        {lastUpdated}
                      </p>
                    )}
                    {timezone && (
                      <p className="truncate text-xs text-muted-foreground">
                        {timezone}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Center Section */}
          {centerContent && (
            <div className="flex-1 flex justify-center items-center">
              {centerContent}
            </div>
          )}

          {/* Right Section - Actions + Right Content */}
          <div className="flex items-center gap-x-2">
            {/* Custom Actions */}
            {actions.map((action) =>
              action.href ? (
                <a
                  key={action.id}
                  href={action.href}
                  className="p-2 inline-flex items-center gap-x-1.5 text-xs rounded-lg border border-border bg-card text-foreground hover:bg-accent transition-colors"
                >
                  {action.icon}
                  <span className="hidden sm:block">{action.label}</span>
                </a>
              ) : (
                <Button
                  key={action.id}
                  variant="outline"
                  size="sm"
                  onClick={action.onClick}
                  className="p-2 h-auto"
                >
                  {action.icon}
                  <span className="hidden sm:block ml-1 text-xs">
                    {action.label}
                  </span>
                </Button>
              ),
            )}

            {/* Right Content - typically date picker */}
            {rightContent}
          </div>
        </div>
      </header>
    );
  },
);
ApplicationToolbar.displayName = "ApplicationToolbar";

// ==============================================
// StackedHeader
// ==============================================

export interface StackedHeaderTopBarProps {
  /** Background color variant for top bar */
  variant?: "primary" | "secondary" | "dark" | "light";
  /** Content for the top bar (promotional text, links, etc.) */
  children?: ReactNode;
}

export interface StackedHeaderRow {
  id: string;
  content: ReactNode;
  className?: string;
  bordered?: boolean;
}

export interface StackedHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Logo component */
  logo?: ReactNode;
  /** Navigation content for the second row */
  navigation?: ReactNode;
  /** Actions (search, notifications, user menu, etc.) */
  actions?: ReactNode;
  /** Top promotional bar */
  topBar?: StackedHeaderTopBarProps;
  /** Custom header rows for complex layouts */
  rows?: StackedHeaderRow[];
  /** Layout variant */
  variant?: "classic" | "centered" | "inverted" | "double-line" | "project";
  /** Show search in header */
  showSearch?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Callback for search */
  onSearch?: (query: string) => void;
  /** Maximum width */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Sticky header */
  sticky?: boolean;
  /** Mobile menu open state */
  mobileMenuOpen?: boolean;
  /** Mobile menu toggle callback */
  onMobileMenuToggle?: () => void;
  /** User info for display */
  user?: AppUser;
  /** Notifications */
  notifications?: AppNotification[];
  /** Notification count override */
  notificationCount?: number;
  /** Callback when notification is clicked */
  onNotificationClick?: (notification: AppNotification) => void;
  /** Callback for profile click */
  onProfileClick?: () => void;
  /** Callback for settings click */
  onSettingsClick?: () => void;
  /** Callback for logout */
  onLogout?: () => void;
}

const topBarVariants = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  dark: "bg-slate-900 text-white dark:bg-slate-800",
  light: "bg-muted text-muted-foreground",
};

const maxWidthClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export const StackedHeader = forwardRef<HTMLElement, StackedHeaderProps>(
  (
    {
      className,
      logo,
      navigation,
      actions,
      topBar,
      rows,
      variant = "classic",
      showSearch = true,
      searchPlaceholder = "Search...",
      onSearch,
      maxWidth = "xl",
      sticky = true,
      mobileMenuOpen = false,
      onMobileMenuToggle,
      user,
      notifications = [],
      notificationCount,
      onNotificationClick,
      onProfileClick,
      onSettingsClick,
      onLogout,
      children,
      ...props
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [internalMobileMenuOpen, setInternalMobileMenuOpen] =
      useState(mobileMenuOpen);

    const handleMobileMenuToggle = () => {
      if (onMobileMenuToggle) {
        onMobileMenuToggle();
      } else {
        setInternalMobileMenuOpen(!internalMobileMenuOpen);
      }
    };

    const isMenuOpen = onMobileMenuToggle
      ? mobileMenuOpen
      : internalMobileMenuOpen;
    const unreadCount =
      notificationCount ?? notifications.filter((n) => !n.read).length;

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(searchQuery);
    };

    // If custom rows are provided, render them
    if (rows && rows.length > 0) {
      return (
        <header
          ref={ref}
          className={cn(
            "flex flex-col z-50",
            sticky && "sticky top-0",
            className,
          )}
          {...props}
        >
          {/* Top Bar */}
          {topBar && (
            <div className={cn(topBarVariants[topBar.variant || "primary"])}>
              <div
                className={cn(
                  "w-full mx-auto px-4 sm:px-6 lg:px-8 py-2",
                  maxWidthClasses[maxWidth],
                )}
              >
                {topBar.children}
              </div>
            </div>
          )}

          {/* Custom Rows */}
          {rows.map((row) => (
            <div
              key={row.id}
              className={cn(
                "bg-card",
                row.bordered && "border-b border-border",
                row.className,
              )}
            >
              <div
                className={cn(
                  "w-full mx-auto px-4 sm:px-6 lg:px-8",
                  maxWidthClasses[maxWidth],
                )}
              >
                {row.content}
              </div>
            </div>
          ))}

          {children}
        </header>
      );
    }

    // Default variant-based rendering
    return (
      <header
        ref={ref}
        className={cn(
          "flex flex-col z-50",
          sticky && "sticky top-0",
          className,
        )}
        {...props}
      >
        {/* Top Bar (optional) */}
        {topBar && (
          <div className={cn(topBarVariants[topBar.variant || "primary"])}>
            <div
              className={cn(
                "w-full mx-auto px-4 sm:px-6 lg:px-8 py-2",
                maxWidthClasses[maxWidth],
              )}
            >
              {topBar.children}
            </div>
          </div>
        )}

        {/* Main Header Row */}
        <div className="bg-card border-b border-border">
          <div
            className={cn(
              "w-full mx-auto px-4 sm:px-6 lg:px-8",
              maxWidthClasses[maxWidth],
            )}
          >
            <div
              className={cn(
                "flex items-center py-2.5",
                variant === "classic" &&
                  "justify-between lg:grid lg:grid-cols-3",
                variant === "centered" && "justify-between",
                variant === "inverted" && "justify-between",
                variant === "double-line" && "justify-between",
                variant === "project" && "justify-between gap-x-4",
              )}
            >
              {/* Logo Section */}
              <div className="flex items-center gap-x-3">
                {logo && <div className="shrink-0">{logo}</div>}

                {/* Mobile Menu Toggle (for double-line variant) */}
                {variant === "double-line" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="md:hidden size-8 p-0"
                    onClick={handleMobileMenuToggle}
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation"
                  >
                    <MoreVerticalIcon className="size-4" />
                  </Button>
                )}
              </div>

              {/* Search Section (for classic variant) */}
              {variant === "classic" && showSearch && (
                <div className="hidden lg:block lg:w-full">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-16"
                        size="sm"
                      />
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground">
                        <CommandIcon className="size-3" />
                        <span className="mx-1 text-xs">+</span>
                        <span className="text-xs">/</span>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Actions Section */}
              <div className="flex items-center justify-end gap-x-2">
                {/* Mobile Search Button */}
                {showSearch && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden size-9 p-0"
                  >
                    <SearchIcon className="size-4" />
                  </Button>
                )}

                {/* Notifications */}
                {notifications.length > 0 && (
                  <Dropdown>
                    <DropdownTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="size-9 p-0 relative"
                      >
                        <BellIcon className="size-4" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center text-xs font-medium bg-destructive text-destructive-foreground rounded-full">
                            {unreadCount > 9 ? "9+" : unreadCount}
                          </span>
                        )}
                      </Button>
                    </DropdownTrigger>
                    <DropdownContent align="end" className="w-80">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                        <span className="font-semibold">Notifications</span>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.slice(0, 5).map((notification) => (
                          <button
                            type="button"
                            key={notification.id}
                            onClick={() => onNotificationClick?.(notification)}
                            className={cn(
                              "w-full text-left px-4 py-3 hover:bg-accent transition-colors",
                              !notification.read && "bg-primary/5",
                            )}
                          >
                            <div className="flex items-start gap-x-3">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {notification.title}
                                </p>
                                {notification.description && (
                                  <p className="text-xs text-muted-foreground truncate">
                                    {notification.description}
                                  </p>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </DropdownContent>
                  </Dropdown>
                )}

                {/* User Menu */}
                {user && (
                  <Dropdown>
                    <DropdownTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-1">
                        <Avatar
                          src={user.avatar}
                          alt={user.name}
                          initials={user.initials}
                          size="sm"
                        />
                        <ChevronDownIcon className="size-4 ml-1 hidden sm:block" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownContent align="end" className="w-56">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium truncate">
                          {user.name}
                        </p>
                        {user.email && (
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        )}
                      </div>
                      <DropdownItem onClick={onProfileClick}>
                        <UserIcon className="size-4 mr-2" />
                        Profile
                      </DropdownItem>
                      <DropdownItem onClick={onSettingsClick}>
                        <SettingsIcon className="size-4 mr-2" />
                        Settings
                      </DropdownItem>
                      <div className="border-t border-border my-1" />
                      <DropdownItem onClick={onLogout}>Logout</DropdownItem>
                    </DropdownContent>
                  </Dropdown>
                )}

                {/* Custom Actions */}
                {actions}

                {/* Mobile Menu Toggle */}
                {variant !== "double-line" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden size-9 p-0"
                    onClick={handleMobileMenuToggle}
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle menu"
                  >
                    {isMenuOpen ? (
                      <XIcon className="size-4" />
                    ) : (
                      <MenuIcon className="size-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Row (for variants that have separate navigation) */}
        {navigation &&
          (variant === "classic" ||
            variant === "double-line" ||
            variant === "project") && (
            <div className="hidden lg:block bg-card border-b border-border">
              <div
                className={cn(
                  "w-full mx-auto px-4 sm:px-6 lg:px-8",
                  maxWidthClasses[maxWidth],
                )}
              >
                <nav className="flex items-center gap-x-1 py-2">
                  {navigation}
                </nav>
              </div>
            </div>
          )}

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-card border-b border-border",
            isMenuOpen ? "max-h-screen" : "max-h-0",
          )}
        >
          <div
            className={cn(
              "w-full mx-auto px-4 py-4",
              maxWidthClasses[maxWidth],
            )}
          >
            {/* Mobile Search */}
            {showSearch && (
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
              </form>
            )}

            {/* Mobile Navigation */}
            {navigation && <div className="space-y-2">{navigation}</div>}
          </div>
        </div>

        {children}
      </header>
    );
  },
);
StackedHeader.displayName = "StackedHeader";

// Re-export types for convenience
export type {
  HeaderActionsProps,
  HeaderLogoProps,
  HeaderNavItemProps,
  HeaderNavProps,
  HeaderProps,
} from "@/components/organisms/Layout/Header";
