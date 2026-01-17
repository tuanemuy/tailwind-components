"use client";

import type { VariantProps } from "class-variance-authority";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Input } from "@/components/atoms";
import { cn } from "@/components/utils";
import {
  colorPickerDropdownVariants,
  colorPickerNativeVariants,
  colorPickerPresetVariants,
  colorPickerSwatchVariants,
  colorPickerTriggerVariants,
} from "@/components/variants/colorPicker";

// Predefined color presets
const DEFAULT_PRESETS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#6366f1",
  "#a855f7",
  "#ec4899",
  "#f43f5e",
  "#64748b",
  "#000000",
];

export interface ColorPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof colorPickerSwatchVariants> {
  value?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  showPresets?: boolean;
  showInput?: boolean;
  disabled?: boolean;
}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      className,
      value = "#3b82f6",
      onChange,
      presets = DEFAULT_PRESETS,
      showPresets = true,
      showInput = true,
      size = "md",
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
        onChange?.(newValue);
      }
    };

    const handlePresetClick = (color: string) => {
      onChange?.(color);
      setInputValue(color);
    };

    const handleNativePickerChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const newValue = e.target.value;
      onChange?.(newValue);
      setInputValue(newValue);
    };

    return (
      <div ref={containerRef} className="relative inline-block" {...props}>
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          disabled={disabled}
          className={cn(colorPickerTriggerVariants({ size }), className)}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={cn(colorPickerSwatchVariants({ size }))}
            style={{ backgroundColor: value }}
          />
        </button>

        {isOpen && (
          <div className={cn(colorPickerDropdownVariants({ size }))}>
            {/* Native color picker */}
            <div className="mb-3 flex items-center gap-x-2">
              <div className="relative">
                <input
                  type="color"
                  value={value}
                  onChange={handleNativePickerChange}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <div
                  className={cn(colorPickerNativeVariants())}
                  style={{ backgroundColor: value }}
                />
              </div>
              {showInput && (
                <Input
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-24 font-mono uppercase"
                  inputSize={size === "lg" ? "md" : "sm"}
                  maxLength={7}
                />
              )}
            </div>

            {/* Presets */}
            {showPresets && presets.length > 0 && (
              <div className="grid grid-cols-6 gap-1.5">
                {presets.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={cn(
                      colorPickerPresetVariants({
                        size,
                        selected: value === color,
                      }),
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handlePresetClick(color)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);
ColorPicker.displayName = "ColorPicker";

// Inline color picker without dropdown
export interface InlineColorPickerProps
  extends Omit<ColorPickerProps, "showPresets" | "showInput"> {}

export const InlineColorPicker = forwardRef<
  HTMLDivElement,
  InlineColorPickerProps
>(
  (
    {
      className,
      value = "#3b82f6",
      onChange,
      presets = DEFAULT_PRESETS,
      size = "md",
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
        onChange?.(newValue);
      }
    };

    const handlePresetClick = (color: string) => {
      onChange?.(color);
      setInputValue(color);
    };

    const handleNativePickerChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const newValue = e.target.value;
      onChange?.(newValue);
      setInputValue(newValue);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "space-y-3",
          disabled && "opacity-50 pointer-events-none",
          className,
        )}
        {...props}
      >
        {/* Native color picker and input */}
        <div className="flex items-center gap-x-2">
          <div className="relative">
            <input
              type="color"
              value={value}
              onChange={handleNativePickerChange}
              className="absolute inset-0 cursor-pointer opacity-0"
              disabled={disabled}
            />
            <div
              className={cn(colorPickerNativeVariants())}
              style={{ backgroundColor: value }}
            />
          </div>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            className="w-24 font-mono uppercase"
            inputSize={size === "lg" ? "md" : "sm"}
            maxLength={7}
            disabled={disabled}
          />
        </div>

        {/* Presets */}
        {presets.length > 0 && (
          <div className="grid grid-cols-6 gap-1.5">
            {presets.map((color) => (
              <button
                key={color}
                type="button"
                disabled={disabled}
                className={cn(
                  colorPickerPresetVariants({
                    size,
                    selected: value === color,
                  }),
                )}
                style={{ backgroundColor: color }}
                onClick={() => handlePresetClick(color)}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);
InlineColorPicker.displayName = "InlineColorPicker";
