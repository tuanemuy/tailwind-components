import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/atoms/Badge";
import {
  Footer,
  FooterDivider,
  FooterGrid,
  FooterLink,
  FooterLogo,
  FooterSection,
  FooterSocialLink,
  MarketplaceFooter,
  ShopFooter,
  StackedFooter,
  StartupFooter,
} from "./index";

const meta: Meta<typeof Footer> = {
  title: "Organisms/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Footer>;

// Social icons as simple SVGs
const TwitterIcon = () => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    aria-hidden="true"
    className="size-4"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <Footer
      logo={<FooterLogo href="#home" text="Acme Inc" />}
      copyright="© 2024 Acme Inc. All rights reserved."
      socialLinks={
        <>
          <FooterSocialLink
            href="#twitter"
            icon={<TwitterIcon />}
            label="Twitter"
          />
          <FooterSocialLink
            href="#github"
            icon={<GitHubIcon />}
            label="GitHub"
          />
          <FooterSocialLink
            href="#linkedin"
            icon={<LinkedInIcon />}
            label="LinkedIn"
          />
        </>
      }
      legalLinks={
        <>
          <a
            href="#privacy-policy"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy Policy
          </a>
          <a
            href="#terms-of-service"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Terms of Service
          </a>
        </>
      }
    />
  ),
};

export const WithLinkGroups: Story = {
  render: () => (
    <Footer variant="bordered">
      <FooterGrid columns={5}>
        <div className="col-span-2">
          <FooterLogo href="#home" text="Company Name" />
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Building amazing products to help businesses grow and succeed in the
            digital world.
          </p>
          <div className="flex gap-4 mt-4">
            <FooterSocialLink
              href="#twitter"
              icon={<TwitterIcon />}
              label="Twitter"
            />
            <FooterSocialLink
              href="#github"
              icon={<GitHubIcon />}
              label="GitHub"
            />
            <FooterSocialLink
              href="#linkedin"
              icon={<LinkedInIcon />}
              label="LinkedIn"
            />
          </div>
        </div>

        <FooterSection title="Product">
          <FooterLink href="#features">Features</FooterLink>
          <FooterLink href="#pricing">Pricing</FooterLink>
          <FooterLink href="#integrations">Integrations</FooterLink>
          <FooterLink href="#api">API</FooterLink>
        </FooterSection>

        <FooterSection title="Company">
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#blog">Blog</FooterLink>
          <FooterLink href="#careers">Careers</FooterLink>
          <FooterLink href="#press">Press</FooterLink>
        </FooterSection>

        <FooterSection title="Support">
          <FooterLink href="#help-center">Help Center</FooterLink>
          <FooterLink href="#documentation">Documentation</FooterLink>
          <FooterLink href="#community">Community</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </FooterSection>
      </FooterGrid>

      <FooterDivider />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2024 Company Name. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#privacy-policy"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy Policy
          </a>
          <a
            href="#terms-of-service"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Terms of Service
          </a>
          <a
            href="#cookie-settings"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Cookie Settings
          </a>
        </div>
      </div>
    </Footer>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Footer variant="minimal" className="py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2024 Simple Co. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#privacy"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Privacy
          </a>
          <a
            href="#terms"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Terms
          </a>
          <a
            href="#contact"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Contact
          </a>
        </div>
      </div>
    </Footer>
  ),
};

export const Stacked: Story = {
  render: () => (
    <Footer variant="stacked">
      <div className="text-center space-y-6">
        <FooterLogo
          href="#home"
          text="Centered Logo"
          className="justify-center"
        />

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a
            href="#home"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Home
          </a>
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Contact
          </a>
        </nav>

        <div className="flex justify-center gap-4">
          <FooterSocialLink
            href="#twitter"
            icon={<TwitterIcon />}
            label="Twitter"
          />
          <FooterSocialLink
            href="#github"
            icon={<GitHubIcon />}
            label="GitHub"
          />
          <FooterSocialLink
            href="#linkedin"
            icon={<LinkedInIcon />}
            label="LinkedIn"
          />
        </div>

        <p className="text-sm text-muted-foreground">
          © 2024 Your Company. All rights reserved.
        </p>
      </div>
    </Footer>
  ),
};

