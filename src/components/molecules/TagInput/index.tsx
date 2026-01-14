"use client";

import { forwardRef, useState, useRef } from "react";
import type { KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { tagInputContainerVariants, tagVariants } from "@/lib/variants/tagInput";
import { XIcon } from "@/lib/icons";
import type { VariantProps } from "class-variance-authority";

export interface TagInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof tagInputContainerVariants> {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  allowDuplicates?: boolean;
  disabled?: boolean;
  delimiter?: string | RegExp;
  validateTag?: (tag: string) => boolean;
  onTagAdd?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
}

export const TagInput = forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      className,
      size = "md",
      value = [],
      onChange,
      placeholder = "Add tag...",
      maxTags,
      allowDuplicates = false,
      disabled = false,
      delimiter = /[,\s]+/,
      validateTag,
      onTagAdd,
      onTagRemove,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const addTag = (tag: string) => {
      const trimmedTag = tag.trim();
      if (!trimmedTag) return;
      if (!allowDuplicates && value.includes(trimmedTag)) return;
      if (maxTags && value.length >= maxTags) return;
      if (validateTag && !validateTag(trimmedTag)) return;

      const newTags = [...value, trimmedTag];
      onChange?.(newTags);
      onTagAdd?.(trimmedTag);
      setInputValue("");
    };

    const removeTag = (tagToRemove: string) => {
      const newTags = value.filter((tag) => tag !== tagToRemove);
      onChange?.(newTags);
      onTagRemove?.(tagToRemove);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      // Check for delimiter
      if (delimiter && delimiter instanceof RegExp ? delimiter.test(newValue) : newValue.includes(delimiter as string)) {
        const parts = newValue.split(delimiter).filter(Boolean);
        parts.forEach(addTag);
      } else {
        setInputValue(newValue);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
        removeTag(value[value.length - 1]);
      }
    };

    const handleContainerClick = () => {
      inputRef.current?.focus();
    };

    const iconSize = size === "sm" ? "size-3" : size === "lg" ? "size-4" : "size-3.5";

    return (
      <div
        ref={ref}
        className={cn(
          tagInputContainerVariants({ size }),
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onClick={handleContainerClick}
        {...props}
      >
        {value.map((tag) => (
          <span key={tag} className={cn(tagVariants({ size }))}>
            {tag}
            {!disabled && (
              <button
                type="button"
                className="rounded-sm hover:bg-foreground/10 focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
              >
                <XIcon className={iconSize} />
              </button>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          disabled={disabled || (maxTags !== undefined && value.length >= maxTags)}
          className="min-w-[80px] flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>
    );
  }
);
TagInput.displayName = "TagInput";
