import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { FileItem } from "@/components/molecules";
import type { FileItemProps } from "@/components/molecules";
import type { LayoutVariant } from "@/lib/types";

export interface FileListItem extends FileItemProps {
  id: string;
}

export interface FileListProps extends React.HTMLAttributes<HTMLDivElement> {
  files: FileListItem[];
  layout?: LayoutVariant;
  columns?: 1 | 2 | 3 | 4 | "auto";
  gap?: "sm" | "md" | "lg";
  emptyState?: React.ReactNode;
}

const gapClasses = {
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
};

const gridColumnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export const FileList = forwardRef<HTMLDivElement, FileListProps>(
  (
    {
      className,
      files,
      layout = "list",
      columns = "auto",
      gap = "md",
      emptyState,
      ...props
    },
    ref,
  ) => {
    if (files.length === 0) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center py-12", className)}
          {...props}
        >
          {emptyState || (
            <p className="text-sm text-muted-foreground">No files found</p>
          )}
        </div>
      );
    }

    if (layout === "list") {
      return (
        <div
          ref={ref}
          className={cn("flex flex-col", gapClasses[gap], className)}
          {...props}
        >
          {files.map(({ id, ...file }) => (
            <FileItem key={id} {...file} />
          ))}
        </div>
      );
    }

    // Grid layout
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          gridColumnClasses[columns],
          gapClasses[gap],
          className,
        )}
        {...props}
      >
        {files.map(({ id, ...file }) => (
          <FileItem key={id} {...file} />
        ))}
      </div>
    );
  },
);
FileList.displayName = "FileList";
