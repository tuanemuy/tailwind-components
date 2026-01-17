"use client";

import type { VariantProps } from "class-variance-authority";
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { Select } from "@/components/molecules/Select";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  DollarSignIcon,
  EyeIcon,
  EyeOffIcon,
  TrendDownIcon,
  TrendUpIcon,
  WalletIcon,
  XCircleIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";
import {
  accountCardVariants,
  balanceCardVariants,
  currencySelectVariants,
  paymentCardVariants,
  receiptItemVariants,
  receiptTimelineVariants,
  transactionAmountVariants,
  transactionItemVariants,
  transferFormVariants,
} from "@/components/variants";

// =============================================================================
// BalanceCard
// =============================================================================

export interface BalanceCardProps
  extends VariantProps<typeof balanceCardVariants> {
  balance: string;
  currency?: string;
  label?: string;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  actions?: ReactNode;
  showBalance?: boolean;
  onToggleBalance?: () => void;
  className?: string;
}

export function BalanceCard({
  balance,
  currency = "USD",
  label = "Available Balance",
  trend,
  actions,
  showBalance = true,
  onToggleBalance,
  variant,
  size,
  className,
}: BalanceCardProps) {
  const [isVisible, setIsVisible] = useState(showBalance);

  const handleToggle = () => {
    setIsVisible(!isVisible);
    onToggleBalance?.();
  };

  return (
    <div className={cn(balanceCardVariants({ variant, size }), className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm opacity-80">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              {isVisible ? balance : "••••••"}
            </span>
            <span className="text-sm opacity-80">{currency}</span>
          </div>
          {trend && (
            <div className="mt-2 flex items-center gap-1 text-sm">
              {trend.direction === "up" ? (
                <TrendUpIcon className="size-4 text-success" />
              ) : (
                <TrendDownIcon className="size-4 text-destructive" />
              )}
              <span
                className={cn(
                  trend.direction === "up"
                    ? "text-success"
                    : "text-destructive",
                )}
              >
                {trend.value}
              </span>
              <span className="opacity-60">vs last month</span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleToggle}
          className="p-2 rounded-full hover:bg-black/10 transition-colors"
        >
          {isVisible ? (
            <EyeOffIcon className="size-5" />
          ) : (
            <EyeIcon className="size-5" />
          )}
        </button>
      </div>
      {actions && <div className="mt-4 flex gap-2">{actions}</div>}
    </div>
  );
}

// =============================================================================
// TransactionList
// =============================================================================

export type TransactionType = "credit" | "debit";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface Transaction {
  id: string;
  title: string;
  description?: string;
  amount: string;
  type: TransactionType;
  status: TransactionStatus;
  date: string;
  icon?: ReactNode;
  category?: string;
}

export interface TransactionListProps {
  transactions: Transaction[];
  variant?: "default" | "compact" | "detailed";
  onTransactionClick?: (transaction: Transaction) => void;
  emptyMessage?: string;
  className?: string;
}

export function TransactionList({
  transactions,
  variant = "default",
  onTransactionClick,
  emptyMessage = "No transactions yet",
  className,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("divide-y divide-border", className)}>
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className={cn(
            transactionItemVariants({
              variant,
              status: transaction.status,
            }),
            onTransactionClick && "cursor-pointer hover:bg-muted/50",
          )}
          {...(onTransactionClick && {
            role: "button",
            tabIndex: 0,
            onClick: () => onTransactionClick(transaction),
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onTransactionClick(transaction);
              }
            },
          })}
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            {transaction.icon || <DollarSignIcon className="size-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{transaction.title}</p>
            {transaction.description && (
              <p className="text-sm text-muted-foreground truncate">
                {transaction.description}
              </p>
            )}
          </div>
          <div className="text-right">
            <p
              className={cn(
                transactionAmountVariants({ type: transaction.type }),
              )}
            >
              {transaction.type === "credit" ? "+" : "-"}
              {transaction.amount}
            </p>
            <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              {transaction.status === "pending" && (
                <ClockIcon className="size-3" />
              )}
              {transaction.status === "completed" && (
                <CheckCircleIcon className="size-3 text-success" />
              )}
              {transaction.status === "failed" && (
                <XCircleIcon className="size-3 text-destructive" />
              )}
              <span>{transaction.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// PaymentCard
// =============================================================================

export type CardType = "visa" | "mastercard" | "amex" | "default";

export interface PaymentCardProps
  extends VariantProps<typeof paymentCardVariants> {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cardType?: CardType;
  isDefault?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function PaymentCard({
  cardNumber,
  cardHolder,
  expiryDate,
  cardType = "default",
  isDefault = false,
  onSelect,
  onEdit,
  onDelete,
  variant,
  size,
  selected,
  className,
}: PaymentCardProps) {
  const maskedNumber = `•••• •••• •••• ${cardNumber.slice(-4)}`;

  return (
    <div
      className={cn(
        paymentCardVariants({
          variant: variant || cardType,
          size,
          selected,
        }),
        onSelect && "cursor-pointer",
        className,
      )}
      {...(onSelect && {
        role: "button",
        tabIndex: 0,
        onClick: onSelect,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        },
      })}
    >
      <div className="flex items-start justify-between">
        <div className="text-sm opacity-80">
          {cardType === "visa" && "Visa"}
          {cardType === "mastercard" && "Mastercard"}
          {cardType === "amex" && "American Express"}
          {cardType === "default" && "Card"}
        </div>
        {isDefault && (
          <Badge variant="secondary" className="text-xs">
            Default
          </Badge>
        )}
      </div>
      <div className="mt-4">
        <p className="text-lg tracking-widest">{maskedNumber}</p>
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <div>
          <p className="opacity-60">Card Holder</p>
          <p className="font-medium">{cardHolder}</p>
        </div>
        <div className="text-right">
          <p className="opacity-60">Expires</p>
          <p className="font-medium">{expiryDate}</p>
        </div>
      </div>
      {(onEdit || onDelete) && (
        <div className="mt-4 flex gap-2">
          {onEdit && (
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              Remove
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// TransferForm
// =============================================================================

export interface TransferFormProps
  extends VariantProps<typeof transferFormVariants> {
  accounts?: { id: string; name: string; balance: string }[];
  defaultFromAccount?: string;
  defaultToAccount?: string;
  onSubmit?: (data: {
    from: string;
    to: string;
    amount: string;
    note?: string;
  }) => void;
  className?: string;
}

export function TransferForm({
  accounts = [],
  defaultFromAccount,
  defaultToAccount,
  onSubmit,
  variant,
  className,
}: TransferFormProps) {
  const [fromAccount, setFromAccount] = useState(defaultFromAccount || "");
  const [toAccount, setToAccount] = useState(defaultToAccount || "");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ from: fromAccount, to: toAccount, amount, note });
  };

  const accountOptions = accounts.map((acc) => ({
    value: acc.id,
    label: `${acc.name} (${acc.balance})`,
  }));

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(transferFormVariants({ variant }), className)}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="from-account">From Account</Label>
          <Select
            options={accountOptions}
            value={fromAccount}
            onChange={setFromAccount}
            placeholder="Select account"
          />
        </div>
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-2">
            <ArrowRightIcon className="size-5 rotate-90" />
          </div>
        </div>
        <div>
          <Label htmlFor="to-account">To Account</Label>
          <Select
            options={accountOptions}
            value={toAccount}
            onChange={setToAccount}
            placeholder="Select account"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            $
          </span>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-8"
            placeholder="0.00"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="note">Note (optional)</Label>
        <Input
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note"
        />
      </div>
      <Button type="submit" className="w-full">
        Transfer Funds
      </Button>
    </form>
  );
}

// =============================================================================
// AccountCard
// =============================================================================

export interface AccountCardProps
  extends VariantProps<typeof accountCardVariants> {
  name: string;
  type: string;
  balance: string;
  accountNumber?: string;
  icon?: ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function AccountCard({
  name,
  type,
  balance,
  accountNumber,
  icon,
  isSelected,
  onClick,
  variant,
  size,
  className,
}: AccountCardProps) {
  return (
    <div
      className={cn(
        accountCardVariants({
          variant: isSelected ? "selected" : variant,
          size,
        }),
        onClick && "cursor-pointer",
        className,
      )}
      {...(onClick && {
        role: "button",
        tabIndex: 0,
        onClick: onClick,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        },
      })}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon || <WalletIcon className="size-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{type}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{balance}</p>
          {accountNumber && (
            <p className="text-xs text-muted-foreground">
              ••• {accountNumber.slice(-4)}
            </p>
          )}
        </div>
      </div>
      {isSelected && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <CheckIcon className="size-5 text-primary" />
        </div>
      )}
    </div>
  );
}

// =============================================================================
// ReceiptTimeline
// =============================================================================

export interface ReceiptItem {
  id: string;
  label: string;
  value: string;
  status?: "completed" | "pending" | "failed";
  timestamp?: string;
}

export interface ReceiptTimelineProps
  extends VariantProps<typeof receiptTimelineVariants> {
  items: ReceiptItem[];
  title?: string;
  total?: { label: string; value: string };
  className?: string;
}

export function ReceiptTimeline({
  items,
  title,
  total,
  variant,
  className,
}: ReceiptTimelineProps) {
  return (
    <div
      className={cn("rounded-xl border border-border bg-card p-4", className)}
    >
      {title && <h3 className="font-semibold mb-4">{title}</h3>}
      <div
        className={cn(
          receiptTimelineVariants({ variant }),
          "border-l-2 border-border",
        )}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(receiptItemVariants({ status: item.status }))}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">{item.label}</p>
                {item.timestamp && (
                  <p className="text-xs text-muted-foreground">
                    {item.timestamp}
                  </p>
                )}
              </div>
              <p className="font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      {total && (
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between font-semibold">
          <span>{total.label}</span>
          <span>{total.value}</span>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// CurrencySelect
// =============================================================================

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
}

export interface CurrencySelectProps
  extends VariantProps<typeof currencySelectVariants> {
  currencies: Currency[];
  value?: string;
  onChange?: (currency: Currency) => void;
  className?: string;
}

export function CurrencySelect({
  currencies,
  value,
  onChange,
  variant,
  className,
}: CurrencySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [positioned, setPositioned] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const selectedCurrency = currencies.find((c) => c.code === value);

  // Reset positioned when closing
  useEffect(() => {
    if (!isOpen) {
      setPositioned(false);
    }
  }, [isOpen]);

  // Calculate position when open
  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || !listRef.current) return;

    const updatePosition = () => {
      if (!triggerRef.current || !listRef.current) return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const listRect = listRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      let top = triggerRect.bottom + 4;
      const left = triggerRect.left;

      // Check if list would overflow below viewport
      if (top + listRect.height > viewportHeight) {
        if (triggerRect.top > viewportHeight - triggerRect.bottom) {
          top = triggerRect.top - listRect.height - 4;
        }
      }

      if (top < 8) top = 8;

      setPosition({ top, left });
      setPositioned(true);
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        listRef.current &&
        !listRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const listContent = isOpen ? (
    <div
      ref={listRef}
      className="fixed z-[9999] w-48 rounded-lg border border-border bg-card shadow-lg"
      style={{
        top: position.top,
        left: position.left,
        visibility: positioned ? "visible" : "hidden",
      }}
    >
      {currencies.map((currency) => (
        <button
          key={currency.code}
          type="button"
          className={cn(
            "flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-muted transition-colors",
            currency.code === value && "bg-primary/10",
          )}
          onClick={() => {
            onChange?.(currency);
            setIsOpen(false);
          }}
        >
          {currency.flag && (
            <span className="text-lg">{currency.flag}</span>
          )}
          <div className="flex-1">
            <p className="font-medium">{currency.code}</p>
            <p className="text-xs text-muted-foreground">{currency.name}</p>
          </div>
          {currency.code === value && (
            <CheckIcon className="size-4 text-primary" />
          )}
        </button>
      ))}
    </div>
  ) : null;

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        className={cn(currencySelectVariants({ variant }), className)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCurrency?.flag && (
          <span className="text-lg">{selectedCurrency.flag}</span>
        )}
        <span className="font-medium">
          {selectedCurrency?.code || "Select"}
        </span>
        <ChevronDownIcon
          className={cn("size-4 transition-transform", isOpen && "rotate-180")}
        />
      </button>
      {typeof document !== "undefined" &&
        listContent &&
        createPortal(listContent, document.body)}
    </div>
  );
}

// Types are exported at their definitions above
