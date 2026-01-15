import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  AddCardModal,
  ManageCardsModal,
  UpgradeModal,
  AddPaymentModal,
} from "./index";
import type { SavedCard, Plan, CardData, PaymentMethodType } from "./index";
import { Button } from "@/components/atoms/Button";

const meta: Meta = {
  title: "Organisms/Overlays/PaymentModals",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

// Add Card Modal Stories
export const AddCard: StoryObj<typeof AddCardModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Add Card</Button>
        <AddCardModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={(data: CardData) => {
            console.log("Save card:", data);
            setIsOpen(false);
          }}
        />
      </>
    );
  },
};

// Manage Cards Modal Stories
export const ManageCards: StoryObj<typeof ManageCardsModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const cards: SavedCard[] = [
      {
        id: "1",
        type: "Visa",
        last4: "4242",
        expiry: "12/25",
        name: "John Doe",
        isDefault: true,
      },
      {
        id: "2",
        type: "Mastercard",
        last4: "5555",
        expiry: "06/26",
        name: "John Doe",
        isDefault: false,
      },
      {
        id: "3",
        type: "Amex",
        last4: "3782",
        expiry: "09/24",
        name: "John Doe",
        isDefault: false,
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Manage Cards</Button>
        <ManageCardsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          cards={cards}
          onAddCard={() => console.log("Add card")}
          onRemove={(id: string) => console.log("Remove card:", id)}
          onSetDefault={(id: string) => console.log("Set default:", id)}
        />
      </>
    );
  },
};

export const ManageCardsEmpty: StoryObj<typeof ManageCardsModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Manage Cards (Empty)</Button>
        <ManageCardsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          cards={[]}
          onAddCard={() => console.log("Add card")}
          onRemove={(id: string) => console.log("Remove card:", id)}
          onSetDefault={(id: string) => console.log("Set default:", id)}
        />
      </>
    );
  },
};

// Upgrade Modal Stories
export const Upgrade: StoryObj<typeof UpgradeModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const plans: Plan[] = [
      {
        id: "basic",
        name: "Basic",
        price: "$9/mo",
        features: [
          { text: "5 projects", included: true },
          { text: "10GB storage", included: true },
          { text: "Email support", included: true },
          { text: "API access", included: false },
        ],
      },
      {
        id: "pro",
        name: "Professional",
        price: "$29/mo",
        popular: true,
        features: [
          { text: "Unlimited projects", included: true },
          { text: "100GB storage", included: true },
          { text: "Priority support", included: true },
          { text: "API access", included: true },
          { text: "Advanced analytics", included: true },
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: "$99/mo",
        features: [
          { text: "Everything in Pro", included: true },
          { text: "Unlimited storage", included: true },
          { text: "24/7 support", included: true },
          { text: "Custom SLA", included: true },
          { text: "Dedicated account manager", included: true },
        ],
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Upgrade Plan</Button>
        <UpgradeModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelectPlan={(planId: string) => {
            console.log("Upgrade to:", planId);
            setIsOpen(false);
          }}
          plans={plans}
          currentPlanId="basic"
        />
      </>
    );
  },
};

export const UpgradeAnnual: StoryObj<typeof UpgradeModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const plans: Plan[] = [
      {
        id: "starter",
        name: "Starter",
        price: "$99/year",
        period: "year",
        features: [
          { text: "Basic features", included: true },
          { text: "5GB storage", included: true },
        ],
      },
      {
        id: "team",
        name: "Team",
        price: "$299/year",
        period: "year",
        popular: true,
        features: [
          { text: "All Starter features", included: true },
          { text: "50GB storage", included: true },
          { text: "Team collaboration", included: true },
          { text: "API access", included: true },
        ],
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Annual Plans</Button>
        <UpgradeModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelectPlan={(planId: string) => {
            console.log("Upgrade to:", planId);
            setIsOpen(false);
          }}
          plans={plans}
          currentPlanId="starter"
          title="Annual Plans"
          subtitle="Save 20% with annual billing"
        />
      </>
    );
  },
};

// Add Payment Method Modal Stories
export const AddPaymentMethod: StoryObj<typeof AddPaymentModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Add Payment Method</Button>
        <AddPaymentModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={(data: { type: PaymentMethodType; details: Record<string, string> }) => {
            console.log("Selected method:", data);
            setIsOpen(false);
          }}
        />
      </>
    );
  },
};

export const AddPaymentMethodLimited: StoryObj<typeof AddPaymentModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Add Payment (Limited)</Button>
        <AddPaymentModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={(data: { type: PaymentMethodType; details: Record<string, string> }) => {
            console.log("Selected method:", data);
            setIsOpen(false);
          }}
        />
      </>
    );
  },
};
