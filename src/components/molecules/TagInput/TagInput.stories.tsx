import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TagInput } from "./index";

const meta: Meta<typeof TagInput> = {
  title: "Molecules/TagInput",
  component: TagInput,
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
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    return (
      <div className="w-[300px]">
        <TagInput
          value={tags}
          onChange={setTags}
          placeholder="Add tags..."
        />
      </div>
    );
  },
};

export const WithInitialTags: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(["React", "TypeScript", "Tailwind"]);
    return (
      <div className="w-[300px]">
        <TagInput value={tags} onChange={setTags} />
      </div>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(["Small", "Tags"]);
    return (
      <div className="w-[300px]">
        <TagInput value={tags} onChange={setTags} size="sm" />
      </div>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(["Large", "Tags"]);
    return (
      <div className="w-[300px]">
        <TagInput value={tags} onChange={setTags} size="lg" />
      </div>
    );
  },
};

export const MaxTags: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(["Tag 1", "Tag 2"]);
    return (
      <div className="w-[300px] space-y-2">
        <TagInput
          value={tags}
          onChange={setTags}
          maxTags={5}
          placeholder="Max 5 tags"
        />
        <p className="text-xs text-muted-foreground">
          {tags.length}/5 tags
        </p>
      </div>
    );
  },
};

export const NoDuplicates: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>(["Unique"]);
    return (
      <div className="w-[300px] space-y-2">
        <TagInput
          value={tags}
          onChange={setTags}
          allowDuplicates={false}
          placeholder="No duplicates allowed"
        />
        <p className="text-xs text-muted-foreground">
          Try adding &quot;Unique&quot; again
        </p>
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const validateTag = (tag: string) => {
      if (tag.length < 2) {
        setError("Tag must be at least 2 characters");
        return false;
      }
      if (tag.length > 20) {
        setError("Tag must be 20 characters or less");
        return false;
      }
      setError(null);
      return true;
    };

    return (
      <div className="w-[300px] space-y-2">
        <TagInput
          value={tags}
          onChange={setTags}
          validateTag={validateTag}
          placeholder="2-20 characters"
        />
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  },
};

export const EmailTags: Story = {
  render: () => {
    const [emails, setEmails] = useState<string[]>(["user@example.com"]);

    const validateEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
      <div className="w-[350px] space-y-2">
        <TagInput
          value={emails}
          onChange={setEmails}
          validateTag={validateEmail}
          placeholder="Add email addresses"
        />
        <p className="text-xs text-muted-foreground">
          Enter valid email addresses
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <TagInput
        value={["Cannot", "Edit"]}
        disabled
      />
    </div>
  ),
};

export const WithCallbacks: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    const [lastAction, setLastAction] = useState<string>("");

    return (
      <div className="w-[300px] space-y-2">
        <TagInput
          value={tags}
          onChange={setTags}
          onTagAdd={(tag) => setLastAction(`Added: ${tag}`)}
          onTagRemove={(tag) => setLastAction(`Removed: ${tag}`)}
        />
        {lastAction && (
          <p className="text-xs text-muted-foreground">{lastAction}</p>
        )}
      </div>
    );
  },
};
