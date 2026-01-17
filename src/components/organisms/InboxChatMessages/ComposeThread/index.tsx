"use client";

import { type ChangeEvent, type KeyboardEvent, useRef, useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import {
  FileIcon,
  MicIcon,
  PaperclipIcon,
  SendIcon,
  SmileIcon,
  XIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// ============================================
// Types
// ============================================

export interface Recipient {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface AttachmentFile {
  id: string;
  name: string;
  size: string;
  type: string;
  preview?: string;
  file?: File;
}

// ============================================
// ComposeThread Component (Chat Input)
// ============================================

export interface ComposeThreadProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSend?: (message: string, attachments?: AttachmentFile[]) => void;
  onAttach?: () => void;
  onEmoji?: () => void;
  onVoice?: () => void;
  showAttach?: boolean;
  showEmoji?: boolean;
  showVoice?: boolean;
  disabled?: boolean;
  loading?: boolean;
  recipient?: Recipient;
  className?: string;
}

export const ComposeThread = ({
  placeholder = "Type a message...",
  value: controlledValue,
  onChange,
  onSend,
  onAttach,
  onEmoji,
  onVoice,
  showAttach = true,
  showEmoji = true,
  showVoice = true,
  disabled = false,
  loading = false,
  recipient,
  className,
}: ComposeThreadProps) => {
  const [internalValue, setInternalValue] = useState("");
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue ?? internalValue;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 144)}px`;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!value.trim() && attachments.length === 0) return;
    onSend?.(value, attachments.length > 0 ? attachments : undefined);
    setInternalValue("");
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleAttach = () => {
    if (onAttach) {
      onAttach();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachments: AttachmentFile[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
      file,
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const placeholderText = recipient ? `Message ${recipient.name}` : placeholder;

  return (
    <div className={cn("rounded-2xl bg-card border border-border", className)}>
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="px-3 pt-3 flex flex-wrap gap-2">
          {attachments.map((attachment) => (
            <AttachmentPreview
              key={attachment.id}
              attachment={attachment}
              onRemove={() => removeAttachment(attachment.id)}
            />
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-2">
        <textarea
          ref={textareaRef}
          className="max-h-36 pt-2 pb-2 px-2 block w-full border-transparent rounded-0 text-sm leading-5 resize-none focus:outline-none focus:border-transparent focus:ring-transparent disabled:opacity-50 disabled:pointer-events-none bg-transparent text-foreground placeholder:text-muted-foreground"
          placeholder={placeholderText}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
        />

        {/* Actions */}
        <div className="px-2 flex justify-between items-center gap-x-1">
          {/* Left Actions */}
          <div className="flex items-center gap-x-1">
            {showAttach && (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="size-8 p-0"
                  onClick={handleAttach}
                  disabled={disabled}
                >
                  <PaperclipIcon className="size-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </>
            )}

            {showEmoji && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="size-8 p-0"
                onClick={onEmoji}
                disabled={disabled}
              >
                <SmileIcon className="size-4" />
                <span className="sr-only">Add emoji</span>
              </Button>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-x-1">
            {showVoice && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="size-8 p-0"
                onClick={onVoice}
                disabled={disabled}
              >
                <MicIcon className="size-4" />
                <span className="sr-only">Voice message</span>
              </Button>
            )}

            <Button
              type="button"
              variant="primary"
              size="sm"
              className="size-8 p-0 rounded-full"
              onClick={handleSend}
              disabled={
                disabled ||
                loading ||
                (!value.trim() && attachments.length === 0)
              }
            >
              {loading ? (
                <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <SendIcon className="size-4" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// AttachmentPreview Component
// ============================================

interface AttachmentPreviewProps {
  attachment: AttachmentFile;
  onRemove: () => void;
}

const AttachmentPreview = ({
  attachment,
  onRemove,
}: AttachmentPreviewProps) => {
  const isImage = attachment.type.startsWith("image/");

  return (
    <div className="relative group">
      {isImage && attachment.preview ? (
        <div className="relative w-20 h-20 rounded-lg overflow-hidden">
          <img
            src={attachment.preview}
            alt={attachment.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="flex items-center gap-x-2 px-3 py-2 bg-muted rounded-lg">
          <FileIcon className="size-4 text-muted-foreground" />
          <div className="min-w-0 max-w-32">
            <p className="text-xs font-medium truncate">{attachment.name}</p>
            <p className="text-[10px] text-muted-foreground">
              {attachment.size}
            </p>
          </div>
        </div>
      )}

      {/* Remove Button */}
      <button
        type="button"
        className="absolute -top-1 -right-1 size-5 flex items-center justify-center bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onRemove}
      >
        <XIcon className="size-3" />
      </button>
    </div>
  );
};

// ============================================
// EmailCompose Component
// ============================================

export interface EmailComposeProps {
  to?: Recipient[];
  cc?: Recipient[];
  bcc?: Recipient[];
  subject?: string;
  content?: string;
  onToChange?: (recipients: Recipient[]) => void;
  onCcChange?: (recipients: Recipient[]) => void;
  onBccChange?: (recipients: Recipient[]) => void;
  onSubjectChange?: (subject: string) => void;
  onContentChange?: (content: string) => void;
  onSend?: () => void;
  onSaveDraft?: () => void;
  onDiscard?: () => void;
  onAttach?: () => void;
  showCc?: boolean;
  showBcc?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const EmailCompose = ({
  to = [],
  cc = [],
  bcc = [],
  subject = "",
  content = "",
  onToChange,
  onCcChange,
  onBccChange,
  onSubjectChange,
  onContentChange,
  onSend,
  onSaveDraft,
  onDiscard,
  onAttach: _onAttach,
  showCc: initialShowCc = false,
  showBcc: initialShowBcc = false,
  disabled = false,
  loading = false,
  className,
}: EmailComposeProps) => {
  const [showCc, setShowCc] = useState(initialShowCc || cc.length > 0);
  const [showBcc, setShowBcc] = useState(initialShowBcc || bcc.length > 0);
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachments: AttachmentFile[] = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      file,
    }));
    setAttachments((prev) => [...prev, ...newAttachments]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const removeRecipient = (
    list: Recipient[],
    id: string,
    onChange?: (recipients: Recipient[]) => void,
  ) => {
    onChange?.(list.filter((r) => r.id !== id));
  };

  return (
    <div className={cn("bg-card rounded-xl border border-border", className)}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        {/* To */}
        <div className="flex items-start gap-x-2 mb-2">
          <span className="text-sm text-muted-foreground py-1.5 w-12 shrink-0">
            To:
          </span>
          <div className="flex-1 flex flex-wrap items-center gap-1">
            {to.map((recipient) => (
              <RecipientChip
                key={recipient.id}
                recipient={recipient}
                onRemove={() => removeRecipient(to, recipient.id, onToChange)}
              />
            ))}
            <Input
              type="email"
              placeholder="Add recipient..."
              className="flex-1 min-w-32 border-0 h-8 px-1"
              disabled={disabled}
            />
          </div>
          <div className="flex gap-x-1">
            {!showCc && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCc(true)}
                disabled={disabled}
              >
                Cc
              </Button>
            )}
            {!showBcc && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBcc(true)}
                disabled={disabled}
              >
                Bcc
              </Button>
            )}
          </div>
        </div>

        {/* Cc */}
        {showCc && (
          <div className="flex items-start gap-x-2 mb-2">
            <span className="text-sm text-muted-foreground py-1.5 w-12 shrink-0">
              Cc:
            </span>
            <div className="flex-1 flex flex-wrap items-center gap-1">
              {cc.map((recipient) => (
                <RecipientChip
                  key={recipient.id}
                  recipient={recipient}
                  onRemove={() => removeRecipient(cc, recipient.id, onCcChange)}
                />
              ))}
              <Input
                type="email"
                placeholder="Add Cc..."
                className="flex-1 min-w-32 border-0 h-8 px-1"
                disabled={disabled}
              />
            </div>
          </div>
        )}

        {/* Bcc */}
        {showBcc && (
          <div className="flex items-start gap-x-2 mb-2">
            <span className="text-sm text-muted-foreground py-1.5 w-12 shrink-0">
              Bcc:
            </span>
            <div className="flex-1 flex flex-wrap items-center gap-1">
              {bcc.map((recipient) => (
                <RecipientChip
                  key={recipient.id}
                  recipient={recipient}
                  onRemove={() =>
                    removeRecipient(bcc, recipient.id, onBccChange)
                  }
                />
              ))}
              <Input
                type="email"
                placeholder="Add Bcc..."
                className="flex-1 min-w-32 border-0 h-8 px-1"
                disabled={disabled}
              />
            </div>
          </div>
        )}

        {/* Subject */}
        <div className="flex items-center gap-x-2">
          <span className="text-sm text-muted-foreground py-1.5 w-12 shrink-0">
            Subject:
          </span>
          <Input
            type="text"
            value={subject}
            onChange={(e) => onSubjectChange?.(e.target.value)}
            placeholder="Enter subject..."
            className="flex-1 border-0 h-8 px-1"
            disabled={disabled}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <textarea
          className="w-full min-h-48 text-sm bg-transparent border-0 resize-none focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground"
          placeholder="Write your message..."
          value={content}
          onChange={(e) => onContentChange?.(e.target.value)}
          disabled={disabled}
        />

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              Attachments ({attachments.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {attachments.map((attachment) => (
                <AttachmentPreview
                  key={attachment.id}
                  attachment={attachment}
                  onRemove={() => removeAttachment(attachment.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button
            variant="primary"
            onClick={onSend}
            disabled={disabled || loading || to.length === 0}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
          >
            <PaperclipIcon className="size-4 me-1" />
            Attach
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex items-center gap-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSaveDraft}
            disabled={disabled}
          >
            Save draft
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDiscard}
            disabled={disabled}
          >
            <XIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// RecipientChip Component
// ============================================

interface RecipientChipProps {
  recipient: Recipient;
  onRemove: () => void;
}

const RecipientChip = ({ recipient, onRemove }: RecipientChipProps) => (
  <Badge variant="secondary" className="flex items-center gap-x-1 pr-1">
    {recipient.avatar && (
      <Avatar src={recipient.avatar} name={recipient.name} size="xs" />
    )}
    <span>{recipient.name}</span>
    <button
      type="button"
      className="size-4 flex items-center justify-center hover:bg-muted rounded-full"
      onClick={onRemove}
    >
      <XIcon className="size-3" />
    </button>
  </Badge>
);

// ============================================
// Helper Functions
// ============================================

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
};
