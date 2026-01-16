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
import {
  tableContainerVariants,
  tableEmptyStateVariants,
  tableHeaderVariants,
  tableLoadingStateVariants,
  tablePaginationVariants,
  tableRowVariants,
} from "@/lib/variants";

// ============================================
// Column Types
// ============================================

export interface CompactTableColumn<T> {
  key: string;
  header: React.ReactNode;
  width?: string;
  minWidth?: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
  accessor?: keyof T | ((row: T) => unknown);
  /** Hide column in compact mode */
  hideInCompact?: boolean;
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
// CompactTable Props
// ============================================

export interface CompactTableProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  data: T[];
  columns: CompactTableColumn<T>[];
  getRowKey?: (row: T, index: number) => string | number;
  /** Density level - ultra is the most compact */
  density?: "normal" | "comfortable" | "compact" | "ultra";
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
  stickyHeader?: boolean;
  onRowClick?: (row: T, index: number) => void;
  /** Show borders between cells */
  gridLines?: boolean;
  /** Show row numbers */
  showRowNumbers?: boolean;
}

// ============================================
// Density Config
// ============================================

const densityConfig = {
  normal: {
    cellPadding: "px-4 py-3",
    headerPadding: "px-4 py-3",
    fontSize: "text-sm",
    checkboxSize: "size-4",
    rowHeight: "h-12",
  },
  comfortable: {
    cellPadding: "px-3 py-2.5",
    headerPadding: "px-3 py-2.5",
    fontSize: "text-sm",
    checkboxSize: "size-4",
    rowHeight: "h-11",
  },
  compact: {
    cellPadding: "px-2 py-1.5",
    headerPadding: "px-2 py-2",
    fontSize: "text-xs",
    checkboxSize: "size-3.5",
    rowHeight: "h-8",
  },
  ultra: {
    cellPadding: "px-1.5 py-1",
    headerPadding: "px-1.5 py-1.5",
    fontSize: "text-xs",
    checkboxSize: "size-3",
    rowHeight: "h-6",
  },
};

// ============================================
// CompactTable Component
// ============================================