export const WithNewsletter: Story = {
  render: () => (
    <Footer variant="bordered">
      <FooterGrid columns={4}>
        <div>
          <FooterLogo href="#home" text="Newsletter" />
          <p className="mt-4 text-sm text-muted-foreground">
            Subscribe to our newsletter for updates.
          </p>
        </div>

        <FooterSection title="Product">
          <FooterLink href="#features">Features</FooterLink>
          <FooterLink href="#pricing">Pricing</FooterLink>
          <FooterLink href="#api">API</FooterLink>
        </FooterSection>

        <FooterSection title="Company">
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#blog">Blog</FooterLink>
          <FooterLink href="#careers">Careers</FooterLink>
        </FooterSection>

        <div>
          <h4 className="text-sm font-semibold mb-3">Stay Updated</h4>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </FooterGrid>

      <FooterDivider />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2024 Company. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <FooterSocialLink
            href="#twitter"
            icon={<TwitterIcon />}
            label="Twitter"
          />
          <FooterSocialLink
            href="#github"
            icon={<GitHubIcon />}
            label="GitHub"
          />
          <FooterSocialLink
            href="#linkedin"
            icon={<LinkedInIcon />}
            label="LinkedIn"
          />
        </div>
      </div>
    </Footer>
  ),
};

// =============================================================================
// MarketplaceFooter Stories
// =============================================================================

export const MarketplaceFooterDefault: Story = {
  render: () => (
    <MarketplaceFooter
      companyName="MarketHub"
      companyDescription="The world's largest online marketplace. Buy and sell anything, anywhere."
      categories={[
        {
          title: "Electronics",
          links: [
            { label: "Phones", href: "#" },
            { label: "Laptops", href: "#" },
            { label: "Tablets", href: "#" },
            { label: "Accessories", href: "#" },
          ],
        },
        {
          title: "Fashion",
          links: [
            { label: "Women", href: "#" },
            { label: "Men", href: "#" },
            { label: "Kids", href: "#" },
            { label: "Accessories", href: "#" },
          ],
        },
      ]}
      sellerLinks={[
        { label: "Start Selling", href: "#" },
        { label: "Seller Hub", href: "#" },
        { label: "Seller Tools", href: "#" },
      ]}
      supportLinks={[
        { label: "Help Center", href: "#" },
        { label: "Returns", href: "#" },
        { label: "Contact Us", href: "#" },
      ]}
      downloadApps={
        <>
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 bg-foreground text-background rounded-lg text-sm"
          >
            <svg
              aria-hidden="true"
              className="size-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            App Store
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 bg-foreground text-background rounded-lg text-sm"
          >
            <svg
              aria-hidden="true"
              className="size-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" />
            </svg>
            Google Play
          </button>
        </>
      }
      paymentMethods={
        <>
          <div className="flex items-center gap-1 px-2 py-1 bg-background rounded text-xs border border-border">
            Visa
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-background rounded text-xs border border-border">
            Mastercard
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-background rounded text-xs border border-border">
            PayPal
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-background rounded text-xs border border-border">
            Apple Pay
          </div>
        </>
      }
    />
  ),
};

// =============================================================================
// ShopFooter Stories
// =============================================================================

export const ShopFooterDefault: Story = {
  render: () => (
    <ShopFooter
      companyName="StyleShop"
      contactInfo={{
        email: "support@styleshop.com",
        phone: "+1 (555) 123-4567",
        address: "123 Fashion Ave, New York, NY 10001",
      }}
      shopLinks={[
        { label: "New Arrivals", href: "#" },
        { label: "Best Sellers", href: "#" },
        { label: "Sale", href: "#" },
        { label: "Collections", href: "#" },
      ]}
      accountLinks={[
        { label: "My Account", href: "#" },
        { label: "Order History", href: "#" },
        { label: "Wishlist", href: "#" },
        { label: "Gift Cards", href: "#" },
      ]}
      helpLinks={[
        { label: "Shipping Info", href: "#" },
        { label: "Returns & Exchanges", href: "#" },
        { label: "Size Guide", href: "#" },
        { label: "FAQ", href: "#" },
      ]}
      socialLinks={[
        { platform: "twitter", href: "#" },
        { platform: "facebook", href: "#" },
        { platform: "instagram", href: "#" },
        { platform: "youtube", href: "#" },
      ]}
      newsletter={true}
      newsletterTitle="Join our community"
      newsletterDescription="Get 10% off your first order and stay updated with new arrivals."
      onNewsletterSubmit={(email) => console.log("Newsletter signup:", email)}
      legalLinks={[
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ]}
      paymentMethods={
        <>
          <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
            Visa
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
            Mastercard
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
            Amex
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
            PayPal
          </div>
        </>
      }
    />
  ),
};

