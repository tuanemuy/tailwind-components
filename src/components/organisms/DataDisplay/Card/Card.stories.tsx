import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms";
import { AvatarGroup } from "@/components/molecules";
import { MoreHorizontalIcon } from "@/lib/icons";
import { Card, CardBody, CardFooter, CardHeader, CardImage } from "./index";

const meta: Meta<typeof Card> = {
  title: "Organisms/DataDisplay/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "elevated", "ghost"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Default card
export const Default: Story = {
  render: () => (
    <Card variant="bordered" className="w-80">
      <CardHeader
        title="Card Title"
        subtitle="Card subtitle description"
        bordered
      />
      <CardBody>
        <p className="text-sm text-muted-foreground">
          This is the card body content. You can put any content here including
          text, images, forms, or other components.
        </p>
      </CardBody>
      <CardFooter bordered>
        <Button variant="ghost" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
};

// Card with action button
export const WithAction: Story = {
  render: () => (
    <Card variant="bordered" className="w-80">
      <CardHeader
        title="Team Settings"
        subtitle="Manage your team preferences"
        action={
          <Button variant="ghost" size="sm">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        }
        bordered
      />
      <CardBody>
        <p className="text-sm text-muted-foreground">
          Configure team settings including permissions, notifications, and
          integrations.
        </p>
      </CardBody>
      <CardFooter bordered align="between">
        <span className="text-xs text-muted-foreground">
          Last updated: 2 days ago
        </span>
        <Button size="sm">Edit</Button>
      </CardFooter>
    </Card>
  ),
};

// Card with image
export const WithImage: Story = {
  render: () => (
    <Card variant="bordered" className="w-80">
      <CardImage
        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
        alt="Office workspace"
        aspectRatio="video"
      />
      <CardHeader title="Modern Workspace" subtitle="A guide to productivity" />
      <CardBody padding="sm">
        <p className="text-sm text-muted-foreground">
          Learn how to create an inspiring workspace that boosts your
          productivity and creativity.
        </p>
      </CardBody>
      <CardFooter>
        <Button variant="outline" size="sm" className="flex-1">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Help and Resources style card
export const HelpCard: Story = {
  render: () => (
    <Card variant="bordered" className="w-72">
      <CardBody>
        <AvatarGroup
          items={[
            {
              src: "https://images.unsplash.com/photo-1679412330254-90cb240038c5?w=160&h=160&fit=facearea&facepad=2.5",
              alt: "User 1",
            },
            {
              src: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=160&h=160&fit=facearea&facepad=3",
              alt: "User 2",
            },
            {
              src: "https://images.unsplash.com/photo-1720048171256-38c59a19fd37?w=160&h=160&fit=crop",
              alt: "User 3",
            },
          ]}
          size="xs"
          className="mb-3"
        />
        <h3 className="text-sm font-medium text-foreground">Need help?</h3>
        <p className="text-sm text-muted-foreground">
          Get help from our support team or check out our resources.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Book a call
          </Button>
          <Button variant="ghost" size="sm">
            Resources
          </Button>
        </div>
      </CardBody>
    </Card>
  ),
};

// Elevated card
export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" className="w-80">
      <CardHeader title="Elevated Card" subtitle="With shadow effect" />
      <CardBody>
        <p className="text-sm text-muted-foreground">
          This card has an elevated appearance with a shadow effect, making it
          stand out from the background.
        </p>
      </CardBody>
    </Card>
  ),
};

// Card variants showcase
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Card variant="default" className="w-48" padding="md">
        <p className="text-sm font-medium">Default</p>
        <p className="text-xs text-muted-foreground">No border</p>
      </Card>
      <Card variant="bordered" className="w-48" padding="md">
        <p className="text-sm font-medium">Bordered</p>
        <p className="text-xs text-muted-foreground">With border</p>
      </Card>
      <Card variant="elevated" className="w-48" padding="md">
        <p className="text-sm font-medium">Elevated</p>
        <p className="text-xs text-muted-foreground">With shadow</p>
      </Card>
      <Card variant="ghost" className="w-48" padding="md">
        <p className="text-sm font-medium">Ghost</p>
        <p className="text-xs text-muted-foreground">Transparent</p>
      </Card>
    </div>
  ),
};

// Simple card with padding
export const SimplePadded: Story = {
  render: () => (
    <Card variant="bordered" padding="lg" className="w-80">
      <h3 className="text-lg font-semibold text-foreground">Simple Card</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        A simple card with uniform padding. Use this when you don't need
        separate header, body, and footer sections.
      </p>
      <Button className="mt-4" size="sm">
        Action
      </Button>
    </Card>
  ),
};

// Interactive card (hover effect)
export const Interactive: Story = {
  render: () => (
    <Card
      variant="bordered"
      className="w-80 cursor-pointer transition-colors hover:bg-accent/50"
    >
      <CardBody>
        <h3 className="text-sm font-medium text-foreground">
          Interactive Card
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          This card has hover effects and appears clickable.
        </p>
      </CardBody>
    </Card>
  ),
};
