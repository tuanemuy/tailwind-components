import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CalendarIcon, MailIcon, MusicIcon, VideoIcon } from "@/lib/icons";
import { type Contact, type QuickAction, SidebarSearch } from ".";

const meta: Meta<typeof SidebarSearch> = {
  title: "Molecules/SidebarSearch",
  component: SidebarSearch,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A sidebar search component with autocomplete functionality, quick actions, and contacts list. Ideal for chat applications, contact management, and file navigation.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80 border border-border rounded-lg overflow-hidden bg-background">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SidebarSearch>;

// Sample contacts data
const sampleContacts: Contact[] = [
  {
    id: "1",
    name: "Amanda Harvey",
    avatar:
      "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
  },
  {
    id: "2",
    name: "Anna Richard",
    avatar:
      "https://images.unsplash.com/photo-1570654639102-bdd95efeca7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
  },
  {
    id: "3",
    name: "Alex Brown",
  },
  {
    id: "4",
    name: "Bob Dean",
  },
  {
    id: "5",
    name: "Chun Wa",
    avatar:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
  },
  {
    id: "6",
    name: "Costa Quinn",
    avatar:
      "https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
  },
  {
    id: "7",
    name: "David Harrison",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
  },
  {
    id: "8",
    name: "Ella Lauda",
    avatar:
      "https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
  },
  {
    id: "9",
    name: "Elizabeth Cru",
    avatar:
      "https://images.unsplash.com/photo-1568048689711-5e0325cea8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
  },
  {
    id: "10",
    name: "Lewis Clarke",
    avatar:
      "https://images.unsplash.com/photo-1679412330254-90cb240038c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
  },
  {
    id: "11",
    name: "Mark Colbert",
  },
  {
    id: "12",
    name: "Ols Schols",
  },
  {
    id: "13",
    name: "Rachel Doe",
  },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    contacts: sampleContacts,
    alwaysShowDropdown: true,
    dropdownHeight: "400px",
  },
};

export const WithCustomQuickActions: Story = {
  args: {
    quickActions: [
      {
        id: "videos",
        label: "Videos",
        icon: <VideoIcon className="size-4" />,
      },
      {
        id: "audio",
        label: "Audio",
        icon: <MusicIcon className="size-4" />,
      },
      {
        id: "messages",
        label: "Messages",
        icon: <MailIcon className="size-4" />,
      },
      {
        id: "events",
        label: "Events",
        icon: <CalendarIcon className="size-4" />,
      },
    ],
    contacts: sampleContacts.slice(0, 5),
    alwaysShowDropdown: true,
    dropdownHeight: "400px",
  },
};

export const QuickActionsOnly: Story = {
  args: {
    contacts: [],
    alwaysShowDropdown: true,
    dropdownHeight: "200px",
  },
};

export const ContactsOnly: Story = {
  args: {
    quickActions: [],
    contacts: sampleContacts,
    alwaysShowDropdown: true,
    dropdownHeight: "400px",
  },
};

export const EmptyState: Story = {
  render: () => {
    const [query, setQuery] = useState("nonexistent");

    // When query is set, return empty arrays to show empty state
    const filteredContacts = query
      ? sampleContacts.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase()),
        )
      : sampleContacts;

    return (
      <SidebarSearch
        contacts={filteredContacts}
        alwaysShowDropdown={true}
        dropdownHeight="400px"
        onSearch={setQuery}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows the empty state when no search results are found. Type in the search box to filter results.",
      },
    },
  },
};

export const CustomEmptyState: Story = {
  args: {
    contacts: [],
    quickActions: [],
    alwaysShowDropdown: true,
    dropdownHeight: "200px",
    emptyState: (
      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <MailIcon className="size-8 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">No contacts found</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Try searching with a different term
        </p>
      </div>
    ),
  },
};

export const WithCallbacks: Story = {
  render: () => {
    const handleSearch = (query: string) => {
      console.log("Search query:", query);
    };

    const handleQuickActionClick = (action: QuickAction) => {
      console.log("Quick action clicked:", action.label);
    };

    const handleContactClick = (contact: Contact) => {
      console.log("Contact clicked:", contact.name);
    };

    return (
      <SidebarSearch
        contacts={sampleContacts.slice(0, 5)}
        onSearch={handleSearch}
        onQuickActionClick={handleQuickActionClick}
        onContactClick={handleContactClick}
        alwaysShowDropdown={true}
        dropdownHeight="400px"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the callback handlers. Open the console to see the logs.",
      },
    },
  },
};

export const CustomGroups: Story = {
  args: {
    groups: [
      {
        id: "media",
        title: "Media",
        items: [
          {
            id: "videos",
            label: "Videos",
            icon: <VideoIcon className="size-4" />,
          },
          {
            id: "audio",
            label: "Audio",
            icon: <MusicIcon className="size-4" />,
          },
        ],
      },
      {
        id: "recent",
        title: "Recent Contacts",
        items: [
          {
            id: "1",
            name: "Amanda Harvey",
            avatar:
              "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
          },
          {
            id: "2",
            name: "David Harrison",
            avatar:
              "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80",
          },
        ],
      },
      {
        id: "all",
        title: "All Contacts",
        items: sampleContacts.slice(2, 8),
      },
    ],
    alwaysShowDropdown: true,
    dropdownHeight: "400px",
  },
};

export const FocusToOpen: Story = {
  args: {
    contacts: sampleContacts.slice(0, 5),
    alwaysShowDropdown: false,
    dropdownHeight: "300px",
  },
  parameters: {
    docs: {
      description: {
        story:
          "By default, the dropdown only shows when the search input is focused. Click on the input to open the dropdown.",
      },
    },
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Search contacts, files, or actions...",
    contacts: sampleContacts.slice(0, 5),
    alwaysShowDropdown: true,
    dropdownHeight: "300px",
  },
};

export const InChatSidebar: Story = {
  render: () => (
    <div className="flex h-[500px] flex-col">
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <h2 className="text-sm font-semibold">Messages</h2>
      </div>
      <SidebarSearch
        contacts={sampleContacts}
        alwaysShowDropdown={true}
        dropdownHeight="calc(100% - 49px)"
        placeholder="Search messages..."
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="w-80 h-[500px] border border-border rounded-lg overflow-hidden bg-background">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Example of SidebarSearch used in a chat application sidebar for searching messages and contacts.",
      },
    },
  },
};
