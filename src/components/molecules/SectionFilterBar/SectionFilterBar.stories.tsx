import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/atoms";
import { FileIcon, FolderIcon, PlusIcon, TagIcon } from "@/components/icons";
import { SectionFilterBar } from ".";

const meta: Meta<typeof SectionFilterBar> = {
  title: "Molecules/SectionFilterBar",
  component: SectionFilterBar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "compact", "stacked"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionFilterBar>;

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

const filterTags = [
  {
    id: "all",
    label: "All",
    count: 16,
    icon: <FileIcon className="size-3.5" />,
  },
  {
    id: "tags",
    label: "Tags",
    count: 2,
    icon: <TagIcon className="size-3.5" />,
  },
  {
    id: "folders",
    label: "Folders",
    count: 8,
    icon: <FolderIcon className="size-3.5" />,
  },
];

export const Default: Story = {
  args: {
    showSearch: true,
    searchPlaceholder: "Search projects...",
    showSort: true,
    sortOptions,
  },
};

export const WithFilterButton: Story = {
  args: {
    showSearch: true,
    searchPlaceholder: "Search...",
    showFilterButton: true,
    filterCount: 3,
  },
};

export const WithViewToggle: Story = {
  args: {
    showSearch: true,
    showViewToggle: true,
    view: "grid",
  },
};

export const WithFilterTags: Story = {
  args: {
    variant: "stacked",
    showSearch: true,
    filterTags,
  },
};

export const CompactVariant: Story = {
  args: {
    variant: "compact",
    showSearch: true,
    searchPlaceholder: "Quick search...",
    showSort: true,
    sortOptions,
  },
};

export const StackedVariant: Story = {
  args: {
    variant: "stacked",
    showSearch: true,
    searchPlaceholder: "Search or type a command",
    filterTags,
    showFilterButton: true,
    showViewToggle: true,
    view: "list",
  },
};

export const WithActions: Story = {
  args: {
    showSearch: true,
    showFilterButton: true,
    actions: (
      <Button size="sm" leftIcon={<PlusIcon className="size-3.5" />}>
        Add New
      </Button>
    ),
  },
};

export const FullFeatured: Story = {
  args: {
    showSearch: true,
    searchPlaceholder: "Search projects...",
    filterTags,
    showSort: true,
    sortOptions,
    sortValue: "newest",
    showFilterButton: true,
    filterCount: 5,
    showViewToggle: true,
    view: "grid",
    actions: (
      <Button size="sm" leftIcon={<PlusIcon className="size-3.5" />}>
        New Project
      </Button>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const InteractiveExample = () => {
      const [searchValue, setSearchValue] = useState("");
      const [sortValue, setSortValue] = useState("newest");
      const [view, setView] = useState<"grid" | "list">("grid");
      const [activeTags, setActiveTags] = useState<string[]>(["all"]);

      const toggleTag = (tagId: string) => {
        setActiveTags((prev) =>
          prev.includes(tagId)
            ? prev.filter((id) => id !== tagId)
            : [...prev, tagId],
        );
      };

      const tagsWithActive = filterTags.map((tag) => ({
        ...tag,
        active: activeTags.includes(tag.id),
      }));

      return (
        <div className="space-y-4">
          <SectionFilterBar
            variant="stacked"
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onSearchClear={() => setSearchValue("")}
            searchPlaceholder="Search files..."
            filterTags={tagsWithActive}
            onFilterTagClick={toggleTag}
            showSort
            sortOptions={sortOptions}
            sortValue={sortValue}
            onSortChange={setSortValue}
            showViewToggle
            view={view}
            onViewChange={setView}
          />
          <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
            <p>Search: {searchValue || "(empty)"}</p>
            <p>Sort: {sortValue}</p>
            <p>View: {view}</p>
            <p>Active Tags: {activeTags.join(", ")}</p>
          </div>
        </div>
      );
    };
    return <InteractiveExample />;
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-10">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Default Variant</h3>
        <SectionFilterBar
          showSearch
          searchPlaceholder="Search..."
          showSort
          sortOptions={sortOptions}
          filterTags={filterTags.slice(0, 2)}
          showFilterButton
          filterCount={2}
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Compact Variant</h3>
        <SectionFilterBar
          variant="compact"
          showSearch
          searchPlaceholder="Quick search..."
          showSort
          sortOptions={sortOptions}
          showFilterButton
        />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Stacked Variant</h3>
        <SectionFilterBar
          variant="stacked"
          showSearch
          searchPlaceholder="Search or type a command..."
          filterTags={filterTags}
          showSort
          sortOptions={sortOptions}
          showFilterButton
          showViewToggle
          view="grid"
        />
      </div>
    </div>
  ),
};
