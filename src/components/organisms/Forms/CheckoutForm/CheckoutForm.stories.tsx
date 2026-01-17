import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button, Separator } from "@/components/atoms";
import { BuildingIcon, CreditCardIcon, WalletIcon } from "@/lib/icons";
import {
  CheckoutForm,
  CheckoutSection,
  CouponInput,
  CreditCardForm,
  type OrderItem,
  OrderSummary,
  PaymentMethodOption,
  ShippingForm,
  ShippingMethodOption,
} from "./index";

const meta: Meta<typeof CheckoutForm> = {
  title: "Organisms/Forms/CheckoutForm",
  component: CheckoutForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CheckoutForm>;

// Sample order items
const sampleItems: OrderItem[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    quantity: 1,
    price: 79.99,
    variant: "Black",
  },
  {
    id: "2",
    name: "USB-C Charging Cable",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
    quantity: 2,
    price: 12.99,
  },
];

// Basic Checkout Form
export const Default: Story = {
  render: () => {
    const [paymentMethod, setPaymentMethod] = useState("credit-card");

    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl">
        <div className="md:col-span-3">
          <CheckoutForm onSubmit={(e) => console.log("Submit", e)}>
            <CheckoutSection title="Shipping Information" icon={null}>
              <ShippingForm />
            </CheckoutSection>

            <CheckoutSection title="Payment Method">
              <div className="space-y-3">
                <PaymentMethodOption
                  name="payment"
                  value="credit-card"
                  label="Credit Card"
                  description="Visa, Mastercard, American Express"
                  icon={<CreditCardIcon className="size-5" />}
                  selected={paymentMethod === "credit-card"}
                  onChange={setPaymentMethod}
                />
                <PaymentMethodOption
                  name="payment"
                  value="paypal"
                  label="PayPal"
                  description="Pay with your PayPal account"
                  icon={<WalletIcon className="size-5" />}
                  selected={paymentMethod === "paypal"}
                  onChange={setPaymentMethod}
                />
              </div>

              {paymentMethod === "credit-card" && (
                <div className="mt-4">
                  <CreditCardForm />
                </div>
              )}
            </CheckoutSection>

            <Button type="submit" className="w-full">
              Complete Order
            </Button>
          </CheckoutForm>
        </div>

        <div className="md:col-span-2">
          <div className="sticky top-4 rounded-xl border border-border bg-card p-4">
            <OrderSummary
              items={sampleItems}
              subtotal={105.97}
              shipping={0}
              tax={8.48}
              total={114.45}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Steps Variant
export const WithSteps: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    const [shippingMethod, setShippingMethod] = useState("standard");
    const [paymentMethod, setPaymentMethod] = useState("credit-card");

    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl">
        <div className="md:col-span-3">
          <CheckoutForm
            variant="steps"
            currentStep={step}
            onStepChange={setStep}
            onSubmit={(e) => console.log("Submit", e)}
          >
            <CheckoutSection
              title="Shipping Address"
              step={1}
              completed={step > 1}
              collapsible={step > 1}
            >
              <ShippingForm />
              <Button className="mt-4" onClick={() => setStep(2)}>
                Continue to Shipping
              </Button>
            </CheckoutSection>

            {step >= 2 && (
              <CheckoutSection
                title="Shipping Method"
                step={2}
                completed={step > 2}
                collapsible={step > 2}
              >
                <div className="space-y-3">
                  <ShippingMethodOption
                    name="shipping"
                    value="standard"
                    label="Standard Shipping"
                    estimatedDays="5-7 business days"
                    price="free"
                    selected={shippingMethod === "standard"}
                    onChange={setShippingMethod}
                  />
                  <ShippingMethodOption
                    name="shipping"
                    value="express"
                    label="Express Shipping"
                    estimatedDays="2-3 business days"
                    price={9.99}
                    selected={shippingMethod === "express"}
                    onChange={setShippingMethod}
                  />
                  <ShippingMethodOption
                    name="shipping"
                    value="overnight"
                    label="Overnight Shipping"
                    estimatedDays="Next business day"
                    price={19.99}
                    selected={shippingMethod === "overnight"}
                    onChange={setShippingMethod}
                  />
                </div>
                <Button className="mt-4" onClick={() => setStep(3)}>
                  Continue to Payment
                </Button>
              </CheckoutSection>
            )}

            {step >= 3 && (
              <CheckoutSection title="Payment" step={3}>
                <div className="space-y-3">
                  <PaymentMethodOption
                    name="payment"
                    value="credit-card"
                    label="Credit Card"
                    icon={<CreditCardIcon className="size-5" />}
                    selected={paymentMethod === "credit-card"}
                    onChange={setPaymentMethod}
                  />
                  <PaymentMethodOption
                    name="payment"
                    value="paypal"
                    label="PayPal"
                    icon={<WalletIcon className="size-5" />}
                    selected={paymentMethod === "paypal"}
                    onChange={setPaymentMethod}
                  />
                </div>

                {paymentMethod === "credit-card" && (
                  <div className="mt-4">
                    <CreditCardForm />
                  </div>
                )}

                <Button type="submit" className="w-full mt-4">
                  Place Order
                </Button>
              </CheckoutSection>
            )}
          </CheckoutForm>
        </div>

        <div className="md:col-span-2">
          <div className="sticky top-4 rounded-xl border border-border bg-card p-4">
            <OrderSummary
              items={sampleItems}
              subtotal={105.97}
              shipping={
                shippingMethod === "standard"
                  ? 0
                  : shippingMethod === "express"
                    ? 9.99
                    : 19.99
              }
              tax={8.48}
              total={
                105.97 +
                (shippingMethod === "standard"
                  ? 0
                  : shippingMethod === "express"
                    ? 9.99
                    : 19.99) +
                8.48
              }
              editable
              onEditCart={() => console.log("Edit cart")}
            />
          </div>
        </div>
      </div>
    );
  },
};

