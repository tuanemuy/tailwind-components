import type { ReactNode } from "react";

export interface InfoItem {
  label: string;
  value: string;
}

export interface UserCardItem {
  id: string;
  name: string;
  avatarSrc: string;
  heroBackground: ReactNode;
  badge?: {
    label: string;
    className?: string;
  };
  info: InfoItem[];
  tags: string[];
  additionalTags?: string[];
  favoriteButton?: ReactNode;
  actions?: ReactNode;
}

export interface UserCardWithHeroBackgroundProps {
  items: UserCardItem[];
}

const DefaultHeroBackground = () => (
  <svg
    className="w-full h-24 rounded-t-xl"
    preserveAspectRatio="xMidYMid slice"
    width="576"
    height="120"
    viewBox="0 0 576 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_hero)">
      <rect width="576" height="120" fill="#B2E7FE" />
      <rect
        x="289.678"
        y="-90.3"
        width="102.634"
        height="391.586"
        transform="rotate(59.5798 289.678 -90.3)"
        fill="#FF8F5D"
      />
      <rect
        x="41.3926"
        y="-0.996094"
        width="102.634"
        height="209.864"
        transform="rotate(-31.6412 41.3926 -0.996094)"
        fill="#3ECEED"
      />
      <rect
        x="66.9512"
        y="40.4817"
        width="102.634"
        height="104.844"
        transform="rotate(-31.6412 66.9512 40.4817)"
        fill="#4C48FF"
      />
    </g>
    <defs>
      <clipPath id="clip0_hero">
        <rect width="576" height="120" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const defaultItems: UserCardItem[] = [
  {
    id: "1",
    name: "Amanda Harvey",
    avatarSrc:
      "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=320&h=320&fit=facearea&facepad=3",
    heroBackground: <DefaultHeroBackground />,
    badge: {
      label: "Pro",
      className: "bg-gradient-to-tr from-lime-500 to-teal-500",
    },
    info: [
      { label: "Role", value: "Front-End Developer" },
      { label: "Phone", value: "(892) 312-5483" },
      { label: "Email", value: "amanda@email.com" },
      { label: "Hourly price", value: "$35-$55" },
    ],
    tags: ["Designer", "Front-End", "Brand Designer", "Tool"],
    additionalTags: ["UI/UX", "Figma"],
  },
  {
    id: "2",
    name: "James Collins",
    avatarSrc:
      "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?w=320&h=320&fit=facearea&facepad=3",
    heroBackground: <DefaultHeroBackground />,
    info: [
      { label: "Role", value: "Back-End Developer" },
      { label: "Phone", value: "(555) 123-4567" },
      { label: "Email", value: "james@email.com" },
      { label: "Hourly price", value: "$45-$65" },
    ],
    tags: ["Developer", "Backend", "API"],
  },
];

export const UserCardWithHeroBackground = ({
  items = defaultItems,
}: UserCardWithHeroBackgroundProps) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col bg-card border border-border rounded-xl"
        >
          <figure className="shrink-0 relative h-24 overflow-hidden rounded-t-xl">
            {item.heroBackground}
          </figure>

          {/* Avatar */}
          <div className="-mt-8 px-4 mb-3">
            <div className="relative flex items-center gap-x-3">
              <div className="relative w-20">
                <img
                  className="shrink-0 size-20 ring-4 ring-card rounded-3xl"
                  src={item.avatarSrc}
                  alt={item.name}
                />
                {item.badge && (
                  <div className="absolute -bottom-3 inset-x-0 text-center">
                    <span
                      className={`py-1 px-2 inline-flex items-center gap-x-1 text-xs font-semibold uppercase rounded-md ${item.badge.className || "bg-primary"} text-white`}
                    >
                      {item.badge.label}
                    </span>
                  </div>
                )}
              </div>

              <div className="absolute bottom-2 end-0">
                {/* Button Group */}
                <div className="h-full flex justify-end items-end gap-x-2">
                  {item.favoriteButton}
                  {item.actions}
                </div>
                {/* End Button Group */}
              </div>
            </div>
          </div>
          {/* End Avatar */}

          {/* Body */}
          <div className="p-4 h-full">
            <h2 className="mb-2 font-medium text-foreground">{item.name}</h2>

            {/* Info List */}
            <dl className="grid grid-cols-2 gap-x-2">
              {item.info.map((infoItem, idx) => (
                <div key={idx} className="contents">
                  <dt className="py-1 text-sm text-muted-foreground">
                    {infoItem.label}:
                  </dt>
                  <dd className="py-1 inline-flex justify-end items-center gap-x-2 text-end font-medium text-sm text-foreground">
                    {infoItem.value}
                  </dd>
                </div>
              ))}
            </dl>
            {/* End Info List */}

            {/* Tags Group */}
            <div className="mt-3 flex flex-wrap gap-1">
              {item.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="py-1 px-2.5 inline-flex items-center gap-x-1 text-xs rounded-md bg-card border border-border text-foreground"
                >
                  {tag}
                </span>
              ))}
              {item.additionalTags && item.additionalTags.length > 0 && (
                <div className="hs-dropdown inline-block">
                  <button
                    type="button"
                    className="py-1 px-2.5 inline-flex items-center gap-x-1 text-xs rounded-md bg-card border border-border text-foreground cursor-pointer"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="More tags"
                  >
                    +{item.additionalTags.length}
                  </button>
                  <div
                    className="hs-dropdown-menu hs-dropdown-open:opacity-100 max-w-64 transition-[opacity,margin] duration opacity-0 hidden overflow-hidden z-10 p-2 bg-muted border border-border rounded-lg"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    {item.additionalTags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="py-1 px-2.5 inline-flex items-center gap-x-1 text-xs rounded-md bg-card border border-border text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* End Tags Group */}
          </div>
          {/* End Body */}
        </div>
      ))}
    </div>
  );
};
