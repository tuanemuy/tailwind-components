import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import type { TagItem } from "./index";
import { TagsModal, tagColors } from "./index";

const meta: Meta<typeof TagsModal> = {
  title: "Organisms/Overlays/TagsModal",
  component: TagsModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TagsModal>;

const sampleTags: TagItem[] = [
  { id: "1", label: "Bug", color: tagColors.red },
  { id: "2", label: "Feature", color: tagColors.blue },
  { id: "3", label: "Enhancement", color: tagColors.green },
  { id: "4", label: "Documentation", color: tagColors.purple },
  { id: "5", label: "Help Wanted", color: tagColors.yellow },
  { id: "6", label: "Priority", color: tagColors.orange },
  { id: "7", label: "Design", color: tagColors.pink },
  { id: "8", label: "Backend", color: tagColors.teal },
];

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Manage Tags</Button>
        <TagsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(tags: TagItem[]) => {
            console.log("Tags saved:", tags);
            setIsOpen(false);
          }}
          availableTags={sampleTags}
          selectedTags={[sampleTags[0], sampleTags[1]]}
        />
      </>
    );
  },
};

export const EmptySelection: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Add Tags</Button>
        <TagsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(tags: TagItem[]) => {
            console.log("Tags saved:", tags);
            setIsOpen(false);
          }}
          availableTags={sampleTags}
          selectedTags={[]}
        />
      </>
    );
  },
};

export const WithCreateNew: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Manage Tags (Create New)
        </Button>
        <TagsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(tags: TagItem[]) => {
            console.log("Tags saved:", tags);
            setIsOpen(false);
          }}
          availableTags={sampleTags}
          selectedTags={[sampleTags[0]]}
          allowCustomTags
        />
      </>
    );
  },
};

export const ManyTags: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const manyTags: TagItem[] = [
      ...sampleTags,
      { id: "9", label: "Frontend", color: tagColors.indigo },
      { id: "10", label: "Testing", color: tagColors.gray },
      { id: "11", label: "Security", color: tagColors.red },
      { id: "12", label: "Performance", color: tagColors.green },
      { id: "13", label: "Accessibility", color: tagColors.blue },
      { id: "14", label: "Mobile", color: tagColors.purple },
      { id: "15", label: "API", color: tagColors.orange },
      { id: "16", label: "Database", color: tagColors.teal },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Browse All Tags</Button>
        <TagsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(tags: TagItem[]) => {
            console.log("Tags saved:", tags);
            setIsOpen(false);
          }}
          availableTags={manyTags}
          selectedTags={[manyTags[0], manyTags[2], manyTags[7], manyTags[11]]}
          allowCustomTags
        />
      </>
    );
  },
};
