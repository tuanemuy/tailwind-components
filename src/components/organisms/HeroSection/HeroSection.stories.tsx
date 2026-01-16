import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms";
import {
  HeroActions,
  HeroBadge,
  HeroContent,
  HeroImage,
  HeroSection,
  HeroSplit,
  HeroStats,
  HeroSubtitle,
  HeroTitle,
  HeroTrustedBy,
} from "./index";

const meta: Meta<typeof HeroSection> = {
  title: "Organisms/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["centered", "split", "background"],
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
    },
    padding: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  render: () => (
    <HeroSection>
      <HeroBadge>New Feature</HeroBadge>
      <HeroTitle>Build beautiful products faster</HeroTitle>
      <HeroSubtitle>
        Create stunning websites and applications with our comprehensive design
        system. Ship faster with pre-built components.
      </HeroSubtitle>
      <HeroActions>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
        <Button variant="outline" size="lg">
          Learn More
        </Button>
      </HeroActions>
    </HeroSection>
  ),
};

export const LeftAligned: Story = {
  render: () => (
    <HeroSection align="left">
      <HeroTitle>Welcome to the future of design</HeroTitle>
      <HeroSubtitle>
        Transform your ideas into reality with our powerful design tools.
      </HeroSubtitle>
      <HeroActions align="left">
        <Button variant="primary" size="lg">
          Start Free Trial
        </Button>
        <Button variant="ghost" size="lg">
          Watch Demo
        </Button>
      </HeroActions>
    </HeroSection>
  ),
};

export const WithGradientTitle: Story = {
  render: () => (
    <HeroSection>
      <HeroTitle gradient size="lg">
        Design System for Modern Teams
      </HeroTitle>
      <HeroSubtitle size="lg">
        Everything you need to build exceptional user interfaces.
      </HeroSubtitle>
      <HeroActions>
        <Button variant="primary" size="lg">
          Explore Components
        </Button>
      </HeroActions>
    </HeroSection>
  ),
};

export const SplitLayout: Story = {
  render: () => (
    <HeroSection variant="split" padding="xl">
      <HeroSplit>
        <HeroContent align="left">
          <HeroBadge>🚀 Just launched v2.0</HeroBadge>
          <HeroTitle size="lg">Ship products 10x faster</HeroTitle>
          <HeroSubtitle>
            Our design system helps you build consistent, accessible, and
            beautiful user interfaces without starting from scratch.
          </HeroSubtitle>
          <HeroActions align="left">
            <Button variant="primary" size="lg">
              Get Started Free
            </Button>
            <Button variant="outline" size="lg">
              View Components
            </Button>
          </HeroActions>
        </HeroContent>
        <HeroImage
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
          alt="Dashboard preview"
          aspectRatio="video"
        />
      </HeroSplit>
    </HeroSection>
  ),
};

export const SplitLayoutReversed: Story = {
  render: () => (
    <HeroSection variant="split" padding="xl">
      <HeroSplit reverse>
        <HeroContent align="left">
          <HeroTitle>Designed for developers</HeroTitle>
          <HeroSubtitle>
            Built with React, TypeScript, and Tailwind CSS. Copy and paste into
            your projects and customize to your needs.
          </HeroSubtitle>
          <HeroActions align="left">
            <Button variant="primary" size="lg">
              Browse Documentation
            </Button>
          </HeroActions>
        </HeroContent>
        <HeroImage
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"
          alt="Code editor"
          aspectRatio="video"
        />
      </HeroSplit>
    </HeroSection>
  ),
};

export const WithBackgroundImage: Story = {
  render: () => (
    <HeroSection
      variant="background"
      backgroundImage="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&h=1080&fit=crop"
      overlayOpacity={80}
    >
      <HeroTitle className="text-foreground">Build the future of web</HeroTitle>
      <HeroSubtitle>
        Join thousands of developers creating amazing products with our tools.
      </HeroSubtitle>
      <HeroActions>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
        <Button variant="outline" size="lg">
          Learn More
        </Button>
      </HeroActions>
    </HeroSection>
  ),
};

