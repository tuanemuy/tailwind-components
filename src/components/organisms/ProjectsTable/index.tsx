"use client";

import { forwardRef, useMemo } from "react";
import { Badge, ProgressBar } from "@/components/atoms";
import { AvatarGroup } from "@/components/molecules";
import { cn } from "@/lib/utils";
import {
  DataTable,
  type DataTableColumn,
  type DataTableProps,
} from "../DataTable";

// ============================================
// Project Types
// ============================================

export type ProjectStatus =
  | "active"
  | "completed"
  | "on_hold"
  | "cancelled"
  | "draft";

export interface ProjectMember {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  progress: number;
  startDate?: string;
  dueDate?: string;
  members?: ProjectMember[];
  budget?: number;
  spent?: number;
  priority?: "low" | "medium" | "high";
  tags?: string[];
}

// ============================================
// ProjectsTable Props
// ============================================

export interface ProjectsTableProps
  extends Omit<DataTableProps<Project>, "data" | "columns" | "getRowKey"> {
  projects: Project[];
  showProgress?: boolean;
  showMembers?: boolean;
  showBudget?: boolean;
  showDates?: boolean;
  onProjectClick?: (project: Project) => void;
  customColumns?: DataTableColumn<Project>[];
}

// ============================================
// Status Badge Component
// ============================================

const statusConfig: Record<
  ProjectStatus,
  {
    label: string;
    variant: "success" | "warning" | "destructive" | "secondary" | "default";
  }
> = {
  active: { label: "Active", variant: "success" },
  completed: { label: "Completed", variant: "default" },
  on_hold: { label: "On Hold", variant: "warning" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  draft: { label: "Draft", variant: "secondary" },
};

const priorityConfig: Record<
  "low" | "medium" | "high",
  { label: string; variant: "success" | "warning" | "destructive" }
> = {
  low: { label: "Low", variant: "success" },
  medium: { label: "Medium", variant: "warning" },
  high: { label: "High", variant: "destructive" },
};

// ============================================
// ProjectsTable Component
// ============================================

export const ProjectsTable = forwardRef<HTMLDivElement, ProjectsTableProps>(
  (
    {
      className,
      projects,
      showProgress = true,
      showMembers = true,
      showBudget = false,
      showDates = true,
      onProjectClick,
      customColumns,
      ...props
    },
    ref,
  ) => {
    const columns = useMemo<DataTableColumn<Project>[]>(() => {
      const baseColumns: DataTableColumn<Project>[] = [
        {
          key: "name",
          header: "Project",
          sortable: true,
          filterable: true,
          filterType: "text",
          minWidth: "200px",
          render: (_, project) => (
            <div className="flex flex-col">
              <span className="font-medium text-foreground">
                {project.name}
              </span>
              {project.description && (
                <span className="text-sm text-muted-foreground truncate max-w-xs">
                  {project.description}
                </span>
              )}
            </div>
          ),
        },
        {
          key: "status",
          header: "Status",
          sortable: true,
          filterable: true,
          filterType: "select",
          filterOptions: Object.entries(statusConfig).map(
            ([value, { label }]) => ({
              value,
              label,
            }),
          ),
          width: "120px",
          render: (_, project) => {
            const config = statusConfig[project.status];
            return (
              <Badge variant={config.variant} size="sm">
                {config.label}
              </Badge>
            );
          },
        },
      ];

      if (showProgress) {
        baseColumns.push({
          key: "progress",
          header: "Progress",
          sortable: true,
          width: "150px",
          render: (_, project) => (
            <div className="flex items-center gap-2">
              <ProgressBar
                value={project.progress}
                size="sm"
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">
                {project.progress}%
              </span>
            </div>
          ),
        });
      }

      if (showMembers) {
        baseColumns.push({
          key: "members",
          header: "Team",
          width: "140px",
          render: (_, project) => {
            if (!project.members?.length) {
              return <span className="text-muted-foreground">-</span>;
            }
            return (
              <AvatarGroup
                avatars={project.members.map((m) => ({
                  src: m.avatar,
                  alt: m.name,
                  fallback: m.name.slice(0, 2),
                }))}
                max={4}
                size="sm"
              />
            );
          },
        });
      }

      if (showDates) {
        baseColumns.push({
          key: "dueDate",
          header: "Due Date",
          sortable: true,
          width: "120px",
          render: (_, project) => {
            if (!project.dueDate) {
              return <span className="text-muted-foreground">-</span>;
            }
            const date = new Date(project.dueDate);
            const isOverdue =
              date < new Date() && project.status !== "completed";
            return (
              <span
                className={cn(
                  "text-sm",
                  isOverdue && "text-destructive font-medium",
                )}
              >
                {date.toLocaleDateString()}
              </span>
            );
          },
        });
      }

      if (showBudget) {
        baseColumns.push({
          key: "budget",
          header: "Budget",
          sortable: true,
          align: "end",
          width: "120px",
          render: (_, project) => {
            if (!project.budget) {
              return <span className="text-muted-foreground">-</span>;
            }
            const spent = project.spent || 0;
            const percentage = (spent / project.budget) * 100;
            const isOverBudget = percentage > 100;
            return (
              <div className="text-end">
                <div
                  className={cn(
                    "text-sm font-medium",
                    isOverBudget && "text-destructive",
                  )}
                >
                  ${spent.toLocaleString()} / ${project.budget.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {percentage.toFixed(0)}% used
                </div>
              </div>
            );
          },
        });
      }

      baseColumns.push({
        key: "priority",
        header: "Priority",
        sortable: true,
        filterable: true,
        filterType: "select",
        filterOptions: Object.entries(priorityConfig).map(
          ([value, { label }]) => ({
            value,
            label,
          }),
        ),
        width: "100px",
        render: (_, project) => {
          if (!project.priority) {
            return <span className="text-muted-foreground">-</span>;
          }
          const config = priorityConfig[project.priority];
          return (
            <Badge variant={config.variant} size="sm">
              {config.label}
            </Badge>
          );
        },
      });

      // Add custom columns
      if (customColumns) {
        baseColumns.push(...customColumns);
      }

      return baseColumns;
    }, [showProgress, showMembers, showBudget, showDates, customColumns]);

    return (
      <DataTable<Project>
        ref={ref}
        className={className}
        data={projects}
        columns={columns}
        getRowKey={(project) => project.id}
        onRowClick={onProjectClick}
        {...props}
      />
    );
  },
);

ProjectsTable.displayName = "ProjectsTable";