// With Coupon
export const WithCoupon: Story = {
  render: () => {
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponError, setCouponError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleApplyCoupon = (code: string) => {
      setLoading(true);
      setCouponError("");

      // Simulate API call
      setTimeout(() => {
        if (code.toUpperCase() === "SAVE20") {
          setCouponApplied(true);
        } else {
          setCouponError("Invalid coupon code");
        }
        setLoading(false);
      }, 1000);
    };

    return (
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-4">
        <OrderSummary
          items={sampleItems}
          subtotal={105.97}
          shipping={0}
          tax={8.48}
          discount={couponApplied ? 21.19 : 0}
          total={couponApplied ? 93.26 : 114.45}
        />
        <Separator className="my-4" />
        <CouponInput
          appliedCode={couponApplied ? "SAVE20" : undefined}
          discount={couponApplied ? 21.19 : undefined}
          error={couponError}
          loading={loading}
          onApply={handleApplyCoupon}
          onRemove={() => setCouponApplied(false)}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Try code: SAVE20 for 20% off
        </p>
      </div>
    );
  },
};

// Order Summary Only
export const OrderSummaryOnly: Story = {
  render: () => (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-4">
      <OrderSummary
        items={[
          {
            id: "1",
            name: "Premium Wireless Earbuds",
            image:
              "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop",
            quantity: 1,
            price: 149.99,
            variant: "White",
          },
          {
            id: "2",
            name: "Charging Case",
            image:
              "https://images.unsplash.com/photo-1608156639585-b3a776ea2b30?w=100&h=100&fit=crop",
            quantity: 1,
            price: 29.99,
          },
          {
            id: "3",
            name: "Silicone Ear Tips (3 Pack)",
            quantity: 2,
            price: 9.99,
          },
        ]}
        subtotal={199.96}
        shipping={5.99}
        tax={16.5}
        discount={20.0}
        total={202.45}
        editable
        onEditCart={() => console.log("Edit cart")}
      />
    </div>
  ),
};

