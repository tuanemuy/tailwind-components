"use client";

import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import {
  ClockIcon,
  GripIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  PlusIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  columnColorVariants,
  kanbanBoardVariants,
  kanbanCardVariants,
  kanbanColumnContentVariants,
  kanbanColumnHeaderVariants,
  kanbanColumnVariants,
  kanbanHeaderVariants,
  kanbanTagVariants,
} from "@/lib/variants";

// =============================================================================
// Types
// =============================================================================

export type KanbanPriority = "low" | "medium" | "high" | "none";
export type KanbanColor =
  | "gray"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink";

export interface KanbanTag {
  id: string;
  label: string;
  color: KanbanColor;
}

export interface KanbanMember {
  id: string;
  name: string;
  avatar?: string;
}

export interface KanbanCardData {
  id: string;
  title: string;
  description?: string;
  priority?: KanbanPriority;
  tags?: KanbanTag[];
  assignees?: KanbanMember[];
  dueDate?: string;
  comments?: number;
  attachments?: number;
  completed?: boolean;
  coverImage?: string;
}

export interface KanbanColumnData {
  id: string;
  title: string;
  color?: KanbanColor;
  cards: KanbanCardData[];
  limit?: number;
}

// =============================================================================
// KanbanBoard
// =============================================================================

export interface KanbanBoardProps
  extends VariantProps<typeof kanbanBoardVariants> {
  columns: KanbanColumnData[];
  onCardClick?: (card: KanbanCardData, columnId: string) => void;
  onCardMove?: (
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    index: number,
  ) => void;
  onAddCard?: (columnId: string) => void;
  onAddColumn?: () => void;
  renderCard?: (card: KanbanCardData, columnId: string) => ReactNode;
  className?: string;
}

export function KanbanBoard({
  columns,
  onCardClick,
  onCardMove: _onCardMove,
  onAddCard,
  onAddColumn,
  renderCard,
  variant,
  className,
}: KanbanBoardProps) {
  return (
    <div className={cn(kanbanBoardVariants({ variant }), className)}>
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          onCardClick={(card) => onCardClick?.(card, column.id)}
          onAddCard={() => onAddCard?.(column.id)}
          renderCard={(card) => renderCard?.(card, column.id)}
        />
      ))}
      {onAddColumn && (
        <button
          type="button"
          className="flex min-w-[280px] items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-4 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          onClick={onAddColumn}
        >
          <PlusIcon className="size-5" />
          Add Column
        </button>
      )}
    </div>
  );
}

// =============================================================================
// KanbanColumn
// =============================================================================

export interface KanbanColumnProps
  extends VariantProps<typeof kanbanColumnVariants> {
  column: KanbanColumnData;
  onCardClick?: (card: KanbanCardData) => void;
  onAddCard?: () => void;
  onEditColumn?: () => void;
  onDeleteColumn?: () => void;
  renderCard?: (card: KanbanCardData) => ReactNode;
  className?: string;
}

