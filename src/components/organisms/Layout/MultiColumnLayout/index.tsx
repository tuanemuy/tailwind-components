"use client";

import { createContext, forwardRef, type ReactNode, useContext } from "react";
import { cn } from "@/components/utils";

// =============================================================================
// Context for sharing layout state
// =============================================================================

interface MultiColumnLayoutContextValue {
  columns: number;
  gap: "none" | "sm" | "md" | "lg" | "xl";
  variant:
    | "equal"
    | "sidebar-left"
    | "sidebar-right"
    | "wide-center"
    | "custom";
}

const MultiColumnLayoutContext =
  createContext<MultiColumnLayoutContextValue | null>(null);

const useMultiColumnLayoutContext = () => {
  const context = useContext(MultiColumnLayoutContext);
  if (!context) {
    throw new Error(
      "MultiColumnLayout components must be used within MultiColumnLayout",
    );
  }
  return context;
};

// =============================================================================
// MultiColumnLayout - Main container
// =============================================================================

export interface MultiColumnLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4 | 5;
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  variant?:
    | "equal"
    | "sidebar-left"
    | "sidebar-right"
    | "wide-center"
    | "custom";
  responsive?: boolean;
  reverseOnMobile?: boolean;
}

const gapClasses = {
  none: "gap-0",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
  xl: "gap-12",
};

const columnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-5",
};

export const MultiColumnLayout = forwardRef<
  HTMLDivElement,
  MultiColumnLayoutProps
