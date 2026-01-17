"use client";

import { forwardRef, type ReactNode } from "react";
import { Avatar, Badge, Button } from "@/components/atoms";
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
  BookmarkIcon,
  BriefcaseIcon,
  BuildingIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  DollarSignIcon,
  ExternalLinkIcon,
  GlobeIcon,
  MapPinIcon,
  ShareIcon,
  StarIcon,
  TagIcon,
  UsersIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// ============================================================================
// Shared Types
// ============================================================================

export interface ArticleNavItem {
  id: string;
  label: string;
  href?: string;
  active?: boolean;
}

export interface ArticleAuthor {
  name: string;
  avatar?: string;
  role?: string;
  bio?: string;
  href?: string;
  company?: string;
}

// ============================================================================
// CareersDetailPage - 求人詳細ページ
// ============================================================================

export interface JobBenefit {
  icon?: ReactNode;
  title: string;
  description?: string;
}

export interface JobRequirement {
  category: string;
  items: string[];
}

export interface JobDetail {
  label: string;
  value: string;
  icon?: ReactNode;
}

export interface CareersDetailPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // Job basic info
  title: string;
  department?: string;
  location?: string;
  locationType?: "remote" | "hybrid" | "onsite";
  employmentType?: "full-time" | "part-time" | "contract" | "internship";
  salary?: string;
  salaryRange?: { min: string; max: string };
  postedDate?: string;
  closingDate?: string;
  experienceLevel?: string;

  // Job details
  description?: ReactNode;
  responsibilities?: string[];
  requirements?: JobRequirement[];
  niceToHave?: string[];
  benefits?: JobBenefit[];
  techStack?: string[];

  // Company info
  companyName?: string;
  companyLogo?: ReactNode;
  companyDescription?: string;
  companySize?: string;
  companyIndustry?: string;

  // Related jobs
  relatedJobs?: {
    id: string;
    title: string;
    department: string;
    location: string;
    href: string;
  }[];

  // Header
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  navigation?: ArticleNavItem[];
  showFooter?: boolean;

  // Actions
  applyUrl?: string;
  onApply?: () => void;
  onSave?: () => void;
  onShare?: () => void;
}

export const CareersDetailPage = forwardRef<
  HTMLDivElement,
  CareersDetailPageProps
