import type { Meta, StoryObj } from "@storybook/react";
import type { EmailData } from "../InboxThread";
import { InboxLayout, type InboxStats, SplitInboxLayout } from "./index";

const meta: Meta<typeof InboxLayout> = {
  title: "Organisms/InboxChatMessages/InboxLayout",
  component: InboxLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InboxLayout>;

const sampleStats: InboxStats = {
  inbox: 24,
  sent: 156,
  drafts: 3,
  spam: 5,
  trash: 12,
  starred: 8,
};

const sampleEmails: EmailData[] = [
  {
    id: "1",
    from: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop",
    },
    to: [{ name: "Me", email: "me@example.com" }],
    subject: "Project Update - Q4 Planning",
    preview:
      "Hi team, I wanted to share some updates on our Q4 planning process...",
    content: `<p>Hi team,</p>
<p>I wanted to share some updates on our Q4 planning process. We've made significant progress on the roadmap.</p>
<p>Best regards,<br/>John</p>`,
    date: "Dec 15, 2024 10:30 AM",
    isRead: false,
    isStarred: true,
    attachments: [{ name: "Q4-Planning.pdf", size: "2.4 MB", type: "pdf" }],
  },
  {
    id: "2",
    from: {
      name: "Marketing Team",
      email: "marketing@example.com",
    },
    to: [{ name: "Me", email: "me@example.com" }],
    subject: "New Campaign Launch",
    preview:
      "We're excited to announce the launch of our new marketing campaign...",
    content: `<p>We're excited to announce the launch of our new marketing campaign.</p>`,
    date: "Dec 14, 2024 3:00 PM",
    isRead: true,
    isStarred: false,
  },
  {
    id: "3",
    from: {
      name: "HR Department",
      email: "hr@example.com",
    },
    to: [{ name: "Me", email: "me@example.com" }],
    subject: "Holiday Schedule Update",
    preview:
      "Please find the updated holiday schedule for the upcoming year...",
    content:
      "<p>Please find the updated holiday schedule for the upcoming year.</p>",
    date: "Dec 13, 2024 9:00 AM",
    isRead: true,
    isStarred: true,
  },
  {
    id: "4",
    from: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
    },
    to: [{ name: "Me", email: "me@example.com" }],
    subject: "Re: Design Review Feedback",
    preview: "Thanks for the feedback! I've incorporated your suggestions...",
    content: `<p>Thanks for the feedback! I've incorporated your suggestions.</p>`,
    date: "Dec 12, 2024 4:45 PM",
    isRead: false,
    isStarred: false,
  },
  {
    id: "5",
    from: {
      name: "Dev Team",
      email: "dev@example.com",
    },
    to: [{ name: "Me", email: "me@example.com" }],
    subject: "Sprint Retrospective Notes",
    preview: "Here are the key takeaways from our last sprint retrospective...",
    content:
      "<p>Here are the key takeaways from our last sprint retrospective.</p>",
    date: "Dec 11, 2024 2:00 PM",
    isRead: true,
    isStarred: false,
  },
];

export const Default: Story = {
  render: () => (
    <div className="h-[600px]">
      <InboxLayout
        emails={sampleEmails}
        stats={sampleStats}
        activeFolder="inbox"
        showSidebar={true}
        showPreview={false}
        onSelectEmail={(id: string) => console.log("Select:", id)}
        onSelectFolder={(id: string) => console.log("Folder:", id)}
        onCompose={() => console.log("Compose")}
        onRefresh={() => console.log("Refresh")}
        onSearch={(query: string) => console.log("Search:", query)}
      />
    </div>
  ),
};

export const WithPreview: Story = {
  render: () => (
    <div className="h-[600px]">
      <InboxLayout
        emails={sampleEmails}
        selectedEmail={sampleEmails[0]}
        stats={sampleStats}
        activeFolder="inbox"
        showSidebar={true}
        showPreview={true}
        onSelectEmail={(id: string) => console.log("Select:", id)}
        onSelectFolder={(id: string) => console.log("Folder:", id)}
        onCompose={() => console.log("Compose")}
      />
    </div>
  ),
};

export const SplitView: Story = {
  render: () => (
    <div className="h-[600px]">
      <SplitInboxLayout
        emails={sampleEmails}
        selectedEmail={sampleEmails[0]}
        stats={sampleStats}
        activeFolder="inbox"
        previewPosition="right"
        onSelectEmail={(id: string) => console.log("Select:", id)}
        onSelectFolder={(id: string) => console.log("Folder:", id)}
      />
    </div>
  ),
};

export const NoSidebar: Story = {
  render: () => (
    <div className="h-[600px]">
      <InboxLayout
        emails={sampleEmails}
        stats={sampleStats}
        activeFolder="inbox"
        showSidebar={false}
        showPreview={false}
        onSelectEmail={(id: string) => console.log("Select:", id)}
      />
    </div>
  ),
};

export const EmptyInbox: Story = {
  render: () => (
    <div className="h-[600px]">
      <InboxLayout
        emails={[]}
        stats={{ inbox: 0, sent: 0, drafts: 0, spam: 0, trash: 0, starred: 0 }}
        activeFolder="inbox"
        showSidebar={true}
        onSelectEmail={(id: string) => console.log("Select:", id)}
        onSelectFolder={(id: string) => console.log("Folder:", id)}
        onCompose={() => console.log("Compose")}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="h-[600px]">
      <InboxLayout
        emails={[]}
        stats={sampleStats}
        activeFolder="inbox"
        showSidebar={true}
        isLoading={true}
        onSelectEmail={(id: string) => console.log("Select:", id)}
        onSelectFolder={(id: string) => console.log("Folder:", id)}
      />
    </div>
  ),
};

export const WithPagination: Story = {
  render: () => (
    <div className="h-[600px]">
      <InboxLayout
        emails={sampleEmails}
        stats={sampleStats}
        activeFolder="inbox"
        showSidebar={true}
        currentPage={1}
        totalPages={5}
        onSelectEmail={(id: string) => console.log("Select:", id)}
        onSelectFolder={(id: string) => console.log("Folder:", id)}
        onPageChange={(page: number) => console.log("Page:", page)}
      />
    </div>
  ),
};

export const WithCompose: Story = {
  render: () => (
    <div className="h-[600px]">
      <InboxLayout
        emails={sampleEmails}
        stats={sampleStats}
        activeFolder="inbox"
        showSidebar={true}
        showCompose={true}
        onSelectEmail={(id: string) => console.log("Select:", id)}
        onSelectFolder={(id: string) => console.log("Folder:", id)}
        onCompose={() => console.log("Compose")}
        onCloseCompose={() => console.log("Close compose")}
        onSendEmail={(data) => console.log("Send:", data)}
      />
    </div>
  ),
};
