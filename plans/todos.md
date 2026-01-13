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

- [x] Card（Header, Body, Footer構造）
- [x] StatCardGroup（StatCard配列、グリッドレイアウト）
- [x] Table（ヘッダー、行、ページネーション）
- [x] FileList（リスト/グリッド切り替え）
- [x] DataCard（チャート付きカード）

### Storybook

- [x] 各Organismのstoriesファイル

---

## Phase 5: Organisms - Layout（有機体：レイアウト）

**依存**: Phase 3 完了後

### コンポーネント

- [x] Header（Navbar, ApplicationNavbar, Toolbar）
- [x] Sidebar（Dashboard, Detached）
- [x] Footer（Standard, Dashboard, Stacked）
- [x] Modal（General, Authentication, Filter）
- [x] Drawer（Side drawer）
- [x] PageLayout（Header + Sidebar + Content + Footer 統合）

### Storybook

- [x] 各Organismのstoriesファイル

---

## Phase 6: Organisms - Forms（有機体：フォーム）

**依存**: Phase 3 完了後

### コンポーネント

- [x] Form（汎用フォームコンテナ）
- [x] FilterForm（フィルター用フォーム）
- [x] FileUpload（ドラッグ&ドロップ、プログレス表示）
- [x] CheckoutForm（EC向け）

### Storybook

- [x] 各Formのstoriesファイル

---

## Phase 7: Organisms - Domain Specific（有機体：ドメイン特化）

**依存**: Phase 4-6 完了後

### E-Commerce

- [x] ProductCard
- [x] ProductGallery
- [x] PricingTable

### Marketing

- [x] HeroSection
- [x] FeatureSection
- [x] TestimonialCard

### Storybook

- [x] 各コンポーネントのstoriesファイル

---

## Phase 8: Pages（ページ）

**依存**: Phase 4-7 完了後

### コンポーネント

- [x] AuthPage（Login, Signup, ForgotPassword）
- [x] DashboardPage
- [x] ArticlePage

### Storybook

- [x] 各Pageのstoriesファイル

---

## 進捗サマリー（Phase 1-8: 既存計画）

| Phase | 内容 | タスク数 | 完了 | 進捗 |
|-------|------|---------|------|------|
| 1 | Foundation | 6 | 6 | 100% |
| 2 | Atoms | 14 | 14 | 100% |
| 3 | Molecules | 11 | 11 | 100% |
| 4 | Organisms - Data | 6 | 6 | 100% |
| 5 | Organisms - Layout | 7 | 7 | 100% |
| 6 | Organisms - Forms | 5 | 5 | 100% |
| 7 | Organisms - Domain | 7 | 7 | 100% |
| 8 | Pages | 4 | 4 | 100% |
| **小計** | | **60** | **60** | **100%** |

---

## Phase 9: Atoms追加

**依存**: Phase 8 完了後

### コンポーネント

- [ ] Tooltip（ツールチップ表示）
- [ ] Skeleton（ローディングプレースホルダー）
- [ ] Spinner（ローディングスピナー）
- [ ] Image（画像表示、lazy loading対応）
- [ ] Kbd（キーボードショートカット表示）

### Storybook

- [ ] 各Atomのstoriesファイル

---

## Phase 10: Molecules追加

**依存**: Phase 9 完了後

### Navigation系

- [ ] Tabs（タブナビゲーション - BarOnTop, Bordered, Segment, Vertical）
- [ ] Breadcrumb（パンくずリスト）
- [ ] Pagination（ページネーション）
- [ ] Stepper（ステップインジケーター）

### Input系

- [ ] SearchInput（検索入力 - Command+K対応）
- [ ] DatePicker（日付選択）
- [ ] TimePicker（時刻選択）
- [ ] DateRangePicker（日付範囲選択）
- [ ] RangeSlider（範囲スライダー）
- [ ] ColorPicker（カラー選択）
- [ ] TagInput（タグ入力 - 複数選択）
- [ ] ComboBox（コンボボックス - 検索+選択）

### Feedback系

- [ ] Alert（アラートバナー）
- [ ] Toast（トースト通知）
- [ ] EmptyState（空状態表示）

