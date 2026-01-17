"use client";

import { type ReactNode, useId, useState } from "react";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/components/utils";

export interface CheckboxGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  extra?: ReactNode;
  icon?: ReactNode;
  count?: number;
  image?: string;
}

export interface CheckboxGroupProps {
  options: CheckboxGroupOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  name?: string;
  variant?: "list" | "card" | "grid" | "table" | "badge" | "filter" | "inline";
  columns?: 1 | 2 | 3 | 4;
  size?: "sm" | "md" | "lg";
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  color?: "primary" | "success" | "purple";
}

export const CheckboxGroup = ({
  options,
  value: controlledValue,
  defaultValue = [],
  onChange,
  name,
  variant = "list",
  columns = 1,
  size = "md",
  label,
  description,
  error,
  disabled,
  className,
  color = "primary",
}: CheckboxGroupProps) => {
  const groupId = useId();
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = (optionValue: string, checked: boolean) => {
    const newValue = checked
      ? [...currentValue, optionValue]
      : currentValue.filter((v) => v !== optionValue);

    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const getGridCols = () => {
    switch (columns) {
      case 2:
        return "sm:grid-cols-2";
      case 3:
        return "sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "sm:grid-cols-2 lg:grid-cols-4";
      default:
        return "";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xs";
      case "lg":
        return "text-base";
      default:
        return "text-sm";
    }
  };

  // チェックボックスのサイズ（shrink-0で縮小防止、明示的なサイズ指定）
  const getCheckboxSize = () => {
    switch (size) {
      case "sm":
        return "size-4";
      case "lg":
        return "size-6";
      default:
        return "size-5";
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return "size-3";
      case "lg":
        return "size-4";
      default:
        return "size-3.5";
    }
  };

  // カラー設定（チェック時の背景とボーダー）
  const getCheckedStyles = () => {
    switch (color) {
      case "success":
        return "bg-success border-success text-success-foreground";
      case "purple":
        return "bg-purple-600 border-purple-600 text-white";
      default:
        return "bg-primary border-primary text-primary-foreground";
    }
  };

  const getRingColor = () => {
    switch (color) {
      case "success":
        return "ring-success";
      case "purple":
        return "ring-purple-600";
      default:
        return "ring-primary";
    }
  };

  // チェックボックスのベーススタイル
  const checkboxBaseStyles = "shrink-0 flex items-center justify-center rounded border transition-colors";
  const uncheckedStyles = "border-input bg-background";

  return (
    <fieldset className={cn("space-y-3", className)}>
      {/* Group Label */}
      {(label || description) && (
        <legend className="mb-2">
          {label && (
            <span className="block text-sm font-medium text-foreground">
              {label}
            </span>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </legend>
      )}

      {/* Options */}
      <div
        className={cn(
          variant === "list" && "space-y-2",
          variant === "card" && cn("grid gap-3", getGridCols()),
          variant === "grid" && cn("grid gap-3", getGridCols()),
          variant === "table" && "divide-y divide-border",
          variant === "badge" && "flex flex-wrap gap-2",
          variant === "filter" && "space-y-1",
          variant === "inline" && "flex flex-wrap items-center gap-x-6 gap-y-2",
        )}
      >
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          const isChecked = currentValue.includes(option.value);
          const isOptionDisabled = disabled || option.disabled;

          // Badge variant
          if (variant === "badge") {
            return (
              <label
                key={option.value}
                className={cn(
                  "inline-flex items-center gap-x-2 py-2 px-3 rounded-full border cursor-pointer transition-all",
                  isChecked
                    ? getCheckedStyles()
                    : "border-border bg-card text-card-foreground hover:bg-muted",
                  isOptionDisabled && "opacity-50 cursor-not-allowed",
                  getSizeClasses(),
                )}
              >
                <input
                  type="checkbox"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  disabled={isOptionDisabled}
                  onChange={(e) => handleChange(option.value, e.target.checked)}
                  className="sr-only"
                />
                {isChecked && <CheckIcon className="size-3.5" />}
                <span>{option.label}</span>
              </label>
            );
          }

          // Card variant
          if (variant === "card") {
            return (
              <label
                key={option.value}
                className={cn(
                  "relative flex cursor-pointer rounded-xl p-4 border-2 bg-card transition-all",
                  isChecked
                    ? `border-primary ${getRingColor()}`
                    : "border-border hover:border-muted-foreground/50",
                  isOptionDisabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <input
                  type="checkbox"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  disabled={isOptionDisabled}
                  onChange={(e) => handleChange(option.value, e.target.checked)}
                  className="sr-only"
                />
                {/* Custom checkbox */}
                <span
                  className={cn(
                    checkboxBaseStyles,
                    "rounded-full border-2",
                    getCheckboxSize(),
                    isChecked ? getCheckedStyles() : uncheckedStyles,
                  )}
                >
                  {isChecked && <CheckIcon className={getIconSize()} />}
                </span>
                <span className="ms-4 flex-1">
                  <span className={cn("block font-medium text-foreground", getSizeClasses())}>
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {option.description}
                    </span>
                  )}
                </span>
                {option.extra && (
                  <span className="ms-auto text-sm font-medium text-foreground">
                    {option.extra}
                  </span>
                )}
              </label>
            );
          }

          // Filter variant
          if (variant === "filter") {
            return (
              <label
                key={option.value}
                className={cn(
                  "flex items-center gap-x-3 p-2 rounded-lg cursor-pointer transition-colors",
                  "hover:bg-muted",
                  isOptionDisabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <input
                  type="checkbox"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  disabled={isOptionDisabled}
                  onChange={(e) => handleChange(option.value, e.target.checked)}
                  className="sr-only"
                />
                {/* Custom checkbox */}
                <span
                  className={cn(
                    checkboxBaseStyles,
                    "size-4",
                    isChecked ? getCheckedStyles() : uncheckedStyles,
                  )}
                >
                  {isChecked && <CheckIcon className="size-3" />}
                </span>
                <span className={cn("text-foreground", getSizeClasses())}>
                  {option.label}
                </span>
                {option.count !== undefined && (
                  <span className="ms-auto text-xs text-muted-foreground">
                    ({option.count})
                  </span>
                )}
              </label>
            );
          }

          // Inline variant
          if (variant === "inline") {
            return (
              <label
                key={option.value}
                className={cn(
                  "inline-flex items-center gap-x-2 cursor-pointer",
                  isOptionDisabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <input
                  type="checkbox"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  disabled={isOptionDisabled}
                  onChange={(e) => handleChange(option.value, e.target.checked)}
                  className="sr-only"
                />
                {/* Custom checkbox */}
                <span
                  className={cn(
                    checkboxBaseStyles,
                    getCheckboxSize(),
                    isChecked ? getCheckedStyles() : uncheckedStyles,
                  )}
                >
                  {isChecked && <CheckIcon className={getIconSize()} />}
                </span>
                <span className={cn("text-foreground", getSizeClasses())}>
                  {option.label}
                </span>
              </label>
            );
          }

          // Grid variant
          if (variant === "grid") {
            return (
              <label
                key={option.value}
                className={cn(
                  "flex items-center gap-x-3 p-3 rounded-lg border cursor-pointer transition-all",
                  isChecked
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-muted-foreground/50",
                  isOptionDisabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <input
                  type="checkbox"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  disabled={isOptionDisabled}
                  onChange={(e) => handleChange(option.value, e.target.checked)}
                  className="sr-only"
                />
                {/* Custom checkbox */}
                <span
                  className={cn(
                    checkboxBaseStyles,
                    getCheckboxSize(),
                    isChecked ? getCheckedStyles() : uncheckedStyles,
                  )}
                >
                  {isChecked && <CheckIcon className={getIconSize()} />}
                </span>
                <span className="flex-1">
                  <span className={cn("block font-medium text-foreground", getSizeClasses())}>
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  )}
                </span>
              </label>
            );
          }

          // Table variant
          if (variant === "table") {
            return (
              <label
                key={option.value}
                className={cn(
                  "flex items-center gap-x-3 py-3 px-2 cursor-pointer transition-colors",
                  "hover:bg-muted",
                  isOptionDisabled && "opacity-50 cursor-not-allowed",
                )}
              >
                <input
                  type="checkbox"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  disabled={isOptionDisabled}
                  onChange={(e) => handleChange(option.value, e.target.checked)}
                  className="sr-only"
                />
                {/* Custom checkbox */}
                <span
                  className={cn(
                    checkboxBaseStyles,
                    getCheckboxSize(),
                    isChecked ? getCheckedStyles() : uncheckedStyles,
                  )}
                >
                  {isChecked && <CheckIcon className={getIconSize()} />}
                </span>
                <span className="flex-1">
                  <span className={cn("text-foreground", getSizeClasses())}>
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  )}
                </span>
                {option.extra && (
                  <span className="text-sm text-muted-foreground">
                    {option.extra}
                  </span>
                )}
              </label>
            );
          }

          // Default: list variant
          return (
            <label
              key={option.value}
              className={cn(
                "flex items-start gap-x-3 p-2 rounded-lg cursor-pointer transition-colors",
                "hover:bg-muted",
                isOptionDisabled && "opacity-50 cursor-not-allowed",
              )}
            >
              <input
                type="checkbox"
                id={optionId}
                name={name}
                value={option.value}
                checked={isChecked}
                disabled={isOptionDisabled}
                onChange={(e) => handleChange(option.value, e.target.checked)}
                className="sr-only"
              />
              {/* Custom checkbox */}
              <span
                className={cn(
                  checkboxBaseStyles,
                  "mt-0.5",
                  getCheckboxSize(),
                  isChecked ? getCheckedStyles() : uncheckedStyles,
                )}
              >
                {isChecked && <CheckIcon className={getIconSize()} />}
              </span>
              <span className="flex-1">
                <span className={cn("block text-foreground", getSizeClasses())}>
                  {option.label}
                </span>
                {option.description && (
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>

      {/* Error */}
      {error && <p className="text-sm text-red-600 dark:text-red-500">{error}</p>}
    </fieldset>
  );
};
CheckboxGroup.displayName = "CheckboxGroup";
