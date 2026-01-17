import type { Meta, StoryObj } from "@storybook/react";
import { SearchIcon } from "@/components/icons";
import { Kbd, KbdGroup, PlatformKbd } from "./index";

const meta: Meta<typeof Kbd> = {
  title: "Atoms/Kbd",
  component: Kbd,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "filled"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "K",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Kbd size="xs">K</Kbd>
        <span className="text-xs text-muted-foreground">XS</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Kbd size="sm">K</Kbd>
        <span className="text-xs text-muted-foreground">SM</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Kbd size="md">K</Kbd>
        <span className="text-xs text-muted-foreground">MD</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Kbd size="lg">K</Kbd>
        <span className="text-xs text-muted-foreground">LG</span>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Kbd variant="default">K</Kbd>
        <span className="text-xs text-muted-foreground">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Kbd variant="outline">K</Kbd>
        <span className="text-xs text-muted-foreground">Outline</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Kbd variant="filled">K</Kbd>
        <span className="text-xs text-muted-foreground">Filled</span>
      </div>
    </div>
  ),
};

export const KeyboardShortcut: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <KbdGroup keys={["⌘", "K"]} />
    </div>
  ),
};

export const CommonShortcuts: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between w-64">
        <span className="text-sm">Save</span>
        <KbdGroup keys={["⌘", "S"]} size="sm" />
      </div>
      <div className="flex items-center justify-between w-64">
        <span className="text-sm">Copy</span>
        <KbdGroup keys={["⌘", "C"]} size="sm" />
      </div>
      <div className="flex items-center justify-between w-64">
        <span className="text-sm">Paste</span>
        <KbdGroup keys={["⌘", "V"]} size="sm" />
      </div>
      <div className="flex items-center justify-between w-64">
        <span className="text-sm">Undo</span>
        <KbdGroup keys={["⌘", "Z"]} size="sm" />
      </div>
      <div className="flex items-center justify-between w-64">
        <span className="text-sm">Redo</span>
        <KbdGroup keys={["⌘", "⇧", "Z"]} size="sm" />
      </div>
    </div>
  ),
};

export const PlatformAwareKeys: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <PlatformKbd keyName="cmd" />
        <PlatformKbd keyName="shift" />
        <PlatformKbd keyName="alt" />
        <PlatformKbd keyName="ctrl" />
      </div>
      <div className="flex items-center gap-4">
        <PlatformKbd keyName="enter" />
        <PlatformKbd keyName="tab" />
        <PlatformKbd keyName="backspace" />
        <PlatformKbd keyName="escape" />
      </div>
      <div className="flex items-center gap-4">
        <PlatformKbd keyName="up" />
        <PlatformKbd keyName="down" />
        <PlatformKbd keyName="left" />
        <PlatformKbd keyName="right" />
      </div>
    </div>
  ),
};

export const InText: Story = {
  render: () => (
    <p className="text-sm">
      Press <Kbd size="xs">⌘</Kbd> + <Kbd size="xs">K</Kbd> to open the command
      palette.
    </p>
  ),
};

export const CommandPaletteTrigger: Story = {
  render: () => (
    <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-muted rounded-md w-64">
      <SearchIcon className="size-4" />
      <span className="flex-1">Search...</span>
      <KbdGroup keys={["⌘", "K"]} size="xs" variant="outline" />
    </div>
  ),
};

export const ShortcutList: Story = {
  render: () => (
    <div className="w-80 border rounded-lg p-4">
      <h3 className="font-medium mb-4">Keyboard Shortcuts</h3>
      <div className="space-y-3">
        {[
          { action: "Open Command Palette", keys: ["⌘", "K"] },
          { action: "Go to File", keys: ["⌘", "P"] },
          { action: "Search in Files", keys: ["⌘", "⇧", "F"] },
          { action: "Toggle Sidebar", keys: ["⌘", "B"] },
          { action: "Open Settings", keys: ["⌘", ","] },
        ].map(({ action, keys }) => (
          <div key={action} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{action}</span>
            <KbdGroup keys={keys} size="xs" />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const MenuItemWithShortcut: Story = {
  render: () => (
    <div className="w-56 border rounded-lg py-1">
      {[
        { label: "New File", shortcut: ["⌘", "N"] },
        { label: "Open", shortcut: ["⌘", "O"] },
        { label: "Save", shortcut: ["⌘", "S"] },
        { label: "Save As...", shortcut: ["⌘", "⇧", "S"] },
      ].map(({ label, shortcut }) => (
        <div
          key={label}
          className="flex items-center justify-between px-3 py-2 hover:bg-muted cursor-pointer"
        >
          <span className="text-sm">{label}</span>
          <KbdGroup keys={shortcut} size="xs" variant="outline" />
        </div>
      ))}
    </div>
  ),
};

export const AllKeys: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-2">
      {[
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "⌘",
        "⇧",
        "⌥",
        "Ctrl",
        "↵",
        "⇥",
        "↑",
        "↓",
        "←",
        "→",
        "Esc",
        "Space",
      ].map((key) => (
        <Kbd key={key} size="md">
          {key}
        </Kbd>
      ))}
    </div>
  ),
};
