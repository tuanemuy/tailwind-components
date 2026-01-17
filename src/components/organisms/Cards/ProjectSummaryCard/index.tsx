import { forwardRef } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { AvatarGroup } from "@/components/molecules/AvatarGroup";
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  MoreHorizontalIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

export type ProjectStatus =
  | "active"
  | "completed"
  | "on-hold"
  | "cancelled"
  | "pending";

const statusConfig: Record<
  ProjectStatus,
  {
    label: string;
    variant:
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | "success"
      | "warning";
  }
> = {
  active: { label: "Active", variant: "success" },
  completed: { label: "Completed", variant: "default" },
  "on-hold": { label: "On Hold", variant: "warning" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  pending: { label: "Pending", variant: "secondary" },
};

export interface ProjectMember {
  name: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

export interface ProjectSummary {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  progress?: number;
  dueDate?: string;
  startDate?: string;
  members?: ProjectMember[];
  tasksTotal?: number;
  tasksCompleted?: number;
  category?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  icon?: React.ReactNode;
}

export interface ProjectSummaryCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  project: ProjectSummary;
  variant?: "default" | "compact" | "detailed" | "mini";
  showProgress?: boolean;
  showMembers?: boolean;
  actions?: React.ReactNode;
  onProjectClick?: (project: ProjectSummary) => void;
}

const priorityColors: Record<string, string> = {
  low: "bg-muted",
  medium: "bg-info",
  high: "bg-warning",
  urgent: "bg-destructive",
};

export const ProjectSummaryCard = forwardRef<
  HTMLDivElement,
  ProjectSummaryCardProps
>(
  (
    {
      className,
      project,
      variant = "default",
      showProgress = true,
      showMembers = true,
      actions,
      onProjectClick,
      ...props
    },
    ref,
  ) => {
    const statusInfo = statusConfig[project.status];

    if (variant === "mini") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-between rounded-lg border border-border bg-card p-3",
            onProjectClick && "cursor-pointer hover:border-primary/50",
            className,
          )}
          {...(onProjectClick && {
            role: "button",
            tabIndex: 0,
            onClick: () => onProjectClick(project),
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onProjectClick(project);
              }
            },
          })}
          {...props}
        >
          <div className="flex items-center gap-x-3">
            {project.icon && (
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                {project.icon}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {project.name}
              </p>
              {project.tasksCompleted !== undefined &&
                project.tasksTotal !== undefined && (
                  <p className="text-xs text-muted-foreground">
                    {project.tasksCompleted}/{project.tasksTotal} tasks
                  </p>
                )}
            </div>
          </div>
          <Badge variant={statusInfo.variant} size="sm">
            {statusInfo.label}
          </Badge>
        </div>
      );
    }

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-xl border border-border bg-card p-4",
            onProjectClick && "cursor-pointer hover:border-primary/50",
            className,
          )}
          {...(onProjectClick && {
            role: "button",
            tabIndex: 0,
            onClick: () => onProjectClick(project),
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onProjectClick(project);
              }
            },
          })}
          {...props}
        >
          <div className="flex items-start justify-between gap-x-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-x-2">
                {project.priority && (
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      priorityColors[project.priority],
                    )}
                  />
                )}
                <h4 className="truncate font-medium text-foreground">
                  {project.name}
                </h4>
              </div>
              {project.description && (
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {project.description}
                </p>
              )}
            </div>
            <Badge variant={statusInfo.variant} size="sm">
              {statusInfo.label}
            </Badge>
          </div>

          {showProgress && project.progress !== undefined && (
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">
                  {project.progress}%
                </span>
              </div>
              <ProgressBar value={project.progress} size="sm" />
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            {project.dueDate && (
              <div className="flex items-center gap-x-1 text-xs text-muted-foreground">
                <CalendarIcon className="size-3" />
                <span>{project.dueDate}</span>
              </div>
            )}
            {showMembers && project.members && project.members.length > 0 && (
              <AvatarGroup
                items={project.members.map((m) => ({
                  src: m.avatarSrc,
                  initials: m.avatarFallback || m.name.charAt(0),
                  alt: m.name,
                }))}
                size="xs"
                max={3}
              />
            )}
          </div>
        </div>
      );
    }

    if (variant === "detailed") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-xl border border-border bg-card",
            onProjectClick && "cursor-pointer hover:border-primary/50",
            className,
          )}
          {...(onProjectClick && {
            role: "button",
            tabIndex: 0,
            onClick: () => onProjectClick(project),
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onProjectClick(project);
              }
            },
          })}
          {...props}
        >
          <div className="flex items-start justify-between p-4">
            <div className="flex items-start gap-x-4">
              {project.icon && (
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  {project.icon}
                </div>
              )}
              <div>
                <div className="flex items-center gap-x-2">
                  <h3 className="font-semibold text-foreground">
                    {project.name}
                  </h3>
                  {project.priority && (
                    <span
                      className={cn(
                        "size-2 rounded-full",
                        priorityColors[project.priority],
                      )}
                    />
                  )}
                </div>
                {project.category && (
                  <p className="text-sm text-muted-foreground">
                    {project.category}
                  </p>
                )}
                {project.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <Badge variant={statusInfo.variant} size="sm">
                {statusInfo.label}
              </Badge>
              {actions || (
                <Button variant="ghost" size="sm" className="size-8 p-0">
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              )}
            </div>
          </div>

          {showProgress && project.progress !== undefined && (
            <div className="border-t border-border px-4 py-3">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">
                  {project.progress}%
                </span>
              </div>
              <ProgressBar value={project.progress} size="sm" />
            </div>
          )}

          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <div className="flex items-center gap-x-4">
              {project.startDate && (
                <div className="flex items-center gap-x-1 text-xs text-muted-foreground">
                  <ClockIcon className="size-3.5" />
                  <span>{project.startDate}</span>
                </div>
              )}
              {project.dueDate && (
                <div className="flex items-center gap-x-1 text-xs text-muted-foreground">
                  <CalendarIcon className="size-3.5" />
                  <span>{project.dueDate}</span>
                </div>
              )}
              {project.tasksCompleted !== undefined &&
                project.tasksTotal !== undefined && (
                  <div className="flex items-center gap-x-1 text-xs text-muted-foreground">
                    <CheckIcon className="size-3.5" />
                    <span>
                      {project.tasksCompleted}/{project.tasksTotal} tasks
                    </span>
                  </div>
                )}
            </div>
            {showMembers && project.members && project.members.length > 0 && (
              <AvatarGroup
                items={project.members.map((m) => ({
                  src: m.avatarSrc,
                  initials: m.avatarFallback || m.name.charAt(0),
                  alt: m.name,
                }))}
                size="sm"
                max={4}
              />
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
          "rounded-xl border border-border bg-card p-4",
          onProjectClick && "cursor-pointer hover:border-primary/50",
          className,
        )}
        {...(onProjectClick && {
          role: "button",
          tabIndex: 0,
          onClick: () => onProjectClick(project),
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onProjectClick(project);
            }
          },
        })}
        {...props}
      >
        <div className="flex items-start justify-between gap-x-4">
          <div className="flex items-start gap-x-3">
            {project.icon && (
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                {project.icon}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-x-2">
                <h4 className="truncate font-semibold text-foreground">
                  {project.name}
                </h4>
                {project.priority && (
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      priorityColors[project.priority],
                    )}
                  />
                )}
              </div>
              {project.category && (
                <p className="text-sm text-muted-foreground">
                  {project.category}
                </p>
              )}
            </div>
          </div>
          <Badge variant={statusInfo.variant} size="sm">
            {statusInfo.label}
          </Badge>
        </div>

        {project.description && (
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
            {project.description}
          </p>
        )}

        {showProgress && project.progress !== undefined && (
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">
                {project.progress}%
              </span>
            </div>
            <ProgressBar value={project.progress} size="sm" />
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            {project.dueDate && (
              <div className="flex items-center gap-x-1 text-xs text-muted-foreground">
                <CalendarIcon className="size-3.5" />
                <span>{project.dueDate}</span>
              </div>
            )}
            {project.tasksCompleted !== undefined &&
              project.tasksTotal !== undefined && (
                <div className="flex items-center gap-x-1 text-xs text-muted-foreground">
                  <CheckIcon className="size-3.5" />
                  <span>
                    {project.tasksCompleted}/{project.tasksTotal}
                  </span>
                </div>
              )}
          </div>
          {showMembers && project.members && project.members.length > 0 && (
            <AvatarGroup
              items={project.members.map((m) => ({
                src: m.avatarSrc,
                initials: m.avatarFallback || m.name.charAt(0),
                alt: m.name,
              }))}
              size="xs"
              max={3}
            />
          )}
        </div>

        {actions && (
          <div className="mt-4 border-t border-border pt-4">{actions}</div>
        )}
      </div>
    );
  },
);
ProjectSummaryCard.displayName = "ProjectSummaryCard";

// Grid component for multiple project cards
export interface ProjectSummaryGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  projects: ProjectSummary[];
  variant?: ProjectSummaryCardProps["variant"];
  columns?: 2 | 3 | 4;
  showProgress?: boolean;
  showMembers?: boolean;
  onProjectClick?: (project: ProjectSummary) => void;
}

const columnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export const ProjectSummaryGrid = forwardRef<
  HTMLDivElement,
  ProjectSummaryGridProps
>(
  (
    {
      className,
      projects,
      variant = "default",
      columns = 3,
      showProgress = true,
      showMembers = true,
      onProjectClick,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn("grid gap-4", columnClasses[columns], className)}
        {...props}
      >
        {projects.map((project) => (
          <ProjectSummaryCard
            key={project.id}
            project={project}
            variant={variant}
            showProgress={showProgress}
            showMembers={showMembers}
            onProjectClick={onProjectClick}
          />
        ))}
      </div>
    );
  },
);
ProjectSummaryGrid.displayName = "ProjectSummaryGrid";
