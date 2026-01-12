import type { ReactNode } from "react";

export interface MemberAvatar {
  type: "image" | "initial";
  src?: string;
  initial?: string;
  alt?: string;
}

export interface TeamItem {
  id: string;
  name: string;
  href?: string;
  badges: string[];
  description: string;
  members: MemberAvatar[];
  primaryAction?: ReactNode;
  secondaryActions?: ReactNode;
}

export interface TeamListViewProps {
  items: TeamItem[];
  membersLabel?: string;
}

const defaultItems: TeamItem[] = [
  {
    id: "1",
    name: "#Digitalmarketing",
    href: "#",
    badges: ["Marketing", "Digital"],
    description: "Our group promotes and sells products and services by leveraging online marketing tactics",
    members: [
      { type: "image", src: "https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?w=320&h=320&fit=facearea&facepad=2.5" },
      { type: "initial", initial: "L" },
      { type: "image", src: "https://images.unsplash.com/photo-1679412330254-90cb240038c5?w=320&h=320&fit=facearea&facepad=2.5" },
      { type: "image", src: "https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?w=320&h=320&fit=facearea&facepad=2.5" },
      { type: "initial", initial: "O" },
    ],
  },
  {
    id: "2",
    name: "#supportteam",
    href: "#",
    badges: ["Customer service", "Support"],
    description: "Keep in touch and stay productive with us",
    members: [
      { type: "image", src: "https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?w=320&h=320&fit=facearea&facepad=2.5" },
      { type: "initial", initial: "M" },
      { type: "initial", initial: "S" },
    ],
  },
];

export const TeamListView = ({
  items = defaultItems,
  membersLabel = "Members:",
}: TeamListViewProps) => {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="p-4 relative flex flex-col bg-card border border-border rounded-xl"
        >
          <div className="grid lg:grid-cols-12 gap-y-2 lg:gap-y-0 gap-x-4">
            <div className="lg:col-span-3">
              <p>
                <a
                  className="inline-flex items-center gap-x-1 text-foreground decoration-2 hover:underline font-semibold hover:text-primary focus:outline-hidden focus:underline focus:text-primary"
                  href={item.href || "#"}
                >
                  {item.name}
                </a>
              </p>

              {/* Badge Group */}
              <div className="mt-1 lg:mt-2 flex flex-wrap gap-1.5">
                {item.badges.map((badge, badgeIndex) => (
                  <span
                    key={badgeIndex}
                    className="m-0.5 p-1.5 sm:p-2 inline-block bg-muted text-foreground text-xs rounded-md"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              {/* End Badge Group */}
            </div>
            {/* End Col */}

            <div className="lg:col-span-6">
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>

              {/* Avatar Group */}
              <div className="mt-2 flex items-center gap-x-3">
                <h4 className="text-xs uppercase text-muted-foreground">
                  {membersLabel}
                </h4>
                <div className="flex items-center -space-x-2">
                  {item.members.map((member, memberIndex) =>
                    member.type === "image" ? (
                      <img
                        key={memberIndex}
                        className="shrink-0 size-7 rounded-full"
                        src={member.src}
                        alt={member.alt || "Avatar"}
                      />
                    ) : (
                      <span
                        key={memberIndex}
                        className="flex shrink-0 justify-center items-center size-7 bg-card border border-border text-foreground text-xs font-medium uppercase rounded-full"
                      >
                        {member.initial}
                      </span>
                    )
                  )}
                </div>
              </div>
              {/* End Avatar Group */}
            </div>
            {/* End Col */}

            <div className="lg:col-span-3">
              {/* Button Group */}
              <div className="flex lg:flex-col justify-end items-center gap-2 border-t border-border lg:border-t-0 pt-3 lg:pt-0">
                {item.primaryAction && (
                  <div className="lg:order-2 lg:ms-auto">
                    {item.primaryAction}
                  </div>
                )}

                {item.secondaryActions && (
                  <div className="lg:order-1 lg:ms-auto">
                    {item.secondaryActions}
                  </div>
                )}
              </div>
              {/* End Button Group */}
            </div>
            {/* End Col */}
          </div>
        </div>
      ))}
    </div>
  );
};
