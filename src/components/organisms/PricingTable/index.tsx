import { forwardRef, type ReactNode } from "react";
import { Badge, Button } from "@/components/atoms";
import { CheckIcon, XIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

// Types
export interface PricingFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  price: number | string;
  currency?: string;
  period?: string;
  features: PricingFeature[];
  badge?: string;
  highlighted?: boolean;
  ctaText?: string;
  ctaVariant?: "primary" | "secondary" | "outline";
}

// PricingTable component
export interface PricingTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  plans: PricingPlan[];
  columns?: 2 | 3 | 4;
  variant?: "cards" | "comparison";
  onSelectPlan?: (planId: string) => void;
}

const columnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export const PricingTable = forwardRef<HTMLDivElement, PricingTableProps>(
  (
    {
      className,
      plans,
      columns = 3,
      variant = "cards",
      onSelectPlan,
      ...props
    },
    ref,
  ) => {
    if (variant === "comparison") {
      return (
        <PricingComparisonTable
          ref={ref}
          plans={plans}
          onSelectPlan={onSelectPlan}
          className={className}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn("grid gap-6", columnClasses[columns], className)}
        {...props}
      >
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            onSelect={() => onSelectPlan?.(plan.id)}
          />
        ))}
      </div>
    );
  },
);
PricingTable.displayName = "PricingTable";

// PricingCard component
export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  plan: PricingPlan;
  onSelect?: () => void;
}

export const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  ({ className, plan, onSelect, ...props }, ref) => {
    const formatPrice = (price: number | string, currency = "USD") => {
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
          "relative flex flex-col rounded-xl border bg-card p-6",
          plan.highlighted
            ? "border-primary shadow-lg ring-1 ring-primary"
            : "border-border",
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
            <p className="mt-1 text-sm text-muted-foreground">
              {plan.description}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="mt-6 text-center">
          <div className="flex items-baseline justify-center gap-x-1">
            <span className="text-4xl font-bold text-foreground">
              {formatPrice(plan.price, plan.currency)}
            </span>
            {plan.period && (
              <span className="text-sm text-muted-foreground">
                /{plan.period}
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="mt-6 flex-1 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature.text} className="flex items-start gap-x-3">
              {feature.included ? (
                <CheckIcon className="mt-0.5 size-5 shrink-0 text-success" />
              ) : (
                <XIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground/50" />
              )}
              <span
                className={cn(
                  "text-sm",
                  feature.included
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          variant={
            plan.ctaVariant || (plan.highlighted ? "primary" : "outline")
          }
          onClick={onSelect}
          className="mt-6 w-full"
        >
          {plan.ctaText || "Get Started"}
        </Button>
      </div>
    );
  },
);
PricingCard.displayName = "PricingCard";

// PricingComparisonTable component
export interface PricingComparisonTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  plans: PricingPlan[];
  onSelectPlan?: (planId: string) => void;
}

export const PricingComparisonTable = forwardRef<
  HTMLDivElement,
  PricingComparisonTableProps
>(({ className, plans, onSelectPlan, ...props }, ref) => {
  // Get all unique features across all plans
  const allFeatures = Array.from(
    new Set(plans.flatMap((plan) => plan.features.map((f) => f.text))),
  );

  const formatPrice = (price: number | string, currency = "USD") => {
    if (typeof price === "string") return price;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div ref={ref} className={cn("overflow-x-auto", className)} {...props}>
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="p-4 text-left" />
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
                    <span className="text-3xl font-bold text-foreground">
                      {formatPrice(plan.price, plan.currency)}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-muted-foreground">
                        /{plan.period}
                      </span>
                    )}
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
                      <CheckIcon className="mx-auto size-5 text-success" />
                    ) : (
                      <XIcon className="mx-auto size-5 text-muted-foreground/30" />
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
                  onClick={() => onSelectPlan?.(plan.id)}
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
});
PricingComparisonTable.displayName = "PricingComparisonTable";

// PricingToggle component (for monthly/yearly toggle)
export interface PricingToggleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: { value: string; label: string; discount?: string }[];
  value: string;
  onChange: (value: string) => void;
}

export const PricingToggle = forwardRef<HTMLDivElement, PricingToggleProps>(
  ({ className, options, value, onChange, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-lg bg-muted p-1",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "relative rounded-md px-4 py-2 text-sm font-medium transition-all",
              value === option.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
            {option.discount && (
              <Badge
                variant="success"
                size="sm"
                className="absolute -top-2 -right-2 text-xs"
              >
                {option.discount}
              </Badge>
            )}
          </button>
        ))}
      </div>
    );
  },
);
PricingToggle.displayName = "PricingToggle";

// PricingHeader component
export interface PricingHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  toggle?: ReactNode;
}

export const PricingHeader = forwardRef<HTMLDivElement, PricingHeaderProps>(
  ({ className, title, subtitle, toggle, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("text-center", className)} {...props}>
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>
        )}
        {toggle && <div className="mt-6 flex justify-center">{toggle}</div>}
      </div>
    );
  },
);
PricingHeader.displayName = "PricingHeader";
