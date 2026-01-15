// Card
export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImage,
} from "./Card";
export type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  CardImageProps,
} from "./Card";

// StatCardGroup
export { StatCardGroup } from "./StatCardGroup";
export type { StatCardGroupProps, StatCardGroupItem } from "./StatCardGroup";

// Table
export { Table } from "./Table";
export type {
  TableProps,
  TableColumn,
  SortState,
  SortDirection,
  PaginationProps,
} from "./Table";

// FileList
export { FileList } from "./FileList";
export type { FileListProps, FileListItem } from "./FileList";

// DataCard
export { DataCard, DataCardList, DataCardMini } from "./DataCard";
export type {
  DataCardProps,
  DataCardListProps,
  DataCardListItem,
  DataCardMiniProps,
} from "./DataCard";

// Modal
export {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "./Modal";
export type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalCloseButtonProps,
} from "./Modal";

// Drawer
export {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
} from "./Drawer";
export type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerCloseButtonProps,
} from "./Drawer";

// Header
export {
  Header,
  HeaderNav,
  HeaderNavItem,
  HeaderLogo,
  HeaderActions,
} from "./Header";
export type {
  HeaderProps,
  HeaderNavProps,
  HeaderNavItemProps,
  HeaderLogoProps,
  HeaderActionsProps,
} from "./Header";

// Sidebar
export {
  Sidebar,
  SidebarSection,
  SidebarItem,
  SidebarGroup,
  SidebarToggle,
  SidebarLogo,
} from "./Sidebar";
export type {
  SidebarProps,
  SidebarSectionProps,
  SidebarItemProps,
  SidebarGroupProps,
  SidebarToggleProps,
  SidebarLogoProps,
} from "./Sidebar";

// Footer
export {
  Footer,
  FooterSection,
  FooterLink,
  FooterLogo,
  FooterSocialLink,
  FooterGrid,
  FooterDivider,
} from "./Footer";
export type {
  FooterProps,
  FooterSectionProps,
  FooterLinkProps,
  FooterLogoProps,
  FooterSocialLinkProps,
  FooterGridProps,
  FooterDividerProps,
} from "./Footer";

// PageLayout
export {
  PageLayout,
  PageContent,
  PageHeader,
  PageSection,
} from "./PageLayout";
export type {
  PageLayoutProps,
  PageContentProps,
  PageHeaderProps,
  PageSectionProps,
} from "./PageLayout";

// Form
export {
  Form,
  FormHeader,
  FormBody,
  FormSection,
  FormRow,
  FormActions,
  FormDivider,
  SubmitButton,
  useFormContext,
} from "./Form";
export type {
  FormProps,
  FormHeaderProps,
  FormBodyProps,
  FormSectionProps,
  FormRowProps,
  FormActionsProps,
  FormDividerProps,
  SubmitButtonProps,
} from "./Form";

// FilterForm
export {
  FilterForm,
  FilterHeader,
  FilterBody,
  FilterSection,
  FilterGroup,
  FilterChip,
  FilterChipGroup,
  FilterActions,
  DateRangeFilter,
  PriceRangeFilter,
  useFilterContext,
} from "./FilterForm";
export type {
  FilterFormProps,
  FilterHeaderProps,
  FilterBodyProps,
  FilterSectionProps,
  FilterGroupProps,
  FilterChipProps,
  FilterChipGroupProps,
  FilterActionsProps,
  DateRangeFilterProps,
  PriceRangeFilterProps,
} from "./FilterForm";

// FileUpload
export { FileUpload, FileUploadPreview } from "./FileUpload";
export type {
  FileUploadProps,
  FileUploadPreviewProps,
  UploadFile,
} from "./FileUpload";

// CheckoutForm
export {
  CheckoutForm,
  CheckoutSection,
  ShippingForm,
  PaymentMethodOption,
  CreditCardForm,
  OrderSummary,
  CouponInput,
  ShippingMethodOption,
  useCheckoutContext,
} from "./CheckoutForm";
export type {
  CheckoutFormProps,
  CheckoutSectionProps,
  ShippingFormProps,
  PaymentMethodOptionProps,
  CreditCardFormProps,
  OrderSummaryProps,
  OrderItem,
  CouponInputProps,
  ShippingMethodOptionProps,
} from "./CheckoutForm";

// ProductCard
export {
  ProductCard,
  ProductCardImage,
  ProductCardBody,
  ProductCardTitle,
  ProductCardCategory,
  ProductCardRating,
  ProductCardPrice,
  ProductCardActions,
  ProductAddToCartButton,
} from "./ProductCard";
export type {
  ProductCardProps,
  ProductCardImageProps,
  ProductCardBodyProps,
  ProductCardTitleProps,
  ProductCardCategoryProps,
  ProductCardRatingProps,
  ProductCardPriceProps,
  ProductCardActionsProps,
  ProductAddToCartButtonProps,
  ProductBadgeType,
  ProductBadge,
  ProductRating,
  ProductPrice,
} from "./ProductCard";

// ProductGallery
export {
  ProductGallery,
  ProductGalleryThumbnails,
  ProductGalleryDots,
} from "./ProductGallery";
export type {
  ProductGalleryProps,
  ProductGalleryThumbnailsProps,
  ProductGalleryDotsProps,
  GalleryImage,
} from "./ProductGallery";

// PricingTable
export {
  PricingTable,
  PricingCard,
  PricingComparisonTable,
  PricingToggle,
  PricingHeader,
} from "./PricingTable";
export type {
  PricingTableProps,
  PricingCardProps,
  PricingComparisonTableProps,
  PricingToggleProps,
  PricingHeaderProps,
  PricingPlan,
  PricingFeature,
} from "./PricingTable";

// HeroSection
export {
  HeroSection,
  HeroContent,
  HeroBadge,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  HeroImage,
  HeroSplit,
  HeroStats,
  HeroTrustedBy,
} from "./HeroSection";
export type {
  HeroSectionProps,
  HeroContentProps,
  HeroBadgeProps,
  HeroTitleProps,
  HeroSubtitleProps,
  HeroActionsProps,
  HeroImageProps,
  HeroSplitProps,
  HeroStatsProps,
  HeroStat,
  HeroTrustedByProps,
} from "./HeroSection";

