import type { ReactNode } from "react";

export interface FileItem {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  metadata: { label: string; hidden?: boolean }[];
  href?: string;
  actions?: ReactNode;
}

export interface FilesGridViewProps {
  items: FileItem[];
}

const defaultItems: FileItem[] = [
  {
    id: "1",
    imageSrc:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    imageAlt: "Analytics Image",
    title: "Analytics",
    metadata: [
      { label: "Edited a minute ago" },
      { label: "15kb", hidden: true },
    ],
    href: "#",
  },
  {
    id: "2",
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    imageAlt: "User Profile Image",
    title: "User Profile",
    metadata: [
      { label: "Edited 1 hour ago" },
      { label: "412kb", hidden: true },
    ],
    href: "#",
  },
  {
    id: "3",
    imageSrc:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    imageAlt: "Payment Image",
    title: "Payment",
    metadata: [{ label: "Edited 1 day ago" }, { label: "2mb", hidden: true }],
    href: "#",
  },
  {
    id: "4",
    imageSrc:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop",
    imageAlt: "Workspace Image",
    title: "Workspace",
    metadata: [{ label: "Edited 1 week ago" }, { label: "20kb", hidden: true }],
    href: "#",
  },
];

export const FilesGridView = ({ items = defaultItems }: FilesGridViewProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 xl:gap-3">
      {items.map((item) => (
        <div key={item.id} className="relative rounded-xl hover:bg-muted">
          <a
            className="p-2 block rounded-xl focus:outline-hidden focus:bg-muted"
            href={item.href || "#"}
          >
            <div className="py-8 px-4 bg-muted border border-border rounded-lg">
              <img src={item.imageSrc} alt={item.imageAlt} />
            </div>
            <div className="pt-2">
              <p className="truncate text-sm font-medium text-foreground">
                {item.title}
              </p>
              <ul className="mt-1 text-xs text-muted-foreground">
                {item.metadata.map((meta, idx) => (
                  <li
                    key={idx}
                    className={`${meta.hidden ? "hidden sm:inline-block" : "inline-block"} relative pe-3 last:pe-0 first-of-type:before:hidden before:absolute before:top-1/2 before:-start-2 before:-translate-y-1/2 before:w-px before:h-3 before:bg-border before:rounded-full`}
                  >
                    {meta.label}
                  </li>
                ))}
              </ul>
            </div>
          </a>

          {item.actions && (
            <div className="absolute top-3 end-3">{item.actions}</div>
          )}
        </div>
      ))}
    </div>
  );
};
