import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Layout variants for different page types
type LayoutVariant = "default" | "dashboard" | "centered" | "full";

// Main PageLayout component
export interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LayoutVariant;
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  sidebarPosition?: "left" | "right";
  sidebarWidth?: "mini" | "compact" | "default" | "wide";
  sidebarCollapsed?: boolean;
}

const sidebarWidthValues = {
  mini: "4rem", // w-16
  compact: "14rem", // w-56
  default: "16rem", // w-64
  wide: "20rem", // w-80
};

export const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>(
  (
    {
      className,
      variant = "default",
      header,
      sidebar,
      footer,
      sidebarPosition = "left",
      sidebarWidth = "default",
      sidebarCollapsed = false,
      children,
      ...props
    },
    ref,
  ) => {
    const effectiveWidth = sidebarCollapsed ? "mini" : sidebarWidth;
    const sidebarPadding = sidebar ? sidebarWidthValues[effectiveWidth] : "0";

    // Different layout structures based on variant
    if (variant === "dashboard") {
      return (
        <div
          ref={ref}
          className={cn("min-h-screen bg-background", className)}
          {...props}
        >
          {/* Sidebar */}
          {sidebar}

          {/* Main wrapper with sidebar offset */}
          <div
            className={cn(
              "flex flex-col min-h-screen transition-all duration-300",
            )}
            style={{
              [sidebarPosition === "left" ? "paddingLeft" : "paddingRight"]:
                sidebarPadding,
            }}
          >
            {/* Header */}
            {header}

            {/* Main content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            {footer}
          </div>
        </div>
      );
    }

    if (variant === "centered") {
      return (
        <div
          ref={ref}
          className={cn(
            "min-h-screen flex flex-col items-center justify-center bg-background",
            className,
          )}
          {...props}
        >
          {header}
          <main className="flex-1 flex items-center justify-center w-full">
            {children}
          </main>
          {footer}
        </div>
      );
    }

    if (variant === "full") {
      return (
        <div
          ref={ref}
          className={cn("min-h-screen flex flex-col bg-background", className)}
          {...props}
        >
          {header}
          <main className="flex-1">{children}</main>
          {footer}
        </div>
      );
    }

    // Default layout
    return (
      <div
        ref={ref}
        className={cn("min-h-screen flex flex-col bg-background", className)}
        {...props}
      >
        {header}
        <div className="flex-1 flex">
          {sidebar && sidebarPosition === "left" && sidebar}
          <main className="flex-1">{children}</main>
          {sidebar && sidebarPosition === "right" && sidebar}
        </div>
        {footer}
      </div>
    );
  },
);
PageLayout.displayName = "PageLayout";

// PageContent component for main content area
export interface PageContentProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "5xl" | "6xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  centered?: boolean;
}

const contentMaxWidthClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-screen-2xl",
  "4xl": "max-w-screen-2xl",
  "5xl": "max-w-screen-2xl",
  "6xl": "max-w-screen-2xl",
  full: "max-w-full",
};

const contentPaddingClasses = {
  none: "",
  sm: "px-4 py-4 sm:px-6",
  md: "px-4 py-6 sm:px-6 lg:px-8",
  lg: "px-4 py-8 sm:px-6 lg:px-8",
};

export const PageContent = forwardRef<HTMLDivElement, PageContentProps>(
  (
    {
      className,
      maxWidth = "xl",
      padding = "md",
      centered = true,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          contentPaddingClasses[padding],
          centered && contentMaxWidthClasses[maxWidth],
          centered && "mx-auto",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
PageContent.displayName = "PageContent";

// PageHeader component for page titles
export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumb?: ReactNode;
}

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  (
    { className, title, description, actions, breadcrumb, children, ...props },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("mb-6 space-y-4", className)} {...props}>
        {breadcrumb && <div className="mb-2">{breadcrumb}</div>}
        {children || (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-2 shrink-0">{actions}</div>
            )}
          </div>
        )}
      </div>
    );
  },
);
PageHeader.displayName = "PageHeader";

// PageSection component for content sections
export interface PageSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  actions?: ReactNode;
}

export const PageSection = forwardRef<HTMLElement, PageSectionProps>(
  ({ className, title, description, actions, children, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("mb-8 last:mb-0", className)} {...props}>
        {(title || description || actions) && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              {title && (
                <h2 className="text-lg font-semibold text-foreground">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-2 shrink-0">{actions}</div>
            )}
          </div>
        )}
        {children}
      </section>
    );
  },
);
PageSection.displayName = "PageSection";