// FeatureSection
export {
  FeatureSection,
  FeatureSectionHeader,
  FeatureSectionTitle,
  FeatureSectionSubtitle,
  FeatureGrid,
  FeatureCard,
  FeatureCardIcon,
  FeatureCardContent,
  FeatureCardTitle,
  FeatureCardDescription,
  FeatureCardLink,
  FeatureList,
  FeatureListItem,
  FeatureListContent,
  FeatureListImage,
} from "./FeatureSection";
export type {
  FeatureSectionProps,
  FeatureSectionHeaderProps,
  FeatureSectionTitleProps,
  FeatureSectionSubtitleProps,
  FeatureGridProps,
  FeatureCardProps,
  FeatureCardIconProps,
  FeatureCardContentProps,
  FeatureCardTitleProps,
  FeatureCardDescriptionProps,
  FeatureCardLinkProps,
  FeatureListProps,
  FeatureListItemProps,
  FeatureListContentProps,
  FeatureListImageProps,
  Feature,
} from "./FeatureSection";

// TestimonialCard
export {
  TestimonialCard,
  TestimonialQuote,
  TestimonialContent,
  TestimonialRating,
  TestimonialAuthor,
  TestimonialAuthorAvatar,
  TestimonialAuthorInfo,
  TestimonialAuthorName,
  TestimonialAuthorTitle,
  TestimonialSection,
  TestimonialSectionHeader,
  TestimonialSectionTitle,
  TestimonialSectionSubtitle,
  TestimonialGrid,
  TestimonialCarousel,
  TestimonialCarouselItem,
  TestimonialFeatured,
} from "./TestimonialCard";
export type {
  TestimonialCardProps,
  TestimonialQuoteProps,
  TestimonialContentProps,
  TestimonialRatingProps,
  TestimonialAuthorProps,
  TestimonialAuthorAvatarProps,
  TestimonialAuthorInfoProps,
  TestimonialAuthorNameProps,
  TestimonialAuthorTitleProps,
  TestimonialSectionProps,
  TestimonialSectionHeaderProps,
  TestimonialSectionTitleProps,
  TestimonialSectionSubtitleProps,
  TestimonialGridProps,
  TestimonialCarouselProps,
  TestimonialCarouselItemProps,
  TestimonialFeaturedProps,
  Testimonial,
} from "./TestimonialCard";

// Banner
export {
  Banner,
  GiftBanner,
  AuthBanner,
  NewsBanner,
} from "./Banner";
export type {
  BannerProps,
  GiftBannerProps,
  AuthBannerProps,
  NewsBannerProps,
} from "./Banner";

// FloatingBanner
export {
  FloatingBanner,
  RateUsBanner,
  FeedbackBanner,
  QuickActionsBanner,
  CookieConsentBanner,
} from "./FloatingBanner";
export type {
  FloatingBannerProps,
  RateUsBannerProps,
  FeedbackBannerProps,
  QuickActionsBannerProps,
  CookieConsentBannerProps,
} from "./FloatingBanner";

// DescriptionList
export {
  DescriptionList,
  DescriptionListItem,
  HorizontalDescriptionList,
  CardDescriptionList,
} from "./DescriptionList";
export type {
  DescriptionListProps,
  DescriptionListItemProps,
  HorizontalDescriptionListProps,
  CardDescriptionListProps,
} from "./DescriptionList";

// UserProfileCard
export {
  UserProfileCard,
  MiniProfileCard,
} from "./UserProfileCard";
export type {
  UserProfileCardProps,
  MiniProfileCardProps,
} from "./UserProfileCard";

// SectionNav
export {
  SectionNav,
  SectionNavItem,
  SectionNavLink,
  VerticalSectionNav,
} from "./SectionNav";
export type {
  SectionNavProps,
  SectionNavItemProps,
  SectionNavLinkProps,
  VerticalSectionNavProps,
} from "./SectionNav";

// CardNav
export {
  CardNav,
  CardNavItem,
  CardNavLink,
  HorizontalCardNav,
  FeatureSelection,
} from "./CardNav";
export type {
  CardNavProps,
  CardNavItemProps,
  CardNavLinkProps,
  HorizontalCardNavProps,
  FeatureSelectionProps,
} from "./CardNav";

// Timeline
export {
  Timeline,
  TimelineItemComponent,
  TimelineDot,
  ActivityTimeline,
  OrderTimeline,
  HistoryTimeline,
} from "./Timeline";
export type {
  TimelineProps,
  TimelineItem,
  TimelineDotProps,
  ActivityTimelineProps,
  OrderTimelineProps,
  HistoryTimelineProps,
} from "./Timeline";

// ActivityFeed
export {
  ActivityFeed,
  ActivityFeedItem,
  CompactActivityFeed,
  GroupedActivityFeed,
  NotificationActivity,
} from "./ActivityFeed";
export type {
  ActivityFeedProps,
  ActivityItem,
  CompactActivityFeedProps,
  GroupedActivityFeedProps,
  NotificationActivityProps,
} from "./ActivityFeed";

// TitleBar
export {
  TitleBar,
  SimpleTitleBar,
  TabbedTitleBar,
  FilterableTitleBar,
  StatusTitleBar,
} from "./TitleBar";
export type {
  TitleBarProps,
  SimpleTitleBarProps,
  TabbedTitleBarProps,
  FilterableTitleBarProps,
  StatusTitleBarProps,
} from "./TitleBar";

// KanbanGroupHeading
export {
  KanbanGroupHeading,
  MinimalKanbanHeading,
  DraggableKanbanHeading,
  KanbanColumn,
} from "./KanbanGroupHeading";
export type {
  KanbanGroupHeadingProps,
  MinimalKanbanHeadingProps,
  DraggableKanbanHeadingProps,
  KanbanColumnProps,
} from "./KanbanGroupHeading";

