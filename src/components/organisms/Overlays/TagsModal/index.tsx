import { forwardRef, type ReactNode, useEffect, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/organisms/Layout/Modal";
import { CheckIcon, PlusIcon, TagIcon, XIcon } from "@/components/icons";
import { cn } from "@/components/utils";

export interface TagItem {
  id: string;
  label: string;
  color?: string;
}

export interface TagsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedTags: TagItem[]) => void;
  title?: string;
  subtitle?: ReactNode;
  availableTags: TagItem[];
  selectedTags?: TagItem[];
  allowCustomTags?: boolean;
  maxTags?: number;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
}

export const TagsModal = forwardRef<HTMLDivElement, TagsModalProps>(
  (
    {
      isOpen,
      onClose,
      onSave,
      title = "Manage tags",
      subtitle,
      availableTags,
      selectedTags: initialSelectedTags = [],
      allowCustomTags = true,
      maxTags,
      submitText = "Save",
      cancelText = "Cancel",
      loading,
      searchPlaceholder = "Search tags...",
      emptyMessage = "No tags found",
      className,
    },
    ref,
  ) => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(
      new Set(initialSelectedTags.map((t) => t.id)),
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [customTags, setCustomTags] = useState<TagItem[]>([]);

    // Reset state when modal opens
    useEffect(() => {
      if (isOpen) {
        setSelectedIds(new Set(initialSelectedTags.map((t) => t.id)));
        setSearchQuery("");
        setCustomTags([]);
      }
    }, [isOpen, initialSelectedTags]);

    const allTags = [...availableTags, ...customTags];

    const filteredTags = allTags.filter((tag) =>
      tag.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const canAddMore = !maxTags || selectedIds.size < maxTags;

    const toggleTag = (tagId: string) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(tagId)) {
          next.delete(tagId);
        } else if (canAddMore) {
          next.add(tagId);
        }
        return next;
      });
    };

    const addCustomTag = () => {
      if (!searchQuery.trim() || !allowCustomTags || !canAddMore) return;

      const exists = allTags.some(
        (tag) => tag.label.toLowerCase() === searchQuery.toLowerCase(),
      );

      if (!exists) {
        const newTag: TagItem = {
          id: `custom-${Date.now()}`,
          label: searchQuery.trim(),
        };
        setCustomTags((prev) => [...prev, newTag]);
        setSelectedIds((prev) => new Set([...prev, newTag.id]));
        setSearchQuery("");
      }
    };

    const handleSubmit = () => {
      const selected = allTags.filter((tag) => selectedIds.has(tag.id));
      onSave(selected);
    };

    const handleClose = () => {
      setSelectedIds(new Set(initialSelectedTags.map((t) => t.id)));
      setSearchQuery("");
      setCustomTags([]);
      onClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && searchQuery.trim() && allowCustomTags) {
        e.preventDefault();
        addCustomTag();
      }
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        size="md"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={title}
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-4">
            {/* Selected tags preview */}
            {selectedIds.size > 0 && (
              <div className="flex flex-wrap gap-2">
                {allTags
                  .filter((tag) => selectedIds.has(tag.id))
                  .map((tag) => (
                    <Badge key={tag.id} soft className={cn("gap-1", tag.color)}>
                      {tag.label}
                      <button
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        className="rounded-full hover:bg-foreground/10"
                      >
                        <XIcon className="size-3" />
                      </button>
                    </Badge>
                  ))}
              </div>
            )}

            {/* Search input */}
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={searchPlaceholder}
                disabled={loading}
                leftIcon={<TagIcon className="size-4" />}
              />
              {allowCustomTags && searchQuery.trim() && canAddMore && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addCustomTag}
                  className="absolute end-1 top-1/2 -translate-y-1/2"
                >
                  <PlusIcon className="size-4" />
                  Create
                </Button>
              )}
            </div>

            {/* Max tags indicator */}
            {maxTags && (
              <p className="text-xs text-muted-foreground">
                {selectedIds.size} / {maxTags} tags selected
              </p>
            )}

            {/* Available tags */}
            <div className="max-h-60 space-y-1 overflow-y-auto">
              {filteredTags.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </p>
              ) : (
                filteredTags.map((tag) => {
                  const isSelected = selectedIds.has(tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      disabled={loading || (!isSelected && !canAddMore)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg p-2 text-start transition-colors",
                        isSelected ? "bg-primary/5" : "hover:bg-muted/50",
                        !isSelected &&
                          !canAddMore &&
                          "cursor-not-allowed opacity-50",
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-6 items-center justify-center rounded border-2 transition-colors",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border",
                        )}
                      >
                        {isSelected && <CheckIcon className="size-4" />}
                      </div>
                      <Badge soft className={cn("font-normal", tag.color)}>
                        {tag.label}
                      </Badge>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {submitText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
TagsModal.displayName = "TagsModal";

// Preset colors for tags
export const tagColors = {
  red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  orange:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  yellow:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  teal: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  indigo:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  purple:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  pink: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  gray: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};
