# Components

## Atoms

- Avatar: ユーザーアイコン (src, size, status)
- Badge: ラベル/ステータス (variant, size)
- Button: ボタン (variant, size, leftIcon, rightIcon)
- Checkbox: チェックボックス (checked, onChange)
- Icon: アイコン (name, size)
- Image: 画像 (src, alt, aspectRatio)
- Input: テキスト入力 (type, placeholder, error)
- Kbd: キーボードショートカット
- Label: フォームラベル (htmlFor, required)
- Link: リンク (href, variant, external)
- ProgressBar: 進捗バー (value, max, variant)
- Radio: ラジオボタン (checked, name, value)
- Separator: 区切り線 (orientation)
- Skeleton: ローディングプレースホルダー
- Spinner: ローディング (size)
- Switch: トグルスイッチ (checked, onChange)
- Textarea: 複数行入力 (rows, placeholder)
- Tooltip: ツールチップ (content, position)

## Molecules

- Accordion: 開閉パネル
- Alert: アラートバナー (variant, title)
- AvatarGroup: アバター群 (avatars, max)
- Breadcrumb: パンくずリスト (items)
- ButtonGroup: ボタングループ
- CheckboxGroup: チェックボックス群 (options, value)
- ColorPicker: カラー選択 (InlineColorPicker)
- ComboBox: 検索可能セレクト (options, searchable)
- DatePicker: 日付選択
- DateRangePicker: 日付範囲選択
- Dropdown: ドロップダウンメニュー
- EmptyState: 空状態表示 (NoData, NoFiles, NoResults, NoUsers)
- FileItem: ファイル項目 (name, type, size)
- FormField: ラベル+入力+エラー (label, error, required)
- IconButton: アイコンボタン (icon, variant)
- InlineSelect: インラインセレクト (軽量なセレクト)
- Menu: メニュー (MenuItem, SubMenu, ContextMenu)
- MultiSelect: 複数選択セレクト (options, value)
- Pagination: ページネーション (currentPage, totalPages)
- Popover: ポップオーバー
- RadioGroup: ラジオボタン群 (options, value)
- RangeSlider: スライダー (min, max, value)
- Rating: 星評価 (value, max)
- SearchInput: 検索入力 (onSearch, shortcut)
- SectionFilterBar: フィルターバー
- Select: セレクトボックス (options, value)
- SidebarSearch: サイドバー検索
- StatCard: 統計カード (label, value, icon, trend)
- Stepper: ステップインジケーター (steps, currentStep)
- Tabs: タブ (items, activeTab)
- TagInput: タグ入力 (tags, onAdd, onRemove)
- TimePicker: 時刻選択
- Toast: トースト通知 (toast(), variant)
- TrendIndicator: トレンド表示 (value, direction)

## Organisms

### Layout

- Header: ヘッダー (HeaderLogo, HeaderNav, HeaderActions)
- Sidebar: サイドバー (SidebarItem, SidebarGroup)
- Footer: フッター (MarketplaceFooter, ShopFooter, StartupFooter)
- Modal: モーダル (ModalHeader, ModalBody, ModalFooter)
- Drawer: ドロワー (DrawerHeader, DrawerBody)
- PageLayout: ページレイアウト (PageHeader, PageContent)
- MultiColumnLayout: マルチカラム (TwoColumn, ThreeColumn, HolyGrail)
- HeadersExtension: ヘッダー拡張 (ApplicationNavbar, DashboardHeader, etc.)
- SidebarsExtension: サイドバー拡張 (CollapsibleSidebar, DoubleSidebar, etc.)

### DataDisplay

- Card: カード (CardHeader, CardBody, CardFooter)
- Table: テーブル (ソート, 選択, ページネーション)
- DataTable: 高機能テーブル (フィルター対応)
- CompactTable: コンパクトテーブル
- ExpandableTable: 展開可能テーブル
- StickyTable: スティッキーテーブル
- StatCardGroup: 統計カード群
- FileList: ファイルリスト
- ListGroup: リストグループ
- ImageGallery: 画像ギャラリー (Thumbnail, Carousel, Lightbox)
- MasonryGrid: メイソンリー (ImageMasonry, CardMasonry)
- DataCard: データカード

### Forms

- Form: フォーム (FormHeader, FormSection, FormActions)
- FilterForm: フィルターフォーム
- FileUpload: ファイルアップロード
- FeedbackForms: フィードバック (RatingForm, NPSSurvey)
- CheckoutForm: チェックアウトフォーム

### Overlays