// QuickActionCard
export {
  QuickActionCard,
  QuickActionGrid,
  MiniQuickActionCard,
  QuickActionList,
} from "./QuickActionCard";
export type {
  QuickActionCardProps,
  QuickActionGridProps,
  MiniQuickActionCardProps,
  QuickActionListProps,
} from "./QuickActionCard";

// QuickActionBar
export {
  QuickActionBar,
  SelectionActionBar,
  ContextActionBar,
} from "./QuickActionBar";
export type {
  QuickActionBarProps,
  QuickActionBarAction,
  SelectionActionBarProps,
  ContextActionBarProps,
} from "./QuickActionBar";

// SetupFlow
export {
  SetupFlow,
  SetupFlowStep,
  SetupFlowIndicator,
  SetupProgress,
} from "./SetupFlow";
export type {
  SetupFlowProps,
  SetupStep,
  SetupProgressProps,
} from "./SetupFlow";

// OnboardingChecklist
export {
  OnboardingChecklist,
  CompactChecklist,
  ExpandableChecklist,
  GamifiedChecklist,
} from "./OnboardingChecklist";
export type {
  OnboardingChecklistProps,
  OnboardingChecklistItem,
  CompactChecklistProps,
  ExpandableChecklistProps,
  GamifiedChecklistProps,
} from "./OnboardingChecklist";

// SuccessMessage
export {
  SuccessMessage,
  InlineSuccessMessage,
  ConfirmationMessage,
  EmptyStateMessage,
  ProcessingMessage,
} from "./SuccessMessage";
export type {
  SuccessMessageProps,
  InlineSuccessMessageProps,
  ConfirmationMessageProps,
  EmptyStateMessageProps,
  ProcessingMessageProps,
} from "./SuccessMessage";

// NotificationSettings
export {
  NotificationSettings,
  GroupedNotificationSettings,
  NotificationToggleCard,
  EmailDigestSettings,
  NotificationPreferencesPanel,
} from "./NotificationSettings";
export type {
  NotificationSettingsProps,
  NotificationSetting,
  NotificationGroup,
  GroupedNotificationSettingsProps,
  NotificationToggleCardProps,
  EmailDigestSettingsProps,
  NotificationPreferencesPanelProps,
} from "./NotificationSettings";

// ConfirmModal
export {
  ConfirmModal,
  DeleteConfirmModal,
  CancelConfirmModal,
} from "./ConfirmModal";
export type { ConfirmModalProps } from "./ConfirmModal";

// ReviewModal
export { ReviewModal, ProductReviewModal } from "./ReviewModal";
export type { ReviewModalProps, ProductReviewModalProps } from "./ReviewModal";

// StatusModal
export {
  StatusModal,
  AvailabilityStatusModal,
  TaskStatusModal,
} from "./StatusModal";
export type {
  StatusModalProps,
  StatusOption,
  AvailabilityStatusModalProps,
  TaskStatusModalProps,
} from "./StatusModal";

// TagsModal
export { TagsModal, tagColors } from "./TagsModal";
export type { TagsModalProps, TagItem } from "./TagsModal";

// ShareModal
export { ShareModal } from "./ShareModal";
export type { ShareModalProps, ShareAccess } from "./ShareModal";

// InviteModal
export { InviteModal, TeamInviteModal } from "./InviteModal";
export type {
  InviteModalProps,
  InviteRole,
  InvitedUser,
  TeamInviteModalProps,
} from "./InviteModal";

// FilterDrawer
export { FilterDrawer, ActiveFilters } from "./FilterDrawer";
export type {
  FilterDrawerProps,
  FilterSection as FilterDrawerSection,
  FilterOption as FilterDrawerOption,
  FilterValues,
  ActiveFiltersProps,
} from "./FilterDrawer";

// FilterModal
export { FilterModal } from "./FilterModal";
export type { FilterModalProps } from "./FilterModal";

// TwoFactorModal
export { TwoFactorModal } from "./TwoFactorModal";
export type { TwoFactorModalProps, TwoFactorStep } from "./TwoFactorModal";

// PaymentModals
export {
  AddCardModal,
  ManageCardsModal,
  UpgradeModal,
  AddPaymentModal,
} from "./PaymentModals";
export type {
  AddCardModalProps,
  CardData,
  ManageCardsModalProps,
  SavedCard,
  UpgradeModalProps,
  Plan,
  PlanFeature,
  AddPaymentModalProps,
  PaymentMethodType,
  PaymentMethod,
} from "./PaymentModals";

// DateTimeModals
export { SnoozeModal, ScheduleModal, RecurrenceModal } from "./DateTimeModals";
export type {
  SnoozeModalProps,
  SnoozeOption,
  ScheduleModalProps,
  RecurrenceModalProps,
  RecurrenceFrequency,
  RecurrenceSettings,
} from "./DateTimeModals";

// DataModals
export { ExportModal, ImportModal } from "./DataModals";
export type {
  ExportModalProps,
  ExportFormat,
  ExportColumn,
  ImportModalProps,
  ImportResult,
  ImportError,
} from "./DataModals";

// ECommerceModals
export {
  ProductDetailModal,
  SizeGuideModal,
  ViewLookModal,
} from "./ECommerceModals";
export type {
  ProductDetailModalProps,
  ProductDetail,
  ProductVariant,
  ProductImage,
  SizeGuideModalProps,
  SizeChartRow,
  ViewLookModalProps,
  LookItem,
} from "./ECommerceModals";

// GeneralModals
export {
  KeyboardShortcutsModal,
  InvoiceModal,
  LocationModal,
} from "./GeneralModals";
export type {
  KeyboardShortcutsModalProps,
  ShortcutCategory,
  InvoiceModalProps,
  InvoiceData,
  InvoiceItem,
  LocationModalProps,
  LocationOption,
} from "./GeneralModals";

// DetailDrawers
export {
  ActivityDrawer,
  UserDetailsDrawer,
  ChatUserDetailsDrawer,
  FilesInfoDrawer,
  TaskDetailsDrawer,
} from "./DetailDrawers";
export type {
  ActivityDrawerProps,
  ActivityItem as DrawerActivityItem,
  UserDetailsDrawerProps,
  UserInfo,
  ChatUserDetailsDrawerProps,
  ChatUserInfo,
  FilesInfoDrawerProps,
  FileInfo,
  TaskDetailsDrawerProps,
  TaskInfo,
  TaskPriority,
  TaskStatus,
  TaskComment,
} from "./DetailDrawers";

