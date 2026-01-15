import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  CommandPalette,
  SearchModal,
  SearchResults,
  RecentSearches,
  SearchSuggestions,
  type CommandGroup,
  type SearchResult,
} from "./index";
import { Button } from "@/components/atoms/Button";
import { Kbd } from "@/components/atoms/Kbd";
import {
  FileTextIcon,
  UserIcon,
  SettingsIcon,
  SearchIcon,
  HomeIcon,
  MailIcon,
  CalendarIcon,
  HashIcon,
} from "@/lib/icons";

const meta: Meta<typeof CommandPalette> = {
  title: "Organisms/CommandPalette",
  component: CommandPalette,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// =============================================================================
// CommandPalette Stories
// =============================================================================

const commandGroups: CommandGroup[] = [
  {
    id: "navigation",
    label: "Navigation",
    actions: [
      {
        id: "home",
        label: "Go to Home",
        description: "Navigate to the home page",
        icon: <HomeIcon className="size-4" />,
        shortcut: ["G", "H"],
      },
      {
        id: "dashboard",
        label: "Go to Dashboard",
        description: "Navigate to your dashboard",
        icon: <HomeIcon className="size-4" />,
        shortcut: ["G", "D"],
      },
    ],
  },
  {
    id: "actions",
    label: "Actions",
    actions: [
      {
        id: "new-doc",
        label: "Create Document",
        description: "Create a new document",
        icon: <FileTextIcon className="size-4" />,
        shortcut: ["⌘", "N"],
      },
      {
        id: "new-user",
        label: "Invite User",
        description: "Invite a team member",
        icon: <UserIcon className="size-4" />,
        shortcut: ["⌘", "I"],
      },
      {
        id: "compose",
        label: "Compose Email",
        description: "Write a new email",
        icon: <MailIcon className="size-4" />,
        shortcut: ["⌘", "M"],
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    actions: [
      {
        id: "settings",
        label: "Open Settings",
        description: "Configure your preferences",
        icon: <SettingsIcon className="size-4" />,
        shortcut: ["⌘", ","],
      },
      {
        id: "theme",
        label: "Toggle Theme",
        description: "Switch between light and dark mode",
        icon: <SettingsIcon className="size-4" />,
        shortcut: ["⌘", "T"],
      },
    ],
  },
];

export const CommandPaletteDefault: StoryObj<typeof CommandPalette> = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="min-h-screen bg-background p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">
            Press <Kbd keys={["⌘", "K"]} /> or click the button to open
          </p>
          <Button onClick={() => setIsOpen(true)}>Open Command Palette</Button>
        </div>
        <CommandPalette
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          groups={commandGroups}
          footer={
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Kbd keys={["↑", "↓"]} /> to navigate
              </span>
              <span className="flex items-center gap-1">
                <Kbd keys={["Enter"]} /> to select
              </span>
              <span className="flex items-center gap-1">
                <Kbd keys={["Esc"]} /> to close
              </span>
            </div>
          }
        />
      </div>
    );
  },
};

// =============================================================================
// SearchModal Stories
// =============================================================================

const searchResults: SearchResult[] = [
  {
    id: "1",
    title: "Getting Started Guide",
    description: "Learn how to set up your project",
    type: "document",
    meta: "Updated 2 days ago",
  },
  {
    id: "2",
    title: "API Documentation",
    description: "Complete reference for all endpoints",
    type: "document",
    meta: "Updated yesterday",
  },
  {
    id: "3",
    title: "John Doe",
    description: "john.doe@example.com",
    type: "user",
    meta: "Team member",
  },
  {
    id: "4",
    title: "Project Settings",
    description: "Configure your project preferences",
    type: "page",
    meta: "Settings",
  },
  {
    id: "5",
    title: "#frontend",
    description: "Frontend development discussions",
    type: "tag",
    meta: "128 posts",
  },
];

const recentSearches = [
  "API documentation",
  "User authentication",
  "Dashboard settings",
  "Team members",
];

const suggestions = [
  "How to deploy",
  "Authentication setup",
  "API rate limits",
  "Team permissions",
];

