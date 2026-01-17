import { forwardRef, type ReactNode, useRef, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import {
  type DateRange,
  DateRangePicker,
} from "@/components/molecules/DateRangePicker";
import { Select, type SelectOption } from "@/components/molecules/Select";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/organisms/Layout/Modal";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  DownloadIcon,
  FileIcon,
  UploadIcon,
  XIcon,
} from "@/components/icons";
import type { ExportFormat } from "@/components/types";
import { cn } from "@/components/utils";

// Re-export for backward compatibility
export type { ExportFormat };

export interface ExportColumn {
  id: string;
  label: string;
  required?: boolean;
}

export interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (data: {
    format: ExportFormat;
    columns: string[];
    dateRange?: DateRange;
  }) => void;
  title?: string;
  subtitle?: ReactNode;
  formats?: ExportFormat[];
  columns?: ExportColumn[];
  showDateRange?: boolean;
  defaultFormat?: ExportFormat;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  progress?: number;
  className?: string;
}

const formatOptions: Record<
  ExportFormat,
  { label: string; description: string }
> = {
  csv: { label: "CSV", description: "Comma-separated values" },
  xlsx: { label: "Excel", description: "Microsoft Excel spreadsheet" },
  json: { label: "JSON", description: "JavaScript Object Notation" },
  xml: { label: "XML", description: "Extensible Markup Language" },
  pdf: { label: "PDF", description: "Portable Document Format" },
};

export const ExportModal = forwardRef<HTMLDivElement, ExportModalProps>(
  (
    {
      isOpen,
      onClose,
      onExport,
      title = "Export data",
      subtitle,
      formats = ["csv", "xlsx", "json"],
      columns = [],
      showDateRange = true,
      defaultFormat = "csv",
      submitText = "Export",
      cancelText = "Cancel",
      loading,
      progress,
      className,
    },
    ref,
  ) => {
    const [format, setFormat] = useState<ExportFormat>(defaultFormat);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(
      columns.map((c) => c.id),
    );
    const [dateRange, setDateRange] = useState<DateRange | undefined>({});

    const toggleColumn = (columnId: string) => {
      setSelectedColumns((prev) =>
        prev.includes(columnId)
          ? prev.filter((id) => id !== columnId)
          : [...prev, columnId],
      );
    };

    const selectAllColumns = () => {
      setSelectedColumns(columns.map((c) => c.id));
    };

    const deselectAllColumns = () => {
      setSelectedColumns(columns.filter((c) => c.required).map((c) => c.id));
    };

    const handleSubmit = () => {
      onExport({
        format,
        columns: selectedColumns,
        dateRange: showDateRange ? dateRange : undefined,
      });
    };

    const handleClose = () => {
      setFormat(defaultFormat);
      setSelectedColumns(columns.map((c) => c.id));
      setDateRange({});
      onClose();
    };

    const formatSelectOptions: SelectOption[] = formats.map((f) => ({
      value: f,
      label: formatOptions[f].label,
    }));

    const isExporting = loading && progress !== undefined;

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        size="md"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={
            <span className="flex items-center gap-2">
              <DownloadIcon className="size-5" />
              {title}
            </span>
          }
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          {isExporting ? (
            <div className="space-y-4 py-8 text-center">
              <div className="mx-auto size-12 animate-pulse rounded-full bg-primary/10 p-3">
                <DownloadIcon className="size-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Exporting data...</p>
                <p className="text-sm text-muted-foreground">
                  Please wait while we prepare your file
                </p>
              </div>
              <ProgressBar
                value={progress}
                size="md"
                className="mx-auto max-w-xs"
              />
              <p className="text-sm text-muted-foreground">
                {progress}% complete
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Format selection */}
              <div>
                <span className="mb-2 block text-sm font-medium text-foreground">
                  Export format
                </span>
                <Select
                  value={format}
                  onChange={(value) => setFormat(value as ExportFormat)}
                  options={formatSelectOptions}
                  disabled={loading}
                />
                <p className="mt-2 text-xs text-muted-foreground">
                  {formatOptions[format].description}
                </p>
              </div>

              {/* Date range */}
              {showDateRange && (
                <div>
                  <span className="mb-2 block text-sm font-medium text-foreground">
                    Date range (optional)
                  </span>
                  <DateRangePicker
                    value={dateRange}
                    onChange={setDateRange}
                    disabled={loading}
                  />
                </div>
              )}

              {/* Column selection */}
              {columns.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="block text-sm font-medium text-foreground">
                      Columns to include
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={selectAllColumns}
                        disabled={loading}
                      >
                        Select all
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={deselectAllColumns}
                        disabled={loading}
                      >
                        Deselect all
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border border-border p-3">
                    {columns.map((column) => {
                      const isSelected = selectedColumns.includes(column.id);
                      return (
                        <label
                          key={column.id}
                          htmlFor={`export-column-${column.id}`}
                          className="flex cursor-pointer items-center gap-3"
                        >
                          <Checkbox
                            id={`export-column-${column.id}`}
                            checked={isSelected}
                            onChange={() => toggleColumn(column.id)}
                            disabled={loading || column.required}
                          />
                          <span className="text-sm text-foreground">
                            {column.label}
                          </span>
                          {column.required && (
                            <Badge soft className="text-xs">
                              Required
                            </Badge>
                          )}
                        </label>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {selectedColumns.length} of {columns.length} columns
                    selected
                  </p>
                </div>
              )}
            </div>
          )}
        </ModalBody>

        {!isExporting && (
          <ModalFooter>
            <Button variant="outline" onClick={handleClose} disabled={loading}>
              {cancelText}
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              loading={loading}
              disabled={columns.length > 0 && selectedColumns.length === 0}
            >
              <DownloadIcon className="size-4" />
              {submitText}
            </Button>
          </ModalFooter>
        )}
      </Modal>
    );
  },
);
ExportModal.displayName = "ExportModal";

// ImportModal
export interface ImportError {
  row?: number;
  message: string;
}

export interface ImportResult {
  success: number;
  failed: number;
  errors: ImportError[];
}

export interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
  title?: string;
  subtitle?: ReactNode;
  acceptedFormats?: string[];
  maxFileSize?: number; // in bytes
  templateUrl?: string;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  progress?: number;
  result?: ImportResult;
  className?: string;
}

