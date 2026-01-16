import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms";
import { Toast, ToastProvider, useToast } from "./index";

const meta: Meta<typeof Toast> = {
  title: "Molecules/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Notification",
    description: "This is a default toast notification.",
    className: "w-[350px]",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    description: "This is an informational toast.",
    className: "w-[350px]",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success!",
    description: "Your changes have been saved.",
    className: "w-[350px]",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    description: "Please review before proceeding.",
    className: "w-[350px]",
  },
};

export const ErrorVariant: Story = {
  args: {
    variant: "error",
    title: "Error",
    description: "Something went wrong.",
    className: "w-[350px]",
  },
};

export const WithAction: Story = {
  args: {
    variant: "default",
    title: "New message",
    description: "You have a new message from John.",
    action: (
      <Button size="sm" variant="outline">
        View
      </Button>
    ),
    className: "w-[350px]",
  },
};

export const WithoutIcon: Story = {
  args: {
    title: "Simple notification",
    description: "This toast has no icon.",
    showIcon: false,
    className: "w-[350px]",
  },
};

export const NotClosable: Story = {
  args: {
    variant: "success",
    title: "Auto-dismiss",
    description: "This toast will dismiss automatically.",
    closable: false,
    className: "w-[350px]",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast
        variant="default"
        title="Default"
        description="Default toast"
        className="w-[350px]"
      />
      <Toast
        variant="info"
        title="Info"
        description="Info toast"
        className="w-[350px]"
      />
      <Toast
        variant="success"
        title="Success"
        description="Success toast"
        className="w-[350px]"
      />
      <Toast
        variant="warning"
        title="Warning"
        description="Warning toast"
        className="w-[350px]"
      />
      <Toast
        variant="error"
        title="Error"
        description="Error toast"
        className="w-[350px]"
      />
    </div>
  ),
};

// Interactive Demo with Provider
const ToastDemo = () => {
  const { addToast, clearToasts } = useToast();

  const showToast = (
    variant: "default" | "info" | "success" | "warning" | "error",
  ) => {
    addToast({
      variant,
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`,
      description: `This is a ${variant} toast notification.`,
      duration: 5000,
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => showToast("default")}>
        Default
      </Button>
      <Button variant="outline" onClick={() => showToast("info")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => showToast("success")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => showToast("warning")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => showToast("error")}>
        Error
      </Button>
      <Button variant="ghost" onClick={clearToasts}>
        Clear All
      </Button>
    </div>
  );
};

export const Interactive: Story = {
  render: () => (
    <ToastProvider position="bottom-right">
      <ToastDemo />
    </ToastProvider>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
};

const ToastPositionDemo = () => {
  const { addToast } = useToast();

  return (
    <div className="flex gap-2">
      <Button
        onClick={() =>
          addToast({
            variant: "success",
            title: "Saved!",
            description: "Your changes have been saved.",
          })
        }
      >
        Show Toast
      </Button>
    </div>
  );
};

export const TopRight: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <ToastPositionDemo />
    </ToastProvider>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
};

export const TopCenter: Story = {
  render: () => (
    <ToastProvider position="top-center">
      <ToastPositionDemo />
    </ToastProvider>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
};
