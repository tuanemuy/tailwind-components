import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { ChevronDownIcon, ChevronRightIcon } from "@/lib/icons";

// Sidebar Context
interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar components must be used within a Sidebar");
  }
  return context;
}

// Sidebar variants and sizes
type SidebarVariant = "default" | "bordered" | "elevated";
type SidebarWidth = "mini" | "compact" | "default" | "wide";

const sidebarVariants: Record<SidebarVariant, string> = {
  default: "bg-card",
  bordered: "bg-card border-r border-border",
  elevated: "bg-card shadow-lg",
};

const sidebarWidths: Record<SidebarWidth, { expanded: string; collapsed: string }> = {
  mini: { expanded: "w-16", collapsed: "w-16" },
  compact: { expanded: "w-56", collapsed: "w-16" },
  default: { expanded: "w-64", collapsed: "w-16" },
  wide: { expanded: "w-80", collapsed: "w-16" },
};

// Main Sidebar component
export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SidebarVariant;
  width?: SidebarWidth;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  collapsible?: boolean;
  fixed?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      variant = "bordered",
      width = "default",
      collapsed: controlledCollapsed,
      onCollapsedChange,
      collapsible = false,
      fixed = true,
      header,
      footer,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalCollapsed, setInternalCollapsed] = useState(false);
    const collapsed = controlledCollapsed ?? internalCollapsed;

    const setCollapsed = useCallback(
      (value: boolean) => {
        if (onCollapsedChange) {
          onCollapsedChange(value);
        } else {
          setInternalCollapsed(value);
        }
      },
      [onCollapsedChange],
    );

    return (
      <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
        <aside
          ref={ref}
          className={cn(
            "flex flex-col h-full transition-all duration-300",
            fixed && "fixed inset-y-0 start-0 z-40",
            sidebarVariants[variant],
            collapsible
              ? collapsed
                ? sidebarWidths[width].collapsed
                : sidebarWidths[width].expanded
              : sidebarWidths[width].expanded,
            className,
          )}
          {...props}
        >
          {/* Header */}
          {header && (
            <div className="shrink-0 p-4 border-b border-border">{header}</div>
          )}

          {/* Navigation content */}
          <div
            className={cn(
              "flex-1 overflow-y-auto p-4",
              "[&::-webkit-scrollbar]:w-2",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-track]:bg-transparent",
              "[&::-webkit-scrollbar-thumb]:bg-muted-foreground/20",
            )}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="shrink-0 p-4 border-t border-border">{footer}</div>
          )}
        </aside>
      </SidebarContext.Provider>
    );
  },
);
Sidebar.displayName = "Sidebar";

// SidebarSection component for grouping nav items
export interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, title, children, ...props }, ref) => {
    const { collapsed } = useSidebarContext();

    return (
      <div ref={ref} className={cn("mb-4 last:mb-0", className)} {...props}>
        {title && !collapsed && (
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </h3>
        )}
        <nav className="space-y-1">{children}</nav>
      </div>
    );
  },
);
SidebarSection.displayName = "SidebarSection";

// SidebarItem component
export interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  label: string;
  badge?: string | number;
  badgeVariant?: "default" | "secondary" | "destructive" | "success" | "warning";
  active?: boolean;
  href?: string;
  as?: "button" | "a";
}

export const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  (
    {
      className,
      icon,
      label,
      badge,
      badgeVariant = "secondary",
      active,
      href,
      as = href ? "a" : "button",
      ...props
    },
    ref,
  ) => {
    const { collapsed } = useSidebarContext();
    const Component = as === "a" ? "a" : "button";

    const content = (
      <>
        {icon && (
          <span
            className={cn(
              "shrink-0 size-5",
              active ? "text-primary" : "text-muted-foreground",
            )}
          >
            {icon}
          </span>
        )}
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-left">{label}</span>
            {badge !== undefined && (
              <Badge variant={badgeVariant} size="sm" className="shrink-0">
                {badge}
              </Badge>
            )}
          </>
        )}
      </>
    );

    const commonClassName = cn(
      "flex items-center gap-x-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-ring",
      active
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-accent",
      collapsed && "justify-center",
      className,
    );

    if (Component === "a") {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={commonClassName}
          title={collapsed ? label : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={commonClassName}
        title={collapsed ? label : undefined}
        {...props}
      >
        {content}
      </button>
    );
  },
);
SidebarItem.displayName = "SidebarItem";

// SidebarGroup component for collapsible groups
export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  label: string;
  defaultOpen?: boolean;
}

export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, icon, label, defaultOpen = false, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const { collapsed } = useSidebarContext();

    if (collapsed) {
      return (
        <div ref={ref} className={className} {...props}>
          <button
            className={cn(
              "flex items-center justify-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              "text-muted-foreground hover:text-foreground hover:bg-accent",
              "focus:outline-none focus:ring-2 focus:ring-ring",
            )}
            title={label}
          >
            {icon && <span className="size-5">{icon}</span>}
          </button>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("space-y-1", className)} {...props}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-x-3 w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
            "text-muted-foreground hover:text-foreground hover:bg-accent",
            "focus:outline-none focus:ring-2 focus:ring-ring",
          )}
        >
          {icon && <span className="shrink-0 size-5">{icon}</span>}
          <span className="flex-1 truncate text-left">{label}</span>
          <span className="shrink-0">
            {isOpen ? (
              <ChevronDownIcon className="size-4" />
            ) : (
              <ChevronRightIcon className="size-4" />
            )}
          </span>
        </button>
        <div
          className={cn(
            "overflow-hidden transition-all duration-200",
            isOpen ? "max-h-96" : "max-h-0",
          )}
        >
          <div className="pl-8 space-y-1">{children}</div>
        </div>
      </div>
    );
  },
);
SidebarGroup.displayName = "SidebarGroup";

// SidebarToggle component for collapse button
export interface SidebarToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SidebarToggle = forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ className, ...props }, ref) => {
    const { collapsed, setCollapsed } = useSidebarContext();

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="sm"
        className={cn("size-8 p-0", className)}
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        {...props}
      >
        <ChevronRightIcon
          className={cn("size-4 transition-transform", !collapsed && "rotate-180")}
        />
      </Button>
    );
  },
);
SidebarToggle.displayName = "SidebarToggle";

// SidebarLogo component
export interface SidebarLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  text?: string;
  href?: string;
}

export const SidebarLogo = forwardRef<HTMLDivElement, SidebarLogoProps>(
  ({ className, src, alt = "Logo", text, href, children, ...props }, ref) => {
    const { collapsed } = useSidebarContext();

    const content = children || (
      <>
        {src && <img src={src} alt={alt} className="h-8 w-auto" />}
        {text && !collapsed && (
          <span className="text-lg font-semibold text-foreground">{text}</span>
        )}
      </>
    );

    if (href) {
      return (
        <div ref={ref} className={className} {...props}>
          <a
            href={href}
            className="flex items-center gap-x-2 focus:outline-none focus:opacity-80"
          >
            {content}
          </a>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-x-2", className)}
        {...props}
      >
        {content}
      </div>
    );
  },
);
SidebarLogo.displayName = "SidebarLogo";
