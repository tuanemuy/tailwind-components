# Components

## Atoms
```
Avatar        - ユーザーアイコン (src, size, status)
Badge         - ラベル/ステータス (variant, size)
Button        - ボタン (variant, size, leftIcon, rightIcon)
Checkbox      - チェックボックス (checked, onChange)
Icon          - アイコン (name, size)
Image         - 画像 (src, alt, aspectRatio)
Input         - テキスト入力 (type, placeholder, error)
Kbd           - キーボードショートカット
Label         - フォームラベル (htmlFor, required)
Link          - リンク (href, variant, external)
ProgressBar   - 進捗バー (value, max, variant)
Radio         - ラジオボタン (checked, name, value)
Separator     - 区切り線 (orientation)
Skeleton      - ローディングプレースホルダー
Spinner       - ローディング (size)
Switch        - トグルスイッチ (checked, onChange)
Textarea      - 複数行入力 (rows, placeholder)
Tooltip       - ツールチップ (content, position)
```

## Molecules
```
Accordion        - 開閉パネル
Alert            - アラートバナー (variant, title)
AvatarGroup      - アバター群 (avatars, max)
Breadcrumb       - パンくずリスト (items)
ButtonGroup      - ボタングループ
CheckboxGroup    - チェックボックス群 (options, value)
ColorPicker      - カラー選択
ComboBox         - 検索可能セレクト (options, searchable)
DatePicker       - 日付選択
DateRangePicker  - 日付範囲選択
Dropdown         - ドロップダウンメニュー
EmptyState       - 空状態表示 (NoData, NoFiles, NoResults, NoUsers)
FileItem         - ファイル項目 (name, type, size)
FormField        - ラベル+入力+エラー (label, error, required)
IconButton       - アイコンボタン (icon, variant)
Menu             - メニュー (MenuItem, SubMenu, ContextMenu)
Pagination       - ページネーション (currentPage, totalPages)
Popover          - ポップオーバー
RadioGroup       - ラジオボタン群 (options, value)
RangeSlider      - スライダー (min, max, value)
Rating           - 星評価 (value, max)
SearchInput      - 検索入力 (onSearch, shortcut)
SectionFilterBar - フィルターバー
Select           - セレクトボックス (options, value)
SidebarSearch    - サイドバー検索
StatCard         - 統計カード (label, value, icon, trend)
Stepper          - ステップインジケーター (steps, currentStep)
Tabs             - タブ (items, activeTab)
TagInput         - タグ入力 (tags, onAdd, onRemove)
TimePicker       - 時刻選択
Toast            - トースト通知 (toast(), variant)
TrendIndicator   - トレンド表示 (value, direction)
```

## Organisms

### レイアウト
```
Header           - ヘッダー (HeaderLogo, HeaderNav, HeaderActions)
Sidebar          - サイドバー (SidebarItem, SidebarGroup)
Footer           - フッター (MarketplaceFooter, ShopFooter, StartupFooter)
Modal            - モーダル (ModalHeader, ModalBody, ModalFooter)
Drawer           - ドロワー (DrawerHeader, DrawerBody)
PageLayout       - ページレイアウト (PageHeader, PageContent)
MultiColumnLayout - マルチカラム (TwoColumn, ThreeColumn, HolyGrail)
```

### データ表示
```
Card             - カード (CardHeader, CardBody, CardFooter)
Table            - テーブル (ソート, 選択, ページネーション)
DataTable        - 高機能テーブル (フィルター対応)
StatCardGroup    - 統計カード群
Timeline         - タイムライン (Activity, History, Order)
ActivityFeed     - アクティビティフィード
DescriptionList  - 定義リスト
ListGroup        - リストグループ
```

### フォーム
```
Form             - フォーム (FormHeader, FormSection, FormActions)
FilterForm       - フィルターフォーム
FileUpload       - ファイルアップロード
FeedbackForms    - フィードバック (RatingForm, NPSSurvey)
```

### モーダル/ドロワー
```
ConfirmModal     - 確認 (DeleteConfirmModal)
InviteModal      - 招待
ShareModal       - 共有
SettingsModal    - 設定
StatusModal      - ステータス設定
TwoFactorModal   - 2FA設定
PaymentModals    - 支払い (AddCardModal, UpgradeModal)
DataModals       - データ操作 (ExportModal, ImportModal)
DateTimeModals   - 日時 (SnoozeModal, ScheduleModal)
ECommerceModals  - EC (ProductDetailModal, SizeGuideModal)
EditFormModals   - 編集 (EditUserModal, CreateProjectModal)
GeneralModals    - 汎用 (InvoiceModal, KeyboardShortcutsModal)
ReviewModal      - レビュー
TagsModal        - タグ管理
FilterDrawer     - フィルタードロワー
FilterModal      - フィルターモーダル
DetailDrawers    - 詳細 (UserDetailsDrawer, TaskDetailsDrawer)
ComposeModals    - メッセージ作成
```

