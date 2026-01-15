import type { Meta, StoryObj } from "@storybook/react";
import {
  FAQSection,
  FAQSectionHeader,
  FAQSectionTitle,
  FAQSectionSubtitle,
  FAQList,
  FAQAccordionItem,
  FAQSimpleItem,
  FAQGrid,
  FAQCategories,
  CompleteFAQSection,
  type FAQItem,
} from ".";
import { useState } from "react";

const meta: Meta<typeof FAQSection> = {
  title: "Organisms/Marketing/FAQSection",
  component: FAQSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof FAQSection>;

const sampleFAQs: FAQItem[] = [
  {
    id: "1",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.",
    category: "Billing",
  },
  {
    id: "2",
    question: "Can I cancel my subscription at any time?",
    answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.",
    category: "Billing",
  },
  {
    id: "3",
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 14-day free trial for all our plans. No credit card required to start.",
    category: "Billing",
  },
  {
    id: "4",
    question: "How do I get started?",
    answer: "Simply sign up for an account, choose your plan, and you'll be guided through the onboarding process. Our team is available to help if you have any questions.",
    category: "Getting Started",
  },
  {
    id: "5",
    question: "Do you offer customer support?",
    answer: "Yes, we offer 24/7 customer support via email and live chat. Enterprise customers also get access to phone support and a dedicated account manager.",
    category: "Support",
  },
  {
    id: "6",
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the start of your next billing cycle.",
    category: "Billing",
  },
];

export const Default: Story = {
  render: () => (
    <FAQSection>
      <FAQSectionHeader>
        <FAQSectionTitle>Frequently Asked Questions</FAQSectionTitle>
        <FAQSectionSubtitle>
          Find answers to common questions about our product
        </FAQSectionSubtitle>
      </FAQSectionHeader>

      <FAQList>
        {sampleFAQs.map((faq) => (
          <FAQAccordionItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </FAQList>
    </FAQSection>
  ),
};

export const BorderedVariant: Story = {
  render: () => (
    <FAQSection>
      <FAQSectionHeader>
        <FAQSectionTitle>Have Questions?</FAQSectionTitle>
        <FAQSectionSubtitle>
          Here are some of the most common questions we receive
        </FAQSectionSubtitle>
      </FAQSectionHeader>

      <FAQList gap="md">
        {sampleFAQs.slice(0, 4).map((faq) => (
          <FAQAccordionItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            variant="bordered"
          />
        ))}
      </FAQList>
    </FAQSection>
  ),
};

export const SeparatedVariant: Story = {
  render: () => (
    <FAQSection backgroundColor="muted">
      <FAQSectionHeader>
        <FAQSectionTitle>Common Questions</FAQSectionTitle>
      </FAQSectionHeader>

      <FAQList gap="sm">
        {sampleFAQs.slice(0, 4).map((faq) => (
          <FAQAccordionItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            variant="separated"
          />
        ))}
      </FAQList>
    </FAQSection>
  ),
};

export const PlusMinusIcon: Story = {
  render: () => (
    <FAQSection>
      <FAQSectionHeader>
        <FAQSectionTitle>FAQ</FAQSectionTitle>
      </FAQSectionHeader>

      <FAQList>
        {sampleFAQs.slice(0, 4).map((faq) => (
          <FAQAccordionItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            iconStyle="plus-minus"
          />
        ))}
      </FAQList>
    </FAQSection>
  ),
};

export const SimpleList: Story = {
  render: () => (
    <FAQSection>
      <FAQSectionHeader>
        <FAQSectionTitle>Questions & Answers</FAQSectionTitle>
      </FAQSectionHeader>

      <FAQList>
        <dl className="space-y-6">
          {sampleFAQs.slice(0, 4).map((faq) => (
            <FAQSimpleItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </dl>
      </FAQList>
    </FAQSection>
  ),
};

export const TwoColumnGrid: Story = {
  render: () => (
    <FAQSection>
      <FAQSectionHeader>
        <FAQSectionTitle>Frequently Asked Questions</FAQSectionTitle>
      </FAQSectionHeader>

      <FAQGrid columns={2}>
        {sampleFAQs.map((faq) => (
          <FAQSimpleItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </FAQGrid>
    </FAQSection>
  ),
};

export const WithCategories: Story = {
  render: function Render() {
    const categories = ["Billing", "Getting Started", "Support"];
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    const filteredFAQs = sampleFAQs.filter((faq) => faq.category === activeCategory);

    return (
      <FAQSection>
        <FAQSectionHeader>
          <FAQSectionTitle>How can we help?</FAQSectionTitle>
        </FAQSectionHeader>

        <FAQCategories
          categories={categories.map((name) => ({
            name,
            count: sampleFAQs.filter((f) => f.category === name).length,
          }))}
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />

        <FAQList>
          {filteredFAQs.map((faq) => (
            <FAQAccordionItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </FAQList>
      </FAQSection>
    );
  },
};

export const CompleteFAQSectionExample: Story = {
  name: "CompleteFAQSection",
  render: () => (
    <CompleteFAQSection
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about our product"
      items={sampleFAQs}
      contactCTA={{
        text: "Still have questions?",
        linkText: "Contact our support team",
        href: "#",
      }}
    />
  ),
};

export const WithCategoriesComplete: Story = {
  render: () => (
    <CompleteFAQSection
      title="Help Center"
      subtitle="Find answers to your questions"
      items={sampleFAQs}
      enableCategories
      variant="bordered"
    />
  ),
};
