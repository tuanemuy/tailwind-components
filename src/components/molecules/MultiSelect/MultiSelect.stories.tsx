import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { MultiSelectOption } from "./index";
import { MultiSelect } from "./index";

const userOptions: MultiSelectOption[] = [
  {
    value: "james",
    label: "James",
    avatar:
      "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
    description: "James Collins",
  },
  {
    value: "lori",
    label: "Lori",
    avatarInitials: "L",
    description: "Lori Hunter",
  },
  {
    value: "david",
    label: "David",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    description: "David Chen",
  },
  {
    value: "ella",
    label: "Ella",
    avatar:
      "https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
    description: "Ella Laudq",
  },
  {
    value: "ols",
    label: "Ols",
    avatarInitials: "O",
    description: "Ols Schols",
  },
];

const tagOptions: MultiSelectOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
  { value: "nuxt", label: "Nuxt" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const categoryOptions: MultiSelectOption[] = [
  { value: "design", label: "Design", description: "UI/UX Design" },
  { value: "development", label: "Development", description: "Frontend & Backend" },
  { value: "marketing", label: "Marketing", description: "Growth & SEO" },
  { value: "product", label: "Product", description: "Product Management" },
  { value: "data", label: "Data", description: "Analytics & BI" },
];

const meta: Meta<typeof MultiSelect> = {
  title: "Molecules/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    tagVariant: {
      control: "select",
      options: ["default", "pill", "avatar"],
    },
    disabled: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
    searchable: {
      control: "boolean",
    },
    maxSelections: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    options: tagOptions,
    placeholder: "Select tags...",
    className: "w-80",
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: tagOptions,
    defaultValue: ["react", "nextjs"],
    placeholder: "Select tags...",
    className: "w-80",
  },
};

export const Searchable: Story = {
  args: {
    options: tagOptions,
    placeholder: "Search and select tags...",
    searchable: true,
    className: "w-80",
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <span className="w-12 pt-2 text-sm text-muted-foreground">xs</span>
        <MultiSelect
          size="xs"
          options={tagOptions}
          defaultValue={["react"]}
          className="w-64"
        />
      </div>
      <div className="flex items-start gap-4">
        <span className="w-12 pt-2 text-sm text-muted-foreground">sm</span>
        <MultiSelect
          size="sm"
          options={tagOptions}
          defaultValue={["react"]}
          className="w-64"
        />
      </div>
      <div className="flex items-start gap-4">
        <span className="w-12 pt-2 text-sm text-muted-foreground">md</span>
        <MultiSelect
          size="md"
          options={tagOptions}
          defaultValue={["react"]}
          className="w-64"
        />
      </div>
      <div className="flex items-start gap-4">
        <span className="w-12 pt-2 text-sm text-muted-foreground">lg</span>
        <MultiSelect
          size="lg"
          options={tagOptions}
          defaultValue={["react"]}
          className="w-64"
        />
      </div>
    </div>
  ),
};

// Tag Variant Examples
export const TagVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <span className="w-16 pt-2 text-sm text-muted-foreground">default</span>
        <MultiSelect
          tagVariant="default"
          options={tagOptions}
          defaultValue={["react", "vue"]}
          className="w-72"
        />
      </div>
      <div className="flex items-start gap-4">
        <span className="w-16 pt-2 text-sm text-muted-foreground">pill</span>
        <MultiSelect
          tagVariant="pill"
          options={tagOptions}
          defaultValue={["react", "vue"]}
          className="w-72"
        />
      </div>
      <div className="flex items-start gap-4">
        <span className="w-16 pt-2 text-sm text-muted-foreground">avatar</span>
        <MultiSelect
          tagVariant="avatar"
          options={userOptions}
          defaultValue={["james", "ella"]}
          className="w-80"
        />
      </div>
    </div>
  ),
};

// Assignee Select (Avatar Tags)
export const AssigneeSelect: Story = {
  args: {
    options: userOptions,
    defaultValue: ["james"],
    placeholder: "Select assignees...",
    tagVariant: "avatar",
    className: "w-80",
  },
};

// With Description
export const WithDescription: Story = {
  args: {
    options: categoryOptions,
    placeholder: "Select categories...",
    className: "w-80",
  },
};

// Max Selections
export const MaxSelections: Story = {
  args: {
    options: tagOptions,
    placeholder: "Select up to 3 tags...",
    maxSelections: 3,
    className: "w-80",
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    options: tagOptions,
    defaultValue: ["react", "vue"],
    disabled: true,
    className: "w-80",
  },
};

// Error State
export const WithError: Story = {
  args: {
    options: tagOptions,
    placeholder: "Select tags...",
    error: true,
    className: "w-80",
  },
};

// Controlled
export const Controlled: Story = {
  render: function ControlledMultiSelect() {
    const [values, setValues] = useState<string[]>(["react"]);

    return (
      <div className="space-y-4">
        <MultiSelect
          options={tagOptions}
          value={values}
          onChange={setValues}
          className="w-80"
        />
        <p className="text-sm text-muted-foreground">
          Selected values:{" "}
          <code className="text-foreground">{JSON.stringify(values)}</code>
        </p>
      </div>
    );
  },
};

// In Form (Tags Select)
export const TagsSelect: Story = {
  render: () => (
    <form className="w-96 space-y-4">
      <div className="space-y-2">
        <span className="block text-sm font-medium">Tags</span>
        <MultiSelect
          name="tags"
          options={tagOptions}
          placeholder="Select tags..."
          searchable
        />
        <p className="text-xs text-muted-foreground">
          Choose the technologies used in this project.
        </p>
      </div>
    </form>
  ),
};

// In Form (Assignees)
export const AssigneeForm: Story = {
  render: () => (
    <form className="w-96 space-y-4">
      <div className="space-y-2">
        <span className="block text-sm font-medium">Assignees</span>
        <MultiSelect
          name="assignees"
          options={userOptions}
          placeholder="Select team members..."
          tagVariant="avatar"
          searchable
        />
        <p className="text-xs text-muted-foreground">
          Assign team members to this task.
        </p>
      </div>
    </form>
  ),
};

// Custom Tag Render
export const CustomTagRender: Story = {
  render: () => (
    <MultiSelect
      options={userOptions}
      defaultValue={["james", "david"]}
      className="w-96"
      tagVariant="avatar"
      renderTag={(option, onRemove) => (
        <span
          key={option.value}
          className="inline-flex items-center gap-2 rounded-full bg-primary/10 py-1 pl-1 pr-2 text-sm text-primary"
        >
          {option.avatar ? (
            <img
              src={option.avatar}
              alt=""
              className="size-6 rounded-full object-cover"
            />
          ) : (
            <span className="size-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
              {option.avatarInitials}
            </span>
          )}
          <span>{option.label}</span>
          <button
            type="button"
            className="text-primary hover:text-primary/70"
            onClick={onRemove}
          >
            ×
          </button>
        </span>
      )}
    />
  ),
};

// Many Selections
export const ManySelections: Story = {
  args: {
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
      { value: "4", label: "Option 4" },
      { value: "5", label: "Option 5" },
      { value: "6", label: "Option 6" },
      { value: "7", label: "Option 7" },
      { value: "8", label: "Option 8" },
    ],
    defaultValue: ["1", "2", "3", "4", "5"],
    className: "w-80",
  },
};
