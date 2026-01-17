# Tailwind Components

Tailwind CSSベースのUIコンポーネントライブラリです。

## 技術スタック

- React 19
- Tailwind CSS 4
- Storybook 10
- TypeScript
- Vite

## 利用方法

`src/components/` をコピーして、お使いのReactプロジェクトで利用できます。

### 1. 依存パッケージのインストール

```bash
# pnpm
pnpm add tailwindcss class-variance-authority clsx tailwind-merge preline
```

### 2. tsconfig.json の設定

以下のオプションを `compilerOptions` に追加してください。

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

> **Note**: パスエイリアス `@/*` はコンポーネント内で使用しています。お使いのプロジェクトの設定に合わせて変更する場合は、コンポーネント内のimportパスも修正してください。

### 3. CSS の設定

`src/styles/` もコピーして、エントリーポイントでインポートしてください。

```
src/styles/
├── index.css      # メインCSS（Tailwind設定、テーマ変数、Preline）
├── variables.css  # カスタムプロパティ変数
└── themes/        # カラーテーマ（25種類以上）
```

```tsx
// main.tsx や App.tsx など
import "./styles/index.css";
```

#### テーマの変更

`src/styles/index.css` の2行目でテーマファイルを指定しています。

```css
@import "tailwindcss";
@import "./themes/teal-orange.css";  /* ← 好みのテーマに変更 */
@import "./variables.css";
```

利用可能なテーマ: `default`, `claude`, `mono`, `nature`, `mocha-mousse`, `cosmic-night`, `starry-night`, `bubblegum`, `tangerine` など

#### Preline（任意）

Prelineのインタラクティブ機能を使う場合は、以下の行も必要です。

```css
@import "../../node_modules/preline/variants.css";
@source "../../node_modules/preline/dist/*.js";
```

#### @tailwindcss/forms プラグイン（任意）

フォーム要素のスタイルを有効にする場合:

```bash
pnpm add -D @tailwindcss/forms
```

```css
@plugin "@tailwindcss/forms";
```

### 4. Preline の初期化（任意）

Accordion、Dropdown、Modal等のインタラクティブなコンポーネントを使用する場合は、Prelineの初期化が必要です。

```tsx
// App.tsx や layout.tsx など
import { useEffect } from "react";
import "preline/preline";

function App() {
  useEffect(() => {
    // @ts-expect-error Preline types
    window.HSStaticMethods?.autoInit();
  }, []);

  return <>{/* ... */}</>;
}
```

### 5. ディレクトリ構成

```
src/components/
├── atoms/       # 基本要素（Button, Input, Icon等）
├── molecules/   # 複合要素（FormField, Select, Tabs等）
├── organisms/   # 独立した機能（Header, Modal, Table等）
├── pages/       # ページテンプレート
├── icons/       # アイコンコンポーネント（100種類以上）
├── variants/    # CVAスタイルバリアント定義
├── types.ts     # 共通の型定義
└── utils.ts     # ユーティリティ関数（cn関数）
```

## セットアップ

```bash
pnpm install
```

## 開発

```bash
# Storybookを起動
pnpm run storybook

# 開発サーバーを起動
pnpm run dev

# 型チェック
pnpm run typecheck

# Lint
pnpm run lint

# フォーマット
pnpm run format
```

## ビルド

```bash
# プロダクションビルド
pnpm run build

# Storybookビルド
pnpm run build-storybook
```

## コンポーネント構成

Atomic Designに基づき、以下の階層で構成されています。

| 階層 | 説明 | 例 |
|------|------|-----|
| Atoms | 最小単位の基本要素 | Button, Input, Icon |
| Molecules | Atomsを組み合わせた複合要素 | FormField, Select, Tabs |
| Organisms | 独立した機能を持つ組織体 | Header, Modal, Table |
| Pages | ページ全体のテンプレート | DashboardPage, AuthPage |

コンポーネントの詳細は [src/components/components.md](src/components/components.md) を参照してください。

## Icons

`src/components/icons` に100種類以上のアイコンコンポーネントを収録しています。
