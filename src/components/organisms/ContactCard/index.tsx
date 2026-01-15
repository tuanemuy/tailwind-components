import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Button } from "@/components/atoms/Button";
import { MailIcon, PhoneIcon, MoreHorizontalIcon } from "@/lib/icons";

// Contact information type
export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  department?: string;
  company?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  status?: "online" | "offline" | "away" | "busy";
  tags?: string[];
}

// Main ContactCard component
export interface ContactCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  contact: Contact;
  variant?: "default" | "compact" | "detailed" | "horizontal";
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (id: string, selected: boolean) => void;
  actions?: React.ReactNode;
  showStatus?: boolean;
}

export const ContactCard = forwardRef<HTMLDivElement, ContactCardProps>(
  (
    {
      className,
      contact,
      variant = "default",
      selectable = false,
      selected = false,
      onSelect,
      actions,
      showStatus = true,
      ...props
    },
    ref
  ) => {
    const handleSelect = () => {
      onSelect?.(contact.id, !selected);
    };

    if (variant === "horizontal") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-between gap-x-4 rounded-xl border border-border bg-card p-4",
            selected && "ring-2 ring-primary",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-x-4">
            {selectable && (
              <Checkbox
                checked={selected}
                onChange={handleSelect}
                aria-label={`Select ${contact.name}`}
              />
            )}
            <Avatar
              src={contact.avatarSrc}
              fallback={contact.avatarFallback || contact.name.charAt(0)}
              size="md"
              status={showStatus ? contact.status : undefined}
            />
            <div className="min-w-0">
              <p className="truncate font-medium text-foreground">{contact.name}</p>
              {contact.role && (
                <p className="truncate text-sm text-muted-foreground">{contact.role}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            {contact.email && (
              <Button variant="ghost" size="sm" className="size-8 p-0">
                <MailIcon className="size-4" />
              </Button>
            )}
            {contact.phone && (
              <Button variant="ghost" size="sm" className="size-8 p-0">
                <PhoneIcon className="size-4" />
              </Button>
            )}
            {actions}
          </div>
        </div>
      );
    }

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-x-3 rounded-lg border border-border bg-card p-3",
            selected && "ring-2 ring-primary",
            className
          )}
          {...props}
        >
          {selectable && (
            <Checkbox
              checked={selected}
              onChange={handleSelect}
              aria-label={`Select ${contact.name}`}
            />
          )}
          <Avatar
            src={contact.avatarSrc}
            fallback={contact.avatarFallback || contact.name.charAt(0)}
            size="sm"
            status={showStatus ? contact.status : undefined}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{contact.name}</p>
            {contact.email && (
              <p className="truncate text-xs text-muted-foreground">{contact.email}</p>
            )}
          </div>
          {actions}
        </div>
      );
    }

    if (variant === "detailed") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-xl border border-border bg-card",
            selected && "ring-2 ring-primary",
            className
          )}
          {...props}
        >
          <div className="flex items-start justify-between p-4">
            <div className="flex items-start gap-x-4">
              {selectable && (
                <Checkbox
                  checked={selected}
                  onChange={handleSelect}
                  aria-label={`Select ${contact.name}`}
                  className="mt-1"
                />
              )}
              <Avatar
                src={contact.avatarSrc}
                fallback={contact.avatarFallback || contact.name.charAt(0)}
                size="lg"
                status={showStatus ? contact.status : undefined}
              />
              <div>
                <h3 className="font-semibold text-foreground">{contact.name}</h3>
                {contact.role && (
                  <p className="text-sm text-muted-foreground">{contact.role}</p>
                )}
                {contact.department && (
                  <p className="text-xs text-muted-foreground">{contact.department}</p>
                )}
              </div>
            </div>
            {actions || (
              <Button variant="ghost" size="sm" className="size-8 p-0">
                <MoreHorizontalIcon className="size-4" />
              </Button>
            )}
          </div>

          <div className="space-y-2 border-t border-border px-4 py-3">
            {contact.email && (
              <div className="flex items-center gap-x-2 text-sm">
                <MailIcon className="size-4 text-muted-foreground" />
                <span className="text-muted-foreground">{contact.email}</span>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center gap-x-2 text-sm">
                <PhoneIcon className="size-4 text-muted-foreground" />
                <span className="text-muted-foreground">{contact.phone}</span>
              </div>
            )}
          </div>

          {contact.tags && contact.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-3">
              {contact.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" size="sm">
                  {tag}
                </Badge>
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
          "flex flex-col items-center rounded-xl border border-border bg-card p-4 text-center",
          selected && "ring-2 ring-primary",
          className
        )}
        {...props}
      >
        {selectable && (
          <div className="mb-3 self-start">
            <Checkbox
              checked={selected}
              onChange={handleSelect}
              aria-label={`Select ${contact.name}`}
            />
          </div>
        )}
        <Avatar
          src={contact.avatarSrc}
          fallback={contact.avatarFallback || contact.name.charAt(0)}
          size="xl"
          status={showStatus ? contact.status : undefined}
        />
        <h3 className="mt-3 font-semibold text-foreground">{contact.name}</h3>
        {contact.role && (
          <p className="text-sm text-muted-foreground">{contact.role}</p>
        )}
        {contact.email && (
          <p className="mt-1 text-xs text-muted-foreground">{contact.email}</p>
        )}
        {actions && <div className="mt-3">{actions}</div>}
      </div>
    );
  }
);
ContactCard.displayName = "ContactCard";

