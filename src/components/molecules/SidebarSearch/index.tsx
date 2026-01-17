"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Avatar } from "@/components/atoms";
import {
  ChevronRightIcon,
  FileTextIcon,
  ImageIcon,
  LinkIcon,
  SearchIcon,
  XCircleIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// =============================================================================
// Types
// =============================================================================

export interface QuickAction {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  onClick?: () => void;
}

export interface SidebarSearchGroup {
  id: string;
  title: string;
  items: (QuickAction | Contact)[];
}

export interface SidebarSearchProps {
  /** Quick action items (Photos, Links, Documents, etc.) */
  quickActions?: QuickAction[];
  /** Contact items with avatar */
  contacts?: Contact[];
  /** Custom groups for more flexible organization */
  groups?: SidebarSearchGroup[];
  /** Placeholder text for search input */
  placeholder?: string;
  /** Callback when search query changes */
  onSearch?: (query: string) => void;
  /** Callback when a quick action is clicked */
  onQuickActionClick?: (action: QuickAction) => void;
  /** Callback when a contact is clicked */
  onContactClick?: (contact: Contact) => void;
  /** Custom empty state component */
  emptyState?: ReactNode;
  /** Whether to show dropdown always or only when focused */
  alwaysShowDropdown?: boolean;
  /** Custom height for the dropdown content */
  dropdownHeight?: string;
  /** Additional class name */
  className?: string;
}

// =============================================================================
// Default Empty State
// =============================================================================

function DefaultEmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-5 text-center">
      <svg
        className="mb-4 w-48"
        width="178"
        height="90"
        viewBox="0 0 178 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="No results"
      >
        <rect
          x="27"
          y="50.5"
          width="124"
          height="39"
          rx="7.5"
          className="fill-background stroke-muted"
        />
        <rect
          x="34.5"
          y="58"
          width="24"
          height="24"
          rx="12"
          className="fill-muted"
        />
        <rect
          x="66.5"
          y="61"
          width="60"
          height="6"
          rx="3"
          className="fill-muted"
        />
        <rect
          x="66.5"
          y="73"
          width="77"
          height="6"
          rx="3"
          className="fill-muted"
        />
        <rect
          x="19.5"
          y="28.5"
          width="139"
          height="39"
          rx="7.5"
          className="fill-background stroke-border"
        />
        <rect
          x="27"
          y="36"
          width="24"
          height="24"
          rx="12"
          className="fill-muted"
        />
        <rect
          x="59"
          y="39"
          width="60"
          height="6"
          rx="3"
          className="fill-muted"
        />
        <rect
          x="59"
          y="51"
          width="92"
          height="6"
          rx="3"
          className="fill-muted"
        />
        <g filter="url(#filter0_d)">
          <rect
            x="12"
            y="6"
            width="154"
            height="40"
            rx="8"
            className="fill-background"
          />
          <rect
            x="12.5"
            y="6.5"
            width="153"
            height="39"
            rx="7.5"
            className="stroke-border"
          />
          <rect
            x="20"
            y="14"
            width="24"
            height="24"
            rx="12"
            className="fill-muted-foreground/20"
          />
          <rect
            x="52"
            y="17"
            width="60"
            height="6"
            rx="3"
            className="fill-muted-foreground/20"
          />
          <rect
            x="52"
            y="29"
            width="106"
            height="6"
            rx="3"
            className="fill-muted-foreground/20"
          />
        </g>
        <defs>
          <filter
            id="filter0_d"
            x="0"
            y="0"
            width="178"
            height="64"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="6" />
            <feGaussianBlur stdDeviation="6" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <p className="text-sm text-muted-foreground">No search results</p>
    </div>
  );
}

// =============================================================================
// Quick Action Item
// =============================================================================

interface QuickActionItemProps {
  action: QuickAction;
  onClick?: () => void;
}

function QuickActionItem({ action, onClick }: QuickActionItemProps) {
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-x-3 px-5 py-2 text-left focus:outline-none"
      onClick={() => {
        action.onClick?.();
        onClick?.();
      }}
    >
      <span className="shrink-0 text-primary">{action.icon}</span>
      <span className="text-[13px] font-medium text-foreground group-hover:text-primary group-focus:text-primary">
        {action.label}
      </span>
      <ChevronRightIcon className="ms-auto size-3.5 text-muted-foreground group-hover:text-primary group-focus:text-primary" />
    </button>
  );
}

// =============================================================================
// Contact Item
// =============================================================================

interface ContactItemProps {
  contact: Contact;
  onClick?: () => void;
}

function ContactItem({ contact, onClick }: ContactItemProps) {
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-x-3 px-5 py-2 text-left focus:outline-none"
      onClick={() => {
        contact.onClick?.();
        onClick?.();
      }}
    >
      <Avatar
        src={contact.avatar}
        name={contact.name}
        size="sm"
        className="shrink-0"
      />
      <span className="grow truncate text-sm font-medium leading-4 text-foreground group-hover:text-primary group-focus:text-primary">
        {contact.name}
      </span>
      <ChevronRightIcon className="ms-auto size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-focus:opacity-100" />
    </button>
  );
}

