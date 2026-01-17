import { forwardRef } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import {
  CheckCircleIcon,
  ClockIcon,
  ExternalLinkIcon,
  GiftIcon,
  InfoIcon,
  RocketIcon,
  StarIcon,
  VideoIcon,
  XIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// ========== CreditsCard ==========
export interface CreditsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  creditsUsed: number;
  creditsTotal: number;
  label?: string;
  onUpgrade?: () => void;
  onDismiss?: () => void;
}

export const CreditsCard = forwardRef<HTMLDivElement, CreditsCardProps>(
  (
    {
      className,
      creditsUsed,
      creditsTotal,
      label = "Credits",
      onUpgrade,
      onDismiss,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.round((creditsUsed / creditsTotal) * 100);
    const isLow = percentage >= 80;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border bg-card p-4",
          isLow ? "border-warning/50 bg-warning/5" : "border-border",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-x-2">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-lg",
                isLow
                  ? "bg-warning/10 text-warning"
                  : "bg-primary/10 text-primary",
              )}
            >
              <StarIcon className="size-4" />
            </div>
            <span className="text-sm font-medium text-foreground">{label}</span>
          </div>
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              className="size-6 p-0"
              onClick={onDismiss}
            >
              <XIcon className="size-3.5" />
            </Button>
          )}
        </div>

        <div className="mt-3">
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">
              {creditsUsed.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">
              / {creditsTotal.toLocaleString()}
            </span>
          </div>
          <ProgressBar
            value={percentage}
            size="sm"
            className={isLow ? "[&>div]:bg-warning" : ""}
          />
        </div>

        {isLow && onUpgrade && (
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-full"
            onClick={onUpgrade}
          >
            <RocketIcon className="mr-2 size-4" />
            Upgrade Plan
          </Button>
        )}
      </div>
    );
  },
);
CreditsCard.displayName = "CreditsCard";

// ========== HelpResourcesCard ==========
export interface HelpResource {
  title: string;
  description?: string;
  url: string;
  icon?: React.ReactNode;
}

export interface HelpResourcesCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  resources: HelpResource[];
  onDismiss?: () => void;
}

export const HelpResourcesCard = forwardRef<
  HTMLDivElement,
  HelpResourcesCardProps
>(
  (
    { className, title = "Need Help?", resources, onDismiss, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-xl border border-border bg-card", className)}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-x-2">
            <InfoIcon className="size-5 text-primary" />
            <h4 className="font-medium text-foreground">{title}</h4>
          </div>
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              className="size-6 p-0"
              onClick={onDismiss}
            >
              <XIcon className="size-3.5" />
            </Button>
          )}
        </div>
        <div className="divide-y divide-border">
          {resources.map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center gap-x-3">
                {resource.icon || (
                  <InfoIcon className="size-4 text-muted-foreground" />
                )}
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {resource.title}
                  </p>
                  {resource.description && (
                    <p className="text-xs text-muted-foreground">
                      {resource.description}
                    </p>
                  )}
                </div>
              </div>
              <ExternalLinkIcon className="size-4 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>
    );
  },
);
HelpResourcesCard.displayName = "HelpResourcesCard";

// ========== IntroVideoCard ==========
export interface IntroVideoCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  duration?: string;
  onPlay?: () => void;
  onDismiss?: () => void;
}

export const IntroVideoCard = forwardRef<HTMLDivElement, IntroVideoCardProps>(
  (
    {
      className,
      title = "Getting Started",
      description = "Watch our quick intro video",
      thumbnailUrl,
      duration,
      onPlay,
      onDismiss,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-card",
          className,
        )}
        {...props}
      >
        <button
          type="button"
          className="relative aspect-video cursor-pointer bg-muted w-full"
          onClick={onPlay}
        >
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <VideoIcon className="size-12 text-primary" />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40">
            <div className="flex size-14 items-center justify-center rounded-full bg-white/90 shadow-lg">
              <div className="ml-1 size-0 border-y-8 border-l-12 border-y-transparent border-l-primary" />
            </div>
          </div>
          {duration && (
            <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
              {duration}
            </div>
          )}
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2 size-6 bg-black/50 p-0 text-white hover:bg-black/70 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
            >
              <XIcon className="size-3.5" />
            </Button>
          )}
        </button>
        <div className="p-4">
          <h4 className="font-medium text-foreground">{title}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    );
  },
);
IntroVideoCard.displayName = "IntroVideoCard";

// ========== TrialCard ==========
export interface TrialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  daysRemaining: number;
  totalDays?: number;
  planName?: string;
  onUpgrade?: () => void;
  onDismiss?: () => void;
}

