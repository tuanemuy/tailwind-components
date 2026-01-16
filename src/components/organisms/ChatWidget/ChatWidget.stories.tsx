import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { MessageData } from "../MessageBubble";
import {
  type ChatUser,
  ChatWidget,
  ChatWidgetToggle,
  type Conversation,
  type HelpArticle,
} from "./index";

const meta: Meta<typeof ChatWidget> = {
  title: "Organisms/InboxChatMessages/ChatWidget",
  component: ChatWidget,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatWidget>;

const sampleAgents: ChatUser[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
    status: "online",
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop",
    status: "online",
  },
];

const sampleMessages: MessageData[] = [
  {
    id: "1",
    type: "text",
    content: "Hello! How can I help you today?",
    sender: "other",
    senderName: "Sarah Johnson",
    senderAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
    timestamp: "2:30 PM",
    status: "read",
  },
  {
    id: "2",
    type: "text",
    content: "I have a question about my order.",
    sender: "self",
    senderName: "Me",
    timestamp: "2:31 PM",
    status: "delivered",
  },
  {
    id: "3",
    type: "text",
    content: "Of course! Could you please provide your order number?",
    sender: "other",
    senderName: "Sarah Johnson",
    senderAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
    timestamp: "2:32 PM",
    status: "read",
  },
];

const sampleConversations: Conversation[] = [
  {
    id: "1",
    user: sampleAgents[0],
    lastMessage: "Of course! Could you please provide your order number?",
    lastMessageTime: "2:32 PM",
    unreadCount: 0,
  },
  {
    id: "2",
    user: sampleAgents[1],
    lastMessage:
      "Your issue has been resolved. Is there anything else I can help with?",
    lastMessageTime: "Yesterday",
    unreadCount: 1,
  },
];

const sampleHelpArticles: HelpArticle[] = [
  {
    id: "1",
    title: "Getting Started Guide",
    description: "Learn the basics of using our platform",
  },
  {
    id: "2",
    title: "How to Track Your Order",
    description: "Step-by-step guide to tracking orders",
  },
  {
    id: "3",
    title: "Return Policy",
    description: "Information about returns and refunds",
  },
  {
    id: "4",
    title: "Account Settings",
    description: "Manage your account preferences",
  },
];

export const Default: Story = {
  render: () => (
    <div className="h-[600px] w-[400px]">
      <ChatWidget
        isOpen={true}
        defaultView="welcome"
        agents={sampleAgents}
        title="Acme Support"
        welcomeTitle="Hi there!"
        welcomeSubtitle="How can we help you today?"
      />
    </div>
  ),
};

export const ConversationView: Story = {
  render: () => (
    <div className="h-[600px] w-[400px]">
      <ChatWidget
        isOpen={true}
        defaultView="conversation"
        agents={sampleAgents}
        currentConversation={{
          user: sampleAgents[0],
          messages: sampleMessages,
        }}
        onSendMessage={(message: string) => console.log("Send:", message)}
      />
    </div>
  ),
};

export const ConversationsList: Story = {
  render: () => (
    <div className="h-[600px] w-[400px]">
      <ChatWidget
        isOpen={true}
        defaultView="conversations"
        conversations={sampleConversations}
        onSelectConversation={(id: string) => console.log("Select:", id)}
      />
    </div>
  ),
};

export const HelpView: Story = {
  render: () => (
    <div className="h-[600px] w-[400px]">
      <ChatWidget
        isOpen={true}
        defaultView="help"
        helpArticles={sampleHelpArticles}
        onSelectHelpArticle={(id: string) => console.log("Article:", id)}
      />
    </div>
  ),
};

export const ToggleButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="relative h-[600px] w-[400px]">
        <ChatWidgetToggle
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          unreadCount={3}
        />
        {isOpen && (
          <div className="absolute bottom-16 right-0">
            <ChatWidget
              isOpen={true}
              defaultView="welcome"
              agents={sampleAgents}
              title="Acme Support"
              onClose={() => setIsOpen(false)}
            />
          </div>
        )}
      </div>
    );
  },
};

export const WithBranding: Story = {
  render: () => (
    <div className="h-[600px] w-[400px]">
      <ChatWidget
        isOpen={true}
        defaultView="welcome"
        agents={sampleAgents}
        title="Acme Inc."
        welcomeTitle="Welcome to Acme!"
        welcomeSubtitle="We're here to help."
      />
    </div>
  ),
};
