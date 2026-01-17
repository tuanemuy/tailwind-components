import { forwardRef, type ReactNode, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { KbdGroup } from "@/components/atoms/Kbd";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/organisms/Layout/Modal";
import {
  CheckIcon,
  DownloadIcon,
  GlobeIcon,
  PrinterIcon,
  SearchIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// KeyboardShortcutsModal
export interface ShortcutCategory {
  name: string;
  shortcuts: {
    label: string;
    keys: string[];
    description?: string;
  }[];
}

export interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: ReactNode;
  categories: ShortcutCategory[];
  searchable?: boolean;
  className?: string;
}

export const KeyboardShortcutsModal = forwardRef<
  HTMLDivElement,
  KeyboardShortcutsModalProps
>(
  (
    {
      isOpen,
      onClose,
      title = "Keyboard Shortcuts",
      subtitle = "Navigate quickly using these keyboard shortcuts",
      categories,
      searchable = true,
      className,
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCategories = searchQuery
      ? categories
          .map((category) => ({
            ...category,
            shortcuts: category.shortcuts.filter(
              (shortcut) =>
                shortcut.label
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                shortcut.keys.some((key) =>
                  key.toLowerCase().includes(searchQuery.toLowerCase()),
                ),
            ),
          }))
          .filter((category) => category.shortcuts.length > 0)
      : categories;

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        className={className}
      >
        <ModalHeader title={title} subtitle={subtitle} showCloseButton />

        <ModalBody padding="md">
          <div className="space-y-6">
            {/* Search */}
            {searchable && (
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shortcuts..."
                leftIcon={<SearchIcon className="size-4" />}
              />
            )}

            {/* Shortcuts list */}
            <div className="max-h-[60vh] space-y-6 overflow-y-auto">
              {filteredCategories.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No shortcuts found
                </p>
              ) : (
                filteredCategories.map((category) => (
                  <div key={category.name} className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground">
                      {category.name}
                    </h3>
                    <div className="space-y-2">
                      {category.shortcuts.map((shortcut) => (
                        <div
                          key={shortcut.label}
                          className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/50"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-foreground">
                              {shortcut.label}
                            </p>
                            {shortcut.description && (
                              <p className="text-xs text-muted-foreground">
                                {shortcut.description}
                              </p>
                            )}
                          </div>
                          <KbdGroup keys={shortcut.keys} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
KeyboardShortcutsModal.displayName = "KeyboardShortcutsModal";

// InvoiceModal
export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate?: string;
  from: {
    name: string;
    address?: string[];
    email?: string;
    phone?: string;
  };
  to: {
    name: string;
    address?: string[];
    email?: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  tax?: number;
  taxRate?: number;
  discount?: number;
  total: number;
  currency?: string;
  notes?: string;
  paymentTerms?: string;
  status?: "draft" | "sent" | "paid" | "overdue";
}

export interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload?: () => void;
  onPrint?: () => void;
  invoice: InvoiceData;
  title?: string;
  className?: string;
}

export const InvoiceModal = forwardRef<HTMLDivElement, InvoiceModalProps>(
  (
    {
      isOpen,
      onClose,
      onDownload,
      onPrint,
      invoice,
      title = "Invoice",
      className,
    },
    ref,
  ) => {
    const currency = invoice.currency || "$";

    const statusColors = {
      draft: "bg-muted text-muted-foreground",
      sent: "bg-info/10 text-info",
      paid: "bg-success/10 text-success",
      overdue: "bg-destructive/10 text-destructive",
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        className={className}
      >
        <ModalHeader showCloseButton bordered={false}>
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            {invoice.status && (
              <Badge className={cn("capitalize", statusColors[invoice.status])}>
                {invoice.status}
              </Badge>
            )}
          </div>
        </ModalHeader>

        <ModalBody padding="md">
          <div className="space-y-6">
            {/* Invoice header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  Invoice #{invoice.invoiceNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  Date: {invoice.date}
                </p>
                {invoice.dueDate && (
                  <p className="text-sm text-muted-foreground">
                    Due: {invoice.dueDate}
                  </p>
                )}
              </div>
            </div>

            {/* From / To */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  From
                </p>
                <p className="font-semibold text-foreground">
                  {invoice.from.name}
                </p>
                {invoice.from.address?.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))}
                {invoice.from.email && (
                  <p className="text-sm text-muted-foreground">
                    {invoice.from.email}
                  </p>
                )}
                {invoice.from.phone && (
                  <p className="text-sm text-muted-foreground">
                    {invoice.from.phone}
                  </p>
                )}
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Bill To
                </p>
                <p className="font-semibold text-foreground">
                  {invoice.to.name}
                </p>
                {invoice.to.address?.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))}
                {invoice.to.email && (
                  <p className="text-sm text-muted-foreground">
                    {invoice.to.email}
                  </p>
                )}
              </div>
            </div>

            {/* Items table */}
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-start text-sm font-medium text-foreground">
                      Description
                    </th>
                    <th className="px-4 py-3 text-end text-sm font-medium text-foreground">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-end text-sm font-medium text-foreground">
                      Unit Price
                    </th>
                    <th className="px-4 py-3 text-end text-sm font-medium text-foreground">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr
                      key={item.description}
                      className="border-b border-border last:border-b-0"
                    >
                      <td className="px-4 py-3 text-sm text-foreground">
                        {item.description}
                      </td>
                      <td className="px-4 py-3 text-end text-sm text-muted-foreground">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-end text-sm text-muted-foreground">
                        {currency}
                        {item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-end text-sm font-medium text-foreground">
                        {currency}
                        {item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">
                    {currency}
                    {invoice.subtotal.toFixed(2)}
                  </span>
                </div>
                {invoice.discount !== undefined && invoice.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-success">
                      -{currency}
                      {invoice.discount.toFixed(2)}
                    </span>
                  </div>
                )}
                {invoice.tax !== undefined && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Tax {invoice.taxRate ? `(${invoice.taxRate}%)` : ""}
                    </span>
                    <span className="text-foreground">
                      {currency}
                      {invoice.tax.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-lg font-bold text-foreground">
                    {currency}
                    {invoice.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes / Payment terms */}
            {(invoice.notes || invoice.paymentTerms) && (
              <div className="space-y-2 rounded-lg bg-muted/50 p-4">
                {invoice.paymentTerms && (
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Payment Terms
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {invoice.paymentTerms}
                    </p>
                  </div>
                )}
                {invoice.notes && (
                  <div>
                    <p className="text-sm font-medium text-foreground">Notes</p>
                    <p className="text-sm text-muted-foreground">
                      {invoice.notes}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          {onPrint && (
            <Button variant="outline" onClick={onPrint}>
              <PrinterIcon className="size-4" />
              Print
            </Button>
          )}
          {onDownload && (
            <Button variant="outline" onClick={onDownload}>
              <DownloadIcon className="size-4" />
              Download PDF
            </Button>
          )}
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
InvoiceModal.displayName = "InvoiceModal";

// LocationModal
export interface LocationOption {
  id: string;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  flag?: string;
  isDefault?: boolean;
}

export interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: LocationOption) => void;
  title?: string;
  subtitle?: ReactNode;
  locations: LocationOption[];
  currentLocationId?: string;
  searchable?: boolean;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

export const LocationModal = forwardRef<HTMLDivElement, LocationModalProps>(
  (
    {
      isOpen,
      onClose,
      onSelect,
      title = "Select Location",
      subtitle,
      locations,
      currentLocationId,
      searchable = true,
      submitText = "Select",
      cancelText = "Cancel",
      loading,
      className,
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedId, setSelectedId] = useState(currentLocationId || "");

    const filteredLocations = searchQuery
      ? locations.filter(
          (location) =>
            location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.address
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            location.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.country?.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : locations;

    const handleSubmit = () => {
      const selected = locations.find((l) => l.id === selectedId);
      if (selected) {
        onSelect(selected);
      }
    };

    const handleClose = () => {
      setSelectedId(currentLocationId || "");
      setSearchQuery("");
      onClose();
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        size="md"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={
            <span className="flex items-center gap-2">
              <GlobeIcon className="size-5" />
              {title}
            </span>
          }
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-4">
            {/* Search */}
            {searchable && (
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search locations..."
                leftIcon={<SearchIcon className="size-4" />}
                disabled={loading}
              />
            )}

            {/* Locations list */}
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {filteredLocations.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No locations found
                </p>
              ) : (
                filteredLocations.map((location) => {
                  const isSelected = selectedId === location.id;
                  return (
                    <button
                      key={location.id}
                      type="button"
                      onClick={() => setSelectedId(location.id)}
                      disabled={loading}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg border p-3 text-start transition-colors",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50",
                      )}
                    >
                      {location.flag && (
                        <span className="text-2xl">{location.flag}</span>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">
                            {location.name}
                          </p>
                          {location.isDefault && (
                            <Badge soft className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        {(location.address || location.city) && (
                          <p className="truncate text-sm text-muted-foreground">
                            {[location.address, location.city, location.country]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <CheckIcon className="size-5 shrink-0 text-primary" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={!selectedId}
          >
            {submitText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
LocationModal.displayName = "LocationModal";
