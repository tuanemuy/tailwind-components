// Re-export all organisms from subcategories
// Use namespace exports for categories with internal conflicts to avoid ambiguity
// Use direct exports for categories without conflicts

// =============================================================================
// Cards - Has conflicts: ProjectMember, SocialLink
// =============================================================================
export * as CardsAddressCard from "./Cards/AddressCard";
export * as CardsAppDownloadCard from "./Cards/AppDownloadCard";
export * as CardsContactCard from "./Cards/ContactCard";
export * as CardsFeaturePreviewCard from "./Cards/FeaturePreviewCard";
export * as CardsFileCard from "./Cards/FileCard";
export * as CardsFileSnippet from "./Cards/FileSnippet";
export * as CardsFolderCard from "./Cards/FolderCard";
export * as CardsFollowUsCard from "./Cards/FollowUsCard";
export * as CardsImportExportCard from "./Cards/ImportExportCard";
export * as CardsIntegrationCard from "./Cards/IntegrationCard";
export * as CardsInviteFriendsCard from "./Cards/InviteFriendsCard";
export * as CardsMiniCards from "./Cards/MiniCards";
export * as CardsPreviewFileCard from "./Cards/PreviewFileCard";
export * as CardsProjectCard from "./Cards/ProjectCard";
export * as CardsProjectDetailsCard from "./Cards/ProjectDetailsCard";
export * as CardsProjectSummaryCard from "./Cards/ProjectSummaryCard";
export * as CardsStoreContactCard from "./Cards/StoreContactCard";
export * as CardsTeamCard from "./Cards/TeamCard";
export * as CardsTestimonialCard from "./Cards/TestimonialCard";
export * as CardsUserHeroCard from "./Cards/UserHeroCard";

// =============================================================================
// DataDisplay - Direct exports (commonly used by pages)
// =============================================================================
export * from "./DataDisplay/Card";
export * from "./DataDisplay/StatCardGroup";
export * from "./DataDisplay/FileList";
export * from "./DataDisplay/ListGroup";
// ImageGallery has GalleryImage conflict with ProductGallery - use namespace
export * as ImageGalleryModule from "./DataDisplay/ImageGallery";
export * from "./DataDisplay/MasonryGrid";
export * from "./DataDisplay/DataCard";

// Table components have shared types (PaginationProps, SortState, SortDirection)
// Export Table directly for JSX usage, namespace others
export * from "./DataDisplay/Table";
export * as DataTableModule from "./DataDisplay/DataTable";
export * as CompactTableModule from "./DataDisplay/CompactTable";
export * as ExpandableTableModule from "./DataDisplay/ExpandableTable";
export * as StickyTableModule from "./DataDisplay/StickyTable";

// =============================================================================
// DataVisualization - ReportStats has ReportMetric conflict with ReportsLayout
// =============================================================================
export * from "./DataVisualization/AnimatedStats";
export * from "./DataVisualization/AvatarGroupStats";
export * from "./DataVisualization/BlockStatsCard";
export * from "./DataVisualization/BrowsersCard";
export * from "./DataVisualization/IconStats";
export * from "./DataVisualization/ListBarCard";
export * from "./DataVisualization/ProgressbarsCard";
export * from "./DataVisualization/ProjectCostsCard";
// ReportStats has ReportMetric conflict - use namespace
export * as ReportStatsModule from "./DataVisualization/ReportStats";
export * from "./DataVisualization/SalesStatsCard";
export * from "./DataVisualization/SegmentedProgressCard";
export * from "./DataVisualization/StackedProgressCard";
export * from "./DataVisualization/SurveyDataCard";
export * from "./DataVisualization/TieredStatsCard";
export * from "./DataVisualization/TimeSheetCard";
export * from "./DataVisualization/TopCardWithProgress";
export * from "./DataVisualization/TopCountriesCard";
export * from "./DataVisualization/TrafficCard";

