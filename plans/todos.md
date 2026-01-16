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

- [x] Tooltip（ツールチップ表示）
- [x] Skeleton（ローディングプレースホルダー）
- [x] Spinner（ローディングスピナー）
- [x] Image（画像表示、lazy loading対応）
- [x] Kbd（キーボードショートカット表示）

### Storybook

- [x] 各Atomのstoriesファイル

---

## Phase 10: Molecules追加

**依存**: Phase 9 完了後

### Navigation系

- [x] Tabs（タブナビゲーション - BarOnTop, Bordered, Segment, Vertical）
- [x] Breadcrumb（パンくずリスト）
- [x] Pagination（ページネーション）
- [x] Stepper（ステップインジケーター）

### Input系

- [x] SearchInput（検索入力 - Command+K対応）
- [x] DatePicker（日付選択）
- [x] TimePicker（時刻選択）
- [x] DateRangePicker（日付範囲選択）
- [x] RangeSlider（範囲スライダー）
- [x] ColorPicker（カラー選択）
- [x] TagInput（タグ入力 - 複数選択）
- [x] ComboBox（コンボボックス - 検索+選択）

### Feedback系

- [x] Alert（アラートバナー）
- [x] Toast（トースト通知）
- [x] EmptyState（空状態表示）

### Content系

- [x] Accordion（アコーディオン）
- [x] Menu（メニュー - Context, Dropdown）
- [x] Rating（星評価）

### Storybook

- [x] 各Moleculeのstoriesファイル

---

## Phase 11: Organisms - PageSections

**依存**: Phase 10 完了後

### Banners

- [x] Banner（告知バナー - Gift, LoginRegister, News）
- [x] FloatingBanner（フローティングバナー）

### DescriptionLists

- [x] DescriptionList（定義リスト - Simple, WithIcons, Grid）
- [x] UserProfileCard（プロフィールカード）

### Navigations

- [x] SectionNav（セクション内ナビ）
- [x] CardNav（カードナビゲーション）

### Timeline

- [x] Timeline（タイムライン - Activity, History, Order）
- [x] ActivityFeed（アクティビティフィード）

### TitleBars

- [x] TitleBar（タイトルバー - Simple, WithActions, WithDatepicker）
- [x] KanbanGroupHeading（カンバンカラムヘッダー）

### QuickActions

- [x] QuickActionCard（クイックアクションカード）
- [x] QuickActionBar（フローティングアクションバー）

### SetUpFlows

- [x] SetupFlow（セットアップフロー）
- [x] OnboardingChecklist（オンボーディングチェックリスト）

### Success/Feedback

- [x] SuccessMessage（成功メッセージ画面）
- [x] NotificationSettings（通知設定マトリクス）

### Storybook

- [x] 各PageSectionのstoriesファイル

---

## Phase 12: Organisms - Overlays拡張

**依存**: Phase 10 完了後

### Authentication系

- [x] TwoFactorModal（2FA設定モーダル）

### Billing/Payment系

- [x] AddCardModal（カード追加モーダル）
- [x] AddPaymentModal（支払い方法追加モーダル）
- [x] ManageCardsModal（カード管理モーダル）
- [x] UpgradeModal（アップグレードモーダル）

### DateAndTime系

- [x] SnoozeModal（スヌーズ設定モーダル）
- [x] ScheduleModal（スケジュール設定モーダル）
- [x] RecurrenceModal（繰り返し設定モーダル）

### DataManagement系

- [x] ExportModal（エクスポートモーダル）
- [x] ImportModal（インポートモーダル）

### E-Commerce系

- [x] ProductDetailModal（商品詳細モーダル）
- [x] SizeGuideModal（サイズガイドモーダル）
- [x] ViewLookModal（コーディネート表示モーダル）

### Feedback系

- [x] ConfirmModal（確認モーダル - Delete, Cancel）
- [x] ReviewModal（レビューモーダル）

### General系

- [x] StatusModal（ステータス設定モーダル）
- [x] TagsModal（タグ管理モーダル）
- [x] KeyboardShortcutsModal（ショートカット一覧モーダル）
- [x] InvoiceModal（請求書表示モーダル）
- [x] LocationModal（位置選択モーダル）

### ShareAndInvite系

- [x] InviteModal（招待モーダル）
- [x] ShareModal（共有モーダル）

