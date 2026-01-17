"use client";

import { type ReactNode, useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "@/components/molecules/Dropdown";
import {
  ArchiveIcon,
  FileIcon,
  ForwardIcon,
  MailIcon,
  MoreVerticalIcon,
  PrinterIcon,
  ReplyIcon,
  StarIcon,
  TrashIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// ============================================
// Types
// ============================================

export interface EmailAttachment {
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface EmailData {
  id: string;
  from: {
    name: string;
    email: string;
    avatar?: string;
  };
  to: Array<{
    name: string;
    email: string;
    avatar?: string;
  }>;
  cc?: Array<{
    name: string;
    email: string;
  }>;
  subject: string;
  preview: string;
  content: string;
  date: string;
  isRead?: boolean;
  isStarred?: boolean;
  attachments?: EmailAttachment[];
  labels?: string[];
}

// ============================================
// InboxThread Component
// ============================================

export interface InboxThreadProps {
  email: EmailData;
  defaultExpanded?: boolean;
  showActions?: boolean;
  onReply?: (id: string) => void;
  onReplyAll?: (id: string) => void;
  onForward?: (id: string) => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onMarkRead?: (id: string, isRead: boolean) => void;
  onStar?: (id: string, isStarred: boolean) => void;
  onPrint?: (id: string) => void;
  className?: string;
}

export const InboxThread = ({
  email,
  defaultExpanded = false,
  showActions = true,
  onReply,
  onReplyAll,
  onForward,
  onDelete,
  onArchive,
  onMarkRead,
  onStar: _onStar,
  onPrint,
  className,
}: InboxThreadProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className={cn("bg-card rounded-2xl shadow-xs dark:bg-card", className)}
    >
      {/* Header */}
      <div className="relative">
        <button
          type="button"
          className="py-3 ps-4 pe-14 w-full inline-flex items-center gap-x-2 truncate cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="w-full flex gap-x-3.5 truncate">
            {/* Sender Avatar */}
            <Avatar
              src={email.from.avatar}
              name={email.from.name}
              size="sm"
              className="mt-1"
            />

            {/* Content */}
            <div className="grow truncate flex flex-col">
              {/* Sender Name */}
              <div className="truncate leading-4">
                <span className="text-sm font-semibold text-foreground">
                  {email.from.name}
                </span>
              </div>

              {/* Recipient (when expanded) */}
              {isExpanded && email.to.length > 0 && (
                <div className="leading-4 truncate">
                  <span className="text-sm text-foreground">To: </span>
                  <span className="text-sm text-muted-foreground truncate">
                    {email.to.map((r) => r.name).join(", ")}
                  </span>
                </div>
              )}

              {/* CC (when expanded) */}
              {isExpanded && email.cc && email.cc.length > 0 && (
                <div className="leading-4 truncate">
                  <span className="text-sm text-foreground">Cc: </span>
                  <span className="text-sm text-muted-foreground truncate">
                    {email.cc.map((c) => c.name).join(", ")}
                  </span>
                </div>
              )}

              {/* Date (when expanded) */}
              {isExpanded && (
                <div className="sm:hidden leading-4 truncate">
                  <span className="text-sm text-foreground">Date: </span>
                  <span className="text-sm text-muted-foreground">
                    {email.date}
                  </span>
                </div>
              )}

              {/* Preview (when collapsed) */}
              {!isExpanded && (
                <p className="truncate text-sm text-muted-foreground">
                  {email.preview}
                </p>
              )}
            </div>

            {/* Date */}
            <div className="self-center">
              {!isExpanded && (
                <span className="text-xs text-muted-foreground">
                  {email.date.split(" ")[0]}
                </span>
              )}
              {isExpanded && (
                <span className="hidden sm:inline-block text-xs text-muted-foreground">
                  {email.date}
                </span>
              )}
            </div>
          </div>
        </button>

        {/* Actions */}
        {showActions && (
          <div className="absolute top-1/2 end-4 z-7 -translate-y-1/2">
            <Dropdown
              trigger={
                <Button variant="ghost" size="sm" className="size-8 p-0">
                  <MoreVerticalIcon className="size-4" />
                </Button>
              }
              align="end"
            >
              <DropdownItem
                icon={<ReplyIcon className="size-3.5" />}
                onClick={() => onReply?.(email.id)}
              >
                Reply
              </DropdownItem>
              <DropdownItem
                icon={<ReplyAllIcon className="size-3.5" />}
                onClick={() => onReplyAll?.(email.id)}
              >
                Reply all
              </DropdownItem>
              <DropdownItem
                icon={<ForwardIcon className="size-3.5" />}
                onClick={() => onForward?.(email.id)}
              >
                Forward
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem
                icon={<MailIcon className="size-3.5" />}
                onClick={() => onMarkRead?.(email.id, !email.isRead)}
              >
                Mark as {email.isRead ? "unread" : "read"}
              </DropdownItem>
              <DropdownItem
                icon={<ArchiveIcon className="size-3.5" />}
                onClick={() => onArchive?.(email.id)}
              >
                Archive
              </DropdownItem>
              <DropdownItem
                icon={<TrashIcon className="size-3.5" />}
                onClick={() => onDelete?.(email.id)}
                variant="destructive"
              >
                Delete
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem
                icon={<PrinterIcon className="size-3.5" />}
                onClick={() => onPrint?.(email.id)}
              >
                Print
              </DropdownItem>
            </Dropdown>
          </div>
        )}
      </div>

      {/* Content (expanded) */}
      {isExpanded && (
        <div className="p-4 border-t border-border">
          {/* Email Content */}
          <div
            className="text-sm text-foreground prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: email.content }}
          />

          {/* Attachments */}
          {email.attachments && email.attachments.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">
                Attachments ({email.attachments.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {email.attachments.map((attachment) => (
                  <AttachmentItem
                    key={attachment.name}
                    attachment={attachment}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================
// Helper Components
// ============================================

const ReplyAllIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="7 17 2 12 7 7" />
    <polyline points="12 17 7 12 12 7" />
    <path d="M22 18v-2a4 4 0 0 0-4-4H7" />
  </svg>
);

const AttachmentItem = ({ attachment }: { attachment: EmailAttachment }) => (
  <a
    href={attachment.url}
    download={attachment.name}
    className="flex items-center gap-x-2 p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
  >
    <FileIcon className="size-4 text-muted-foreground" />
    <div className="min-w-0">
      <p className="text-xs font-medium truncate">{attachment.name}</p>
      <p className="text-[10px] text-muted-foreground">{attachment.size}</p>
    </div>
  </a>
);

// ============================================
// InboxThreadList Component
// ============================================

export interface InboxThreadListProps {
  emails: EmailData[];
  selectedIds?: string[];
  onSelect?: (ids: string[]) => void;
  onReply?: (id: string) => void;
  onReplyAll?: (id: string) => void;
  onForward?: (id: string) => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onMarkRead?: (id: string, isRead: boolean) => void;
  onStar?: (id: string, isStarred: boolean) => void;
  className?: string;
}

export const InboxThreadList = ({
  emails,
  selectedIds: _selectedIds = [],
  onSelect: _onSelect,
  onReply,
  onReplyAll,
  onForward,
  onDelete,
  onArchive,
  onMarkRead,
  onStar,
  className,
}: InboxThreadListProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      {emails.map((email) => (
        <InboxThread
          key={email.id}
          email={email}
          onReply={onReply}
          onReplyAll={onReplyAll}
          onForward={onForward}
          onDelete={onDelete}
          onArchive={onArchive}
          onMarkRead={onMarkRead}
          onStar={onStar}
        />
      ))}
    </div>
  );
};

// ============================================
// CompactInboxItem Component
// ============================================

export interface CompactInboxItemProps {
  email: EmailData;
  isSelected?: boolean;
  onClick?: () => void;
  onStar?: (isStarred: boolean) => void;
  className?: string;
}

export const CompactInboxItem = ({
  email,
  isSelected = false,
  onClick,
  onStar,
  className,
}: CompactInboxItemProps) => {
  return (
    <button
      type="button"
      className={cn(
        "p-3 flex items-start gap-x-3 cursor-pointer transition-colors w-full text-left",
        "hover:bg-muted/50",
        isSelected && "bg-primary/5",
        !email.isRead && "bg-primary/5 font-medium",
        className,
      )}
      onClick={onClick}
    >
      {/* Avatar */}
      <Avatar src={email.from.avatar} name={email.from.name} size="sm" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-x-2">
          <span
            className={cn("text-sm truncate", !email.isRead && "font-semibold")}
          >
            {email.from.name}
          </span>
          <span className="text-xs text-muted-foreground shrink-0">
            {email.date.split(" ")[0]}
          </span>
        </div>
        <p className={cn("text-sm truncate", !email.isRead && "font-semibold")}>
          {email.subject}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {email.preview}
        </p>

        {/* Labels */}
        {email.labels && email.labels.length > 0 && (
          <div className="flex gap-x-1 mt-1">
            {email.labels.map((label) => (
              <Badge key={label} variant="secondary" size="sm">
                {label}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Star */}
      <button
        type="button"
        className="shrink-0 p-1 hover:bg-muted rounded"
        onClick={(e) => {
          e.stopPropagation();
          onStar?.(!email.isStarred);
        }}
      >
        <StarIcon
          className={cn(
            "size-4",
            email.isStarred
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground",
          )}
        />
      </button>
    </button>
  );
};

// ============================================
// InboxSidebar Component
// ============================================

export interface InboxFolder {
  id: string;
  name: string;
  icon?: ReactNode;
  count?: number;
  isActive?: boolean;
}

export interface InboxSidebarProps {
  folders: InboxFolder[];
  onFolderClick?: (id: string) => void;
  onCompose?: () => void;
  className?: string;
}

export const InboxSidebar = ({
  folders,
  onFolderClick,
  onCompose,
  className,
}: InboxSidebarProps) => {
  return (
    <div className={cn("w-64 p-4", className)}>
      {/* Compose Button */}
      {onCompose && (
        <Button variant="primary" className="w-full mb-4" onClick={onCompose}>
          Compose
        </Button>
      )}

      {/* Folders */}
      <nav className="space-y-1">
        {folders.map((folder) => (
          <button
            key={folder.id}
            type="button"
            className={cn(
              "w-full flex items-center justify-between gap-x-2 px-3 py-2 rounded-lg text-sm transition-colors",
              folder.isActive
                ? "bg-primary/10 text-primary"
                : "text-foreground hover:bg-muted",
            )}
            onClick={() => onFolderClick?.(folder.id)}
          >
            <div className="flex items-center gap-x-2">
              {folder.icon}
              <span>{folder.name}</span>
            </div>
            {folder.count !== undefined && folder.count > 0 && (
              <span className="text-xs text-muted-foreground">
                {folder.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};
