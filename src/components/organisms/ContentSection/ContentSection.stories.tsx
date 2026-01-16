import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms";
import { RocketIcon, ShieldIcon, ZapIcon } from "@/lib/icons";
import {
  AlternatingContentSection,
  ContentActions,
  ContentBadge,
  type ContentBlock,
  ContentBody,
  ContentDescription,
  ContentImage,
  ContentList,
  ContentQuote,
  ContentSection,
  ContentSplit,
  ContentStats,
  ContentTitle,
  FullWidthContentSection,
  SimpleContentSection,
} from "./";

const meta: Meta<typeof ContentSection> = {
  title: "Organisms/Marketing/ContentSection",
  component: ContentSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ContentSection>;

const placeholderImage =
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop";
const placeholderImage2 =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop";
const placeholderImage3 =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop";

export const Default: Story = {
  render: () => (
    <ContentSection>
      <ContentSplit>
        <ContentBody>
          <ContentBadge>About Us</ContentBadge>
          <ContentTitle>We're building the future of work</ContentTitle>
          <ContentDescription>
            Our mission is to help teams collaborate more effectively and build
            better products faster. We believe that great software should be
            accessible to everyone, regardless of technical expertise.
          </ContentDescription>
          <ContentList
            items={[
              "Built for scale with enterprise-grade security",
              "Seamless integrations with your existing tools",
              "24/7 support from our dedicated team",
              "Regular updates and new features",
            ]}
            variant="check"
          />
          <ContentActions>
            <Button variant="primary">Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </ContentActions>
        </ContentBody>
        <ContentImage
          src={placeholderImage}
          alt="Team collaboration"
          variant="shadowed"
        />
      </ContentSplit>
    </ContentSection>
  ),
};

export const ImageLeft: Story = {
  render: () => (
    <ContentSection>
      <ContentSplit reverse>
        <ContentBody>
          <ContentBadge variant="secondary">Features</ContentBadge>
          <ContentTitle>Powerful features for modern teams</ContentTitle>
          <ContentDescription>
            Everything you need to manage projects, collaborate with your team,
            and deliver results on time and under budget.
          </ContentDescription>
          <ContentList
            items={[
              {
                id: "1",
                icon: <RocketIcon className="size-4" />,
                title: "Lightning fast performance",
                description: "Optimized for speed with real-time updates.",
              },
              {
                id: "2",
                icon: <ZapIcon className="size-4" />,
                title: "Powerful automation",
                description:
                  "Automate repetitive tasks and focus on what matters.",
              },
              {
                id: "3",
                icon: <ShieldIcon className="size-4" />,
                title: "Enterprise security",
                description: "Bank-grade encryption and compliance features.",
              },
            ]}
            variant="icon"
          />
          <ContentActions>
            <Button variant="primary">Try it Free</Button>
          </ContentActions>
        </ContentBody>
        <ContentImage
          src={placeholderImage2}
          alt="Dashboard preview"
          variant="rounded"
        />
      </ContentSplit>
    </ContentSection>
  ),
};

export const WithQuote: Story = {
  render: () => (
    <ContentSection backgroundColor="muted">
      <ContentSplit>
        <ContentBody>
          <ContentTitle>Trusted by industry leaders</ContentTitle>
          <ContentDescription>
            Join thousands of companies who have transformed their workflow with
            our platform.
          </ContentDescription>
          <ContentQuote
            author="Sarah Johnson"
            authorTitle="VP of Engineering, TechCorp"
            authorAvatar="https://i.pravatar.cc/100?img=1"
          >
            This platform has completely transformed how our team works. We've
            seen a 40% increase in productivity since adopting it.
          </ContentQuote>
        </ContentBody>
        <ContentImage
          src={placeholderImage3}
          alt="Happy customer"
          variant="floating"
        />
      </ContentSplit>
    </ContentSection>
  ),
};

export const WithStats: Story = {
  render: () => (
    <ContentSection>
      <ContentSplit>
        <ContentBody>
          <ContentBadge>Results</ContentBadge>
          <ContentTitle>Proven results at scale</ContentTitle>
          <ContentDescription>
            Our customers have achieved remarkable results using our platform.
            Here's what the numbers say.
          </ContentDescription>
          <ContentStats
            stats={[
              { value: "99.9%", label: "Uptime" },
              { value: "50M+", label: "Users" },
              { value: "150+", label: "Countries" },
            ]}
            variant="bordered"
          />
          <ContentActions>
            <Button variant="primary">View Case Studies</Button>
            <Button variant="ghost">Read Documentation</Button>
          </ContentActions>
        </ContentBody>
        <ContentImage
          src={placeholderImage}
          alt="Global reach"
          variant="shadowed"
        />
      </ContentSplit>
    </ContentSection>
  ),
};

export const TwoColumnFeatures: Story = {
  render: () => (
    <ContentSection>
      <ContentSplit reverse>
        <ContentBody>
          <ContentTitle size="md">
            Everything you need in one place
          </ContentTitle>
          <ContentDescription>
            A comprehensive suite of tools designed to help you work smarter,
            not harder.
          </ContentDescription>
          <ContentList
            items={[
              "Project management",
              "Team collaboration",
              "Time tracking",
              "Resource planning",
              "Analytics dashboard",
              "Custom workflows",
            ]}
            variant="check"
            columns={2}
          />
        </ContentBody>
        <ContentImage src={placeholderImage2} alt="All-in-one platform" />
      </ContentSplit>
    </ContentSection>
  ),
};

export const NumberedList: Story = {
  render: () => (
    <ContentSection>
      <ContentSplit>
        <ContentBody>
          <ContentBadge>How it works</ContentBadge>
          <ContentTitle>Get started in 3 easy steps</ContentTitle>
          <ContentDescription>
            We've made it simple to get up and running with our platform.
          </ContentDescription>
          <ContentList
            items={[
              {
                id: "1",
                title: "Create your account",
                description:
                  "Sign up for free and set up your workspace in minutes.",
              },
              {
                id: "2",
                title: "Invite your team",
                description:
                  "Add team members and set up roles and permissions.",
              },
              {
                id: "3",
                title: "Start collaborating",
                description:
                  "Create projects, assign tasks, and track progress.",
              },
            ]}
            variant="numbered"
          />
          <ContentActions>
            <Button variant="primary" size="lg">
              Start Free Trial
            </Button>
          </ContentActions>
        </ContentBody>
        <ContentImage
          src={placeholderImage3}
          alt="Getting started"
          variant="shadowed"
        />
      </ContentSplit>
    </ContentSection>
  ),
};

export const Simple: Story = {
  render: () => (
    <SimpleContentSection
      badge="Product"
      title="The all-in-one platform for teams"
      description="Everything you need to manage projects, collaborate with your team, and deliver amazing results. No more switching between apps."
      image={{
        src: placeholderImage,
        alt: "Platform preview",
      }}
      imagePosition="right"
      features={[
        "Unlimited projects and tasks",
        "Real-time collaboration",
        "Advanced reporting",
        "Custom integrations",
      ]}
      cta={{
        text: "Start Free Trial",
        href: "#",
      }}
      secondaryCta={{
        text: "Watch Demo",
        href: "#",
      }}
    />
  ),
};

export const SimpleImageLeft: Story = {
  render: () => (
    <SimpleContentSection
      badge="Security"
      title="Enterprise-grade security"
      description="Your data is protected with bank-level encryption and comprehensive security measures. We take security seriously so you don't have to worry."
      image={{
        src: placeholderImage2,
        alt: "Security features",
      }}
      imagePosition="left"
      features={[
        "SOC 2 Type II certified",
        "End-to-end encryption",
        "SSO and 2FA support",
        "Regular security audits",
      ]}
      cta={{
        text: "Learn About Security",
        href: "#",
      }}
    />
  ),
};

const contentBlocks: ContentBlock[] = [
  {
    id: "1",
    badge: "Collaboration",
    title: "Work together seamlessly",
    description:
      "Real-time collaboration features that keep your team in sync, no matter where they are.",
    image: {
      src: placeholderImage,
      alt: "Team collaboration",
    },
    features: ["Real-time editing", "Comments and mentions", "Activity feeds"],
    cta: {
      text: "Learn more",
      href: "#",
    },
  },
  {
    id: "2",
    badge: "Automation",
    title: "Automate repetitive tasks",
    description:
      "Set up powerful automations to handle routine work, so your team can focus on what matters.",
    image: {
      src: placeholderImage2,
      alt: "Automation features",
    },
    features: ["Custom workflows", "Scheduled actions", "Integrations"],
    cta: {
      text: "Explore automation",
      href: "#",
    },
  },
  {
    id: "3",
    badge: "Analytics",
    title: "Make data-driven decisions",
    description:
      "Comprehensive analytics and reporting to help you understand performance and improve outcomes.",
    image: {
      src: placeholderImage3,
      alt: "Analytics dashboard",
    },
    features: ["Custom dashboards", "Export reports", "Trend analysis"],
    cta: {
      text: "See analytics",
      href: "#",
    },
  },
];

export const Alternating: Story = {
  render: () => <AlternatingContentSection blocks={contentBlocks} gap="lg" />,
};

export const FullWidth: Story = {
  render: () => (
    <FullWidthContentSection
      backgroundImage={placeholderImage}
      title="Ready to transform your workflow?"
      description="Join thousands of teams who have already made the switch. Start your free trial today."
      cta={{
        text: "Get Started Free",
        href: "#",
      }}
      align="center"
      overlay="dark"
    />
  ),
};

export const FullWidthLeftAligned: Story = {
  render: () => (
    <FullWidthContentSection
      backgroundImage={placeholderImage2}
      title="Build something amazing"
      description="Our platform gives you the tools and flexibility to bring your ideas to life."
      cta={{
        text: "Start Building",
        href: "#",
      }}
      align="left"
      overlay="gradient"
    />
  ),
};

export const GradientBackground: Story = {
  render: () => (
    <ContentSection backgroundColor="gradient">
      <ContentSplit>
        <ContentBody>
          <ContentBadge variant="primary">New</ContentBadge>
          <ContentTitle>Introducing our latest features</ContentTitle>
          <ContentDescription>
            We've been hard at work building new features to help you work more
            efficiently. Check out what's new.
          </ContentDescription>
          <ContentList
            items={[
              "AI-powered suggestions",
              "Advanced search capabilities",
              "Mobile app improvements",
              "New integrations",
            ]}
            variant="bullet"
          />
          <ContentActions>
            <Button variant="primary">Explore Features</Button>
          </ContentActions>
        </ContentBody>
        <ContentImage
          src={placeholderImage3}
          alt="New features"
          variant="floating"
        />
      </ContentSplit>
    </ContentSection>
  ),
};
