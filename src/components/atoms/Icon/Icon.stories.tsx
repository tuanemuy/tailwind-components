import type { Meta, StoryObj } from "@storybook/react";
import {
  BellIcon,
  CalendarIcon,
  CheckIcon,
  EditIcon,
  FileIcon,
  FolderIcon,
  HomeIcon,
  MailIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
  TrendDownIcon,
  TrendUpIcon,
  UserIcon,
  XIcon,
} from "@/lib/icons";
import { Icon } from "./index";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: HomeIcon,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Icon icon={HomeIcon} size="xs" />
      <Icon icon={HomeIcon} size="sm" />
      <Icon icon={HomeIcon} size="md" />
      <Icon icon={HomeIcon} size="lg" />
      <Icon icon={HomeIcon} size="xl" />
    </div>
  ),
};

export const CustomSize: Story = {
  args: {
    icon: HomeIcon,
    size: 48,
  },
};

export const WithColor: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={CheckIcon} className="text-success" />
      <Icon icon={XIcon} className="text-destructive" />
      <Icon icon={TrendUpIcon} className="text-success" />
      <Icon icon={TrendDownIcon} className="text-error" />
    </div>
  ),
};

export const CommonIcons: Story = {
  render: () => (
    <div className="grid grid-cols-8 gap-4">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={HomeIcon} />
        <span className="text-xs text-muted-foreground">Home</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={UserIcon} />
        <span className="text-xs text-muted-foreground">User</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={SettingsIcon} />
        <span className="text-xs text-muted-foreground">Settings</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={SearchIcon} />
        <span className="text-xs text-muted-foreground">Search</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={BellIcon} />
        <span className="text-xs text-muted-foreground">Bell</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={MailIcon} />
        <span className="text-xs text-muted-foreground">Mail</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={CalendarIcon} />
        <span className="text-xs text-muted-foreground">Calendar</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={FileIcon} />
        <span className="text-xs text-muted-foreground">File</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={FolderIcon} />
        <span className="text-xs text-muted-foreground">Folder</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={CheckIcon} />
        <span className="text-xs text-muted-foreground">Check</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={XIcon} />
        <span className="text-xs text-muted-foreground">X</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={PlusIcon} />
        <span className="text-xs text-muted-foreground">Plus</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={EditIcon} />
        <span className="text-xs text-muted-foreground">Edit</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={TrashIcon} />
        <span className="text-xs text-muted-foreground">Trash</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={TrendUpIcon} />
        <span className="text-xs text-muted-foreground">TrendUp</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={TrendDownIcon} />
        <span className="text-xs text-muted-foreground">TrendDown</span>
      </div>
    </div>
  ),
};
