import { forwardRef, type ReactNode } from "react";
import { ChevronRightIcon } from "@/components/icons";
import { cn } from "@/components/utils";

// ============================================
// Types
// ============================================

export type ListGroupVariant = "default" | "bordered" | "flush" | "card";
export type ListGroupItemSize = "sm" | "md" | "lg";

export interface ListGroupItemData {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  meta?: ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
}

// ============================================
// ListGroupItem Props
// ============================================

export interface ListGroupItemProps extends React.HTMLAttributes<HTMLElement> {
  variant?: ListGroupVariant;
  size?: ListGroupItemSize;
  hoverable?: boolean;
  showArrow?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
  meta?: ReactNode;
  description?: ReactNode;
  href?: string;
  active?: boolean;
  disabled?: boolean;
}

// ============================================
// ListGroupItem Component
// ============================================

export const ListGroupItem = forwardRef<HTMLElement, ListGroupItemProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      hoverable = false,
      showArrow = false,
      icon,
      badge,
      meta,
      description,
      href,
      active = false,
      disabled = false,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: "py-2 px-3 text-sm",
      md: "py-3 px-4",
      lg: "py-4 px-5 text-lg",
    };

    const variantClasses = {
      default: "border-b border-border last:border-b-0",
      bordered:
        "border border-border -mt-px first:mt-0 first:rounded-t-lg last:rounded-b-lg",
      flush: "",
      card: "rounded-lg border border-border mb-2 last:mb-0",
    };

    const baseClasses = cn(
      "flex items-center gap-3 bg-card text-foreground transition-colors",
      sizeClasses[size],
      variantClasses[variant],
      hoverable && !disabled && "cursor-pointer hover:bg-muted/50",
      active && "bg-primary/5 border-primary",
      disabled && "opacity-50 cursor-not-allowed",
    );

    const content = (
      <>
        {icon && <span className="shrink-0 text-muted-foreground">{icon}</span>}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn("truncate", active && "font-medium")}>
              {children}
            </span>
            {badge}
          </div>
          {description && (
            <p className="mt-0.5 text-sm text-muted-foreground truncate">
              {description}
            </p>
          )}
        </div>
        {meta && (
          <span className="shrink-0 text-sm text-muted-foreground">{meta}</span>
        )}
        {showArrow && (
          <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />
        )}
      </>
    );

    if (href && !disabled) {
      return (
        <li ref={ref as React.Ref<HTMLLIElement>}>
          <a
            href={href}
            className={cn(baseClasses, className)}
            {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {content}
          </a>
        </li>
      );
    }

    if (onClick && !disabled) {
      return (
        <li ref={ref as React.Ref<HTMLLIElement>}>
          <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={cn(baseClasses, "w-full text-start", className)}
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
          >
            {content}
          </button>
        </li>
      );
    }

    return (
      <li
        ref={ref as React.Ref<HTMLLIElement>}
        className={cn(baseClasses, className)}
        {...(props as React.HTMLAttributes<HTMLLIElement>)}
      >
        {content}
      </li>
    );
  },
);
ListGroupItem.displayName = "ListGroupItem";

// ============================================
// ListGroup Props
// ============================================

export interface ListGroupProps extends React.HTMLAttributes<HTMLUListElement> {
  items?: ListGroupItemData[];
  variant?: ListGroupVariant;
  size?: ListGroupItemSize;
  hoverable?: boolean;
  showArrows?: boolean;
}

// ============================================
// ListGroup Component
// ============================================

export const ListGroup = forwardRef<HTMLUListElement, ListGroupProps>(
  (
    {
      className,
      items,
      variant = "default",
      size = "md",
      hoverable = false,
      showArrows = false,
      children,
      ...props
    },
    ref,
  ) => {
    const containerClasses = {
      default: "border border-border rounded-lg overflow-hidden",
      bordered: "",
      flush: "divide-y divide-border",
      card: "",
    };

    return (
      <ul
        ref={ref}
        className={cn(
          containerClasses[variant],
          "list-none m-0 p-0",
          className,
        )}
        {...props}
      >
        {items
          ? items.map((item) => (
              <ListGroupItem
                key={item.id}
                variant={variant}
                size={size}
                hoverable={hoverable || !!item.onClick || !!item.href}
                showArrow={showArrows || !!item.href}
                icon={item.icon}
                badge={item.badge}
                meta={item.meta}
                description={item.description}
                href={item.href}
                onClick={item.onClick}
                disabled={item.disabled}
                active={item.active}
              >
                {item.label}
              </ListGroupItem>
            ))
          : children}
      </ul>
    );
  },
);
ListGroup.displayName = "ListGroup";

// ============================================
// ActionListGroup - With interactive items
// ============================================

export interface ActionListGroupProps extends Omit<ListGroupProps, "items"> {
  items: Array<
    ListGroupItemData & {
      actions?: ReactNode;
    }
  >;
  onItemClick?: (item: ListGroupItemData) => void;
}

export const ActionListGroup = forwardRef<
  HTMLUListElement,
  ActionListGroupProps