### Content系

- [ ] Accordion（アコーディオン）
- [ ] Menu（メニュー - Context, Dropdown）
- [ ] Rating（星評価）

### Storybook

- [ ] 各Moleculeのstoriesファイル

---

## Phase 11: Organisms - PageSections

**依存**: Phase 10 完了後

### Banners

- [ ] Banner（告知バナー - Gift, LoginRegister, News）
- [ ] FloatingBanner（フローティングバナー）

### DescriptionLists

- [ ] DescriptionList（定義リスト - Simple, WithIcons, Grid）
- [ ] UserProfileCard（プロフィールカード）

### Navigations

- [ ] SectionNav（セクション内ナビ）
- [ ] CardNav（カードナビゲーション）

### Timeline

- [ ] Timeline（タイムライン - Activity, History, Order）
- [ ] ActivityFeed（アクティビティフィード）

### TitleBars

- [ ] TitleBar（タイトルバー - Simple, WithActions, WithDatepicker）
- [ ] KanbanGroupHeading（カンバンカラムヘッダー）

### QuickActions

- [ ] QuickActionCard（クイックアクションカード）
- [ ] QuickActionBar（フローティングアクションバー）

### SetUpFlows

- [ ] SetupFlow（セットアップフロー）
- [ ] OnboardingChecklist（オンボーディングチェックリスト）

### Success/Feedback

- [ ] SuccessMessage（成功メッセージ画面）
- [ ] NotificationSettings（通知設定マトリクス）

### Storybook

- [ ] 各PageSectionのstoriesファイル

---

## Phase 12: Organisms - Overlays拡張

**依存**: Phase 10 完了後

### Authentication系

- [ ] TwoFactorModal（2FA設定モーダル）

### Billing/Payment系

- [ ] AddCardModal（カード追加モーダル）
- [ ] AddPaymentModal（支払い方法追加モーダル）
- [ ] ManageCardsModal（カード管理モーダル）
- [ ] UpgradeModal（アップグレードモーダル）

### DateAndTime系

- [ ] SnoozeModal（スヌーズ設定モーダル）
- [ ] ScheduleModal（スケジュール設定モーダル）
- [ ] RecurrenceModal（繰り返し設定モーダル）

### DataManagement系

- [ ] ExportModal（エクスポートモーダル）
- [ ] ImportModal（インポートモーダル）

### E-Commerce系

- [ ] ProductDetailModal（商品詳細モーダル）
- [ ] SizeGuideModal（サイズガイドモーダル）
- [ ] ViewLookModal（コーディネート表示モーダル）

### Feedback系

- [ ] ConfirmModal（確認モーダル - Delete, Cancel）
- [ ] ReviewModal（レビューモーダル）

### General系

- [ ] StatusModal（ステータス設定モーダル）
- [ ] TagsModal（タグ管理モーダル）
- [ ] KeyboardShortcutsModal（ショートカット一覧モーダル）
- [ ] InvoiceModal（請求書表示モーダル）
- [ ] LocationModal（位置選択モーダル）

### ShareAndInvite系

- [ ] InviteModal（招待モーダル）
- [ ] ShareModal（共有モーダル）

### Filter系

- [ ] FilterDrawer（フィルターサイドバー）
- [ ] FilterModal（フィルターモーダル）

### Drawers拡張

- [ ] ActivityDrawer（アクティビティドロワー）
- [ ] ChatUserDetailsDrawer（チャット詳細ドロワー）
- [ ] FilesInfoDrawer（ファイル情報ドロワー）
- [ ] TaskDetailsDrawer（タスク詳細ドロワー）
- [ ] UserDetailsDrawer（ユーザー詳細ドロワー）

### EditForm系

- [ ] EditUserModal（ユーザー編集モーダル）
- [ ] EditEventModal（イベント編集モーダル）
- [ ] CreateProjectModal（プロジェクト作成モーダル）

### Compose系

- [ ] ComposeModal（メッセージ作成モーダル）

### Settings系

- [ ] SettingsModal（設定モーダル - タブ付き）

### Storybook

- [ ] 各Overlayのstoriesファイル