export const ImportModal = forwardRef<HTMLDivElement, ImportModalProps>(
  (
    {
      isOpen,
      onClose,
      onImport,
      title = "Import data",
      subtitle,
      acceptedFormats = [".csv", ".xlsx"],
      maxFileSize = 10 * 1024 * 1024, // 10MB
      templateUrl,
      submitText = "Import",
      cancelText = "Cancel",
      loading,
      progress,
      result,
      className,
    },
    ref,
  ) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const validateFile = (selectedFile: File): boolean => {
      setError(null);

      // Check file size
      if (selectedFile.size > maxFileSize) {
        setError(
          `File size must be less than ${Math.round(maxFileSize / 1024 / 1024)}MB`,
        );
        return false;
      }

      // Check file type
      const extension = `.${selectedFile.name.split(".").pop()?.toLowerCase()}`;
      if (!acceptedFormats.includes(extension)) {
        setError(
          `Invalid file type. Accepted formats: ${acceptedFormats.join(", ")}`,
        );
        return false;
      }

      return true;
    };

    const handleFileSelect = (selectedFile: File) => {
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileSelect(droppedFile);
      }
    };

    const handleSubmit = () => {
      if (file) {
        onImport(file);
      }
    };

    const handleClose = () => {
      setFile(null);
      setError(null);
      onClose();
    };

    const isImporting = loading && progress !== undefined;
    const hasResult = result !== undefined;

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        size="md"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={
            <span className="flex items-center gap-2">
              <UploadIcon className="size-5" />
              {title}
            </span>
          }
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          {isImporting ? (
            <div className="space-y-4 py-8 text-center">
              <div className="mx-auto size-12 animate-pulse rounded-full bg-primary/10 p-3">
                <UploadIcon className="size-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Importing data...</p>
                <p className="text-sm text-muted-foreground">
                  Please wait while we process your file
                </p>
              </div>
              <ProgressBar
                value={progress}
                size="md"
                className="mx-auto max-w-xs"
              />
              <p className="text-sm text-muted-foreground">
                {progress}% complete
              </p>
            </div>
          ) : hasResult ? (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-center gap-2">
                {result.failed === 0 ? (
                  <CheckCircleIcon className="size-8 text-success" />
                ) : (
                  <AlertCircleIcon className="size-8 text-warning" />
                )}
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">Import complete</p>
                <p className="text-sm text-muted-foreground">
                  {result.success} records imported successfully
                  {result.failed > 0 && `, ${result.failed} failed`}
                </p>
              </div>

              {result.errors.length > 0 && (
                <div className="max-h-40 overflow-y-auto rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                  <p className="mb-2 text-sm font-medium text-destructive">
                    Errors:
                  </p>
                  <ul className="space-y-1 text-xs text-destructive">
                    {result.errors.slice(0, 10).map((err) => (
                      <li key={`${err.row || "general"}-${err.message}`}>
                        {err.row ? `Row ${err.row}: ` : ""}
                        {err.message}
                      </li>
                    ))}
                    {result.errors.length > 10 && (
                      <li>...and {result.errors.length - 10} more errors</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Drop zone */}
              <section
                aria-label="File drop zone"
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={cn(
                  "cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : file
                      ? "border-success bg-success/5"
                      : "border-border hover:border-muted-foreground/50 hover:bg-muted/50",
                )}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept={acceptedFormats.join(",")}
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      handleFileSelect(selectedFile);
                    }
                  }}
                  className="hidden"
                />

                {file ? (
                  <div className="space-y-2">
                    <FileIcon className="mx-auto size-10 text-success" />
                    <div>
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                    >
                      <XIcon className="size-4" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="w-full space-y-2"
                    onClick={() => inputRef.current?.click()}
                  >
                    <UploadIcon className="mx-auto size-10 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">
                        Drop file here or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {acceptedFormats.join(", ")} files up to{" "}
                        {Math.round(maxFileSize / 1024 / 1024)}MB
                      </p>
                    </div>
                  </button>
                )}
              </section>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                  <AlertCircleIcon className="size-4 shrink-0 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Template download */}
              {templateUrl && (
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-3">
                  <span className="text-sm text-muted-foreground">
                    Need a template?
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(templateUrl, "_blank")}
                  >
                    <DownloadIcon className="size-4" />
                    Download template
                  </Button>
                </div>
              )}
            </div>
          )}
        </ModalBody>

        {!isImporting && (
          <ModalFooter>
            <Button variant="outline" onClick={handleClose} disabled={loading}>
              {hasResult ? "Close" : cancelText}
            </Button>
            {!hasResult && (
              <Button
                variant="primary"
                onClick={handleSubmit}
                loading={loading}
                disabled={!file}
              >
                <UploadIcon className="size-4" />
                {submitText}
              </Button>
            )}
          </ModalFooter>
        )}
      </Modal>
    );
  },
);
ImportModal.displayName = "ImportModal";
