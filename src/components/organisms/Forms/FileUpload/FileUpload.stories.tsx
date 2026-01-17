import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";
import { FileUpload, FileUploadPreview, type UploadFile } from "./index";

const meta: Meta<typeof FileUpload> = {
  title: "Organisms/Forms/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

// Helper to generate unique IDs
let fileIdCounter = 0;
const generateFileId = () => `file-${++fileIdCounter}`;

// Basic File Upload
export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);

    const handleChange = useCallback((newFiles: File[]) => {
      const uploadFiles: UploadFile[] = newFiles.map((file) => ({
        id: generateFileId(),
        file,
        status: "complete",
      }));
      setFiles((prev) => [...prev, ...uploadFiles]);
    }, []);

    const handleRemove = useCallback((file: UploadFile) => {
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    }, []);

    return (
      <FileUpload
        className="w-full max-w-md"
        files={files}
        onChange={handleChange}
        onRemove={handleRemove}
        hintText="SVG, PNG, JPG or GIF (max. 800x400px)"
      />
    );
  },
};

// Card Variant
export const CardVariant: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);

    const handleChange = useCallback((newFiles: File[]) => {
      const uploadFiles: UploadFile[] = newFiles.map((file) => ({
        id: generateFileId(),
        file,
        status: "complete",
      }));
      setFiles((prev) => [...prev, ...uploadFiles]);
    }, []);

    const handleRemove = useCallback((file: UploadFile) => {
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    }, []);

    return (
      <FileUpload
        variant="card"
        className="w-full max-w-lg"
        files={files}
        onChange={handleChange}
        onRemove={handleRemove}
        hintText="CSV, XLS, DOCX"
      />
    );
  },
};

// Compact Variant
export const CompactVariant: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);

    const handleChange = useCallback((newFiles: File[]) => {
      const uploadFiles: UploadFile[] = newFiles.map((file) => ({
        id: generateFileId(),
        file,
        status: "complete",
      }));
      setFiles((prev) => [...prev, ...uploadFiles]);
    }, []);

    const handleRemove = useCallback((file: UploadFile) => {
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    }, []);

    return (
      <FileUpload
        variant="compact"
        className="w-full max-w-md"
        files={files}
        onChange={handleChange}
        onRemove={handleRemove}
        hintText="Max 5MB per file"
      />
    );
  },
};

// Image Upload Variant
export const ImageVariant: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);

    const handleChange = useCallback((newFiles: File[]) => {
      const file = newFiles[0];
      if (file) {
        const preview = URL.createObjectURL(file);
        const uploadFile: UploadFile = {
          id: generateFileId(),
          file,
          status: "complete",
          preview,
        };
        setFiles([uploadFile]);
      }
    }, []);

    const handleRemove = useCallback((file: UploadFile) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
      setFiles([]);
    }, []);

    return (
      <FileUpload
        variant="image"
        className="w-full max-w-md"
        files={files}
        multiple={false}
        accept="image/*"
        onChange={handleChange}
        onRemove={handleRemove}
        hintText="PNG, JPG up to 5MB"
      />
    );
  },
};

// With Upload Progress
export const WithProgress: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([
      {
        id: "1",
        file: new File([""], "document.pdf", { type: "application/pdf" }),
        status: "complete",
      },
      {
        id: "2",
        file: new File([""], "spreadsheet.xlsx", {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        status: "uploading",
        progress: 65,
      },
      {
        id: "3",
        file: new File([""], "presentation.pptx", {
          type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        }),
        status: "pending",
        progress: 0,
      },
    ]);

    const handleRemove = useCallback((file: UploadFile) => {
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    }, []);

    return (
      <FileUpload
        variant="card"
        className="w-full max-w-lg"
        files={files}
        onChange={() => {}}
        onRemove={handleRemove}
        hintText="Documents only"
      />
    );
  },
};

// With Error State
export const WithError: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([
      {
        id: "1",
        file: new File([""], "valid-file.pdf", { type: "application/pdf" }),
        status: "complete",
      },
      {
        id: "2",
        file: new File([""], "failed-file.docx", {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }),
        status: "error",
        error: "Upload failed",
      },
    ]);

    const handleRemove = useCallback((file: UploadFile) => {
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    }, []);

    return (
      <FileUpload
        variant="card"
        className="w-full max-w-lg"
        files={files}
        onChange={() => {}}
        onRemove={handleRemove}
        error="One or more files failed to upload"
      />
    );
  },
};

