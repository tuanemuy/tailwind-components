import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { CreateProjectModal, EditEventModal, EditUserModal } from "./index";

const meta: Meta = {
  title: "Organisms/Overlays/EditFormModals",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

// Edit User Modal Stories
export const EditUser: StoryObj<typeof EditUserModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Edit User</Button>
        <EditUserModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(data) => {
            console.log("Save user:", data);
            setIsOpen(false);
          }}
          initialData={{
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            role: "developer",
            department: "engineering",
            location: "San Francisco, CA",
            bio: "Passionate about building great products.",
            tags: ["React", "TypeScript"],
          }}
          roles={[
            { value: "admin", label: "Administrator" },
            { value: "developer", label: "Developer" },
            { value: "designer", label: "Designer" },
            { value: "manager", label: "Manager" },
          ]}
          departments={[
            { value: "engineering", label: "Engineering" },
            { value: "design", label: "Design" },
            { value: "marketing", label: "Marketing" },
            { value: "sales", label: "Sales" },
          ]}
        />
      </>
    );
  },
};

export const CreateUser: StoryObj<typeof EditUserModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Create User</Button>
        <EditUserModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(data) => {
            console.log("Create user:", data);
            setIsOpen(false);
          }}
          title="Create User"
          submitText="Create User"
          roles={[
            { value: "admin", label: "Administrator" },
            { value: "developer", label: "Developer" },
            { value: "designer", label: "Designer" },
          ]}
          departments={[
            { value: "engineering", label: "Engineering" },
            { value: "design", label: "Design" },
            { value: "marketing", label: "Marketing" },
          ]}
        />
      </>
    );
  },
};

// Edit Event Modal Stories
export const EditEvent: StoryObj<typeof EditEventModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Edit Event</Button>
        <EditEventModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(data) => {
            console.log("Save event:", data);
            setIsOpen(false);
          }}
          initialData={{
            title: "Team Meeting",
            description: "Weekly team sync to discuss progress and blockers.",
            date: new Date(),
            startTime: { hours: 10, minutes: 0 },
            endTime: { hours: 11, minutes: 0 },
            location: "Conference Room A",
            category: "meeting",
            reminder: "15m",
            color: "blue",
            attendees: ["john@example.com", "jane@example.com"],
          }}
          categories={[
            { value: "meeting", label: "Meeting" },
            { value: "call", label: "Call" },
            { value: "event", label: "Event" },
            { value: "reminder", label: "Reminder" },
          ]}
        />
      </>
    );
  },
};

export const CreateEvent: StoryObj<typeof EditEventModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Create Event</Button>
        <EditEventModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(data) => {
            console.log("Create event:", data);
            setIsOpen(false);
          }}
          title="Create Event"
          submitText="Create Event"
          categories={[
            { value: "meeting", label: "Meeting" },
            { value: "call", label: "Call" },
            { value: "event", label: "Event" },
            { value: "reminder", label: "Reminder" },
          ]}
        />
      </>
    );
  },
};

export const AllDayEvent: StoryObj<typeof EditEventModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Create All Day Event</Button>
        <EditEventModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={(data) => {
            console.log("Create event:", data);
            setIsOpen(false);
          }}
          title="Create Event"
          initialData={{
            title: "",
            isAllDay: true,
          }}
        />
      </>
    );
  },
};

// Create Project Modal Stories
export const CreateProject: StoryObj<typeof CreateProjectModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Create Project</Button>
        <CreateProjectModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onCreate={(data) => {
            console.log("Create project:", data);
            setIsOpen(false);
          }}
        />
      </>
    );
  },
};

export const CreateProjectWithTemplates: StoryObj<typeof CreateProjectModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Create from Template</Button>
        <CreateProjectModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onCreate={(data) => {
            console.log("Create project:", data);
            setIsOpen(false);
          }}
          templateOptions={[
            { value: "agile", label: "Agile Sprint" },
            { value: "kanban", label: "Kanban Board" },
            { value: "marketing", label: "Marketing Campaign" },
            { value: "product", label: "Product Launch" },
          ]}
        />
      </>
    );
  },
};

export const EditProject: StoryObj<typeof CreateProjectModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Edit Project</Button>
        <CreateProjectModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onCreate={(data) => {
            console.log("Update project:", data);
            setIsOpen(false);
          }}
          title="Edit Project"
          submitText="Save Changes"
          initialData={{
            name: "Website Redesign",
            description:
              "Complete overhaul of the company website with modern design.",
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: "active",
            priority: "high",
            visibility: "team",
            teamMembers: [
              "john@example.com",
              "jane@example.com",
              "bob@example.com",
            ],
            tags: ["Design", "Frontend", "Marketing"],
          }}
        />
      </>
    );
  },
};