export const TrialCard = forwardRef<HTMLDivElement, TrialCardProps>(
  (
    {
      className,
      daysRemaining,
      totalDays = 14,
      planName = "Pro Trial",
      onUpgrade,
      onDismiss,
      ...props
    },
    ref,
  ) => {
    const isEnding = daysRemaining <= 3;
    const percentage = ((totalDays - daysRemaining) / totalDays) * 100;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border p-4",
          isEnding
            ? "border-destructive/50 bg-destructive/5"
            : "border-primary/50 bg-primary/5",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-x-2">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-lg",
                isEnding
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary/10 text-primary",
              )}
            >
              <ClockIcon className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{planName}</p>
              <p
                className={cn(
                  "text-xs",
                  isEnding ? "text-destructive" : "text-muted-foreground",
                )}
              >
                {daysRemaining} days remaining
              </p>
            </div>
          </div>
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              className="size-6 p-0"
              onClick={onDismiss}
            >
              <XIcon className="size-3.5" />
            </Button>
          )}
        </div>

        <ProgressBar
          value={percentage}
          size="sm"
          className={cn(
            "mt-3",
            isEnding ? "[&>div]:bg-destructive" : "[&>div]:bg-primary",
          )}
        />

        {onUpgrade && (
          <Button
            variant={isEnding ? "destructive" : "primary"}
            size="sm"
            className="mt-3 w-full"
            onClick={onUpgrade}
          >
            Upgrade Now
          </Button>
        )}
      </div>
    );
  },
);
TrialCard.displayName = "TrialCard";

// ========== UpgradeProCard ==========
export interface UpgradeProCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  features?: string[];
  price?: string;
  period?: string;
  badge?: string;
  onUpgrade?: () => void;
  onDismiss?: () => void;
}

export const UpgradeProCard = forwardRef<HTMLDivElement, UpgradeProCardProps>(
  (
    {
      className,
      title = "Upgrade to Pro",
      description = "Unlock all features and get unlimited access",
      features = [],
      price,
      period = "/month",
      badge,
      onUpgrade,
      onDismiss,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-primary/50 bg-gradient-to-br from-primary/10 to-primary/5 p-4",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-x-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <RocketIcon className="size-5" />
            </div>
            {badge && (
              <Badge variant="default" size="sm">
                {badge}
              </Badge>
            )}
          </div>
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              className="size-6 p-0"
              onClick={onDismiss}
            >
              <XIcon className="size-3.5" />
            </Button>
          )}
        </div>

        <div className="mt-4">
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>

        {features.length > 0 && (
          <ul className="mt-4 space-y-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-x-2 text-sm text-foreground"
              >
                <CheckCircleIcon className="size-4 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {price && (
          <div className="mt-4">
            <span className="text-2xl font-bold text-foreground">{price}</span>
            <span className="text-sm text-muted-foreground">{period}</span>
          </div>
        )}

        {onUpgrade && (
          <Button className="mt-4 w-full" onClick={onUpgrade}>
            <RocketIcon className="mr-2 size-4" />
            Upgrade Now
          </Button>
        )}
      </div>
    );
  },
);
UpgradeProCard.displayName = "UpgradeProCard";

// ========== GiftCard ==========
export interface GiftCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  code?: string;
  expiresAt?: string;
  onRedeem?: () => void;
  onDismiss?: () => void;
}

export const GiftCard = forwardRef<HTMLDivElement, GiftCardProps>(
  (
    {
      className,
      title = "Special Offer",
      description = "You've received a gift!",
      code,
      expiresAt,
      onRedeem,
      onDismiss,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-success/50 bg-gradient-to-br from-success/10 to-success/5 p-4",
          className,
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex size-10 items-center justify-center rounded-lg bg-success/20 text-success">
            <GiftIcon className="size-5" />
          </div>
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              className="size-6 p-0"
              onClick={onDismiss}
            >
              <XIcon className="size-3.5" />
            </Button>
          )}
        </div>

        <div className="mt-4">
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>

        {code && (
          <div className="mt-4 rounded-lg bg-background/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">Use code</p>
            <p className="mt-1 font-mono text-lg font-bold text-foreground">
              {code}
            </p>
          </div>
        )}

        {expiresAt && (
          <p className="mt-3 text-xs text-muted-foreground">
            Expires: {expiresAt}
          </p>
        )}

        {onRedeem && (
          <Button
            variant="primary"
            className="mt-4 w-full bg-success hover:bg-success/90"
            onClick={onRedeem}
          >
            Redeem Now
          </Button>
        )}
      </div>
    );
  },
);
GiftCard.displayName = "GiftCard";
