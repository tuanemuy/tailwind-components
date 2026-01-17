import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  PricingCard,
  PricingHeader,
  type PricingPlan,
  PricingTable,
  PricingToggle,
} from "./index";

const meta: Meta<typeof PricingTable> = {
  title: "Organisms/Marketing/PricingTable",
  component: PricingTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: "select",
      options: [2, 3, 4],
    },
    variant: {
      control: "select",
      options: ["cards", "comparison"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PricingTable>;

// Sample plans
const samplePlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "For individuals just getting started",
    price: 0,
    period: "month",
    features: [
      { text: "Up to 3 projects", included: true },
      { text: "Basic analytics", included: true },
      { text: "Community support", included: true },
      { text: "Custom domain", included: false },
      { text: "Priority support", included: false },
      { text: "Advanced integrations", included: false },
    ],
    ctaText: "Start Free",
    ctaVariant: "outline",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams and businesses",
    price: 29,
    period: "month",
    badge: "Most Popular",
    highlighted: true,
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
      { text: "Custom domain", included: true },
      { text: "API access", included: true },
      { text: "Advanced integrations", included: false },
    ],
    ctaText: "Start Free Trial",
    ctaVariant: "primary",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: 99,
    period: "month",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Advanced analytics", included: true },
      { text: "24/7 dedicated support", included: true },
      { text: "Custom domain", included: true },
      { text: "API access", included: true },
      { text: "Advanced integrations", included: true },
    ],
    ctaText: "Contact Sales",
    ctaVariant: "outline",
  },
];

export const Default: Story = {
  render: () => (
    <PricingTable
      plans={samplePlans}
      onSelectPlan={(planId) => console.log(`Selected plan: ${planId}`)}
    />
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <PricingTable
      plans={samplePlans.slice(0, 2)}
      columns={2}
      onSelectPlan={(planId) => console.log(`Selected plan: ${planId}`)}
    />
  ),
};

export const FourColumns: Story = {
  render: () => {
    const fourPlans: PricingPlan[] = [
      ...samplePlans,
      {
        id: "custom",
        name: "Custom",
        description: "Tailored for your needs",
        price: "Custom",
        features: [
          { text: "Everything in Enterprise", included: true },
          { text: "Custom SLA", included: true },
          { text: "Dedicated account manager", included: true },
          { text: "On-premise deployment", included: true },
          { text: "Custom integrations", included: true },
          { text: "Training & onboarding", included: true },
        ],
        ctaText: "Contact Us",
        ctaVariant: "outline",
      },
    ];

    return (
      <PricingTable
        plans={fourPlans}
        columns={4}
        onSelectPlan={(planId) => console.log(`Selected plan: ${planId}`)}
      />
    );
  },
};

export const ComparisonTable: Story = {
  render: () => (
    <PricingTable
      plans={samplePlans}
      variant="comparison"
      onSelectPlan={(planId) => console.log(`Selected plan: ${planId}`)}
    />
  ),
};

export const WithToggle: Story = {
  render: function Render() {
    const [billingPeriod, setBillingPeriod] = useState("monthly");

    const monthlyPlans: PricingPlan[] = [
      { ...samplePlans[0], price: 0 },
      { ...samplePlans[1], price: 29 },
      { ...samplePlans[2], price: 99 },
    ];

    const yearlyPlans: PricingPlan[] = [
      { ...samplePlans[0], price: 0, period: "year" },
      { ...samplePlans[1], price: 290, period: "year" },
      { ...samplePlans[2], price: 990, period: "year" },
    ];

    const currentPlans =
      billingPeriod === "monthly" ? monthlyPlans : yearlyPlans;

    return (
      <div className="space-y-8">
        <PricingHeader
          title="Simple, transparent pricing"
          subtitle="Choose the plan that's right for you"
          toggle={
            <PricingToggle
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly", discount: "Save 20%" },
              ]}
              value={billingPeriod}
              onChange={setBillingPeriod}
            />
          }
        />
        <PricingTable
          plans={currentPlans}
          onSelectPlan={(planId) => console.log(`Selected plan: ${planId}`)}
        />
      </div>
    );
  },
};

export const SingleCard: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <PricingCard
        plan={samplePlans[1]}
        onSelect={() => console.log("Selected Pro plan")}
      />
    </div>
  ),
};

