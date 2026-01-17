import type { Meta, StoryObj } from "@storybook/react";
import {
  CheckCircleIcon,
  GlobeIcon,
  LockIcon,
  SettingsIcon,
  SpinnerIcon,
  UsersIcon,
} from "@/lib/icons";
import {
  FeatureCard,
  FeatureCardContent,
  FeatureCardDescription,
  FeatureCardIcon,
  FeatureCardLink,
  FeatureCardTitle,
  FeatureGrid,
  FeatureList,
  FeatureListContent,
  FeatureListImage,
  FeatureListItem,
  FeatureSection,
  FeatureSectionHeader,
  FeatureSectionSubtitle,
  FeatureSectionTitle,
} from "./index";

const meta: Meta<typeof FeatureSection> = {
  title: "Organisms/Marketing/FeatureSection",
  component: FeatureSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["grid", "list", "alternating"],
    },
    columns: {
      control: "select",
      options: [2, 3, 4],
    },
    padding: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeatureSection>;

// Sample features data
const features = [
  {
    id: "1",
    icon: <CheckCircleIcon className="size-6" />,
    title: "Easy to Use",
    description:
      "Get started in minutes with our intuitive interface and comprehensive documentation.",
  },
  {
    id: "2",
    icon: <SettingsIcon className="size-6" />,
    title: "Highly Customizable",
    description:
      "Tailor every aspect to match your brand with our flexible theming system.",
  },
  {
    id: "3",
    icon: <UsersIcon className="size-6" />,
    title: "Team Collaboration",
    description:
      "Work together seamlessly with real-time collaboration features and shared workspaces.",
  },
  {
    id: "4",
    icon: <GlobeIcon className="size-6" />,
    title: "Global Scale",
    description:
      "Deploy globally with our distributed infrastructure and CDN integration.",
  },
  {
    id: "5",
    icon: <LockIcon className="size-6" />,
    title: "Enterprise Security",
    description:
      "Keep your data safe with enterprise-grade security and compliance features.",
  },
  {
    id: "6",
    icon: <SpinnerIcon className="size-6" />,
    title: "Fast Performance",
    description:
      "Lightning-fast load times with optimized performance and lazy loading.",
  },
];

