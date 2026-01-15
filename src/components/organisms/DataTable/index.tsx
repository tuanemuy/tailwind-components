"use client";

import { forwardRef, useCallback, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  tableContainerVariants,
  tableHeaderVariants,
  tableHeaderCellVariants,
  tableCellVariants,
  tableRowVariants,
  tableFilterBarVariants,
  tableToolbarVariants,
  tablePaginationVariants,
  tableEmptyStateVariants,
  tableLoadingStateVariants,
} from "@/lib/variants";
import { Checkbox, Button, Input, Badge } from "@/components/atoms";
import { Select } from "@/components/molecules";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  SpinnerIcon,
  SearchIcon,
  XIcon,
  FilterIcon,
  DownloadIcon,
} from "@/lib/icons";

// ============================================
// Column Types
// ============================================

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  width?: string;
  minWidth?: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
  filterable?: boolean;
  filterType?: "text" | "select" | "date" | "number";
  filterOptions?: Array<{ value: string; label: string }>;
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
// Filter Types
// ============================================

export interface FilterValue {
  column: string;
  value: string | string[] | { min?: string; max?: string };
  operator?: "eq" | "ne" | "gt" | "lt" | "gte" | "lte" | "contains" | "between";
}

export interface FilterState {
  search: string;
  filters: FilterValue[];
}

// ============================================
// Pagination Types
// ============================================

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface PaginationProps extends PaginationState {
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

// ============================================
// DataTable Props
// ============================================

export interface DataTableProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  data: T[];
  columns: DataTableColumn<T>[];

  // Selection
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (selectedRows: T[]) => void;
  getRowKey?: (row: T, index: number) => string | number;

  // Sorting
  sortable?: boolean;
  sortState?: SortState;
  onSort?: (sortState: SortState) => void;

  // Filtering
  filterable?: boolean;
  filterState?: FilterState;
  onFilterChange?: (filterState: FilterState) => void;
  searchPlaceholder?: string;

  // Pagination
  pagination?: PaginationProps;

  // Loading & Empty States
  emptyState?: React.ReactNode;
  loading?: boolean;

  // Appearance
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;

  // Actions
  onRowClick?: (row: T, index: number) => void;

  // Toolbar
  showToolbar?: boolean;
  toolbarVariant?: "default" | "floating" | "minimal";
  toolbarActions?: React.ReactNode;

  // Export
  onExport?: (format: "csv" | "json" | "xlsx") => void;
  exportFormats?: Array<"csv" | "json" | "xlsx">;

  // Bulk Actions
  bulkActions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: (selectedRows: T[]) => void;
    variant?: "default" | "destructive";
  }>;
}

// ============================================
// DataTable Component
// ============================================

