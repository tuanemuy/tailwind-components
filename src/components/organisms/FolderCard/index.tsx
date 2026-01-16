import { forwardRef } from "react";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import {
  FolderIcon,
  LockIcon,
  MoreHorizontalIcon,
  StarIcon,
  UsersIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";
import { type FolderColor, folderColorConfig } from "@/lib/variants";

export interface FolderData {
  id: string;
  name: string;
  itemCount?: number;
  size?: string;
  modifiedDate?: string;
  color?: FolderColor;
  isStarred?: boolean;
  isShared?: boolean;
  isPrivate?: boolean;
  description?: string;
}

export interface FolderCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  folder: FolderData;
  variant?: "default" | "compact" | "list" | "grid";
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (id: string, selected: boolean) => void;
  onFolderClick?: (folder: FolderData) => void;
  onStarClick?: (folder: FolderData) => void;
  onMoreClick?: (folder: FolderData) => void;
}

export const FolderCard = forwardRef<HTMLDivElement, FolderCardProps>(
  (
    {
      className,
      folder,
      variant = "default",
      selectable = false,
      selected = false,
      onSelect,
      onFolderClick,
      onStarClick,
      onMoreClick,
      ...props
    },
    ref,
  ) => {
    const colorClass = folderColorConfig[folder.color || "default"];

    const handleSelect = () => {
      onSelect?.(folder.id, !selected);
    };

    const interactiveProps = onFolderClick
      ? {
          role: "button" as const,
          tabIndex: 0,
          onClick: () => onFolderClick(folder),
          onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onFolderClick(folder);
            }
          },
        }
      : {};

    if (variant === "list") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-between gap-x-4 rounded-lg border border-border bg-card p-3 transition-colors",
            onFolderClick && "cursor-pointer hover:border-primary/50",
            selected && "ring-2 ring-primary",
            className,
          )}
          {...interactiveProps}
          {...props}
        >
          <div className="flex items-center gap-x-3">
            {selectable && (
              <Checkbox
                checked={selected}
                onChange={handleSelect}
                onClick={(e) => e.stopPropagation()}
              />
            )}
            <div
              className={cn(
                "flex size-9 items-center justify-center rounded-lg",
                colorClass,
              )}
            >
              <FolderIcon className="size-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-x-2">
                <p className="truncate text-sm font-medium text-foreground">
                  {folder.name}
                </p>
                {folder.isStarred && (
                  <StarIcon className="size-3.5 fill-warning text-warning" />
                )}
                {folder.isPrivate && (
                  <LockIcon className="size-3.5 text-muted-foreground" />
                )}
                {folder.isShared && (
                  <UsersIcon className="size-3.5 text-muted-foreground" />
                )}
              </div>
              <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
                {folder.itemCount !== undefined && (
                  <span>{folder.itemCount} items</span>
                )}
                {folder.size && <span>{folder.size}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            {folder.modifiedDate && (
              <span className="text-xs text-muted-foreground">
                {folder.modifiedDate}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onMoreClick?.(folder);
              }}
            >
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </div>
        </div>
      );
    }

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-x-3 rounded-lg border border-border bg-card p-3 transition-colors",
            onFolderClick && "cursor-pointer hover:border-primary/50",
            selected && "ring-2 ring-primary",
            className,
          )}
          {...interactiveProps}
          {...props}
        >
          {selectable && (
            <Checkbox
              checked={selected}
              onChange={handleSelect}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-lg",
              colorClass,
            )}
          >
            <FolderIcon className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {folder.name}
            </p>
          </div>
          {folder.isStarred && (
            <StarIcon className="size-3.5 shrink-0 fill-warning text-warning" />
          )}
        </div>
      );
    }

    if (variant === "grid") {
      return (
        <div
          ref={ref}
          className={cn(
            "group flex flex-col items-center rounded-xl border border-border bg-card p-4 text-center transition-colors",
            onFolderClick && "cursor-pointer hover:border-primary/50",
            selected && "ring-2 ring-primary",
            className,
          )}
          {...interactiveProps}
          {...props}
        >
          <div className="relative">
            {selectable && (
              <div className="absolute -left-6 -top-2">
                <Checkbox
                  checked={selected}
                  onChange={handleSelect}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <div
              className={cn(
                "flex size-16 items-center justify-center rounded-xl",
                colorClass,
              )}
            >
              <FolderIcon className="size-8" />
            </div>
            {folder.isStarred && (
              <StarIcon className="absolute -right-1 -top-1 size-4 fill-warning text-warning" />
            )}
          </div>
          <h4 className="mt-3 line-clamp-2 text-sm font-medium text-foreground">
            {folder.name}
          </h4>
          <div className="mt-1 flex items-center justify-center gap-x-2 text-xs text-muted-foreground">
            {folder.itemCount !== undefined && (
              <span>{folder.itemCount} items</span>
            )}
            {folder.isPrivate && <LockIcon className="size-3" />}
            {folder.isShared && <UsersIcon className="size-3" />}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 size-7 p-0 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              onMoreClick?.(folder);
            }}
          >
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card p-4 transition-colors",
          onFolderClick && "cursor-pointer hover:border-primary/50",
          selected && "ring-2 ring-primary",
          className,
        )}
        {...interactiveProps}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-x-3">
            {selectable && (
              <Checkbox
                checked={selected}
                onChange={handleSelect}
                onClick={(e) => e.stopPropagation()}
                className="mt-1"
              />
            )}
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-xl",
                colorClass,
              )}
            >
              <FolderIcon className="size-6" />
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            {folder.isStarred && (
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onStarClick?.(folder);
                }}
              >
                <StarIcon className="size-4 fill-warning text-warning" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onMoreClick?.(folder);
              }}
            >
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center gap-x-2">
            <h4 className="truncate font-medium text-foreground">
              {folder.name}
            </h4>
            {folder.isPrivate && (
              <LockIcon className="size-3.5 text-muted-foreground" />
            )}
            {folder.isShared && (
              <UsersIcon className="size-3.5 text-muted-foreground" />
            )}
          </div>
          {folder.description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {folder.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-x-3 text-xs text-muted-foreground">
            {folder.itemCount !== undefined && (
              <span>{folder.itemCount} items</span>
            )}
            {folder.size && <span>{folder.size}</span>}
            {folder.modifiedDate && <span>{folder.modifiedDate}</span>}
          </div>
        </div>
      </div>
    );
  },
);
FolderCard.displayName = "FolderCard";

