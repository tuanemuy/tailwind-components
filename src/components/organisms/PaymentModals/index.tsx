import { forwardRef, type ReactNode, useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";
import { FormField } from "@/components/molecules/FormField";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/organisms/Modal";
import { CheckIcon, CreditCardIcon, PlusIcon, TrashIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

// Card type detection
const detectCardType = (number: string): string => {
  const cleaned = number.replace(/\s/g, "");
  if (/^4/.test(cleaned)) return "Visa";
  if (/^5[1-5]/.test(cleaned)) return "Mastercard";
  if (/^3[47]/.test(cleaned)) return "Amex";
  if (/^6(?:011|5)/.test(cleaned)) return "Discover";
  return "Card";
};

// Format card number with spaces
const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(" ").slice(0, 19);
};

// Format expiry date
const formatExpiry = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  }
  return cleaned;
};

// Common card data interface
export interface CardData {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  setAsDefault?: boolean;
}

export interface SavedCard {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  name: string;
  isDefault?: boolean;
}

// AddCardModal
export interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CardData) => void;
  title?: string;
  subtitle?: ReactNode;
  showSetAsDefault?: boolean;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

export const AddCardModal = forwardRef<HTMLDivElement, AddCardModalProps>(
  (
    {
      isOpen,
      onClose,
      onSubmit,
      title = "Add payment method",
      subtitle,
      showSetAsDefault = true,
      submitText = "Add card",
      cancelText = "Cancel",
      loading,
      className,
    },
    ref,
  ) => {
    const [formData, setFormData] = useState<CardData>({
      number: "",
      expiry: "",
      cvc: "",
      name: "",
      setAsDefault: false,
    });
    const [errors, setErrors] = useState<
      Partial<Record<keyof CardData, string>>
    >({});

    const handleChange = (field: keyof CardData, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = (): boolean => {
      const newErrors: Partial<Record<keyof CardData, string>> = {};

      if (formData.number.replace(/\s/g, "").length < 15) {
        newErrors.number = "Please enter a valid card number";
      }
      if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
        newErrors.expiry = "Please enter a valid expiry date (MM/YY)";
      }
      if (formData.cvc.length < 3) {
        newErrors.cvc = "Please enter a valid CVC";
      }
      if (formData.name.length < 2) {
        newErrors.name = "Please enter the name on the card";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
      if (validate()) {
        onSubmit(formData);
      }
    };

    const handleClose = () => {
      setFormData({
        number: "",
        expiry: "",
        cvc: "",
        name: "",
        setAsDefault: false,
      });
      setErrors({});
      onClose();
    };

    const cardType = detectCardType(formData.number);

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
          title={title}
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-4">
            {/* Card number */}
            <FormField
              label="Card number"
              required
              error={errors.number}
              inputProps={{
                value: formData.number,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("number", formatCardNumber(e.target.value)),
                placeholder: "1234 5678 9012 3456",
                disabled: loading,
                autoComplete: "cc-number",
              }}
            />

            {/* Expiry and CVC */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Expiry date"
                required
                error={errors.expiry}
                inputProps={{
                  value: formData.expiry,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("expiry", formatExpiry(e.target.value)),
                  placeholder: "MM/YY",
                  disabled: loading,
                  autoComplete: "cc-exp",
                }}
              />
              <FormField
                label="CVC"
                required
                error={errors.cvc}
                inputProps={{
                  value: formData.cvc,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(
                      "cvc",
                      e.target.value.replace(/\D/g, "").slice(0, 4),
                    ),
                  placeholder: "123",
                  disabled: loading,
                  autoComplete: "cc-csc",
                }}
              />
            </div>

            {/* Name on card */}
            <FormField
              label="Name on card"
              required
              error={errors.name}
              inputProps={{
                value: formData.name,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("name", e.target.value),
                placeholder: "John Doe",
                disabled: loading,
                autoComplete: "cc-name",
              }}
            />

            {/* Set as default */}
            {showSetAsDefault && (
              <span className="flex cursor-pointer items-center gap-3">
                <Checkbox
                  checked={formData.setAsDefault}
                  onChange={(e) =>
                    handleChange("setAsDefault", e.target.checked)
                  }
                  disabled={loading}
                />
                <span className="text-sm text-foreground">
                  Set as default payment method
                </span>
              </span>
            )}

            {/* Card preview */}
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCardIcon className="size-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{cardType}</span>
                </div>
                {formData.number.length >= 4 && (
                  <span className="font-mono text-sm text-muted-foreground">
                    •••• {formData.number.replace(/\s/g, "").slice(-4)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {submitText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
AddCardModal.displayName = "AddCardModal";

// ManageCardsModal
export interface ManageCardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: SavedCard[];
  onSetDefault: (cardId: string) => void;
  onRemove: (cardId: string) => void;
  onAddCard?: () => void;
  title?: string;
  subtitle?: ReactNode;
  loading?: boolean;
  loadingCardId?: string;
  className?: string;
}

export const ManageCardsModal = forwardRef<
  HTMLDivElement,
  ManageCardsModalProps
>(
  (
    {
      isOpen,
      onClose,
      cards,
      onSetDefault,
      onRemove,
      onAddCard,
      title = "Payment methods",
      subtitle,
      loading,
      loadingCardId,
      className,
    },
    ref,
  ) => {
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
          title={title}
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-3">
            {cards.length === 0 ? (
              <div className="py-8 text-center">
                <CreditCardIcon className="mx-auto size-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No payment methods saved
                </p>
              </div>
            ) : (
              cards.map((card) => (
                <div
                  key={card.id}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-3",
                    card.isDefault
                      ? "border-primary bg-primary/5"
                      : "border-border",
                  )}
                >
                  <CreditCardIcon className="size-8 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {card.type} •••• {card.last4}
                      </span>
                      {card.isDefault && (
                        <Badge variant="default" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Expires {card.expiry}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {!card.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSetDefault(card.id)}
                        disabled={loading}
                        loading={loadingCardId === card.id}
                      >
                        Set default
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(card.id)}
                      disabled={loading || card.isDefault}
                      className="text-destructive hover:text-destructive"
                    >
                      <TrashIcon className="size-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          {onAddCard && (
            <Button variant="outline" onClick={onAddCard} disabled={loading}>
              <PlusIcon className="size-4" />
              Add card
            </Button>
          )}
          <Button variant="primary" onClick={onClose}>
            Done
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
ManageCardsModal.displayName = "ManageCardsModal";

// UpgradeModal
export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: PlanFeature[];
  popular?: boolean;
  current?: boolean;
}

export interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (planId: string) => void;
  title?: string;
  subtitle?: ReactNode;
  plans: Plan[];
  currentPlanId?: string;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

export const UpgradeModal = forwardRef<HTMLDivElement, UpgradeModalProps>(
  (
    {
      isOpen,
      onClose,
      onSelectPlan,
      title = "Upgrade your plan",
      subtitle,
      plans,
      currentPlanId,
      submitText = "Upgrade now",
      cancelText = "Cancel",
      loading,
      className,
    },
    ref,
  ) => {
    const [selectedPlanId, setSelectedPlanId] = useState(
      plans.find((p) => p.popular)?.id || plans[0]?.id,
    );

    const handleSubmit = () => {
      if (selectedPlanId && selectedPlanId !== currentPlanId) {
        onSelectPlan(selectedPlanId);
      }
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
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
          <div className="grid gap-4 sm:grid-cols-2">
            {plans.map((plan) => {
              const isSelected = selectedPlanId === plan.id;
              const isCurrent = plan.id === currentPlanId;

              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => !isCurrent && setSelectedPlanId(plan.id)}
                  disabled={loading || isCurrent}
                  className={cn(
                    "relative rounded-lg border p-4 text-start transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border hover:border-muted-foreground/50",
                    isCurrent && "cursor-not-allowed opacity-60",
                  )}
                >
                  {plan.popular && (
                    <Badge variant="default" className="absolute -top-2 end-2">
                      Popular
                    </Badge>
                  )}
                  {isCurrent && (
                    <Badge soft className="absolute -top-2 end-2">
                      Current plan
                    </Badge>
                  )}

                  <div className="mb-3">
                    <h4 className="font-semibold text-foreground">
                      {plan.name}
                    </h4>
                    {plan.description && (
                      <p className="text-xs text-muted-foreground">
                        {plan.description}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <span className="text-2xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-muted-foreground">
                        /{plan.period}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li
                        key={feature.text}
                        className={cn(
                          "flex items-center gap-2 text-sm",
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground line-through",
                        )}
                      >
                        <CheckIcon
                          className={cn(
                            "size-4 shrink-0",
                            feature.included
                              ? "text-success"
                              : "text-muted-foreground",
                          )}
                        />
                        {feature.text}
                      </li>
                    ))}
                  </ul>

                  {isSelected && !isCurrent && (
                    <div className="absolute end-2 top-1/2 -translate-y-1/2">
                      <CheckIcon className="size-5 text-primary" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={selectedPlanId === currentPlanId}
          >
            {submitText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
UpgradeModal.displayName = "UpgradeModal";

// AddPaymentModal - Generic payment method modal
export type PaymentMethodType = "card" | "bank" | "paypal";

export interface PaymentMethod {
  type: PaymentMethodType;
  label: string;
  icon: ReactNode;
}

export interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    type: PaymentMethodType;
    details: Record<string, string>;
  }) => void;
  title?: string;
  subtitle?: ReactNode;
  methods?: PaymentMethod[];
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  className?: string;
}

const defaultPaymentMethods: PaymentMethod[] = [
  {
    type: "card",
    label: "Credit or debit card",
    icon: <CreditCardIcon className="size-5" />,
  },
];

export const AddPaymentModal = forwardRef<HTMLDivElement, AddPaymentModalProps>(
  (
    {
      isOpen,
      onClose,
      onSubmit,
      title = "Add payment method",
      subtitle,
      methods = defaultPaymentMethods,
      submitText = "Add payment method",
      cancelText = "Cancel",
      loading,
      className,
    },
    ref,
  ) => {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(
      methods[0]?.type || "card",
    );
    const [cardData, setCardData] = useState<CardData>({
      number: "",
      expiry: "",
      cvc: "",
      name: "",
    });

    const handleSubmit = () => {
      onSubmit({
        type: selectedMethod,
        details: {
          number: cardData.number,
          expiry: cardData.expiry,
          cvc: cardData.cvc,
          name: cardData.name,
        },
      });
    };

    const handleClose = () => {
      setCardData({ number: "", expiry: "", cvc: "", name: "" });
      onClose();
    };

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
          title={title}
          subtitle={subtitle}
          showCloseButton={!loading}
        />

        <ModalBody padding="md">
          <div className="space-y-4">
            {/* Method selection */}
            {methods.length > 1 && (
              <div className="space-y-2">
                {methods.map((method) => (
                  <button
                    key={method.type}
                    type="button"
                    onClick={() => setSelectedMethod(method.type)}
                    disabled={loading}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg border p-3",
                      selectedMethod === method.type
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50",
                    )}
                  >
                    {method.icon}
                    <span className="font-medium">{method.label}</span>
                    {selectedMethod === method.type && (
                      <CheckIcon className="ml-auto size-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Card form */}
            {selectedMethod === "card" && (
              <div className="space-y-4">
                <FormField
                  label="Card number"
                  required
                  inputProps={{
                    value: cardData.number,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setCardData((prev) => ({
                        ...prev,
                        number: formatCardNumber(e.target.value),
                      })),
                    placeholder: "1234 5678 9012 3456",
                    disabled: loading,
                  }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Expiry"
                    required
                    inputProps={{
                      value: cardData.expiry,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        setCardData((prev) => ({
                          ...prev,
                          expiry: formatExpiry(e.target.value),
                        })),
                      placeholder: "MM/YY",
                      disabled: loading,
                    }}
                  />
                  <FormField
                    label="CVC"
                    required
                    inputProps={{
                      value: cardData.cvc,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        setCardData((prev) => ({
                          ...prev,
                          cvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                        })),
                      placeholder: "123",
                      disabled: loading,
                    }}
                  />
                </div>
                <FormField
                  label="Name on card"
                  required
                  inputProps={{
                    value: cardData.name,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                      setCardData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      })),
                    placeholder: "John Doe",
                    disabled: loading,
                  }}
                />
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {submitText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  },
);
AddPaymentModal.displayName = "AddPaymentModal";
