import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./index";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";

const meta: Meta<typeof Modal> = {
  title: "Organisms/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Interactive wrapper for modal stories
const ModalDemo = ({
  size = "md",
  children,
}: {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={size}>
        {children || (
          <>
            <ModalHeader title="Modal Title" subtitle="Optional subtitle text" />
            <ModalBody>
              <p className="text-muted-foreground">
                This is the modal body content. You can put any content here including
                forms, text, images, or other components.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Confirm</Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: () => <ModalDemo />,
};

export const Small: Story = {
  render: () => <ModalDemo size="sm" />,
};

export const Large: Story = {
  render: () => <ModalDemo size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalDemo size="xl" />,
};

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader title="Create Account" />
          <ModalBody>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Create Account</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

export const Confirmation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <ModalHeader title="Delete Item" />
          <ModalBody>
            <p className="text-muted-foreground">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsOpen(false)}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

export const ScrollableContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Scrollable Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader title="Terms of Service" />
          <ModalBody scrollable maxHeight="max-h-[50vh]">
            <div className="space-y-4 text-sm text-muted-foreground">
              {Array.from({ length: 10 }, (_, i) => (
                <p key={i}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur.
                </p>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setIsOpen(false)}>Accept</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

export const NoBorders: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader title="No Borders" bordered={false} />
          <ModalBody padding="lg">
            <p className="text-muted-foreground">
              This modal has no borders between header, body, and footer.
            </p>
          </ModalBody>
          <ModalFooter bordered={false}>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};
