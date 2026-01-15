import { forwardRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge, Button } from "@/components/atoms";
import { CheckIcon, XIcon } from "@/lib/icons";

// Types
export interface PricingSectionFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingSectionPlan {
  id: string;
  name: string;
  description?: string;
  monthlyPrice: number | string;
  yearlyPrice?: number | string;
  currency?: string;
  features: PricingSectionFeature[];
  badge?: string;
  highlighted?: boolean;
  ctaText?: string;
  ctaVariant?: "primary" | "secondary" | "outline";
}

// PricingSection component
export interface PricingSectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: "sm" | "md" | "lg" | "xl";
  backgroundColor?: "default" | "muted";
}

const paddingClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

const backgroundClasses = {
  default: "bg-background",
  muted: "bg-muted/50",
};

export const PricingSection = forwardRef<HTMLElement, PricingSectionProps>(
  ({ className, padding = "lg", backgroundColor = "default", children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(paddingClasses[padding], backgroundClasses[backgroundColor], className)}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </section>
    );
  },
);
PricingSection.displayName = "PricingSection";

// PricingSectionHeader component
export interface PricingSectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export const PricingSectionHeader = forwardRef<HTMLDivElement, PricingSectionHeaderProps>(
  ({ className, align = "center", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mb-12 md:mb-16",
          align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
PricingSectionHeader.displayName = "PricingSectionHeader";

// PricingSectionTitle component
export interface PricingSectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3";
}

export const PricingSectionTitle = forwardRef<HTMLHeadingElement, PricingSectionTitleProps>(
  ({ className, as: Component = "h2", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("text-3xl font-bold text-foreground md:text-4xl", className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
PricingSectionTitle.displayName = "PricingSectionTitle";

// PricingSectionSubtitle component
export interface PricingSectionSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const PricingSectionSubtitle = forwardRef<HTMLParagraphElement, PricingSectionSubtitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("mt-4 text-lg text-muted-foreground", className)} {...props}>
        {children}
      </p>
    );
  },
);
PricingSectionSubtitle.displayName = "PricingSectionSubtitle";

// PricingBillingToggle component
export interface PricingBillingToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: "monthly" | "yearly";
  onChange: (value: "monthly" | "yearly") => void;
  monthlyLabel?: string;
  yearlyLabel?: string;
  yearlyDiscount?: string;
}

export const PricingBillingToggle = forwardRef<HTMLDivElement, PricingBillingToggleProps>(
  (
    {
      className,
      value,
      onChange,
      monthlyLabel = "Monthly",
      yearlyLabel = "Yearly",
      yearlyDiscount,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-4", className)}
        {...props}
      >
        <button
          type="button"
          onClick={() => onChange("monthly")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors",
            value === "monthly" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {monthlyLabel}
        </button>
        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted">
          <button
            type="button"
            onClick={() => onChange(value === "monthly" ? "yearly" : "monthly")}
            className={cn(
              "absolute size-5 rounded-full bg-primary transition-transform",
              value === "yearly" ? "translate-x-5" : "translate-x-0.5",
            )}
          />
        </div>
        <button
          type="button"
          onClick={() => onChange("yearly")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
            value === "yearly" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {yearlyLabel}
          {yearlyDiscount && (
            <Badge variant="success" size="sm">
              {yearlyDiscount}
            </Badge>
          )}
        </button>
      </div>
    );
  },
);
PricingBillingToggle.displayName = "PricingBillingToggle";

// PricingGrid component
export interface PricingGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

const columnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

const gapClasses = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-8",
};

export const PricingGrid = forwardRef<HTMLDivElement, PricingGridProps>(
  ({ className, columns = 3, gap = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid", columnClasses[columns], gapClasses[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
PricingGrid.displayName = "PricingGrid";

// PricingPlanCard component
export interface PricingPlanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  plan: PricingSectionPlan;
  billingCycle?: "monthly" | "yearly";
  onSelectPlan?: (planId: string) => void;
  variant?: "default" | "bordered" | "elevated";
}

const cardVariants = {
  default: "bg-card",
  bordered: "bg-card border border-border",
  elevated: "bg-card shadow-lg",
};

export const PricingPlanCard = forwardRef<HTMLDivElement, PricingPlanCardProps>(
  (
    {
      className,
      plan,
      billingCycle = "monthly",
      onSelectPlan,
      variant = "bordered",
      ...props
    },
    ref,
  ) => {
    const price = billingCycle === "yearly" && plan.yearlyPrice !== undefined
      ? plan.yearlyPrice
      : plan.monthlyPrice;

    const formatPrice = (price: number | string, currency: string = "USD") => {
      if (typeof price === "string") return price;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col rounded-xl p-6",
          cardVariants[variant],
          plan.highlighted && "border-primary ring-1 ring-primary",
          className,
        )}
        {...props}
      >
        {/* Badge */}
        {plan.badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge variant="default" size="sm">
              {plan.badge}
            </Badge>
          </div>
        )}

        {/* Header */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
          {plan.description && (
            <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
          )}
        </div>

        {/* Price */}
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

        {/* Features */}
        <ul className="mt-6 flex-1 space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-x-3">
              {feature.included ? (
                <CheckIcon className="mt-0.5 size-5 shrink-0 text-success" />
              ) : (
                <XIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground/50" />
              )}
              <span
                className={cn(
                  "text-sm",
                  feature.included ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          variant={plan.ctaVariant || (plan.highlighted ? "primary" : "outline")}
          onClick={() => onSelectPlan?.(plan.id)}
          className="mt-6 w-full"
        >
          {plan.ctaText || "Get Started"}
        </Button>
      </div>
    );
  },
);
PricingPlanCard.displayName = "PricingPlanCard";

// PricingFAQ component
export interface PricingFAQItem {
  question: string;
  answer: string;
}

export interface PricingFAQProps extends React.HTMLAttributes<HTMLDivElement> {
  items: PricingFAQItem[];
  title?: string;
}

export const PricingFAQ = forwardRef<HTMLDivElement, PricingFAQProps>(
  ({ className, items, title = "Frequently asked questions", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("mx-auto mt-16 max-w-3xl", className)} {...props}>
        <h3 className="mb-8 text-center text-2xl font-bold text-foreground">{title}</h3>
        <dl className="space-y-6">
          {items.map((item, index) => (
            <div key={index}>
              <dt className="font-semibold text-foreground">{item.question}</dt>
              <dd className="mt-2 text-muted-foreground">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  },
);
PricingFAQ.displayName = "PricingFAQ";

// CompletePricingSection component - pre-composed full pricing section
export interface CompletePricingSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  plans: PricingSectionPlan[];
  enableBillingToggle?: boolean;
  yearlyDiscount?: string;
  faq?: PricingFAQItem[];
  onSelectPlan?: (planId: string, billingCycle: "monthly" | "yearly") => void;
}

export const CompletePricingSection = forwardRef<HTMLElement, CompletePricingSectionProps>(
  (
    {
      className,
      title,
      subtitle,
      plans,
      enableBillingToggle = true,
      yearlyDiscount = "Save 20%",
      faq,
      onSelectPlan,
      ...props
    },
    ref,
  ) => {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    return (
      <PricingSection ref={ref} className={className} {...props}>
        <PricingSectionHeader>
          <PricingSectionTitle>{title}</PricingSectionTitle>
          {subtitle && <PricingSectionSubtitle>{subtitle}</PricingSectionSubtitle>}
          {enableBillingToggle && (
            <div className="mt-8">
              <PricingBillingToggle
                value={billingCycle}
                onChange={setBillingCycle}
                yearlyDiscount={yearlyDiscount}
              />
            </div>
          )}
        </PricingSectionHeader>

        <PricingGrid columns={plans.length <= 3 ? (plans.length as 2 | 3) : 4}>
          {plans.map((plan) => (
            <PricingPlanCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
              onSelectPlan={(planId) => onSelectPlan?.(planId, billingCycle)}
            />
          ))}
        </PricingGrid>

        {faq && faq.length > 0 && <PricingFAQ items={faq} />}
      </PricingSection>
    );
  },
);
CompletePricingSection.displayName = "CompletePricingSection";
