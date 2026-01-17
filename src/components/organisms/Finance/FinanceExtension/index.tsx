"use client";

import { forwardRef, type ReactNode, useState } from "react";
import { Avatar, Badge, Button, Separator } from "@/components/atoms";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  CopyIcon,
  CreditCardIcon,
  DownloadIcon,
  PrinterIcon,
  ShareIcon,
  XCircleIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

// =============================================================================
// PaymentGradientCard - Gradient Credit Card Display
// =============================================================================

export type GradientCardType =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "custom";

export interface PaymentGradientCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cardType?: GradientCardType;
  cvv?: string;
  showCvv?: boolean;
  isDefault?: boolean;
  isSelected?: boolean;
  variant?: "horizontal" | "compact" | "minimal";
  gradientFrom?: string;
  gradientTo?: string;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const cardGradients: Record<GradientCardType, string> = {
  visa: "from-blue-600 via-blue-700 to-blue-900",
  mastercard: "from-orange-500 via-red-500 to-red-700",
  amex: "from-slate-600 via-slate-700 to-slate-900",
  discover: "from-orange-400 via-orange-500 to-orange-700",
  custom: "from-primary via-primary/80 to-primary/60",
};

const cardLogos: Record<GradientCardType, string> = {
  visa: "VISA",
  mastercard: "MC",
  amex: "AMEX",
  discover: "DISCOVER",
  custom: "",
};

export const PaymentGradientCard = forwardRef<
  HTMLDivElement,
  PaymentGradientCardProps
