"use client";

import { forwardRef, useMemo } from "react";
import { Avatar, Badge } from "@/components/atoms";
import { AvatarGroup } from "@/components/molecules";
import { FileIcon, FolderIcon, ImageIcon } from "@/lib/icons";
import {
  DataTable,
  type DataTableColumn,
  type DataTableProps,
} from "../../DataDisplay/DataTable";

// ============================================
// File Types
// ============================================

export type FileType =
  | "document"
  | "image"
  | "video"
  | "audio"
  | "archive"
  | "folder"
  | "other";

export interface FileOwner {
  id: string;
  name: string;
  avatar?: string;
}

export interface FileData {
  id: string;
  name: string;
  type: FileType;
  mimeType?: string;
  size: number;
  url?: string;
  thumbnailUrl?: string;
  owner?: FileOwner;
  sharedWith?: FileOwner[];
  createdAt: string;
  updatedAt?: string;
  isStarred?: boolean;
  isShared?: boolean;
  parentId?: string;
  path?: string;
}

// ============================================
// FilesTable Props
// ============================================

export interface FilesTableProps
  extends Omit<DataTableProps<FileData>, "data" | "columns" | "getRowKey"> {
  files: FileData[];
  showOwner?: boolean;
  showSharedWith?: boolean;
  showPath?: boolean;
  showDates?: boolean;
  onFileClick?: (file: FileData) => void;
  customColumns?: DataTableColumn<FileData>[];
}

// ============================================
// Helper Functions
// ============================================

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
};

const getFileIcon = (type: FileType, _mimeType?: string): React.ReactNode => {
  switch (type) {
    case "folder":
      return <FolderIcon className="size-5 text-warning" />;
    case "image":
      return <ImageIcon className="size-5 text-primary" />;
    case "document":
      return <FileIcon className="size-5 text-info" />;
    case "video":
      return <FileIcon className="size-5 text-destructive" />;
    case "audio":
      return <FileIcon className="size-5 text-success" />;
    case "archive":
      return <FileIcon className="size-5 text-warning" />;
    default:
      return <FileIcon className="size-5 text-muted-foreground" />;
  }
};

const getFileExtension = (filename: string): string => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : "";
};

// ============================================
// FilesTable Component
// ============================================

export const FilesTable = forwardRef<HTMLDivElement, FilesTableProps>(
  (
    {
      className,
      files,
      showOwner = true,
      showSharedWith = false,
      showPath = false,
      showDates = true,
      onFileClick,
      customColumns,
      ...props
    },
    ref,
  ) => {
    const columns = useMemo<DataTableColumn<FileData>[]>(() => {
      const baseColumns: DataTableColumn<FileData>[] = [
        {
          key: "name",
          header: "Name",
          sortable: true,
          filterable: true,
          filterType: "text",
          minWidth: "280px",
          render: (_, file) => (
            <div className="flex items-center gap-3">
              {file.thumbnailUrl ? (
                <div className="size-10 rounded border border-border overflow-hidden bg-muted">
                  <img
                    src={file.thumbnailUrl}
                    alt={file.name}
                    className="size-full object-cover"
                  />
                </div>
              ) : (
                <div className="size-10 rounded border border-border flex items-center justify-center bg-muted/50">
                  {getFileIcon(file.type, file.mimeType)}
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">
                    {file.name}
                  </span>
                  {file.isStarred && <span className="text-warning">★</span>}
                  {file.isShared && (
                    <Badge variant="secondary" size="sm">
                      Shared
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {file.type === "folder"
                    ? "Folder"
                    : getFileExtension(file.name)}
                </span>
              </div>
            </div>
          ),
        },
        {
          key: "type",
          header: "Type",
          sortable: true,
          filterable: true,
          filterType: "select",
          filterOptions: [
            { value: "document", label: "Document" },
            { value: "image", label: "Image" },
            { value: "video", label: "Video" },
            { value: "audio", label: "Audio" },
            { value: "archive", label: "Archive" },
            { value: "folder", label: "Folder" },
            { value: "other", label: "Other" },
          ],
          width: "100px",
          render: (_, file) => (
            <span className="text-sm text-muted-foreground capitalize">
              {file.type}
            </span>
          ),
        },
        {
          key: "size",
          header: "Size",
          sortable: true,
          align: "end",
          width: "100px",
          render: (_, file) => (
            <span className="text-sm text-muted-foreground">
              {file.type === "folder" ? "-" : formatFileSize(file.size)}
            </span>
          ),
        },
      ];

      if (showOwner) {
        baseColumns.push({
          key: "owner",
          header: "Owner",
          sortable: true,
          width: "160px",
          render: (_, file) => {
            if (!file.owner) {
              return <span className="text-muted-foreground">-</span>;
            }
            return (
              <div className="flex items-center gap-2">
                <Avatar
                  src={file.owner.avatar}
                  alt={file.owner.name}
                  fallback={file.owner.name.slice(0, 2)}
                  size="xs"
                />
                <span className="text-sm text-muted-foreground">
                  {file.owner.name}
                </span>
              </div>
            );
          },
        });
      }

      if (showSharedWith) {
        baseColumns.push({
          key: "sharedWith",
          header: "Shared with",
          width: "120px",
          render: (_, file) => {
            if (!file.sharedWith?.length) {
              return <span className="text-muted-foreground">-</span>;
            }
            return (
              <AvatarGroup
                avatars={file.sharedWith.map((u) => ({
                  src: u.avatar,
                  alt: u.name,
                  fallback: u.name.slice(0, 2),
                }))}
                max={3}
                size="xs"
              />
            );
          },
        });
      }

      if (showPath) {
        baseColumns.push({
          key: "path",
          header: "Location",
          width: "180px",
          render: (_, file) => {
            if (!file.path) {
              return <span className="text-muted-foreground">/</span>;
            }
            return (
              <span className="text-sm text-muted-foreground truncate max-w-[160px] block">
                {file.path}
              </span>
            );
          },
        });
      }

      if (showDates) {
        baseColumns.push({
          key: "updatedAt",
          header: "Modified",
          sortable: true,
          width: "140px",
          render: (_, file) => {
            const date = new Date(file.updatedAt || file.createdAt);
            return (
              <span className="text-sm text-muted-foreground">
                {date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            );
          },
        });
      }

      // Add custom columns
      if (customColumns) {
        baseColumns.push(...customColumns);
      }

      return baseColumns;
    }, [showOwner, showSharedWith, showPath, showDates, customColumns]);

    return (
      <DataTable<FileData>
        ref={ref}
        className={className}
        data={files}
        columns={columns}
        getRowKey={(file) => file.id}
        onRowClick={onFileClick}
        {...props}
      />
    );
  },
);

FilesTable.displayName = "FilesTable";
