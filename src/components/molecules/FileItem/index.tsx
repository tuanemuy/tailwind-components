import { forwardRef } from "react";
import { Badge, Button } from "@/components/atoms";
import {
  FileIcon,
  FileTextIcon,
  FolderIcon,
  ImageIcon,
  MoreHorizontalIcon,
} from "@/components/icons";
import type { FileType } from "@/components/types";
import { cn } from "@/components/utils";

const fileTypeIcons: Record<
  FileType,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  image: ImageIcon,
  document: FileTextIcon,
  video: FileIcon,
  audio: FileIcon,
  archive: FileIcon,
  other: FileIcon,
};

const fileTypeColors: Record<FileType, string> = {
  image: "text-info",
  document: "text-primary",
  video: "text-warning",
  audio: "text-success",
  archive: "text-muted-foreground",
  other: "text-muted-foreground",
};

export interface FileItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  fileType?: FileType;
  size?: string;
  date?: string;
  isFolder?: boolean;
  status?: "pending" | "uploading" | "complete" | "error";
  progress?: number;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  onAction?: () => void;
}

export const FileItem = forwardRef<HTMLDivElement, FileItemProps>(
  (
    {
      className,
      name,
      fileType = "other",
      size,
      date,
      isFolder,
      status,
      progress,
      icon,
      actions,
      onAction,
      ...props
    },
    ref,
  ) => {
    const IconComponent = isFolder ? FolderIcon : fileTypeIcons[fileType];
    const iconColor = isFolder ? "text-warning" : fileTypeColors[fileType];

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-x-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50",
          className,
        )}
        {...props}
      >
        {/* Icon */}
        <div className={cn("shrink-0", iconColor)}>
          {icon || <IconComponent className="size-8" />}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-x-2">
            <p className="truncate font-medium text-foreground">{name}</p>
            {status === "uploading" && (
              <Badge variant="secondary" size="sm" soft>
                Uploading
              </Badge>
            )}
            {status === "error" && (
              <Badge variant="destructive" size="sm" soft>
                Error
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
            {size && <span>{size}</span>}
            {size && date && <span>•</span>}
            {date && <span>{date}</span>}
          </div>
          {status === "uploading" && typeof progress === "number" && (
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        {(actions || onAction) && (
          <div className="shrink-0">
            {actions || (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAction}
                aria-label="More actions"
              >
                <MoreHorizontalIcon className="size-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    );
  },
);
FileItem.displayName = "FileItem";
