import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  ActivityDrawer,
  UserDetailsDrawer,
  ChatUserDetailsDrawer,
  FilesInfoDrawer,
  TaskDetailsDrawer,
} from "./index";
import { Button } from "@/components/atoms/Button";

const meta: Meta = {
  title: "Organisms/Overlays/DetailDrawers",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

// Activity Drawer Stories
export const Activity: StoryObj<typeof ActivityDrawer> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const activities = [
      {
        id: "1",
        type: "create" as const,
        title: "Project created",
        description: "New project 'Website Redesign' was created",
        user: { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" },
        timestamp: "2 hours ago",
      },
      {
        id: "2",
        type: "update" as const,
        title: "Task updated",
        description: "Status changed from 'Todo' to 'In Progress'",
        user: { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane" },
        timestamp: "4 hours ago",
      },
      {
        id: "3",
        type: "comment" as const,
        title: "New comment",
        description: "Added a comment on the design review task",
        user: { name: "Bob Wilson" },
        timestamp: "1 day ago",
      },
      {
        id: "4",
        type: "assign" as const,
        title: "Task assigned",
        description: "Assigned 'Homepage design' to Jane Smith",
        user: { name: "John Doe" },
        timestamp: "2 days ago",
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Activity Drawer</Button>
        <ActivityDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          activities={activities}
          title="Recent Activity"
          hasMore={true}
          onLoadMore={() => console.log("Load more")}
        />
      </>
    );
  },
};

// User Details Drawer Stories
export const UserDetails: StoryObj<typeof UserDetailsDrawer> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://i.pravatar.cc/150?u=john",
      role: "Senior Developer",
      department: "Engineering",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      bio: "Passionate about building great products and solving complex problems.",
      joinedAt: "January 2023",
      lastActive: "5 minutes ago",
      status: "online" as const,
      tags: ["React", "TypeScript", "Node.js"],
      socialLinks: [
        { type: "GitHub", url: "https://github.com" },
        { type: "LinkedIn", url: "https://linkedin.com" },
      ],
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View User Details</Button>
        <UserDetailsDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          user={user}
          onEdit={(u) => console.log("Edit user", u)}
          onDelete={(u) => console.log("Delete user", u)}
          onMessage={(u) => console.log("Message user", u)}
        />
      </>
    );
  },
};

// Chat User Details Drawer Stories
export const ChatUserDetails: StoryObj<typeof ChatUserDetailsDrawer> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = {
      id: "1",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "https://i.pravatar.cc/150?u=jane",
      phone: "+1 (555) 987-6543",
      bio: "Product Designer at TechCorp",
      lastActive: "2 hours ago",
      status: "away" as const,
      sharedFiles: 24,
      sharedMedia: 156,
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Chat User</Button>
        <ChatUserDetailsDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          user={user}
          onViewSharedFiles={() => console.log("View files")}
          onViewSharedMedia={() => console.log("View media")}
          onMute={(u) => console.log("Mute", u)}
          onBlock={(u) => console.log("Block", u)}
          onClearChat={(u) => console.log("Clear chat", u)}
        />
      </>
    );
  },
};

// Files Info Drawer Stories
export const FilesInfo: StoryObj<typeof FilesInfoDrawer> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const file = {
      id: "1",
      name: "Project_Design_v2.fig",
      type: "application/figma",
      size: "2.4 MB",
      path: "/Projects/Website Redesign/Design",
      createdAt: "Jan 15, 2024",
      modifiedAt: "Jan 20, 2024",
      owner: { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" },
      sharedWith: [
        { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane" },
        { name: "Bob Wilson", avatar: "https://i.pravatar.cc/150?u=bob" },
      ],
      tags: ["Design", "UI/UX", "Website"],
      description: "Final design mockups for the website redesign project.",
      versions: [
        { version: "2.0", date: "Jan 20, 2024", user: "John Doe" },
        { version: "1.1", date: "Jan 18, 2024", user: "Jane Smith" },
        { version: "1.0", date: "Jan 15, 2024", user: "John Doe" },
      ],
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View File Info</Button>
        <FilesInfoDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          file={file}
          onDownload={(f) => console.log("Download", f)}
          onShare={(f) => console.log("Share", f)}
          onDelete={(f) => console.log("Delete", f)}
          onRename={(f) => console.log("Rename", f)}
          onMove={(f) => console.log("Move", f)}
        />
      </>
    );
  },
};

// Task Details Drawer Stories
export const TaskDetails: StoryObj<typeof TaskDetailsDrawer> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const task = {
      id: "1",
      title: "Implement user authentication",
      description:
        "Add OAuth2 authentication with Google and GitHub providers. Include session management and secure token storage.",
      status: "in_progress" as const,
      priority: "high" as const,
      assignees: [
        { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" },
        { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane" },
      ],
      dueDate: "Jan 30, 2024",
      createdAt: "Jan 10, 2024",
      project: "Website Redesign",
      tags: ["Backend", "Security", "Auth"],
      estimatedTime: "8 hours",
      loggedTime: "4 hours",
      subtasks: [
        { id: "s1", title: "Set up OAuth providers", completed: true },
        { id: "s2", title: "Implement session management", completed: true },
        { id: "s3", title: "Add token storage", completed: false },
        { id: "s4", title: "Write unit tests", completed: false },
      ],
      attachments: [
        { name: "auth_flow.pdf", url: "#" },
        { name: "security_requirements.docx", url: "#" },
      ],
      comments: [
        {
          id: "c1",
          user: { name: "Bob Wilson", avatar: "https://i.pravatar.cc/150?u=bob" },
          content: "Should we also consider adding 2FA support?",
          timestamp: "2 hours ago",
        },
        {
          id: "c2",
          user: { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john" },
          content: "Good idea! Let's add that as a follow-up task.",
          timestamp: "1 hour ago",
        },
      ],
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Task Details</Button>
        <TaskDetailsDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          task={task}
          onEdit={(t) => console.log("Edit task", t)}
          onDelete={(t) => console.log("Delete task", t)}
          onStatusChange={(t, status) => console.log("Status change", t, status)}
        />
      </>
    );
  },
};
