import { forwardRef, useRef, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textarea";
import { FormField } from "@/components/molecules/FormField";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/organisms/Layout/Modal";
import {
  FileIcon,
  ImageIcon,
  MailIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// ============================================
// ComposeModal (Email/Message Composer)
// ============================================
export interface Recipient {
  email: string;
  name?: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface ComposeData {
  to: Recipient[];
  cc?: Recipient[];
  bcc?: Recipient[];
  subject: string;
  body: string;
  attachments?: Attachment[];
  isHtml?: boolean;
  priority?: "low" | "normal" | "high";
  scheduledAt?: Date | null;
}

export interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (data: ComposeData) => void;
  onSaveDraft?: (data: ComposeData) => void;
  initialData?: Partial<ComposeData>;
  title?: string;
  showCc?: boolean;
  showBcc?: boolean;
  showPriority?: boolean;
  showSchedule?: boolean;
  maxAttachmentSize?: number; // in bytes
  acceptedFileTypes?: string[];
  sendText?: string;
  draftText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

export const ComposeModal = forwardRef<HTMLDivElement, ComposeModalProps>(
  (
    {
      isOpen,
      onClose,
      onSend,
      onSaveDraft,
      initialData = {},
      title = "Compose Message",
      showCc = true,
      showBcc = true,
      showPriority = false,
      showSchedule: _showSchedule = false,
      maxAttachmentSize = 25 * 1024 * 1024, // 25MB
      acceptedFileTypes = ["*"],
      sendText = "Send",
      draftText = "Save Draft",
      cancelText = "Discard",
      loading,
      className,
    },
    ref,
  ) => {
    const [formData, setFormData] = useState<ComposeData>({
      to: initialData.to || [],
      cc: initialData.cc || [],
      bcc: initialData.bcc || [],
      subject: initialData.subject || "",
      body: initialData.body || "",
      attachments: initialData.attachments || [],
      isHtml: initialData.isHtml || false,
      priority: initialData.priority || "normal",
      scheduledAt: initialData.scheduledAt || null,
    });

    const [showCcField, setShowCcField] = useState(
      initialData.cc && initialData.cc.length > 0,
    );
    const [showBccField, setShowBccField] = useState(
      initialData.bcc && initialData.bcc.length > 0,
    );
    const [newRecipient, setNewRecipient] = useState({
      to: "",
      cc: "",
      bcc: "",
    });
    const [errors, setErrors] = useState<
      Partial<Record<keyof ComposeData, string>>
    >({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const addRecipient = (field: "to" | "cc" | "bcc") => {
      const email = newRecipient[field].trim();
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const currentList = formData[field] || [];
        if (!currentList.some((r) => r.email === email)) {
          setFormData((prev) => ({
            ...prev,
            [field]: [...currentList, { email }],
          }));
        }
        setNewRecipient((prev) => ({ ...prev, [field]: "" }));
      }
    };

    const removeRecipient = (field: "to" | "cc" | "bcc", email: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: (prev[field] || []).filter((r) => r.email !== email),
      }));
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const newAttachments: Attachment[] = [];

      files.forEach((file) => {
        if (file.size <= maxAttachmentSize) {
          newAttachments.push({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type,
          });
        }
      });

      setFormData((prev) => ({
        ...prev,
        attachments: [...(prev.attachments || []), ...newAttachments],
      }));

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const removeAttachment = (id: string) => {
      setFormData((prev) => ({
        ...prev,
        attachments: (prev.attachments || []).filter((a) => a.id !== id),
      }));
    };

    const formatFileSize = (bytes: number): string => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    };

    const validate = (): boolean => {
      const newErrors: Partial<Record<keyof ComposeData, string>> = {};

      if (formData.to.length === 0) {
        newErrors.to = "At least one recipient is required";
      }
      if (!formData.subject.trim()) {
        newErrors.subject = "Subject is required";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSend = () => {
      if (validate()) {
        onSend(formData);
      }
    };

    const handleSaveDraft = () => {
      if (onSaveDraft) {
        onSaveDraft(formData);
      }
    };

    const handleClose = () => {
      setFormData({
        to: initialData.to || [],
        cc: initialData.cc || [],
        bcc: initialData.bcc || [],
        subject: initialData.subject || "",
        body: initialData.body || "",
        attachments: initialData.attachments || [],
        isHtml: initialData.isHtml || false,
        priority: initialData.priority || "normal",
        scheduledAt: initialData.scheduledAt || null,
      });
      setErrors({});
      setNewRecipient({ to: "", cc: "", bcc: "" });
      setShowCcField(initialData.cc && initialData.cc.length > 0);
      setShowBccField(initialData.bcc && initialData.bcc.length > 0);
      onClose();
    };

    const renderRecipientField = (
      field: "to" | "cc" | "bcc",
      label: string,
      show = true,
    ) => {
      if (!show) return null;

      const recipients = formData[field] || [];
      const error = field === "to" ? errors.to : undefined;

      return (
        <FormField label={label} error={error}>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="email"
                value={newRecipient[field]}
                onChange={(e) =>
                  setNewRecipient((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
                placeholder={`Add ${label.toLowerCase()}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addRecipient(field);
                  }
                }}
                disabled={loading}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addRecipient(field)}
                disabled={loading || !newRecipient[field].trim()}
              >
                <PlusIcon className="size-4" />
              </Button>
            </div>
            {recipients.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {recipients.map((recipient) => (
                  <Badge key={recipient.email} soft className="gap-1">
                    {recipient.name || recipient.email}
                    <button
                      type="button"
                      onClick={() => removeRecipient(field, recipient.email)}
                      className="ml-1 rounded-full hover:bg-muted"
                      disabled={loading}
                    >
                      <XIcon className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </FormField>
      );
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        size="lg"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={
            <span className="flex items-center gap-2">
              <MailIcon className="size-5" />
              {title}
            </span>
          }
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-4">
            {/* Recipients */}
            {renderRecipientField("to", "To", true)}

            {/* CC/BCC toggle */}
            {(showCc || showBcc) && !showCcField && !showBccField && (
              <div className="flex gap-2">
                {showCc && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCcField(true)}
                    disabled={loading}
                  >
                    Add Cc
                  </Button>
                )}
                {showBcc && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBccField(true)}
                    disabled={loading}
                  >
                    Add Bcc
                  </Button>
                )}
              </div>
            )}

            {renderRecipientField("cc", "Cc", showCc && showCcField)}
            {renderRecipientField("bcc", "Bcc", showBcc && showBccField)}

            {/* Subject */}
            <FormField label="Subject" required error={errors.subject}>
              <Input
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subject: e.target.value }))
                }
                placeholder="Enter subject"
                disabled={loading}
              />
            </FormField>

            {/* Priority */}
            {showPriority && (
              <FormField label="Priority">
                <div className="flex gap-2">
                  {(["low", "normal", "high"] as const).map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, priority }))
                      }
                      disabled={loading}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-sm transition-colors",
                        formData.priority === priority
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:bg-muted",
                      )}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </FormField>
            )}

            {/* Body */}
            <FormField label="Message">
              <Textarea
                value={formData.body}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, body: e.target.value }))
                }
                placeholder="Write your message..."
                rows={8}
                disabled={loading}
              />
            </FormField>

            {/* Attachments */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="block text-sm font-medium text-foreground">
                  Attachments
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                >
                  <PlusIcon className="size-4" />
                  Add File
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={acceptedFileTypes.join(",")}
                onChange={handleFileSelect}
                className="hidden"
              />

              {formData.attachments && formData.attachments.length > 0 && (
                <div className="space-y-2 rounded-lg border border-border p-3">
                  {formData.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between rounded-lg bg-muted/50 p-2"
                    >
                      <div className="flex items-center gap-2">
                        {attachment.type.startsWith("image/") ? (
                          <ImageIcon className="size-4 text-muted-foreground" />
                        ) : (
                          <FileIcon className="size-4 text-muted-foreground" />
                        )}
                        <span className="text-sm text-foreground">
                          {attachment.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({attachment.size})
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(attachment.id)}
                        disabled={loading}
                        className="size-6 p-0"
                      >
                        <XIcon className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Max file size: {formatFileSize(maxAttachmentSize)}
              </p>
            </div>
          </div>
        </ModalBody>

        <ModalFooter align="between">
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={loading}
            className="text-destructive hover:text-destructive"
          >
            <TrashIcon className="size-4" />
            {cancelText}
          </Button>
          <div className="flex gap-2">
            {onSaveDraft && (
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={loading}
              >
                {draftText}
              </Button>
            )}
            <Button variant="primary" onClick={handleSend} loading={loading}>
              <MailIcon className="size-4" />
              {sendText}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
  },
);
ComposeModal.displayName = "ComposeModal";
