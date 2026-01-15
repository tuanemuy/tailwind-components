import type { Meta, StoryObj } from "@storybook/react";
import {
  MessageBubble,
  MessageGroup,
  TypingIndicator,
  type MessageData,
} from "./index";

const meta: Meta<typeof MessageBubble> = {
  title: "Organisms/InboxChatMessages/MessageBubble",
  component: MessageBubble,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MessageBubble>;

const sampleTextMessage: MessageData = {
  id: "1",
  type: "text",
  content: "Hello! How are you doing today?",
  sender: "other",
  senderName: "John Doe",
  senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop",
  timestamp: "2:30 PM",
  status: "read",
};

const sampleSelfMessage: MessageData = {
  id: "2",
  type: "text",
  content: "I'm doing great, thanks for asking! Just working on some new features.",
  sender: "self",
  senderName: "Me",
  timestamp: "2:31 PM",
  status: "delivered",
};

const sampleImageMessage: MessageData = {
  id: "3",
  type: "image",
  content: "Check out this view!",
  sender: "other",
  senderName: "John Doe",
  senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop",
  timestamp: "2:32 PM",
  status: "read",
  images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"],
};

const sampleFileMessage: MessageData = {
  id: "4",
  type: "file",
  content: "Here's the project proposal",
  sender: "other",
  senderName: "John Doe",
  senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop",
  timestamp: "2:33 PM",
  status: "read",
  file: {
    name: "project-proposal.pdf",
    size: "2.4 MB",
    type: "PDF",
  },
};

const sampleVoiceMessage: MessageData = {
  id: "5",
  type: "voice",
  content: "Voice message",
  sender: "self",
  senderName: "Me",
  timestamp: "2:34 PM",
  status: "sent",
  voice: {
    duration: "0:45",
  },
};

const sampleLinkMessage: MessageData = {
  id: "6",
  type: "link",
  content: "Check out this article!",
  sender: "other",
  senderName: "John Doe",
  senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop",
  timestamp: "2:35 PM",
  status: "read",
  linkPreview: {
    url: "https://example.com/article",
    title: "10 Tips for Better Productivity",
    description: "Learn how to boost your productivity with these simple tips.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=200&h=100&fit=crop",
  },
};

export const TextMessage: Story = {
  args: {
    message: sampleTextMessage,
    showAvatar: true,
    showName: true,
    showStatus: true,
  },
};

export const SelfMessage: Story = {
  args: {
    message: sampleSelfMessage,
    showStatus: true,
  },
};

export const ImageMessage: Story = {
  args: {
    message: sampleImageMessage,
    showAvatar: true,
  },
};

export const FileMessage: Story = {
  args: {
    message: sampleFileMessage,
    showAvatar: true,
  },
};

export const VoiceMessage: Story = {
  args: {
    message: sampleVoiceMessage,
    showStatus: true,
  },
};

export const LinkMessage: Story = {
  args: {
    message: sampleLinkMessage,
    showAvatar: true,
  },
};

export const WithActions: Story = {
  args: {
    message: sampleTextMessage,
    showAvatar: true,
    showActions: true,
  },
};

export const MessageGroupExample: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <MessageGroup
        messages={[
          sampleTextMessage,
          sampleSelfMessage,
          sampleImageMessage,
          sampleFileMessage,
        ]}
        showAvatar={true}
      />
    </div>
  ),
};

export const TypingIndicatorExample: Story = {
  render: () => (
    <div className="w-96">
      <TypingIndicator
        users={[{
          name: "John",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop",
        }]}
      />
    </div>
  ),
};

export const ConversationFlow: Story = {
  render: () => (
    <div className="w-96 p-4 bg-muted/30 rounded-lg space-y-2">
      <MessageBubble message={sampleTextMessage} showAvatar showName />
      <MessageBubble message={sampleSelfMessage} showStatus />
      <MessageBubble message={sampleImageMessage} showAvatar />
      <MessageBubble message={sampleSelfMessage} showStatus />
      <TypingIndicator
        users={[{
          name: "John",
          avatar: sampleTextMessage.senderAvatar,
        }]}
      />
    </div>
  ),
};