export const SearchModalDefault: StoryObj<typeof SearchModal> = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(true);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (query: string) => {
      if (!query) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      // Simulate search delay
      setTimeout(() => {
        setResults(
          searchResults.filter(
            (r) =>
              r.title.toLowerCase().includes(query.toLowerCase()) ||
              r.description?.toLowerCase().includes(query.toLowerCase())
          )
        );
        setIsLoading(false);
      }, 300);
    };

    return (
      <div className="min-h-screen bg-background p-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">Click the button to search</p>
          <Button onClick={() => setIsOpen(true)}>
            <SearchIcon className="size-4 mr-2" />
            Search
          </Button>
        </div>
        <SearchModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          results={results}
          recentSearches={recentSearches}
          suggestions={suggestions}
          onSearch={handleSearch}
          onResultClick={(result) => console.log("Clicked:", result)}
          isLoading={isLoading}
        />
      </div>
    );
  },
};

// =============================================================================
// SearchResults Stories
// =============================================================================

export const SearchResultsDefault: StoryObj<typeof SearchResults> = {
  render: () => (
    <div className="w-[500px] rounded-xl border border-border bg-card p-4">
      <SearchResults
        results={searchResults}
        onResultClick={(result) => console.log("Clicked:", result)}
      />
    </div>
  ),
};

export const SearchResultsEmpty: StoryObj<typeof SearchResults> = {
  render: () => (
    <div className="w-[500px] rounded-xl border border-border bg-card p-4">
      <SearchResults results={[]} />
    </div>
  ),
};

// =============================================================================
// RecentSearches Stories
// =============================================================================

export const RecentSearchesDefault: StoryObj<typeof RecentSearches> = {
  render: () => (
    <div className="w-[400px] rounded-xl border border-border bg-card p-4">
      <RecentSearches
        searches={recentSearches}
        onSearchClick={(search) => console.log("Search:", search)}
        onClear={() => console.log("Clear all")}
        onRemove={(search) => console.log("Remove:", search)}
      />
    </div>
  ),
};

// =============================================================================
// SearchSuggestions Stories
// =============================================================================

export const SearchSuggestionsDefault: StoryObj<typeof SearchSuggestions> = {
  render: () => (
    <div className="w-[400px] rounded-xl border border-border bg-card p-4">
      <SearchSuggestions
        suggestions={suggestions}
        onSuggestionClick={(s) => console.log("Suggestion:", s)}
      />
    </div>
  ),
};

export const SearchSuggestionsInline: StoryObj<typeof SearchSuggestions> = {
  render: () => (
    <div className="w-[400px] rounded-xl border border-border bg-card p-4">
      <SearchSuggestions
        suggestions={suggestions}
        variant="inline"
        title="Popular searches"
        onSuggestionClick={(s) => console.log("Suggestion:", s)}
      />
    </div>
  ),
};

export const SearchSuggestionsTrending: StoryObj<typeof SearchSuggestions> = {
  render: () => (
    <div className="w-[400px] rounded-xl border border-border bg-card p-4">
      <SearchSuggestions
        suggestions={[
          { label: "React hooks", trending: true },
          { label: "TypeScript generics", trending: true },
          { label: "Next.js 14" },
          { label: "Tailwind CSS" },
        ]}
        title="Trending"
        onSuggestionClick={(s) => console.log("Suggestion:", s)}
      />
    </div>
  ),
};

// =============================================================================
// Combined Search Experience
// =============================================================================

export const FullSearchExperience: StoryObj<typeof SearchModal> = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="min-h-screen bg-background">
        {/* Header with search */}
        <header className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">My App</h1>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              <SearchIcon className="size-4" />
              <span>Search...</span>
              <Kbd keys={["⌘", "K"]} />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6">
          <p className="text-muted-foreground">
            Click the search button in the header or press{" "}
            <Kbd keys={["⌘", "K"]} /> to open search.
          </p>
        </main>

        {/* Search Modal */}
        <SearchModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          results={searchResults}
          recentSearches={recentSearches}
          suggestions={suggestions}
          onSearch={(query) => console.log("Search:", query)}
          onResultClick={(result) => {
            console.log("Result:", result);
            setIsOpen(false);
          }}
        />
      </div>
    );
  },
};
