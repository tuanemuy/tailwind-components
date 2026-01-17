"use client";

import { forwardRef, type ReactNode } from "react";
import { Button, Link } from "@/components/atoms";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  HomeIcon,
  RefreshIcon,
  RocketIcon,
  SettingsIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// Base error page props
interface BaseErrorPageProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  code?: string | number;
  icon?: ReactNode;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  footer?: ReactNode;
  showBackgroundPattern?: boolean;
}

// NotFoundPage (404)
export interface NotFoundPageProps extends BaseErrorPageProps {}

export const NotFoundPage = forwardRef<HTMLDivElement, NotFoundPageProps>(
  (
    {
      className,
      title = "Page not found",
      description = "Sorry, we couldn't find the page you're looking for. The page might have been removed, renamed, or doesn't exist.",
      code = "404",
      icon,
      primaryAction = { label: "Go home", href: "/" },
      secondaryAction = {
        label: "Go back",
        onClick: () => window.history.back(),
      },
      footer,
      showBackgroundPattern = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "min-h-screen flex flex-col items-center justify-center bg-background p-4 relative",
          className,
        )}
        {...props}
      >
        {/* Background pattern */}
        {showBackgroundPattern && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muted/50 via-transparent to-transparent" />
          </div>
        )}

        <div className="relative z-10 text-center max-w-lg">
          {/* Error code */}
          <p className="text-8xl font-bold text-muted-foreground/30 mb-4">
            {code}
          </p>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            {icon || (
              <div className="size-16 rounded-full bg-muted flex items-center justify-center">
                <AlertCircleIcon className="size-8 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>

          {/* Description */}
          <p className="text-muted-foreground mb-8">{description}</p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {primaryAction &&
              (primaryAction.href ? (
                <Button asChild>
                  <Link href={primaryAction.href} unstyled>
                    <HomeIcon className="size-4 mr-2" />
                    {primaryAction.label}
                  </Link>
                </Button>
              ) : (
                <Button onClick={primaryAction.onClick}>
                  <HomeIcon className="size-4 mr-2" />
                  {primaryAction.label}
                </Button>
              ))}
            {secondaryAction &&
              (secondaryAction.href ? (
                <Button variant="outline" asChild>
                  <Link href={secondaryAction.href} unstyled>
                    <ArrowLeftIcon className="size-4 mr-2" />
                    {secondaryAction.label}
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" onClick={secondaryAction.onClick}>
                  <ArrowLeftIcon className="size-4 mr-2" />
                  {secondaryAction.label}
                </Button>
              ))}
          </div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="absolute bottom-6 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    );
  },
);
NotFoundPage.displayName = "NotFoundPage";

// ErrorPage (500)
export interface ErrorPageProps extends BaseErrorPageProps {
  error?: Error;
  resetError?: () => void;
}

