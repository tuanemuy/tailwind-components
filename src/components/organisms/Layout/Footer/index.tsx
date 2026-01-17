import { forwardRef, type ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Link } from "@/components/atoms/Link";
import {
  ArrowRightIcon,
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TwitterIcon,
  YouTubeIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

// Footer variants
type FooterVariant = "default" | "bordered" | "minimal" | "stacked" | "simple";

const footerVariants: Record<FooterVariant, string> = {
  default: "bg-card",
  bordered: "bg-card border-t border-border",
  minimal: "bg-transparent",
  stacked: "bg-muted",
  simple: "bg-card border-t border-border",
};

// Main Footer component
export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  variant?: FooterVariant;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "full";
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
  "4xl": "max-w-screen-2xl",
  "6xl": "max-w-screen-2xl",
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
                {socialLinks && (
                  <div className="flex items-center gap-4">{socialLinks}</div>
                )}
              </div>

              {/* Bottom bar */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-border">
                {/* Copyright */}
                <p className="text-sm text-muted-foreground">
                  {copyright || defaultCopyright}
                </p>

                {/* Legal links */}
                {legalLinks && (
                  <div className="flex flex-wrap items-center gap-4">
                    {legalLinks}
                  </div>
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
export interface FooterSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const FooterSection = forwardRef<HTMLDivElement, FooterSectionProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {title && (
          <h4 className="mb-3 text-sm font-semibold text-foreground">
            {title}
          </h4>
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
  href: string;
}

export const FooterSocialLink = forwardRef<
  HTMLAnchorElement,
  FooterSocialLinkProps
>(({ className, icon, label, href, ...props }, ref) => {
  return (
    <a
      ref={ref}
      href={href}
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
export interface FooterDividerProps
  extends React.HTMLAttributes<HTMLHRElement> {}

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

// =============================================================================
// MarketplaceFooter
// =============================================================================

export interface MarketplaceFooterCategory {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export interface MarketplaceFooterProps {
  companyName?: string;
  companyDescription?: string;
  logo?: ReactNode;
  categories?: MarketplaceFooterCategory[];
  sellerLinks?: Array<{ label: string; href: string }>;
  supportLinks?: Array<{ label: string; href: string }>;
  paymentMethods?: ReactNode;
  downloadApps?: ReactNode;
  copyright?: string;
  className?: string;
}

export function MarketplaceFooter({
  companyName = "Marketplace",
  companyDescription = "The best place to buy and sell products online.",
  logo,
  categories = [],
  sellerLinks = [],
  supportLinks = [],
  paymentMethods,
  downloadApps,
  copyright,
  className,
}: MarketplaceFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-muted border-t border-border", className)}>
      {/* Main content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              {logo || <span className="text-xl font-bold">{companyName}</span>}
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              {companyDescription}
            </p>

            {/* Download apps */}
            {downloadApps && (
              <div className="space-y-2">
                <p className="text-sm font-semibold">Download our app</p>
                <div className="flex flex-wrap gap-2">{downloadApps}</div>
              </div>
            )}
          </div>

          {/* Categories */}
          {categories.map((category) => (
            <div key={category.title}>
              <h4 className="font-semibold text-sm mb-4">{category.title}</h4>
              <ul className="space-y-2">
                {category.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Seller & Support */}
          <div className="space-y-8">
            {sellerLinks.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-4">
                  Sell on {companyName}
                </h4>
                <ul className="space-y-2">
                  {sellerLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {supportLinks.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-4">Support</h4>
                <ul className="space-y-2">
                  {supportLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {copyright ||
                `© ${currentYear} ${companyName}. All rights reserved.`}
            </p>
            {paymentMethods && (
              <div className="flex items-center gap-2">{paymentMethods}</div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// ShopFooter
// =============================================================================

export interface ShopFooterProps {
  companyName?: string;
  logo?: ReactNode;
  shopLinks?: Array<{ label: string; href: string }>;
  accountLinks?: Array<{ label: string; href: string }>;
  helpLinks?: Array<{ label: string; href: string }>;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  newsletter?: boolean;
  newsletterTitle?: string;
  newsletterDescription?: string;
  onNewsletterSubmit?: (email: string) => void;
  socialLinks?: Array<{ platform: string; href: string }>;
  paymentMethods?: ReactNode;
  copyright?: string;
  legalLinks?: Array<{ label: string; href: string }>;
  className?: string;
}

export function ShopFooter({
  companyName = "Shop",
  logo,
  shopLinks = [],
  accountLinks = [],
  helpLinks = [],
  contactInfo,
  newsletter = true,
  newsletterTitle = "Subscribe to our newsletter",
  newsletterDescription = "Get the latest updates on new products and upcoming sales.",
  onNewsletterSubmit,
  socialLinks = [],
  paymentMethods,
  copyright,
  legalLinks = [],
  className,
}: ShopFooterProps) {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <TwitterIcon className="size-5" />;
      case "facebook":
        return <FacebookIcon className="size-5" />;
      case "instagram":
        return <InstagramIcon className="size-5" />;
      case "linkedin":
        return <LinkedInIcon className="size-5" />;
      case "youtube":
        return <YouTubeIcon className="size-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className={cn("bg-card border-t border-border", className)}>
      {/* Newsletter section */}
      {newsletter && (
        <div className="border-b border-border">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold">{newsletterTitle}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {newsletterDescription}
                </p>
              </div>
              <form
                className="flex flex-col sm:flex-row gap-2 max-w-md"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  onNewsletterSubmit?.(formData.get("email") as string);
                }}
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="min-w-[250px]"
                />
                <Button type="submit">
                  Subscribe
                  <ArrowRightIcon className="size-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Company info */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-4">
              {logo || <span className="text-xl font-bold">{companyName}</span>}
            </div>
            {contactInfo && (
              <div className="space-y-3 text-sm text-muted-foreground">
                {contactInfo.email && (
                  <div className="flex items-center gap-2">
                    <MailIcon className="size-4" />
                    <span>{contactInfo.email}</span>
                  </div>
                )}
                {contactInfo.phone && (
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="size-4" />
                    <span>{contactInfo.phone}</span>
                  </div>
                )}
                {contactInfo.address && (
                  <div className="flex items-start gap-2">
                    <MapPinIcon className="size-4 mt-0.5" />
                    <span>{contactInfo.address}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Shop links */}
          {shopLinks.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-4">Shop</h4>
              <ul className="space-y-2">
                {shopLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Account links */}
          {accountLinks.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-4">Account</h4>
              <ul className="space-y-2">
                {accountLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Help links */}
          {helpLinks.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-4">Help</h4>
              <ul className="space-y-2">
                {helpLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social links */}
          {socialLinks.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-4">Follow us</h4>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-center size-10 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-sm text-muted-foreground">
                {copyright ||
                  `© ${currentYear} ${companyName}. All rights reserved.`}
              </p>
              {legalLinks.length > 0 && (
                <div className="flex flex-wrap items-center gap-4">
                  {legalLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {paymentMethods && (
              <div className="flex items-center gap-2">{paymentMethods}</div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// StartupFooter
// =============================================================================

export interface StartupFooterProps {
  companyName?: string;
  companyTagline?: string;
  logo?: ReactNode;
  productLinks?: Array<{ label: string; href: string }>;
  resourceLinks?: Array<{ label: string; href: string }>;
  companyLinks?: Array<{ label: string; href: string }>;
  socialLinks?: Array<{ platform: string; href: string }>;
  copyright?: string;
  statusBadge?: ReactNode;
  className?: string;
}

export function StartupFooter({
  companyName = "Startup",
  companyTagline = "Building the future, one feature at a time.",
  logo,
  productLinks = [],
  resourceLinks = [],
  companyLinks = [],
  socialLinks = [],
  copyright,
  statusBadge,
  className,
}: StartupFooterProps) {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <TwitterIcon className="size-5" />;
      case "github":
        return <GitHubIcon className="size-5" />;
      case "linkedin":
        return <LinkedInIcon className="size-5" />;
      case "youtube":
        return <YouTubeIcon className="size-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className={cn("bg-background border-t border-border", className)}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Company info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              {logo || <span className="text-xl font-bold">{companyName}</span>}
            </div>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              {companyTagline}
            </p>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Product links */}
          {productLinks.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-4">Product</h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resource links */}
          {resourceLinks.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-4">Resources</h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Company links */}
          {companyLinks.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Status badge */}
          {statusBadge && (
            <div>
              <h4 className="font-semibold text-sm mb-4">Status</h4>
              {statusBadge}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-10 mt-10 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {copyright ||
              `© ${currentYear} ${companyName}. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// StackedFooter
// =============================================================================

export interface StackedFooterRow {
  id: string;
  content: ReactNode;
  className?: string;
}

export interface StackedFooterProps {
  rows?: StackedFooterRow[];
  companyName?: string;
  logo?: ReactNode;
  description?: string;
  linksColumns?: Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;
  newsletter?: boolean;
  newsletterTitle?: string;
  onNewsletterSubmit?: (email: string) => void;
  socialLinks?: Array<{ platform: string; href: string }>;
  bottomLinks?: Array<{ label: string; href: string }>;
  copyright?: string;
  className?: string;
}

export function StackedFooter({
  rows,
  companyName = "Company",
  logo,
  description,
  linksColumns = [],
  newsletter = false,
  newsletterTitle = "Subscribe to our newsletter",
  onNewsletterSubmit,
  socialLinks = [],
  bottomLinks = [],
  copyright,
  className,
}: StackedFooterProps) {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <TwitterIcon className="size-5" />;
      case "facebook":
        return <FacebookIcon className="size-5" />;
      case "instagram":
        return <InstagramIcon className="size-5" />;
      case "linkedin":
        return <LinkedInIcon className="size-5" />;
      case "youtube":
        return <YouTubeIcon className="size-5" />;
      case "github":
        return <GitHubIcon className="size-5" />;
      default:
        return null;
    }
  };

  // If custom rows are provided, render them
  if (rows && rows.length > 0) {
    return (
      <footer className={cn("bg-muted", className)}>
        {rows.map((row, rowIndex) => (
          <div
            key={row.id}
            className={cn(
              "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
              rowIndex < rows.length - 1 && "border-b border-border",
              row.className,
            )}
          >
            {row.content}
          </div>
        ))}
      </footer>
    );
  }

  // Default stacked footer layout
  return (
    <footer className={cn("bg-muted", className)}>
      {/* Row 1: Main content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {logo || <span className="text-xl font-bold">{companyName}</span>}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground max-w-md">
                {description}
              </p>
            )}

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-center size-10 rounded-full bg-background text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Newsletter */}
          {newsletter && (
            <div className="lg:justify-self-end">
              <h4 className="font-semibold mb-4">{newsletterTitle}</h4>
              <form
                className="flex flex-col sm:flex-row gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  onNewsletterSubmit?.(formData.get("email") as string);
                }}
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="min-w-[200px]"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Links */}
      {linksColumns.length > 0 && (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-border">
          <div
            className={cn(
              "grid gap-8",
              linksColumns.length === 2 && "grid-cols-2",
              linksColumns.length === 3 && "grid-cols-2 md:grid-cols-3",
              linksColumns.length >= 4 && "grid-cols-2 md:grid-cols-4",
            )}
          >
            {linksColumns.map((column) => (
              <div key={column.title}>
                <h4 className="font-semibold text-sm mb-4">{column.title}</h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Row 3: Bottom bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {copyright ||
              `© ${currentYear} ${companyName}. All rights reserved.`}
          </p>
          {bottomLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-4">
              {bottomLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
