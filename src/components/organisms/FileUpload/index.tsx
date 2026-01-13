"use client";

import {
  forwardRef,
  useState,
  useCallback,
  useRef,
  useId,
  type DragEvent,
  type ChangeEvent,
} from "react";
import { cn } from "@/lib/utils";
import { Button, ProgressBar } from "@/components/atoms";
import { FileItem } from "@/components/molecules";
import {
  UploadCloudIcon,
  ImageIcon,
  FileIcon,
  XIcon,
  AlertCircleIcon,
} from "@/lib/icons";
import type { FileType } from "@/lib/types";

// Helper function to determine file type
const getFileType = (file: File): FileType => {
  if (file.type.startsWith("image/")) return "image";
  if (
    file.type.includes("document") ||
    file.type.includes("pdf") ||
    file.type.includes("text") ||
    file.type.includes("word") ||
    file.type.includes("spreadsheet") ||
    file.type.includes("excel")
  )
    return "document";
  if (file.type.startsWith("video/")) return "video";
  if (file.type.startsWith("audio/")) return "audio";
  if (file.type.includes("zip") || file.type.includes("rar") || file.type.includes("tar"))
    return "archive";
  return "other";
};

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Variant types
type FileUploadVariant = "default" | "card" | "compact" | "image";

// File upload item interface
export interface UploadFile {
  id: string;
  file: File;
  progress?: number;
  status: "pending" | "uploading" | "complete" | "error";
  error?: string;
  preview?: string;
}

// Main FileUpload component
export interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  variant?: FileUploadVariant;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  disabled?: boolean;
  error?: string;
  files?: UploadFile[];
  showFileList?: boolean;
  dropzoneText?: string;
  browseText?: string;
  hintText?: string;
  onChange?: (files: File[]) => void;
  onRemove?: (file: UploadFile) => void;
}