export const ErrorPage = forwardRef<HTMLDivElement, ErrorPageProps>(
  (
    {
      className,
      title = "Something went wrong",
      description = "We're sorry, but something unexpected happened. Please try again later or contact support if the problem persists.",
      code = "500",
      icon,
      error,
      resetError,
      primaryAction,
      secondaryAction,
      footer,
      showBackgroundPattern = true,
      ...props
    },
    ref,
  ) => {
    const defaultPrimaryAction = resetError
      ? { label: "Try again", onClick: resetError }
      : { label: "Go home", href: "/" };

    return (
      <div
        ref={ref}
        className={cn(
          "min-h-screen flex flex-col items-center justify-center bg-background p-4 relative",
          className,
        )}
        {...props}
      >
        {showBackgroundPattern && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-destructive/5 via-transparent to-transparent" />
          </div>
        )}

        <div className="relative z-10 text-center max-w-lg">
          <p className="text-8xl font-bold text-destructive/30 mb-4">{code}</p>

          <div className="flex justify-center mb-6">
            {icon || (
              <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircleIcon className="size-8 text-destructive" />
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>

          <p className="text-muted-foreground mb-4">{description}</p>

          {error && import.meta.env.DEV && (
            <div className="mb-6 p-4 rounded-lg bg-muted text-left overflow-auto max-h-32">
              <p className="text-xs font-mono text-muted-foreground">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {(primaryAction || defaultPrimaryAction) && (
              <Button onClick={(primaryAction || defaultPrimaryAction).onClick}>
                <RefreshIcon className="size-4 mr-2" />
                {(primaryAction || defaultPrimaryAction).label}
              </Button>
            )}
            {secondaryAction && (
              <Button variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>

        {footer && (
          <div className="absolute bottom-6 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    );
  },
);
ErrorPage.displayName = "ErrorPage";

// MaintenancePage
export interface MaintenancePageProps extends BaseErrorPageProps {
  estimatedTime?: string;
  progressPercent?: number;
  statusUpdates?: {
    time: string;
    message: string;
  }[];
}

export const MaintenancePage = forwardRef<HTMLDivElement, MaintenancePageProps>(
  (
    {
      className,
      title = "Under maintenance",
      description = "We're currently performing scheduled maintenance to improve our services. We'll be back shortly.",
      icon,
      estimatedTime,
      progressPercent,
      statusUpdates = [],
      primaryAction,
      footer,
      showBackgroundPattern = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "min-h-screen flex flex-col items-center justify-center bg-background p-4 relative",
          className,
        )}
        {...props}
      >
        {showBackgroundPattern && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-warning/5 via-transparent to-transparent" />
          </div>
        )}

        <div className="relative z-10 text-center max-w-lg">
          <div className="flex justify-center mb-6">
            {icon || (
              <div className="size-16 rounded-full bg-warning/10 flex items-center justify-center animate-pulse">
                <SettingsIcon className="size-8 text-warning" />
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>

          <p className="text-muted-foreground mb-6">{description}</p>

          {/* Estimated time */}
          {estimatedTime && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <ClockIcon className="size-4" />
              <span>Estimated completion: {estimatedTime}</span>
            </div>
          )}

          {/* Progress bar */}
          {progressPercent !== undefined && (
            <div className="mb-6">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {progressPercent}% complete
              </p>
            </div>
          )}

          {/* Status updates */}
          {statusUpdates.length > 0 && (
            <div className="mb-6 p-4 rounded-lg bg-muted/50 text-left">
              <h3 className="text-sm font-medium text-foreground mb-2">
                Status Updates
              </h3>
              <div className="space-y-2">
                {statusUpdates.map((update) => (
                  <div
                    key={`${update.time}-${update.message}`}
                    className="flex gap-2 text-sm"
                  >
                    <span className="text-muted-foreground shrink-0">
                      {update.time}
                    </span>
                    <span className="text-foreground">{update.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {primaryAction && (
            <Button variant="outline" onClick={primaryAction.onClick}>
              <RefreshIcon className="size-4 mr-2" />
              {primaryAction.label}
            </Button>
          )}
        </div>

        {footer && (
          <div className="absolute bottom-6 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    );
  },
);
MaintenancePage.displayName = "MaintenancePage";

// ComingSoonPage
export interface ComingSoonPageProps extends BaseErrorPageProps {
  launchDate?: string;
  emailPlaceholder?: string;
  onEmailSubmit?: (email: string) => void;
  features?: {
    icon: ReactNode;
    title: string;
    description: string;
  }[];
  socialLinks?: {
    icon: ReactNode;
    href: string;
    label: string;
  }[];
}

export const ComingSoonPage = forwardRef<HTMLDivElement, ComingSoonPageProps>(
  (
    {
      className,
      title = "Coming Soon",
      description = "We're working on something exciting. Sign up to be notified when we launch.",
      icon,
      launchDate,
      emailPlaceholder = "Enter your email",
      onEmailSubmit,
      features = [],
      socialLinks = [],
      footer,
      showBackgroundPattern = true,
      ...props
    },
    ref,
  ) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      onEmailSubmit?.(email);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "min-h-screen flex flex-col items-center justify-center bg-background p-4 relative",
          className,
        )}
        {...props}
      >
        {showBackgroundPattern && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          </div>
        )}

        <div className="relative z-10 text-center max-w-2xl">
          <div className="flex justify-center mb-6">
            {icon || (
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                <RocketIcon className="size-8 text-primary" />
              </div>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {title}
          </h1>

          <p className="text-lg text-muted-foreground mb-6">{description}</p>

          {/* Launch date */}
          {launchDate && (
            <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium mb-8">
              <CalendarIcon className="size-4" />
              <span>Launching {launchDate}</span>
            </div>
          )}

          {/* Email signup form */}
          {onEmailSubmit && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
            >
              <input
                type="email"
                name="email"
                placeholder={emailPlaceholder}
                required
                className="flex-1 h-10 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button type="submit">Notify Me</Button>
            </form>
          )}

          {/* Features preview */}
          {features.length > 0 && (
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="flex justify-center mb-2">{feature.icon}</div>
                  <h3 className="text-sm font-medium text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Social links */}
          {socialLinks.length > 0 && (
            <div className="flex justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        {footer && (
          <div className="absolute bottom-6 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    );
  },
);
ComingSoonPage.displayName = "ComingSoonPage";