// Grid component for multiple folders
export interface FolderCardGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  folders: FolderData[];
  variant?: FolderCardProps["variant"];
  columns?: 2 | 3 | 4 | 5 | 6;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  onFolderClick?: (folder: FolderData) => void;
  onStarClick?: (folder: FolderData) => void;
  onMoreClick?: (folder: FolderData) => void;
}

const columnClasses: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
};

export const FolderCardGrid = forwardRef<HTMLDivElement, FolderCardGridProps>(
  (
    {
      className,
      folders,
      variant = "grid",
      columns = 4,
      selectable = false,
      selectedIds = [],
      onSelectionChange,
      onFolderClick,
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
        {folders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            variant={variant}
            selectable={selectable}
            selected={selectedIds.includes(folder.id)}
            onSelect={handleSelect}
            onFolderClick={onFolderClick}
            onStarClick={onStarClick}
            onMoreClick={onMoreClick}
          />
        ))}
      </div>
    );
  },
);
FolderCardGrid.displayName = "FolderCardGrid";

// List component for folder list view
export interface FolderCardListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  folders: FolderData[];
  variant?: "list" | "compact";
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  onFolderClick?: (folder: FolderData) => void;
  onStarClick?: (folder: FolderData) => void;
  onMoreClick?: (folder: FolderData) => void;
}

export const FolderCardList = forwardRef<HTMLDivElement, FolderCardListProps>(
  (
    {
      className,
      folders,
      variant = "list",
      selectable = false,
      selectedIds = [],
      onSelectionChange,
      onFolderClick,
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
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {folders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            variant={variant}
            selectable={selectable}
            selected={selectedIds.includes(folder.id)}
            onSelect={handleSelect}
            onFolderClick={onFolderClick}
            onStarClick={onStarClick}
            onMoreClick={onMoreClick}
          />
        ))}
      </div>
    );
  },
);
FolderCardList.displayName = "FolderCardList";
