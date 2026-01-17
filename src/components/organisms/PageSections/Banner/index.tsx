"use client";

import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Button } from "@/components/atoms/Button";
import { GiftIcon, InfoIcon, MegaphoneIcon, XIcon } from "@/components/icons";
import { cn } from "@/components/utils";
import { bannerVariants } from "@/components/variants/banner";

type BannerVariant =
  | "default"
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "gradient";

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
  action?: React.ReactNode;
  linkText?: string;
  linkHref?: string;
  onLinkClick?: () => void;
}

const variantIcons: Record<
  BannerVariant,
  React.ComponentType<{ className?: string }>
> = {
  default: InfoIcon,
  primary: MegaphoneIcon,
  info: InfoIcon,
  success: GiftIcon,
  warning: InfoIcon,
  error: InfoIcon,
  gradient: MegaphoneIcon,
};

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      position = "top",
      icon,
      showIcon = true,
      closable = false,
      onClose,
      action,
      linkText,
      linkHref,
      onLinkClick,
      children,
      ...props
    },
    ref,
  ) => {
    const IconComponent = variantIcons[variant ?? "default"];

    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ variant, size, position }), className)}
        {...props}
      >
        {/* Icon */}
        {showIcon && (
          <div
            className={cn(
              "shrink-0",
              size === "sm" ? "size-4" : size === "lg" ? "size-6" : "size-5",
            )}
          >
            {icon ?? <IconComponent className="size-full" />}
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <p className="font-medium">{children}</p>
          {(linkHref || onLinkClick) && (
            <a
              href={linkHref}
              onClick={onLinkClick}
              className="inline-flex items-center gap-x-1 font-semibold underline hover:no-underline"
            >
              {linkText ?? "Learn more"}
              <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>

        {/* Action */}
        {action && <div className="shrink-0">{action}</div>}

        {/* Close button */}
        {closable && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Dismiss banner"
          >
            <XIcon
              className={cn(
                size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4",
              )}
            />
          </button>
        )}
      </div>
    );
  },
);
Banner.displayName = "Banner";

// Gift Banner variant
export interface GiftBannerProps extends Omit<BannerProps, "variant"> {
  offerText?: string;
  discount?: string;
  code?: string;
}

export const GiftBanner = forwardRef<HTMLDivElement, GiftBannerProps>(
  ({ offerText, discount, code, children, ...props }, ref) => {
    return (
      <Banner
        ref={ref}
        variant="gradient"
        icon={<GiftIcon className="size-full" />}
        {...props}
      >
        <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          {offerText && <span>{offerText}</span>}
          {discount && <span className="font-bold">{discount}</span>}
          {code && (
            <code className="rounded bg-white/20 px-2 py-0.5 font-mono text-sm font-semibold">
              {code}
            </code>
          )}
          {children}
        </span>
      </Banner>
    );
  },
);
GiftBanner.displayName = "GiftBanner";

// Login/Register Banner
export interface AuthBannerProps extends Omit<BannerProps, "variant"> {
  loginHref?: string;
  registerHref?: string;
  loginText?: string;
  registerText?: string;
  onLogin?: () => void;
  onRegister?: () => void;
}

export const AuthBanner = forwardRef<HTMLDivElement, AuthBannerProps>(
  (
    {
      loginHref,
      registerHref,
      loginText = "Sign in",
      registerText = "Create an account",
      onLogin,
      onRegister,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Banner
        ref={ref}
        variant="default"
        showIcon={false}
        action={
          <div className="flex items-center gap-x-2">
            <a
              href={loginHref}
              onClick={onLogin}
              className="text-sm font-medium hover:underline"
            >
              {loginText}
            </a>
            {registerHref ? (
              <a
                href={registerHref}
                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {registerText}
              </a>
            ) : (
              <Button size="sm" variant="primary" onClick={onRegister}>
                {registerText}
              </Button>
            )}
          </div>
        }
        {...props}
      >
        {children}
      </Banner>
    );
  },
);
AuthBanner.displayName = "AuthBanner";

// News Banner with icon and action
export interface NewsBannerProps extends Omit<BannerProps, "variant"> {
  badge?: string;
  newsText: string;
}

export const NewsBanner = forwardRef<HTMLDivElement, NewsBannerProps>(
  (
    { badge, newsText, linkText, linkHref, onLinkClick, children, ...props },
    ref,
  ) => {
    return (
      <Banner
        ref={ref}
        variant="primary"
        showIcon={false}
        linkText={linkText ?? "Read more"}
        linkHref={linkHref}
        onLinkClick={onLinkClick}
        {...props}
      >
        <span className="flex flex-wrap items-center justify-center gap-x-2">
          {badge && (
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">
              {badge}
            </span>
          )}
          <span>{newsText}</span>
          {children}
        </span>
      </Banner>
    );
  },
);
NewsBanner.displayName = "NewsBanner";
