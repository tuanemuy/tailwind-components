import type { Meta, StoryObj } from "@storybook/react";
import {
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  RocketIcon,
  ShieldIcon,
  ZapIcon,
} from "@/components/icons";
import {
  CompleteIconSection,
  HighlightIconSection,
  type IconFeature,
  IconFeatureCard,
  IconFeatureDescription,
  IconFeatureIcon,
  IconFeatureLink,
  IconFeatureTitle,
  IconGrid,
  IconSection,
  IconSectionHeader,
  IconSectionSubtitle,
  IconSectionTitle,
  SimpleIconSection,
} from "./";

const meta: Meta<typeof IconSection> = {
  title: "Organisms/Marketing/IconSection",
  component: IconSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof IconSection>;

// Sample features
const sampleFeatures: IconFeature[] = [
  {
    id: "1",
    icon: <RocketIcon className="size-6" />,
    title: "Lightning Fast",
    description:
      "Optimized for speed with advanced caching and lazy loading techniques.",
    link: { text: "Learn more", href: "#" },
  },
  {
    id: "2",
    icon: <ShieldIcon className="size-6" />,
    title: "Enterprise Security",
    description:
      "Bank-grade encryption and security protocols to keep your data safe.",
    link: { text: "Learn more", href: "#" },
  },
  {
    id: "3",
    icon: <ZapIcon className="size-6" />,
    title: "Powerful APIs",
    description:
      "RESTful APIs and webhooks for seamless integration with your stack.",
    link: { text: "Learn more", href: "#" },
  },
  {
    id: "4",
    icon: <CloudIcon className="size-6" />,
    title: "Cloud Native",
    description:
      "Built for the cloud with automatic scaling and high availability.",
    link: { text: "Learn more", href: "#" },
  },
  {
    id: "5",
    icon: <CodeIcon className="size-6" />,
    title: "Developer First",
    description:
      "Comprehensive documentation and SDKs for all major platforms.",
    link: { text: "Learn more", href: "#" },
  },
  {
    id: "6",
    icon: <DatabaseIcon className="size-6" />,
    title: "Data Analytics",
    description:
      "Real-time analytics and insights to help you make better decisions.",
    link: { text: "Learn more", href: "#" },
  },
];

export const Default: Story = {
  render: () => (
    <IconSection>
      <IconSectionHeader>
        <IconSectionTitle>Everything you need to succeed</IconSectionTitle>
        <IconSectionSubtitle>
          Our platform provides all the tools and features you need to build,
          deploy, and scale your applications.
        </IconSectionSubtitle>
      </IconSectionHeader>

      <IconGrid columns={3}>
        {sampleFeatures.map((feature) => (
          <IconFeatureCard key={feature.id}>
            <IconFeatureIcon>{feature.icon}</IconFeatureIcon>
            <IconFeatureTitle>{feature.title}</IconFeatureTitle>
            <IconFeatureDescription>
              {feature.description}
            </IconFeatureDescription>
            {feature.link && (
              <IconFeatureLink href={feature.link.href}>
                {feature.link.text}
              </IconFeatureLink>
            )}
          </IconFeatureCard>
        ))}
      </IconGrid>
    </IconSection>
  ),
};

export const Centered: Story = {
  render: () => (
    <IconSection>
      <IconSectionHeader>
        <IconSectionTitle>Why choose us?</IconSectionTitle>
        <IconSectionSubtitle>
          We provide the best tools to help your business grow.
        </IconSectionSubtitle>
      </IconSectionHeader>

      <IconGrid columns={3}>
        {sampleFeatures.slice(0, 3).map((feature) => (
          <IconFeatureCard key={feature.id} variant="centered">
            <IconFeatureIcon style="gradient" size="lg">
              {feature.icon}
            </IconFeatureIcon>
            <IconFeatureTitle>{feature.title}</IconFeatureTitle>
            <IconFeatureDescription>
              {feature.description}
            </IconFeatureDescription>
          </IconFeatureCard>
        ))}
      </IconGrid>
    </IconSection>
  ),
};

export const BorderedCards: Story = {
  render: () => (
    <IconSection backgroundColor="muted">
      <IconSectionHeader>
        <IconSectionTitle>Features that make a difference</IconSectionTitle>
        <IconSectionSubtitle>
          Discover the powerful features that set us apart from the competition.
        </IconSectionSubtitle>
      </IconSectionHeader>

      <IconGrid columns={3}>
        {sampleFeatures.map((feature) => (
          <IconFeatureCard key={feature.id} variant="bordered">
            <IconFeatureIcon style="outlined">{feature.icon}</IconFeatureIcon>
            <IconFeatureTitle>{feature.title}</IconFeatureTitle>
            <IconFeatureDescription>
              {feature.description}
            </IconFeatureDescription>
          </IconFeatureCard>
        ))}
      </IconGrid>
    </IconSection>
  ),
};

export const ElevatedCards: Story = {
  render: () => (
    <IconSection>
      <IconSectionHeader>
        <IconSectionTitle>Built for scale</IconSectionTitle>
        <IconSectionSubtitle>
          Enterprise-grade infrastructure with consumer-grade simplicity.
        </IconSectionSubtitle>
      </IconSectionHeader>

      <IconGrid columns={3}>
        {sampleFeatures.map((feature) => (
          <IconFeatureCard key={feature.id} variant="elevated">
            <IconFeatureIcon style="primary">{feature.icon}</IconFeatureIcon>
            <IconFeatureTitle>{feature.title}</IconFeatureTitle>
            <IconFeatureDescription>
              {feature.description}
            </IconFeatureDescription>
          </IconFeatureCard>
        ))}
      </IconGrid>
    </IconSection>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <IconSection>
      <IconSectionHeader>
        <IconSectionTitle>Core capabilities</IconSectionTitle>
      </IconSectionHeader>

      <IconGrid columns={4}>
        {sampleFeatures.slice(0, 4).map((feature) => (
          <IconFeatureCard key={feature.id} variant="centered">
            <IconFeatureIcon size="sm">{feature.icon}</IconFeatureIcon>
            <IconFeatureTitle className="text-base">
              {feature.title}
            </IconFeatureTitle>
            <IconFeatureDescription className="text-xs">
              {feature.description}
            </IconFeatureDescription>
          </IconFeatureCard>
        ))}
      </IconGrid>
    </IconSection>
  ),
};

export const SixColumns: Story = {
  render: () => (
    <IconSection padding="md">
      <IconSectionHeader>
        <IconSectionTitle size="sm">Key features</IconSectionTitle>
      </IconSectionHeader>

      <IconGrid columns={6} gap="sm">
        {sampleFeatures.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center text-center"
          >
            <IconFeatureIcon size="sm" style="primary">
              {feature.icon}
            </IconFeatureIcon>
            <span className="mt-2 text-sm font-medium text-foreground">
              {feature.title}
            </span>
          </div>
        ))}
      </IconGrid>
    </IconSection>
  ),
};

