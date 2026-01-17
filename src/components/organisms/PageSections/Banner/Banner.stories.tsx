import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms/Button";
import { BellIcon } from "@/components/icons";
import { AuthBanner, Banner, GiftBanner, NewsBanner } from "./index";

const meta: Meta<typeof Banner> = {
  title: "Organisms/PageSections/Banner",
  component: Banner,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "info",
        "success",
        "warning",
        "error",
        "gradient",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    position: {
      control: "select",
      options: ["top", "bottom"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    children: "This is a default banner message.",
    closable: true,
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Get started with our new features!",
    linkText: "Learn more",
    linkHref: "#",
    closable: true,
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "System maintenance scheduled for tonight.",
    closable: true,
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Your account has been successfully upgraded!",
    closable: true,
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Your subscription expires in 3 days.",
    linkText: "Renew now",
    linkHref: "#",
    closable: true,
  },
};

export const ErrorVariant: Story = {
  args: {
    variant: "error",
    children: "Payment failed. Please update your payment method.",
    linkText: "Update payment",
    linkHref: "#",
    closable: true,
  },
};

export const Gradient: Story = {
  args: {
    variant: "gradient",
    children: "Special offer! Get 20% off on all products.",
    linkText: "Shop now",
    linkHref: "#",
    closable: true,
  },
};

export const WithCustomIcon: Story = {
  args: {
    variant: "primary",
    icon: <BellIcon className="size-full" />,
    children: "New notifications are available.",
    closable: true,
  },
};

export const WithAction: Story = {
  args: {
    variant: "default",
    children: "Enable notifications to stay updated.",
    action: (
      <Button size="sm" variant="primary">
        Enable
      </Button>
    ),
    closable: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Banner size="sm" variant="primary" closable>
        Small banner message
      </Banner>
      <Banner size="md" variant="primary" closable>
        Medium banner message
      </Banner>
      <Banner size="lg" variant="primary" closable>
        Large banner message
      </Banner>
    </div>
  ),
};

// Gift Banner Stories
export const Gift: StoryObj<typeof GiftBanner> = {
  render: () => (
    <GiftBanner
      offerText="Holiday Sale!"
      discount="Save up to 50%"
      code="HOLIDAY50"
      linkText="Shop the sale"
      linkHref="#"
      closable
    />
  ),
};

// Auth Banner Stories
export const Auth: StoryObj<typeof AuthBanner> = {
  render: () => (
    <AuthBanner loginHref="/login" registerHref="/register" closable>
      Join thousands of developers building with our platform.
    </AuthBanner>
  ),
};

// News Banner Stories
export const News: StoryObj<typeof NewsBanner> = {
  render: () => (
    <NewsBanner
      badge="New"
      newsText="We've just released our latest update with exciting features."
      linkText="See what's new"
      linkHref="#"
      closable
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-1">
      <Banner variant="default" closable>
        Default banner
      </Banner>
      <Banner variant="primary" closable>
        Primary banner
      </Banner>
      <Banner variant="info" closable>
        Info banner
      </Banner>
      <Banner variant="success" closable>
        Success banner
      </Banner>
      <Banner variant="warning" closable>
        Warning banner
      </Banner>
      <Banner variant="error" closable>
        Error banner
      </Banner>
      <Banner variant="gradient" closable>
        Gradient banner
      </Banner>
    </div>
  ),
};