// EditFormModals
export {
  EditUserModal,
  EditEventModal,
  CreateProjectModal,
} from "./EditFormModals";
export type {
  EditUserModalProps,
  UserFormData,
  EditEventModalProps,
  EventFormData,
  CreateProjectModalProps,
  ProjectFormData,
} from "./EditFormModals";

// ComposeModals
export { ComposeModal } from "./ComposeModals";
export type {
  ComposeModalProps,
  ComposeData,
  Recipient,
  Attachment,
} from "./ComposeModals";

// SettingsModal
export { SettingsModal } from "./SettingsModal";
export type {
  SettingsModalProps,
  SettingItem,
  SettingSection,
} from "./SettingsModal";

// ============================================
// Phase 13: Cards
// ============================================

// ContactCard
export { ContactCard, ContactCardGrid, ContactCardList } from "./ContactCard";
export type {
  ContactCardProps,
  Contact,
  ContactCardGridProps,
  ContactCardListProps,
} from "./ContactCard";

// ProjectSummaryCard
export {
  ProjectSummaryCard,
  ProjectSummaryGrid,
} from "./ProjectSummaryCard";
export type {
  ProjectSummaryCardProps,
  ProjectSummary,
  ProjectMember,
  ProjectStatus,
  ProjectSummaryGridProps,
} from "./ProjectSummaryCard";

// FollowUsCard
export { FollowUsCard } from "./FollowUsCard";
export type { FollowUsCardProps, SocialLink } from "./FollowUsCard";

// FileSnippet
export { FileSnippet, FileSnippetList, FileSnippetGrid } from "./FileSnippet";
export type {
  FileSnippetProps,
  FileSnippetData,
  FileType as FileSnippetType,
  FileSnippetListProps,
  FileSnippetGridProps,
} from "./FileSnippet";

// FolderCard
export { FolderCard, FolderCardGrid, FolderCardList } from "./FolderCard";
export type {
  FolderCardProps,
  FolderData,
  FolderCardGridProps,
  FolderCardListProps,
} from "./FolderCard";

// PreviewFileCard
export { PreviewFileCard, PreviewFileCardGrid } from "./PreviewFileCard";
export type {
  PreviewFileCardProps,
  PreviewFileData,
  PreviewFileType,
  PreviewFileOwner,
  PreviewFileCardGridProps,
} from "./PreviewFileCard";

// ImportExportCard
export { ImportExportCard } from "./ImportExportCard";
export type {
  ImportExportCardProps,
  ExportFormat as ImportExportFormat,
  ExportOption,
} from "./ImportExportCard";

// IntegrationCard
export {
  IntegrationCard,
  IntegrationCardGrid,
  IntegrationCardList,
} from "./IntegrationCard";
export type {
  IntegrationCardProps,
  IntegrationData,
  IntegrationStatus,
  IntegrationCardGridProps,
  IntegrationCardListProps,
} from "./IntegrationCard";

// AddressCard
export { AddressCard, AddressCardList } from "./AddressCard";
export type {
  AddressCardProps,
  AddressData,
  AddressType,
  AddressCardListProps,
} from "./AddressCard";

// StoreContactCard
export { StoreContactCard, StoreContactList } from "./StoreContactCard";
export type {
  StoreContactCardProps,
  StoreContactData,
  BusinessHours,
  StoreContactListProps,
} from "./StoreContactCard";

// MiniCards
export {
  CreditsCard,
  HelpResourcesCard,
  IntroVideoCard,
  TrialCard,
  UpgradeProCard,
  GiftCard,
} from "./MiniCards";
export type {
  CreditsCardProps,
  HelpResourcesCardProps,
  HelpResource,
  IntroVideoCardProps,
  TrialCardProps,
  UpgradeProCardProps,
  GiftCardProps,
} from "./MiniCards";

// ProjectDetailsCard
export {
  ProjectDetailsCard,
  ProjectDetailsGrid,
  ProjectDetailsList,
} from "./ProjectDetailsCard";
export type {
  ProjectDetailsCardProps,
  ProjectDetails,
  ProjectDetailStatus,
  ProjectMember as ProjectDetailsMember,
  ProjectTask,
  ProjectDetailsGridProps,
  ProjectDetailsListProps,
} from "./ProjectDetailsCard";

// FileCard
export { FileCard, FileCardGrid, FileCardList } from "./FileCard";
export type {
  FileCardProps,
  FileCardData,
  FileCardType,
  FileCardGridProps,
  FileCardListProps,
} from "./FileCard";

// ProjectCard
export { ProjectCard, ProjectCardGrid, ProjectCardList } from "./ProjectCard";
export type {
  ProjectCardProps,
  ProjectCardData,
  ProjectCardMember,
  ProjectCardGridProps,
  ProjectCardListProps,
} from "./ProjectCard";

// TeamCard
export { TeamCard, TeamCardGrid, TeamCardList } from "./TeamCard";
export type {
  TeamCardProps,
  TeamCardData,
  TeamMember,
  TeamCardGridProps,
  TeamCardListProps,
} from "./TeamCard";

// UserHeroCard
export { UserHeroCard } from "./UserHeroCard";
export type {
  UserHeroCardProps,
  UserHeroData,
  SocialLink as UserSocialLink,
} from "./UserHeroCard";

// AppDownloadCard
export { AppDownloadCard } from "./AppDownloadCard";
export type { AppDownloadCardProps } from "./AppDownloadCard";

// InviteFriendsCard
export { InviteFriendsCard } from "./InviteFriendsCard";
export type {
  InviteFriendsCardProps,
  InviteReward,
} from "./InviteFriendsCard";

// FeaturePreviewCard
export { FeaturePreviewCard, FeaturePreviewGrid } from "./FeaturePreviewCard";
export type {
  FeaturePreviewCardProps,
  FeaturePreviewData,
  FeaturePreviewGridProps,
} from "./FeaturePreviewCard";

