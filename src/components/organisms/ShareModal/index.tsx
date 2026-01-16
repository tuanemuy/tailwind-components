import { forwardRef, type ReactNode, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/organisms/Modal";
import { CheckIcon, CopyIcon, GlobeIcon, LinkIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type ShareAccess = "private" | "restricted" | "public";

export interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare?: (data: { access: ShareAccess; email?: string }) => void;
  title?: string;
  subtitle?: ReactNode;
  shareUrl: string;
  itemName?: string;
  currentAccess?: ShareAccess;
  showAccessOptions?: boolean;
  showCopyLink?: boolean;
  showSocialShare?: boolean;
  submitText?: string;
  loading?: boolean;
  className?: string;
}

export const ShareModal = forwardRef<HTMLDivElement, ShareModalProps>(
  (
    {
      isOpen,
      onClose,
      onShare,
      title = "Share",
      subtitle,
      shareUrl,
      itemName,
      currentAccess = "private",
      showAccessOptions = true,
      showCopyLink = true,
      showSocialShare = false,
      submitText = "Done",
      loading,
      className,
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);
    const [access, setAccess] = useState<ShareAccess>(currentAccess);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    };

    const handleAccessChange = (newAccess: ShareAccess) => {
      setAccess(newAccess);
      onShare?.({ access: newAccess });
    };

    const accessOptions: {
      value: ShareAccess;
      label: string;
      description: string;
      icon: ReactNode;
    }[] = [
      {
        value: "private",
        label: "Private",
        description: "Only you can access",
        icon: <span className="size-2 rounded-full bg-muted-foreground" />,
      },
      {
        value: "restricted",
        label: "Restricted",
        description: "Only people with the link",
        icon: <LinkIcon className="size-4" />,
      },
      {
        value: "public",
        label: "Public",
        description: "Anyone on the internet",
        icon: <GlobeIcon className="size-4" />,
      },
    ];

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={itemName ? `Share "${itemName}"` : title}
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-6">
            {/* Copy link */}
            {showCopyLink && (
              <div>
                <label
                  htmlFor="share-link-input"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Share link
                </label>
                <div className="flex gap-2">
                  <Input
                    id="share-link-input"
                    value={shareUrl}
                    readOnly
                    className="flex-1"
                    leftIcon={<LinkIcon className="size-4" />}
                  />
                  <Button
                    variant={copied ? "primary" : "outline"}
                    onClick={handleCopy}
                    className="shrink-0"
                  >
                    {copied ? (
                      <>
                        <CheckIcon className="size-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <CopyIcon className="size-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Access options */}
            {showAccessOptions && (
              <div>
                <span className="mb-2 block text-sm font-medium text-foreground">
                  Who can access
                </span>
                <div className="space-y-2">
                  {accessOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAccessChange(option.value)}
                      disabled={loading}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg border p-3 text-start transition-colors",
                        access === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground/50 hover:bg-muted/50",
                      )}
                    >
                      <span className="flex size-8 items-center justify-center rounded-full bg-muted">
                        {option.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground">
                          {option.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      {access === option.value && (
                        <CheckIcon className="size-5 shrink-0 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Social share */}
            {showSocialShare && (
              <div>
                <span className="mb-2 block text-sm font-medium text-foreground">
                  Share via
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
                        "_blank",
                      );
                    }}
                  >
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                        "_blank",
                      );
                    }}
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      window.open(
                        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`,
                        "_blank",
                      );
                    }}
                  >
                    LinkedIn
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="primary" onClick={onClose}>
            {submitText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
ShareModal.displayName = "ShareModal";
