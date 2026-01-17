import type { Meta, StoryObj } from "@storybook/react";
import {
  ArchiveIcon,
  CopyIcon,
  DownloadIcon,
  EditIcon,
  FolderIcon,
  PlusIcon,
  ShareIcon,
  StarIcon,
  TrashIcon,
} from "@/components/icons";
import { ContextActionBar, QuickActionBar, SelectionActionBar } from "./index";

const meta: Meta<typeof QuickActionBar> = {
  title: "Organisms/PageSections/QuickActionBar",
  component: QuickActionBar,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="relative min-h-[300px] bg-muted/20 p-8">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["bottom", "bottom-right", "bottom-left"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuickActionBar>;

const basicActions = [
  {
    icon: <PlusIcon className="size-full" />,
    label: "New",
    onClick: () => console.log("New"),
  },
  {
    icon: <EditIcon className="size-full" />,
    label: "Edit",
    onClick: () => console.log("Edit"),
  },
  {
    icon: <ShareIcon className="size-full" />,
    label: "Share",
    onClick: () => console.log("Share"),
  },
];

export const Default: Story = {
  args: {
    actions: basicActions,
  },
};

export const Closable: Story = {
  args: {
    actions: basicActions,
    closable: true,
    onClose: () => console.log("Closed"),
  },
};

export const IconsOnly: Story = {
  args: {
    actions: basicActions,
    showLabels: false,
  },
};

export const WithVariants: Story = {
  args: {
    actions: [
      {
        icon: <CopyIcon className="size-full" />,
        label: "Copy",
        onClick: () => console.log("Copy"),
      },
      {
        icon: <ShareIcon className="size-full" />,
        label: "Share",
        onClick: () => console.log("Share"),
      },
      {
        icon: <DownloadIcon className="size-full" />,
        label: "Download",
        onClick: () => console.log("Download"),
        variant: "primary" as const,
      },
      {
        icon: <TrashIcon className="size-full" />,
        label: "Delete",
        onClick: () => console.log("Delete"),
        variant: "destructive" as const,
      },
    ],
    closable: true,
  },
};

export const Positions: Story = {
  render: () => (
    <div className="relative min-h-[400px]">
      <QuickActionBar
        position="bottom"
        actions={[
          {
            icon: <PlusIcon className="size-full" />,
            label: "Bottom Center",
            onClick: () => {},
          },
        ]}
      />
      <QuickActionBar
        position="bottom-left"
        actions={[
          {
            icon: <PlusIcon className="size-full" />,
            label: "Bottom Left",
            onClick: () => {},
          },
        ]}
        className="left-4"
      />
      <QuickActionBar
        position="bottom-right"
        actions={[
          {
            icon: <PlusIcon className="size-full" />,
            label: "Bottom Right",
            onClick: () => {},
          },
        ]}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-24">
      <QuickActionBar
        size="sm"
        position="bottom"
        actions={basicActions}
        className="bottom-36"
      />
      <QuickActionBar
        size="md"
        position="bottom"
        actions={basicActions}
        className="bottom-20"
      />
      <QuickActionBar size="lg" position="bottom" actions={basicActions} />
    </div>
  ),
};

// Selection Action Bar
export const Selection: StoryObj<typeof SelectionActionBar> = {
  render: () => (
    <SelectionActionBar
      selectedCount={5}
      selectAllLabel="Select all 23 items"
      onSelectAll={() => console.log("Select all")}
      onClear={() => console.log("Clear")}
      actions={[
        {
          icon: <FolderIcon className="size-full" />,
          label: "Move",
          onClick: () => console.log("Move"),
        },
        {
          icon: <ArchiveIcon className="size-full" />,
          label: "Archive",
          onClick: () => console.log("Archive"),
        },
        {
          icon: <TrashIcon className="size-full" />,
          label: "Delete",
          onClick: () => console.log("Delete"),
          variant: "destructive",
        },
      ]}
    />
  ),
};

export const SelectionWithPrimaryAction: StoryObj<typeof SelectionActionBar> = {
  render: () => (
    <SelectionActionBar
      selectedCount={12}
      onClear={() => console.log("Clear")}
      actions={[
        {
          icon: <ShareIcon className="size-full" />,
          label: "Share",
          onClick: () => console.log("Share"),
          variant: "primary",
        },
        {
          icon: <DownloadIcon className="size-full" />,
          label: "Export",
          onClick: () => console.log("Export"),
        },
        {
          icon: <TrashIcon className="size-full" />,
          label: "Delete",
          onClick: () => console.log("Delete"),
          variant: "destructive",
        },
      ]}
    />
  ),
};

// Context Action Bar
export const Context: StoryObj<typeof ContextActionBar> = {
  render: () => (
    <div className="relative">
      <ContextActionBar
        className="relative"
        actions={[
          {
            icon: <EditIcon className="size-full" />,
            label: "Edit",
            onClick: () => console.log("Edit"),
            shortcut: "⌘E",
          },
          {
            icon: <CopyIcon className="size-full" />,
            label: "Copy",
            onClick: () => console.log("Copy"),
            shortcut: "⌘C",
          },
          {
            icon: <FolderIcon className="size-full" />,
            label: "Move to...",
            onClick: () => console.log("Move"),
          },
          {
            icon: <StarIcon className="size-full" />,
            label: "Add to favorites",
            onClick: () => console.log("Favorite"),
          },
          {
            icon: <ShareIcon className="size-full" />,
            label: "Share",
            onClick: () => console.log("Share"),
            shortcut: "⌘S",
          },
          {
            icon: <ArchiveIcon className="size-full" />,
            label: "Archive",
            onClick: () => console.log("Archive"),
          },
          {
            icon: <TrashIcon className="size-full" />,
            label: "Delete",
            onClick: () => console.log("Delete"),
            shortcut: "⌫",
            destructive: true,
          },
        ]}
      />
    </div>
  ),
  parameters: {
    layout: "centered",
  },
  decorators: [],
};

// File manager action bar
export const FileManagerActions: Story = {
  args: {
    actions: [
      {
        icon: <PlusIcon className="size-full" />,
        label: "New",
        onClick: () => console.log("New"),
      },
      {
        icon: <CopyIcon className="size-full" />,
        label: "Copy",
        onClick: () => console.log("Copy"),
      },
      {
        icon: <FolderIcon className="size-full" />,
        label: "Move",
        onClick: () => console.log("Move"),
      },
      {
        icon: <DownloadIcon className="size-full" />,
        label: "Download",
        onClick: () => console.log("Download"),
        variant: "primary" as const,
      },
    ],
    closable: true,
  },
};

// Email client action bar
export const EmailActions: Story = {
  args: {
    actions: [
      {
        icon: <ArchiveIcon className="size-full" />,
        label: "Archive",
        onClick: () => console.log("Archive"),
      },
      {
        icon: <TrashIcon className="size-full" />,
        label: "Delete",
        onClick: () => console.log("Delete"),
        variant: "destructive" as const,
      },
      {
        icon: <FolderIcon className="size-full" />,
        label: "Move",
        onClick: () => console.log("Move"),
      },
      {
        icon: <StarIcon className="size-full" />,
        label: "Star",
        onClick: () => console.log("Star"),
      },
    ],
    showLabels: false,
  },
};

export const DisabledActions: Story = {
  args: {
    actions: [
      {
        icon: <EditIcon className="size-full" />,
        label: "Edit",
        onClick: () => console.log("Edit"),
      },
      {
        icon: <ShareIcon className="size-full" />,
        label: "Share",
        onClick: () => console.log("Share"),
        disabled: true,
      },
      {
        icon: <TrashIcon className="size-full" />,
        label: "Delete",
        onClick: () => console.log("Delete"),
        disabled: true,
        variant: "destructive" as const,
      },
    ],
  },
};