// MasonryGrid
export {
  MasonryGrid,
  MasonryItem,
  ImageMasonry,
  CardMasonry,
} from "./MasonryGrid";
export type {
  MasonryGridProps,
  MasonryItemProps,
  ImageMasonryProps,
  CardMasonryProps,
  CardMasonryItem,
} from "./MasonryGrid";

// ============================================
// Phase 14: E-Commerce Extension
// ============================================

// ShoppingBag
export { ShoppingBag, MiniShoppingBag } from "./ShoppingBag";
export type {
  ShoppingBagProps,
  ShoppingBagItem,
  MiniShoppingBagProps,
} from "./ShoppingBag";

// OrderConfirmation
export {
  OrderConfirmation,
  SimpleOrderConfirmation,
} from "./OrderConfirmation";
export type {
  OrderConfirmationProps,
  OrderItem as OrderConfirmationItem,
  ShippingAddress as OrderShippingInfo,
  SimpleOrderConfirmationProps,
} from "./OrderConfirmation";

// ReviewAndPay
export { ReviewAndPay } from "./ReviewAndPay";
export type {
  ReviewAndPayProps,
  OrderItem as ReviewOrderItem,
  ShippingInfo,
  PaymentInfo,
  ShippingMethod,
} from "./ReviewAndPay";

// CategoryCard
export {
  CategoryCard,
  CategoryGrid,
  CategoryCircular,
  CategoryPill,
  CategorySlider,
} from "./CategoryCard";
export type {
  CategoryCardProps,
  CategoryData,
  CategoryGridProps,
  CategoryCircularProps,
  CategoryPillProps,
  CategorySliderProps,
} from "./CategoryCard";

// OrderStatusCard
export { OrderStatusCard, ExchangeReturnCard } from "./OrderStatusCard";
export type {
  OrderStatusCardProps,
  OrderStatusStep,
  OrderItem as OrderStatusItem,
  OrderStatus,
  ExchangeReturnCardProps,
  ExchangeItem,
} from "./OrderStatusCard";

// ImageTextPair
export { ImageTextPair, ImageTextPairGrid } from "./ImageTextPair";
export type {
  ImageTextPairProps,
  ImageTextPairGridProps,
} from "./ImageTextPair";

// ProductDetails
export { ProductDetails } from "./ProductDetails";
export type {
  ProductDetailsProps,
  ProductVariant as ProductDetailsVariant,
  ProductImage as ProductDetailsImage,
} from "./ProductDetails";

// ProductListing
export {
  ProductListing,
  ProductListingSlider,
  ProductListingGrid,
} from "./ProductListing";
export type {
  ProductListingProps,
  ProductListingItem,
  ProductListingSliderProps,
  ProductListingGridProps,
} from "./ProductListing";

// CompleteTheLook
export { CompleteTheLook, ShopTheLook } from "./CompleteTheLook";
export type {
  CompleteTheLookProps,
  LookItem as CompleteTheLookItem,
  ShopTheLookProps,
} from "./CompleteTheLook";

// ============================================
// Phase 15: DataVisualization
// ============================================

// BlockStatsCard
export {
  BlockStatsCard,
  BlockStatsGrid,
  MiniBlockStats,
} from "./BlockStatsCard";
export type {
  BlockStatsCardProps,
  BlockStatItem,
  BlockStatsGridProps,
  MiniBlockStatsProps,
} from "./BlockStatsCard";

// BrowsersCard
export { BrowsersCard, CompactBrowsersCard } from "./BrowsersCard";
export type {
  BrowsersCardProps,
  BrowserData,
  CompactBrowsersCardProps,
} from "./BrowsersCard";

// ListBarCard
export { ListBarCard, HorizontalListBarCard } from "./ListBarCard";
export type {
  ListBarCardProps,
  ListBarItem,
  HorizontalListBarCardProps,
} from "./ListBarCard";

// ProgressbarsCard
export {
  ProgressbarsCard,
  CircularProgressCard,
  CompactProgressList,
} from "./ProgressbarsCard";
export type {
  ProgressbarsCardProps,
  ProgressItem,
  CircularProgressCardProps,
  CircularProgressItem,
  CompactProgressListProps,
} from "./ProgressbarsCard";

// ProjectCostsCard
export {
  ProjectCostsCard,
  CategorizedCostsCard,
  BudgetVsActualCard,
} from "./ProjectCostsCard";
export type {
  ProjectCostsCardProps,
  CostItem,
  CategorizedCostsCardProps,
  CostCategory,
  BudgetVsActualCardProps,
  BudgetItem,
} from "./ProjectCostsCard";

// SegmentedProgressCard
export {
  SegmentedProgressCard,
  DonutSegmentedCard,
  CompactSegmentedCard,
} from "./SegmentedProgressCard";
export type {
  SegmentedProgressCardProps,
  SegmentData,
  DonutSegmentedCardProps,
  CompactSegmentedCardProps,
} from "./SegmentedProgressCard";

// StackedProgressCard
export {
  StackedProgressCard,
  HorizontalStackedCard,
  VerticalStackedCard,
} from "./StackedProgressCard";
export type {
  StackedProgressCardProps,
  StackedBarItem,
  StackedProgressItem,
  HorizontalStackedCardProps,
  StackedBarLegendItem,
  VerticalStackedCardProps,
} from "./StackedProgressCard";

// SalesStatsCard
export {
  SalesStatsCard,
  SalesLeaderboardCard,
  SalesComparisonCard,
} from "./SalesStatsCard";
export type {
  SalesStatsCardProps,
  SalesDataItem,
  SalesRepData,
  SalesLeaderboardCardProps,
  SalesPeriodData,
  SalesComparisonCardProps,
} from "./SalesStatsCard";

// SurveyDataCard
export {
  SurveyDataCard,
  MultiQuestionSurveyCard,
  NPSSurveyCard,
} from "./SurveyDataCard";
export type {
  SurveyDataCardProps,
  SurveyOption,
  MultiQuestionSurveyCardProps,
  SurveyQuestion,
  NPSSurveyCardProps,
} from "./SurveyDataCard";