function CompactTableInner<T>(
  {
    className,
    data,
    columns,
    getRowKey = (_, index) => index,
    density = "compact",
    selectable = false,
    selectedRows = [],
    onSelectionChange,
    sortable = false,
    sortState,
    onSort,
    pagination,
    emptyState,
    loading = false,
    striped = true,
    hoverable = true,
    bordered = true,
    stickyHeader = false,
    onRowClick,
    gridLines = false,
    showRowNumbers = false,
    ...props
  }: CompactTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const config = densityConfig[density];

  // Filter out columns hidden in compact mode
  const visibleColumns = columns.filter((col) => !col.hideInCompact);

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
  const getCellValue = (row: T, column: CompactTableColumn<T>) => {
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

  const totalColumns =
    visibleColumns.length + (selectable ? 1 : 0) + (showRowNumbers ? 1 : 0);

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {/* Table Container */}
      <div className={cn(tableContainerVariants({ bordered }))}>
        <div className="min-w-full inline-block align-middle">
          <table
            className={cn(
              "min-w-full divide-y divide-border",
              gridLines && "border-collapse",
            )}
          >
            {/* Header */}
            <thead
              className={cn(
                tableHeaderVariants({ sticky: stickyHeader }),
                "bg-muted/50",
              )}
            >
              <tr>
                {showRowNumbers && (
                  <th
                    scope="col"
                    className={cn(
                      config.headerPadding,
                      config.fontSize,
                      "w-10 text-center font-medium text-muted-foreground",
                      gridLines && "border-r border-border",
                    )}
                  >
                    #
                  </th>
                )}

                {selectable && (
                  <th
                    scope="col"
                    className={cn(
                      config.headerPadding,
                      "w-8",
                      gridLines && "border-r border-border",
                    )}
                  >
                    <Checkbox
                      checked={isAllSelected}
                      indeterminate={isIndeterminate}
                      onChange={handleSelectAll}
                      aria-label="Select all rows"
                      className={config.checkboxSize}
                    />
                  </th>
                )}

                {visibleColumns.map((column, index) => {
                  const isSortable = sortable || column.sortable;
                  const isSorted = sortState?.key === column.key;
                  const sortIcon = isSortable && isSorted && (
                    <span className="shrink-0">
                      {sortState?.direction === "asc" ? (
                        <ChevronUpIcon className="size-3" />
                      ) : sortState?.direction === "desc" ? (
                        <ChevronDownIcon className="size-3" />
                      ) : null}
                    </span>
                  );

                  return (
                    <th
                      key={column.key}
                      scope="col"
                      style={{ width: column.width, minWidth: column.minWidth }}
                      className={cn(
                        config.headerPadding,
                        config.fontSize,
                        "font-medium text-foreground whitespace-nowrap",
                        column.align === "center" && "text-center",
                        column.align === "end" && "text-end",
                        isSortable &&
                          "cursor-pointer select-none hover:text-primary",
                        gridLines &&
                          index < visibleColumns.length - 1 &&
                          "border-r border-border",
                      )}
                      onClick={
                        isSortable ? () => handleSort(column.key) : undefined
                      }
                    >
                      <div
                        className={cn(
                          "flex items-center gap-1",
                          column.align === "center" && "justify-center",
                          column.align === "end" && "justify-end",
                        )}
                      >
                        {column.header}
                        {sortIcon}
                      </div>
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
                    colSpan={totalColumns}
                    className={cn(
                      tableLoadingStateVariants({ variant: "spinner" }),
                      "py-4",
                    )}
                  >
                    <SpinnerIcon className="size-4 animate-spin text-muted-foreground" />
                    <span
                      className={cn(config.fontSize, "text-muted-foreground")}
                    >
                      Loading...
                    </span>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={totalColumns}
                    className={cn(tableEmptyStateVariants(), "py-4")}
                  >
                    {emptyState || (
                      <span
                        className={cn(config.fontSize, "text-muted-foreground")}
                      >
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
                      config.rowHeight,
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
                  >
                    {showRowNumbers && (
                      <td
                        className={cn(
                          config.cellPadding,
                          config.fontSize,
                          "w-10 text-center text-muted-foreground font-mono",
                          gridLines && "border-r border-border",
                        )}
                      >
                        {rowIndex + 1}
                      </td>
                    )}

                    {selectable && (
                      <td
                        className={cn(
                          config.cellPadding,
                          "w-8",
                          gridLines && "border-r border-border",
                        )}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={isRowSelected(row)}
                          onChange={() => handleSelectRow(row)}
                          aria-label={`Select row ${rowIndex + 1}`}
                          className={config.checkboxSize}
                        />
                      </td>
                    )}

                    {visibleColumns.map((column, colIndex) => {
                      const value = getCellValue(row, column);
                      return (
                        <td
                          key={column.key}
                          className={cn(
                            config.cellPadding,
                            config.fontSize,
                            "whitespace-nowrap",
                            column.align === "center" && "text-center",
                            column.align === "end" && "text-end",
                            gridLines &&
                              colIndex < visibleColumns.length - 1 &&
                              "border-r border-border",
                          )}
                        >
                          {column.render ? (
                            column.render(value as T[keyof T], row, rowIndex)
                          ) : (
                            <span className="text-muted-foreground">
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
            tablePaginationVariants({ variant: "compact" }),
            "py-2",
          )}
        >
          <span className={cn(config.fontSize, "text-muted-foreground")}>
            {pagination.page} / {totalPages}
          </span>
          <div className="flex items-center gap-x-0.5">
            <Button
              variant="ghost"
              size="sm"
              disabled={pagination.page <= 1}
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              aria-label="Previous page"
              className="size-6 p-0"
            >
              <ChevronLeftIcon className="size-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={pagination.page >= totalPages}
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              aria-label="Next page"
              className="size-6 p-0"
            >
              <ChevronRightIcon className="size-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Export with forwardRef workaround for generics
export const CompactTable = forwardRef(CompactTableInner) as <T>(
  props: CompactTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement;

(CompactTable as { displayName?: string }).displayName = "CompactTable";
