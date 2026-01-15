import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { AvatarGroup } from "@/components/molecules/AvatarGroup";
import {
  MoreHorizontalIcon,
  StarIcon,
  CalendarIcon,
  CheckIcon,
  FolderIcon,
  ExternalLinkIcon,
} from "@/lib/icons";

export type ProjectCardStatus =
  | "active"
  | "completed"
  | "on-hold"
  | "archived"
  | "draft";

const statusConfig: Record<
  ProjectCardStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }
> = {
  active: { label: "Active", variant: "success" },
  completed: { label: "Completed", variant: "secondary" },
  "on-hold": { label: "On Hold", variant: "warning" },
  archived: { label: "Archived", variant: "outline" },
  draft: { label: "Draft", variant: "default" },
};

export interface ProjectCardMember {
  id: string;
  name: string;
  avatarSrc?: string;
  avatarFallback?: string;
  role?: string;
}

export interface ProjectCardData {
  id: string;
  name: string;
  description?: string;
  status: ProjectCardStatus;
  coverImage?: string;
  icon?: React.ReactNode;
  color?: string;
  progress?: number;
  dueDate?: string;
  members?: ProjectCardMember[];
  tasksTotal?: number;
  tasksCompleted?: number;
  isStarred?: boolean;
  category?: string;
  client?: string;
  lastUpdated?: string;
  externalUrl?: string;
}

