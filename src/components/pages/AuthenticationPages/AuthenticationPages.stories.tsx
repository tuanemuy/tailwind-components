import type { Meta, StoryObj } from "@storybook/react";
import { GitHubIcon, TwitterIcon } from "@/components/icons";
import {
  CreateAccountPage,
  EmailVerificationPage,
  ForgotPasswordCenteredPage,
  LockScreenPage,
  LoginCenteredPage,
  TwoStepVerificationPage,
} from "./index";

// Google icon placeholder - defined early to avoid use-before-declaration
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
  </svg>
);

// =============================================================================
// LockScreenPage Stories
// =============================================================================

const lockScreenMeta: Meta<typeof LockScreenPage> = {
  title: "Pages/Authentication/LockScreenPage",
  component: LockScreenPage,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    user: {
      name: "John Doe",
      email: "john@example.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
  },
};

export default lockScreenMeta;
type LockScreenStory = StoryObj<typeof LockScreenPage>;

export const DefaultLockScreen: LockScreenStory = {};

export const LockScreenWithError: LockScreenStory = {
  args: {
    error: "Incorrect password. Please try again.",
  },
};

export const LockScreenLoading: LockScreenStory = {
  args: {
    loading: true,
  },
};

export const LockScreenWithSwitchAccount: LockScreenStory = {
  args: {
    onSwitchAccount: () => alert("Switch account clicked"),
  },
};

// =============================================================================
// TwoStepVerificationPage Stories
// =============================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _twoStepMeta: Meta<typeof TwoStepVerificationPage> = {
  title: "Pages/Authentication/TwoStepVerificationPage",
  component: TwoStepVerificationPage,
  parameters: {
    layout: "fullscreen",
  },
};
void _twoStepMeta;

type TwoStepStory = StoryObj<typeof TwoStepVerificationPage>;

export const EmailVerification: TwoStepStory = {
  args: {
    method: "email",
    email: "john@example.com",
    onVerify: (code) => alert(`Verifying code: ${code}`),
    onResendCode: () => alert("Resending code"),
    onChangeMethod: () => alert("Change method"),
    onBack: () => alert("Go back"),
  },
};

export const SMSVerification: TwoStepStory = {
  args: {
    method: "sms",
    phone: "+1 (555) ***-**89",
    onVerify: (code) => alert(`Verifying code: ${code}`),
    onResendCode: () => alert("Resending code"),
  },
};

export const AuthenticatorVerification: TwoStepStory = {
  args: {
    method: "authenticator",
    onVerify: (code) => alert(`Verifying code: ${code}`),
    onChangeMethod: () => alert("Change method"),
  },
};

export const TwoStepWithError: TwoStepStory = {
  args: {
    method: "email",
    email: "john@example.com",
    error: "Invalid code. Please try again.",
  },
};

export const TwoStepWithCooldown: TwoStepStory = {
  args: {
    method: "email",
    email: "john@example.com",
    resendCooldown: 30,
  },
};

// =============================================================================
// EmailVerificationPage Stories
// =============================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _emailVerificationMeta: Meta<typeof EmailVerificationPage> = {
  title: "Pages/Authentication/EmailVerificationPage",
  component: EmailVerificationPage,
  parameters: {
    layout: "fullscreen",
  },
};
void _emailVerificationMeta;

type EmailVerificationStory = StoryObj<typeof EmailVerificationPage>;

export const PendingVerification: EmailVerificationStory = {
  args: {
    email: "john@example.com",
    status: "pending",
    onResendEmail: () => alert("Resending email"),
    onChangeEmail: () => alert("Change email"),
  },
};

export const VerifiedEmail: EmailVerificationStory = {
  args: {
    email: "john@example.com",
    status: "verified",
    onContinue: () => alert("Continue"),
  },
};

export const ExpiredLink: EmailVerificationStory = {
  args: {
    email: "john@example.com",
    status: "expired",
    onResendEmail: () => alert("Resending email"),
  },
};

