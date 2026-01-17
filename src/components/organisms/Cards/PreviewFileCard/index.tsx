import { forwardRef } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import {
  DownloadIcon,
  EyeIcon,
  FileIcon,
  FileTextIcon,
  ImageIcon,
  MoreHorizontalIcon,
  ShareIcon,
  StarIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";
import { fileTypeColorConfig } from "@/components/variants";

export type PreviewFileType =
  | "document"
  | "image"
  | "video"
  | "audio"
  | "code"
  | "spreadsheet"
  | "presentation"
  | "other";

const previewFileTypeIcons: Record<
  PreviewFileType,
  React.FC<{ className?: string }>
> = {
  document: FileTextIcon,
  image: ImageIcon,
  video: FileIcon,
  audio: FileIcon,
  code: FileIcon,
  spreadsheet: FileIcon,
  presentation: FileIcon,
  other: FileIcon,
};

export interface PreviewFileOwner {
  name: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

export interface PreviewFileData {
  id: string;
  name: string;
  type: PreviewFileType;
  size?: string;
  extension?: string;
  previewUrl?: string;
  thumbnailUrl?: string;
  downloadUrl?: string;
  modifiedDate?: string;
  createdDate?: string;
  description?: string;
  owner?: PreviewFileOwner;
  isStarred?: boolean;
  isShared?: boolean;
  views?: number;
  downloads?: number;
}

export interface PreviewFileCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  file: PreviewFileData;
  variant?: "default" | "compact" | "detailed" | "horizontal";
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (id: string, selected: boolean) => void;
  onFileClick?: (file: PreviewFileData) => void;
  onPreview?: (file: PreviewFileData) => void;
  onDownload?: (file: PreviewFileData) => void;
  onStarClick?: (file: PreviewFileData) => void;
  onMoreClick?: (file: PreviewFileData) => void;
  actions?: React.ReactNode;
}

export const PreviewFileCard = forwardRef<HTMLDivElement, PreviewFileCardProps>(
  (
    {
      className,
      file,
      variant = "default",
      selectable = false,
      selected = false,
      onSelect,
      onFileClick,
      onPreview,
      onDownload,
      onStarClick,
      onMoreClick,
      actions,
      ...props
    },
    ref,
  ) => {
    const colorClass = fileTypeColorConfig[file.type];
    const Icon = previewFileTypeIcons[file.type];

    const handleSelect = () => {
      onSelect?.(file.id, !selected);
    };

    if (variant === "horizontal") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex gap-x-4 rounded-xl border border-border bg-card p-4",
            onFileClick && "cursor-pointer hover:border-primary/50",
            selected && "ring-2 ring-primary",
            className,
          )}
          role={onFileClick ? "button" : undefined}
          tabIndex={onFileClick ? 0 : undefined}
          onClick={() => onFileClick?.(file)}
          onKeyDown={
            onFileClick
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onFileClick?.(file);
                  }
                }
              : undefined
          }
          {...props}
        >
          {/* Preview/Thumbnail */}
          <div className="relative shrink-0">
            {selectable && (
              <div className="absolute -left-2 -top-2 z-10">
                <Checkbox
                  checked={selected}
                  onChange={handleSelect}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            {file.thumbnailUrl || file.previewUrl ? (
              <button
                type="button"
                className="size-24 cursor-pointer overflow-hidden rounded-lg bg-muted"
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview?.(file);
                }}
              >
                <img
                  src={file.thumbnailUrl || file.previewUrl}
                  alt={file.name}
                  className="size-full object-cover"
                />
              </button>
            ) : (
              <div
                className={cn(
                  "flex size-24 items-center justify-center rounded-lg",
                  colorClass,
                )}
              >
                <Icon className="size-10" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-x-4">
              <div className="min-w-0">
                <div className="flex items-center gap-x-2">
                  <h4 className="truncate font-medium text-foreground">
                    {file.name}
                  </h4>
                  {file.isStarred && (
                    <StarIcon className="size-4 shrink-0 fill-warning text-warning" />
                  )}
                </div>
                {file.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {file.description}
                  </p>
                )}
              </div>
              {actions || (
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-8 shrink-0 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoreClick?.(file);
                  }}
                >
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-x-4 text-xs text-muted-foreground">
                {file.extension && (
                  <Badge variant="secondary" size="sm">
                    {file.extension.toUpperCase()}
                  </Badge>
                )}
                {file.size && <span>{file.size}</span>}
                {file.modifiedDate && <span>{file.modifiedDate}</span>}
              </div>
              {file.owner && (
                <div className="flex items-center gap-x-2">
                  <Avatar
                    src={file.owner.avatarSrc}
                    fallback={
                      file.owner.avatarFallback || file.owner.name.charAt(0)
                    }
                    size="xs"
                  />
                  <span className="text-xs text-muted-foreground">
                    {file.owner.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-x-3 rounded-lg border border-border bg-card p-3",
            onFileClick && "cursor-pointer hover:border-primary/50",
            selected && "ring-2 ring-primary",
            className,
          )}
          role={onFileClick ? "button" : undefined}
          tabIndex={onFileClick ? 0 : undefined}
          onClick={() => onFileClick?.(file)}
          onKeyDown={
            onFileClick
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onFileClick?.(file);
                  }
                }
              : undefined
          }
          {...props}
        >
          {selectable && (
            <Checkbox
              checked={selected}
              onChange={handleSelect}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          {file.thumbnailUrl ? (
            <div className="size-10 shrink-0 overflow-hidden rounded-lg">
              <img
                src={file.thumbnailUrl}
                alt={file.name}
                className="size-full object-cover"
              />
            </div>
          ) : (
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-lg",
                colorClass,
              )}
            >
              <Icon className="size-5" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground">{file.size}</p>
          </div>
          {file.isStarred && (
            <StarIcon className="size-4 shrink-0 fill-warning text-warning" />
          )}
        </div>
      );
    }

    if (variant === "detailed") {
      return (
        <div
          ref={ref}
          className={cn(
            "overflow-hidden rounded-xl border border-border bg-card",
            selected && "ring-2 ring-primary",
            className,
          )}
          {...props}
        >
          {/* Preview Area */}
          <button
            type="button"
            className="relative aspect-[4/3] cursor-pointer bg-muted w-full"
            onClick={() => onPreview?.(file)}
          >
            {selectable && (
              <div className="absolute left-3 top-3 z-10">
                <Checkbox
                  checked={selected}
                  onChange={handleSelect}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-background/80 backdrop-blur"
                />
              </div>
            )}
            {file.isStarred && (
              <button
                type="button"
                className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-1.5 backdrop-blur"
                onClick={(e) => {
                  e.stopPropagation();
                  onStarClick?.(file);
                }}
              >
                <StarIcon className="size-4 fill-warning text-warning" />
              </button>
            )}
            {file.previewUrl || file.thumbnailUrl ? (
              <img
                src={file.previewUrl || file.thumbnailUrl}
                alt={file.name}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <Icon className="size-20 text-muted-foreground/50" />
              </div>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity hover:opacity-100">
              <Button variant="secondary" size="sm">
                <EyeIcon className="mr-2 size-4" />
                Preview
              </Button>
            </div>
          </button>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-x-3">
              <div className="min-w-0 flex-1">
                <h4 className="truncate font-medium text-foreground">
                  {file.name}
                </h4>
                {file.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {file.description}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="size-8 shrink-0 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onMoreClick?.(file);
                }}
              >
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {file.extension && (
                <Badge variant="secondary" size="sm">
                  {file.extension.toUpperCase()}
                </Badge>
              )}
              {file.size && <span>{file.size}</span>}
              {file.views !== undefined && <span>{file.views} views</span>}
              {file.downloads !== undefined && (
                <span>{file.downloads} downloads</span>
              )}
            </div>

            {file.owner && (
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-x-2">
                  <Avatar
                    src={file.owner.avatarSrc}
                    fallback={
                      file.owner.avatarFallback || file.owner.name.charAt(0)
                    }
                    size="sm"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {file.owner.name}
                    </p>
                    {file.modifiedDate && (
                      <p className="text-xs text-muted-foreground">
                        {file.modifiedDate}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-x-1">
                  {file.isShared && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-8 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ShareIcon className="size-4" />
                    </Button>
                  )}
                  {file.downloadUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownload?.(file);
                      }}
                    >
                      <DownloadIcon className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
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
          "overflow-hidden rounded-xl border border-border bg-card",
          onFileClick && "cursor-pointer hover:border-primary/50",
          selected && "ring-2 ring-primary",
          className,
        )}
        role={onFileClick ? "button" : undefined}
        tabIndex={onFileClick ? 0 : undefined}
        onClick={() => onFileClick?.(file)}
        onKeyDown={
          onFileClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onFileClick?.(file);
                }
              }
            : undefined
        }
        {...props}
      >
        {/* Preview Area */}
        <button
          type="button"
          className="relative aspect-video cursor-pointer bg-muted w-full"
          onClick={(e) => {
            e.stopPropagation();
            onPreview?.(file);
          }}
        >
          {selectable && (
            <div className="absolute left-3 top-3 z-10">
              <Checkbox
                checked={selected}
                onChange={handleSelect}
                onClick={(e) => e.stopPropagation()}
                className="bg-background/80 backdrop-blur"
              />
            </div>
          )}
          {file.previewUrl || file.thumbnailUrl ? (
            <img
              src={file.previewUrl || file.thumbnailUrl}
              alt={file.name}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <Icon className="size-16 text-muted-foreground/50" />
            </div>
          )}
        </button>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-x-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-x-2">
                <h4 className="truncate font-medium text-foreground">
                  {file.name}
                </h4>
                {file.isStarred && (
                  <StarIcon className="size-4 shrink-0 fill-warning text-warning" />
                )}
              </div>
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
            <div className="flex items-center gap-x-1">
              {file.downloadUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload?.(file);
                  }}
                >
                  <DownloadIcon className="size-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onMoreClick?.(file);
                }}
              >
                <MoreHorizontalIcon className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
