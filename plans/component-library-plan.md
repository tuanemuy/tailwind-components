# Preline UIコンポーネントライブラリ実装計画

## 概要

720種類のHTML/Tailwindサンプルコンポーネントを、再利用可能なReact + TypeScriptコンポーネントライブラリに変換する。

### 現状分析

| 項目 | 内容 |
|------|------|
| サンプル総数 | 720コンポーネント |
| カテゴリ数 | 20 |
| サブカテゴリ数 | 127 |
| 実装済み | 約64コンポーネント（src/stories/） |
| 技術スタック | React 19 + TypeScript 5.9 + Tailwind CSS 4 + Preline UI 3 |
| カタログ | Storybook 10.1 |

### 既存実装の問題点（改善必須）

現在の`src/stories/`の実装を分析した結果、以下の重複・問題が発見された：

| 問題 | 重複数 | 具体例 |
|------|--------|--------|
| アイコンの重複定義 | 20回以上 | TrendUpIcon, TrendDownIcon, MoreIcon, DownloadIcon が各ファイルで個別定義 |
| インターフェースの重複 | 6回 | FileItem, FolderItem が複数ファイルで同一定義 |
| UIパターンの重複 | 多数 | Avatar, Badge, Trend表示が各コンポーネントでインライン実装 |
| コンポーネント間依存 | 0 | 32コンポーネントすべてが完全独立、再利用なし |

**この計画では、これらの問題を解決し、適切な階層構造と依存関係を持つコンポーネント設計を実現する。**

---

## コンポーネント階層設計（Atomic Design）

### 階層定義

```
┌─────────────────────────────────────────────────────────────────┐
│  Level 4: Pages                                                  │
│  ページ全体のテンプレート                                           │
│  例: AuthPage, DashboardPage, ArticlePage                        │
│  依存: Templates + Organisms                                     │
├─────────────────────────────────────────────────────────────────┤
│  Level 3: Organisms（有機体）                                     │
│  複数のMoleculesを組み合わせた独立したセクション                       │
│  例: Header, Sidebar, ProductCard, PricingTable, Modal           │
│  依存: Molecules + Atoms                                         │
├─────────────────────────────────────────────────────────────────┤
│  Level 2: Molecules（分子）                                       │
│  複数のAtomsを組み合わせた小さな機能単位                             │
│  例: FormField, StatCard, FileItem, AvatarGroup, TrendIndicator  │
│  依存: Atoms のみ                                                │
├─────────────────────────────────────────────────────────────────┤
│  Level 1: Atoms（原子）                                          │
│  これ以上分解できない最小単位                                        │
│  例: Button, Badge, Icon, Input, Avatar, ProgressBar             │
│  依存: なし（lib/のユーティリティのみ）                              │
├─────────────────────────────────────────────────────────────────┤
│  Level 0: Foundation（基盤）                                      │
│  型定義、ユーティリティ、バリアント定義                               │
│  例: types.ts, variants.ts, utils.ts, icons/                     │
└─────────────────────────────────────────────────────────────────┘
```

### 依存ルール（厳守）

```
Pages      → Templates, Organisms, Molecules, Atoms
Organisms  → Molecules, Atoms
Molecules  → Atoms のみ
Atoms      → Foundation のみ
Foundation → 外部ライブラリのみ
```

**禁止事項:**
- 同一階層間のインポート（Atom → Atom は禁止）
- 下位から上位へのインポート（Atom → Molecule は禁止）
- 同じUIパターンの再実装（必ず下位コンポーネントを使用）

---

## 内包 vs コンポジション設計指針

下位コンポーネントを「内部で直接使用する（内包）」か「外部から注入する（コンポジション）」かは、コンポーネントの再利用性と使いやすさのバランスに大きく影響する。

### 2つのアプローチ

```
┌─────────────────────────────────────────────────────────────────┐
│  内包（Encapsulation）                                           │
│  下位コンポーネントを内部で直接インポート・使用                        │
│                                                                  │
│  // StatCard内部でTrendIndicatorを直接使用                        │
│  import { TrendIndicator } from "@/components/molecules";        │
│  <TrendIndicator value={trend.value} direction={trend.dir} />   │
├─────────────────────────────────────────────────────────────────┤
│  コンポジション（Composition）                                    │
│  下位コンポーネントを外部から注入（children, render props, slots）  │
│                                                                  │
│  // 使用側でTrendIndicatorを渡す                                  │
│  <StatCard                                                       │
│    trend={<TrendIndicator value="4.3%" direction="up" />}       │
│  />                                                              │
└─────────────────────────────────────────────────────────────────┘
```

### 判断基準マトリクス

| 基準 | 内包を選択 | コンポジションを選択 |
|------|-----------|-------------------|
| **カスタマイズ頻度** | ほぼカスタマイズ不要 | 頻繁にカスタマイズが必要 |
| **表示パターン** | 1-2パターンで固定 | 多様なパターンが想定される |
| **使用者の期待** | シンプルなAPIを期待 | 柔軟性を期待 |
| **デザイン一貫性** | 厳密に統一したい | ある程度の自由度を許容 |
| **コンポーネントの責務** | 特定の目的に特化 | 汎用的なコンテナ |

### 判断フローチャート

```
その下位コンポーネントは...

[Q1] 使用箇所によって見た目や振る舞いを変える必要があるか？
  │
  ├─ YES → [Q2] 変更頻度は高いか？
  │           │
  │           ├─ 高い → コンポジション（外部から注入）
  │           │
  │           └─ 低い → 内包 + props でバリエーション対応
  │
  └─ NO → [Q3] その下位コンポーネントは省略可能か？
            │
            ├─ YES → 内包（オプショナルprops）
            │         例: trend?: TrendData
            │
            └─ NO → 内包（必須で内部実装）
```

### コンポーネント別設計判断

#### Atoms → 内包のみ（コンポジション不要）

Atomsは最小単位のため、下位コンポーネントを持たない。lib/icons のみを内包。

```typescript
// Button: アイコンは内包（lib/iconsから）
// ただし、カスタムアイコンも許可するためReactNode型で受け取る
interface ButtonProps {
  leftIcon?: ReactNode;   // コンポジション：カスタムアイコン可能
  rightIcon?: ReactNode;  // コンポジション：カスタムアイコン可能
}
```

#### Molecules → 主に内包、一部コンポジション

| コンポーネント | 要素 | 判断 | 理由 |
|--------------|------|------|------|
| **TrendIndicator** | Icon | 内包 | アイコンは上下の2パターン固定 |
| **AvatarGroup** | Avatar | 内包 | Avatarの見た目は統一すべき |
| **FormField** | Label, Input | 内包 | フォームの構造は統一すべき |
| **FormField** | Error表示 | 内包 | エラー表示は統一すべき |
| **StatCard** | Icon | コンポジション | 様々なアイコンを使用するため |
| **StatCard** | TrendIndicator | 内包（オプション） | 表示パターンは固定、省略可能 |
| **FileItem** | Icon | コンポジション | ファイルタイプで異なるアイコン |
| **FileItem** | Badge, Button | 内包 | アクション部分は統一すべき |
| **Dropdown** | トリガー | コンポジション | Button以外も使用可能に |
| **Dropdown** | メニュー項目 | コンポジション | 内容は使用箇所で異なる |

