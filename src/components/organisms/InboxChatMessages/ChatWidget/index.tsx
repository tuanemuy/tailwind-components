"use client";

import { type ReactNode, useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  QuestionIcon,
  SearchIcon,
  XIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";
import { ComposeThread } from "../ComposeThread";
import {
  type MessageData,
  MessageGroup,
  TypingIndicator,
} from "../MessageBubble";

// ============================================
// Types
// ============================================

export type ChatWidgetView =
  | "welcome"
  | "conversation"
  | "conversations"
  | "help";

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  status?: "online" | "offline" | "away" | "busy";
  statusText?: string;
}

export interface Conversation {
  id: string;
  user: ChatUser;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

export interface HelpArticle {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  href?: string;
}

// ============================================
// ChatWidget Component
// ============================================

export interface ChatWidgetProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onClose?: () => void;
  defaultView?: ChatWidgetView;
  title?: string;
  subtitle?: string;
  welcomeTitle?: string;
  welcomeSubtitle?: string;
  agents?: ChatUser[];
  conversations?: Conversation[];
  helpArticles?: HelpArticle[];
  currentConversation?: {
    user: ChatUser;
    messages: MessageData[];
  };
  onSendMessage?: (message: string) => void;
  onStartConversation?: (agentId?: string) => void;
  onSelectConversation?: (id: string) => void;
  onSelectHelpArticle?: (id: string) => void;
  onBack?: () => void;
  showSearch?: boolean;
  position?: "bottom-right" | "bottom-left";
  className?: string;
}

