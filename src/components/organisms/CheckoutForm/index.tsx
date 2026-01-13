"use client";

import { forwardRef, useState, createContext, useContext, useId } from "react";
import { cn } from "@/lib/utils";
import { Button, Input, Radio, Separator } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import { LockIcon, CheckIcon, TagIcon } from "@/lib/icons";

// Checkout context
interface CheckoutContextValue {
  step?: number;
  setStep?: (step: number) => void;
}

const CheckoutContext = createContext<CheckoutContextValue>({});

export const useCheckoutContext = () => useContext(CheckoutContext);

// Variant types
type CheckoutVariant = "default" | "card" | "steps";

// Main CheckoutForm component
export interface CheckoutFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  variant?: CheckoutVariant;
  currentStep?: number;
  onStepChange?: (step: number) => void;
}

const checkoutVariants: Record<CheckoutVariant, string> = {
  default: "space-y-8",
  card: "rounded-xl border border-border bg-card overflow-hidden",
  steps: "space-y-6",
};

export const CheckoutForm = forwardRef<HTMLFormElement, CheckoutFormProps>(
  (
    {
      className,
      variant = "default",
      currentStep = 1,
      onStepChange,
      children,
      onSubmit,
      ...props
    },
    ref,
  ) => {
    const [step, setStep] = useState(currentStep);

    const handleStepChange = (newStep: number) => {
      setStep(newStep);
      onStepChange?.(newStep);
    };

    return (
      <CheckoutContext.Provider value={{ step, setStep: handleStepChange }}>
        <form
          ref={ref}
          className={cn(checkoutVariants[variant], className)}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.(e);
          }}
          {...props}
        >
          {children}
        </form>
      </CheckoutContext.Provider>
    );
  },
);
CheckoutForm.displayName = "CheckoutForm";

// CheckoutSection component
export interface CheckoutSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  step?: number;
  completed?: boolean;
  collapsible?: boolean;
}

