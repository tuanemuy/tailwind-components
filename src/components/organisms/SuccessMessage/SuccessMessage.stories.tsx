import type { Meta, StoryObj } from "@storybook/react";
import {
  SuccessMessage,
  InlineSuccessMessage,
  ConfirmationMessage,
  EmptyStateMessage,
  ProcessingMessage,
} from "./index";
import {
  MailIcon,
  FileIcon,
  SearchIcon,
  FolderIcon,
  RocketIcon,
} from "@/lib/icons";

const meta: Meta<typeof SuccessMessage> = {
  title: "Organisms/PageSections/SuccessMessage",
  component: SuccessMessage,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "card", "fullscreen"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    type: {
      control: "select",
      options: ["success", "error", "warning", "info"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SuccessMessage>;

export const Default: Story = {
  args: {
    type: "success",
    title: "Payment Successful!",
    description: "Your payment has been processed successfully. You will receive a confirmation email shortly.",
    primaryAction: {
      label: "Continue",
      onClick: () => console.log("Continue clicked"),
    },
    secondaryAction: {
      label: "View Receipt",
      onClick: () => console.log("View receipt clicked"),
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-[400px] items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export const Card: Story = {
  args: {
    variant: "card",
    type: "success",
    title: "Account Created!",
    description: "Welcome aboard! Your account has been created successfully.",
    primaryAction: {
      label: "Get Started",
      onClick: () => console.log("Get started"),
    },
  },
  decorators: Default.decorators,
};

export const ErrorMessage: Story = {
  args: {
    type: "error",
    title: "Payment Failed",
    description: "We couldn't process your payment. Please check your card details and try again.",
    primaryAction: {
      label: "Try Again",
      onClick: () => console.log("Try again"),
    },
    secondaryAction: {
      label: "Contact Support",
      onClick: () => console.log("Contact support"),
    },
  },
  decorators: Default.decorators,
};

export const WarningMessage: Story = {
  args: {
    type: "warning",
    title: "Action Required",
    description: "Your subscription will expire in 3 days. Renew now to avoid service interruption.",
    primaryAction: {
      label: "Renew Now",
      onClick: () => console.log("Renew"),
    },
    secondaryAction: {
      label: "Remind Later",
      onClick: () => console.log("Remind"),
    },
  },
  decorators: Default.decorators,
};

export const InfoMessage: Story = {
  args: {
    type: "info",
    title: "Email Sent",
    description: "We've sent a verification email to your inbox. Please check your email and click the link to verify.",
    primaryAction: {
      label: "Open Email App",
      onClick: () => console.log("Open email"),
    },
    secondaryAction: {
      label: "Resend Email",
      onClick: () => console.log("Resend"),
    },
  },
  decorators: Default.decorators,
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-12">
      <SuccessMessage
        size="sm"
        title="Small Success"
        description="This is a small success message"
        primaryAction={{ label: "Continue", onClick: () => {} }}
      />
      <SuccessMessage
        size="md"
        title="Medium Success"
        description="This is a medium success message"
        primaryAction={{ label: "Continue", onClick: () => {} }}
      />
      <SuccessMessage
        size="lg"
        title="Large Success"
        description="This is a large success message"
        primaryAction={{ label: "Continue", onClick: () => {} }}
      />
    </div>
  ),
};

export const CustomIcon: Story = {
  args: {
    icon: <RocketIcon className="size-10" />,
    title: "Launch Successful!",
    description: "Your project has been deployed to production.",
    primaryAction: {
      label: "View Project",
      onClick: () => console.log("View"),
    },
  },
  decorators: Default.decorators,
};

export const WithFooter: Story = {
  args: {
    title: "Order Confirmed!",
    description: "Your order #12345 has been placed successfully.",
    primaryAction: {
      label: "Track Order",
      onClick: () => console.log("Track"),
    },
    footer: (
      <p className="text-xs text-muted-foreground">
        Need help? <a href="#" className="text-primary hover:underline">Contact Support</a>
      </p>
    ),
  },
  decorators: Default.decorators,
};

// Inline messages
export const Inline: StoryObj<typeof InlineSuccessMessage> = {
  render: () => (
    <div className="max-w-md space-y-4">
      <InlineSuccessMessage
        type="success"
        message="Changes saved successfully!"
      />
      <InlineSuccessMessage
        type="error"
        message="Failed to save changes. Please try again."
        action={{ label: "Retry", onClick: () => console.log("Retry") }}
      />
      <InlineSuccessMessage
        type="warning"
        message="Your session will expire in 5 minutes."
        dismissable
        onDismiss={() => console.log("Dismissed")}
      />
      <InlineSuccessMessage
        type="info"
        message="A new version is available."
        action={{ label: "Update", onClick: () => console.log("Update") }}
      />
    </div>
  ),
};

export const InlineDismissable: StoryObj<typeof InlineSuccessMessage> = {
  render: () => (
    <div className="max-w-md">
      <InlineSuccessMessage
        type="success"
        message="Your profile has been updated successfully."
        dismissable
        onDismiss={() => console.log("Dismissed")}
      />
    </div>
  ),
};

// Confirmation message with details
export const Confirmation: StoryObj<typeof ConfirmationMessage> = {
  render: () => (
    <div className="flex min-h-[500px] items-center justify-center">
      <ConfirmationMessage
        title="Order Confirmed!"
        description="Thank you for your purchase. You will receive a confirmation email shortly."
        details={[
          { label: "Order Number", value: "#ORD-12345" },
          { label: "Date", value: "Jan 14, 2026" },
          { label: "Total", value: "$149.99" },
          { label: "Payment Method", value: "Visa •••• 4242" },
        ]}
        primaryAction={{
          label: "Track Order",
          onClick: () => console.log("Track"),
        }}
        secondaryAction={{
          label: "Return to Shop",
          onClick: () => console.log("Return"),
        }}
      />
    </div>
  ),
};

// Empty state message
export const EmptyState: StoryObj<typeof EmptyStateMessage> = {
  render: () => (
    <div className="space-y-8">
      <EmptyStateMessage
        icon={<SearchIcon className="size-full" />}
        title="No results found"
        description="Try adjusting your search or filter to find what you're looking for."
        action={{
          label: "Clear Filters",
          onClick: () => console.log("Clear"),
        }}
      />
      <EmptyStateMessage
        icon={<FolderIcon className="size-full" />}
        title="No projects yet"
        description="Create your first project to get started."
        action={{
          label: "Create Project",
          onClick: () => console.log("Create"),
        }}
      />
      <EmptyStateMessage
        icon={<FileIcon className="size-full" />}
        title="No files"
        description="This folder is empty. Upload files to get started."
        action={{
          label: "Upload Files",
          onClick: () => console.log("Upload"),
        }}
      />
    </div>
  ),
};

// Processing states
export const Processing: StoryObj<typeof ProcessingMessage> = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <ProcessingMessage
        title="Processing your order..."
        description="Please wait while we process your payment."
      />
    </div>
  ),
};

export const ProcessingWithProgress: StoryObj<typeof ProcessingMessage> = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <ProcessingMessage
        title="Uploading files..."
        description="Please don't close this window."
        progress={65}
      />
    </div>
  ),
};

export const ProcessingWithSteps: StoryObj<typeof ProcessingMessage> = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <ProcessingMessage
        title="Creating your account..."
        steps={[
          { label: "Validating information", status: "completed" },
          { label: "Creating account", status: "completed" },
          { label: "Setting up preferences", status: "current" },
          { label: "Finalizing setup", status: "pending" },
        ]}
      />
    </div>
  ),
};

