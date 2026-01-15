import {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Avatar } from "@/components/atoms/Avatar";
import { Input } from "@/components/atoms/Input";
import {
  Header,
  HeaderNav,
  HeaderNavItem,
  HeaderLogo,
  HeaderActions,
} from "@/components/organisms/Header";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "@/components/molecules/Dropdown";
import {
  SearchIcon,
  BellIcon,
  MenuIcon,
  XIcon,
  ShoppingBagIcon,
  HeartIcon,
  ChevronDownIcon,
  HomeIcon,
  SettingsIcon,
  UserIcon,
  GlobeIcon,
} from "@/lib/icons";

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

export interface ApplicationNavbarProps extends React.HTMLAttributes<HTMLElement> {
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

export const ApplicationNavbar = forwardRef<HTMLElement, ApplicationNavbarProps>(
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

    const unreadCount = notificationCount ?? notifications.filter((n) => !n.read).length;

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
              <form
                onSubmit={handleSearchSubmit}
                className="hidden md:block"
              >
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
                <Button variant="ghost" size="sm" className="size-9 p-0 relative">
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
                    userMenuItems.map((item, index) => (
                      <DropdownItem key={index} onClick={item.onClick}>
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
                      <DropdownItem onClick={onLogout}>
                        Logout
                      </DropdownItem>
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
          <form
            onSubmit={handleSearchSubmit}
            className="md:hidden pt-3"
          >
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

export interface MarketplaceHeaderProps extends React.HTMLAttributes<HTMLElement> {
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

export const MarketplaceHeader = forwardRef<HTMLElement, MarketplaceHeaderProps>(
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
        className={cn("sticky top-0 inset-x-0 z-50 bg-card border-b border-border", className)}
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
                <a href="#" className="hover:underline">
                  Help
                </a>
                <a href="#" className="hover:underline">
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
                        className="flex items-center gap-x-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => {
                          if (!category.subcategories?.length) {
                            onCategoryClick?.(category);
                          }
                        }}
                      >
                        {category.label}
                        {category.subcategories && category.subcategories.length > 0 && (
                          <ChevronDownIcon className="size-4" />
                        )}
                      </button>
                    </DropdownTrigger>
                    {category.subcategories && category.subcategories.length > 0 && (
                      <DropdownContent>
                        {category.subcategories.map((sub) => (
                          <DropdownItem
                            key={sub.id}
                            onClick={() => onCategoryClick?.({ ...sub, subcategories: [] } as MarketplaceCategory)}
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
                  onClick={() => onCategoryClick?.(category)}
                  className="w-full text-left px-2 py-2 text-sm font-medium hover:bg-accent rounded-lg"
                >
                  {category.label}
                </button>
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="pl-4 mt-1 space-y-1">
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => onCategoryClick?.({ ...sub, subcategories: [] } as MarketplaceCategory)}
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

export interface DashboardHeaderProps extends React.HTMLAttributes<HTMLElement> {
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
    const unreadCount = notificationCount ?? notifications.filter((n) => !n.read).length;

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
                      <div key={index} className="flex items-center gap-x-1">
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
                  <Button variant="ghost" size="sm" className="size-9 p-0 relative">
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
                      <p className="text-sm font-medium truncate">{user.name}</p>
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

export interface ECommerceHeaderProps extends React.HTMLAttributes<HTMLElement> {
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
                    onClick={onProfileClick}
                    className="hidden sm:flex items-center gap-x-2 text-sm hover:text-primary transition-colors"
                  >
                    <UserIcon className="size-5" />
                    <span>{user.name}</span>
                  </button>
                ) : (
                  <button
                    onClick={onLoginClick}
                    className="hidden sm:flex items-center gap-x-2 text-sm hover:text-primary transition-colors"
                  >
                    <UserIcon className="size-5" />
                    <span>Sign In</span>
                  </button>
                )}

                {/* Wishlist */}
                <button
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
                      className="flex items-center gap-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {category.label}
                      {category.subcategories && category.subcategories.length > 0 && (
                        <ChevronDownIcon className="size-4" />
                      )}
                    </button>
                  </DropdownTrigger>
                  {category.subcategories && category.subcategories.length > 0 && (
                    <DropdownContent>
                      {category.subcategories.map((sub) => (
                        <DropdownItem
                          key={sub.id}
                          onClick={() => onCategoryClick?.({ ...sub, subcategories: [] } as MarketplaceCategory)}
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
                  onClick={() => onCategoryClick?.(category)}
                  className="w-full text-left py-2 text-sm font-medium hover:text-primary"
                >
                  {category.label}
                </button>
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="pl-4 space-y-1">
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => onCategoryClick?.({ ...sub, subcategories: [] } as MarketplaceCategory)}
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
              <Button variant="primary" className="w-full" onClick={onLoginClick}>
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
        className={cn("sticky top-0 inset-x-0 z-50 bg-card border-b border-border", className)}
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
              <Button variant="primary" className="w-full" onClick={onSubscribe}>
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
        className={cn("sticky top-0 inset-x-0 z-50 bg-card border-b border-border", className)}
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
              {logo || (
                title && (
                  <h1 className="text-base font-semibold truncate">{title}</h1>
                )
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-x-2">
              {rightAction || (
                <>
                  {showSearchButton && onSearchClick && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-9 p-0"
                      onClick={onSearchClick}
                    >
                      <SearchIcon className="size-5" />
                    </Button>
                  )}
                </>
              )}
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
    }, [lastScrollY, threshold, hideOnScrollDown, showOnScrollUp, alwaysVisible]);

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

// Re-export types for convenience
export type {
  HeaderProps,
  HeaderNavProps,
  HeaderNavItemProps,
  HeaderLogoProps,
  HeaderActionsProps,
} from "@/components/organisms/Header";
