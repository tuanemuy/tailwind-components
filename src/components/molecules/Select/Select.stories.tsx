import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  FileIcon,
  FileTextIcon,
  FolderIcon,
  ImageIcon,
  MusicIcon,
  VideoIcon,
} from "@/components/icons";
import type { SelectOption } from "./index";
import { Select } from "./index";

const countryOptions: SelectOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
];

const statusOptions: SelectOption[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "archived", label: "Archived", disabled: true },
];

const fileTypeOptions: SelectOption[] = [
  {
    value: "all",
    label: "All files",
    icon: <FolderIcon className="size-4" />,
  },
  {
    value: "documents",
    label: "Documents",
    icon: <FileTextIcon className="size-4" />,
  },
  {
    value: "images",
    label: "Images",
    icon: <ImageIcon className="size-4" />,
  },
  {
    value: "audio",
    label: "Audio",
    icon: <MusicIcon className="size-4" />,
  },
  {
    value: "video",
    label: "Videos",
    icon: <VideoIcon className="size-4" />,
  },
];

const statusColorOptions: SelectOption[] = [
  { value: "none", label: "No status", color: "default" },
  { value: "todo", label: "To do", color: "#0ea5e9" },
  { value: "progress", label: "In progress", color: "#f97316" },
  { value: "review", label: "Review", color: "#8b5cf6" },
  { value: "done", label: "Completed 👏", color: "success" },
];

const visibilityOptions: SelectOption[] = [
  {
    value: "anyone",
    label: "Anyone",
    icon: <FileIcon className="size-4" />,
    description: "Your status will be visible to everyone",
  },
  {
    value: "team",
    label: "Team only",
    icon: <FolderIcon className="size-4" />,
    description: "Only team members can see this",
  },
  {
    value: "private",
    label: "Private",
    icon: <FileTextIcon className="size-4" />,
    description: "Only you can see this",
  },
];

const userOptions: SelectOption[] = [
  {
    value: "james",
    label: "James Collins",
    avatar:
      "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
    description: "Product Manager",
  },
  {
    value: "lori",
    label: "Lori Hunter",
    avatarInitials: "LH",
    description: "Designer",
  },
  {
    value: "david",
    label: "David Chen",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    description: "Developer",
  },
];

const meta: Meta<typeof Select> = {
  title: "Molecules/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "minimal", "ghost", "status"],
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: "Select a country",
    className: "w-64",
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: countryOptions,
    defaultValue: "jp",
    className: "w-64",
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: statusOptions,
    placeholder: "Select status",
    className: "w-64",
  },
};

export const Disabled: Story = {
  args: {
    options: countryOptions,
    placeholder: "Select a country",
    disabled: true,
    className: "w-64",
  },
};

export const WithError: Story = {
  args: {
    options: countryOptions,
    placeholder: "Select a country",
    error: true,
    className: "w-64",
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-12 text-sm text-muted-foreground">xs</span>
        <Select
          size="xs"
          options={countryOptions}
          defaultValue="us"
          className="w-48"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-12 text-sm text-muted-foreground">sm</span>
        <Select
          size="sm"
          options={countryOptions}
          defaultValue="us"
          className="w-48"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-12 text-sm text-muted-foreground">md</span>
        <Select
          size="md"
          options={countryOptions}
          defaultValue="us"
          className="w-48"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-12 text-sm text-muted-foreground">lg</span>
        <Select
          size="lg"
          options={countryOptions}
          defaultValue="us"
          className="w-48"
        />
      </div>
    </div>
  ),
};

// Variant Examples
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-muted-foreground">default</span>
        <Select
          variant="default"
          options={countryOptions}
          defaultValue="us"
          className="w-48"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-muted-foreground">minimal</span>
        <Select
          variant="minimal"
          options={countryOptions}
          defaultValue="us"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-muted-foreground">ghost</span>
        <Select
          variant="ghost"
          options={countryOptions}
          defaultValue="us"
        />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm text-muted-foreground">status</span>
        <Select
          variant="status"
          options={statusColorOptions}
          defaultValue="progress"
        />
      </div>
    </div>
  ),
};

// With Icons
export const WithIcons: Story = {
  args: {
    options: fileTypeOptions,
    defaultValue: "all",
    variant: "minimal",
  },
};

// With Color Indicators (Status Select)
export const StatusSelect: Story = {
  args: {
    options: statusColorOptions,
    defaultValue: "progress",
    variant: "status",
  },
};

// With Description
export const WithDescription: Story = {
  args: {
    options: visibilityOptions,
    defaultValue: "anyone",
    className: "w-72",
  },
};

// With Avatar
export const WithAvatar: Story = {
  args: {
    options: userOptions,
    placeholder: "Select a user",
    className: "w-72",
  },
};

// Searchable
export const Searchable: Story = {
  args: {
    options: countryOptions,
    placeholder: "Search countries...",
    searchable: true,
    className: "w-64",
  },
};

