import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Avatar } from "@/components/atoms/Avatar";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  FolderIcon,
  HomeIcon,
  MailIcon,
  SettingsIcon,
  UsersIcon,
} from "@/components/icons";
import {
  Sidebar,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarLogo,
  SidebarSection,
} from "./index";

const meta: Meta<typeof Sidebar> = {
  title: "Organisms/Layout/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
    <div className="flex h-[600px]">
      <Sidebar
        fixed={false}
        header={<SidebarLogo href="#" text="Dashboard" />}
        footer={
          <div className="flex items-center gap-3">
            <Avatar
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400"
              alt="User"
              size="sm"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
          </div>
        }
      >
        <SidebarSection title="Main">
          <SidebarItem icon={<HomeIcon />} label="Dashboard" active href="#" />
          <SidebarItem icon={<UsersIcon />} label="Users" badge={12} href="#" />
          <SidebarItem icon={<FolderIcon />} label="Projects" href="#" />
          <SidebarItem icon={<CalendarIcon />} label="Calendar" href="#" />
        </SidebarSection>

        <SidebarSection title="Settings">
          <SidebarItem icon={<SettingsIcon />} label="Settings" href="#" />
          <SidebarItem
            icon={<BellIcon />}
            label="Notifications"
            badge="New"
            badgeVariant="destructive"
            href="#"
          />
        </SidebarSection>
      </Sidebar>
      <main className="flex-1 p-6 bg-muted/30">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p className="mt-2 text-muted-foreground">
          This is the main content area next to the sidebar.
        </p>
      </main>
    </div>
  ),
};

export const Collapsible: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <div className="flex h-[600px]">
        <Sidebar
          fixed={false}
          collapsible
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          header={
            <SidebarHeader logo={<SidebarLogo href="#" text="App" />} />
          }
        >
          <SidebarSection>
            <SidebarItem
              icon={<HomeIcon />}
              label="Dashboard"
              active
              href="#"
            />
            <SidebarItem
              icon={<UsersIcon />}
              label="Users"
              badge={5}
              href="#"
            />
            <SidebarItem icon={<FolderIcon />} label="Projects" href="#" />
            <SidebarItem
              icon={<MailIcon />}
              label="Messages"
              badge={99}
              badgeVariant="destructive"
              href="#"
            />
            <SidebarItem icon={<SettingsIcon />} label="Settings" href="#" />
          </SidebarSection>
        </Sidebar>
        <main className="flex-1 p-6 bg-muted/30">
          <h1 className="text-2xl font-bold">Collapsible Sidebar</h1>
          <p className="mt-2 text-muted-foreground">
            Click the toggle button in the sidebar header to collapse/expand.
          </p>
        </main>
      </div>
    );
  },
};

export const WithGroups: Story = {
  render: () => (
    <div className="flex h-[600px]">
      <Sidebar fixed={false} header={<SidebarLogo href="#" text="Workspace" />}>
        <SidebarSection>
          <SidebarItem icon={<HomeIcon />} label="Home" active href="#" />
          <SidebarItem
            icon={<BellIcon />}
            label="Notifications"
            badge={3}
            href="#"
          />
        </SidebarSection>

        <SidebarSection title="Content">
          <SidebarGroup icon={<FolderIcon />} label="Projects" defaultOpen>
            <SidebarItem
              icon={<FileTextIcon />}
              label="Project Alpha"
              href="#"
            />
            <SidebarItem
              icon={<FileTextIcon />}
              label="Project Beta"
              href="#"
            />
            <SidebarItem
              icon={<FileTextIcon />}
              label="Project Gamma"
              href="#"
            />
          </SidebarGroup>
          <SidebarGroup icon={<UsersIcon />} label="Teams">
            <SidebarItem icon={<UsersIcon />} label="Design Team" href="#" />
            <SidebarItem icon={<UsersIcon />} label="Engineering" href="#" />
            <SidebarItem icon={<UsersIcon />} label="Marketing" href="#" />
          </SidebarGroup>
        </SidebarSection>

        <SidebarSection title="Account">
          <SidebarItem icon={<SettingsIcon />} label="Settings" href="#" />
        </SidebarSection>
      </Sidebar>
      <main className="flex-1 p-6 bg-muted/30">
        <h1 className="text-2xl font-bold">Sidebar with Groups</h1>
        <p className="mt-2 text-muted-foreground">
          Expand the collapsible groups to see nested items.
        </p>
      </main>
    </div>
  ),
};

export const MiniSidebar: Story = {
  render: () => (
    <div className="flex h-[600px]">
      <Sidebar
        fixed={false}
        width="mini"
        variant="elevated"
        header={
          <div className="flex justify-center">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              A
            </div>
          </div>
        }
      >
        <SidebarSection>
          <SidebarItem icon={<HomeIcon />} label="Home" active href="#" />
          <SidebarItem icon={<UsersIcon />} label="Users" href="#" />
          <SidebarItem icon={<FolderIcon />} label="Files" href="#" />
          <SidebarItem icon={<CalendarIcon />} label="Calendar" href="#" />
          <SidebarItem icon={<MailIcon />} label="Messages" href="#" />
          <SidebarItem icon={<SettingsIcon />} label="Settings" href="#" />
        </SidebarSection>
      </Sidebar>
      <main className="flex-1 p-6 bg-muted/30">
        <h1 className="text-2xl font-bold">Mini Sidebar</h1>
        <p className="mt-2 text-muted-foreground">
          A compact sidebar showing only icons. Hover over items to see
          tooltips.
        </p>
      </main>
    </div>
  ),
};

export const WideSidebar: Story = {
  render: () => (
    <div className="flex h-[600px]">
      <Sidebar
        fixed={false}
        width="wide"
        header={<SidebarLogo href="#" text="Wide Dashboard" />}
        footer={
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium">Need help?</p>
            <p className="text-xs text-muted-foreground mt-1">
              Check our documentation or contact support.
            </p>
          </div>
        }
      >
        <SidebarSection title="Navigation">
          <SidebarItem
            icon={<HomeIcon />}
            label="Dashboard Overview"
            active
            href="#"
          />
          <SidebarItem
            icon={<UsersIcon />}
            label="Team Members"
            badge={24}
            href="#"
          />
          <SidebarItem
            icon={<FolderIcon />}
            label="Project Management"
            href="#"
          />
          <SidebarItem
            icon={<CalendarIcon />}
            label="Schedule & Events"
            href="#"
          />
          <SidebarItem
            icon={<MailIcon />}
            label="Communications"
            badge={7}
            badgeVariant="destructive"
            href="#"
          />
        </SidebarSection>

        <SidebarSection title="Administration">
          <SidebarItem
            icon={<SettingsIcon />}
            label="System Settings"
            href="#"
          />
          <SidebarItem
            icon={<BellIcon />}
            label="Notification Center"
            href="#"
          />
        </SidebarSection>
      </Sidebar>
      <main className="flex-1 p-6 bg-muted/30">
        <h1 className="text-2xl font-bold">Wide Sidebar</h1>
        <p className="mt-2 text-muted-foreground">
          A wider sidebar with more room for content.
        </p>
      </main>
    </div>
  ),
};
