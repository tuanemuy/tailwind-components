"use client";

import { type ReactNode, useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "@/components/molecules/Dropdown";
import {
  InfoIcon,
  MoreVerticalIcon,
  PhoneIcon,
  PlusIcon,
  SearchIcon,
  UsersIcon,
  VideoIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";
import { ComposeThread } from "../ComposeThread";
import {
  type MessageData,
  MessageGroup,
  TypingIndicator,
} from "../MessageBubble";

// ============================================
// Types
// ============================================

export interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  status?: "online" | "offline" | "away" | "busy";
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isTyping?: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  avatar?: string;
  type: "direct" | "group" | "channel";
  members?: number;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isPinned?: boolean;
}

// ============================================
// ChatLayout Component
// ============================================

export interface ChatLayoutProps {
  contacts?: ChatContact[];
  rooms?: ChatRoom[];
  selectedId?: string;
  messages?: MessageData[];
  selectedContact?: ChatContact;
  typingUsers?: Array<{ name: string; avatar?: string }>;
  showSidebar?: boolean;
  sidebarWidth?: "narrow" | "default" | "wide";
  showHeader?: boolean;
  showInfo?: boolean;
  onSelectContact?: (id: string) => void;
  onSelectRoom?: (id: string) => void;
  onSendMessage?: (message: string) => void;
  onSearch?: (query: string) => void;
  onNewChat?: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  onToggleInfo?: () => void;
  header?: ReactNode;
  sidebar?: ReactNode;
  infoPanel?: ReactNode;
  className?: string;
}

export const ChatLayout = ({
  contacts = [],
  rooms = [],
  selectedId,
  messages = [],
  selectedContact,
  typingUsers = [],
  showSidebar = true,
  sidebarWidth = "default",
  showHeader = true,
  showInfo = false,
  onSelectContact,
  onSelectRoom,
  onSendMessage,
  onSearch,
  onNewChat,
  onCall,
  onVideoCall,
  onToggleInfo,
  header,
  sidebar,
  infoPanel,
  className,
}: ChatLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sidebarWidthClass = {
    narrow: "w-64",
    default: "w-80",
    wide: "w-96",
  }[sidebarWidth];

  return (
    <div className={cn("flex h-full bg-background", className)}>
      {/* Sidebar */}
      {showSidebar && (
        <div
          className={cn(
            "flex flex-col border-r border-border bg-card",
            sidebarWidthClass,
          )}
        >
          {sidebar || (
            <ChatSidebar
              contacts={filteredContacts}
              rooms={filteredRooms}
              selectedId={selectedId}
              searchQuery={searchQuery}
              onSearchChange={(q) => {
                setSearchQuery(q);
                onSearch?.(q);
              }}
              onSelectContact={onSelectContact}
              onSelectRoom={onSelectRoom}
              onNewChat={onNewChat}
            />
          )}
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        {showHeader && (
          <div className="border-b border-border">
            {header || (
              <ChatHeader
                contact={selectedContact}
                onCall={onCall}
                onVideoCall={onVideoCall}
                onToggleInfo={onToggleInfo}
              />
            )}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedContact || selectedId ? (
            <>
              <MessageGroup
                messages={messages}
                showDivider={true}
                showAvatar={true}
                showName={true}
                showStatus={true}
              />
              {typingUsers.length > 0 && (
                <div className="mt-4">
                  <TypingIndicator users={typingUsers} />
                </div>
              )}
            </>
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Input */}
        {(selectedContact || selectedId) && (
          <div className="border-t border-border">
            <ComposeThread
              placeholder={`Message ${selectedContact?.name || ""}...`}
              onSend={(message) => onSendMessage?.(message)}
              className="border-0 rounded-none"
            />
          </div>
        )}
      </div>

      {/* Info Panel */}
      {showInfo && infoPanel && (
        <div className="w-80 border-l border-border bg-card overflow-y-auto">
          {infoPanel}
        </div>
      )}
    </div>
  );
};

// ============================================
// ChatSidebar Component
// ============================================

interface ChatSidebarProps {
  contacts: ChatContact[];
  rooms: ChatRoom[];
  selectedId?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectContact?: (id: string) => void;
  onSelectRoom?: (id: string) => void;
  onNewChat?: () => void;
}

const ChatSidebar = ({
  contacts,
  rooms,
  selectedId,
  searchQuery,
  onSearchChange,
  onSelectContact,
  onSelectRoom,
  onNewChat,
}: ChatSidebarProps) => (
  <>
    {/* Header */}
    <div className="p-4 border-b border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Messages</h2>
        {onNewChat && (
          <Button
            variant="ghost"
            size="sm"
            className="size-8 p-0"
            onClick={onNewChat}
          >
            <PlusIcon className="size-4" />
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>

    {/* Contacts / Rooms List */}
    <div className="flex-1 overflow-y-auto">
      {/* Direct Messages */}
      {contacts.length > 0 && (
        <div>
          <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase">
            Direct Messages
          </p>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              isSelected={selectedId === contact.id}
              onClick={() => onSelectContact?.(contact.id)}
            />
          ))}
        </div>
      )}

      {/* Rooms / Channels */}
      {rooms.length > 0 && (
        <div className="mt-4">
          <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase">
            Channels
          </p>
          {rooms.map((room) => (
            <RoomItem
              key={room.id}
              room={room}
              isSelected={selectedId === room.id}
              onClick={() => onSelectRoom?.(room.id)}
            />
          ))}
        </div>
      )}

      {contacts.length === 0 && rooms.length === 0 && (
        <div className="p-4 text-center text-sm text-muted-foreground">
          No conversations found
        </div>
      )}
    </div>
  </>
);

// ============================================
// ChatHeader Component
// ============================================

interface ChatHeaderProps {
  contact?: ChatContact;
  onCall?: () => void;
  onVideoCall?: () => void;
  onToggleInfo?: () => void;
}

const ChatHeader = ({
  contact,
  onCall,
  onVideoCall,
  onToggleInfo,
}: ChatHeaderProps) => (
  <div className="h-16 px-4 flex items-center justify-between">
    {contact ? (
      <>
        <div className="flex items-center gap-x-3">
          <Avatar
            src={contact.avatar}
            name={contact.name}
            size="sm"
            status={contact.status}
          />
          <div>
            <h3 className="text-sm font-semibold">{contact.name}</h3>
            <p className="text-xs text-muted-foreground">
              {contact.isTyping
                ? "Typing..."
                : contact.status === "online"
                  ? "Online"
                  : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-x-1">
          {onCall && (
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0"
              onClick={onCall}
            >
              <PhoneIcon className="size-4" />
            </Button>
          )}
          {onVideoCall && (
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0"
              onClick={onVideoCall}
            >
              <VideoIcon className="size-4" />
            </Button>
          )}
          {onToggleInfo && (
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0"
              onClick={onToggleInfo}
            >
              <InfoIcon className="size-4" />
            </Button>
          )}
          <Dropdown
            trigger={
              <Button variant="ghost" size="sm" className="size-8 p-0">
                <MoreVerticalIcon className="size-4" />
              </Button>
            }
            align="end"
          >
            <DropdownItem>View profile</DropdownItem>
            <DropdownItem>Mute notifications</DropdownItem>
            <DropdownItem>Search in conversation</DropdownItem>
            <DropdownDivider />
            <DropdownItem variant="destructive">Block user</DropdownItem>
          </Dropdown>
        </div>
      </>
    ) : (
      <div className="flex items-center gap-x-3">
        <p className="text-sm text-muted-foreground">
          Select a conversation to start chatting
        </p>
      </div>
    )}
  </div>
);

// ============================================
// Helper Components
// ============================================

interface ContactItemProps {
  contact: ChatContact;
  isSelected: boolean;
  onClick: () => void;
}

const ContactItem = ({ contact, isSelected, onClick }: ContactItemProps) => (
  <button
    type="button"
    className={cn(
      "w-full p-3 flex items-center gap-x-3 text-left hover:bg-muted/50 transition-colors",
      isSelected && "bg-muted",
    )}
    onClick={onClick}
  >
    <Avatar
      src={contact.avatar}
      name={contact.name}
      size="sm"
      status={contact.status}
    />
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-x-2">
        <span className="text-sm font-medium truncate">{contact.name}</span>
        {contact.lastMessageTime && (
          <span className="text-xs text-muted-foreground shrink-0">
            {contact.lastMessageTime}
          </span>
        )}
      </div>
      {contact.lastMessage && (
        <p className="text-xs text-muted-foreground truncate">
          {contact.isTyping ? "Typing..." : contact.lastMessage}
        </p>
      )}
    </div>
    {contact.unreadCount && contact.unreadCount > 0 && (
      <Badge variant="default" size="sm" className="shrink-0">
        {contact.unreadCount}
      </Badge>
    )}
  </button>
);

interface RoomItemProps {
  room: ChatRoom;
  isSelected: boolean;
  onClick: () => void;
}

const RoomItem = ({ room, isSelected, onClick }: RoomItemProps) => (
  <button
    type="button"
    className={cn(
      "w-full p-3 flex items-center gap-x-3 text-left hover:bg-muted/50 transition-colors",
      isSelected && "bg-muted",
    )}
    onClick={onClick}
  >
    {room.avatar ? (
      <Avatar src={room.avatar} name={room.name} size="sm" />
    ) : (
      <div className="size-8 flex items-center justify-center bg-muted rounded-lg">
        <span className="text-xs font-medium">#</span>
      </div>
    )}
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-x-2">
        <span className="text-sm font-medium truncate">{room.name}</span>
        {room.lastMessageTime && (
          <span className="text-xs text-muted-foreground shrink-0">
            {room.lastMessageTime}
          </span>
        )}
      </div>
      {room.lastMessage && (
        <p className="text-xs text-muted-foreground truncate">
          {room.lastMessage}
        </p>
      )}
    </div>
    {room.unreadCount && room.unreadCount > 0 && (
      <Badge variant="default" size="sm" className="shrink-0">
        {room.unreadCount}
      </Badge>
    )}
  </button>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="size-16 flex items-center justify-center bg-muted rounded-full mb-4">
      <UsersIcon className="size-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-1">No conversation selected</h3>
    <p className="text-sm text-muted-foreground text-center max-w-sm">
      Select a conversation from the sidebar or start a new chat to begin
      messaging.
    </p>
  </div>
);

// ============================================
// ChatInfoPanel Component
// ============================================

export interface ChatInfoPanelProps {
  contact?: ChatContact;
  sharedFiles?: Array<{
    id: string;
    name: string;
    size: string;
    type: string;
  }>;
  sharedMedia?: string[];
  onClose?: () => void;
  className?: string;
}

export const ChatInfoPanel = ({
  contact,
  sharedFiles = [],
  sharedMedia = [],
  onClose: _onClose,
  className,
}: ChatInfoPanelProps) => {
  if (!contact) return null;

  return (
    <div className={cn("p-4", className)}>
      {/* Profile */}
      <div className="text-center mb-6">
        <Avatar
          src={contact.avatar}
          name={contact.name}
          size="xl"
          className="mx-auto mb-3"
        />
        <h3 className="text-lg font-semibold">{contact.name}</h3>
        <p className="text-sm text-muted-foreground">
          {contact.status === "online" ? "Active now" : "Offline"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-x-4 mb-6">
        <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
          <PhoneIcon className="size-5 mb-1" />
          <span className="text-xs">Call</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
          <VideoIcon className="size-5 mb-1" />
          <span className="text-xs">Video</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
          <SearchIcon className="size-5 mb-1" />
          <span className="text-xs">Search</span>
        </Button>
      </div>

      {/* Shared Media */}
      {sharedMedia.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Shared Media</h4>
          <div className="grid grid-cols-3 gap-1">
            {sharedMedia.slice(0, 9).map((src, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: Media URLs may not be unique
                key={index}
                className="aspect-square rounded overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Shared media ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {sharedMedia.length > 9 && (
            <Button variant="ghost" size="sm" className="w-full mt-2">
              View all ({sharedMedia.length})
            </Button>
          )}
        </div>
      )}

      {/* Shared Files */}
      {sharedFiles.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Shared Files</h4>
          <div className="space-y-2">
            {sharedFiles.slice(0, 5).map((file) => (
              <div
                key={file.id}
                className="p-2 flex items-center gap-x-2 bg-muted rounded-lg"
              >
                <div className="size-8 flex items-center justify-center bg-primary/10 rounded">
                  <span className="text-xs font-medium text-primary">
                    {file.type.toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                </div>
              </div>
            ))}
          </div>
          {sharedFiles.length > 5 && (
            <Button variant="ghost" size="sm" className="w-full mt-2">
              View all ({sharedFiles.length})
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
