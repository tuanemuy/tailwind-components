import type { ReactNode } from "react";

export interface StatItem {
  value: string;
  label: string;
}

export interface DetailItem {
  label: string;
  value: string | ReactNode;
}

export interface ProjectItem {
  id: string;
  logo: ReactNode;
  companyName: string;
  projectTitle: string;
  stats: StatItem[];
  details: DetailItem[];
  category: {
    name: string;
    color?: string;
  };
  actions?: ReactNode;
}

export interface ProjectsProps {
  items: ProjectItem[];
}

const SlackIcon = () => (
  <svg
    className="shrink-0 size-6 text-muted-foreground"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.7326 0C9.96372 0.00130479 8.53211 1.43397 8.53342 3.19935C8.53211 4.96473 9.96503 6.39739 11.7339 6.39869H14.9345V3.20065C14.9358 1.43527 13.5029 0.00260958 11.7326 0C11.7339 0 11.7339 0 11.7326 0M11.7326 8.53333H3.20053C1.43161 8.53464 -0.00130383 9.9673 3.57297e-06 11.7327C-0.00261123 13.4981 1.4303 14.9307 3.19922 14.9333H11.7326C13.5016 14.932 14.9345 13.4994 14.9332 11.734C14.9345 9.9673 13.5016 8.53464 11.7326 8.53333V8.53333Z"
      fill="#36C5F0"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32 11.7327C32.0013 9.9673 30.5684 8.53464 28.7995 8.53333C27.0306 8.53464 25.5976 9.9673 25.5989 11.7327V14.9333H28.7995C30.5684 14.932 32.0013 13.4994 32 11.7327ZM23.4666 11.7327V3.19935C23.4679 1.43527 22.0363 0.00260958 20.2674 0C18.4984 0.00130479 17.0655 1.43397 17.0668 3.19935V11.7327C17.0642 13.4981 18.4971 14.9307 20.2661 14.9333C22.035 14.932 23.4679 13.4994 23.4666 11.7327Z"
      fill="#2EB67D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.2661 32C22.035 31.9987 23.4679 30.566 23.4666 28.8007C23.4679 27.0353 22.035 25.6026 20.2661 25.6013H17.0656V28.8007C17.0642 30.5647 18.4972 31.9974 20.2661 32ZM20.2661 23.4654H28.7995C30.5684 23.4641 32.0013 22.0314 32 20.266C32.0026 18.5006 30.5697 17.068 28.8008 17.0654H20.2674C18.4985 17.0667 17.0656 18.4993 17.0669 20.2647C17.0656 22.0314 18.4972 23.4641 20.2661 23.4654V23.4654Z"
      fill="#ECB22E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.93953e-07 20.266C-0.00130651 22.0314 1.43161 23.4641 3.20052 23.4654C4.96944 23.4641 6.40235 22.0314 6.40105 20.266V17.0667H3.20052C1.43161 17.068 -0.00130651 18.5006 8.93953e-07 20.266ZM8.53342 20.266V28.7993C8.53081 30.5647 9.96372 31.9974 11.7326 32C13.5016 31.9987 14.9345 30.566 14.9332 28.8007V20.2686C14.9358 18.5032 13.5029 17.0706 11.7339 17.068C9.96372 17.068 8.53211 18.5006 8.53342 20.266C8.53342 20.2673 8.53342 20.266 8.53342 20.266Z"
      fill="#E01E5A"
    />
  </svg>
);

