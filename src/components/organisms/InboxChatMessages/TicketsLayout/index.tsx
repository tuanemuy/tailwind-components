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
  AlertCircleIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  FilterIcon,
  MoreVerticalIcon,
  PlusIcon,
  SearchIcon,
  TagIcon,
  UserIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";
import { ComposeThread } from "../ComposeThread";
import { type MessageData, MessageGroup } from "../MessageBubble";

// ============================================
// Types
// ============================================

export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketStatus =
  | "open"
  | "in_progress"
  | "pending"
  | "resolved"
  | "closed";

export interface TicketFilters {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  assignee?: string;
}

export interface TicketTag {
  id: string;
  name: string;
  color?: string;
}

export interface TicketAssignee {
  id?: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface TicketComment {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

export interface Ticket {
  id: string;
  // Support both 'title' (new) and 'subject' (legacy)
  title?: string;
  subject?: string;
  description?: string;
  status: TicketStatus;
  priority: TicketPriority;
  category?: string;
  // Support both 'customer' (new) and 'requester' (legacy)
  customer?: {
    name: string;
    email: string;
    avatar?: string;
  };
  requester?: {
    name: string;
    email: string;
    avatar?: string;
  };
  assignee?: TicketAssignee;
  // Support both string[] (new) and TicketTag[] (legacy)
  tags?: string[] | TicketTag[];
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  messages?: MessageData[];
  comments?: TicketComment[];
}

// ============================================
// TicketsLayout Component
// ============================================

// Helper function to get ticket title (supports both 'title' and 'subject')
const getTicketTitle = (ticket: Ticket): string =>
  ticket.title || ticket.subject || "";

// Helper function to get ticket requester (supports both 'customer' and 'requester')
const getTicketRequester = (ticket: Ticket) =>
  ticket.customer || ticket.requester;

// Helper function to get tag display name
const getTagName = (tag: string | TicketTag): string =>
  typeof tag === "string" ? tag : tag.name;

export interface TicketsLayoutProps {
  tickets?: Ticket[];
  selectedTicket?: Ticket;
  filters?: TicketFilters;
  activeStatus?: TicketStatus;
  activePriority?: TicketPriority;
  showSidebar?: boolean;
  showDetails?: boolean;
  isLoading?: boolean;
  onSelectTicket?: (id: string) => void;
  onCreateTicket?: () => void;
  onUpdateTicket?: (id: string, data: Partial<Ticket>) => void;
  onDeleteTicket?: (id: string) => void;
  onSendMessage?: (ticketId: string, message: string) => void;
  onAddComment?: (ticketId: string, comment: string) => void;
  onFilterChange?: (filters: TicketFilters) => void;
  onSearch?: (query: string) => void;
  onStatusChange?: (status: TicketStatus) => void;
  onPriorityChange?: (priority: TicketPriority) => void;
  header?: ReactNode;
  sidebar?: ReactNode;
  detailsPanel?: ReactNode;
  className?: string;
}

export const TicketsLayout = ({
  tickets = [],
  selectedTicket,
  filters,
  showSidebar = true,
  showDetails = false,
  isLoading = false,
  onSelectTicket,
  onCreateTicket,
  onUpdateTicket,
  onDeleteTicket,
  onSendMessage,
  onFilterChange,
  onSearch,
  header,
  sidebar,
  detailsPanel,
  className,
}: TicketsLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className={cn("flex h-full bg-background", className)}>
      {/* Sidebar / Filters */}
      {showSidebar && (
        <div className="w-64 border-r border-border bg-card shrink-0">
          {sidebar || (
            <TicketsSidebar
              filters={filters}
              onFilterChange={onFilterChange}
              onCreateTicket={onCreateTicket}
            />
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="border-b border-border">
          {header || (
            <TicketsToolbar
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
              ticketCount={tickets.length}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Tickets List / Conversation */}
        <div className="flex-1 flex overflow-hidden">
          {/* Tickets List */}
          <div
            className={cn(
              "overflow-y-auto",
              selectedTicket ? "w-96 border-r border-border" : "flex-1",
            )}
          >
            {tickets.length === 0 ? (
              <EmptyTickets />
            ) : (
              <div className="divide-y divide-border">
                {tickets.map((ticket) => (
                  <TicketItem
                    key={ticket.id}
                    ticket={ticket}
                    isSelected={selectedTicket?.id === ticket.id}
                    onClick={() => onSelectTicket?.(ticket.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Conversation */}
          {selectedTicket && (
            <div className="flex-1 flex flex-col min-w-0">
              {/* Ticket Header */}
              <TicketConversationHeader
                ticket={selectedTicket}
                onUpdateStatus={(status) =>
                  onUpdateTicket?.(selectedTicket.id, { status })
                }
                onDelete={() => onDeleteTicket?.(selectedTicket.id)}
              />

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                {selectedTicket.messages &&
                selectedTicket.messages.length > 0 ? (
                  <MessageGroup
                    messages={selectedTicket.messages}
                    showDivider={true}
                    showAvatar={true}
                    showName={true}
                  />
                ) : (
                  <div className="text-center text-sm text-muted-foreground py-8">
                    No messages yet
                  </div>
                )}
              </div>

              {/* Reply Input */}
              <div className="border-t border-border">
                <ComposeThread
                  placeholder="Reply to ticket..."
                  onSend={(message) =>
                    onSendMessage?.(selectedTicket.id, message)
                  }
                  className="border-0 rounded-none"
                />
              </div>
            </div>
          )}

          {/* Details Panel */}
          {showDetails && selectedTicket && (
            <div className="w-80 border-l border-border bg-card overflow-y-auto">
              {detailsPanel || <TicketDetailsPanel ticket={selectedTicket} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// TicketsSidebar Component
// ============================================

interface TicketsSidebarProps {
  filters?: TicketFilters;
  onFilterChange?: (filters: TicketFilters) => void;
  onCreateTicket?: () => void;
}

const TicketsSidebar = ({
  filters,
  onFilterChange,
  onCreateTicket,
}: TicketsSidebarProps) => {
  const statusOptions: {
    value: TicketStatus;
    label: string;
    count?: number;
  }[] = [
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In Progress" },
    { value: "pending", label: "Pending" },
    { value: "resolved", label: "Resolved" },
    { value: "closed", label: "Closed" },
  ];

  const priorityOptions: { value: TicketPriority; label: string }[] = [
    { value: "urgent", label: "Urgent" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  return (
    <div className="p-4">
      {/* New Ticket Button */}
      {onCreateTicket && (
        <Button
          variant="primary"
          className="w-full mb-4"
          onClick={onCreateTicket}
        >
          <PlusIcon className="size-4 me-2" />
          New Ticket
        </Button>
      )}

      {/* Status Filter */}
      <div className="mb-4">
        <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
          Status
        </p>
        <div className="space-y-1">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                "w-full px-3 py-2 text-sm text-left rounded-lg transition-colors",
                filters?.status?.includes(option.value)
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted",
              )}
              onClick={() => {
                const current = filters?.status || [];
                const newStatus = current.includes(option.value)
                  ? current.filter((s) => s !== option.value)
                  : [...current, option.value];
                onFilterChange?.({ ...filters, status: newStatus });
              }}
            >
              <span className="flex items-center gap-x-2">
                <StatusIcon status={option.value} className="size-4" />
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
          Priority
        </p>
        <div className="space-y-1">
          {priorityOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                "w-full px-3 py-2 text-sm text-left rounded-lg transition-colors",
                filters?.priority?.includes(option.value)
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted",
              )}
              onClick={() => {
                const current = filters?.priority || [];
                const newPriority = current.includes(option.value)
                  ? current.filter((p) => p !== option.value)
                  : [...current, option.value];
                onFilterChange?.({ ...filters, priority: newPriority });
              }}
            >
              <span className="flex items-center gap-x-2">
                <PriorityBadge priority={option.value} size="sm" />
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// TicketsToolbar Component
// ============================================

interface TicketsToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  ticketCount: number;
  isLoading: boolean;
}

const TicketsToolbar = ({
  searchQuery,
  onSearchChange,
  ticketCount,
  isLoading: _isLoading,
}: TicketsToolbarProps) => (
  <div className="h-14 px-4 flex items-center justify-between gap-x-4">
    <div className="flex items-center gap-x-2">
      <h2 className="text-lg font-semibold">Tickets</h2>
      <Badge variant="secondary">{ticketCount}</Badge>
    </div>

    <div className="flex items-center gap-x-2">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tickets..."
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
// TicketItem Component
// ============================================

interface TicketItemProps {
  ticket: Ticket;
  isSelected: boolean;
  onClick: () => void;
}

const TicketItem = ({ ticket, isSelected, onClick }: TicketItemProps) => (
  <button
    type="button"
    className={cn(
      "w-full p-4 text-left hover:bg-muted/50 transition-colors",
      isSelected && "bg-muted",
    )}
    onClick={onClick}
  >
    <div className="flex items-start gap-x-3">
      <StatusIcon status={ticket.status} className="size-5 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-x-2 mb-1">
          <span className="text-sm font-medium truncate">
            {getTicketTitle(ticket)}
          </span>
          <span className="text-xs text-muted-foreground shrink-0">
            {ticket.updatedAt}
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate mb-2">
          {ticket.description ||
            `From: ${getTicketRequester(ticket)?.name || "Unknown"}`}
        </p>
        <div className="flex items-center gap-x-2">
          <PriorityBadge priority={ticket.priority} size="sm" />
          {ticket.assignee && (
            <div className="flex items-center gap-x-1">
              <Avatar
                src={ticket.assignee.avatar}
                name={ticket.assignee.name}
                size="xs"
              />
              <span className="text-xs text-muted-foreground">
                {ticket.assignee.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  </button>
);

// ============================================
// TicketConversationHeader Component
// ============================================

interface TicketConversationHeaderProps {
  ticket: Ticket;
  onUpdateStatus: (status: TicketStatus) => void;
  onDelete: () => void;
}

const TicketConversationHeader = ({
  ticket,
  onUpdateStatus,
  onDelete,
}: TicketConversationHeaderProps) => {
  const requester = getTicketRequester(ticket);
  return (
    <div className="h-16 px-4 flex items-center justify-between border-b border-border">
      <div className="flex items-center gap-x-3 min-w-0">
        <Avatar src={requester?.avatar} name={requester?.name} size="sm" />
        <div className="min-w-0">
          <h3 className="text-sm font-semibold truncate">
            {getTicketTitle(ticket)}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {requester?.name} • {requester?.email}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-x-2">
        <Dropdown
          trigger={
            <Button variant="outline" size="sm">
              <StatusIcon status={ticket.status} className="size-4 me-1" />
              {statusLabels[ticket.status]}
            </Button>
          }
          align="end"
        >
          {Object.entries(statusLabels).map(([value, label]) => (
            <DropdownItem
              key={value}
              onClick={() => onUpdateStatus(value as TicketStatus)}
            >
              <StatusIcon
                status={value as TicketStatus}
                className="size-4 me-2"
              />
              {label}
            </DropdownItem>
          ))}
        </Dropdown>

        <Dropdown
          trigger={
            <Button variant="ghost" size="sm" className="size-8 p-0">
              <MoreVerticalIcon className="size-4" />
            </Button>
          }
          align="end"
        >
          <DropdownItem>Assign to...</DropdownItem>
          <DropdownItem>Add tags...</DropdownItem>
          <DropdownItem>Set due date...</DropdownItem>
          <DropdownDivider />
          <DropdownItem variant="destructive" onClick={onDelete}>
            Delete ticket
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
};

// ============================================
// TicketDetailsPanel Component
// ============================================

interface TicketDetailsPanelProps {
  ticket: Ticket;
}

const TicketDetailsPanel = ({ ticket }: TicketDetailsPanelProps) => (
  <div className="p-4">
    <h4 className="text-sm font-semibold mb-4">Ticket Details</h4>

    <div className="space-y-4">
      {/* Status */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">Status</p>
        <div className="flex items-center gap-x-2">
          <StatusIcon status={ticket.status} className="size-4" />
          <span className="text-sm">{statusLabels[ticket.status]}</span>
        </div>
      </div>

      {/* Priority */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">Priority</p>
        <PriorityBadge priority={ticket.priority} />
      </div>

      {/* Assignee */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">Assignee</p>
        {ticket.assignee ? (
          <div className="flex items-center gap-x-2">
            <Avatar
              src={ticket.assignee.avatar}
              name={ticket.assignee.name}
              size="sm"
            />
            <span className="text-sm">{ticket.assignee.name}</span>
          </div>
        ) : (
          <Button variant="ghost" size="sm">
            <UserIcon className="size-4 me-1" />
            Assign
          </Button>
        )}
      </div>

      {/* Tags */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">Tags</p>
        {ticket.tags && ticket.tags.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {ticket.tags.map((tag, index) => {
              const tagId = typeof tag === "string" ? tag : tag.id;
              const tagName = typeof tag === "string" ? tag : tag.name;
              return (
                <Badge key={tagId || index} variant="secondary" size="sm">
                  {tagName}
                </Badge>
              );
            })}
          </div>
        ) : (
          <Button variant="ghost" size="sm">
            <TagIcon className="size-4 me-1" />
            Add tags
          </Button>
        )}
      </div>

      {/* Due Date */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">Due Date</p>
        {ticket.dueDate ? (
          <span className="text-sm">{ticket.dueDate}</span>
        ) : (
          <Button variant="ghost" size="sm">
            <CalendarIcon className="size-4 me-1" />
            Set due date
          </Button>
        )}
      </div>

      {/* Created */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">Created</p>
        <span className="text-sm">{ticket.createdAt}</span>
      </div>

      {/* Updated */}
      <div>
        <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
        <span className="text-sm">{ticket.updatedAt}</span>
      </div>
    </div>
  </div>
);

// ============================================
// Helper Components
// ============================================

const StatusIcon = ({
  status,
  className,
}: {
  status: TicketStatus;
  className?: string;
}) => {
  switch (status) {
    case "open":
      return <AlertCircleIcon className={cn("text-yellow-500", className)} />;
    case "in_progress":
      return <ClockIcon className={cn("text-blue-500", className)} />;
    case "pending":
      return <ClockIcon className={cn("text-orange-500", className)} />;
    case "resolved":
      return <CheckCircleIcon className={cn("text-green-500", className)} />;
    case "closed":
      return (
        <CheckCircleIcon className={cn("text-muted-foreground", className)} />
      );
    default:
      return <AlertCircleIcon className={className} />;
  }
};

const PriorityBadge = ({
  priority,
  size = "md",
}: {
  priority: TicketPriority;
  size?: "sm" | "md";
}) => {
  const variants: Record<
    TicketPriority,
    "destructive" | "warning" | "secondary" | "outline"
  > = {
    urgent: "destructive",
    high: "warning",
    medium: "secondary",
    low: "outline",
  };

  return (
    <Badge variant={variants[priority]} size={size}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
};

const statusLabels: Record<TicketStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  pending: "Pending",
  resolved: "Resolved",
  closed: "Closed",
};

const EmptyTickets = () => (
  <div className="flex flex-col items-center justify-center h-full p-8">
    <div className="size-16 flex items-center justify-center bg-muted rounded-full mb-4">
      <AlertCircleIcon className="size-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-1">No tickets found</h3>
    <p className="text-sm text-muted-foreground text-center">
      Create a new ticket or adjust your filters to see results.
    </p>
  </div>
);

// ============================================
// KanbanTicketsLayout Component
// ============================================

export interface KanbanTicketsLayoutProps {
  tickets?: Ticket[];
  onSelectTicket?: (id: string) => void;
  onMoveTicket?: (id: string, status: TicketStatus) => void;
  onCreateTicket?: () => void;
  onUpdateTicket?: (id: string, data: Partial<Ticket>) => void;
  isLoading?: boolean;
  className?: string;
}

const kanbanStatuses: TicketStatus[] = [
  "open",
  "in_progress",
  "pending",
  "resolved",
  "closed",
];

export const KanbanTicketsLayout = ({
  tickets = [],
  onSelectTicket,
  onMoveTicket,
  onCreateTicket,
  onUpdateTicket: _onUpdateTicket,
  isLoading = false,
  className,
}: KanbanTicketsLayoutProps) => {
  const getTicketsByStatus = (status: TicketStatus) =>
    tickets.filter((ticket) => ticket.status === status);

  return (
    <div className={cn("flex h-full bg-background overflow-x-auto", className)}>
      {kanbanStatuses.map((status) => {
        const statusTickets = getTicketsByStatus(status);
        return (
          <div
            key={status}
            className="flex-shrink-0 w-80 flex flex-col border-r border-border last:border-r-0"
          >
            {/* Column Header */}
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <StatusIcon status={status} className="size-4" />
                  <span className="font-medium text-sm">
                    {statusLabels[status]}
                  </span>
                  <Badge variant="secondary" size="sm">
                    {statusTickets.length}
                  </Badge>
                </div>
                {status === "open" && onCreateTicket && (
                  <Button variant="ghost" size="sm" onClick={onCreateTicket}>
                    <PlusIcon className="size-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Column Content */}
            <div className="flex-1 p-2 space-y-2 overflow-y-auto">
              {isLoading ? (
                <KanbanCardSkeleton />
              ) : statusTickets.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No tickets
                </div>
              ) : (
                statusTickets.map((ticket) => (
                  <KanbanCard
                    key={ticket.id}
                    ticket={ticket}
                    onClick={() => onSelectTicket?.(ticket.id)}
                    onMove={(newStatus) => onMoveTicket?.(ticket.id, newStatus)}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================
// KanbanCard Component
// ============================================

interface KanbanCardProps {
  ticket: Ticket;
  onClick: () => void;
  onMove: (status: TicketStatus) => void;
}

const KanbanCard = ({ ticket, onClick, onMove }: KanbanCardProps) => {
  const requester = getTicketRequester(ticket);

  return (
    <button
      type="button"
      className="w-full text-left p-3 bg-card border border-border rounded-lg cursor-pointer hover:shadow-sm transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-x-2 mb-2">
        <span className="text-sm font-medium line-clamp-2">
          {getTicketTitle(ticket)}
        </span>
        <Dropdown
          trigger={
            <Button
              variant="ghost"
              size="sm"
              className="size-6 p-0 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVerticalIcon className="size-3" />
            </Button>
          }
          align="end"
        >
          {kanbanStatuses
            .filter((s) => s !== ticket.status)
            .map((status) => (
              <DropdownItem
                key={status}
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(status);
                }}
              >
                <StatusIcon status={status} className="size-3 me-2" />
                Move to {statusLabels[status]}
              </DropdownItem>
            ))}
        </Dropdown>
      </div>

      {ticket.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
          {ticket.description}
        </p>
      )}

      <div className="flex items-center justify-between gap-x-2">
        <div className="flex items-center gap-x-1">
          <PriorityBadge priority={ticket.priority} size="sm" />
          {ticket.category && (
            <Badge variant="outline" size="sm">
              {ticket.category}
            </Badge>
          )}
        </div>
        {requester && (
          <Avatar src={requester.avatar} name={requester.name} size="xs" />
        )}
      </div>

      {ticket.tags && ticket.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {ticket.tags.slice(0, 3).map((tag) => (
            <Badge
              key={typeof tag === "string" ? tag : tag.id}
              variant="secondary"
              size="sm"
            >
              {getTagName(tag)}
            </Badge>
          ))}
          {ticket.tags.length > 3 && (
            <Badge variant="secondary" size="sm">
              +{ticket.tags.length - 3}
            </Badge>
          )}
        </div>
      )}
    </button>
  );
};

const KanbanCardSkeleton = () => (
  <div className="space-y-2">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton cards are positional placeholders
        key={`skeleton-${i}`}
        className="p-3 bg-card border border-border rounded-lg animate-pulse"
      >
        <div className="h-4 w-3/4 bg-muted rounded mb-2" />
        <div className="h-3 w-full bg-muted rounded mb-2" />
        <div className="flex justify-between">
          <div className="h-5 w-16 bg-muted rounded" />
          <div className="h-6 w-6 bg-muted rounded-full" />
        </div>
      </div>
    ))}
  </div>
);
