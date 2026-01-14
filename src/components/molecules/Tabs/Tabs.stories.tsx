import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./index";
import { HomeIcon, UserIcon, SettingsIcon, BellIcon } from "@/lib/icons";

const meta: Meta<typeof Tabs> = {
  title: "Molecules/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "segment", "pills", "underline", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm text-muted-foreground">
          Make changes to your account here. Click save when you&apos;re done.
        </p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm text-muted-foreground">
          Change your password here. After saving, you&apos;ll be logged out.
        </p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm text-muted-foreground">
          Manage your settings and preferences here.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Tabs defaultValue="tab1" variant="bordered" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm text-muted-foreground">Account settings content.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm text-muted-foreground">Password settings content.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm text-muted-foreground">General settings content.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const Segment: Story = {
  render: () => (
    <Tabs defaultValue="tab1" variant="segment" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm text-muted-foreground">Overview content.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm text-muted-foreground">Analytics content.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm text-muted-foreground">Reports content.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="tab1" variant="pills" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">All</TabsTrigger>
        <TabsTrigger value="tab2">Active</TabsTrigger>
        <TabsTrigger value="tab3">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm text-muted-foreground">All items content.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm text-muted-foreground">Active items content.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm text-muted-foreground">Archived items content.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="tab1" variant="underline" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Profile</TabsTrigger>
        <TabsTrigger value="tab2">Dashboard</TabsTrigger>
        <TabsTrigger value="tab3">Contacts</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm text-muted-foreground">Profile content.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm text-muted-foreground">Dashboard content.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm text-muted-foreground">Contacts content.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="tab1" variant="vertical" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="tab1">General</TabsTrigger>
        <TabsTrigger value="tab2">Security</TabsTrigger>
        <TabsTrigger value="tab3">Notifications</TabsTrigger>
        <TabsTrigger value="tab4">Integrations</TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent value="tab1">
          <h3 className="text-lg font-medium">General Settings</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your general account settings here.
          </p>
        </TabsContent>
        <TabsContent value="tab2">
          <h3 className="text-lg font-medium">Security Settings</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your security preferences.
          </p>
        </TabsContent>
        <TabsContent value="tab3">
          <h3 className="text-lg font-medium">Notification Settings</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Configure your notification preferences.
          </p>
        </TabsContent>
        <TabsContent value="tab4">
          <h3 className="text-lg font-medium">Integrations</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Connect third-party services.
          </p>
        </TabsContent>
      </div>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="tab1" icon={<HomeIcon className="size-full" />}>
          Home
        </TabsTrigger>
        <TabsTrigger value="tab2" icon={<UserIcon className="size-full" />}>
          Profile
        </TabsTrigger>
        <TabsTrigger value="tab3" icon={<SettingsIcon className="size-full" />}>
          Settings
        </TabsTrigger>
        <TabsTrigger value="tab4" icon={<BellIcon className="size-full" />}>
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm text-muted-foreground">Home content.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-sm text-muted-foreground">Profile content.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm text-muted-foreground">Settings content.</p>
      </TabsContent>
      <TabsContent value="tab4">
        <p className="text-sm text-muted-foreground">Notifications content.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Active</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="tab3">Available</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-sm text-muted-foreground">Active tab content.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-sm text-muted-foreground">Available tab content.</p>
      </TabsContent>
    </Tabs>
  ),
};
