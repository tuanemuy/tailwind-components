import type { Meta, StoryObj } from "@storybook/react";
import {
  PaymentGradientCard,
  type PricingPlanItem,
  PricingPlans,
  TransactionDetails,
} from "./index";

// =============================================================================
// PaymentGradientCard Stories
// =============================================================================

const paymentGradientCardMeta: Meta<typeof PaymentGradientCard> = {
  title: "Organisms/FinanceExtension/PaymentGradientCard",
  component: PaymentGradientCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default paymentGradientCardMeta;
type PaymentGradientCardStory = StoryObj<typeof PaymentGradientCard>;

export const VisaCard: PaymentGradientCardStory = {
  args: {
    cardNumber: "4532123456781234",
    cardHolder: "JOHN DOE",
    expiryDate: "12/28",
    cardType: "visa",
    isDefault: true,
  },
};

export const MastercardCard: PaymentGradientCardStory = {
  args: {
    cardNumber: "5425123456781234",
    cardHolder: "JANE SMITH",
    expiryDate: "06/27",
    cardType: "mastercard",
  },
};

export const AmexCard: PaymentGradientCardStory = {
  args: {
    cardNumber: "371234567812345",
    cardHolder: "ROBERT JOHNSON",
    expiryDate: "09/26",
    cardType: "amex",
    isSelected: true,
  },
};

export const CompactVariant: PaymentGradientCardStory = {
  args: {
    cardNumber: "4532123456781234",
    cardHolder: "JOHN DOE",
    expiryDate: "12/28",
    cardType: "visa",
    variant: "compact",
    isDefault: true,
  },
};

export const MinimalVariant: PaymentGradientCardStory = {
  args: {
    cardNumber: "4532123456781234",
    cardHolder: "JOHN DOE",
    expiryDate: "12/28",
    cardType: "visa",
    variant: "minimal",
    isDefault: true,
    onSelect: () => console.log("Card selected"),
  },
};

export const WithActions: PaymentGradientCardStory = {
  args: {
    cardNumber: "4532123456781234",
    cardHolder: "JOHN DOE",
    expiryDate: "12/28",
    cardType: "mastercard",
    onEdit: () => console.log("Edit clicked"),
    onDelete: () => console.log("Delete clicked"),
  },
};

export const CardGrid: StoryObj = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <PaymentGradientCard
        cardNumber="4532123456781234"
        cardHolder="JOHN DOE"
        expiryDate="12/28"
        cardType="visa"
        isDefault
      />
      <PaymentGradientCard
        cardNumber="5425123456781234"
        cardHolder="JANE SMITH"
        expiryDate="06/27"
        cardType="mastercard"
      />
      <PaymentGradientCard
        cardNumber="371234567812345"
        cardHolder="ROBERT JOHNSON"
        expiryDate="09/26"
        cardType="amex"
      />
    </div>
  ),
};

export const SelectableCards: StoryObj = {
  render: () => {
    return (
      <div className="space-y-4 p-6 max-w-md">
        <h3 className="font-semibold mb-4">Select a payment method</h3>
        <PaymentGradientCard
          cardNumber="4532123456781234"
          cardHolder="JOHN DOE"
          expiryDate="12/28"
          cardType="visa"
          variant="minimal"
          isDefault
          isSelected
          onSelect={() => {}}
        />
        <PaymentGradientCard
          cardNumber="5425123456781234"
          cardHolder="JANE SMITH"
          expiryDate="06/27"
          cardType="mastercard"
          variant="minimal"
          onSelect={() => {}}
        />
        <PaymentGradientCard
          cardNumber="371234567812345"
          cardHolder="ROBERT JOHNSON"
          expiryDate="09/26"
          cardType="amex"
          variant="minimal"
          onSelect={() => {}}
        />
      </div>
    );
  },
};

// =============================================================================
// PricingPlans Stories
// =============================================================================

