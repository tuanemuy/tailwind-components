"use client";

import { forwardRef, type ReactNode } from "react";
import { Button } from "@/components/atoms";
import { IconButton } from "@/components/molecules";
import { EditIcon, XIcon } from "@/components/icons";
import { cn } from "@/components/utils";

// Types
export interface ShoppingBagItem {
  id: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
  attributes?: { label: string; value: string }[];
  stockStatus?: "inStock" | "lowStock" | "outOfStock";
  maxQuantity?: number;
}

export interface ShoppingBagProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ShoppingBagItem[];
  currency?: string;
  title?: string;
  subtitle?: string;
  freeShippingThreshold?: number;
  onQuantityChange?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onEditItem?: (itemId: string) => void;
  onCheckout?: () => void;
  promoCodeInput?: ReactNode;
  paymentMethods?: ReactNode;
}

const formatPrice = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export const ShoppingBag = forwardRef<HTMLDivElement, ShoppingBagProps>(
  (
    {
      className,
      items,
      currency = "USD",
      title = "Shopping bag",
      subtitle,
      freeShippingThreshold,
      onQuantityChange,
      onRemoveItem,
      onEditItem,
      onCheckout,
      promoCodeInput,
      paymentMethods,
      ...props
    },
    ref,
  ) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const remainingForFreeShipping = freeShippingThreshold
      ? Math.max(0, freeShippingThreshold - subtotal)
      : 0;

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="mb-6 sm:mb-10 max-w-2xl text-center mx-auto">
          <h1 className="font-medium text-foreground text-3xl sm:text-4xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-3 text-sm text-foreground">{subtitle}</p>
          )}

          {freeShippingThreshold && remainingForFreeShipping > 0 && (
            <p className="mt-3 text-sm text-muted-foreground">
              You're {formatPrice(remainingForFreeShipping, currency)} away from
              being eligible for{" "}
              <span className="font-medium text-foreground">
                Free US delivery
              </span>
              .
            </p>
          )}
        </div>

        {/* Items */}
        <div className="flex flex-col gap-y-6">
          {items.map((item) => (
            <ShoppingBagItemCard
              key={item.id}
              item={item}
              currency={currency}
              onQuantityChange={onQuantityChange}
              onRemove={onRemoveItem}
              onEdit={onEditItem}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="pt-10 mt-10 border-t border-border">
          <div className="grid grid-cols-12 gap-5">
            {/* Promo Code */}
            <div className="col-span-12 sm:col-span-6">{promoCodeInput}</div>

            {/* Order Summary */}
            <div className="col-span-12 sm:col-span-6 lg:col-span-4 lg:col-start-9">
              <div className="flex flex-col">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-foreground">
                      Total excl. delivery:
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="font-medium text-foreground">
                      {formatPrice(subtotal, currency)}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={onCheckout}
                  >
                    Checkout securely
                  </Button>
                </div>

                {paymentMethods}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
ShoppingBag.displayName = "ShoppingBag";

// ShoppingBagItemCard component
interface ShoppingBagItemCardProps {
  item: ShoppingBagItem;
  currency: string;
  onQuantityChange?: (itemId: string, quantity: number) => void;
  onRemove?: (itemId: string) => void;
  onEdit?: (itemId: string) => void;
}

const ShoppingBagItemCard = ({
  item,
  currency,
  onQuantityChange,
  onRemove,
  onEdit,
}: ShoppingBagItemCardProps) => {
  const stockStatusConfig = {
    inStock: { label: "In stock", className: "text-success" },
    lowStock: { label: "Low in stock", className: "text-warning" },
    outOfStock: { label: "Out of stock", className: "text-destructive" },
  };

  const stockInfo = item.stockStatus
    ? stockStatusConfig[item.stockStatus]
    : null;

  return (
    <div className="flex gap-5">
      {/* Image */}
      {item.image && (
        <div className="relative">
          <img
            className="shrink-0 size-28 object-cover rounded-lg bg-muted"
            src={item.image}
            alt={item.name}
          />
        </div>
      )}

      <div className="grow">
        <div className="grid grid-cols-12 gap-x-5 gap-y-3">
          {/* Product Info */}
          <div className="col-span-12 lg:col-span-5">
            <div className="flex flex-col">
              <h4 className="font-medium text-foreground">{item.name}</h4>

              {item.attributes && item.attributes.length > 0 && (
                <ul className="mt-1.5 space-y-1">
                  {item.attributes.map((attr) => (
                    <li
                      key={attr.label}
                      className="text-sm text-muted-foreground"
                    >
                      <span className="font-medium text-foreground">
                        {attr.label}:
                      </span>{" "}
                      {attr.value}
                    </li>
                  ))}
                </ul>
              )}

              {onEdit && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(item.id)}
                  >
                    <EditIcon className="size-4 mr-2" />
                    Edit details
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-3">
            <div className="flex items-center gap-3">
              <p className="text-sm text-foreground">Qty:</p>

              <select
                className="py-2 ps-3 pe-8 inline-block border border-border rounded-lg text-sm text-foreground bg-background focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
                value={item.quantity}
                onChange={(e) =>
                  onQuantityChange?.(
                    item.id,
                    Number.parseInt(e.target.value, 10),
                  )
                }
              >
                {Array.from(
                  { length: item.maxQuantity || 10 },
                  (_, i) => i + 1,
                ).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              {onRemove && (
                <IconButton
                  icon={<XIcon className="size-4" />}
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(item.id)}
                  label="Remove item"
                />
              )}
            </div>

            {stockInfo && (
              <p className="mt-1">
                <span
                  className={cn(
                    "inline-flex items-center gap-x-1 text-sm",
                    stockInfo.className,
                  )}
                >
                  {stockInfo.label}
                </span>
              </p>
            )}
          </div>

          {/* Unit Price */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-2 sm:text-end">
            <p className="text-foreground">
              {formatPrice(item.price, currency)} each
            </p>
          </div>

          {/* Total */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-2 sm:text-end">
            <p className="text-foreground">
              {formatPrice(item.price * item.quantity, currency)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// MiniShoppingBag for sidebar/dropdown
export interface MiniShoppingBagProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: ShoppingBagItem[];
  currency?: string;
  onRemoveItem?: (itemId: string) => void;
  onViewBag?: () => void;
  onCheckout?: () => void;
}

export const MiniShoppingBag = forwardRef<HTMLDivElement, MiniShoppingBagProps>(
  (
    {
      className,
      items,
      currency = "USD",
      onRemoveItem,
      onViewBag,
      onCheckout,
      ...props
    },
    ref,
  ) => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return (
      <div
        ref={ref}
        className={cn(
          "w-80 bg-card border border-border rounded-xl shadow-lg",
          className,
        )}
        {...props}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">
              Shopping Bag ({items.length})
            </h3>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">Your bag is empty</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-16 object-cover rounded-lg bg-muted"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {formatPrice(item.price * item.quantity, currency)}
                    </p>
                  </div>
                  {onRemoveItem && (
                    <IconButton
                      icon={<XIcon className="size-3" />}
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                      label="Remove"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium text-foreground">
              {formatPrice(subtotal, currency)}
            </span>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={onViewBag}>
              View Bag
            </Button>
            <Button variant="primary" className="flex-1" onClick={onCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    );
  },
);
MiniShoppingBag.displayName = "MiniShoppingBag";