const defaultItems: ProjectItem[] = [
  {
    id: "1",
    logo: <SlackIcon />,
    companyName: "Slack Inc.",
    projectTitle: "Illustration of Materials Design",
    stats: [
      { value: "34", label: "Tasks" },
      { value: "19", label: "In Progress" },
      { value: "14", label: "Completed" },
    ],
    details: [
      { label: "Due date", value: "12 July, 2024" },
      {
        label: "Assignee",
        value: (
          <div className="flex items-center gap-x-1.5">
            <img
              className="shrink-0 size-4 rounded-md"
              src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=320&h=320&fit=facearea&facepad=3"
              alt="Amanda Harvey"
            />
            <span className="font-medium text-sm text-foreground">
              Amanda Harvey
            </span>
          </div>
        ),
      },
      {
        label: "Last edited",
        value: (
          <div className="flex items-center gap-x-1.5">
            <img
              className="shrink-0 size-4 rounded-md"
              src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?w=320&h=320&fit=facearea&facepad=3"
              alt="James Collins"
            />
            <span className="font-medium text-sm text-foreground">
              James Collins
            </span>
          </div>
        ),
      },
    ],
    category: {
      name: "Illustration",
      color: "bg-chart-3",
    },
  },
  {
    id: "2",
    logo: <SlackIcon />,
    companyName: "Acme Corp.",
    projectTitle: "Dashboard Redesign",
    stats: [
      { value: "12", label: "Tasks" },
      { value: "8", label: "In Progress" },
      { value: "4", label: "Completed" },
    ],
    details: [
      { label: "Due date", value: "25 August, 2024" },
      {
        label: "Assignee",
        value: (
          <div className="flex items-center gap-x-1.5">
            <img
              className="shrink-0 size-4 rounded-md"
              src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?w=320&h=320&fit=facearea&facepad=3"
              alt="John Smith"
            />
            <span className="font-medium text-sm text-foreground">
              John Smith
            </span>
          </div>
        ),
      },
      {
        label: "Last edited",
        value: (
          <div className="flex items-center gap-x-1.5">
            <img
              className="shrink-0 size-4 rounded-md"
              src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=320&h=320&fit=facearea&facepad=3"
              alt="Sarah Johnson"
            />
            <span className="font-medium text-sm text-foreground">
              Sarah Johnson
            </span>
          </div>
        ),
      },
    ],
    category: {
      name: "Design",
      color: "bg-primary",
    },
  },
];

export const Projects = ({ items = defaultItems }: ProjectsProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col bg-card border border-border truncate rounded-xl"
        >
          {/* Header */}
          <div className="p-4 relative flex gap-x-3">
            {/* Logo */}
            <div className="shrink-0">
              <div className="shrink-0 border border-border rounded-xl">
                <div className="size-12 flex justify-center items-center">
                  {item.logo}
                </div>
              </div>
            </div>
            {/* End Logo */}

            <div className="grow truncate mt-1">
              <div className="pe-7">
                <span className="block text-sm text-foreground">
                  {item.companyName}
                </span>
              </div>

              <div className="shrink-0 block">
                <h4 className="font-medium truncate text-foreground">
                  {item.projectTitle}
                </h4>
              </div>
            </div>

            {item.actions && (
              <div className="absolute top-3 end-3">{item.actions}</div>
            )}
          </div>
          {/* End Header */}

          {/* Stats List */}
          <div className="py-3 grid grid-cols-3 border-y border-border divide-x divide-border">
            {item.stats.map((stat, statIndex) => (
              <div key={statIndex} className="px-4">
                <p className="font-semibold text-sm text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
          {/* End Stats List */}

          {/* Details Grid */}
          <div className="p-4 flex flex-col gap-y-4">
            {item.details.map((detail, detailIndex) => (
              <div key={detailIndex} className="flex items-center gap-x-2">
                <p className="min-w-20 text-sm text-muted-foreground">
                  {detail.label}
                </p>
                <div className="grow">
                  {typeof detail.value === "string" ? (
                    <p className="font-medium text-sm text-foreground">
                      {detail.value}
                    </p>
                  ) : (
                    detail.value
                  )}
                </div>
              </div>
            ))}

            {/* Category */}
            <div className="flex items-center gap-x-2">
              <p className="min-w-20 text-sm text-muted-foreground">Category</p>
              <div className="grow">
                <span className="py-px px-2 inline-flex items-center gap-x-1.5 bg-muted text-sm text-foreground rounded-md">
                  <span
                    className={`inline-block w-1 h-3 ${item.category.color || "bg-primary"} rounded-full`}
                  ></span>
                  {item.category.name}
                </span>
              </div>
            </div>
          </div>
          {/* End Details Grid */}
        </div>
      ))}
    </div>
  );
};
