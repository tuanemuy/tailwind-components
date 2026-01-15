import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ComposeModal } from "./index";
import { Button } from "@/components/atoms/Button";

const meta: Meta = {
  title: "Organisms/Overlays/ComposeModals",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

// Compose Modal Stories
export const Compose: StoryObj<typeof ComposeModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Compose Email</Button>
        <ComposeModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSend={(data) => {
            console.log("Send:", data);
            setIsOpen(false);
          }}
          onSaveDraft={(data) => {
            console.log("Save draft:", data);
          }}
        />
      </>
    );
  },
};

export const ComposeReply: StoryObj<typeof ComposeModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Reply</Button>
        <ComposeModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSend={(data) => {
            console.log("Send reply:", data);
            setIsOpen(false);
          }}
          title="Reply"
          initialData={{
            to: [{ email: "john.doe@example.com", name: "John Doe" }],
            subject: "Re: Project Update",
            body: "\n\n---\nOn Jan 20, 2024, John Doe wrote:\n> Just wanted to follow up on the project status...",
          }}
        />
      </>
    );
  },
};

export const ComposeWithPriority: StoryObj<typeof ComposeModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Compose with Priority</Button>
        <ComposeModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSend={(data) => {
            console.log("Send:", data);
            setIsOpen(false);
          }}
          showPriority
          showCc
          showBcc
        />
      </>
    );
  },
};
