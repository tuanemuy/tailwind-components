import { forwardRef } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Switch } from "@/components/atoms/Switch";
import { CheckCircleIcon, SettingsIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type IntegrationStatus =
  | "connected"
  | "disconnected"
  | "pending"
  | "error";

export interface IntegrationData {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  logoUrl?: string;
  status: IntegrationStatus;
  category?: string;
  lastSynced?: string;
  features?: string[];
  popular?: boolean;
}

const statusConfig: Record<
  IntegrationStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "warning" | "success";
  }
> = {
  connected: { label: "Connected", variant: "success" },
  disconnected: { label: "Not Connected", variant: "secondary" },
  pending: { label: "Pending", variant: "warning" },
  error: { label: "Error", variant: "destructive" },
};

export interface IntegrationCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  integration: IntegrationData;
  variant?: "default" | "compact" | "detailed" | "list";
  onConnect?: (integration: IntegrationData) => void;
  onDisconnect?: (integration: IntegrationData) => void;
  onConfigure?: (integration: IntegrationData) => void;
  showStatus?: boolean;
}

export const IntegrationCard = forwardRef<HTMLDivElement, IntegrationCardProps>(
  (
    {
      className,
      integration,
      variant = "default",
      onConnect,
      onDisconnect,
      onConfigure,
      showStatus = true,
      ...props
    },
    ref,
  ) => {
    const statusInfo = statusConfig[integration.status];
    const isConnected = integration.status === "connected";

    if (variant === "list") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-between gap-x-4 rounded-lg border border-border bg-card p-4",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-x-4">
            {integration.logoUrl ? (
              <img
                src={integration.logoUrl}
                alt={integration.name}
                className="size-10 rounded-lg object-contain"
              />
            ) : integration.icon ? (
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                {integration.icon}
              </div>
            ) : null}
            <div className="min-w-0">
              <div className="flex items-center gap-x-2">
                <p className="truncate font-medium text-foreground">
                  {integration.name}
                </p>
                {integration.popular && (
                  <Badge variant="default" size="sm">
                    Popular
                  </Badge>
                )}
              </div>
              {integration.description && (
                <p className="truncate text-sm text-muted-foreground">
                  {integration.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            {showStatus && (
              <Badge variant={statusInfo.variant} size="sm">
                {statusInfo.label}
              </Badge>
            )}
            {isConnected ? (
              <div className="flex items-center gap-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onConfigure?.(integration)}
                >
                  <SettingsIcon className="size-4" />
                </Button>
                <Switch
                  checked={true}
                  onChange={() => onDisconnect?.(integration)}
                />
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onConnect?.(integration)}
              >
                Connect
              </Button>
            )}
          </div>
        </div>
      );
    }

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-between gap-x-3 rounded-lg border border-border bg-card p-3",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-x-3">
            {integration.logoUrl ? (
              <img
                src={integration.logoUrl}
                alt={integration.name}
                className="size-8 rounded object-contain"
              />
            ) : integration.icon ? (
              <div className="flex size-8 items-center justify-center rounded bg-muted">
                {integration.icon}
              </div>
            ) : null}
            <span className="text-sm font-medium text-foreground">
              {integration.name}
            </span>
          </div>
          {isConnected ? (
            <CheckCircleIcon className="size-5 text-success" />
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => onConnect?.(integration)}
            >
              Connect
            </Button>
          )}
        </div>
      );
    }

    if (variant === "detailed") {
      return (
        <div
          ref={ref}
          className={cn("rounded-xl border border-border bg-card", className)}
          {...props}
        >
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-x-4">
                {integration.logoUrl ? (
                  <img
                    src={integration.logoUrl}
                    alt={integration.name}
                    className="size-14 rounded-xl object-contain"
                  />
                ) : integration.icon ? (
                  <div className="flex size-14 items-center justify-center rounded-xl bg-muted">
                    {integration.icon}
                  </div>
                ) : null}
                <div>
                  <div className="flex items-center gap-x-2">
                    <h3 className="font-semibold text-foreground">
                      {integration.name}
                    </h3>
                    {integration.popular && (
                      <Badge variant="default" size="sm">
                        Popular
                      </Badge>
                    )}
                  </div>
                  {integration.category && (
                    <p className="text-sm text-muted-foreground">
                      {integration.category}
                    </p>
                  )}
                </div>
              </div>
              <Badge variant={statusInfo.variant} size="sm">
                {statusInfo.label}
              </Badge>
            </div>

            {integration.description && (
              <p className="mt-3 text-sm text-muted-foreground">
                {integration.description}
              </p>
            )}

            {integration.features && integration.features.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Features
                </p>
                <ul className="space-y-1.5">
                  {integration.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-x-2 text-sm text-foreground"
                    >
                      <CheckCircleIcon className="size-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            {integration.lastSynced ? (
              <p className="text-xs text-muted-foreground">
                Last synced: {integration.lastSynced}
              </p>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-x-2">
              {isConnected && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onConfigure?.(integration)}
                >
                  <SettingsIcon className="mr-2 size-4" />
                  Configure
                </Button>
              )}
              {isConnected ? (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDisconnect?.(integration)}
                >
                  Disconnect
                </Button>
              ) : (
                <Button size="sm" onClick={() => onConnect?.(integration)}>
                  Connect
                </Button>
              )}
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
        <div className="flex items-start justify-between">
          {integration.logoUrl ? (
            <img
              src={integration.logoUrl}
              alt={integration.name}
              className="size-12 rounded-xl object-contain"
            />
          ) : integration.icon ? (
            <div className="flex size-12 items-center justify-center rounded-xl bg-muted">
              {integration.icon}
            </div>
          ) : null}
          {showStatus && (
            <Badge variant={statusInfo.variant} size="sm">
              {statusInfo.label}
            </Badge>
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-x-2">
            <h4 className="font-semibold text-foreground">
              {integration.name}
            </h4>
            {integration.popular && (
              <Badge variant="secondary" size="sm">
                Popular
              </Badge>
            )}
          </div>
          {integration.description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {integration.description}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-x-2">
          {isConnected ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onConfigure?.(integration)}
              >
                Configure
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDisconnect?.(integration)}
              >
                Disconnect
              </Button>
            </>
          ) : (
            <Button
              className="w-full"
              size="sm"
              onClick={() => onConnect?.(integration)}
            >
              Connect
            </Button>
          )}
        </div>
      </div>
    );
  },
);
IntegrationCard.displayName = "IntegrationCard";

