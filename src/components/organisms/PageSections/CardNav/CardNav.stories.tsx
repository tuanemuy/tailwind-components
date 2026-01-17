import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Badge } from "@/components/atoms/Badge";
import {
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  FileIcon,
  FolderIcon,
  HomeIcon,
  ImageIcon,
  LayoutIcon,
  MusicIcon,
  PaletteIcon,
  SettingsIcon,
  UserIcon,
  VideoIcon,
} from "@/components/icons";
import {
  CardNav,
  CardNavItem,
  CardNavLink,
  FeatureSelection,
  HorizontalCardNav,
} from "./index";

const meta: Meta<typeof CardNav> = {
  title: "Organisms/PageSections/CardNav",
  component: CardNav,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: "select",
      options: [2, 3, 4, "auto"],
    },
    gap: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "outlined", "filled"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardNav>;

const basicItems = [
  {
    value: "home",
    icon: <HomeIcon className="size-full" />,
    title: "Home",
    description: "Return to dashboard",
  },
  {
    value: "profile",
    icon: <UserIcon className="size-full" />,
    title: "Profile",
    description: "View your profile",
  },
  {
    value: "settings",
    icon: <SettingsIcon className="size-full" />,
    title: "Settings",
    description: "Manage preferences",
  },
  {
    value: "files",
    icon: <FileIcon className="size-full" />,
    title: "Files",
    description: "Browse your files",
  },
];

export const Default: Story = {
  args: {
    defaultValue: "home",
    items: basicItems,
    columns: 4,
  },
};

export const TwoColumns: Story = {
  args: {
    defaultValue: "home",
    items: basicItems,
    columns: 2,
  },
};

export const ThreeColumns: Story = {
  args: {
    defaultValue: "home",
    items: basicItems.slice(0, 3),
    columns: 3,
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    defaultValue: "home",
    items: basicItems,
    columns: 4,
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
    defaultValue: "home",
    items: basicItems,
    columns: 4,
  },
};

export const WithBadges: Story = {
  args: {
    defaultValue: "documents",
    columns: 4,
    items: [
      {
        value: "documents",
        icon: <FileIcon className="size-full" />,
        title: "Documents",
        description: "12 files",
        badge: (
          <Badge variant="default" size="sm">
            New
          </Badge>
        ),
      },
      {
        value: "images",
        icon: <ImageIcon className="size-full" />,
        title: "Images",
        description: "48 files",
      },
      {
        value: "videos",
        icon: <VideoIcon className="size-full" />,
        title: "Videos",
        description: "8 files",
      },
      {
        value: "music",
        icon: <MusicIcon className="size-full" />,
        title: "Music",
        description: "156 files",
        badge: (
          <Badge variant="success" size="sm">
            Pro
          </Badge>
        ),
      },
    ],
  },
};

export const FileTypes: Story = {
  args: {
    defaultValue: "all",
    columns: "auto",
    items: [
      {
        value: "all",
        icon: <FolderIcon className="size-full" />,
        title: "All Files",
        description: "224 items",
      },
      {
        value: "documents",
        icon: <FileIcon className="size-full" />,
        title: "Documents",
        description: "89 items",
      },
      {
        value: "images",
        icon: <ImageIcon className="size-full" />,
        title: "Images",
        description: "67 items",
      },
      {
        value: "videos",
        icon: <VideoIcon className="size-full" />,
        title: "Videos",
        description: "23 items",
      },
      {
        value: "music",
        icon: <MusicIcon className="size-full" />,
        title: "Music",
        description: "45 items",
      },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    defaultValue: "basic",
    columns: 3,
    items: [
      {
        value: "basic",
        icon: <LayoutIcon className="size-full" />,
        title: "Basic",
        description: "Free tier",
      },
      {
        value: "pro",
        icon: <CodeIcon className="size-full" />,
        title: "Pro",
        description: "Advanced features",
      },
      {
        value: "enterprise",
        icon: <DatabaseIcon className="size-full" />,
        title: "Enterprise",
        description: "Coming soon",
        disabled: true,
      },
    ],
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <div className="space-y-4">
        <CardNav
          value={value}
          onValueChange={setValue}
          columns={3}
          items={[
            {
              value: "option1",
              icon: <CloudIcon className="size-full" />,
              title: "Option 1",
              description: "First option",
            },
            {
              value: "option2",
              icon: <DatabaseIcon className="size-full" />,
              title: "Option 2",
              description: "Second option",
            },
            {
              value: "option3",
              icon: <CodeIcon className="size-full" />,
              title: "Option 3",
              description: "Third option",
            },
          ]}
        />
        <div className="rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">
            Selected:{" "}
            <span className="font-medium text-foreground">{value}</span>
          </p>
        </div>
      </div>
    );
  },
};

