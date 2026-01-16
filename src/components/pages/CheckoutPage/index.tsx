"use client";

import { forwardRef, type ReactNode, useState } from "react";
import { Badge, Button, Input, Link } from "@/components/atoms";
import { FormField, Step, Stepper } from "@/components/molecules";
import {
  Card,
  CardBody,
  CardHeader,
  CreditCardForm,
  Form,
  FormActions,
  FormBody,
  FormRow,
  Header,
  HeaderLogo,
  type OrderItem,
  PageContent,
  PageLayout,
  PageSection,
} from "@/components/organisms";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  CreditCardIcon,
  LockIcon,
  TruckIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

// Checkout step
type CheckoutStep = "information" | "shipping" | "payment" | "confirmation";

// Checkout data
export interface CheckoutData {
  email: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone?: string;
  };
  billingAddress?: CheckoutData["shippingAddress"];
  shippingMethod?: {
    id: string;
    name: string;
    price: number;
    estimatedDays: string;
  };
  paymentMethod?: {
    type: "card" | "paypal" | "applepay" | "googlepay";
    cardNumber?: string;
    cardExpiry?: string;
    cardCvc?: string;
    cardName?: string;
  };
}

// Shipping method
export interface ShippingMethodOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

// CheckoutPage props
export interface CheckoutPageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  items: OrderItem[];
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  total: number;
  currency?: string;
  shippingMethods?: ShippingMethodOption[];
  onSubmit?: (data: CheckoutData) => void;
  onApplyCoupon?: (code: string) => void;
  onRemoveCoupon?: () => void;
  couponCode?: string;
  couponDiscount?: number;
  logo?: ReactNode;
  logoHref?: string;
  loading?: boolean;
  error?: string;
  orderId?: string;
  orderDate?: string;
  estimatedDelivery?: string;
}

// Default shipping methods
const defaultShippingMethods: ShippingMethodOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 5.99,
    estimatedDays: "5-7 days",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    price: 12.99,
    estimatedDays: "2-3 days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day",
    price: 24.99,
    estimatedDays: "1 day",
  },
];

