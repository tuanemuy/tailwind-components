import { forwardRef } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { AvatarGroup } from "@/components/molecules/AvatarGroup";
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  EditIcon,
  LinkIcon,
  MoreHorizontalIcon,
  StarIcon,
  TagIcon,
  TrashIcon,
  UsersIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";
// Note: StarIcon is used in JSX

export type ProjectDetailStatus =
  | "active"
  | "completed"
  | "on-hold"
  | "cancelled"
  | "pending"
  | "in-progress"
  | "archived";

const statusConfig: Record<
  ProjectDetailStatus,
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
  "in-progress": { label: "In Progress", variant: "default" },
  completed: { label: "Completed", variant: "secondary" },
  "on-hold": { label: "On Hold", variant: "warning" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  pending: { label: "Pending", variant: "outline" },
  archived: { label: "Archived", variant: "secondary" },
};

export interface ProjectMember {
  id: string;
  name: string;
  email?: string;
  role?: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  assignee?: ProjectMember;
}

export interface ProjectDetails {
  id: string;
  name: string;
  description?: string;
  status: ProjectDetailStatus;
  priority?: "low" | "medium" | "high" | "urgent";
  progress?: number;
  startDate?: string;
  dueDate?: string;
  completedDate?: string;
  category?: string;
  tags?: string[];
  owner?: ProjectMember;
  members?: ProjectMember[];
  tasksTotal?: number;
  tasksCompleted?: number;
  tasks?: ProjectTask[];
  budget?: {
    total: number;
    spent: number;
    currency?: string;
  };
  attachments?: number;
  comments?: number;
  links?: { label: string; url: string }[];
  isStarred?: boolean;
  coverImage?: string;
  icon?: React.ReactNode;
  customFields?: { label: string; value: string }[];
}

export interface ProjectDetailsCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  project: ProjectDetails;
  variant?: "default" | "compact" | "detailed" | "horizontal";
  showProgress?: boolean;
  showMembers?: boolean;
  showTasks?: boolean;
  showBudget?: boolean;
  onEdit?: (project: ProjectDetails) => void;
  onDelete?: (project: ProjectDetails) => void;
  onStar?: (project: ProjectDetails, starred: boolean) => void;
  onProjectClick?: (project: ProjectDetails) => void;
  actions?: React.ReactNode;
}

const priorityColors: Record<string, string> = {
  low: "bg-muted",
  medium: "bg-info",
  high: "bg-warning",
  urgent: "bg-destructive",
};

const priorityLabels: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export const ProjectDetailsCard = forwardRef<
  HTMLDivElement,
  ProjectDetailsCardProps