```typescript
// StatCard: アイコンはコンポジション、トレンドは内包
interface StatCardProps {
  icon: ReactNode;                    // コンポジション：必須、外部から注入
  label: string;
  value: string;
  trend?: {                           // 内包：オプション、内部でTrendIndicator使用
    value: string;
    direction: TrendDirection;
  };
}

// 内部実装
export const StatCard = ({ icon, label, value, trend }: StatCardProps) => (
  <div className="...">
    {icon}  {/* 外部から注入されたアイコン */}
    <div>
      <span>{label}</span>
      <span>{value}</span>
    </div>
    {trend && (  // 内部でTrendIndicatorを使用
      <TrendIndicator value={trend.value} direction={trend.direction} />
    )}
  </div>
);
```

#### Organisms → 構造は内包、コンテンツはコンポジション

| コンポーネント | 要素 | 判断 | 理由 |
|--------------|------|------|------|
| **Card** | Header/Body/Footer構造 | 内包 | カードの構造は統一 |
| **Card** | 内部コンテンツ | コンポジション（children） | 内容は自由 |
| **Table** | Checkbox, Dropdown | 内包 | テーブル機能として統一 |
| **Table** | セル内容 | コンポジション（render props） | セル内容は自由 |
| **Modal** | オーバーレイ、閉じるボタン | 内包 | モーダルの基本構造は統一 |
| **Modal** | コンテンツ | コンポジション（children） | 内容は自由 |
| **Header** | レイアウト構造 | 内包 | ヘッダー構造は統一 |
| **Header** | ロゴ、ナビ項目、アクション | コンポジション（slots） | 内容はアプリ依存 |
| **Form** | FormField配置 | 内包 | フォームレイアウトは統一 |
| **Form** | フィールド定義 | コンポジション（config） | フィールドは使用箇所で異なる |

```typescript
// Table: セル内容はrender propsでコンポジション
interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;  // コンポジション
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  selectable?: boolean;  // 内包：Checkboxを内部で使用
  actions?: (row: T) => ReactNode;  // コンポジション：行アクション
}

// Header: スロットベースのコンポジション
interface HeaderProps {
  logo?: ReactNode;           // コンポジション：ロゴ
  navigation?: ReactNode;     // コンポジション：ナビゲーション
  actions?: ReactNode;        // コンポジション：右側アクション
  userMenu?: ReactNode;       // コンポジション：ユーザーメニュー
}

// 内部でDropdown, Avatar, Buttonは使用可能だが、
// 渡されたReactNodeをそのまま配置するスロット方式
export const Header = ({ logo, navigation, actions, userMenu }: HeaderProps) => (
  <header className="...">
    <div className="...">{logo}</div>
    <nav className="...">{navigation}</nav>
    <div className="...">{actions}</div>
    <div className="...">{userMenu}</div>
  </header>
);
```

#### Pages → 高度にコンポジション

Pagesはアプリケーション固有のため、Organismsの組み合わせ方を外部から制御可能にする。

```typescript
// DashboardPage: レイアウトは内包、コンテンツはコンポジション
interface DashboardPageProps {
  header: ReactNode;          // コンポジション：Header organism
  sidebar: ReactNode;         // コンポジション：Sidebar organism
  children: ReactNode;        // コンポジション：メインコンテンツ
}
```

### 設計パターン別ガイドライン

#### パターン1: 完全内包（Fully Encapsulated）

**使用場面**: 下位コンポーネントの見た目・振る舞いを完全に統一したい場合

```typescript
// TrendIndicator: アイコンを完全に内包
export const TrendIndicator = ({ value, direction }: TrendIndicatorProps) => {
  // アイコンは内部で決定、外部からの注入不可
  const Icon = direction === "up" ? TrendUpIcon : TrendDownIcon;
  return (
    <span>
      <Icon />
      {value}
    </span>
  );
};
```

#### パターン2: オプショナル内包（Optional Encapsulation）

**使用場面**: 下位コンポーネントが省略可能な場合

```typescript
// StatCard: トレンドはオプション
interface StatCardProps {
  trend?: {
    value: string;
    direction: TrendDirection;
  };
}

export const StatCard = ({ trend, ...props }: StatCardProps) => (
  <div>
    {/* ... */}
    {trend && <TrendIndicator {...trend} />}  {/* あれば表示 */}
  </div>
);
```

#### パターン3: スロットコンポジション（Slot Composition）

**使用場面**: 特定の位置に任意のコンテンツを配置したい場合

```typescript
// Card: Header, Footer はスロット
interface CardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export const Card = ({ header, footer, children }: CardProps) => (
  <div className="card">
    {header && <div className="card-header">{header}</div>}
    <div className="card-body">{children}</div>
    {footer && <div className="card-footer">{footer}</div>}
  </div>
);
```

#### パターン4: Render Propsコンポジション

**使用場面**: データに基づいて動的にコンテンツを生成する場合

```typescript
// Table: セル内容をrender propsで
interface TableProps<T> {
  columns: {
    key: keyof T;
    render?: (value: any, row: T) => ReactNode;
  }[];
}

// 使用例
<Table
  columns={[
    { key: "name" },  // デフォルト表示
    { key: "status", render: (v) => <Badge variant={v}>{v}</Badge> },  // カスタム表示
    { key: "user", render: (_, row) => <Avatar src={row.avatar} /> },
  ]}
/>
```

#### パターン5: ハイブリッド（デフォルト内包 + オーバーライド可能）

**使用場面**: 通常は内包だが、特殊ケースでカスタマイズしたい場合

```typescript
// FileItem: デフォルトアイコンは内包、カスタムも可能
interface FileItemProps {
  fileType: FileType;
  customIcon?: ReactNode;  // オーバーライド用
}

export const FileItem = ({ fileType, customIcon }: FileItemProps) => {
  // カスタムアイコンがあればそれを使用、なければデフォルト
  const icon = customIcon ?? getDefaultIconForType(fileType);
  return <div>{icon}</div>;
};
```

### コンポーネント設計判断サマリー

| 階層 | 基本方針 | 内包する要素 | コンポジションする要素 |
|------|---------|------------|---------------------|
| **Atoms** | コンポジション主体 | lib/icons（デフォルト） | アイコン（ReactNode） |
| **Molecules** | 内包主体 | 構造的要素、統一すべきUI | 可変コンテンツ、アイコン |
| **Organisms** | ハイブリッド | レイアウト構造、共通機能 | スロット、render props |
| **Pages** | コンポジション主体 | ページレイアウト | すべてのOrganism |

### チェックリスト：新規コンポーネント設計時

```
□ この下位コンポーネントは全使用箇所で同じ見た目か？
  → YES: 内包
  → NO: コンポジション

□ この下位コンポーネントは省略可能か？
  → YES: オプショナル内包（prop?: Type）
  → NO: 必須として設計

□ 使用者は下位コンポーネントをカスタマイズしたいか？
  → 頻繁に: コンポジション（ReactNode型）
  → 稀に: ハイブリッド（デフォルト内包 + オーバーライド）
  → 不要: 完全内包

□ データに基づいて動的に生成するか？
  → YES: Render Props
  → NO: 静的スロット

□ 配置位置は固定か？
  → 固定: スロットコンポジション
  → 自由: children
```

