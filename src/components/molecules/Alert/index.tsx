"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { alertVariants, alertIconVariants } from "@/lib/variants/alert";
import {
  InfoIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
  XIcon,
} from "@/lib/icons";
import type { VariantProps } from "class-variance-authority";

type AlertVariant = "default" | "info" | "success" | "warning" | "error";

const variantIcons: Record<AlertVariant, React.ComponentType<{ className?: string }>> = {
  default: InfoIcon,
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertCircleIcon,
  error: XCircleIcon,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
  action?: React.ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      title,
      description,
      icon,
      showIcon = true,
      closable = false,
      onClose,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const IconComponent = variantIcons[variant ?? "default"];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, size }), className)}
        {...props}
      >
        {/* Icon */}
        {showIcon && (
          <div className={cn(alertIconVariants({ size }))}>
            {icon ?? <IconComponent className="size-full" />}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 space-y-1">
          {title && (
            <h5 className={cn(
              "font-medium",
              size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
            )}>
              {title}
            </h5>
          )}
          {description && (
            <p className={cn(
              "opacity-90",
              size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-sm"
            )}>
              {description}
            </p>
          )}
          {children}
        </div>

        {/* Action */}
        {action && <div className="shrink-0">{action}</div>}

        {/* Close button */}
        {closable && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring",
            )}
            aria-label="Close alert"
          >
            <XIcon className={cn(size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4")} />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

// Alert with link
export interface AlertWithLinkProps extends AlertProps {
  linkText?: string;
  linkHref?: string;
  onLinkClick?: () => void;
}

export const AlertWithLink = forwardRef<HTMLDivElement, AlertWithLinkProps>(
  (
    {
      linkText = "Learn more",
      linkHref,
      onLinkClick,
      description,
      ...props
    },
    ref
  ) => {
    return (
      <Alert ref={ref} description={description} {...props}>
        {(linkHref || onLinkClick) && (
          <a
            href={linkHref}
            onClick={onLinkClick}
            className="mt-1 inline-block font-medium underline hover:no-underline"
          >
            {linkText}
          </a>
        )}
      </Alert>
    );
  }
);
AlertWithLink.displayName = "AlertWithLink";
