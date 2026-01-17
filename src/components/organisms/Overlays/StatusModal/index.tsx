import { forwardRef, type ReactNode, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/organisms/Layout/Modal";
import { CheckIcon, ClockIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface StatusOption {
  id: string;
  label: string;
  icon?: ReactNode;
  color?: string;
  description?: string;
}

export interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (status: StatusOption, customMessage?: string) => void;
  title?: string;
  subtitle?: ReactNode;
  options: StatusOption[];
  currentStatus?: string;
  showCustomMessage?: boolean;
  customMessagePlaceholder?: string;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

export const StatusModal = forwardRef<HTMLDivElement, StatusModalProps>(
  (
    {
      isOpen,
      onClose,
      onSelect,
      title = "Set status",
      subtitle,
      options,
      currentStatus,
      showCustomMessage = true,
      customMessagePlaceholder = "What's your current focus?",
      submitText = "Save",
      cancelText = "Cancel",
      loading,
      className,
    },
    ref,
  ) => {
    const [selectedId, setSelectedId] = useState(currentStatus || "");
    const [customMessage, setCustomMessage] = useState("");

    const handleSubmit = () => {
      const selected = options.find((opt) => opt.id === selectedId);
      if (selected) {
        onSelect(selected, showCustomMessage ? customMessage : undefined);
      }
    };

    const handleClose = () => {
      setSelectedId(currentStatus || "");
      setCustomMessage("");
      onClose();
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={handleClose}
        size="sm"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader
          title={title}
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-4">
            {/* Status options */}
            <div className="space-y-2">
              {options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedId(option.id)}
                  disabled={loading}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border p-3 text-start transition-colors",
                    selectedId === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/50 hover:bg-muted/50",
                  )}
                >
                  {/* Status indicator */}
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full",
                      option.color || "bg-muted",
                    )}
                  >
                    {option.icon || (
                      <span className="size-2 rounded-full bg-current" />
                    )}
                  </span>

                  {/* Label and description */}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">
                      {option.label}
                    </p>
                    {option.description && (
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    )}
                  </div>

                  {/* Selected indicator */}
                  {selectedId === option.id && (
                    <CheckIcon className="size-5 shrink-0 text-primary" />
                  )}
                </button>
              ))}
            </div>

            {/* Custom message */}
            {showCustomMessage && (
              <div>
                <label
                  htmlFor="status-message-input"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Status message
                </label>
                <Input
                  id="status-message-input"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder={customMessagePlaceholder}
                  disabled={loading}
                />
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
            disabled={!selectedId}
          >
            {submitText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
StatusModal.displayName = "StatusModal";

// AvailabilityStatusModal - Preset for user availability
const availabilityOptions: StatusOption[] = [
  {
    id: "available",
    label: "Available",
    color: "bg-success/10 text-success",
    description: "You're available and ready to work",
  },
  {
    id: "busy",
    label: "Busy",
    color: "bg-destructive/10 text-destructive",
    description: "You're busy and shouldn't be disturbed",
  },
  {
    id: "away",
    label: "Away",
    color: "bg-warning/10 text-warning",
    description: "You're temporarily away",
  },
  {
    id: "dnd",
    label: "Do not disturb",
    color: "bg-muted text-muted-foreground",
    description: "Notifications will be muted",
  },
];

export interface AvailabilityStatusModalProps
  extends Omit<StatusModalProps, "options" | "title"> {
  title?: string;
  options?: StatusOption[];
}

export const AvailabilityStatusModal = forwardRef<
  HTMLDivElement,
  AvailabilityStatusModalProps
>(
  (
    { title = "Set your status", options = availabilityOptions, ...props },
    ref,
  ) => {
    return <StatusModal ref={ref} title={title} options={options} {...props} />;
  },
);
AvailabilityStatusModal.displayName = "AvailabilityStatusModal";

// TaskStatusModal - Preset for task status
const taskStatusOptions: StatusOption[] = [
  {
    id: "todo",
    label: "To Do",
    color: "bg-muted text-muted-foreground",
    description: "Task hasn't been started",
  },
  {
    id: "in_progress",
    label: "In Progress",
    color: "bg-info/10 text-info",
    icon: <ClockIcon className="size-4" />,
    description: "Currently working on this",
  },
  {
    id: "review",
    label: "In Review",
    color: "bg-warning/10 text-warning",
    description: "Waiting for review",
  },
  {
    id: "done",
    label: "Done",
    color: "bg-success/10 text-success",
    icon: <CheckIcon className="size-4" />,
    description: "Task completed",
  },
];

export interface TaskStatusModalProps
  extends Omit<StatusModalProps, "options" | "title" | "showCustomMessage"> {
  title?: string;
  options?: StatusOption[];
}

export const TaskStatusModal = forwardRef<HTMLDivElement, TaskStatusModalProps>(
  (
    { title = "Update task status", options = taskStatusOptions, ...props },
    ref,
  ) => {
    return (
      <StatusModal
        ref={ref}
        title={title}
        options={options}
        showCustomMessage={false}
        {...props}
      />
    );
  },
);
TaskStatusModal.displayName = "TaskStatusModal";
