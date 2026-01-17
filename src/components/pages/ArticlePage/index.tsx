"use client";

import { forwardRef, type ReactNode } from "react";
import { Avatar, Badge, Link } from "@/components/atoms";
import {
  Footer,
  FooterDivider,
  Header,
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
  PageContent,
  PageLayout,
} from "@/components/organisms";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  TagIcon,
  UserIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// Article variants
type ArticleLayout = "default" | "centered" | "wide" | "sidebar";

// Author type
export interface ArticleAuthor {
  name: string;
  avatar?: string;
  role?: string;
  bio?: string;
  href?: string;
}

// Related article type
export interface RelatedArticle {
  id: string;
  title: string;
  excerpt?: string;
  image?: string;
  href: string;
  date?: string;
  author?: ArticleAuthor;
}

// Navigation item for header
export interface ArticleNavItem {
  id: string;
  label: string;
  href?: string;
  active?: boolean;
}

// Main ArticlePage props
export interface ArticlePageProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: ArticleLayout;
  title: string;
  subtitle?: string;
  excerpt?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  author?: ArticleAuthor;
  date?: string;
  readTime?: string;
  category?: string;
  categoryHref?: string;
  tags?: { label: string; href?: string }[];
  tableOfContents?: { id: string; label: string; level: number }[];
  relatedArticles?: RelatedArticle[];
  previousArticle?: { title: string; href: string };
  nextArticle?: { title: string; href: string };
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  navigation?: ArticleNavItem[];
  showFooter?: boolean;
  sidebar?: ReactNode;
  onShare?: () => void;
  onBookmark?: () => void;
}