>(
  (
    {
      className,
      items,
      onItemClick,
      variant = "default",
      size = "md",
      ...props
    },
    ref,
  ) => {
    return (
      <ul
        ref={ref}
        className={cn(
          "list-none m-0 p-0",
          variant === "default" &&
            "border border-border rounded-lg overflow-hidden",
          variant === "flush" && "divide-y divide-border",
          className,
        )}
        {...props}
      >
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              "flex items-center gap-3 bg-card text-foreground transition-colors",
              size === "sm" && "py-2 px-3 text-sm",
              size === "md" && "py-3 px-4",
              size === "lg" && "py-4 px-5 text-lg",
              variant === "default" && "border-b border-border last:border-b-0",
              variant === "flush" && "",
              variant === "card" &&
                "rounded-lg border border-border mb-2 last:mb-0",
              !item.disabled && "hover:bg-muted/50",
            )}
          >
            {item.icon && (
              <span className="shrink-0 text-muted-foreground">
                {item.icon}
              </span>
            )}
            <button
              type="button"
              onClick={() =>
                !item.disabled && (item.onClick?.() || onItemClick?.(item))
              }
              disabled={item.disabled}
              className="flex-1 min-w-0 text-start"
            >
              <div className="flex items-center gap-2">
                <span className={cn("truncate", item.active && "font-medium")}>
                  {item.label}
                </span>
                {item.badge}
              </div>
              {item.description && (
                <p className="mt-0.5 text-sm text-muted-foreground truncate">
                  {item.description}
                </p>
              )}
            </button>
            {item.meta && (
              <span className="shrink-0 text-sm text-muted-foreground">
                {item.meta}
              </span>
            )}
            {item.actions && (
              <div className="shrink-0 flex items-center gap-1">
                {item.actions}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  },
);
ActionListGroup.displayName = "ActionListGroup";

// ============================================
// NumberedListGroup - With numbered items
// ============================================

export interface NumberedListGroupProps extends Omit<ListGroupProps, "items"> {
  items: Array<Omit<ListGroupItemData, "icon">>;
  startIndex?: number;
}

export const NumberedListGroup = forwardRef<
  HTMLUListElement,
  NumberedListGroupProps
>(
  (
    {
      className,
      items,
      startIndex = 1,
      variant = "default",
      size = "md",
      hoverable = false,
      ...props
    },
    ref,
  ) => {
    return (
      <ListGroup
        ref={ref}
        variant={variant}
        size={size}
        hoverable={hoverable}
        className={className}
        {...props}
      >
        {items.map((item, index) => (
          <ListGroupItem
            key={item.id}
            variant={variant}
            size={size}
            hoverable={hoverable || !!item.onClick || !!item.href}
            icon={
              <span className="flex items-center justify-center size-6 rounded-full bg-muted text-xs font-medium">
                {startIndex + index}
              </span>
            }
            badge={item.badge}
            meta={item.meta}
            description={item.description}
            href={item.href}
            onClick={item.onClick}
            disabled={item.disabled}
            active={item.active}
            role="listitem"
          >
            {item.label}
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  },
);
NumberedListGroup.displayName = "NumberedListGroup";

// ============================================
// CheckableListGroup - With checkboxes
// ============================================

export interface CheckableListGroupItem
  extends Omit<ListGroupItemData, "icon"> {
  checked?: boolean;
}

export interface CheckableListGroupProps extends Omit<ListGroupProps, "items"> {
  items: CheckableListGroupItem[];
  onItemToggle?: (id: string, checked: boolean) => void;
  showCheckbox?: boolean;
}

export const CheckableListGroup = forwardRef<
  HTMLUListElement,
  CheckableListGroupProps
>(
  (
    {
      className,
      items,
      onItemToggle,
      showCheckbox = true,
      variant = "default",
      size = "md",
      ...props
    },
    ref,
  ) => {
    return (
      <ul
        ref={ref}
        className={cn(
          "list-none m-0 p-0",
          variant === "default" &&
            "border border-border rounded-lg overflow-hidden",
          variant === "flush" && "divide-y divide-border",
          className,
        )}
        {...props}
      >
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(
              variant === "default" && "border-b border-border last:border-b-0",
              variant === "card" &&
                "rounded-lg border border-border mb-2 last:mb-0",
            )}
          >
            <label
              htmlFor={`checkable-list-item-${item.id}`}
              className={cn(
                "flex items-center gap-3 bg-card text-foreground transition-colors cursor-pointer",
                size === "sm" && "py-2 px-3 text-sm",
                size === "md" && "py-3 px-4",
                size === "lg" && "py-4 px-5 text-lg",
                !item.disabled && "hover:bg-muted/50",
                item.disabled && "opacity-50 cursor-not-allowed",
              )}
            >
              {showCheckbox && (
                <input
                  id={`checkable-list-item-${item.id}`}
                  type="checkbox"
                  checked={item.checked || false}
                  onChange={(e) => onItemToggle?.(item.id, e.target.checked)}
                  disabled={item.disabled}
                  className="size-4 rounded border-border text-primary focus:ring-primary"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "truncate",
                      item.checked && "line-through text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </span>
                  {item.badge}
                </div>
                {item.description && (
                  <p className="mt-0.5 text-sm text-muted-foreground truncate">
                    {item.description}
                  </p>
                )}
              </div>
              {item.meta && (
                <span className="shrink-0 text-sm text-muted-foreground">
                  {item.meta}
                </span>
              )}
            </label>
          </li>
        ))}
      </ul>
    );
  },
);
CheckableListGroup.displayName = "CheckableListGroup";