// =============================================================================
// ForgotPasswordCenteredPage Stories
// =============================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _forgotPasswordMeta: Meta<typeof ForgotPasswordCenteredPage> = {
  title: "Pages/Authentication/ForgotPasswordCenteredPage",
  component: ForgotPasswordCenteredPage,
  parameters: {
    layout: "fullscreen",
  },
};
void _forgotPasswordMeta;

type ForgotPasswordStory = StoryObj<typeof ForgotPasswordCenteredPage>;

export const ForgotPasswordDefault: ForgotPasswordStory = {
  args: {
    onSubmit: (email) => alert(`Reset link sent to: ${email}`),
    onBack: () => alert("Go back"),
  },
};

export const ForgotPasswordSuccess: ForgotPasswordStory = {
  args: {
    success: true,
    successEmail: "john@example.com",
    onBack: () => alert("Go back"),
  },
};

export const ForgotPasswordWithError: ForgotPasswordStory = {
  args: {
    error: "No account found with this email address.",
    onBack: () => alert("Go back"),
  },
};

// =============================================================================
// LoginCenteredPage Stories
// =============================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _loginMeta: Meta<typeof LoginCenteredPage> = {
  title: "Pages/Authentication/LoginCenteredPage",
  component: LoginCenteredPage,
  parameters: {
    layout: "fullscreen",
  },
};
void _loginMeta;

type LoginStory = StoryObj<typeof LoginCenteredPage>;

export const LoginDefault: LoginStory = {
  args: {
    onSubmit: (data) => alert(`Login: ${JSON.stringify(data)}`),
    onForgotPassword: () => alert("Forgot password"),
    onSignUp: () => alert("Sign up"),
  },
};

export const LoginWithSocialProviders: LoginStory = {
  args: {
    onSubmit: (data) => alert(`Login: ${JSON.stringify(data)}`),
    socialProviders: [
      {
        id: "google",
        name: "Google",
        icon: <GoogleIcon className="size-5" />,
      },
      {
        id: "github",
        name: "GitHub",
        icon: <GitHubIcon className="size-5" />,
      },
      {
        id: "twitter",
        name: "Twitter",
        icon: <TwitterIcon className="size-5" />,
      },
    ],
    onSocialLogin: (provider) => alert(`Login with: ${provider}`),
  },
};

export const LoginWithError: LoginStory = {
  args: {
    error: "Invalid email or password.",
    onSubmit: (data) => alert(`Login: ${JSON.stringify(data)}`),
  },
};

export const LoginLoading: LoginStory = {
  args: {
    loading: true,
    onSubmit: (data) => alert(`Login: ${JSON.stringify(data)}`),
  },
};

// =============================================================================
// CreateAccountPage Stories
// =============================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _createAccountMeta: Meta<typeof CreateAccountPage> = {
  title: "Pages/Authentication/CreateAccountPage",
  component: CreateAccountPage,
  parameters: {
    layout: "fullscreen",
  },
};
void _createAccountMeta;

type CreateAccountStory = StoryObj<typeof CreateAccountPage>;

export const CreateAccountDefault: CreateAccountStory = {
  args: {
    onSubmit: (data) => alert(`Create account: ${JSON.stringify(data)}`),
    onLogin: () => alert("Go to login"),
  },
};

export const CreateAccountWithCompanyAndPhone: CreateAccountStory = {
  args: {
    showCompanyField: true,
    showPhoneField: true,
    onSubmit: (data) => alert(`Create account: ${JSON.stringify(data)}`),
  },
};

export const CreateAccountWithSocialProviders: CreateAccountStory = {
  args: {
    socialProviders: [
      {
        id: "google",
        name: "Google",
        icon: <GoogleIcon className="size-5" />,
      },
      {
        id: "github",
        name: "GitHub",
        icon: <GitHubIcon className="size-5" />,
      },
    ],
    onSocialSignUp: (provider) => alert(`Sign up with: ${provider}`),
    onSubmit: (data) => alert(`Create account: ${JSON.stringify(data)}`),
  },
};

export const CreateAccountWithError: CreateAccountStory = {
  args: {
    error: "An account with this email already exists.",
    onSubmit: (data) => alert(`Create account: ${JSON.stringify(data)}`),
  },
};
