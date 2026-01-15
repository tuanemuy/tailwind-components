import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { Checkbox } from "@/components/atoms/Checkbox";
import {
  UploadIcon,
  DownloadIcon,
  FileIcon,
} from "@/lib/icons";
import type { ExportFormat } from "@/lib/types";

// Re-export for backward compatibility
export type { ExportFormat };

export interface ExportOption {
  format: ExportFormat;
  label: string;
  description?: string;
  available?: boolean;
}

export interface ImportExportCardProps extends React.HTMLAttributes<HTMLDivElement> {
  mode: "import" | "export" | "both";
  title?: string;
  description?: string;
  exportFormats?: ExportOption[];
  selectedFormats?: ExportFormat[];
  onFormatSelect?: (formats: ExportFormat[]) => void;
  onExport?: (formats: ExportFormat[]) => void;
  onImport?: (files: File[]) => void;
  isExporting?: boolean;
  isImporting?: boolean;
  exportProgress?: number;
  importProgress?: number;
  variant?: "default" | "compact" | "split";
}

const formatIcons: Record<ExportFormat, string> = {
  csv: "CSV",
  json: "JSON",
  xlsx: "XLSX",
  xml: "XML",
  pdf: "PDF",
};

export const ImportExportCard = forwardRef<HTMLDivElement, ImportExportCardProps>(
  (
    {
      className,
      mode = "both",
      title,
      description,
      exportFormats = [
        { format: "csv", label: "CSV", description: "Comma-separated values", available: true },
        { format: "json", label: "JSON", description: "JavaScript Object Notation", available: true },
        { format: "xlsx", label: "Excel", description: "Microsoft Excel format", available: true },
        { format: "xml", label: "XML", description: "Extensible Markup Language", available: true },
        { format: "pdf", label: "PDF", description: "Portable Document Format", available: false },
      ],
      selectedFormats = [],
      onFormatSelect,
      onExport,
      onImport,
      isExporting = false,
      isImporting = false,
      exportProgress = 0,
      importProgress = 0,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const [dragOver, setDragOver] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(true);
    };

    const handleDragLeave = () => {
      setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      onImport?.(files);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      onImport?.(files);
    };

    const toggleFormat = (format: ExportFormat) => {
      const newFormats = selectedFormats.includes(format)
        ? selectedFormats.filter((f) => f !== format)
        : [...selectedFormats, format];
      onFormatSelect?.(newFormats);
    };

    if (variant === "split") {
      return (
        <div
          ref={ref}
          className={cn("grid gap-4 md:grid-cols-2", className)}
          {...props}
        >
          {/* Import Section */}
          {(mode === "import" || mode === "both") && (
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-x-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <UploadIcon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Import Data</h3>
                  <p className="text-sm text-muted-foreground">Upload your files</p>
                </div>
              </div>

              <div
                className={cn(
                  "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors",
                  dragOver ? "border-primary bg-primary/5" : "border-border",
                  isImporting && "pointer-events-none opacity-60"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <UploadIcon className="mb-3 size-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag and drop files here, or
                </p>
                <label className="mt-2 cursor-pointer">
                  <span className="text-sm font-medium text-primary hover:underline">
                    browse files
                  </span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                    disabled={isImporting}
                  />
                </label>
              </div>

              {isImporting && (
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Importing...</span>
                    <span className="font-medium text-foreground">{importProgress}%</span>
                  </div>
                  <ProgressBar value={importProgress} size="sm" />
                </div>
              )}
            </div>
          )}

          {/* Export Section */}
          {(mode === "export" || mode === "both") && (
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-x-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <DownloadIcon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Export Data</h3>
                  <p className="text-sm text-muted-foreground">Choose format</p>
                </div>
              </div>

              <div className="space-y-2">
                {exportFormats.map((option) => (
                  <label
                    key={option.format}
                    className={cn(
                      "flex cursor-pointer items-center gap-x-3 rounded-lg border p-3 transition-colors",
                      selectedFormats.includes(option.format)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-border/80",
                      !option.available && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <Checkbox
                      checked={selectedFormats.includes(option.format)}
                      onChange={() => option.available && toggleFormat(option.format)}
                      disabled={!option.available}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{option.label}</p>
                      {option.description && (
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      )}
                    </div>
                    {!option.available && (
                      <Badge variant="secondary" size="sm">Pro</Badge>
                    )}
                  </label>
                ))}
              </div>

              {isExporting && (
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Exporting...</span>
                    <span className="font-medium text-foreground">{exportProgress}%</span>
                  </div>
                  <ProgressBar value={exportProgress} size="sm" />
                </div>
              )}

              <Button
                className="mt-4 w-full"
                onClick={() => onExport?.(selectedFormats)}
                disabled={selectedFormats.length === 0 || isExporting}
              >
                <DownloadIcon className="mr-2 size-4" />
                Export {selectedFormats.length > 0 && `(${selectedFormats.length})`}
              </Button>
            </div>
          )}
        </div>
      );
    }

    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn("rounded-xl border border-border bg-card p-4", className)}
          {...props}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <FileIcon className="size-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{title || "Data Management"}</h3>
                {description && (
                  <p className="text-sm text-muted-foreground">{description}</p>
                )}
              </div>
            </div>
            <div className="flex gap-x-2">
              {(mode === "import" || mode === "both") && (
                <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground">
                  <UploadIcon className="size-4" />
                  Import
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              )}
              {(mode === "export" || mode === "both") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onExport?.(selectedFormats)}
                >
                  <DownloadIcon className="mr-2 size-4" />
                  Export
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn("rounded-xl border border-border bg-card", className)}
        {...props}
      >
        {/* Header */}
        <div className="border-b border-border p-4">
          <h3 className="font-semibold text-foreground">
            {title || (mode === "import" ? "Import Data" : mode === "export" ? "Export Data" : "Import / Export")}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {/* Import Section */}
        {(mode === "import" || mode === "both") && (
          <div className="p-4">
            <h4 className="mb-3 flex items-center gap-x-2 text-sm font-medium text-foreground">
              <UploadIcon className="size-4" />
              Import
            </h4>
            <div
              className={cn(
                "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors",
                dragOver ? "border-primary bg-primary/5" : "border-border",
                isImporting && "pointer-events-none opacity-60"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <UploadIcon className="mb-3 size-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag and drop files here, or{" "}
                <label className="cursor-pointer text-primary hover:underline">
                  browse
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                    disabled={isImporting}
                  />
                </label>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Supports CSV, JSON, XLSX files
              </p>
            </div>

            {isImporting && (
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Importing...</span>
                  <span className="font-medium text-foreground">{importProgress}%</span>
                </div>
                <ProgressBar value={importProgress} size="sm" />
              </div>
            )}
          </div>
        )}

        {mode === "both" && <div className="border-t border-border" />}

        {/* Export Section */}
        {(mode === "export" || mode === "both") && (
          <div className="p-4">
            <h4 className="mb-3 flex items-center gap-x-2 text-sm font-medium text-foreground">
              <DownloadIcon className="size-4" />
              Export
            </h4>
            <div className="space-y-2">
              {exportFormats.map((option) => (
                <label
                  key={option.format}
                  className={cn(
                    "flex cursor-pointer items-center gap-x-3 rounded-lg border p-3 transition-colors",
                    selectedFormats.includes(option.format)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50",
                    !option.available && "cursor-not-allowed opacity-50"
                  )}
                >
                  <Checkbox
                    checked={selectedFormats.includes(option.format)}
                    onChange={() => option.available && toggleFormat(option.format)}
                    disabled={!option.available}
                  />
                  <div className="flex size-8 items-center justify-center rounded bg-muted text-xs font-semibold">
                    {formatIcons[option.format]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{option.label}</p>
                    {option.description && (
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    )}
                  </div>
                  {!option.available && (
                    <Badge variant="secondary" size="sm">Pro</Badge>
                  )}
                </label>
              ))}
            </div>

            {isExporting && (
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Exporting...</span>
                  <span className="font-medium text-foreground">{exportProgress}%</span>
                </div>
                <ProgressBar value={exportProgress} size="sm" />
              </div>
            )}

            <Button
              className="mt-4 w-full"
              onClick={() => onExport?.(selectedFormats)}
              disabled={selectedFormats.length === 0 || isExporting}
            >
              <DownloadIcon className="mr-2 size-4" />
              Export Selected
            </Button>
          </div>
        )}
      </div>
    );
  }
);
ImportExportCard.displayName = "ImportExportCard";
