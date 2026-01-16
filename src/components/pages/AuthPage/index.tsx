"use client";

import { forwardRef, useState } from "react";
import { Button, Checkbox, Link } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  FormActions,
  FormBody,
  FormDivider,
} from "@/components/organisms";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

// Auth page variants
type AuthVariant =
  | "login"
  | "signup"
  | "forgot-password"
  | "reset-password"
  | "verify-2fa";
type AuthLayout = "centered" | "split" | "stacked";

// Social login provider
export interface SocialProvider {
  id: string;
  name: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

// AuthPage props
export interface AuthPageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  variant?: AuthVariant;
  layout?: AuthLayout;
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  onSubmit?: (data: AuthFormData) => void;
  onSocialLogin?: (provider: string) => void;
  socialProviders?: SocialProvider[];
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  showSignupLink?: boolean;
  showLoginLink?: boolean;
  signupUrl?: string;
  loginUrl?: string;
  forgotPasswordUrl?: string;
  termsUrl?: string;
  privacyUrl?: string;
  loading?: boolean;
  error?: string;
  splitImage?: string;
  splitContent?: React.ReactNode;
  footer?: React.ReactNode;
}

export interface AuthFormData {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  rememberMe?: boolean;
  verificationCode?: string;
}

// Default titles based on variant
const defaultTitles: Record<AuthVariant, string> = {
  login: "Welcome back",
  signup: "Create an account",
  "forgot-password": "Forgot password?",
  "reset-password": "Reset password",
  "verify-2fa": "Two-factor authentication",
};

const defaultSubtitles: Record<AuthVariant, string> = {
  login: "Sign in to your account to continue",
  signup: "Start your journey with us today",
  "forgot-password": "Enter your email to receive a reset link",
  "reset-password": "Enter your new password below",
  "verify-2fa": "Enter the code from your authenticator app",
};

