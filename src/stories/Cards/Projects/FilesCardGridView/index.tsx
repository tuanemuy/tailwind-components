import type { ReactNode } from "react";

export type FileType =
  | "image"
  | "text"
  | "html"
  | "document"
  | "spreadsheet"
  | "presentation";

export interface FileCardItem {
  id: string;
  type: FileType;
  imageSrc?: string;
  fileName: string;
  metadata: string;
  icon?: ReactNode;
  actions?: ReactNode;
}

export interface FilesCardGridViewProps {
  items: FileCardItem[];
}

const DefaultImageIcon = () => (
  <svg
    className="shrink-0 size-3.5 sm:size-5"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

const DefaultTextIcon = () => (
  <svg
    className="shrink-0 size-12 text-muted-foreground"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="21" x2="3" y1="6" y2="6" />
    <line x1="15" x2="3" y1="12" y2="12" />
    <line x1="17" x2="3" y1="18" y2="18" />
  </svg>
);

const DefaultHtmlIcon = () => (
  <svg
    className="shrink-0 size-3.5 sm:size-5"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="m5 12-3 3 3 3" />
    <path d="m9 18 3-3-3-3" />
  </svg>
);

const DefaultDocumentIcon = () => (
  <svg
    className="shrink-0 size-3.5 sm:size-5"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

const defaultRenderIcon = (type: FileType): ReactNode => {
  switch (type) {
    case "image":
      return <DefaultImageIcon />;
    case "text":
      return <DefaultTextIcon />;
    case "html":
      return <DefaultHtmlIcon />;
    case "document":
    default:
      return <DefaultDocumentIcon />;
  }
};

const defaultItems: FileCardItem[] = [
  {
    id: "1",
    type: "image",
    imageSrc:
      "https://images.unsplash.com/photo-1635776062360-af423602aff3?w=560&h=320&fit=crop",
    fileName: "cover_image.jpg",
    metadata: "James, Feb 25th, 2023",
  },
  {
    id: "2",
    type: "text",
    fileName: "meeting_notes.txt",
    metadata: "Amanda, Feb 20th, 2023",
  },
  {
    id: "3",
    type: "html",
    fileName: "project_notes.html",
    metadata: "James, Feb 6th, 2023",
  },
  {
    id: "4",
    type: "document",
    fileName: "requirements.docx",
    metadata: "Sarah, Jan 15th, 2023",
  },
];

export const FilesCardGridView = ({
  items = defaultItems,
}: FilesCardGridViewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col bg-card border border-border rounded-xl"
        >
          <div className="relative group">
            {item.type === "image" && item.imageSrc ? (
              <img
                className="w-full h-36 sm:h-42 object-cover rounded-t-xl"
                src={item.imageSrc}
                alt={item.fileName}
              />
            ) : (
              <div className="h-36 sm:h-42 flex flex-col justify-center items-center">
                {item.type === "text" ? (
                  item.icon || defaultRenderIcon("text")
                ) : (
                  <span className="flex shrink-0 justify-center items-center size-12 text-muted-foreground">
                    {item.icon || defaultRenderIcon(item.type)}
                  </span>
                )}
              </div>
            )}

            {item.actions && (
              <div className="absolute top-3 end-3 group-hover:opacity-100 lg:opacity-0">
                {item.actions}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-3 flex items-center gap-x-3">
            <span className="flex shrink-0 justify-center items-center size-7 sm:w-9.5 sm:h-9.5 bg-card border border-border text-muted-foreground rounded-lg">
              {item.icon || defaultRenderIcon(item.type)}
            </span>

            <div className="grow truncate">
              <p className="block truncate text-sm font-semibold text-foreground">
                {item.fileName}
              </p>
              <p className="block truncate text-xs text-muted-foreground">
                {item.metadata}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
