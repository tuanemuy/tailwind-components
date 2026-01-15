import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { SmartphoneIcon, StarIcon } from "@/lib/icons";

// App Store Badge Icons (inline SVGs for better customization)
const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const GooglePlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.64.71.64 1.19s-.09.85-.41 1.13l-2.09 1.09-2.47-2.47 2.47-2.47 1.86.97V10.81zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
  </svg>
);

export interface AppDownloadCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "horizontal" | "minimal" | "featured";
  appName: string;
  appIcon?: React.ReactNode;
  appIconUrl?: string;
  tagline?: string;
  description?: string;
  rating?: number;
  reviewCount?: string;
  version?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  mockupImage?: string;
  qrCodeUrl?: string;
  showBadges?: boolean;
  isNew?: boolean;
  onAppStoreClick?: () => void;
  onPlayStoreClick?: () => void;
}

export const AppDownloadCard = forwardRef<HTMLDivElement, AppDownloadCardProps>(
  (
    {
      className,
      variant = "default",
      appName,
      appIcon,
      appIconUrl,
      tagline,
      description,
      rating,
      reviewCount,
      version,
      appStoreUrl,
      playStoreUrl,
      mockupImage,
      qrCodeUrl,
      showBadges = true,
      isNew = false,
      onAppStoreClick,
      onPlayStoreClick,
      ...props
    },
    ref
  ) => {
    const renderAppIcon = () => {
      if (appIcon) return appIcon;
      if (appIconUrl) {
        return (
          <img
            src={appIconUrl}
            alt={`${appName} icon`}
            className="h-full w-full rounded-xl"
          />
        );
      }
      return <SmartphoneIcon className="size-8 text-primary" />;
    };

    const renderStoreBadges = () => (
      <div className="flex flex-wrap gap-2">
        {(appStoreUrl || onAppStoreClick) && (
          <a
            href={appStoreUrl}
            onClick={(e) => {
              if (onAppStoreClick) {
                e.preventDefault();
                onAppStoreClick();
              }
            }}
            className="inline-flex h-10 items-center gap-x-2 rounded-lg bg-foreground px-4 text-background transition-opacity hover:opacity-90"
          >
            <AppleIcon className="size-5" />
            <div className="text-left">
              <p className="text-[10px] leading-none">Download on the</p>
              <p className="text-sm font-semibold leading-tight">App Store</p>
            </div>
          </a>
        )}
        {(playStoreUrl || onPlayStoreClick) && (
          <a
            href={playStoreUrl}
            onClick={(e) => {
              if (onPlayStoreClick) {
                e.preventDefault();
                onPlayStoreClick();
              }
            }}
            className="inline-flex h-10 items-center gap-x-2 rounded-lg bg-foreground px-4 text-background transition-opacity hover:opacity-90"
          >
            <GooglePlayIcon className="size-5" />
            <div className="text-left">
              <p className="text-[10px] leading-none">GET IT ON</p>
              <p className="text-sm font-semibold leading-tight">Google Play</p>
            </div>
          </a>
        )}
      </div>
    );

    // Featured variant with mockup
    if (variant === "featured") {
      return (
        <div
          ref={ref}
          className={cn(
            "overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-border",
            className
          )}
          {...props}
        >
          <div className="flex flex-col md:flex-row">
            {/* Content */}
            <div className="flex-1 p-6 md:p-8">
              <div className="flex items-start gap-x-4">
                <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-background shadow-sm">
                  {renderAppIcon()}
                </div>
                <div>
                  <div className="flex items-center gap-x-2">
                    <h3 className="text-xl font-bold text-foreground">{appName}</h3>
                    {isNew && <Badge variant="default">New</Badge>}
                  </div>
                  {tagline && (
                    <p className="text-muted-foreground">{tagline}</p>
                  )}
                </div>
              </div>

              {description && (
                <p className="mt-4 text-muted-foreground">{description}</p>
              )}

              {rating && (
                <div className="mt-4 flex items-center gap-x-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={cn(
                          "size-4",
                          i < Math.floor(rating)
                            ? "fill-warning text-warning"
                            : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
                  {reviewCount && (
                    <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
                  )}
                </div>
              )}

              {showBadges && <div className="mt-6">{renderStoreBadges()}</div>}

              {qrCodeUrl && (
                <div className="mt-6 flex items-center gap-x-3">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="size-16 rounded-lg"
                  />
                  <p className="text-sm text-muted-foreground">
                    Scan to download
                  </p>
                </div>
              )}
            </div>

            {/* Mockup */}
            {mockupImage && (
              <div className="relative flex items-end justify-center p-6 md:w-1/3">
                <img
                  src={mockupImage}
                  alt={`${appName} mockup`}
                  className="h-64 w-auto object-contain md:h-80"
                />
              </div>
            )}
          </div>
        </div>
      );
    }

    // Horizontal variant
    if (variant === "horizontal") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-x-4 rounded-xl border border-border bg-card p-4",
            className
          )}
          {...props}
        >
          <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-muted">
            {renderAppIcon()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-x-2">
              <h4 className="truncate font-semibold text-foreground">{appName}</h4>
              {isNew && <Badge variant="default" size="sm">New</Badge>}
            </div>
            {tagline && (
              <p className="truncate text-sm text-muted-foreground">{tagline}</p>
            )}
            {rating && (
              <div className="mt-1 flex items-center gap-x-1">
                <StarIcon className="size-3.5 fill-warning text-warning" />
                <span className="text-sm font-medium text-foreground">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          {showBadges && (
            <div className="flex gap-x-2">
              {(appStoreUrl || onAppStoreClick) && (
                appStoreUrl ? (
                  <a
                    href={appStoreUrl}
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <AppleIcon className="size-4" />
                  </a>
                ) : (
                  <Button variant="outline" size="sm" className="size-8 p-0" onClick={onAppStoreClick}>
                    <AppleIcon className="size-4" />
                  </Button>
                )
              )}
              {(playStoreUrl || onPlayStoreClick) && (
                playStoreUrl ? (
                  <a
                    href={playStoreUrl}
                    className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <GooglePlayIcon className="size-4" />
                  </a>
                ) : (
                  <Button variant="outline" size="sm" className="size-8 p-0" onClick={onPlayStoreClick}>
                    <GooglePlayIcon className="size-4" />
                  </Button>
                )
              )}
            </div>
          )}
        </div>
      );
    }

    // Minimal variant
    if (variant === "minimal") {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-x-3 rounded-lg p-3 hover:bg-muted/50",
            className
          )}
          {...props}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            {renderAppIcon()}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-sm font-medium text-foreground">{appName}</h4>
            {rating && (
              <div className="flex items-center gap-x-1">
                <StarIcon className="size-3 fill-warning text-warning" />
                <span className="text-xs text-muted-foreground">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <Button variant="outline" size="sm">
            Get
          </Button>
        </div>
      );
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card p-6",
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-x-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-muted">
            {renderAppIcon()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-x-2">
              <h3 className="font-semibold text-foreground">{appName}</h3>
              {isNew && <Badge variant="default" size="sm">New</Badge>}
            </div>
            {tagline && (
              <p className="text-sm text-muted-foreground">{tagline}</p>
            )}
            {rating && (
              <div className="mt-1 flex items-center gap-x-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={cn(
                        "size-3.5",
                        i < Math.floor(rating)
                          ? "fill-warning text-warning"
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {rating.toFixed(1)}
                  {reviewCount && ` (${reviewCount})`}
                </span>
              </div>
            )}
          </div>
        </div>

        {description && (
          <p className="mt-4 text-sm text-muted-foreground">{description}</p>
        )}

        {showBadges && <div className="mt-4">{renderStoreBadges()}</div>}

        {version && (
          <p className="mt-4 text-xs text-muted-foreground">Version {version}</p>
        )}
      </div>
    );
  }
);
AppDownloadCard.displayName = "AppDownloadCard";