export const CheckoutPage = forwardRef<HTMLDivElement, CheckoutPageProps>(
  (
    {
      className,
      items = [],
      subtotal,
      shipping = 0,
      tax = 0,
      discount = 0,
      total,
      currency = "USD",
      shippingMethods = defaultShippingMethods,
      onSubmit,
      onApplyCoupon,
      onRemoveCoupon,
      couponCode,
      couponDiscount,
      logo,
      logoHref = "/",
      loading = false,
      error,
      orderId,
      orderDate,
      estimatedDelivery,
      children,
      ...props
    },
    ref,
  ) => {
    const [currentStep, setCurrentStep] = useState<CheckoutStep>(
      orderId ? "confirmation" : "information",
    );
    const [checkoutData, setCheckoutData] = useState<Partial<CheckoutData>>({});
    const [selectedShipping, setSelectedShipping] = useState<string>(
      shippingMethods[0]?.id || "",
    );
    const [_sameAsBilling, _setSameAsBilling] = useState(true);
    const [couponInput, setCouponInput] = useState("");

    const steps: { id: CheckoutStep; label: string; icon: ReactNode }[] = [
      {
        id: "information",
        label: "Information",
        icon: <LockIcon className="size-4" />,
      },
      {
        id: "shipping",
        label: "Shipping",
        icon: <TruckIcon className="size-4" />,
      },
      {
        id: "payment",
        label: "Payment",
        icon: <CreditCardIcon className="size-4" />,
      },
      {
        id: "confirmation",
        label: "Confirmation",
        icon: <CheckCircleIcon className="size-4" />,
      },
    ];

    const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(price);
    };

    const handleInformationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      setCheckoutData((prev) => ({
        ...prev,
        email: formData.get("email") as string,
        shippingAddress: {
          firstName: formData.get("firstName") as string,
          lastName: formData.get("lastName") as string,
          address1: formData.get("address1") as string,
          address2: formData.get("address2") as string,
          city: formData.get("city") as string,
          state: formData.get("state") as string,
          postalCode: formData.get("postalCode") as string,
          country: formData.get("country") as string,
          phone: formData.get("phone") as string,
        },
      }));
      setCurrentStep("shipping");
    };

    const handleShippingSubmit = () => {
      const method = shippingMethods.find((m) => m.id === selectedShipping);
      if (method) {
        setCheckoutData((prev) => ({
          ...prev,
          shippingMethod: {
            id: method.id,
            name: method.name,
            price: method.price,
            estimatedDays: method.estimatedDays,
          },
        }));
      }
      setCurrentStep("payment");
    };

    const handlePaymentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const completeData: CheckoutData = {
        ...checkoutData,
        email: checkoutData.email || "",
        shippingAddress: checkoutData.shippingAddress || {
          firstName: "",
          lastName: "",
          address1: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        },
        paymentMethod: {
          type: "card",
          cardNumber: formData.get("cardNumber") as string,
          cardExpiry: formData.get("cardExpiry") as string,
          cardCvc: formData.get("cardCvc") as string,
          cardName: formData.get("cardName") as string,
        },
      };
      onSubmit?.(completeData);
    };

    const handleApplyCoupon = () => {
      if (couponInput.trim()) {
        onApplyCoupon?.(couponInput.trim());
      }
    };

    const renderHeader = () => (
      <Header
        variant="bordered"
        logo={<HeaderLogo href={logoHref}>{logo}</HeaderLogo>}
        actions={
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LockIcon className="size-4" />
            <span>Secure Checkout</span>
          </div>
        }
      />
    );

    const renderStepper = () => (
      <Stepper currentStep={currentStepIndex} size="sm">
        {steps.map((step, index) => (
          <Step
            key={step.id}
            label={step.label}
            status={
              index < currentStepIndex
                ? "completed"
                : index === currentStepIndex
                  ? "current"
                  : "upcoming"
            }
          />
        ))}
      </Stepper>
    );

    const renderInformationStep = () => (
      <Form onSubmit={handleInformationSubmit}>
        <FormBody>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Contact Information
          </h3>
          <FormField
            label="Email"
            type="email"
            required
            inputProps={{
              name: "email",
              placeholder: "you@example.com",
              defaultValue: checkoutData.email,
            }}
          />

          <h3 className="text-lg font-semibold text-foreground mt-6 mb-4">
            Shipping Address
          </h3>
          <FormRow columns={2}>
            <FormField
              label="First name"
              required
              inputProps={{
                name: "firstName",
                placeholder: "John",
                defaultValue: checkoutData.shippingAddress?.firstName,
              }}
            />
            <FormField
              label="Last name"
              required
              inputProps={{
                name: "lastName",
                placeholder: "Doe",
                defaultValue: checkoutData.shippingAddress?.lastName,
              }}
            />
          </FormRow>
          <FormField
            label="Address"
            required
            inputProps={{
              name: "address1",
              placeholder: "123 Main Street",
              defaultValue: checkoutData.shippingAddress?.address1,
            }}
          />
          <FormField
            label="Apartment, suite, etc. (optional)"
            inputProps={{
              name: "address2",
              placeholder: "Apt 4B",
              defaultValue: checkoutData.shippingAddress?.address2,
            }}
          />
          <FormRow columns={3}>
            <FormField
              label="City"
              required
              inputProps={{
                name: "city",
                placeholder: "New York",
                defaultValue: checkoutData.shippingAddress?.city,
              }}
            />
            <FormField
              label="State"
              required
              inputProps={{
                name: "state",
                placeholder: "NY",
                defaultValue: checkoutData.shippingAddress?.state,
              }}
            />
            <FormField
              label="ZIP code"
              required
              inputProps={{
                name: "postalCode",
                placeholder: "10001",
                defaultValue: checkoutData.shippingAddress?.postalCode,
              }}
            />
          </FormRow>
          <FormRow columns={2}>
            <FormField
              label="Country"
              required
              inputProps={{
                name: "country",
                placeholder: "United States",
                defaultValue:
                  checkoutData.shippingAddress?.country || "United States",
              }}
            />
            <FormField
              label="Phone (optional)"
              type="tel"
              inputProps={{
                name: "phone",
                placeholder: "+1 (555) 123-4567",
                defaultValue: checkoutData.shippingAddress?.phone,
              }}
            />
          </FormRow>
        </FormBody>
        <FormActions className="mt-6">
          <Button type="submit" size="lg">
            Continue to Shipping
          </Button>
        </FormActions>
      </Form>
    );

    const renderShippingStep = () => (
      <div className="space-y-6">
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Contact</span>
            <span className="text-foreground">{checkoutData.email}</span>
            <button
              type="button"
              onClick={() => setCurrentStep("information")}
              className="text-primary hover:underline"
            >
              Change
            </button>
          </div>
          <div className="flex justify-between text-sm mt-2 pt-2 border-t border-border">
            <span className="text-muted-foreground">Ship to</span>
            <span className="text-foreground">
              {checkoutData.shippingAddress?.address1},{" "}
              {checkoutData.shippingAddress?.city}
            </span>
            <button
              type="button"
              onClick={() => setCurrentStep("information")}
              className="text-primary hover:underline"
            >
              Change
            </button>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground">
          Shipping Method
        </h3>
        <div className="space-y-3">
          {shippingMethods.map((method) => (
            <label
              key={method.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors",
                selectedShipping === method.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50",
              )}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shippingMethod"
                  value={method.id}
                  checked={selectedShipping === method.id}
                  onChange={() => setSelectedShipping(method.id)}
                  className="size-4"
                />
                <div>
                  <p className="font-medium text-foreground">{method.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </div>
              <span className="font-medium text-foreground">
                {formatPrice(method.price)}
              </span>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentStep("information")}
          >
            <ChevronLeftIcon className="size-4 mr-2" />
            Back
          </Button>
          <Button onClick={handleShippingSubmit} className="flex-1">
            Continue to Payment
          </Button>
        </div>
      </div>
    );

    const renderPaymentStep = () => (
      <Form onSubmit={handlePaymentSubmit}>
        <FormBody>
          <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Contact</span>
              <span className="text-foreground">{checkoutData.email}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Ship to</span>
              <span className="text-foreground">
                {checkoutData.shippingAddress?.address1},{" "}
                {checkoutData.shippingAddress?.city}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Method</span>
              <span className="text-foreground">
                {checkoutData.shippingMethod?.name} -{" "}
                {formatPrice(checkoutData.shippingMethod?.price || 0)}
              </span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-6 mb-4">
            Payment
          </h3>
          <CreditCardForm />
        </FormBody>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
            {error}
          </div>
        )}

        <FormActions className="mt-6">
          <Button
            variant="outline"
            type="button"
            onClick={() => setCurrentStep("shipping")}
          >
            <ChevronLeftIcon className="size-4 mr-2" />
            Back
          </Button>
          <Button type="submit" className="flex-1" loading={loading}>
            <LockIcon className="size-4 mr-2" />
            Pay {formatPrice(total)}
          </Button>
        </FormActions>
      </Form>
    );

    const renderConfirmationStep = () => (
      <div className="text-center">
        <div className="size-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon className="size-10 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Thank you for your order!
        </h2>
        <p className="text-muted-foreground mb-6">
          We've received your order and will begin processing it right away.
        </p>

        {orderId && (
          <Card variant="bordered" className="text-left mb-6">
            <CardBody>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order number</p>
                  <p className="font-medium text-foreground">{orderId}</p>
                </div>
                {orderDate && (
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium text-foreground">{orderDate}</p>
                  </div>
                )}
                {estimatedDelivery && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Estimated delivery
                    </p>
                    <p className="font-medium text-foreground">
                      {estimatedDelivery}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-medium text-foreground">
                    {formatPrice(total)}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        <p className="text-sm text-muted-foreground mb-6">
          A confirmation email has been sent to{" "}
          <strong>{checkoutData.email}</strong>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/orders">View Order</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );

    const renderOrderSummary = () => (
      <Card variant="bordered" className="sticky top-24">
        <CardHeader title="Order Summary" bordered />
        <CardBody>
          <div className="space-y-4">
            {/* Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-16 rounded-lg object-cover"
                    />
                    <span className="absolute -top-2 -right-2 size-5 rounded-full bg-muted text-xs font-medium flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-muted-foreground">
                        {item.variant}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon */}
            {onApplyCoupon && (
              <div className="pt-4 border-t border-border">
                {couponCode ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="soft">{couponCode}</Badge>
                      {couponDiscount && (
                        <span className="text-sm text-success">
                          -{formatPrice(couponDiscount)}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={onRemoveCoupon}
                      className="text-sm text-destructive hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Discount code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      inputSize="sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleApplyCoupon}
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Totals */}
            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-success">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="text-foreground">{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="font-semibold text-foreground">Total</span>
                <span className="font-semibold text-foreground">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );

    return (
      <PageLayout
        ref={ref}
        header={renderHeader()}
        className={className}
        {...props}
      >
        <PageContent maxWidth="6xl" padding="lg">
          {/* Stepper */}
          <PageSection>{renderStepper()}</PageSection>

          <PageSection>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2">
                {currentStep === "information" && renderInformationStep()}
                {currentStep === "shipping" && renderShippingStep()}
                {currentStep === "payment" && renderPaymentStep()}
                {currentStep === "confirmation" && renderConfirmationStep()}
              </div>

              {/* Order summary */}
              {currentStep !== "confirmation" && (
                <div className="lg:col-span-1">{renderOrderSummary()}</div>
              )}
            </div>
          </PageSection>

          {children}
        </PageContent>
      </PageLayout>
    );
  },
);
CheckoutPage.displayName = "CheckoutPage";
