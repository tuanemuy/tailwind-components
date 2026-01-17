"use client";

import type { VariantProps } from "class-variance-authority";
import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Kbd } from "@/components/atoms/Kbd";
import {
  ArrowRightIcon,
  ClockIcon,
  FileTextIcon,
  HashIcon,
  SearchIcon,
  TrendUpIcon,
  UserIcon,
  XIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";
import {
  commandGroupLabelVariants,
  commandGroupVariants,
  commandInputVariants,
  commandItemVariants,
  commandPaletteContentVariants,
  commandPaletteVariants,
  recentSearchesVariants,
  recentSearchItemVariants,
  searchModalVariants,
  searchResultItemVariants,
  searchResultsVariants,
  searchSuggestionItemVariants,
  searchSuggestionsVariants,
} from "@/components/variants";

// =============================================================================
// CommandPalette
// =============================================================================

export interface CommandAction {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string[];
  onSelect?: () => void;
  disabled?: boolean;
}

export interface CommandGroup {
  id: string;
  label: string;
  actions: CommandAction[];
}

export interface CommandPaletteProps
  extends VariantProps<typeof commandPaletteContentVariants> {
  isOpen: boolean;
  onClose: () => void;
  groups: CommandGroup[];
  placeholder?: string;
  emptyMessage?: string;
  footer?: ReactNode;
  className?: string;
}

export function CommandPalette({
  isOpen,
  onClose,
  groups,
  placeholder = "Type a command or search...",
  emptyMessage = "No results found.",
  footer,
  size,
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Flatten all actions for keyboard navigation
  const flatActions = groups.flatMap((g) =>
    g.actions.filter(
      (a) =>
        !query ||
        a.label.toLowerCase().includes(query.toLowerCase()) ||
        a.description?.toLowerCase().includes(query.toLowerCase()),
    ),
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, flatActions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && flatActions[selectedIndex]) {
      e.preventDefault();
      const action = flatActions[selectedIndex];
      if (!action.disabled) {
        action.onSelect?.();
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  const filteredGroups = groups
    .map((group) => ({
      ...group,
      actions: group.actions.filter(
        (action) =>
          !query ||
          action.label.toLowerCase().includes(query.toLowerCase()) ||
          action.description?.toLowerCase().includes(query.toLowerCase()),
      ),
    }))
    .filter((group) => group.actions.length > 0);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop close
    <div
      className={cn(commandPaletteVariants({ variant: "default" }), className)}
      onClick={onClose}
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Stop propagation */}
      <div
        className={cn(commandPaletteContentVariants({ size }))}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-border px-4">
          <SearchIcon className="size-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            className={cn(commandInputVariants({ variant: "default" }))}
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <Kbd keys={["Esc"]} />
        </div>

        <div className="max-h-[300px] overflow-y-auto p-2">
          {filteredGroups.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </p>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.id} className={cn(commandGroupVariants({}))}>
                <p className={cn(commandGroupLabelVariants({}))}>
                  {group.label}
                </p>
                {group.actions.map((action) => {
                  const globalIndex = flatActions.findIndex(
                    (a) => a.id === action.id,
                  );
                  return (
                    // biome-ignore lint/a11y/useKeyWithClickEvents: Action item selection
                    <div
                      key={action.id}
                      className={cn(
                        commandItemVariants({
                          variant:
                            globalIndex === selectedIndex
                              ? "selected"
                              : action.disabled
                                ? "disabled"
                                : "default",
                        }),
                      )}
                      onClick={() => {
                        if (!action.disabled) {
                          action.onSelect?.();
                          onClose();
                        }
                      }}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                    >
                      {action.icon && (
                        <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                          {action.icon}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{action.label}</p>
                        {action.description && (
                          <p className="text-sm text-muted-foreground truncate">
                            {action.description}
                          </p>
                        )}
                      </div>
                      {action.shortcut && (
                        <div className="flex gap-1">
                          {action.shortcut.map((key) => (
                            <Kbd key={key} keys={[key]} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {footer && (
          <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// SearchModal
// =============================================================================

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  url?: string;
  type?: "page" | "document" | "user" | "tag";
  icon?: ReactNode;
  meta?: string;
}

export interface SearchModalProps
  extends VariantProps<typeof searchModalVariants> {
  isOpen: boolean;
  onClose: () => void;
  results: SearchResult[];
  recentSearches?: string[];
  suggestions?: string[];
  onSearch?: (query: string) => void;
  onResultClick?: (result: SearchResult) => void;
  onRecentSearchClick?: (query: string) => void;
  onSuggestionClick?: (suggestion: string) => void;
  onClearRecent?: () => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
}

export function SearchModal({
  isOpen,
  onClose,
  results,
  recentSearches = [],
  suggestions = [],
  onSearch,
  onResultClick,
  onRecentSearchClick,
  onSuggestionClick,
  onClearRecent,
  isLoading,
  placeholder = "Search...",
  position,
  className,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  if (!isOpen) return null;


  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop close
    <div
      className={cn(searchModalVariants({ position }), className)}
      onClick={onClose}
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Stop propagation */}
      <div
        className="w-full max-w-2xl rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-border px-4">
          <SearchIcon className="size-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent px-4 py-3 text-lg outline-none placeholder:text-muted-foreground"
            placeholder={placeholder}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {query && (
            <button type="button" onClick={() => handleSearch("")}>
              <XIcon className="size-5 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          ) : query ? (
            <SearchResults
              results={results}
              onResultClick={(result) => {
                onResultClick?.(result);
                onClose();
              }}
            />
          ) : (
            <div className="p-4 space-y-6">
              {recentSearches.length > 0 && (
                <RecentSearches
                  searches={recentSearches}
                  onSearchClick={(s) => {
                    handleSearch(s);
                    onRecentSearchClick?.(s);
                  }}
                  onClear={onClearRecent}
                />
              )}
              {suggestions.length > 0 && (
                <SearchSuggestions
                  suggestions={suggestions}
                  onSuggestionClick={(s) => {
                    handleSearch(s);
                    onSuggestionClick?.(s);
                  }}
                />
              )}
            </div>
          )}
        </div>

        <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Kbd keys={["↑", "↓"]} /> to navigate
          </div>
          <div className="flex items-center gap-1">
            <Kbd keys={["Enter"]} /> to select
          </div>
          <div className="flex items-center gap-1">
            <Kbd keys={["Esc"]} /> to close
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// SearchResults
// =============================================================================

export interface SearchResultsProps
  extends VariantProps<typeof searchResultsVariants> {
  results: SearchResult[];
  onResultClick?: (result: SearchResult) => void;
  highlightedIndex?: number;
  className?: string;
}

export function SearchResults({
  results,
  onResultClick,
  highlightedIndex,
  variant,
  className,
}: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        No results found
      </div>
    );
  }

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case "page":
        return <FileTextIcon className="size-4" />;
      case "document":
        return <FileTextIcon className="size-4" />;
      case "user":
        return <UserIcon className="size-4" />;
      case "tag":
        return <HashIcon className="size-4" />;
      default:
        return <FileTextIcon className="size-4" />;
    }
  };

  return (
    <div className={cn(searchResultsVariants({ variant }), className)}>
      {results.map((result, index) => (
        <button
          type="button"
          key={result.id}
          className={cn(
            searchResultItemVariants({
              variant: index === highlightedIndex ? "selected" : "default",
            }),
            "cursor-pointer w-full text-left",
          )}
          onClick={() => onResultClick?.(result)}
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
            {result.icon || getTypeIcon(result.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium">{result.title}</p>
            {result.description && (
              <p className="text-sm text-muted-foreground truncate">
                {result.description}
              </p>
            )}
          </div>
          {result.meta && (
            <span className="text-xs text-muted-foreground">{result.meta}</span>
          )}
          <ArrowRightIcon className="size-4 text-muted-foreground" />
        </button>
      ))}
    </div>
  );
}

// =============================================================================
// RecentSearches
// =============================================================================

export interface RecentSearchesProps
  extends VariantProps<typeof recentSearchesVariants> {
  searches: string[];
  onSearchClick?: (search: string) => void;
  onClear?: () => void;
  onRemove?: (search: string) => void;
  className?: string;
}

export function RecentSearches({
  searches,
  onSearchClick,
  onClear,
  onRemove,
  variant,
  className,
}: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className={cn(recentSearchesVariants({ variant }), className)}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Recent Searches
        </p>
        {onClear && (
          <button
            type="button"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={onClear}
          >
            Clear all
          </button>
        )}
      </div>
      {searches.map((search) => (
        <button
          type="button"
          key={search}
          className={cn(recentSearchItemVariants({}), "w-full text-left")}
          onClick={() => onSearchClick?.(search)}
        >
          <ClockIcon className="size-4 text-muted-foreground" />
          <span className="flex-1">{search}</span>
          {onRemove && (
            <button
              type="button"
              className="p-1 hover:bg-muted rounded"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(search);
              }}
            >
              <XIcon className="size-3 text-muted-foreground" />
            </button>
          )}
        </button>
      ))}
    </div>
  );
}

// =============================================================================
// SearchSuggestions
// =============================================================================

export interface SearchSuggestion {
  id?: string;
  label: string;
  icon?: ReactNode;
  trending?: boolean;
}

export interface SearchSuggestionsProps
  extends VariantProps<typeof searchSuggestionsVariants> {
  suggestions: string[] | SearchSuggestion[];
  onSuggestionClick?: (suggestion: string) => void;
  title?: string;
  className?: string;
}

export function SearchSuggestions({
  suggestions,
  onSuggestionClick,
  title = "Suggestions",
  variant,
  className,
}: SearchSuggestionsProps) {
  if (suggestions.length === 0) return null;

  const normalizedSuggestions: SearchSuggestion[] = suggestions.map((s) =>
    typeof s === "string" ? { label: s } : s,
  );

  return (
    <div className={className}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        {title}
      </p>
      <div className={cn(searchSuggestionsVariants({ variant }))}>
        {normalizedSuggestions.map((suggestion, index) => (
          <button
            type="button"
            key={suggestion.id || index}
            className={cn(
              searchSuggestionItemVariants({
                variant: suggestion.trending
                  ? "trending"
                  : variant === "inline"
                    ? "chip"
                    : "default",
              }),
            )}
            onClick={() => onSuggestionClick?.(suggestion.label)}
          >
            {suggestion.trending && (
              <TrendUpIcon className="size-4 text-success" />
            )}
            {suggestion.icon}
            <span>{suggestion.label}</span>
            {!suggestion.trending && variant !== "inline" && (
              <ArrowRightIcon className="size-3 ml-auto text-muted-foreground" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Types are exported at their definitions above
