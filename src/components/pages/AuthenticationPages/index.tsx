"use client";

import { forwardRef, type ReactNode, useState } from "react";
import { Avatar, Button, Link } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import { Card, CardBody, CardFooter, CardHeader } from "@/components/organisms";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  ShieldIcon,
  SmartphoneIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// =============================================================================
// LockScreenPage - ロック画面
// =============================================================================

export interface LockScreenPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  logo?: ReactNode;
  onUnlock?: (password: string) => void;
  onSwitchAccount?: () => void;
  loading?: boolean;
  error?: string;
  showTimer?: boolean;
  lockTime?: string;
}

export const LockScreenPage = forwardRef<HTMLDivElement, LockScreenPageProps>(
  (
    {
      className,
      user,
      logo,
      onUnlock,
      onSwitchAccount,
      loading = false,
      error,
      showTimer = true,
      lockTime = "5 minutes",
      ...props
    },
    ref,
  ) => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onUnlock?.(password);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "min-h-screen flex flex-col items-center justify-center bg-background p-4",
          className,
        )}
        {...props}
      >
        <div className="w-full max-w-sm space-y-6">
          {/* Logo */}
          {logo && <div className="flex justify-center">{logo}</div>}

          {/* Lock icon */}
          <div className="flex justify-center">
            <div className="size-16 rounded-full bg-muted flex items-center justify-center">
              <LockIcon className="size-8 text-muted-foreground" />
            </div>
          </div>

          {/* User info */}
          <div className="text-center">
            <Avatar
              src={user.avatar}
              alt={user.name}
              fallback={user.name.charAt(0).toUpperCase()}
              size="xl"
              className="mx-auto mb-4"
            />
            <h1 className="text-xl font-semibold text-foreground">
              {user.name}
            </h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            {showTimer && (
              <p className="text-xs text-muted-foreground mt-2">
                Screen locked after {lockTime} of inactivity
              </p>
            )}
          </div>

          {/* Unlock form */}
          <Card variant="bordered">
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required
                  error={error}
                  inputProps={{
                    value: password,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value),
                    placeholder: "Enter your password",
                    autoComplete: "current-password",
                    autoFocus: true,
                    leftIcon: (
                      <LockIcon className="size-4 text-muted-foreground" />
                    ),
                    rightIcon: (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
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
                <Button type="submit" className="w-full" loading={loading}>
                  Unlock
                </Button>
              </form>
            </CardBody>
            {onSwitchAccount && (
              <CardFooter className="justify-center">
                <button
                  type="button"
                  onClick={onSwitchAccount}
                  className="text-sm text-primary hover:underline"
                >
                  Switch account
                </button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    );
  },
);
LockScreenPage.displayName = "LockScreenPage";

// =============================================================================
// TwoStepVerificationPage - 2段階認証ページ
// =============================================================================

export interface TwoStepVerificationPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  email?: string;
  phone?: string;
  method?: "email" | "sms" | "authenticator";
  codeLength?: number;
  onVerify?: (code: string) => void;
  onResendCode?: () => void;
  onChangeMethod?: () => void;
  onBack?: () => void;
  loading?: boolean;
  error?: string;
  resendCooldown?: number;
}

export const TwoStepVerificationPage = forwardRef<
  HTMLDivElement,
  TwoStepVerificationPageProps
>(
  (
    {
      className,
      logo,
      email,
      phone,
      method = "email",
      codeLength = 6,
      onVerify,
      onResendCode,
      onChangeMethod,
      onBack,
      loading = false,
      error,
      resendCooldown = 0,
      ...props
    },
    ref,
  ) => {
    const [code, setCode] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onVerify?.(code);
    };

    const getMethodDescription = () => {
      switch (method) {
        case "email":
          return `We've sent a ${codeLength}-digit code to ${email}`;
        case "sms":
          return `We've sent a ${codeLength}-digit code to ${phone}`;
        case "authenticator":
          return "Enter the code from your authenticator app";
      }
    };

    const getMethodIcon = () => {
      switch (method) {
        case "email":
          return <MailIcon className="size-8 text-primary" />;
        case "sms":
          return <SmartphoneIcon className="size-8 text-primary" />;
        case "authenticator":
          return <ShieldIcon className="size-8 text-primary" />;
      }
    };

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
          <Card variant="bordered">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                  {getMethodIcon()}
                </div>
              </div>
              <h1 className="text-xl font-semibold text-foreground">
                Two-step verification
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {getMethodDescription()}
              </p>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  label="Verification code"
                  type="text"
                  required
                  error={error}
                  inputProps={{
                    value: code,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setCode(
                        e.target.value.replace(/\D/g, "").slice(0, codeLength),
                      ),
                    placeholder: "Enter code",
                    autoComplete: "one-time-code",
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: codeLength,
                    autoFocus: true,
                    className: "text-center text-2xl tracking-widest",
                  }}
                />
                <Button
                  type="submit"
                  className="w-full"
                  loading={loading}
                  disabled={code.length !== codeLength}
                >
                  Verify
                </Button>
              </form>

              {/* Resend code */}
              {method !== "authenticator" && (
                <div className="text-center mt-4">
                  {resendCooldown > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Resend code in {resendCooldown}s
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={onResendCode}
                      className="text-sm text-primary hover:underline"
                    >
                      Didn&apos;t receive a code? Resend
                    </button>
                  )}
                </div>
              )}
            </CardBody>
            <CardFooter className="flex-col gap-2">
              {onChangeMethod && (
                <button
                  type="button"
                  onClick={onChangeMethod}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Try another method
                </button>
              )}
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeftIcon className="size-3" />
                  Back to login
                </button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  },
);
TwoStepVerificationPage.displayName = "TwoStepVerificationPage";