// Grid component for multiple integrations
export interface IntegrationCardGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  integrations: IntegrationData[];
  variant?: IntegrationCardProps["variant"];
  columns?: 2 | 3 | 4;
  onConnect?: (integration: IntegrationData) => void;
  onDisconnect?: (integration: IntegrationData) => void;
  onConfigure?: (integration: IntegrationData) => void;
  showStatus?: boolean;
}

const columnClasses: Record<number, string> = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export const IntegrationCardGrid = forwardRef<
  HTMLDivElement,
  IntegrationCardGridProps
>(
  (
    {
      className,
      integrations,
      variant = "default",
      columns = 3,
      onConnect,
      onDisconnect,
      onConfigure,
      showStatus = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("grid gap-4", columnClasses[columns], className)}
        {...props}
      >
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            variant={variant}
            onConnect={onConnect}
            onDisconnect={onDisconnect}
            onConfigure={onConfigure}
            showStatus={showStatus}
          />
        ))}
      </div>
    );
  },
);
IntegrationCardGrid.displayName = "IntegrationCardGrid";

// List component for integrations
export interface IntegrationCardListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  integrations: IntegrationData[];
  variant?: "list" | "compact";
  onConnect?: (integration: IntegrationData) => void;
  onDisconnect?: (integration: IntegrationData) => void;
  onConfigure?: (integration: IntegrationData) => void;
  showStatus?: boolean;
}

export const IntegrationCardList = forwardRef<
  HTMLDivElement,
  IntegrationCardListProps
>(
  (
    {
      className,
      integrations,
      variant = "list",
      onConnect,
      onDisconnect,
      onConfigure,
      showStatus = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {integrations.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            variant={variant}
            onConnect={onConnect}
            onDisconnect={onDisconnect}
            onConfigure={onConfigure}
            showStatus={showStatus}
          />
        ))}
      </div>
    );
  },
);
IntegrationCardList.displayName = "IntegrationCardList";
