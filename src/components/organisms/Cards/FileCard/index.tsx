import { forwardRef } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import {
  ArchiveIcon,
  DownloadIcon,
  EyeIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  ImageIcon,
  LinkIcon,
  MoreHorizontalIcon,
  MusicIcon,
  ShareIcon,
  StarIcon,
  TrashIcon,
  VideoIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

export type FileCardType =
  | "image"
  | "video"
  | "audio"
  | "document"
  | "code"
  | "archive"
  | "folder"
  | "other";

const fileTypeConfig: Record<
  FileCardType,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  image: { icon: ImageIcon, color: "text-success" },
  video: { icon: VideoIcon, color: "text-primary" },
  audio: { icon: MusicIcon, color: "text-warning" },
  document: { icon: FileTextIcon, color: "text-info" },
  code: { icon: FileCodeIcon, color: "text-destructive" },
  archive: { icon: ArchiveIcon, color: "text-muted-foreground" },
  folder: { icon: FolderIcon, color: "text-warning" },
  other: { icon: FileIcon, color: "text-muted-foreground" },
};

export interface FileOwner {
  id: string;
  name: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

export interface FileCardData {
  id: string;
  name: string;
  type: FileCardType;
  size?: string;
  previewUrl?: string;
  thumbnailUrl?: string;
  images?: string[]; // For multi-image variant
  createdAt?: string;
  modifiedAt?: string;
  owner?: FileOwner;
  sharedWith?: FileOwner[];
  isStarred?: boolean;
  isShared?: boolean;
  tags?: string[];
  description?: string;
  downloadUrl?: string;
  extension?: string;
}

export interface FileCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect" | "onClick"> {
  file: FileCardData;
  variant?: "default" | "grid" | "list" | "compact" | "multi-image";
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (id: string, selected: boolean) => void;
  onDownload?: (file: FileCardData) => void;
  onDelete?: (file: FileCardData) => void;
  onPreview?: (file: FileCardData) => void;
  onShare?: (file: FileCardData) => void;
  onStar?: (file: FileCardData, starred: boolean) => void;
  onClick?: (file: FileCardData) => void;
  actions?: React.ReactNode;
}