// TieredStatsCard
export {
  TieredStatsCard,
  HierarchicalStatsCard,
  PyramidTierCard,
} from "./TieredStatsCard";
export type {
  TieredStatsCardProps,
  TierData,
  HierarchicalStatsCardProps,
  HierarchicalStatItem,
  PyramidTierCardProps,
} from "./TieredStatsCard";

// TimeSheetCard
export {
  TimeSheetCard,
  WeeklyTimeSheetCard,
  CompactTimesheetList,
} from "./TimeSheetCard";
export type {
  TimeSheetCardProps,
  TimeEntry,
  DailyTimesheet,
  WeeklyTimesheetData,
  WeeklyTimeSheetCardProps,
  CompactTimesheetListProps,
} from "./TimeSheetCard";

// TopCardWithProgress
export {
  TopCardWithProgress,
  TopPerformersCard,
  GoalProgressCard,
} from "./TopCardWithProgress";
export type {
  TopCardWithProgressProps,
  TopItemWithProgress,
  TopPerformersCardProps,
  TopPerformer,
  GoalProgressCardProps,
} from "./TopCardWithProgress";

// TopCountriesCard
export {
  TopCountriesCard,
  CountryMapCard,
  RegionBreakdownCard,
} from "./TopCountriesCard";
export type {
  TopCountriesCardProps,
  CountryData,
  CountryMapCardProps,
  RegionBreakdownCardProps,
  RegionData,
} from "./TopCountriesCard";

// TrafficCard
export {
  TrafficCard,
  TrafficOverviewCard,
  ReferrersCard,
  DeviceBreakdownCard,
} from "./TrafficCard";
export type {
  TrafficCardProps,
  TrafficSource,
  TrafficMetric,
  TrafficOverviewCardProps,
  ReferrersCardProps,
  ReferrerData,
  DeviceBreakdownCardProps,
  DeviceData,
} from "./TrafficCard";

// ReportStats
export {
  ChatReportsStats,
  InboxContactsStats,
  InboxReportsStats,
  BrandSalesStats,
  ProjectReportsStats,
  CompactReportStats,
} from "./ReportStats";
export type {
  ReportMetric,
  TimeSeriesData,
  ChatReportData,
  ChatReportsStatsProps,
  InboxContactsData,
  InboxContactsStatsProps,
  InboxReportsData,
  InboxReportsStatsProps,
  BrandSalesData,
  BrandSalesStatsProps,
  ProjectReportsData,
  ProjectReportsStatsProps,
  CompactReportStatsProps,
} from "./ReportStats";

// AnimatedStats
export {
  AnimatedStats,
  PulseAnimatedStats,
  CountUpStats,
  GlowAnimatedStats,
} from "./AnimatedStats";
export type {
  AnimatedStatsProps,
  AnimatedStatItem,
  PulseAnimatedStatsProps,
  CountUpStatsProps,
  GlowAnimatedStatsProps,
} from "./AnimatedStats";

// AvatarGroupStats
export {
  AvatarGroupStats,
  TeamStatsCard,
  ContributorsStatsCard,
  UserActivityStats,
} from "./AvatarGroupStats";
export type {
  AvatarGroupStatsProps,
  AvatarStatUser,
  AvatarGroupStatItem,
  TeamStatsCardProps,
  TeamStatData,
  ContributorsStatsCardProps,
  ContributorData,
  UserActivityStatsProps,
  UserActivityData,
} from "./AvatarGroupStats";

// IconStats
export {
  IconStats,
  IconStatsRow,
  CenteredIconStats,
  CompactIconStats,
  IconStatCard,
} from "./IconStats";
export type {
  IconStatsProps,
  IconStatItem,
  IconStatsRowProps,
  CenteredIconStatsProps,
  CompactIconStatsProps,
  IconStatCardProps,
} from "./IconStats";

// ============================================
// Phase 16: InboxChatMessages
// ============================================

// MessageBubble
export {
  MessageBubble,
  MessageGroup,
  TypingIndicator,
} from "./MessageBubble";
export type {
  MessageBubbleProps,
  MessageData,
  MessageType,
  MessageStatus,
  MessageSender,
  MessageGroupProps,
  TypingIndicatorProps,
} from "./MessageBubble";

// InboxThread
export {
  InboxThread,
  InboxThreadList,
  CompactInboxItem,
  InboxSidebar,
} from "./InboxThread";
export type {
  InboxThreadProps,
  EmailData,
  EmailAttachment,
  InboxThreadListProps,
  CompactInboxItemProps,
  InboxSidebarProps,
  InboxFolder,
} from "./InboxThread";

// ComposeThread
export { ComposeThread, EmailCompose } from "./ComposeThread";
export type {
  ComposeThreadProps,
  AttachmentFile,
  EmailComposeProps,
} from "./ComposeThread";

// ChatWidget
export { ChatWidget, ChatWidgetToggle } from "./ChatWidget";
export type {
  ChatWidgetProps,
  ChatWidgetView,
  ChatUser,
  Conversation,
  HelpArticle,
  ChatWidgetToggleProps,
} from "./ChatWidget";

// ChatLayout
export { ChatLayout } from "./ChatLayout";
export type {
  ChatLayoutProps,
  ChatContact,
  ChatRoom,
} from "./ChatLayout";

// InboxLayout
export { InboxLayout, SplitInboxLayout } from "./InboxLayout";
export type {
  InboxLayoutProps,
  InboxStats,
  SplitInboxLayoutProps,
} from "./InboxLayout";

// TicketsLayout
export { TicketsLayout, KanbanTicketsLayout } from "./TicketsLayout";
export type {
  TicketsLayoutProps,
  Ticket,
  TicketPriority,
  TicketStatus,
  TicketComment,
  KanbanTicketsLayoutProps,
} from "./TicketsLayout";