---

## ディレクトリ構造

```
src/
├── lib/                          # Level 0: Foundation
│   ├── types.ts                  # 共通型定義
│   ├── utils.ts                  # cn() などユーティリティ
│   ├── variants/                 # CVAバリアント定義
│   │   ├── button.ts
│   │   ├── badge.ts
│   │   ├── input.ts
│   │   └── index.ts
│   └── icons/                    # 共有アイコン
│       ├── TrendUp.tsx
│       ├── TrendDown.tsx
│       ├── ChevronRight.tsx
│       └── index.ts              # 一括エクスポート
│
├── components/
│   ├── atoms/                    # Level 1: Atoms
│   │   ├── Button/
│   │   │   ├── index.tsx
│   │   │   └── Button.stories.tsx
│   │   ├── Badge/
│   │   ├── Avatar/
│   │   ├── Icon/
│   │   ├── Input/
│   │   ├── ProgressBar/
│   │   └── index.ts              # 一括エクスポート
│   │
│   ├── molecules/                # Level 2: Molecules
│   │   ├── FormField/            # Label + Input + Error
│   │   ├── StatCard/             # アイコン + 値 + トレンド
│   │   ├── TrendIndicator/       # アイコン + パーセント
│   │   ├── AvatarGroup/          # 複数Avatar
│   │   ├── FileItem/             # アイコン + ファイル情報
│   │   ├── ButtonGroup/
│   │   ├── Dropdown/
│   │   └── index.ts
│   │
│   ├── organisms/                # Level 3: Organisms
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── Card/                 # 汎用カードコンテナ
│   │   ├── Table/
│   │   ├── Modal/
│   │   ├── Form/
│   │   └── index.ts
│   │
│   └── pages/                    # Level 4: Pages
│       ├── AuthPage/
│       ├── DashboardPage/
│       └── index.ts
│
├── stories/                      # Storybook（既存、段階的に移行）
└── styles/                       # グローバルスタイル（既存）
```

---

## コンポーネント依存関係グラフ

### Atoms（依存なし）

```
Button      ← lib/variants/button.ts, lib/utils.ts
Badge       ← lib/variants/badge.ts, lib/utils.ts
Avatar      ← lib/variants/avatar.ts, lib/utils.ts
Icon        ← lib/icons/*
Input       ← lib/variants/input.ts, lib/utils.ts
Textarea    ← lib/variants/textarea.ts, lib/utils.ts
Checkbox    ← lib/variants/checkbox.ts, lib/utils.ts
Radio       ← lib/variants/radio.ts, lib/utils.ts
Switch      ← lib/variants/switch.ts, lib/utils.ts
ProgressBar ← lib/variants/progress.ts, lib/utils.ts
Link        ← lib/variants/link.ts, lib/utils.ts
Label       ← lib/utils.ts
Separator   ← lib/utils.ts
```

### Molecules（Atomsを使用）

```
TrendIndicator
├── Icon (atoms)
└── Badge (atoms)

AvatarGroup
└── Avatar (atoms)

FormField
├── Label (atoms)
├── Input (atoms)
└── [ErrorMessage内部実装]

StatCard
├── Icon (atoms)
├── TrendIndicator (molecules) ※例外的に同階層使用を許可
└── [値表示は内部実装]

FileItem
├── Icon (atoms)
├── Badge (atoms)
└── Button (atoms)

ButtonGroup
└── Button (atoms)

Dropdown
├── Button (atoms)
└── [メニュー項目は内部実装]

Select
├── Button (atoms)
├── Icon (atoms)
└── Dropdown (molecules)

Popover
├── Button (atoms)
└── [コンテンツはchildren]
```

### Organisms（Molecules + Atomsを使用）

```
Card
├── [ヘッダー/ボディ/フッターはchildren]
└── Button (atoms) ※アクション用

StatCardGroup
└── StatCard (molecules) ×複数

Table
├── Checkbox (atoms)
├── Badge (atoms)
├── Avatar (atoms)
├── Button (atoms)
├── Dropdown (molecules)
└── [セル内容はchildren]

Form
├── FormField (molecules) ×複数
├── Button (atoms)
└── [レイアウトは内部実装]

Header
├── Button (atoms)
├── Avatar (atoms)
├── Dropdown (molecules)
└── [ナビゲーションは内部実装]

Sidebar
├── Button (atoms)
├── Avatar (atoms)
├── Badge (atoms)
└── [メニュー項目は内部実装]

Modal
├── Button (atoms)
├── Icon (atoms)
└── [コンテンツはchildren]

FileList
├── FileItem (molecules) ×複数
└── [レイアウトはvariant: list | grid]
```

### Pages（Organisms + Moleculesを使用）

```
AuthPage
├── Card (organisms)
├── Form (organisms)
├── FormField (molecules)
└── Button (atoms)

DashboardPage
├── Header (organisms)
├── Sidebar (organisms)
├── StatCardGroup (organisms)
├── Table (organisms)
└── Card (organisms)
```

---

## 再実装防止ルール

### 1. 実装前チェックリスト

新しいコンポーネントを実装する前に、以下を確認：

```
□ 同じUIパターンが既にAtomsに存在しないか？
  → 存在する場合、そのAtomをインポートして使用

□ 同じ複合パターンがMoleculesに存在しないか？
  → 存在する場合、そのMoleculeをインポートして使用

□ 新しいアイコンを追加する必要があるか？
  → lib/icons/ に追加し、再利用可能にする

□ 新しいバリアント（サイズ、色）が必要か？
  → lib/variants/ に追加し、CVAで管理
```

### 2. コードレビュー基準

PRレビュー時に以下を確認：

```
□ インポートパスが階層ルールに従っているか
  atoms/ → lib/ のみ
  molecules/ → atoms/, lib/ のみ
  organisms/ → molecules/, atoms/, lib/ のみ

□ 同じSVGが複数回定義されていないか
  → lib/icons/ を使用しているか確認

□ 同じインターフェースが複数回定義されていないか
  → lib/types.ts または該当Atomで定義されているか確認

□ インラインでスタイルバリエーションを実装していないか
  → lib/variants/ のCVAを使用しているか確認
```

### 3. 共通化すべきパターン一覧

以下のパターンは必ず共通コンポーネント/ユーティリティとして実装：

| パターン | 実装場所 | 使用例 |
|---------|---------|--------|
| トレンド表示（↑↓ + %） | molecules/TrendIndicator | Stats系すべて |
| アバター（画像/イニシャル） | atoms/Avatar | ユーザー表示すべて |
| ステータスバッジ | atoms/Badge | テーブル、カードすべて |
| ファイルアイコン | lib/icons/files/ | ファイル表示すべて |
| アクションボタン | atoms/Button | すべてのインタラクション |
| フォーム入力 | atoms/Input + molecules/FormField | すべてのフォーム |
| プログレスバー | atoms/ProgressBar | 進捗表示すべて |

---

