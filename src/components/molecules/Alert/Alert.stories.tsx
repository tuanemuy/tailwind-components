import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/atoms";
import { Alert, AlertWithLink } from "./index";

const meta: Meta<typeof Alert> = {
  title: "Molecules/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Heads up!",
    description: "You can add components to your app using the CLI.",
    className: "w-[400px]",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    description: "This is an informational alert message.",
    className: "w-[400px]",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    description: "Your changes have been saved successfully.",
    className: "w-[400px]",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    description: "Your session is about to expire. Please save your work.",
    className: "w-[400px]",
  },
};

export const ErrorVariant: Story = {
  args: {
    variant: "error",
    title: "Error",
    description: "Something went wrong. Please try again later.",
    className: "w-[400px]",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    variant: "info",
    title: "Small Alert",
    description: "This is a small alert message.",
    className: "w-[350px]",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    variant: "success",
    title: "Large Alert",
    description: "This is a large alert message with more prominent styling.",
    className: "w-[450px]",
  },
};

export const Closable: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return <Button onClick={() => setVisible(true)}>Show Alert</Button>;
    }

    return (
      <Alert
        variant="info"
        title="Closable Alert"
        description="Click the X button to close this alert."
        closable
        onClose={() => setVisible(false)}
        className="w-[400px]"
      />
    );
  },
};

export const WithAction: Story = {
  args: {
    variant: "warning",
    title: "Subscription expiring",
    description: "Your subscription will expire in 3 days.",
    action: <Button size="sm">Renew</Button>,
    className: "w-[450px]",
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: "info",
    title: "No Icon",
    description: "This alert does not show an icon.",
    showIcon: false,
    className: "w-[400px]",
  },
};

export const WithLink: Story = {
  render: () => (
    <AlertWithLink
      variant="info"
      title="Update available"
      description="A new software update is available for download."
      linkText="Learn more"
      linkHref="#"
      className="w-[400px]"
    />
  ),
};

export const TitleOnly: Story = {
  args: {
    variant: "success",
    title: "Settings saved successfully!",
    className: "w-[400px]",
  },
};

export const DescriptionOnly: Story = {
  args: {
    variant: "info",
    description: "Please review your information before submitting.",
    className: "w-[400px]",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <Alert variant="default" title="Default" description="Default alert" />
      <Alert variant="info" title="Info" description="Info alert" />
      <Alert variant="success" title="Success" description="Success alert" />
      <Alert variant="warning" title="Warning" description="Warning alert" />
      <Alert variant="error" title="Error" description="Error alert" />
    </div>
  ),
};
