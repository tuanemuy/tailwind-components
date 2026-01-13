import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./index";

const meta: Meta<typeof Separator> = {
  title: "Atoms/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    decorative: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    className: "w-80",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "h-20",
  },
};

export const InContent: Story = {
  render: () => (
    <div className="w-80">
      <p className="text-sm">
        This is some content above the separator.
      </p>
      <Separator className="my-4" />
      <p className="text-sm">
        This is some content below the separator.
      </p>
    </div>
  ),
};

export const BetweenSections: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Section 1</h3>
        <p className="text-sm text-muted-foreground">
          Content for the first section.
        </p>
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-semibold">Section 2</h3>
        <p className="text-sm text-muted-foreground">
          Content for the second section.
        </p>
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-semibold">Section 3</h3>
        <p className="text-sm text-muted-foreground">
          Content for the third section.
        </p>
      </div>
    </div>
  ),
};

export const VerticalInline: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-6">
      <span className="text-sm">Item 1</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Item 2</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Item 3</span>
    </div>
  ),
};

export const InNavigation: Story = {
  render: () => (
    <nav className="flex items-center gap-4 h-5">
      <a href="#" className="text-sm hover:text-primary">Home</a>
      <Separator orientation="vertical" />
      <a href="#" className="text-sm hover:text-primary">Products</a>
      <Separator orientation="vertical" />
      <a href="#" className="text-sm hover:text-primary">About</a>
      <Separator orientation="vertical" />
      <a href="#" className="text-sm hover:text-primary">Contact</a>
    </nav>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-80 rounded-lg border p-4">
      <h3 className="font-semibold">Card Title</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Card description here.
      </p>
      <Separator className="my-4" />
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Status</span>
        <span className="font-medium">Active</span>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-end gap-2">
        <button className="text-sm text-muted-foreground hover:text-foreground">
          Cancel
        </button>
        <button className="text-sm text-primary hover:text-primary/80">
          Save
        </button>
      </div>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="w-80">
      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>
    </div>
  ),
};

export const LoginDivider: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <button className="w-full rounded-lg border py-2 text-sm font-medium hover:bg-accent">
        Continue with Google
      </button>
      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground uppercase">or continue with</span>
        <Separator className="flex-1" />
      </div>
      <button className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Sign in with Email
      </button>
    </div>
  ),
};