const fileUploadVariants: Record<FileUploadVariant, string> = {
  default: "",
  card: "rounded-xl border border-border bg-card overflow-hidden",
  compact: "",
  image: "",
};

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      variant = "default",
      accept,
      multiple = true,
      maxSize,
      maxFiles,
      disabled,
      error,
      files = [],
      showFileList = true,
      dropzoneText = "Drop your files here or",
      browseText = "browse",
      hintText,
      onChange,
      onRemove,
      ...props
    },
    ref,
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useId();

    const displayError = error || localError;

    const validateFiles = useCallback(
      (newFiles: File[]): File[] => {
        setLocalError(null);

        // Check max files
        if (maxFiles && files.length + newFiles.length > maxFiles) {
          setLocalError(`Maximum ${maxFiles} files allowed`);
          return [];
        }

        // Filter and validate files
        const validFiles: File[] = [];
        for (const file of newFiles) {
          // Check max size
          if (maxSize && file.size > maxSize) {
            setLocalError(`File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`);
            continue;
          }
          validFiles.push(file);
        }

        return validFiles;
      },
      [files.length, maxFiles, maxSize],
    );

    const handleFiles = useCallback(
      (newFiles: File[]) => {
        if (disabled) return;
        const validFiles = validateFiles(newFiles);
        if (validFiles.length > 0) {
          onChange?.(validFiles);
        }
      },
      [disabled, validateFiles, onChange],
    );

    const handleDragEnter = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragging(true);
        }
      },
      [disabled],
    );

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
      },
      [handleFiles],
    );

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        handleFiles(selectedFiles);
        // Reset input
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
      [handleFiles],
    );

    const handleBrowseClick = useCallback(() => {
      inputRef.current?.click();
    }, []);

    // Render image upload variant
    if (variant === "image") {
      return (
        <div ref={ref} className={cn("space-y-4", className)} {...props}>
          <div
            className={cn(
              "relative rounded-xl border-2 border-dashed transition-colors",
              isDragging
                ? "border-primary bg-primary/5"
                : displayError
                  ? "border-destructive bg-destructive/5"
                  : "border-border hover:border-muted-foreground/50",
              disabled && "opacity-50 cursor-not-allowed",
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              id={id}
              type="file"
              accept={accept || "image/*"}
              multiple={multiple}
              disabled={disabled}
              onChange={handleChange}
              className="sr-only"
            />

            {files.length > 0 && files[0].preview ? (
              <div className="relative aspect-video">
                <img
                  src={files[0].preview}
                  alt="Preview"
                  className="size-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={() => onRemove?.(files[0])}
                >
                  <XIcon className="size-4" />
                </button>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center p-8 cursor-pointer"
                onClick={handleBrowseClick}
              >
                <ImageIcon className="size-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-1">{dropzoneText}</p>
                <p className="text-sm font-medium text-primary">{browseText}</p>
                {hintText && <p className="mt-2 text-xs text-muted-foreground">{hintText}</p>}
              </div>
            )}
          </div>
          {displayError && (
            <p className="flex items-center gap-x-1.5 text-sm text-destructive">
              <AlertCircleIcon className="size-4" />
              {displayError}
            </p>
          )}
        </div>
      );
    }

    // Render compact variant
    if (variant === "compact") {
      return (
        <div ref={ref} className={cn("space-y-2", className)} {...props}>
          <div className="flex items-center gap-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleBrowseClick}
              disabled={disabled}
            >
              Choose files
            </Button>
            <span className="text-sm text-muted-foreground">
              {files.length > 0
                ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
                : "No files chosen"}
            </span>
          </div>
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handleChange}
            className="sr-only"
          />
          {hintText && <p className="text-xs text-muted-foreground">{hintText}</p>}
          {displayError && (
            <p className="flex items-center gap-x-1.5 text-sm text-destructive">
              <AlertCircleIcon className="size-4" />
              {displayError}
            </p>
          )}
          {showFileList && files.length > 0 && (
            <div className="space-y-2">
              {files.map((file) => (
                <FileItem
                  key={file.id}
                  name={file.file.name}
                  fileType={getFileType(file.file)}
                  size={formatFileSize(file.file.size)}
                  status={file.status}
                  progress={file.progress}
                  actions={
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove?.(file)}
                    >
                      <XIcon className="size-4" />
                    </Button>
                  }
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    // Default and card variants
    return (
      <div
        ref={ref}
        className={cn(fileUploadVariants[variant], className)}
        {...props}
      >
        {/* Dropzone */}
        <div
          className={cn(
            "relative p-8 flex flex-col items-center justify-center text-center rounded-xl border-2 border-dashed transition-colors",
            variant === "card" && "rounded-none border-0 border-b",
            isDragging
              ? "border-primary bg-primary/5"
              : displayError
                ? "border-destructive bg-destructive/5"
                : "border-border bg-background hover:border-muted-foreground/50",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handleChange}
            className="sr-only"
          />

          {/* Upload Icon */}
          <div className="mb-4">
            <UploadCloudIcon className="size-12 text-muted-foreground" />
          </div>

          {/* Text */}
          <div className="text-sm text-muted-foreground">
            <span>{dropzoneText}</span>{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:text-primary/80 focus:outline-none focus:underline"
              onClick={handleBrowseClick}
              disabled={disabled}
            >
              {browseText}
            </button>
          </div>

          {/* Hint */}
          {hintText && (
            <p className="mt-2 text-xs text-muted-foreground">{hintText}</p>
          )}
        </div>

        {/* Error */}
        {displayError && (
          <p className="p-4 flex items-center gap-x-1.5 text-sm text-destructive">
            <AlertCircleIcon className="size-4" />
            {displayError}
          </p>
        )}

        {/* File List */}
        {showFileList && files.length > 0 && (
          <div className={cn("p-4 space-y-2", variant === "card" && "bg-muted/30")}>
            {files.map((file) => (
              <FileItem
                key={file.id}
                name={file.file.name}
                fileType={getFileType(file.file)}
                size={formatFileSize(file.file.size)}
                status={file.status}
                progress={file.progress}
                actions={
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove?.(file)}
                    aria-label={`Remove ${file.file.name}`}
                  >
                    <XIcon className="size-4" />
                  </Button>
                }
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);
FileUpload.displayName = "FileUpload";

// FileUploadPreview component - for image preview grid
export interface FileUploadPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  files: UploadFile[];
  onRemove?: (file: UploadFile) => void;
}

export const FileUploadPreview = forwardRef<HTMLDivElement, FileUploadPreviewProps>(
  ({ className, files, onRemove, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5", className)}
        {...props}
      >
        {files.map((file) => (
          <div
            key={file.id}
            className="relative aspect-square rounded-lg overflow-hidden bg-muted"
          >
            {file.preview ? (
              <img
                src={file.preview}
                alt={file.file.name}
                className="size-full object-cover"
              />
            ) : (
              <div className="size-full flex items-center justify-center">
                <FileIcon className="size-8 text-muted-foreground" />
              </div>
            )}

            {/* Upload progress overlay */}
            {file.status === "uploading" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="w-3/4">
                  <ProgressBar value={file.progress || 0} size="sm" />
                </div>
              </div>
            )}

            {/* Error overlay */}
            {file.status === "error" && (
              <div className="absolute inset-0 bg-destructive/50 flex items-center justify-center">
                <AlertCircleIcon className="size-6 text-white" />
              </div>
            )}

            {/* Remove button */}
            {onRemove && file.status !== "uploading" && (
              <button
                type="button"
                className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                onClick={() => onRemove(file)}
                aria-label={`Remove ${file.file.name}`}
              >
                <XIcon className="size-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    );
  },
);
FileUploadPreview.displayName = "FileUploadPreview";
