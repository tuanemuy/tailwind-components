import type { ReactNode } from "react";

// サイズ
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

// バリアント
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "destructive"
  | "outline";
export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "success"
  | "warning";

// ステータス
export type Status = "active" | "inactive" | "pending" | "error" | "success";

// トレンド
export type TrendDirection = "up" | "down";
export type TrendVariant = "positive" | "negative" | "neutral";

// ファイル
export type FileType =
  | "image"
  | "document"
  | "video"
  | "audio"
  | "archive"
  | "other";

// レイアウト
export type LayoutVariant = "list" | "grid";

// 共通Props
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}
