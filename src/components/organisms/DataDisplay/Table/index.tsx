"use client";

import { forwardRef, useCallback } from "react";
import { Button, Checkbox } from "@/components/atoms";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  SpinnerIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

// Column definition
export interface TableColumn<T> {
  key: string;
  header: React.ReactNode;
  width?: string;
  minWidth?: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
  accessor?: keyof T | ((row: T) => unknown);
}

// Sort state
export type SortDirection = "asc" | "desc" | null;

export interface SortState {
  key: string;
  direction: SortDirection;
}

// Pagination
export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

// Main Table props
export interface TableProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  data: T[];
  columns: TableColumn<T>[];
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (selectedRows: T[]) => void;
  getRowKey?: (row: T, index: number) => string | number;
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
  stickyHeader?: boolean;
  onRowClick?: (row: T, index: number) => void;
}

const alignClasses = {
  start: "text-start",
  center: "text-center",
  end: "text-end",
};

// Generic Table component
function TableInner<T>(
  {
    className,
    data,
    columns,
    selectable = false,
    selectedRows = [],
    onSelectionChange,
    getRowKey = (_, index) => index,
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
    stickyHeader = false,
    onRowClick,
    ...props
  }: TableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
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
  const getCellValue = (row: T, column: TableColumn<T>) => {
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

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {/* Scrollable table container */}
      <div
        className={cn(
          "overflow-x-auto",
          "[&::-webkit-scrollbar]:h-2",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "[&::-webkit-scrollbar-track]:bg-muted/50",
          "[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30",
        )}
      >
        <div className="min-w-full inline-block align-middle">
          <table
            className={cn(
              "min-w-full divide-y divide-border",
              bordered && "border border-border rounded-lg",
            )}
          >
            {/* Header */}
            <thead className={cn(stickyHeader && "sticky top-0 z-10 bg-card")}>
              <tr>
                {selectable && (
                  <th scope="col" className="w-px ps-4 py-3">
                    <Checkbox
                      checked={isAllSelected}
                      indeterminate={isIndeterminate}
                      onChange={handleSelectAll}
                      aria-label="Select all rows"
                    />
                  </th>
                )}
                {columns.map((column) => {
                  const isSortable = sortable || column.sortable;
                  const sortIcon = isSortable &&
                    sortState?.key === column.key && (
                      <span className="shrink-0">
                        {sortState.direction === "asc" ? (
                          <ChevronUpIcon className="size-4" />
                        ) : sortState.direction === "desc" ? (
                          <ChevronDownIcon className="size-4" />
                        ) : null}
                      </span>
                    );

                  return (
                    <th
                      key={column.key}
                      scope="col"
                      style={{ width: column.width, minWidth: column.minWidth }}
                      className={cn(
                        compact ? "py-2" : "py-3",
                        "px-4 first:ps-4 last:pe-4",
                      )}
                    >
                      {isSortable ? (
                        <button
                          type="button"
                          className={cn(
                            "flex items-center gap-x-1 text-sm font-medium text-foreground",
                            "cursor-pointer select-none hover:text-primary",
                            alignClasses[column.align || "start"],
                          )}
                          onClick={() => handleSort(column.key)}
                        >
                          {column.header}
                          {sortIcon}
                        </button>
                      ) : (
                        <div
                          className={cn(
                            "flex items-center gap-x-1 text-sm font-medium text-foreground",
                            alignClasses[column.align || "start"],
                          )}
                        >
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
                    className="px-4 py-8 text-center"
                  >
                    <div className="flex items-center justify-center gap-x-2">
                      <SpinnerIcon className="size-5 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Loading...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="px-4 py-8 text-center"
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
                    className={cn(
                      striped && rowIndex % 2 === 1 && "bg-muted/50",
                      hoverable && "hover:bg-accent/50 transition-colors",
                      onRowClick && "cursor-pointer",
                      isRowSelected(row) && "bg-primary/5",
                    )}
                    onClick={
                      onRowClick ? () => onRowClick(row, rowIndex) : undefined
                    }
                  >
                    {selectable && (
                      <td
                        className="w-px whitespace-nowrap ps-4 py-3"
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
                    {columns.map((column) => {
                      const value = getCellValue(row, column);
                      return (
                        <td
                          key={column.key}
                          className={cn(
                            "whitespace-nowrap",
                            compact ? "py-2" : "py-3",
                            "px-4 first:ps-4 last:pe-4",
                            alignClasses[column.align || "start"],
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
        <div className="flex items-center justify-between gap-x-4 border-t border-border px-4 py-3">
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
export const Table = forwardRef(TableInner) as <T>(
  props: TableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement;

(Table as { displayName?: string }).displayName = "Table";