export const CheckoutSection = forwardRef<HTMLDivElement, CheckoutSectionProps>(
  (
    {
      className,
      title,
      description,
      icon,
      step,
      completed = false,
      collapsible = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(!completed);
    const context = useCheckoutContext();
    const isActive = step !== undefined ? context.step === step : true;

    return (
      <div
        ref={ref}
        className={cn(
          "border-b border-border pb-6 last:border-b-0 last:pb-0",
          className,
        )}
        {...props}
      >
        {(title || icon) && (
          <div
            className={cn(
              "flex items-start gap-x-3 mb-4",
              collapsible && "cursor-pointer",
            )}
            onClick={() => collapsible && setIsOpen(!isOpen)}
          >
            {step !== undefined && (
              <div
                className={cn(
                  "flex-shrink-0 size-8 rounded-full flex items-center justify-center text-sm font-medium",
                  completed
                    ? "bg-success text-success-foreground"
                    : isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {completed ? <CheckIcon className="size-4" /> : step}
              </div>
            )}
            {icon && !step && (
              <div className="flex-shrink-0 text-muted-foreground">{icon}</div>
            )}
            <div className="min-w-0 flex-1">
              {title && (
                <h3 className="text-lg font-medium text-foreground">{title}</h3>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
            {completed && collapsible && (
              <Button variant="ghost" size="sm" type="button">
                Edit
              </Button>
            )}
          </div>
        )}
        {(!collapsible || isOpen) && <div className="space-y-4">{children}</div>}
      </div>
    );
  },
);
CheckoutSection.displayName = "CheckoutSection";

// ShippingForm component - pre-built shipping address form
export interface ShippingFormProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  showEmail?: boolean;
  showPhone?: boolean;
  values?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    phone?: string;
  };
  onChange?: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export const ShippingForm = forwardRef<HTMLDivElement, ShippingFormProps>(
  (
    {
      className,
      showEmail = true,
      showPhone = true,
      values = {},
      onChange,
      errors = {},
      ...props
    },
    ref,
  ) => {
    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(field, e.target.value);
    };

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {showEmail && (
          <FormField
            label="Email"
            type="email"
            required
            error={errors.email}
            inputProps={{
              placeholder: "john@example.com",
              value: values.email || "",
              onChange: handleChange("email"),
            }}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="First Name"
            required
            error={errors.firstName}
            inputProps={{
              placeholder: "John",
              value: values.firstName || "",
              onChange: handleChange("firstName"),
            }}
          />
          <FormField
            label="Last Name"
            required
            error={errors.lastName}
            inputProps={{
              placeholder: "Doe",
              value: values.lastName || "",
              onChange: handleChange("lastName"),
            }}
          />
        </div>

        <FormField
          label="Address"
          required
          error={errors.address}
          inputProps={{
            placeholder: "123 Main Street",
            value: values.address || "",
            onChange: handleChange("address"),
          }}
        />

        <FormField
          label="City"
          required
          error={errors.city}
          inputProps={{
            placeholder: "New York",
            value: values.city || "",
            onChange: handleChange("city"),
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="State"
            error={errors.state}
            inputProps={{
              placeholder: "NY",
              value: values.state || "",
              onChange: handleChange("state"),
            }}
          />
          <FormField
            label="ZIP Code"
            required
            error={errors.zipCode}
            inputProps={{
              placeholder: "10001",
              value: values.zipCode || "",
              onChange: handleChange("zipCode"),
            }}
          />
        </div>

        {showPhone && (
          <FormField
            label="Phone"
            type="tel"
            error={errors.phone}
            inputProps={{
              placeholder: "+1 (555) 123-4567",
              value: values.phone || "",
              onChange: handleChange("phone"),
            }}
          />
        )}
      </div>
    );
  },
);
ShippingForm.displayName = "ShippingForm";

// PaymentMethodOption component
export interface PaymentMethodOptionProps
  extends Omit<React.HTMLAttributes<HTMLLabelElement>, "onChange"> {
  name: string;
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  onChange?: (value: string) => void;
}

export const PaymentMethodOption = forwardRef<HTMLLabelElement, PaymentMethodOptionProps>(
  (
    { className, name, value, label, description, icon, selected, onChange, ...props },
    ref,
  ) => {
    return (
      <label
        ref={ref}
        className={cn(
          "flex items-start gap-x-3 p-4 rounded-lg border cursor-pointer transition-colors",
          selected
            ? "border-primary bg-primary/5"
            : "border-border hover:border-muted-foreground/50",
          className,
        )}
        {...props}
      >
        <Radio
          name={name}
          value={value}
          checked={selected}
          onChange={() => onChange?.(value)}
          className="mt-0.5"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-x-2">
            {icon}
            <span className="font-medium text-foreground">{label}</span>
          </div>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </label>
    );
  },
);
PaymentMethodOption.displayName = "PaymentMethodOption";

// CreditCardForm component
export interface CreditCardFormProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  values?: {
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    cardName?: string;
  };
  onChange?: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export const CreditCardForm = forwardRef<HTMLDivElement, CreditCardFormProps>(
  ({ className, values = {}, onChange, errors = {}, ...props }, ref) => {
    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      // Format card number with spaces
      if (field === "cardNumber") {
        value = value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
      }

      // Format expiry date
      if (field === "expiryDate") {
        value = value
          .replace(/\D/g, "")
          .replace(/^(.{2})/, "$1/")
          .substring(0, 5);
      }

      // Limit CVV
      if (field === "cvv") {
        value = value.replace(/\D/g, "").substring(0, 4);
      }

      onChange?.(field, value);
    };

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        <FormField
          label="Card Number"
          required
          error={errors.cardNumber}
          inputProps={{
            placeholder: "1234 5678 9012 3456",
            value: values.cardNumber || "",
            onChange: handleChange("cardNumber"),
            maxLength: 19,
          }}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Expiry Date"
            required
            error={errors.expiryDate}
            inputProps={{
              placeholder: "MM/YY",
              value: values.expiryDate || "",
              onChange: handleChange("expiryDate"),
              maxLength: 5,
            }}
          />
          <FormField
            label="CVV"
            required
            error={errors.cvv}
            inputProps={{
              placeholder: "123",
              value: values.cvv || "",
              onChange: handleChange("cvv"),
              maxLength: 4,
              type: "password",
            }}
          />
        </div>

        <FormField
          label="Name on Card"
          required
          error={errors.cardName}
          inputProps={{
            placeholder: "John Doe",
            value: values.cardName || "",
            onChange: handleChange("cardName"),
          }}
        />

        <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
          <LockIcon className="size-3" />
          <span>Your payment information is encrypted and secure</span>
        </div>
      </div>
    );
  },
);
CreditCardForm.displayName = "CreditCardForm";

// OrderSummary component
export interface OrderItem {
  id: string;
  name: string;
  image?: string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface OrderSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: OrderItem[];
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  total: number;
  currency?: string;
  editable?: boolean;
  onEditCart?: () => void;
}

export const OrderSummary = forwardRef<HTMLDivElement, OrderSummaryProps>(
  (
    {
      className,
      items,
      subtotal,
      shipping = 0,
      tax = 0,
      discount = 0,
      total,
      currency = "$",
      editable = false,
      onEditCart,
      ...props
    },
    ref,
  ) => {
    const formatPrice = (price: number) => `${currency}${price.toFixed(2)}`;

    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">Order Summary</h3>
          {editable && onEditCart && (
            <Button variant="ghost" size="sm" onClick={onEditCart}>
              Edit cart
            </Button>
          )}
        </div>

        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-x-3">
              {item.image && (
                <div className="flex-shrink-0 size-16 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{item.name}</p>
                {item.variant && (
                  <p className="text-sm text-muted-foreground">{item.variant}</p>
                )}
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Totals */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">{formatPrice(subtotal)}</span>
          </div>
          {shipping > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground">{formatPrice(shipping)}</span>
            </div>
          )}
          {shipping === 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-success">Free</span>
            </div>
          )}
          {tax > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span className="text-foreground">{formatPrice(tax)}</span>
            </div>
          )}
          {discount > 0 && (
            <div className="flex justify-between text-success">
              <span>Discount</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between text-lg font-medium">
          <span className="text-foreground">Total</span>
          <span className="text-foreground">{formatPrice(total)}</span>
        </div>
      </div>
    );
  },
);
OrderSummary.displayName = "OrderSummary";

// CouponInput component
export interface CouponInputProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  appliedCode?: string;
  discount?: number;
  error?: string;
  loading?: boolean;
  onApply?: (code: string) => void;
  onRemove?: () => void;
}

export const CouponInput = forwardRef<HTMLDivElement, CouponInputProps>(
  (
    {
      className,
      value,
      appliedCode,
      discount,
      error,
      loading,
      onApply,
      onRemove,
      ...props
    },
    ref,
  ) => {
    const [code, setCode] = useState(value || "");
    const id = useId();

    const handleApply = () => {
      if (code.trim()) {
        onApply?.(code.trim());
      }
    };

    if (appliedCode) {
      return (
        <div ref={ref} className={cn("", className)} {...props}>
          <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
            <div className="flex items-center gap-x-2">
              <TagIcon className="size-4 text-success" />
              <span className="font-medium text-success">{appliedCode}</span>
              {discount && (
                <span className="text-sm text-success">(-${discount.toFixed(2)})</span>
              )}
            </div>
            {onRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-muted-foreground hover:text-foreground"
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          Coupon Code
        </label>
        <div className="flex gap-x-2">
          <Input
            id={id}
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleApply}
            disabled={loading || !code.trim()}
          >
            {loading ? "Applying..." : "Apply"}
          </Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  },
);
CouponInput.displayName = "CouponInput";

// ShippingMethodOption component
export interface ShippingMethodOptionProps
  extends Omit<React.HTMLAttributes<HTMLLabelElement>, "onChange"> {
  name: string;
  value: string;
  label: string;
  description?: string;
  price: number | "free";
  estimatedDays?: string;
  selected?: boolean;
  onChange?: (value: string) => void;
}

export const ShippingMethodOption = forwardRef<HTMLLabelElement, ShippingMethodOptionProps>(
  (
    {
      className,
      name,
      value,
      label,
      description,
      price,
      estimatedDays,
      selected,
      onChange,
      ...props
    },
    ref,
  ) => {
    return (
      <label
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-x-3 p-4 rounded-lg border cursor-pointer transition-colors",
          selected
            ? "border-primary bg-primary/5"
            : "border-border hover:border-muted-foreground/50",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-x-3">
          <Radio
            name={name}
            value={value}
            checked={selected}
            onChange={() => onChange?.(value)}
          />
          <div>
            <span className="font-medium text-foreground">{label}</span>
            {(description || estimatedDays) && (
              <p className="text-sm text-muted-foreground">
                {description}
                {estimatedDays && ` - ${estimatedDays}`}
              </p>
            )}
          </div>
        </div>
        <span className={cn("font-medium", price === "free" ? "text-success" : "text-foreground")}>
          {price === "free" ? "Free" : `$${price.toFixed(2)}`}
        </span>
      </label>
    );
  },
);
ShippingMethodOption.displayName = "ShippingMethodOption";
