import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRightIcon, ExternalLinkIcon } from "@/components/icons";
import { Link } from "./index";

const meta: Meta<typeof Link> = {
  title: "Atoms/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "muted", "nav"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    external: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "#",
    children: "Default Link",
  },
};

export const Muted: Story = {
  args: {
    href: "#",
    variant: "muted",
    children: "Muted Link",
  },
};

export const Nav: Story = {
  args: {
    href: "#",
    variant: "nav",
    children: "Navigation Link",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Link href="#" size="sm">
        Small
      </Link>
      <Link href="#" size="md">
        Medium
      </Link>
      <Link href="#" size="lg">
        Large
      </Link>
    </div>
  ),
};

export const External: Story = {
  args: {
    href: "https://example.com",
    external: true,
    children: "External Link",
  },
};

export const WithLeftIcon: Story = {
  args: {
    href: "#",
    children: "Documentation",
    leftIcon: <ExternalLinkIcon className="size-3" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    href: "#",
    children: "Learn more",
    rightIcon: <ChevronRightIcon className="size-3" />,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href="#" variant="default">
          Default
        </Link>
        <Link href="#" variant="muted">
          Muted
        </Link>
        <Link href="#" variant="nav">
          Nav
        </Link>
      </div>
    </div>
  ),
};

export const InText: Story = {
  render: () => (
    <p className="text-sm text-muted-foreground max-w-md">
      By continuing, you agree to our <Link href="#">Terms of Service</Link> and{" "}
      <Link href="#">Privacy Policy</Link>.
    </p>
  ),
};

export const NavigationExample: Story = {
  render: () => (
    <nav className="flex items-center gap-6">
      <Link href="#" variant="nav">
        Home
      </Link>
      <Link href="#" variant="nav">
        Products
      </Link>
      <Link href="#" variant="nav">
        About
      </Link>
      <Link href="#" variant="nav">
        Contact
      </Link>
    </nav>
  ),
};

export const FooterLinks: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link href="#" variant="muted" size="sm">
        Privacy Policy
      </Link>
      <Link href="#" variant="muted" size="sm">
        Terms of Service
      </Link>
      <Link href="#" variant="muted" size="sm">
        Cookie Settings
      </Link>
      <Link href="https://example.com" variant="muted" size="sm" external>
        Help Center
      </Link>
    </div>
  ),
};
