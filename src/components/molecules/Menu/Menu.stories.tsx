import type { Meta, StoryObj } from "@storybook/react";
import {
  CopyIcon,
  EditIcon,
  FolderIcon,
  MailIcon,
  SettingsIcon,
  TrashIcon,
  UserIcon,
} from "@/components/icons";
import {
  ContextMenu,
  Menu,
  MenuDivider,
  MenuItem,
  MenuLabel,
  SubMenu,
} from "./index";

const meta: Meta<typeof Menu> = {
  title: "Molecules/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menu>
      <MenuItem>New File</MenuItem>
      <MenuItem>New Folder</MenuItem>
      <MenuDivider />
      <MenuItem>Open</MenuItem>
      <MenuItem>Save</MenuItem>
      <MenuItem>Save As...</MenuItem>
      <MenuDivider />
      <MenuItem variant="destructive">Delete</MenuItem>
    </Menu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Menu>
      <MenuItem icon={<EditIcon className="size-full" />}>Edit</MenuItem>
      <MenuItem icon={<CopyIcon className="size-full" />}>Duplicate</MenuItem>
      <MenuDivider />
      <MenuItem
        icon={<TrashIcon className="size-full" />}
        variant="destructive"
      >
        Delete
      </MenuItem>
    </Menu>
  ),
};

export const WithShortcuts: Story = {
  render: () => (
    <Menu>
      <MenuItem icon={<EditIcon className="size-full" />} shortcut="⌘E">
        Edit
      </MenuItem>
      <MenuItem icon={<CopyIcon className="size-full" />} shortcut="⌘D">
        Duplicate
      </MenuItem>
      <MenuItem shortcut="⌘S">Save</MenuItem>
      <MenuDivider />
      <MenuItem
        icon={<TrashIcon className="size-full" />}
        variant="destructive"
        shortcut="⌫"
      >
        Delete
      </MenuItem>
    </Menu>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <Menu>
      <MenuLabel>Actions</MenuLabel>
      <MenuItem>View</MenuItem>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Share</MenuItem>
      <MenuDivider />
      <MenuLabel>Danger Zone</MenuLabel>
      <MenuItem variant="destructive">Delete</MenuItem>
    </Menu>
  ),
};

export const WithCheckmarks: Story = {
  render: () => (
    <Menu>
      <MenuLabel>View</MenuLabel>
      <MenuItem checked>List View</MenuItem>
      <MenuItem checked={false}>Grid View</MenuItem>
      <MenuItem checked={false}>Compact View</MenuItem>
      <MenuDivider />
      <MenuLabel>Sort By</MenuLabel>
      <MenuItem checked>Name</MenuItem>
      <MenuItem checked={false}>Date</MenuItem>
      <MenuItem checked={false}>Size</MenuItem>
    </Menu>
  ),
};

export const Small: Story = {
  render: () => (
    <Menu size="sm">
      <MenuItem>Small Item 1</MenuItem>
      <MenuItem>Small Item 2</MenuItem>
      <MenuItem>Small Item 3</MenuItem>
    </Menu>
  ),
};

export const Large: Story = {
  render: () => (
    <Menu size="lg">
      <MenuItem icon={<UserIcon className="size-full" />}>Profile</MenuItem>
      <MenuItem icon={<SettingsIcon className="size-full" />}>
        Settings
      </MenuItem>
      <MenuItem icon={<MailIcon className="size-full" />}>Messages</MenuItem>
      <MenuDivider />
      <MenuItem variant="destructive">Sign Out</MenuItem>
    </Menu>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <Menu>
      <MenuItem>Available Action</MenuItem>
      <MenuItem disabled>Disabled Action</MenuItem>
      <MenuItem>Another Action</MenuItem>
      <MenuDivider />
      <MenuItem disabled variant="destructive">
        Cannot Delete
      </MenuItem>
    </Menu>
  ),
};

export const WithSubMenu: Story = {
  render: () => (
    <Menu>
      <MenuItem icon={<EditIcon className="size-full" />}>Edit</MenuItem>
      <SubMenu trigger="Move to" icon={<FolderIcon className="size-full" />}>
        <MenuItem>Documents</MenuItem>
        <MenuItem>Downloads</MenuItem>
        <MenuItem>Desktop</MenuItem>
        <SubMenu trigger="Projects">
          <MenuItem>Project A</MenuItem>
          <MenuItem>Project B</MenuItem>
          <MenuItem>Project C</MenuItem>
        </SubMenu>
      </SubMenu>
      <MenuItem icon={<CopyIcon className="size-full" />}>Copy</MenuItem>
      <MenuDivider />
      <MenuItem
        icon={<TrashIcon className="size-full" />}
        variant="destructive"
      >
        Delete
      </MenuItem>
    </Menu>
  ),
};

export const ContextMenuExample: Story = {
  render: () => (
    <ContextMenu
      menu={
        <>
          <MenuItem icon={<EditIcon className="size-full" />} shortcut="⌘E">
            Edit
          </MenuItem>
          <MenuItem icon={<CopyIcon className="size-full" />} shortcut="⌘C">
            Copy
          </MenuItem>
          <MenuDivider />
          <MenuItem
            icon={<TrashIcon className="size-full" />}
            variant="destructive"
            shortcut="⌫"
          >
            Delete
          </MenuItem>
        </>
      }
    >
      <div className="flex h-40 w-64 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted text-sm text-muted-foreground">
        Right-click here
      </div>
    </ContextMenu>
  ),
};

export const UserMenu: Story = {
  render: () => (
    <Menu>
      <div className="px-3 py-2">
        <p className="text-sm font-medium">John Doe</p>
        <p className="text-xs text-muted-foreground">john@example.com</p>
      </div>
      <MenuDivider />
      <MenuItem icon={<UserIcon className="size-full" />}>Profile</MenuItem>
      <MenuItem icon={<SettingsIcon className="size-full" />}>
        Settings
      </MenuItem>
      <MenuItem icon={<MailIcon className="size-full" />}>
        Messages
        <span className="ms-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
          3
        </span>
      </MenuItem>
      <MenuDivider />
      <MenuItem variant="destructive">Sign Out</MenuItem>
    </Menu>
  ),
};
