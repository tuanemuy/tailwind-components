import { forwardRef } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import {
  BuildingIcon,
  CheckIcon,
  EditIcon,
  HomeIcon,
  MapPinIcon,
  TrashIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

export type AddressType = "home" | "work" | "billing" | "shipping" | "other";

export interface AddressData {
  id: string;
  type: AddressType;
  name?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

const typeConfig: Record<
  AddressType,
  { label: string; icon: React.FC<{ className?: string }> }
> = {
  home: { label: "Home", icon: HomeIcon },
  work: { label: "Work", icon: BuildingIcon },
  billing: { label: "Billing", icon: MapPinIcon },
  shipping: { label: "Shipping", icon: MapPinIcon },
  other: { label: "Other", icon: MapPinIcon },
};

export interface AddressCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  address: AddressData;
  variant?: "default" | "compact" | "selectable" | "inline";
  selected?: boolean;
  onSelect?: (address: AddressData) => void;
  onEdit?: (address: AddressData) => void;
  onDelete?: (address: AddressData) => void;
  onSetDefault?: (address: AddressData) => void;
  showActions?: boolean;
}

export const AddressCard = forwardRef<HTMLDivElement, AddressCardProps>(
  (
    {
      className,
      address,
      variant = "default",
      selected = false,
      onSelect,
      onEdit,
      onDelete,
      onSetDefault,
      showActions = true,
      ...props
    },
    ref,
  ) => {
    const typeInfo = typeConfig[address.type];
    const TypeIcon = typeInfo.icon;

    const formatAddress = () => {
      const parts = [
        address.addressLine1,
        address.addressLine2,
        [address.city, address.state, address.postalCode]
          .filter(Boolean)
          .join(", "),
        address.country,
      ].filter(Boolean);
      return parts;
    };

    if (variant === "inline") {
      return (
        // biome-ignore lint/a11y/useKeyWithClickEvents: Address selection is supplementary
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-x-3 rounded-lg border border-border bg-card p-3",
            selected && "border-primary ring-1 ring-primary",
            onSelect && "cursor-pointer hover:border-primary/50",
            className,
          )}
          onClick={() => onSelect?.(address)}
          {...props}
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
            <TypeIcon className="size-4 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {address.name || typeInfo.label}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {address.addressLine1}, {address.city}
            </p>
          </div>
          {address.isDefault && (
            <Badge variant="secondary" size="sm">
              Default
            </Badge>
          )}
          {selected && <CheckIcon className="size-5 text-primary" />}
        </div>
      );
    }

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-lg border border-border bg-card p-3",
            selected && "border-primary ring-1 ring-primary",
            className,
          )}
          {...props}
        >
          <div className="flex items-start justify-between gap-x-3">
            <div className="flex items-start gap-x-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <TypeIcon className="size-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-x-2">
                  <p className="text-sm font-medium text-foreground">
                    {address.name || typeInfo.label}
                  </p>
                  {address.isDefault && (
                    <Badge variant="secondary" size="sm">
                      Default
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {address.addressLine1}, {address.city}, {address.country}
                </p>
              </div>
            </div>
            {showActions && (
              <Button
                variant="ghost"
                size="sm"
                className="size-7 p-0"
                onClick={() => onEdit?.(address)}
              >
                <EditIcon className="size-4" />
              </Button>
            )}
          </div>
        </div>
      );
    }

    if (variant === "selectable") {
      return (
        // biome-ignore lint/a11y/useKeyWithClickEvents: Address selection is supplementary
        <div
          ref={ref}
          className={cn(
            "cursor-pointer rounded-xl border-2 bg-card p-4 transition-colors",
            selected
              ? "border-primary"
              : "border-border hover:border-primary/50",
            className,
          )}
          onClick={() => onSelect?.(address)}
          {...props}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-x-2">
              <div
                className={cn(
                  "flex size-5 items-center justify-center rounded-full border-2 transition-colors",
                  selected
                    ? "border-primary bg-primary"
                    : "border-muted-foreground",
                )}
              >
                {selected && (
                  <CheckIcon className="size-3 text-primary-foreground" />
                )}
              </div>
              <span className="text-sm font-medium text-foreground">
                {address.name || typeInfo.label}
              </span>
            </div>
            {address.isDefault && (
              <Badge variant="secondary" size="sm">
                Default
              </Badge>
            )}
          </div>

          <div className="mt-3 pl-7">
            {formatAddress().map((line, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Address lines are dynamic strings
              <p key={index} className="text-sm text-muted-foreground">
                {line}
              </p>
            ))}
            {address.phone && (
              <p className="mt-1 text-sm text-muted-foreground">
                {address.phone}
              </p>
            )}
          </div>
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card p-4",
          selected && "border-primary ring-1 ring-primary",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-x-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <TypeIcon className="size-5 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <h4 className="font-medium text-foreground">
                  {address.name || typeInfo.label}
                </h4>
                <Badge variant="secondary" size="sm">
                  {typeInfo.label}
                </Badge>
                {address.isDefault && (
                  <Badge variant="default" size="sm">
                    Default
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {showActions && (
            <div className="flex items-center gap-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0"
                onClick={() => onEdit?.(address)}
              >
                <EditIcon className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0 text-destructive hover:text-destructive"
                onClick={() => onDelete?.(address)}
              >
                <TrashIcon className="size-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-1">
          {formatAddress().map((line, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Address lines are dynamic strings
            <p key={index} className="text-sm text-muted-foreground">
              {line}
            </p>
          ))}
          {address.phone && (
            <p className="mt-2 text-sm text-muted-foreground">
              {address.phone}
            </p>
          )}
        </div>

        {!address.isDefault && onSetDefault && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 h-auto p-0 text-xs text-primary hover:text-primary"
            onClick={() => onSetDefault(address)}
          >
            Set as default
          </Button>
        )}
      </div>
    );
  },
);
AddressCard.displayName = "AddressCard";

// List component for multiple addresses
export interface AddressCardListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  addresses: AddressData[];
  variant?: AddressCardProps["variant"];
  selectedId?: string;
  onSelect?: (address: AddressData) => void;
  onEdit?: (address: AddressData) => void;
  onDelete?: (address: AddressData) => void;
  onSetDefault?: (address: AddressData) => void;
  showActions?: boolean;
}

export const AddressCardList = forwardRef<HTMLDivElement, AddressCardListProps>(
  (
    {
      className,
      addresses,
      variant = "default",
      selectedId,
      onSelect,
      onEdit,
      onDelete,
      onSetDefault,
      showActions = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            variant={variant}
            selected={address.id === selectedId}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
            onSetDefault={onSetDefault}
            showActions={showActions}
          />
        ))}
      </div>
    );
  },
);
AddressCardList.displayName = "AddressCardList";