export const AuthPage = forwardRef<HTMLDivElement, AuthPageProps>(
  (
    {
      className,
      variant = "login",
      layout = "centered",
      logo,
      title,
      subtitle,
      onSubmit,
      onSocialLogin,
      socialProviders = [],
      showRememberMe = true,
      showForgotPassword = true,
      showSignupLink = true,
      showLoginLink = true,
      signupUrl = "/signup",
      loginUrl = "/login",
      forgotPasswordUrl = "/forgot-password",
      termsUrl = "/terms",
      privacyUrl = "/privacy",
      loading = false,
      error,
      splitImage,
      splitContent,
      footer,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const displayTitle = title || defaultTitles[variant];
    const displaySubtitle = subtitle || defaultSubtitles[variant];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data: AuthFormData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
        name: formData.get("name") as string,
        rememberMe,
        verificationCode: formData.get("verificationCode") as string,
      };
      onSubmit?.(data);
    };

    const renderForm = () => (
      <Form onSubmit={handleSubmit}>
        <FormBody>
          {/* Name field for signup */}
          {variant === "signup" && (
            <FormField
              label="Full name"
              required
              inputProps={{
                name: "name",
                placeholder: "John Doe",
                autoComplete: "name",
                leftIcon: <UserIcon className="size-4 text-muted-foreground" />,
              }}
            />
          )}

          {/* Email field */}
          {(variant === "login" ||
            variant === "signup" ||
            variant === "forgot-password") && (
            <FormField
              label="Email address"
              type="email"
              required
              inputProps={{
                name: "email",
                placeholder: "you@example.com",
                autoComplete: "email",
                leftIcon: <MailIcon className="size-4 text-muted-foreground" />,
              }}
            />
          )}

          {/* Password field */}
          {(variant === "login" ||
            variant === "signup" ||
            variant === "reset-password") && (
            <FormField
              label={variant === "reset-password" ? "New password" : "Password"}
              type={showPassword ? "text" : "password"}
              required
              inputProps={{
                name: "password",
                placeholder: "Enter your password",
                autoComplete:
                  variant === "login" ? "current-password" : "new-password",
                leftIcon: <LockIcon className="size-4 text-muted-foreground" />,
                rightIcon: (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOffIcon className="size-4" />
                    ) : (
                      <EyeIcon className="size-4" />
                    )}
                  </button>
                ),
              }}
            />
          )}

          {/* Confirm password field */}
          {(variant === "signup" || variant === "reset-password") && (
            <FormField
              label="Confirm password"
              type={showConfirmPassword ? "text" : "password"}
              required
              inputProps={{
                name: "confirmPassword",
                placeholder: "Confirm your password",
                autoComplete: "new-password",
                leftIcon: <LockIcon className="size-4 text-muted-foreground" />,
                rightIcon: (
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="size-4" />
                    ) : (
                      <EyeIcon className="size-4" />
                    )}
                  </button>
                ),
              }}
            />
          )}

          {/* 2FA verification code field */}
          {variant === "verify-2fa" && (
            <FormField
              label="Verification code"
              type="text"
              required
              inputProps={{
                name: "verificationCode",
                placeholder: "Enter 6-digit code",
                autoComplete: "one-time-code",
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 6,
                leftIcon: <LockIcon className="size-4 text-muted-foreground" />,
              }}
              helpText="Enter the code from your authenticator app"
            />
          )}

          {/* Remember me & Forgot password for login */}
          {variant === "login" && (showRememberMe || showForgotPassword) && (
            <div className="flex items-center justify-between">
              {showRememberMe && (
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  label="Remember me"
                  size="sm"
                />
              )}
              {showForgotPassword && (
                <Link
                  href={forgotPasswordUrl}
                  variant="default"
                  size="sm"
                  className="font-medium"
                >
                  Forgot password?
                </Link>
              )}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </FormBody>

        <FormActions align="start" className="flex-col gap-4">
          <Button type="submit" className="w-full" size="lg" loading={loading}>
            {variant === "login" && "Sign in"}
            {variant === "signup" && "Create account"}
            {variant === "forgot-password" && "Send reset link"}
            {variant === "reset-password" && "Reset password"}
            {variant === "verify-2fa" && "Verify"}
          </Button>

          {/* Social login */}
          {socialProviders.length > 0 &&
            (variant === "login" || variant === "signup") && (
              <>
                <FormDivider label="Or continue with" />
                <div className="flex flex-col gap-2 w-full">
                  {socialProviders.map((provider) => (
                    <Button
                      key={provider.id}
                      type="button"
                      variant="outline"
                      className="w-full"
                      leftIcon={provider.icon}
                      onClick={() => {
                        provider.onClick?.();
                        onSocialLogin?.(provider.id);
                      }}
                    >
                      Continue with {provider.name}
                    </Button>
                  ))}
                </div>
              </>
            )}
        </FormActions>
      </Form>
    );

    const renderFooterLinks = () => (
      <div className="text-center text-sm text-muted-foreground">
        {variant === "login" && showSignupLink && (
          <>
            Don&apos;t have an account?{" "}
            <Link href={signupUrl} variant="default" className="font-medium">
              Sign up
            </Link>
          </>
        )}
        {variant === "signup" && showLoginLink && (
          <>
            Already have an account?{" "}
            <Link href={loginUrl} variant="default" className="font-medium">
              Sign in
            </Link>
          </>
        )}
        {(variant === "forgot-password" || variant === "reset-password") &&
          showLoginLink && (
            <>
              Remember your password?{" "}
              <Link href={loginUrl} variant="default" className="font-medium">
                Sign in
              </Link>
            </>
          )}
        {variant === "verify-2fa" && showLoginLink && (
          <>
            Having trouble?{" "}
            <Link href={loginUrl} variant="default" className="font-medium">
              Try another method
            </Link>
          </>
        )}
      </div>
    );

    const renderTerms = () => {
      if (variant !== "signup") return null;

      return (
        <p className="text-center text-xs text-muted-foreground mt-4">
          By signing up, you agree to our{" "}
          <Link href={termsUrl} variant="default" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href={privacyUrl} variant="default" className="underline">
            Privacy Policy
          </Link>
        </p>
      );
    };

    // Centered layout
    if (layout === "centered") {
      return (
        <div
          ref={ref}
          className={cn(
            "min-h-screen flex flex-col items-center justify-center bg-background p-4",
            className,
          )}
          {...props}
        >
          <div className="w-full max-w-md space-y-6">
            {/* Logo */}
            {logo && <div className="flex justify-center">{logo}</div>}

            {/* Card */}
            <Card variant="bordered" className="overflow-visible">
              <CardHeader
                title={displayTitle}
                subtitle={displaySubtitle}
                className="text-center"
              />
              <CardBody padding="none">{renderForm()}</CardBody>
              <CardFooter className="flex-col gap-4">
                {renderFooterLinks()}
                {renderTerms()}
              </CardFooter>
            </Card>

            {/* Custom footer */}
            {footer}
          </div>
        </div>
      );
    }

    // Split layout
    if (layout === "split") {
      return (
        <div
          ref={ref}
          className={cn("min-h-screen flex", className)}
          {...props}
        >
          {/* Form side */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-md space-y-6">
              {logo && <div className="flex justify-start">{logo}</div>}

              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground">
                  {displayTitle}
                </h1>
                <p className="text-muted-foreground">{displaySubtitle}</p>
              </div>

              {renderForm()}
              {renderFooterLinks()}
              {renderTerms()}
              {footer}
            </div>
          </div>

          {/* Image side */}
          <div className="hidden lg:flex lg:flex-1 relative bg-muted">
            {splitImage && (
              <img
                src={splitImage}
                alt=""
                className="absolute inset-0 size-full object-cover"
              />
            )}
            {splitContent && (
              <div className="relative z-10 flex items-center justify-center size-full p-12">
                {splitContent}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Stacked layout
    return (
      <div
        ref={ref}
        className={cn("min-h-screen flex flex-col bg-background", className)}
        {...props}
      >
        {/* Header with logo */}
        <header className="p-4 lg:p-6">
          {logo && <div className="flex justify-start">{logo}</div>}
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-foreground">
                {displayTitle}
              </h1>
              <p className="text-muted-foreground">{displaySubtitle}</p>
            </div>

            {renderForm()}
            {renderFooterLinks()}
            {renderTerms()}
          </div>
        </main>

        {/* Footer */}
        {footer && <footer className="p-4 lg:p-6 text-center">{footer}</footer>}
      </div>
    );
  },
);
AuthPage.displayName = "AuthPage";

// AuthLogo component for consistent logo styling
export interface AuthLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  text?: string;
}

export const AuthLogo = forwardRef<HTMLDivElement, AuthLogoProps>(
  ({ className, src, alt = "Logo", text, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-x-2", className)}
        {...props}
      >
        {children || (
          <>
            {src && <img src={src} alt={alt} className="h-10 w-auto" />}
            {text && (
              <span className="text-xl font-bold text-foreground">{text}</span>
            )}
          </>
        )}
      </div>
    );
  },
);
AuthLogo.displayName = "AuthLogo";

// AuthFooter component for consistent footer styling
export interface AuthFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AuthFooter = forwardRef<HTMLDivElement, AuthFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("text-center text-xs text-muted-foreground", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
AuthFooter.displayName = "AuthFooter";
