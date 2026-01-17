import type { Meta, StoryObj } from "@storybook/react";
import {
  type ClientLogo,
  ClientLogoCloud,
  ClientLogoCloudHeader,
  ClientLogoCloudSubtitle,
  ClientLogoCloudTitle,
  ClientLogoItem,
  type ClientTestimonial,
  CompleteClientLogoCloud,
  LogoCategories,
  LogoCloudStats,
  LogoCloudWithTestimonial,
  LogoFlexRow,
  LogoGrid,
  LogoMarquee,
  SimpleClientLogoCloud,
} from "./";

const meta: Meta<typeof ClientLogoCloud> = {
  title: "Organisms/Marketing/ClientLogoCloud",
  component: ClientLogoCloud,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ClientLogoCloud>;

// Sample client logos (using placeholder SVG data URLs)
const createLogoSvg = (text: string, color: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40"><rect fill="${color}" width="120" height="40" rx="4"/><text x="60" y="25" text-anchor="middle" fill="white" font-family="system-ui" font-size="14" font-weight="bold">${text}</text></svg>`)}`;

const sampleLogos: ClientLogo[] = [
  {
    id: "1",
    name: "Acme Inc",
    src: createLogoSvg("ACME", "#3B82F6"),
    url: "https://example.com",
    category: "Technology",
  },
  {
    id: "2",
    name: "TechCorp",
    src: createLogoSvg("TechCorp", "#8B5CF6"),
    url: "https://example.com",
    category: "Technology",
  },
  {
    id: "3",
    name: "GlobalTech",
    src: createLogoSvg("GlobalTech", "#EC4899"),
    category: "Enterprise",
  },
  {
    id: "4",
    name: "Innovate",
    src: createLogoSvg("Innovate", "#10B981"),
    category: "Startup",
  },
  {
    id: "5",
    name: "NextGen",
    src: createLogoSvg("NextGen", "#F59E0B"),
    category: "Technology",
  },
  {
    id: "6",
    name: "DataFlow",
    src: createLogoSvg("DataFlow", "#6366F1"),
    category: "Enterprise",
  },
  {
    id: "7",
    name: "CloudBase",
    src: createLogoSvg("CloudBase", "#14B8A6"),
    category: "Startup",
  },
  {
    id: "8",
    name: "SecureNet",
    src: createLogoSvg("SecureNet", "#EF4444"),
    category: "Enterprise",
  },
];

const sampleTestimonial: ClientTestimonial = {
  id: "1",
  quote:
    "This platform has completely transformed how our team collaborates. We've seen a 40% increase in productivity since adopting it.",
  author: "Sarah Johnson",
  title: "VP of Engineering",
  company: "TechCorp",
  avatar: "https://i.pravatar.cc/100?img=1",
  logo: createLogoSvg("TechCorp", "#8B5CF6"),
};

export const Default: Story = {
  render: () => (
    <ClientLogoCloud>
      <ClientLogoCloudHeader>
        <ClientLogoCloudTitle>Trusted by industry leaders</ClientLogoCloudTitle>
      </ClientLogoCloudHeader>

      <LogoFlexRow>
        {sampleLogos.map((logo) => (
          <ClientLogoItem key={logo.id} logo={logo} variant="grayscale-hover" />
        ))}
      </LogoFlexRow>
    </ClientLogoCloud>
  ),
};

export const GridLayout: Story = {
  render: () => (
    <ClientLogoCloud>
      <ClientLogoCloudHeader>
        <ClientLogoCloudTitle>Our partners</ClientLogoCloudTitle>
        <ClientLogoCloudSubtitle>
          We work with the best companies in the industry
        </ClientLogoCloudSubtitle>
      </ClientLogoCloudHeader>

      <LogoGrid columns={4}>
        {sampleLogos.map((logo) => (
          <ClientLogoItem key={logo.id} logo={logo} variant="grayscale-hover" />
        ))}
      </LogoGrid>
    </ClientLogoCloud>
  ),
};

export const BorderedCards: Story = {
  render: () => (
    <ClientLogoCloud backgroundColor="muted">
      <ClientLogoCloudHeader>
        <ClientLogoCloudTitle size="lg">Featured Clients</ClientLogoCloudTitle>
      </ClientLogoCloudHeader>

      <LogoGrid columns={4} gap="lg">
        {sampleLogos.map((logo) => (
          <ClientLogoItem
            key={logo.id}
            logo={logo}
            variant="bordered"
            showName
          />
        ))}
      </LogoGrid>
    </ClientLogoCloud>
  ),
};

export const CardStyle: Story = {
  render: () => (
    <ClientLogoCloud>
      <ClientLogoCloudHeader>
        <ClientLogoCloudTitle size="md">Our Customers</ClientLogoCloudTitle>
        <ClientLogoCloudSubtitle>
          Join thousands of companies who trust us
        </ClientLogoCloudSubtitle>
      </ClientLogoCloudHeader>

      <LogoGrid columns={4} gap="md">
        {sampleLogos.map((logo) => (
          <ClientLogoItem
            key={logo.id}
            logo={{ ...logo, description: "Technology Partner" }}
            variant="card"
            showName
          />
        ))}
      </LogoGrid>
    </ClientLogoCloud>
  ),
};

export const Marquee: Story = {
  render: () => (
    <ClientLogoCloud padding="lg">
      <ClientLogoCloudHeader>
        <ClientLogoCloudTitle>
          Trusted by 1000+ companies worldwide
        </ClientLogoCloudTitle>
      </ClientLogoCloudHeader>

      <LogoMarquee
        logos={sampleLogos}
        speed="normal"
        direction="left"
        pauseOnHover
        variant="grayscale-hover"
      />
    </ClientLogoCloud>
  ),
};

export const MarqueeTwoRows: Story = {
  render: () => (
    <ClientLogoCloud padding="lg" backgroundColor="muted">
      <ClientLogoCloudHeader>
        <ClientLogoCloudTitle>Our growing community</ClientLogoCloudTitle>
      </ClientLogoCloudHeader>

      <LogoMarquee
        logos={sampleLogos}
        speed="slow"
        rows={2}
        variant="grayscale-hover"
      />
    </ClientLogoCloud>
  ),
};

export const ByCategory: Story = {
  render: () => (
    <ClientLogoCloud>
      <ClientLogoCloudHeader>
        <ClientLogoCloudTitle size="lg">Our Partners</ClientLogoCloudTitle>
        <ClientLogoCloudSubtitle>
          We partner with leading companies across industries
        </ClientLogoCloudSubtitle>
      </ClientLogoCloudHeader>

      <LogoCategories logos={sampleLogos} variant="grayscale-hover" />
    </ClientLogoCloud>
  ),
};

export const Simple: Story = {
  render: () => (
    <SimpleClientLogoCloud
      title="Trusted by leading companies"
      logos={sampleLogos}
      variant="grayscale-hover"
    />
  ),
};

export const Complete: Story = {
  render: () => (
    <CompleteClientLogoCloud
      title="Our Customers"
      subtitle="Join thousands of companies who have transformed their workflow"
      logos={sampleLogos}
      layout="grid"
      columns={4}
      logoVariant="grayscale-hover"
    />
  ),
};

export const CompleteMarquee: Story = {
  render: () => (
    <CompleteClientLogoCloud
      title="Trusted worldwide"
      logos={sampleLogos}
      layout="marquee"
      backgroundColor="muted"
    />
  ),
};

export const WithTestimonial: Story = {
  render: () => (
    <LogoCloudWithTestimonial
      title="Trusted by industry leaders"
      logos={sampleLogos.slice(0, 6)}
      testimonial={sampleTestimonial}
    />
  ),
};

export const WithStats: Story = {
  render: () => (
    <LogoCloudStats
      title="Trusted by the best"
      logos={sampleLogos}
      stats={[
        { value: "10,000+", label: "Companies" },
        { value: "500M+", label: "Users" },
        { value: "99.9%", label: "Uptime" },
      ]}
    />
  ),
};

export const MutedBackground: Story = {
  render: () => (
    <CompleteClientLogoCloud
      title="Trusted by industry leaders"
      logos={sampleLogos}
      layout="row"
      backgroundColor="muted"
      logoVariant="grayscale"
    />
  ),
};

export const GradientBackground: Story = {
  render: () => (
    <CompleteClientLogoCloud
      title="Join our growing community"
      subtitle="Thousands of companies trust us with their success"
      logos={sampleLogos}
      layout="grid"
      columns={4}
      backgroundColor="gradient"
      logoVariant="grayscale-hover"
    />
  ),
};

export const LargeSizes: Story = {
  render: () => (
    <ClientLogoCloud padding="lg">
      <ClientLogoCloudHeader>
        <ClientLogoCloudTitle size="lg">
          Enterprise Partners
        </ClientLogoCloudTitle>
      </ClientLogoCloudHeader>

      <LogoFlexRow gap="lg">
        {sampleLogos.slice(0, 4).map((logo) => (
          <ClientLogoItem
            key={logo.id}
            logo={logo}
            variant="default"
            size="lg"
          />
        ))}
      </LogoFlexRow>
    </ClientLogoCloud>
  ),
};

export const SmallCompact: Story = {
  render: () => (
    <ClientLogoCloud padding="sm">
      <LogoFlexRow gap="sm">
        {sampleLogos.map((logo) => (
          <ClientLogoItem
            key={logo.id}
            logo={logo}
            variant="grayscale"
            size="sm"
          />
        ))}
      </LogoFlexRow>
    </ClientLogoCloud>
  ),
};

export const FiveColumns: Story = {
  render: () => (
    <CompleteClientLogoCloud
      title="Our global network"
      logos={sampleLogos.slice(0, 5)}
      layout="grid"
      columns={5}
    />
  ),
};

export const SixColumns: Story = {
  render: () => (
    <CompleteClientLogoCloud
      title="Technology partners"
      logos={sampleLogos.slice(0, 6)}
      layout="grid"
      columns={6}
      logoSize="sm"
    />
  ),
};