---

## Phase 13: Organisms - Cards

**依存**: Phase 10 完了後

### Contacts

- [ ] ContactCard（連絡先カード）

### DataSnippets

- [ ] ProjectSummaryCard（プロジェクトサマリーカード）
- [ ] FollowUsCard（SNSリンクカード）
- [ ] FileSnippet（ファイルスニペット）

### FilesAndFolders

- [ ] FolderCard（フォルダカード）
- [ ] PreviewFileCard（ファイルプレビューカード）

### ImportAndExportData

- [ ] ImportExportCard（インポート/エクスポートカード）

### Integrations

- [ ] IntegrationCard（連携サービスカード）

### LocationAndAddress

- [ ] AddressCard（住所カード）
- [ ] StoreContactCard（店舗連絡先カード）

### MiniCards

- [ ] CreditsCard（クレジット残量カード）
- [ ] HelpResourcesCard（ヘルプリソースカード）
- [ ] IntroVideoCard（紹介動画カード）
- [ ] TrialCard（トライアル残日数カード）
- [ ] UpgradeProCard（アップグレード促進カード）

### ProjectDetails

- [ ] ProjectDetailsCard（プロジェクト詳細カード）

### Projects

- [ ] FileCard（ファイルカード - Grid, List, MultiImages）
- [ ] ProjectCard（プロジェクトカード）
- [ ] TeamCard（チームカード）
- [ ] UserHeroCard（ユーザーヒーローカード）

### BrandingFeaturedCards

- [ ] AppDownloadCard（アプリダウンロードカード）

### InlineCards

- [ ] InviteFriendsCard（友人招待カード）
- [ ] FeaturePreviewCard（機能プレビューカード）

### MasonryLayout

- [ ] MasonryGrid（メイソンリーグリッド）

### Storybook

- [ ] 各Cardのstoriesファイル

---

## Phase 14: Organisms - E-Commerce拡張

**依存**: Phase 11-13 完了後

### CheckoutForms

- [ ] CheckoutForm（チェックアウトフォーム - Guest, LoggedIn）
- [ ] OrderConfirmation（注文確認画面）
- [ ] OrderSummary（注文サマリー）
- [ ] ReviewAndPay（確認・支払い画面）
- [ ] ShoppingBag（ショッピングバッグ）
- [ ] ShopCheckout（ショップチェックアウト）

### E-CommerceGalleries

- [ ] ProductGallery（商品ギャラリー - Grid, HorizontalSlider, VerticalSlider）
- [ ] ImageTextPair（画像テキストペア）

### E-CommerceGalleryCategories

- [ ] CategoryGrid（カテゴリグリッド）
- [ ] CategorySlider（カテゴリスライダー）
- [ ] CategoryCircular（円形カテゴリナビ）
- [ ] CategoryPill（ピル型カテゴリ）

### E-CommerceOrderDetails

- [ ] OrderStatusCard（注文ステータスカード）
- [ ] ExchangeReturnCard（交換・返品カード）

### E-CommerceProductDetails

- [ ] ProductDetails（商品詳細 - Gallery, Marketplace, Shop, StickySidebar）

### E-CommerceProductListings

- [ ] ProductListing（商品リスト - Marketplace, Mini, Shop）
- [ ] ProductListingGrid（商品グリッド）
- [ ] ProductListingSlider（商品スライダー）
- [ ] CompleteTheLook（コーディネート提案）

### Storybook

- [ ] 各E-Commerceコンポーネントのstoriesファイル

---

## Phase 15: Organisms - DataVisualization

**依存**: Phase 10 完了後

### DataCards

- [ ] BlockStatsCard（ブロック統計カード）
- [ ] BrowsersCard（ブラウザ統計カード）
- [ ] ListBarCard（リストバーカード）
- [ ] ProgressbarsCard（プログレスバーカード）
- [ ] ProjectCostsCard（プロジェクトコストカード）
- [ ] SegmentedProgressCard（セグメントプログレスカード）
- [ ] StackedProgressCard（スタックプログレスカード）
- [ ] SalesStatsCard（売上統計カード）
- [ ] SurveyDataCard（アンケートデータカード）
- [ ] TieredStatsCard（階層統計カード）
- [ ] TimeSheetCard（タイムシートカード）
- [ ] TopCardWithProgress（トップカード）
- [ ] TopCountriesCard（上位国ランキングカード）
- [ ] TrafficCard（トラフィックカード）