function DataTableInner<T>(
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
    filterable = false,
    filterState = { search: "", filters: [] },
    onFilterChange,
    searchPlaceholder = "Search...",
    pagination,
    emptyState,
    loading = false,
    striped = false,
    hoverable = true,
    bordered = false,
    compact = false,
    stickyHeader = false,
    onRowClick,
    showToolbar = true,
    toolbarVariant = "default",
    toolbarActions,
    onExport,
    exportFormats = ["csv", "json"],
    bulkActions,
    ...props
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterValue[]>(filterState.filters);

  const size = compact ? "compact" : "default";

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

  // Filter logic
  const handleSearchChange = useCallback(
    (value: string) => {
      onFilterChange?.({ ...filterState, search: value });
    },
    [filterState, onFilterChange]
  );

  const handleFilterAdd = useCallback(
    (filter: FilterValue) => {
      const newFilters = [...activeFilters, filter];
      setActiveFilters(newFilters);
      onFilterChange?.({ ...filterState, filters: newFilters });
    },
    [activeFilters, filterState, onFilterChange]
  );

  const handleFilterRemove = useCallback(
    (index: number) => {
      const newFilters = activeFilters.filter((_, i) => i !== index);
      setActiveFilters(newFilters);
      onFilterChange?.({ ...filterState, filters: newFilters });
    },
    [activeFilters, filterState, onFilterChange]
  );

  const handleClearFilters = useCallback(() => {
    setActiveFilters([]);
    onFilterChange?.({ search: "", filters: [] });
  }, [onFilterChange]);

  // Get cell value
  const getCellValue = (row: T, column: DataTableColumn<T>) => {
    if (column.accessor) {
      if (typeof column.accessor === "function") {
        return column.accessor(row);
      }
      return row[column.accessor];
    }
    return (row as Record<string, unknown>)[column.key];
  };

  // Filterable columns
  const filterableColumns = useMemo(
    () => columns.filter((col) => col.filterable),
    [columns]
  );

  // Pagination
  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 0;

  const hasActiveFilters = filterState.search || activeFilters.length > 0;

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {/* Toolbar */}
      {showToolbar && (
        <div className={cn(tableToolbarVariants({ variant: toolbarVariant }))}>
          <div className="flex items-center gap-3">
            {/* Search */}
            {filterable && (
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={filterState.search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9 w-64"
                />
                {filterState.search && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <XIcon className="size-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
            )}

            {/* Filter Toggle */}
            {filterable && filterableColumns.length > 0 && (
              <Button
                variant={showFilterBar ? "secondary" : "outline"}
                size="sm"
                onClick={() => setShowFilterBar(!showFilterBar)}
              >
                <FilterIcon className="size-4 mr-2" />
                Filters
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" size="sm" className="ml-2">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            )}

            {/* Bulk Actions */}
            {selectable && selectedRows.length > 0 && bulkActions && (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
                <span className="text-sm text-muted-foreground">
                  {selectedRows.length} selected
                </span>
                {bulkActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant === "destructive" ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => action.onClick(selectedRows)}
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                Clear filters
              </Button>
            )}

            {/* Export */}
            {onExport && (
              <Select
                value=""
                onValueChange={(value) => onExport(value as "csv" | "json" | "xlsx")}
                placeholder={
                  <span className="flex items-center gap-2">
                    <DownloadIcon className="size-4" />
                    Export
                  </span>
                }
                options={exportFormats.map((format) => ({
                  value: format,
                  label: format.toUpperCase(),
                }))}
                className="w-32"
              />
            )}

            {/* Custom Actions */}
            {toolbarActions}
          </div>
        </div>
      )}

      {/* Filter Bar */}
      {showFilterBar && (
        <div className={cn(tableFilterBarVariants({ position: "top" }))}>
          {filterableColumns.map((column) => (
            <div key={column.key} className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                {column.header}
              </span>
              {column.filterType === "select" && column.filterOptions ? (
                <Select
                  value=""
                  onValueChange={(value) =>
                    handleFilterAdd({ column: column.key, value, operator: "eq" })
                  }
                  placeholder="Select..."
                  options={column.filterOptions}
                  className="w-40"
                />
              ) : (
                <Input
                  type={column.filterType === "number" ? "number" : "text"}
                  placeholder={`Filter ${column.header}...`}
                  className="w-40"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const target = e.target as HTMLInputElement;
                      if (target.value) {
                        handleFilterAdd({
                          column: column.key,
                          value: target.value,
                          operator: "contains",
                        });
                        target.value = "";
                      }
                    }
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 px-4 py-2 border-b border-border">
          {activeFilters.map((filter, index) => {
            const column = columns.find((col) => col.key === filter.column);
            return (
              <Badge key={index} variant="secondary" className="gap-1">
                <span className="font-medium">{column?.header}:</span>
                <span>{String(filter.value)}</span>
                <button
                  type="button"
                  onClick={() => handleFilterRemove(index)}
                  className="ml-1 hover:text-foreground"
                >
                  <XIcon className="size-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}

      {/* Table Container */}
      <div className={cn(tableContainerVariants({ bordered }))}>
        <div className="min-w-full inline-block align-middle">
          <table className="min-w-full divide-y divide-border">
            {/* Header */}
            <thead className={cn(tableHeaderVariants({ sticky: stickyHeader }))}>
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
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className={cn(tableLoadingStateVariants({ variant: "spinner" }))}
                  >
                    <SpinnerIcon className="size-5 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Loading...</span>
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
                    className={cn(
                      tableRowVariants({
                        hoverable,
                        clickable: !!onRowClick,
                        selected: isRowSelected(row),
                        striped,
                      })
                    )}
                    onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                  >
                    {selectable && (
                      <td
                        className="w-px whitespace-nowrap ps-4 py-3"
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 0 && (
        <div className={cn(tablePaginationVariants({ variant: compact ? "compact" : "default" }))}>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
              {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{" "}
              {pagination.total} results
            </span>
            {pagination.onPageSizeChange && pagination.pageSizeOptions && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Show</span>
                <Select
                  value={String(pagination.pageSize)}
                  onValueChange={(value) => pagination.onPageSizeChange?.(Number(value))}
                  options={pagination.pageSizeOptions.map((size) => ({
                    value: String(size),
                    label: String(size),
                  }))}
                  className="w-20"
                />
              </div>
            )}
          </div>
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
            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (pagination.page <= 3) {
                pageNum = i + 1;
              } else if (pagination.page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = pagination.page - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === pagination.page ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => pagination.onPageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
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
export const DataTable = forwardRef(DataTableInner) as <T>(
  props: DataTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => React.ReactElement;

(DataTable as { displayName?: string }).displayName = "DataTable";
