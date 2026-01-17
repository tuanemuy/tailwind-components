import { forwardRef, type ReactNode, useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Input } from "@/components/atoms/Input";
import { Radio } from "@/components/atoms/Radio";
import {
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarLogo,
  SidebarSection,
  SidebarToggle,
} from "@/components/organisms/Layout/Sidebar";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilterIcon,
  SearchIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

// ==============================================
// Common Types
// ==============================================

export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  badge?: string | number;
  badgeVariant?:
    | "default"
    | "secondary"
    | "destructive"
    | "success"
    | "warning";
  active?: boolean;
  disabled?: boolean;
  children?: SidebarNavItem[];
  onClick?: () => void;
}

export interface SidebarNavSection {
  id: string;
  title?: string;
  items: SidebarNavItem[];
}

export interface SidebarUser {
  name: string;
  email?: string;
  avatar?: string;
  initials?: string;
  role?: string;
}

// ==============================================
// DashboardSidebar
// ==============================================

export interface DashboardSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  sections?: SidebarNavSection[];
  user?: SidebarUser;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapsible?: boolean;
  showUserSection?: boolean;
  footer?: ReactNode;
  onItemClick?: (item: SidebarNavItem) => void;
  onLogout?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

export const DashboardSidebar = forwardRef<
  HTMLDivElement,
  DashboardSidebarProps