export const ShopFooterNoNewsletter: Story = {
  render: () => (
    <ShopFooter
      companyName="QuickShop"
      newsletter={false}
      shopLinks={[
        { label: "All Products", href: "#" },
        { label: "Categories", href: "#" },
        { label: "Brands", href: "#" },
      ]}
      helpLinks={[
        { label: "Help Center", href: "#" },
        { label: "Contact Us", href: "#" },
      ]}
      socialLinks={[
        { platform: "instagram", href: "#" },
        { platform: "twitter", href: "#" },
      ]}
    />
  ),
};

// =============================================================================
// StartupFooter Stories
// =============================================================================

export const StartupFooterDefault: Story = {
  render: () => (
    <StartupFooter
      companyName="LaunchPad"
      companyTagline="Empowering startups to build, grow, and scale faster than ever before."
      productLinks={[
        { label: "Features", href: "#" },
        { label: "Integrations", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "Roadmap", href: "#" },
      ]}
      resourceLinks={[
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Guides", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Community", href: "#" },
      ]}
      companyLinks={[
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press Kit", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Partners", href: "#" },
      ]}
      socialLinks={[
        { platform: "twitter", href: "#" },
        { platform: "github", href: "#" },
        { platform: "linkedin", href: "#" },
        { platform: "youtube", href: "#" },
      ]}
      statusBadge={
        <Badge variant="success" className="inline-flex items-center gap-1">
          <span className="size-2 rounded-full bg-current animate-pulse" />
          All systems operational
        </Badge>
      }
    />
  ),
};

export const StartupFooterMinimal: Story = {
  render: () => (
    <StartupFooter
      companyName="TechStartup"
      companyTagline="Simple, powerful tools for modern teams."
      productLinks={[
        { label: "Product", href: "#" },
        { label: "Pricing", href: "#" },
      ]}
      companyLinks={[
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
      ]}
      socialLinks={[
        { platform: "twitter", href: "#" },
        { platform: "github", href: "#" },
      ]}
    />
  ),
};

// =============================================================================
// StackedFooter Stories
// =============================================================================

export const StackedFooterDefault: Story = {
  render: () => (
    <StackedFooter
      companyName="StackedCo"
      description="Building the future of collaboration. Join thousands of teams using our platform to work better together."
      newsletter={true}
      newsletterTitle="Subscribe to updates"
      onNewsletterSubmit={(email) => console.log("Subscribed:", email)}
      socialLinks={[
        { platform: "twitter", href: "#" },
        { platform: "facebook", href: "#" },
        { platform: "instagram", href: "#" },
        { platform: "linkedin", href: "#" },
        { platform: "github", href: "#" },
      ]}
      linksColumns={[
        {
          title: "Product",
          links: [
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Security", href: "#" },
            { label: "Enterprise", href: "#" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Press", href: "#" },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Documentation", href: "#" },
            { label: "Help Center", href: "#" },
            { label: "Community", href: "#" },
            { label: "Partners", href: "#" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
            { label: "Cookies", href: "#" },
            { label: "License", href: "#" },
          ],
        },
      ]}
      bottomLinks={[
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Settings", href: "#" },
      ]}
    />
  ),
};

export const StackedFooterCustomRows: Story = {
  render: () => (
    <StackedFooter
      rows={[
        {
          id: "cta",
          content: (
            <div className="py-10 text-center">
              <h3 className="text-2xl font-bold mb-2">Ready to get started?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of satisfied customers today.
              </p>
              <button
                type="button"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
              >
                Start Free Trial
              </button>
            </div>
          ),
        },
        {
          id: "links",
          content: (
            <div className="py-8 flex flex-wrap justify-center gap-6">
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Pricing
              </a>
              <a
                href="#documentation"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Documentation
              </a>
              <a
                href="#blog"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Blog
              </a>
              <a
                href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </a>
            </div>
          ),
        },
        {
          id: "copyright",
          content: (
            <div className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 CustomStack. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy
                </a>
                <a
                  href="#terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms
                </a>
              </div>
            </div>
          ),
        },
      ]}
    />
  ),
};
