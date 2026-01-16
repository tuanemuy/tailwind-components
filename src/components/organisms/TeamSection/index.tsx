import { forwardRef, type ReactNode } from "react";
import { Avatar } from "@/components/atoms";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

// Types
export interface TeamMemberSocial {
  platform: "twitter" | "linkedin" | "github" | "custom";
  url: string;
  icon?: ReactNode;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initials?: string;
  bio?: string;
  socials?: TeamMemberSocial[];
}

// TeamSection component
export interface TeamSectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: "sm" | "md" | "lg" | "xl";
  backgroundColor?: "default" | "muted";
}

const paddingClasses = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  xl: "py-32 md:py-40",
};

const backgroundClasses = {
  default: "bg-background",
  muted: "bg-muted/50",
};

export const TeamSection = forwardRef<HTMLElement, TeamSectionProps>(
  (
    {
      className,
      padding = "lg",
      backgroundColor = "default",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          paddingClasses[padding],
          backgroundClasses[backgroundColor],
          className,
        )}
        {...props}
      >
        <div className="container mx-auto px-4">{children}</div>
      </section>
    );
  },
);
TeamSection.displayName = "TeamSection";

// TeamSectionHeader component
export interface TeamSectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export const TeamSectionHeader = forwardRef<
  HTMLDivElement,
  TeamSectionHeaderProps