// Shipping Methods
export const ShippingMethods: Story = {
  render: () => {
    const [selected, setSelected] = useState("standard");

    return (
      <div className="w-full max-w-md space-y-3">
        <h3 className="font-medium text-foreground">Select Shipping Method</h3>
        <ShippingMethodOption
          name="shipping"
          value="standard"
          label="Standard Shipping"
          description="No tracking available"
          estimatedDays="5-7 business days"
          price="free"
          selected={selected === "standard"}
          onChange={setSelected}
        />
        <ShippingMethodOption
          name="shipping"
          value="express"
          label="Express Shipping"
          description="Tracking included"
          estimatedDays="2-3 business days"
          price={9.99}
          selected={selected === "express"}
          onChange={setSelected}
        />
        <ShippingMethodOption
          name="shipping"
          value="overnight"
          label="Overnight Shipping"
          description="Priority handling"
          estimatedDays="Next business day"
          price={19.99}
          selected={selected === "overnight"}
          onChange={setSelected}
        />
        <ShippingMethodOption
          name="shipping"
          value="same-day"
          label="Same Day Delivery"
          description="Available in select areas"
          estimatedDays="Today"
          price={29.99}
          selected={selected === "same-day"}
          onChange={setSelected}
        />
      </div>
    );
  },
};

// Payment Methods
export const PaymentMethods: Story = {
  render: () => {
    const [selected, setSelected] = useState("credit-card");

    return (
      <div className="w-full max-w-md space-y-3">
        <h3 className="font-medium text-foreground">Select Payment Method</h3>
        <PaymentMethodOption
          name="payment"
          value="credit-card"
          label="Credit or Debit Card"
          description="Visa, Mastercard, American Express, Discover"
          icon={<CreditCardIcon className="size-5 text-primary" />}
          selected={selected === "credit-card"}
          onChange={setSelected}
        />
        <PaymentMethodOption
          name="payment"
          value="paypal"
          label="PayPal"
          description="You will be redirected to PayPal"
          icon={<WalletIcon className="size-5 text-blue-600" />}
          selected={selected === "paypal"}
          onChange={setSelected}
        />
        <PaymentMethodOption
          name="payment"
          value="bank"
          label="Bank Transfer"
          description="Direct transfer from your bank account"
          icon={<BuildingIcon className="size-5 text-muted-foreground" />}
          selected={selected === "bank"}
          onChange={setSelected}
        />
      </div>
    );
  },
};

// Credit Card Form
export const CreditCardFormOnly: Story = {
  render: () => {
    const [values, setValues] = useState({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    });

    const handleChange = (field: string, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    };

    return (
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6">
        <h3 className="font-medium text-foreground mb-4">Card Details</h3>
        <CreditCardForm values={values} onChange={handleChange} />
        <Button className="w-full mt-4">Pay Now</Button>
      </div>
    );
  },
};

// Shipping Form
export const ShippingFormOnly: Story = {
  render: () => {
    const [values, setValues] = useState({});

    const handleChange = (field: string, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    };

    return (
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6">
        <h3 className="font-medium text-foreground mb-4">Shipping Address</h3>
        <ShippingForm values={values} onChange={handleChange} />
        <Button className="w-full mt-4">Save Address</Button>
      </div>
    );
  },
};

// With Validation Errors
export const WithValidationErrors: Story = {
  render: () => {
    const [cardValues] = useState({
      cardNumber: "1234",
      expiryDate: "13/99",
      cvv: "",
      cardName: "",
    });

    const cardErrors = {
      cardNumber: "Please enter a valid card number",
      expiryDate: "Invalid expiry date",
      cvv: "CVV is required",
      cardName: "Name on card is required",
    };

    const [shippingValues] = useState({
      email: "invalid-email",
      firstName: "",
    });

    const shippingErrors = {
      email: "Please enter a valid email address",
      firstName: "First name is required",
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-medium text-foreground mb-4">Shipping Address</h3>
          <ShippingForm values={shippingValues} errors={shippingErrors} />
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-medium text-foreground mb-4">Card Details</h3>
          <CreditCardForm values={cardValues} errors={cardErrors} />
        </div>
      </div>
    );
  },
};
