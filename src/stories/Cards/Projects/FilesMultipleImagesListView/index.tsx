import type { ReactNode } from "react";

export interface ImageItem {
  src: string;
  alt?: string;
  label?: string;
  href?: string;
}

export interface FolderItem {
  id: string;
  images: ImageItem[];
  title: string;
  metadata: string[];
  href?: string;
  addButton?: ReactNode;
  actions?: ReactNode;
}

export interface FilesMultipleImagesListViewProps {
  items: FolderItem[];
}

const defaultItems: FolderItem[] = [
  {
    id: "1",
    images: [
      { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop", label: "Resources" },
      { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop", label: "Pro Banner" },
      { src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop", label: "Preline v2.0" },
    ],
    title: "Analytics",
    metadata: ["Edited a minute ago", "20"],
    href: "#",
  },
  {
    id: "2",
    images: [
      { src: "https://images.unsplash.com/photo-1635776062360-af423602aff3?w=200&h=200&fit=crop", label: "E-commerce demo layout" },
      { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop", label: "Dashboard" },
    ],
    title: "Dashboard",
    metadata: ["Edited 5 weeks ago", "3"],
    href: "#",
  },
];

export const FilesMultipleImagesListView = ({
  items = defaultItems,
}: FilesMultipleImagesListViewProps) => {
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="relative group p-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 bg-card border border-border -mt-px first:mt-0 first:rounded-t-xl last:rounded-b-xl"
        >
          <div className="grid grid-cols-3 gap-1">
            {item.images.slice(0, item.addButton ? 2 : 3).map((image, imgIndex) => (
              <a
                key={imgIndex}
                className="group relative block sm:w-20 h-24 sm:h-16 flex flex-col justify-center items-center p-3 bg-muted border border-border first:rounded-s-lg last:rounded-e-lg overflow-hidden after:absolute after:inset-0 hover:after:bg-foreground/70 after:duration-300 focus:outline-hidden focus:after:bg-foreground/70"
                href={image.href || "#"}
              >
                <img src={image.src} alt={image.alt || "Project Image"} />
                {image.label && (
                  <small className="absolute bottom-2 start-2 end-2 z-10 text-xs text-white truncate opacity-0 group-hover:opacity-100 group-hover:duration-300 group-focus:opacity-100 group-focus:duration-300">
                    {image.label}
                  </small>
                )}
              </a>
            ))}
            {item.addButton && (
              <div className="sm:w-20 h-24 sm:h-16 first:rounded-s-lg last:rounded-e-lg overflow-hidden">
                {item.addButton}
              </div>
            )}
          </div>

          <div className="grow">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  <a
                    className="hover:text-primary focus:outline-hidden focus:text-primary"
                    href={item.href || "#"}
                  >
                    {item.title}
                  </a>
                </p>
                <ul className="mt-1 text-xs text-muted-foreground">
                  {item.metadata.map((meta, idx) => (
                    <li
                      key={idx}
                      className="inline-block relative pe-3 last:pe-0 first-of-type:before:hidden before:absolute before:top-1/2 before:-start-2 before:-translate-y-1/2 before:w-px before:h-3 before:bg-border before:rounded-full"
                    >
                      {meta}
                    </li>
                  ))}
                </ul>
              </div>

              {item.actions && <div>{item.actions}</div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
