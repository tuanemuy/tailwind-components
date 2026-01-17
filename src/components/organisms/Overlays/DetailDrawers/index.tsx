import { forwardRef, type ReactNode } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
} from "@/components/organisms/Layout/Drawer";
import {
  AlertCircleIcon,
  BellIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  DownloadIcon,
  EditIcon,
  FileIcon,
  FolderIcon,
  ImageIcon,
  LinkIcon,
  MailIcon,
  TagIcon,
  TrashIcon,
  UserIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

// ============================================
// ActivityDrawer
// ============================================
export interface ActivityItem {
  id: string;
  type:
    | "create"
    | "update"
    | "delete"
    | "comment"
    | "assign"
    | "status"
    | "custom";
  title: string;
  description?: string;
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
  icon?: ReactNode;
  metadata?: Record<string, string>;
}

export interface ActivityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activities: ActivityItem[];
  title?: string;
  subtitle?: ReactNode;
  emptyMessage?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  className?: string;
}

const activityTypeStyles: Record<
  ActivityItem["type"],
  { icon: ReactNode; color: string }
> = {
  create: {
    icon: <CheckCircleIcon className="size-4" />,
    color: "text-success",
  },
  update: { icon: <EditIcon className="size-4" />, color: "text-info" },
  delete: { icon: <TrashIcon className="size-4" />, color: "text-destructive" },
  comment: { icon: <BellIcon className="size-4" />, color: "text-primary" },
  assign: { icon: <UserIcon className="size-4" />, color: "text-warning" },
  status: {
    icon: <AlertCircleIcon className="size-4" />,
    color: "text-muted-foreground",
  },
  custom: {
    icon: <BellIcon className="size-4" />,
    color: "text-muted-foreground",
  },
};

export const ActivityDrawer = forwardRef<HTMLDivElement, ActivityDrawerProps>(
  (
    {
      isOpen,
      onClose,
      activities,
      title = "Activity",
      subtitle,
      emptyMessage = "No activity yet",
      onLoadMore,
      hasMore,
      loading,
      className,
    },
    ref,
  ) => {
    return (
      <Drawer
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        position="right"
        size="md"
        className={className}
      >
        <DrawerHeader
          title={
            <span className="flex items-center gap-2">
              <BellIcon className="size-5" />
              {title}
            </span>
          }
          subtitle={subtitle}
        />

        <DrawerBody padding="none">
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BellIcon className="mb-3 size-12 text-muted-foreground/30" />
              <p className="text-muted-foreground">{emptyMessage}</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {activities.map((activity) => {
                const typeStyle = activityTypeStyles[activity.type];
                return (
                  <div key={activity.id} className="flex gap-3 p-4">
                    {/* Timeline icon */}
                    <div
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full bg-muted",
                        typeStyle.color,
                      )}
                    >
                      {activity.icon || typeStyle.icon}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {activity.title}
                          </p>
                          {activity.description && (
                            <p className="mt-0.5 text-sm text-muted-foreground">
                              {activity.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Metadata */}
                      {activity.metadata && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {Object.entries(activity.metadata).map(
                            ([key, value]) => (
                              <Badge key={key} soft className="text-xs">
                                {key}: {value}
                              </Badge>
                            ),
                          )}
                        </div>
                      )}

                      {/* User and timestamp */}
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Avatar
                          src={activity.user.avatar}
                          alt={activity.user.name}
                          size="xs"
                          fallback={activity.user.name.charAt(0)}
                        />
                        <span>{activity.user.name}</span>
                        <span>•</span>
                        <span>{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </DrawerBody>

        {hasMore && (
          <DrawerFooter align="center">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLoadMore}
              loading={loading}
            >
              Load more
            </Button>
          </DrawerFooter>
        )}
      </Drawer>
    );
  },
);
ActivityDrawer.displayName = "ActivityDrawer";

// ============================================
// UserDetailsDrawer
// ============================================
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  department?: string;
  phone?: string;
  location?: string;
  bio?: string;
  joinedAt?: string;
  lastActive?: string;
  status?: "online" | "offline" | "away" | "busy";
  tags?: string[];
  socialLinks?: {
    type: string;
    url: string;
  }[];
  customFields?: {
    label: string;
    value: string;
  }[];
}

export interface UserDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserInfo | null;
  title?: string;
  showActions?: boolean;
  onEdit?: (user: UserInfo) => void;
  onDelete?: (user: UserInfo) => void;
  onMessage?: (user: UserInfo) => void;
  actions?: ReactNode;
  className?: string;
}

const statusColors: Record<NonNullable<UserInfo["status"]>, string> = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  away: "bg-warning",
  busy: "bg-destructive",
};