### Filter系

- [x] FilterDrawer（フィルターサイドバー）
- [x] FilterModal（フィルターモーダル）

### Drawers拡張

- [x] ActivityDrawer（アクティビティドロワー）
- [x] ChatUserDetailsDrawer（チャット詳細ドロワー）
- [x] FilesInfoDrawer（ファイル情報ドロワー）
- [x] TaskDetailsDrawer（タスク詳細ドロワー）
- [x] UserDetailsDrawer（ユーザー詳細ドロワー）

### EditForm系

- [x] EditUserModal（ユーザー編集モーダル）
- [x] EditEventModal（イベント編集モーダル）
- [x] CreateProjectModal（プロジェクト作成モーダル）

### Compose系

- [x] ComposeModal（メッセージ作成モーダル）

### Settings系

- [x] SettingsModal（設定モーダル - タブ付き）

### Storybook

- [x] 各Overlayのstoriesファイル

---

## Phase 13: Organisms - Cards

**依存**: Phase 10 完了後

### Contacts

- [x] ContactCard（連絡先カード）

### DataSnippets

- [x] ProjectSummaryCard（プロジェクトサマリーカード）
- [x] FollowUsCard（SNSリンクカード）
- [x] FileSnippet（ファイルスニペット）

### FilesAndFolders

- [x] FolderCard（フォルダカード）
- [x] PreviewFileCard（ファイルプレビューカード）

### ImportAndExportData

- [x] ImportExportCard（インポート/エクスポートカード）

### Integrations

- [x] IntegrationCard（連携サービスカード）

### LocationAndAddress

- [x] AddressCard（住所カード）
- [x] StoreContactCard（店舗連絡先カード）

### MiniCards

- [x] CreditsCard（クレジット残量カード）
- [x] HelpResourcesCard（ヘルプリソースカード）
- [x] IntroVideoCard（紹介動画カード）
- [x] TrialCard（トライアル残日数カード）
- [x] UpgradeProCard（アップグレード促進カード）
- [x] GiftCard（ギフトカード）※追加実装

### ProjectDetails

- [x] ProjectDetailsCard（プロジェクト詳細カード）

### Projects

- [x] FileCard（ファイルカード - Grid, List, MultiImages）
- [x] ProjectCard（プロジェクトカード）
- [x] TeamCard（チームカード）
- [x] UserHeroCard（ユーザーヒーローカード）

### BrandingFeaturedCards

- [x] AppDownloadCard（アプリダウンロードカード）

### InlineCards

- [x] InviteFriendsCard（友人招待カード）
- [x] FeaturePreviewCard（機能プレビューカード）

### MasonryLayout

- [x] MasonryGrid（メイソンリーグリッド）

### Storybook

- [x] 各Cardのstoriesファイル

---

## Phase 14: Organisms - E-Commerce拡張

**依存**: Phase 11-13 完了後

### CheckoutForms

- [x] CheckoutForm（チェックアウトフォーム - Guest, LoggedIn）※Phase 6で実装済
- [x] OrderConfirmation（注文確認画面）
- [x] OrderSummary（注文サマリー）※Phase 6で実装済
- [x] ReviewAndPay（確認・支払い画面）
- [x] ShoppingBag（ショッピングバッグ）
- [x] ShopCheckout（ショップチェックアウト）※CheckoutFormで対応

### E-CommerceGalleries

- [x] ProductGallery（商品ギャラリー - Grid, HorizontalSlider, VerticalSlider）※Phase 7で実装済
- [x] ImageTextPair（画像テキストペア）

### E-CommerceGalleryCategories

- [x] CategoryGrid（カテゴリグリッド）
- [x] CategorySlider（カテゴリスライダー）
- [x] CategoryCircular（円形カテゴリナビ）
- [x] CategoryPill（ピル型カテゴリ）

### E-CommerceOrderDetails

- [x] OrderStatusCard（注文ステータスカード）
- [x] ExchangeReturnCard（交換・返品カード）

### E-CommerceProductDetails

- [x] ProductDetails（商品詳細 - Gallery, Marketplace, Shop, StickySidebar）

### E-CommerceProductListings

- [x] ProductListing（商品リスト - Marketplace, Mini, Shop）
- [x] ProductListingGrid（商品グリッド）
- [x] ProductListingSlider（商品スライダー）
- [x] CompleteTheLook（コーディネート提案）

