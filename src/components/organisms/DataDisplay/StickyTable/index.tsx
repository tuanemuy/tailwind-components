"use client";

import { forwardRef, useCallback } from "react";
import { Button, Checkbox } from "@/components/atoms";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  SpinnerIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";
import {
  tableCellVariants,
  tableContainerVariants,
  tableEmptyStateVariants,
  tableHeaderCellVariants,
  tableLoadingStateVariants,
  tablePaginationVariants,
  tableRowVariants,
} from "@/components/variants";

// ============================================
// Column Types
// ============================================

export interface StickyTableColumn<T> {
  key: string;
  header: React.ReactNode;
  width?: string;
  minWidth?: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
  sticky?: "left" | "right";
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
  accessor?: keyof T | ((row: T) => unknown);
}

// ============================================
// Sort Types
// ============================================

export type SortDirection = "asc" | "desc" | null;

export interface SortState {
  key: string;
  direction: SortDirection;
}

// ============================================
// Pagination Types
// ============================================

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

// ============================================
// StickyTable Props
// ============================================

export interface StickyTableProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  data: T[];
  columns: StickyTableColumn<T>[];
  getRowKey?: (row: T, index: number) => string | number;
  maxHeight?: string | number;
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (selectedRows: T[]) => void;
  sortable?: boolean;
  sortState?: SortState;
  onSort?: (sortState: SortState) => void;
  pagination?: PaginationProps;
  emptyState?: React.ReactNode;
  loading?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  onRowClick?: (row: T, index: number) => void;
}

// ============================================
// StickyTable Component
// ============================================

