import type { Meta, StoryObj } from "@storybook/react";
import { ProjectReports } from "./index";

const meta: Meta<typeof ProjectReports> = {
  title: "DataVisualization/Stats/ProjectReports",
  component: ProjectReports,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[900px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DevelopmentProject: Story = {
  args: {
    cards: [
      {
        label: "Sprint progress",
        value: "72%",
        details: [
          { label: "Completed:", value: "18 tasks" },
          { label: "In progress:", value: "5 tasks" },
          { label: "Remaining:", value: "2 tasks" },
        ],
      },
      {
        label: "Team velocity",
        value: "45 points",
        details: [
          { label: "Last sprint:", value: "42 points" },
          { label: "Average:", value: "40 points" },
        ],
      },
      {
        label: "Bug count",
        value: "12",
        details: [
          { label: "Critical:", value: "2" },
          { label: "High:", value: "4" },
          { label: "Medium:", value: "6" },
        ],
      },
      {
        label: "Code coverage",
        value: "78%",
        footerText: "Target: 80% coverage",
        actionButton: (
          <button
            type="button"
            className="text-[13px] text-primary hover:decoration-2 underline underline-offset-4 focus:outline-hidden focus:decoration-2"
          >
            View report
          </button>
        ),
      },
    ],
  },
};

export const MarketingCampaign: Story = {
  args: {
    cards: [
      {
        label: "Total reach",
        value: "1.2M",
        details: [
          { label: "Social:", value: "850K" },
          { label: "Email:", value: "350K" },
        ],
      },
      {
        label: "Engagement rate",
        value: "4.5%",
        details: [
          { label: "Likes:", value: "45K" },
          { label: "Shares:", value: "12K" },
          { label: "Comments:", value: "3.2K" },
        ],
      },
      {
        label: "Budget spent",
        value: "$25,000",
        details: [
          { label: "Ads:", value: "$18,000" },
          { label: "Content:", value: "$7,000" },
        ],
      },
      {
        label: "ROI",
        value: "320%",
        footerText: "Campaign ends in 5 days",
        actionButton: (
          <button
            type="button"
            className="text-[13px] text-primary hover:decoration-2 underline underline-offset-4 focus:outline-hidden focus:decoration-2"
          >
            Export data
          </button>
        ),
      },
    ],
  },
};

export const TwoCards: Story = {
  args: {
    cards: [
      {
        label: "Revenue",
        value: "$125,430",
        details: [
          { label: "This month:", value: "$45,200" },
          { label: "Last month:", value: "$40,115" },
          { label: "YTD:", value: "$125,430" },
        ],
      },
      {
        label: "Expenses",
        value: "$78,250",
        details: [
          { label: "Payroll:", value: "$52,000" },
          { label: "Operations:", value: "$18,250" },
          { label: "Marketing:", value: "$8,000" },
        ],
      },
    ],
  },
};

export const WithActions: Story = {
  args: {
    cards: [
      {
        label: "Pending invoices",
        value: "12",
        footerText: "Total value: $45,000",
        actionButton: (
          <button
            type="button"
            className="text-[13px] text-primary hover:decoration-2 underline underline-offset-4 focus:outline-hidden focus:decoration-2"
          >
            Send reminders
          </button>
        ),
      },
      {
        label: "Overdue payments",
        value: "3",
        footerText: "Oldest: 30 days overdue",
        actionButton: (
          <button
            type="button"
            className="text-[13px] text-destructive hover:decoration-2 underline underline-offset-4 focus:outline-hidden focus:decoration-2"
          >
            View all
          </button>
        ),
      },
      {
        label: "Upcoming renewals",
        value: "8",
        footerText: "Next 30 days",
        actionButton: (
          <button
            type="button"
            className="text-[13px] text-primary hover:decoration-2 underline underline-offset-4 focus:outline-hidden focus:decoration-2"
          >
            Schedule calls
          </button>
        ),
      },
      {
        label: "New leads",
        value: "24",
        footerText: "This week",
        actionButton: (
          <button
            type="button"
            className="text-[13px] text-primary hover:decoration-2 underline underline-offset-4 focus:outline-hidden focus:decoration-2"
          >
            Assign to team
          </button>
        ),
      },
    ],
  },
};
