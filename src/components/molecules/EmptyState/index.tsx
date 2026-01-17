"use client";

import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { FileIcon, FolderIcon, SearchIcon, UsersIcon } from "@/components/icons";
import { cn } from "@/components/utils";
import {
  emptyStateDescriptionVariants,
  emptyStateIconVariants,
  emptyStateTitleVariants,
  emptyStateVariants,
} from "@/components/variants/emptyState";

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      size = "md",
      icon,
      title,
      description,
      action,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ size }), className)}
        {...props}
      >
        {icon && (
          <div className={cn(emptyStateIconVariants({ size }))}>{icon}</div>
        )}

        {title && (
          <h3 className={cn(emptyStateTitleVariants({ size }))}>{title}</h3>
        )}

        {description && (
          <p className={cn(emptyStateDescriptionVariants({ size }))}>
            {description}
          </p>
        )}

        {children}

        {action && <div className="mt-2">{action}</div>}
      </div>
    );
  },
);
EmptyState.displayName = "EmptyState";

// Pre-built empty state variations
export interface NoDataProps extends Omit<EmptyStateProps, "icon" | "title"> {
  title?: string;
}

export const NoData = forwardRef<HTMLDivElement, NoDataProps>(
  ({ title = "No data", ...props }, ref) => (
    <EmptyState ref={ref} icon={<FileIcon />} title={title} {...props} />
  ),
);
NoData.displayName = "NoData";

export interface NoResultsProps
  extends Omit<EmptyStateProps, "icon" | "title"> {
  title?: string;
  query?: string;
}

export const NoResults = forwardRef<HTMLDivElement, NoResultsProps>(
  ({ title = "No results found", query, description, ...props }, ref) => (
    <EmptyState
      ref={ref}
      icon={<SearchIcon />}
      title={title}
      description={
        description ??
        (query
          ? `No results for "${query}"`
          : "Try adjusting your search or filters")
      }
      {...props}
    />
  ),
);
NoResults.displayName = "NoResults";

export interface NoUsersProps extends Omit<EmptyStateProps, "icon" | "title"> {
  title?: string;
}

export const NoUsers = forwardRef<HTMLDivElement, NoUsersProps>(
  ({ title = "No users yet", ...props }, ref) => (
    <EmptyState ref={ref} icon={<UsersIcon />} title={title} {...props} />
  ),
);
NoUsers.displayName = "NoUsers";

export interface NoFilesProps extends Omit<EmptyStateProps, "icon" | "title"> {
  title?: string;
}

export const NoFiles = forwardRef<HTMLDivElement, NoFilesProps>(
  ({ title = "No files", ...props }, ref) => (
    <EmptyState ref={ref} icon={<FolderIcon />} title={title} {...props} />
  ),
);
NoFiles.displayName = "NoFiles";
