import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown, DropdownItem, DropdownDivider } from "./index";
import { Button } from "@/components/atoms";
import {
  EditIcon,
  CopyIcon,
  TrashIcon,
  DownloadIcon,
  UserIcon,
  SettingsIcon,
  MoreHorizontalIcon,
} from "@/lib/icons";

const meta: Meta<typeof Dropdown> = {
  title: "Molecules/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: ["bottom-start", "bottom-end", "top-start", "top-end"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dropdown triggerLabel="Options">
      <DropdownItem icon={<EditIcon className="size-full" />}>Edit</DropdownItem>
      <DropdownItem icon={<CopyIcon className="size-full" />}>Duplicate</DropdownItem>
      <DropdownItem icon={<DownloadIcon className="size-full" />}>Download</DropdownItem>
      <DropdownDivider />
      <DropdownItem icon={<TrashIcon className="size-full" />} destructive>
        Delete
      </DropdownItem>
    </Dropdown>
  ),
};

export const WithCustomTrigger: Story = {
  render: () => (
    <Dropdown
      trigger={
        <Button variant="ghost" size="sm">
          <MoreHorizontalIcon className="size-4" />
        </Button>
      }
    >
      <DropdownItem>View details</DropdownItem>
      <DropdownItem>Edit</DropdownItem>
      <DropdownItem destructive>Delete</DropdownItem>
    </Dropdown>
  ),
};

export const PlacementBottomStart: Story = {
  render: () => (
    <Dropdown triggerLabel="Bottom Start" placement="bottom-start">
      <DropdownItem>Option 1</DropdownItem>
      <DropdownItem>Option 2</DropdownItem>
      <DropdownItem>Option 3</DropdownItem>
    </Dropdown>
  ),
};

export const PlacementBottomEnd: Story = {
  render: () => (
    <Dropdown triggerLabel="Bottom End" placement="bottom-end">
      <DropdownItem>Option 1</DropdownItem>
      <DropdownItem>Option 2</DropdownItem>
      <DropdownItem>Option 3</DropdownItem>
    </Dropdown>
  ),
};

export const UserMenu: Story = {
  render: () => (
    <Dropdown triggerLabel="Account">
      <DropdownItem icon={<UserIcon className="size-full" />}>Profile</DropdownItem>
      <DropdownItem icon={<SettingsIcon className="size-full" />}>Settings</DropdownItem>
      <DropdownDivider />
      <DropdownItem destructive>Sign out</DropdownItem>
    </Dropdown>
  ),
};

export const WithSections: Story = {
  render: () => (
    <Dropdown triggerLabel="Actions">
      <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
        Actions
      </div>
      <DropdownItem>View</DropdownItem>
      <DropdownItem>Edit</DropdownItem>
      <DropdownDivider />
      <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
        Danger Zone
      </div>
      <DropdownItem destructive>Delete permanently</DropdownItem>
    </Dropdown>
  ),
};