// =============================================================================
// SidebarSearch
// =============================================================================

export function SidebarSearch({
  quickActions = [],
  contacts = [],
  groups,
  placeholder = "Search",
  onSearch,
  onQuickActionClick,
  onContactClick,
  emptyState,
  alwaysShowDropdown = false,
  dropdownHeight = "calc(100vh - 85px)",
  className,
}: SidebarSearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Default quick actions if none provided
  const defaultQuickActions: QuickAction[] = useMemo(
    () => [
      {
        id: "photos",
        label: "Photos",
        icon: <ImageIcon className="size-4" />,
      },
      {
        id: "links",
        label: "Links",
        icon: <LinkIcon className="size-4" />,
      },
      {
        id: "documents",
        label: "Documents",
        icon: <FileTextIcon className="size-4" />,
      },
    ],
    [],
  );

  const effectiveQuickActions =
    quickActions.length > 0 ? quickActions : defaultQuickActions;

  // Filter items based on search query
  const filteredQuickActions = useMemo(() => {
    if (!query) return effectiveQuickActions;
    const lowerQuery = query.toLowerCase();
    return effectiveQuickActions.filter((action) =>
      action.label.toLowerCase().includes(lowerQuery),
    );
  }, [effectiveQuickActions, query]);

  const filteredContacts = useMemo(() => {
    if (!query) return contacts;
    const lowerQuery = query.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(lowerQuery),
    );
  }, [contacts, query]);

  // Filter custom groups
  const filteredGroups = useMemo(() => {
    if (!groups) return undefined;
    if (!query) return groups;

    const lowerQuery = query.toLowerCase();
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if ("name" in item) {
            return item.name.toLowerCase().includes(lowerQuery);
          }
          return item.label.toLowerCase().includes(lowerQuery);
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, query]);

  const hasResults =
    filteredQuickActions.length > 0 ||
    filteredContacts.length > 0 ||
    (filteredGroups && filteredGroups.length > 0);

  const showDropdown = alwaysShowDropdown || isFocused;

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  // Handle clear
  const handleClear = () => {
    setQuery("");
    onSearch?.("");
    inputRef.current?.focus();
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    if (!alwaysShowDropdown) {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          inputRef.current &&
          !inputRef.current.parentElement?.contains(e.target as Node)
        ) {
          setIsFocused(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [alwaysShowDropdown]);

  return (
    <div className={cn("border-b border-border", className)}>
      {/* Search Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-5">
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="block w-full rounded-none border-0 bg-background py-1.5 pe-12 ps-12 text-[13px] placeholder:text-muted-foreground focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:opacity-50 md:text-[13px]"
          placeholder={placeholder}
          value={query}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          role="combobox"
          aria-expanded={showDropdown}
        />
        {query && (
          <div className="absolute inset-y-0 end-0 z-20 flex items-center pe-4">
            <button
              type="button"
              className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:text-primary focus:text-primary focus:outline-none"
              aria-label="Clear search"
              onClick={handleClear}
            >
              <span className="sr-only">Close</span>
              <XCircleIcon className="size-4 shrink-0" />
            </button>
          </div>
        )}
      </div>

      {/* Dropdown Content */}
      {showDropdown && (
        <div className="border-t border-border bg-background">
          <div
            className="overflow-y-auto overflow-x-hidden pb-6 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar]:w-2"
            style={{ height: dropdownHeight }}
          >
            {hasResults ? (
              <div className="pb-4 pt-1.5">
                {/* Custom Groups */}
                {filteredGroups?.map((group) => (
                  <div key={group.id}>
                    <div className="mx-5 mb-1 mt-3 block text-xs text-muted-foreground">
                      {group.title}
                    </div>
                    {group.items.map((item) =>
                      "name" in item ? (
                        <ContactItem
                          key={item.id}
                          contact={item}
                          onClick={() => onContactClick?.(item)}
                        />
                      ) : (
                        <QuickActionItem
                          key={item.id}
                          action={item}
                          onClick={() => onQuickActionClick?.(item)}
                        />
                      ),
                    )}
                  </div>
                ))}

                {/* Default Quick Actions (when no custom groups) */}
                {!filteredGroups && filteredQuickActions.length > 0 && (
                  <div>
                    <div className="mx-5 mb-1 mt-3 block text-xs text-muted-foreground">
                      Quick Action
                    </div>
                    {filteredQuickActions.map((action) => (
                      <QuickActionItem
                        key={action.id}
                        action={action}
                        onClick={() => onQuickActionClick?.(action)}
                      />
                    ))}
                  </div>
                )}

                {/* Default Contacts (when no custom groups) */}
                {!filteredGroups && filteredContacts.length > 0 && (
                  <div>
                    <div className="mx-5 mb-1 mt-3 block text-xs text-muted-foreground">
                      Contacts
                    </div>
                    {filteredContacts.map((contact) => (
                      <ContactItem
                        key={contact.id}
                        contact={contact}
                        onClick={() => onContactClick?.(contact)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              emptyState || <DefaultEmptyState />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
