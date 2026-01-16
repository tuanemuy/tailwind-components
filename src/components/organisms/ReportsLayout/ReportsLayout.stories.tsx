import type { Meta, StoryObj } from "@storybook/react";
import { ClockIcon, MailIcon, TicketIcon, UsersIcon } from "@/lib/icons";
import {
  QuickStatsCard,
  type ReportChartData,
  type ReportMetric,
  ReportsLayout,
  type TeamMember,
} from "./index";

const meta: Meta<typeof ReportsLayout> = {
  title: "Organisms/InboxChatMessages/ReportsLayout",
  component: ReportsLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ReportsLayout>;

const sampleMetrics: ReportMetric[] = [
  {
    id: "1",
    name: "Total Conversations",
    value: "2,847",
    change: 12.5,
    changeType: "increase",
    icon: <MailIcon className="size-4" />,
  },
  {
    id: "2",
    name: "Active Users",
    value: "1,234",
    change: 8.2,
    changeType: "increase",
    icon: <UsersIcon className="size-4" />,
  },
  {
    id: "3",
    name: "Tickets Resolved",
    value: "456",
    change: -3.1,
    changeType: "decrease",
    icon: <TicketIcon className="size-4" />,
  },
  {
    id: "4",
    name: "Avg. Response Time",
    value: "2.4",
    unit: "min",
    change: 15.3,
    changeType: "increase",
    icon: <ClockIcon className="size-4" />,
  },
];

const sampleCharts: ReportChartData[] = [
  {
    id: "1",
    title: "Conversations by Channel",
    type: "bar",
    data: [
      { label: "Email", value: 450, color: "#6366f1" },
      { label: "Chat", value: 380, color: "#22c55e" },
      { label: "Phone", value: 120, color: "#f59e0b" },
      { label: "Social", value: 95, color: "#ec4899" },
    ],
  },
  {
    id: "2",
    title: "Ticket Status Distribution",
    type: "donut",
    data: [
      { label: "Open", value: 45, color: "#ef4444" },
      { label: "In Progress", value: 32, color: "#f59e0b" },
      { label: "Resolved", value: 89, color: "#22c55e" },
      { label: "Closed", value: 156, color: "#6b7280" },
    ],
  },
  {
    id: "3",
    title: "Response Time Trend",
    type: "line",
    data: [
      { label: "Mon", value: 2.1 },
      { label: "Tue", value: 2.4 },
      { label: "Wed", value: 1.9 },
      { label: "Thu", value: 2.8 },
      { label: "Fri", value: 2.2 },
      { label: "Sat", value: 1.5 },
      { label: "Sun", value: 1.8 },
    ],
  },
  {
    id: "4",
    title: "Customer Satisfaction",
    type: "bar",
    data: [
      { label: "Excellent", value: 156, color: "#22c55e" },
      { label: "Good", value: 89, color: "#84cc16" },
      { label: "Average", value: 45, color: "#f59e0b" },
      { label: "Poor", value: 12, color: "#ef4444" },
    ],
  },
];

const sampleTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
    role: "Support Lead",
    metrics: {
      resolved: 156,
      responseTime: "1.8 min",
      satisfaction: 98,
    },
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.c@company.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop",
    role: "Senior Agent",
    metrics: {
      resolved: 124,
      responseTime: "2.1 min",
      satisfaction: 95,
    },
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.d@company.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop",
    role: "Support Agent",
    metrics: {
      resolved: 89,
      responseTime: "2.5 min",
      satisfaction: 92,
    },
  },
  {
    id: "4",
    name: "Alex Thompson",
    email: "alex.t@company.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop",
    role: "Support Agent",
    metrics: {
      resolved: 67,
      responseTime: "3.2 min",
      satisfaction: 88,
    },
  },
];

export const Default: Story = {
  render: () => (
    <div className="h-[700px]">
      <ReportsLayout
        title="Overview"
        metrics={sampleMetrics}
        charts={sampleCharts}
        dateRange="Last 30 days"
        lastUpdated="10 minutes ago"
        onCategoryChange={(id) => console.log("Category:", id)}
        onDateRangeChange={(range) => console.log("Date range:", range)}
        onRefresh={() => console.log("Refresh")}
        onExport={() => console.log("Export")}
      />
    </div>
  ),
};

export const TeamView: Story = {
  render: () => (
    <div className="h-[700px]">
      <ReportsLayout
        title="Team Performance"
        metrics={sampleMetrics}
        teamMembers={sampleTeamMembers}
        activeCategory="team"
        dateRange="Last 30 days"
        lastUpdated="10 minutes ago"
        onCategoryChange={(id) => console.log("Category:", id)}
        onRefresh={() => console.log("Refresh")}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="h-[700px]">
      <ReportsLayout
        title="Overview"
        metrics={sampleMetrics}
        charts={sampleCharts}
        dateRange="Last 30 days"
        isLoading={true}
        onCategoryChange={(id) => console.log("Category:", id)}
        onRefresh={() => console.log("Refresh")}
      />
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div className="h-[700px]">
      <ReportsLayout
        title="Overview"
        metrics={[]}
        charts={[]}
        dateRange="Last 30 days"
        onCategoryChange={(id) => console.log("Category:", id)}
        onRefresh={() => console.log("Refresh")}
      />
    </div>
  ),
};

export const QuickStatsCardExample: Story = {
  render: () => (
    <div className="p-6 space-y-4">
      <QuickStatsCard
        title="Conversation Summary"
        stats={[
          { label: "Total", value: "2,847" },
          { label: "Open", value: 156, color: "#ef4444" },
          { label: "Closed", value: 2691, color: "#22c55e" },
        ]}
        className="w-80"
      />
      <QuickStatsCard
        title="Response Metrics"
        stats={[
          { label: "Avg. Response", value: "2.4 min" },
          { label: "First Response", value: "1.2 min" },
          { label: "Resolution Time", value: "4.5 hrs" },
        ]}
        className="w-80"
      />
    </div>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <div className="h-[700px]">
      <ReportsLayout
        title="Custom Dashboard"
        dateRange="Last 7 days"
        onCategoryChange={(id) => console.log("Category:", id)}
        onRefresh={() => console.log("Refresh")}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickStatsCard
            title="Today's Highlights"
            stats={[
              { label: "New Conversations", value: 45 },
              { label: "Resolved", value: 38 },
              { label: "Pending", value: 7 },
            ]}
          />
          <QuickStatsCard
            title="Agent Activity"
            stats={[
              { label: "Online Agents", value: 8 },
              { label: "Busy", value: 5 },
              { label: "Away", value: 2 },
            ]}
          />
          <QuickStatsCard
            title="Queue Status"
            stats={[
              { label: "Waiting", value: 12 },
              { label: "Avg. Wait Time", value: "3.5 min" },
              { label: "Longest Wait", value: "8.2 min" },
            ]}
          />
        </div>
      </ReportsLayout>
    </div>
  ),
};
