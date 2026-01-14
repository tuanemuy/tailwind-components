"use client";

import { forwardRef, useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  rangeSliderTrackVariants,
  rangeSliderRangeVariants,
  rangeSliderThumbVariants,
} from "@/lib/variants/rangeSlider";
import type { VariantProps } from "class-variance-authority";

export interface RangeSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">,
    VariantProps<typeof rangeSliderTrackVariants> {
  value?: [number, number];
  defaultValue?: [number, number];
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: [number, number]) => void;
  onChangeEnd?: (value: [number, number]) => void;
  disabled?: boolean;
  showValues?: boolean;
  formatValue?: (value: number) => string;
}

export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      className,
      size = "md",
      value: controlledValue,
      defaultValue = [25, 75],
      min = 0,
      max = 100,
      step = 1,
      onChange,
      onChangeEnd,
      disabled = false,
      showValues = false,
      formatValue = (v) => v.toString(),
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value = controlledValue ?? internalValue;

    const trackRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState<"min" | "max" | null>(null);

    const clamp = (val: number, minVal: number, maxVal: number) =>
      Math.min(Math.max(val, minVal), maxVal);

    const roundToStep = (val: number) => {
      const steps = Math.round((val - min) / step);
      return min + steps * step;
    };

    const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

    const getValueFromPosition = useCallback(
      (clientX: number) => {
        if (!trackRef.current) return 0;
        const rect = trackRef.current.getBoundingClientRect();
        const percentage = clamp((clientX - rect.left) / rect.width, 0, 1);
        const rawValue = min + percentage * (max - min);
        return roundToStep(rawValue);
      },
      [min, max, step]
    );

    const updateValue = useCallback(
      (newValue: [number, number]) => {
        const sortedValue: [number, number] = [
          Math.min(newValue[0], newValue[1]),
          Math.max(newValue[0], newValue[1]),
        ];
        if (!controlledValue) {
          setInternalValue(sortedValue);
        }
        onChange?.(sortedValue);
      },
      [controlledValue, onChange]
    );

    const handleMouseDown = (thumb: "min" | "max") => (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setDragging(thumb);
    };

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!dragging || disabled) return;
        const newValue = getValueFromPosition(e.clientX);
        if (dragging === "min") {
          updateValue([newValue, value[1]]);
        } else {
          updateValue([value[0], newValue]);
        }
      },
      [dragging, disabled, getValueFromPosition, updateValue, value]
    );

    const handleMouseUp = useCallback(() => {
      if (dragging) {
        onChangeEnd?.(value);
        setDragging(null);
      }
    }, [dragging, onChangeEnd, value]);

    useEffect(() => {
      if (dragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      }
    }, [dragging, handleMouseMove, handleMouseUp]);

    const handleTrackClick = (e: React.MouseEvent) => {
      if (disabled) return;
      const newValue = getValueFromPosition(e.clientX);
      const distToMin = Math.abs(newValue - value[0]);
      const distToMax = Math.abs(newValue - value[1]);
      if (distToMin <= distToMax) {
        updateValue([newValue, value[1]]);
      } else {
        updateValue([value[0], newValue]);
      }
    };

    const minPercent = getPercentage(value[0]);
    const maxPercent = getPercentage(value[1]);

    return (
      <div
        ref={ref}
        className={cn("w-full", disabled && "opacity-50", className)}
        {...props}
      >
        {showValues && (
          <div className="mb-2 flex justify-between text-sm text-muted-foreground">
            <span>{formatValue(value[0])}</span>
            <span>{formatValue(value[1])}</span>
          </div>
        )}

        <div
          ref={trackRef}
          className={cn(rangeSliderTrackVariants({ size }), "cursor-pointer")}
          onClick={handleTrackClick}
        >
          {/* Range fill */}
          <div
            className={cn(rangeSliderRangeVariants({}))}
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />

          {/* Min thumb */}
          <div
            className={cn(
              rangeSliderThumbVariants({ size }),
              "cursor-grab",
              dragging === "min" && "cursor-grabbing"
            )}
            style={{ left: `${minPercent}%` }}
            onMouseDown={handleMouseDown("min")}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={value[1]}
            aria-valuenow={value[0]}
            tabIndex={disabled ? -1 : 0}
          />

          {/* Max thumb */}
          <div
            className={cn(
              rangeSliderThumbVariants({ size }),
              "cursor-grab",
              dragging === "max" && "cursor-grabbing"
            )}
            style={{ left: `${maxPercent}%` }}
            onMouseDown={handleMouseDown("max")}
            role="slider"
            aria-valuemin={value[0]}
            aria-valuemax={max}
            aria-valuenow={value[1]}
            tabIndex={disabled ? -1 : 0}
          />
        </div>
      </div>
    );
  }
);
RangeSlider.displayName = "RangeSlider";

// Single value slider
export interface SliderProps
  extends Omit<RangeSliderProps, "value" | "defaultValue" | "onChange" | "onChangeEnd"> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = 50,
      min = 0,
      onChange,
      onChangeEnd,
      ...props
    },
    ref
  ) => {
    const internalValue: [number, number] = [
      min,
      controlledValue ?? defaultValue,
    ];

    return (
      <RangeSlider
        ref={ref}
        value={internalValue}
        min={min}
        onChange={(range) => onChange?.(range[1])}
        onChangeEnd={(range) => onChangeEnd?.(range[1])}
        {...props}
      />
    );
  }
);
Slider.displayName = "Slider";