- ConfirmModal: 確認 (DeleteConfirmModal)
- InviteModal: 招待
- ShareModal: 共有
- SettingsModal: 設定
- StatusModal: ステータス設定
- TwoFactorModal: 2FA設定
- PaymentModals: 支払い (AddCardModal, UpgradeModal)
- DataModals: データ操作 (ExportModal, ImportModal)
- DateTimeModals: 日時 (SnoozeModal, ScheduleModal)
- ECommerceModals: EC (ProductDetailModal, SizeGuideModal)
- EditFormModals: 編集 (EditUserModal, CreateProjectModal)
- GeneralModals: 汎用 (InvoiceModal, KeyboardShortcutsModal)
- ReviewModal: レビュー
- TagsModal: タグ管理
- FilterDrawer: フィルタードロワー
- FilterModal: フィルターモーダル
- DetailDrawers: 詳細 (UserDetailsDrawer, TaskDetailsDrawer)
- ComposeModals: メッセージ作成

### Cards

- AddressCard: 住所
- AppDownloadCard: アプリダウンロード
- ContactCard: 連絡先 (Grid, List)
- FeaturePreviewCard: 機能プレビュー
- FileCard: ファイル
- FileSnippet: ファイルスニペット
- FolderCard: フォルダ
- FollowUsCard: SNSリンク
- ImportExportCard: インポート/エクスポート
- IntegrationCard: 連携サービス
- InviteFriendsCard: 友人招待
- MiniCards: ミニ (CreditsCard, TrialCard, HelpResourcesCard)
- PreviewFileCard: ファイルプレビュー
- ProjectCard: プロジェクト
- ProjectDetailsCard: プロジェクト詳細
- ProjectSummaryCard: プロジェクトサマリー
- StoreContactCard: 店舗連絡先
- TeamCard: チーム
- TestimonialCard: 証言 (Grid, Carousel, Featured)
- UserHeroCard: ユーザーヒーロー

### PageSections

- ActivityFeed: アクティビティフィード
- Banner: バナー (Gift, News, Auth)
- CardNav: カードナビ
- DescriptionList: 定義リスト
- FloatingBanner: フローティングバナー
- KanbanGroupHeading: カラムヘッダー
- NotificationSettings: 通知設定
- OnboardingChecklist: オンボーディング
- QuickActionBar: アクションバー
- QuickActionCard: クイックアクション
- SectionNav: セクションナビ
- SetupFlow: セットアップフロー
- SuccessMessage: 成功メッセージ
- Timeline: タイムライン (Activity, History, Order)
- TitleBar: タイトルバー (Simple, Filterable, Tabbed)
- UserProfileCard: プロフィール (MiniProfileCard)

### E-Commerce

- CategoryCard: カテゴリ (Grid, Slider, Circular)
- CompleteTheLook: コーディネート提案
- ImageTextPair: 画像テキストペア
- OrderConfirmation: 注文確認
- OrderStatusCard: 注文ステータス
- ProductCard: 商品
- ProductDetails: 商品詳細
- ProductGallery: 商品ギャラリー
- ProductListing: 商品リスト (Grid, Slider)
- ReviewAndPay: 確認・支払い
- ShoppingBag: カート (MiniShoppingBag)

### DataVisualization

- AnimatedStats: アニメーション統計
- AvatarGroupStats: アバターグループ統計
- BlockStatsCard: ブロック統計
- BrowsersCard: ブラウザ統計
- IconStats: アイコン統計
- ListBarCard: リストバー
- ProgressbarsCard: プログレスバー群
- ProjectCostsCard: プロジェクトコスト
- ReportStats: レポート統計
- SalesStatsCard: 売上統計
- SegmentedProgressCard: セグメントプログレス
- StackedProgressCard: スタックプログレス
- SurveyDataCard: アンケートデータ
- TieredStatsCard: 階層統計
- TimeSheetCard: タイムシート
- TopCardWithProgress: トップカード
- TopCountriesCard: 上位国ランキング
- TrafficCard: トラフィック

### InboxChatMessages

- ChatLayout: チャットレイアウト
- ChatWidget: チャットウィジェット
- ComposeThread: メッセージ作成
- CRMLayout: CRM
- InboxLayout: インボックス (SplitInboxLayout)
- InboxThread: メールスレッド
- MessageBubble: メッセージバブル (MessageGroup, TypingIndicator)
- ReportsLayout: レポート
- TicketsLayout: チケット管理

### Finance

- FinanceBase: 基本金融コンポーネント
  - BalanceCard: 残高
  - TransactionList: 取引履歴
  - PaymentCard: 支払いカード
  - TransferForm: 送金フォーム
  - AccountCard: 口座
  - CurrencySelect: 通貨選択
  - ReceiptTimeline: レシート
  - PaymentGradientCard: グラデーションカード
  - PricingPlans: 料金プラン
  - TransactionDetails: 取引詳細