## 実装フェーズ（依存順序）

### Phase 1: Foundation（基盤）

**目標**: すべてのコンポーネントが依存する基盤を構築

```
lib/
├── types.ts          # 共通型定義
├── utils.ts          # cn(), その他ユーティリティ
├── variants/         # CVAバリアント
└── icons/            # 共有アイコン（30種類程度）
```

#### 1.1 共通型定義
```typescript
// lib/types.ts
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Variant = "primary" | "secondary" | "ghost" | "destructive";
export type Status = "success" | "warning" | "error" | "info";
export type TrendDirection = "up" | "down";

export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}
```

#### 1.2 ユーティリティ
```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

#### 1.3 アイコンライブラリ
```typescript
// lib/icons/index.ts
export { TrendUpIcon } from "./TrendUp";
export { TrendDownIcon } from "./TrendDown";
export { ChevronRightIcon } from "./ChevronRight";
export { MoreHorizontalIcon } from "./MoreHorizontal";
export { DownloadIcon } from "./Download";
// ... 全アイコン
```

#### 1.4 デザイントークン拡張

既存の `src/styles/theme.css` にはコアトークンが定義済み。コンポーネント実装に必要な追加トークンを定義する。

**既存トークン（theme.css）:**
```css
:root {
  /* コア */
  --background, --foreground
  --card, --card-foreground
  --primary, --primary-foreground
  --secondary, --secondary-foreground
  --muted, --muted-foreground
  --accent, --accent-foreground
  --destructive
  --border, --input, --ring

  /* チャート */
  --chart-1 〜 --chart-5

  /* サイドバー */
  --sidebar, --sidebar-foreground, etc.
}
```

**追加が必要なトークン（theme.cssに追加）:**
```css
:root {
  /* ステータスカラー */
  --success: oklch(0.627 0.194 149.214);        /* 成功・上昇トレンド */
  --success-foreground: oklch(0.985 0 0);
  --warning: oklch(0.769 0.188 70.08);          /* 警告・注意 */
  --warning-foreground: oklch(0.205 0 0);
  --error: oklch(0.577 0.245 27.325);           /* エラー・下降トレンド（= destructive） */
  --error-foreground: oklch(0.985 0 0);
  --info: oklch(0.623 0.214 259.815);           /* 情報 */
  --info-foreground: oklch(0.985 0 0);
}

.dark {
  --success: oklch(0.696 0.17 162.48);
  --success-foreground: oklch(0.145 0 0);
  --warning: oklch(0.769 0.188 70.08);
  --warning-foreground: oklch(0.145 0 0);
  --error: oklch(0.704 0.191 22.216);           /* = dark destructive */
  --error-foreground: oklch(0.985 0 0);
  --info: oklch(0.488 0.243 264.376);
  --info-foreground: oklch(0.985 0 0);
}
```

**Tailwindでの使用方法:**
```typescript
// コンポーネント内での色指定
// ❌ 具体的な色を直接指定しない
className="text-green-500"
className="text-red-500"
className="bg-blue-600"

// ✅ デザイントークンを使用
className="text-success"           // var(--success)
className="text-error"             // var(--error)
className="text-warning"           // var(--warning)
className="text-primary"           // var(--primary)
className="text-muted-foreground"  // var(--muted-foreground)
className="bg-primary"             // var(--primary)
className="bg-destructive"         // var(--destructive)
```

**トークン使用ルール:**

| ユースケース | 使用するトークン |
|-------------|----------------|
| 成功・完了・上昇トレンド | `--success` |
| エラー・失敗・下降トレンド | `--error` / `--destructive` |
| 警告・注意 | `--warning` |
| 情報・ニュートラル | `--info` |
| 無効・非アクティブ | `--muted-foreground` |
| プライマリアクション | `--primary` |
| セカンダリアクション | `--secondary` |
| 破壊的アクション | `--destructive` |
| テキスト（通常） | `--foreground` |
| テキスト（補助） | `--muted-foreground` |
| 背景 | `--background` / `--card` |
| ボーダー | `--border` |

#### タスク一覧

→ [todos.md](./todos.md#phase-1-foundation基盤) を参照

---

### Phase 2: Atoms（原子）

**目標**: 最小単位のコンポーネントを実装（他に依存しない）

**依存関係**: lib/ のみ

#### 実装順序（依存なし、並列実装可能）

| コンポーネント | バリエーション | 使用するlib |
|--------------|--------------|------------|
| Button | 5 variants × 5 sizes | variants/button.ts |
| Badge | status, soft, outline | variants/badge.ts |
| Avatar | image, initials, sizes | variants/avatar.ts |
| Icon | wrapper for lib/icons | - |
| Input | text, password, email | variants/input.ts |
| Textarea | sizes, states | variants/textarea.ts |
| Checkbox | sizes, states | variants/checkbox.ts |
| Radio | sizes, states | variants/radio.ts |
| Switch | sizes, states | variants/switch.ts |
| ProgressBar | sizes, colors | variants/progress.ts |
| Link | variants | variants/link.ts |
| Label | required marker | - |
| Separator | horizontal, vertical | - |

#### 実装パターン（Button例）

```typescript
// components/atoms/Button/index.tsx
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/lib/variants/button";
import type { VariantProps } from "class-variance-authority";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, leftIcon, rightIcon, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
);
Button.displayName = "Button";
```

#### タスク一覧

→ [todos.md](./todos.md#phase-2-atoms原子) を参照

---

### Phase 3: Molecules（分子）

**目標**: Atomsを組み合わせた機能単位を実装

**依存関係**: atoms/, lib/ のみ

#### 依存グラフ付き実装順序

```
Group A（Atomsのみ依存、並列実装可能）
├── TrendIndicator    ← Icon, Badge
├── AvatarGroup       ← Avatar
├── ButtonGroup       ← Button
├── FormField         ← Label, Input, [内部Error]
└── IconButton        ← Button, Icon

Group B（Group A完了後）
├── FileItem          ← Icon, Badge, Button, IconButton
├── Dropdown          ← Button, Icon
└── StatCard          ← Icon, TrendIndicator

Group C（Group B完了後）
├── Select            ← Button, Icon, Dropdown
└── Popover           ← Button, [children]
```

#### 実装パターン（TrendIndicator例）

```typescript
// components/molecules/TrendIndicator/index.tsx
import { cn } from "@/lib/utils";
import { Badge } from "@/components/atoms/Badge";
import { TrendUpIcon, TrendDownIcon } from "@/lib/icons";
import type { TrendDirection } from "@/lib/types";

export interface TrendIndicatorProps {
  value: string;
  direction: TrendDirection;
  variant?: "positive" | "negative" | "neutral";
  className?: string;
}

