import { forwardRef, type ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { MenuIcon, XIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

// Header variants
type HeaderVariant = "default" | "bordered" | "elevated" | "transparent";

const headerVariants: Record<HeaderVariant, string> = {
  default: "bg-card",
  bordered: "bg-card border-b border-border",
  elevated: "bg-card shadow-sm",
  transparent: "bg-transparent",
};

// Main Header component
export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  variant?: HeaderVariant;
  sticky?: boolean;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  logo?: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
  userMenu?: ReactNode;
  mobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
  showMobileMenuButton?: boolean;
}

const maxWidthClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    {
      className,
      variant = "bordered",
      sticky = true,
      maxWidth = "xl",
      logo,
      navigation,
      actions,
      userMenu,
      mobileMenuOpen,
      onMobileMenuToggle,
      showMobileMenuButton = true,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          "z-50",
          sticky && "sticky top-0 inset-x-0",
          headerVariants[variant],
          className,
        )}
        {...props}
      >
        <nav
          className={cn(
            "w-full mx-auto px-4 sm:px-6 lg:px-8 py-3",
            maxWidthClasses[maxWidth],
          )}
        >
          {children || (
            <div className="flex items-center justify-between gap-x-4">
              {/* Logo section */}
              <div className="flex items-center gap-x-4">
                {logo && <div className="shrink-0">{logo}</div>}
              </div>

              {/* Desktop navigation - hidden on mobile */}
              {navigation && (
                <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
                  {navigation}
                </div>
              )}

              {/* Actions and user menu */}
              <div className="flex items-center gap-x-2">
                {actions && (
                  <div className="hidden md:flex md:items-center md:gap-x-2">
                    {actions}
                  </div>
                )}
                {userMenu && <div className="shrink-0">{userMenu}</div>}

                {/* Mobile menu button */}
                {showMobileMenuButton && onMobileMenuToggle && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden size-9 p-0"
                    onClick={onMobileMenuToggle}
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileMenuOpen}
                  >
                    {mobileMenuOpen ? (
                      <XIcon className="size-5" />
                    ) : (
                      <MenuIcon className="size-5" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </nav>

        {/* Mobile navigation - collapsible */}
        {navigation && showMobileMenuButton && mobileMenuOpen !== undefined && (
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
              mobileMenuOpen ? "max-h-screen" : "max-h-0",
            )}
          >
            <div className="px-4 pb-4 space-y-2">{navigation}</div>
          </div>
        )}
      </header>
    );
  },
);
Header.displayName = "Header";

// HeaderNav component for navigation items
export interface HeaderNavProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const HeaderNav = forwardRef<HTMLDivElement, HeaderNavProps>(
  ({ className, orientation = "horizontal", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal"
            ? "flex-row items-center gap-x-1"
            : "flex-col gap-y-1",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
HeaderNav.displayName = "HeaderNav";

// HeaderNavItem component
export interface HeaderNavItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  disabled?: boolean;
}

export const HeaderNavItem = forwardRef<HTMLAnchorElement, HeaderNavItemProps>(
  ({ className, active, disabled, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          active
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-accent",
          disabled && "opacity-50 pointer-events-none",
          className,
        )}
        aria-current={active ? "page" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  },
);
HeaderNavItem.displayName = "HeaderNavItem";

// HeaderLogo component
export interface HeaderLogoProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  src?: string;
  alt?: string;
  text?: string;
}

export const HeaderLogo = forwardRef<HTMLAnchorElement, HeaderLogoProps>(
  ({ className, src, alt = "Logo", text, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "flex items-center gap-x-2 text-xl font-semibold text-foreground",
          "focus:outline-none focus:opacity-80",
          className,
        )}
        {...props}
      >
        {children || (
          <>
            {src && <img src={src} alt={alt} className="h-8 w-auto" />}
            {text && <span>{text}</span>}
          </>
        )}
      </a>
    );
  },
);
HeaderLogo.displayName = "HeaderLogo";

// HeaderActions component for action buttons
export interface HeaderActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const HeaderActions = forwardRef<HTMLDivElement, HeaderActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-x-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
HeaderActions.displayName = "HeaderActions";
