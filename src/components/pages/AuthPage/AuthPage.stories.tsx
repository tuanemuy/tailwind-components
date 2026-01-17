import type { Meta, StoryObj } from "@storybook/react";
import { GlobeIcon } from "@/components/icons";
import { AuthFooter, AuthLogo, AuthPage } from ".";

const meta: Meta<typeof AuthPage> = {
  title: "Pages/AuthPage",
  component: AuthPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "login",
        "signup",
        "forgot-password",
        "reset-password",
        "verify-2fa",
      ],
    },
    layout: {
      control: "select",
      options: ["centered", "split", "stacked"],
    },
    loading: {
      control: "boolean",
    },
    showRememberMe: {
      control: "boolean",
    },
    showForgotPassword: {
      control: "boolean",
    },
    showSignupLink: {
      control: "boolean",
    },
    showLoginLink: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthPage>;

// Sample logo component
const Logo = () => (
  <AuthLogo>
    <div className="flex items-center gap-x-2">
      <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
        <GlobeIcon className="size-5 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold text-foreground">Preline</span>
    </div>
  </AuthLogo>
);

// Sample social providers
const socialProviders = [
  {
    id: "google",
    name: "Google",
    icon: (
      <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="currentColor"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="currentColor"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="currentColor"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    ),
  },
  {
    id: "github",
    name: "GitHub",
    icon: (
      <svg
        aria-hidden="true"
        className="size-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
];

// Footer component
const Footer = () => (
  <AuthFooter>© 2024 Preline. All rights reserved.</AuthFooter>
);

// Default login story
export const Login: Story = {
  args: {
    variant: "login",
    layout: "centered",
    logo: <Logo />,
    footer: <Footer />,
    onSubmit: (data) => console.log("Login submitted:", data),
  },
};

// Login with social providers
export const LoginWithSocial: Story = {
  args: {
    variant: "login",
    layout: "centered",
    logo: <Logo />,
    socialProviders,
    footer: <Footer />,
    onSubmit: (data) => console.log("Login submitted:", data),
    onSocialLogin: (provider) => console.log("Social login:", provider),
  },
};

// Signup page
export const Signup: Story = {
  args: {
    variant: "signup",
    layout: "centered",
    logo: <Logo />,
    socialProviders,
    footer: <Footer />,
    onSubmit: (data) => console.log("Signup submitted:", data),
  },
};

// Forgot password
export const ForgotPassword: Story = {
  args: {
    variant: "forgot-password",
    layout: "centered",
    logo: <Logo />,
    footer: <Footer />,
    onSubmit: (data) => console.log("Forgot password submitted:", data),
  },
};

// Reset password
export const ResetPassword: Story = {
  args: {
    variant: "reset-password",
    layout: "centered",
    logo: <Logo />,
    footer: <Footer />,
    onSubmit: (data) => console.log("Reset password submitted:", data),
  },
};

// Split layout
export const SplitLayout: Story = {
  args: {
    variant: "login",
    layout: "split",
    logo: <Logo />,
    socialProviders,
    splitImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    splitContent: (
      <div className="text-white text-center space-y-4 bg-black/50 p-8 rounded-xl backdrop-blur-sm">
        <h2 className="text-3xl font-bold">Welcome to Preline</h2>
        <p className="text-lg opacity-90">
          Build beautiful, modern web applications with our component library.
        </p>
      </div>
    ),
    onSubmit: (data) => console.log("Login submitted:", data),
  },
};

// Stacked layout
export const StackedLayout: Story = {
  args: {
    variant: "login",
    layout: "stacked",
    logo: <Logo />,
    socialProviders,
    footer: <Footer />,
    onSubmit: (data) => console.log("Login submitted:", data),
  },
};

// Loading state
export const Loading: Story = {
  args: {
    variant: "login",
    layout: "centered",
    logo: <Logo />,
    loading: true,
    onSubmit: (data) => console.log("Login submitted:", data),
  },
};

// Error state
export const WithError: Story = {
  args: {
    variant: "login",
    layout: "centered",
    logo: <Logo />,
    error: "Invalid email or password. Please try again.",
    onSubmit: (data) => console.log("Login submitted:", data),
  },
};

// Minimal login (no extra options)
export const MinimalLogin: Story = {
  args: {
    variant: "login",
    layout: "centered",
    showRememberMe: false,
    showForgotPassword: false,
    showSignupLink: false,
    onSubmit: (data) => console.log("Login submitted:", data),
  },
};

// Signup split layout
export const SignupSplit: Story = {
  args: {
    variant: "signup",
    layout: "split",
    logo: <Logo />,
    socialProviders,
    splitImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    onSubmit: (data) => console.log("Signup submitted:", data),
  },
};

// Two-factor authentication
export const TwoFactorAuth: Story = {
  args: {
    variant: "verify-2fa",
    layout: "centered",
    logo: <Logo />,
    footer: <Footer />,
    onSubmit: (data) => console.log("2FA verification submitted:", data),
  },
};

// Two-factor authentication with error
export const TwoFactorAuthWithError: Story = {
  args: {
    variant: "verify-2fa",
    layout: "centered",
    logo: <Logo />,
    error: "Invalid verification code. Please try again.",
    footer: <Footer />,
    onSubmit: (data) => console.log("2FA verification submitted:", data),
  },
};

// Two-factor authentication loading
export const TwoFactorAuthLoading: Story = {
  args: {
    variant: "verify-2fa",
    layout: "centered",
    logo: <Logo />,
    loading: true,
    onSubmit: (data) => console.log("2FA verification submitted:", data),
  },
};
