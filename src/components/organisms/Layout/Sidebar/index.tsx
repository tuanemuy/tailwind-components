import {
  createContext,
  forwardRef,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { ChevronDownIcon, ChevronRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

// Sidebar Context
interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  visuallyCollapsed: boolean; // true when collapsed or width="mini"
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

const sidebarWidths: Record<
  SidebarWidth,
  { expanded: string; collapsed: string }
> = {
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
  /** Show border below header. Typically used when header contains profile or select elements. Default: false */
  showHeaderBorder?: boolean;
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
      showHeaderBorder = false,
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

    // For mini sidebar, always treat as visually collapsed (show only icons)
    const visuallyCollapsed = collapsed || width === "mini";

    return (
      <SidebarContext.Provider value={{ collapsed, setCollapsed, visuallyCollapsed }}>
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
            <div
              className={cn(
                "shrink-0 p-4",
                showHeaderBorder && "border-b border-border",
              )}
            >
              {header}
            </div>
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
export interface SidebarSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, title, children, ...props }, ref) => {
    const { visuallyCollapsed } = useSidebarContext();

    return (
      <div ref={ref} className={cn("mb-4 last:mb-0", className)} {...props}>
        {title && (
          <h3
            className={cn(
              "mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all duration-300 overflow-hidden whitespace-nowrap",
              visuallyCollapsed ? "opacity-0 max-h-0 mb-0" : "opacity-100 max-h-8",
            )}
          >
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
  badgeVariant?:
    | "default"
    | "secondary"
    | "destructive"
    | "success"
    | "warning";
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
    const { visuallyCollapsed } = useSidebarContext();
    const Component = as === "a" ? "a" : "button";

    const content = (
      <>
        {icon && (
          <span
            className={cn(
              "shrink-0 text-xl",
              active ? "text-primary" : "text-muted-foreground",
            )}
          >
            {icon}
          </span>
        )}
        <div
          className={cn(
            "flex items-center gap-3 overflow-hidden transition-all duration-300",
            visuallyCollapsed ? "w-0 opacity-0 ml-0" : "flex-1 opacity-100 ml-3",
          )}
        >
          <span className="flex-1 truncate text-left">{label}</span>
          {badge !== undefined && (
            <Badge variant={badgeVariant} size="sm" className="shrink-0">
              {badge}
            </Badge>
          )}
        </div>
      </>
    );

    const commonClassName = cn(
      "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
      "focus:outline-none focus:ring-2 focus:ring-ring",
      active
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:text-foreground hover:bg-accent",
      visuallyCollapsed && "justify-center",
      className,
    );

    if (Component === "a") {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={commonClassName}
          title={visuallyCollapsed ? label : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        className={commonClassName}
        title={visuallyCollapsed ? label : undefined}
        {...props}
      >
        {content}
      </button>
    );
  },
);
SidebarItem.displayName = "SidebarItem";

// SidebarGroup component for collapsible groups
export interface SidebarGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  label: string;
  defaultOpen?: boolean;
}

export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  (
    { className, icon, label, defaultOpen = false, children, ...props },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const { visuallyCollapsed } = useSidebarContext();

    return (
      <div ref={ref} className={cn("space-y-1", className)} {...props}>
        <button
          type="button"
          onClick={() => !visuallyCollapsed && setIsOpen(!isOpen)}
          className={cn(
            "flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
            "text-muted-foreground hover:text-foreground hover:bg-accent",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            visuallyCollapsed && "justify-center",
          )}
          title={visuallyCollapsed ? label : undefined}
        >
          {icon && <span className="shrink-0 text-xl">{icon}</span>}
          <div
            className={cn(
              "flex items-center gap-3 overflow-hidden transition-all duration-300",
              visuallyCollapsed ? "w-0 opacity-0 ml-0" : "flex-1 opacity-100 ml-3",
            )}
          >
            <span className="flex-1 truncate text-left">{label}</span>
            <span className="shrink-0">
              {isOpen ? (
                <ChevronDownIcon className="size-4" />
              ) : (
                <ChevronRightIcon className="size-4" />
              )}
            </span>
          </div>
        </button>
        <div
          className={cn(
            "overflow-hidden transition-all duration-200",
            isOpen && !visuallyCollapsed ? "max-h-96" : "max-h-0",
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
          className={cn(
            "size-4 transition-transform",
            !collapsed && "rotate-180",
          )}
        />
      </Button>
    );
  },
);
SidebarToggle.displayName = "SidebarToggle";

// SidebarHeader component for proper header layout handling
export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  showToggle?: boolean;
}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, logo, showToggle = true, children, ...props }, ref) => {
    const { visuallyCollapsed } = useSidebarContext();

    // If children are provided, use them directly
    if (children) {
      return (
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      );
    }

    // Always use the same layout with transition
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <div
          className={cn(
            "transition-all duration-300 overflow-hidden",
            visuallyCollapsed ? "opacity-0 w-0 mr-0" : "opacity-100 w-auto mr-auto",
          )}
        >
          {logo}
        </div>
        {showToggle && <SidebarToggle />}
      </div>
    );
  },
);
SidebarHeader.displayName = "SidebarHeader";

// SidebarLogo component
export interface SidebarLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  text?: string;
  href?: string;
}

export const SidebarLogo = forwardRef<HTMLDivElement, SidebarLogoProps>(
  ({ className, src, alt = "Logo", text, href, children, ...props }, ref) => {
    const { visuallyCollapsed } = useSidebarContext();

    const content = children || (
      <>
        {src && <img src={src} alt={alt} className="h-8 w-auto shrink-0" />}
        {text && (
          <span
            className={cn(
              "text-lg font-semibold text-foreground whitespace-nowrap transition-all duration-300",
              visuallyCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto",
            )}
          >
            {text}
          </span>
        )}
      </>
    );

    if (href) {
      return (
        <div ref={ref} className={className} {...props}>
          <a
            href={href}
            className="flex items-center gap-x-2 focus:outline-none focus:opacity-80 overflow-hidden"
          >
            {content}
          </a>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-x-2 overflow-hidden", className)}
        {...props}
      >
        {content}
      </div>
    );
  },
);
SidebarLogo.displayName = "SidebarLogo";
