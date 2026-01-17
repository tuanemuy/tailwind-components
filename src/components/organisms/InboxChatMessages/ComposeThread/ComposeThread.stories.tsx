import type { Meta, StoryObj } from "@storybook/react";
import { ComposeThread, EmailCompose } from "./index";

const meta: Meta<typeof ComposeThread> = {
  title: "Organisms/InboxChatMessages/ComposeThread",
  component: ComposeThread,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ComposeThread>;

export const Default: Story = {
  render: () => (
    <div className="w-[500px] p-4 bg-card border border-border rounded-lg">
      <ComposeThread
        placeholder="Type a message..."
        onSend={(message, attachments) => {
          console.log("Send:", message, attachments);
        }}
      />
    </div>
  ),
};

export const WithPrefilledText: Story = {
  render: () => (
    <div className="w-[500px] p-4 bg-card border border-border rounded-lg">
      <ComposeThread
        value="This is a prefilled message"
        onChange={(value) => console.log("Changed:", value)}
        onSend={(message) => console.log("Send:", message)}
      />
    </div>
  ),
};

export const ShowEmojiAndAttachment: Story = {
  render: () => (
    <div className="w-[500px] p-4 bg-card border border-border rounded-lg">
      <ComposeThread
        showEmoji={true}
        showAttach={true}
        showVoice={true}
        onSend={(message, attachments) => {
          console.log("Send:", message, attachments);
        }}
        onAttach={() => console.log("Attach clicked")}
        onVoice={() => console.log("Voice record")}
      />
    </div>
  ),
};

export const Minimal: Story = {
  render: () => (
    <div className="w-[500px] p-4 bg-card border border-border rounded-lg">
      <ComposeThread
        showEmoji={false}
        showAttach={false}
        showVoice={false}
        placeholder="Quick message..."
        onSend={(message) => console.log("Send:", message)}
      />
    </div>
  ),
};

export const EmailComposeDefault: Story = {
  render: () => (
    <div className="w-[600px]">
      <EmailCompose
        onSend={() => console.log("Email sent")}
        onDiscard={() => console.log("Discarded")}
        onSaveDraft={() => console.log("Draft saved")}
      />
    </div>
  ),
};

export const EmailComposeWithRecipients: Story = {
  render: () => (
    <div className="w-[600px]">
      <EmailCompose
        to={[{ id: "1", name: "John Smith", email: "john.smith@example.com" }]}
        subject="Project Update"
        content="Hi John,\n\nHere's the project update you requested.\n\nBest regards"
        onSend={() => console.log("Reply sent")}
        onDiscard={() => console.log("Discarded")}
      />
    </div>
  ),
};

export const EmailComposeWithCcBcc: Story = {
  render: () => (
    <div className="w-[600px]">
      <EmailCompose
        to={[{ id: "1", name: "John Smith", email: "john.smith@example.com" }]}
        cc={[{ id: "2", name: "Jane Doe", email: "jane.doe@example.com" }]}
        showCc={true}
        showBcc={true}
        subject="Team Meeting"
        onSend={() => console.log("Email sent")}
        onDiscard={() => console.log("Discarded")}
      />
    </div>
  ),
};

export const EmailComposeLoading: Story = {
  render: () => (
    <div className="w-[600px]">
      <EmailCompose
        to={[{ id: "1", name: "John Smith", email: "john.smith@example.com" }]}
        subject="Sending email..."
        loading={true}
        onSend={() => console.log("Email sent")}
        onDiscard={() => console.log("Discarded")}
      />
    </div>
  ),
};