PreviewFileCard.displayName = "PreviewFileCard";

// Grid component for multiple file cards
export interface PreviewFileCardGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  files: PreviewFileData[];
  variant?: PreviewFileCardProps["variant"];
  columns?: 2 | 3 | 4;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  onFileClick?: (file: PreviewFileData) => void;
  onPreview?: (file: PreviewFileData) => void;
  onDownload?: (file: PreviewFileData) => void;
  onStarClick?: (file: PreviewFileData) => void;
  onMoreClick?: (file: PreviewFileData) => void;
}

const columnClasses: Record<number, string> = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export const PreviewFileCardGrid = forwardRef<
  HTMLDivElement,
  PreviewFileCardGridProps
>(
  (
    {
      className,
      files,
      variant = "default",
      columns = 3,
      selectable = false,
      selectedIds = [],
      onSelectionChange,
      onFileClick,
      onPreview,
      onDownload,
      onStarClick,
      onMoreClick,
      ...props
    },
    ref,
  ) => {
    const handleSelect = (id: string, selected: boolean) => {
      if (selected) {
        onSelectionChange?.([...selectedIds, id]);
      } else {
        onSelectionChange?.(
          selectedIds.filter((selectedId) => selectedId !== id),
        );
      }
    };

    return (
      <div
        ref={ref}
        className={cn("grid gap-4", columnClasses[columns], className)}
        {...props}
      >
        {files.map((file) => (
          <PreviewFileCard
            key={file.id}
            file={file}
            variant={variant}
            selectable={selectable}
            selected={selectedIds.includes(file.id)}
            onSelect={handleSelect}
            onFileClick={onFileClick}
            onPreview={onPreview}
            onDownload={onDownload}
            onStarClick={onStarClick}
            onMoreClick={onMoreClick}
          />
        ))}
      </div>
    );
  },
);
PreviewFileCardGrid.displayName = "PreviewFileCardGrid";