export function KanbanColumn({
  column,
  onCardClick,
  onAddCard,
  onEditColumn: _onEditColumn,
  onDeleteColumn: _onDeleteColumn,
  renderCard,
  variant,
  size,
  className,
}: KanbanColumnProps) {
  const isOverLimit = column.limit && column.cards.length > column.limit;

  return (
    <div className={cn(kanbanColumnVariants({ variant, size }), className)}>
      <div className={cn(kanbanColumnHeaderVariants({ variant }))}>
        <div className="flex items-center gap-2">
          {column.color && (
            <div className={cn(columnColorVariants({ color: column.color }))} />
          )}
          <h3 className="font-semibold">{column.title}</h3>
          <Badge
            variant={isOverLimit ? "destructive" : "secondary"}
            className="text-xs"
          >
            {column.cards.length}
            {column.limit && `/${column.limit}`}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          {onAddCard && (
            <Button variant="ghost" size="icon" onClick={onAddCard}>
              <PlusIcon className="size-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </div>
      </div>
      <div className={cn(kanbanColumnContentVariants({ variant }))}>
        {column.cards.map((card) => (
          <div key={card.id}>
            {renderCard ? (
              renderCard(card)
            ) : (
              <KanbanCard card={card} onClick={() => onCardClick?.(card)} />
            )}
          </div>
        ))}
        {column.cards.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No cards in this column
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// KanbanCard
// =============================================================================

export interface KanbanCardProps
  extends VariantProps<typeof kanbanCardVariants> {
  card: KanbanCardData;
  onClick?: () => void;
  onToggleComplete?: (completed: boolean) => void;
  isDragging?: boolean;
  className?: string;
}

export function KanbanCard({
  card,
  onClick,
  onToggleComplete,
  isDragging,
  variant,
  priority,
  className,
}: KanbanCardProps) {
  const cardContent = (
    <>
      {card.coverImage && (
        <img
          src={card.coverImage}
          alt=""
          className="w-full h-32 object-cover rounded-md mb-3 -mt-1"
        />
      )}
      <div className="flex items-start gap-2">
        {onToggleComplete && (
          <Checkbox
            checked={card.completed}
            onCheckedChange={onToggleComplete}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "font-medium",
              card.completed && "line-through text-muted-foreground",
            )}
          >
            {card.title}
          </p>
          {card.description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {card.description}
            </p>
          )}
        </div>
        <button
          type="button"
          aria-label="Drag handle"
          className="cursor-grab"
          onClick={(e) => e.stopPropagation()}
        >
          <GripIcon className="size-4 text-muted-foreground" />
        </button>
      </div>

      {card.tags && card.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {card.tags.map((tag) => (
            <span
              key={tag.id}
              className={cn(kanbanTagVariants({ color: tag.color }))}
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {card.dueDate && (
            <div className="flex items-center gap-1">
              <ClockIcon className="size-3" />
              <span>{card.dueDate}</span>
            </div>
          )}
          {card.comments !== undefined && card.comments > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquareIcon className="size-3" />
              <span>{card.comments}</span>
            </div>
          )}
          {card.attachments !== undefined && card.attachments > 0 && (
            <div className="flex items-center gap-1">
              <PaperclipIcon className="size-3" />
              <span>{card.attachments}</span>
            </div>
          )}
        </div>
        {card.assignees && card.assignees.length > 0 && (
          <div className="flex -space-x-2">
            {card.assignees.slice(0, 3).map((member) => (
              <Avatar
                key={member.id}
                src={member.avatar}
                name={member.name}
                size="xs"
                className="ring-2 ring-card"
              />
            ))}
            {card.assignees.length > 3 && (
              <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-medium ring-2 ring-card">
                +{card.assignees.length - 3}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );

  const baseClassName = cn(
    kanbanCardVariants({
      variant,
      priority: priority || card.priority,
      dragging: isDragging,
    }),
    className,
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={cn(baseClassName, "cursor-pointer text-left w-full")}
        onClick={onClick}
      >
        {cardContent}
      </button>
    );
  }

  return <div className={baseClassName}>{cardContent}</div>;
}

// =============================================================================
// KanbanHeader
// =============================================================================

export interface KanbanHeaderProps
  extends VariantProps<typeof kanbanHeaderVariants> {
  title?: string;
  description?: string;
  onAddCard?: () => void;
  onFilter?: () => void;
  onSort?: () => void;
  actions?: ReactNode;
  filters?: ReactNode;
  className?: string;
}

export function KanbanHeader({
  title,
  description,
  onAddCard,
  onFilter,
  onSort,
  actions,
  filters,
  variant,
  className,
}: KanbanHeaderProps) {
  return (
    <div className={cn(kanbanHeaderVariants({ variant }), className)}>
      <div>
        {title && <h1 className="text-xl font-semibold">{title}</h1>}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {filters}
        {onFilter && (
          <Button variant="outline" size="sm" onClick={onFilter}>
            Filter
          </Button>
        )}
        {onSort && (
          <Button variant="outline" size="sm" onClick={onSort}>
            Sort
          </Button>
        )}
        {onAddCard && (
          <Button size="sm" onClick={onAddCard}>
            <PlusIcon className="size-4 mr-1" />
            Add Card
          </Button>
        )}
        {actions}
      </div>
    </div>
  );
}

// Types are exported at their definitions above
