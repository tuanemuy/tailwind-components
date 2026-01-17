"use client";

import { useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { Dropdown, DropdownItem } from "@/components/molecules/Dropdown";
import {
  CheckCheckIcon,
  CheckIcon,
  ClockIcon,
  CopyIcon,
  DownloadIcon,
  EditIcon,
  FileIcon,
  ForwardIcon,
  MoreVerticalIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  TrashIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// ============================================
// Types
// ============================================

export type MessageType = "text" | "image" | "file" | "voice" | "link";
export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "error";
export type MessageSender = "self" | "other";

export interface LinkPreview {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
}

export interface FileAttachment {
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface VoiceMessage {
  duration: string;
  waveform?: number[];
}

export interface MessageData {
  id: string;
  type: MessageType;
  content: string;
  timestamp: string;
  sender: MessageSender;
  senderName?: string;
  senderAvatar?: string;
  status?: MessageStatus;
  isEdited?: boolean;
  replyTo?: {
    senderName: string;
    content: string;
  };
  images?: string[];
  file?: FileAttachment;
  voice?: VoiceMessage;
  linkPreview?: LinkPreview;
}

// ============================================
// MessageBubble Component
// ============================================

export interface MessageBubbleProps {
  message: MessageData;
  showAvatar?: boolean;
  showName?: boolean;
  showStatus?: boolean;
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onReply?: (id: string) => void;
  onForward?: (id: string) => void;
  onCopy?: (id: string) => void;
  className?: string;
}

export const MessageBubble = ({
  message,
  showAvatar = true,
  showName = true,
  showStatus = true,
  showActions = true,
  onEdit,
  onDelete,
  onReply,
  onForward,
  onCopy,
  className,
}: MessageBubbleProps) => {
  const isSelf = message.sender === "self";

  const handleAction = (action: string) => {
    switch (action) {
      case "edit":
        onEdit?.(message.id);
        break;
      case "delete":
        onDelete?.(message.id);
        break;
      case "reply":
        onReply?.(message.id);
        break;
      case "forward":
        onForward?.(message.id);
        break;
      case "copy":
        onCopy?.(message.id);
        break;
    }
  };

  return (
    <div
      className={cn(
        "max-w-md flex gap-x-2",
        isSelf && "ms-auto flex-row-reverse",
        className,
      )}
    >
      {/* Avatar */}
      {showAvatar && (
        <div className="shrink-0 mt-auto">
          <Avatar
            src={message.senderAvatar}
            name={message.senderName}
            size="sm"
          />
        </div>
      )}

      {/* Message Content */}
      <div className={cn(isSelf && "text-end")}>
        {/* Sender Name */}
        {showName && message.senderName && (
          <p
            className={cn(
              "mb-1.5 text-xs text-muted-foreground",
              isSelf ? "pe-2.5" : "ps-2.5",
            )}
          >
            {message.senderName}
          </p>
        )}

        {/* Messages */}
        <div className="space-y-1">
          <MessageContent
            message={message}
            showStatus={showStatus}
            showActions={showActions}
            onAction={handleAction}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================
// MessageContent Component
// ============================================

interface MessageContentProps {
  message: MessageData;
  showStatus: boolean;
  showActions: boolean;
  onAction: (action: string) => void;
}

const MessageContent = ({
  message,
  showStatus,
  showActions,
  onAction,
}: MessageContentProps) => {
  const isSelf = message.sender === "self";

  return (
    <div
      className={cn(
        "group flex gap-x-2",
        isSelf ? "justify-end" : "justify-start",
      )}
      style={{ wordBreak: "break-word" }}
    >
      {/* Bubble */}
      <div
        className={cn(
          "inline-block rounded-xl pt-2 pb-1.5 px-2.5",
          isSelf
            ? "order-2 text-start bg-primary/10 dark:bg-primary/20"
            : "order-1 bg-muted",
        )}
      >
        <div className="text-sm text-foreground">
          {/* Reply Quote */}
          {message.replyTo && (
            <ReplyQuote
              senderName={message.replyTo.senderName}
              content={message.replyTo.content}
            />
          )}

          {/* Content based on type */}
          {message.type === "text" && <TextContent content={message.content} />}
          {message.type === "image" && (
            <ImageContent images={message.images} caption={message.content} />
          )}
          {message.type === "file" && message.file && (
            <FileContent file={message.file} />
          )}
          {message.type === "voice" && message.voice && (
            <VoiceContent voice={message.voice} />
          )}
          {message.type === "link" && (
            <LinkContent
              content={message.content}
              preview={message.linkPreview}
            />
          )}

          {/* Timestamp and Status */}
          <MessageFooter
            timestamp={message.timestamp}
            status={message.status}
            isEdited={message.isEdited}
            showStatus={showStatus && isSelf}
          />
        </div>
      </div>

      {/* Actions Dropdown */}
      {showActions && (
        <div
          className={cn(
            "lg:opacity-0 lg:group-hover:opacity-100 transition-opacity",
            isSelf ? "order-1" : "order-2",
          )}
        >
          <Dropdown
            trigger={
              <Button variant="ghost" size="sm" className="size-8 p-0">
                <MoreVerticalIcon className="size-4" />
              </Button>
            }
            align={isSelf ? "end" : "start"}
          >
            <DropdownItem
              icon={<ReplyIcon className="size-3.5" />}
              onClick={() => onAction("reply")}
            >
              Reply
            </DropdownItem>
            <DropdownItem
              icon={<ForwardIcon className="size-3.5" />}
              onClick={() => onAction("forward")}
            >
              Forward
            </DropdownItem>
            <DropdownItem
              icon={<CopyIcon className="size-3.5" />}
              onClick={() => onAction("copy")}
            >
              Copy
            </DropdownItem>
            {isSelf && (
              <>
                <DropdownItem
                  icon={<EditIcon className="size-3.5" />}
                  onClick={() => onAction("edit")}
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  icon={<TrashIcon className="size-3.5" />}
                  onClick={() => onAction("delete")}
                  variant="destructive"
                >
                  Delete
                </DropdownItem>
              </>
            )}
          </Dropdown>
        </div>
      )}
    </div>
  );
};

// ============================================
// Sub Components
// ============================================

const ReplyQuote = ({
  senderName,
  content,
}: {
  senderName: string;
  content: string;
}) => (
  <div className="mb-2 py-1 ps-2.5 pe-1.5 relative cursor-default bg-muted/50 dark:bg-muted/30 rounded-lg overflow-hidden before:absolute before:inset-y-0 before:start-0 before:w-[3px] before:h-full before:bg-primary">
    <blockquote>
      <p className="font-medium text-[13px] text-primary">{senderName}</p>
      <p className="text-[13px] text-foreground line-clamp-2">{content}</p>
    </blockquote>
  </div>
);

const TextContent = ({ content }: { content: string }) => <>{content}</>;

const ImageContent = ({
  images,
  caption,
}: {
  images?: string[];
  caption?: string;
}) => (
  <div>
    {images && images.length > 0 && (
      <div
        className={cn(
          "grid gap-1 mb-2",
          images.length === 1 && "grid-cols-1",
          images.length === 2 && "grid-cols-2",
          images.length >= 3 && "grid-cols-2",
        )}
      >
        {images.slice(0, 4).map((src, index) => (
          <div
            key={src}
            className={cn(
              "relative rounded-lg overflow-hidden",
              images.length === 3 && index === 0 && "col-span-2",
            )}
          >
            <img
              src={src}
              alt={`Attachment ${index + 1}`}
              className="w-full h-auto object-cover"
            />
            {images.length > 4 && index === 3 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  +{images.length - 4}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    )}
    {caption && <span>{caption}</span>}
  </div>
);

const FileContent = ({ file }: { file: FileAttachment }) => (
  <a
    href={file.url}
    download={file.name}
    className="flex items-center gap-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
  >
    <div className="flex items-center justify-center size-10 bg-primary/10 rounded-lg">
      <FileIcon className="size-5 text-primary" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium truncate">{file.name}</p>
      <p className="text-xs text-muted-foreground">
        {file.type} • {file.size}
      </p>
    </div>
    <DownloadIcon className="size-4 text-muted-foreground" />
  </a>
);

const VoiceContent = ({ voice }: { voice: VoiceMessage }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex items-center gap-x-3 min-w-48">
      <Button
        variant="ghost"
        size="sm"
        className="size-8 p-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? (
          <PauseIcon className="size-4" />
        ) : (
          <PlayIcon className="size-4" />
        )}
      </Button>

      {/* Waveform */}
      <div className="flex-1 flex items-center gap-0.5 h-8">
        {(voice.waveform || Array(30).fill(0.5)).map((height, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: Waveform bars are positional visual elements without unique identifiers
            key={`waveform-${index}`}
            className="w-1 bg-primary/40 rounded-full"
            style={{
              height: `${Math.max(20, (height || Math.random()) * 100)}%`,
            }}
          />
        ))}
      </div>

      <span className="text-xs text-muted-foreground">{voice.duration}</span>
    </div>
  );
};

const LinkContent = ({
  content,
  preview,
}: {
  content: string;
  preview?: LinkPreview;
}) => (
  <div>
    <span>{content}</span>
    {preview && (
      <a
        href={preview.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block mt-3 mb-1"
      >
        <span className="text-primary underline break-all">{preview.url}</span>
        <div className="p-2 ps-2.5 mt-2 relative cursor-pointer bg-primary/5 rounded-lg overflow-hidden before:absolute before:inset-y-0 before:start-0 before:w-[3px] before:h-full before:bg-primary">
          {preview.siteName && (
            <p className="font-medium text-xs text-primary">
              {preview.siteName}
            </p>
          )}
          {preview.title && (
            <p className="font-semibold text-xs text-foreground">
              {preview.title}
            </p>
          )}
          {preview.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {preview.description}
            </p>
          )}
          {preview.image && (
            <img
              src={preview.image}
              alt={preview.title || "Link preview"}
              className="mt-1 rounded-md w-full"
            />
          )}
        </div>
      </a>
    )}
  </div>
);

const MessageFooter = ({
  timestamp,
  status,
  isEdited,
  showStatus,
}: {
  timestamp: string;
  status?: MessageStatus;
  isEdited?: boolean;
  showStatus: boolean;
}) => (
  <span className="inline-flex items-center gap-x-1 ms-1">
    {isEdited && (
      <span className="text-[11px] text-muted-foreground italic">edited</span>
    )}
    <span className="text-[11px] text-muted-foreground italic">
      {timestamp}
    </span>
    {showStatus && status && <StatusIcon status={status} />}
  </span>
);

const StatusIcon = ({ status }: { status: MessageStatus }) => {
  switch (status) {
    case "sending":
      return (
        <ClockIcon className="size-4 text-muted-foreground animate-pulse" />
      );
    case "sent":
      return <CheckIcon className="size-4 text-muted-foreground" />;
    case "delivered":
      return <CheckCheckIcon className="size-4 text-muted-foreground" />;
    case "read":
      return <CheckCheckIcon className="size-4 text-primary" />;
    case "error":
      return <span className="text-destructive text-xs">!</span>;
    default:
      return null;
  }
};

// ============================================
// MessageGroup Component
// ============================================

export interface MessageGroupProps {
  messages: MessageData[];
  showDivider?: boolean;
  dividerText?: string;
  showAvatar?: boolean;
  showName?: boolean;
  showStatus?: boolean;
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onReply?: (id: string) => void;
  onForward?: (id: string) => void;
  onCopy?: (id: string) => void;
  className?: string;
}

export const MessageGroup = ({
  messages,
  showDivider = false,
  dividerText = "Today",
  showAvatar = true,
  showName = true,
  showStatus = true,
  showActions = true,
  onEdit,
  onDelete,
  onReply,
  onForward,
  onCopy,
  className,
}: MessageGroupProps) => {
  return (
    <div className={cn("space-y-5", className)}>
      {/* Time Divider */}
      {showDivider && (
        <div className="sticky top-0 inset-x-0 z-8 max-w-lg mx-auto text-center">
          <span className="py-0.5 px-1.5 bg-muted text-xs text-muted-foreground rounded-full">
            {dividerText}
          </span>
        </div>
      )}

      {/* Messages */}
      {messages.map((message, index) => {
        const prevMessage = messages[index - 1];
        const isSameSender = prevMessage?.sender === message.sender;

        return (
          <MessageBubble
            key={message.id}
            message={message}
            showAvatar={showAvatar && !isSameSender}
            showName={showName && !isSameSender}
            showStatus={showStatus}
            showActions={showActions}
            onEdit={onEdit}
            onDelete={onDelete}
            onReply={onReply}
            onForward={onForward}
            onCopy={onCopy}
          />
        );
      })}
    </div>
  );
};

// ============================================
// TypingIndicator Component
// ============================================

export interface TypingIndicatorProps {
  users: Array<{
    name: string;
    avatar?: string;
  }>;
  className?: string;
}

export const TypingIndicator = ({ users, className }: TypingIndicatorProps) => {
  if (users.length === 0) return null;

  const displayText =
    users.length === 1
      ? `${users[0].name} is typing...`
      : users.length === 2
        ? `${users[0].name} and ${users[1].name} are typing...`
        : `${users[0].name} and ${users.length - 1} others are typing...`;

  return (
    <div className={cn("flex items-center gap-x-2 max-w-md", className)}>
      {users[0].avatar && (
        <Avatar src={users[0].avatar} name={users[0].name} size="sm" />
      )}
      <div className="inline-flex items-center gap-x-2 bg-muted rounded-xl py-2 px-3">
        <div className="flex gap-x-1">
          <span className="size-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="size-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="size-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
        <span className="text-xs text-muted-foreground">{displayText}</span>
      </div>
    </div>
  );
};
