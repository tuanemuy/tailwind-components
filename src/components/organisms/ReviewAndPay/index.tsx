"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button, Checkbox, Badge, Separator, Radio } from "@/components/atoms";
import {
  CreditCardIcon,
  TruckIcon,
  ShieldIcon,
} from "@/lib/icons";

// Types
export interface OrderItem {
  id: string;
  name: string;
  image?: string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  state?: string;
  zipCode: string;
  country: string;
  phone?: string;
  email?: string;
}

export interface PaymentInfo {
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  lastFourDigits?: string;
  brand?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description?: string;
  price: number;
  estimatedDays: string;
}

export interface ReviewAndPayProps extends React.HTMLAttributes<HTMLDivElement> {
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  paymentInfo?: PaymentInfo;
  shippingMethods?: ShippingMethod[];
  selectedShippingMethod?: string;
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  total: number;
  currency?: string;
  termsAccepted?: boolean;
  onShippingMethodChange?: (methodId: string) => void;
  onEditShipping?: () => void;
  onEditPayment?: () => void;
  onTermsChange?: (accepted: boolean) => void;
  onPlaceOrder?: () => void;
  isSubmitting?: boolean;
  termsLink?: ReactNode;
}

const formatPrice = (amount: number, currency: string = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const ReviewAndPay = forwardRef<HTMLDivElement, ReviewAndPayProps>(
  (
    {
      className,
      items,
      shippingInfo,
      paymentInfo,
      shippingMethods = [],
      selectedShippingMethod,
      subtotal,
      shipping = 0,
      tax = 0,
      discount = 0,
      total,
      currency = "USD",
      termsAccepted = false,
      onShippingMethodChange,
      onEditShipping,
      onEditPayment,
      onTermsChange,
      onPlaceOrder,
      isSubmitting = false,
      termsLink,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("w-full max-w-4xl mx-auto", className)}
        {...props}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Review Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <ReviewSection title="Order items" badge={`${items.length} items`}>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {item.image && (
                      <div className="flex-shrink-0 size-20 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{item.name}</p>
                      {item.variant && (
                        <p className="text-sm text-muted-foreground">{item.variant}</p>
                      )}
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">
                        {formatPrice(item.price * item.quantity, currency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ReviewSection>

            {/* Shipping Info */}
            <ReviewSection
              title="Shipping information"
              icon={<TruckIcon className="size-5" />}
              onEdit={onEditShipping}
            >
              <address className="not-italic text-sm text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">{shippingInfo.name}</p>
                {shippingInfo.email && <p>{shippingInfo.email}</p>}
                <p>{shippingInfo.address}</p>
                <p>
                  {shippingInfo.city}
                  {shippingInfo.state && `, ${shippingInfo.state}`} {shippingInfo.zipCode}
                </p>
                <p>{shippingInfo.country}</p>
                {shippingInfo.phone && <p>{shippingInfo.phone}</p>}
              </address>
            </ReviewSection>

            {/* Shipping Method */}
            {shippingMethods.length > 0 && (
              <ReviewSection title="Shipping method">
                <div className="space-y-3">
                  {shippingMethods.map((method) => (
                    <label
                      key={method.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors",
                        selectedShippingMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground/50",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Radio
                          name="shippingMethod"
                          value={method.id}
                          checked={selectedShippingMethod === method.id}
                          onChange={() => onShippingMethodChange?.(method.id)}
                        />
                        <div>
                          <p className="font-medium text-foreground">{method.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {method.description} - {method.estimatedDays}
                          </p>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "font-medium",
                          method.price === 0 ? "text-success" : "text-foreground",
                        )}
                      >
                        {method.price === 0 ? "Free" : formatPrice(method.price, currency)}
                      </span>
                    </label>
                  ))}
                </div>
              </ReviewSection>
            )}

            {/* Payment Info */}
            {paymentInfo && (
              <ReviewSection
                title="Payment information"
                icon={<CreditCardIcon className="size-5" />}
                onEdit={onEditPayment}
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg border border-border flex items-center justify-center bg-muted">
                    <CreditCardIcon className="size-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {paymentInfo.brand || "Card"} ending in {paymentInfo.lastFourDigits}
                    </p>
                    {paymentInfo.cardHolder && (
                      <p className="text-sm text-muted-foreground">{paymentInfo.cardHolder}</p>
                    )}
                  </div>
                </div>
              </ReviewSection>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-4">Order summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-success" : "text-foreground"}>
                    {shipping === 0 ? "Free" : formatPrice(shipping, currency)}
                  </span>
                </div>
                {tax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">{formatPrice(tax, currency)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-{formatPrice(discount, currency)}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-base font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">{formatPrice(total, currency)}</span>
                </div>
              </div>

              {/* Terms */}
              <div className="mt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={termsAccepted}
                    onChange={(e) => onTermsChange?.(e.target.checked)}
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to the {termsLink || "terms and conditions"}
                  </span>
                </label>
              </div>

              {/* Place Order Button */}
              <Button
                variant="primary"
                className="w-full mt-4"
                disabled={!termsAccepted || isSubmitting}
                onClick={onPlaceOrder}
              >
                {isSubmitting ? "Processing..." : "Place order"}
              </Button>

              {/* Security Badge */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldIcon className="size-4" />
                <span>Secure checkout powered by SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
ReviewAndPay.displayName = "ReviewAndPay";

// Review Section Component
interface ReviewSectionProps {
  title: string;
  icon?: ReactNode;
  badge?: string;
  onEdit?: () => void;
  children: ReactNode;
}

const ReviewSection = ({ title, icon, badge, onEdit, children }: ReviewSectionProps) => (
  <div className="rounded-xl border border-border bg-card overflow-hidden">
    <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
      <div className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <h3 className="font-medium text-foreground">{title}</h3>
        {badge && (
          <Badge variant="secondary" size="sm">
            {badge}
          </Badge>
        )}
      </div>
      {onEdit && (
        <Button variant="ghost" size="sm" onClick={onEdit}>
          Edit
        </Button>
      )}
    </div>
    <div className="p-4">{children}</div>
  </div>
);