### カード
```
ProductCard         - 商品
ContactCard         - 連絡先 (Grid, List)
ProjectCard         - プロジェクト
TeamCard            - チーム
FileCard            - ファイル
FolderCard          - フォルダ
AddressCard         - 住所
IntegrationCard     - 連携サービス
UserProfileCard     - プロフィール (MiniProfileCard)
UserHeroCard        - ユーザーヒーロー
ProjectDetailsCard  - プロジェクト詳細
ProjectSummaryCard  - プロジェクトサマリー
MiniCards           - ミニ (CreditsCard, TrialCard, HelpResourcesCard)
QuickActionCard     - クイックアクション
AppDownloadCard     - アプリダウンロード
FeaturePreviewCard  - 機能プレビュー
InviteFriendsCard   - 友人招待
StoreContactCard    - 店舗連絡先
PreviewFileCard     - ファイルプレビュー
FileSnippet         - ファイルスニペット
FollowUsCard        - SNSリンク
ImportExportCard    - インポート/エクスポート
TestimonialCard     - 証言 (Grid, Carousel, Featured)
DataCard            - データカード
```

### ナビゲーション
```
CardNav          - カードナビ
SectionNav       - セクションナビ
TitleBar         - タイトルバー (Simple, Filterable, Tabbed)
QuickActionBar   - アクションバー
Banner           - バナー (Gift, News, Auth)
FloatingBanner   - フローティングバナー
```

### E-Commerce
```
ProductGallery    - 商品ギャラリー
ProductDetails    - 商品詳細
ProductListing    - 商品リスト (Grid, Slider)
CategoryCard      - カテゴリ (Grid, Slider, Circular)
CheckoutForm      - チェックアウト
ShoppingBag       - カート (MiniShoppingBag)
OrderStatusCard   - 注文ステータス
OrderConfirmation - 注文確認
ReviewAndPay      - 確認・支払い
CompleteTheLook   - コーディネート提案
ImageTextPair     - 画像テキストペア
PricingTable      - 料金表 (PricingCard, ComparisonTable)
```

### データ可視化
```
BlockStatsCard       - ブロック統計
BrowsersCard         - ブラウザ統計
ListBarCard          - リストバー
ProgressbarsCard     - プログレスバー群
ProjectCostsCard     - プロジェクトコスト
SegmentedProgressCard - セグメントプログレス
StackedProgressCard  - スタックプログレス
SalesStatsCard       - 売上統計
SurveyDataCard       - アンケートデータ
TieredStatsCard      - 階層統計
TimeSheetCard        - タイムシート
TopCardWithProgress  - トップカード
TopCountriesCard     - 上位国ランキング
TrafficCard          - トラフィック
AnimatedStats        - アニメーション統計
AvatarGroupStats     - アバターグループ統計
IconStats            - アイコン統計
ReportStats          - レポート統計
```

### チャット/メッセージ
```
MessageBubble    - メッセージバブル (MessageGroup, TypingIndicator)
ChatWidget       - チャットウィジェット
ChatLayout       - チャットレイアウト
InboxLayout      - インボックス (SplitInboxLayout)
InboxThread      - メールスレッド
ComposeThread    - メッセージ作成
TicketsLayout    - チケット管理
ReportsLayout    - レポート
CRMLayout        - CRM
```

### カレンダー/スケジュール
```
FullCalendar         - フルカレンダー (Day/Week/Month/Year)
MiniCalendar         - ミニカレンダー
CalendarEventSidebar - イベントサイドバー
ScheduleWidget       - スケジュールウィジェット
TimeslotPicker       - タイムスロット選択
```

### カンバン
```
KanbanBoard        - カンバンボード
KanbanGroupHeading - カラムヘッダー
```

### 検索/コマンド
```
CommandPalette    - コマンドパレット
SearchModal       - 検索モーダル
SearchResults     - 検索結果
SearchSuggestions - 検索候補
RecentSearches    - 最近の検索
```

### メディア
```
VideoPlayer    - ビデオプレイヤー
AudioPlayer    - オーディオプレイヤー
VideoCall      - ビデオ通話UI
MediaControls  - メディアコントロール
VoiceMessage   - 音声メッセージ
```

### 金融
```
BalanceCard          - 残高
TransactionList      - 取引履歴
PaymentCard          - 支払いカード
TransferForm         - 送金フォーム
AccountCard          - 口座
CurrencySelect       - 通貨選択
ReceiptTimeline      - レシート
PaymentGradientCard  - グラデーションカード
PricingPlans         - 料金プラン
TransactionDetails   - 取引詳細
```

