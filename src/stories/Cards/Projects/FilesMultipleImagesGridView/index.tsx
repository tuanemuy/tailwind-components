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
  metadata: { label: string; hidden?: boolean }[];
  href?: string;
  addButton?: ReactNode;
  actions?: ReactNode;
}

export interface FilesMultipleImagesGridViewProps {
  items: FolderItem[];
}

const defaultItems: FolderItem[] = [
  {
    id: "1",
    images: [
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop",
        label: "Resources",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop",
        label: "Pro Banner",
      },
      {
        src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=200&fit=crop",
        label: "Preline v2.0",
      },
      {
        src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=200&h=200&fit=crop",
        label: "Analytics Site (Outdated)",
      },
    ],
    title: "Analytics",
    metadata: [
      { label: "20 files" },
      { label: "Edited a minute ago", hidden: true },
    ],
    href: "#",
  },
  {
    id: "2",
    images: [
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop",
        label: "Resources",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=200&fit=crop",
        label: "Pro Banner",
      },
    ],
    title: "Dashboard",
    metadata: [
      { label: "3 files" },
      { label: "Edited 5 weeks ago", hidden: true },
    ],
    href: "#",
  },
];

export const FilesMultipleImagesGridView = ({
  items = defaultItems,
}: FilesMultipleImagesGridViewProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-5">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative p-2 lg:p-4 bg-card border border-border rounded-2xl"
        >
          {/* Image Group */}
          {item.addButton ? (
            <div className="flex gap-1 overflow-hidden rounded-xl">
              <div className="w-4/6">
                {item.images[0] && (
                  <a
                    className="group relative block h-[136px] sm:h-[208px] flex flex-col justify-center items-center p-4 bg-muted border border-border overflow-hidden rounded-s-xl after:absolute after:inset-0 hover:after:bg-foreground/70 after:duration-300 focus:outline-hidden focus:after:bg-foreground/70"
                    href={item.images[0].href || "#"}
                  >
                    <img
                      src={item.images[0].src}
                      alt={item.images[0].alt || "Project Image"}
                    />
                    {item.images[0].label && (
                      <small className="absolute bottom-2 start-2 end-2 z-10 text-xs text-white truncate opacity-0 group-hover:opacity-100 group-hover:duration-300 group-focus:opacity-100 group-focus:duration-300">
                        {item.images[0].label}
                      </small>
                    )}
                  </a>
                )}
              </div>
              <div className="w-2/6 space-y-1">
                {item.images[1] && (
                  <a
                    className="group relative block h-16.5 sm:h-25.5 flex flex-col justify-center items-center p-3 bg-muted border border-border overflow-hidden rounded-se-xl after:absolute after:inset-0 hover:after:bg-foreground/70 after:duration-300 focus:outline-hidden focus:after:bg-foreground/70"
                    href={item.images[1].href || "#"}
                  >
                    <img
                      src={item.images[1].src}
                      alt={item.images[1].alt || "Project Image"}
                    />
                    {item.images[1].label && (
                      <small className="absolute bottom-2 start-2 end-2 z-10 text-xs text-white truncate opacity-0 group-hover:opacity-100 group-hover:duration-300 group-focus:opacity-100 group-focus:duration-300">
                        {item.images[1].label}
                      </small>
                    )}
                  </a>
                )}
                <div className="h-16.5 sm:h-25.5 rounded-ee-xl overflow-hidden">
                  {item.addButton}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {item.images.slice(0, 4).map((image, imgIndex) => (
                <a
                  key={imgIndex}
                  className="group relative block h-16 sm:h-25 flex flex-col justify-center items-center p-4 bg-muted border border-border rounded-xl overflow-hidden after:absolute after:inset-0 hover:after:bg-foreground/70 after:duration-300 focus:outline-hidden focus:after:bg-foreground/70"
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
            </div>
          )}
          {/* End Image Group */}

          <div className="pt-2">
            <p className="truncate text-sm font-medium text-foreground">
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
                  className={`${meta.hidden ? "hidden sm:inline-block" : "inline-block"} relative pe-3 last:pe-0 first-of-type:before:hidden before:absolute before:top-1/2 before:-start-2 before:-translate-y-1/2 before:w-px before:h-3 before:bg-border before:rounded-full`}
                >
                  {meta.label}
                </li>
              ))}
            </ul>
          </div>

          {item.actions && (
            <div className="absolute top-3 end-3">{item.actions}</div>
          )}
        </div>
      ))}
    </div>
  );
};
