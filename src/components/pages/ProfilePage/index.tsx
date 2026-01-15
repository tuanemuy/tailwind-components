"use client";

import { forwardRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button, Avatar, Badge, Link } from "@/components/atoms";
import { Tabs, Tab, IconButton } from "@/components/molecules";
import {
  PageLayout,
  PageContent,
  PageSection,
  Header,
  HeaderLogo,
  UserProfileCard,
  DescriptionList,
  DescriptionListItem,
  ActivityFeed,
  Card,
  CardHeader,
  CardBody,
} from "@/components/organisms";
import {
  SettingsIcon,
  EditIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  LinkIcon,
  TwitterIcon,
  LinkedInIcon,
  GitHubIcon,
} from "@/lib/icons";

// Profile page variants
type ProfileVariant = "default" | "minimal" | "detailed";
type ProfileLayout = "centered" | "sidebar" | "full-width";

// User profile data
export interface ProfileUser {
  id: string;
  name: string;
  username?: string;
  email: string;
  phone?: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  role?: string;
  company?: string;
  location?: string;
  website?: string;
  joinDate?: string;
  verified?: boolean;
  stats?: {
    label: string;
    value: string | number;
  }[];
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Activity item
export interface ProfileActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  icon?: ReactNode;
}

// ProfilePage props
export interface ProfilePageProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ProfileVariant;
  layout?: ProfileLayout;
  user: ProfileUser;
  activities?: ProfileActivity[];
  isOwnProfile?: boolean;
  onEdit?: () => void;
  onMessage?: () => void;
  onFollow?: () => void;
  onSettings?: () => void;
  tabs?: {
    id: string;
    label: string;
    content: ReactNode;
  }[];
  logo?: ReactNode;
  logoText?: string;
  logoHref?: string;
  header?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
}