// =============================================================================
// EmailVerificationPage - メール認証確認ページ
// =============================================================================

export interface EmailVerificationPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  logo?: ReactNode;
  email: string;
  status?: "pending" | "verified" | "expired";
  onResendEmail?: () => void;
  onChangeEmail?: () => void;
  onContinue?: () => void;
  resendCooldown?: number;
}

export const EmailVerificationPage = forwardRef<
  HTMLDivElement,
  EmailVerificationPageProps
>(
  (
    {
      className,
      logo,
      email,
      status = "pending",
      onResendEmail,
      onChangeEmail,
      onContinue,
      resendCooldown = 0,
      ...props
    },
    ref,
  ) => {
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
          <Card variant="bordered">
            <CardBody className="text-center py-8">
              {status === "verified" ? (
                <>
                  <div className="flex justify-center mb-4">
                    <div className="size-16 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircleIcon className="size-8 text-success" />
                    </div>
                  </div>
                  <h1 className="text-xl font-semibold text-foreground mb-2">
                    Email verified
                  </h1>
                  <p className="text-sm text-muted-foreground mb-6">
                    Your email address has been successfully verified. You can
                    now access all features.
                  </p>
                  {onContinue && (
                    <Button onClick={onContinue} className="w-full">
                      Continue
                    </Button>
                  )}
                </>
              ) : status === "expired" ? (
                <>
                  <div className="flex justify-center mb-4">
                    <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center">
                      <MailIcon className="size-8 text-destructive" />
                    </div>
                  </div>
                  <h1 className="text-xl font-semibold text-foreground mb-2">
                    Link expired
                  </h1>
                  <p className="text-sm text-muted-foreground mb-6">
                    This verification link has expired. Please request a new
                    one.
                  </p>
                  {onResendEmail && (
                    <Button onClick={onResendEmail} className="w-full">
                      Resend verification email
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <div className="flex justify-center mb-4">
                    <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <MailIcon className="size-8 text-primary" />
                    </div>
                  </div>
                  <h1 className="text-xl font-semibold text-foreground mb-2">
                    Check your email
                  </h1>
                  <p className="text-sm text-muted-foreground mb-2">
                    We've sent a verification link to
                  </p>
                  <p className="text-sm font-medium text-foreground mb-6">
                    {email}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Click the link in the email to verify your account. If you
                    don't see it, check your spam folder.
                  </p>
                  {onResendEmail && (
                    <div className="text-center">
                      {resendCooldown > 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Resend email in {resendCooldown}s
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={onResendEmail}
                          className="text-sm text-primary hover:underline"
                        >
                          Resend verification email
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardBody>
            {status === "pending" && onChangeEmail && (
              <CardFooter className="justify-center">
                <button
                  type="button"
                  onClick={onChangeEmail}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Change email address
                </button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    );
  },
);
EmailVerificationPage.displayName = "EmailVerificationPage";

// =============================================================================
// ForgotPasswordCenteredPage - パスワードリセット（センター配置）
// =============================================================================

export interface ForgotPasswordCenteredPageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  logo?: ReactNode;
  onSubmit?: (email: string) => void;
  onBack?: () => void;
  loading?: boolean;
  error?: string;
  success?: boolean;
  successEmail?: string;
}

export const ForgotPasswordCenteredPage = forwardRef<
  HTMLDivElement,
  ForgotPasswordCenteredPageProps
>(
  (
    {
      className,
      logo,
      onSubmit,
      onBack,
      loading = false,
      error,
      success = false,
      successEmail,
      ...props
    },
    ref,
  ) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.(email);
    };

    if (success) {
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
            {logo && <div className="flex justify-center">{logo}</div>}
            <Card variant="bordered">
              <CardBody className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="size-16 rounded-full bg-success/10 flex items-center justify-center">
                    <MailIcon className="size-8 text-success" />
                  </div>
                </div>
                <h1 className="text-xl font-semibold text-foreground mb-2">
                  Check your email
                </h1>
                <p className="text-sm text-muted-foreground mb-2">
                  We've sent a password reset link to
                </p>
                <p className="text-sm font-medium text-foreground mb-6">
                  {successEmail || email}
                </p>
                {onBack && (
                  <Button variant="outline" onClick={onBack} className="w-full">
                    <ArrowLeftIcon className="size-4 mr-2" />
                    Back to login
                  </Button>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      );
    }

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
          <Card variant="bordered">
            <CardHeader className="text-center">
              <h1 className="text-xl font-semibold text-foreground">
                Forgot password?
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                No worries, we'll send you reset instructions.
              </p>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  label="Email"
                  type="email"
                  required
                  error={error}
                  inputProps={{
                    value: email,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value),
                    placeholder: "Enter your email",
                    autoComplete: "email",
                    autoFocus: true,
                    leftIcon: (
                      <MailIcon className="size-4 text-muted-foreground" />
                    ),
                  }}
                />
                <Button type="submit" className="w-full" loading={loading}>
                  Reset password
                </Button>
              </form>
            </CardBody>
            {onBack && (
              <CardFooter className="justify-center">
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeftIcon className="size-3" />
                  Back to login
                </button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    );
  },
);
ForgotPasswordCenteredPage.displayName = "ForgotPasswordCenteredPage";

// =============================================================================
// LoginCenteredPage - ログインページ（センター配置）
// =============================================================================

export interface SocialProvider {
  id: string;
  name: string;
  icon: ReactNode;
}

export interface LoginCenteredPageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  logo?: ReactNode;
  title?: string;
  subtitle?: string;
  onSubmit?: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => void;
  onSocialLogin?: (provider: string) => void;
  socialProviders?: SocialProvider[];
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  signUpUrl?: string;
  forgotPasswordUrl?: string;
  loading?: boolean;
  error?: string;
  showRememberMe?: boolean;
}

export const LoginCenteredPage = forwardRef<
  HTMLDivElement,
  LoginCenteredPageProps
>(
  (
    {
      className,
      logo,
      title = "Welcome back",
      subtitle = "Sign in to your account to continue",
      onSubmit,
      onSocialLogin,
      socialProviders = [],
      onForgotPassword,
      onSignUp,
      signUpUrl = "/signup",
      forgotPasswordUrl = "/forgot-password",
      loading = false,
      error,
      showRememberMe = true,
      ...props
    },
    ref,
  ) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.({ email, password, rememberMe });
    };

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
          <Card variant="bordered">
            <CardHeader className="text-center">
              <h1 className="text-xl font-semibold text-foreground">{title}</h1>
              <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                  label="Email"
                  type="email"
                  required
                  inputProps={{
                    value: email,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value),
                    placeholder: "you@example.com",
                    autoComplete: "email",
                    leftIcon: (
                      <MailIcon className="size-4 text-muted-foreground" />
                    ),
                  }}
                />
                <FormField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required
                  inputProps={{
                    value: password,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value),
                    placeholder: "Enter your password",
                    autoComplete: "current-password",
                    leftIcon: (
                      <LockIcon className="size-4 text-muted-foreground" />
                    ),
                    rightIcon: (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
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

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between">
                  {showRememberMe && (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="size-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-foreground">
                        Remember me
                      </span>
                    </label>
                  )}
                  {(onForgotPassword || forgotPasswordUrl) &&
                    (onForgotPassword ? (
                      <button
                        type="button"
                        onClick={onForgotPassword}
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    ) : (
                      <Link
                        href={forgotPasswordUrl}
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    ))}
                </div>

                {/* Error message */}
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" loading={loading}>
                  Sign in
                </Button>
              </form>

              {/* Social login */}
              {socialProviders.length > 0 && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {socialProviders.map((provider) => (
                      <Button
                        key={provider.id}
                        type="button"
                        variant="outline"
                        className="w-full"
                        leftIcon={provider.icon}
                        onClick={() => onSocialLogin?.(provider.id)}
                      >
                        Continue with {provider.name}
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </CardBody>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                {onSignUp ? (
                  <button
                    type="button"
                    onClick={onSignUp}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </button>
                ) : (
                  <Link
                    href={signUpUrl}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                )}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  },
);
LoginCenteredPage.displayName = "LoginCenteredPage";

// =============================================================================
// CreateAccountPage - アカウント作成ページ（詳細フォーム）
// =============================================================================

export interface CreateAccountPageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  logo?: ReactNode;
  title?: string;
  subtitle?: string;
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    company?: string;
    phone?: string;
    agreeToTerms: boolean;
  }) => void;
  onSocialSignUp?: (provider: string) => void;
  socialProviders?: SocialProvider[];
  onLogin?: () => void;
  loginUrl?: string;
  termsUrl?: string;
  privacyUrl?: string;
  loading?: boolean;
  error?: string;
  showCompanyField?: boolean;
  showPhoneField?: boolean;
}

export const CreateAccountPage = forwardRef<
  HTMLDivElement,
  CreateAccountPageProps
>(
  (
    {
      className,
      logo,
      title = "Create an account",
      subtitle = "Start your journey with us today",
      onSubmit,
      onSocialSignUp,
      socialProviders = [],
      onLogin,
      loginUrl = "/login",
      termsUrl = "/terms",
      privacyUrl = "/privacy",
      loading = false,
      error,
      showCompanyField = false,
      showPhoneField = false,
      ...props
    },
    ref,
  ) => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      company: "",
      phone: "",
      agreeToTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.(formData);
    };

    const updateField = (field: string, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
      <div
        ref={ref}
        className={cn(
          "min-h-screen flex flex-col items-center justify-center bg-background p-4 py-8",
          className,
        )}
        {...props}
      >
        <div className="w-full max-w-lg space-y-6">
          {/* Logo */}
          {logo && <div className="flex justify-center">{logo}</div>}

          {/* Card */}
          <Card variant="bordered">
            <CardHeader className="text-center">
              <h1 className="text-xl font-semibold text-foreground">{title}</h1>
              <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="First name"
                    required
                    inputProps={{
                      value: formData.firstName,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        updateField("firstName", e.target.value),
                      placeholder: "John",
                      autoComplete: "given-name",
                    }}
                  />
                  <FormField
                    label="Last name"
                    required
                    inputProps={{
                      value: formData.lastName,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        updateField("lastName", e.target.value),
                      placeholder: "Doe",
                      autoComplete: "family-name",
                    }}
                  />
                </div>

                {/* Email */}
                <FormField
                  label="Email"
                  type="email"
                  required
                  inputProps={{
                    value: formData.email,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      updateField("email", e.target.value),
                    placeholder: "you@example.com",
                    autoComplete: "email",
                    leftIcon: (
                      <MailIcon className="size-4 text-muted-foreground" />
                    ),
                  }}
                />

                {/* Company (optional) */}
                {showCompanyField && (
                  <FormField
                    label="Company"
                    inputProps={{
                      value: formData.company,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        updateField("company", e.target.value),
                      placeholder: "Company name",
                      autoComplete: "organization",
                    }}
                  />
                )}

                {/* Phone (optional) */}
                {showPhoneField && (
                  <FormField
                    label="Phone"
                    type="tel"
                    inputProps={{
                      value: formData.phone,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        updateField("phone", e.target.value),
                      placeholder: "+1 (555) 123-4567",
                      autoComplete: "tel",
                    }}
                  />
                )}

                {/* Password */}
                <FormField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  required
                  helpText="Must be at least 8 characters"
                  inputProps={{
                    value: formData.password,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      updateField("password", e.target.value),
                    placeholder: "Create a password",
                    autoComplete: "new-password",
                    leftIcon: (
                      <LockIcon className="size-4 text-muted-foreground" />
                    ),
                    rightIcon: (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
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

                {/* Confirm password */}
                <FormField
                  label="Confirm password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  inputProps={{
                    value: formData.confirmPassword,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      updateField("confirmPassword", e.target.value),
                    placeholder: "Confirm your password",
                    autoComplete: "new-password",
                    leftIcon: (
                      <LockIcon className="size-4 text-muted-foreground" />
                    ),
                    rightIcon: (
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="text-muted-foreground hover:text-foreground transition-colors"
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

                {/* Terms agreement */}
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) =>
                      updateField("agreeToTerms", e.target.checked)
                    }
                    className="size-4 rounded border-border text-primary focus:ring-primary mt-0.5"
                    required
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link
                      href={termsUrl}
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href={privacyUrl}
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* Error message */}
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" loading={loading}>
                  Create account
                </Button>
              </form>

              {/* Social signup */}
              {socialProviders.length > 0 && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {socialProviders.map((provider) => (
                      <Button
                        key={provider.id}
                        type="button"
                        variant="outline"
                        className="w-full"
                        leftIcon={provider.icon}
                        onClick={() => onSocialSignUp?.(provider.id)}
                      >
                        Continue with {provider.name}
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </CardBody>
            <CardFooter className="justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                {onLogin ? (
                  <button
                    type="button"
                    onClick={onLogin}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </button>
                ) : (
                  <Link
                    href={loginUrl}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                )}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  },
);
CreateAccountPage.displayName = "CreateAccountPage";
