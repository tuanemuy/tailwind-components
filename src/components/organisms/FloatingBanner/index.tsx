"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { floatingBannerVariants } from "@/lib/variants/banner";
import { XIcon, StarIcon, ThumbsUpIcon, ThumbsDownIcon } from "@/lib/icons";
import { Button } from "@/components/atoms/Button";
import type { VariantProps } from "class-variance-authority";

export interface FloatingBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof floatingBannerVariants> {
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  action?: React.ReactNode;
}

export const FloatingBanner = forwardRef<HTMLDivElement, FloatingBannerProps>(
  (
    {
      className,
      variant = "default",
      position = "bottom",
      size = "md",
      icon,
      closable = true,
      onClose,
      action,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(floatingBannerVariants({ variant, position, size }), className)}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <div className={cn("shrink-0", size === "sm" ? "size-4" : size === "lg" ? "size-6" : "size-5")}>
            {icon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {children}
        </div>

        {/* Action */}
        {action && <div className="shrink-0">{action}</div>}

        {/* Close button */}
        {closable && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Dismiss"
          >
            <XIcon className={cn(size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4")} />
          </button>
        )}
      </div>
    );
  }
);
FloatingBanner.displayName = "FloatingBanner";

// Rate Us Floating Banner
export interface RateUsBannerProps extends Omit<FloatingBannerProps, "children" | "action"> {
  title?: string;
  onRate?: (rating: number) => void;
  maxRating?: number;
}

export const RateUsBanner = forwardRef<HTMLDivElement, RateUsBannerProps>(
  (
    {
      title = "Enjoying the app? Rate us!",
      onRate,
      maxRating = 5,
      ...props
    },
    ref
  ) => {
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handleRate = (rating: number) => {
      setSelectedRating(rating);
      onRate?.(rating);
    };

    return (
      <FloatingBanner
        ref={ref}
        icon={<StarIcon className="size-full text-yellow-500" />}
        {...props}
      >
        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-medium">{title}</p>
          <div className="flex gap-x-1">
            {Array.from({ length: maxRating }, (_, i) => i + 1).map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleRate(rating)}
                onMouseEnter={() => setHoveredRating(rating)}
                onMouseLeave={() => setHoveredRating(null)}
                className="p-0.5 transition-transform hover:scale-110"
              >
                <StarIcon
                  className={cn(
                    "size-5 transition-colors",
                    (hoveredRating !== null ? rating <= hoveredRating : rating <= (selectedRating ?? 0))
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-muted-foreground"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </FloatingBanner>
    );
  }
);
RateUsBanner.displayName = "RateUsBanner";

// Feedback Floating Banner
export interface FeedbackBannerProps extends Omit<FloatingBannerProps, "children" | "action"> {
  question?: string;
  onFeedback?: (isPositive: boolean) => void;
}

export const FeedbackBanner = forwardRef<HTMLDivElement, FeedbackBannerProps>(
  (
    {
      question = "Was this helpful?",
      onFeedback,
      ...props
    },
    ref
  ) => {
    const [feedback, setFeedback] = useState<boolean | null>(null);

    const handleFeedback = (isPositive: boolean) => {
      setFeedback(isPositive);
      onFeedback?.(isPositive);
    };

    return (
      <FloatingBanner
        ref={ref}
        action={
          <div className="flex items-center gap-x-2">
            <button
              type="button"
              onClick={() => handleFeedback(true)}
              className={cn(
                "rounded-md p-2 transition-colors hover:bg-muted",
                feedback === true && "bg-success/10 text-success"
              )}
              aria-label="Yes"
            >
              <ThumbsUpIcon className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => handleFeedback(false)}
              className={cn(
                "rounded-md p-2 transition-colors hover:bg-muted",
                feedback === false && "bg-destructive/10 text-destructive"
              )}
              aria-label="No"
            >
              <ThumbsDownIcon className="size-4" />
            </button>
          </div>
        }
        {...props}
      >
        <p className="text-sm font-medium">{question}</p>
      </FloatingBanner>
    );
  }
);
FeedbackBanner.displayName = "FeedbackBanner";

// Quick Actions Floating Banner
export interface QuickActionsBannerProps extends Omit<FloatingBannerProps, "children" | "action"> {
  actions: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }>;
}

export const QuickActionsBanner = forwardRef<HTMLDivElement, QuickActionsBannerProps>(
  ({ actions, ...props }, ref) => {
    return (
      <FloatingBanner
        ref={ref}
        closable={false}
        {...props}
      >
        <div className="flex items-center gap-x-1">
          {actions.map((action, index) => (
            <button
              key={index}
              type="button"
              onClick={action.onClick}
              className="flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              title={action.label}
            >
              <span className="size-4">{action.icon}</span>
              <span className="hidden sm:inline">{action.label}</span>
            </button>
          ))}
        </div>
      </FloatingBanner>
    );
  }
);
QuickActionsBanner.displayName = "QuickActionsBanner";

// Cookie Consent Banner
export interface CookieConsentBannerProps extends Omit<FloatingBannerProps, "children" | "action"> {
  message?: string;
  acceptText?: string;
  declineText?: string;
  settingsText?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  onSettings?: () => void;
}

export const CookieConsentBanner = forwardRef<HTMLDivElement, CookieConsentBannerProps>(
  (
    {
      message = "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
      acceptText = "Accept",
      declineText = "Decline",
      settingsText,
      onAccept,
      onDecline,
      onSettings,
      ...props
    },
    ref
  ) => {
    return (
      <FloatingBanner
        ref={ref}
        size="lg"
        closable={false}
        action={
          <div className="flex items-center gap-x-2">
            {settingsText && (
              <Button variant="ghost" size="sm" onClick={onSettings}>
                {settingsText}
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={onDecline}>
              {declineText}
            </Button>
            <Button variant="primary" size="sm" onClick={onAccept}>
              {acceptText}
            </Button>
          </div>
        }
        {...props}
      >
        <p className="text-sm">{message}</p>
      </FloatingBanner>
    );
  }
);
CookieConsentBanner.displayName = "CookieConsentBanner";