### Stats

- [ ] ChatReportsStats（チャットレポート統計）
- [ ] InboxContactsStats（連絡先統計）
- [ ] InboxReportsStats（受信箱統計）
- [ ] BrandSalesStats（ブランド売上統計）
- [ ] ProjectReportsStats（プロジェクトレポート統計）
- [ ] AnimatedStats（ホバーアニメーション統計）
- [ ] AvatarGroupStats（アバターグループ統計）
- [ ] IconStats（アイコン統計）

### Storybook

- [ ] 各DataVisualizationコンポーネントのstoriesファイル

---

## Phase 16: Organisms - InboxChatMessages

**依存**: Phase 10 完了後

### ChatBubbles

- [ ] MessageBubble（メッセージバブル - Text, Image, File, Voice, Link）

### ChatThreads

- [ ] InboxThread（メールスレッド表示）
- [ ] ComposeThread（メッセージ作成フォーム）

### ChatWidgets

- [ ] ChatWidget（チャットウィジェット - Welcome, Messages, Conversation, Help）

### Layouts

- [ ] ChatLayout（チャットレイアウト）
- [ ] InboxLayout（インボックスレイアウト）
- [ ] TicketsLayout（チケット管理レイアウト）
- [ ] ReportsLayout（レポートレイアウト）
- [ ] CRMLayout（CRMレイアウト）

### Storybook

- [ ] 各InboxChatMessagesコンポーネントのstoriesファイル

---

## Phase 17: Organisms - ドメイン特化追加

**依存**: Phase 11-16 完了後

### Finance

- [ ] BalanceCard（残高表示カード）
- [ ] TransactionList（取引履歴リスト）
- [ ] PaymentCard（支払いカード）
- [ ] TransferForm（送金フォーム）
- [ ] AccountCard（口座カード）
- [ ] ReceiptTimeline（レシートタイムライン）
- [ ] CurrencySelect（通貨選択）

### CalendarAndScheduling

- [ ] CalendarHeader（カレンダーヘッダー）
- [ ] CalendarGrid（カレンダーグリッド）
- [ ] EventCard（イベントカード）
- [ ] ScheduleTimeline（スケジュールタイムライン）
- [ ] TimeslotPicker（タイムスロット選択）

### KanbanBoards

- [ ] KanbanBoard（カンバンボード）
- [ ] KanbanColumn（カンバンカラム）
- [ ] KanbanCard（カンバンカード）
- [ ] KanbanHeader（カンバンヘッダー）

### SearchAndCommandPalettes

- [ ] CommandPalette（コマンドパレット）
- [ ] SearchModal（検索モーダル）
- [ ] SearchResults（検索結果）
- [ ] RecentSearches（最近の検索）
- [ ] SearchSuggestions（検索候補）

### VideoAndAudio

- [ ] VideoPlayer（ビデオプレイヤー）
- [ ] AudioPlayer（オーディオプレイヤー）
- [ ] VideoCall（ビデオ通話UI）
- [ ] MediaControls（メディアコントロール）

### Feedback

- [ ] FeedbackForm（フィードバックフォーム）
- [ ] RatingForm（評価フォーム）
- [ ] NPSSurvey（NPSアンケート）

### Storybook

- [ ] 各ドメイン特化コンポーネントのstoriesファイル

---

## Phase 18: Tables拡張

**依存**: Phase 10 完了後

### コンポーネント

- [ ] DataTable（データテーブル - Sortable, Filterable, Selectable）
- [ ] ProjectsTable（プロジェクトテーブル）
- [ ] UsersTable（ユーザーテーブル）
- [ ] InvoicesTable（請求書テーブル）
- [ ] OrdersTable（注文テーブル）
- [ ] TransactionsTable（取引テーブル）
- [ ] FilesTable（ファイルテーブル）
- [ ] ExpandableTable（展開可能テーブル）
- [ ] StickyTable（スティッキーヘッダーテーブル）
- [ ] CompactTable（コンパクトテーブル）

