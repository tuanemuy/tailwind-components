import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { fileTypeColorConfig, type FileTypeColor } from "@/lib/variants";
import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  DownloadIcon,
  ExternalLinkIcon,
  MoreHorizontalIcon,
  FolderIcon,
} from "@/lib/icons";

export type FileType = FileTypeColor;

const fileTypeIcons: Record<FileType, React.FC<{ className?: string }>> = {
  document: FileTextIcon,
  image: ImageIcon,
  video: FileIcon,
  audio: FileIcon,
  archive: FileIcon,
  code: FileIcon,
  spreadsheet: FileIcon,
  presentation: FileIcon,
  folder: FolderIcon,
  other: FileIcon,
};

export interface FileSnippetData {
  id: string;
  name: string;
  type: FileType;
  size?: string;
  extension?: string;
  previewUrl?: string;
  downloadUrl?: string;
  modifiedDate?: string;
  description?: string;
}

export interface FileSnippetProps extends React.HTMLAttributes<HTMLDivElement> {
  file: FileSnippetData;
  variant?: "default" | "compact" | "inline" | "preview";
  showActions?: boolean;
  onDownload?: (file: FileSnippetData) => void;
  onPreview?: (file: FileSnippetData) => void;
  onMoreClick?: (file: FileSnippetData) => void;
}

export const FileSnippet = forwardRef<HTMLDivElement, FileSnippetProps>(
  (
    {
      className,
      file,
      variant = "default",
      showActions = true,
      onDownload,
      onPreview,
      onMoreClick,
      ...props
    },
    ref
  ) => {
    const colorClass = fileTypeColorConfig[file.type];
    const Icon = fileTypeIcons[file.type];

    if (variant === "inline") {
      return (
        <div
          ref={ref}
          className={cn(
            "inline-flex items-center gap-x-2 rounded-lg border border-border bg-card px-3 py-2",
            className
          )}
          {...props}
        >
          <div className={cn("flex size-7 items-center justify-center rounded", colorClass)}>
            <Icon className="size-4" />
          </div>
          <span className="truncate text-sm font-medium text-foreground">{file.name}</span>
          {file.size && (
            <span className="text-xs text-muted-foreground">{file.size}</span>
          )}
          {showActions && file.downloadUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="ml-1 size-6 p-0"
              onClick={() => onDownload?.(file)}
            >
              <DownloadIcon className="size-3.5" />
            </Button>
          )}
        </div>
      );
    }

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-between gap-x-3 rounded-lg border border-border bg-card p-3",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-x-3">
            <div className={cn("flex size-9 items-center justify-center rounded-lg", colorClass)}>
              <Icon className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
              <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
                {file.extension && <span>{file.extension.toUpperCase()}</span>}
                {file.size && <span>{file.size}</span>}
              </div>
            </div>
          </div>
          {showActions && (
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0"
              onClick={() => onMoreClick?.(file)}
            >
              <MoreHorizontalIcon className="size-4" />
            </Button>
          )}
        </div>
      );
    }

    if (variant === "preview" && file.previewUrl) {
      return (
        <div
          ref={ref}
          className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}
          {...props}
        >
          <div
            className="aspect-video cursor-pointer bg-muted"
            onClick={() => onPreview?.(file)}
          >
            {file.type === "image" ? (
              <img
                src={file.previewUrl}
                alt={file.name}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <Icon className="size-16 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-x-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">{file.name}</p>
                <div className="mt-1 flex items-center gap-x-2 text-xs text-muted-foreground">
                  {file.extension && (
                    <Badge variant="secondary" size="sm">
                      {file.extension.toUpperCase()}
                    </Badge>
                  )}
                  {file.size && <span>{file.size}</span>}
                  {file.modifiedDate && <span>{file.modifiedDate}</span>}
                </div>
              </div>
              {showActions && (
                <div className="flex items-center gap-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0"
                    onClick={() => onPreview?.(file)}
                  >
                    <ExternalLinkIcon className="size-4" />
                  </Button>
                  {file.downloadUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-8 p-0"
                      onClick={() => onDownload?.(file)}
                    >
                      <DownloadIcon className="size-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
            {file.description && (
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {file.description}
              </p>
            )}
          </div>
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-x-4 rounded-xl border border-border bg-card p-4",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-x-4">
          <div className={cn("flex size-12 items-center justify-center rounded-xl", colorClass)}>
            <Icon className="size-6" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{file.name}</p>
            <div className="mt-1 flex items-center gap-x-2 text-sm text-muted-foreground">
              {file.extension && <span>{file.extension.toUpperCase()}</span>}
              {file.size && <span>{file.size}</span>}
              {file.modifiedDate && <span>Modified {file.modifiedDate}</span>}
            </div>
          </div>
        </div>
        {showActions && (
          <div className="flex items-center gap-x-2">
            {file.previewUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0"
                onClick={() => onPreview?.(file)}
              >
                <ExternalLinkIcon className="size-4" />
              </Button>
            )}
            {file.downloadUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0"
                onClick={() => onDownload?.(file)}
              >
                <DownloadIcon className="size-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0"
              onClick={() => onMoreClick?.(file)}
            >
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </div>
        )}
      </div>
    );
  }
);
FileSnippet.displayName = "FileSnippet";

// List component for multiple file snippets
export interface FileSnippetListProps extends React.HTMLAttributes<HTMLDivElement> {
  files: FileSnippetData[];
  variant?: FileSnippetProps["variant"];
  showActions?: boolean;
  onDownload?: (file: FileSnippetData) => void;
  onPreview?: (file: FileSnippetData) => void;
  onMoreClick?: (file: FileSnippetData) => void;
}

export const FileSnippetList = forwardRef<HTMLDivElement, FileSnippetListProps>(
  (
    {
      className,
      files,
      variant = "compact",
      showActions = true,
      onDownload,
      onPreview,
      onMoreClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        {...props}
      >
        {files.map((file) => (
          <FileSnippet
            key={file.id}
            file={file}
            variant={variant}
            showActions={showActions}
            onDownload={onDownload}
            onPreview={onPreview}
            onMoreClick={onMoreClick}
          />
        ))}
      </div>
    );
  }
);
FileSnippetList.displayName = "FileSnippetList";

// Grid component for preview variant
export interface FileSnippetGridProps extends React.HTMLAttributes<HTMLDivElement> {
  files: FileSnippetData[];
  columns?: 2 | 3 | 4;
  showActions?: boolean;
  onDownload?: (file: FileSnippetData) => void;
  onPreview?: (file: FileSnippetData) => void;
  onMoreClick?: (file: FileSnippetData) => void;
}

const columnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export const FileSnippetGrid = forwardRef<HTMLDivElement, FileSnippetGridProps>(
  (
    {
      className,
      files,
      columns = 3,
      showActions = true,
      onDownload,
      onPreview,
      onMoreClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("grid gap-4", columnClasses[columns], className)}
        {...props}
      >
        {files.map((file) => (
          <FileSnippet
            key={file.id}
            file={file}
            variant="preview"
            showActions={showActions}
            onDownload={onDownload}
            onPreview={onPreview}
            onMoreClick={onMoreClick}
          />
        ))}
      </div>
    );
  }
);
FileSnippetGrid.displayName = "FileSnippetGrid";
