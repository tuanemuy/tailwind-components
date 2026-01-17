import type { Meta, StoryObj } from "@storybook/react";
import { ImportExportCard } from "./index";

const meta: Meta<typeof ImportExportCard> = {
  title: "Organisms/Cards/ImportExportCard",
  component: ImportExportCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ImportExportCard>;

export const Default: Story = {
  args: {
    mode: "both",
    selectedFormats: ["csv"],
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const ImportOnly: Story = {
  args: {
    mode: "import",
    title: "Import Data",
    description: "Upload your CSV, JSON, or Excel files",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const ExportOnly: Story = {
  args: {
    mode: "export",
    title: "Export Data",
    description: "Choose your preferred format",
    selectedFormats: ["csv", "json"],
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const Compact: Story = {
  args: {
    mode: "both",
    variant: "compact",
    title: "User Data",
    description: "Import or export user records",
  },
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

export const Split: Story = {
  args: {
    mode: "both",
    variant: "split",
    selectedFormats: ["csv"],
  },
  decorators: [
    (Story) => (
      <div className="w-[700px]">
        <Story />
      </div>
    ),
  ],
};

export const Exporting: Story = {
  args: {
    mode: "export",
    isExporting: true,
    exportProgress: 65,
    selectedFormats: ["csv", "xlsx"],
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const Importing: Story = {
  args: {
    mode: "import",
    isImporting: true,
    importProgress: 45,
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export const WithCustomFormats: Story = {
  args: {
    mode: "export",
    exportFormats: [
      {
        format: "csv",
        label: "CSV",
        description: "Standard CSV format",
        available: true,
      },
      {
        format: "json",
        label: "JSON",
        description: "For developers",
        available: true,
      },
      {
        format: "xlsx",
        label: "Excel",
        description: "Excel 2007+ format",
        available: true,
      },
      {
        format: "pdf",
        label: "PDF Report",
        description: "Formatted report",
        available: false,
      },
    ],
    selectedFormats: [],
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};