const samplePlans: PricingPlanItem[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals",
    monthlyPrice: 9,
    yearlyPrice: 90,
    features: [
      { text: "Up to 5 projects", included: true },
      { text: "Basic analytics", included: true },
      { text: "48-hour support response", included: true },
      { text: "Team collaboration", included: false },
      { text: "Advanced security", included: false },
    ],
    ctaText: "Start Free Trial",
    ctaVariant: "outline",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Best for growing teams",
    monthlyPrice: 29,
    yearlyPrice: 290,
    badge: "Most Popular",
    highlighted: true,
    popular: true,
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Advanced analytics", included: true },
      { text: "24-hour support response", included: true },
      { text: "Team collaboration", included: true, highlight: true },
      { text: "Advanced security", included: false },
    ],
    ctaText: "Get Started",
    ctaVariant: "primary",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Custom analytics", included: true },
      { text: "1-hour support response", included: true },
      { text: "Team collaboration", included: true },
      { text: "Advanced security", included: true, highlight: true },
    ],
    ctaText: "Contact Sales",
    ctaVariant: "outline",
  },
];

const faqItems = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! All plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
];

export const PricingPlansCards: StoryObj<typeof PricingPlans> = {
  render: () => (
    <div className="p-8 bg-background">
      <PricingPlans
        plans={samplePlans}
        title="Simple, transparent pricing"
        subtitle="Choose the plan that fits your needs. All plans include a 14-day free trial."
        variant="cards"
        yearlyDiscount="Save 20%"
        onSelectPlan={(planId, cycle) =>
          console.log(`Selected: ${planId} (${cycle})`)
        }
      />
    </div>
  ),
  name: "Pricing Plans - Cards",
};

export const PricingPlansComparison: StoryObj<typeof PricingPlans> = {
  render: () => (
    <div className="p-8 bg-background">
      <PricingPlans
        plans={samplePlans}
        title="Compare Plans"
        subtitle="Find the perfect plan for your needs"
        variant="comparison"
        onSelectPlan={(planId, cycle) =>
          console.log(`Selected: ${planId} (${cycle})`)
        }
      />
    </div>
  ),
  name: "Pricing Plans - Comparison Table",
};

export const PricingPlansCompact: StoryObj<typeof PricingPlans> = {
  render: () => (
    <div className="p-8 bg-background">
      <PricingPlans
        plans={samplePlans}
        title="Choose Your Plan"
        variant="compact"
        onSelectPlan={(planId, cycle) =>
          console.log(`Selected: ${planId} (${cycle})`)
        }
      />
    </div>
  ),
  name: "Pricing Plans - Compact",
};

export const PricingPlansWithFAQ: StoryObj<typeof PricingPlans> = {
  render: () => (
    <div className="p-8 bg-background">
      <PricingPlans
        plans={samplePlans}
        title="Pricing Plans"
        subtitle="Start free, upgrade when you need"
        variant="cards"
        faqItems={faqItems}
        onSelectPlan={(planId, cycle) =>
          console.log(`Selected: ${planId} (${cycle})`)
        }
      />
    </div>
  ),
  name: "Pricing Plans - With FAQ",
};

// =============================================================================
// TransactionDetails Stories
// =============================================================================

export const TransactionDetailsCard: StoryObj<typeof TransactionDetails> = {
  render: () => (
    <div className="p-8 max-w-2xl">
      <TransactionDetails
        transactionId="TXN-2024-001234"
        type="transfer"
        status="completed"
        amount="$1,250.00"
        date="January 15, 2026"
        time="2:30 PM"
        from={{
          name: "John Doe",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          accountNumber: "1234567890",
          bankName: "First Bank",
        }}
        to={{
          name: "Jane Smith",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
          accountNumber: "0987654321",
          bankName: "Second Bank",
        }}
        description="Monthly rent payment"
        reference="REF-2024-001234"
        fee="$2.50"
        note="Payment for January 2026"
        onCopy={() => console.log("Copied")}
        onPrint={() => console.log("Print")}
        onDownload={() => console.log("Download")}
        onShare={() => console.log("Share")}
      />
    </div>
  ),
  name: "Transaction Details - Card",
};

