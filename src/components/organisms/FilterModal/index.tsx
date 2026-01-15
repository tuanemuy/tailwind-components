import { forwardRef, useState, useEffect, type ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Checkbox } from "@/components/atoms/Checkbox";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/organisms/Modal";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/molecules/Accordion";
import { RangeSlider } from "@/components/molecules/RangeSlider";
import { DateRangePicker, type DateRange } from "@/components/molecules/DateRangePicker";
import { FilterIcon } from "@/lib/icons";
import type { FilterSection, FilterValues } from "@/components/organisms/FilterDrawer";

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (values: FilterValues) => void;
  onClear?: () => void;
  title?: string;
  subtitle?: ReactNode;
  sections: FilterSection[];
  values?: FilterValues;
  submitText?: string;
  clearText?: string;
  cancelText?: string;
  loading?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  showActiveCount?: boolean;
  className?: string;
}

export const FilterModal = forwardRef<HTMLDivElement, FilterModalProps>(
  (
    {
      isOpen,
      onClose,
      onApply,
      onClear,
      title = "Filters",
      subtitle,
      sections,
      values: initialValues = {},
      submitText = "Apply filters",
      clearText = "Clear all",
      cancelText = "Cancel",
      loading,
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

    const handleCheckboxChange = (sectionId: string, optionId: string, checked: boolean) => {
      setValues((prev) => {
        const currentValues = (prev[sectionId] as string[]) || [];
        if (checked) {
          return { ...prev, [sectionId]: [...currentValues, optionId] };
        } else {
          return {
            ...prev,
            [sectionId]: currentValues.filter((v) => v !== optionId),
          };
        }
      });
    };

    const handleRangeChange = (sectionId: string, range: [number, number]) => {
      setValues((prev) => ({ ...prev, [sectionId]: range }));
    };

    const handleDateRangeChange = (sectionId: string, range: DateRange | undefined) => {
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

    const activeFilterCount = Object.entries(values).reduce((count, [_, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        return count + (typeof value[0] === "string" ? value.length : 1);
      }
      if (value && typeof value === "object" && ("start" in value || "end" in value)) {
        return count + 1;
      }
      return count;
    }, 0);

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
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
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="none">
          <Accordion
            type="multiple"
            value={expandedSections}
            onValueChange={setExpandedSections}
          >
            {sections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="border-b border-border last:border-b-0"
              >
                <AccordionTrigger className="px-4 py-3 text-sm font-medium">
                  {section.label}
                  {section.type === "checkbox" &&
                    (values[section.id] as string[])?.length > 0 && (
                      <Badge soft className="ml-auto mr-2 text-xs">
                        {(values[section.id] as string[]).length}
                      </Badge>
                    )}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  {section.type === "checkbox" && section.options && (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {section.options.map((option) => {
                        const isChecked = (values[section.id] as string[])?.includes(
                          option.id,
                        );
                        return (
                          <label
                            key={option.id}
                            className="flex cursor-pointer items-center gap-3"
                          >
                            <Checkbox
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
        </ModalBody>

        <ModalFooter align="between">
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
        </ModalFooter>
      </Modal>
    );
  },
);
FilterModal.displayName = "FilterModal";

// Re-export types for convenience
export type { FilterSection, FilterValues, FilterOption } from "@/components/organisms/FilterDrawer";
