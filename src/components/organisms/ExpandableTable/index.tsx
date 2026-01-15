"use client";

import { forwardRef, useCallback, useState, Fragment } from "react";
import { cn } from "@/lib/utils";
import {
  tableContainerVariants,
  tableHeaderVariants,
  tableHeaderCellVariants,
  tableCellVariants,
  expandableRowVariants,
  expandedContentVariants,
  tablePaginationVariants,
  tableEmptyStateVariants,
  tableLoadingStateVariants,
} from "@/lib/variants";
import { Checkbox, Button } from "@/components/atoms";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  SpinnerIcon,
} from "@/lib/icons";

// ============================================
// Column Types
// ============================================

export interface ExpandableTableColumn<T> {
  key: string;
  header: React.ReactNode;
  width?: string;
  minWidth?: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
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
// ExpandableTable Props
// ============================================

export interface ExpandableTableProps<T>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  data: T[];
  columns: ExpandableTableColumn<T>[];
  renderExpandedRow: (row: T, index: number) => React.ReactNode;
  getRowKey?: (row: T, index: number) => string | number;
  expandedRows?: (string | number)[];
  onExpandedRowsChange?: (expandedRows: (string | number)[]) => void;
  allowMultipleExpanded?: boolean;
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
  stickyHeader?: boolean;
}

// ============================================
// ExpandableTable Component
// ============================================

function ExpandableTableInner<T>(
  {
    className,
    data,
    columns,
    renderExpandedRow,
    getRowKey = (_, index) => index,
    expandedRows: controlledExpandedRows,
    onExpandedRowsChange,
    allowMultipleExpanded = true,
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
    stickyHeader = false,
    ...props
  }: ExpandableTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [uncontrolledExpandedRows, setUncontrolledExpandedRows] = useState<
    (string | number)[]
  >([]);

  const expandedRows = controlledExpandedRows ?? uncontrolledExpandedRows;
  const setExpandedRows = onExpandedRowsChange ?? setUncontrolledExpandedRows;

  const size = compact ? "compact" : "default";

  // Expand/Collapse logic
  const isRowExpanded = useCallback(
    (row: T, index: number) => {
      const rowKey = getRowKey(row, index);
      return expandedRows.includes(rowKey);
    },
    [expandedRows, getRowKey]
  );

  const toggleRowExpanded = useCallback(
    (row: T, index: number) => {
      const rowKey = getRowKey(row, index);
      if (expandedRows.includes(rowKey)) {
        setExpandedRows(expandedRows.filter((k) => k !== rowKey));
      } else {
        if (allowMultipleExpanded) {
          setExpandedRows([...expandedRows, rowKey]);
        } else {
          setExpandedRows([rowKey]);
        }
      }
    },
    [expandedRows, getRowKey, setExpandedRows, allowMultipleExpanded]
  );

  // Selection logic
  const isRowSelected = useCallback(
    (row: T) => selectedRows.includes(row),
    [selectedRows]
  );

  const isAllSelected = data.length > 0 && selectedRows.length === data.length;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < data.length;

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
    [isRowSelected, selectedRows, onSelectionChange]
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
    [sortState, onSort]
  );

  // Get cell value
  const getCellValue = (row: T, column: ExpandableTableColumn<T>) => {
    if (column.accessor) {
      if (typeof column.accessor === "function") {
        return column.accessor(row);
      }
      return row[column.accessor];
    }
    return (row as Record<string, unknown>)[column.key];
  };

  // Pagination
  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 0;

  const totalColumns = columns.length + 1 + (selectable ? 1 : 0); // +1 for expand button

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {/* Table Container */}
      <div className={cn(tableContainerVariants({ bordered }))}>
        <div className="min-w-full inline-block align-middle">
          <table className="min-w-full divide-y divide-border">
            {/* Header */}
            <thead className={cn(tableHeaderVariants({ sticky: stickyHeader }))}>
              <tr>
                {/* Expand Column */}
                <th scope="col" className="w-10 ps-4 py-3" />

                {selectable && (
                  <th scope="col" className="w-px py-3">
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

                  return (
                    <th
                      key={column.key}
                      scope="col"
                      style={{ width: column.width, minWidth: column.minWidth }}
                      className={cn(
                        tableHeaderCellVariants({
                          size,
                          align: column.align,
                          sortable: isSortable,
                        })
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
                    colSpan={totalColumns}
                    className={cn(tableLoadingStateVariants({ variant: "spinner" }))}
                  >
                    <SpinnerIcon className="size-5 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Loading...</span>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={totalColumns}
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
                data.map((row, rowIndex) => {
                  const isExpanded = isRowExpanded(row, rowIndex);
                  const rowKey = getRowKey(row, rowIndex);
                  return (
                    <Fragment key={rowKey}>
                      <tr
                        className={cn(
                          expandableRowVariants({ expanded: isExpanded }),
                          striped && rowIndex % 2 === 1 && "bg-muted/50",
                          hoverable && "hover:bg-accent/50 transition-colors",
                          isRowSelected(row) && "bg-primary/5"
                        )}
                      >
                        {/* Expand Button */}
                        <td className="w-10 ps-4 py-3">
                          <button
                            type="button"
                            onClick={() => toggleRowExpanded(row, rowIndex)}
                            className="size-6 flex items-center justify-center rounded hover:bg-muted transition-colors"
                            aria-label={isExpanded ? "Collapse row" : "Expand row"}
                          >
                            <ChevronDownIcon
                              className={cn(
                                "size-4 text-muted-foreground transition-transform",
                                isExpanded && "rotate-180"
                              )}
                            />
                          </button>
                        </td>

                        {selectable && (
                          <td
                            className="w-px whitespace-nowrap py-3"
                            onClick={(e) => e.stopPropagation()}
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
                                tableCellVariants({ size, align: column.align })
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

                      {/* Expanded Content */}
                      <tr>
                        <td
                          colSpan={totalColumns}
                          className={cn(
                            "p-0 bg-muted/30",
                            expandedContentVariants({ expanded: isExpanded })
                          )}
                        >
                          {isExpanded && (
                            <div className="px-6 py-4">
                              {renderExpandedRow(row, rowIndex)}
                            </div>
                          )}
                        </td>
                      </tr>
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div
          className={cn(
            tablePaginationVariants({ variant: compact ? "compact" : "default" })
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
export const ExpandableTable = forwardRef(ExpandableTableInner) as <T>(
  props: ExpandableTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

(ExpandableTable as { displayName?: string }).displayName = "ExpandableTable";
