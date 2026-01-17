import { forwardRef, type ReactNode } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Separator } from "@/components/atoms/Separator";
import { DownloadIcon, MailIcon, PrinterIcon } from "@/components/icons";
import { cn } from "@/components/utils";

// ============================================
// Types
// ============================================

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "paid"
  | "overdue"
  | "cancelled"
  | "refunded";

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  unit?: string;
  discount?: number;
  tax?: number;
}

export interface InvoiceParty {
  name: string;
  company?: string;
  address?: string[];
  email?: string;
  phone?: string;
  taxId?: string;
  logo?: string;
}

export interface InvoicePaymentInfo {
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  routingNumber?: string;
  iban?: string;
  swift?: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  status?: InvoiceStatus;
  date: string;
  dueDate?: string;
  from: InvoiceParty;
  to: InvoiceParty;
  items: InvoiceLineItem[];
  subtotal: number;
  discount?: number;
  discountLabel?: string;
  tax?: number;
  taxLabel?: string;
  taxRate?: number;
  shipping?: number;
  total: number;
  currency?: string;
  currencySymbol?: string;
  notes?: string;
  terms?: string;
  paymentInfo?: InvoicePaymentInfo;
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
// InvoicePreview Props
// ============================================

export interface InvoicePreviewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  invoice: InvoiceData;
  variant?: "default" | "compact" | "detailed";
  showActions?: boolean;
  showPaymentInfo?: boolean;
  onDownload?: () => void;
  onPrint?: () => void;
  onSendEmail?: () => void;
  header?: ReactNode;
  footer?: ReactNode;
}

