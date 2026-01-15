import type { Meta, StoryObj } from "@storybook/react";
import { PricingPage, PricingComparison } from ".";
import { GlobeIcon, CheckIcon } from "@/lib/icons";
import type { PricingSectionPlan, FAQItem } from "@/components/organisms";

const meta: Meta<typeof PricingPage> = {
  title: "Pages/PricingPage",
  component: PricingPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    billingPeriod: {
      control: "select",
      options: ["monthly", "yearly"],
    },
    yearlyDiscount: {
      control: { type: "range", min: 0, max: 50 },
    },
    showFAQ: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PricingPage>;

// Logo component
const Logo = () => (
  <div className="flex items-center gap-x-2">
    <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
      <GlobeIcon className="size-5 text-primary-foreground" />
    </div>
    <span className="text-xl font-bold text-foreground">Preline</span>
  </div>
);

// Sample pricing plans
const samplePlans: PricingSectionPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals and small projects",
    monthlyPrice: 9,
    yearlyPrice: 7,
    features: [
      { text: "5 projects", included: true },
      { text: "10GB storage", included: true },
      { text: "Basic analytics", included: true },
      { text: "Email support", included: true },
      { text: "API access", included: false },
      { text: "Custom domain", included: false },
    ],
    cta: "Get started",
  },
  {
    id: "professional",
    name: "Professional",
    description: "For growing teams and businesses",
    monthlyPrice: 29,
    yearlyPrice: 24,
    featured: true,
    badge: "Most Popular",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "100GB storage", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
      { text: "API access", included: true },
      { text: "Custom domain", included: true },
    ],
    cta: "Start free trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom needs",
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      { text: "Everything in Professional", included: true },
      { text: "Unlimited storage", included: true },
      { text: "Custom integrations", included: true },
      { text: "Dedicated support", included: true },
      { text: "SLA guarantee", included: true },
      { text: "SSO/SAML", included: true },
    ],
    cta: "Contact sales",
  },
];

// Sample FAQs
const sampleFAQs: FAQItem[] = [
  {
    question: "Can I change plans at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, all paid plans include a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What happens if I exceed my storage limit?",
    answer: "You'll receive a notification when you're approaching your limit. You can upgrade your plan or purchase additional storage.",
  },
];

// Default pricing page
export const Default: Story = {
  args: {
    plans: samplePlans,
    faqs: sampleFAQs,
    logo: <Logo />,
    navigation: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "About", href: "/about" },
    ],
    onPlanSelect: (planId) => console.log("Selected plan:", planId),
    onBillingPeriodChange: (period) => console.log("Billing period:", period),
  },
};

// With yearly billing selected
export const YearlyBilling: Story = {
  args: {
    plans: samplePlans,
    faqs: sampleFAQs,
    billingPeriod: "yearly",
    yearlyDiscount: 20,
    logo: <Logo />,
    onPlanSelect: (planId) => console.log("Selected plan:", planId),
  },
};

// With guarantee section
export const WithGuarantee: Story = {
  args: {
    plans: samplePlans,
    logo: <Logo />,
    guarantee: {
      title: "30-day money-back guarantee",
      description: "If you're not satisfied with our service, we'll refund your purchase within 30 days. No questions asked.",
    },
    onPlanSelect: (planId) => console.log("Selected plan:", planId),
  },
};

// With trusted by section
export const WithTrustedBy: Story = {
  args: {
    plans: samplePlans,
    logo: <Logo />,
    trustedBy: {
      label: "Trusted by 10,000+ companies worldwide",
      logos: [
        <div key="1" className="h-8 w-24 bg-muted rounded" />,
        <div key="2" className="h-8 w-24 bg-muted rounded" />,
        <div key="3" className="h-8 w-24 bg-muted rounded" />,
        <div key="4" className="h-8 w-24 bg-muted rounded" />,
        <div key="5" className="h-8 w-24 bg-muted rounded" />,
      ],
    },
    guarantee: {
      title: "30-day money-back guarantee",
      description: "Try risk-free. Full refund if you're not satisfied.",
    },
    onPlanSelect: (planId) => console.log("Selected plan:", planId),
  },
};

// Without FAQ
export const WithoutFAQ: Story = {
  args: {
    plans: samplePlans,
    showFAQ: false,
    logo: <Logo />,
    onPlanSelect: (planId) => console.log("Selected plan:", planId),
  },
};

// Custom title
export const CustomContent: Story = {
  args: {
    plans: samplePlans,
    title: "Choose your perfect plan",
    subtitle: "Start free, upgrade when you need to. Cancel anytime.",
    logo: <Logo />,
    onPlanSelect: (planId) => console.log("Selected plan:", planId),
  },
};

// Pricing comparison table
export const ComparisonTable: StoryObj<typeof PricingComparison> = {
  render: (args) => <PricingComparison {...args} />,
  args: {
    plans: [
      { name: "Starter" },
      { name: "Professional", featured: true },
      { name: "Enterprise" },
    ],
    categories: [
      {
        name: "Features",
        features: [
          { name: "Projects", values: ["5", "Unlimited", "Unlimited"] },
          { name: "Storage", values: ["10GB", "100GB", "Unlimited"] },
          { name: "Team members", values: ["1", "10", "Unlimited"] },
        ],
      },
      {
        name: "Support",
        features: [
          { name: "Email support", values: [true, true, true] },
          { name: "Priority support", values: [false, true, true] },
          { name: "Phone support", values: [false, false, true] },
          { name: "Dedicated manager", values: [false, false, true] },
        ],
      },
      {
        name: "Security",
        features: [
          { name: "SSL encryption", values: [true, true, true] },
          { name: "Two-factor auth", values: [true, true, true] },
          { name: "SSO/SAML", values: [false, false, true] },
          { name: "Custom security", values: [false, false, true] },
        ],
      },
    ],
  },
};
