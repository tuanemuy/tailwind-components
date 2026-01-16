import { forwardRef } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import {
  ClockIcon,
  ExternalLinkIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface StoreContactData {
  id: string;
  name: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode?: string;
    country: string;
  };
  phone?: string;
  email?: string;
  website?: string;
  hours?: BusinessHours[];
  distance?: string;
  isOpen?: boolean;
  mapUrl?: string;
  imageUrl?: string;
}

export interface StoreContactCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  store: StoreContactData;
  variant?: "default" | "compact" | "detailed" | "horizontal";
  showHours?: boolean;
  showMap?: boolean;
  onDirectionsClick?: (store: StoreContactData) => void;
  onCallClick?: (store: StoreContactData) => void;
  onEmailClick?: (store: StoreContactData) => void;
}

export const StoreContactCard = forwardRef<
  HTMLDivElement,
  StoreContactCardProps
>(
  (
    {
      className,
      store,
      variant = "default",
      showHours = true,
      showMap = true,
      onDirectionsClick,
      onCallClick,
      onEmailClick,
      ...props
    },
    ref,
  ) => {
    const formatAddress = () => {
      const { address } = store;
      const parts = [
        address.line1,
        address.line2,
        [address.city, address.state, address.postalCode]
          .filter(Boolean)
          .join(", "),
        address.country,
      ].filter(Boolean);
      return parts;
    };

    if (variant === "horizontal") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex gap-x-4 rounded-xl border border-border bg-card p-4",
            className,
          )}
          {...props}
        >
          {store.imageUrl && (
            <div className="hidden size-24 shrink-0 overflow-hidden rounded-lg sm:block">
              <img
                src={store.imageUrl}
                alt={store.name}
                className="size-full object-cover"
              />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-x-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <h3 className="font-semibold text-foreground">
                    {store.name}
                  </h3>
                  {store.isOpen !== undefined && (
                    <Badge
                      variant={store.isOpen ? "success" : "secondary"}
                      size="sm"
                    >
                      {store.isOpen ? "Open" : "Closed"}
                    </Badge>
                  )}
                </div>
                {store.distance && (
                  <p className="text-sm text-muted-foreground">
                    {store.distance} away
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3 space-y-1.5">
              <div className="flex items-start gap-x-2 text-sm text-muted-foreground">
                <MapPinIcon className="mt-0.5 size-4 shrink-0" />
                <span>{formatAddress().join(", ")}</span>
              </div>
              {store.phone && (
                <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
                  <PhoneIcon className="size-4 shrink-0" />
                  <span>{store.phone}</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {store.phone && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCallClick?.(store)}
                >
                  <PhoneIcon className="mr-2 size-4" />
                  Call
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDirectionsClick?.(store)}
              >
                <MapPinIcon className="mr-2 size-4" />
                Directions
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-lg border border-border bg-card p-3",
            className,
          )}
          {...props}
        >
          <div className="flex items-start justify-between gap-x-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-x-2">
                <h4 className="truncate text-sm font-medium text-foreground">
                  {store.name}
                </h4>
                {store.isOpen !== undefined && (
                  <Badge
                    variant={store.isOpen ? "success" : "secondary"}
                    size="sm"
                  >
                    {store.isOpen ? "Open" : "Closed"}
                  </Badge>
                )}
              </div>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {store.address.line1}, {store.address.city}
              </p>
              {store.distance && (
                <p className="text-xs text-muted-foreground">
                  {store.distance}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="size-8 shrink-0 p-0"
              onClick={() => onDirectionsClick?.(store)}
            >
              <ExternalLinkIcon className="size-4" />
            </Button>
          </div>
        </div>
      );
    }

    if (variant === "detailed") {
      return (
        <div
          ref={ref}
          className={cn(
            "overflow-hidden rounded-xl border border-border bg-card",
            className,
          )}
          {...props}
        >
          {store.imageUrl && (
            <div className="aspect-video">
              <img
                src={store.imageUrl}
                alt={store.name}
                className="size-full object-cover"
              />
            </div>
          )}

          <div className="p-4">
            <div className="flex items-start justify-between gap-x-4">
              <div>
                <h3 className="font-semibold text-foreground">{store.name}</h3>
                {store.distance && (
                  <p className="text-sm text-muted-foreground">
                    {store.distance} away
                  </p>
                )}
              </div>
              {store.isOpen !== undefined && (
                <Badge
                  variant={store.isOpen ? "success" : "secondary"}
                  size="sm"
                >
                  {store.isOpen ? "Open Now" : "Closed"}
                </Badge>
              )}
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-x-3">
                <MapPinIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  {formatAddress().map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>

              {store.phone && (
                <div className="flex items-center gap-x-3">
                  <PhoneIcon className="size-5 shrink-0 text-muted-foreground" />
                  <a
                    href={`tel:${store.phone}`}
                    className="text-sm text-foreground hover:underline"
                  >
                    {store.phone}
                  </a>
                </div>
              )}

              {store.email && (
                <div className="flex items-center gap-x-3">
                  <MailIcon className="size-5 shrink-0 text-muted-foreground" />
                  <a
                    href={`mailto:${store.email}`}
                    className="text-sm text-foreground hover:underline"
                  >
                    {store.email}
                  </a>
                </div>
              )}

              {store.website && (
                <div className="flex items-center gap-x-3">
                  <GlobeIcon className="size-5 shrink-0 text-muted-foreground" />
                  <a
                    href={store.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground hover:underline"
                  >
                    {store.website}
                  </a>
                </div>
              )}
            </div>

            {showHours && store.hours && store.hours.length > 0 && (
              <div className="mt-4 border-t border-border pt-4">
                <div className="flex items-center gap-x-2 text-sm font-medium text-foreground">
                  <ClockIcon className="size-4" />
                  <span>Business Hours</span>
                </div>
                <div className="mt-2 space-y-1">
                  {store.hours.map((hour) => (
                    <div
                      key={hour.day}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{hour.day}</span>
                      <span
                        className={
                          hour.isClosed
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }
                      >
                        {hour.isClosed
                          ? "Closed"
                          : `${hour.open} - ${hour.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-x-2">
              {store.phone && (
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => onCallClick?.(store)}
                >
                  <PhoneIcon className="mr-2 size-4" />
                  Call
                </Button>
              )}
              <Button
                className="flex-1"
                onClick={() => onDirectionsClick?.(store)}
              >
                <MapPinIcon className="mr-2 size-4" />
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn("rounded-xl border border-border bg-card p-4", className)}
        {...props}
      >
        <div className="flex items-start justify-between gap-x-4">
          <div>
            <h3 className="font-semibold text-foreground">{store.name}</h3>
            {store.distance && (
              <p className="text-sm text-muted-foreground">
                {store.distance} away
              </p>
            )}
          </div>
          {store.isOpen !== undefined && (
            <Badge variant={store.isOpen ? "success" : "secondary"} size="sm">
              {store.isOpen ? "Open" : "Closed"}
            </Badge>
          )}
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-x-2 text-sm">
            <MapPinIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            <span className="text-muted-foreground">
              {formatAddress().join(", ")}
            </span>
          </div>
          {store.phone && (
            <div className="flex items-center gap-x-2 text-sm">
              <PhoneIcon className="size-4 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">{store.phone}</span>
            </div>
          )}
          {store.email && (
            <div className="flex items-center gap-x-2 text-sm">
              <MailIcon className="size-4 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">{store.email}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-x-2">
          {store.phone && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCallClick?.(store)}
            >
              <PhoneIcon className="mr-2 size-4" />
              Call
            </Button>
          )}
          <Button size="sm" onClick={() => onDirectionsClick?.(store)}>
            <MapPinIcon className="mr-2 size-4" />
            Directions
          </Button>
        </div>
      </div>
    );
  },
);
StoreContactCard.displayName = "StoreContactCard";

// List component for multiple stores
export interface StoreContactListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  stores: StoreContactData[];
  variant?: StoreContactCardProps["variant"];
  showHours?: boolean;
  showMap?: boolean;
  onDirectionsClick?: (store: StoreContactData) => void;
  onCallClick?: (store: StoreContactData) => void;
  onEmailClick?: (store: StoreContactData) => void;
}

export const StoreContactList = forwardRef<
  HTMLDivElement,
  StoreContactListProps
>(
  (
    {
      className,
      stores,
      variant = "default",
      showHours = true,
      showMap = true,
      onDirectionsClick,
      onCallClick,
      onEmailClick,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {stores.map((store) => (
          <StoreContactCard
            key={store.id}
            store={store}
            variant={variant}
            showHours={showHours}
            showMap={showMap}
            onDirectionsClick={onDirectionsClick}
            onCallClick={onCallClick}
            onEmailClick={onEmailClick}
          />
        ))}
      </div>
    );
  },
);
StoreContactList.displayName = "StoreContactList";
