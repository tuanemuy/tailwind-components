import { forwardRef } from "react";
import { Button } from "@/components/atoms/Button";
import {
  DiscordIcon,
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  TwitterIcon,
  YouTubeIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";
import { type SocialPlatform, socialPlatformConfig } from "@/components/variants";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  followers?: string | number;
  label?: string;
}

const iconComponents: Record<
  SocialPlatform,
  React.FC<{ className?: string }>
> = {
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  github: GitHubIcon,
  discord: DiscordIcon,
  tiktok: TikTokIcon,
};

export interface FollowUsCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  socialLinks: SocialLink[];
  variant?: "default" | "compact" | "list" | "grid";
}

export const FollowUsCard = forwardRef<HTMLDivElement, FollowUsCardProps>(
  (
    {
      className,
      title = "Follow Us",
      description,
      socialLinks,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    if (variant === "compact") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-xl border border-border bg-card p-4",
            className,
          )}
          {...props}
        >
          <p className="mb-3 text-sm font-medium text-foreground">{title}</p>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link) => {
              const config = socialPlatformConfig[link.platform];
              const Icon = iconComponents[link.platform];
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg transition-colors",
                    config.color,
                    config.hoverColor,
                  )}
                  aria-label={config.name}
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>
      );
    }

    if (variant === "list") {
      return (
        <div
          ref={ref}
          className={cn("rounded-xl border border-border bg-card", className)}
          {...props}
        >
          {(title || description) && (
            <div className="border-b border-border p-4">
              {title && (
                <h3 className="font-semibold text-foreground">{title}</h3>
              )}
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          )}
          <div className="divide-y divide-border">
            {socialLinks.map((link) => {
              const config = socialPlatformConfig[link.platform];
              const Icon = iconComponents[link.platform];
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-x-3">
                    <div
                      className={cn(
                        "flex size-10 items-center justify-center rounded-lg",
                        config.color,
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {link.label || config.name}
                      </p>
                      {link.followers && (
                        <p className="text-sm text-muted-foreground">
                          {typeof link.followers === "number"
                            ? `${link.followers.toLocaleString()} followers`
                            : link.followers}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </a>
              );
            })}
          </div>
        </div>
      );
    }

    if (variant === "grid") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-xl border border-border bg-card p-4",
            className,
          )}
          {...props}
        >
          {(title || description) && (
            <div className="mb-4 text-center">
              {title && (
                <h3 className="font-semibold text-foreground">{title}</h3>
              )}
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            {socialLinks.map((link) => {
              const config = socialPlatformConfig[link.platform];
              const Icon = iconComponents[link.platform];
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex flex-col items-center justify-center rounded-lg p-4 transition-colors",
                    config.color,
                    config.hoverColor,
                  )}
                >
                  <Icon className="size-6" />
                  <p className="mt-2 text-xs font-medium">{config.name}</p>
                  {link.followers && (
                    <p className="text-xs opacity-70">
                      {typeof link.followers === "number"
                        ? link.followers.toLocaleString()
                        : link.followers}
                    </p>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn("rounded-xl border border-border bg-card p-6", className)}
        {...props}
      >
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {socialLinks.map((link) => {
            const config = socialPlatformConfig[link.platform];
            const Icon = iconComponents[link.platform];
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex size-12 items-center justify-center rounded-full transition-colors",
                  config.color,
                  config.hoverColor,
                )}
                aria-label={config.name}
              >
                <Icon className="size-5" />
              </a>
            );
          })}
        </div>
      </div>
    );
  },
);
FollowUsCard.displayName = "FollowUsCard";
