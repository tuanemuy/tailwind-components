import type { Meta, StoryObj } from "@storybook/react";
import { FolderCard, FolderCardGrid, FolderCardList } from "./index";

const meta: Meta<typeof FolderCard> = {
  title: "Organisms/Cards/FolderCard",
  component: FolderCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FolderCard>;

const sampleFolder = {
  id: "1",
  name: "Project Documents",
  itemCount: 24,
  size: "1.2 GB",
  modifiedDate: "Dec 15, 2025",
  color: "default" as const,
  isStarred: true,
  isShared: true,
  description: "Important project documentation and resources",
};

export const Default: Story = {
  args: {
    folder: sampleFolder,
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const Compact: Story = {
  args: {
    folder: sampleFolder,
    variant: "compact",
  },
  decorators: [
    (Story) => (
      <div className="w-[280px]">
        <Story />
      </div>
    ),
  ],
};

export const List: Story = {
  args: {
    folder: sampleFolder,
    variant: "list",
  },
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

export const Grid: Story = {
  args: {
    folder: sampleFolder,
    variant: "grid",
  },
  decorators: [
    (Story) => (
      <div className="w-[160px]">
        <Story />
      </div>
    ),
  ],
};

export const Selectable: Story = {
  args: {
    folder: sampleFolder,
    selectable: true,
    selected: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const Selected: Story = {
  args: {
    folder: sampleFolder,
    selectable: true,
    selected: true,
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const Private: Story = {
  args: {
    folder: {
      ...sampleFolder,
      isPrivate: true,
      isShared: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export const ColorVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {["default", "blue", "green", "yellow", "red", "purple"].map((color) => (
        <FolderCard
          key={color}
          folder={{
            id: color,
            name: `${color.charAt(0).toUpperCase() + color.slice(1)} Folder`,
            itemCount: 12,
            color: color as any,
          }}
          variant="grid"
        />
      ))}
    </div>
  ),
};

const folders = [
  { id: "1", name: "Documents", itemCount: 24, size: "1.2 GB", modifiedDate: "Dec 15, 2025", isStarred: true, color: "default" as const },
  { id: "2", name: "Images", itemCount: 156, size: "4.5 GB", modifiedDate: "Dec 14, 2025", color: "purple" as const },
  { id: "3", name: "Projects", itemCount: 8, size: "890 MB", modifiedDate: "Dec 13, 2025", isShared: true, color: "blue" as const },
  { id: "4", name: "Archive", itemCount: 45, size: "2.1 GB", modifiedDate: "Dec 10, 2025", color: "yellow" as const },
  { id: "5", name: "Private", itemCount: 12, size: "450 MB", modifiedDate: "Dec 8, 2025", isPrivate: true, color: "red" as const },
  { id: "6", name: "Shared", itemCount: 32, size: "1.8 GB", modifiedDate: "Dec 5, 2025", isShared: true, color: "green" as const },
];

export const FolderGridView: StoryObj<typeof FolderCardGrid> = {
  render: () => (
    <div className="w-[700px]">
      <FolderCardGrid
        folders={folders}
        columns={4}
      />
    </div>
  ),
};

export const FolderGridSelectable: StoryObj<typeof FolderCardGrid> = {
  render: () => (
    <div className="w-[700px]">
      <FolderCardGrid
        folders={folders}
        columns={4}
        selectable
        selectedIds={["1", "3"]}
      />
    </div>
  ),
};

export const FolderListView: StoryObj<typeof FolderCardList> = {
  render: () => (
    <div className="w-[500px]">
      <FolderCardList
        folders={folders}
        variant="list"
      />
    </div>
  ),
};

export const FolderListCompact: StoryObj<typeof FolderCardList> = {
  render: () => (
    <div className="w-[300px]">
      <FolderCardList
        folders={folders}
        variant="compact"
      />
    </div>
  ),
};
