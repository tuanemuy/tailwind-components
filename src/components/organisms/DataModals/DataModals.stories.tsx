import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { ExportModal, ImportModal } from "./index";

const meta: Meta = {
  title: "Organisms/Overlays/DataModals",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

// Export Modal Stories
export const Export: StoryObj<typeof ExportModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const columns = [
      { id: "id", label: "ID", required: true },
      { id: "name", label: "Name", required: true },
      { id: "email", label: "Email" },
      { id: "phone", label: "Phone" },
      { id: "address", label: "Address" },
      { id: "createdAt", label: "Created At" },
      { id: "status", label: "Status" },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Export Data</Button>
        <ExportModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onExport={(data) => {
            console.log("Export:", data);
            setIsOpen(false);
          }}
          columns={columns}
        />
      </>
    );
  },
};

export const ExportWithProgress: StoryObj<typeof ExportModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleExport = () => {
      setLoading(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false);
            setIsOpen(false);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Export with Progress</Button>
        <ExportModal
          isOpen={isOpen}
          onClose={() => {
            if (!loading) setIsOpen(false);
          }}
          onExport={handleExport}
          loading={loading}
          progress={loading ? progress : undefined}
          columns={[
            { id: "id", label: "ID", required: true },
            { id: "name", label: "Name" },
            { id: "email", label: "Email" },
          ]}
        />
      </>
    );
  },
};

export const ExportAllFormats: StoryObj<typeof ExportModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Export (All Formats)</Button>
        <ExportModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onExport={(data) => {
            console.log("Export:", data);
            setIsOpen(false);
          }}
          formats={["csv", "xlsx", "json", "pdf"]}
          showDateRange
        />
      </>
    );
  },
};

// Import Modal Stories
export const Import: StoryObj<typeof ImportModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Import Data</Button>
        <ImportModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onImport={(file) => {
            console.log("Import file:", file);
          }}
        />
      </>
    );
  },
};

export const ImportWithTemplate: StoryObj<typeof ImportModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Import with Template</Button>
        <ImportModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onImport={(file) => {
            console.log("Import file:", file);
          }}
          templateUrl="/templates/import-template.csv"
          subtitle="Upload a CSV or Excel file to import your data"
        />
      </>
    );
  },
};

export const ImportWithProgress: StoryObj<typeof ImportModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleImport = () => {
      setLoading(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Import with Progress</Button>
        <ImportModal
          isOpen={isOpen}
          onClose={() => {
            if (!loading) setIsOpen(false);
          }}
          onImport={handleImport}
          loading={loading}
          progress={loading ? progress : undefined}
        />
      </>
    );
  },
};

export const ImportWithResult: StoryObj<typeof ImportModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Import Result</Button>
        <ImportModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onImport={(file) => {
            console.log("Import file:", file);
          }}
          result={{
            success: 245,
            failed: 3,
            errors: [
              { row: 12, message: "Invalid email format" },
              { row: 45, message: "Required field 'name' is missing" },
              { row: 156, message: "Duplicate entry" },
            ],
          }}
        />
      </>
    );
  },
};

export const ImportSuccess: StoryObj<typeof ImportModal> = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Import Success</Button>
        <ImportModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onImport={(file) => {
            console.log("Import file:", file);
          }}
          result={{
            success: 500,
            failed: 0,
            errors: [],
          }}
        />
      </>
    );
  },
};
