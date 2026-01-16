"use client";

import { forwardRef, useMemo } from "react";
import { Badge } from "@/components/atoms";
import { TrendingDownIcon, TrendingUpIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  DataTable,
  type DataTableColumn,
  type DataTableProps,
} from "../DataTable";

// ============================================
// Transaction Types
// ============================================

export type TransactionType =
  | "credit"
  | "debit"
  | "transfer"
  | "refund"
  | "fee";
export type TransactionStatus =
  | "completed"
  | "pending"
  | "failed"
  | "cancelled";

export interface TransactionAccount {
  id: string;
  name: string;
  number?: string;
  type?: "bank" | "wallet" | "card" | "cash";
}

export interface TransactionCategory {
  id: string;
  name: string;
  icon?: React.ReactNode;
  color?: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency?: string;
  description: string;
  category?: TransactionCategory;
  fromAccount?: TransactionAccount;
  toAccount?: TransactionAccount;
  reference?: string;
  date: string;
  createdAt?: string;
  metadata?: Record<string, unknown>;
}

// ============================================
// TransactionsTable Props
// ============================================

export interface TransactionsTableProps
  extends Omit<DataTableProps<Transaction>, "data" | "columns" | "getRowKey"> {
  transactions: Transaction[];
  showCategory?: boolean;
  showAccounts?: boolean;
  showReference?: boolean;
  onTransactionClick?: (transaction: Transaction) => void;
  customColumns?: DataTableColumn<Transaction>[];
}

// ============================================
// Config
// ============================================

const typeConfig: Record<
  TransactionType,
  { label: string; color: string; icon: typeof TrendingUpIcon }
> = {
  credit: { label: "Credit", color: "text-success", icon: TrendingUpIcon },
  debit: { label: "Debit", color: "text-destructive", icon: TrendingDownIcon },
  transfer: { label: "Transfer", color: "text-primary", icon: TrendingUpIcon },
  refund: { label: "Refund", color: "text-warning", icon: TrendingUpIcon },
  fee: { label: "Fee", color: "text-muted-foreground", icon: TrendingDownIcon },
};

const statusConfig: Record<
  TransactionStatus,
  {
    label: string;
    variant: "success" | "warning" | "destructive" | "secondary";
  }
> = {
  completed: { label: "Completed", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  failed: { label: "Failed", variant: "destructive" },
  cancelled: { label: "Cancelled", variant: "secondary" },
};

// ============================================
// TransactionsTable Component
// ============================================

export const TransactionsTable = forwardRef<
  HTMLDivElement,
  TransactionsTableProps
>(
  (
    {
      className,
      transactions,
      showCategory = true,
      showAccounts = false,
      showReference = false,
      onTransactionClick,
      customColumns,
      ...props
    },
    ref,
  ) => {
    const columns = useMemo<DataTableColumn<Transaction>[]>(() => {
      const baseColumns: DataTableColumn<Transaction>[] = [
        {
          key: "description",
          header: "Transaction",
          sortable: true,
          filterable: true,
          filterType: "text",
          minWidth: "250px",
          render: (_, transaction) => {
            const config = typeConfig[transaction.type];
            const Icon = config.icon;
            return (
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "size-10 rounded-full flex items-center justify-center",
                    transaction.type === "credit" ||
                      transaction.type === "refund"
                      ? "bg-success/10"
                      : transaction.type === "debit" ||
                          transaction.type === "fee"
                        ? "bg-destructive/10"
                        : "bg-primary/10",
                  )}
                >
                  <Icon className={cn("size-5", config.color)} />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">
                    {transaction.description}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            );
          },
        },
        {
          key: "type",
          header: "Type",
          sortable: true,
          filterable: true,
          filterType: "select",
          filterOptions: Object.entries(typeConfig).map(
            ([value, { label }]) => ({
              value,
              label,
            }),
          ),
          width: "100px",
          render: (_, transaction) => {
            const config = typeConfig[transaction.type];
            return (
              <span className={cn("text-sm font-medium", config.color)}>
                {config.label}
              </span>
            );
          },
        },
        {
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
          render: (_, transaction) => {
            const config = statusConfig[transaction.status];
            return (
              <Badge variant={config.variant} size="sm">
                {config.label}
              </Badge>
            );
          },
        },
      ];

      if (showCategory) {
        baseColumns.push({
          key: "category",
          header: "Category",
          sortable: true,
          width: "140px",
          render: (_, transaction) => {
            if (!transaction.category) {
              return <span className="text-muted-foreground">-</span>;
            }
            return (
              <div className="flex items-center gap-2">
                {transaction.category.icon && (
                  <span className="size-4">{transaction.category.icon}</span>
                )}
                <span className="text-sm text-muted-foreground">
                  {transaction.category.name}
                </span>
              </div>
            );
          },
        });
      }

      if (showAccounts) {
        baseColumns.push({
          key: "fromAccount",
          header: "From",
          width: "140px",
          render: (_, transaction) => {
            if (!transaction.fromAccount) {
              return <span className="text-muted-foreground">-</span>;
            }
            return (
              <div className="flex flex-col">
                <span className="text-sm text-foreground">
                  {transaction.fromAccount.name}
                </span>
                {transaction.fromAccount.number && (
                  <span className="text-xs text-muted-foreground font-mono">
                    ****{transaction.fromAccount.number.slice(-4)}
                  </span>
                )}
              </div>
            );
          },
        });

        baseColumns.push({
          key: "toAccount",
          header: "To",
          width: "140px",
          render: (_, transaction) => {
            if (!transaction.toAccount) {
              return <span className="text-muted-foreground">-</span>;
            }
            return (
              <div className="flex flex-col">
                <span className="text-sm text-foreground">
                  {transaction.toAccount.name}
                </span>
                {transaction.toAccount.number && (
                  <span className="text-xs text-muted-foreground font-mono">
                    ****{transaction.toAccount.number.slice(-4)}
                  </span>
                )}
              </div>
            );
          },
        });
      }

      baseColumns.push({
        key: "amount",
        header: "Amount",
        sortable: true,
        align: "end",
        width: "140px",
        render: (_, transaction) => {
          const currency = transaction.currency || "USD";
          const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
          });
          const isPositive =
            transaction.type === "credit" || transaction.type === "refund";
          return (
            <span
              className={cn(
                "font-medium",
                isPositive ? "text-success" : "text-foreground",
              )}
            >
              {isPositive ? "+" : "-"}
              {formatter.format(Math.abs(transaction.amount))}
            </span>
          );
        },
      });

      if (showReference) {
        baseColumns.push({
          key: "reference",
          header: "Reference",
          width: "120px",
          render: (_, transaction) => {
            if (!transaction.reference) {
              return <span className="text-muted-foreground">-</span>;
            }
            return (
              <span className="font-mono text-sm text-muted-foreground">
                {transaction.reference}
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
    }, [showCategory, showAccounts, showReference, customColumns]);

    return (
      <DataTable<Transaction>
        ref={ref}
        className={className}
        data={transactions}
        columns={columns}
        getRowKey={(transaction) => transaction.id}
        onRowClick={onTransactionClick}
        {...props}
      />
    );
  },
);

TransactionsTable.displayName = "TransactionsTable";