// =============================================================================
// DomainSpecific - Has conflict: VoiceMessage (with MessageBubble)
// =============================================================================
export * from "./DomainSpecific/CalendarScheduling";
export * from "./DomainSpecific/CommandPalette";
export * from "./DomainSpecific/KanbanBoard";
// InvoicePreview has InvoiceData, InvoiceStatus conflicts
export * as InvoicePreviewModule from "./DomainSpecific/InvoicePreview";
// MediaPlayer has VoiceMessage conflict - rename it
export {
  VideoPlayer,
  type VideoPlayerProps,
  AudioPlayer,
  type AudioPlayerProps,
  VideoCall,
  type VideoCallParticipant,
  type VideoCallProps,
  MediaControls,
  type MediaControlsProps,
  VoiceMessage as MediaPlayerVoiceMessage,
  type VoiceMessageProps as MediaPlayerVoiceMessageProps,
  VideoCallSettings,
  type VideoDevice,
  type AudioDevice,
  type BackgroundOption,
  type VideoCallSettingsProps,
} from "./DomainSpecific/MediaPlayer";

// =============================================================================
// E-Commerce - Has conflicts: OrderItem, GalleryImage, ProductImage, ProductVariant, LookItem
// =============================================================================
export * as CategoryCardModule from "./E-Commerce/CategoryCard";
export * as CompleteTheLookModule from "./E-Commerce/CompleteTheLook";
export * as ImageTextPairModule from "./E-Commerce/ImageTextPair";
export * as OrderConfirmationModule from "./E-Commerce/OrderConfirmation";
export * as OrderStatusCardModule from "./E-Commerce/OrderStatusCard";
export * from "./E-Commerce/ProductCard";
export * as ProductDetailsModule from "./E-Commerce/ProductDetails";
// ProductGallery - directly export for JSX usage (GalleryImage from here takes priority)
export * from "./E-Commerce/ProductGallery";
// ProductListing - directly export for JSX usage
export * from "./E-Commerce/ProductListing";
export * as ReviewAndPayModule from "./E-Commerce/ReviewAndPay";
export * as ShoppingBagModule from "./E-Commerce/ShoppingBag";

// =============================================================================
// Finance - Has conflicts: Transaction, TransactionStatus, TransactionType
// =============================================================================
export * as FinanceBaseModule from "./Finance/FinanceBase";
export * as FinanceExtensionModule from "./Finance/FinanceExtension";

// =============================================================================
// Forms - Direct exports (commonly used)
// =============================================================================
export * from "./Forms/CheckoutForm";
export * from "./Forms/FeedbackForms";
export * from "./Forms/FileUpload";
export * from "./Forms/Form";
// FilterForm has FilterSection conflict with SidebarsExtension
export * as FilterFormModule from "./Forms/FilterForm";

// =============================================================================
// InboxChatMessages - Has conflict: VoiceMessage (interface, with MediaPlayer), ReportMetric
// =============================================================================
export * from "./InboxChatMessages/ChatLayout";
export * from "./InboxChatMessages/ChatWidget";
// ComposeThread has Recipient conflict
export * as ComposeThreadModule from "./InboxChatMessages/ComposeThread";
export * from "./InboxChatMessages/CRMLayout";
export * from "./InboxChatMessages/InboxLayout";
export * from "./InboxChatMessages/InboxThread";
// MessageBubble exports VoiceMessage interface (keep this one as the primary)
export * from "./InboxChatMessages/MessageBubble";
// ReportsLayout has ReportMetric conflict - use namespace
export * as ReportsLayoutModule from "./InboxChatMessages/ReportsLayout";
export * from "./InboxChatMessages/TicketsLayout";

// =============================================================================
// Layout - Direct exports (commonly used by pages)
// =============================================================================
export * from "./Layout/Drawer";
export * from "./Layout/Footer";
export * from "./Layout/Header";
export * from "./Layout/HeadersExtension";
export * from "./Layout/Modal";
export * from "./Layout/MultiColumnLayout";
export * from "./Layout/PageLayout";
export * from "./Layout/Sidebar";
// SidebarsExtension has FilterSection, FilterOption - exported directly (takes priority)
export * from "./Layout/SidebarsExtension";

