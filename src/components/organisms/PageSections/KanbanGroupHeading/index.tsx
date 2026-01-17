import { forwardRef } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { ChevronDownIcon, MoreHorizontalIcon, PlusIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface KanbanGroupHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  count?: number;
  color?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  onAddClick?: () => void;
  onMenuClick?: () => void;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
}

export const KanbanGroupHeading = forwardRef<
  HTMLDivElement,
  KanbanGroupHeadingProps
>(
  (
    {
      className,
      title,
      count,
      color,
      icon,
      actions,
      onAddClick,
      onMenuClick,
      collapsible = false,
      collapsed = false,
      onToggle,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-x-2 rounded-lg bg-muted/50 px-3 py-2",
          className,
        )}
        {...props}
      >
        {/* Left side: Color indicator, Icon, Title, Count */}
        <div className="flex items-center gap-x-2 min-w-0">
          {/* Collapsible toggle */}
          {collapsible && (
            <button
              type="button"
              onClick={onToggle}
              className="shrink-0 p-0.5 text-muted-foreground hover:text-foreground"
              aria-label={collapsed ? "Expand" : "Collapse"}
            >
              <ChevronDownIcon
                className={cn(
                  "size-4 transition-transform",
                  collapsed ? "-rotate-90" : "rotate-0",
                )}
              />
            </button>
          )}

          {/* Color indicator */}
          {color && (
            <div
              className="size-3 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
          )}

          {/* Icon */}
          {icon && (
            <div className="size-4 shrink-0 text-muted-foreground">{icon}</div>
          )}

          {/* Title */}
          <h3 className="truncate text-sm font-medium text-foreground">
            {title}
          </h3>

          {/* Count badge */}
          {count !== undefined && (
            <Badge variant="secondary" size="sm" className="shrink-0">
              {count}
            </Badge>
          )}
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center gap-x-1 shrink-0">
          {actions}
          {onAddClick && (
            <Button
              variant="ghost"
              size="sm"
              className="size-7 p-0"
              onClick={onAddClick}
              aria-label="Add item"
            >
              <PlusIcon className="size-4" />
            </Button>
          )}
          {onMenuClick && (
            <Button
              variant="ghost"
              size="sm"
              className="size-7 p-0"
              onClick={onMenuClick}
              aria-label="More options"
            >
              <MoreHorizontalIcon className="size-4" />
            </Button>
          )}
        </div>
      </div>
    );
  },
);
KanbanGroupHeading.displayName = "KanbanGroupHeading";

// Minimal kanban heading variant
export interface MinimalKanbanHeadingProps
  extends Omit<KanbanGroupHeadingProps, "color" | "icon"> {
  dotColor?: string;
}

export const MinimalKanbanHeading = forwardRef<
  HTMLDivElement,
  MinimalKanbanHeadingProps
>(({ className, dotColor, title, count, onAddClick, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-x-2 py-2",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-x-2">
        {dotColor && (
          <div
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: dotColor }}
          />
        )}
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        {count !== undefined && (
          <span className="text-sm text-muted-foreground">{count}</span>
        )}
      </div>
      {onAddClick && (
        <Button
          variant="ghost"
          size="sm"
          className="size-6 p-0 opacity-0 group-hover:opacity-100"
          onClick={onAddClick}
          aria-label="Add item"
        >
          <PlusIcon className="size-3.5" />
        </Button>
      )}
    </div>
  );
});
MinimalKanbanHeading.displayName = "MinimalKanbanHeading";

// Draggable kanban column header
export interface DraggableKanbanHeadingProps extends KanbanGroupHeadingProps {
  dragHandleProps?: Record<string, unknown>;
}

export const DraggableKanbanHeading = forwardRef<
  HTMLDivElement,
  DraggableKanbanHeadingProps
>(({ className, dragHandleProps, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("group", className)} {...dragHandleProps}>
      <KanbanGroupHeading
        className="cursor-grab active:cursor-grabbing"
        {...props}
      />
    </div>
  );
});
DraggableKanbanHeading.displayName = "DraggableKanbanHeading";

// Kanban column with header and content
export interface KanbanColumnProps
  extends React.HTMLAttributes<HTMLDivElement> {
  heading: React.ReactNode;
  children: React.ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
}

export const KanbanColumn = forwardRef<HTMLDivElement, KanbanColumnProps>(
  (
    {
      className,
      heading,
      children,
      emptyMessage = "No items",
      isEmpty = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-72 shrink-0 flex-col rounded-xl border border-border bg-card",
          className,
        )}
        {...props}
      >
        {/* Heading */}
        <div className="p-2">{heading}</div>

        {/* Content */}
        <div className="flex-1 space-y-2 overflow-y-auto p-2">
          {isEmpty ? (
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border">
              <p className="text-sm text-muted-foreground">{emptyMessage}</p>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    );
  },
);
KanbanColumn.displayName = "KanbanColumn";
