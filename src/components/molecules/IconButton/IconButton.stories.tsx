import type { Meta, StoryObj } from "@storybook/react";
import {
  BellIcon,
  EditIcon,
  MenuIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
} from "@/components/icons";
import { IconButton } from "./index";

const meta: Meta<typeof IconButton> = {
  title: "Molecules/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive", "outline"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <PlusIcon className="size-full" />,
    label: "Add item",
  },
};

export const Primary: Story = {
  args: {
    icon: <PlusIcon className="size-full" />,
    label: "Add item",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    icon: <EditIcon className="size-full" />,
    label: "Edit",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    icon: <TrashIcon className="size-full" />,
    label: "Delete",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    icon: <MoreHorizontalIcon className="size-full" />,
    label: "More options",
    variant: "outline",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton
        size="xs"
        icon={<PlusIcon className="size-full" />}
        label="Add"
        variant="outline"
      />
      <IconButton
        size="sm"
        icon={<PlusIcon className="size-full" />}
        label="Add"
        variant="outline"
      />
      <IconButton
        size="md"
        icon={<PlusIcon className="size-full" />}
        label="Add"
        variant="outline"
      />
      <IconButton
        size="lg"
        icon={<PlusIcon className="size-full" />}
        label="Add"
        variant="outline"
      />
      <IconButton
        size="xl"
        icon={<PlusIcon className="size-full" />}
        label="Add"
        variant="outline"
      />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    icon: <PlusIcon className="size-full" />,
    label: "Loading",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    icon: <PlusIcon className="size-full" />,
    label: "Disabled",
    disabled: true,
    variant: "outline",
  },
};

export const CommonIcons: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton icon={<SearchIcon className="size-full" />} label="Search" />
      <IconButton
        icon={<BellIcon className="size-full" />}
        label="Notifications"
      />
      <IconButton
        icon={<SettingsIcon className="size-full" />}
        label="Settings"
      />
      <IconButton icon={<MenuIcon className="size-full" />} label="Menu" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton
        variant="primary"
        icon={<PlusIcon className="size-full" />}
        label="Primary"
      />
      <IconButton
        variant="secondary"
        icon={<PlusIcon className="size-full" />}
        label="Secondary"
      />
      <IconButton
        variant="ghost"
        icon={<PlusIcon className="size-full" />}
        label="Ghost"
      />
      <IconButton
        variant="destructive"
        icon={<PlusIcon className="size-full" />}
        label="Destructive"
      />
      <IconButton
        variant="outline"
        icon={<PlusIcon className="size-full" />}
        label="Outline"
      />
    </div>
  ),
};