>(
  (
    {
      className,
      logo,
      logoText,
      logoHref = "/",
      sections = [],
      user,
      collapsed = false,
      onCollapsedChange,
      collapsible = true,
      showUserSection = true,
      footer,
      onItemClick,
      onLogout,
      onSettingsClick,
      onProfileClick,
      ...props
    },
    ref,
  ) => {
    const renderNavItem = (item: SidebarNavItem, depth = 0) => {
      if (item.children && item.children.length > 0) {
        return (
          <SidebarGroup
            key={item.id}
            icon={item.icon}
            label={item.label}
            defaultOpen={item.children.some((child) => child.active)}
          >
            {item.children.map((child) => renderNavItem(child, depth + 1))}
          </SidebarGroup>
        );
      }

      return (
        <SidebarItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          badge={item.badge}
          badgeVariant={item.badgeVariant}
          active={item.active}
          href={item.href}
          onClick={() => {
            item.onClick?.();
            onItemClick?.(item);
          }}
          disabled={item.disabled}
        />
      );
    };

    return (
      <Sidebar
        ref={ref}
        variant="bordered"
        collapsed={collapsed}
        onCollapsedChange={onCollapsedChange}
        collapsible={collapsible}
        className={className}
        header={
          <div className="flex items-center justify-between">
            <SidebarLogo text={logoText} href={logoHref}>
              {logo}
            </SidebarLogo>
            {collapsible && <SidebarToggle />}
          </div>
        }
        footer={
          footer || (showUserSection && user) ? (
            <div className="space-y-3">
              {footer}
              {showUserSection && user && (
                <div
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-lg bg-accent/50",
                    collapsed && "justify-center",
                  )}
                >
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    initials={user.initials}
                    size="sm"
                    className="shrink-0"
                  />
                  <div
                    className={cn(
                      "min-w-0 transition-all duration-300 overflow-hidden",
                      collapsed ? "opacity-0 w-0" : "opacity-100 flex-1",
                    )}
                  >
                    <p className="text-sm font-medium truncate">
                      {user.name}
                    </p>
                    {user.role && (
                      <p className="text-xs text-muted-foreground truncate">
                        {user.role}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : undefined
        }
        {...props}
      >
        {sections.map((section) => (
          <SidebarSection key={section.id} title={section.title}>
            {section.items.map((item) => renderNavItem(item))}
          </SidebarSection>
        ))}
      </Sidebar>
    );
  },
);
DashboardSidebar.displayName = "DashboardSidebar";

// ==============================================
// DetachedSidebar
// ==============================================

export interface DetachedSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  sections?: SidebarNavSection[];
  user?: SidebarUser;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapsible?: boolean;
  onItemClick?: (item: SidebarNavItem) => void;
  margin?: "sm" | "md" | "lg";
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Show border below header. Default: false */
  showHeaderBorder?: boolean;
}

const detachedMargins = {
  sm: "m-2",
  md: "m-4",
  lg: "m-6",
};

const detachedRounded = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  "2xl": "rounded-[2rem]",
};

export const DetachedSidebar = forwardRef<HTMLDivElement, DetachedSidebarProps>(
  (
    {
      className,
      logo,
      logoText,
      logoHref = "/",
      sections = [],
      user,
      collapsed = false,
      onCollapsedChange,
      collapsible = true,
      onItemClick,
      margin = "md",
      rounded = "xl",
      showHeaderBorder = false,
      ...props
    },
    ref,
  ) => {
    const _renderNavItem = (item: SidebarNavItem) => {
      if (item.children && item.children.length > 0) {
        return (
          <SidebarGroup
            key={item.id}
            icon={item.icon}
            label={item.label}
            defaultOpen={item.children.some((child) => child.active)}
          >
            {item.children.map((child) => _renderNavItem(child))}
          </SidebarGroup>
        );
      }

      return (
        <SidebarItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          badge={item.badge}
          badgeVariant={item.badgeVariant}
          active={item.active}
          href={item.href}
          onClick={() => {
            item.onClick?.();
            onItemClick?.(item);
          }}
          disabled={item.disabled}
        />
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-y-0 start-0 z-40 flex flex-col",
          detachedMargins[margin],
        )}
      >
        <aside
          className={cn(
            "flex flex-col h-full bg-card border border-border shadow-lg transition-all duration-300",
            detachedRounded[rounded],
            collapsed ? "w-16" : "w-64",
            className,
          )}
          {...props}
        >
          {/* Header */}
          <div
            className={cn(
              "shrink-0 p-4",
              showHeaderBorder && "border-b border-border",
            )}
          >
            <div className="flex items-center justify-center">
              {logoHref ? (
                <a
                  href={logoHref}
                  className={cn(
                    "flex items-center focus:outline-none focus:opacity-80 transition-all duration-300 overflow-hidden",
                    collapsed ? "mr-0" : "mr-auto",
                  )}
                >
                  <span className="shrink-0">{logo}</span>
                  {logoText && (
                    <span
                      className={cn(
                        "text-lg font-semibold text-foreground whitespace-nowrap transition-all duration-300 overflow-hidden",
                        collapsed ? "opacity-0 w-0 ml-0" : "opacity-100 w-auto ml-2",
                      )}
                    >
                      {logoText}
                    </span>
                  )}
                </a>
              ) : (
                <div
                  className={cn(
                    "flex items-center transition-all duration-300 overflow-hidden",
                    collapsed ? "mr-0" : "mr-auto",
                  )}
                >
                  <span className="shrink-0">{logo}</span>
                  {logoText && (
                    <span
                      className={cn(
                        "text-lg font-semibold text-foreground whitespace-nowrap transition-all duration-300 overflow-hidden",
                        collapsed ? "opacity-0 w-0 ml-0" : "opacity-100 w-auto ml-2",
                      )}
                    >
                      {logoText}
                    </span>
                  )}
                </div>
              )}
              {collapsible && (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "size-8 p-0 shrink-0 transition-all duration-300 overflow-hidden",
                    collapsed ? "opacity-0 w-0 ml-0" : "opacity-100 ml-2",
                  )}
                  onClick={() => onCollapsedChange?.(!collapsed)}
                >
                  <ChevronRightIcon
                    className={cn(
                      "size-4 transition-transform",
                      !collapsed && "rotate-180",
                    )}
                  />
                </Button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {sections.map((section) => (
              <div key={section.id} className="mb-4 last:mb-0">
                {section.title && (
                  <h3
                    className={cn(
                      "mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-300 overflow-hidden whitespace-nowrap",
                      collapsed ? "opacity-0 max-h-0 mb-0" : "opacity-100 max-h-8",
                    )}
                  >
                    {section.title}
                  </h3>
                )}
                <nav className="space-y-1">
                  {section.items.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        item.onClick?.();
                        onItemClick?.(item);
                      }}
                      className={cn(
                        "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-ring",
                        item.active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent",
                        item.disabled && "opacity-50 pointer-events-none",
                        collapsed && "justify-center",
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      {item.icon && (
                        <span
                          className={cn(
                            "shrink-0 size-5",
                            item.active
                              ? "text-primary"
                              : "text-muted-foreground",
                          )}
                        >
                          {item.icon}
                        </span>
                      )}
                      <div
                        className={cn(
                          "flex items-center gap-3 overflow-hidden transition-all duration-300",
                          collapsed ? "w-0 opacity-0 ml-0" : "flex-1 opacity-100 ml-3",
                        )}
                      >
                        <span className="flex-1 truncate text-left">
                          {item.label}
                        </span>
                        {item.badge !== undefined && (
                          <Badge
                            variant={item.badgeVariant || "secondary"}
                            size="sm"
                            className="shrink-0"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          {/* Footer */}
          {user && (
            <div className="shrink-0 p-4 border-t border-border">
              <div
                className={cn(
                  "flex items-center gap-3",
                  collapsed && "justify-center",
                )}
              >
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  initials={user.initials}
                  size="sm"
                  className="shrink-0"
                />
                <div
                  className={cn(
                    "min-w-0 transition-all duration-300 overflow-hidden",
                    collapsed ? "opacity-0 w-0" : "opacity-100 flex-1",
                  )}
                >
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  {user.email && (
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    );
  },
);
DetachedSidebar.displayName = "DetachedSidebar";

// ==============================================
// CollapsibleSidebar
// ==============================================

export interface CollapsibleSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  collapsedLogo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  sections?: SidebarNavSection[];
  user?: SidebarUser;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  expandOnHover?: boolean;
  onItemClick?: (item: SidebarNavItem) => void;
  position?: "fixed" | "sticky" | "relative";
  /** Show border below header. Default: false */
  showHeaderBorder?: boolean;
}

export const CollapsibleSidebar = forwardRef<
  HTMLDivElement,
  CollapsibleSidebarProps
>(
  (
    {
      className,
      logo,
      collapsedLogo,
      logoText,
      logoHref = "/",
      sections = [],
      user,
      collapsed = false,
      onCollapsedChange,
      expandOnHover = true,
      onItemClick,
      position = "fixed",
      showHeaderBorder = false,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const isExpanded = expandOnHover ? !collapsed || isHovered : !collapsed;

    const renderNavItem = (item: SidebarNavItem) => {
      if (item.children && item.children.length > 0) {
        return (
          <div key={item.id} className="space-y-1">
            <button
              type="button"
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                "text-muted-foreground hover:text-foreground hover:bg-accent",
                !isExpanded && "justify-center",
              )}
              title={!isExpanded ? item.label : undefined}
            >
              {item.icon && (
                <span className="shrink-0 size-5">{item.icon}</span>
              )}
              <div
                className={cn(
                  "flex items-center gap-3 overflow-hidden transition-all duration-300",
                  !isExpanded ? "w-0 opacity-0 ml-0" : "flex-1 opacity-100 ml-3",
                )}
              >
                <span className="flex-1 truncate text-left">{item.label}</span>
                <ChevronRightIcon className="size-4 shrink-0" />
              </div>
            </button>
            <div
              className={cn(
                "pl-8 space-y-1 overflow-hidden transition-all duration-300",
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
              )}
            >
              {item.children.map((child) => renderNavItem(child))}
            </div>
          </div>
        );
      }

      return (
        <button
          type="button"
          key={item.id}
          onClick={() => {
            item.onClick?.();
            onItemClick?.(item);
          }}
          className={cn(
            "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            item.active
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-accent",
            item.disabled && "opacity-50 pointer-events-none",
            !isExpanded && "justify-center",
          )}
          title={!isExpanded ? item.label : undefined}
        >
          {item.icon && (
            <span
              className={cn(
                "shrink-0 size-5",
                item.active ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.icon}
            </span>
          )}
          <div
            className={cn(
              "flex items-center gap-3 overflow-hidden transition-all duration-300",
              !isExpanded ? "w-0 opacity-0 ml-0" : "flex-1 opacity-100 ml-3",
            )}
          >
            <span className="flex-1 truncate text-left">{item.label}</span>
            {item.badge !== undefined && (
              <Badge
                variant={item.badgeVariant || "secondary"}
                size="sm"
                className="shrink-0"
              >
                {item.badge}
              </Badge>
            )}
          </div>
        </button>
      );
    };

    return (
      <aside
        ref={ref}
        className={cn(
          "flex flex-col h-full bg-card border-r border-border transition-all duration-300 z-40",
          position === "fixed" && "fixed inset-y-0 start-0",
          position === "sticky" && "sticky top-0",
          isExpanded ? "w-64" : "w-16",
          className,
        )}
        onMouseEnter={() => expandOnHover && setIsHovered(true)}
        onMouseLeave={() => expandOnHover && setIsHovered(false)}
        {...props}
      >
        {/* Header */}
        <div
          className={cn(
            "shrink-0 p-4",
            showHeaderBorder && "border-b border-border",
          )}
        >
          <div className="flex items-center justify-center">
            <a
              href={logoHref}
              className={cn(
                "flex items-center transition-all duration-300 overflow-hidden",
                !isExpanded ? "mr-0" : "mr-auto",
              )}
            >
              <span className="shrink-0">{isExpanded ? logo : (collapsedLogo || logo)}</span>
              {logoText && (
                <span
                  className={cn(
                    "text-lg font-semibold whitespace-nowrap transition-all duration-300 overflow-hidden",
                    !isExpanded ? "opacity-0 w-0 ml-0" : "opacity-100 w-auto ml-2",
                  )}
                >
                  {logoText}
                </span>
              )}
            </a>
            {!expandOnHover && onCollapsedChange && (
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "size-8 p-0 shrink-0 transition-all duration-300 overflow-hidden",
                  !isExpanded ? "opacity-0 w-0 ml-0" : "opacity-100 ml-2",
                )}
                onClick={() => onCollapsedChange(!collapsed)}
              >
                <ChevronLeftIcon className="size-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {sections.map((section) => (
            <div key={section.id} className="mb-4 last:mb-0">
              {section.title && (
                <h3
                  className={cn(
                    "mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-300 overflow-hidden whitespace-nowrap",
                    !isExpanded ? "opacity-0 max-h-0 mb-0" : "opacity-100 max-h-8",
                  )}
                >
                  {section.title}
                </h3>
              )}
              <nav className="space-y-1">
                {section.items.map((item) => renderNavItem(item))}
              </nav>
            </div>
          ))}
        </div>

        {/* Footer */}
        {user && (
          <div className="shrink-0 p-4 border-t border-border">
            <div
              className={cn(
                "flex items-center gap-3",
                !isExpanded && "justify-center",
              )}
            >
              <Avatar
                src={user.avatar}
                alt={user.name}
                initials={user.initials}
                size="sm"
                className="shrink-0"
              />
              <div
                className={cn(
                  "min-w-0 transition-all duration-300 overflow-hidden",
                  !isExpanded ? "opacity-0 w-0" : "opacity-100 flex-1",
                )}
              >
                <p className="text-sm font-medium truncate">{user.name}</p>
                {user.role && (
                  <p className="text-xs text-muted-foreground truncate">
                    {user.role}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Expand button when collapsed (manual mode only) */}
        {collapsed && !expandOnHover && onCollapsedChange && (
          <div className="shrink-0 p-4 border-t border-border flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0"
              onClick={() => onCollapsedChange(false)}
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        )}
      </aside>
    );
  },
);
CollapsibleSidebar.displayName = "CollapsibleSidebar";

// ==============================================
// IconSidebar
// ==============================================

export interface IconSidebarItem {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  badge?: number;
  onClick?: () => void;
}

export interface IconSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  logoHref?: string;
  items?: IconSidebarItem[];
  bottomItems?: IconSidebarItem[];
  user?: SidebarUser;
  onItemClick?: (item: IconSidebarItem) => void;
  showTooltips?: boolean;
  position?: "fixed" | "sticky" | "relative";
}

export const IconSidebar = forwardRef<HTMLDivElement, IconSidebarProps>(
  (
    {
      className,
      logo,
      logoHref = "/",
      items = [],
      bottomItems = [],
      user,
      onItemClick,
      showTooltips = true,
      position = "fixed",
      ...props
    },
    ref,
  ) => {
    const renderItem = (item: IconSidebarItem) => (
      <button
        type="button"
        key={item.id}
        onClick={() => {
          item.onClick?.();
          onItemClick?.(item);
        }}
        className={cn(
          "relative flex items-center justify-center size-10 rounded-lg transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring",
          item.active
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-accent",
          item.disabled && "opacity-50 pointer-events-none",
        )}
        title={showTooltips ? item.label : undefined}
      >
        <span className="size-5">{item.icon}</span>
        {item.badge !== undefined && item.badge > 0 && (
          <span className="absolute -top-1 -right-1 size-4 flex items-center justify-center text-[10px] font-medium bg-destructive text-destructive-foreground rounded-full">
            {item.badge > 9 ? "9+" : item.badge}
          </span>
        )}
      </button>
    );

    return (
      <aside
        ref={ref}
        className={cn(
          "flex flex-col items-center h-full w-16 bg-card border-r border-border py-4 z-40",
          position === "fixed" && "fixed inset-y-0 start-0",
          position === "sticky" && "sticky top-0",
          className,
        )}
        {...props}
      >
        {/* Logo */}
        {logo && (
          <a href={logoHref} className="mb-6">
            {logo}
          </a>
        )}

        {/* Main Items */}
        <nav className="flex-1 flex flex-col items-center gap-y-2">
          {items.map(renderItem)}
        </nav>

        {/* Bottom Items */}
        {(bottomItems.length > 0 || user) && (
          <div className="flex flex-col items-center gap-y-2 pt-4 border-t border-border mt-4">
            {bottomItems.map(renderItem)}
            {user && (
              <Avatar
                src={user.avatar}
                alt={user.name}
                initials={user.initials}
                size="sm"
                className="mt-2"
              />
            )}
          </div>
        )}
      </aside>
    );
  },
);
IconSidebar.displayName = "IconSidebar";

// ==============================================
// DoubleSidebar
// ==============================================

export interface DoubleSidebarPrimaryItem {
  id: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
  disabled?: boolean;
  badge?: number;
}

export interface DoubleSidebarSecondarySection {
  title?: string;
  items: SidebarNavItem[];
}

export interface DoubleSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  logoHref?: string;
  primaryItems?: DoubleSidebarPrimaryItem[];
  secondarySections?: DoubleSidebarSecondarySection[];
  selectedPrimaryId?: string;
  onPrimarySelect?: (item: DoubleSidebarPrimaryItem) => void;
  onSecondaryClick?: (item: SidebarNavItem) => void;
  user?: SidebarUser;
  bottomActions?: ReactNode;
  secondaryTitle?: string;
  showSecondary?: boolean;
  position?: "fixed" | "sticky" | "relative";
}

export const DoubleSidebar = forwardRef<HTMLDivElement, DoubleSidebarProps>(
  (
    {
      className,
      logo,
      logoHref = "/",
      primaryItems = [],
      secondarySections = [],
      selectedPrimaryId,
      onPrimarySelect,
      onSecondaryClick,
      user,
      bottomActions,
      secondaryTitle,
      showSecondary = true,
      position = "fixed",
      ...props
    },
    ref,
  ) => {
    const renderSecondaryItem = (item: SidebarNavItem) => (
      <button
        type="button"
        key={item.id}
        onClick={() => {
          item.onClick?.();
          onSecondaryClick?.(item);
        }}
        className={cn(
          "flex items-center gap-x-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring",
          item.active
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-accent",
          item.disabled && "opacity-50 pointer-events-none",
        )}
      >
        {item.icon && (
          <span
            className={cn(
              "shrink-0 size-5",
              item.active ? "text-primary" : "text-muted-foreground",
            )}
          >
            {item.icon}
          </span>
        )}
        <span className="flex-1 truncate text-left">{item.label}</span>
        {item.badge !== undefined && (
          <Badge
            variant={item.badgeVariant || "secondary"}
            size="sm"
            className="shrink-0"
          >
            {item.badge}
          </Badge>
        )}
      </button>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full z-40",
          position === "fixed" && "fixed inset-y-0 start-0",
          position === "sticky" && "sticky top-0",
          className,
        )}
        {...props}
      >
        {/* Primary Sidebar (Icon only) */}
        <aside className="flex flex-col items-center w-16 bg-card border-r border-border py-4">
          {/* Logo */}
          {logo && (
            <a href={logoHref} className="mb-6">
              {logo}
            </a>
          )}

          {/* Primary Items */}
          <nav className="flex-1 flex flex-col items-center gap-y-2">
            {primaryItems.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => onPrimarySelect?.(item)}
                className={cn(
                  "relative flex items-center justify-center size-10 rounded-lg transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-ring",
                  item.id === selectedPrimaryId
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  item.disabled && "opacity-50 pointer-events-none",
                )}
                title={item.label}
              >
                <span className="size-5">{item.icon}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 size-4 flex items-center justify-center text-[10px] font-medium bg-destructive text-destructive-foreground rounded-full">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom */}
          {(bottomActions || user) && (
            <div className="flex flex-col items-center gap-y-2 pt-4 border-t border-border mt-4">
              {bottomActions}
              {user && (
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  initials={user.initials}
                  size="sm"
                />
              )}
            </div>
          )}
        </aside>

        {/* Secondary Sidebar */}
        {showSecondary && secondarySections.length > 0 && (
          <aside className="flex flex-col w-56 bg-card border-r border-border">
            {/* Header */}
            {secondaryTitle && (
              <div className="shrink-0 px-4 py-4 border-b border-border">
                <h2 className="text-sm font-semibold">{secondaryTitle}</h2>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {secondarySections.map((section) => (
                <div
                  key={section.title || section.items[0]?.label}
                  className="mb-4 last:mb-0"
                >
                  {section.title && (
                    <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {section.title}
                    </h3>
                  )}
                  <nav className="space-y-1">
                    {section.items.map(renderSecondaryItem)}
                  </nav>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    );
  },
);
DoubleSidebar.displayName = "DoubleSidebar";

// ==============================================
// FilterSidebar
// ==============================================

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  checked?: boolean;
}

export interface FilterRange {
  min: number;
  max: number;
  currentMin?: number;
  currentMax?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}

export interface FilterSection {
  id: string;
  title: string;
  type: "checkbox" | "radio" | "range" | "search";
  options?: FilterOption[];
  range?: FilterRange;
  searchPlaceholder?: string;
  expanded?: boolean;
}

export interface FilterSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  sections?: FilterSection[];
  onFilterChange?: (sectionId: string, value: unknown) => void;
  onClearAll?: () => void;
  onApply?: () => void;
  showApplyButton?: boolean;
  showClearButton?: boolean;
  activeFilterCount?: number;
  position?: "fixed" | "sticky" | "relative";
}

export const FilterSidebar = forwardRef<HTMLDivElement, FilterSidebarProps>(
  (
    {
      className,
      title = "Filters",
      sections = [],
      onFilterChange,
      onClearAll,
      onApply,
      showApplyButton = true,
      showClearButton = true,
      activeFilterCount = 0,
      position = "relative",
      ...props
    },
    ref,
  ) => {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(
      new Set(sections.filter((s) => s.expanded !== false).map((s) => s.id)),
    );

    const toggleSection = (sectionId: string) => {
      const newExpanded = new Set(expandedSections);
      if (newExpanded.has(sectionId)) {
        newExpanded.delete(sectionId);
      } else {
        newExpanded.add(sectionId);
      }
      setExpandedSections(newExpanded);
    };

    const renderSection = (section: FilterSection) => {
      const isExpanded = expandedSections.has(section.id);

      return (
        <div
          key={section.id}
          className="border-b border-border last:border-b-0"
        >
          {/* Section Header */}
          <button
            type="button"
            onClick={() => toggleSection(section.id)}
            className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            <span>{section.title}</span>
            <ChevronDownIcon
              className={cn(
                "size-4 transition-transform",
                isExpanded && "rotate-180",
              )}
            />
          </button>

          {/* Section Content */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-200",
              isExpanded ? "max-h-96 pb-4" : "max-h-0",
            )}
          >
            <div className="px-4 space-y-2">
              {/* Checkbox Options */}
              {section.type === "checkbox" &&
                section.options?.map((option) => (
                  <span
                    key={option.id}
                    className="flex items-center gap-x-3 cursor-pointer"
                  >
                    <Checkbox
                      checked={option.checked}
                      onCheckedChange={(checked) =>
                        onFilterChange?.(section.id, {
                          optionId: option.id,
                          checked,
                        })
                      }
                    />
                    <span className="text-sm flex-1">{option.label}</span>
                    {option.count !== undefined && (
                      <span className="text-xs text-muted-foreground">
                        ({option.count})
                      </span>
                    )}
                  </span>
                ))}

              {/* Radio Options */}
              {section.type === "radio" &&
                section.options?.map((option) => (
                  <span
                    key={option.id}
                    className="flex items-center gap-x-3 cursor-pointer"
                  >
                    <Radio
                      name={section.id}
                      checked={option.checked}
                      onChange={() =>
                        onFilterChange?.(section.id, {
                          optionId: option.id,
                          checked: true,
                        })
                      }
                    />
                    <span className="text-sm flex-1">{option.label}</span>
                    {option.count !== undefined && (
                      <span className="text-xs text-muted-foreground">
                        ({option.count})
                      </span>
                    )}
                  </span>
                ))}

              {/* Range */}
              {section.type === "range" && section.range && (
                <div className="space-y-3">
                  <div className="flex items-center gap-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={section.range.currentMin ?? section.range.min}
                      onChange={(e) =>
                        onFilterChange?.(section.id, {
                          min: Number(e.target.value),
                          max: section.range?.currentMax ?? section.range?.max,
                        })
                      }
                      size="sm"
                      className="w-full"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={section.range.currentMax ?? section.range.max}
                      onChange={(e) =>
                        onFilterChange?.(section.id, {
                          min: section.range?.currentMin ?? section.range?.min,
                          max: Number(e.target.value),
                        })
                      }
                      size="sm"
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {/* Search */}
              {section.type === "search" && (
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={section.searchPlaceholder || "Search..."}
                    onChange={(e) =>
                      onFilterChange?.(section.id, e.target.value)
                    }
                    className="pl-9"
                    size="sm"
                  />
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    return (
      <aside
        ref={ref}
        className={cn(
          "flex flex-col w-64 bg-card border-r border-border",
          position === "fixed" && "fixed inset-y-0 start-0 z-40",
          position === "sticky" && "sticky top-0 h-fit",
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-4 py-4 border-b border-border">
          <div className="flex items-center gap-x-2">
            <FilterIcon className="size-5" />
            <h2 className="font-semibold">{title}</h2>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" size="sm">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          {showClearButton && activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-primary hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Filter Sections */}
        <div className="flex-1 overflow-y-auto">
          {sections.map(renderSection)}
        </div>

        {/* Apply Button */}
        {showApplyButton && (
          <div className="shrink-0 p-4 border-t border-border">
            <Button variant="primary" className="w-full" onClick={onApply}>
              Apply Filters
            </Button>
          </div>
        )}
      </aside>
    );
  },
);
FilterSidebar.displayName = "FilterSidebar";

// ==============================================
// SettingsSidebar
// ==============================================

export interface SettingsNavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  description?: string;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  badge?: ReactNode;
  onClick?: () => void;
}

export interface SettingsNavSection {
  id: string;
  title?: string;
  items: SettingsNavItem[];
}

export interface SettingsSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  sections?: SettingsNavSection[];
  onItemClick?: (item: SettingsNavItem) => void;
  footer?: ReactNode;
  position?: "fixed" | "sticky" | "relative";
}

export const SettingsSidebar = forwardRef<HTMLDivElement, SettingsSidebarProps>(
  (
    {
      className,
      title = "Settings",
      description,
      sections = [],
      onItemClick,
      footer,
      position = "relative",
      ...props
    },
    ref,
  ) => {
    return (
      <aside
        ref={ref}
        className={cn(
          "flex flex-col w-64 bg-card border-r border-border",
          position === "fixed" && "fixed inset-y-0 start-0 z-40",
          position === "sticky" && "sticky top-0 h-fit",
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="shrink-0 px-4 py-6 border-b border-border">
          <h2 className="text-lg font-semibold">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto py-4">
          {sections.map((section) => (
            <div key={section.id} className="mb-6 last:mb-0">
              {section.title && (
                <h3 className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h3>
              )}
              <nav className="space-y-1">
                {section.items.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      item.onClick?.();
                      onItemClick?.(item);
                    }}
                    className={cn(
                      "flex items-start gap-x-3 w-full px-4 py-2.5 text-left transition-colors",
                      "focus:outline-none focus:bg-accent",
                      item.active
                        ? "bg-accent text-foreground border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                      item.disabled && "opacity-50 pointer-events-none",
                    )}
                  >
                    {item.icon && (
                      <span
                        className={cn(
                          "shrink-0 size-5 mt-0.5",
                          item.active
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}
                      >
                        {item.icon}
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-x-2">
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                        {item.badge}
                      </div>
                      {item.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Footer */}
        {footer && (
          <div className="shrink-0 px-4 py-4 border-t border-border">
            {footer}
          </div>
        )}
      </aside>
    );
  },
);
SettingsSidebar.displayName = "SettingsSidebar";

// Re-export types from Sidebar
export type {
  SidebarGroupProps,
  SidebarItemProps,
  SidebarLogoProps,
  SidebarProps,
  SidebarSectionProps,
  SidebarToggleProps,
} from "@/components/organisms/Layout/Sidebar";
