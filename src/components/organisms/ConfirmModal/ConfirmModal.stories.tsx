import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ConfirmModal, DeleteConfirmModal, CancelConfirmModal } from "./index";
import { Button } from "@/components/atoms/Button";

const meta: Meta<typeof ConfirmModal> = {
  title: "Organisms/Overlays/ConfirmModal",
  component: ConfirmModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Confirm Modal</Button>
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log("Confirmed!");
            setIsOpen(false);
          }}
          title="Confirm Action"
          description="Are you sure you want to proceed with this action?"
        />
      </>
    );
  },
};

export const Danger: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log("Deleted!");
            setIsOpen(false);
          }}
          title="Delete Item"
          description="This action cannot be undone. Are you sure you want to delete this item?"
          variant="danger"
          confirmText="Delete"
        />
      </>
    );
  },
};

export const Warning: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Show Warning</Button>
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log("Confirmed warning!");
            setIsOpen(false);
          }}
          title="Warning"
          description="This action may have unintended consequences. Proceed with caution."
          variant="warning"
        />
      </>
    );
  },
};

export const DeleteConfirm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete Project
        </Button>
        <DeleteConfirmModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log("Project deleted!");
            setIsOpen(false);
          }}
          itemName="My Project"
        />
      </>
    );
  },
};

export const CancelConfirm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Cancel Subscription</Button>
        <CancelConfirmModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log("Subscription cancelled!");
            setIsOpen(false);
          }}
          description="Are you sure you want to cancel your Premium subscription?"
        />
      </>
    );
  },
};

export const WithLoading: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsOpen(false);
      }, 2000);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open with Loading</Button>
        <ConfirmModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          title="Processing..."
          description="Please wait while we process your request."
          loading={loading}
        />
      </>
    );
  },
};