### Storybook

- [x] 各E-Commerceコンポーネントのstoriesファイル

---

## Phase 15: Organisms - DataVisualization

**依存**: Phase 10 完了後

### DataCards

- [x] BlockStatsCard（ブロック統計カード）
- [x] BrowsersCard（ブラウザ統計カード）
- [x] ListBarCard（リストバーカード）
- [x] ProgressbarsCard（プログレスバーカード）
- [x] ProjectCostsCard（プロジェクトコストカード）
- [x] SegmentedProgressCard（セグメントプログレスカード）
- [x] StackedProgressCard（スタックプログレスカード）
- [x] SalesStatsCard（売上統計カード）
- [x] SurveyDataCard（アンケートデータカード）
- [x] TieredStatsCard（階層統計カード）
- [x] TimeSheetCard（タイムシートカード）
- [x] TopCardWithProgress（トップカード）
- [x] TopCountriesCard（上位国ランキングカード）
- [x] TrafficCard（トラフィックカード）

### Stats

- [x] ChatReportsStats（チャットレポート統計）
- [x] InboxContactsStats（連絡先統計）
- [x] InboxReportsStats（受信箱統計）
- [x] BrandSalesStats（ブランド売上統計）
- [x] ProjectReportsStats（プロジェクトレポート統計）
- [x] AnimatedStats（ホバーアニメーション統計）
- [x] AvatarGroupStats（アバターグループ統計）
- [x] IconStats（アイコン統計）

### Storybook

- [ ] 各DataVisualizationコンポーネントのstoriesファイル

---

## Phase 16: Organisms - InboxChatMessages

**依存**: Phase 10 完了後

### ChatBubbles

- [x] MessageBubble（メッセージバブル - Text, Image, File, Voice, Link）

### ChatThreads

- [x] InboxThread（メールスレッド表示）
- [x] ComposeThread（メッセージ作成フォーム）

### ChatWidgets

- [x] ChatWidget（チャットウィジェット - Welcome, Messages, Conversation, Help）

### Layouts

- [x] ChatLayout（チャットレイアウト）
- [x] InboxLayout（インボックスレイアウト）
- [x] TicketsLayout（チケット管理レイアウト）
- [x] ReportsLayout（レポートレイアウト）
- [x] CRMLayout（CRMレイアウト）

### Storybook

- [x] 各InboxChatMessagesコンポーネントのstoriesファイル

---

## Phase 17: Organisms - ドメイン特化追加

**依存**: Phase 11-16 完了後

### Finance

- [x] BalanceCard（残高表示カード）
- [x] TransactionList（取引履歴リスト）
- [x] PaymentCard（支払いカード）
- [x] TransferForm（送金フォーム）
- [x] AccountCard（口座カード）
- [x] ReceiptTimeline（レシートタイムライン）
- [x] CurrencySelect（通貨選択）

### CalendarAndScheduling

- [x] FullCalendar（フルカレンダー - Day/Week/Month/Yearビュー切り替え）
  - 対応: DayViewFullCalendar, WeekViewFullCalendar, MonthViewFullCalendar, YearViewFullCalendar
- [x] MiniCalendar（ミニカレンダー - 単月、年間表示）
  - 対応: SingleCalendarMonth, YearlyCalendarMonth
- [x] CalendarEventSidebar（イベント作成/編集サイドバー）
  - 対応: CalendarCreateEventSidebar, CalendarEditEventSidebar
- [x] ScheduleWidget（スケジュールウィジェット - リスト表示、予約カード）
  - 対応: CalendarWithListGroupAndModals, ListingBooking, VideoCallUserSchedule

### KanbanBoards

- [x] KanbanBoard（カンバンボード）
- [x] KanbanColumn（カンバンカラム）
- [x] KanbanCard（カンバンカード）
- [x] KanbanHeader（カンバンヘッダー）

### SearchAndCommandPalettes

- [x] CommandPalette（コマンドパレット）
- [x] SearchModal（検索モーダル）
- [x] SearchResults（検索結果）
- [x] RecentSearches（最近の検索）
- [x] SearchSuggestions（検索候補）

### VideoAndAudio