### テーブル拡張
```
CompactTable      - コンパクト
ExpandableTable   - 展開可能
StickyTable       - スティッキー
ProjectsTable     - プロジェクト
UsersTable        - ユーザー
InvoicesTable     - 請求書
OrdersTable       - 注文
TransactionsTable - 取引
FilesTable        - ファイル
```

### ヘッダー拡張
```
ApplicationNavbar  - アプリナビバー
ApplicationToolbar - ツールバー
MarketplaceHeader  - マーケットプレイス
DashboardHeader    - ダッシュボード
ECommerceHeader    - EC
BlogHeader         - ブログ
DocsHeader         - ドキュメント
MobileHeader       - モバイル
StickyHeader       - スティッキー
StackedHeader      - スタック型
```

### サイドバー拡張
```
DashboardSidebar   - ダッシュボード
CollapsibleSidebar - 折りたたみ
DetachedSidebar    - 分離型
IconSidebar        - アイコン
DoubleSidebar      - ダブル
FilterSidebar      - フィルター
SettingsSidebar    - 設定
```

### マーケティングセクション
```
HeroSection        - ヒーロー
FeatureSection     - 機能紹介
CTASection         - CTA
PricingSection     - 料金
FAQSection         - FAQ
TeamSection        - チーム紹介
StatsSection       - 統計
LogoCloudSection   - ロゴクラウド
NewsletterSection  - ニュースレター
IconSection        - アイコン機能紹介
CareersSection     - 採用情報
ContentSection     - コンテンツ
ClientLogoCloud    - クライアントロゴ
```

### ギャラリー
```
MasonryGrid   - メイソンリー (ImageMasonry, CardMasonry)
ImageGallery  - 画像ギャラリー (Thumbnail, Carousel, Lightbox)
```

### セットアップ
```
SetupFlow            - セットアップフロー
OnboardingChecklist  - オンボーディング
NotificationSettings - 通知設定
SuccessMessage       - 成功メッセージ
```

### その他
```
InvoicePreview - 請求書プレビュー
FileList       - ファイルリスト
```

## Pages
```
AuthPage            - 認証 (ログイン/サインアップ)
DashboardPage       - ダッシュボード
ProfilePage         - プロフィール
SettingsPage        - 設定
PricingPage         - 料金
ContactPage         - お問い合わせ
ProductPage         - 商品
CheckoutPage        - チェックアウト
ArticlePage         - 記事
BlogListPage        - ブログ一覧
BlogPostPage        - ブログ記事
ErrorPage           - エラー
NotFoundPage        - 404
MaintenancePage     - メンテナンス
ComingSoonPage      - 準備中
LoginCenteredPage   - ログイン(中央配置)
CreateAccountPage   - アカウント作成
ForgotPasswordCenteredPage - パスワード忘れ
EmailVerificationPage - メール認証
TwoStepVerificationPage - 2段階認証
LockScreenPage      - ロック画面
OnboardingRolePage  - 役割選択
OnboardingProjectPage - プロジェクト設定
OnboardingPlansPage - プラン選択
OnboardingSyncContactsPage - 連絡先同期
CheckOrderPage      - 注文確認
GuestCheckoutPage   - ゲストチェックアウト
OrderCheckupPage    - 注文状況確認
CareersDetailPage   - 採用詳細
CaseStudyPage       - ケーススタディ
CustomerStoryPage   - 顧客事例
```

## Icons (lib/icons)
AlertCircle, AlertTriangle, Archive, ArrowLeft, ArrowRight, BarChart, Bell, Bookmark, Briefcase, Building, Calendar, Check, CheckCheck, CheckCircle, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock, Cloud, Code, Command, Copy, CreditCard, Database, Discord, DollarSign, Download, Edit, ExternalLink, Eye, EyeOff, Facebook, File, FileCode, FileText, Filter, Folder, Forward, Gift, GitHub, Globe, Grid, Grip, Hash, Heart, Home, Image, Info, Instagram, Layout, Link, LinkedIn, List, Lock, Mail, MapPin, Maximize, Megaphone, Menu, Message, MessageSquare, Mic, MicOff, Minus, MoreHorizontal, MoreVertical, Music, Package, Palette, Paperclip, Pause, Phone, PhoneOff, Play, Plus, Printer, Question, Quote, Refresh, Repeat, Reply, Rocket, Search, Send, Settings, Share, Shield, ShoppingBag, SkipBack, SkipForward, Smartphone, Smile, Spinner, Star, Store, Tag, ThumbsDown, ThumbsUp, Ticket, TikTok, Trash, TrendDown, TrendUp, TrendingDown, TrendingUp, Truck, Twitter, Upload, UploadCloud, User, UserPlus, Users, Video, VideoOff, Volume2, VolumeX, Wallet, X, XCircle, YouTube, Zap