export const MinimalStyle: Story = {
  render: () => {
    const minimalPlans: PricingPlan[] = [
      {
        id: "starter",
        name: "Starter",
        price: 9,
        period: "month",
        features: [
          { text: "5 team members", included: true },
          { text: "10GB storage", included: true },
          { text: "Email support", included: true },
        ],
      },
      {
        id: "team",
        name: "Team",
        price: 29,
        period: "month",
        highlighted: true,
        badge: "Popular",
        features: [
          { text: "20 team members", included: true },
          { text: "50GB storage", included: true },
          { text: "Priority support", included: true },
        ],
      },
      {
        id: "business",
        name: "Business",
        price: 79,
        period: "month",
        features: [
          { text: "Unlimited team members", included: true },
          { text: "200GB storage", included: true },
          { text: "24/7 support", included: true },
        ],
      },
    ];

    return (
      <PricingTable
        plans={minimalPlans}
        onSelectPlan={(planId) => console.log(`Selected plan: ${planId}`)}
      />
    );
  },
};

export const WithCustomPricing: Story = {
  render: () => {
    const customPlans: PricingPlan[] = [
      {
        id: "basic",
        name: "Basic",
        description: "Perfect for side projects",
        price: "Free",
        features: [
          { text: "1 user", included: true },
          { text: "Basic features", included: true },
          { text: "Community support", included: true },
        ],
        ctaText: "Get Started",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "For large organizations",
        price: "Contact Us",
        highlighted: true,
        features: [
          { text: "Unlimited users", included: true },
          { text: "All features", included: true },
          { text: "Dedicated support", included: true },
        ],
        ctaText: "Contact Sales",
      },
    ];

    return (
      <PricingTable
        plans={customPlans}
        columns={2}
        onSelectPlan={(planId) => console.log(`Selected plan: ${planId}`)}
      />
    );
  },
};

export const FullExample: Story = {
  render: function Render() {
    const [billingPeriod, setBillingPeriod] = useState("monthly");

    const plans: PricingPlan[] = [
      {
        id: "hobby",
        name: "Hobby",
        description: "For personal projects",
        price: billingPeriod === "monthly" ? 0 : 0,
        period: billingPeriod === "monthly" ? "month" : "year",
        features: [
          { text: "Up to 3 projects", included: true },
          { text: "Community support", included: true },
          { text: "Basic analytics", included: true },
          { text: "SSL certificate", included: true },
          { text: "Custom domains", included: false },
          { text: "Team collaboration", included: false },
          { text: "Advanced security", included: false },
        ],
        ctaText: "Get Started",
        ctaVariant: "outline",
      },
      {
        id: "pro",
        name: "Pro",
        description: "For professional developers",
        price: billingPeriod === "monthly" ? 20 : 192,
        period: billingPeriod === "monthly" ? "month" : "year",
        badge: "Popular",
        highlighted: true,
        features: [
          { text: "Unlimited projects", included: true },
          { text: "Priority support", included: true },
          { text: "Advanced analytics", included: true },
          { text: "SSL certificate", included: true },
          { text: "Custom domains", included: true },
          { text: "Team collaboration", included: true },
          { text: "Advanced security", included: false },
        ],
        ctaText: "Start Free Trial",
        ctaVariant: "primary",
      },
      {
        id: "enterprise",
        name: "Enterprise",
        description: "For large scale applications",
        price: billingPeriod === "monthly" ? 50 : 480,
        period: billingPeriod === "monthly" ? "month" : "year",
        features: [
          { text: "Unlimited projects", included: true },
          { text: "24/7 dedicated support", included: true },
          { text: "Advanced analytics", included: true },
          { text: "SSL certificate", included: true },
          { text: "Custom domains", included: true },
          { text: "Team collaboration", included: true },
          { text: "Advanced security", included: true },
        ],
        ctaText: "Contact Sales",
        ctaVariant: "outline",
      },
    ];

    return (
      <div className="space-y-12">
        <PricingHeader
          title="Choose Your Plan"
          subtitle="Start free, upgrade when you're ready. No hidden fees."
          toggle={
            <PricingToggle
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly", discount: "-20%" },
              ]}
              value={billingPeriod}
              onChange={setBillingPeriod}
            />
          }
        />
        <PricingTable
          plans={plans}
          onSelectPlan={(planId) => alert(`Selected: ${planId}`)}
        />
        <p className="text-center text-sm text-muted-foreground">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    );
  },
};
