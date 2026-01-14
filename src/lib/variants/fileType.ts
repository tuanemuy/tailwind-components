/**
 * File type color configurations using design tokens
 * These colors represent different file types in file-related components
 */

export type FileTypeColor =
  | "document"
  | "image"
  | "video"
  | "audio"
  | "archive"
  | "code"
  | "spreadsheet"
  | "presentation"
  | "folder"
  | "other";

/**
 * File type color config using design tokens
 * - Uses semantic colors where appropriate (info for documents, success for code, etc.)
 * - Falls back to muted for generic/other types
 */
export const fileTypeColorConfig: Record<FileTypeColor, string> = {
  document: "text-info bg-info/10",
  image: "text-primary bg-primary/10",
  video: "text-destructive bg-destructive/10",
  audio: "text-primary bg-primary/10",
  archive: "text-warning bg-warning/10",
  code: "text-success bg-success/10",
  spreadsheet: "text-success bg-success/10",
  presentation: "text-warning bg-warning/10",
  folder: "text-warning bg-warning/10",
  other: "text-muted-foreground bg-muted",
};

/**
 * Folder color variants for customizable folder colors
 */
export type FolderColor = "default" | "blue" | "green" | "yellow" | "red" | "purple";

export const folderColorConfig: Record<FolderColor, string> = {
  default: "text-warning bg-warning/10",
  blue: "text-info bg-info/10",
  green: "text-success bg-success/10",
  yellow: "text-warning bg-warning/10",
  red: "text-destructive bg-destructive/10",
  purple: "text-primary bg-primary/10",
};
