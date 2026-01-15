// AuthPage
export {
  AuthPage,
  AuthLogo,
  AuthFooter,
} from "./AuthPage";
export type {
  AuthPageProps,
  AuthFormData,
  SocialProvider,
  AuthLogoProps,
  AuthFooterProps,
} from "./AuthPage";

// DashboardPage
export {
  DashboardPage,
  DashboardCard,
  DashboardTable,
  DashboardEmptyState,
} from "./DashboardPage";
export type {
  DashboardPageProps,
  DashboardNavItem,
  DashboardSection,
  DashboardCardProps,
  DashboardTableProps,
  DashboardEmptyStateProps,
} from "./DashboardPage";

// ArticlePage
export {
  ArticlePage,
  ArticleContent,
  ArticleCard,
} from "./ArticlePage";
export type {
  ArticlePageProps,
  ArticleAuthor,
  RelatedArticle,
  ArticleNavItem,
  ArticleContentProps,
  ArticleCardProps,
} from "./ArticlePage";

// ProfilePage
export { ProfilePage, ProfilePageSkeleton } from "./ProfilePage";
export type {
  ProfilePageProps,
  UserProfile,
  ProfileActivity,
  ProfileTab,
  ProfilePageSkeletonProps,
} from "./ProfilePage";

// SettingsPage
export {
  SettingsPage,
  SettingsPageSkeleton,
  SettingsForm,
  SettingsToggle,
} from "./SettingsPage";
export type {
  SettingsPageProps,
  SettingsSection,
  SettingsPageSkeletonProps,
  SettingsFormProps,
  SettingsToggleProps,
} from "./SettingsPage";

// ErrorPages
export {
  NotFoundPage,
  ErrorPage,
  MaintenancePage,
  ComingSoonPage,
} from "./ErrorPages";
export type {
  NotFoundPageProps,
  ErrorPageProps,
  MaintenancePageProps,
  ComingSoonPageProps,
  ComingSoonFeature,
} from "./ErrorPages";

// PricingPage
export { PricingPage, PricingComparison } from "./PricingPage";
export type { PricingPageProps, PricingComparisonProps } from "./PricingPage";

// ContactPage
export { ContactPage } from "./ContactPage";
export type {
  ContactPageProps,
  ContactInfo,
  OfficeLocation,
  ContactFormData,
} from "./ContactPage";

// BlogPages
export { BlogListPage, BlogPostPage } from "./BlogPages";
export type {
  BlogListPageProps,
  BlogPostPageProps,
  BlogPost,
  BlogCategory,
  BlogAuthor,
  BlogComment,
  TableOfContentsItem,
} from "./BlogPages";

// ProductPage
export { ProductPage } from "./ProductPage";
export type {
  ProductPageProps,
  Product,
  ProductVariant,
  ProductReview,
} from "./ProductPage";

// CheckoutPage
export { CheckoutPage } from "./CheckoutPage";
export type {
  CheckoutPageProps,
  CheckoutStep,
  CartItem,
  ShippingMethod,
  PaymentMethod,
  CheckoutFormData,
} from "./CheckoutPage";
