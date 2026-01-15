import type { Meta, StoryObj } from "@storybook/react";
import {
  InboxThread,
  InboxThreadList,
  CompactInboxItem,
  InboxSidebar,
  type EmailData,
} from "./index";
import { MailIcon, SendIcon, FileIcon, StarIcon, TrashIcon, AlertTriangleIcon } from "@/lib/icons";

const meta: Meta<typeof InboxThread> = {
  title: "Organisms/InboxChatMessages/InboxThread",
  component: InboxThread,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InboxThread>;

const sampleEmail: EmailData = {
  id: "1",
  from: {
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop",
  },
  to: [{ name: "Me", email: "me@example.com" }],
  subject: "Project Update - Q4 Planning",
  preview: "Hi team, I wanted to share some updates on our Q4 planning process...",
  content: `<p>Hi team,</p>
<p>I wanted to share some updates on our Q4 planning process. We've made significant progress on the roadmap and have identified key priorities for the upcoming quarter.</p>
<p><strong>Key Highlights:</strong></p>
<ul>
<li>Completed stakeholder interviews</li>
<li>Finalized budget allocations</li>
<li>Set timeline for major milestones</li>
</ul>
<p>Please review the attached document and let me know if you have any questions.</p>
<p>Best regards,<br/>John</p>`,
  date: "Dec 15, 2024 10:30 AM",
  isRead: false,
  isStarred: true,
  attachments: [
    { name: "Q4-Planning.pdf", size: "2.4 MB", type: "pdf" },
    { name: "Budget-Overview.xlsx", size: "856 KB", type: "excel" },
  ],
};

const emailList: EmailData[] = [
  sampleEmail,
  {
    id: "2",
    from: {
      name: "Marketing Team",
      email: "marketing@example.com",
    },
    to: [{ name: "Me", email: "me@example.com" }],
    subject: "New Campaign Launch",
    preview: "We're excited to announce the launch of our new marketing campaign...",
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
    preview: "Please find the updated holiday schedule for the upcoming year...",
    content: `<p>Please find the updated holiday schedule for the upcoming year.</p>`,
    date: "Dec 13, 2024 9:00 AM",
    isRead: true,
    isStarred: true,
  },
];

export const Default: Story = {
  args: {
    email: sampleEmail,
    defaultExpanded: true,
    showActions: true,
  },
};

export const Collapsed: Story = {
  args: {
    email: sampleEmail,
    defaultExpanded: false,
  },
};

export const WithAttachments: Story = {
  args: {
    email: sampleEmail,
    defaultExpanded: true,
    showActions: true,
  },
};

export const EmailThreadList: Story = {
  render: () => (
    <div className="w-[600px]">
      <InboxThreadList
        emails={emailList}
        onReply={(id: string) => console.log("Reply:", id)}
        onDelete={(id: string) => console.log("Delete:", id)}
      />
    </div>
  ),
};

export const CompactEmailItem: Story = {
  render: () => (
    <div className="w-[400px] space-y-2">
      {emailList.map((email) => (
        <CompactInboxItem
          key={email.id}
          email={email}
          onClick={() => console.log("Clicked:", email.id)}
        />
      ))}
    </div>
  ),
};

export const SidebarExample: Story = {
  render: () => (
    <div className="w-64">
      <InboxSidebar
        folders={[
          { id: "inbox", name: "Inbox", icon: <MailIcon className="size-4" />, count: 12, isActive: true },
          { id: "sent", name: "Sent", icon: <SendIcon className="size-4" />, count: 45 },
          { id: "drafts", name: "Drafts", icon: <FileIcon className="size-4" />, count: 3 },
          { id: "starred", name: "Starred", icon: <StarIcon className="size-4" />, count: 8 },
          { id: "spam", name: "Spam", icon: <AlertTriangleIcon className="size-4" />, count: 2 },
          { id: "trash", name: "Trash", icon: <TrashIcon className="size-4" /> },
        ]}
        onFolderClick={(id: string) => console.log("Folder:", id)}
        onCompose={() => console.log("Compose")}
      />
    </div>
  ),
};