// ============================================
// InvoicePreview Component
// ============================================

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  (
    {
      className,
      invoice,
      variant = "default",
      showActions = true,
      showPaymentInfo = true,
      onDownload,
      onPrint,
      onSendEmail,
      header,
      footer,
      ...props
    },
    ref,
  ) => {
    const currencySymbol = invoice.currencySymbol || "$";

    const formatCurrency = (amount: number) => {
      return `${currencySymbol}${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-border bg-card",
          variant === "compact" && "text-sm",
          className,
        )}
        {...props}
      >
        {/* Actions bar */}
        {showActions && (onDownload || onPrint || onSendEmail) && (
          <div className="flex items-center justify-end gap-2 border-b border-border p-4 print:hidden">
            {onSendEmail && (
              <Button variant="outline" size="sm" onClick={onSendEmail}>
                <MailIcon className="size-4" />
                Send
              </Button>
            )}
            {onPrint && (
              <Button variant="outline" size="sm" onClick={onPrint}>
                <PrinterIcon className="size-4" />
                Print
              </Button>
            )}
            {onDownload && (
              <Button variant="outline" size="sm" onClick={onDownload}>
                <DownloadIcon className="size-4" />
                Download
              </Button>
            )}
          </div>
        )}

        {/* Header */}
        <div className={cn("p-6", variant === "compact" && "p-4")}>
          {header || (
            <div className="flex items-start justify-between">
              <div>
                {invoice.from.logo ? (
                  <img
                    src={invoice.from.logo}
                    alt={invoice.from.name}
                    className="h-12 mb-4"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-foreground mb-1">
                    {invoice.from.company || invoice.from.name}
                  </h2>
                )}
                <div className="text-sm text-muted-foreground space-y-0.5">
                  {invoice.from.address?.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  {invoice.from.email && <p>{invoice.from.email}</p>}
                  {invoice.from.phone && <p>{invoice.from.phone}</p>}
                  {invoice.from.taxId && <p>Tax ID: {invoice.from.taxId}</p>}
                </div>
              </div>
              <div className="text-end">
                <div className="flex items-center gap-3 justify-end mb-2">
                  <h1 className="text-2xl font-bold text-foreground">
                    INVOICE
                  </h1>
                  {invoice.status && (
                    <Badge variant={statusConfig[invoice.status].variant}>
                      {statusConfig[invoice.status].label}
                    </Badge>
                  )}
                </div>
                <p className="text-lg font-medium text-foreground">
                  #{invoice.invoiceNumber}
                </p>
                <div className="mt-2 text-sm text-muted-foreground space-y-0.5">
                  <p>Date: {invoice.date}</p>
                  {invoice.dueDate && <p>Due: {invoice.dueDate}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Bill To */}
          <div className="mt-8">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Bill To
            </p>
            <div>
              <p className="font-semibold text-foreground">{invoice.to.name}</p>
              {invoice.to.company && (
                <p className="text-sm text-muted-foreground">
                  {invoice.to.company}
                </p>
              )}
              <div className="text-sm text-muted-foreground space-y-0.5 mt-1">
                {invoice.to.address?.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                {invoice.to.email && <p>{invoice.to.email}</p>}
                {invoice.to.phone && <p>{invoice.to.phone}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Items table */}
        <div className="px-6 pb-6">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-start text-sm font-medium text-foreground">
                    Description
                  </th>
                  {variant === "detailed" && (
                    <th className="px-4 py-3 text-end text-sm font-medium text-foreground">
                      Unit
                    </th>
                  )}
                  <th className="px-4 py-3 text-end text-sm font-medium text-foreground">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-end text-sm font-medium text-foreground">
                    Price
                  </th>
                  {variant === "detailed" &&
                    invoice.items.some((i) => i.discount) && (
                      <th className="px-4 py-3 text-end text-sm font-medium text-foreground">
                        Discount
                      </th>
                    )}
                  {variant === "detailed" &&
                    invoice.items.some((i) => i.tax) && (
                      <th className="px-4 py-3 text-end text-sm font-medium text-foreground">
                        Tax
                      </th>
                    )}
                  <th className="px-4 py-3 text-end text-sm font-medium text-foreground">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-border last:border-b-0"
                  >
                    <td className="px-4 py-3 text-sm text-foreground">
                      {item.description}
                    </td>
                    {variant === "detailed" && (
                      <td className="px-4 py-3 text-end text-sm text-muted-foreground">
                        {item.unit || "-"}
                      </td>
                    )}
                    <td className="px-4 py-3 text-end text-sm text-muted-foreground">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-end text-sm text-muted-foreground">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    {variant === "detailed" &&
                      invoice.items.some((i) => i.discount) && (
                        <td className="px-4 py-3 text-end text-sm text-muted-foreground">
                          {item.discount
                            ? `-${formatCurrency(item.discount)}`
                            : "-"}
                        </td>
                      )}
                    {variant === "detailed" &&
                      invoice.items.some((i) => i.tax) && (
                        <td className="px-4 py-3 text-end text-sm text-muted-foreground">
                          {item.tax ? formatCurrency(item.tax) : "-"}
                        </td>
                      )}
                    <td className="px-4 py-3 text-end text-sm font-medium text-foreground">
                      {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-6 flex justify-end">
            <div className="w-72 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">
                  {formatCurrency(invoice.subtotal)}
                </span>
              </div>
              {invoice.discount !== undefined && invoice.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {invoice.discountLabel || "Discount"}
                  </span>
                  <span className="text-success">
                    -{formatCurrency(invoice.discount)}
                  </span>
                </div>
              )}
              {invoice.tax !== undefined && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {invoice.taxLabel || "Tax"}
                    {invoice.taxRate ? ` (${invoice.taxRate}%)` : ""}
                  </span>
                  <span className="text-foreground">
                    {formatCurrency(invoice.tax)}
                  </span>
                </div>
              )}
              {invoice.shipping !== undefined && invoice.shipping > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">
                    {formatCurrency(invoice.shipping)}
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between pt-1">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-foreground">
                  {formatCurrency(invoice.total)}
                </span>
              </div>
              {invoice.status === "paid" && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount Due</span>
                  <span className="font-medium text-success">
                    {formatCurrency(0)}
                  </span>
                </div>
              )}
              {invoice.status === "overdue" && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount Due</span>
                  <span className="font-medium text-destructive">
                    {formatCurrency(invoice.total)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Info */}
          {showPaymentInfo && invoice.paymentInfo && (
            <div className="mt-8 rounded-lg bg-muted/50 p-4">
              <h3 className="font-medium text-foreground mb-3">
                Payment Information
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 text-sm">
                {invoice.paymentInfo.bankName && (
                  <div>
                    <p className="text-muted-foreground">Bank Name</p>
                    <p className="font-medium text-foreground">
                      {invoice.paymentInfo.bankName}
                    </p>
                  </div>
                )}
                {invoice.paymentInfo.accountName && (
                  <div>
                    <p className="text-muted-foreground">Account Name</p>
                    <p className="font-medium text-foreground">
                      {invoice.paymentInfo.accountName}
                    </p>
                  </div>
                )}
                {invoice.paymentInfo.accountNumber && (
                  <div>
                    <p className="text-muted-foreground">Account Number</p>
                    <p className="font-medium text-foreground font-mono">
                      {invoice.paymentInfo.accountNumber}
                    </p>
                  </div>
                )}
                {invoice.paymentInfo.routingNumber && (
                  <div>
                    <p className="text-muted-foreground">Routing Number</p>
                    <p className="font-medium text-foreground font-mono">
                      {invoice.paymentInfo.routingNumber}
                    </p>
                  </div>
                )}
                {invoice.paymentInfo.iban && (
                  <div>
                    <p className="text-muted-foreground">IBAN</p>
                    <p className="font-medium text-foreground font-mono">
                      {invoice.paymentInfo.iban}
                    </p>
                  </div>
                )}
                {invoice.paymentInfo.swift && (
                  <div>
                    <p className="text-muted-foreground">SWIFT/BIC</p>
                    <p className="font-medium text-foreground font-mono">
                      {invoice.paymentInfo.swift}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes & Terms */}
          {(invoice.notes || invoice.terms) && (
            <div className="mt-8 space-y-4">
              {invoice.notes && (
                <div>
                  <h3 className="font-medium text-foreground mb-1">Notes</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {invoice.notes}
                  </p>
                </div>
              )}
              {invoice.terms && (
                <div>
                  <h3 className="font-medium text-foreground mb-1">
                    Terms & Conditions
                  </h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {invoice.terms}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          {footer || (
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Thank you for your business!
              </p>
            </div>
          )}
        </div>
      </div>
    );
  },
);
InvoicePreview.displayName = "InvoicePreview";

// ============================================
// MiniInvoicePreview - Compact summary view
// ============================================

export interface MiniInvoicePreviewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  invoice: Pick<
    InvoiceData,
    | "invoiceNumber"
    | "date"
    | "dueDate"
    | "total"
    | "status"
    | "currency"
    | "currencySymbol"
  > & {
    clientName: string;
  };
  onClick?: () => void;
}

export const MiniInvoicePreview = forwardRef<
  HTMLDivElement,
  MiniInvoicePreviewProps
>(({ className, invoice, onClick, ...props }, ref) => {
  const currencySymbol = invoice.currencySymbol || "$";

  const content = (
    <>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-foreground">
            #{invoice.invoiceNumber}
          </p>
          <p className="text-sm text-muted-foreground">{invoice.clientName}</p>
        </div>
        {invoice.status && (
          <Badge variant={statusConfig[invoice.status].variant} size="sm">
            {statusConfig[invoice.status].label}
          </Badge>
        )}
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-sm text-muted-foreground">
          <p>Date: {invoice.date}</p>
          {invoice.dueDate && <p>Due: {invoice.dueDate}</p>}
        </div>
        <p className="text-lg font-bold text-foreground">
          {currencySymbol}
          {invoice.total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </>
  );

  if (onClick) {
    const { onCopy, onCut, onPaste, ...buttonSafeProps } = props as React.HTMLAttributes<HTMLDivElement> & {
      onCopy?: unknown;
      onCut?: unknown;
      onPaste?: unknown;
    };
    void onCopy; void onCut; void onPaste;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={cn(
          "rounded-lg border border-border bg-card p-4 transition-colors text-left w-full",
          "cursor-pointer hover:bg-muted/50",
          className,
        )}
        onClick={onClick}
        {...(buttonSafeProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-border bg-card p-4 transition-colors",
        className,
      )}
      {...props}
    >
      {content}
    </div>
  );
});
MiniInvoicePreview.displayName = "MiniInvoicePreview";

// ============================================
// InvoicePreviewList - List of invoice previews
// ============================================

export interface InvoicePreviewListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  invoices: Array<
    Pick<
      InvoiceData,
      | "invoiceNumber"
      | "date"
      | "dueDate"
      | "total"
      | "status"
      | "currency"
      | "currencySymbol"
    > & {
      id: string;
      clientName: string;
    }
  >;
  onInvoiceClick?: (invoiceId: string) => void;
  emptyMessage?: string;
}

export const InvoicePreviewList = forwardRef<
  HTMLDivElement,
  InvoicePreviewListProps
>(
  (
    {
      className,
      invoices,
      onInvoiceClick,
      emptyMessage = "No invoices found",
      ...props
    },
    ref,
  ) => {
    if (invoices.length === 0) {
      return (
        <div
          ref={ref}
          className={cn("py-12 text-center text-muted-foreground", className)}
          {...props}
        >
          {emptyMessage}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {invoices.map((invoice) => (
          <MiniInvoicePreview
            key={invoice.id}
            invoice={invoice}
            onClick={() => onInvoiceClick?.(invoice.id)}
          />
        ))}
      </div>
    );
  },
);
InvoicePreviewList.displayName = "InvoicePreviewList";