// With Max Files Limit
export const WithMaxFiles: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);

    const handleChange = useCallback((newFiles: File[]) => {
      const uploadFiles: UploadFile[] = newFiles.map((file) => ({
        id: generateFileId(),
        file,
        status: "complete",
      }));
      setFiles((prev) => [...prev, ...uploadFiles]);
    }, []);

    const handleRemove = useCallback((file: UploadFile) => {
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    }, []);

    return (
      <FileUpload
        className="w-full max-w-md"
        files={files}
        maxFiles={3}
        onChange={handleChange}
        onRemove={handleRemove}
        hintText="Maximum 3 files"
      />
    );
  },
};

// With Max Size Limit
export const WithMaxSize: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);

    const handleChange = useCallback((newFiles: File[]) => {
      const uploadFiles: UploadFile[] = newFiles.map((file) => ({
        id: generateFileId(),
        file,
        status: "complete",
      }));
      setFiles((prev) => [...prev, ...uploadFiles]);
    }, []);

    const handleRemove = useCallback((file: UploadFile) => {
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    }, []);

    return (
      <FileUpload
        className="w-full max-w-md"
        files={files}
        maxSize={5 * 1024 * 1024} // 5MB
        onChange={handleChange}
        onRemove={handleRemove}
        hintText="Max file size: 5MB"
      />
    );
  },
};

// Disabled State
export const Disabled: Story = {
  render: () => (
    <FileUpload
      className="w-full max-w-md"
      disabled
      files={[]}
      onChange={() => {}}
      hintText="Upload is currently disabled"
    />
  ),
};

// Image Grid Preview
export const ImageGridPreview: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([
      {
        id: "1",
        file: new File([""], "image1.jpg", { type: "image/jpeg" }),
        status: "complete",
        preview:
          "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=200&fit=crop",
      },
      {
        id: "2",
        file: new File([""], "image2.jpg", { type: "image/jpeg" }),
        status: "complete",
        preview:
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop",
      },
      {
        id: "3",
        file: new File([""], "image3.jpg", { type: "image/jpeg" }),
        status: "uploading",
        progress: 45,
        preview:
          "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=200&h=200&fit=crop",
      },
      {
        id: "4",
        file: new File([""], "image4.jpg", { type: "image/jpeg" }),
        status: "error",
        preview:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=200&fit=crop",
      },
    ]);

    const handleChange = useCallback((newFiles: File[]) => {
      const uploadFiles: UploadFile[] = newFiles.map((file) => ({
        id: generateFileId(),
        file,
        status: "complete",
        preview: URL.createObjectURL(file),
      }));
      setFiles((prev) => [...prev, ...uploadFiles]);
    }, []);

    const handleRemove = useCallback((file: UploadFile) => {
      if (file.preview?.startsWith("blob:")) {
        URL.revokeObjectURL(file.preview);
      }
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    }, []);

    return (
      <div className="w-full max-w-lg space-y-4">
        <FileUpload
          files={[]}
          accept="image/*"
          onChange={handleChange}
          showFileList={false}
          hintText="Add more images"
        />
        <FileUploadPreview files={files} onRemove={handleRemove} />
      </div>
    );
  },
};

// Single File Upload
export const SingleFile: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);

    const handleChange = useCallback((newFiles: File[]) => {
      const file = newFiles[0];
      if (file) {
        const uploadFile: UploadFile = {
          id: generateFileId(),
          file,
          status: "complete",
        };
        setFiles([uploadFile]);
      }
    }, []);

    const handleRemove = useCallback(() => {
      setFiles([]);
    }, []);

    return (
      <FileUpload
        className="w-full max-w-md"
        files={files}
        multiple={false}
        onChange={handleChange}
        onRemove={handleRemove}
        dropzoneText="Drop your file here or"
        hintText="Only one file at a time"
      />
    );
  },
};

// Accept Specific Types
export const AcceptSpecificTypes: Story = {
  render: () => {
    const [files, setFiles] = useState<UploadFile[]>([]);

    const handleChange = useCallback((newFiles: File[]) => {
      const uploadFiles: UploadFile[] = newFiles.map((file) => ({
        id: generateFileId(),
        file,
        status: "complete",
      }));
      setFiles((prev) => [...prev, ...uploadFiles]);
    }, []);

    const handleRemove = useCallback((file: UploadFile) => {
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    }, []);

    return (
      <FileUpload
        className="w-full max-w-md"
        files={files}
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        onRemove={handleRemove}
        hintText="PDF and Word documents only"
      />
    );
  },
};
