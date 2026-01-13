import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/components/atoms/Link";

// Footer variants
type FooterVariant = "default" | "bordered" | "minimal" | "stacked";

const footerVariants: Record<FooterVariant, string> = {
  default: "bg-card",
  bordered: "bg-card border-t border-border",
  minimal: "bg-transparent",
  stacked: "bg-muted",
};

// Main Footer component
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  variant?: FooterVariant;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  logo?: ReactNode;
  copyright?: string;
  socialLinks?: ReactNode;
  legalLinks?: ReactNode;
}

const maxWidthClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      variant = "bordered",
      maxWidth = "xl",
      logo,
      copyright,
      socialLinks,
      legalLinks,
      children,
      ...props
    },
    ref,
  ) => {
    const currentYear = new Date().getFullYear();
    const defaultCopyright = `© ${currentYear} Your Company. All rights reserved.`;

    return (
      <footer
        ref={ref}
        className={cn("mt-auto", footerVariants[variant], className)}
        {...props}
      >
        <div
          className={cn(
            "w-full mx-auto px-4 sm:px-6 lg:px-8 py-10",
            maxWidthClasses[maxWidth],
          )}
        >
          {children || (
            <div className="space-y-8">
              {/* Main content area */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                {/* Logo and description */}
                {logo && <div className="shrink-0">{logo}</div>}

                {/* Social links */}
                {socialLinks && <div className="flex items-center gap-4">{socialLinks}</div>}
              </div>

              {/* Bottom bar */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-border">
                {/* Copyright */}
                <p className="text-sm text-muted-foreground">
                  {copyright || defaultCopyright}
                </p>

                {/* Legal links */}
                {legalLinks && (
                  <div className="flex flex-wrap items-center gap-4">{legalLinks}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </footer>
    );
  },
);
Footer.displayName = "Footer";

// FooterSection component for link groups
export interface FooterSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const FooterSection = forwardRef<HTMLDivElement, FooterSectionProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {title && (
          <h4 className="mb-3 text-sm font-semibold text-foreground">{title}</h4>
        )}
        <ul className="space-y-2">{children}</ul>
      </div>
    );
  },
);
FooterSection.displayName = "FooterSection";

// FooterLink component
export interface FooterLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
}

export const FooterLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ className, external, children, ...props }, ref) => {
    return (
      <li>
        <Link
          ref={ref}
          variant="muted"
          size="sm"
          external={external}
          className={cn("hover:text-foreground", className)}
          {...props}
        >
          {children}
        </Link>
      </li>
    );
  },
);
FooterLink.displayName = "FooterLink";

// FooterLogo component
export interface FooterLogoProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  src?: string;
  alt?: string;
  text?: string;
}

export const FooterLogo = forwardRef<HTMLAnchorElement, FooterLogoProps>(
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
FooterLogo.displayName = "FooterLogo";

// FooterSocialLink component
export interface FooterSocialLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: ReactNode;
  label: string;
}

export const FooterSocialLink = forwardRef<
  HTMLAnchorElement,
  FooterSocialLinkProps
>(({ className, icon, label, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn(
        "flex items-center justify-center size-9 rounded-full",
        "text-muted-foreground hover:text-foreground hover:bg-accent",
        "transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
        className,
      )}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {icon}
    </a>
  );
});
FooterSocialLink.displayName = "FooterSocialLink";

// FooterGrid component for multi-column layouts
export interface FooterGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4 | 5;
}

const gridColumnClasses = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-5",
};

export const FooterGrid = forwardRef<HTMLDivElement, FooterGridProps>(
  ({ className, columns = 4, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid gap-8", gridColumnClasses[columns], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FooterGrid.displayName = "FooterGrid";

// FooterDivider component
export interface FooterDividerProps extends React.HTMLAttributes<HTMLHRElement> {}

export const FooterDivider = forwardRef<HTMLHRElement, FooterDividerProps>(
  ({ className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn("border-t border-border my-8", className)}
        {...props}
      />
    );
  },
);
FooterDivider.displayName = "FooterDivider";
