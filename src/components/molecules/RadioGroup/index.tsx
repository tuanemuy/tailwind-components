"use client";

import { type ReactNode, useId, useState } from "react";
import { Radio } from "@/components/atoms";
import { cn } from "@/lib/utils";

export interface RadioGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  extra?: ReactNode;
  icon?: ReactNode;
}

export interface RadioGroupProps {
  options: RadioGroupOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  variant?: "list" | "card" | "inline" | "button" | "grid";
  columns?: 1 | 2 | 3 | 4;
  size?: "sm" | "md" | "lg";
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const RadioGroup = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  name,
  variant = "list",
  columns = 1,
  size = "md",
  label,
  description,
  error,
  disabled,
  required,
  className,
}: RadioGroupProps) => {
  const groupId = useId();
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue,
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (optionValue: string) => {
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
  };

  const getGridCols = () => {
    switch (columns) {
      case 1:
        return "";
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

  const getButtonSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-2.5 py-1.5 text-xs";
      case "lg":
        return "px-4 py-2.5 text-base";
      default:
        return "px-3 py-2 text-sm";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {/* Group Label */}
      {(label || description) && (
        <div className="space-y-1">
          {label && (
            <span className="block text-sm font-medium text-foreground">
              {label}
              {required && (
                <span className="ms-1 text-destructive" aria-hidden="true">
                  *
                </span>
              )}
            </span>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {/* Options */}
      <div
        className={cn(
          variant === "list" && "flex flex-col space-y-1",
          variant === "card" && cn("grid gap-3", getGridCols()),
          variant === "grid" && cn("grid gap-3", getGridCols()),
          variant === "inline" && "flex flex-wrap items-center gap-4",
          variant === "button" && "inline-flex rounded-lg border border-border",
        )}
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-required={required}
      >
        {options.map((option, index) => {
          const optionId = `${groupId}-${option.value}`;
          const isChecked = value === option.value;
          const isDisabled = disabled || option.disabled;

          if (variant === "card") {
            return (
              <label
                key={option.value}
                htmlFor={optionId}
                className={cn(
                  "relative flex cursor-pointer rounded-xl p-4",
                  "bg-card ring-1 ring-border",
                  "transition-all",
                  isChecked && "ring-2 ring-primary",
                  isDisabled && "cursor-not-allowed opacity-50",
                  !isDisabled && "hover:bg-accent/50",
                  getSizeClasses(),
                )}
              >
                <input
                  type="radio"
                  id={optionId}
                  name={name || groupId}
                  value={option.value}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => handleChange(option.value)}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border-2",
                    "border-border bg-background",
                    "peer-checked:border-primary",
                    "transition-colors",
                  )}
                >
                  <span
                    className={cn(
                      "size-2.5 rounded-full bg-primary scale-0 transition-transform",
                      isChecked && "scale-100",
                    )}
                  />
                </span>
                <span className="ms-4 grow">
                  <span className="block font-medium text-foreground">
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="mt-0.5 block text-muted-foreground">
                      {option.description}
                    </span>
                  )}
                </span>
                {option.extra && (
                  <span className="ms-auto shrink-0">{option.extra}</span>
                )}
              </label>
            );
          }

          if (variant === "grid") {
            return (
              <label
                key={option.value}
                htmlFor={optionId}
                className={cn(
                  "relative flex cursor-pointer items-center gap-x-3 rounded-lg border p-3",
                  "bg-card border-border",
                  "transition-all",
                  isChecked && "border-primary bg-primary/5",
                  isDisabled && "cursor-not-allowed opacity-50",
                  !isDisabled && "hover:border-primary/50",
                  getSizeClasses(),
                )}
              >
                <Radio
                  id={optionId}
                  name={name || groupId}
                  value={option.value}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => handleChange(option.value)}
                  size={size}
                />
                <span className="grow">
                  {option.icon && (
                    <span className="mb-2 block">{option.icon}</span>
                  )}
                  <span className="block font-medium text-foreground">
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

          if (variant === "inline") {
            return (
              <label
                key={option.value}
                htmlFor={optionId}
                className={cn(
                  "flex cursor-pointer items-center gap-x-2",
                  isDisabled && "cursor-not-allowed opacity-50",
                  getSizeClasses(),
                )}
              >
                <Radio
                  id={optionId}
                  name={name || groupId}
                  value={option.value}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => handleChange(option.value)}
                  size={size}
                />
                <span className="text-foreground">{option.label}</span>
              </label>
            );
          }

          if (variant === "button") {
            return (
              <label
                key={option.value}
                htmlFor={optionId}
                className={cn(
                  "relative cursor-pointer",
                  getButtonSizeClasses(),
                  "transition-colors",
                  index === 0 && "rounded-s-lg",
                  index === options.length - 1 && "rounded-e-lg",
                  index !== 0 && "border-s border-border",
                  isChecked
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground hover:bg-accent",
                  isDisabled && "cursor-not-allowed opacity-50",
                )}
              >
                <input
                  type="radio"
                  id={optionId}
                  name={name || groupId}
                  value={option.value}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => handleChange(option.value)}
                  className="sr-only"
                />
                <span className="flex items-center gap-x-2">
                  {option.icon}
                  <span>{option.label}</span>
                </span>
              </label>
            );
          }

          // Default: list variant
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                "flex cursor-pointer items-start gap-x-3 rounded-lg px-3 py-2",
                "transition-colors",
                isDisabled && "cursor-not-allowed opacity-50",
                !isDisabled && "hover:bg-accent/50",
                getSizeClasses(),
              )}
            >
              <Radio
                id={optionId}
                name={name || groupId}
                value={option.value}
                checked={isChecked}
                disabled={isDisabled}
                onChange={() => handleChange(option.value)}
                size={size}
                className="mt-0.5"
              />
              <span className="grow">
                <span className="block text-foreground">{option.label}</span>
                {option.description && (
                  <span className="mt-0.5 block text-muted-foreground">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>

      {/* Error */}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
RadioGroup.displayName = "RadioGroup";