>(({ className, align = "center", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mb-12 md:mb-16",
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-2xl text-left",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TeamSectionHeader.displayName = "TeamSectionHeader";

// TeamSectionTitle component
export interface TeamSectionTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3";
}

export const TeamSectionTitle = forwardRef<
  HTMLHeadingElement,
  TeamSectionTitleProps
>(({ className, as: Component = "h2", children, ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn(
        "text-3xl font-bold text-foreground md:text-4xl",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
TeamSectionTitle.displayName = "TeamSectionTitle";

// TeamSectionSubtitle component
export interface TeamSectionSubtitleProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const TeamSectionSubtitle = forwardRef<
  HTMLParagraphElement,
  TeamSectionSubtitleProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("mt-4 text-lg text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
});
TeamSectionSubtitle.displayName = "TeamSectionSubtitle";

// TeamGrid component
export interface TeamGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

const columnClasses = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const gapClasses = {
  sm: "gap-4",
  md: "gap-6 md:gap-8",
  lg: "gap-8 md:gap-12",
};

export const TeamGrid = forwardRef<HTMLDivElement, TeamGridProps>(
  ({ className, columns = 4, gap = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          columnClasses[columns],
          gapClasses[gap],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TeamGrid.displayName = "TeamGrid";

// TeamMemberCard component
export interface TeamMemberCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  member: TeamMember;
  variant?: "simple" | "card" | "detailed";
  avatarSize?: "sm" | "md" | "lg" | "xl";
  showBio?: boolean;
  showSocials?: boolean;
}

const avatarSizeMap = {
  sm: "md" as const,
  md: "lg" as const,
  lg: "xl" as const,
  xl: "xl" as const,
};

const avatarSizeClasses = {
  sm: "size-16",
  md: "size-20",
  lg: "size-24",
  xl: "size-32",
};

const cardVariants = {
  simple: "",
  card: "rounded-xl bg-card p-6 shadow-sm border border-border",
  detailed: "rounded-xl bg-card p-8 shadow-md",
};

export const TeamMemberCard = forwardRef<HTMLDivElement, TeamMemberCardProps>(
  (
    {
      className,
      member,
      variant = "simple",
      avatarSize = "md",
      showBio = false,
      showSocials = true,
      ...props
    },
    ref,
  ) => {
    const getSocialIcon = (social: TeamMemberSocial) => {
      if (social.icon) return social.icon;
      switch (social.platform) {
        case "twitter":
          return <TwitterIcon className="size-4" />;
        case "linkedin":
          return <LinkedInIcon className="size-4" />;
        case "github":
          return <GitHubIcon className="size-4" />;
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn("text-center", cardVariants[variant], className)}
        {...props}
      >
        {/* Avatar */}
        <div className="flex justify-center">
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className={cn(
                "rounded-full object-cover",
                avatarSizeClasses[avatarSize],
              )}
            />
          ) : (
            <Avatar
              alt={member.name}
              initials={member.initials}
              size={avatarSizeMap[avatarSize]}
            />
          )}
        </div>

        {/* Info */}
        <div className="mt-4">
          <h3 className="font-semibold text-foreground">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>

        {/* Bio */}
        {showBio && member.bio && (
          <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
        )}

        {/* Social Links */}
        {showSocials && member.socials && member.socials.length > 0 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {member.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {getSocialIcon(social)}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  },
);
TeamMemberCard.displayName = "TeamMemberCard";

// TeamMemberList component (horizontal layout)
export interface TeamMemberListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  members: TeamMember[];
  variant?: "compact" | "detailed";
}

export const TeamMemberList = forwardRef<HTMLDivElement, TeamMemberListProps>(
  ({ className, members, variant = "compact", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("divide-y divide-border", className)}
        {...props}
      >
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
          >
            {member.avatar ? (
              <img
                src={member.avatar}
                alt={member.name}
                className="size-12 rounded-full object-cover"
              />
            ) : (
              <Avatar alt={member.name} initials={member.initials} size="md" />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-foreground">{member.name}</div>
              <div className="text-sm text-muted-foreground">{member.role}</div>
            </div>
            {variant === "detailed" &&
              member.socials &&
              member.socials.length > 0 && (
                <div className="flex items-center gap-1">
                  {member.socials.slice(0, 3).map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {social.platform === "twitter" && (
                        <TwitterIcon className="size-4" />
                      )}
                      {social.platform === "linkedin" && (
                        <LinkedInIcon className="size-4" />
                      )}
                      {social.platform === "github" && (
                        <GitHubIcon className="size-4" />
                      )}
                    </a>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    );
  },
);
TeamMemberList.displayName = "TeamMemberList";

// FeaturedTeamMember component
export interface FeaturedTeamMemberProps
  extends React.HTMLAttributes<HTMLDivElement> {
  member: TeamMember;
  quote?: string;
  imagePosition?: "left" | "right";
}

export const FeaturedTeamMember = forwardRef<
  HTMLDivElement,
  FeaturedTeamMemberProps
>(({ className, member, quote, imagePosition = "left", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid items-center gap-8 md:gap-12 lg:grid-cols-2",
        imagePosition === "right" && "lg:[&>*:first-child]:order-2",
        className,
      )}
      {...props}
    >
      {/* Image */}
      <div className="flex justify-center lg:justify-start">
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            className="size-64 rounded-2xl object-cover shadow-lg md:size-80"
          />
        ) : (
          <div className="flex size-64 items-center justify-center rounded-2xl bg-muted text-6xl font-bold text-muted-foreground md:size-80">
            {member.initials}
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        {quote && (
          <blockquote className="mb-6 text-xl italic text-muted-foreground md:text-2xl">
            "{quote}"
          </blockquote>
        )}
        <div>
          <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
          <p className="text-muted-foreground">{member.role}</p>
        </div>
        {member.bio && (
          <p className="mt-4 text-muted-foreground">{member.bio}</p>
        )}
        {member.socials && member.socials.length > 0 && (
          <div className="mt-6 flex items-center gap-3">
            {member.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {social.platform === "twitter" && (
                  <TwitterIcon className="size-5" />
                )}
                {social.platform === "linkedin" && (
                  <LinkedInIcon className="size-5" />
                )}
                {social.platform === "github" && (
                  <GitHubIcon className="size-5" />
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
FeaturedTeamMember.displayName = "FeaturedTeamMember";

// CompleteTeamSection component - pre-composed full team section
export interface CompleteTeamSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  members: TeamMember[];
  variant?: TeamMemberCardProps["variant"];
  columns?: TeamGridProps["columns"];
  showBio?: boolean;
  showSocials?: boolean;
  featuredMember?: TeamMember & { quote?: string };
}

export const CompleteTeamSection = forwardRef<
  HTMLElement,
  CompleteTeamSectionProps
>(
  (
    {
      className,
      title,
      subtitle,
      members,
      variant = "simple",
      columns = 4,
      showBio = false,
      showSocials = true,
      featuredMember,
      ...props
    },
    ref,
  ) => {
    return (
      <TeamSection ref={ref} className={className} {...props}>
        <TeamSectionHeader>
          <TeamSectionTitle>{title}</TeamSectionTitle>
          {subtitle && <TeamSectionSubtitle>{subtitle}</TeamSectionSubtitle>}
        </TeamSectionHeader>

        {featuredMember && (
          <div className="mb-16">
            <FeaturedTeamMember
              member={featuredMember}
              quote={featuredMember.quote}
            />
          </div>
        )}

        <TeamGrid columns={columns}>
          {members.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              variant={variant}
              showBio={showBio}
              showSocials={showSocials}
            />
          ))}
        </TeamGrid>
      </TeamSection>
    );
  },
);
CompleteTeamSection.displayName = "CompleteTeamSection";
