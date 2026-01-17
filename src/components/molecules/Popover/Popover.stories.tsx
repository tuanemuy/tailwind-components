import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms";
import { BellIcon, InfoIcon, SettingsIcon } from "@/components/icons";
import { Popover } from "./index";

const meta: Meta<typeof Popover> = {
  title: "Molecules/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
    },
    closeOnClickOutside: {
      control: "boolean",
    },
    defaultOpen: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover trigger={<Button variant="outline">Open Popover</Button>}>
      <div className="w-64">
        <h3 className="font-medium text-foreground">Popover Title</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          This is the popover content. It can contain any React elements.
        </p>
      </div>
    </Popover>
  ),
};

export const PlacementTop: Story = {
  render: () => (
    <div className="pt-32">
      <Popover trigger={<Button variant="outline">Top</Button>} placement="top">
        <p className="text-sm">Popover on top</p>
      </Popover>
    </div>
  ),
};

export const PlacementRight: Story = {
  render: () => (
    <Popover
      trigger={<Button variant="outline">Right</Button>}
      placement="right"
    >
      <p className="text-sm">Popover on right</p>
    </Popover>
  ),
};

export const PlacementLeft: Story = {
  render: () => (
    <div className="pl-48">
      <Popover
        trigger={<Button variant="outline">Left</Button>}
        placement="left"
      >
        <p className="text-sm">Popover on left</p>
      </Popover>
    </div>
  ),
};

export const InfoPopover: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span className="text-sm text-foreground">What is this?</span>
      <Popover
        trigger={
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground"
          >
            <InfoIcon className="size-4" />
          </button>
        }
        placement="top"
      >
        <div className="w-48">
          <p className="text-sm text-muted-foreground">
            This is helpful information about the feature you're looking at.
          </p>
        </div>
      </Popover>
    </div>
  ),
};

export const NotificationPopover: Story = {
  render: () => (
    <Popover
      trigger={
        <Button variant="ghost">
          <BellIcon className="size-5" />
        </Button>
      }
      placement="bottom-end"
    >
      <div className="w-72">
        <h4 className="font-medium text-foreground">Notifications</h4>
        <div className="mt-2 space-y-2">
          <div className="rounded-md bg-muted p-2">
            <p className="text-sm font-medium">New message</p>
            <p className="text-xs text-muted-foreground">2 minutes ago</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <p className="text-sm font-medium">Order shipped</p>
            <p className="text-xs text-muted-foreground">1 hour ago</p>
          </div>
          <div className="rounded-md bg-muted p-2">
            <p className="text-sm font-medium">Payment received</p>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
          </div>
        </div>
      </div>
    </Popover>
  ),
};

export const SettingsPopover: Story = {
  render: () => (
    <Popover
      trigger={
        <Button
          variant="outline"
          leftIcon={<SettingsIcon className="size-4" />}
        >
          Settings
        </Button>
      }
      placement="bottom-start"
    >
      <div className="w-56 space-y-3">
        <h4 className="font-medium text-foreground">Quick Settings</h4>
        <div className="space-y-2">
          <label className="flex items-center justify-between">
            <span className="text-sm">Dark mode</span>
            <input type="checkbox" className="rounded" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm">Notifications</span>
            <input type="checkbox" className="rounded" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm">Auto-save</span>
            <input type="checkbox" className="rounded" defaultChecked />
          </label>
        </div>
      </div>
    </Popover>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Popover
      trigger={<Button variant="outline">Already Open</Button>}
      defaultOpen
    >
      <p className="text-sm">This popover is open by default</p>
    </Popover>
  ),
};

export const AllPlacements: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-20">
      <Popover
        trigger={
          <Button variant="outline" size="sm">
            top-start
          </Button>
        }
        placement="top-start"
      >
        <p className="text-xs">top-start</p>
      </Popover>
      <Popover
        trigger={
          <Button variant="outline" size="sm">
            top
          </Button>
        }
        placement="top"
      >
        <p className="text-xs">top</p>
      </Popover>
      <Popover
        trigger={
          <Button variant="outline" size="sm">
            top-end
          </Button>
        }
        placement="top-end"
      >
        <p className="text-xs">top-end</p>
      </Popover>
      <Popover
        trigger={
          <Button variant="outline" size="sm">
            left
          </Button>
        }
        placement="left"
      >
        <p className="text-xs">left</p>
      </Popover>
      <div />
      <Popover
        trigger={
          <Button variant="outline" size="sm">
            right
          </Button>
        }
        placement="right"
      >
        <p className="text-xs">right</p>
      </Popover>
      <Popover
        trigger={
          <Button variant="outline" size="sm">
            bottom-start
          </Button>
        }
        placement="bottom-start"
      >
        <p className="text-xs">bottom-start</p>
      </Popover>
      <Popover
        trigger={
          <Button variant="outline" size="sm">
            bottom
          </Button>
        }
        placement="bottom"
      >
        <p className="text-xs">bottom</p>
      </Popover>
      <Popover
        trigger={
          <Button variant="outline" size="sm">
            bottom-end
          </Button>
        }
        placement="bottom-end"
      >
        <p className="text-xs">bottom-end</p>
      </Popover>
    </div>
  ),
};
