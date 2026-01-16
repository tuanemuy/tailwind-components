import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  CompletePricingSection,
  PricingBillingToggle,
  PricingFAQ,
  PricingGrid,
  PricingPlanCard,
  PricingSection,
  PricingSectionHeader,
  type PricingSectionPlan,
  PricingSectionSubtitle,
  PricingSectionTitle,
} from ".";

const meta: Meta<typeof PricingSection> = {
  title: "Organisms/Marketing/PricingSection",
  component: PricingSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof PricingSection>;

const samplePlans: PricingSectionPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small teams",
    monthlyPrice: 9,
    yearlyPrice: 90,
    features: [
      { text: "Up to 5 team members", included: true },
      { text: "Basic analytics", included: true },
      { text: "5 GB storage", included: true },
      { text: "Email support", included: true },
      { text: "API access", included: false },
      { text: "Custom integrations", included: false },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Best for growing businesses",
    monthlyPrice: 29,
    yearlyPrice: 290,
    badge: "Most Popular",
    highlighted: true,
    features: [
      { text: "Up to 25 team members", included: true },
      { text: "Advanced analytics", included: true },
      { text: "50 GB storage", included: true },
      { text: "Priority email support", included: true },
      { text: "API access", included: true },
      { text: "Custom integrations", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      { text: "Unlimited team members", included: true },
      { text: "Custom analytics", included: true },
      { text: "Unlimited storage", included: true },
      { text: "24/7 phone support", included: true },
      { text: "Full API access", included: true },
      { text: "Custom integrations", included: true },
    ],
  },
];

const sampleFAQ = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, all plans come with a 14-day free trial. No credit card required.",
  },
];

export const Default: Story = {
  render: () => (
    <PricingSection>
      <PricingSectionHeader>
        <PricingSectionTitle>Simple, transparent pricing</PricingSectionTitle>
        <PricingSectionSubtitle>
          Choose the plan that's right for your business
        </PricingSectionSubtitle>
      </PricingSectionHeader>

      <PricingGrid columns={3}>
        {samplePlans.map((plan) => (
          <PricingPlanCard
            key={plan.id}
            plan={plan}
            onSelectPlan={(id) => console.log(`Selected: ${id}`)}
          />
        ))}
      </PricingGrid>
    </PricingSection>
  ),
};

export const WithBillingToggle: Story = {
  render: function Render() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
      "monthly",
    );

    return (
      <PricingSection>
        <PricingSectionHeader>
          <PricingSectionTitle>Choose your plan</PricingSectionTitle>
          <PricingSectionSubtitle>
            Get started with a 14-day free trial
          </PricingSectionSubtitle>
          <div className="mt-8">
            <PricingBillingToggle
              value={billingCycle}
              onChange={setBillingCycle}
              yearlyDiscount="Save 20%"
            />
          </div>
        </PricingSectionHeader>

        <PricingGrid columns={3}>
          {samplePlans.map((plan) => (
            <PricingPlanCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              onSelectPlan={(id) => console.log(`Selected: ${id}`)}
            />
          ))}
        </PricingGrid>
      </PricingSection>
    );
  },
};

export const WithFAQ: Story = {
  render: () => (
    <PricingSection>
      <PricingSectionHeader>
        <PricingSectionTitle>Pricing that scales</PricingSectionTitle>
        <PricingSectionSubtitle>
          No hidden fees. Cancel anytime.
        </PricingSectionSubtitle>
      </PricingSectionHeader>

      <PricingGrid columns={3}>
        {samplePlans.map((plan) => (
          <PricingPlanCard
            key={plan.id}
            plan={plan}
            onSelectPlan={(id) => console.log(`Selected: ${id}`)}
          />
        ))}
      </PricingGrid>

      <PricingFAQ items={sampleFAQ} />
    </PricingSection>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <PricingSection>
      <PricingSectionHeader>
        <PricingSectionTitle>Simple pricing</PricingSectionTitle>
        <PricingSectionSubtitle>
          Two plans to fit your needs
        </PricingSectionSubtitle>
      </PricingSectionHeader>

      <PricingGrid columns={2}>
        {samplePlans.slice(0, 2).map((plan) => (
          <PricingPlanCard
            key={plan.id}
            plan={plan}
            onSelectPlan={(id) => console.log(`Selected: ${id}`)}
          />
        ))}
      </PricingGrid>
    </PricingSection>
  ),
};

export const MutedBackground: Story = {
  render: () => (
    <PricingSection backgroundColor="muted">
      <PricingSectionHeader>
        <PricingSectionTitle>Flexible plans</PricingSectionTitle>
        <PricingSectionSubtitle>
          Start free, upgrade when you need
        </PricingSectionSubtitle>
      </PricingSectionHeader>

      <PricingGrid columns={3}>
        {samplePlans.map((plan) => (
          <PricingPlanCard
            key={plan.id}
            plan={plan}
            variant="elevated"
            onSelectPlan={(id) => console.log(`Selected: ${id}`)}
          />
        ))}
      </PricingGrid>
    </PricingSection>
  ),
};

export const CompletePricingSectionExample: Story = {
  name: "CompletePricingSection",
  render: () => (
    <CompletePricingSection
      title="Choose the perfect plan"
      subtitle="Simple, transparent pricing that grows with you"
      plans={samplePlans}
      faq={sampleFAQ}
      onSelectPlan={(planId, billing) =>
        console.log(`Selected: ${planId}, Billing: ${billing}`)
      }
    />
  ),
};
