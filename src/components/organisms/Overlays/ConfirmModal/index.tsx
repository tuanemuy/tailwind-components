import { forwardRef, type ReactNode } from "react";
import { Button } from "@/components/atoms/Button";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/organisms/Layout/Modal";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  InfoIcon,
  TrashIcon,
  XCircleIcon,
} from "@/components/icons";
import { cn } from "@/components/utils";

// ConfirmModal variants
export type ConfirmVariant = "danger" | "warning" | "info" | "success";

const variantStyles: Record<
  ConfirmVariant,
  {
    iconBg: string;
    iconColor: string;
    Icon: typeof AlertCircleIcon;
    confirmButtonVariant: "destructive" | "primary" | "secondary";
  }
> = {
  danger: {
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    Icon: TrashIcon,
    confirmButtonVariant: "destructive",
  },
  warning: {
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
    Icon: AlertCircleIcon,
    confirmButtonVariant: "primary",
  },
  info: {
    iconBg: "bg-info/10",
    iconColor: "text-info",
    Icon: InfoIcon,
    confirmButtonVariant: "primary",
  },
  success: {
    iconBg: "bg-success/10",
    iconColor: "text-success",
    Icon: CheckCircleIcon,
    confirmButtonVariant: "primary",
  },
};

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: ReactNode;
  variant?: ConfirmVariant;
  confirmText?: string;
  cancelText?: string;
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
}

export const ConfirmModal = forwardRef<HTMLDivElement, ConfirmModalProps>(
  (
    {
      isOpen,
      onClose,
      onConfirm,
      title,
      description,
      variant = "danger",
      confirmText = "Confirm",
      cancelText = "Cancel",
      icon,
      loading,
      className,
    },
    ref,
  ) => {
    const { iconBg, iconColor, Icon, confirmButtonVariant } =
      variantStyles[variant];

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        size="sm"
        closeOnOverlayClick={!loading}
        closeOnEscape={!loading}
        className={className}
      >
        <ModalHeader showCloseButton={false} bordered={false} className="pb-0">
          <div className="flex flex-col items-center text-center">
            <div
              className={cn(
                "mb-4 flex size-12 items-center justify-center rounded-full",
                iconBg,
              )}
            >
              {icon || <Icon className={cn("size-6", iconColor)} />}
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          </div>
        </ModalHeader>

        {description && (
          <ModalBody padding="md" scrollable={false} className="text-center">
            <p className="text-sm text-muted-foreground">{description}</p>
          </ModalBody>
        )}

        <ModalFooter
          bordered={false}
          align="center"
          className="flex-col gap-2 pt-4 sm:flex-row"
        >
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmButtonVariant}
            onClick={onConfirm}
            loading={loading}
            className="w-full sm:w-auto"
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
ConfirmModal.displayName = "ConfirmModal";

// DeleteConfirmModal - Convenience component for delete confirmation
export interface DeleteConfirmModalProps
  extends Omit<ConfirmModalProps, "variant" | "title" | "confirmText"> {
  itemName?: string;
  title?: string;
  confirmText?: string;
}

export const DeleteConfirmModal = forwardRef<
  HTMLDivElement,
  DeleteConfirmModalProps
>(
  (
    {
      itemName,
      title = "Delete item",
      confirmText = "Delete",
      description,
      ...props
    },
    ref,
  ) => {
    const defaultDescription = itemName
      ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
      : "Are you sure you want to delete this item? This action cannot be undone.";

    return (
      <ConfirmModal
        ref={ref}
        variant="danger"
        title={title}
        confirmText={confirmText}
        description={description ?? defaultDescription}
        {...props}
      />
    );
  },
);
DeleteConfirmModal.displayName = "DeleteConfirmModal";

// CancelConfirmModal - Convenience component for cancel confirmation
export interface CancelConfirmModalProps
  extends Omit<ConfirmModalProps, "variant" | "title" | "confirmText"> {
  title?: string;
  confirmText?: string;
}

export const CancelConfirmModal = forwardRef<
  HTMLDivElement,
  CancelConfirmModalProps
>(
  (
    {
      title = "Discard changes",
      confirmText = "Discard",
      description = "You have unsaved changes. Are you sure you want to discard them?",
      ...props
    },
    ref,
  ) => {
    return (
      <ConfirmModal
        ref={ref}
        variant="warning"
        title={title}
        confirmText={confirmText}
        description={description}
        icon={<XCircleIcon className="size-6 text-warning" />}
        {...props}
      />
    );
  },
);
CancelConfirmModal.displayName = "CancelConfirmModal";
