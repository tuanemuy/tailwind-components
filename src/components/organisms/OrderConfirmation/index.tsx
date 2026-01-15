"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button, Separator } from "@/components/atoms";
import { CheckCircleIcon, TruckIcon, PrinterIcon, MailIcon } from "@/lib/icons";

// Types
export interface OrderItem {
  id: string;
  name: string;
  image?: string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state?: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface OrderConfirmationProps extends React.HTMLAttributes<HTMLDivElement> {
  orderNumber: string;
  orderDate?: Date;
  estimatedDelivery?: string;
  items: OrderItem[];
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  total: number;
  currency?: string;
  shippingAddress: ShippingAddress;
  billingAddress?: ShippingAddress;
  paymentMethod?: string;
  email?: string;
  onContinueShopping?: () => void;
  onTrackOrder?: () => void;
  onPrint?: () => void;
}

const formatPrice = (amount: number, currency: string = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const OrderConfirmation = forwardRef<HTMLDivElement, OrderConfirmationProps>(
  (
    {
      className,
      orderNumber,
      orderDate = new Date(),
      estimatedDelivery,
      items,
      subtotal,
      shipping = 0,
      tax = 0,
      discount = 0,
      total,
      currency = "USD",
      shippingAddress,
      billingAddress,
      paymentMethod,
      email,
      onContinueShopping,
      onTrackOrder,
      onPrint,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("w-full max-w-3xl mx-auto px-4 sm:px-6 py-12", className)}
        {...props}
      >
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-16 bg-success/10 rounded-full mb-4">
            <CheckCircleIcon className="size-8 text-success" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your order has been confirmed and will be shipping soon.
          </p>
          {email && (
            <p className="mt-1 text-sm text-muted-foreground">
              A confirmation email has been sent to{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>
          )}
        </div>

        {/* Order Info Card */}
        <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
          {/* Order Header */}
          <div className="p-4 sm:p-6 border-b border-border bg-muted/30">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Order number</p>
                <p className="font-medium text-foreground">{orderNumber}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-muted-foreground">Order date</p>
                <p className="font-medium text-foreground">{formatDate(orderDate)}</p>
              </div>
            </div>
          </div>

          {/* Estimated Delivery */}
          {estimatedDelivery && (
            <div className="p-4 sm:p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <TruckIcon className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated delivery</p>
                  <p className="font-medium text-foreground">{estimatedDelivery}</p>
                </div>
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="p-4 sm:p-6">
            <h3 className="font-medium text-foreground mb-4">Order items</h3>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
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

            <Separator className="my-4" />

            {/* Order Summary */}
            <div className="space-y-2 text-sm">
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
              <Separator className="my-2" />
              <div className="flex justify-between text-base font-medium">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">{formatPrice(total, currency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Shipping Address */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
            <h3 className="font-medium text-foreground mb-3">Shipping address</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">{shippingAddress.name}</p>
              <p>{shippingAddress.address}</p>
              <p>
                {shippingAddress.city}
                {shippingAddress.state && `, ${shippingAddress.state}`} {shippingAddress.zipCode}
              </p>
              <p>{shippingAddress.country}</p>
              {shippingAddress.phone && <p>{shippingAddress.phone}</p>}
            </address>
          </div>

          {/* Payment Method */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
            <h3 className="font-medium text-foreground mb-3">Payment method</h3>
            <p className="text-sm text-muted-foreground">
              {paymentMethod || "Credit Card ending in ****"}
            </p>
            {billingAddress && (
              <address className="not-italic text-sm text-muted-foreground space-y-1 mt-3">
                <p className="font-medium text-foreground">{billingAddress.name}</p>
                <p>{billingAddress.address}</p>
                <p>
                  {billingAddress.city}
                  {billingAddress.state && `, ${billingAddress.state}`} {billingAddress.zipCode}
                </p>
              </address>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {onTrackOrder && (
            <Button variant="primary" className="flex-1" onClick={onTrackOrder}>
              <TruckIcon className="size-4 mr-2" />
              Track your order
            </Button>
          )}
          {onContinueShopping && (
            <Button variant="outline" className="flex-1" onClick={onContinueShopping}>
              Continue shopping
            </Button>
          )}
          {onPrint && (
            <Button variant="ghost" size="sm" onClick={onPrint}>
              <PrinterIcon className="size-4 mr-2" />
              Print
            </Button>
          )}
        </div>
      </div>
    );
  },
);
OrderConfirmation.displayName = "OrderConfirmation";

// Simplified Order Confirmation (minimal variant)
export interface SimpleOrderConfirmationProps extends React.HTMLAttributes<HTMLDivElement> {
  orderNumber: string;
  email?: string;
  message?: string;
  onViewOrder?: () => void;
  onContinueShopping?: () => void;
}

export const SimpleOrderConfirmation = forwardRef<HTMLDivElement, SimpleOrderConfirmationProps>(
  (
    {
      className,
      orderNumber,
      email,
      message = "We'll send you shipping confirmation when your items ship.",
      onViewOrder,
      onContinueShopping,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("w-full max-w-md mx-auto text-center p-8", className)}
        {...props}
      >
        <div className="inline-flex items-center justify-center size-16 bg-success/10 rounded-full mb-6">
          <CheckCircleIcon className="size-8 text-success" />
        </div>

        <h1 className="text-2xl font-semibold text-foreground mb-2">Order confirmed!</h1>

        <p className="text-muted-foreground mb-4">{message}</p>

        <div className="rounded-lg bg-muted/50 p-4 mb-6">
          <p className="text-sm text-muted-foreground">Order number</p>
          <p className="font-mono font-medium text-foreground">{orderNumber}</p>
        </div>

        {email && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <MailIcon className="size-4" />
            <span>Confirmation sent to {email}</span>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {onViewOrder && (
            <Button variant="primary" onClick={onViewOrder}>
              View order details
            </Button>
          )}
          {onContinueShopping && (
            <Button variant="outline" onClick={onContinueShopping}>
              Continue shopping
            </Button>
          )}
        </div>
      </div>
    );
  },
);
SimpleOrderConfirmation.displayName = "SimpleOrderConfirmation";