export interface ProjectCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  project: ProjectCardData;
  variant?: "default" | "compact" | "featured" | "horizontal";
  showProgress?: boolean;
  showMembers?: boolean;
  onStar?: (project: ProjectCardData, starred: boolean) => void;
  onClick?: (project: ProjectCardData) => void;
  actions?: React.ReactNode;
}

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      className,
      project,
      variant = "default",
      showProgress = true,
      showMembers = true,
      onStar,
      onClick,
      actions,
      ...props
    },
    ref
  ) => {
    const statusInfo = statusConfig[project.status];

    // Featured variant with cover image
    if (variant === "featured") {
      return (
        <div
          ref={ref}
          className={cn(
            "group overflow-hidden rounded-xl border border-border bg-card",
            onClick && "cursor-pointer",
            className
          )}
          onClick={() => onClick?.(project)}
          {...props}
        >
          {/* Cover */}
          <div
            className="relative h-40 bg-muted"
            style={
              project.coverImage
                ? { backgroundImage: `url(${project.coverImage})`, backgroundSize: "cover", backgroundPosition: "center" }
                : project.color
                ? { backgroundColor: project.color }
                : undefined
            }
          >
            {/* Star Button */}
            {onStar && (
              <button
                className="absolute right-3 top-3 rounded-lg bg-background/80 p-1.5 opacity-0 backdrop-blur-sm transition-opacity hover:bg-background group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onStar(project, !project.isStarred);
                }}
              >
                <StarIcon
                  className={cn(
                    "size-4",
                    project.isStarred ? "fill-warning text-warning" : "text-muted-foreground"
                  )}
                />
              </button>
            )}

            {/* Icon overlay */}
            {project.icon && !project.coverImage && (
              <div className="flex h-full items-center justify-center">
                <div className="rounded-2xl bg-background/20 p-4 backdrop-blur-sm">
                  {project.icon}
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-x-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-x-2">
                  <h3 className="truncate font-semibold text-foreground">{project.name}</h3>
                  {project.externalUrl && (
                    <a
                      href={project.externalUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLinkIcon className="size-4" />
                    </a>
                  )}
                </div>
                {project.category && (
                  <p className="text-sm text-muted-foreground">{project.category}</p>
                )}
              </div>
              <Badge variant={statusInfo.variant} size="sm">
                {statusInfo.label}
              </Badge>
            </div>

            {project.description && (
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {project.description}
              </p>
            )}

            {showProgress && project.progress !== undefined && (
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} size="sm" />
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                {project.dueDate && (
                  <div className="flex items-center gap-x-1 text-xs text-muted-foreground">
                    <CalendarIcon className="size-3.5" />
                    <span>{project.dueDate}</span>
                  </div>
                )}
                {project.tasksCompleted !== undefined && project.tasksTotal !== undefined && (
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
        </div>
      );
    }

    // Horizontal variant
    if (variant === "horizontal") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-x-4 rounded-xl border border-border bg-card p-4",
            onClick && "cursor-pointer hover:border-primary/50",
            className
          )}
          onClick={() => onClick?.(project)}
          {...props}
        >
          {/* Icon */}
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-xl"
            style={project.color ? { backgroundColor: project.color } : undefined}
          >
            {project.icon || <FolderIcon className="size-6 text-muted-foreground" />}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-x-2">
              <h4 className="truncate font-medium text-foreground">{project.name}</h4>
              {project.isStarred && <StarIcon className="size-3.5 fill-warning text-warning" />}
            </div>
            {project.description && (
              <p className="truncate text-sm text-muted-foreground">{project.description}</p>
            )}
          </div>

          {/* Progress */}
          {showProgress && project.progress !== undefined && (
            <div className="w-24 hidden sm:block">
              <ProgressBar value={project.progress} size="sm" />
            </div>
          )}

          {/* Members */}
          {showMembers && project.members && project.members.length > 0 && (
            <AvatarGroup
              items={project.members.map((m) => ({
                src: m.avatarSrc,
                initials: m.avatarFallback || m.name.charAt(0),
                alt: m.name,
              }))}
              size="sm"
              max={3}
              className="hidden md:flex"
            />
          )}

          {/* Status */}
          <Badge variant={statusInfo.variant} size="sm">
            {statusInfo.label}
          </Badge>

          {/* Actions */}
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
      );
    }

    // Compact variant
    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-x-3 rounded-lg border border-border bg-card p-3",
            onClick && "cursor-pointer hover:border-primary/50",
            className
          )}
          onClick={() => onClick?.(project)}
          {...props}
        >
          <div
            className="flex size-8 shrink-0 items-center justify-center rounded-lg"
            style={project.color ? { backgroundColor: project.color } : undefined}
          >
            {project.icon || <FolderIcon className="size-4 text-muted-foreground" />}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-medium text-foreground">{project.name}</h4>
          </div>
          <Badge variant={statusInfo.variant} size="sm">
            {statusInfo.label}
          </Badge>
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card p-4",
          onClick && "cursor-pointer hover:border-primary/50",
          className
        )}
        onClick={() => onClick?.(project)}
        {...props}
      >
        <div className="flex items-start justify-between gap-x-3">
          <div className="flex items-start gap-x-3">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-xl"
              style={project.color ? { backgroundColor: project.color } : undefined}
            >
              {project.icon || <FolderIcon className="size-5 text-muted-foreground" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-x-2">
                <h4 className="truncate font-semibold text-foreground">{project.name}</h4>
                {project.isStarred && <StarIcon className="size-3.5 fill-warning text-warning" />}
              </div>
              {project.category && (
                <p className="text-sm text-muted-foreground">{project.category}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-x-2">
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
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
        )}

        {showProgress && project.progress !== undefined && (
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{project.progress}%</span>
            </div>
            <ProgressBar value={project.progress} size="sm" />
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-x-3">
            {project.dueDate && (
              <div className="flex items-center gap-x-1 text-xs text-muted-foreground">
                <CalendarIcon className="size-3.5" />
                <span>{project.dueDate}</span>
              </div>
            )}
            {project.tasksCompleted !== undefined && project.tasksTotal !== undefined && (
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
  }
);
ProjectCard.displayName = "ProjectCard";

// Grid Layout
export interface ProjectCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  projects: ProjectCardData[];
  variant?: ProjectCardProps["variant"];
  columns?: 2 | 3 | 4;
  showProgress?: boolean;
  showMembers?: boolean;
  onProjectClick?: (project: ProjectCardData) => void;
  onStar?: (project: ProjectCardData, starred: boolean) => void;
}

const gridColumnClasses = {
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export const ProjectCardGrid = forwardRef<HTMLDivElement, ProjectCardGridProps>(
  (
    {
      className,
      projects,
      variant = "default",
      columns = 3,
      showProgress = true,
      showMembers = true,
      onProjectClick,
      onStar,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("grid gap-4", gridColumnClasses[columns], className)}
        {...props}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            variant={variant}
            showProgress={showProgress}
            showMembers={showMembers}
            onClick={onProjectClick}
            onStar={onStar}
          />
        ))}
      </div>
    );
  }
);
ProjectCardGrid.displayName = "ProjectCardGrid";

// List Layout
export interface ProjectCardListProps extends React.HTMLAttributes<HTMLDivElement> {
  projects: ProjectCardData[];
  showProgress?: boolean;
  showMembers?: boolean;
  onProjectClick?: (project: ProjectCardData) => void;
}

export const ProjectCardList = forwardRef<HTMLDivElement, ProjectCardListProps>(
  (
    {
      className,
      projects,
      showProgress = true,
      showMembers = true,
      onProjectClick,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            variant="horizontal"
            showProgress={showProgress}
            showMembers={showMembers}
            onClick={onProjectClick}
          />
        ))}
      </div>
    );
  }
);
ProjectCardList.displayName = "ProjectCardList";
