import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardBody, CardHeader } from "../../DataDisplay/Card";
import {
  HolyGrailLayout,
  LayoutColumn,
  LayoutMain,
  LayoutSidebar,
  MasonryColumnItem,
  MasonryColumnLayout,
  MultiColumnLayout,
  ThreeColumnLayout,
  TwoColumnLayout,
} from "./index";

const meta: Meta<typeof MultiColumnLayout> = {
  title: "Organisms/Layout/MultiColumnLayout",
  component: MultiColumnLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiColumnLayout>;

// Sample content components for stories
const SampleCard = ({
  title,
  height = "auto",
}: {
  title: string;
  height?: string;
}) => (
  <Card className="h-full" style={{ minHeight: height }}>
    <CardHeader>
      <h3 className="font-semibold">{title}</h3>
    </CardHeader>
    <CardBody>
      <p className="text-muted-foreground text-sm">
        This is sample content for the {title} section.
      </p>
    </CardBody>
  </Card>
);

const SidebarContent = () => (
  <div className="space-y-4 p-4 bg-card rounded-lg border">
    <h3 className="font-semibold">Sidebar</h3>
    <nav className="space-y-2">
      <a
        href="#dashboard"
        className="block px-3 py-2 rounded-md hover:bg-muted text-sm"
      >
        Dashboard
      </a>
      <a
        href="#projects"
        className="block px-3 py-2 rounded-md hover:bg-muted text-sm"
      >
        Projects
      </a>
      <a
        href="#tasks"
        className="block px-3 py-2 rounded-md hover:bg-muted text-sm"
      >
        Tasks
      </a>
      <a
        href="#reports"
        className="block px-3 py-2 rounded-md hover:bg-muted text-sm"
      >
        Reports
      </a>
      <a
        href="#settings"
        className="block px-3 py-2 rounded-md hover:bg-muted text-sm"
      >
        Settings
      </a>
    </nav>
  </div>
);

const MainContent = () => (
  <div className="space-y-6">
    <div className="p-6 bg-card rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Main Content</h2>
      <p className="text-muted-foreground mb-4">
        This is the main content area. It typically contains the primary content
        of the page, such as articles, dashboards, or forms.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Card 1</h4>
          <p className="text-sm text-muted-foreground">Some content here.</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Card 2</h4>
          <p className="text-sm text-muted-foreground">Some content here.</p>
        </div>
      </div>
    </div>
    <div className="p-6 bg-card rounded-lg border">
      <h3 className="font-semibold mb-4">Additional Section</h3>
      <p className="text-muted-foreground">
        More content can be added here to demonstrate scrolling behavior with
        sticky sidebars.
      </p>
    </div>
  </div>
);

const AsideContent = () => (
  <div className="space-y-4 p-4 bg-card rounded-lg border">
    <h3 className="font-semibold">Aside</h3>
    <div className="space-y-3">
      <div className="p-3 bg-muted rounded-lg">
        <p className="text-sm font-medium">Quick Stats</p>
        <p className="text-2xl font-bold">1,234</p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <p className="text-sm font-medium">Active Users</p>
        <p className="text-2xl font-bold">567</p>
      </div>
    </div>
  </div>
);

// Basic Stories
export const Default: Story = {
  args: {
    columns: 3,
    gap: "md",
    children: (
      <>
        <SampleCard title="Column 1" />
        <SampleCard title="Column 2" />
        <SampleCard title="Column 3" />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    gap: "lg",
    children: (
      <>
        <SampleCard title="Left Column" height="200px" />
        <SampleCard title="Right Column" height="200px" />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
};

export const FourColumns: Story = {
  args: {
    columns: 4,
    gap: "md",
    children: (
      <>
        <SampleCard title="Column 1" />
        <SampleCard title="Column 2" />
        <SampleCard title="Column 3" />
        <SampleCard title="Column 4" />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
};

export const SidebarLeft: Story = {
  args: {
    variant: "sidebar-left",
    gap: "lg",
    children: (
      <>
        <SidebarContent />
        <MainContent />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
};

export const SidebarRight: Story = {
  args: {
    variant: "sidebar-right",
    gap: "lg",
    children: (
      <>
        <MainContent />
        <AsideContent />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
};

// Pre-composed layouts
export const TwoColumnLayoutStory: StoryObj<typeof TwoColumnLayout> = {
  render: () => (
    <div className="p-8">
      <TwoColumnLayout
        leftColumn={<SampleCard title="Left Content" height="300px" />}
        rightColumn={<SampleCard title="Right Content" height="300px" />}
        gap="lg"
        ratio="1:2"
      />
    </div>
  ),
  name: "TwoColumnLayout (1:2 Ratio)",
};

export const TwoColumnLayoutReversed: StoryObj<typeof TwoColumnLayout> = {
  render: () => (
    <div className="p-8">
      <TwoColumnLayout
        leftColumn={<SampleCard title="Primary Content" height="300px" />}
        rightColumn={<SampleCard title="Secondary Content" height="300px" />}
        gap="lg"
        ratio="2:1"
        reverseOnMobile
      />
    </div>
  ),
  name: "TwoColumnLayout (Reversed on Mobile)",
};

export const ThreeColumnLayoutStory: StoryObj<typeof ThreeColumnLayout> = {
  render: () => (
    <div className="p-8">
      <ThreeColumnLayout
        leftSidebar={<SidebarContent />}
        mainContent={<MainContent />}
        rightSidebar={<AsideContent />}
        gap="lg"
        stickyOffset="0px"
      />
    </div>
  ),
  name: "ThreeColumnLayout",
};

export const ThreeColumnLayoutNoRightSidebar: StoryObj<
  typeof ThreeColumnLayout
> = {
  render: () => (
    <div className="p-8">
      <ThreeColumnLayout
        leftSidebar={<SidebarContent />}
        mainContent={<MainContent />}
        gap="lg"
      />
    </div>
  ),
  name: "ThreeColumnLayout (No Right Sidebar)",
};

export const HolyGrailLayoutStory: StoryObj<typeof HolyGrailLayout> = {
  render: () => (
    <HolyGrailLayout
      header={
        <div className="h-16 bg-card border-b flex items-center px-6">
          <h1 className="font-bold text-lg">Header</h1>
        </div>
      }
      leftSidebar={<SidebarContent />}
      mainContent={
        <div className="space-y-6">
          <MainContent />
          <MainContent />
        </div>
      }
      rightSidebar={<AsideContent />}
      footer={
        <div className="h-16 bg-card border-t flex items-center justify-center px-6">
          <p className="text-sm text-muted-foreground">Footer Content</p>
        </div>
      }
      stickyHeader
      gap="lg"
    />
  ),
  name: "HolyGrailLayout",
};

export const MasonryLayout: StoryObj<typeof MasonryColumnLayout> = {
  render: () => (
    <div className="p-8">
      <MasonryColumnLayout columns={3} gap="md">
        <MasonryColumnItem>
          <SampleCard title="Card 1" height="150px" />
        </MasonryColumnItem>
        <MasonryColumnItem>
          <SampleCard title="Card 2" height="250px" />
        </MasonryColumnItem>
        <MasonryColumnItem>
          <SampleCard title="Card 3" height="180px" />
        </MasonryColumnItem>
        <MasonryColumnItem>
          <SampleCard title="Card 4" height="220px" />
        </MasonryColumnItem>
        <MasonryColumnItem>
          <SampleCard title="Card 5" height="160px" />
        </MasonryColumnItem>
        <MasonryColumnItem>
          <SampleCard title="Card 6" height="200px" />
        </MasonryColumnItem>
      </MasonryColumnLayout>
    </div>
  ),
  name: "MasonryColumnLayout",
};

// With Custom Column Spans
export const CustomColumnSpans: Story = {
  render: () => (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <LayoutColumn span={1}>
          <SampleCard title="Span 1" height="200px" />
        </LayoutColumn>
        <LayoutColumn span={2}>
          <SampleCard title="Span 2" height="200px" />
        </LayoutColumn>
        <LayoutColumn span={1}>
          <SampleCard title="Span 1" height="200px" />
        </LayoutColumn>
      </div>
    </div>
  ),
  name: "Custom Column Spans",
};

// Dashboard Layout Example
export const DashboardLayout: Story = {
  render: () => (
    <div className="min-h-screen bg-muted/50">
      <header className="sticky top-0 z-50 h-16 bg-card border-b flex items-center px-6">
        <h1 className="font-bold text-lg">Dashboard</h1>
      </header>
      <div className="flex">
        <LayoutSidebar
          position="left"
          width="default"
          sticky
          stickyOffset="64px"
        >
          <div className="p-4">
            <SidebarContent />
          </div>
        </LayoutSidebar>
        <LayoutMain padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <SampleCard title="Metric 1" />
            <SampleCard title="Metric 2" />
            <SampleCard title="Metric 3" />
          </div>
          <MainContent />
        </LayoutMain>
      </div>
    </div>
  ),
  name: "Dashboard Layout Example",
};

// Blog Layout Example
export const BlogLayout: Story = {
  render: () => (
    <div className="p-8 max-w-6xl mx-auto">
      <ThreeColumnLayout
        mainContent={
          <article className="prose prose-lg max-w-none">
            <div className="p-6 bg-card rounded-lg border">
              <h1 className="text-3xl font-bold mb-4">Blog Post Title</h1>
              <p className="text-muted-foreground mb-6">
                Published on January 15, 2026 by Author Name
              </p>
              <div className="space-y-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </article>
        }
        rightSidebar={
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-3">Table of Contents</h3>
              <nav className="space-y-2 text-sm">
                <a
                  href="#introduction"
                  className="block text-primary hover:underline"
                >
                  Introduction
                </a>
                <a
                  href="#main-points"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Main Points
                </a>
                <a
                  href="#conclusion"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Conclusion
                </a>
              </nav>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-3">Related Posts</h3>
              <div className="space-y-2 text-sm">
                <a
                  href="#related-post-1"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Related Post 1
                </a>
                <a
                  href="#related-post-2"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Related Post 2
                </a>
              </div>
            </div>
          </div>
        }
        gap="xl"
      />
    </div>
  ),
  name: "Blog Layout Example",
};