export const ProfilePage = forwardRef<HTMLDivElement, ProfilePageProps>(
  (
    {
      className,
      variant = "default",
      layout = "centered",
      user,
      activities = [],
      isOwnProfile = false,
      onEdit,
      onMessage,
      onFollow,
      onSettings,
      tabs = [],
      logo,
      logoText,
      logoHref = "/",
      header,
      footer,
      loading = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || "overview");

    const renderProfileCard = () => (
      <UserProfileCard
        user={{
          name: user.name,
          username: user.username,
          avatarSrc: user.avatar,
          coverSrc: user.coverImage,
          bio: user.bio,
          role: user.role,
          location: user.location,
          verified: user.verified,
        }}
        stats={user.stats}
        size={variant === "minimal" ? "sm" : "md"}
        showCover={variant !== "minimal"}
        actions={
          <div className="flex gap-2">
            {isOwnProfile ? (
              <>
                <Button variant="outline" size="sm" onClick={onEdit} leftIcon={<EditIcon className="size-4" />}>
                  Edit Profile
                </Button>
                <IconButton
                  icon={<SettingsIcon className="size-4" />}
                  variant="ghost"
                  size="sm"
                  label="Settings"
                  onClick={onSettings}
                />
              </>
            ) : (
              <>
                <Button variant="primary" size="sm" onClick={onFollow}>
                  Follow
                </Button>
                <Button variant="outline" size="sm" onClick={onMessage}>
                  Message
                </Button>
              </>
            )}
          </div>
        }
      />
    );

    const renderAboutSection = () => (
      <Card variant="bordered">
        <CardHeader title="About" bordered />
        <CardBody>
          <DescriptionList variant="stacked" size="sm">
            {user.email && (
              <DescriptionListItem
                term="Email"
                icon={<MailIcon className="size-4 text-muted-foreground" />}
              >
                <Link href={`mailto:${user.email}`}>{user.email}</Link>
              </DescriptionListItem>
            )}
            {user.phone && (
              <DescriptionListItem
                term="Phone"
                icon={<PhoneIcon className="size-4 text-muted-foreground" />}
              >
                {user.phone}
              </DescriptionListItem>
            )}
            {user.location && (
              <DescriptionListItem
                term="Location"
                icon={<MapPinIcon className="size-4 text-muted-foreground" />}
              >
                {user.location}
              </DescriptionListItem>
            )}
            {user.company && (
              <DescriptionListItem
                term="Company"
                icon={<CalendarIcon className="size-4 text-muted-foreground" />}
              >
                {user.company}
              </DescriptionListItem>
            )}
            {user.website && (
              <DescriptionListItem
                term="Website"
                icon={<LinkIcon className="size-4 text-muted-foreground" />}
              >
                <Link href={user.website} target="_blank">
                  {user.website.replace(/^https?:\/\//, "")}
                </Link>
              </DescriptionListItem>
            )}
            {user.joinDate && (
              <DescriptionListItem
                term="Joined"
                icon={<CalendarIcon className="size-4 text-muted-foreground" />}
              >
                {user.joinDate}
              </DescriptionListItem>
            )}
          </DescriptionList>

          {user.social && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-2">Social</p>
              <div className="flex gap-2">
                {user.social.twitter && (
                  <IconButton
                    icon={<TwitterIcon className="size-4" />}
                    variant="ghost"
                    size="sm"
                    label="Twitter"
                    onClick={() => window.open(user.social?.twitter, "_blank")}
                  />
                )}
                {user.social.linkedin && (
                  <IconButton
                    icon={<LinkedInIcon className="size-4" />}
                    variant="ghost"
                    size="sm"
                    label="LinkedIn"
                    onClick={() => window.open(user.social?.linkedin, "_blank")}
                  />
                )}
                {user.social.github && (
                  <IconButton
                    icon={<GitHubIcon className="size-4" />}
                    variant="ghost"
                    size="sm"
                    label="GitHub"
                    onClick={() => window.open(user.social?.github, "_blank")}
                  />
                )}
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    );

    const renderActivitySection = () => (
      <Card variant="bordered">
        <CardHeader title="Recent Activity" bordered />
        <CardBody padding="none">
          <ActivityFeed
            activities={activities.map((a) => ({
              id: a.id,
              type: a.type as "comment" | "update" | "create" | "delete" | "assign" | "complete" | "other",
              description: a.description,
              timestamp: a.timestamp,
              icon: a.icon,
            }))}
            variant="compact"
          />
        </CardBody>
      </Card>
    );

    const renderContent = () => {
      if (tabs.length > 0) {
        return (
          <div className="space-y-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              variant="underline"
            >
              {tabs.map((tab) => (
                <Tab key={tab.id} value={tab.id}>
                  {tab.label}
                </Tab>
              ))}
            </Tabs>
            <div>
              {tabs.find((t) => t.id === activeTab)?.content}
            </div>
          </div>
        );
      }

      // Default content layout
      return (
        <div className={cn(
          "grid gap-6",
          layout === "sidebar" ? "lg:grid-cols-3" : "lg:grid-cols-1"
        )}>
          {layout === "sidebar" && (
            <div className="lg:col-span-1 space-y-6">
              {renderAboutSection()}
            </div>
          )}
          <div className={cn(
            "space-y-6",
            layout === "sidebar" ? "lg:col-span-2" : ""
          )}>
            {layout !== "sidebar" && renderAboutSection()}
            {activities.length > 0 && renderActivitySection()}
            {children}
          </div>
        </div>
      );
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
          actions={
            isOwnProfile && (
              <IconButton
                icon={<SettingsIcon className="size-5" />}
                variant="ghost"
                size="sm"
                label="Settings"
                onClick={onSettings}
              />
            )
          }
        />
      );
    };

    return (
      <PageLayout
        ref={ref}
        header={renderHeader()}
        footer={footer}
        className={className}
        {...props}
      >
        <PageContent maxWidth="4xl" padding="md">
          <PageSection>
            {renderProfileCard()}
          </PageSection>
          <PageSection>
            {renderContent()}
          </PageSection>
        </PageContent>
      </PageLayout>
    );
  },
);
ProfilePage.displayName = "ProfilePage";

// ProfilePageSkeleton for loading state
export interface ProfilePageSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ProfilePageSkeleton = forwardRef<HTMLDivElement, ProfilePageSkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("animate-pulse space-y-6", className)}
        {...props}
      >
        {/* Cover skeleton */}
        <div className="h-48 bg-muted rounded-lg" />
        {/* Avatar and name skeleton */}
        <div className="flex items-center gap-4 px-4 -mt-12">
          <div className="size-24 rounded-full bg-muted border-4 border-background" />
          <div className="space-y-2">
            <div className="h-6 w-32 bg-muted rounded" />
            <div className="h-4 w-24 bg-muted rounded" />
          </div>
        </div>
        {/* Content skeleton */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-64 bg-muted rounded-lg" />
          <div className="lg:col-span-2 h-96 bg-muted rounded-lg" />
        </div>
      </div>
    );
  },
);
ProfilePageSkeleton.displayName = "ProfilePageSkeleton";