// ReportsLayout
export { ReportsLayout, QuickStatsCard } from "./ReportsLayout";
export type {
  ReportsLayoutProps,
  ReportMetric as ReportLayoutMetric,
  ReportCategory,
  ReportFilter,
  ReportChartData,
  TeamMember as ReportTeamMember,
  QuickStatsCardProps,
} from "./ReportsLayout";

// CRMLayout
export { CRMLayout } from "./CRMLayout";
export type {
  CRMLayoutProps,
  Customer,
  CustomerStatus,
  CustomerType,
  CustomerAddress,
  CustomerContact,
  CustomerTag,
  CustomerNote,
  CustomerActivity,
  CustomerOrder,
  CRMFilter,
} from "./CRMLayout";

// ============================================
// Phase 17: Domain Specific
// ============================================

// Finance
export {
  BalanceCard,
  TransactionList,
  PaymentCard,
  TransferForm,
  AccountCard,
  ReceiptTimeline,
  CurrencySelect,
} from "./Finance";
export type {
  BalanceCardProps,
  TransactionListProps,
  Transaction,
  TransactionType,
  TransactionStatus,
  PaymentCardProps,
  CardType,
  TransferFormProps,
  AccountCardProps,
  ReceiptTimelineProps,
  ReceiptItem,
  CurrencySelectProps,
  Currency,
} from "./Finance";

// CalendarScheduling
export {
  CalendarHeader,
  CalendarGrid,
  EventCard,
  ScheduleTimeline,
  TimeslotPicker,
} from "./CalendarScheduling";
export type {
  CalendarHeaderProps,
  CalendarGridProps,
  CalendarDay,
  CalendarEvent,
  EventCardProps,
  ScheduleTimelineProps,
  TimeSlot,
  ScheduleEvent,
  TimeslotPickerProps,
  Timeslot,
} from "./CalendarScheduling";

// KanbanBoard
export {
  KanbanBoard,
  KanbanColumn as KanbanBoardColumn,
  KanbanCard,
  KanbanHeader,
} from "./KanbanBoard";
export type {
  KanbanBoardProps,
  KanbanColumnProps as KanbanBoardColumnProps,
  KanbanCardProps,
  KanbanHeaderProps,
  KanbanPriority,
  KanbanColor,
  KanbanTag,
  KanbanMember,
  KanbanCardData,
  KanbanColumnData,
} from "./KanbanBoard";

// CommandPalette
export {
  CommandPalette,
  SearchModal,
  SearchResults,
  RecentSearches,
  SearchSuggestions,
} from "./CommandPalette";
export type {
  CommandPaletteProps,
  CommandAction,
  CommandGroup,
  SearchModalProps,
  SearchResultsProps,
  SearchResult,
  RecentSearchesProps,
  SearchSuggestionsProps,
  SearchSuggestion,
} from "./CommandPalette";

// MediaPlayer
export {
  VideoPlayer,
  AudioPlayer,
  VideoCall,
  MediaControls,
} from "./MediaPlayer";
export type {
  VideoPlayerProps,
  AudioPlayerProps,
  VideoCallProps,
  VideoCallParticipant,
  MediaControlsProps,
} from "./MediaPlayer";

// FeedbackForms
export {
  FeedbackForm,
  RatingForm,
  NPSSurvey,
  QuickFeedback,
} from "./FeedbackForms";
export type {
  FeedbackFormProps,
  FeedbackCategory,
  RatingFormProps,
  RatingType,
  NPSSurveyProps,
  QuickFeedbackProps,
} from "./FeedbackForms";

// ============================================
// Phase 18: Tables Extension
// ============================================

// DataTable
export { DataTable } from "./DataTable";
export type {
  DataTableProps,
  DataTableColumn,
  FilterValue,
  FilterState,
  PaginationState,
  PaginationProps as DataTablePaginationProps,
} from "./DataTable";

// ProjectsTable
export { ProjectsTable } from "./ProjectsTable";
export type {
  ProjectsTableProps,
  Project,
  ProjectStatus,
  ProjectMember,
} from "./ProjectsTable";

// UsersTable
export { UsersTable } from "./UsersTable";
export type {
  UsersTableProps,
  User,
  UserStatus,
  UserRole,
} from "./UsersTable";

// InvoicesTable
export { InvoicesTable } from "./InvoicesTable";
export type {
  InvoicesTableProps,
  Invoice,
  InvoiceStatus,
  InvoiceClient,
  InvoiceItem,
} from "./InvoicesTable";

// OrdersTable
export { OrdersTable } from "./OrdersTable";
export type {
  OrdersTableProps,
  Order,
  OrderStatus,
  PaymentStatus,
  OrderCustomer,
  OrderItem as OrderTableItem,
  ShippingAddress,
} from "./OrdersTable";

// TransactionsTable
export { TransactionsTable } from "./TransactionsTable";
export type {
  TransactionsTableProps,
  Transaction as TransactionsTableTransaction,
  TransactionType,
  TransactionStatus,
  TransactionAccount,
  TransactionCategory,
} from "./TransactionsTable";

// FilesTable
export { FilesTable } from "./FilesTable";
export type {
  FilesTableProps,
  FileData,
  FileType as FilesTableFileType,
  FileOwner,
} from "./FilesTable";

// ExpandableTable
export { ExpandableTable } from "./ExpandableTable";
export type {
  ExpandableTableProps,
  ExpandableTableColumn,
} from "./ExpandableTable";

// StickyTable
export { StickyTable } from "./StickyTable";
export type {
  StickyTableProps,
  StickyTableColumn,
} from "./StickyTable";

// CompactTable
export { CompactTable } from "./CompactTable";
export type {
  CompactTableProps,
  CompactTableColumn,
} from "./CompactTable";

// ============================================
// Phase 19: Headers/Sidebars Extension
// ============================================

// HeadersExtension
export {
  ApplicationNavbar,
  MarketplaceHeader,
  DashboardHeader,
  ECommerceHeader,
  BlogHeader,
  DocsHeader,
  MobileHeader,
  StickyHeader,
} from "./HeadersExtension";
export type {
  ApplicationNavbarProps,
  AppNotification,
  AppUser,
  MarketplaceHeaderProps,
  MarketplaceCategory,
  DashboardHeaderProps,
  ECommerceHeaderProps,
  BlogHeaderProps,
  BlogCategory,
  DocsHeaderProps,
  DocsVersion,
  MobileHeaderProps,
  StickyHeaderProps,
} from "./HeadersExtension";

