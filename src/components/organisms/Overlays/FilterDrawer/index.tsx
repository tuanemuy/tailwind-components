import { forwardRef, useEffect, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/molecules/Accordion";
import {
  type DateRange,
  DateRangePicker,
} from "@/components/molecules/DateRangePicker";
import { RangeSlider } from "@/components/molecules/RangeSlider";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
} from "@/components/organisms/Layout/Drawer";
import { FilterIcon, XIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterSection {
  id: string;
  label: string;
  type: "checkbox" | "range" | "dateRange";
  options?: FilterOption[];
  range?: {
    min: number;
    max: number;
    step?: number;
    prefix?: string;
    suffix?: string;
  };
  defaultExpanded?: boolean;
}

export interface FilterValues {
  [sectionId: string]: string[] | [number, number] | DateRange | undefined;
}

export interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (values: FilterValues) => void;
  onClear?: () => void;
  title?: string;
  sections: FilterSection[];
  values?: FilterValues;
  submitText?: string;
  clearText?: string;
  cancelText?: string;
  loading?: boolean;
  position?: "left" | "right";
  size?: "sm" | "md" | "lg";
  showActiveCount?: boolean;
  className?: string;
}

export const FilterDrawer = forwardRef<HTMLDivElement, FilterDrawerProps>(
  (
    {
      isOpen,
      onClose,
      onApply,
      onClear,
      title = "Filters",
      sections,
      values: initialValues = {},
      submitText = "Apply filters",
      clearText = "Clear all",
      cancelText = "Cancel",
      loading,
      position = "right",
      size = "md",
      showActiveCount = true,
      className,
    },
    ref,
  ) => {
    const [values, setValues] = useState<FilterValues>(initialValues);
    const [expandedSections, setExpandedSections] = useState<string[]>(
      sections.filter((s) => s.defaultExpanded !== false).map((s) => s.id),
    );

    useEffect(() => {
      if (isOpen) {
        setValues(initialValues);
      }
    }, [isOpen, initialValues]);

    const handleCheckboxChange = (
      sectionId: string,
      optionId: string,
      checked: boolean,
    ) => {
      setValues((prev) => {
        const currentValues = (prev[sectionId] as string[]) || [];
        if (checked) {
          return { ...prev, [sectionId]: [...currentValues, optionId] };
        }
        return {
          ...prev,
          [sectionId]: currentValues.filter((v) => v !== optionId),
        };
      });
    };

    const handleRangeChange = (sectionId: string, range: [number, number]) => {
      setValues((prev) => ({ ...prev, [sectionId]: range }));
    };

    const handleDateRangeChange = (
      sectionId: string,
      range: DateRange | undefined,
    ) => {
      if (range) {
        setValues((prev) => ({ ...prev, [sectionId]: range }));
      }
    };

    const handleClear = () => {
      setValues({});
      onClear?.();
    };

    const handleApply = () => {
      onApply(values);
    };

    const activeFilterCount = Object.entries(values).reduce(
      (count, [_, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          return count + (typeof value[0] === "string" ? value.length : 1);
        }
        if (
          value &&
          typeof value === "object" &&
          ("from" in value || "to" in value)
        ) {
          return count + 1;
        }
        return count;
      },
      0,
    );

    return (
      <Drawer
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        position={position}
        size={size}
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <DrawerHeader
          title={
            <span className="flex items-center gap-2">
              <FilterIcon className="size-5" />
              {title}
              {showActiveCount && activeFilterCount > 0 && (
                <Badge variant="default" className="ml-1">
                  {activeFilterCount}
                </Badge>
              )}
            </span>
          }
          showCloseButton={!loading}
        />

        <DrawerBody padding="none">
          <Accordion
            type="multiple"
            value={expandedSections}
            onValueChange={setExpandedSections}
          >
            {sections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="border-b border-border"
              >
                <AccordionTrigger className="gap-2 px-4 py-3 text-sm font-medium">
                  <span className="flex-1">{section.label}</span>
                  {section.type === "checkbox" &&
                    (values[section.id] as string[])?.length > 0 && (
                      <Badge soft className="mr-2 text-xs">
                        {(values[section.id] as string[]).length}
                      </Badge>
                    )}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  {section.type === "checkbox" && section.options && (
                    <div className="space-y-2">
                      {section.options.map((option) => {
                        const isChecked = (
                          values[section.id] as string[]
                        )?.includes(option.id);
                        return (
                          <label
                            key={option.id}
                            htmlFor={`filter-${section.id}-${option.id}`}
                            className="flex cursor-pointer items-center gap-3"
                          >
                            <Checkbox
                              id={`filter-${section.id}-${option.id}`}
                              checked={isChecked}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  section.id,
                                  option.id,
                                  e.target.checked,
                                )
                              }
                              disabled={loading}
                            />
                            <span className="flex-1 text-sm text-foreground">
                              {option.label}
                            </span>
                            {option.count !== undefined && (
                              <span className="text-xs text-muted-foreground">
                                ({option.count})
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {section.type === "range" && section.range && (
                    <div className="space-y-4 pt-2">
                      <RangeSlider
                        min={section.range.min}
                        max={section.range.max}
                        step={section.range.step || 1}
                        value={
                          (values[section.id] as [number, number]) || [
                            section.range.min,
                            section.range.max,
                          ]
                        }
                        onChange={(value) =>
                          handleRangeChange(section.id, value)
                        }
                        disabled={loading}
                        showValues
                        formatValue={(v) =>
                          `${section.range?.prefix || ""}${v}${section.range?.suffix || ""}`
                        }
                      />
                    </div>
                  )}

                  {section.type === "dateRange" && (
                    <div className="pt-2">
                      <DateRangePicker
                        value={(values[section.id] as DateRange) || {}}
                        onChange={(range) =>
                          handleDateRangeChange(section.id, range)
                        }
                        disabled={loading}
                      />
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DrawerBody>

        <DrawerFooter bordered align="between">
          <Button
            variant="ghost"
            onClick={handleClear}
            disabled={loading || activeFilterCount === 0}
          >
            {clearText}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              {cancelText}
            </Button>
            <Button variant="primary" onClick={handleApply} loading={loading}>
              {submitText}
            </Button>
          </div>
        </DrawerFooter>
      </Drawer>
    );
  },
);
FilterDrawer.displayName = "FilterDrawer";

// ActiveFilters - Component to display active filters
export interface ActiveFiltersProps {
  sections: FilterSection[];
  values: FilterValues;
  onRemove: (sectionId: string, optionId?: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export const ActiveFilters = ({
  sections,
  values,
  onRemove,
  onClearAll,
  className,
}: ActiveFiltersProps) => {
  const activeFilters: {
    sectionId: string;
    sectionLabel: string;
    optionId?: string;
    label: string;
  }[] = [];

  for (const section of sections) {
    const value = values[section.id];
    if (!value) continue;

    if (section.type === "checkbox" && Array.isArray(value)) {
      for (const optionId of value as string[]) {
        const option = section.options?.find((o) => o.id === optionId);
        if (option) {
          activeFilters.push({
            sectionId: section.id,
            sectionLabel: section.label,
            optionId,
            label: option.label,
          });
        }
      }
    } else if (section.type === "range" && Array.isArray(value)) {
      const [min, max] = value as [number, number];
      const prefix = section.range?.prefix || "";
      const suffix = section.range?.suffix || "";
      activeFilters.push({
        sectionId: section.id,
        sectionLabel: section.label,
        label: `${prefix}${min}${suffix} - ${prefix}${max}${suffix}`,
      });
    } else if (section.type === "dateRange" && typeof value === "object") {
      const { start, end } = value as DateRange;
      if (start || end) {
        const startStr = start ? start.toLocaleDateString() : "";
        const endStr = end ? end.toLocaleDateString() : "";
        activeFilters.push({
          sectionId: section.id,
          sectionLabel: section.label,
          label:
            start && end
              ? `${startStr} - ${endStr}`
              : start
                ? `From ${startStr}`
                : `Until ${endStr}`,
        });
      }
    }
  }

  if (activeFilters.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {activeFilters.map((filter, index) => (
        <Badge
          key={`${filter.sectionId}-${filter.optionId || index}`}
          soft
          className="gap-1 pr-1"
        >
          <span className="text-muted-foreground">{filter.sectionLabel}:</span>
          {filter.label}
          <button
            type="button"
            onClick={() => onRemove(filter.sectionId, filter.optionId)}
            className="rounded-full p-0.5 hover:bg-foreground/10"
          >
            <XIcon className="size-3" />
          </button>
        </Badge>
      ))}
      {onClearAll && activeFilters.length > 1 && (
        <Button variant="ghost" size="sm" onClick={onClearAll}>
          Clear all
        </Button>
      )}
    </div>
  );
};