- [x] VideoPlayer（ビデオプレイヤー）
- [x] AudioPlayer（オーディオプレイヤー）
- [x] VideoCall（ビデオ通話UI）
- [x] MediaControls（メディアコントロール）

### Feedback

- [x] FeedbackForm（フィードバックフォーム）
- [x] RatingForm（評価フォーム）
- [x] NPSSurvey（NPSアンケート）

### Storybook

- [x] 各ドメイン特化コンポーネントのstoriesファイル

---

## Phase 18: Tables拡張

**依存**: Phase 10 完了後

### コンポーネント

- [x] DataTable（データテーブル - Sortable, Filterable, Selectable）
- [x] ProjectsTable（プロジェクトテーブル）
- [x] UsersTable（ユーザーテーブル）
- [x] InvoicesTable（請求書テーブル）
- [x] OrdersTable（注文テーブル）
- [x] TransactionsTable（取引テーブル）
- [x] FilesTable（ファイルテーブル）
- [x] ExpandableTable（展開可能テーブル）
- [x] StickyTable（スティッキーヘッダーテーブル）
- [x] CompactTable（コンパクトテーブル）

### Storybook

- [x] 各Tableのstoriesファイル

---

## Phase 19: Headers/Sidebars拡張

**依存**: Phase 10 完了後

### Headers拡張

- [x] ApplicationNavbar（アプリケーションナビゲーションバー）
- [x] MarketplaceHeader（マーケットプレイスヘッダー）
- [x] DashboardHeader（ダッシュボードヘッダー）
- [x] ECommerceHeader（ECサイトヘッダー）
- [x] BlogHeader（ブログヘッダー）
- [x] DocsHeader（ドキュメントヘッダー）
- [x] MobileHeader（モバイルヘッダー）
- [x] StickyHeader（スティッキーヘッダー）

### Sidebars拡張

- [x] DashboardSidebar（ダッシュボードサイドバー）
- [x] DetachedSidebar（分離型サイドバー）
- [x] CollapsibleSidebar（折りたたみサイドバー）
- [x] IconSidebar（アイコンサイドバー）
- [x] DoubleSidebar（ダブルサイドバー）
- [x] FilterSidebar（フィルターサイドバー）
- [x] SettingsSidebar（設定サイドバー）

### Storybook

- [x] 各Header/Sidebarのstoriesファイル

---

## Phase 20: Pages拡張

**依存**: Phase 11-19 完了後

### コンポーネント

- [x] AuthPage拡張（2FA対応）
- [x] DashboardPage拡張
- [x] ProfilePage（プロフィールページ）
- [x] SettingsPage（設定ページ）
- [x] NotFoundPage（404ページ）
- [x] ErrorPage（エラーページ）
- [x] MaintenancePage（メンテナンスページ）
- [x] ComingSoonPage（準備中ページ）
- [x] PricingPage（料金ページ）
- [x] ContactPage（お問い合わせページ）
- [x] BlogListPage（ブログ一覧ページ）
- [x] BlogPostPage（ブログ記事ページ）
- [x] ProductPage（商品ページ）
- [x] CheckoutPage（チェックアウトページ）

### Storybook

- [x] 各Pageのstoriesファイル

---

## Phase 21: Marketing拡張

**依存**: Phase 10 完了後

### コンポーネント

- [x] HeroSection拡張（既存実装で対応済み）
- [x] FeatureSection拡張（既存実装で対応済み）
- [x] CTASection（CTAセクション）
- [x] TestimonialSection拡張（既存実装で対応済み）
- [x] PricingSection（料金セクション）
- [x] FAQSection（FAQセクション）
- [x] TeamSection（チーム紹介セクション）
- [x] StatsSection（統計セクション）
- [x] LogoCloudSection（ロゴクラウドセクション）
- [x] NewsletterSection（ニュースレターセクション）

### Storybook

- [x] 各Marketingコンポーネントのstoriesファイル

---

## Phase 22: ギャップ補完（追加実装）

**依存**: Phase 21 完了後
**目標**: ギャップ分析で特定された未カバーコンポーネントの実装

### 22.1 Forms - 入力グループ拡張

- [x] CheckboxGroup（チェックボックスグループ - List, Card, Table, MultiColumn）
- [x] RadioGroup（ラジオボタングループ - List, Card, Inline, Button）
- [x] SectionFilterBar（セクションフィルターバー）

