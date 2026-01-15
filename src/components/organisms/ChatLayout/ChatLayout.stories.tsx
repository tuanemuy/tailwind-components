import type { Meta, StoryObj } from "@storybook/react";
import { ChatLayout, type ChatContact, type ChatRoom } from "./index";
import type { MessageData } from "../MessageBubble";

const meta: Meta<typeof ChatLayout> = {
  title: "Organisms/InboxChatMessages/ChatLayout",
  component: ChatLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatLayout>;

const sampleContacts: ChatContact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
    status: "online",
    lastMessage: "Sure, I'll send it over!",
    lastMessageTime: "2:30 PM",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop",
    status: "offline",
    lastMessage: "Thanks for the update.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop",
    status: "away",
    lastMessage: "Let me check and get back to you.",
    lastMessageTime: "Dec 12",
    unreadCount: 0,
  },
  {
    id: "4",
    name: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop",
    status: "online",
    lastMessage: "Great idea! Let's discuss tomorrow.",
    lastMessageTime: "Dec 10",
    unreadCount: 0,
  },
];

const sampleRooms: ChatRoom[] = [
  {
    id: "room1",
    name: "General",
    type: "channel",
    members: 25,
    lastMessage: "Welcome to the team!",
    lastMessageTime: "3:00 PM",
    unreadCount: 5,
  },
  {
    id: "room2",
    name: "Development",
    type: "channel",
    members: 12,
    lastMessage: "PR has been merged.",
    lastMessageTime: "1:45 PM",
    unreadCount: 0,
  },
  {
    id: "room3",
    name: "Marketing",
    type: "channel",
    members: 8,
    lastMessage: "Campaign is live!",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
  },
];

const sampleMessages: MessageData[] = [
  {
    id: "1",
    type: "text",
    content: "Hey! How's the project going?",
    sender: "other",
    senderName: "Sarah Johnson",
    senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
    timestamp: "2:25 PM",
    status: "read",
  },
  {
    id: "2",
    type: "text",
    content: "Pretty good! Just finished the main features. I'll be pushing the updates soon.",
    sender: "self",
    senderName: "Me",
    timestamp: "2:26 PM",
    status: "delivered",
  },
  {
    id: "3",
    type: "text",
    content: "That's great! Can you send me the documentation when you're done?",
    sender: "other",
    senderName: "Sarah Johnson",
    senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
    timestamp: "2:28 PM",
    status: "read",
  },
  {
    id: "4",
    type: "text",
    content: "Sure, I'll send it over!",
    sender: "other",
    senderName: "Sarah Johnson",
    senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
    timestamp: "2:30 PM",
    status: "read",
  },
];

export const Default: Story = {
  render: () => (
    <div className="h-[600px]">
      <ChatLayout
        contacts={sampleContacts}
        selectedId="1"
        messages={sampleMessages}
        showSidebar={true}
        showInfo={false}
        onSelectContact={(id) => console.log("Select contact:", id)}
        onSendMessage={(message) => console.log("Send:", message)}
      />
    </div>
  ),
};

export const WithRooms: Story = {
  render: () => (
    <div className="h-[600px]">
      <ChatLayout
        contacts={sampleContacts}
        rooms={sampleRooms}
        selectedId="1"
        messages={sampleMessages}
        showSidebar={true}
        onSelectContact={(id) => console.log("Select:", id)}
        onSelectRoom={(id) => console.log("Select room:", id)}
        onSendMessage={(message) => console.log("Send:", message)}
      />
    </div>
  ),
};

export const WithInfoPanel: Story = {
  render: () => (
    <div className="h-[600px]">
      <ChatLayout
        contacts={sampleContacts}
        selectedId="1"
        messages={sampleMessages}
        showSidebar={true}
        showInfo={true}
        onSelectContact={(id) => console.log("Select:", id)}
        onSendMessage={(message) => console.log("Send:", message)}
      />
    </div>
  ),
};

export const NoSelection: Story = {
  render: () => (
    <div className="h-[600px]">
      <ChatLayout
        contacts={sampleContacts}
        showSidebar={true}
        onSelectContact={(id) => console.log("Select:", id)}
      />
    </div>
  ),
};

export const HiddenSidebar: Story = {
  render: () => (
    <div className="h-[600px]">
      <ChatLayout
        contacts={sampleContacts}
        selectedId="1"
        messages={sampleMessages}
        showSidebar={false}
        onSendMessage={(message) => console.log("Send:", message)}
      />
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div className="h-[600px]">
      <ChatLayout
        contacts={[]}
        showSidebar={true}
        onSelectContact={(id) => console.log("Select:", id)}
      />
    </div>
  ),
};