export const TransactionDetailsReceipt: StoryObj<typeof TransactionDetails> = {
  render: () => (
    <div className="p-8">
      <TransactionDetails
        transactionId="TXN-2024-001234"
        type="payment"
        status="completed"
        amount="$85.00"
        date="January 15, 2026"
        time="3:45 PM"
        from={{
          name: "John Doe",
        }}
        to={{
          name: "Netflix",
        }}
        reference="REF-NETFLIX-001"
        fee="$0.00"
        note="Monthly subscription"
        variant="receipt"
        onDownload={() => console.log("Download")}
        onShare={() => console.log("Share")}
      />
    </div>
  ),
  name: "Transaction Details - Receipt",
};

export const TransactionDetailsPending: StoryObj<typeof TransactionDetails> = {
  render: () => (
    <div className="p-8 max-w-2xl">
      <TransactionDetails
        transactionId="TXN-2024-001235"
        type="transfer"
        status="pending"
        amount="$500.00"
        date="January 15, 2026"
        time="4:00 PM"
        from={{
          name: "John Doe",
          accountNumber: "1234567890",
        }}
        to={{
          name: "Sarah Wilson",
          accountNumber: "5678901234",
        }}
        description="Gift money"
        timeline={[
          {
            status: "Transaction Initiated",
            timestamp: "Jan 15, 2026 4:00 PM",
            completed: true,
          },
          {
            status: "Processing",
            timestamp: "Jan 15, 2026 4:01 PM",
            description: "Transaction is being processed",
            completed: true,
          },
          {
            status: "Pending Approval",
            timestamp: "Waiting",
            description: "Awaiting bank approval",
            completed: false,
          },
          {
            status: "Completed",
            timestamp: "Expected: Jan 16, 2026",
            completed: false,
          },
        ]}
        onCancel={() => console.log("Cancel")}
      />
    </div>
  ),
  name: "Transaction Details - Pending with Timeline",
};

export const TransactionDetailsFailed: StoryObj<typeof TransactionDetails> = {
  render: () => (
    <div className="p-8 max-w-2xl">
      <TransactionDetails
        transactionId="TXN-2024-001236"
        type="payment"
        status="failed"
        amount="$150.00"
        date="January 15, 2026"
        time="5:30 PM"
        to={{
          name: "Amazon",
        }}
        description="Online purchase"
        timeline={[
          {
            status: "Transaction Initiated",
            timestamp: "Jan 15, 2026 5:30 PM",
            completed: true,
          },
          {
            status: "Processing",
            timestamp: "Jan 15, 2026 5:31 PM",
            completed: true,
          },
          {
            status: "Failed",
            timestamp: "Jan 15, 2026 5:32 PM",
            description: "Insufficient funds",
            completed: false,
          },
        ]}
        onRetry={() => console.log("Retry")}
      />
    </div>
  ),
  name: "Transaction Details - Failed",
};

export const PaymentRequest: StoryObj<typeof TransactionDetails> = {
  render: () => (
    <div className="p-8 max-w-2xl">
      <TransactionDetails
        transactionId="REQ-2024-001237"
        type="request"
        status="pending"
        amount="$75.00"
        date="January 14, 2026"
        from={{
          name: "Mike Johnson",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
          email: "mike@example.com",
        }}
        description="Dinner split from last Saturday"
        note="Please pay when you can!"
        items={[
          { label: "Subtotal", value: "$75.00" },
          { label: "Processing Fee", value: "$0.00" },
          { label: "Total", value: "$75.00" },
        ]}
      />
    </div>
  ),
  name: "Payment Request",
};

export const TransactionWithItems: StoryObj<typeof TransactionDetails> = {
  render: () => (
    <div className="p-8 max-w-2xl">
      <TransactionDetails
        transactionId="INV-2024-001238"
        type="payment"
        status="completed"
        amount="$324.50"
        date="January 15, 2026"
        to={{
          name: "Apple Store",
        }}
        description="Electronics purchase"
        items={[
          { label: "AirPods Pro", value: "$249.00" },
          { label: "Lightning Cable", value: "$29.00" },
          { label: "Subtotal", value: "$278.00" },
          { label: "Tax (8.25%)", value: "$22.94" },
          { label: "Shipping", value: "$0.00" },
          { label: "Discount (10%)", value: "-$27.80" },
          { label: "Total", value: "$324.50" },
        ]}
        onDownload={() => console.log("Download")}
      />
    </div>
  ),
  name: "Transaction with Line Items",
};