export const Horizontal: StoryObj<typeof HorizontalCardNav> = {
  render: () => (
    <HorizontalCardNav
      defaultValue="all"
      items={[
        {
          value: "all",
          icon: <FolderIcon className="size-full" />,
          title: "All",
        },
        {
          value: "docs",
          icon: <FileIcon className="size-full" />,
          title: "Docs",
        },
        {
          value: "images",
          icon: <ImageIcon className="size-full" />,
          title: "Images",
        },
        {
          value: "videos",
          icon: <VideoIcon className="size-full" />,
          title: "Videos",
        },
        {
          value: "music",
          icon: <MusicIcon className="size-full" />,
          title: "Music",
        },
      ]}
    />
  ),
};

export const HorizontalScrollable: StoryObj<typeof HorizontalCardNav> = {
  render: () => (
    <div className="max-w-md">
      <HorizontalCardNav
        scrollable
        defaultValue="all"
        items={[
          {
            value: "all",
            icon: <FolderIcon className="size-full" />,
            title: "All",
          },
          {
            value: "docs",
            icon: <FileIcon className="size-full" />,
            title: "Docs",
          },
          {
            value: "images",
            icon: <ImageIcon className="size-full" />,
            title: "Images",
          },
          {
            value: "videos",
            icon: <VideoIcon className="size-full" />,
            title: "Videos",
          },
          {
            value: "music",
            icon: <MusicIcon className="size-full" />,
            title: "Music",
          },
          {
            value: "archives",
            icon: <DatabaseIcon className="size-full" />,
            title: "Archives",
          },
        ]}
      />
    </div>
  ),
};

export const FeatureSelectionExample: StoryObj<typeof FeatureSelection> = {
  render: () => (
    <FeatureSelection
      title="Choose your plan"
      description="Select the plan that best fits your needs"
      items={[
        {
          value: "starter",
          icon: <LayoutIcon className="size-full" />,
          title: "Starter",
          description: "Perfect for individuals getting started",
        },
        {
          value: "pro",
          icon: <CodeIcon className="size-full" />,
          title: "Professional",
          description: "For growing teams and businesses",
          popular: true,
        },
        {
          value: "enterprise",
          icon: <DatabaseIcon className="size-full" />,
          title: "Enterprise",
          description: "Advanced features for large organizations",
        },
      ]}
      onValueChange={(value) => console.log("Selected:", value)}
    />
  ),
};

export const ProjectTypeSelection: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">What are you building?</h2>
        <p className="mt-2 text-muted-foreground">
          Select a project type to get started
        </p>
      </div>
      <CardNav
        columns={3}
        defaultValue="webapp"
        items={[
          {
            value: "webapp",
            icon: <LayoutIcon className="size-full" />,
            title: "Web Application",
            description: "React, Vue, Angular",
          },
          {
            value: "api",
            icon: <DatabaseIcon className="size-full" />,
            title: "API Backend",
            description: "Node, Python, Go",
          },
          {
            value: "mobile",
            icon: <CodeIcon className="size-full" />,
            title: "Mobile App",
            description: "iOS, Android, React Native",
          },
          {
            value: "static",
            icon: <FileIcon className="size-full" />,
            title: "Static Site",
            description: "HTML, CSS, JavaScript",
          },
          {
            value: "design",
            icon: <PaletteIcon className="size-full" />,
            title: "Design System",
            description: "Component library",
          },
          {
            value: "other",
            icon: <FolderIcon className="size-full" />,
            title: "Other",
            description: "Custom project",
          },
        ]}
      />
    </div>
  ),
};

export const Composable: Story = {
  render: () => (
    <CardNav columns={3} defaultValue="home">
      <CardNavItem
        value="home"
        icon={<HomeIcon className="size-full" />}
        title="Home"
        description="Go to dashboard"
      />
      <CardNavItem
        value="profile"
        icon={<UserIcon className="size-full" />}
        title="Profile"
        description="View your profile"
        badge={
          <Badge variant="success" size="sm">
            New
          </Badge>
        }
      />
      <CardNavItem
        value="settings"
        icon={<SettingsIcon className="size-full" />}
        title="Settings"
        description="Manage preferences"
      />
    </CardNav>
  ),
};

export const LinkVariant: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <CardNavLink
        href="/dashboard"
        active
        icon={<HomeIcon className="size-full" />}
        title="Dashboard"
        description="View dashboard"
      />
      <CardNavLink
        href="/analytics"
        icon={<CodeIcon className="size-full" />}
        title="Analytics"
        description="View analytics"
      />
      <CardNavLink
        href="/settings"
        icon={<SettingsIcon className="size-full" />}
        title="Settings"
        description="Manage settings"
      />
    </div>
  ),
};