// Searchable with Many Options
export const SearchableWithManyOptions: Story = {
  args: {
    options: [
      { value: "af", label: "Afghanistan" },
      { value: "al", label: "Albania" },
      { value: "dz", label: "Algeria" },
      { value: "ar", label: "Argentina" },
      { value: "au", label: "Australia" },
      { value: "at", label: "Austria" },
      { value: "bd", label: "Bangladesh" },
      { value: "be", label: "Belgium" },
      { value: "br", label: "Brazil" },
      { value: "ca", label: "Canada" },
      { value: "cn", label: "China" },
      { value: "dk", label: "Denmark" },
      { value: "eg", label: "Egypt" },
      { value: "fi", label: "Finland" },
      { value: "fr", label: "France" },
      { value: "de", label: "Germany" },
      { value: "gr", label: "Greece" },
      { value: "in", label: "India" },
      { value: "id", label: "Indonesia" },
      { value: "it", label: "Italy" },
      { value: "jp", label: "Japan" },
      { value: "kr", label: "South Korea" },
      { value: "mx", label: "Mexico" },
      { value: "nl", label: "Netherlands" },
      { value: "nz", label: "New Zealand" },
      { value: "no", label: "Norway" },
      { value: "pk", label: "Pakistan" },
      { value: "ph", label: "Philippines" },
      { value: "pl", label: "Poland" },
      { value: "pt", label: "Portugal" },
      { value: "ru", label: "Russia" },
      { value: "sa", label: "Saudi Arabia" },
      { value: "sg", label: "Singapore" },
      { value: "za", label: "South Africa" },
      { value: "es", label: "Spain" },
      { value: "se", label: "Sweden" },
      { value: "ch", label: "Switzerland" },
      { value: "th", label: "Thailand" },
      { value: "tr", label: "Turkey" },
      { value: "ua", label: "Ukraine" },
      { value: "ae", label: "United Arab Emirates" },
      { value: "uk", label: "United Kingdom" },
      { value: "us", label: "United States" },
      { value: "vn", label: "Vietnam" },
    ],
    placeholder: "Search countries...",
    searchable: true,
    className: "w-64",
  },
};

// Custom Render
export const CustomRender: Story = {
  render: () => (
    <Select
      options={userOptions}
      defaultValue="james"
      className="w-80"
      renderOption={(option, isSelected) => (
        <div className="flex items-center gap-3">
          {option.avatar ? (
            <img
              src={option.avatar}
              alt=""
              className="size-10 rounded-full object-cover"
            />
          ) : (
            <span className="size-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
              {option.avatarInitials}
            </span>
          )}
          <div className="flex-1">
            <div className="font-medium">{option.label}</div>
            <div className="text-xs text-muted-foreground">
              {option.description}
            </div>
          </div>
          {isSelected && (
            <span className="text-primary">✓</span>
          )}
        </div>
      )}
      renderValue={(option) =>
        option ? (
          <span className="flex items-center gap-2">
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
          </span>
        ) : (
          <span className="text-muted-foreground">Select a user</span>
        )
      }
    />
  ),
};

// Controlled
export const Controlled: Story = {
  render: function ControlledSelect() {
    const [value, setValue] = useState("us");

    return (
      <div className="space-y-4">
        <Select
          options={countryOptions}
          value={value}
          onChange={setValue}
          className="w-64"
        />
        <p className="text-sm text-muted-foreground">
          Selected value: <code className="text-foreground">{value}</code>
        </p>
      </div>
    );
  },
};

// In Form
export const InForm: Story = {
  render: () => (
    <form className="w-80 space-y-4">
      <div className="space-y-2">
        <span className="block text-sm font-medium">Country</span>
        <Select
          name="country"
          options={countryOptions}
          placeholder="Select your country"
        />
      </div>
      <div className="space-y-2">
        <span className="block text-sm font-medium">Status</span>
        <Select
          name="status"
          options={statusOptions}
          placeholder="Select status"
        />
      </div>
    </form>
  ),
};

// Mini Select (File Filter Example)
export const MiniSelect: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-sm">
      <span>Filter:</span>
      <Select
        variant="minimal"
        size="xs"
        options={[
          { value: "view", label: "Can view" },
          { value: "edit", label: "Can edit" },
          { value: "admin", label: "Admin" },
        ]}
        defaultValue="view"
      />
    </div>
  ),
};

// View Select Example
export const ViewSelect: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-sm">
      <span>Sort:</span>
      <Select
        variant="ghost"
        size="sm"
        options={[
          { value: "newest", label: "Newest first" },
          { value: "oldest", label: "Oldest file" },
          { value: "az", label: "A to Z" },
          { value: "za", label: "Z to A" },
        ]}
        defaultValue="newest"
      />
    </div>
  ),
};

// Currency Select Example
export const CurrencySelect: Story = {
  args: {
    variant: "default",
    options: [
      {
        value: "usd",
        label: "USD",
        icon: <span className="text-lg">🇺🇸</span>,
        description: "US Dollar",
      },
      {
        value: "eur",
        label: "EUR",
        icon: <span className="text-lg">🇪🇺</span>,
        description: "Euro",
      },
      {
        value: "gbp",
        label: "GBP",
        icon: <span className="text-lg">🇬🇧</span>,
        description: "British Pound",
      },
      {
        value: "jpy",
        label: "JPY",
        icon: <span className="text-lg">🇯🇵</span>,
        description: "Japanese Yen",
      },
    ],
    defaultValue: "usd",
    className: "w-48",
  },
};

// Many Options
export const ManyOptions: Story = {
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
      { value: "9", label: "Option 9" },
      { value: "10", label: "Option 10" },
      { value: "11", label: "Option 11" },
      { value: "12", label: "Option 12" },
    ],
    placeholder: "Select an option",
    className: "w-64",
  },
};