export const ArticlePage = forwardRef<HTMLDivElement, ArticlePageProps>(
  (
    {
      className,
      layout = "default",
      title,
      subtitle,
      excerpt,
      featuredImage,
      featuredImageAlt,
      author,
      date,
      readTime,
      category,
      categoryHref,
      tags = [],
      tableOfContents = [],
      relatedArticles = [],
      previousArticle,
      nextArticle,
      logo,
      logoText = "Blog",
      logoHref = "/",
      navigation = [],
      showFooter = true,
      sidebar,
      children,
      ...props
    },
    ref,
  ) => {
    // Render article header
    const renderArticleHeader = () => (
      <header className="mb-8">
        {/* Category */}
        {category && (
          <div className="mb-4">
            {categoryHref ? (
              <Link
                href={categoryHref}
                className="inline-flex items-center gap-x-1 text-primary hover:underline"
              >
                {category}
              </Link>
            ) : (
              <Badge variant="secondary">{category}</Badge>
            )}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
        )}

        {/* Meta info */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {/* Author */}
          {author && (
            <div className="flex items-center gap-x-2">
              {author.avatar ? (
                <Avatar src={author.avatar} alt={author.name} size="sm" />
              ) : (
                <UserIcon className="size-4" />
              )}
              {author.href ? (
                <Link
                  href={author.href}
                  variant="default"
                  className="font-medium"
                >
                  {author.name}
                </Link>
              ) : (
                <span className="font-medium text-foreground">
                  {author.name}
                </span>
              )}
            </div>
          )}

          {/* Date */}
          {date && (
            <div className="flex items-center gap-x-1.5">
              <CalendarIcon className="size-4" />
              <time dateTime={date}>{date}</time>
            </div>
          )}

          {/* Read time */}
          {readTime && (
            <div className="flex items-center gap-x-1.5">
              <ClockIcon className="size-4" />
              <span>{readTime}</span>
            </div>
          )}
        </div>
      </header>
    );

    // Render featured image
    const renderFeaturedImage = () =>
      featuredImage && (
        <figure className="mb-8">
          <img
            src={featuredImage}
            alt={featuredImageAlt || title}
            className="w-full rounded-xl object-cover aspect-video"
          />
        </figure>
      );

    // Render article content
    const renderContent = () => (
      <article className="prose prose-lg dark:prose-invert max-w-none">
        {children}
      </article>
    );

    // Render tags
    const renderTags = () =>
      tags.length > 0 && (
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <TagIcon className="size-4 text-muted-foreground" />
            {tags.map((tag) =>
              tag.href ? (
                <a key={tag.label} href={tag.href}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                  >
                    {tag.label}
                  </Badge>
                </a>
              ) : (
                <Badge key={tag.label} variant="outline">
                  {tag.label}
                </Badge>
              ),
            )}
          </div>
        </div>
      );

    // Render author bio
    const renderAuthorBio = () =>
      author?.bio && (
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex items-start gap-x-4">
            <Avatar
              src={author.avatar}
              alt={author.name}
              initials={author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
              size="lg"
            />
            <div>
              <h3 className="font-semibold text-foreground">{author.name}</h3>
              {author.role && (
                <p className="text-sm text-muted-foreground">{author.role}</p>
              )}
              <p className="mt-2 text-muted-foreground">{author.bio}</p>
            </div>
          </div>
        </div>
      );

    // Render article navigation (previous/next)
    const renderArticleNavigation = () =>
      (previousArticle || nextArticle) && (
        <nav className="mt-8 pt-8 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {previousArticle ? (
              <Link
                href={previousArticle.href}
                variant="default"
                className="flex items-center gap-x-2 p-4 rounded-lg border border-border hover:bg-accent transition-colors group"
              >
                <ChevronLeftIcon className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <div>
                  <span className="text-xs text-muted-foreground">
                    Previous
                  </span>
                  <p className="font-medium text-foreground line-clamp-1">
                    {previousArticle.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextArticle && (
              <Link
                href={nextArticle.href}
                variant="default"
                className="flex items-center justify-end gap-x-2 p-4 rounded-lg border border-border hover:bg-accent transition-colors group text-right"
              >
                <div>
                  <span className="text-xs text-muted-foreground">Next</span>
                  <p className="font-medium text-foreground line-clamp-1">
                    {nextArticle.title}
                  </p>
                </div>
                <ChevronRightIcon className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            )}
          </div>
        </nav>
      );

    // Render related articles
    const renderRelatedArticles = () =>
      relatedArticles.length > 0 && (
        <section className="mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <a key={article.id} href={article.href} className="group block">
                {article.image && (
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                )}
                {article.date && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {article.date}
                  </p>
                )}
              </a>
            ))}
          </div>
        </section>
      );

    // Render table of contents (for sidebar)
    const renderTableOfContents = () =>
      tableOfContents.length > 0 && (
        <nav className="sticky top-24">
          <h3 className="font-semibold text-foreground mb-4">On this page</h3>
          <ul className="space-y-2 text-sm">
            {tableOfContents.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
              >
                <a
                  href={`#${item.id}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      );

    // Render header
    const renderHeader = () => (
      <Header
        variant="bordered"
        sticky
        logo={
          <HeaderLogo href={logoHref} text={logoText}>
            {logo}
          </HeaderLogo>
        }
        navigation={
          navigation.length > 0 && (
            <HeaderNav>
              {navigation.map((item) => (
                <HeaderNavItem
                  key={item.id}
                  href={item.href}
                  active={item.active}
                >
                  {item.label}
                </HeaderNavItem>
              ))}
            </HeaderNav>
          )
        }
      />
    );

    // Render footer
    const renderFooter = () =>
      showFooter && (
        <Footer variant="minimal" className="mt-16">
          <FooterDivider />
          <div className="py-6 text-center text-sm text-muted-foreground">
            © 2024 {logoText}. All rights reserved.
          </div>
        </Footer>
      );

    // Content width classes based on layout
    const contentMaxWidth = {
      default: "lg" as const,
      centered: "md" as const,
      wide: "xl" as const,
      sidebar: "xl" as const,
    };

    return (
      <PageLayout
        ref={ref}
        variant="full"
        header={renderHeader()}
        footer={renderFooter()}
        className={className}
        {...props}
      >
        <PageContent maxWidth={contentMaxWidth[layout]} padding="lg">
          {layout === "sidebar" && tableOfContents.length > 0 ? (
            <div className="flex gap-8">
              {/* Main content */}
              <div className="flex-1 min-w-0">
                {renderArticleHeader()}
                {renderFeaturedImage()}
                {renderContent()}
                {renderTags()}
                {renderAuthorBio()}
                {renderArticleNavigation()}
              </div>

              {/* Sidebar */}
              <aside className="hidden lg:block w-64 shrink-0">
                {renderTableOfContents()}
                {sidebar}
              </aside>
            </div>
          ) : (
            <>
              {renderArticleHeader()}
              {renderFeaturedImage()}
              {renderContent()}
              {renderTags()}
              {renderAuthorBio()}
              {renderArticleNavigation()}
            </>
          )}

          {renderRelatedArticles()}
        </PageContent>
      </PageLayout>
    );
  },
);
ArticlePage.displayName = "ArticlePage";

// ArticleContent component for prose styling
export interface ArticleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export const ArticleContent = forwardRef<HTMLDivElement, ArticleContentProps>(
  ({ className, size = "lg", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "prose-sm",
      md: "prose-base",
      lg: "prose-lg",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "prose dark:prose-invert max-w-none",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ArticleContent.displayName = "ArticleContent";

// ArticleCard component for article listings
export interface ArticleCardProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  excerpt?: string;
  image?: string;
  href: string;
  date?: string;
  readTime?: string;
  author?: ArticleAuthor;
  category?: string;
  variant?: "default" | "horizontal" | "featured";
}

export const ArticleCard = forwardRef<HTMLAnchorElement, ArticleCardProps>(
  (
    {
      className,
      title,
      excerpt,
      image,
      href,
      date,
      readTime,
      author,
      category,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    if (variant === "horizontal") {
      return (
        <a
          ref={ref}
          href={href}
          className={cn("group flex gap-4 sm:gap-6", className)}
          {...props}
        >
          {image && (
            <div className="w-32 sm:w-48 shrink-0 aspect-video rounded-lg overflow-hidden">
              <img
                src={image}
                alt={title}
                className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            {category && (
              <Badge variant="secondary" size="sm" className="mb-2">
                {category}
              </Badge>
            )}
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            {excerpt && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {excerpt}
              </p>
            )}
            <div className="mt-3 flex items-center gap-x-4 text-xs text-muted-foreground">
              {author && (
                <span className="flex items-center gap-x-1">
                  {author.avatar && (
                    <Avatar src={author.avatar} alt={author.name} size="xs" />
                  )}
                  {author.name}
                </span>
              )}
              {date && <span>{date}</span>}
              {readTime && <span>{readTime}</span>}
            </div>
          </div>
        </a>
      );
    }

    if (variant === "featured") {
      return (
        <a
          ref={ref}
          href={href}
          className={cn(
            "group block relative aspect-[16/9] rounded-xl overflow-hidden",
            className,
          )}
          {...props}
        >
          {image && (
            <img
              src={image}
              alt={title}
              className="absolute inset-0 size-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            {category && (
              <Badge variant="secondary" size="sm" className="mb-3">
                {category}
              </Badge>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold line-clamp-2">
              {title}
            </h2>
            {excerpt && (
              <p className="mt-2 text-white/80 line-clamp-2">{excerpt}</p>
            )}
            <div className="mt-4 flex items-center gap-x-4 text-sm text-white/70">
              {author && (
                <span className="flex items-center gap-x-2">
                  {author.avatar && (
                    <Avatar src={author.avatar} alt={author.name} size="sm" />
                  )}
                  {author.name}
                </span>
              )}
              {date && <span>{date}</span>}
            </div>
          </div>
        </a>
      );
    }

    // Default card
    return (
      <a
        ref={ref}
        href={href}
        className={cn("group block", className)}
        {...props}
      >
        {image && (
          <div className="aspect-video rounded-lg overflow-hidden mb-4">
            <img
              src={image}
              alt={title}
              className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        {category && (
          <Badge variant="secondary" size="sm" className="mb-2">
            {category}
          </Badge>
        )}
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {excerpt}
          </p>
        )}
        <div className="mt-3 flex items-center gap-x-4 text-xs text-muted-foreground">
          {author && (
            <span className="flex items-center gap-x-1">
              {author.avatar && (
                <Avatar src={author.avatar} alt={author.name} size="xs" />
              )}
              {author.name}
            </span>
          )}
          {date && <span>{date}</span>}
          {readTime && <span>{readTime}</span>}
        </div>
      </a>
    );
  },
);
ArticleCard.displayName = "ArticleCard";
