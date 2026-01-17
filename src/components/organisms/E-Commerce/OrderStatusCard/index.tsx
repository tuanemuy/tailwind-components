"use client";

import { forwardRef, type ReactNode } from "react";
import { Button, Separator } from "@/components/atoms";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  PackageIcon,
  TruckIcon,
  XCircleIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// Types
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export interface OrderStatusStep {
  status: OrderStatus;
  label: string;
  date?: string;
  description?: string;
  completed: boolean;
  current?: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  image?: string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface OrderStatusCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orderNumber: string;
  orderDate: Date;
  currentStatus: OrderStatus;
  steps: OrderStatusStep[];
  items?: OrderItem[];
  total?: number;
  currency?: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  onTrackShipment?: () => void;
  onViewDetails?: () => void;
  onCancelOrder?: () => void;
  onReturnOrder?: () => void;
  compact?: boolean;
}

const statusConfig: Record<
  OrderStatus,
  { icon: ReactNode; color: string; bgColor: string }
> = {
  pending: {
    icon: <ClockIcon className="size-5" />,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  confirmed: {
    icon: <CheckCircleIcon className="size-5" />,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  processing: {
    icon: <PackageIcon className="size-5" />,
    color: "text-info",
    bgColor: "bg-info/10",
  },
  shipped: {
    icon: <TruckIcon className="size-5" />,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  delivered: {
    icon: <CheckCircleIcon className="size-5" />,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  cancelled: {
    icon: <XCircleIcon className="size-5" />,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  returned: {
    icon: <PackageIcon className="size-5" />,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
};

const formatPrice = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const OrderStatusCard = forwardRef<HTMLDivElement, OrderStatusCardProps>(
  (
    {
      className,
      orderNumber,
      orderDate,
      currentStatus,
      steps,
      items,
      total,
      currency = "USD",
      trackingNumber,
      carrier,
      estimatedDelivery,
      onTrackShipment,
      onViewDetails,
      onCancelOrder,
      onReturnOrder,
      compact = false,
      ...props
    },
    ref,
  ) => {
    const config = statusConfig[currentStatus];

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card overflow-hidden",
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={cn("p-2 rounded-lg", config.bgColor)}>
                <span className={config.color}>{config.icon}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Order #{orderNumber}
                </p>
                <p className={cn("font-medium", config.color)}>
                  {currentStatus.charAt(0).toUpperCase() +
                    currentStatus.slice(1)}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-muted-foreground">Placed on</p>
              <p className="font-medium text-foreground">
                {formatDate(orderDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        {!compact && (
          <div className="p-4 sm:p-6 border-b border-border">
            <div className="relative">
              <div className="flex justify-between">
                {steps.map((step, index) => (
                  <div
                    key={step.status}
                    className={cn(
                      "flex flex-col items-center flex-1",
                      index !== steps.length - 1 && "relative",
                    )}
                  >
                    {/* Line */}
                    {index !== steps.length - 1 && (
                      <div
                        className={cn(
                          "absolute top-4 left-1/2 w-full h-0.5",
                          step.completed ? "bg-primary" : "bg-border",
                        )}
                      />
                    )}
                    {/* Dot */}
                    <div
                      className={cn(
                        "relative z-10 size-8 rounded-full flex items-center justify-center",
                        step.completed
                          ? "bg-primary text-primary-foreground"
                          : step.current
                            ? "bg-primary/20 text-primary border-2 border-primary"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {step.completed ? (
                        <CheckCircleIcon className="size-4" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    {/* Label */}
                    <div className="mt-2 text-center">
                      <p
                        className={cn(
                          "text-xs font-medium",
                          step.completed || step.current
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {step.label}
                      </p>
                      {step.date && (
                        <p className="text-xs text-muted-foreground">
                          {step.date}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tracking Info */}
        {(trackingNumber || estimatedDelivery) && (
          <div className="p-4 sm:p-6 border-b border-border bg-muted/30">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {trackingNumber && (
                <div>
                  <p className="text-sm text-muted-foreground">
                    Tracking number
                  </p>
                  <p className="font-mono font-medium text-foreground">
                    {carrier && (
                      <span className="text-muted-foreground">{carrier}: </span>
                    )}
                    {trackingNumber}
                  </p>
                </div>
              )}
              {estimatedDelivery && (
                <div className="sm:text-right">
                  <p className="text-sm text-muted-foreground">
                    Estimated delivery
                  </p>
                  <p className="font-medium text-foreground">
                    {estimatedDelivery}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Order Items */}
        {items && items.length > 0 && !compact && (
          <div className="p-4 sm:p-6 border-b border-border">
            <h4 className="font-medium text-foreground mb-4">
              Items in this order
            </h4>
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
                      <p className="text-sm text-muted-foreground">
                        {item.variant}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">
                      {formatPrice(item.price * item.quantity, currency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {total !== undefined && (
              <>
                <Separator className="my-4" />
                <div className="flex justify-between font-medium">
                  <span className="text-foreground">Order total</span>
                  <span className="text-foreground">
                    {formatPrice(total, currency)}
                  </span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="p-4 sm:p-6 flex flex-wrap gap-3">
          {onTrackShipment && currentStatus === "shipped" && (
            <Button variant="primary" size="sm" onClick={onTrackShipment}>
              <TruckIcon className="size-4 mr-2" />
              Track shipment
            </Button>
          )}
          {onViewDetails && (
            <Button variant="outline" size="sm" onClick={onViewDetails}>
              View details
              <ChevronRightIcon className="size-4 ml-2" />
            </Button>
          )}
          {onCancelOrder &&
            (currentStatus === "pending" || currentStatus === "confirmed") && (
              <Button variant="ghost" size="sm" onClick={onCancelOrder}>
                Cancel order
              </Button>
            )}
          {onReturnOrder && currentStatus === "delivered" && (
            <Button variant="ghost" size="sm" onClick={onReturnOrder}>
              Return items
            </Button>
          )}
        </div>
      </div>
    );
  },
);
OrderStatusCard.displayName = "OrderStatusCard";

// ExchangeReturnCard component
export interface ExchangeItem {
  id: string;
  name: string;
  image?: string;
  variant?: string;
  quantity: number;
  price: number;
  selected?: boolean;
  reason?: string;
}

export interface ExchangeReturnCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orderNumber: string;
  items: ExchangeItem[];
  type: "exchange" | "return";
  reasons?: string[];
  onItemSelect?: (itemId: string, selected: boolean) => void;
  onReasonChange?: (itemId: string, reason: string) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export const ExchangeReturnCard = forwardRef<
  HTMLDivElement,
  ExchangeReturnCardProps
>(
  (
    {
      className,
      orderNumber,
      items,
      type,
      reasons = [
        "Wrong size",
        "Wrong item",
        "Damaged/Defective",
        "Changed my mind",
        "Better price found",
        "Other",
      ],
      onItemSelect,
      onReasonChange,
      onSubmit,
      onCancel,
      isSubmitting = false,
      ...props
    },
    ref,
  ) => {
    const selectedItems = items.filter((item) => item.selected);
    const canSubmit =
      selectedItems.length > 0 && selectedItems.every((item) => item.reason);

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card overflow-hidden",
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">
            {type === "exchange" ? "Exchange items" : "Return items"}
          </h3>
          <p className="text-sm text-muted-foreground">Order #{orderNumber}</p>
        </div>

        {/* Items */}
        <div className="p-4 sm:p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Select the items you want to {type}:
          </p>

          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "p-4 rounded-lg border transition-colors",
                item.selected ? "border-primary bg-primary/5" : "border-border",
              )}
            >
              <div className="flex gap-4">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={(e) => onItemSelect?.(item.id, e.target.checked)}
                  className="mt-1"
                />
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
                    <p className="text-sm text-muted-foreground">
                      {item.variant}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>

              {item.selected && (
                <div className="mt-4 pl-6">
                  <label
                    htmlFor={`reason-${item.id}`}
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Reason for {type}
                  </label>
                  <select
                    id={`reason-${item.id}`}
                    className="w-full py-2 px-3 border border-border rounded-lg text-sm bg-background focus:border-primary focus:ring-primary"
                    value={item.reason || ""}
                    onChange={(e) => onReasonChange?.(item.id, e.target.value)}
                  >
                    <option value="">Select a reason</option>
                    {reasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="p-4 sm:p-6 border-t border-border bg-muted/30 flex gap-3">
          <Button
            variant="primary"
            disabled={!canSubmit || isSubmitting}
            onClick={onSubmit}
          >
            {isSubmitting ? "Processing..." : `Submit ${type} request`}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  },
);
ExchangeReturnCard.displayName = "ExchangeReturnCard";