>(
  (
    {
      className,
      columns = 2,
      gap = "md",
      variant = "equal",
      responsive = true,
      reverseOnMobile = false,
      children,
      ...props
    },
    ref,
  ) => {
    const getVariantClasses = () => {
      if (!responsive) {
        return `grid-cols-${columns}`;
      }

      switch (variant) {
        case "sidebar-left":
          return "grid-cols-1 lg:grid-cols-[280px_1fr]";
        case "sidebar-right":
          return "grid-cols-1 lg:grid-cols-[1fr_280px]";
        case "wide-center":
          if (columns === 3) {
            return "grid-cols-1 lg:grid-cols-[1fr_2fr_1fr]";
          }
          return columnClasses[columns];
        case "custom":
          return "";
        default:
          return columnClasses[columns];
      }
    };

    return (
      <MultiColumnLayoutContext.Provider value={{ columns, gap, variant }}>
        <div
          ref={ref}
          className={cn(
            "grid w-full",
            getVariantClasses(),
            gapClasses[gap],
            reverseOnMobile && "flex flex-col-reverse lg:grid",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </MultiColumnLayoutContext.Provider>
    );
  },
);
MultiColumnLayout.displayName = "MultiColumnLayout";

// =============================================================================
// LayoutColumn - Individual column
// =============================================================================

export interface LayoutColumnProps
  extends React.HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 5;
  sticky?: boolean;
  stickyOffset?: string;
  order?: number;
  mobileOrder?: number;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const LayoutColumn = forwardRef<HTMLDivElement, LayoutColumnProps>(
  (
    {
      className,
      span,
      sticky = false,
      stickyOffset = "0px",
      order,
      mobileOrder,
      padding = "none",
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const spanClass = span ? `col-span-${span}` : "";
    const orderClass = order !== undefined ? `lg:order-${order}` : "";
    const mobileOrderClass =
      mobileOrder !== undefined ? `order-${mobileOrder}` : "";

    return (
      <div
        ref={ref}
        className={cn(
          spanClass,
          orderClass,
          mobileOrderClass,
          paddingClasses[padding],
          sticky && "lg:sticky lg:self-start",
          className,
        )}
        style={{
          ...style,
          ...(sticky && { top: stickyOffset }),
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
LayoutColumn.displayName = "LayoutColumn";

// =============================================================================
// LayoutSidebar - Sidebar column variant
// =============================================================================

export interface LayoutSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  position?: "left" | "right";
  width?: "narrow" | "default" | "wide";
  sticky?: boolean;
  stickyOffset?: string;
  collapsible?: boolean;
  collapsed?: boolean;
}

const sidebarWidthClasses = {
  narrow: "w-full lg:w-64",
  default: "w-full lg:w-80",
  wide: "w-full lg:w-96",
};

export const LayoutSidebar = forwardRef<HTMLDivElement, LayoutSidebarProps>(
  (
    {
      className,
      position = "left",
      width = "default",
      sticky = true,
      stickyOffset = "0px",
      collapsible = false,
      collapsed = false,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <aside
        ref={ref}
        className={cn(
          sidebarWidthClasses[width],
          sticky && "lg:sticky lg:self-start",
          collapsible && collapsed && "lg:w-16",
          position === "right" && "order-last",
          "transition-all duration-300",
          className,
        )}
        style={{
          ...style,
          ...(sticky && { top: stickyOffset }),
        }}
        {...props}
      >
        {children}
      </aside>
    );
  },
);
LayoutSidebar.displayName = "LayoutSidebar";

// =============================================================================
// LayoutMain - Main content area
// =============================================================================

export interface LayoutMainProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  centered?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const maxWidthClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export const LayoutMain = forwardRef<HTMLDivElement, LayoutMainProps>(
  (
    {
      className,
      maxWidth = "full",
      centered = false,
      padding = "none",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <main
        ref={ref}
        className={cn(
          "flex-1 min-w-0",
          maxWidthClasses[maxWidth],
          centered && "mx-auto",
          paddingClasses[padding],
          className,
        )}
        {...props}
      >
        {children}
      </main>
    );
  },
);
LayoutMain.displayName = "LayoutMain";

// =============================================================================
// LayoutAside - Secondary sidebar/aside
// =============================================================================

export interface LayoutAsideProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: "narrow" | "default" | "wide";
  sticky?: boolean;
  stickyOffset?: string;
  hideOnMobile?: boolean;
}

const asideWidthClasses = {
  narrow: "w-full lg:w-56",
  default: "w-full lg:w-72",
  wide: "w-full lg:w-80",
};

export const LayoutAside = forwardRef<HTMLDivElement, LayoutAsideProps>(
  (
    {
      className,
      width = "default",
      sticky = true,
      stickyOffset = "0px",
      hideOnMobile = false,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <aside
        ref={ref}
        className={cn(
          asideWidthClasses[width],
          sticky && "lg:sticky lg:self-start",
          hideOnMobile && "hidden lg:block",
          className,
        )}
        style={{
          ...style,
          ...(sticky && { top: stickyOffset }),
        }}
        {...props}
      >
        {children}
      </aside>
    );
  },
);
LayoutAside.displayName = "LayoutAside";

// =============================================================================
// Pre-composed layouts
// =============================================================================

// TwoColumnLayout - Simple two column layout
export interface TwoColumnLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  leftColumn: ReactNode;
  rightColumn: ReactNode;
  gap?: "sm" | "md" | "lg" | "xl";
  ratio?: "1:1" | "1:2" | "2:1" | "1:3" | "3:1";
  reverseOnMobile?: boolean;
}

const ratioClasses = {
  "1:1": "lg:grid-cols-2",
  "1:2": "lg:grid-cols-[1fr_2fr]",
  "2:1": "lg:grid-cols-[2fr_1fr]",
  "1:3": "lg:grid-cols-[1fr_3fr]",
  "3:1": "lg:grid-cols-[3fr_1fr]",
};

export const TwoColumnLayout = forwardRef<HTMLDivElement, TwoColumnLayoutProps>(
  (
    {
      className,
      leftColumn,
      rightColumn,
      gap = "md",
      ratio = "1:1",
      reverseOnMobile = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1",
          ratioClasses[ratio],
          gapClasses[gap],
          reverseOnMobile && "flex flex-col-reverse lg:grid",
          className,
        )}
        {...props}
      >
        <div>{leftColumn}</div>
        <div>{rightColumn}</div>
      </div>
    );
  },
);
TwoColumnLayout.displayName = "TwoColumnLayout";

// ThreeColumnLayout - Three column layout with sticky sidebars
export interface ThreeColumnLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  leftSidebar?: ReactNode;
  mainContent: ReactNode;
  rightSidebar?: ReactNode;
  gap?: "sm" | "md" | "lg" | "xl";
  stickyOffset?: string;
  leftWidth?: "narrow" | "default" | "wide";
  rightWidth?: "narrow" | "default" | "wide";
}

export const ThreeColumnLayout = forwardRef<
  HTMLDivElement,
  ThreeColumnLayoutProps
>(
  (
    {
      className,
      leftSidebar,
      mainContent,
      rightSidebar,
      gap = "md",
      stickyOffset = "0px",
      leftWidth = "default",
      rightWidth = "default",
      ...props
    },
    ref,
  ) => {
    const hasLeft = !!leftSidebar;
    const hasRight = !!rightSidebar;

    let gridCols = "grid-cols-1";
    if (hasLeft && hasRight) {
      gridCols = "lg:grid-cols-[280px_1fr_280px]";
    } else if (hasLeft) {
      gridCols = "lg:grid-cols-[280px_1fr]";
    } else if (hasRight) {
      gridCols = "lg:grid-cols-[1fr_280px]";
    }

    return (
      <div
        ref={ref}
        className={cn("grid", gridCols, gapClasses[gap], className)}
        {...props}
      >
        {hasLeft && (
          <LayoutSidebar
            position="left"
            width={leftWidth}
            sticky
            stickyOffset={stickyOffset}
          >
            {leftSidebar}
          </LayoutSidebar>
        )}
        <LayoutMain>{mainContent}</LayoutMain>
        {hasRight && (
          <LayoutAside width={rightWidth} sticky stickyOffset={stickyOffset}>
            {rightSidebar}
          </LayoutAside>
        )}
      </div>
    );
  },
);
ThreeColumnLayout.displayName = "ThreeColumnLayout";

// HolyGrailLayout - Classic holy grail layout
export interface HolyGrailLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  leftSidebar?: ReactNode;
  mainContent: ReactNode;
  rightSidebar?: ReactNode;
  footer?: ReactNode;
  stickyHeader?: boolean;
  stickyFooter?: boolean;
  gap?: "sm" | "md" | "lg";
}

export const HolyGrailLayout = forwardRef<HTMLDivElement, HolyGrailLayoutProps>(
  (
    {
      className,
      header,
      leftSidebar,
      mainContent,
      rightSidebar,
      footer,
      stickyHeader = false,
      stickyFooter = false,
      gap = "md",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("min-h-screen flex flex-col", className)}
        {...props}
      >
        {header && (
          <header
            className={cn(
              "shrink-0",
              stickyHeader && "sticky top-0 z-50 bg-background",
            )}
          >
            {header}
          </header>
        )}
        <ThreeColumnLayout
          leftSidebar={leftSidebar}
          mainContent={mainContent}
          rightSidebar={rightSidebar}
          gap={gap}
          stickyOffset={stickyHeader ? "64px" : "0px"}
          className="flex-1"
        />
        {footer && (
          <footer
            className={cn(
              "shrink-0",
              stickyFooter && "sticky bottom-0 z-50 bg-background",
            )}
          >
            {footer}
          </footer>
        )}
      </div>
    );
  },
);
HolyGrailLayout.displayName = "HolyGrailLayout";

