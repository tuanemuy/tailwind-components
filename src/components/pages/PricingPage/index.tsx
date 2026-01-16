"use client";

import React, { forwardRef, type ReactNode, useState } from "react";
import { Badge, Button, Link } from "@/components/atoms";
import {
  CompleteFAQSection,
  CompletePricingSection,
  type FAQItem,
  Footer,
  Header,
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
  PageContent,
  PageLayout,
  PageSection,
  type PricingSectionPlan,
} from "@/components/organisms";
import { CheckIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

// PricingPage props
export interface PricingPageProps extends React.HTMLAttributes<HTMLDivElement> {
  plans: PricingSectionPlan[];
  faqs?: FAQItem[];
  billingPeriod?: "monthly" | "yearly";
  onBillingPeriodChange?: (period: "monthly" | "yearly") => void;
  onPlanSelect?: (planId: string) => void;
  yearlyDiscount?: number;
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  navigation?: {
    label: string;
    href: string;
  }[];
  header?: ReactNode;
  footer?: ReactNode;
  title?: string;
  subtitle?: string;
  showFAQ?: boolean;
  showComparison?: boolean;
  trustedBy?: {
    label: string;
    logos: ReactNode[];
  };
  guarantee?: {
    title: string;
    description: string;
  };
}

export const PricingPage = forwardRef<HTMLDivElement, PricingPageProps>(
  (
    {
      className,
      plans,
      faqs = [],
      billingPeriod: controlledBillingPeriod,
      onBillingPeriodChange,
      onPlanSelect,
      yearlyDiscount = 20,
      logo,
      logoText = "Pricing",
      logoHref = "/",
      navigation = [],
      header,
      footer,
      title = "Simple, transparent pricing",
      subtitle = "Choose the plan that's right for you. All plans include a 14-day free trial.",
      showFAQ = true,
      trustedBy,
      guarantee,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalBillingPeriod, setInternalBillingPeriod] = useState<
      "monthly" | "yearly"
    >("monthly");
    const billingPeriod = controlledBillingPeriod ?? internalBillingPeriod;

    const handleBillingPeriodChange = (period: "monthly" | "yearly") => {
      setInternalBillingPeriod(period);
      onBillingPeriodChange?.(period);
    };
    void billingPeriod;
    void handleBillingPeriodChange;

    const renderHeader = () => {
      if (header) return header;

      return (
        <Header
          variant="bordered"
          sticky
          logo={
            <HeaderLogo href={logoHref} text={logoText}>
              {logo}
            </HeaderLogo>
          }
          navigation={
            navigation.length > 0 && (
              <HeaderNav>
                {navigation.map((item) => (
                  <HeaderNavItem key={item.href} href={item.href}>
                    {item.label}
                  </HeaderNavItem>
                ))}
              </HeaderNav>
            )
          }
          actions={
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          }
        />
      );
    };

    const defaultFAQs: FAQItem[] = [
      {
        id: "faq-1",
        question: "Can I change plans later?",
        answer:
          "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
      },
      {
        id: "faq-2",
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay by invoice.",
      },
      {
        id: "faq-3",
        question: "Is there a free trial?",
        answer:
          "Yes, all plans include a 14-day free trial. No credit card required to start.",
      },
      {
        id: "faq-4",
        question: "Can I cancel anytime?",
        answer:
          "Absolutely. You can cancel your subscription at any time with no questions asked. You'll continue to have access until the end of your billing period.",
      },
      {
        id: "faq-5",
        question: "Do you offer refunds?",
        answer:
          "We offer a 30-day money-back guarantee. If you're not satisfied, contact us within 30 days of your purchase for a full refund.",
      },
    ];

    return (
      <PageLayout
        ref={ref}
        header={renderHeader()}
        footer={
          footer || <Footer variant="simple" copyright="All rights reserved." />
        }
        className={className}
        {...props}
      >
        <PageContent maxWidth="6xl" padding="lg">
          {/* Pricing Section */}
          <PageSection>
            <CompletePricingSection
              title={title}
              subtitle={subtitle}
              plans={plans}
              onSelectPlan={onPlanSelect ? (planId) => onPlanSelect(planId) : undefined}
              yearlyDiscount={yearlyDiscount ? `Save ${yearlyDiscount}%` : undefined}
            />
          </PageSection>

          {/* Trusted by logos */}
          {trustedBy && (
            <PageSection>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-6">
                  {trustedBy.label}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                  {trustedBy.logos}
                </div>
              </div>
            </PageSection>
          )}

          {/* Money-back guarantee */}
          {guarantee && (
            <PageSection>
              <div className="text-center max-w-2xl mx-auto p-8 rounded-2xl bg-muted/50 border border-border">
                <div className="size-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <CheckIcon className="size-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {guarantee.title}
                </h3>
                <p className="text-muted-foreground">{guarantee.description}</p>
              </div>
            </PageSection>
          )}

          {/* FAQ Section */}
          {showFAQ && (
            <PageSection>
              <CompleteFAQSection
                title="Frequently asked questions"
                subtitle="Everything you need to know about our pricing and plans."
                items={faqs.length > 0 ? faqs : defaultFAQs}
                variant="default"
              />
            </PageSection>
          )}

          {/* Custom content */}
          {children}
        </PageContent>
      </PageLayout>
    );
  },
);
PricingPage.displayName = "PricingPage";

// Pricing comparison table component
export interface PricingComparisonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  plans: {
    name: string;
    featured?: boolean;
  }[];
  categories: {
    name: string;
    features: {
      name: string;
      values: (boolean | string)[];
    }[];
  }[];
}

export const PricingComparison = forwardRef<
  HTMLDivElement,
  PricingComparisonProps
>(({ className, plans, categories, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("overflow-x-auto", className)} {...props}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-4 border-b border-border font-medium text-foreground">
              Features
            </th>
            {plans.map((plan) => (
              <th
                key={plan.name}
                className={cn(
                  "text-center p-4 border-b font-medium",
                  plan.featured
                    ? "bg-primary/5 text-primary border-primary/20"
                    : "text-foreground border-border",
                )}
              >
                {plan.name}
                {plan.featured && (
                  <Badge variant="default" size="sm" className="ml-2">
                    Popular
                  </Badge>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <React.Fragment key={category.name}>
              <tr>
                <td
                  colSpan={plans.length + 1}
                  className="p-4 bg-muted/50 font-semibold text-foreground"
                >
                  {category.name}
                </td>
              </tr>
              {category.features.map((feature) => (
                <tr key={`${category.name}-${feature.name}`}>
                  <td className="p-4 border-b border-border text-foreground">
                    {feature.name}
                  </td>
                  {feature.values.map((value, valIndex) => (
                    <td
                      key={plans[valIndex]?.name ?? `value-${valIndex}`}
                      className={cn(
                        "text-center p-4 border-b",
                        plans[valIndex]?.featured
                          ? "bg-primary/5 border-primary/20"
                          : "border-border",
                      )}
                    >
                      {typeof value === "boolean" ? (
                        value ? (
                          <CheckIcon className="size-5 text-success mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )
                      ) : (
                        <span className="text-foreground">{value}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
});
PricingComparison.displayName = "PricingComparison";