>(
  (
    {
      className,
      project,
      variant = "default",
      showProgress = true,
      showMembers = true,
      showTasks = false,
      showBudget = false,
      onEdit,
      onDelete,
      onStar,
      onProjectClick,
      actions,
      ...props
    },
    ref,
  ) => {
    const statusInfo = statusConfig[project.status];
    const budgetPercentage = project.budget
      ? Math.round((project.budget.spent / project.budget.total) * 100)
      : 0;
    const currency = project.budget?.currency || "$";

    if (variant === "horizontal") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-between gap-x-4 rounded-xl border border-border bg-card p-4",
            onProjectClick && "cursor-pointer hover:border-primary/50",
            className,
          )}
          role={onProjectClick ? "button" : undefined}
          tabIndex={onProjectClick ? 0 : undefined}
          onClick={() => onProjectClick?.(project)}
          onKeyDown={
            onProjectClick
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onProjectClick?.(project);
                  }
                }
              : undefined
          }
          {...props}
        >
          <div className="flex min-w-0 flex-1 items-center gap-x-4">
            {project.icon && (
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                {project.icon}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-x-2">
                <h4 className="truncate font-semibold text-foreground">
                  {project.name}
                </h4>
                {project.isStarred && (
                  <StarIcon className="size-4 shrink-0 fill-warning text-warning" />
                )}
              </div>
              {project.category && (
                <p className="text-sm text-muted-foreground">
                  {project.category}
                </p>
              )}
              {project.description && (
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                  {project.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-x-6">
            {showProgress && project.progress !== undefined && (
              <div className="w-32">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">
                    {project.progress}%
                  </span>
                </div>
                <ProgressBar value={project.progress} size="sm" />
              </div>
            )}

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

            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>

            {(actions || onEdit || onDelete) && (
              <span
                className="flex items-center gap-x-1"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                role="presentation"
              >
                {actions || (
                  <>
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="size-8 p-0"
                        onClick={() => onEdit(project)}
                      >
                        <EditIcon className="size-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="size-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => onDelete(project)}
                      >
                        <TrashIcon className="size-4" />
                      </Button>
                    )}
                  </>
                )}
              </span>
            )}
          </div>
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
          role={onProjectClick ? "button" : undefined}
          tabIndex={onProjectClick ? 0 : undefined}
          onClick={() => onProjectClick?.(project)}
          onKeyDown={
            onProjectClick
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onProjectClick?.(project);
                  }
                }
              : undefined
          }
          {...props}
        >
          <div className="flex items-start justify-between gap-x-4">
            <div className="flex min-w-0 flex-1 items-start gap-x-3">
              {project.icon && (
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {project.icon}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-x-2">
                  <h4 className="truncate font-medium text-foreground">
                    {project.name}
                  </h4>
                  {project.priority && (
                    <span
                      className={cn(
                        "size-2 shrink-0 rounded-full",
                        priorityColors[project.priority],
                      )}
                    />
                  )}
                </div>
                {project.dueDate && (
                  <div className="mt-1 flex items-center gap-x-1 text-xs text-muted-foreground">
                    <CalendarIcon className="size-3" />
                    <span>{project.dueDate}</span>
                  </div>
                )}
              </div>
            </div>
            <Badge variant={statusInfo.variant} size="sm" className="shrink-0">
              {statusInfo.label}
            </Badge>
          </div>

          {showProgress && project.progress !== undefined && (
            <div className="mt-3">
              <ProgressBar value={project.progress} size="sm" />
            </div>
          )}
        </div>
      );
    }

    if (variant === "detailed") {
      return (
        <div
          ref={ref}
          className={cn("rounded-xl border border-border bg-card", className)}
          {...props}
        >
          {/* Cover Image */}
          {project.coverImage && (
            <div
              className="h-32 w-full rounded-t-xl bg-cover bg-center"
              style={{ backgroundImage: `url(${project.coverImage})` }}
            />
          )}

          {/* Header */}
          <div className="flex items-start justify-between gap-x-4 p-4">
            <div className="flex min-w-0 flex-1 items-start gap-x-4">
              {project.icon && (
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  {project.icon}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-x-2">
                  <h3 className="truncate font-semibold text-foreground">
                    {project.name}
                  </h3>
                  {project.isStarred && (
                    <button
                      type="button"
                      className="shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStar?.(project, false);
                      }}
                    >
                      <StarIcon className="size-4 fill-warning text-warning" />
                    </button>
                  )}
                </div>
                {project.category && (
                  <p className="text-sm text-muted-foreground">
                    {project.category}
                  </p>
                )}
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge variant={statusInfo.variant} size="sm">
                    {statusInfo.label}
                  </Badge>
                  {project.priority && (
                    <Badge variant="outline" size="sm">
                      {priorityLabels[project.priority]}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-2">
              {actions || (
                <Button variant="ghost" size="sm" className="size-8 p-0">
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <div className="px-4 pb-4">
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>
          )}

          {/* Progress */}
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

          {/* Dates & Tasks */}
          <div className="flex flex-wrap items-center gap-4 border-t border-border px-4 py-3">
            {project.startDate && (
              <div className="flex items-center gap-x-1.5 text-xs text-muted-foreground">
                <ClockIcon className="size-3.5" />
                <span>Started: {project.startDate}</span>
              </div>
            )}
            {project.dueDate && (
              <div className="flex items-center gap-x-1.5 text-xs text-muted-foreground">
                <CalendarIcon className="size-3.5" />
                <span>Due: {project.dueDate}</span>
              </div>
            )}
            {project.tasksCompleted !== undefined &&
              project.tasksTotal !== undefined && (
                <div className="flex items-center gap-x-1.5 text-xs text-muted-foreground">
                  <CheckIcon className="size-3.5" />
                  <span>
                    {project.tasksCompleted}/{project.tasksTotal} tasks
                  </span>
                </div>
              )}
          </div>

          {/* Budget */}
          {showBudget && project.budget && (
            <div className="border-t border-border px-4 py-3">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Budget</span>
                <span className="font-medium text-foreground">
                  {currency}
                  {project.budget.spent.toLocaleString()} / {currency}
                  {project.budget.total.toLocaleString()}
                </span>
              </div>
              <ProgressBar
                value={budgetPercentage}
                size="sm"
                color={
                  budgetPercentage > 90
                    ? "destructive"
                    : budgetPercentage > 75
                      ? "warning"
                      : "default"
                }
              />
            </div>
          )}

          {/* Tasks Preview */}
          {showTasks && project.tasks && project.tasks.length > 0 && (
            <div className="border-t border-border px-4 py-3">
              <h4 className="mb-2 text-sm font-medium text-foreground">
                Recent Tasks
              </h4>
              <div className="space-y-2">
                {project.tasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center gap-x-2">
                    <div
                      className={cn(
                        "size-4 rounded-full border flex items-center justify-center",
                        task.completed
                          ? "border-success bg-success"
                          : "border-muted-foreground/30",
                      )}
                    >
                      {task.completed && (
                        <CheckIcon className="size-3 text-success-foreground" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "flex-1 truncate text-sm",
                        task.completed
                          ? "text-muted-foreground line-through"
                          : "text-foreground",
                      )}
                    >
                      {task.title}
                    </span>
                    {task.assignee && (
                      <Avatar
                        src={task.assignee.avatarSrc}
                        fallback={
                          task.assignee.avatarFallback ||
                          task.assignee.name.charAt(0)
                        }
                        size="xs"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 border-t border-border px-4 py-3">
              <TagIcon className="size-3.5 text-muted-foreground" />
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Links */}
          {project.links && project.links.length > 0 && (
            <div className="border-t border-border px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    className="inline-flex items-center gap-x-1 text-xs text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LinkIcon className="size-3" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Members & Owner */}
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            {project.owner && (
              <div className="flex items-center gap-x-2">
                <Avatar
                  src={project.owner.avatarSrc}
                  fallback={
                    project.owner.avatarFallback || project.owner.name.charAt(0)
                  }
                  size="sm"
                />
                <div>
                  <p className="text-xs text-muted-foreground">Owner</p>
                  <p className="text-sm font-medium text-foreground">
                    {project.owner.name}
                  </p>
                </div>
              </div>
            )}
            {showMembers && project.members && project.members.length > 0 && (
              <div className="flex items-center gap-x-2">
                <UsersIcon className="size-4 text-muted-foreground" />
                <AvatarGroup
                  items={project.members.map((m) => ({
                    src: m.avatarSrc,
                    initials: m.avatarFallback || m.name.charAt(0),
                    alt: m.name,
                  }))}
                  size="sm"
                  max={5}
                />
              </div>
            )}
          </div>

          {/* Custom Fields */}
          {project.customFields && project.customFields.length > 0 && (
            <div className="grid grid-cols-2 gap-4 border-t border-border px-4 py-3">
              {project.customFields.map((field) => (
                <div key={field.label}>
                  <p className="text-xs text-muted-foreground">{field.label}</p>
                  <p className="text-sm font-medium text-foreground">
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card",
          onProjectClick && "cursor-pointer hover:border-primary/50",
          className,
        )}
        role={onProjectClick ? "button" : undefined}
        tabIndex={onProjectClick ? 0 : undefined}
        onClick={() => onProjectClick?.(project)}
        onKeyDown={
          onProjectClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onProjectClick?.(project);
                }
              }
            : undefined
        }
        {...props}
      >
        <div className="p-4">
          <div className="flex items-start justify-between gap-x-4">
            <div className="flex min-w-0 flex-1 items-start gap-x-3">
              {project.icon && (
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  {project.icon}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-x-2">
                  <h3 className="truncate font-semibold text-foreground">
                    {project.name}
                  </h3>
                  {project.isStarred && (
                    <StarIcon className="size-4 shrink-0 fill-warning text-warning" />
                  )}
                  {project.priority && (
                    <span
                      className={cn(
                        "size-2 shrink-0 rounded-full",
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
            <div className="flex shrink-0 items-center gap-x-2">
              <Badge variant={statusInfo.variant} size="sm">
                {statusInfo.label}
              </Badge>
              {actions || (
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-8 p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              )}
            </div>
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
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-3">
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
              max={4}
            />
          )}
        </div>
      </div>
    );
  },
);
ProjectDetailsCard.displayName = "ProjectDetailsCard";

// Grid Layout
export interface ProjectDetailsGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  projects: ProjectDetails[];
  variant?: ProjectDetailsCardProps["variant"];
  columns?: 2 | 3 | 4;
  showProgress?: boolean;
  showMembers?: boolean;
  onProjectClick?: (project: ProjectDetails) => void;
}

const gridColumnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export const ProjectDetailsGrid = forwardRef<
  HTMLDivElement,
  ProjectDetailsGridProps
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
        className={cn("grid gap-4", gridColumnClasses[columns], className)}
        {...props}
      >
        {projects.map((project) => (
          <ProjectDetailsCard
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
ProjectDetailsGrid.displayName = "ProjectDetailsGrid";

// List Layout
export interface ProjectDetailsListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  projects: ProjectDetails[];
  showProgress?: boolean;
  showMembers?: boolean;
  onProjectClick?: (project: ProjectDetails) => void;
  onEdit?: (project: ProjectDetails) => void;
  onDelete?: (project: ProjectDetails) => void;
}

export const ProjectDetailsList = forwardRef<
  HTMLDivElement,
  ProjectDetailsListProps
>(
  (
    {
      className,
      projects,
      showProgress = true,
      showMembers = true,
      onProjectClick,
      onEdit,
      onDelete,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        {projects.map((project) => (
          <ProjectDetailsCard
            key={project.id}
            project={project}
            variant="horizontal"
            showProgress={showProgress}
            showMembers={showMembers}
            onProjectClick={onProjectClick}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  },
);
ProjectDetailsList.displayName = "ProjectDetailsList";