function StickyTableInner<T>(
  {
    className,
    data,
    columns,
    getRowKey = (_, index) => index,
    maxHeight = 400,
    selectable = false,
    selectedRows = [],
    onSelectionChange,
    sortable = false,
    sortState,
    onSort,
    pagination,
    emptyState,
    loading = false,
    striped = false,
    hoverable = true,
    bordered = false,
    compact = false,
    onRowClick,
    ...props
  }: StickyTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const size = compact ? "compact" : "default";

  // Calculate sticky positions
  const getStickyPosition = (
    columnIndex: number,
    direction: "left" | "right",
  ) => {
    let position = 0;
    const targetColumns = columns.filter((col) => col.sticky === direction);
    void targetColumns;

    if (direction === "left") {
      // Add checkbox column width if selectable
      if (selectable && columnIndex > 0) {
        position += 52; // Checkbox column width
      }

      for (let i = 0; i < columnIndex; i++) {
        const col = columns[i];
        if (col.sticky === "left") {
          position += Number.parseInt(col.width || "150", 10);
        }
      }
    } else {
      // Right sticky
      const rightStickyColumns = columns.filter(
        (col) => col.sticky === "right",
      );
      const currentIndex = rightStickyColumns.findIndex(
        (col) => col.key === columns[columnIndex].key,
      );

      for (let i = currentIndex + 1; i < rightStickyColumns.length; i++) {
        position += Number.parseInt(rightStickyColumns[i].width || "150", 10);
      }
    }

    return position;
  };

  // Selection logic
  const isRowSelected = useCallback(
    (row: T) => selectedRows.includes(row),
    [selectedRows],
  );

  const isAllSelected = data.length > 0 && selectedRows.length === data.length;
  const isIndeterminate =
    selectedRows.length > 0 && selectedRows.length < data.length;

  const handleSelectAll = useCallback(() => {
    if (isAllSelected) {
      onSelectionChange?.([]);
    } else {
      onSelectionChange?.([...data]);
    }
  }, [isAllSelected, data, onSelectionChange]);

  const handleSelectRow = useCallback(
    (row: T) => {
      if (isRowSelected(row)) {
        onSelectionChange?.(selectedRows.filter((r) => r !== row));
      } else {
        onSelectionChange?.([...selectedRows, row]);
      }
    },
    [isRowSelected, selectedRows, onSelectionChange],
  );

  // Sort logic
  const handleSort = useCallback(
    (key: string) => {
      if (!onSort) return;

      let direction: SortDirection = "asc";
      if (sortState?.key === key) {
        if (sortState.direction === "asc") {
          direction = "desc";
        } else if (sortState.direction === "desc") {
          direction = null;
        }
      }

      onSort({ key, direction });
    },
    [sortState, onSort],
  );

  // Get cell value
  const getCellValue = (row: T, column: StickyTableColumn<T>) => {
    if (column.accessor) {
      if (typeof column.accessor === "function") {
        return column.accessor(row);
      }
      return row[column.accessor];
    }
    return (row as Record<string, unknown>)[column.key];
  };

  // Pagination
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.pageSize)
    : 0;

  const stickyBaseClass = "sticky z-10 bg-card";
  const stickyShadowLeft = "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]";
  const stickyShadowRight = "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]";

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {/* Table Container */}
      <div
        className={cn(tableContainerVariants({ bordered }), "relative")}
        style={{
          maxHeight:
            typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
        }}
      >
        <div className="min-w-full inline-block align-middle">
          <table className="min-w-full divide-y divide-border">
            {/* Header */}
            <thead className="sticky top-0 z-20 bg-card">
              <tr>
                {selectable && (
                  <th
                    scope="col"
                    className={cn(
                      "w-[52px] ps-4 py-3 sticky left-0 z-30 bg-card",
                      stickyShadowLeft,
                    )}
                  >
                    <Checkbox
                      checked={isAllSelected}
                      indeterminate={isIndeterminate}
                      onChange={handleSelectAll}
                      aria-label="Select all rows"
                    />
                  </th>
                )}

                {columns.map((column, index) => {
                  const isSortable = sortable || column.sortable;
                  const isSorted = sortState?.key === column.key;
                  const sortIcon = isSortable && isSorted && (
                    <span className="shrink-0">
                      {sortState?.direction === "asc" ? (
                        <ChevronUpIcon className="size-4" />
                      ) : sortState?.direction === "desc" ? (
                        <ChevronDownIcon className="size-4" />
                      ) : null}
                    </span>
                  );

                  const stickyStyle = column.sticky
                    ? {
                        [column.sticky]: getStickyPosition(
                          index,
                          column.sticky,
                        ),
                      }
                    : undefined;

                  return (
                    <th
                      key={column.key}
                      scope="col"
                      style={{
                        width: column.width,
                        minWidth: column.minWidth,
                        ...stickyStyle,
                      }}
                      className={cn(
                        tableHeaderCellVariants({
                          size,
                          align: column.align,
                          sortable: isSortable,
                        }),
                        column.sticky && stickyBaseClass,
                        column.sticky === "left" && stickyShadowLeft,
                        column.sticky === "right" && stickyShadowRight,
                      )}
                    >
                      {isSortable ? (
                        <button
                          type="button"
                          className="flex items-center gap-x-1"
                          onClick={() => handleSort(column.key)}
                        >
                          {column.header}
                          {sortIcon}
                        </button>
                      ) : (
                        <div className="flex items-center gap-x-1">
                          {column.header}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className={cn(
                      tableLoadingStateVariants({ variant: "spinner" }),
                    )}
                  >
                    <SpinnerIcon className="size-5 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Loading...
                    </span>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className={cn(tableEmptyStateVariants())}
                  >
                    {emptyState || (
                      <span className="text-sm text-muted-foreground">
                        No data available
                      </span>
                    )}
                  </td>
                </tr>
              ) : (
                data.map((row, rowIndex) => (
                  <tr
                    key={getRowKey(row, rowIndex)}
                    role={onRowClick ? "button" : undefined}
                    tabIndex={onRowClick ? 0 : undefined}
                    className={cn(
                      tableRowVariants({
                        hoverable,
                        clickable: !!onRowClick,
                        selected: isRowSelected(row),
                        striped,
                      }),
                    )}
                    onClick={
                      onRowClick ? () => onRowClick(row, rowIndex) : undefined
                    }
                    onKeyDown={
                      onRowClick
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              onRowClick(row, rowIndex);
                            }
                          }
                        : undefined
                    }
                  >
                    {selectable && (
                      <td
                        className={cn(
                          "w-[52px] whitespace-nowrap ps-4 py-3 sticky left-0 z-10 bg-card",
                          stickyShadowLeft,
                        )}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={isRowSelected(row)}
                          onChange={() => handleSelectRow(row)}
                          aria-label={`Select row ${rowIndex + 1}`}
                        />
                      </td>
                    )}

                    {columns.map((column, colIndex) => {
                      const value = getCellValue(row, column);

                      const stickyStyle = column.sticky
                        ? {
                            [column.sticky]: getStickyPosition(
                              colIndex,
                              column.sticky,
                            ),
                          }
                        : undefined;

                      return (
                        <td
                          key={column.key}
                          style={stickyStyle}
                          className={cn(
                            tableCellVariants({ size, align: column.align }),
                            column.sticky && stickyBaseClass,
                            column.sticky === "left" && stickyShadowLeft,
                            column.sticky === "right" && stickyShadowRight,
                            isRowSelected(row) &&
                              column.sticky &&
                              "bg-primary/5",
                          )}
                        >
                          {column.render ? (
                            column.render(value as T[keyof T], row, rowIndex)
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              {String(value ?? "")}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div
          className={cn(
            tablePaginationVariants({
              variant: compact ? "compact" : "default",
            }),
          )}
        >
          <span className="text-sm text-muted-foreground">
            Page {pagination.page} of {totalPages}
          </span>
          <div className="flex items-center gap-x-1">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              aria-label="Previous page"
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.page >= totalPages}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              aria-label="Next page"
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Export with forwardRef workaround for generics
export const StickyTable = forwardRef(StickyTableInner) as <T>(
  props: StickyTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement;

(StickyTable as { displayName?: string }).displayName = "StickyTable";