// MasonryColumnLayout - Masonry-style multi-column
export interface MasonryColumnLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4 | 5;
  gap?: "sm" | "md" | "lg";
}

const masonryColumnClasses = {
  2: "columns-1 md:columns-2",
  3: "columns-1 md:columns-2 lg:columns-3",
  4: "columns-1 md:columns-2 lg:columns-4",
  5: "columns-1 md:columns-2 lg:columns-5",
};

const masonryGapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export const MasonryColumnLayout = forwardRef<
  HTMLDivElement,
  MasonryColumnLayoutProps
>(({ className, columns = 3, gap = "md", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        masonryColumnClasses[columns],
        masonryGapClasses[gap],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
MasonryColumnLayout.displayName = "MasonryColumnLayout";

// MasonryItem - Item for masonry layout
export interface MasonryColumnItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  breakInside?: "auto" | "avoid";
}

export const MasonryColumnItem = forwardRef<
  HTMLDivElement,
  MasonryColumnItemProps
>(({ className, breakInside = "avoid", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        breakInside === "avoid" && "break-inside-avoid",
        "mb-4 lg:mb-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
MasonryColumnItem.displayName = "MasonryColumnItem";

// =============================================================================
// Exports
// =============================================================================

export { useMultiColumnLayoutContext };
