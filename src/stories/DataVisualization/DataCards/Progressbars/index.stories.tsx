import type { Meta, StoryObj } from "@storybook/react";
import { Progressbars } from "./index";

const meta: Meta<typeof Progressbars> = {
  title: "DataCards/Progressbars",
  component: Progressbars,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomTitle: Story = {
  args: {
    title: "Traffic Sources",
    footerLinkText: "View all sources",
  },
};

export const CustomItems: Story = {
  args: {
    title: "Browser Usage",
    items: [
      { label: "Chrome", value: 85, displayValue: "85%" },
      { label: "Safari", value: 60, displayValue: "60%" },
      { label: "Firefox", value: 35, displayValue: "35%" },
      { label: "Edge", value: 20, displayValue: "20%" },
      { label: "Others", value: 5, displayValue: "5%" },
    ],
    footerLinkText: "View browser details",
  },
};

export const CustomProgressBarColor: Story = {
  args: {
    title: "Sales by Region",
    progressBarColor: "bg-chart-1",
    items: [
      { label: "North America", value: 90, displayValue: "45%" },
      { label: "Europe", value: 70, displayValue: "35%" },
      { label: "Asia Pacific", value: 40, displayValue: "20%" },
    ],
  },
};

export const NoHeaderActions: Story = {
  args: {
    title: "Simple Progress",
    headerActions: null,
    items: [
      { label: "Completed", value: 75, displayValue: "75%" },
      { label: "In Progress", value: 20, displayValue: "20%" },
      { label: "Pending", value: 5, displayValue: "5%" },
    ],
  },
};
