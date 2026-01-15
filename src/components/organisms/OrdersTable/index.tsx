"use client";

import { forwardRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { DataTable, type DataTableColumn, type DataTableProps } from "../DataTable";
import { Avatar, Badge } from "@/components/atoms";

// ============================================
// Order Types
// ============================================

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface OrderCustomer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: OrderCustomer;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency?: string;
  createdAt: string;
  updatedAt?: string;
  shippingAddress?: ShippingAddress;
  trackingNumber?: string;
}

// ============================================
// OrdersTable Props
// ============================================

export interface OrdersTableProps
  extends Omit<DataTableProps<Order>, "data" | "columns" | "getRowKey"> {
  orders: Order[];
  showCustomer?: boolean;
  showPaymentStatus?: boolean;
  showItems?: boolean;
  showShipping?: boolean;
  onOrderClick?: (order: Order) => void;
  customColumns?: DataTableColumn<Order>[];
}

// ============================================
// Status Config
// ============================================

const orderStatusConfig: Record<
  OrderStatus,
  { label: string; variant: "success" | "warning" | "destructive" | "secondary" | "default" }
> = {
  pending: { label: "Pending", variant: "warning" },
  processing: { label: "Processing", variant: "default" },
  shipped: { label: "Shipped", variant: "default" },
  delivered: { label: "Delivered", variant: "success" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  refunded: { label: "Refunded", variant: "secondary" },
};

const paymentStatusConfig: Record<
  PaymentStatus,
  { label: string; variant: "success" | "warning" | "destructive" | "secondary" }
> = {
  pending: { label: "Pending", variant: "warning" },
  paid: { label: "Paid", variant: "success" },
  failed: { label: "Failed", variant: "destructive" },
  refunded: { label: "Refunded", variant: "secondary" },
};

// ============================================
// OrdersTable Component
// ============================================

export const OrdersTable = forwardRef<HTMLDivElement, OrdersTableProps>(
  (
    {
      className,
      orders,
      showCustomer = true,
      showPaymentStatus = true,
      showItems = true,
      showShipping = false,
      onOrderClick,
      customColumns,
      ...props
    },
    ref
  ) => {
    const columns = useMemo<DataTableColumn<Order>[]>(() => {
      const baseColumns: DataTableColumn<Order>[] = [
        {
          key: "orderNumber",
          header: "Order",
          sortable: true,
          filterable: true,
          filterType: "text",
          width: "140px",
          render: (_, order) => (
            <div className="flex flex-col">
              <span className="font-mono text-sm font-medium text-foreground">
                #{order.orderNumber}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
          ),
        },
      ];

      if (showCustomer) {
        baseColumns.push({
          key: "customer",
          header: "Customer",
          sortable: true,
          filterable: true,
          filterType: "text",
          minWidth: "200px",
          render: (_, order) => (
            <div className="flex items-center gap-3">
              <Avatar
                src={order.customer.avatar}
                alt={order.customer.name}
                fallback={order.customer.name.slice(0, 2)}
                size="sm"
              />
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{order.customer.name}</span>
                <span className="text-sm text-muted-foreground">{order.customer.email}</span>
              </div>
            </div>
          ),
        });
      }

      baseColumns.push({
        key: "status",
        header: "Status",
        sortable: true,
        filterable: true,
        filterType: "select",
        filterOptions: Object.entries(orderStatusConfig).map(([value, { label }]) => ({
          value,
          label,
        })),
        width: "120px",
        render: (_, order) => {
          const config = orderStatusConfig[order.status];
          return (
            <Badge variant={config.variant} size="sm">
              {config.label}
            </Badge>
          );
        },
      });

      if (showPaymentStatus) {
        baseColumns.push({
          key: "paymentStatus",
          header: "Payment",
          sortable: true,
          filterable: true,
          filterType: "select",
          filterOptions: Object.entries(paymentStatusConfig).map(([value, { label }]) => ({
            value,
            label,
          })),
          width: "120px",
          render: (_, order) => {
            const config = paymentStatusConfig[order.paymentStatus];
            return (
              <Badge variant={config.variant} size="sm">
                {config.label}
              </Badge>
            );
          },
        });
      }

      if (showItems) {
        baseColumns.push({
          key: "items",
          header: "Items",
          width: "150px",
          render: (_, order) => {
            const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
            return (
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div
                      key={item.id}
                      className="size-8 rounded border-2 border-background bg-muted flex items-center justify-center overflow-hidden"
                      style={{ zIndex: 3 - index }}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {item.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              </div>
            );
          },
        });
      }

      baseColumns.push({
        key: "total",
        header: "Total",
        sortable: true,
        align: "end",
        width: "120px",
        render: (_, order) => {
          const currency = order.currency || "USD";
          const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
          });
          return (
            <span className="font-medium text-foreground">
              {formatter.format(order.total)}
            </span>
          );
        },
      });

      if (showShipping && orders.some((o) => o.trackingNumber)) {
        baseColumns.push({
          key: "trackingNumber",
          header: "Tracking",
          width: "140px",
          render: (_, order) => {
            if (!order.trackingNumber) {
              return <span className="text-muted-foreground">-</span>;
            }
            return (
              <span className="font-mono text-sm text-muted-foreground">
                {order.trackingNumber}
              </span>
            );
          },
        });
      }

      // Add custom columns
      if (customColumns) {
        baseColumns.push(...customColumns);
      }

      return baseColumns;
    }, [showCustomer, showPaymentStatus, showItems, showShipping, customColumns, orders]);

    return (
      <DataTable<Order>
        ref={ref}
        className={className}
        data={orders}
        columns={columns}
        getRowKey={(order) => order.id}
        onRowClick={onOrderClick}
        {...props}
      />
    );
  }
);

OrdersTable.displayName = "OrdersTable";