// Real-world examples
export const EmailVerification: Story = {
  render: () => (
    <div className="flex min-h-[500px] items-center justify-center">
      <SuccessMessage
        variant="card"
        icon={<MailIcon className="size-8" />}
        type="info"
        title="Check your email"
        description="We've sent a verification link to john@example.com. Click the link to verify your email address."
        primaryAction={{
          label: "Open Email App",
          onClick: () => console.log("Open email"),
        }}
        secondaryAction={{
          label: "Resend Email",
          onClick: () => console.log("Resend"),
        }}
        footer={
          <p className="text-xs text-muted-foreground">
            Didn't receive the email? Check your spam folder.
          </p>
        }
      />
    </div>
  ),
};

export const SubscriptionConfirmed: Story = {
  render: () => (
    <div className="flex min-h-[500px] items-center justify-center">
      <SuccessMessage
        variant="card"
        type="success"
        title="Welcome to Pro!"
        description="Your subscription is now active. Enjoy all the premium features."
        primaryAction={{
          label: "Explore Features",
          onClick: () => console.log("Explore"),
        }}
        secondaryAction={{
          label: "View Invoice",
          onClick: () => console.log("Invoice"),
        }}
      />
    </div>
  ),
};

export const PasswordChanged: Story = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <SuccessMessage
        type="success"
        title="Password Updated"
        description="Your password has been changed successfully. You can now use your new password to sign in."
        primaryAction={{
          label: "Sign In",
          onClick: () => console.log("Sign in"),
        }}
      />
    </div>
  ),
};