export const UserDetailsDrawer = forwardRef<
  HTMLDivElement,
  UserDetailsDrawerProps
>(
  (
    {
      isOpen,
      onClose,
      user,
      title = "User Details",
      showActions = true,
      onEdit,
      onDelete,
      onMessage,
      actions,
      className,
    },
    ref,
  ) => {
    if (!user) return null;

    return (
      <Drawer
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        position="right"
        size="md"
        className={className}
      >
        <DrawerHeader title={title} />

        <DrawerBody padding="none">
          {/* Profile header */}
          <div className="border-b border-border bg-muted/30 p-6 text-center">
            <div className="relative mx-auto mb-4 inline-block">
              <Avatar
                src={user.avatar}
                alt={user.name}
                size="xl"
                fallback={user.name.charAt(0)}
              />
              {user.status && (
                <span
                  className={cn(
                    "absolute bottom-1 right-1 size-4 rounded-full border-2 border-card",
                    statusColors[user.status],
                  )}
                />
              )}
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {user.name}
            </h3>
            {user.role && (
              <p className="text-sm text-muted-foreground">{user.role}</p>
            )}
            {user.department && (
              <Badge soft className="mt-2">
                {user.department}
              </Badge>
            )}
          </div>

          {/* Info sections */}
          <div className="divide-y divide-border">
            {/* Contact info */}
            <div className="space-y-3 p-4">
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Contact Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <MailIcon className="size-4 text-muted-foreground" />
                  <span className="text-foreground">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <UserIcon className="size-4 text-muted-foreground" />
                    <span className="text-foreground">{user.phone}</span>
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <LinkIcon className="size-4 text-muted-foreground" />
                    <span className="text-foreground">{user.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  About
                </h4>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
              </div>
            )}

            {/* Activity info */}
            <div className="space-y-3 p-4">
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Activity
              </h4>
              <div className="space-y-2">
                {user.joinedAt && (
                  <div className="flex items-center gap-3 text-sm">
                    <CalendarIcon className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined:</span>
                    <span className="text-foreground">{user.joinedAt}</span>
                  </div>
                )}
                {user.lastActive && (
                  <div className="flex items-center gap-3 text-sm">
                    <ClockIcon className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Last active:</span>
                    <span className="text-foreground">{user.lastActive}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {user.tags && user.tags.length > 0 && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {user.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <TagIcon className="mr-1 size-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Custom fields */}
            {user.customFields && user.customFields.length > 0 && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Additional Information
                </h4>
                <div className="space-y-2">
                  {user.customFields.map((field) => (
                    <div
                      key={`${field.label}-${field.value}`}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {field.label}
                      </span>
                      <span className="text-foreground">{field.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social links */}
            {user.socialLinks && user.socialLinks.length > 0 && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Social Links
                </h4>
                <div className="flex flex-wrap gap-2">
                  {user.socialLinks.map((link) => (
                    <Button
                      key={`${link.type}-${link.url}`}
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(link.url, "_blank")}
                    >
                      <LinkIcon className="size-4" />
                      {link.type}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DrawerBody>

        {showActions && (
          <DrawerFooter align="between">
            {actions || (
              <>
                <div className="flex gap-2">
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(user)}
                      className="text-destructive hover:text-destructive"
                    >
                      <TrashIcon className="size-4" />
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  {onEdit && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(user)}
                    >
                      <EditIcon className="size-4" />
                      Edit
                    </Button>
                  )}
                  {onMessage && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onMessage(user)}
                    >
                      <MailIcon className="size-4" />
                      Message
                    </Button>
                  )}
                </div>
              </>
            )}
          </DrawerFooter>
        )}
      </Drawer>
    );
  },
);
UserDetailsDrawer.displayName = "UserDetailsDrawer";

// ============================================
// ChatUserDetailsDrawer (Chat-specific variant)
// ============================================
export interface ChatUserInfo extends UserInfo {
  unreadCount?: number;
  sharedFiles?: number;
  sharedMedia?: number;
  mutedUntil?: string;
  blocked?: boolean;
}

export interface ChatUserDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: ChatUserInfo | null;
  onViewSharedFiles?: () => void;
  onViewSharedMedia?: () => void;
  onMute?: (user: ChatUserInfo) => void;
  onBlock?: (user: ChatUserInfo) => void;
  onClearChat?: (user: ChatUserInfo) => void;
  className?: string;
}

export const ChatUserDetailsDrawer = forwardRef<
  HTMLDivElement,
  ChatUserDetailsDrawerProps
>(
  (
    {
      isOpen,
      onClose,
      user,
      onViewSharedFiles,
      onViewSharedMedia,
      onMute,
      onBlock,
      onClearChat,
      className,
    },
    ref,
  ) => {
    if (!user) return null;

    return (
      <Drawer
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        position="right"
        size="md"
        className={className}
      >
        <DrawerHeader title="Contact Info" />

        <DrawerBody padding="none">
          {/* Profile header */}
          <div className="border-b border-border bg-muted/30 p-6 text-center">
            <div className="relative mx-auto mb-4 inline-block">
              <Avatar
                src={user.avatar}
                alt={user.name}
                size="xl"
                fallback={user.name.charAt(0)}
              />
              {user.status && (
                <span
                  className={cn(
                    "absolute bottom-1 right-1 size-4 rounded-full border-2 border-card",
                    statusColors[user.status],
                  )}
                />
              )}
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {user.name}
            </h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            {user.lastActive && (
              <p className="mt-1 text-xs text-muted-foreground">
                Last seen {user.lastActive}
              </p>
            )}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 divide-x divide-border border-b border-border">
            <button
              type="button"
              className="flex flex-col items-center p-4 transition-colors hover:bg-muted/50"
              onClick={onViewSharedFiles}
            >
              <FileIcon className="mb-1 size-5 text-muted-foreground" />
              <span className="text-lg font-semibold text-foreground">
                {user.sharedFiles || 0}
              </span>
              <span className="text-xs text-muted-foreground">
                Shared Files
              </span>
            </button>
            <button
              type="button"
              className="flex flex-col items-center p-4 transition-colors hover:bg-muted/50"
              onClick={onViewSharedMedia}
            >
              <ImageIcon className="mb-1 size-5 text-muted-foreground" />
              <span className="text-lg font-semibold text-foreground">
                {user.sharedMedia || 0}
              </span>
              <span className="text-xs text-muted-foreground">
                Shared Media
              </span>
            </button>
          </div>

          {/* Info sections */}
          <div className="divide-y divide-border">
            {/* Contact info */}
            {(user.phone || user.location) && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Contact
                </h4>
                <div className="space-y-2">
                  {user.phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <UserIcon className="size-4 text-muted-foreground" />
                      <span className="text-foreground">{user.phone}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center gap-3 text-sm">
                      <LinkIcon className="size-4 text-muted-foreground" />
                      <span className="text-foreground">{user.location}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bio */}
            {user.bio && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  About
                </h4>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2 p-4">
              {onMute && (
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => onMute(user)}
                >
                  <BellIcon className="size-4" />
                  {user.mutedUntil
                    ? `Muted until ${user.mutedUntil}`
                    : "Mute notifications"}
                </Button>
              )}
              {onClearChat && (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-warning hover:text-warning"
                  onClick={() => onClearChat(user)}
                >
                  <TrashIcon className="size-4" />
                  Clear chat history
                </Button>
              )}
              {onBlock && (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={() => onBlock(user)}
                >
                  <AlertCircleIcon className="size-4" />
                  {user.blocked ? "Unblock contact" : "Block contact"}
                </Button>
              )}
            </div>
          </div>
        </DrawerBody>
      </Drawer>
    );
  },
);
ChatUserDetailsDrawer.displayName = "ChatUserDetailsDrawer";

// ============================================
// FilesInfoDrawer
// ============================================
export interface FileInfo {
  id: string;
  name: string;
  type: string;
  size: string;
  path?: string;
  createdAt?: string;
  modifiedAt?: string;
  owner?: {
    name: string;
    avatar?: string;
  };
  sharedWith?: {
    name: string;
    avatar?: string;
  }[];
  tags?: string[];
  description?: string;
  previewUrl?: string;
  downloadUrl?: string;
  versions?: {
    version: string;
    date: string;
    user: string;
  }[];
}

export interface FilesInfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  file: FileInfo | null;
  onDownload?: (file: FileInfo) => void;
  onShare?: (file: FileInfo) => void;
  onDelete?: (file: FileInfo) => void;
  onRename?: (file: FileInfo) => void;
  onMove?: (file: FileInfo) => void;
  className?: string;
}

const fileTypeIcons: Record<string, ReactNode> = {
  folder: <FolderIcon className="size-8 text-warning" />,
  image: <ImageIcon className="size-8 text-info" />,
  document: <FileIcon className="size-8 text-primary" />,
  default: <FileIcon className="size-8 text-muted-foreground" />,
};

function getFileTypeIcon(type: string): ReactNode {
  if (type.startsWith("image/")) return fileTypeIcons.image;
  if (type === "folder") return fileTypeIcons.folder;
  if (
    type.includes("document") ||
    type.includes("pdf") ||
    type.includes("text")
  ) {
    return fileTypeIcons.document;
  }
  return fileTypeIcons.default;
}

export const FilesInfoDrawer = forwardRef<HTMLDivElement, FilesInfoDrawerProps>(
  (
    {
      isOpen,
      onClose,
      file,
      onDownload,
      onShare,
      onDelete,
      onRename,
      onMove,
      className,
    },
    ref,
  ) => {
    if (!file) return null;

    return (
      <Drawer
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        position="right"
        size="md"
        className={className}
      >
        <DrawerHeader title="File Info" />

        <DrawerBody padding="none">
          {/* File header */}
          <div className="border-b border-border p-6 text-center">
            {file.previewUrl ? (
              <div className="mx-auto mb-4 aspect-video w-full max-w-xs overflow-hidden rounded-lg border border-border bg-muted">
                <img
                  src={file.previewUrl}
                  alt={file.name}
                  className="size-full object-cover"
                />
              </div>
            ) : (
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-xl bg-muted">
                {getFileTypeIcon(file.type)}
              </div>
            )}
            <h3 className="text-lg font-semibold text-foreground">
              {file.name}
            </h3>
            <p className="text-sm text-muted-foreground">{file.type}</p>
          </div>

          {/* File info sections */}
          <div className="divide-y divide-border">
            {/* Basic info */}
            <div className="space-y-3 p-4">
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Details
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Size</span>
                  <span className="text-foreground">{file.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span className="text-foreground">{file.type}</span>
                </div>
                {file.path && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Location</span>
                    <span className="truncate text-foreground">
                      {file.path}
                    </span>
                  </div>
                )}
                {file.createdAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created</span>
                    <span className="text-foreground">{file.createdAt}</span>
                  </div>
                )}
                {file.modifiedAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Modified</span>
                    <span className="text-foreground">{file.modifiedAt}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {file.description && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Description
                </h4>
                <p className="text-sm text-muted-foreground">
                  {file.description}
                </p>
              </div>
            )}

            {/* Owner */}
            {file.owner && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Owner
                </h4>
                <div className="flex items-center gap-3">
                  <Avatar
                    src={file.owner.avatar}
                    alt={file.owner.name}
                    size="sm"
                    fallback={file.owner.name.charAt(0)}
                  />
                  <span className="text-sm text-foreground">
                    {file.owner.name}
                  </span>
                </div>
              </div>
            )}

            {/* Shared with */}
            {file.sharedWith && file.sharedWith.length > 0 && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Shared with ({file.sharedWith.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {file.sharedWith.map((user) => (
                    <div
                      key={user.name}
                      className="flex items-center gap-2 rounded-full bg-muted px-3 py-1"
                    >
                      <Avatar
                        src={user.avatar}
                        alt={user.name}
                        size="xs"
                        fallback={user.name.charAt(0)}
                      />
                      <span className="text-xs text-foreground">
                        {user.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {file.tags && file.tags.length > 0 && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {file.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <TagIcon className="mr-1 size-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Version history */}
            {file.versions && file.versions.length > 0 && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Version History
                </h4>
                <div className="space-y-2">
                  {file.versions.map((version) => (
                    <div
                      key={version.version}
                      className="flex items-center justify-between rounded-lg bg-muted/50 p-2 text-xs"
                    >
                      <div>
                        <span className="font-medium text-foreground">
                          v{version.version}
                        </span>
                        <span className="ml-2 text-muted-foreground">
                          by {version.user}
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        {version.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DrawerBody>

        <DrawerFooter align="between">
          <div className="flex gap-2">
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(file)}
                className="text-destructive hover:text-destructive"
              >
                <TrashIcon className="size-4" />
              </Button>
            )}
            {onRename && (
              <Button variant="ghost" size="sm" onClick={() => onRename(file)}>
                <EditIcon className="size-4" />
              </Button>
            )}
            {onMove && (
              <Button variant="ghost" size="sm" onClick={() => onMove(file)}>
                <FolderIcon className="size-4" />
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            {onShare && (
              <Button variant="outline" size="sm" onClick={() => onShare(file)}>
                <LinkIcon className="size-4" />
                Share
              </Button>
            )}
            {onDownload && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onDownload(file)}
              >
                <DownloadIcon className="size-4" />
                Download
              </Button>
            )}
          </div>
        </DrawerFooter>
      </Drawer>
    );
  },
);
FilesInfoDrawer.displayName = "FilesInfoDrawer";

// ============================================
// TaskDetailsDrawer
// ============================================
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "todo" | "in_progress" | "review" | "done" | "blocked";

export interface TaskComment {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

export interface TaskInfo {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignees?: {
    name: string;
    avatar?: string;
  }[];
  dueDate?: string;
  createdAt?: string;
  project?: string;
  tags?: string[];
  attachments?: {
    name: string;
    url: string;
  }[];
  comments?: TaskComment[];
  subtasks?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
  estimatedTime?: string;
  loggedTime?: string;
}

export interface TaskDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskInfo | null;
  onEdit?: (task: TaskInfo) => void;
  onDelete?: (task: TaskInfo) => void;
  onStatusChange?: (task: TaskInfo, status: TaskStatus) => void;
  onAddComment?: (task: TaskInfo, comment: string) => void;
  className?: string;
}

const priorityColors: Record<TaskPriority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-info/10 text-info",
  high: "bg-warning/10 text-warning",
  urgent: "bg-destructive/10 text-destructive",
};

const taskStatusColors: Record<TaskStatus, string> = {
  todo: "bg-muted text-muted-foreground",
  in_progress: "bg-info/10 text-info",
  review: "bg-warning/10 text-warning",
  done: "bg-success/10 text-success",
  blocked: "bg-destructive/10 text-destructive",
};

const statusLabels: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  review: "In Review",
  done: "Done",
  blocked: "Blocked",
};

export const TaskDetailsDrawer = forwardRef<
  HTMLDivElement,
  TaskDetailsDrawerProps
>(
  (
    {
      isOpen,
      onClose,
      task,
      onEdit,
      onDelete,
      onStatusChange,
      onAddComment: _onAddComment,
      className,
    },
    ref,
  ) => {
    if (!task) return null;

    const completedSubtasks =
      task.subtasks?.filter((s) => s.completed).length || 0;
    const totalSubtasks = task.subtasks?.length || 0;

    return (
      <Drawer
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        position="right"
        size="lg"
        className={className}
      >
        <DrawerHeader
          title={
            <div className="flex items-start gap-3">
              <span className="flex-1">{task.title}</span>
              <div className="flex shrink-0 gap-2">
                <Badge className={cn("text-xs", priorityColors[task.priority])}>
                  {task.priority}
                </Badge>
                <Badge className={cn("text-xs", taskStatusColors[task.status])}>
                  {statusLabels[task.status]}
                </Badge>
              </div>
            </div>
          }
        />

        <DrawerBody padding="none">
          <div className="divide-y divide-border">
            {/* Description */}
            {task.description && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Description
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {task.description}
                </p>
              </div>
            )}

            {/* Details */}
            <div className="space-y-3 p-4">
              <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Details
              </h4>
              <div className="space-y-2">
                {task.project && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Project</span>
                    <span className="text-foreground">{task.project}</span>
                  </div>
                )}
                {task.dueDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Due Date</span>
                    <span className="text-foreground">{task.dueDate}</span>
                  </div>
                )}
                {task.createdAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created</span>
                    <span className="text-foreground">{task.createdAt}</span>
                  </div>
                )}
                {task.estimatedTime && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated</span>
                    <span className="text-foreground">
                      {task.estimatedTime}
                    </span>
                  </div>
                )}
                {task.loggedTime && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Logged</span>
                    <span className="text-foreground">{task.loggedTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Assignees */}
            {task.assignees && task.assignees.length > 0 && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Assignees
                </h4>
                <div className="flex flex-wrap gap-2">
                  {task.assignees.map((assignee) => (
                    <div
                      key={assignee.name}
                      className="flex items-center gap-2 rounded-full bg-muted px-3 py-1"
                    >
                      <Avatar
                        src={assignee.avatar}
                        alt={assignee.name}
                        size="xs"
                        fallback={assignee.name.charAt(0)}
                      />
                      <span className="text-xs text-foreground">
                        {assignee.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subtasks */}
            {task.subtasks && task.subtasks.length > 0 && (
              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Subtasks
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {completedSubtasks}/{totalSubtasks}
                  </span>
                </div>
                <div className="space-y-2">
                  {task.subtasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      className="flex items-center gap-3 rounded-lg bg-muted/50 p-2"
                    >
                      {subtask.completed ? (
                        <CheckCircleIcon className="size-4 text-success" />
                      ) : (
                        <div className="size-4 rounded-full border-2 border-muted-foreground" />
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          subtask.completed
                            ? "text-muted-foreground line-through"
                            : "text-foreground",
                        )}
                      >
                        {subtask.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <TagIcon className="mr-1 size-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Attachments */}
            {task.attachments && task.attachments.length > 0 && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Attachments
                </h4>
                <div className="space-y-2">
                  {task.attachments.map((attachment) => (
                    <a
                      key={`${attachment.name}-${attachment.url}`}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-muted/50 p-2 text-sm hover:bg-muted"
                    >
                      <FileIcon className="size-4 text-muted-foreground" />
                      <span className="text-foreground">{attachment.name}</span>
                      <DownloadIcon className="ml-auto size-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            {task.comments && task.comments.length > 0 && (
              <div className="space-y-3 p-4">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Comments ({task.comments.length})
                </h4>
                <div className="space-y-4">
                  {task.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        size="sm"
                        fallback={comment.user.name.charAt(0)}
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-medium text-foreground">
                            {comment.user.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DrawerBody>

        <DrawerFooter align="between">
          <div className="flex gap-2">
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task)}
                className="text-destructive hover:text-destructive"
              >
                <TrashIcon className="size-4" />
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
                <EditIcon className="size-4" />
                Edit
              </Button>
            )}
            {onStatusChange && task.status !== "done" && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const nextStatus: Record<TaskStatus, TaskStatus> = {
                    todo: "in_progress",
                    in_progress: "review",
                    review: "done",
                    done: "done",
                    blocked: "in_progress",
                  };
                  onStatusChange(task, nextStatus[task.status]);
                }}
              >
                <CheckCircleIcon className="size-4" />
                {task.status === "blocked" ? "Unblock" : "Move to Next"}
              </Button>
            )}
          </div>
        </DrawerFooter>
      </Drawer>
    );
  },
);
TaskDetailsDrawer.displayName = "TaskDetailsDrawer";
