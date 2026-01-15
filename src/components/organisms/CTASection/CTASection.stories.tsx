import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms";
import {
  CTASection,
  CTAContent,
  CTATitle,
  CTADescription,
  CTAActions,
  CTAButton,
  CTAStats,
  SimpleCTA,
  BannerCTA,
} from ".";

const meta: Meta<typeof CTASection> = {
  title: "Organisms/Marketing/CTASection",
  component: CTASection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof CTASection>;

export const Default: Story = {
  render: () => (
    <CTASection>
      <CTATitle>Ready to get started?</CTATitle>
      <CTADescription>
        Join thousands of satisfied customers using our platform.
      </CTADescription>
      <CTAActions className="mt-6">
        <Button size="lg">Get Started</Button>
        <Button variant="outline" size="lg">
          Learn More
        </Button>
      </CTAActions>
    </CTASection>
  ),
};

export const Gradient: Story = {
  render: () => (
    <CTASection variant="gradient">
      <CTATitle>Start your free trial today</CTATitle>
      <CTADescription>
        No credit card required. Cancel anytime.
      </CTADescription>
      <CTAActions className="mt-6">
        <CTAButton inverted size="lg">
          Start Free Trial
        </CTAButton>
        <CTAButton variant="ghost" size="lg" className="text-primary-foreground hover:bg-primary-foreground/10">
          Schedule Demo
        </CTAButton>
      </CTAActions>
    </CTASection>
  ),
};

export const Split: Story = {
  render: () => (
    <CTASection variant="split">
      <CTAContent align="left">
        <CTATitle>Ready to transform your business?</CTATitle>
        <CTADescription>
          Get started with our enterprise solution today.
        </CTADescription>
      </CTAContent>
      <CTAActions align="right">
        <Button size="lg">Contact Sales</Button>
      </CTAActions>
    </CTASection>
  ),
};

export const Banner: Story = {
  render: () => (
    <CTASection variant="banner">
      <CTAContent align="left">
        <CTATitle className="text-primary-foreground">Special offer!</CTATitle>
        <CTADescription>
          Get 50% off your first month with code WELCOME50.
        </CTADescription>
      </CTAContent>
      <CTAActions>
        <CTAButton inverted size="lg">
          Claim Offer
        </CTAButton>
      </CTAActions>
    </CTASection>
  ),
};

export const WithStats: Story = {
  render: () => (
    <CTASection variant="gradient" padding="xl">
      <CTATitle size="lg">Trusted by thousands</CTATitle>
      <CTADescription size="lg">
        Join the growing community of businesses that trust us.
      </CTADescription>
      <CTAStats
        className="mt-8"
        stats={[
          { value: "10K+", label: "Active Users" },
          { value: "99.9%", label: "Uptime" },
          { value: "24/7", label: "Support" },
          { value: "150+", label: "Countries" },
        ]}
      />
      <CTAActions className="mt-8">
        <CTAButton inverted size="lg">
          Get Started Free
        </CTAButton>
      </CTAActions>
    </CTASection>
  ),
};

export const SimpleCTAExample: Story = {
  name: "SimpleCTA",
  render: () => (
    <SimpleCTA
      title="Ready to dive in?"
      description="Start your free trial today and see the difference."
      primaryAction={{ label: "Get Started", onClick: () => console.log("clicked") }}
      secondaryAction={{ label: "Learn More", onClick: () => console.log("learn more") }}
    />
  ),
};

export const BannerCTAExample: Story = {
  name: "BannerCTA",
  render: () => (
    <div className="p-8">
      <BannerCTA
        title="New features available!"
        description="Check out our latest updates and improvements."
        action={{ label: "Learn More", onClick: () => console.log("clicked") }}
        dismissible
        onDismiss={() => console.log("dismissed")}
      />
    </div>
  ),
};

export const WithBackgroundImage: Story = {
  render: () => (
    <CTASection
      variant="image"
      backgroundImage="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200"
    >
      <CTATitle>Build something amazing</CTATitle>
      <CTADescription>
        Our platform gives you all the tools you need to succeed.
      </CTADescription>
      <CTAActions className="mt-6">
        <Button size="lg">Get Started</Button>
        <Button variant="outline" size="lg">
          Watch Demo
        </Button>
      </CTAActions>
    </CTASection>
  ),
};

export const PrimaryBackground: Story = {
  render: () => (
    <CTASection backgroundColor="primary">
      <CTATitle>Subscribe to our newsletter</CTATitle>
      <CTADescription>
        Stay updated with our latest news and updates.
      </CTADescription>
      <CTAActions className="mt-6">
        <CTAButton inverted size="lg">
          Subscribe Now
        </CTAButton>
      </CTAActions>
    </CTASection>
  ),
};