export const ChatWidget = ({
  isOpen = false,
  onToggle,
  onClose,
  defaultView = "welcome",
  title = "Chat with us",
  subtitle = "We typically reply within minutes",
  welcomeTitle = "Hi there! 👋",
  welcomeSubtitle = "How can we help you today?",
  agents = [],
  conversations = [],
  helpArticles = [],
  currentConversation,
  onSendMessage,
  onStartConversation,
  onSelectConversation,
  onSelectHelpArticle,
  onBack,
  showSearch = true,
  position = "bottom-right",
  className,
}: ChatWidgetProps) => {
  const [view, setView] = useState<ChatWidgetView>(defaultView);
  const [typingUsers, _setTypingUsers] = useState<ChatUser[]>([]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setView("welcome");
    }
  };

  const handleStartConversation = (agentId?: string) => {
    onStartConversation?.(agentId);
    setView("conversation");
  };

  const handleSelectConversation = (id: string) => {
    onSelectConversation?.(id);
    setView("conversation");
  };

  return (
    <div
      className={cn(
        "fixed z-50",
        position === "bottom-right" && "bottom-6 right-6",
        position === "bottom-left" && "bottom-6 left-6",
        className,
      )}
    >
      {/* Widget Panel */}
      {isOpen && (
        <div className="mb-4 w-full sm:w-96 bg-card rounded-xl shadow-xl border border-border overflow-hidden">
          <div className="h-[500px] relative flex flex-col">
            {/* Header */}
            <ChatWidgetHeader
              view={view}
              title={title}
              subtitle={subtitle}
              currentUser={currentConversation?.user}
              onBack={view !== "welcome" ? handleBack : undefined}
              onClose={onClose}
            />

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {view === "welcome" && (
                <WelcomeView
                  welcomeTitle={welcomeTitle}
                  welcomeSubtitle={welcomeSubtitle}
                  agents={agents}
                  conversations={conversations}
                  helpArticles={helpArticles}
                  showSearch={showSearch}
                  onStartConversation={handleStartConversation}
                  onViewConversations={() => setView("conversations")}
                  onViewHelp={() => setView("help")}
                  onSelectHelpArticle={onSelectHelpArticle}
                />
              )}

              {view === "conversation" && currentConversation && (
                <ConversationView
                  messages={currentConversation.messages}
                  typingUsers={typingUsers}
                />
              )}

              {view === "conversations" && (
                <ConversationsListView
                  conversations={conversations}
                  onSelect={handleSelectConversation}
                />
              )}

              {view === "help" && (
                <HelpView
                  articles={helpArticles}
                  onSelect={onSelectHelpArticle}
                />
              )}
            </div>

            {/* Footer / Input */}
            {view === "conversation" && (
              <div className="border-t border-border">
                <ComposeThread
                  placeholder={`Message ${currentConversation?.user.name || "us"}...`}
                  onSend={(message) => onSendMessage?.(message)}
                  className="border-0 rounded-none"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <ChatWidgetToggle isOpen={isOpen} onToggle={onToggle} />
    </div>
  );
};

// ============================================
// ChatWidgetHeader Component
// ============================================

interface ChatWidgetHeaderProps {
  view: ChatWidgetView;
  title: string;
  subtitle: string;
  currentUser?: ChatUser;
  onBack?: () => void;
  onClose?: () => void;
}

const ChatWidgetHeader = ({
  view,
  title,
  subtitle,
  currentUser,
  onBack,
  onClose,
}: ChatWidgetHeaderProps) => {
  const showBackButton = view !== "welcome" && onBack;

  return (
    <div className="py-2 px-2 flex justify-between items-center gap-x-2 border-b border-border">
      {/* Back Button */}
      {showBackButton && (
        <Button
          variant="ghost"
          size="sm"
          className="size-8 p-0"
          onClick={onBack}
        >
          <ChevronLeftIcon className="size-4" />
          <span className="sr-only">Back</span>
        </Button>
      )}

      {/* Title / User Info */}
      <div className="flex-1 truncate">
        {view === "conversation" && currentUser ? (
          <div className="flex items-center gap-x-2 truncate">
            <Avatar
              src={currentUser.avatar}
              name={currentUser.name}
              size="sm"
              status={currentUser.status}
            />
            <div className="truncate">
              <span className="block text-sm font-semibold text-foreground truncate">
                {currentUser.name}
              </span>
              <span className="block text-xs text-primary truncate">
                {currentUser.statusText || getStatusText(currentUser.status)}
              </span>
            </div>
          </div>
        ) : (
          <div className="truncate px-2">
            <span className="block text-sm font-semibold text-foreground truncate">
              {title}
            </span>
            <span className="block text-xs text-muted-foreground truncate">
              {subtitle}
            </span>
          </div>
        )}
      </div>

      {/* Close Button */}
      <Button
        variant="ghost"
        size="sm"
        className="size-8 p-0"
        onClick={onClose}
      >
        <XIcon className="size-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};

// ============================================
// ChatWidgetToggle Component
// ============================================

export interface ChatWidgetToggleProps {
  isOpen: boolean;
  onToggle?: () => void;
  unreadCount?: number;
}

export const ChatWidgetToggle = ({
  isOpen,
  onToggle,
  unreadCount = 0,
}: ChatWidgetToggleProps) => (
  <button
    type="button"
    className="relative flex justify-center items-center size-12 text-sm font-medium rounded-full border border-transparent bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:bg-primary/90"
    onClick={onToggle}
  >
    {isOpen ? (
      <ChevronDownIcon className="size-5" />
    ) : (
      <ChatIcon className="size-5" />
    )}

    {unreadCount > 0 && !isOpen && (
      <span className="absolute -top-1 -right-1 size-5 flex items-center justify-center bg-destructive text-destructive-foreground text-xs font-bold rounded-full">
        {unreadCount > 9 ? "9+" : unreadCount}
      </span>
    )}
  </button>
);

// ============================================
// WelcomeView Component
// ============================================

interface WelcomeViewProps {
  welcomeTitle: string;
  welcomeSubtitle: string;
  agents: ChatUser[];
  conversations: Conversation[];
  helpArticles: HelpArticle[];
  showSearch: boolean;
  onStartConversation: (agentId?: string) => void;
  onViewConversations: () => void;
  onViewHelp: () => void;
  onSelectHelpArticle?: (id: string) => void;
}

const WelcomeView = ({
  welcomeTitle,
  welcomeSubtitle,
  agents,
  conversations,
  helpArticles,
  showSearch,
  onStartConversation,
  onViewConversations,
  onViewHelp,
  onSelectHelpArticle,
}: WelcomeViewProps) => (
  <div className="h-full overflow-y-auto p-4">
    {/* Welcome Message */}
    <div className="text-center mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-1">
        {welcomeTitle}
      </h3>
      <p className="text-sm text-muted-foreground">{welcomeSubtitle}</p>
    </div>

    {/* Search */}
    {showSearch && (
      <div className="relative mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search for help..."
          className="w-full h-10 pl-9 pr-4 text-sm bg-muted border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    )}

    {/* Start New Conversation */}
    <div className="mb-4">
      <Button
        variant="primary"
        className="w-full"
        onClick={() => onStartConversation()}
      >
        Start a conversation
      </Button>
    </div>

    {/* Available Agents */}
    {agents.length > 0 && (
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">Our team</p>
        <div className="flex -space-x-2">
          {agents.slice(0, 5).map((agent) => (
            <Avatar
              key={agent.id}
              src={agent.avatar}
              name={agent.name}
              size="sm"
              className="ring-2 ring-card cursor-pointer hover:z-10"
              onClick={() => onStartConversation(agent.id)}
            />
          ))}
          {agents.length > 5 && (
            <div className="size-8 flex items-center justify-center bg-muted text-muted-foreground text-xs font-medium rounded-full ring-2 ring-card">
              +{agents.length - 5}
            </div>
          )}
        </div>
      </div>
    )}

    {/* Recent Conversations */}
    {conversations.length > 0 && (
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-muted-foreground">Recent conversations</p>
          <Button variant="ghost" size="sm" onClick={onViewConversations}>
            View all
          </Button>
        </div>
        <div className="space-y-2">
          {conversations.slice(0, 3).map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              onClick={() => onStartConversation()}
            />
          ))}
        </div>
      </div>
    )}

    {/* Help Articles */}
    {helpArticles.length > 0 && (
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-muted-foreground">Help articles</p>
          <Button variant="ghost" size="sm" onClick={onViewHelp}>
            View all
          </Button>
        </div>
        <div className="space-y-2">
          {helpArticles.slice(0, 3).map((article) => (
            <HelpArticleItem
              key={article.id}
              article={article}
              onClick={() => onSelectHelpArticle?.(article.id)}
            />
          ))}
        </div>
      </div>
    )}
  </div>
);

// ============================================
// ConversationView Component
// ============================================

interface ConversationViewProps {
  messages: MessageData[];
  typingUsers: ChatUser[];
}

const ConversationView = ({ messages, typingUsers }: ConversationViewProps) => (
  <div className="h-full overflow-y-auto p-4">
    <MessageGroup
      messages={messages}
      showDivider={true}
      showAvatar={true}
      showName={true}
      showStatus={true}
      showActions={false}
    />

    {typingUsers.length > 0 && (
      <div className="mt-4">
        <TypingIndicator users={typingUsers} />
      </div>
    )}
  </div>
);

// ============================================
// ConversationsListView Component
// ============================================

interface ConversationsListViewProps {
  conversations: Conversation[];
  onSelect: (id: string) => void;
}

const ConversationsListView = ({
  conversations,
  onSelect,
}: ConversationsListViewProps) => (
  <div className="h-full overflow-y-auto">
    {conversations.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <p className="text-sm text-muted-foreground">No conversations yet</p>
      </div>
    ) : (
      <div className="divide-y divide-border">
        {conversations.map((conv) => (
          <ConversationItem
            key={conv.id}
            conversation={conv}
            onClick={() => onSelect(conv.id)}
            showUnread
          />
        ))}
      </div>
    )}
  </div>
);

// ============================================
// HelpView Component
// ============================================

interface HelpViewProps {
  articles: HelpArticle[];
  onSelect?: (id: string) => void;
}

const HelpView = ({ articles, onSelect }: HelpViewProps) => (
  <div className="h-full overflow-y-auto p-4">
    {articles.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">No articles available</p>
      </div>
    ) : (
      <div className="space-y-2">
        {articles.map((article) => (
          <HelpArticleItem
            key={article.id}
            article={article}
            onClick={() => onSelect?.(article.id)}
          />
        ))}
      </div>
    )}
  </div>
);

// ============================================
// Helper Components
// ============================================

interface ConversationItemProps {
  conversation: Conversation;
  onClick: () => void;
  showUnread?: boolean;
}

const ConversationItem = ({
  conversation,
  onClick,
  showUnread = false,
}: ConversationItemProps) => (
  <button
    type="button"
    className="w-full p-3 flex items-start gap-x-3 text-left hover:bg-muted/50 transition-colors"
    onClick={onClick}
  >
    <Avatar
      src={conversation.user.avatar}
      name={conversation.user.name}
      size="sm"
      status={conversation.user.status}
    />
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-x-2">
        <span className="text-sm font-medium truncate">
          {conversation.user.name}
        </span>
        {conversation.lastMessageTime && (
          <span className="text-xs text-muted-foreground shrink-0">
            {conversation.lastMessageTime}
          </span>
        )}
      </div>
      {conversation.lastMessage && (
        <p className="text-xs text-muted-foreground truncate">
          {conversation.lastMessage}
        </p>
      )}
    </div>
    {showUnread && conversation.unreadCount && conversation.unreadCount > 0 && (
      <Badge variant="default" className="shrink-0">
        {conversation.unreadCount}
      </Badge>
    )}
  </button>
);

interface HelpArticleItemProps {
  article: HelpArticle;
  onClick: () => void;
}

const HelpArticleItem = ({ article, onClick }: HelpArticleItemProps) => (
  <button
    type="button"
    className="w-full p-3 flex items-start gap-x-3 text-left bg-muted/50 hover:bg-muted rounded-lg transition-colors"
    onClick={onClick}
  >
    <div className="size-8 flex items-center justify-center bg-primary/10 text-primary rounded-lg shrink-0">
      {article.icon || <QuestionIcon className="size-4" />}
    </div>
    <div className="flex-1 min-w-0">
      <span className="text-sm font-medium block truncate">
        {article.title}
      </span>
      {article.description && (
        <p className="text-xs text-muted-foreground truncate">
          {article.description}
        </p>
      )}
    </div>
  </button>
);

// ============================================
// Helper Functions & Icons
// ============================================

const getStatusText = (status?: string): string => {
  switch (status) {
    case "online":
      return "Online";
    case "offline":
      return "Offline";
    case "away":
      return "Away";
    case "busy":
      return "Busy";
    default:
      return "Available";
  }
};

const ChatIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    role="img"
    aria-label="Chat"
  >
    <path d="M14 0a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
  </svg>
);
