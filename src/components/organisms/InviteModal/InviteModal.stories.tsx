import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InviteModal, TeamInviteModal } from "./index";
import type { InviteRole, InvitedUser } from "./index";
import { Button } from "@/components/atoms/Button";

const meta: Meta<typeof InviteModal> = {
  title: "Organisms/Overlays/InviteModal",
  component: InviteModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InviteModal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Invite People</Button>
        <InviteModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onInvite={(data) => {
            console.log("Invite:", data);
            setIsOpen(false);
          }}
        />
      </>
    );
  },
};

export const WithExistingUsers: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const existingUsers: InvitedUser[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://i.pravatar.cc/150?u=john",
        role: "admin",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "https://i.pravatar.cc/150?u=jane",
        role: "editor",
      },
      {
        id: "3",
        name: "Bob Wilson",
        email: "bob@example.com",
        avatar: "https://i.pravatar.cc/150?u=bob",
        role: "viewer",
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Manage Team</Button>
        <InviteModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onInvite={(data) => {
            console.log("Invite:", data);
          }}
          existingUsers={existingUsers}
          onRemoveUser={(id: string) => console.log("Remove user:", id)}
          onUpdateRole={(id: string, role: InviteRole) => console.log("Change role:", { id, role })}
          title="Manage Team Members"
        />
      </>
    );
  },
};

export const TeamInvite: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Invite to Team</Button>
        <TeamInviteModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onInvite={(data) => {
            console.log("Invite to team:", data);
            setIsOpen(false);
          }}
          teamName="Engineering Team"
        />
      </>
    );
  },
};

export const CustomRoles: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const customRoles: { value: InviteRole; label: string }[] = [
      { value: "owner", label: "Owner" },
      { value: "admin", label: "Admin" },
      { value: "editor", label: "Editor" },
      { value: "viewer", label: "Viewer" },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Invite with Custom Roles</Button>
        <InviteModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onInvite={(data) => {
            console.log("Invite:", data);
            setIsOpen(false);
          }}
          availableRoles={customRoles}
          defaultRole="editor"
        />
      </>
    );
  },
};

export const WithLoading: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInvite = (data: { emails: string[]; role: InviteRole; message?: string }) => {
      setLoading(true);
      setTimeout(() => {
        console.log("Invited:", data);
        setLoading(false);
        setIsOpen(false);
      }, 2000);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Invite (with loading)</Button>
        <InviteModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onInvite={handleInvite}
          loading={loading}
        />
      </>
    );
  },
};
