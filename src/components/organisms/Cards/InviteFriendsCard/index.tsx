import { forwardRef, useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import {
  CheckIcon,
  CopyIcon,
  GiftIcon,
  LinkIcon,
  MailIcon,
  ShareIcon,
  UserPlusIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

export interface InviteReward {
  type: "discount" | "credits" | "subscription" | "custom";
  value: string;
  description?: string;
}

export interface InviteFriendsCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "compact" | "featured" | "horizontal";
  title?: string;
  description?: string;
  referralCode?: string;
  referralLink?: string;
  reward?: InviteReward;
  invitesSent?: number;
  invitesAccepted?: number;
  recentInvites?: {
    name: string;
    avatarFallback?: string;
    status: "pending" | "accepted";
  }[];
  onInviteByEmail?: (email: string) => void;
  onCopyCode?: (code: string) => void;
  onCopyLink?: (link: string) => void;
  onShare?: () => void;
}

export const InviteFriendsCard = forwardRef<
  HTMLDivElement,
  InviteFriendsCardProps
>(
  (
    {
      className,
      variant = "default",
      title = "Invite Friends",
      description = "Invite your friends and earn rewards when they sign up.",
      referralCode,
      referralLink,
      reward,
      invitesSent,
      invitesAccepted,
      recentInvites,
      onInviteByEmail,
      onCopyCode,
      onCopyLink,
      onShare,
      ...props
    },
    ref,
  ) => {
    const [email, setEmail] = useState("");
    const [codeCopied, setCodeCopied] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    const handleCopyCode = () => {
      if (referralCode) {
        navigator.clipboard.writeText(referralCode);
        setCodeCopied(true);
        setTimeout(() => setCodeCopied(false), 2000);
        onCopyCode?.(referralCode);
      }
    };

    const handleCopyLink = () => {
      if (referralLink) {
        navigator.clipboard.writeText(referralLink);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
        onCopyLink?.(referralLink);
      }
    };

    const handleInvite = () => {
      if (email && onInviteByEmail) {
        onInviteByEmail(email);
        setEmail("");
      }
    };

    // Featured variant
    if (variant === "featured") {
      return (
        <div
          ref={ref}
          className={cn(
            "overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-border",
            className,
          )}
          {...props}
        >
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-x-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <GiftIcon className="size-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                <p className="mt-1 text-muted-foreground">{description}</p>
              </div>
            </div>

            {/* Reward Banner */}
            {reward && (
              <div className="mt-6 rounded-xl bg-success/10 p-4">
                <div className="flex items-center gap-x-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-success/20 text-success">
                    <GiftIcon className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {reward.value}
                    </p>
                    {reward.description && (
                      <p className="text-sm text-muted-foreground">
                        {reward.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Email Invite */}
            {onInviteByEmail && (
              <div className="mt-6">
                <span className="mb-2 block text-sm font-medium text-foreground">
                  Invite by email
                </span>
                <div className="flex gap-x-2">
                  <Input
                    type="email"
                    placeholder="friend@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleInvite}>
                    <MailIcon className="mr-1.5 size-4" />
                    Send
                  </Button>
                </div>
              </div>
            )}

            {/* Referral Code */}
            {referralCode && (
              <div className="mt-6">
                <span className="mb-2 block text-sm font-medium text-foreground">
                  Your referral code
                </span>
                <div className="flex items-center gap-x-2 rounded-lg border border-border bg-muted/50 p-3">
                  <code className="flex-1 font-mono text-lg font-semibold text-foreground">
                    {referralCode}
                  </code>
                  <Button variant="outline" size="sm" onClick={handleCopyCode}>
                    {codeCopied ? (
                      <>
                        <CheckIcon className="mr-1.5 size-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <CopyIcon className="mr-1.5 size-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Referral Link */}
            {referralLink && (
              <div className="mt-4">
                <span className="mb-2 block text-sm font-medium text-foreground">
                  Or share your link
                </span>
                <div className="flex items-center gap-x-2">
                  <Input
                    value={referralLink}
                    readOnly
                    className="flex-1 font-mono text-sm"
                  />
                  <Button variant="outline" size="sm" onClick={handleCopyLink}>
                    {linkCopied ? (
                      <CheckIcon className="size-4" />
                    ) : (
                      <LinkIcon className="size-4" />
                    )}
                  </Button>
                  {onShare && (
                    <Button variant="outline" size="sm" onClick={onShare}>
                      <ShareIcon className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Stats */}
            {(invitesSent !== undefined || invitesAccepted !== undefined) && (
              <div className="mt-6 flex gap-x-6 border-t border-border pt-6">
                {invitesSent !== undefined && (
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {invitesSent}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Invites sent
                    </p>
                  </div>
                )}
                {invitesAccepted !== undefined && (
                  <div>
                    <p className="text-2xl font-bold text-success">
                      {invitesAccepted}
                    </p>
                    <p className="text-sm text-muted-foreground">Joined</p>
                  </div>
                )}
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
            "flex items-center justify-between gap-x-4 rounded-xl border border-border bg-card p-4",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-x-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UserPlusIcon className="size-6" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{title}</h4>
              {reward && (
                <p className="text-sm text-muted-foreground">
                  Earn {reward.value} per referral
                </p>
              )}
            </div>
          </div>
          {referralCode && (
            <div className="flex items-center gap-x-2">
              <code className="rounded-lg bg-muted px-3 py-1.5 font-mono text-sm font-medium">
                {referralCode}
              </code>
              <Button variant="outline" size="sm" onClick={handleCopyCode}>
                {codeCopied ? (
                  <CheckIcon className="size-4" />
                ) : (
                  <CopyIcon className="size-4" />
                )}
              </Button>
            </div>
          )}
        </div>
      );
    }

    // Compact variant
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
          <div className="flex items-center gap-x-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UserPlusIcon className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate font-medium text-foreground">{title}</h4>
              {reward && (
                <p className="text-xs text-muted-foreground">
                  Get {reward.value}
                </p>
              )}
            </div>
            <Button size="sm" onClick={onShare}>
              Share
            </Button>
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
        <div className="flex items-start gap-x-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UserPlusIcon className="size-6" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>

        {reward && (
          <div className="mt-4 flex items-center gap-x-2 rounded-lg bg-success/10 px-3 py-2">
            <GiftIcon className="size-4 text-success" />
            <span className="text-sm font-medium text-foreground">
              {reward.value}
            </span>
          </div>
        )}

        {referralCode && (
          <div className="mt-4">
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-3 py-2">
              <code className="font-mono font-semibold text-foreground">
                {referralCode}
              </code>
              <Button variant="ghost" size="sm" onClick={handleCopyCode}>
                {codeCopied ? (
                  <CheckIcon className="size-4" />
                ) : (
                  <CopyIcon className="size-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        {onInviteByEmail && (
          <div className="mt-4 flex gap-x-2">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleInvite}>Invite</Button>
          </div>
        )}

        {recentInvites && recentInvites.length > 0 && (
          <div className="mt-4 border-t border-border pt-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Recent invites
            </p>
            <div className="space-y-2">
              {recentInvites.slice(0, 3).map((invite) => (
                <div
                  key={`${invite.name}-${invite.status}`}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-x-2">
                    <Avatar
                      fallback={invite.avatarFallback || invite.name.charAt(0)}
                      size="xs"
                    />
                    <span className="text-sm text-foreground">
                      {invite.name}
                    </span>
                  </div>
                  <Badge
                    variant={
                      invite.status === "accepted" ? "success" : "secondary"
                    }
                    size="sm"
                  >
                    {invite.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);
InviteFriendsCard.displayName = "InviteFriendsCard";
