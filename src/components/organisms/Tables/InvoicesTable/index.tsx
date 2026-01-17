"use client";

import { forwardRef, useMemo } from "react";
import { Avatar, Badge } from "@/components/atoms";
import { cn } from "@/lib/utils";
import {
  DataTable,
  type DataTableColumn,
  type DataTableProps,
} from "../../DataDisplay/DataTable";

// ============================================
// Invoice Types
// ============================================

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "paid"
  | "overdue"
  | "cancelled"
  | "refunded";

export interface InvoiceClient {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: InvoiceClient;
  status: InvoiceStatus;
  amount: number;
  tax?: number;
  total: number;
  currency?: string;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  items?: InvoiceItem[];
  notes?: string;
}

// ============================================
// InvoicesTable Props
// ============================================

export interface InvoicesTableProps
  extends Omit<DataTableProps<Invoice>, "data" | "columns" | "getRowKey"> {
  invoices: Invoice[];
  showClient?: boolean;
  showItems?: boolean;
  showDates?: boolean;
  onInvoiceClick?: (invoice: Invoice) => void;
  customColumns?: DataTableColumn<Invoice>[];
}

// ============================================
// Status Config
// ============================================

const statusConfig: Record<
  InvoiceStatus,
  {
    label: string;
    variant: "success" | "warning" | "destructive" | "secondary" | "default";
  }
> = {
  draft: { label: "Draft", variant: "secondary" },
  sent: { label: "Sent", variant: "default" },
  paid: { label: "Paid", variant: "success" },
  overdue: { label: "Overdue", variant: "destructive" },
  cancelled: { label: "Cancelled", variant: "secondary" },
  refunded: { label: "Refunded", variant: "warning" },
};

// ============================================
// InvoicesTable Component
// ============================================

export const InvoicesTable = forwardRef<HTMLDivElement, InvoicesTableProps>(
  (
    {
      className,
      invoices,
      showClient = true,
      showItems = false,
      showDates = true,
      onInvoiceClick,
      customColumns,
      ...props
    },
    ref,
  ) => {
    const columns = useMemo<DataTableColumn<Invoice>[]>(() => {
      const baseColumns: DataTableColumn<Invoice>[] = [
        {
          key: "invoiceNumber",
          header: "Invoice",
          sortable: true,
          filterable: true,
          filterType: "text",
          width: "140px",
          render: (_, invoice) => (
            <span className="font-mono text-sm font-medium text-foreground">
              {invoice.invoiceNumber}
            </span>
          ),
        },
      ];

      if (showClient) {
        baseColumns.push({
          key: "client",
          header: "Client",
          sortable: true,
          filterable: true,
          filterType: "text",
          minWidth: "200px",
          render: (_, invoice) => (
            <div className="flex items-center gap-3">
              <Avatar
                src={invoice.client.avatar}
                alt={invoice.client.name}
                fallback={invoice.client.name.slice(0, 2)}
                size="sm"
              />
              <div className="flex flex-col">
                <span className="font-medium text-foreground">
                  {invoice.client.name}
                </span>
                {invoice.client.company && (
                  <span className="text-sm text-muted-foreground">
                    {invoice.client.company}
                  </span>
                )}
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
        filterOptions: Object.entries(statusConfig).map(
          ([value, { label }]) => ({
            value,
            label,
          }),
        ),
        width: "120px",
        render: (_, invoice) => {
          const config = statusConfig[invoice.status];
          return (
            <Badge variant={config.variant} size="sm">
              {config.label}
            </Badge>
          );
        },
      });

      baseColumns.push({
        key: "total",
        header: "Amount",
        sortable: true,
        align: "end",
        width: "140px",
        render: (_, invoice) => {
          const currency = invoice.currency || "USD";
          const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
          });
          return (
            <div className="text-end">
              <div className="font-medium text-foreground">
                {formatter.format(invoice.total)}
              </div>
              {invoice.tax && (
                <div className="text-xs text-muted-foreground">
                  Tax: {formatter.format(invoice.tax)}
                </div>
              )}
            </div>
          );
        },
      });

      if (showDates) {
        baseColumns.push({
          key: "issueDate",
          header: "Issue Date",
          sortable: true,
          width: "120px",
          render: (_, invoice) => (
            <span className="text-sm text-muted-foreground">
              {new Date(invoice.issueDate).toLocaleDateString()}
            </span>
          ),
        });

        baseColumns.push({
          key: "dueDate",
          header: "Due Date",
          sortable: true,
          width: "120px",
          render: (_, invoice) => {
            const dueDate = new Date(invoice.dueDate);
            const isOverdue =
              dueDate < new Date() &&
              invoice.status !== "paid" &&
              invoice.status !== "cancelled" &&
              invoice.status !== "refunded";
            return (
              <span
                className={cn(
                  "text-sm",
                  isOverdue
                    ? "text-destructive font-medium"
                    : "text-muted-foreground",
                )}
              >
                {dueDate.toLocaleDateString()}
              </span>
            );
          },
        });

        if (invoices.some((i) => i.paidDate)) {
          baseColumns.push({
            key: "paidDate",
            header: "Paid Date",
            sortable: true,
            width: "120px",
            render: (_, invoice) => {
              if (!invoice.paidDate) {
                return <span className="text-muted-foreground">-</span>;
              }
              return (
                <span className="text-sm text-success">
                  {new Date(invoice.paidDate).toLocaleDateString()}
                </span>
              );
            },
          });
        }
      }

      if (showItems) {
        baseColumns.push({
          key: "items",
          header: "Items",
          width: "80px",
          align: "center",
          render: (_, invoice) => (
            <Badge variant="secondary" size="sm">
              {invoice.items?.length || 0}
            </Badge>
          ),
        });
      }

      // Add custom columns
      if (customColumns) {
        baseColumns.push(...customColumns);
      }

      return baseColumns;
    }, [showClient, showDates, showItems, customColumns, invoices]);

    return (
      <DataTable<Invoice>
        ref={ref}
        className={className}
        data={invoices}
        columns={columns}
        getRowKey={(invoice) => invoice.id}
        onRowClick={onInvoiceClick}
        {...props}
      />
    );
  },
);

InvoicesTable.displayName = "InvoicesTable";
