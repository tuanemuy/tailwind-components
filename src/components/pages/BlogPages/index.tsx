"use client";

import { forwardRef, type ReactNode } from "react";
import { Avatar, Badge, Button, Link } from "@/components/atoms";
import { IconButton, PaginationNumbers } from "@/components/molecules";
import {
  Card,
  CardBody,
  Footer,
  Header,
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
  PageContent,
  PageLayout,
  PageSection,
} from "@/components/organisms";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  FacebookIcon,
  LinkedInIcon,
  LinkIcon,
  TwitterIcon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

// Blog post data
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  category: {
    name: string;
    slug: string;
  };
  author: {
    name: string;
    avatar?: string;
    role?: string;
    bio?: string;
  };
  publishedAt: string;
  readingTime: string;
  tags?: string[];
  featured?: boolean;
}

// BlogListPage props
export interface BlogListPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  posts: BlogPost[];
  featuredPost?: BlogPost;
  categories?: {
    name: string;
    slug: string;
    count?: number;
  }[];
  currentCategory?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onCategoryChange?: (slug: string) => void;
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  navigation?: {
    label: string;
    href: string;
  }[];
  header?: ReactNode;
  footer?: ReactNode;
  title?: string;
  subtitle?: string;
}

export const BlogListPage = forwardRef<HTMLDivElement, BlogListPageProps>(
  (
    {
      className,
      posts,
      featuredPost,
      categories = [],
      currentCategory,
      currentPage = 1,
      totalPages = 1,
      onPageChange,
      onCategoryChange,
      logo,
      logoText = "Blog",
      logoHref = "/",
      navigation = [],
      header,
      footer,
      title = "Blog",
      subtitle = "Insights, updates, and stories from our team.",
      children,
      ...props
    },
    ref,
  ) => {
    const renderHeader = () => {
      if (header) return header;

      return (
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
                  <HeaderNavItem key={item.href} href={item.href}>
                    {item.label}
                  </HeaderNavItem>
                ))}
              </HeaderNav>
            )
          }
        />
      );
    };

    const renderFeaturedPost = () => {
      if (!featuredPost) return null;

      return (
        <Link href={`/blog/${featuredPost.slug}`} className="block group">
          <Card variant="bordered" className="overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {featuredPost.coverImage && (
                <div className="aspect-[16/9] lg:aspect-auto overflow-hidden">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardBody className="flex flex-col justify-center">
                <Badge variant="soft" className="mb-3 w-fit">
                  {featuredPost.category.name}
                </Badge>
                <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <Avatar
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    initials={featuredPost.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                    size="sm"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {featuredPost.author.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{featuredPost.publishedAt}</span>
                      <span>·</span>
                      <span>{featuredPost.readingTime}</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </div>
          </Card>
        </Link>
      );
    };

    const renderPostCard = (post: BlogPost) => (
      <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
        <Card variant="bordered" className="overflow-hidden h-full">
          {post.coverImage && (
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <CardBody>
            <Badge variant="soft" size="sm" className="mb-2">
              {post.category.name}
            </Badge>
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar
                  src={post.author.avatar}
                  alt={post.author.name}
                  initials={post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                  size="xs"
                />
                <span className="text-xs text-foreground">
                  {post.author.name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarIcon className="size-3" />
                <span>{post.publishedAt}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </Link>
    );

    return (
      <PageLayout
        ref={ref}
        header={renderHeader()}
        footer={
          footer || <Footer variant="simple" copyright="All rights reserved." />
        }
        className={className}
        {...props}
      >
        <PageContent maxWidth="6xl" padding="lg">
          {/* Header */}
          <PageSection className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </PageSection>

          {/* Categories */}
          {categories.length > 0 && (
            <PageSection>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={!currentCategory ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => onCategoryChange?.("")}
                >
                  All
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat.slug}
                    variant={currentCategory === cat.slug ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => onCategoryChange?.(cat.slug)}
                  >
                    {cat.name}
                    {cat.count && (
                      <span className="ml-1 text-xs opacity-60">
                        ({cat.count})
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </PageSection>
          )}

          {/* Featured post */}
          {featuredPost && <PageSection>{renderFeaturedPost()}</PageSection>}

          {/* Posts grid */}
          <PageSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => renderPostCard(post))}
            </div>
          </PageSection>

          {/* Pagination */}
          {totalPages > 1 && (
            <PageSection>
              <div className="flex justify-center">
                <PaginationNumbers
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange || (() => {})}
                />
              </div>
            </PageSection>
          )}

          {children}
        </PageContent>
      </PageLayout>
    );
  },
);
BlogListPage.displayName = "BlogListPage";

// BlogPostPage props
export interface BlogPostPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  post: BlogPost;
  relatedPosts?: BlogPost[];
  previousPost?: { title: string; slug: string };
  nextPost?: { title: string; slug: string };
  onShare?: (platform: string) => void;
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  navigation?: {
    label: string;
    href: string;
  }[];
  header?: ReactNode;
  footer?: ReactNode;
  tableOfContents?: {
    id: string;
    title: string;
    level: number;
  }[];
}

export const BlogPostPage = forwardRef<HTMLDivElement, BlogPostPageProps>(
  (
    {
      className,
      post,
      relatedPosts = [],
      previousPost,
      nextPost,
      onShare,
      logo,
      logoText,
      logoHref = "/",
      navigation = [],
      header,
      footer,
      tableOfContents = [],
      children,
      ...props
    },
    ref,
  ) => {
    const handleShare = (platform: string) => {
      onShare?.(platform);
    };

    const renderHeader = () => {
      if (header) return header;

      return (
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
                  <HeaderNavItem key={item.href} href={item.href}>
                    {item.label}
                  </HeaderNavItem>
                ))}
              </HeaderNav>
            )
          }
        />
      );
    };

    const renderShareButtons = () => (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Share:</span>
        <IconButton
          icon={<TwitterIcon className="size-4" />}
          variant="ghost"
          size="sm"
          label="Share on Twitter"
          onClick={() => handleShare("twitter")}
        />
        <IconButton
          icon={<LinkedInIcon className="size-4" />}
          variant="ghost"
          size="sm"
          label="Share on LinkedIn"
          onClick={() => handleShare("linkedin")}
        />
        <IconButton
          icon={<FacebookIcon className="size-4" />}
          variant="ghost"
          size="sm"
          label="Share on Facebook"
          onClick={() => handleShare("facebook")}
        />
        <IconButton
          icon={<LinkIcon className="size-4" />}
          variant="ghost"
          size="sm"
          label="Copy link"
          onClick={() => handleShare("copy")}
        />
      </div>
    );

    const renderAuthorCard = () => (
      <Card variant="bordered">
        <CardBody>
          <div className="flex items-start gap-4">
            <Avatar
              src={post.author.avatar}
              alt={post.author.name}
              initials={post.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
              size="lg"
            />
            <div>
              <p className="font-semibold text-foreground">
                {post.author.name}
              </p>
              {post.author.role && (
                <p className="text-sm text-muted-foreground mb-2">
                  {post.author.role}
                </p>
              )}
              {post.author.bio && (
                <p className="text-sm text-muted-foreground">
                  {post.author.bio}
                </p>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    );

    const renderRelatedPosts = () => (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((relatedPost) => (
          <Link
            key={relatedPost.id}
            href={`/blog/${relatedPost.slug}`}
            className="group"
          >
            <Card variant="bordered" className="h-full">
              {relatedPost.coverImage && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={relatedPost.coverImage}
                    alt={relatedPost.title}
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardBody>
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {relatedPost.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    );

    return (
      <PageLayout
        ref={ref}
        header={renderHeader()}
        footer={
          footer || <Footer variant="simple" copyright="All rights reserved." />
        }
        className={className}
        {...props}
      >
        <article>
          {/* Hero section */}
          <div className="bg-muted/30">
            <PageContent maxWidth="4xl" padding="lg">
              <div className="text-center py-8">
                <Badge variant="soft" className="mb-4">
                  {post.category.name}
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={post.author.avatar}
                      alt={post.author.name}
                      initials={post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                      size="sm"
                    />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="size-4" />
                    <span>{post.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="size-4" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </div>
            </PageContent>
          </div>

          {/* Cover image */}
          {post.coverImage && (
            <PageContent maxWidth="5xl" padding="md">
              <div className="aspect-[21/9] rounded-lg overflow-hidden -mt-8">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="size-full object-cover"
                />
              </div>
            </PageContent>
          )}

          {/* Content */}
          <PageContent maxWidth="4xl" padding="lg">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Table of contents (sidebar) */}
              {tableOfContents.length > 0 && (
                <aside className="hidden lg:block lg:col-span-1">
                  <div className="sticky top-24">
                    <p className="text-sm font-semibold text-foreground mb-3">
                      On this page
                    </p>
                    <nav className="space-y-1">
                      {tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={cn(
                            "block text-sm text-muted-foreground hover:text-foreground transition-colors",
                            item.level > 1 && "pl-3",
                          )}
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </aside>
              )}

              {/* Main content */}
              <div
                className={cn(
                  "lg:col-span-3",
                  tableOfContents.length === 0 && "lg:col-span-4",
                )}
              >
                {/* Article content */}
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  {post.content ? (
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  ) : (
                    children
                  )}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" size="sm">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share buttons */}
                <div className="mt-8 pt-8 border-t border-border">
                  {renderShareButtons()}
                </div>

                {/* Author card */}
                <div className="mt-8">{renderAuthorCard()}</div>

                {/* Previous/Next navigation */}
                {(previousPost || nextPost) && (
                  <div className="mt-8 pt-8 border-t border-border">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {previousPost ? (
                        <Link
                          href={`/blog/${previousPost.slug}`}
                          className="group p-4 rounded-lg border border-border hover:border-primary transition-colors"
                        >
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <ChevronLeftIcon className="size-4" />
                            <span>Previous</span>
                          </div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {previousPost.title}
                          </p>
                        </Link>
                      ) : (
                        <div />
                      )}
                      {nextPost && (
                        <Link
                          href={`/blog/${nextPost.slug}`}
                          className="group p-4 rounded-lg border border-border hover:border-primary transition-colors text-right"
                        >
                          <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-1">
                            <span>Next</span>
                            <ChevronRightIcon className="size-4" />
                          </div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {nextPost.title}
                          </p>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </PageContent>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <PageContent maxWidth="6xl" padding="lg">
              <PageSection>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Related Articles
                </h2>
                {renderRelatedPosts()}
              </PageSection>
            </PageContent>
          )}
        </article>
      </PageLayout>
    );
  },
);
BlogPostPage.displayName = "BlogPostPage";