>(
  (
    {
      className,
      cardNumber,
      cardHolder,
      expiryDate,
      cardType = "visa",
      cvv,
      showCvv = false,
      isDefault = false,
      isSelected = false,
      variant = "horizontal",
      gradientFrom,
      gradientTo,
      onSelect,
      onEdit,
      onDelete,
      ...props
    },
    ref,
  ) => {
    const maskedNumber =
      cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ").slice(0, -4) +
      cardNumber.slice(-4);
    void maskedNumber;
    const displayNumber = `•••• •••• •••• ${cardNumber.slice(-4)}`;

    const gradientClass =
      gradientFrom && gradientTo
        ? `from-[${gradientFrom}] to-[${gradientTo}]`
        : cardGradients[cardType];

    if (variant === "minimal") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-3 p-3 rounded-lg border bg-card transition-all",
            isSelected && "ring-2 ring-primary border-primary",
            onSelect && "cursor-pointer hover:bg-muted/50",
            className,
          )}
          {...(onSelect && {
            role: "button",
            tabIndex: 0,
            onClick: onSelect,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
              }
            },
          })}
          {...props}
        >
          <div
            className={cn(
              "size-10 rounded-md bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold",
              gradientClass,
            )}
          >
            {cardLogos[cardType]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium">{displayNumber}</p>
            <p className="text-sm text-muted-foreground">{cardHolder}</p>
          </div>
          {isDefault && (
            <Badge variant="secondary" size="sm">
              Default
            </Badge>
          )}
          {isSelected && <CheckIcon className="size-5 text-primary" />}
        </div>
      );
    }

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-xl p-4 bg-gradient-to-br text-white shadow-lg",
            gradientClass,
            isSelected &&
              "ring-2 ring-white ring-offset-2 ring-offset-background",
            onSelect && "cursor-pointer",
            className,
          )}
          {...(onSelect && {
            role: "button",
            tabIndex: 0,
            onClick: onSelect,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
              }
            },
          })}
          {...props}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm opacity-80">
              {cardLogos[cardType] || "CARD"}
            </span>
            {isDefault && (
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-0 text-xs"
              >
                Default
              </Badge>
            )}
          </div>
          <p className="text-lg tracking-wider mb-3">{displayNumber}</p>
          <div className="flex justify-between text-sm">
            <span className="opacity-80 truncate">{cardHolder}</span>
            <span>{expiryDate}</span>
          </div>
        </div>
      );
    }

    // Horizontal (default) variant
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-sm aspect-[1.586/1] rounded-2xl p-6 bg-gradient-to-br text-white shadow-xl overflow-hidden",
          gradientClass,
          isSelected &&
            "ring-4 ring-white/50 ring-offset-2 ring-offset-background",
          onSelect && "cursor-pointer transition-transform hover:scale-105",
          className,
        )}
        {...(onSelect && {
          role: "button",
          tabIndex: 0,
          onClick: onSelect,
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect();
            }
          },
        })}
        {...props}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white" />
          <div className="absolute -left-10 -bottom-10 size-40 rounded-full bg-white" />
        </div>

        {/* Card content */}
        <div className="relative h-full flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <CreditCardIcon className="size-6" />
              {isDefault && (
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-0 text-xs"
                >
                  Default
                </Badge>
              )}
            </div>
            <span className="text-lg font-bold tracking-wider">
              {cardLogos[cardType] || "CARD"}
            </span>
          </div>

          {/* Card number */}
          <div className="space-y-1">
            <p className="text-xs opacity-60 uppercase tracking-wide">
              Card Number
            </p>
            <p className="text-xl md:text-2xl tracking-widest font-mono">
              {displayNumber}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs opacity-60 uppercase tracking-wide">
                Card Holder
              </p>
              <p className="font-medium uppercase tracking-wide truncate max-w-[150px]">
                {cardHolder}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-60 uppercase tracking-wide">
                Expires
              </p>
              <p className="font-medium">{expiryDate}</p>
            </div>
            {showCvv && cvv && (
              <div className="text-right">
                <p className="text-xs opacity-60 uppercase tracking-wide">
                  CVV
                </p>
                <p className="font-medium">{cvv}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        {(onEdit || onDelete) && (
          <div className="absolute top-3 right-3 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
            {onEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <span className="sr-only">Edit</span>
                <svg
                  aria-hidden="true"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <span className="sr-only">Delete</span>
                <svg
                  aria-hidden="true"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);
PaymentGradientCard.displayName = "PaymentGradientCard";

// =============================================================================
// PricingPlans - Pricing Plan Comparison Component
// =============================================================================

export interface PricingPlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
  tooltip?: string;
}

export interface PricingPlanItem {
  id: string;
  name: string;
  description?: string;
  monthlyPrice: number;
  yearlyPrice?: number;
  currency?: string;
  features: PricingPlanFeature[];
  badge?: string;
  highlighted?: boolean;
  ctaText?: string;
  ctaVariant?: "primary" | "secondary" | "outline";
  popular?: boolean;
}

export interface PricingPlansProps
  extends React.HTMLAttributes<HTMLDivElement> {
  plans: PricingPlanItem[];
  billingCycle?: "monthly" | "yearly";
  onBillingCycleChange?: (cycle: "monthly" | "yearly") => void;
  onSelectPlan?: (planId: string, billingCycle: "monthly" | "yearly") => void;
  showComparison?: boolean;
  variant?: "cards" | "comparison" | "compact";
  title?: string;
  subtitle?: string;
  yearlyDiscount?: string;
  faqItems?: Array<{ question: string; answer: string }>;
}

export const PricingPlans = forwardRef<HTMLDivElement, PricingPlansProps>(
  (
    {
      className,
      plans,
      billingCycle: controlledBillingCycle,
      onBillingCycleChange,
      onSelectPlan,
      showComparison = false,
      variant = "cards",
      title,
      subtitle,
      yearlyDiscount = "Save 20%",
      faqItems = [],
      ...props
    },
    ref,
  ) => {
    const [internalBillingCycle, setInternalBillingCycle] = useState<
      "monthly" | "yearly"
    >("monthly");
    const billingCycle = controlledBillingCycle ?? internalBillingCycle;

    const handleBillingCycleChange = (cycle: "monthly" | "yearly") => {
      setInternalBillingCycle(cycle);
      onBillingCycleChange?.(cycle);
    };

    const formatPrice = (price: number, currency = "USD") => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    };

    const getPrice = (plan: PricingPlanItem) => {
      if (billingCycle === "yearly" && plan.yearlyPrice !== undefined) {
        return plan.yearlyPrice;
      }
      return plan.monthlyPrice;
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <button
            type="button"
            onClick={() => handleBillingCycleChange("monthly")}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors rounded-md",
              billingCycle === "monthly"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => handleBillingCycleChange("yearly")}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors rounded-md",
              billingCycle === "yearly"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Yearly
            {yearlyDiscount && (
              <Badge
                variant="success"
                size="sm"
                className="absolute -top-2 -right-4 text-xs"
              >
                {yearlyDiscount}
              </Badge>
            )}
          </button>
        </div>

        {/* Plans Grid */}
        {variant === "cards" && (
          <div
            className={cn(
              "grid gap-6",
              plans.length <= 3
                ? `grid-cols-1 md:grid-cols-${plans.length}`
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
            )}
          >
            {plans.map((plan) => (
              <PricingPlanCard
                key={plan.id}
                plan={plan}
                price={getPrice(plan)}
                billingCycle={billingCycle}
                formatPrice={formatPrice}
                onSelect={() => onSelectPlan?.(plan.id, billingCycle)}
              />
            ))}
          </div>
        )}

        {/* Comparison Table */}
        {variant === "comparison" && (
          <PricingComparisonTableComponent
            plans={plans}
            getPrice={getPrice}
            billingCycle={billingCycle}
            formatPrice={formatPrice}
            onSelectPlan={onSelectPlan}
          />
        )}

        {/* Compact Variant */}
        {variant === "compact" && (
          <div className="space-y-4 max-w-2xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all",
                  plan.highlighted
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50",
                )}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{plan.name}</h3>
                    {plan.popular && (
                      <Badge variant="default" size="sm">
                        Popular
                      </Badge>
                    )}
                  </div>
                  {plan.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {plan.description}
                    </p>
                  )}
                </div>
                <div className="text-right mr-4">
                  <p className="text-2xl font-bold">
                    {formatPrice(getPrice(plan), plan.currency)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    /{billingCycle === "yearly" ? "year" : "month"}
                  </p>
                </div>
                <Button
                  variant={plan.highlighted ? "primary" : "outline"}
                  onClick={() => onSelectPlan?.(plan.id, billingCycle)}
                >
                  {plan.ctaText || "Select"}
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* FAQ Section */}
        {faqItems.length > 0 && (
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <PricingFAQItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);
PricingPlans.displayName = "PricingPlans";

// PricingPlanCard subcomponent
interface PricingPlanCardInternalProps {
  plan: PricingPlanItem;
  price: number;
  billingCycle: "monthly" | "yearly";
  formatPrice: (price: number, currency?: string) => string;
  onSelect?: () => void;
}

const PricingPlanCard = ({
  plan,
  price,
  billingCycle,
  formatPrice,
  onSelect,
}: PricingPlanCardInternalProps) => (
  <div
    className={cn(
      "relative flex flex-col rounded-xl border bg-card p-6",
      plan.highlighted
        ? "border-primary shadow-lg ring-1 ring-primary"
        : "border-border",
    )}
  >
    {plan.badge && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <Badge variant="default" size="sm">
          {plan.badge}
        </Badge>
      </div>
    )}

    <div className="text-center">
      <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
      {plan.description && (
        <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
      )}
    </div>

    <div className="mt-6 text-center">
      <div className="flex items-baseline justify-center gap-x-1">
        <span className="text-4xl font-bold text-foreground">
          {formatPrice(price, plan.currency)}
        </span>
        <span className="text-sm text-muted-foreground">
          /{billingCycle === "yearly" ? "year" : "month"}
        </span>
      </div>
    </div>

    <ul className="mt-6 flex-1 space-y-3">
      {plan.features.map((feature) => (
        <li key={feature.text} className="flex items-start gap-x-3">
          {feature.included ? (
            <CheckIcon className="mt-0.5 size-5 shrink-0 text-success" />
          ) : (
            <XCircleIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground/30" />
          )}
          <span
            className={cn(
              "text-sm",
              feature.included ? "text-foreground" : "text-muted-foreground",
              feature.highlight && "font-semibold",
            )}
          >
            {feature.text}
          </span>
        </li>
      ))}
    </ul>

    <Button
      variant={plan.ctaVariant || (plan.highlighted ? "primary" : "outline")}
      onClick={onSelect}
      className="mt-6 w-full"
    >
      {plan.ctaText || "Get Started"}
    </Button>
  </div>
);

// PricingComparisonTable subcomponent
interface PricingComparisonTableInternalProps {
  plans: PricingPlanItem[];
  getPrice: (plan: PricingPlanItem) => number;
  billingCycle: "monthly" | "yearly";
  formatPrice: (price: number, currency?: string) => string;
  onSelectPlan?: (planId: string, billingCycle: "monthly" | "yearly") => void;
}

const PricingComparisonTableComponent = ({
  plans,
  getPrice,
  billingCycle,
  formatPrice,
  onSelectPlan,
}: PricingComparisonTableInternalProps) => {
  const allFeatures = Array.from(
    new Set(plans.flatMap((plan) => plan.features.map((f) => f.text))),
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="p-4 text-left text-muted-foreground font-medium">
              Features
            </th>
            {plans.map((plan) => (
              <th
                key={plan.id}
                className={cn(
                  "p-4 text-center",
                  plan.highlighted && "bg-primary/5 rounded-t-xl",
                )}
              >
                <div className="space-y-2">
                  {plan.badge && (
                    <Badge variant="default" size="sm">
                      {plan.badge}
                    </Badge>
                  )}
                  <div className="text-lg font-semibold text-foreground">
                    {plan.name}
                  </div>
                  <div className="flex items-baseline justify-center gap-x-1">
                    <span className="text-2xl font-bold text-foreground">
                      {formatPrice(getPrice(plan), plan.currency)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /{billingCycle === "yearly" ? "yr" : "mo"}
                    </span>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((featureText, rowIndex) => (
            <tr
              key={featureText}
              className={cn(rowIndex % 2 === 0 && "bg-muted/30")}
            >
              <td className="p-4 text-sm text-foreground">{featureText}</td>
              {plans.map((plan) => {
                const feature = plan.features.find(
                  (f) => f.text === featureText,
                );
                const included = feature?.included ?? false;
                return (
                  <td
                    key={plan.id}
                    className={cn(
                      "p-4 text-center",
                      plan.highlighted && "bg-primary/5",
                    )}
                  >
                    {included ? (
                      <CheckCircleIcon className="mx-auto size-5 text-success" />
                    ) : (
                      <XCircleIcon className="mx-auto size-5 text-muted-foreground/30" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="p-4" />
            {plans.map((plan) => (
              <td
                key={plan.id}
                className={cn(
                  "p-4",
                  plan.highlighted && "bg-primary/5 rounded-b-xl",
                )}
              >
                <Button
                  variant={
                    plan.ctaVariant ||
                    (plan.highlighted ? "primary" : "outline")
                  }
                  onClick={() => onSelectPlan?.(plan.id, billingCycle)}
                  className="w-full"
                >
                  {plan.ctaText || "Get Started"}
                </Button>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

// PricingFAQItem subcomponent
interface PricingFAQItemProps {
  question: string;
  answer: string;
}

const PricingFAQItem = ({ question, answer }: PricingFAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium">{question}</span>
        <ChevronDownIcon
          className={cn(
            "size-5 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <p className="text-muted-foreground">{answer}</p>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// TransactionDetails - Transaction Detail Component
// =============================================================================

export type TransactionDetailType =
  | "transfer"
  | "payment"
  | "request"
  | "receipt";
export type TransactionDetailStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled";

export interface TransactionParty {
  name: string;
  avatar?: string;
  accountNumber?: string;
  bankName?: string;
  email?: string;
}

export interface TransactionDetailItem {
  label: string;
  value: string;
  status?: TransactionDetailStatus;
}

export interface TransactionDetailsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  transactionId: string;
  type: TransactionDetailType;
  status: TransactionDetailStatus;
  amount: string;
  currency?: string;
  date: string;
  time?: string;
  from?: TransactionParty;
  to?: TransactionParty;
  description?: string;
  reference?: string;
  fee?: string;
  note?: string;
  items?: TransactionDetailItem[];
  timeline?: Array<{
    status: string;
    timestamp: string;
    description?: string;
    completed: boolean;
  }>;
  variant?: "card" | "modal" | "receipt";
  onCopy?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  onPrint?: () => void;
  onRetry?: () => void;
  onCancel?: () => void;
}

const statusConfig: Record<
  TransactionDetailStatus,
  { label: string; color: string; icon: ReactNode }
> = {
  pending: {
    label: "Pending",
    color: "text-warning bg-warning/10",
    icon: <ClockIcon className="size-4" />,
  },
  processing: {
    label: "Processing",
    color: "text-info bg-info/10",
    icon: <ClockIcon className="size-4" />,
  },
  completed: {
    label: "Completed",
    color: "text-success bg-success/10",
    icon: <CheckCircleIcon className="size-4" />,
  },
  failed: {
    label: "Failed",
    color: "text-destructive bg-destructive/10",
    icon: <XCircleIcon className="size-4" />,
  },
  cancelled: {
    label: "Cancelled",
    color: "text-muted-foreground bg-muted",
    icon: <XCircleIcon className="size-4" />,
  },
};

export const TransactionDetails = forwardRef<
  HTMLDivElement,
  TransactionDetailsProps
>(
  (
    {
      className,
      transactionId,
      type,
      status,
      amount,
      currency = "USD",
      date,
      time,
      from,
      to,
      description,
      reference,
      fee,
      note,
      items,
      timeline,
      variant = "card",
      onCopy,
      onDownload,
      onShare,
      onPrint,
      onRetry,
      onCancel,
      ...props
    },
    ref,
  ) => {
    const statusInfo = statusConfig[status];

    const typeLabels: Record<TransactionDetailType, string> = {
      transfer: "Transfer",
      payment: "Payment",
      request: "Payment Request",
      receipt: "Receipt",
    };

    // Receipt variant
    if (variant === "receipt") {
      return (
        <div
          ref={ref}
          className={cn(
            "max-w-sm mx-auto bg-card border border-border rounded-xl overflow-hidden",
            className,
          )}
          {...props}
        >
          {/* Receipt header */}
          <div className="bg-primary/5 p-6 text-center">
            <div className="size-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
              {status === "completed" ? (
                <CheckCircleIcon className="size-6 text-success" />
              ) : (
                <ClockIcon className="size-6 text-warning" />
              )}
            </div>
            <h2 className="text-3xl font-bold">{amount}</h2>
            <p className="text-muted-foreground mt-1">{typeLabels[type]}</p>
            <Badge variant="secondary" className={cn("mt-3", statusInfo.color)}>
              {statusInfo.label}
            </Badge>
          </div>

          {/* Receipt details */}
          <div className="p-6 space-y-4">
            {from && (
              <div className="flex items-center gap-3">
                <Avatar
                  src={from.avatar}
                  alt={from.name}
                  fallback={from.name.charAt(0)}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-medium truncate">{from.name}</p>
                </div>
              </div>
            )}

            {to && (
              <div className="flex items-center gap-3">
                <Avatar
                  src={to.avatar}
                  alt={to.name}
                  fallback={to.name.charAt(0)}
                  size="sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground">To</p>
                  <p className="font-medium truncate">{to.name}</p>
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span>{date}</span>
              </div>
              {time && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span>{time}</span>
                </div>
              )}
              {reference && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono text-xs">{reference}</span>
                </div>
              )}
              {fee && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fee</span>
                  <span>{fee}</span>
                </div>
              )}
            </div>

            {note && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Note</p>
                  <p className="text-sm">{note}</p>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="p-4 border-t border-border flex gap-2">
            {onDownload && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onDownload}
              >
                <DownloadIcon className="size-4 mr-1" />
                Download
              </Button>
            )}
            {onShare && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onShare}
              >
                <ShareIcon className="size-4 mr-1" />
                Share
              </Button>
            )}
          </div>
        </div>
      );
    }

    // Card / Modal variant (default)
    return (
      <div
        ref={ref}
        className={cn(
          "bg-card border border-border rounded-xl overflow-hidden",
          variant === "modal" && "shadow-lg",
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {typeLabels[type]}
              </p>
              <h2 className="text-2xl font-bold mt-1">{amount}</h2>
            </div>
            <Badge
              variant="secondary"
              className={cn("flex items-center gap-1", statusInfo.color)}
            >
              {statusInfo.icon}
              {statusInfo.label}
            </Badge>
          </div>

          {/* Quick actions */}
          {(onCopy || onPrint) && (
            <div className="flex gap-2 mt-4">
              {onCopy && (
                <Button variant="ghost" size="sm" onClick={onCopy}>
                  <CopyIcon className="size-4 mr-1" />
                  Copy
                </Button>
              )}
              {onPrint && (
                <Button variant="ghost" size="sm" onClick={onPrint}>
                  <PrinterIcon className="size-4 mr-1" />
                  Print
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Parties */}
        {(from || to) && (
          <div className="p-6 border-b border-border">
            <div className="flex items-center">
              {from && (
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase mb-2">
                    From
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={from.avatar}
                      alt={from.name}
                      fallback={from.name.charAt(0)}
                      size="md"
                    />
                    <div>
                      <p className="font-medium">{from.name}</p>
                      {from.accountNumber && (
                        <p className="text-sm text-muted-foreground">
                          ••• {from.accountNumber.slice(-4)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {from && to && (
                <div className="px-4">
                  <ArrowRightIcon className="size-5 text-muted-foreground" />
                </div>
              )}

              {to && (
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase mb-2">
                    To
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={to.avatar}
                      alt={to.name}
                      fallback={to.name.charAt(0)}
                      size="md"
                    />
                    <div>
                      <p className="font-medium">{to.name}</p>
                      {to.accountNumber && (
                        <p className="text-sm text-muted-foreground">
                          ••• {to.accountNumber.slice(-4)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-mono text-sm">{transactionId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="text-sm">
                {date}
                {time && ` at ${time}`}
              </p>
            </div>
            {reference && (
              <div>
                <p className="text-sm text-muted-foreground">Reference</p>
                <p className="font-mono text-sm">{reference}</p>
              </div>
            )}
            {fee && (
              <div>
                <p className="text-sm text-muted-foreground">Fee</p>
                <p className="text-sm">{fee}</p>
              </div>
            )}
          </div>

          {description && (
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-sm">{description}</p>
            </div>
          )}

          {note && (
            <div>
              <p className="text-sm text-muted-foreground">Note</p>
              <p className="text-sm">{note}</p>
            </div>
          )}

          {/* Additional items */}
          {items && items.length > 0 && (
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between py-2 border-t border-border first:border-t-0"
                >
                  <span className="text-sm text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Timeline */}
        {timeline && timeline.length > 0 && (
          <div className="p-6 border-t border-border">
            <h3 className="font-semibold mb-4">Transaction Timeline</h3>
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" />
              {timeline.map((event) => (
                <div
                  key={`${event.status}-${event.timestamp}`}
                  className="relative"
                >
                  <div
                    className={cn(
                      "absolute -left-4 top-0.5 size-3 rounded-full border-2",
                      event.completed
                        ? "bg-success border-success"
                        : "bg-background border-muted-foreground",
                    )}
                  />
                  <div>
                    <p className="font-medium text-sm">{event.status}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.timestamp}
                    </p>
                    {event.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {(onRetry || onCancel || onDownload || onShare) && (
          <div className="p-6 border-t border-border flex flex-wrap gap-2">
            {status === "failed" && onRetry && (
              <Button onClick={onRetry}>Retry Transaction</Button>
            )}
            {status === "pending" && onCancel && (
              <Button variant="destructive" onClick={onCancel}>
                Cancel Transaction
              </Button>
            )}
            {onDownload && (
              <Button variant="outline" onClick={onDownload}>
                <DownloadIcon className="size-4 mr-2" />
                Download Receipt
              </Button>
            )}
            {onShare && (
              <Button variant="outline" onClick={onShare}>
                <ShareIcon className="size-4 mr-2" />
                Share
              </Button>
            )}
          </div>
        )}
      </div>
    );
  },
);
TransactionDetails.displayName = "TransactionDetails";

// Types are exported at their definitions above