// =============================================================================
// Marketing - Has conflicts: LogoGrid, LogoGridProps, LogoMarquee, LogoMarqueeProps, TeamMember
// =============================================================================
export * from "./Marketing/CareersSection";
// ClientLogoCloud has LogoGrid/LogoMarquee conflicts
export * as ClientLogoCloudModule from "./Marketing/ClientLogoCloud";
export * from "./Marketing/ContentSection";
export * from "./Marketing/CTASection";
export * from "./Marketing/FAQSection";
export * from "./Marketing/FeatureSection";
export * from "./Marketing/HeroSection";
export * from "./Marketing/IconSection";
// LogoCloudSection has LogoGrid/LogoMarquee conflicts
export * as LogoCloudSectionModule from "./Marketing/LogoCloudSection";
export * from "./Marketing/NewsletterSection";
export * from "./Marketing/PricingSection";
export * from "./Marketing/PricingTable";
export * from "./Marketing/StatsSection";
// TeamSection has TeamMember conflict
export * as TeamSectionModule from "./Marketing/TeamSection";

// =============================================================================
// Overlays - Has conflicts: ActivityItem, InvoiceItem, Recipient, ProductImage, ProductVariant, LookItem, FilterSection, FilterOption
// =============================================================================
export * as ComposeModalsModule from "./Overlays/ComposeModals";
export * from "./Overlays/ConfirmModal";
export * as DataModalsModule from "./Overlays/DataModals";
export * as DateTimeModalsModule from "./Overlays/DateTimeModals";
// DetailDrawers has ActivityItem conflict - use namespace
export * as DetailDrawersModule from "./Overlays/DetailDrawers";
// ECommerceModals has LookItem, ProductImage, ProductVariant conflicts
export * as ECommerceModalsModule from "./Overlays/ECommerceModals";
export * as EditFormModalsModule from "./Overlays/EditFormModals";
// FilterDrawer has FilterSection, FilterOption conflicts - use namespace
export * as FilterDrawerModule from "./Overlays/FilterDrawer";
// FilterModal has FilterSection, FilterOption conflicts
export * as FilterModalModule from "./Overlays/FilterModal";
// GeneralModals has InvoiceItem conflict
export * as GeneralModalsModule from "./Overlays/GeneralModals";
export * from "./Overlays/InviteModal";
export * as PaymentModalsModule from "./Overlays/PaymentModals";
export * from "./Overlays/ReviewModal";
export * from "./Overlays/SettingsModal";
export * from "./Overlays/ShareModal";
export * from "./Overlays/StatusModal";
export * from "./Overlays/TagsModal";
export * from "./Overlays/TwoFactorModal";

// =============================================================================
// PageSections - Has conflict: ActivityItem, KanbanColumn, KanbanColumnProps
// =============================================================================
// ActivityFeed - directly export (commonly used, ActivityItem from here takes priority)
export * from "./PageSections/ActivityFeed";
export * from "./PageSections/Banner";
export * from "./PageSections/CardNav";
export * from "./PageSections/DescriptionList";
export * from "./PageSections/FloatingBanner";
// KanbanGroupHeading has KanbanColumn conflicts
export * as KanbanGroupHeadingModule from "./PageSections/KanbanGroupHeading";
export * from "./PageSections/NotificationSettings";
export * from "./PageSections/OnboardingChecklist";
export * from "./PageSections/QuickActionBar";
export * from "./PageSections/QuickActionCard";
export * from "./PageSections/SectionNav";
export * from "./PageSections/SetupFlow";
export * from "./PageSections/SuccessMessage";
export * from "./PageSections/Timeline";
export * from "./PageSections/TitleBar";
export * from "./PageSections/UserProfileCard";

// =============================================================================
// Tables - Has conflicts: FileOwner, FileType, InvoiceStatus, InvoiceItem, OrderItem, ShippingAddress, OrderStatus, ProjectMember, ProjectStatus, Transaction, TransactionStatus, TransactionType
// =============================================================================
export * as FilesTableModule from "./Tables/FilesTable";
export * as InvoicesTableModule from "./Tables/InvoicesTable";
export * as OrdersTableModule from "./Tables/OrdersTable";
export * as ProjectsTableModule from "./Tables/ProjectsTable";
export * as TransactionsTableModule from "./Tables/TransactionsTable";
export * as UsersTableModule from "./Tables/UsersTable";