### 22.2 PageSections - 追加

- [x] ListGroup（リストグループ - Basic, Bordered, Hoverable, WithIcons）
- [x] ImageGallery（画像ギャラリー）
- [x] InvoicePreview（請求書プレビュー）

### 22.3 Marketing - 追加

- [x] IconSection（アイコン付き機能紹介セクション）
- [x] CareersSection（採用情報セクション）
- [x] ContentSection（コンテンツセクション）
- [x] ClientLogoCloud（クライアントロゴ一覧）

### 22.4 Headers - 追加

- [x] ApplicationToolbar（アプリケーションツールバー）
- [x] StackedHeader（スタック型ヘッダー - Multi-row）

### 22.5 Sidebars/Layouts - 追加

- [x] MultiColumnLayout（マルチカラムレイアウト）

### 22.6 Finance - 追加

- [x] PaymentGradientCard（グラデーションクレジットカード表示）
- [x] PricingPlans（料金プラン比較 - CompareTable, PlanBilling, FAQ付き）
- [x] TransactionDetails（取引詳細 - 送金確認、レシート、支払いリクエスト）

### 22.7 CalendarAndScheduling - 統合済み

**注**: Phase 17のCalendarAndSchedulingセクションで11サンプル全体をカバー済み
- FullCalendar（4サンプル）
- MiniCalendar（2サンプル）
- CalendarEventSidebar（2サンプル）
- ScheduleWidget（3サンプル）

### 22.8 VideoAndAudio - 追加

- [x] VoiceMessage（音声メッセージ - 再生済み、未再生、CRM用）
- [x] VideoCallSettings（ビデオ通話設定パネル）

### 22.9 Footer - 追加

- [x] MarketplaceFooter（マーケットプレイス向けフッター）
- [x] ShopFooter（ECショップ向けフッター）
- [x] StartupFooter（スタートアップ向けフッター）
- [x] StackedFooter（スタック型フッター）

### 22.10 Pages/Authentication - 追加

- [x] LockScreenPage（ロック画面）
- [x] TwoStepVerificationPage（2段階認証ページ）
- [x] EmailVerificationPage（メール認証確認ページ）
- [x] OnboardingPlansPage（オンボーディング：プラン選択）
- [x] OnboardingSyncContactsPage（オンボーディング：連絡先同期）
- [x] OnboardingRolePage（オンボーディング：役割選択）
- [x] OnboardingProjectPage（オンボーディング：プロジェクト作成）
- [x] CheckOrderPage（注文確認ページ - ゲスト）
- [x] OrderCheckupPage（注文追跡ページ - タブ切り替え）
- [x] GuestCheckoutPage（ゲストチェックアウト選択ページ）
- [x] CreateAccountPage（アカウント作成ページ - 詳細フォーム）
- [x] ForgotPasswordCenteredPage（パスワードリセット - センター配置）
- [x] LoginCenteredPage（ログインページ - センター配置）

### 22.11 Pages/Article - 追加

- [x] CareersDetailPage（求人詳細ページ）
- [x] CaseStudyPage（ケーススタディページ）
- [x] CustomerStoryPage（顧客事例ページ）

### 22.12 SearchAndCommandPalettes - 追加

- [x] SidebarSearch（サイドバー検索 - チャットユーザー検索）

### Storybook

- [x] Phase 22 各コンポーネントのstoriesファイル

---

## 改訂版進捗サマリー

| Phase | 内容 | タスク数 | 完了 | 進捗 |
|-------|------|---------|------|------|
| 1-8 | 既存計画 | 60 | 60 | 100% |
| 9 | Atoms追加 | 6 | 6 | 100% |
| 10 | Molecules追加 | 19 | 19 | 100% |
| 11 | PageSections | 18 | 18 | 100% |
| 12 | Overlays拡張 | 36 | 36 | 100% |
| 13 | Cards | 26 | 26 | 100% |
| 14 | E-Commerce拡張 | 21 | 21 | 100% |
| 15 | DataVisualization | 23 | 22 | 96% |
| 16 | InboxChatMessages | 10 | 10 | 100% |
| 17 | ドメイン特化追加 | 31 | 31 | 100% |
| 18 | Tables拡張 | 11 | 11 | 100% |
| 19 | Headers/Sidebars拡張 | 16 | 16 | 100% |
| 20 | Pages拡張 | 15 | 15 | 100% |
| 21 | Marketing拡張 | 11 | 11 | 100% |
| **22** | **ギャップ補完** | **44** | **44** | **100%** |
| **合計** | | **347** | **347** | **100%** |