### Storybook

- [ ] 各Tableのstoriesファイル

---

## Phase 19: Headers/Sidebars拡張

**依存**: Phase 10 完了後

### Headers拡張

- [ ] ApplicationNavbar（アプリケーションナビゲーションバー）
- [ ] MarketplaceHeader（マーケットプレイスヘッダー）
- [ ] DashboardHeader（ダッシュボードヘッダー）
- [ ] ECommerceHeader（ECサイトヘッダー）
- [ ] BlogHeader（ブログヘッダー）
- [ ] DocsHeader（ドキュメントヘッダー）
- [ ] MobileHeader（モバイルヘッダー）
- [ ] StickyHeader（スティッキーヘッダー）

### Sidebars拡張

- [ ] DashboardSidebar（ダッシュボードサイドバー）
- [ ] DetachedSidebar（分離型サイドバー）
- [ ] CollapsibleSidebar（折りたたみサイドバー）
- [ ] IconSidebar（アイコンサイドバー）
- [ ] DoubleSidebar（ダブルサイドバー）
- [ ] FilterSidebar（フィルターサイドバー）
- [ ] SettingsSidebar（設定サイドバー）

### Storybook

- [ ] 各Header/Sidebarのstoriesファイル

---

## Phase 20: Pages拡張

**依存**: Phase 11-19 完了後

### コンポーネント

- [ ] AuthPage拡張（2FA対応）
- [ ] DashboardPage拡張
- [ ] ProfilePage（プロフィールページ）
- [ ] SettingsPage（設定ページ）
- [ ] NotFoundPage（404ページ）
- [ ] ErrorPage（エラーページ）
- [ ] MaintenancePage（メンテナンスページ）
- [ ] ComingSoonPage（準備中ページ）
- [ ] PricingPage（料金ページ）
- [ ] ContactPage（お問い合わせページ）
- [ ] BlogListPage（ブログ一覧ページ）
- [ ] BlogPostPage（ブログ記事ページ）
- [ ] ProductPage（商品ページ）
- [ ] CheckoutPage（チェックアウトページ）

### Storybook

- [ ] 各Pageのstoriesファイル

---

## Phase 21: Marketing拡張

**依存**: Phase 10 完了後

### コンポーネント

- [ ] HeroSection拡張
- [ ] FeatureSection拡張
- [ ] CTASection（CTAセクション）
- [ ] TestimonialSection拡張
- [ ] PricingSection（料金セクション）
- [ ] FAQSection（FAQセクション）
- [ ] TeamSection（チーム紹介セクション）
- [ ] StatsSection（統計セクション）
- [ ] LogoCloudSection（ロゴクラウドセクション）
- [ ] NewsletterSection（ニュースレターセクション）

### Storybook

- [ ] 各Marketingコンポーネントのstoriesファイル

---

## 改訂版進捗サマリー

| Phase | 内容 | タスク数 | 完了 | 進捗 |
|-------|------|---------|------|------|
| 1-8 | 既存計画 | 60 | 60 | 100% |
| 9 | Atoms追加 | 6 | 0 | 0% |
| 10 | Molecules追加 | 19 | 0 | 0% |
| 11 | PageSections | 18 | 0 | 0% |
| 12 | Overlays拡張 | 36 | 0 | 0% |
| 13 | Cards | 26 | 0 | 0% |
| 14 | E-Commerce拡張 | 21 | 0 | 0% |
| 15 | DataVisualization | 23 | 0 | 0% |
| 16 | InboxChatMessages | 10 | 0 | 0% |
| 17 | ドメイン特化追加 | 31 | 0 | 0% |
| 18 | Tables拡張 | 11 | 0 | 0% |
| 19 | Headers/Sidebars拡張 | 16 | 0 | 0% |
| 20 | Pages拡張 | 15 | 0 | 0% |
| 21 | Marketing拡張 | 11 | 0 | 0% |
| **合計** | | **303** | **60** | **20%** |