>(
  (
    {
      className,
      title,
      department,
      location,
      locationType = "onsite",
      employmentType = "full-time",
      salary,
      salaryRange,
      postedDate,
      closingDate,
      experienceLevel,
      description,
      responsibilities = [],
      requirements = [],
      niceToHave = [],
      benefits = [],
      techStack = [],
      companyName,
      companyLogo,
      companyDescription,
      companySize,
      companyIndustry,
      relatedJobs = [],
      logo,
      logoText = "Careers",
      logoHref = "/",
      navigation = [],
      showFooter = true,
      applyUrl,
      onApply,
      onSave,
      onShare,
      children,
      ...props
    },
    ref,
  ) => {
    const locationTypeLabels = {
      remote: "Remote",
      hybrid: "Hybrid",
      onsite: "On-site",
    };

    const employmentTypeLabels = {
      "full-time": "Full-time",
      "part-time": "Part-time",
      contract: "Contract",
      internship: "Internship",
    };

    const jobDetails: JobDetail[] = [
      ...(location
        ? [{ label: "Location", value: location, icon: <MapPinIcon /> }]
        : []),
      ...(locationType
        ? [
            {
              label: "Work Type",
              value: locationTypeLabels[locationType],
              icon: <GlobeIcon />,
            },
          ]
        : []),
      ...(employmentType
        ? [
            {
              label: "Employment",
              value: employmentTypeLabels[employmentType],
              icon: <BriefcaseIcon />,
            },
          ]
        : []),
      ...(salary || salaryRange
        ? [
            {
              label: "Salary",
              value: salary || `${salaryRange?.min} - ${salaryRange?.max}`,
              icon: <DollarSignIcon />,
            },
          ]
        : []),
      ...(experienceLevel
        ? [
            {
              label: "Experience",
              value: experienceLevel,
              icon: <StarIcon />,
            },
          ]
        : []),
    ];

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

    const renderFooter = () =>
      showFooter && (
        <Footer variant="minimal" className="mt-16">
          <FooterDivider />
          <div className="py-6 text-center text-sm text-muted-foreground">
            © 2024 {companyName || logoText}. All rights reserved.
          </div>
        </Footer>
      );

    return (
      <PageLayout
        ref={ref}
        variant="full"
        header={renderHeader()}
        footer={renderFooter()}
        className={className}
        {...props}
      >
        <PageContent maxWidth="xl" padding="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job header */}
              <header>
                {department && (
                  <Badge variant="secondary" className="mb-4">
                    {department}
                  </Badge>
                )}
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                  {title}
                </h1>

                {/* Meta info */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {location && (
                    <span className="flex items-center gap-x-1.5">
                      <MapPinIcon className="size-4" />
                      {location}
                    </span>
                  )}
                  {postedDate && (
                    <span className="flex items-center gap-x-1.5">
                      <CalendarIcon className="size-4" />
                      Posted {postedDate}
                    </span>
                  )}
                  {closingDate && (
                    <span className="flex items-center gap-x-1.5 text-warning">
                      <ClockIcon className="size-4" />
                      Closes {closingDate}
                    </span>
                  )}
                </div>

                {/* Action buttons (mobile) */}
                <div className="mt-6 flex gap-3 lg:hidden">
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={onApply}
                  >
                    Apply Now
                  </Button>
                  <Button variant="outline" size="icon" onClick={onSave}>
                    <BookmarkIcon className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={onShare}>
                    <ShareIcon className="size-4" />
                  </Button>
                </div>
              </header>

              {/* Description */}
              {description && (
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    About the Role
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    {description}
                  </div>
                </section>
              )}

              {/* Responsibilities */}
              {responsibilities.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {responsibilities.map((item) => (
                      <li key={item} className="flex gap-x-3">
                        <CheckCircleIcon className="size-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Requirements */}
              {requirements.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Requirements
                  </h2>
                  <div className="space-y-6">
                    {requirements.map((req) => (
                      <div key={req.category}>
                        <h3 className="font-medium text-foreground mb-3">
                          {req.category}
                        </h3>
                        <ul className="space-y-2">
                          {req.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-x-3 text-muted-foreground"
                            >
                              <ChevronRightIcon className="size-4 shrink-0 mt-1" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Nice to have */}
              {niceToHave.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Nice to Have
                  </h2>
                  <ul className="space-y-2">
                    {niceToHave.map((item) => (
                      <li
                        key={item}
                        className="flex gap-x-3 text-muted-foreground"
                      >
                        <StarIcon className="size-4 text-warning shrink-0 mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Tech stack */}
              {techStack.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Tech Stack
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}

              {/* Benefits */}
              {benefits.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Benefits & Perks
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {benefits.map((benefit) => (
                      <div
                        key={benefit.title}
                        className="flex gap-x-3 p-4 rounded-lg bg-muted/50"
                      >
                        {benefit.icon && (
                          <span className="text-primary shrink-0">
                            {benefit.icon}
                          </span>
                        )}
                        <div>
                          <p className="font-medium text-foreground">
                            {benefit.title}
                          </p>
                          {benefit.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {benefit.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Custom content */}
              {children}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Apply card */}
                <div className="hidden lg:block p-6 rounded-xl border border-border bg-card">
                  <div className="space-y-4">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={onApply}
                    >
                      Apply Now
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onSave}
                      >
                        <BookmarkIcon className="size-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onShare}
                      >
                        <ShareIcon className="size-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Job details card */}
                {jobDetails.length > 0 && (
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h3 className="font-semibold text-foreground mb-4">
                      Job Details
                    </h3>
                    <dl className="space-y-4">
                      {jobDetails.map((detail) => (
                        <div key={detail.label} className="flex gap-x-3">
                          {detail.icon && (
                            <span className="text-muted-foreground size-5">
                              {detail.icon}
                            </span>
                          )}
                          <div>
                            <dt className="text-xs text-muted-foreground">
                              {detail.label}
                            </dt>
                            <dd className="font-medium text-foreground">
                              {detail.value}
                            </dd>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Company info card */}
                {(companyName || companyDescription) && (
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h3 className="font-semibold text-foreground mb-4">
                      About the Company
                    </h3>
                    <div className="flex items-start gap-x-3 mb-4">
                      {companyLogo && (
                        <div className="size-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          {companyLogo}
                        </div>
                      )}
                      <div>
                        {companyName && (
                          <p className="font-medium text-foreground">
                            {companyName}
                          </p>
                        )}
                        {companyIndustry && (
                          <p className="text-sm text-muted-foreground">
                            {companyIndustry}
                          </p>
                        )}
                      </div>
                    </div>
                    {companyDescription && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {companyDescription}
                      </p>
                    )}
                    {companySize && (
                      <div className="flex items-center gap-x-2 text-sm text-muted-foreground">
                        <UsersIcon className="size-4" />
                        <span>{companySize} employees</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Related jobs */}
          {relatedJobs.length > 0 && (
            <section className="mt-12 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Related Positions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedJobs.map((job) => (
                  <a
                    key={job.id}
                    href={job.href}
                    className="group p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {job.department}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-x-1 mt-2">
                      <MapPinIcon className="size-3" />
                      {job.location}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}
        </PageContent>
      </PageLayout>
    );
  },
);
CareersDetailPage.displayName = "CareersDetailPage";

// ============================================================================
// CaseStudyPage - ケーススタディページ
// ============================================================================

export interface CaseStudyMetric {
  label: string;
  value: string;
  change?: string;
  changeDirection?: "up" | "down";
}

export interface CaseStudyChallenge {
  title: string;
  description: string;
}

export interface CaseStudySolution {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface CaseStudyQuote {
  content: string;
  author: ArticleAuthor;
}

export interface CaseStudyPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // Basic info
  title: string;
  subtitle?: string;
  excerpt?: string;
  featuredImage?: string;
  featuredImageAlt?: string;

  // Client info
  clientName: string;
  clientLogo?: ReactNode;
  clientIndustry?: string;
  clientWebsite?: string;
  clientSize?: string;

  // Case study content
  overview?: ReactNode;
  challenges?: CaseStudyChallenge[];
  solutions?: CaseStudySolution[];
  resultsContent?: ReactNode;
  metrics?: CaseStudyMetric[];
  quote?: CaseStudyQuote;
  timeline?: string;

  // Meta
  date?: string;
  category?: string;
  tags?: { label: string; href?: string }[];
  readTime?: string;

  // Related
  relatedCaseStudies?: {
    id: string;
    title: string;
    client: string;
    image?: string;
    href: string;
  }[];

  // Header
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  navigation?: ArticleNavItem[];
  showFooter?: boolean;

  // Actions
  onDownload?: () => void;
  onShare?: () => void;
}

export const CaseStudyPage = forwardRef<HTMLDivElement, CaseStudyPageProps>(
  (
    {
      className,
      title,
      subtitle,
      excerpt,
      featuredImage,
      featuredImageAlt,
      clientName,
      clientLogo,
      clientIndustry,
      clientWebsite,
      clientSize,
      overview,
      challenges = [],
      solutions = [],
      resultsContent,
      metrics = [],
      quote,
      timeline,
      date,
      category,
      tags = [],
      readTime,
      relatedCaseStudies = [],
      logo,
      logoText = "Case Studies",
      logoHref = "/",
      navigation = [],
      showFooter = true,
      onDownload,
      onShare,
      children,
      ...props
    },
    ref,
  ) => {
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

    const renderFooter = () =>
      showFooter && (
        <Footer variant="minimal" className="mt-16">
          <FooterDivider />
          <div className="py-6 text-center text-sm text-muted-foreground">
            © 2024 {logoText}. All rights reserved.
          </div>
        </Footer>
      );

    return (
      <PageLayout
        ref={ref}
        variant="full"
        header={renderHeader()}
        footer={renderFooter()}
        className={className}
        {...props}
      >
        <PageContent maxWidth="lg" padding="lg">
          {/* Header section */}
          <header className="text-center mb-12">
            {category && (
              <Badge variant="secondary" className="mb-4">
                {category}
              </Badge>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}

            {/* Meta */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              {clientName && (
                <span className="flex items-center gap-x-2">
                  <BuildingIcon className="size-4" />
                  {clientName}
                </span>
              )}
              {date && (
                <span className="flex items-center gap-x-1.5">
                  <CalendarIcon className="size-4" />
                  {date}
                </span>
              )}
              {readTime && (
                <span className="flex items-center gap-x-1.5">
                  <ClockIcon className="size-4" />
                  {readTime}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-center gap-3">
              {onDownload && (
                <Button variant="outline" onClick={onDownload}>
                  Download PDF
                </Button>
              )}
              {onShare && (
                <Button variant="ghost" size="icon" onClick={onShare}>
                  <ShareIcon className="size-4" />
                </Button>
              )}
            </div>
          </header>

          {/* Featured image */}
          {featuredImage && (
            <figure className="mb-12">
              <img
                src={featuredImage}
                alt={featuredImageAlt || title}
                className="w-full rounded-xl object-cover aspect-video"
              />
            </figure>
          )}

          {/* Metrics highlight */}
          {metrics.length > 0 && (
            <section className="mb-12 p-8 rounded-xl bg-primary/5 border border-primary/10">
              <h2 className="text-lg font-semibold text-foreground text-center mb-6">
                Key Results
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-primary">
                      {metric.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {metric.label}
                    </p>
                    {metric.change && (
                      <p
                        className={cn(
                          "text-xs mt-1",
                          metric.changeDirection === "up"
                            ? "text-success"
                            : "text-destructive",
                        )}
                      >
                        {metric.changeDirection === "up" ? "↑" : "↓"}{" "}
                        {metric.change}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Overview */}
              {overview && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Overview
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    {overview}
                  </div>
                </section>
              )}

              {/* Challenges */}
              {challenges.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    The Challenge
                  </h2>
                  <div className="space-y-6">
                    {challenges.map((challenge) => (
                      <div
                        key={challenge.title}
                        className="p-6 rounded-lg border border-border bg-card"
                      >
                        <h3 className="font-semibold text-foreground mb-2">
                          {challenge.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {challenge.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Solutions */}
              {solutions.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Our Solution
                  </h2>
                  <div className="space-y-6">
                    {solutions.map((solution) => (
                      <div key={solution.title} className="flex gap-x-4">
                        {solution.icon && (
                          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                            {solution.icon}
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">
                            {solution.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {solution.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Quote */}
              {quote && (
                <section className="p-8 rounded-xl bg-muted/50">
                  <blockquote className="text-xl italic text-foreground mb-4">
                    "{quote.content}"
                  </blockquote>
                  <div className="flex items-center gap-x-3">
                    {quote.author.avatar ? (
                      <Avatar
                        src={quote.author.avatar}
                        alt={quote.author.name}
                        size="md"
                      />
                    ) : (
                      <Avatar
                        initials={quote.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                        size="md"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-foreground">
                        {quote.author.name}
                      </p>
                      {quote.author.role && (
                        <p className="text-sm text-muted-foreground">
                          {quote.author.role}
                          {quote.author.company &&
                            ` at ${quote.author.company}`}
                        </p>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* Results */}
              {resultsContent && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Results
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    {resultsContent}
                  </div>
                </section>
              )}

              {/* Custom content */}
              {children}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="pt-8 border-t border-border">
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
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Client info card */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-4">Client</h3>
                  <div className="flex items-center gap-x-3 mb-4">
                    {clientLogo && (
                      <div className="size-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        {clientLogo}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-foreground">
                        {clientName}
                      </p>
                      {clientIndustry && (
                        <p className="text-sm text-muted-foreground">
                          {clientIndustry}
                        </p>
                      )}
                    </div>
                  </div>

                  <dl className="space-y-3 text-sm">
                    {clientSize && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Company Size</dt>
                        <dd className="font-medium text-foreground">
                          {clientSize}
                        </dd>
                      </div>
                    )}
                    {clientIndustry && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Industry</dt>
                        <dd className="font-medium text-foreground">
                          {clientIndustry}
                        </dd>
                      </div>
                    )}
                    {timeline && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Timeline</dt>
                        <dd className="font-medium text-foreground">
                          {timeline}
                        </dd>
                      </div>
                    )}
                  </dl>

                  {clientWebsite && (
                    <a
                      href={clientWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center gap-x-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLinkIcon className="size-4" />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>

          {/* Related case studies */}
          {relatedCaseStudies.length > 0 && (
            <section className="mt-12 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Related Case Studies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedCaseStudies.map((study) => (
                  <a key={study.id} href={study.href} className="group block">
                    {study.image && (
                      <div className="aspect-video rounded-lg overflow-hidden mb-4">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {study.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {study.client}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}
        </PageContent>
      </PageLayout>
    );
  },
);
CaseStudyPage.displayName = "CaseStudyPage";

// ============================================================================
// CustomerStoryPage - 顧客事例ページ
// ============================================================================

export interface CustomerQuote {
  content: string;
  context?: string;
}

export interface CustomerStorySection {
  title: string;
  content: ReactNode;
}

export interface CustomerStoryPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  // Story info
  title: string;
  subtitle?: string;
  excerpt?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  videoUrl?: string;

  // Customer info
  customer: {
    name: string;
    avatar?: string;
    role: string;
    company: string;
    companyLogo?: ReactNode;
    industry?: string;
    location?: string;
    website?: string;
  };

  // Story content
  background?: ReactNode;
  problem?: ReactNode;
  solution?: ReactNode;
  implementation?: ReactNode;
  outcome?: ReactNode;
  customSections?: CustomerStorySection[];
  quotes?: CustomerQuote[];

  // Results
  metrics?: CaseStudyMetric[];
  testimonial?: {
    content: string;
    highlight?: string;
  };

  // Products/features used
  productsUsed?: { name: string; icon?: ReactNode; description?: string }[];

  // Meta
  date?: string;
  category?: string;
  readTime?: string;
  tags?: { label: string; href?: string }[];

  // Related
  relatedStories?: {
    id: string;
    title: string;
    customer: string;
    image?: string;
    href: string;
  }[];

  // Header
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  navigation?: ArticleNavItem[];
  showFooter?: boolean;

  // Actions
  onContactSales?: () => void;
  onShare?: () => void;
}

export const CustomerStoryPage = forwardRef<
  HTMLDivElement,
  CustomerStoryPageProps
>(
  (
    {
      className,
      title,
      subtitle,
      excerpt,
      featuredImage,
      featuredImageAlt,
      videoUrl,
      customer,
      background,
      problem,
      solution,
      implementation,
      outcome,
      customSections = [],
      quotes = [],
      metrics = [],
      testimonial,
      productsUsed = [],
      date,
      category,
      readTime,
      tags = [],
      relatedStories = [],
      logo,
      logoText = "Customer Stories",
      logoHref = "/",
      navigation = [],
      showFooter = true,
      onContactSales,
      onShare,
      children,
      ...props
    },
    ref,
  ) => {
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

    const renderFooter = () =>
      showFooter && (
        <Footer variant="minimal" className="mt-16">
          <FooterDivider />
          <div className="py-6 text-center text-sm text-muted-foreground">
            © 2024 {logoText}. All rights reserved.
          </div>
        </Footer>
      );

    return (
      <PageLayout
        ref={ref}
        variant="full"
        header={renderHeader()}
        footer={renderFooter()}
        className={className}
        {...props}
      >
        <PageContent maxWidth="lg" padding="lg">
          {/* Hero section */}
          <header className="mb-12">
            {category && (
              <Badge variant="secondary" className="mb-4">
                {category}
              </Badge>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
            )}

            {/* Customer info */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-x-4">
                {customer.avatar ? (
                  <Avatar src={customer.avatar} alt={customer.name} size="lg" />
                ) : (
                  <Avatar
                    initials={customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                    size="lg"
                  />
                )}
                <div>
                  <p className="font-semibold text-foreground">
                    {customer.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customer.role} at {customer.company}
                  </p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {date && (
                  <span className="flex items-center gap-x-1.5">
                    <CalendarIcon className="size-4" />
                    {date}
                  </span>
                )}
                {readTime && (
                  <span className="flex items-center gap-x-1.5">
                    <ClockIcon className="size-4" />
                    {readTime}
                  </span>
                )}
              </div>
            </div>

            {/* Share button */}
            {onShare && (
              <div className="mt-6">
                <Button variant="ghost" size="sm" onClick={onShare}>
                  <ShareIcon className="size-4 mr-2" />
                  Share Story
                </Button>
              </div>
            )}
          </header>

          {/* Featured image or video */}
          {(featuredImage || videoUrl) && (
            <figure className="mb-12">
              {videoUrl ? (
                <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                  <iframe
                    src={videoUrl}
                    title={title}
                    className="size-full"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={featuredImage}
                  alt={featuredImageAlt || title}
                  className="w-full rounded-xl object-cover aspect-video"
                />
              )}
            </figure>
          )}

          {/* Metrics highlight */}
          {metrics.length > 0 && (
            <section className="mb-12 p-8 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-primary">
                      {metric.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {metric.label}
                    </p>
                    {metric.change && (
                      <p
                        className={cn(
                          "text-xs mt-1",
                          metric.changeDirection === "up"
                            ? "text-success"
                            : "text-destructive",
                        )}
                      >
                        {metric.changeDirection === "up" ? "↑" : "↓"}{" "}
                        {metric.change}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Main testimonial */}
          {testimonial && (
            <section className="mb-12 p-8 rounded-xl bg-muted/50 text-center">
              <blockquote className="text-2xl sm:text-3xl font-medium text-foreground leading-relaxed">
                {testimonial.highlight && (
                  <span className="text-primary">
                    "{testimonial.highlight}"
                  </span>
                )}
                {!testimonial.highlight && `"${testimonial.content}"`}
              </blockquote>
              {testimonial.highlight && (
                <p className="mt-4 text-lg text-muted-foreground">
                  {testimonial.content}
                </p>
              )}
              <div className="mt-6 flex items-center justify-center gap-x-3">
                {customer.avatar && (
                  <Avatar src={customer.avatar} alt={customer.name} size="sm" />
                )}
                <div className="text-left">
                  <p className="font-semibold text-foreground text-sm">
                    {customer.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {customer.role}, {customer.company}
                  </p>
                </div>
              </div>
            </section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main content */}
            <div className="lg:col-span-3 space-y-10">
              {/* Background */}
              {background && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Background
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    {background}
                  </div>
                </section>
              )}

              {/* Problem */}
              {problem && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    The Challenge
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    {problem}
                  </div>
                </section>
              )}

              {/* Inline quotes */}
              {quotes.length > 0 && (
                <div className="space-y-6">
                  {quotes.map((quote) => (
                    <blockquote
                      key={quote.content}
                      className="border-l-4 border-primary pl-6 py-2"
                    >
                      <p className="text-lg italic text-foreground">
                        "{quote.content}"
                      </p>
                      {quote.context && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {quote.context}
                        </p>
                      )}
                    </blockquote>
                  ))}
                </div>
              )}

              {/* Solution */}
              {solution && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    The Solution
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    {solution}
                  </div>
                </section>
              )}

              {/* Implementation */}
              {implementation && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Implementation
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    {implementation}
                  </div>
                </section>
              )}

              {/* Outcome */}
              {outcome && (
                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    The Outcome
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    {outcome}
                  </div>
                </section>
              )}

              {/* Custom sections */}
              {customSections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    {section.content}
                  </div>
                </section>
              ))}

              {/* Custom content */}
              {children}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="pt-8 border-t border-border">
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
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Company card */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-4">
                    About {customer.company}
                  </h3>
                  <div className="flex items-center gap-x-3 mb-4">
                    {customer.companyLogo && (
                      <div className="size-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        {customer.companyLogo}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-foreground">
                        {customer.company}
                      </p>
                      {customer.industry && (
                        <p className="text-sm text-muted-foreground">
                          {customer.industry}
                        </p>
                      )}
                    </div>
                  </div>

                  {customer.location && (
                    <p className="text-sm text-muted-foreground flex items-center gap-x-2 mb-2">
                      <MapPinIcon className="size-4" />
                      {customer.location}
                    </p>
                  )}

                  {customer.website && (
                    <a
                      href={customer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-x-2"
                    >
                      <ExternalLinkIcon className="size-4" />
                      Visit Website
                    </a>
                  )}
                </div>

                {/* Products used */}
                {productsUsed.length > 0 && (
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h3 className="font-semibold text-foreground mb-4">
                      Products Used
                    </h3>
                    <ul className="space-y-3">
                      {productsUsed.map((product) => (
                        <li key={product.name} className="flex gap-x-3">
                          {product.icon && (
                            <span className="text-primary shrink-0">
                              {product.icon}
                            </span>
                          )}
                          <div>
                            <p className="font-medium text-foreground text-sm">
                              {product.name}
                            </p>
                            {product.description && (
                              <p className="text-xs text-muted-foreground">
                                {product.description}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                {onContactSales && (
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h3 className="font-semibold text-foreground mb-2">
                      Ready to get started?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      See how we can help your business succeed.
                    </p>
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={onContactSales}
                    >
                      Contact Sales
                    </Button>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Related stories */}
          {relatedStories.length > 0 && (
            <section className="mt-12 pt-8 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                More Customer Stories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedStories.map((story) => (
                  <a key={story.id} href={story.href} className="group block">
                    {story.image && (
                      <div className="aspect-video rounded-lg overflow-hidden mb-4">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {story.customer}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          )}
        </PageContent>
      </PageLayout>
    );
  },
);
CustomerStoryPage.displayName = "CustomerStoryPage";