- FinanceExtension: 拡張金融コンポーネント

### Tables

- FilesTable: ファイル
- InvoicesTable: 請求書
- OrdersTable: 注文
- ProjectsTable: プロジェクト
- TransactionsTable: 取引
- UsersTable: ユーザー

### DomainSpecific

- CalendarScheduling: カレンダー/スケジュール
  - FullCalendar: フルカレンダー (Day/Week/Month/Year)
  - MiniCalendar: ミニカレンダー
  - CalendarEventSidebar: イベントサイドバー
  - ScheduleWidget: スケジュールウィジェット
  - TimeslotPicker: タイムスロット選択
- CommandPalette: コマンドパレット
- InvoicePreview: 請求書プレビュー
- KanbanBoard: カンバンボード
- MediaPlayer: メディア
  - VideoPlayer: ビデオプレイヤー
  - AudioPlayer: オーディオプレイヤー
  - VideoCall: ビデオ通話UI
  - MediaControls: メディアコントロール
  - VoiceMessage: 音声メッセージ

### Marketing

- CareersSection: 採用情報
- ClientLogoCloud: クライアントロゴ
- ContentSection: コンテンツ
- CTASection: CTA
- FAQSection: FAQ
- FeatureSection: 機能紹介
- HeroSection: ヒーロー
- IconSection: アイコン機能紹介
- LogoCloudSection: ロゴクラウド
- NewsletterSection: ニュースレター
- PricingSection: 料金
- PricingTable: 料金表 (PricingCard, ComparisonTable)
- StatsSection: 統計
- TeamSection: チーム紹介

## Pages

### 認証

- AuthPage: 認証 (ログイン/サインアップ)
- LoginCenteredPage: ログイン(中央配置)
- CreateAccountPage: アカウント作成
- ForgotPasswordCenteredPage: パスワード忘れ
- EmailVerificationPage: メール認証
- TwoStepVerificationPage: 2段階認証
- LockScreenPage: ロック画面

### オンボーディング

- OnboardingRolePage: 役割選択
- OnboardingProjectPage: プロジェクト設定
- OnboardingPlansPage: プラン選択
- OnboardingSyncContactsPage: 連絡先同期

### ダッシュボード

- DashboardPage: ダッシュボード
- ProfilePage: プロフィール
- SettingsPage: 設定

### コンテンツ

- ArticlePage: 記事
- BlogListPage: ブログ一覧
- BlogPostPage: ブログ記事
- CareersDetailPage: 採用詳細
- CaseStudyPage: ケーススタディ
- CustomerStoryPage: 顧客事例

### E-Commerce

- ProductPage: 商品
- CheckoutPage: チェックアウト
- CheckOrderPage: 注文確認
- GuestCheckoutPage: ゲストチェックアウト
- OrderCheckupPage: 注文状況確認

### その他

- PricingPage: 料金
- ContactPage: お問い合わせ
- ErrorPage: エラー
- NotFoundPage: 404
- MaintenancePage: メンテナンス
- ComingSoonPage: 準備中

## Icons (lib/icons)

AlertCircle, AlertTriangle, Archive, ArrowLeft, ArrowRight, BarChart, Bell, Bookmark, Briefcase, Building, Calendar, Check, CheckCheck, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock, Cloud, Code, Command, Copy, CreditCard, Database, Discord, DollarSign, Download, Edit, ExternalLink, Eye, EyeOff, Facebook, File, FileCode, FileText, Filter, Folder, Forward, Gift, GitHub, Globe, Grid, Grip, Hash, Heart, Home, Image, Info, Instagram, Layout, Link, LinkedIn, List, Lock, Mail, MapPin, Maximize, Megaphone, Menu, Message, MessageSquare, Mic, MicOff, Minus, MoreHorizontal, MoreVertical, Music, Package, Palette, Paperclip, Pause, Phone, PhoneOff, Play, Plus, Printer, Question, Quote, Refresh, Repeat, Reply, Rocket, Search, Send, Settings, Share, Shield, ShoppingBag, SkipBack, SkipForward, Smartphone, Smile, Spinner, Star, Store, Tag, ThumbsDown, ThumbsUp, Ticket, TikTok, Trash, TrendDown, TrendUp, TrendingDown, TrendingUp, Truck, Twitter, Upload, UploadCloud, User, UserPlus, Users, Video, VideoOff, Volume2, VolumeX, Wallet, X, XCircle, YouTube, Zap