export const Complete: Story = {
  render: () => (
    <CompleteIconSection
      title="Why developers love us"
      subtitle="Built by developers, for developers. We understand what you need to ship faster."
      features={sampleFeatures}
      columns={3}
      variant="bordered"
      iconStyle="primary"
    />
  ),
};

export const SimpleHorizontal: Story = {
  render: () => (
    <IconSection padding="md">
      <SimpleIconSection features={sampleFeatures} iconStyle="gradient" />
    </IconSection>
  ),
};

export const HighlightColors: Story = {
  render: () => (
    <HighlightIconSection
      title="Everything you need"
      subtitle="A complete solution for modern teams"
      features={sampleFeatures}
    />
  ),
};

export const GradientBackground: Story = {
  render: () => (
    <CompleteIconSection
      title="Transform your workflow"
      subtitle="Streamline your processes with our powerful suite of tools."
      features={sampleFeatures.slice(0, 3)}
      columns={3}
      variant="elevated"
      iconStyle="gradient"
      backgroundColor="gradient"
    />
  ),
};

export const LeftAligned: Story = {
  render: () => (
    <CompleteIconSection
      title="Our platform features"
      subtitle="Everything you need to build amazing products."
      features={sampleFeatures}
      columns={2}
      align="left"
      variant="default"
    />
  ),
};
