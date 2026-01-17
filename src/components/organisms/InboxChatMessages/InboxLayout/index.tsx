"use client";

import { type ReactNode, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Input } from "@/components/atoms/Input";
import {
  AlertTriangleIcon,
  ArchiveIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileIcon,
  FilterIcon,
  MailIcon,
  RefreshIcon,
  SearchIcon,
  SendIcon,
  StarIcon,
  TrashIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";
import { EmailCompose } from "../ComposeThread";
import {
  CompactInboxItem,
  type EmailData,
  type InboxFolder,
  InboxSidebar,
  InboxThread,
} from "../InboxThread";

// ============================================
// Types
// ============================================

export interface InboxStats {
  inbox: number;
  sent: number;
  drafts: number;
  spam: number;
  trash: number;
  starred: number;
}

// ============================================
// InboxLayout Component
// ============================================

export interface InboxLayoutProps {
  emails?: EmailData[];
  selectedEmail?: EmailData;
  folders?: InboxFolder[];
  activeFolder?: string;
  stats?: InboxStats;
  showSidebar?: boolean;
  showPreview?: boolean;
  showCompose?: boolean;
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onSelectEmail?: (id: string) => void;
  onSelectFolder?: (id: string) => void;
  onCompose?: () => void;
  onCloseCompose?: () => void;
  onSendEmail?: (data: Record<string, unknown>) => void;
  onRefresh?: () => void;
  onSearch?: (query: string) => void;
  onPageChange?: (page: number) => void;
  onBulkAction?: (action: string, ids: string[]) => void;
  header?: ReactNode;
  sidebar?: ReactNode;
  className?: string;
}

export const InboxLayout = ({
  emails = [],
  selectedEmail,
  folders,
  activeFolder = "inbox",
  stats,
  showSidebar = true,
  showPreview = false,
  showCompose = false,
  isLoading = false,
  currentPage = 1,
  totalPages = 1,
  onSelectEmail,
  onSelectFolder,
  onCompose,
  onCloseCompose,
  onSendEmail,
  onRefresh,
  onSearch,
  onPageChange,
  onBulkAction,
  header,
  sidebar,
  className,
}: InboxLayoutProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const defaultFolders: InboxFolder[] = folders || [
    {
      id: "inbox",
      name: "Inbox",
      icon: <MailIcon className="size-4" />,
      count: stats?.inbox || 0,
      isActive: activeFolder === "inbox",
    },
    {
      id: "sent",
      name: "Sent",
      icon: <SendIcon className="size-4" />,
      count: stats?.sent,
      isActive: activeFolder === "sent",
    },
    {
      id: "drafts",
      name: "Drafts",
      icon: <FileIcon className="size-4" />,
      count: stats?.drafts,
      isActive: activeFolder === "drafts",
    },
    {
      id: "starred",
      name: "Starred",
      icon: <StarIcon className="size-4" />,
      count: stats?.starred,
      isActive: activeFolder === "starred",
    },
    {
      id: "spam",
      name: "Spam",
      icon: <AlertTriangleIcon className="size-4" />,
      count: stats?.spam,
      isActive: activeFolder === "spam",
    },
    {
      id: "trash",
      name: "Trash",
      icon: <TrashIcon className="size-4" />,
      count: stats?.trash,
      isActive: activeFolder === "trash",
    },
  ];

  const handleSelectAll = () => {
    if (selectedIds.length === emails.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(emails.map((e) => e.id));
    }
  };

  const handleSelectEmail = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleBulkAction = (action: string) => {
    onBulkAction?.(action, selectedIds);
    setSelectedIds([]);
  };

  return (
    <div className={cn("flex h-full bg-background", className)}>
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-64 border-r border-border bg-card shrink-0">
          {sidebar || (
            <InboxSidebar
              folders={defaultFolders}
              onFolderClick={onSelectFolder}
              onCompose={onCompose}
            />
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header / Toolbar */}
        <div className="border-b border-border">
          {header || (
            <InboxToolbar
              selectedCount={selectedIds.length}
              totalCount={emails.length}
              searchQuery={searchQuery}
              onSearchChange={(q) => {
                setSearchQuery(q);
                onSearch?.(q);
              }}
              onSelectAll={handleSelectAll}
              onRefresh={onRefresh}
              onBulkAction={handleBulkAction}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Email List / Preview */}
        <div className="flex-1 flex overflow-hidden">
          {/* Email List */}
          <div
            className={cn(
              "flex-1 overflow-y-auto",
              showPreview && selectedEmail && "max-w-md border-r border-border",
            )}
          >
            {emails.length === 0 ? (
              <EmptyInbox folder={activeFolder} />
            ) : (
              <div className="divide-y divide-border">
                {emails.map((email) => (
                  <button
                    key={email.id}
                    type="button"
                    className={cn(
                      "flex items-start gap-x-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors w-full text-left",
                      selectedEmail?.id === email.id && "bg-muted",
                    )}
                    onClick={() => onSelectEmail?.(email.id)}
                  >
                    <Checkbox
                      checked={selectedIds.includes(email.id)}
                      onChange={() => handleSelectEmail(email.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <CompactInboxItem
                      email={email}
                      isSelected={selectedEmail?.id === email.id}
                      className="flex-1 p-0"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 flex items-center justify-between border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => onPageChange?.(currentPage - 1)}
                  >
                    <ChevronLeftIcon className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() => onPageChange?.(currentPage + 1)}
                  >
                    <ChevronRightIcon className="size-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Preview Pane */}
          {showPreview && selectedEmail && (
            <div className="flex-1 overflow-y-auto p-4">
              <InboxThread
                email={selectedEmail}
                defaultExpanded={true}
                showActions={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
          <div className="w-full max-w-2xl">
            <EmailCompose
              onSend={onSendEmail ? () => onSendEmail({}) : undefined}
              onDiscard={onCloseCompose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// InboxToolbar Component
// ============================================

interface InboxToolbarProps {
  selectedCount: number;
  totalCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectAll: () => void;
  onRefresh?: () => void;
  onBulkAction: (action: string) => void;
  isLoading: boolean;
}

const InboxToolbar = ({
  selectedCount,
  totalCount,
  searchQuery,
  onSearchChange,
  onSelectAll,
  onRefresh,
  onBulkAction,
  isLoading,
}: InboxToolbarProps) => (
  <div className="h-14 px-4 flex items-center justify-between gap-x-4">
    <div className="flex items-center gap-x-2">
      <Checkbox
        checked={selectedCount === totalCount && totalCount > 0}
        onChange={onSelectAll}
      />

      {selectedCount > 0 ? (
        <div className="flex items-center gap-x-2">
          <span className="text-sm text-muted-foreground">
            {selectedCount} selected
          </span>
          <div className="flex items-center gap-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBulkAction("archive")}
            >
              <ArchiveIcon className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBulkAction("delete")}
            >
              <TrashIcon className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBulkAction("spam")}
            >
              <AlertTriangleIcon className="size-4" />
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshIcon className={cn("size-4", isLoading && "animate-spin")} />
        </Button>
      )}
    </div>

    <div className="flex items-center gap-x-2">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search emails..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 w-64"
        />
      </div>
      <Button variant="ghost" size="sm">
        <FilterIcon className="size-4" />
      </Button>
    </div>
  </div>
);

// ============================================
// EmptyInbox Component
// ============================================

interface EmptyInboxProps {
  folder: string;
}

const EmptyInbox = ({ folder }: EmptyInboxProps) => {
  const messages: Record<string, { title: string; description: string }> = {
    inbox: {
      title: "Your inbox is empty",
      description: "Messages you receive will appear here.",
    },
    sent: {
      title: "No sent messages",
      description: "Messages you send will appear here.",
    },
    drafts: {
      title: "No drafts",
      description: "Draft messages will appear here.",
    },
    starred: {
      title: "No starred messages",
      description: "Star messages to find them easily later.",
    },
    spam: {
      title: "No spam",
      description: "Messages marked as spam will appear here.",
    },
    trash: {
      title: "Trash is empty",
      description: "Deleted messages will appear here.",
    },
  };

  const message = messages[folder] || messages.inbox;

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="size-16 flex items-center justify-center bg-muted rounded-full mb-4">
        <MailIcon className="size-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-1">{message.title}</h3>
      <p className="text-sm text-muted-foreground text-center">
        {message.description}
      </p>
    </div>
  );
};

// ============================================
// SplitInboxLayout Component
// ============================================

export interface SplitInboxLayoutProps extends InboxLayoutProps {
  previewPosition?: "right" | "bottom";
}

export const SplitInboxLayout = ({
  previewPosition = "right",
  ...props
}: SplitInboxLayoutProps) => (
  <InboxLayout
    {...props}
    showPreview={true}
    className={cn(previewPosition === "bottom" && "flex-col")}
  />
);