export const FileCard = forwardRef<HTMLDivElement, FileCardProps>(
  (
    {
      className,
      file,
      variant = "default",
      selectable = false,
      selected = false,
      onSelect,
      onDownload,
      onDelete,
      onPreview,
      onShare,
      onStar,
      onClick,
      actions,
      ...props
    },
    ref,
  ) => {
    const typeConfig = fileTypeConfig[file.type];
    const FileTypeIcon = typeConfig.icon;

    const handleSelect = (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect?.(file.id, !selected);
    };

    // Multi-image variant
    if (variant === "multi-image" && file.images && file.images.length > 0) {
      const displayImages = file.images.slice(0, 4);
      const remainingCount = file.images.length - 4;

      const cardContent = (
        <>
          {/* Image Grid */}
          <div
            className={cn(
              "grid gap-0.5 bg-muted",
              displayImages.length === 1 && "grid-cols-1",
              displayImages.length === 2 && "grid-cols-2",
              displayImages.length >= 3 && "grid-cols-2 grid-rows-2",
            )}
          >
            {displayImages.map((img, index) => (
              <div
                key={`${file.id}-image-${img}-${index}`}
                className={cn(
                  "relative aspect-square overflow-hidden",
                  displayImages.length === 3 && index === 0 && "row-span-2",
                )}
              >
                <img
                  src={img}
                  alt={`${file.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
                {index === displayImages.length - 1 && remainingCount > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="text-lg font-semibold text-white">
                      +{remainingCount}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="p-3">
            <div className="flex items-start justify-between gap-x-2">
              <div className="min-w-0 flex-1">
                <h4 className="truncate font-medium text-foreground">
                  {file.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {file.images.length} images{file.size && ` · ${file.size}`}
                </p>
              </div>
              {selectable && (
                <Checkbox
                  checked={selected}
                  onChange={() => onSelect?.(file.id, !selected)}
                  onClick={handleSelect}
                />
              )}
            </div>
          </div>
        </>
      );

      return (
        <div
          ref={ref}
          className={cn(
            "group rounded-xl border border-border bg-card overflow-hidden",
            selected && "ring-2 ring-primary",
            className,
          )}
          {...props}
        >
          {onClick ? (
            <button
              type="button"
              className="w-full text-left"
              onClick={() => onClick(file)}
            >
              {cardContent}
            </button>
          ) : (
            cardContent
          )}
        </div>
      );
    }

    // Grid variant
    if (variant === "grid") {
      const gridContent = (
        <>
          {/* Preview Area */}
          <div className="relative aspect-[4/3] bg-muted">
            {file.previewUrl || file.thumbnailUrl ? (
              <img
                src={file.previewUrl || file.thumbnailUrl}
                alt={file.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <FileTypeIcon className={cn("size-12", typeConfig.color)} />
              </div>
            )}

            {/* Hover Actions */}
            <div className="absolute inset-0 flex items-center justify-center gap-x-2 bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
              {onPreview && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="size-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(file);
                  }}
                >
                  <EyeIcon className="size-4" />
                </Button>
              )}
              {onDownload && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="size-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload(file);
                  }}
                >
                  <DownloadIcon className="size-4" />
                </Button>
              )}
            </div>

            {/* Selection Checkbox */}
            {selectable && (
              <button
                type="button"
                className={cn(
                  "absolute left-2 top-2 opacity-0 transition-opacity group-hover:opacity-100",
                  selected && "opacity-100",
                )}
                onClick={handleSelect}
              >
                <Checkbox checked={selected} />
              </button>
            )}

            {/* Star */}
            {file.isStarred && (
              <div className="absolute right-2 top-2">
                <StarIcon className="size-4 fill-warning text-warning" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-3">
            <div className="flex items-start justify-between gap-x-2">
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-medium text-foreground">
                  {file.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {file.size}
                  {file.modifiedAt && ` · ${file.modifiedAt}`}
                </p>
              </div>
              {actions || (
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </>
      );

      return (
        <div
          ref={ref}
          className={cn(
            "group rounded-xl border border-border bg-card overflow-hidden",
            selected && "ring-2 ring-primary",
            className,
          )}
          {...props}
        >
          {onClick ? (
            <button
              type="button"
              className="w-full text-left"
              onClick={() => onClick(file)}
            >
              {gridContent}
            </button>
          ) : (
            gridContent
          )}
        </div>
      );
    }

    // List variant
    if (variant === "list") {
      const listContent = (
        <>
          {selectable && (
            <Checkbox
              checked={selected}
              onChange={() => onSelect?.(file.id, !selected)}
              onClick={handleSelect}
            />
          )}

          {/* Icon/Thumbnail */}
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            {file.thumbnailUrl ? (
              <img
                src={file.thumbnailUrl}
                alt={file.name}
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <FileTypeIcon className={cn("size-5", typeConfig.color)} />
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-x-2">
              <h4 className="truncate text-sm font-medium text-foreground">
                {file.name}
              </h4>
              {file.isStarred && (
                <StarIcon className="size-3.5 fill-warning text-warning" />
              )}
              {file.isShared && (
                <LinkIcon className="size-3.5 text-muted-foreground" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {file.size}
              {file.modifiedAt && ` · ${file.modifiedAt}`}
              {file.owner && ` · ${file.owner.name}`}
            </p>
          </div>

          {/* Owner */}
          {file.owner && (
            <Avatar
              src={file.owner.avatarSrc}
              fallback={file.owner.avatarFallback || file.owner.name.charAt(0)}
              size="sm"
              className="hidden sm:flex"
            />
          )}

          {/* Actions */}
          <fieldset className="flex items-center gap-x-1 border-0 p-0 m-0 opacity-0 transition-opacity group-hover:opacity-100">
            {actions || (
              <>
                {onDownload && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0"
                    onClick={() => onDownload(file)}
                  >
                    <DownloadIcon className="size-4" />
                  </Button>
                )}
                {onShare && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0"
                    onClick={() => onShare(file)}
                  >
                    <ShareIcon className="size-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="size-8 p-0 text-destructive hover:text-destructive"
                    onClick={() => onDelete(file)}
                  >
                    <TrashIcon className="size-4" />
                  </Button>
                )}
              </>
            )}
          </fieldset>
        </>
      );

      return (
        <div
          ref={ref}
          className={cn(
            "group rounded-lg border border-border bg-card",
            selected && "ring-2 ring-primary",
            onClick && "hover:border-primary/50",
            className,
          )}
          {...props}
        >
          {onClick ? (
            <button
              type="button"
              className="flex w-full items-center gap-x-4 p-3 text-left"
              onClick={() => onClick(file)}
            >
              {listContent}
            </button>
          ) : (
            <div className="flex items-center gap-x-4 p-3">{listContent}</div>
          )}
        </div>
      );
    }

    // Compact variant
    if (variant === "compact") {
      const compactContent = (
        <>
          {selectable && (
            <Checkbox
              checked={selected}
              onChange={() => onSelect?.(file.id, !selected)}
              onClick={handleSelect}
            />
          )}
          <FileTypeIcon className={cn("size-4 shrink-0", typeConfig.color)} />
          <span className="truncate text-sm text-foreground">{file.name}</span>
          {file.size && (
            <span className="ml-auto text-xs text-muted-foreground">
              {file.size}
            </span>
          )}
        </>
      );

      return (
        <div
          ref={ref}
          className={cn(
            "rounded-lg hover:bg-muted/50",
            selected && "bg-muted",
            className,
          )}
          {...props}
        >
          {onClick ? (
            <button
              type="button"
              className="flex w-full items-center gap-x-3 p-2 text-left"
              onClick={() => onClick(file)}
            >
              {compactContent}
            </button>
          ) : (
            <div className="flex items-center gap-x-3 p-2">
              {compactContent}
            </div>
          )}
        </div>
      );
    }

    // Default variant
    const defaultContent = (
      <>
        <div className="flex items-start justify-between gap-x-4">
          <div className="flex items-start gap-x-3">
            {selectable && (
              <Checkbox
                checked={selected}
                onChange={() => onSelect?.(file.id, !selected)}
                onClick={handleSelect}
                className="mt-0.5"
              />
            )}
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted">
              {file.thumbnailUrl ? (
                <img
                  src={file.thumbnailUrl}
                  alt={file.name}
                  className="h-full w-full rounded-xl object-cover"
                />
              ) : (
                <FileTypeIcon className={cn("size-6", typeConfig.color)} />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-x-2">
                <h4 className="truncate font-medium text-foreground">
                  {file.name}
                </h4>
                {file.isStarred && (
                  <StarIcon className="size-3.5 fill-warning text-warning" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {file.extension?.toUpperCase()}
                {file.size && ` · ${file.size}`}
              </p>
              {file.modifiedAt && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Modified {file.modifiedAt}
                </p>
              )}
            </div>
          </div>

          <fieldset className="flex items-center gap-x-1 border-0 p-0 m-0">
            {actions || (
              <Button variant="ghost" size="sm" className="size-8 p-0">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            )}
          </fieldset>
        </div>

        {file.description && (
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
            {file.description}
          </p>
        )}

        {file.tags && file.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {file.tags.map((tag) => (
              <Badge key={tag} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {(file.owner || file.sharedWith) && (
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            {file.owner && (
              <div className="flex items-center gap-x-2">
                <Avatar
                  src={file.owner.avatarSrc}
                  fallback={
                    file.owner.avatarFallback || file.owner.name.charAt(0)
                  }
                  size="sm"
                />
                <span className="text-sm text-muted-foreground">
                  {file.owner.name}
                </span>
              </div>
            )}
            {file.sharedWith && file.sharedWith.length > 0 && (
              <div className="flex items-center gap-x-1">
                <ShareIcon className="size-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Shared with {file.sharedWith.length}
                </span>
              </div>
            )}
          </div>
        )}
      </>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "group rounded-xl border border-border bg-card",
          selected && "ring-2 ring-primary",
          onClick && "hover:border-primary/50",
          className,
        )}
        {...props}
      >
        {onClick ? (
          <button
            type="button"
            className="w-full p-4 text-left"
            onClick={() => onClick(file)}
          >
            {defaultContent}
          </button>
        ) : (
          <div className="p-4">{defaultContent}</div>
        )}
      </div>
    );
  },
);
FileCard.displayName = "FileCard";

// Grid Layout
export interface FileCardGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  files: FileCardData[];
  variant?: "grid" | "multi-image";
  columns?: 2 | 3 | 4 | 5 | 6;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  onFileClick?: (file: FileCardData) => void;
  onDownload?: (file: FileCardData) => void;
  onPreview?: (file: FileCardData) => void;
}

const gridColumnClasses = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
};

export const FileCardGrid = forwardRef<HTMLDivElement, FileCardGridProps>(
  (
    {
      className,
      files,
      variant = "grid",
      columns = 4,
      selectable = false,
      selectedIds = [],
      onSelectionChange,
      onFileClick,
      onDownload,
      onPreview,
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
        className={cn("grid gap-4", gridColumnClasses[columns], className)}
        {...props}
      >
        {files.map((file) => (
          <FileCard
            key={file.id}
            file={file}
            variant={variant}
            selectable={selectable}
            selected={selectedIds.includes(file.id)}
            onSelect={handleSelect}
            onClick={onFileClick}
            onDownload={onDownload}
            onPreview={onPreview}
          />
        ))}
      </div>
    );
  },
);
FileCardGrid.displayName = "FileCardGrid";

// List Layout
export interface FileCardListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  files: FileCardData[];
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  onFileClick?: (file: FileCardData) => void;
  onDownload?: (file: FileCardData) => void;
  onShare?: (file: FileCardData) => void;
  onDelete?: (file: FileCardData) => void;
}

export const FileCardList = forwardRef<HTMLDivElement, FileCardListProps>(
  (
    {
      className,
      files,
      selectable = false,
      selectedIds = [],
      onSelectionChange,
      onFileClick,
      onDownload,
      onShare,
      onDelete,
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
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {files.map((file) => (
          <FileCard
            key={file.id}
            file={file}
            variant="list"
            selectable={selectable}
            selected={selectedIds.includes(file.id)}
            onSelect={handleSelect}
            onClick={onFileClick}
            onDownload={onDownload}
            onShare={onShare}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  },
);
FileCardList.displayName = "FileCardList";