---

## ギャップ分析による追加コンポーネント一覧

Phase 22で追加される主要コンポーネント（53個）の概要：

| カテゴリ | 追加コンポーネント数 | 対応サンプル数 |
|---------|-------------------|--------------|
| Forms（入力グループ） | 3 | 51 |
| PageSections | 3 | 13 |
| Marketing | 4 | 14 |
| Headers | 2 | 10 |
| Sidebars/Layouts | 1 | 5 |
| Finance | 3 | 10 |
| CalendarAndScheduling | 0 | 0 | ※Phase 17に統合済み
| VideoAndAudio | 2 | 4 |
| Footer | 4 | 5 |
| Pages/Authentication | 13 | 13 |
| Pages/Article | 3 | 3 |
| SearchAndCommandPalettes | 1 | 1 |
| **合計** | **41コンポーネント** | **134サンプル** |

**注**: Phase 22の実装により、720サンプル全体のカバレッジが約85%から100%に改善

---

## Phase 23: Select コンポーネント実装拡張

**依存**: Phase 22 完了後
**目標**: `src/examples/UIControls/Selects/` の17種類のSelectバリエーションを完全サポート

### 23.1 基盤整備

- [ ] lib/variants/select.ts 新規作成（selectTriggerVariants, selectOptionVariants）
- [ ] SelectOption インターフェース拡張（icon, avatar, description, color追加）

### 23.2 Select コンポーネント拡張

- [ ] `size` prop 追加（xs, sm, md, lg）
- [ ] `variant` prop 追加（default, inline, minimal, tag）
- [ ] `icon` 表示サポート追加（オプション内アイコン表示）
- [ ] `avatar` 表示サポート追加（オプション内アバター表示）
- [ ] `description` 表示サポート追加（オプション内説明テキスト）
- [ ] `color` インジケーター表示サポート追加（ステータスカラー）
- [ ] `renderOption` prop 追加（カスタムオプション描画）
- [ ] `renderValue` prop 追加（カスタムトリガー表示）
- [ ] `searchable` prop 追加（ComboBox機能の統合オプション）

### 23.3 新規コンポーネント

- [ ] MultiSelect（複数選択セレクト - TagsSelect, ThreadsTagSelect対応）
- [ ] InlineSelect（インラインラベル付きセレクト - InlineWithLabelSelect, WithinInputSelect対応）

### 23.4 Storybook

- [ ] Select.stories.tsx 拡張（新規バリエーション追加）
- [ ] MultiSelect.stories.tsx 新規作成
- [ ] InlineSelect.stories.tsx 新規作成

### 対応サンプルマッピング

| サンプル | 対応方法 |
|---------|---------|
| SimpleSelect | Select（既存） |
| TimeSelect | Select（既存） |
| SearchInsideDropdown | ComboBox（既存） |
| MiniSelect | Select + `size="sm"` |
| ViewSelect | Select + `variant="minimal"` |
| WithIconsSelect | Select + `icon` in option |
| CurrencySelect | Select + `icon` in option |
| SimpleStyleCurrencySelect | Select + `icon` + `variant="minimal"` |
| CustomTemplateWithAvatarSelect | Select + `renderOption` |
| AssigneeSelect | MultiSelect + `avatar` |
| StatusSelect | Select + `color` indicator |
| InlineWithLabelSelect | InlineSelect |
| ItemListWithDescriptionSelect | Select + `description` |
| TagsSelect | MultiSelect |
| TagStyleSelect | MultiSelect + `tagStyle="pill"` |
| ThreadsTagSelect | MultiSelect + specialized style |
| WithinInputSelect | InlineSelect + input integration |

---

## 進捗サマリー（Phase 23 含む）

| Phase | 内容 | タスク数 | 完了 | 進捗 |
|-------|------|---------|------|------|
| 1-22 | 既存計画 | 347 | 347 | 100% |
| **23** | **Select拡張** | **16** | **0** | **0%** |
| **合計** | | **363** | **347** | **96%** |
