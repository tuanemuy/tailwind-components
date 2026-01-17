"use client";

import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Button } from "@/components/atoms/Button";
import { AlertTriangleIcon, CheckIcon, InfoIcon, XIcon } from "@/components/icons";
import { cn } from "@/components/utils";
import {
  successMessageDescriptionVariants,
  successMessageIconVariants,
  successMessageTitleVariants,
  successMessageVariants,
} from "@/components/variants/successMessage";

type MessageType = "success" | "error" | "warning" | "info";

export interface SuccessMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof successMessageVariants> {
  type?: MessageType;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  footer?: React.ReactNode;
}

const defaultIcons: Record<MessageType, React.ReactNode> = {
  success: <CheckIcon className="size-8" />,
  error: <XIcon className="size-8" />,
  warning: <AlertTriangleIcon className="size-8" />,
  info: <InfoIcon className="size-8" />,
};

export const SuccessMessage = forwardRef<HTMLDivElement, SuccessMessageProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      type = "success",
      icon,
      title,
      description,
      primaryAction,
      secondaryAction,
      footer,
      ...props
    },
    ref,
  ) => {
    const iconSize =
      size === "sm" ? "size-6" : size === "lg" ? "size-10" : "size-8";

    return (
      <div
        ref={ref}
        className={cn(successMessageVariants({ variant, size }), className)}
        {...props}
      >
        {/* Icon */}
        <div
          className={cn(successMessageIconVariants({ variant: type, size }))}
        >
          {icon || <span className={iconSize}>{defaultIcons[type]}</span>}
        </div>

        {/* Title */}
        <h2 className={cn(successMessageTitleVariants({ size }))}>{title}</h2>

        {/* Description */}
        {description && (
          <p className={cn(successMessageDescriptionVariants({ size }))}>
            {description}
          </p>
        )}

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {primaryAction && (
              <Button
                variant="primary"
                size={size}
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                variant="outline"
                size={size}
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}

        {/* Footer */}
        {footer && <div className="mt-2">{footer}</div>}
      </div>
    );
  },
);
SuccessMessage.displayName = "SuccessMessage";

// Compact inline success message
export interface InlineSuccessMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  type?: MessageType;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissable?: boolean;
  onDismiss?: () => void;
}

export const InlineSuccessMessage = forwardRef<
  HTMLDivElement,
  InlineSuccessMessageProps
>(
  (
    {
      className,
      type = "success",
      message,
      action,
      dismissable = false,
      onDismiss,
      ...props
    },
    ref,
  ) => {
    const bgColors: Record<MessageType, string> = {
      success: "bg-success/10 text-success",
      error: "bg-destructive/10 text-destructive",
      warning: "bg-warning/10 text-warning",
      info: "bg-info/10 text-info",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-3",
          bgColors[type],
          className,
        )}
        {...props}
      >
        <span className="size-5 shrink-0">
          {type === "success" && <CheckIcon className="size-full" />}
          {type === "error" && <XIcon className="size-full" />}
          {type === "warning" && <AlertTriangleIcon className="size-full" />}
          {type === "info" && <InfoIcon className="size-full" />}
        </span>
        <p className="flex-1 text-sm font-medium">{message}</p>
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="text-sm font-medium underline hover:no-underline"
          >
            {action.label}
          </button>
        )}
        {dismissable && (
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-full p-0.5 hover:bg-black/10"
            aria-label="Dismiss"
          >
            <XIcon className="size-4" />
          </button>
        )}
      </div>
    );
  },
);
InlineSuccessMessage.displayName = "InlineSuccessMessage";

// Confirmation message with animation placeholder
export interface ConfirmationMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  details?: Array<{ label: string; value: string }>;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const ConfirmationMessage = forwardRef<
  HTMLDivElement,
  ConfirmationMessageProps
>(
  (
    {
      className,
      title,
      description,
      details,
      primaryAction,
      secondaryAction,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center text-center",
          className,
        )}
        {...props}
      >
        {/* Animated check */}
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-success/10">
          <div className="flex size-16 items-center justify-center rounded-full bg-success text-success-foreground">
            <CheckIcon className="size-8" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>

        {/* Description */}
        {description && (
          <p className="mt-2 max-w-md text-muted-foreground">{description}</p>
        )}

        {/* Details */}
        {details && details.length > 0 && (
          <div className="mt-6 w-full max-w-sm rounded-lg border border-border bg-muted/30 p-4">
            <dl className="space-y-2 text-sm">
              {details.map((detail) => (
                <div key={detail.label} className="flex justify-between">
                  <dt className="text-muted-foreground">{detail.label}</dt>
                  <dd className="font-medium text-foreground">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {primaryAction && (
              <Button variant="primary" onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction && (
              <Button variant="ghost" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  },
);
ConfirmationMessage.displayName = "ConfirmationMessage";

// Empty state / No results message
export interface EmptyStateMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyStateMessage = forwardRef<
  HTMLDivElement,
  EmptyStateMessageProps
>(({ className, icon, title, description, action, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <span className="size-8">{icon}</span>
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && (
        <Button variant="outline" className="mt-4" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
});
EmptyStateMessage.displayName = "EmptyStateMessage";

// Processing / Loading state message
export interface ProcessingMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  progress?: number;
  steps?: Array<{ label: string; status: "pending" | "current" | "completed" }>;
}

export const ProcessingMessage = forwardRef<
  HTMLDivElement,
  ProcessingMessageProps
>(({ className, title, description, progress, steps, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center py-8 text-center",
        className,
      )}
      {...props}
    >
      {/* Spinner */}
      <div className="mb-6">
        <div className="size-12 animate-spin rounded-full border-4 border-muted border-t-primary" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>

      {/* Description */}
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="mt-4 w-full max-w-xs">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Processing...</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Steps */}
      {steps && steps.length > 0 && (
        <div className="mt-6 space-y-2">
          {steps.map((step) => (
            <div
              key={step.label}
              className={cn(
                "flex items-center gap-2 text-sm",
                step.status === "completed" && "text-success",
                step.status === "current" && "text-foreground font-medium",
                step.status === "pending" && "text-muted-foreground",
              )}
            >
              {step.status === "completed" && <CheckIcon className="size-4" />}
              {step.status === "current" && (
                <div className="size-4 animate-spin rounded-full border-2 border-muted border-t-primary" />
              )}
              {step.status === "pending" && (
                <div className="size-4 rounded-full border-2 border-muted" />
              )}
              <span>{step.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
ProcessingMessage.displayName = "ProcessingMessage";