// SidebarsExtension
export {
  DashboardSidebar,
  DetachedSidebar,
  CollapsibleSidebar,
  IconSidebar,
  DoubleSidebar,
  FilterSidebar,
  SettingsSidebar,
} from "./SidebarsExtension";
export type {
  DashboardSidebarProps,
  DetachedSidebarProps,
  CollapsibleSidebarProps,
  IconSidebarProps,
  IconSidebarItem,
  DoubleSidebarProps,
  DoubleSidebarPrimaryItem,
  DoubleSidebarSecondarySection,
  FilterSidebarProps,
  FilterSection,
  FilterOption,
  FilterRange,
  SettingsSidebarProps,
  SettingsNavItem,
  SettingsNavSection,
  SidebarNavItem,
  SidebarNavSection,
  SidebarUser,
} from "./SidebarsExtension";

// ============================================
// Phase 21: Marketing Extension
// ============================================

// CTASection
export {
  CTASection,
  CTAContent,
  CTATitle,
  CTADescription,
  CTAActions,
  CTAButton,
  CTAStats,
  SimpleCTA,
  BannerCTA,
} from "./CTASection";
export type {
  CTASectionProps,
  CTAContentProps,
  CTATitleProps,
  CTADescriptionProps,
  CTAActionsProps,
  CTAButtonProps,
  CTAStatsProps,
  CTAStatItem,
  SimpleCTAProps,
  BannerCTAProps,
} from "./CTASection";

// PricingSection
export {
  PricingSection,
  PricingSectionHeader,
  PricingSectionTitle,
  PricingSectionSubtitle,
  PricingBillingToggle,
  PricingGrid,
  PricingPlanCard,
  PricingFAQ,
  CompletePricingSection,
} from "./PricingSection";
export type {
  PricingSectionProps,
  PricingSectionHeaderProps,
  PricingSectionTitleProps,
  PricingSectionSubtitleProps,
  PricingBillingToggleProps,
  PricingGridProps,
  PricingPlanCardProps,
  PricingFAQProps,
  PricingFAQItem,
  CompletePricingSectionProps,
  PricingSectionPlan,
  PricingSectionFeature,
} from "./PricingSection";

// FAQSection
export {
  FAQSection,
  FAQSectionHeader,
  FAQSectionTitle,
  FAQSectionSubtitle,
  FAQList,
  FAQAccordionItem,
  FAQSimpleItem,
  FAQGrid,
  FAQCategories,
  CompleteFAQSection,
} from "./FAQSection";
export type {
  FAQSectionProps,
  FAQSectionHeaderProps,
  FAQSectionTitleProps,
  FAQSectionSubtitleProps,
  FAQListProps,
  FAQAccordionItemProps,
  FAQSimpleItemProps,
  FAQGridProps,
  FAQCategoriesProps,
  FAQCategoryItem,
  CompleteFAQSectionProps,
  FAQItem,
} from "./FAQSection";

// TeamSection
export {
  TeamSection,
  TeamSectionHeader,
  TeamSectionTitle,
  TeamSectionSubtitle,
  TeamGrid,
  TeamMemberCard,
  TeamMemberList,
  FeaturedTeamMember,
  CompleteTeamSection,
} from "./TeamSection";
export type {
  TeamSectionProps,
  TeamSectionHeaderProps,
  TeamSectionTitleProps,
  TeamSectionSubtitleProps,
  TeamGridProps,
  TeamMemberCardProps,
  TeamMemberListProps,
  FeaturedTeamMemberProps,
  CompleteTeamSectionProps,
  TeamMember as TeamSectionMember,
  TeamMemberSocial,
} from "./TeamSection";

// StatsSection
export {
  StatsSection,
  StatsSectionHeader,
  StatsSectionTitle,
  StatsSectionSubtitle,
  StatsGrid,
  StatCard,
  StatsRow,
  AnimatedStatValue,
  CompleteStatsSection,
  SimpleStatsBar,
} from "./StatsSection";
export type {
  StatsSectionProps,
  StatsSectionHeaderProps,
  StatsSectionTitleProps,
  StatsSectionSubtitleProps,
  StatsGridProps,
  StatCardProps,
  StatsRowProps,
  AnimatedStatValueProps,
  CompleteStatsSectionProps,
  SimpleStatsBarProps,
  StatItem,
} from "./StatsSection";

// LogoCloudSection
export {
  LogoCloudSection,
  LogoCloudHeader,
  LogoCloudTitle,
  LogoGrid,
  LogoRow,
  LogoItemComponent,
  LogoMarquee,
  SimpleLogoCloud,
  CompleteLogoCloudSection,
} from "./LogoCloudSection";
export type {
  LogoCloudSectionProps,
  LogoCloudHeaderProps,
  LogoCloudTitleProps,
  LogoGridProps,
  LogoRowProps,
  LogoItemProps,
  LogoMarqueeProps,
  SimpleLogoCloudProps,
  CompleteLogoCloudSectionProps,
  LogoItem,
} from "./LogoCloudSection";

// NewsletterSection
export {
  NewsletterSection,
  NewsletterContent,
  NewsletterTitle,
  NewsletterDescription,
  NewsletterForm,
  NewsletterSuccess,
  NewsletterFeatures,
  NewsletterPrivacy,
  SimpleNewsletter,
  CompleteNewsletterSection,
} from "./NewsletterSection";
export type {
  NewsletterSectionProps,
  NewsletterContentProps,
  NewsletterTitleProps,
  NewsletterDescriptionProps,
  NewsletterFormProps,
  NewsletterSuccessProps,
  NewsletterFeaturesProps,
  NewsletterFeatureItem,
  NewsletterPrivacyProps,
  SimpleNewsletterProps,
  CompleteNewsletterSectionProps,
} from "./NewsletterSection";