// ContactCardGrid for displaying multiple contacts
export interface ContactCardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  contacts: Contact[];
  variant?: ContactCardProps["variant"];
  columns?: 2 | 3 | 4 | 5 | 6;
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  renderActions?: (contact: Contact) => React.ReactNode;
  showStatus?: boolean;
}

const columnClasses = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
};

export const ContactCardGrid = forwardRef<HTMLDivElement, ContactCardGridProps>(
  (
    {
      className,
      contacts,
      variant = "default",
      columns = 4,
      selectable = false,
      selectedIds = [],
      onSelectionChange,
      renderActions,
      showStatus = true,
      ...props
    },
    ref
  ) => {
    const handleSelect = (id: string, selected: boolean) => {
      if (selected) {
        onSelectionChange?.([...selectedIds, id]);
      } else {
        onSelectionChange?.(selectedIds.filter((selectedId) => selectedId !== id));
      }
    };

    return (
      <div
        ref={ref}
        className={cn("grid gap-4", columnClasses[columns], className)}
        {...props}
      >
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            variant={variant}
            selectable={selectable}
            selected={selectedIds.includes(contact.id)}
            onSelect={handleSelect}
            actions={renderActions?.(contact)}
            showStatus={showStatus}
          />
        ))}
      </div>
    );
  }
);
ContactCardGrid.displayName = "ContactCardGrid";

// ContactCardList for list view
export interface ContactCardListProps extends React.HTMLAttributes<HTMLDivElement> {
  contacts: Contact[];
  variant?: "compact" | "horizontal" | "detailed";
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  renderActions?: (contact: Contact) => React.ReactNode;
  showStatus?: boolean;
}

export const ContactCardList = forwardRef<HTMLDivElement, ContactCardListProps>(
  (
    {
      className,
      contacts,
      variant = "horizontal",
      selectable = false,
      selectedIds = [],
      onSelectionChange,
      renderActions,
      showStatus = true,
      ...props
    },
    ref
  ) => {
    const handleSelect = (id: string, selected: boolean) => {
      if (selected) {
        onSelectionChange?.([...selectedIds, id]);
      } else {
        onSelectionChange?.(selectedIds.filter((selectedId) => selectedId !== id));
      }
    };

    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        {...props}
      >
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            variant={variant}
            selectable={selectable}
            selected={selectedIds.includes(contact.id)}
            onSelect={handleSelect}
            actions={renderActions?.(contact)}
            showStatus={showStatus}
          />
        ))}
      </div>
    );
  }
);
ContactCardList.displayName = "ContactCardList";