export const TrendIndicator = ({
  value,
  direction,
  variant = direction === "up" ? "positive" : "negative",
  className,
}: TrendIndicatorProps) => {
  const Icon = direction === "up" ? TrendUpIcon : TrendDownIcon;
  const colorClass = {
    positive: "text-success",          // デザイントークン使用
    negative: "text-error",            // デザイントークン使用
    neutral: "text-muted-foreground",  // デザイントークン使用
  }[variant];

  return (
    <span className={cn("inline-flex items-center gap-x-1", colorClass, className)}>
      <Icon className="size-4" />
      <span className="text-xs font-medium">{value}</span>
    </span>
  );
};
```

#### タスク一覧

→ [todos.md](./todos.md#phase-3-molecules分子) を参照

---

### Phase 4: Organisms - Data Display（有機体：データ表示）

**目標**: Molecules/Atomsを組み合わせたデータ表示コンポーネント

**依存関係**: molecules/, atoms/, lib/

#### 依存グラフ

```
Card
├── Button (atoms)
└── [children for content]

StatCardGroup
└── StatCard (molecules) × N

Table
├── Checkbox (atoms)
├── Badge (atoms)
├── Avatar (atoms)
├── Button (atoms)
├── Dropdown (molecules)
├── AvatarGroup (molecules)
└── TrendIndicator (molecules)

FileList
├── FileItem (molecules) × N
└── [variant: list | grid]

DataCard
├── Card (organisms)
├── ProgressBar (atoms)
├── TrendIndicator (molecules)
└── [内部チャート]
```

#### タスク一覧

→ [todos.md](./todos.md#phase-4-organisms---data-display有機体データ表示) を参照

---

### Phase 5: Organisms - Layout（有機体：レイアウト）

**目標**: ページ構造を構成するレイアウトコンポーネント

**依存関係**: molecules/, atoms/, lib/

#### 依存グラフ

```
Header
├── Button (atoms)
├── Avatar (atoms)
├── Badge (atoms)
├── Dropdown (molecules)
├── AvatarGroup (molecules)
└── [Logo, Nav items via children/props]

Sidebar
├── Button (atoms)
├── Avatar (atoms)
├── Badge (atoms)
└── [Menu items via props]

Footer
├── Link (atoms)
└── [Content via children]

Modal
├── Button (atoms)
├── Icon (atoms)
└── [Content via children]

Drawer
├── Button (atoms)
├── Icon (atoms)
└── [Content via children]
```

#### タスク一覧

→ [todos.md](./todos.md#phase-5-organisms---layout有機体レイアウト) を参照

---

### Phase 6: Organisms - Forms（有機体：フォーム）

**目標**: 複雑なフォームコンポーネント

**依存関係**: molecules/, atoms/, lib/

#### 依存グラフ

```
Form
├── FormField (molecules) × N
├── Button (atoms)
└── [validation via props]

FilterForm
├── FormField (molecules)
├── Select (molecules)
├── Checkbox (atoms)
├── Button (atoms)
└── [filter logic]

FileUpload
├── Button (atoms)
├── Icon (atoms)
├── ProgressBar (atoms)
└── FileItem (molecules)
```

#### タスク一覧

→ [todos.md](./todos.md#phase-6-organisms---forms有機体フォーム) を参照

---

### Phase 7: Organisms - Domain Specific（有機体：ドメイン特化）

**目標**: 特定ユースケース向けの複合コンポーネント

**依存関係**: organisms/, molecules/, atoms/, lib/

#### E-Commerce
```
ProductCard
├── Card (organisms)
├── Badge (atoms)
├── Button (atoms)
└── [商品情報]

ProductGallery
├── [画像表示]
└── Button (atoms)

PricingTable
├── Card (organisms)
├── Badge (atoms)
├── Button (atoms)
└── [プラン情報]
```

#### Marketing
```
HeroSection
├── Button (atoms)
└── [コンテンツ]

FeatureSection
├── Icon (atoms)
├── Card (organisms)
└── [機能リスト]

TestimonialCard
├── Card (organisms)
├── Avatar (atoms)
└── [レビュー内容]
```

#### タスク一覧

→ [todos.md](./todos.md#phase-7-organisms---domain-specific有機体ドメイン特化) を参照

---

### Phase 8: Pages（ページ）

**目標**: ページテンプレートの実装

**依存関係**: すべての下位コンポーネント

#### 依存グラフ

```
AuthPage
├── Card (organisms)
├── Form (organisms)
├── FormField (molecules)
├── Button (atoms)
└── Link (atoms)

DashboardPage
├── Header (organisms)
├── Sidebar (organisms)
├── StatCardGroup (organisms)
├── Table (organisms)
├── Card (organisms)
└── [コンテンツ]
```

#### タスク一覧

→ [todos.md](./todos.md#phase-8-pagesページ) を参照

---

## 品質基準

### コンポーネント品質チェックリスト

```
□ TypeScript型定義が完全
□ Props APIが直感的
□ デフォルト値が適切
□ ダークモード対応（dark:プレフィックス）
□ レスポンシブ対応（sm:/md:/lg:）
□ キーボードナビゲーション対応
□ Storybookドキュメント作成
□ 複数バリエーションのストーリー
□ a11yテスト通過
□ 下位コンポーネントを適切にインポート（再実装なし）
□ lib/icons を使用（インラインSVGなし）
□ lib/variants を使用（インラインスタイルバリエーションなし）
```

### PRレビュー必須チェック項目

```
1. インポートパスが階層ルールに従っているか
   ✓ atoms/ → lib/ のみ
   ✓ molecules/ → atoms/, lib/ のみ
   ✓ organisms/ → molecules/, atoms/, lib/ のみ

2. 重複コードがないか
   ✓ SVGアイコンがlib/icons/を使用
   ✓ 型定義がlib/types.tsまたは該当Atomを参照
   ✓ バリアントがlib/variants/を使用

3. 既存コンポーネントを再利用しているか
   ✓ ボタン要素 → Button atom使用
   ✓ バッジ要素 → Badge atom使用
   ✓ トレンド表示 → TrendIndicator molecule使用
```

---

## 依存パッケージ

```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.0"
  }
}
```

**注意**: lucide-reactは使用せず、lib/icons/に独自アイコンを定義。これにより：
- Preline UIのデザインとの一貫性を維持
- バンドルサイズの最適化
- カスタマイズの柔軟性確保

---

## 進捗管理

### マイルストーン

| Phase | 内容 | コンポーネント数 | 依存 |
|-------|------|-----------------|------|
| 1 | Foundation | - | なし |
| 2 | Atoms | 13 | Phase 1 |
| 3 | Molecules | 10 | Phase 2 |
| 4 | Organisms - Data | 5 | Phase 3 |
| 5 | Organisms - Layout | 6 | Phase 3 |
| 6 | Organisms - Forms | 4 | Phase 3 |
| 7 | Organisms - Domain | 6 | Phase 4-6 |
| 8 | Pages | 3 | Phase 4-7 |

### 既存実装のリファクタリング

`src/stories/`の64コンポーネントは、新しいコンポーネントを使用するよう段階的にリファクタリング：

1. Phase 2完了後: Atoms使用に移行
2. Phase 3完了後: Molecules使用に移行
3. 最終的に: src/stories/ → src/components/*/stories.tsx に移動

---

## 付録

### A. 共有アイコン一覧（lib/icons/に実装）

| アイコン名 | 使用箇所 |
|-----------|---------|
| TrendUpIcon | Stats系、DataCards |
| TrendDownIcon | Stats系、DataCards |
| ChevronRightIcon | カード、リスト |
| ChevronDownIcon | Dropdown、Select |
| MoreHorizontalIcon | テーブル、カード |
| DownloadIcon | DataCards |
| PlusIcon | Button |
| CheckIcon | Checkbox、成功表示 |
| XIcon | Modal閉じる、削除 |
| SearchIcon | 検索フォーム |
| UserIcon | Avatar fallback |
| FileIcon | ファイル表示 |
| FolderIcon | フォルダ表示 |
| ImageIcon | 画像ファイル |
| DocumentIcon | ドキュメントファイル |

### B. 共通型定義一覧（lib/types.ts）

```typescript
// サイズ
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

