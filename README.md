# Tailwind Components

Tailwind CSSベースのUIコンポーネントライブラリです。

## 技術スタック

- React 19
- Tailwind CSS 4
- Storybook 10
- TypeScript
- Vite

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

`src/lib/icons` に100種類以上のアイコンコンポーネントを収録しています。