export const WithStats: Story = {
  render: () => (
    <HeroSection>
      <HeroTitle>Trusted by developers worldwide</HeroTitle>
      <HeroSubtitle>
        Join the community of developers building with our platform.
      </HeroSubtitle>
      <HeroStats
        stats={[
          { value: "10K+", label: "Developers" },
          { value: "500K+", label: "Downloads" },
          { value: "99.9%", label: "Uptime" },
          { value: "24/7", label: "Support" },
        ]}
      />
      <HeroActions>
        <Button variant="primary" size="lg">
          Join Now
        </Button>
      </HeroActions>
    </HeroSection>
  ),
};

export const WithTrustedBy: Story = {
  render: () => (
    <HeroSection>
      <HeroTitle>Enterprise-ready platform</HeroTitle>
      <HeroSubtitle>
        Used by the world&apos;s leading companies to build better products.
      </HeroSubtitle>
      <HeroActions>
        <Button variant="primary" size="lg">
          Request Demo
        </Button>
        <Button variant="outline" size="lg">
          Contact Sales
        </Button>
      </HeroActions>
      <HeroTrustedBy
        title="Trusted by industry leaders"
        logos={[
          {
            src: "https://via.placeholder.com/120x40?text=Company+1",
            alt: "Company 1",
          },
          {
            src: "https://via.placeholder.com/120x40?text=Company+2",
            alt: "Company 2",
          },
          {
            src: "https://via.placeholder.com/120x40?text=Company+3",
            alt: "Company 3",
          },
          {
            src: "https://via.placeholder.com/120x40?text=Company+4",
            alt: "Company 4",
          },
        ]}
      />
    </HeroSection>
  ),
};

export const MinimalStyle: Story = {
  render: () => (
    <HeroSection padding="md">
      <HeroTitle size="sm">Simple. Fast. Reliable.</HeroTitle>
      <HeroSubtitle size="sm">
        The modern way to build web applications.
      </HeroSubtitle>
      <HeroActions>
        <Button variant="primary">Get Started</Button>
      </HeroActions>
    </HeroSection>
  ),
};

export const FullFeatured: Story = {
  render: () => (
    <HeroSection variant="split" padding="xl">
      <HeroSplit gap="lg">
        <HeroContent align="left">
          <HeroBadge>✨ Introducing Pro Plan</HeroBadge>
          <HeroTitle size="lg">The complete design system for React</HeroTitle>
          <HeroSubtitle size="lg">
            50+ beautifully crafted components. Fully accessible. Dark mode
            included. Built with TypeScript.
          </HeroSubtitle>
          <HeroStats
            stats={[
              { value: "50+", label: "Components" },
              { value: "100%", label: "TypeScript" },
              { value: "A11y", label: "Accessible" },
            ]}
          />
          <HeroActions align="left">
            <Button variant="primary" size="lg">
              Get All Components
            </Button>
            <Button variant="ghost" size="lg">
              View Documentation →
            </Button>
          </HeroActions>
        </HeroContent>
        <div className="space-y-4">
          <HeroImage
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop"
            alt="Dashboard interface"
          />
          <HeroTrustedBy
            logos={[
              {
                src: "https://via.placeholder.com/100x32?text=Logo+1",
                alt: "Logo 1",
              },
              {
                src: "https://via.placeholder.com/100x32?text=Logo+2",
                alt: "Logo 2",
              },
              {
                src: "https://via.placeholder.com/100x32?text=Logo+3",
                alt: "Logo 3",
              },
            ]}
          />
        </div>
      </HeroSplit>
    </HeroSection>
  ),
};

export const DarkBackground: Story = {
  render: () => (
    <HeroSection className="bg-slate-900" padding="xl">
      <HeroTitle className="text-white">Build faster with AI</HeroTitle>
      <HeroSubtitle className="text-slate-300">
        Leverage the power of artificial intelligence to accelerate your
        development workflow.
      </HeroSubtitle>
      <HeroActions>
        <Button variant="primary" size="lg">
          Try AI Assistant
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-slate-600 text-white hover:bg-slate-800"
        >
          Learn More
        </Button>
      </HeroActions>
    </HeroSection>
  ),
};