export const Default: Story = {
  render: () => (
    <FeatureSection>
      <FeatureSectionHeader>
        <FeatureSectionTitle>Why Choose Us</FeatureSectionTitle>
        <FeatureSectionSubtitle>
          Discover the features that make our platform the best choice for your
          business.
        </FeatureSectionSubtitle>
      </FeatureSectionHeader>
      <FeatureGrid columns={3}>
        {features.map((feature) => (
          <FeatureCard key={feature.id}>
            <FeatureCardIcon className="mb-4">{feature.icon}</FeatureCardIcon>
            <FeatureCardTitle>{feature.title}</FeatureCardTitle>
            <FeatureCardDescription>
              {feature.description}
            </FeatureCardDescription>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </FeatureSection>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <FeatureSection>
      <FeatureSectionHeader>
        <FeatureSectionTitle>Core Features</FeatureSectionTitle>
        <FeatureSectionSubtitle>
          Everything you need to build amazing products.
        </FeatureSectionSubtitle>
      </FeatureSectionHeader>
      <FeatureGrid columns={2} gap="lg">
        {features.slice(0, 4).map((feature) => (
          <FeatureCard key={feature.id} variant="elevated">
            <FeatureCardIcon variant="gradient" size="lg" className="mb-4">
              {feature.icon}
            </FeatureCardIcon>
            <FeatureCardTitle>{feature.title}</FeatureCardTitle>
            <FeatureCardDescription>
              {feature.description}
            </FeatureCardDescription>
            <FeatureCardLink href="#">Learn more</FeatureCardLink>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </FeatureSection>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <FeatureSection>
      <FeatureSectionHeader>
        <FeatureSectionTitle>Platform Benefits</FeatureSectionTitle>
      </FeatureSectionHeader>
      <FeatureGrid columns={4} gap="sm">
        {features.slice(0, 4).map((feature) => (
          <FeatureCard key={feature.id} variant="minimal">
            <FeatureCardIcon variant="default" size="sm" className="mb-3">
              {feature.icon}
            </FeatureCardIcon>
            <FeatureCardTitle as="h4">{feature.title}</FeatureCardTitle>
            <FeatureCardDescription>
              {feature.description}
            </FeatureCardDescription>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </FeatureSection>
  ),
};

export const LeftAlignedHeader: Story = {
  render: () => (
    <FeatureSection>
      <FeatureSectionHeader align="left">
        <FeatureSectionTitle>Features that matter</FeatureSectionTitle>
        <FeatureSectionSubtitle>
          Built for developers who demand the best.
        </FeatureSectionSubtitle>
      </FeatureSectionHeader>
      <FeatureGrid columns={3}>
        {features.map((feature) => (
          <FeatureCard key={feature.id} variant="bordered">
            <FeatureCardIcon className="mb-4">{feature.icon}</FeatureCardIcon>
            <FeatureCardTitle>{feature.title}</FeatureCardTitle>
            <FeatureCardDescription>
              {feature.description}
            </FeatureCardDescription>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </FeatureSection>
  ),
};

export const HorizontalIconLayout: Story = {
  render: () => (
    <FeatureSection>
      <FeatureSectionHeader>
        <FeatureSectionTitle>How it works</FeatureSectionTitle>
        <FeatureSectionSubtitle>
          Simple steps to get you started.
        </FeatureSectionSubtitle>
      </FeatureSectionHeader>
      <FeatureGrid columns={2} gap="lg">
        {features.slice(0, 4).map((feature) => (
          <FeatureCard key={feature.id} iconPosition="left" variant="bordered">
            <FeatureCardIcon>{feature.icon}</FeatureCardIcon>
            <FeatureCardContent>
              <FeatureCardTitle>{feature.title}</FeatureCardTitle>
              <FeatureCardDescription>
                {feature.description}
              </FeatureCardDescription>
            </FeatureCardContent>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </FeatureSection>
  ),
};

export const AlternatingLayout: Story = {
  render: () => (
    <FeatureSection>
      <FeatureSectionHeader>
        <FeatureSectionTitle>Detailed Features</FeatureSectionTitle>
        <FeatureSectionSubtitle>
          Take a deeper look at what makes us different.
        </FeatureSectionSubtitle>
      </FeatureSectionHeader>
      <FeatureList>
        <FeatureListItem>
          <FeatureListContent>
            <FeatureCardIcon variant="gradient" size="lg">
              <CheckCircleIcon className="size-6" />
            </FeatureCardIcon>
            <FeatureCardTitle as="h3" className="text-2xl">
              Easy Integration
            </FeatureCardTitle>
            <FeatureCardDescription className="text-base">
              Connect with your existing tools and workflows in minutes. Our
              comprehensive API and SDK make integration seamless, whether
              you&apos;re using React, Vue, or vanilla JavaScript.
            </FeatureCardDescription>
            <FeatureCardLink href="#">View documentation</FeatureCardLink>
          </FeatureListContent>
          <FeatureListImage
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
            alt="Integration dashboard"
          />
        </FeatureListItem>

        <FeatureListItem reverse>
          <FeatureListContent>
            <FeatureCardIcon variant="gradient" size="lg">
              <UsersIcon className="size-6" />
            </FeatureCardIcon>
            <FeatureCardTitle as="h3" className="text-2xl">
              Built for Teams
            </FeatureCardTitle>
            <FeatureCardDescription className="text-base">
              Collaborate in real-time with your team members. Shared
              workspaces, comments, and version history make working together
              effortless.
            </FeatureCardDescription>
            <FeatureCardLink href="#">
              Learn about collaboration
            </FeatureCardLink>
          </FeatureListContent>
          <FeatureListImage
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
            alt="Team collaboration"
          />
        </FeatureListItem>

        <FeatureListItem>
          <FeatureListContent>
            <FeatureCardIcon variant="gradient" size="lg">
              <LockIcon className="size-6" />
            </FeatureCardIcon>
            <FeatureCardTitle as="h3" className="text-2xl">
              Enterprise Security
            </FeatureCardTitle>
            <FeatureCardDescription className="text-base">
              Your data is protected with enterprise-grade security. SOC 2
              compliant, encrypted at rest and in transit, with customizable
              access controls.
            </FeatureCardDescription>
            <FeatureCardLink href="#">Security overview</FeatureCardLink>
          </FeatureListContent>
          <FeatureListImage
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop"
            alt="Security features"
          />
        </FeatureListItem>
      </FeatureList>
    </FeatureSection>
  ),
};

export const MinimalStyle: Story = {
  render: () => (
    <FeatureSection padding="md">
      <FeatureSectionHeader>
        <FeatureSectionTitle>Simple yet powerful</FeatureSectionTitle>
      </FeatureSectionHeader>
      <FeatureGrid columns={3} gap="lg">
        {features.slice(0, 3).map((feature) => (
          <div key={feature.id} className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              {feature.icon}
            </div>
            <FeatureCardTitle className="text-base">
              {feature.title}
            </FeatureCardTitle>
            <FeatureCardDescription>
              {feature.description}
            </FeatureCardDescription>
          </div>
        ))}
      </FeatureGrid>
    </FeatureSection>
  ),
};

export const WithBackgroundColor: Story = {
  render: () => (
    <FeatureSection className="bg-muted/50">
      <FeatureSectionHeader>
        <FeatureSectionTitle>Everything you need</FeatureSectionTitle>
        <FeatureSectionSubtitle>
          A complete solution for modern development teams.
        </FeatureSectionSubtitle>
      </FeatureSectionHeader>
      <FeatureGrid columns={3}>
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            variant="default"
            className="bg-background"
          >
            <FeatureCardIcon className="mb-4">{feature.icon}</FeatureCardIcon>
            <FeatureCardTitle>{feature.title}</FeatureCardTitle>
            <FeatureCardDescription>
              {feature.description}
            </FeatureCardDescription>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </FeatureSection>
  ),
};
