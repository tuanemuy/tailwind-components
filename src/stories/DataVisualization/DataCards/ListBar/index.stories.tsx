import type { Meta, StoryObj } from "@storybook/react";
import { ListBar } from "./index";

const meta: Meta<typeof ListBar> = {
  title: "DataCards/ListBar",
  component: ListBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[600px]">
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
    title: "Page Views",
    rowLabel: "Page",
  },
};

export const CustomColumns: Story = {
  args: {
    title: "Traffic Sources",
    rowLabel: "Source",
    columns: [{ label: "Visits" }, { label: "Sessions" }],
    items: [
      { label: "Direct", values: ["12.5k", "45.2k"], barWidth: 100 },
      { label: "Organic Search", values: ["8.2k", "32.1k"], barWidth: 70 },
      { label: "Social Media", values: ["5.1k", "18.9k"], barWidth: 45 },
      { label: "Referral", values: ["3.2k", "12.4k"], barWidth: 30 },
      { label: "Email", values: ["1.8k", "6.7k"], barWidth: 18 },
    ],
  },
};

export const FewItems: Story = {
  args: {
    items: [
      {
        label: "preline.co",
        values: ["39,8k", "329,3k", "19,8k"],
        barWidth: 100,
      },
      {
        label: "preline.co/examples",
        values: ["27k", "56,2k", "48,2k"],
        barWidth: 65,
      },
      {
        label: "preline.co/plugins",
        values: ["77,8k", "13.0k", "5.5k"],
        barWidth: 40,
      },
    ],
  },
};

export const CustomFooter: Story = {
  args: {
    footerLinkText: "See all pages",
    footerLinkUrl: "/pages",
  },
};

export const NoButtons: Story = {
  args: {
    downloadButton: null,
    moreButton: null,
  },
};