// バリアント
export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive" | "outline";
export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "warning";

// ステータス
export type Status = "active" | "inactive" | "pending" | "error" | "success";

// トレンド
export type TrendDirection = "up" | "down";
export type TrendVariant = "positive" | "negative" | "neutral";

// ファイル
export type FileType = "image" | "document" | "video" | "audio" | "archive" | "other";

// レイアウト
export type LayoutVariant = "list" | "grid";
```

### C. 参照ドキュメント

- `src/examples/docs/components.json` - コンポーネントインデックス
- `src/examples/docs/categories/*.json` - カテゴリ別詳細メタデータ
- `src/examples/` - HTMLサンプル（変換元）
- `src/stories/` - 既存React実装（リファクタリング対象）

---

## 追加実装計画（Phase 9以降）

720コンポーネントの詳細分析結果に基づき、以下のコンポーネントを追加実装する。

### カバレッジ分析

| カテゴリ | サンプル数 | 現計画 | 不足 |
|---------|----------|--------|------|
| UIControls | 103 | 約20 | 約80 |
| Forms | 108 | 約15 | 約90 |
| PageSections | 90 | 約5 | 約85 |
| Overlays | 53 | 2 | 約50 |
| Cards | 51 | 3 | 約48 |
| E-Commerce | 49 | 4 | 約45 |
| Marketing | 48 | 3 | 約45 |
| Headers | 29 | 1 | 約28 |
| InboxChatMessages | 28 | 0 | 28 |
| Tables | 27 | 1 | 約26 |
| DataVisualization | 23 | 1 | 約22 |
| Pages | 22 | 3 | 約19 |
| SidebarAndContents | 18 | 1 | 約17 |
| Finance | 16 | 0 | 16 |
| SearchAndCommandPalettes | 16 | 0 | 16 |
| CalendarAndScheduling | 11 | 0 | 11 |
| KanbanBoards | 9 | 0 | 9 |
| VideoAndAudio | 8 | 0 | 8 |
| Footer | 6 | 1 | 約5 |
| Feedback | 5 | 0 | 5 |
| **合計** | **720** | **約60** | **約650** |

---

### Phase 9: Atoms追加

**目標**: 基本UIパーツの充実

| コンポーネント | 説明 | 使用箇所 |
|--------------|------|---------|
| Tooltip | ツールチップ表示 | 全般 |
| Skeleton | ローディングプレースホルダー | 全般 |
| Spinner | ローディングスピナー | 全般 |
| Image | 画像表示（lazy loading対応） | 全般 |
| Kbd | キーボードショートカット表示 | Settings, Help |

---

### Phase 10: Molecules追加

**目標**: 複合UIパーツの充実

#### Navigation系

| コンポーネント | 説明 | サンプル数 |
|--------------|------|----------|
| Tabs | タブナビゲーション（BarOnTop, Bordered, Segment, Vertical） | 11 |
| Breadcrumb | パンくずリスト | 5 |
| Pagination | ページネーション | 8 |
| Stepper | ステップインジケーター | 6 |

#### Input系

| コンポーネント | 説明 | サンプル数 |
|--------------|------|----------|
| SearchInput | 検索入力（Command+K対応） | 8 |
| DatePicker | 日付選択 | 6 |
| TimePicker | 時刻選択 | 4 |
| DateRangePicker | 日付範囲選択 | 3 |
| RangeSlider | 範囲スライダー | 5 |
| ColorPicker | カラー選択 | 3 |
| TagInput | タグ入力（複数選択） | 4 |
| ComboBox | コンボボックス（検索+選択） | 6 |

#### Feedback系

| コンポーネント | 説明 | サンプル数 |
|--------------|------|----------|
| Alert | アラートバナー | 8 |
| Toast | トースト通知 | 5 |
| EmptyState | 空状態表示 | 4 |

#### Content系

| コンポーネント | 説明 | サンプル数 |
|--------------|------|----------|
| Accordion | アコーディオン | 6 |
| Menu | メニュー（Context, Dropdown） | 10 |
| Tooltip（拡張） | コンテンツ付きツールチップ | 5 |
| Rating | 星評価（5段階） | 4 |

---

### Phase 11: Organisms - PageSections

**目標**: ページセクションコンポーネントの実装（90サンプル対応）

#### Banners

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| Banner | 告知バナー（Gift, LoginRegister, News） | 5 |
| FloatingBanner | フローティングバナー（Rate, QuickActions） | 3 |

#### DescriptionLists

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| DescriptionList | 定義リスト（Simple, WithIcons, Grid） | 8 |
| UserProfileCard | プロフィールカード | 9 |

#### Navigations

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| SectionNav | セクション内ナビ（BottomBordered, Pilled, Horizontal） | 4 |
| CardNav | カードナビゲーション（BarOnTop, Segment, Vertical） | 11 |

#### Timeline

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| Timeline | タイムライン（Activity, History, Order） | 10 |
| ActivityFeed | アクティビティフィード | 4 |

#### TitleBars

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| TitleBar | タイトルバー（Simple, WithActions, WithDatepicker） | 22 |
| KanbanGroupHeading | カンバンカラムヘッダー | 4 |

#### QuickActions

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| QuickActionCard | クイックアクションカード | 14 |
| QuickActionBar | フローティングアクションバー | 2 |

#### SetUpFlows

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| SetupFlow | セットアップフロー（List, Timeline, Accordion） | 4 |
| OnboardingChecklist | オンボーディングチェックリスト | 2 |

#### Success/Feedback

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| SuccessMessage | 成功メッセージ画面 | 2 |
| NotificationSettings | 通知設定マトリクス | 1 |

---

### Phase 12: Organisms - Overlays拡張

**目標**: モーダル・ドロワーのバリエーション実装（53サンプル対応）

#### Authentication系

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| TwoFactorModal | 2FA設定モーダル | 1 |

#### Billing/Payment系

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| AddCardModal | カード追加モーダル | 2 |
| AddPaymentModal | 支払い方法追加モーダル | 2 |
| ManageCardsModal | カード管理モーダル | 1 |
| UpgradeModal | アップグレードモーダル | 2 |

#### DateAndTime系

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| SnoozeModal | スヌーズ設定モーダル | 2 |
| ScheduleModal | スケジュール設定モーダル | 2 |
| RecurrenceModal | 繰り返し設定モーダル | 1 |

#### DataManagement系

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ExportModal | エクスポートモーダル | 2 |
| ImportModal | インポートモーダル | 2 |

#### E-Commerce系

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ProductDetailModal | 商品詳細モーダル | 2 |
| SizeGuideModal | サイズガイドモーダル | 1 |
| ViewLookModal | コーディネート表示モーダル | 1 |

#### Feedback系

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ConfirmModal | 確認モーダル（Delete, Cancel） | 2 |
| ReviewModal | レビューモーダル | 2 |

#### General系

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| StatusModal | ステータス設定モーダル | 2 |
| TagsModal | タグ管理モーダル | 2 |
| KeyboardShortcutsModal | ショートカット一覧モーダル | 1 |
| InvoiceModal | 請求書表示モーダル | 1 |
| LocationModal | 位置選択モーダル | 2 |

#### ShareAndInvite系

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| InviteModal | 招待モーダル（Simple, WithPermissions） | 2 |
| ShareModal | 共有モーダル | 1 |

#### Filter系

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| FilterDrawer | フィルターサイドバー | 2 |
| FilterModal | フィルターモーダル | 1 |

#### Drawers拡張

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ActivityDrawer | アクティビティドロワー | 1 |
| ChatUserDetailsDrawer | チャット詳細ドロワー | 1 |
| FilesInfoDrawer | ファイル情報ドロワー | 1 |
| TaskDetailsDrawer | タスク詳細ドロワー | 1 |
| UserDetailsDrawer | ユーザー詳細ドロワー | 2 |

#### EditForm系

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| EditUserModal | ユーザー編集モーダル | 1 |
| EditEventModal | イベント編集モーダル | 1 |
| CreateProjectModal | プロジェクト作成モーダル | 2 |

#### Compose系

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ComposeModal | メッセージ作成モーダル | 1 |

#### Settings系

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| SettingsModal | 設定モーダル（タブ付き） | 3 |

---

### Phase 13: Organisms - Cards

**目標**: カードコンポーネントの実装（51サンプル対応）

#### Contacts

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ContactCard | 連絡先カード（Avatar, Checkbox, Mini） | 6 |

#### DataSnippets

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ProjectSummaryCard | プロジェクトサマリーカード | 3 |
| FollowUsCard | SNSリンクカード | 1 |
| FileSnippet | ファイルスニペット | 1 |

#### FilesAndFolders

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| FolderCard | フォルダカード | 1 |
| PreviewFileCard | ファイルプレビューカード | 2 |

#### ImportAndExportData

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ImportExportCard | インポート/エクスポートカード | 3 |

#### Integrations

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| IntegrationCard | 連携サービスカード | 2 |

#### LocationAndAddress

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| AddressCard | 住所カード | 2 |
| StoreContactCard | 店舗連絡先カード | 1 |

#### MiniCards

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| CreditsCard | クレジット残量カード | 1 |
| HelpResourcesCard | ヘルプリソースカード | 1 |
| IntroVideoCard | 紹介動画カード | 1 |
| TrialCard | トライアル残日数カード | 1 |
| UpgradeProCard | アップグレード促進カード | 1 |

#### ProjectDetails

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ProjectDetailsCard | プロジェクト詳細カード（Alternative, Default） | 2 |

#### Projects

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| FileCard | ファイルカード（Grid, List, MultiImages） | 6 |
| ProjectCard | プロジェクトカード | 1 |
| TeamCard | チームカード | 1 |
| UserHeroCard | ユーザーヒーローカード | 1 |

#### BrandingFeaturedCards

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| AppDownloadCard | アプリダウンロードカード | 2 |

#### InlineCards

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| InviteFriendsCard | 友人招待カード | 1 |
| FeaturePreviewCard | 機能プレビューカード | 1 |

#### MasonryLayout

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| MasonryGrid | メイソンリーグリッド | 1 |

---

### Phase 14: Organisms - E-Commerce拡張

**目標**: ECサイト向けコンポーネントの実装（49サンプル対応）

#### CheckoutForms

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| CheckoutForm | チェックアウトフォーム（Guest, LoggedIn） | 2 |
| OrderConfirmation | 注文確認画面 | 2 |
| OrderSummary | 注文サマリー | 1 |
| ReviewAndPay | 確認・支払い画面 | 1 |
| ShoppingBag | ショッピングバッグ | 2 |
| ShopCheckout | ショップチェックアウト | 1 |

#### E-CommerceGalleries

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ProductGallery | 商品ギャラリー（Grid, HorizontalSlider, VerticalSlider） | 4 |
| ImageTextPair | 画像テキストペア | 1 |

#### E-CommerceGalleryCategories

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| CategoryGrid | カテゴリグリッド | 3 |
| CategorySlider | カテゴリスライダー | 3 |
| CategoryCircular | 円形カテゴリナビ | 1 |
| CategoryPill | ピル型カテゴリ | 2 |

#### E-CommerceOrderDetails

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| OrderStatusCard | 注文ステータスカード | 4 |
| ExchangeReturnCard | 交換・返品カード | 2 |

#### E-CommerceProductDetails

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ProductDetails | 商品詳細（Gallery, Marketplace, Shop, StickySidebar） | 4 |

#### E-CommerceProductListings

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ProductListing | 商品リスト（Marketplace, Mini, Shop） | 14 |
| ProductListingGrid | 商品グリッド | 4 |
| ProductListingSlider | 商品スライダー | 2 |
| CompleteTheLook | コーディネート提案 | 1 |

---

### Phase 15: Organisms - DataVisualization

**目標**: データ可視化コンポーネントの実装（23サンプル対応）

#### DataCards

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| BlockStatsCard | ブロック統計カード | 1 |
| BrowsersCard | ブラウザ統計カード | 1 |
| ListBarCard | リストバーカード | 1 |
| ProgressbarsCard | プログレスバーカード | 1 |
| ProjectCostsCard | プロジェクトコストカード | 1 |
| SegmentedProgressCard | セグメントプログレスカード | 1 |
| StackedProgressCard | スタックプログレスカード | 1 |
| SalesStatsCard | 売上統計カード | 1 |
| SurveyDataCard | アンケートデータカード（Horizontal, Vertical） | 2 |
| TieredStatsCard | 階層統計カード | 1 |
| TimeSheetCard | タイムシートカード | 1 |
| TopCardWithProgress | トップカード（Progress付き） | 1 |
| TopCountriesCard | 上位国ランキングカード | 1 |
| TrafficCard | トラフィックカード | 1 |

#### Stats

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ChatReportsStats | チャットレポート統計 | 1 |
| InboxContactsStats | 連絡先統計 | 1 |
| InboxReportsStats | 受信箱統計 | 1 |
| BrandSalesStats | ブランド売上統計 | 1 |
| ProjectReportsStats | プロジェクトレポート統計 | 1 |
| AnimatedStats | ホバーアニメーション統計 | 1 |
| AvatarGroupStats | アバターグループ統計 | 1 |
| IconStats | アイコン統計 | 1 |

---

### Phase 16: Organisms - InboxChatMessages（新規）

**目標**: チャット・メッセージングコンポーネントの実装（28サンプル対応）

#### ChatBubbles

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| MessageBubble | メッセージバブル（Text, Image, File, Voice, Link） | 12 |

#### ChatThreads

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| InboxThread | メールスレッド表示 | 1 |
| ComposeThread | メッセージ作成フォーム | 1 |

#### ChatWidgets

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ChatWidget | チャットウィジェット（Welcome, Messages, Conversation, Help） | 7 |

#### Layouts

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ChatLayout | チャットレイアウト | 2 |
| InboxLayout | インボックスレイアウト | 2 |
| TicketsLayout | チケット管理レイアウト | 1 |
| ReportsLayout | レポートレイアウト | 1 |
| CRMLayout | CRMレイアウト | 1 |

---

### Phase 17: Organisms - ドメイン特化追加

**目標**: 特定ドメイン向けコンポーネントの実装

#### Finance（16サンプル）

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| BalanceCard | 残高表示カード | 2 |
| TransactionList | 取引履歴リスト | 3 |
| PaymentCard | 支払いカード | 2 |
| TransferForm | 送金フォーム | 3 |
| AccountCard | 口座カード | 2 |
| ReceiptTimeline | レシートタイムライン | 1 |
| CurrencySelect | 通貨選択 | 3 |

#### CalendarAndScheduling（11サンプル）

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| CalendarHeader | カレンダーヘッダー | 1 |
| CalendarGrid | カレンダーグリッド | 2 |
| EventCard | イベントカード | 2 |
| ScheduleTimeline | スケジュールタイムライン | 2 |
| DatePicker（拡張） | カレンダー付き日付選択 | 2 |
| TimeslotPicker | タイムスロット選択 | 2 |

#### KanbanBoards（9サンプル）

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| KanbanBoard | カンバンボード | 1 |
| KanbanColumn | カンバンカラム | 2 |
| KanbanCard | カンバンカード | 3 |
| KanbanHeader | カンバンヘッダー | 3 |

#### SearchAndCommandPalettes（16サンプル）

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| CommandPalette | コマンドパレット | 3 |
| SearchModal | 検索モーダル | 3 |
| SearchResults | 検索結果 | 4 |
| RecentSearches | 最近の検索 | 2 |
| SearchSuggestions | 検索候補 | 4 |

#### VideoAndAudio（8サンプル）

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| VideoPlayer | ビデオプレイヤー | 2 |
| AudioPlayer | オーディオプレイヤー | 2 |
| VideoCall | ビデオ通話UI | 2 |
| MediaControls | メディアコントロール | 2 |

#### Feedback（5サンプル）

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| FeedbackForm | フィードバックフォーム | 2 |
| RatingForm | 評価フォーム | 2 |
| NPSSurvey | NPSアンケート | 1 |

---

### Phase 18: Tables拡張

**目標**: テーブルコンポーネントの拡張（27サンプル対応）

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| DataTable | データテーブル（Sortable, Filterable, Selectable） | 8 |
| ProjectsTable | プロジェクトテーブル | 2 |
| UsersTable | ユーザーテーブル | 2 |
| InvoicesTable | 請求書テーブル | 2 |
| OrdersTable | 注文テーブル | 2 |
| TransactionsTable | 取引テーブル | 2 |
| FilesTable | ファイルテーブル | 2 |
| ExpandableTable | 展開可能テーブル | 2 |
| StickyTable | スティッキーヘッダーテーブル | 2 |
| CompactTable | コンパクトテーブル | 3 |

---

### Phase 19: Headers/Sidebars拡張

**目標**: ヘッダー・サイドバーの拡張（47サンプル対応）

#### Headers拡張（29サンプル）

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| ApplicationNavbar | アプリケーションナビゲーションバー | 5 |
| MarketplaceHeader | マーケットプレイスヘッダー | 3 |
| DashboardHeader | ダッシュボードヘッダー | 4 |
| ECommerceHeader | ECサイトヘッダー | 4 |
| BlogHeader | ブログヘッダー | 3 |
| DocsHeader | ドキュメントヘッダー | 2 |
| MobileHeader | モバイルヘッダー | 4 |
| StickyHeader | スティッキーヘッダー | 4 |

#### Sidebars拡張（18サンプル）

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| DashboardSidebar | ダッシュボードサイドバー | 4 |
| DetachedSidebar | 分離型サイドバー | 2 |
| CollapsibleSidebar | 折りたたみサイドバー | 3 |
| IconSidebar | アイコンサイドバー | 2 |
| DoubleSidebar | ダブルサイドバー | 2 |
| FilterSidebar | フィルターサイドバー | 3 |
| SettingsSidebar | 設定サイドバー | 2 |

---

### Phase 20: Pages拡張

**目標**: ページテンプレートの拡張（22サンプル対応）

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| AuthPage | 認証ページ（Login, Signup, ForgotPassword, 2FA） | 4 |
| DashboardPage | ダッシュボードページ | 3 |
| ProfilePage | プロフィールページ | 2 |
| SettingsPage | 設定ページ | 2 |
| NotFoundPage | 404ページ | 1 |
| ErrorPage | エラーページ | 1 |
| MaintenancePage | メンテナンスページ | 1 |
| ComingSoonPage | 準備中ページ | 1 |
| PricingPage | 料金ページ | 2 |
| ContactPage | お問い合わせページ | 1 |
| BlogListPage | ブログ一覧ページ | 1 |
| BlogPostPage | ブログ記事ページ | 1 |
| ProductPage | 商品ページ | 1 |
| CheckoutPage | チェックアウトページ | 1 |

---

### Phase 21: Marketing拡張

**目標**: マーケティングコンポーネントの拡張（48サンプル対応）

| コンポーネント | 説明 | サンプル |
|--------------|------|---------|
| HeroSection | ヒーローセクション | 8 |
| FeatureSection | 機能紹介セクション | 6 |
| CTASection | CTAセクション | 5 |
| TestimonialSection | 証言セクション | 6 |
| PricingSection | 料金セクション | 5 |
| FAQSection | FAQセクション | 4 |
| TeamSection | チーム紹介セクション | 4 |
| StatsSection | 統計セクション | 4 |
| LogoCloudSection | ロゴクラウドセクション | 3 |
| NewsletterSection | ニュースレターセクション | 3 |

---

## 改訂版マイルストーン

| Phase | 内容 | 新規コンポーネント数 | 累計 |
|-------|------|-------------------|------|
| 1-8 | 既存計画（完了済み） | 60 | 60 |
| 9 | Atoms追加 | 5 | 65 |
| 10 | Molecules追加 | 25 | 90 |
| 11 | PageSections | 30 | 120 |
| 12 | Overlays拡張 | 35 | 155 |
| 13 | Cards | 25 | 180 |
| 14 | E-Commerce拡張 | 25 | 205 |
| 15 | DataVisualization | 22 | 227 |
| 16 | InboxChatMessages | 15 | 242 |
| 17 | ドメイン特化追加 | 30 | 272 |
| 18 | Tables拡張 | 10 | 282 |
| 19 | Headers/Sidebars拡張 | 15 | 297 |
| 20 | Pages拡張 | 14 | 311 |
| 21 | Marketing拡張 | 10 | 321 |
| **合計** | | **321** | **321** |

**注**: 720サンプルのうち、類似パターンの統合により約321コンポーネントで全体をカバー可能と試算。残りのバリエーションはpropsやslotsで対応。
