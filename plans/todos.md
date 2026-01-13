# コンポーネントライブラリ実装タスク

詳細な設計・指針は [component-library-plan.md](./component-library-plan.md) を参照。

---

## Phase 1: Foundation（基盤）

- [x] lib/types.ts の作成
- [x] lib/utils.ts の作成（cn関数）
- [x] lib/variants/ ディレクトリ作成
- [x] lib/icons/ に頻出アイコン30種を移行
- [x] CVA, clsx, tailwind-merge パッケージのインストール
- [x] src/styles/theme.css にステータスカラートークンを追加

---

## Phase 2: Atoms（原子）

**依存**: Phase 1 完了後

### コンポーネント

- [x] Button（Primary, Ghost, White, Destructive, Outline）
- [x] Badge（Status, Soft, Outline, WithDot, WithIcon）
- [x] Avatar（Image, Initials, WithStatus）
- [x] Icon（統一ラッパー）
- [x] Input（Text, Password, Email, Number）
- [x] Textarea
- [x] Checkbox
- [x] Radio
- [x] Switch
- [x] ProgressBar
- [x] Link
- [x] Label
- [x] Separator

### Storybook

- [x] 各Atomのstoriesファイル

---

## Phase 3: Molecules（分子）

**依存**: Phase 2 完了後

### Group A（Atomsのみ依存、並列実装可能）

- [x] TrendIndicator（上昇/下降 + パーセント表示）
- [x] AvatarGroup（複数アバター + オーバーフロー）
- [x] ButtonGroup（ボタン群 + 境界線処理）
- [x] FormField（ラベル + 入力 + エラー + ヘルプテキスト）
- [x] IconButton（アイコンのみボタン）

### Group B（Group A完了後）

- [x] FileItem（ファイル情報表示）
- [x] Dropdown（トリガー + メニュー）
- [x] StatCard（統計値表示カード）

### Group C（Group B完了後）

- [x] Select（選択コンポーネント）
- [x] Popover（ポップオーバー）

### Storybook

- [x] 各Moleculeのstoriesファイル

---

## Phase 4: Organisms - Data Display（有機体：データ表示）

**依存**: Phase 3 完了後

### コンポーネント

- [ ] Card（Header, Body, Footer構造）
- [ ] StatCardGroup（StatCard配列、グリッドレイアウト）
- [ ] Table（ヘッダー、行、ページネーション）
- [ ] FileList（リスト/グリッド切り替え）
- [ ] DataCard（チャート付きカード）

### Storybook

- [ ] 各Organismのstoriesファイル

---

## Phase 5: Organisms - Layout（有機体：レイアウト）

**依存**: Phase 3 完了後

### コンポーネント

- [ ] Header（Navbar, ApplicationNavbar, Toolbar）
- [ ] Sidebar（Dashboard, Detached）
- [ ] Footer（Standard, Dashboard, Stacked）
- [ ] Modal（General, Authentication, Filter）
- [ ] Drawer（Side drawer）
- [ ] PageLayout（Header + Sidebar + Content + Footer 統合）

### Storybook

- [ ] 各Organismのstoriesファイル

---

## Phase 6: Organisms - Forms（有機体：フォーム）

**依存**: Phase 3 完了後

### コンポーネント

- [ ] Form（汎用フォームコンテナ）
- [ ] FilterForm（フィルター用フォーム）
- [ ] FileUpload（ドラッグ&ドロップ、プログレス表示）
- [ ] CheckoutForm（EC向け）

### Storybook

- [ ] 各Formのstoriesファイル

---

## Phase 7: Organisms - Domain Specific（有機体：ドメイン特化）

**依存**: Phase 4-6 完了後

### E-Commerce

- [ ] ProductCard
- [ ] ProductGallery
- [ ] PricingTable

### Marketing

- [ ] HeroSection
- [ ] FeatureSection
- [ ] TestimonialCard

### Storybook

- [ ] 各コンポーネントのstoriesファイル

---

## Phase 8: Pages（ページ）

**依存**: Phase 4-7 完了後

### コンポーネント

- [ ] AuthPage（Login, Signup, ForgotPassword）
- [ ] DashboardPage
- [ ] ArticlePage

### Storybook

- [ ] 各Pageのstoriesファイル

---

## 進捗サマリー

| Phase | 内容 | タスク数 | 完了 | 進捗 |
|-------|------|---------|------|------|
| 1 | Foundation | 6 | 6 | 100% |
| 2 | Atoms | 14 | 14 | 100% |
| 3 | Molecules | 11 | 11 | 100% |
| 4 | Organisms - Data | 6 | 0 | 0% |
| 5 | Organisms - Layout | 7 | 0 | 0% |
| 6 | Organisms - Forms | 5 | 0 | 0% |
| 7 | Organisms - Domain | 7 | 0 | 0% |
| 8 | Pages | 4 | 0 | 0% |
| **合計** | | **60** | **31** | **52%** |
