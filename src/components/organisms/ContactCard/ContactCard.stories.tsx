import type { Meta, StoryObj } from "@storybook/react";
import { ContactCard, ContactCardGrid, ContactCardList } from "./index";
import { Button } from "@/components/atoms/Button";

const meta: Meta<typeof ContactCard> = {
  title: "Organisms/Cards/ContactCard",
  component: ContactCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContactCard>;

const sampleContact = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  role: "Software Engineer",
  department: "Engineering",
  company: "Acme Inc",
  avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  status: "online" as const,
  tags: ["Developer", "Team Lead"],
};

export const Default: Story = {
  args: {
    contact: sampleContact,
  },
};

export const Compact: Story = {
  args: {
    contact: sampleContact,
    variant: "compact",
  },
};

export const Horizontal: Story = {
  args: {
    contact: sampleContact,
    variant: "horizontal",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const Detailed: Story = {
  args: {
    contact: sampleContact,
    variant: "detailed",
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export const Selectable: Story = {
  args: {
    contact: sampleContact,
    selectable: true,
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    contact: sampleContact,
    selectable: true,
    selected: true,
  },
};

export const WithActions: Story = {
  args: {
    contact: sampleContact,
    actions: (
      <Button size="sm">Connect</Button>
    ),
  },
};

export const WithoutStatus: Story = {
  args: {
    contact: sampleContact,
    showStatus: false,
  },
};

const contacts = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Software Engineer",
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    status: "online" as const,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Product Manager",
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    status: "busy" as const,
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "Designer",
    avatarSrc: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150&h=150&fit=crop&crop=face",
    status: "away" as const,
  },
  {
    id: "4",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Marketing Lead",
    avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    status: "offline" as const,
  },
];

export const Grid: StoryObj<typeof ContactCardGrid> = {
  render: () => (
    <div className="w-[800px]">
      <ContactCardGrid
        contacts={contacts}
        columns={4}
      />
    </div>
  ),
};

export const GridSelectable: StoryObj<typeof ContactCardGrid> = {
  render: () => (
    <div className="w-[800px]">
      <ContactCardGrid
        contacts={contacts}
        columns={4}
        selectable
        selectedIds={["1", "3"]}
      />
    </div>
  ),
};

export const List: StoryObj<typeof ContactCardList> = {
  render: () => (
    <div className="w-[500px]">
      <ContactCardList
        contacts={contacts}
        variant="horizontal"
      />
    </div>
  ),
};

export const ListCompact: StoryObj<typeof ContactCardList> = {
  render: () => (
    <div className="w-[400px]">
      <ContactCardList
        contacts={contacts}
        variant="compact"
      />
    </div>
  ),
};

export const ListDetailed: StoryObj<typeof ContactCardList> = {
  render: () => (
    <div className="w-[400px]">
      <ContactCardList
        contacts={contacts.slice(0, 2).map(c => ({
          ...c,
          phone: "+1 (555) 123-4567",
          tags: ["Team", "Engineering"],
        }))}
        variant="detailed"
      />
    </div>
  ),
};
