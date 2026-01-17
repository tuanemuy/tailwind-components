import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import type { ShareAccess } from "./index";
import { ShareModal } from "./index";

const meta: Meta<typeof ShareModal> = {
  title: "Organisms/Overlays/ShareModal",
  component: ShareModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ShareModal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Share</Button>
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          shareUrl="https://example.com/project/123"
          title="Share Project"
        />
      </>
    );
  },
};

export const WithAccessOptions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Share with Access Control
        </Button>
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          shareUrl="https://example.com/file/789"
          title="Share File"
          showAccessOptions
          currentAccess="restricted"
          onShare={(data: { access: ShareAccess; email?: string }) => {
            console.log("Access changed:", data);
          }}
        />
      </>
    );
  },
};

export const WithSocialShare: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Share to Social</Button>
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          shareUrl="https://example.com/article/amazing-post"
          title="Share Article"
          showSocialShare
        />
      </>
    );
  },
};

export const FullFeatured: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Full Share Modal</Button>
        <ShareModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          shareUrl="https://example.com/workspace/project-alpha"
          title="Share Workspace"
          subtitle="Invite team members to collaborate"
          showAccessOptions
          currentAccess="private"
          showSocialShare
          showCopyLink
          onShare={(data: { access: ShareAccess; email?: string }) => {
            console.log("Share:", data);
          }}
        />
      </>
    );
  },
};
