import { forwardRef, useState, type ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Input } from "@/components/atoms/Input";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/organisms/Modal";
import { Select, type SelectOption } from "@/components/molecules/Select";
import { MailIcon, XIcon, UsersIcon } from "@/lib/icons";

export type InviteRole = "viewer" | "editor" | "admin" | "owner";

export interface InvitedUser {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: InviteRole;
  status?: "pending" | "accepted";
}

export interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (data: { emails: string[]; role: InviteRole; message?: string }) => void;
  title?: string;
  subtitle?: ReactNode;
  itemName?: string;
  existingUsers?: InvitedUser[];
  onRemoveUser?: (userId: string) => void;
  onUpdateRole?: (userId: string, role: InviteRole) => void;
  availableRoles?: { value: InviteRole; label: string }[];
  defaultRole?: InviteRole;
  showMessage?: boolean;
  messagePlaceholder?: string;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

const defaultRoles: { value: InviteRole; label: string }[] = [
  { value: "viewer", label: "Viewer" },
  { value: "editor", label: "Editor" },
  { value: "admin", label: "Admin" },
];

export const InviteModal = forwardRef<HTMLDivElement, InviteModalProps>(
  (
    {
      isOpen,
      onClose,
      onInvite,
      title = "Invite people",
      subtitle,
      itemName,
      existingUsers = [],
      onRemoveUser,
      onUpdateRole,
      availableRoles = defaultRoles,
      defaultRole = "viewer",
      showMessage = true,
      messagePlaceholder = "Add a message (optional)",
      submitText = "Send invites",
      cancelText = "Cancel",
      loading,
      className,
    },
    ref,
  ) => {
    const [emailInput, setEmailInput] = useState("");
    const [emails, setEmails] = useState<string[]>([]);
    const [role, setRole] = useState<InviteRole>(defaultRole);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const addEmail = () => {
      const trimmedEmail = emailInput.trim().toLowerCase();

      if (!trimmedEmail) return;

      if (!validateEmail(trimmedEmail)) {
        setError("Please enter a valid email address");
        return;
      }

      if (emails.includes(trimmedEmail)) {
        setError("This email has already been added");
        return;
      }

      if (existingUsers.some((u) => u.email.toLowerCase() === trimmedEmail)) {
        setError("This user has already been invited");
        return;
      }

      setEmails((prev) => [...prev, trimmedEmail]);
      setEmailInput("");
      setError("");
    };

    const removeEmail = (email: string) => {
      setEmails((prev) => prev.filter((e) => e !== email));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addEmail();
      }
    };

    const handleSubmit = () => {
      if (emails.length === 0) return;
      onInvite({
        emails,
        role,
        message: showMessage ? message : undefined,
      });
    };

    const handleClose = () => {
      setEmailInput("");
      setEmails([]);
      setRole(defaultRole);
      setMessage("");
      setError("");
      onClose();
    };

    const roleOptions: SelectOption[] = availableRoles.map((r) => ({
      value: r.value,
      label: r.label,
    }));

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        size="md"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={itemName ? `Invite to "${itemName}"` : title}
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-4">
            {/* Email input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email addresses
              </label>
              <div className="flex gap-2">
                <Input
                  value={emailInput}
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                    setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter email address"
                  disabled={loading}
                  leftIcon={<MailIcon className="size-4" />}
                  error={!!error}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={addEmail}
                  disabled={!emailInput.trim() || loading}
                >
                  Add
                </Button>
              </div>
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>

            {/* Added emails */}
            {emails.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {emails.map((email) => (
                  <Badge key={email} soft className="gap-1 pr-1">
                    {email}
                    <button
                      type="button"
                      onClick={() => removeEmail(email)}
                      disabled={loading}
                      className="rounded-full p-0.5 hover:bg-foreground/10"
                    >
                      <XIcon className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Role selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Permission level
              </label>
              <Select
                value={role}
                onChange={(value) => setRole(value as InviteRole)}
                options={roleOptions}
                disabled={loading}
              />
            </div>

            {/* Message */}
            {showMessage && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Message
                </label>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={messagePlaceholder}
                  disabled={loading}
                />
              </div>
            )}

            {/* Existing users */}
            {existingUsers.length > 0 && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <UsersIcon className="size-4" />
                  People with access
                </label>
                <div className="max-h-40 space-y-2 overflow-y-auto rounded-lg border border-border p-2">
                  {existingUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50"
                    >
                      <Avatar
                        src={user.avatar}
                        alt={user.name || user.email}
                        fallback={user.name?.[0] || user.email[0]}
                        size="sm"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {user.name || user.email}
                        </p>
                        {user.name && (
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        )}
                      </div>
                      {user.status === "pending" && (
                        <Badge soft className="shrink-0">
                          Pending
                        </Badge>
                      )}
                      {onUpdateRole ? (
                        <Select
                          value={user.role}
                          onChange={(value) =>
                            onUpdateRole(user.id, value as InviteRole)
                          }
                          options={roleOptions}
                          disabled={loading}
                          className="w-24 shrink-0"
                        />
                      ) : (
                        <Badge variant="outline" className="shrink-0 capitalize">
                          {user.role}
                        </Badge>
                      )}
                      {onRemoveUser && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveUser(user.id)}
                          disabled={loading}
                          className="size-8 shrink-0 p-0"
                        >
                          <XIcon className="size-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={emails.length === 0}
          >
            {submitText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
InviteModal.displayName = "InviteModal";

// TeamInviteModal - Convenience for team invitations
export interface TeamInviteModalProps extends Omit<InviteModalProps, "title" | "availableRoles"> {
  teamName?: string;
}

export const TeamInviteModal = forwardRef<HTMLDivElement, TeamInviteModalProps>(
  ({ teamName, ...props }, ref) => {
    return (
      <InviteModal
        ref={ref}
        title={teamName ? `Invite to ${teamName}` : "Invite team members"}
        availableRoles={[
          { value: "viewer", label: "Member" },
          { value: "admin", label: "Admin" },
          { value: "owner", label: "Owner" },
        ]}
        {...props}
      />
    );
  },
);
TeamInviteModal.displayName = "TeamInviteModal";
